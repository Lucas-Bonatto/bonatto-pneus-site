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

const ELECTRICAL_BRAND_ASSETS = [
  "positron.png",
  "taramps.png",
  "fks.png",
  "olimpus.png",
  "tury.png",
  "tragial.png",
  "faaftech.png",
  "soft-automotiva.svg",
  "moura.svg",
  "heliar.png",
  "tudor.png",
  "philips.png",
  "osram.png",
  "shocklight.png",
  "pioneer.png",
  "jbl.png",
  "stetsom.png",
];

const FILM_BRAND_ASSETS = [
  "insulfilm.svg",
  "intercontrol.png",
  "across.png",
  "mpk-do-brasil.webp",
  "solar-film.png",
];

const PAYMENT_ASSETS = ["mastercard.svg", "visa.svg", "elo.svg", "banrisul.svg"];

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
  "O pneu certo transforma a direção.",
  "Proteção certa para o coração do carro.",
  "Zunky",
  "Volcano",
  "Olimpo",
  "Rodas originais",
  "Mais controle. Menos preocupação.",
  "Pósitron",
  "FKS",
  "Seu carro faz mais, sem perder a essência.",
  "Tury",
  "Tragial",
  "Soft Automotiva",
  "Energia para partir. Visibilidade para chegar.",
  "Moura",
  "Heliar",
  "Tudor",
  "Philips",
  "OSRAM",
  "Shocklight",
  "Sua trilha. Seu caminho. Do seu jeito.",
  "Pioneer",
  "JBL",
  "Stetsom",
  "Conforto que você sente. Qualidade que você enxerga.",
  "INSULFILM™",
  "InterControl",
  "Across",
  "MPK / Nexfil",
  "Solar Film",
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

  assert.equal(source.includes("Uma amostra de linhas para passeio"), false);
  assert.equal(source.includes("Selecionamos o óleo pela viscosidade"), false);

  assert.doesNotMatch(source, /image:\s*["']https?:/i);

  await Promise.all(
    CATALOG_ASSETS.map((asset) =>
      access(new URL(`../public/images/products/${asset}`, import.meta.url)),
    ),
  );

  await Promise.all(
    ELECTRICAL_BRAND_ASSETS.map((asset) =>
      access(new URL(`../public/images/brands/${asset}`, import.meta.url)),
    ),
  );

  await Promise.all(
    FILM_BRAND_ASSETS.map((asset) =>
      access(new URL(`../public/images/brands/${asset}`, import.meta.url)),
    ),
  );

  await Promise.all(
    PAYMENT_ASSETS.map((asset) =>
      access(new URL(`../public/images/payments/${asset}`, import.meta.url)),
    ),
  );
});

test("keeps benefit-led alignment copy and accepted card brands", async () => {
  const pageSections = await readFile(
    new URL("../src/components/PageSections.jsx", import.meta.url),
    "utf8",
  );

  assert.equal(
    pageSections.includes("Sinta o carro firme. Faça os pneus renderem mais."),
    true,
  );
  assert.equal(
    pageSections.includes(
      "Balanceamento e geometria para reduzir vibrações, melhorar a estabilidade",
    ),
    true,
  );
  assert.equal(pageSections.includes("Valores claros para veículos leves"), false);
  assert.equal(
    pageSections.includes("Seu carro alinhado. Seu caminho mais seguro."),
    false,
  );

  for (const brand of ["Mastercard", "Visa", "Elo", "Banrisul"]) {
    assert.equal(
      pageSections.includes(brand),
      true,
      `${brand} must stay in payment options`,
    );
  }

  const visibleTextSources = await Promise.all(
    ["PageSections.jsx", "ServiceJourney.jsx", "SiteChrome.jsx"].map((file) =>
      readFile(new URL(`../src/components/${file}`, import.meta.url), "utf8"),
    ),
  );
  visibleTextSources.push(
    await readFile(new URL("../src/data/siteContent.js", import.meta.url), "utf8"),
  );

  for (const source of visibleTextSources) {
    assert.doesNotMatch(source, /[—–]/, "visible text must use standard punctuation");
  }
});

test("keeps downloaded SVG logos free of executable markup", async () => {
  const assetDirectories = [
    new URL("../public/images/brands/", import.meta.url),
    new URL("../public/images/payments/", import.meta.url),
  ];
  const unsafeMarkup =
    /<script|javascript:|on(?:load|error)\s*=|<foreignObject|(?:href|xlink:href)\s*=\s*["']https?:/i;

  for (const directory of assetDirectories) {
    const files = await readdir(directory);
    const svgFiles = files.filter((file) => file.endsWith(".svg"));

    assert.ok(svgFiles.length > 0, "the local SVG logo collection must exist");

    for (const file of svgFiles) {
      const source = await readFile(new URL(file, directory), "utf8");
      assert.doesNotMatch(source, unsafeMarkup, `${file} contains unsafe markup`);
    }
  }
});
