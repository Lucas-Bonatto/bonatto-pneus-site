import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const EXPECTED_HEADERS = [
  "Content-Security-Policy:",
  "Strict-Transport-Security:",
  "X-Content-Type-Options: nosniff",
  "X-Frame-Options: DENY",
  "Referrer-Policy: strict-origin-when-cross-origin",
  "Permissions-Policy:",
];

test("emits the files required for production", async () => {
  await access(new URL("../dist/index.html", import.meta.url));
  await access(new URL("../dist/404.html", import.meta.url));
  await access(new URL("../dist/_headers", import.meta.url));
});

test("keeps the required security headers", async () => {
  const source = await readFile(new URL("../public/_headers", import.meta.url), "utf8");

  for (const header of EXPECTED_HEADERS) {
    assert.equal(source.includes(header), true, `${header} must be configured`);
  }
});

test("configures Cloudflare static assets and real 404 responses", async () => {
  const source = await readFile(new URL("../wrangler.jsonc", import.meta.url), "utf8");
  const config = JSON.parse(source);

  assert.equal(config.assets.directory, "./dist");
  assert.equal(config.assets.not_found_handling, "404-page");
});
