import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const outDir = path.join(rootDir, "out");
const postsDir = path.join(rootDir, "content", "posts");

function readFileIfPresent(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : null;
}

function resolveRouteFile(route) {
  const cleanRoute = route === "/" ? "" : route.replace(/^\//, "");
  const candidates = route === "/"
    ? [path.join(outDir, "index.html")]
    : [
        path.join(outDir, `${cleanRoute}.html`),
        path.join(outDir, cleanRoute, "index.html"),
      ];

  for (const candidate of candidates) {
    const content = readFileIfPresent(candidate);
    if (content !== null) {
      return { path: candidate, content };
    }
  }

  throw new Error(`Missing exported route for ${route}`);
}

function assertIncludes(route, content, snippet) {
  if (!content.includes(snippet)) {
    throw new Error(`Expected ${route} to include: ${snippet}`);
  }
}

if (!fs.existsSync(outDir)) {
  throw new Error("Missing build output directory: out");
}

const posts = fs.existsSync(postsDir)
  ? fs
      .readdirSync(postsDir)
      .filter((filename) => filename.endsWith(".md"))
      .map((filename) => filename.replace(/\.md$/, ""))
  : [];

const home = resolveRouteFile("/");
assertIncludes("/", home.content, 'id="main-content"');
assertIncludes("/", home.content, "Review Experience");

const blog = resolveRouteFile("/blog");
assertIncludes("/blog", blog.content, "RSS Feed");

const resume = resolveRouteFile("/resume");
assertIncludes("/resume", resume.content, "Download PDF");
assertIncludes("/resume", resume.content, "/documents/Ryan-M-Mack-Resume.pdf");

if (posts.length > 0) {
  const firstPost = resolveRouteFile(`/blog/${posts[0]}`);
  assertIncludes(`/blog/${posts[0]}`, firstPost.content, "Back to all posts");
}

const feedPath = path.join(outDir, "feed.xml");
const feed = readFileIfPresent(feedPath);
if (feed === null) {
  throw new Error("Missing generated RSS feed: out/feed.xml");
}
assertIncludes("/feed.xml", feed, "<rss version=\"2.0\">");

console.log("Smoke checks passed.");
