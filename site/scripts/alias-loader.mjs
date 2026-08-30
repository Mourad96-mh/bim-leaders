// Résolveur minimal de l'alias `@/` pour les scripts Node.
//
// Les fichiers de src/ s'importent entre eux avec `@/lib/company`, alias défini
// dans jsconfig.json et compris par Next — mais pas par Node lancé à la main.
// Ce hook le traduit en chemin de fichier, ce qui permet à
// scripts/check-i18n.mjs d'importer les vrais modules de contenu plutôt que
// d'en relire le texte à coups d'expressions régulières.
//
// Deux détails que Next fait pour nous et qu'il faut refaire ici :
//   • l'EXTENSION est facultative dans le code (`@/content/services`) alors que
//     Node l'exige ;
//   • le package.json n'a pas de `"type": "module"`, donc Node prend chaque .js
//     de src/ pour du CommonJS, le reparse en ESM et le signale bruyamment à
//     chaque fichier. On lui annonce le format directement.

import { existsSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const SRC = join(dirname(fileURLToPath(import.meta.url)), "..", "src");

export async function resolve(specifier, context, nextResolve) {
  if (!specifier.startsWith("@/")) return nextResolve(specifier, context);

  let target = join(SRC, specifier.slice(2));
  if (!existsSync(target)) {
    for (const ext of [".js", ".mjs", ".json", "/index.js"]) {
      if (existsSync(`${target}${ext}`)) {
        target = `${target}${ext}`;
        break;
      }
    }
  }

  const resolved = await nextResolve(pathToFileURL(target).href, context);
  return target.endsWith(".json") ? resolved : { ...resolved, format: "module" };
}
