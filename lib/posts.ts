import fs from "fs";
import path from "path";
import matter from "gray-matter";
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
      const slug = filename.replace(/\.md$/, "");
      const { data, content } = matter(
        fs.readFileSync(path.join(postsDirectory, filename), "utf8")
      );
      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        description: data.description as string,
        tags: (data.tags as string[]) ?? [],
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

export async function getPost(slug: string): Promise<Post> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const { data, content } = matter(fs.readFileSync(fullPath, "utf8"));

  const processed = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: false, clobberPrefix: "" })
    .use(rehypeSanitize, sanitizeSchema)
    .use(rehypeStringify)
    .process(content);

  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    description: data.description as string,
    tags: (data.tags as string[]) ?? [],
    readingTime: computeReadingTime(content),
    contentHtml: processed.toString(),
  };
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
