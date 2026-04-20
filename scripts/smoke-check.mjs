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

function extractMetaContent(content, attrName, attrValue) {
  const patterns = [
    new RegExp(`<meta[^>]+${attrName}="${attrValue}"[^>]+content="([^"]+)"`, "i"),
    new RegExp(`<meta[^>]+content="([^"]+)"[^>]+${attrName}="${attrValue}"`, "i"),
  ];

  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match?.[1]) {
      return match[1];
    }
  }

  return null;
}

function assertExportedAsset(assetUrl, label) {
  const pathname = assetUrl.startsWith("http://") || assetUrl.startsWith("https://")
    ? new URL(assetUrl).pathname
    : assetUrl;
  const assetPath = path.join(outDir, pathname.replace(/^\//, ""));

  if (!fs.existsSync(assetPath)) {
    throw new Error(`Missing exported ${label}: ${assetPath}`);
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
assertIncludes("/", home.content, 'href="#main-content"');
assertIncludes("/", home.content, "View Experience");

const blog = resolveRouteFile("/blog");
assertIncludes("/blog", blog.content, "RSS Feed");

const resumePdfPath = path.join(outDir, "documents", "Ryan-M-Mack-Resume.pdf");
if (!fs.existsSync(resumePdfPath)) {
  throw new Error("Missing exported resume PDF asset");
}

const faviconPath = path.join(outDir, "favicon.ico");
if (!fs.existsSync(faviconPath)) {
  throw new Error("Missing exported favicon asset");
}

const resumeRouteArtifact = [
  path.join(outDir, "resume.html"),
  path.join(outDir, "resume", "index.html"),
].some((filePath) => fs.existsSync(filePath));
if (resumeRouteArtifact) {
  throw new Error("Unexpected exported /resume page artifact");
}

if (posts.length > 0) {
  const firstPostRoute = `/blog/${posts[0]}`;
  const firstPost = resolveRouteFile(firstPostRoute);
  assertIncludes(firstPostRoute, firstPost.content, "Back to all posts");

  const ogImage = extractMetaContent(firstPost.content, "property", "og:image");
  if (!ogImage) {
    throw new Error(`Missing og:image metadata on ${firstPostRoute}`);
  }
  assertExportedAsset(ogImage, "post Open Graph image");

  const twitterImage = extractMetaContent(firstPost.content, "name", "twitter:image");
  if (!twitterImage) {
    throw new Error(`Missing twitter:image metadata on ${firstPostRoute}`);
  }
  assertExportedAsset(twitterImage, "post Twitter image");
}

const feedPath = path.join(outDir, "feed.xml");
const feed = readFileIfPresent(feedPath);
if (feed === null) {
  throw new Error("Missing generated RSS feed: out/feed.xml");
}
assertIncludes("/feed.xml", feed, "<rss version=\"2.0\">");

const configPath = path.join(outDir, "staticwebapp.config.json");
const config = readFileIfPresent(configPath);
if (config === null) {
  throw new Error("Missing exported static web app config");
}
const staticConfig = JSON.parse(config);
const resumeRoute = staticConfig.routes?.find((route) => route.route === "/resume");
if (!resumeRoute || resumeRoute.redirect !== "/documents/Ryan-M-Mack-Resume.pdf") {
  throw new Error("Missing /resume redirect in static web app config");
}

console.log("Smoke checks passed.");
