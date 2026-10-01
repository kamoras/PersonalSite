import fs from "fs";
import path from "path";
import { load } from "js-yaml";
import { cache } from "react";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import { visit } from "unist-util-visit";
import type { Root, Element, ElementContent } from "hast";
import { FOOTNOTE_ID_PREFIX } from "@/lib/constants";

const postsDirectory = path.join(process.cwd(), "content/posts");

export interface Heading {
  id: string;
  text: string;
}

function textContent(node: Element | ElementContent): string {
  if (node.type === "text") return node.value;
  if (node.type === "element") return node.children.map(textContent).join("");
  return "";
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[\u2019']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Ids the essay page already uses outside the article body.
const reservedIds = new Set(["main-content", "contents-sheet", "discussion", "related-heading", "discussion-heading", "post-title"]);

// Gives section headings stable, readable ids (for the rail's contents and
// shareable links) and collects them. Runs after sanitization, so the ids
// skip the "user-content-" prefix; the reserved set keeps them from
// colliding with ids on the page around the article.
function rehypeHeadingIds(headings: Heading[]) {
  return () => (tree: Root) => {
    const used = new Set<string>(reservedIds);
    visit(tree, "element", (node: Element) => {
      if (typeof node.properties?.id === "string") used.add(node.properties.id);
    });
    visit(tree, "element", (node: Element) => {
      if (node.tagName !== "h2" || node.properties?.id) return;
      const text = textContent(node).trim();
      const base = slugify(text) || "section";
      let id = base;
      for (let n = 2; used.has(id); n++) id = `${base}-${n}`;
      used.add(id);
      node.properties = { ...node.properties, id, dataTrack: "" };
      headings.push({ id, text });
    });
  };
}

// remark-gfm labels the footnotes section with a visually hidden "Footnotes"
// heading. The design shows it as a visible "Notes" heading with a stable id
// the rail can link to.
function rehypeNotesHeading() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element) => {
      if (node.tagName !== "h2" || node.properties?.id !== `${FOOTNOTE_ID_PREFIX}footnote-label`) return;
      node.properties = { ...node.properties, className: [], dataTrack: "" };
      node.children = [{ type: "text", value: "Notes" }];
    });
  };
}

// rehype-sanitize prefixes every id with FOOTNOTE_ID_PREFIX but leaves the
// in-page hrefs that point at them untouched, so footnote links would miss
// their targets without JavaScript. Rewrite those hrefs to match.
function rehypePrefixFragmentLinks() {
  return (tree: Root) => {
    const ids = new Set<string>();
    visit(tree, "element", (node: Element) => {
      if (typeof node.properties?.id === "string") ids.add(node.properties.id);
    });
    visit(tree, "element", (node: Element) => {
      const href = node.properties?.href;
      if (node.tagName !== "a" || typeof href !== "string" || !href.startsWith("#")) return;
      const target = FOOTNOTE_ID_PREFIX + href.slice(1);
      if (ids.has(target)) node.properties.href = `#${target}`;
    });
  };
}

// Extend the default sanitization schema to preserve remark-gfm footnote
// attributes used by ArticleBody.tsx for sidenotes and inline notes.
// Uses the default clobberPrefix ("user-content-") — DOM clobbering protection
// is fully active. remark-rehype is told not to add its own prefix so the
// prefix is applied exactly once (by rehype-sanitize) to id attributes.
const sanitizeSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    a: [
      ...((defaultSchema.attributes?.a as string[]) ?? []),
      "data-footnote-ref",
      "data-footnote-backref",
    ],
    section: [
      ...((defaultSchema.attributes?.section as string[]) ?? []),
      "data-footnotes",
    ],
  },
};

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  readingTime: number;
  notesCount: number;
  pullquote: string | null;
}

export interface Post extends PostMeta {
  contentHtml: string;
  contentText: string;
  headings: Heading[];
}

interface PostFrontmatter {
  title: string;
  date: string;
  description: string;
  tags: string[];
  pullquote: string | null;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

const frontmatterPattern = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

function parseFrontmatter(raw: string): { data: unknown; content: string } {
  const match = frontmatterPattern.exec(raw);
  if (!match) {
    return { data: {}, content: raw };
  }
  return { data: load(match[1]) ?? {}, content: raw.slice(match[0].length) };
}

function validatePostFrontmatter(data: unknown, source: string): PostFrontmatter {
  if (!isRecord(data)) {
    throw new Error(`Invalid frontmatter in ${source}: expected an object.`);
  }

  const { title, date, description, tags, pullquote } = data;

  if (typeof title !== "string" || title.trim() === "") {
    throw new Error(`Invalid frontmatter in ${source}: "title" must be a non-empty string.`);
  }

  if (typeof description !== "string" || description.trim() === "") {
    throw new Error(`Invalid frontmatter in ${source}: "description" must be a non-empty string.`);
  }

  if (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(date))) {
    throw new Error(`Invalid frontmatter in ${source}: "date" must use YYYY-MM-DD.`);
  }

