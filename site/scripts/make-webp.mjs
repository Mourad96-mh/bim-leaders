// Optimizes source photos in assets-src/ → public/img/ as WebP (primary) + JPG (fallback).
// Sources stay OUT of public/ so originals don't ship. Run: node scripts/make-webp.mjs
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { mkdirSync } from "node:fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = join(__dirname, "..", "assets-src");
const OUT = join(__dirname, "..", "public", "img");
mkdirSync(OUT, { recursive: true });

// [source file, output basename, target width]
const CONFIG = [
  ["home-hero.jpg",         "hero",            1000],
  ["gros-oeuvre.jpg",       "svc-gros-oeuvre",  800],
  ["scaffolding.jpg",       "svc-renovation",   800],
  ["interior.jpg",          "svc-amenagement",  800],
  ["onsite-blueprint.jpg",  "svc-opc",          800],
  ["engineer-drawings.jpg", "svc-assistance",   800],
  ["maintenance.jpg",       "svc-entretien",    800],
  ["qse.jpg",               "svc-qse",          800],
  ["architects-plans.jpg",  "about",           1000],
];

let total = 0;
for (const [src, base, w] of CONFIG) {
  const input = join(SRC, src);
  const pipeline = sharp(input).resize({ width: w, withoutEnlargement: true });
  await pipeline.clone().webp({ quality: 72 }).toFile(join(OUT, `${base}.webp`));
  await pipeline.clone().jpeg({ quality: 80, mozjpeg: true }).toFile(join(OUT, `${base}.jpg`));
  const meta = await sharp(join(OUT, `${base}.webp`)).metadata();
  console.log(`${base.padEnd(18)} ${meta.width}×${meta.height}  webp+jpg`);
  total++;
}
console.log(`\n${total} images → public/img/ (webp + jpg each)`);
