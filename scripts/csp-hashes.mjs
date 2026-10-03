import fs from "node:fs";
import { configPath, inlineScriptHashes } from "./inline-scripts.mjs";

// A static export can't use per-request nonces, so the exported config allows
// exactly the inline scripts the build produced (the theme script and Next's
// payload scripts) by hash. 'unsafe-inline' stays only as the fallback for
// browsers without CSP2: any browser that understands hashes ignores it.
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
const csp = config.globalHeaders["Content-Security-Policy"];
const hashes = inlineScriptHashes();
if (!/script-src [^;]*'unsafe-inline'/.test(csp)) {
  throw new Error("Expected script-src to contain 'unsafe-inline' before hashing.");
}
config.globalHeaders["Content-Security-Policy"] = csp.replace(
  /(script-src [^;]*'unsafe-inline')/,
  `$1 ${hashes.join(" ")}`
);
fs.writeFileSync(configPath, `${JSON.stringify(config, null, 2)}\n`);
console.log(`CSP: allowed ${hashes.length} inline scripts by hash.`);