  if (!Array.isArray(tags) || tags.some((tag) => typeof tag !== "string" || tag.trim() === "")) {
    throw new Error(`Invalid frontmatter in ${source}: "tags" must be an array of non-empty strings.`);
  }

  if (pullquote !== undefined && (typeof pullquote !== "string" || pullquote.trim() === "")) {
    throw new Error(`Invalid frontmatter in ${source}: "pullquote" must be a non-empty string when present.`);
  }

  return {
    title: title.trim(),
    date,
    description: description.trim(),
    tags: tags.map((tag) => tag.trim()),
    pullquote: typeof pullquote === "string" ? pullquote.trim() : null,
  };
}

function readPostFile(filename: string) {
  const slug = filename.replace(/\.md$/, "");
  if (!/^[a-z0-9][a-z0-9-]*$/.test(slug)) {
    throw new Error(`Invalid post filename "${filename}": slugs must be lowercase alphanumeric with hyphens only.`);
  }
  const source = path.join(postsDirectory, filename);
  const raw = fs.readFileSync(source, "utf8");
  const { data, content } = parseFrontmatter(raw);
  const frontmatter = validatePostFrontmatter(data, source);

  return { slug, content, frontmatter };
}

function markdownToPlainText(md: string): string {
  return md
    .replace(/\[\^[^\]]+\]:\s*[^\n]*(?:\n[ \t]+[^\n]*)*/gm, "")  // footnote definitions (incl. indented continuations)
    .replace(/\[\^[^\]]+\]/g, "")           // footnote references
    .replace(/^#{1,6}\s+/gm, "")            // headings
    .replace(/^>[ \t]?/gm, "")              // blockquote markers
    .replace(/^[ \t]*(?:[-*+]|\d{1,3}[.)])[ \t]+/gm, "") // list markers (years like "2026." are prose)
    .replace(/\*{1,3}([^*\n]+)\*{1,3}/g, "$1") // bold / italic
    .replace(/_{1,3}([^_\n]+)_{1,3}/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")    // images (before links, which would leave a stray "!")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // links → label
    .replace(/`{1,3}[^`]+`{1,3}/g, "")       // inline / fenced code
    .replace(/^[-*_]{3,}\s*$/gm, "")         // horizontal rules
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

// Counted on the plain text, so footnote definitions and their URLs don't
// inflate the estimate.
function computeReadingTime(markdown: string): number {
  const words = markdownToPlainText(markdown).split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function countNotes(markdown: string): number {
  return new Set(markdown.match(/^\[\^[^\]]+\]:/gm) ?? []).size;
}

function toMeta(slug: string, content: string, frontmatter: PostFrontmatter): PostMeta {
  return {
    slug,
    title: frontmatter.title,
    date: frontmatter.date,
    description: frontmatter.description,
    tags: frontmatter.tags,
    pullquote: frontmatter.pullquote,
    readingTime: computeReadingTime(content),
    notesCount: countNotes(content),
  };
}

export function getAllPostsMeta(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) return [];

  return fs
    .readdirSync(postsDirectory)
    .filter((f) => f.endsWith(".md"))
    .map((filename) => {
      const { slug, content, frontmatter } = readPostFile(filename);
      return toMeta(slug, content, frontmatter);
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs
    .readdirSync(postsDirectory)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export const getPost = cache(async function getPost(slug: string): Promise<Post> {
  const { frontmatter, content } = readPostFile(`${slug}.md`);
  const headings: Heading[] = [];

  const processed = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: false, clobberPrefix: "" })
    .use(rehypeSanitize, sanitizeSchema)
    .use(rehypePrefixFragmentLinks)
    .use(rehypeNotesHeading)
    .use(rehypeHeadingIds(headings))
    .use(rehypeStringify)
    .process(content);

  return {
    ...toMeta(slug, content, frontmatter),
    contentHtml: processed.toString(),
    contentText: markdownToPlainText(content),
    headings,
  };
});

export function getRelatedPosts(currentSlug: string, tags: string[], limit = 3): PostMeta[] {
  return getAllPostsMeta()
    .filter((p) => p.slug !== currentSlug)
    .map((p) => ({
      post: p,
      score: p.tags.filter((t) => tags.includes(t)).length,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || new Date(b.post.date).getTime() - new Date(a.post.date).getTime())
    .slice(0, limit)
    .map(({ post }) => post);
}

// Posts are sorted newest first, so the older neighbour is the next entry.
export function getAdjacentPosts(slug: string): { newer: PostMeta | null; older: PostMeta | null } {
  const posts = getAllPostsMeta();
  const index = posts.findIndex((p) => p.slug === slug);
  if (index === -1) return { newer: null, older: null };
  return { newer: posts[index - 1] ?? null, older: posts[index + 1] ?? null };
}

export interface TopicCount {
  topic: string;
  count: number;
}

export function getTopics(posts: PostMeta[]): TopicCount[] {
  const counts = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return [...counts]
    .map(([topic, count]) => ({ topic, count }))
    .sort((a, b) => b.count - a.count || a.topic.localeCompare(b.topic));
}
