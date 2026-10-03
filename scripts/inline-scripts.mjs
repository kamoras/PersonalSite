import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const outDir = path.join(process.cwd(), "out");

function htmlFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return htmlFiles(full);
    return entry.name.endsWith(".html") ? [full] : [];
  });
}

// CSP source expressions for every executable inline <script> in the export.
// JSON data blocks (JSON-LD) never execute, so CSP doesn't apply to them.
export function inlineScriptHashes() {
  const hashes = new Set();
  const pattern = /<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/gi;
  for (const file of htmlFiles(outDir)) {
    for (const [, attrs, body] of fs.readFileSync(file, "utf8").matchAll(pattern)) {
      if (/type="application\/(ld\+)?json"/i.test(attrs)) continue;
      hashes.add(`'sha256-${crypto.createHash("sha256").update(body).digest("base64")}'`);
    }
  }
  return [...hashes].sort();
}

export const configPath = path.join(outDir, "staticwebapp.config.json");
