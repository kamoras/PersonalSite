import fs from "node:fs";
import path from "node:path";
import { inlineScriptHashes } from "./inline-scripts.mjs";

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
assertIncludes("/", home.content, "Read the essays");

const blog = resolveRouteFile("/blog");
assertIncludes("/blog", blog.content, "Subscribe via RSS");

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

// Social images need a .png extension: Azure Static Web Apps derives the
// Content-Type from it, and scrapers reject application/octet-stream.
function assertSocialImages(route, content) {
  for (const [attrName, attrValue] of [["property", "og:image"], ["name", "twitter:image"]]) {
    const imageUrl = extractMetaContent(content, attrName, attrValue);
    if (!imageUrl) {
      throw new Error(`Missing ${attrValue} metadata on ${route}`);
    }
    if (!new URL(imageUrl).pathname.endsWith(".png")) {
      throw new Error(`${attrValue} on ${route} must be a .png path: ${imageUrl}`);
    }
    assertExportedAsset(imageUrl, `${attrValue} for ${route}`);
  }
}

assertSocialImages("/", home.content);
assertSocialImages("/blog", blog.content);

for (const slug of posts) {
  const postRoute = `/blog/${slug}`;
  const postFile = resolveRouteFile(postRoute);
  assertIncludes(postRoute, postFile.content, "All essays");
  assertSocialImages(postRoute, postFile.content);

  for (const [, fragment] of postFile.content.matchAll(/href="#([^"]+)"/g)) {
    if (!postFile.content.includes(`id="${fragment}"`)) {
      throw new Error(`Broken in-page link #${fragment} on ${postRoute}`);
    }
  }
}

const feedPath = path.join(outDir, "feed.xml");
const feed = readFileIfPresent(feedPath);
if (feed === null) {
  throw new Error("Missing generated RSS feed: out/feed.xml");
}
assertIncludes("/feed.xml", feed, "<rss version=\"2.0\"");

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

// Every root-relative link in the export must resolve to an exported file.
function listHtmlFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return entry.name === "_next" ? [] : listHtmlFiles(full);
    return entry.name.endsWith(".html") ? [full] : [];
  });
}

for (const file of listHtmlFiles(outDir)) {
  const content = fs.readFileSync(file, "utf8");
  for (const [, href] of content.matchAll(/href="(\/[^"#?]*)/g)) {
    if (href.startsWith("/_next/") || href === "/resume") continue;
    const clean = href.replace(/^\//, "");
    const candidates = clean === ""
      ? [path.join(outDir, "index.html")]
      : [path.join(outDir, clean), path.join(outDir, `${clean}.html`), path.join(outDir, clean, "index.html")];
    if (!candidates.some((candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile())) {
      throw new Error(`Broken internal link ${href} in ${path.relative(outDir, file)}`);
    }
  }
}

// The CSP allows inline scripts only by hash (scripts/csp-hashes.mjs, run as
// postbuild); a script missing from it would be blocked in production.
const scriptSrc = staticConfig.globalHeaders?.["Content-Security-Policy"]?.match(/script-src [^;]*/)?.[0] ?? "";
for (const hash of inlineScriptHashes()) {
  if (!scriptSrc.includes(hash)) {
    throw new Error(`Inline script ${hash} is not allowed by the exported CSP; run the build so postbuild can hash it.`);
  }
}

console.log("Smoke checks passed.");
