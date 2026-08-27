// Génère l'image de partage 1200×630 → public/og.jpg
//
// Celle qui s'affiche quand un lien du site est collé dans WhatsApp, LinkedIn ou
// Facebook (§17 « Open Graph »). Fond bleu de marque, symbole du logo réel,
// nom retypographié et accroche officielle.
//
// Usage : node scripts/make-og.mjs

import sharp from "sharp";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const out = join(root, "public", "og.jpg");
const mark = join(root, "public", "logo-mark-light.png");

if (!existsSync(mark)) {
  throw new Error("public/logo-mark-light.png manquant — lancez d'abord: node scripts/make-logo-assets.mjs");
}

const BLUE_900 = "#0a2342";
const BLUE_700 = "#1b4a8f";
const CYAN = "#1188cc";
const CYAN_300 = "#5cc2ee";

// Le texte est tracé en SVG plutôt qu'en HTML : sharp rend le SVG sans
// navigateur. On s'en tient donc aux familles génériques, présentes partout.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${BLUE_900}"/>
      <stop offset="1" stop-color="${BLUE_700}"/>
    </linearGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0V48" fill="none" stroke="#ffffff" stroke-opacity="0.045" stroke-width="1"/>
    </pattern>
    <linearGradient id="glow" x1="1" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${CYAN}" stop-opacity="0.34"/>
      <stop offset="1" stop-color="${CYAN}" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <circle cx="1120" cy="70" r="420" fill="url(#glow)"/>

  <!-- Filet d'accent, repris de la charte du site -->
  <rect x="96" y="150" width="76" height="5" rx="2.5" fill="${CYAN_300}"/>

  <text x="96" y="252" font-family="Verdana, DejaVu Sans, sans-serif" font-size="76" font-weight="bold"
        fill="#ffffff" letter-spacing="2">BIM LEADERS</text>

  <text x="99" y="300" font-family="Verdana, DejaVu Sans, sans-serif" font-size="23"
        fill="${CYAN_300}" letter-spacing="11">SERVICES</text>

  <text x="96" y="392" font-family="Verdana, DejaVu Sans, sans-serif" font-size="41" font-weight="bold"
        fill="#ffffff">Construire avec vision.</text>

  <text x="96" y="452" font-family="Verdana, DejaVu Sans, sans-serif" font-size="24"
        fill="#ffffff" fill-opacity="0.76">Construction · BTP · BIM — Rabat, Maroc</text>

  <text x="96" y="516" font-family="Verdana, DejaVu Sans, sans-serif" font-size="21"
        fill="#ffffff" fill-opacity="0.6">Gros œuvre · Second œuvre · Lots techniques · VRD</text>

  <text x="96" y="566" font-family="Verdana, DejaVu Sans, sans-serif" font-size="21"
        fill="${CYAN_300}">bimleaders.ma</text>
</svg>`;

const symbole = await sharp(mark).resize({ width: 300, height: 300, fit: "inside" }).toBuffer();

await sharp(Buffer.from(svg))
  .composite([{ input: symbole, top: 165, left: 830 }])
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(out);

console.log("✓ public/og.jpg (1200×630)");
