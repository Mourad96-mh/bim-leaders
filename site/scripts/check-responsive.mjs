// Vérifie le débordement horizontal RÉEL (mesure du DOM, pas capture d'écran)
// sur chaque page × chaque largeur, via CDP. Node 22 → WebSocket natif, zéro dépendance.
//
// ⚠️ Ne JAMAIS diagnostiquer un débordement depuis une capture Edge headless :
// elle rogne ~60px à droite, exactement là où se trouve le burger → faux
// positifs garantis. On mesure le DOM.
//
// On teste l'EXPORT STATIQUE (site/out/) servi par scripts/serve-out.mjs, et non
// le serveur de développement : c'est exactement ce qui sera livré à Hostinger,
// et cela évite de lancer un second "next dev" qui corromprait le .next partagé
// avec celui de l'utilisateur.
//
// Usage :
//   1) npm run build
//   2) node scripts/serve-out.mjs                        (port 4173)
//   3) msedge --headless --disable-gpu --remote-debugging-port=9222
//        --user-data-dir=<dossier temporaire> about:blank
//   4) node scripts/check-responsive.mjs
//
// Signale : scrollWidth > clientWidth, tout élément dépassant du viewport (avec
// son sélecteur), et les textes qui débordent de leur conteneur.
const PORT = process.env.CDP_PORT || 9222;
const BASE = process.env.BASE_URL || "http://localhost:4173";

const PAGES = [
  "/",
  "/construction/",
  "/construction/gros-oeuvre/",
  "/construction/climatisation-desenfumage/",
  "/bim/",
  "/particuliers/",
  "/investisseurs/",
  "/investisseurs/opportunites/",
  "/investisseurs/dossier/",
  "/realisations/",
  "/realisations/a-venir/",
  "/a-propos/",
  "/contact/",
  "/credits/",
  "/admin/",
];
const WIDTHS = [320, 360, 375, 390, 414, 480, 560, 640, 768, 820, 981, 1024, 1180, 1241, 1280, 1366, 1440, 1920];

const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
const page = list.find((t) => t.type === "page");
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));

let id = 0;
const pending = new Map();
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
};
// Une réponse CDP peut ne jamais arriver : si le contexte d'exécution est
// détruit par une navigation pendant l'évaluation, la commande reste sans
// réponse, et le script attendrait indéfiniment. Mieux vaut une ligne
// « probe failed » qu'un blocage.
const send = (method, params = {}, timeout = 15000) =>
  new Promise((res) => {
    const i = ++id;
    const timer = setTimeout(() => { pending.delete(i); res(null); }, timeout);
    pending.set(i, (m) => { clearTimeout(timer); res(m); });
    ws.send(JSON.stringify({ id: i, method, params }));
  });

await send("Page.enable");
await send("Runtime.enable");

const evaluate = async (expr) => {
  const r = await send("Runtime.evaluate", { expression: expr, returnByValue: true, awaitPromise: true });
  return r.result?.result?.value;
};

const PROBE = `(() => {
  const vw = document.documentElement.clientWidth;
  const doc = document.documentElement.scrollWidth;
  const bad = [];
  for (const el of document.querySelectorAll('body *')) {
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) continue;
    const st = getComputedStyle(el);
    if (st.position === 'fixed') continue;
    if (r.right > vw + 1 || r.left < -1) {
      const sel = el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\\s+/).slice(0,2).join('.') : '');
      bad.push(sel + ' [' + Math.round(r.left) + '→' + Math.round(r.right) + ']');
    }
  }
  // texte qui déborde de son conteneur (mots trop longs)
  const tiny = [...document.querySelectorAll('h1,h2,h3,p,a,span,button')]
    .filter(el => el.scrollWidth > el.clientWidth + 2 && el.clientWidth > 0 && getComputedStyle(el).overflowX !== 'auto')
    .slice(0,4)
    .map(el => el.tagName.toLowerCase() + '.' + String(el.className).split(' ')[0] + ' (' + el.scrollWidth + '>' + el.clientWidth + ')');
  return { vw, doc, overflow: doc - vw, bad: [...new Set(bad)].slice(0, 6), tiny };
})()`;

let problems = 0;
for (const path of PAGES) {
  const rows = [];
  for (const w of WIDTHS) {
    await send("Emulation.setDeviceMetricsOverride", {
      width: w, height: 900, deviceScaleFactor: 1, mobile: w < 768,
    });
    await send("Page.navigate", { url: BASE + path });
    // Les pages portent désormais des photos : on laisse la mise en page se
    // stabiliser un peu plus longtemps avant de mesurer.
    await new Promise((r) => setTimeout(r, 700));
    let res = await evaluate(PROBE);
    if (!res) { await new Promise((r) => setTimeout(r, 700)); res = await evaluate(PROBE); }
    if (!res) { rows.push(`${w}: probe failed`); continue; }
    if (res.overflow > 0 || res.bad.length || res.tiny.length) {
      problems++;
      rows.push(`  ⚠ ${w}px  overflow=${res.overflow}px  ${res.bad.join(" | ")}${res.tiny.length ? "  TEXT:" + res.tiny.join(",") : ""}`);
    }
  }
  console.log(`${path}  ${rows.length ? "\n" + rows.join("\n") : "✓ toutes largeurs OK"}`);
}
console.log(problems ? `\n${problems} combinaison(s) en défaut` : "\n✓ aucun débordement horizontal");
ws.close();
