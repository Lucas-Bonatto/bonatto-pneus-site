import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";

const EXPECTED_HEADERS = [
  "Content-Security-Policy:",
  "Strict-Transport-Security:",
  "X-Content-Type-Options: nosniff",
  "X-Frame-Options: DENY",
  "Referrer-Policy: strict-origin-when-cross-origin",
  "Permissions-Policy:",
];

const CATALOG_ASSETS = [
  "tire-pirelli-pzero.png",
  "tire-goodyear-efficientgrip.png",
  "tire-michelin-primacy4.webp",
  "tire-continental-allseasoncontact.png",
  "wheel-zunky-zk50.png",
  "wheel-zunky-zk260.png",
  "wheel-zunky-zk940.png",
];

const REQUIRED_CATALOG_TEXT = [
  "Dunlop",
  "Pirelli",
  "Goodyear",
  "Continental",
  "Michelin",
  "Bridgestone",
  "Firestone",
  "Hankook",
  "Kumho",
  "Aplus",
  "Wanli",
  "Agate",
  "Xbri",
  "BFGoodrich",
  "GT Radial",
  "Giti",
  "Roadcruza",
  "Delinte",
  "Novamaxx",
  "Zunky",
  "Volcano",
  "Olimpo",
  "Rodas originais",
  "R$ 60,00",
  "R$ 100,00",
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

test("keeps the catalog content and product images available locally", async () => {
  const source = await readFile(
    new URL("../src/data/siteContent.js", import.meta.url),
    "utf8",
  );

  for (const label of REQUIRED_CATALOG_TEXT) {
    assert.equal(source.includes(label), true, `${label} must stay in the catalog`);
  }

  assert.doesNotMatch(source, /image:\s*["']https?:/i);

  await Promise.all(
    CATALOG_ASSETS.map((asset) =>
      access(new URL(`../public/images/products/${asset}`, import.meta.url)),
    ),
  );
});

test("keeps downloaded SVG logos free of executable markup", async () => {
  const logosDirectory = new URL("../public/images/brands/", import.meta.url);
  const files = await readdir(logosDirectory);
  const svgFiles = files.filter((file) => file.endsWith(".svg"));
  const unsafeMarkup =
    /<script|javascript:|on(?:load|error)\s*=|<foreignObject|(?:href|xlink:href)\s*=\s*["']https?:/i;

  assert.ok(svgFiles.length > 0, "the local SVG logo collection must exist");

  for (const file of svgFiles) {
    const source = await readFile(new URL(file, logosDirectory), "utf8");
    assert.doesNotMatch(source, unsafeMarkup, `${file} contains unsafe markup`);
  }
});
