// Snapshot de contenu au build — le pont entre l'API Render et l'export statique.
//
// POURQUOI : le site est exporté en statique (output: "export") et hébergé sur
// Hostinger. Il n'y a donc AUCUN rendu serveur au moment où un visiteur arrive :
// si les réalisations n'étaient chargées qu'en JavaScript côté client, Google
// indexerait des pages vides. On fige donc les données dans le HTML au build.
//
// COMMENT : ce script tourne en `prebuild` (cf. package.json), interroge l'API
// Express déployée sur Render et écrit src/lib/realisations.data.json. Les pages
// importent ce JSON, donc son contenu part dans le HTML généré. Après le
// chargement, lib/realisations.js rafraîchit la liste côté client pour afficher
// les ajouts faits depuis le dashboard entre deux builds.
//
// ⚠️ TOLÉRANCE À LA PANNE : le plan gratuit de Render met le service en veille
// après ~15 min d'inactivité ; le premier appel peut donc échouer ou traîner.
// En cas d'échec on CONSERVE le snapshot précédent et le build continue.
// Ne jamais transformer cet échec en `process.exit(1)` : cela rendrait toute
// mise en production dépendante du réveil d'un service tiers.

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "..", "src", "lib");
const OUT_FILE = join(OUT_DIR, "realisations.data.json");

// Lit .env.local à la main : ce script tourne AVANT next build, donc Next n'a
// pas encore chargé les variables d'environnement.
function loadEnv() {
  for (const name of [".env.local", ".env"]) {
    const file = join(__dirname, "..", name);
    if (!existsSync(file)) continue;
    for (const line of readFileSync(file, "utf8").split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
}

function keepPrevious(reason) {
  const had = existsSync(OUT_FILE);
  if (had) {
    const n = JSON.parse(readFileSync(OUT_FILE, "utf8")).length;
    console.warn(`⚠️  ${reason} — snapshot précédent conservé (${n} réalisation(s)).`);
  } else {
    mkdirSync(OUT_DIR, { recursive: true });
    writeFileSync(OUT_FILE, "[]\n");
    console.warn(`⚠️  ${reason} — aucun snapshot existant, écriture d'une liste vide.`);
  }
  process.exit(0);
}

loadEnv();
const API = (process.env.CONTENT_API_URL || process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");

if (!API) keepPrevious("CONTENT_API_URL non défini");

// Render peut mettre ~50 s à sortir de veille : on laisse 60 s, avec une
// deuxième tentative (la première sert souvent juste à réveiller le service).
async function fetchWithRetry(url, attempts = 2, timeoutMs = 60_000) {
  let lastError;
  for (let i = 1; i <= attempts; i++) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), timeoutMs);
    try {
      const res = await fetch(url, { signal: ctrl.signal, headers: { accept: "application/json" } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      lastError = err;
      console.warn(`   tentative ${i}/${attempts} échouée (${err.message})`);
    } finally {
      clearTimeout(timer);
    }
  }
  throw lastError;
}

console.log(`→ Snapshot des réalisations depuis ${API}/api/realisations`);

try {
  const data = await fetchWithRetry(`${API}/api/realisations`);
  const list = Array.isArray(data) ? data : data.items || [];
  // On ne garde que le publié : le dashboard peut contenir des brouillons.
  const published = list.filter((r) => r.publie !== false);
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_FILE, JSON.stringify(published, null, 2) + "\n");
  console.log(`✓ ${published.length} réalisation(s) figée(s) dans src/lib/realisations.data.json`);
} catch (err) {
  keepPrevious(`API injoignable (${err.message})`);
}
