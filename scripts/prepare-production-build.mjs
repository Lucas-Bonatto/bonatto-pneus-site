#!/usr/bin/env node
import { copyFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const index = path.join(dist, "index.html");
const notFound = path.join(dist, "404.html");

if (!existsSync(index)) {
  throw new Error("O build não gerou dist/index.html.");
}

copyFileSync(index, notFound);
console.log("Build preparado com página 404 para produção.");
