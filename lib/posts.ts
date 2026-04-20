import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { cache } from "react";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";

const postsDirectory = path.join(process.cwd(), "content/posts");

// Extend the default sanitization schema to preserve remark-gfm footnote
// attributes that BlogContent.tsx uses for its tooltip interception.
const sanitizeSchema = {
  ...defaultSchema,
  // Uses the default clobberPrefix ("user-content-") — DOM clobbering protection
  // is fully active. remark-rehype is told not to add its own prefix so the
  // prefix is applied exactly once (by rehype-sanitize) to id attributes.
  // hrefs are left as plain "#fn-N" fragments; BlogContent prepends the prefix
  // when resolving the target element via getElementById.
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
}

export interface Post extends PostMeta {
  contentHtml: string;
  contentText: string;
}

interface PostFrontmatter {
  title: string;
  date: string;
  description: string;
  tags: string[];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function validatePostFrontmatter(data: unknown, source: string): PostFrontmatter {
  if (!isRecord(data)) {
    throw new Error(`Invalid frontmatter in ${source}: expected an object.`);
  }

  const { title, date, description, tags } = data;

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

  return {
    title: title.trim(),
    date,
    description: description.trim(),
    tags: tags.map((tag) => tag.trim()),
  };
}

function readPostFile(filename: string) {
  const slug = filename.replace(/\.md$/, "");
  const source = path.join(postsDirectory, filename);
  const raw = fs.readFileSync(source, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = validatePostFrontmatter(data, source);

  return { slug, content, frontmatter };
}

function markdownToPlainText(md: string): string {
  return md
    .replace(/\[\^[^\]]+\]:\s*[^\n]*(?:\n[ \t]+[^\n]*)*/gm, "")  // footnote definitions (incl. indented continuations)
    .replace(/\[\^[^\]]+\]/g, "")           // footnote references
    .replace(/^#{1,6}\s+/gm, "")            // headings
    .replace(/\*{1,3}([^*\n]+)\*{1,3}/g, "$1") // bold / italic
    .replace(/_{1,3}([^_\n]+)_{1,3}/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // links → label
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")    // images
    .replace(/`{1,3}[^`]+`{1,3}/g, "")       // inline / fenced code
    .replace(/^[-*_]{3,}\s*$/gm, "")         // horizontal rules
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function computeReadingTime(markdown: string): number {
  const words = markdown.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export function getAllPostsMeta(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) return [];

  return fs
    .readdirSync(postsDirectory)
    .filter((f) => f.endsWith(".md"))
    .map((filename) => {
      const { slug, content, frontmatter } = readPostFile(filename);
      return {
        slug,
        title: frontmatter.title,
        date: frontmatter.date,
        description: frontmatter.description,
        tags: frontmatter.tags,
        readingTime: computeReadingTime(content),
      };
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

  const processed = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: false, clobberPrefix: "" })
    .use(rehypeSanitize, sanitizeSchema)
    .use(rehypeStringify)
    .process(content);

  return {
    slug,
    title: frontmatter.title,
    date: frontmatter.date,
    description: frontmatter.description,
    tags: frontmatter.tags,
    readingTime: computeReadingTime(content),
    contentHtml: processed.toString(),
    contentText: markdownToPlainText(content),
  };
});

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
