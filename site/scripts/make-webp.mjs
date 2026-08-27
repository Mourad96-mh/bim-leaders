// Optimise les photos sources de assets-src/ → public/img/ en WebP (principal)
// + JPG (repli). Les originaux restent HORS de public/ : seuls les dérivés sont
// versionnés et servis. Lancer : npm run media
//
// Chaque entrée produit une image aux dimensions EXACTES déclarées ici, qui sont
// aussi celles écrites en dur dans les attributs width/height du HTML
// (CardMedia.js, la photo du hero) : la place de l'image est réservée avant
// même son chargement, donc pas de saut de mise en page au chargement.
//
// `crop` est facultatif et exprimé en fractions de l'image source (0 → 1). Il
// s'applique AVANT le redimensionnement, pour recadrer ce que le cadrage
// automatique « cover » ne saurait pas viser (voir second-oeuvre).
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { mkdirSync } from "node:fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = join(__dirname, "..", "assets-src");
const OUT = join(__dirname, "..", "public", "img");
mkdirSync(OUT, { recursive: true });

// Le hero est en 8/5 (cf. .hero-photo dans globals.css), les cartes en 16/9
// (cf. .card-media, hauteur fixe et object-fit: cover).
const HERO = [1400, 875];
const CARD = [800, 450];

const CONFIG = [
  { src: "hero-chantier.jpg", out: "hero", size: HERO, position: "north" },

  { src: "gros-oeuvre.jpg", out: "svc-gros-oeuvre", size: CARD },
  // Recadré sur la main et le carreau : le seau et la bande adhésive de la
  // photo d'origine portent la marque d'un fabricant, hors sujet ici.
  {
    src: "second-oeuvre.jpg",
    out: "svc-second-oeuvre",
    size: CARD,
    crop: { left: 0, top: 0.36, width: 0.594, height: 0.5 },
  },
  { src: "electricite-plomberie.jpg", out: "svc-electricite-plomberie", size: CARD },
  { src: "climatisation-desenfumage.jpg", out: "svc-climatisation-desenfumage", size: CARD },
  { src: "amenagement-exterieur.jpg", out: "svc-amenagement-exterieur", size: CARD },
  { src: "assainissement-voirie.jpg", out: "svc-assainissement-voirie", size: CARD },
];

for (const { src, out, size, crop, position = "centre" } of CONFIG) {
  const input = sharp(join(SRC, src));
  let pipeline = input;

  if (crop) {
    const { width: w, height: h } = await input.metadata();
    pipeline = sharp(join(SRC, src)).extract({
      left: Math.round(crop.left * w),
      top: Math.round(crop.top * h),
      width: Math.round(crop.width * w),
      height: Math.round(crop.height * h),
    });
  }

  const resized = pipeline.resize(size[0], size[1], { fit: "cover", position });
  await resized.clone().webp({ quality: 74 }).toFile(join(OUT, `${out}.webp`));
  await resized.clone().jpeg({ quality: 80, mozjpeg: true }).toFile(join(OUT, `${out}.jpg`));
  console.log(`${out.padEnd(30)} ${size[0]}×${size[1]}  webp + jpg`);
}

console.log(`\n${CONFIG.length} images → public/img/ (webp + jpg pour chacune)`);
