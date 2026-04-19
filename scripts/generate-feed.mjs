import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const rootDir = process.cwd();
const postsDir = path.join(rootDir, "content", "posts");
const outputPath = path.join(rootDir, "public", "feed.xml");

const site = {
  title: "Ryan Mack",
  url: "https://ryan-mack.dev",
  description: "Writing about software, technology, and whatever else is worth putting into words.",
};

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function parsePost(filename) {
  const slug = filename.replace(/\.md$/, "");
  const source = fs.readFileSync(path.join(postsDir, filename), "utf8");
  const { data } = matter(source);

  if (
    typeof data.title !== "string" ||
    typeof data.description !== "string" ||
    typeof data.date !== "string"
  ) {
    throw new Error(`Invalid frontmatter for feed generation: ${filename}`);
  }

  return {
    slug,
    title: data.title.trim(),
    description: data.description.trim(),
    date: data.date,
    url: `${site.url}/blog/${slug}`,
  };
}

function buildFeed(posts) {
  const items = posts
    .map(
      (post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${post.url}</link>
      <guid>${post.url}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escapeXml(post.description)}</description>
    </item>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(site.title)}</title>
    <link>${site.url}</link>
    <description>${escapeXml(site.description)}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;
}

const posts = fs.existsSync(postsDir)
  ? fs
      .readdirSync(postsDir)
      .filter((filename) => filename.endsWith(".md"))
      .map(parsePost)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  : [];

fs.writeFileSync(outputPath, buildFeed(posts));
