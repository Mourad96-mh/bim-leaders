// Suite de tests de bout en bout de l'API BIM LEADERS — 65 assertions sur les
// quatre routeurs (auth, réalisations, demandes, envois) plus le CORS, la
// limitation de débit et la gestion d'erreurs.
//
// Usage :
//   1) npm start                       (dans un autre terminal)
//   2) npm run test:api
//
// ⚠️ REDÉMARRER L'API AVANT CHAQUE EXÉCUTION : le limiteur de débit est en
// mémoire, et la suite consomme volontairement le quota de /api/leads
// (5 dépôts par 15 min) pour vérifier que le 6e reçoit bien un 429. Relancée
// sans redémarrage, la section « demandes » échouerait sur des 429 prématurés.
//
// ⚠️ ÉCRIT DANS LA BASE POINTÉE PAR MONGODB_URI. La suite supprime tout ce
// qu'elle crée, mais ne la lancez jamais sur la base de production.
//
// Identifiants : variables ADMIN_EMAIL / ADMIN_PASSWORD, ou à défaut le
// fichier .admin-credentials.txt écrit à la création du compte.
import { readFileSync } from "node:fs";

const BASE = process.env.API_URL || "http://localhost:4000";

function identifiants() {
  if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
    return { email: process.env.ADMIN_EMAIL, mdp: process.env.ADMIN_PASSWORD };
  }
  try {
    const txt = readFileSync(".admin-credentials.txt", "utf8");
    return {
      email: txt.match(/E-mail *: *(.+)/)[1].trim(),
      mdp: txt.match(/Mot de passe *: *(.+)/)[1].trim(),
    };
  } catch {
    console.error(
      "Identifiants introuvables. Definissez ADMIN_EMAIL et ADMIN_PASSWORD, " +
        "ou creez le compte : npm run create-admin <email> <motdepasse>"
    );
    process.exit(1);
  }
}

const { email: EMAIL, mdp: MDP } = identifiants();

let ok = 0;
const echecs = [];
let section = "";

const titre = (t) => {
  section = t;
  console.log("\n\x1b[1m" + t + "\x1b[0m");
};

function verifier(nom, condition, detail = "") {
  if (condition) {
    ok++;
    console.log("  \x1b[32mOK\x1b[0m   " + nom);
  } else {
    echecs.push(section + " -> " + nom + (detail ? " : " + detail : ""));
    console.log("  \x1b[31mECHEC\x1b[0m " + nom + (detail ? "  \x1b[31m" + detail + "\x1b[0m" : ""));
  }
}

async function appel(chemin, { methode = "GET", corps, jeton, form, origine } = {}) {
  const headers = {};
  if (jeton) headers.Authorization = "Bearer " + jeton;
  if (corps && !form) headers["Content-Type"] = "application/json";
  if (origine) headers.Origin = origine;
  const res = await fetch(BASE + chemin, {
    method: methode,
    headers,
    body: form || (corps ? JSON.stringify(corps) : undefined),
  });
  let data = null;
  try {
    data = await res.json();
  } catch {
    /* réponse sans corps JSON */
  }
  return { statut: res.status, data };
}

const fichier = (nom, type, octets) =>
  new File([new Uint8Array(octets)], nom, { type });

// 1x1 px PNG valide, assez réel pour que Cloudinary l'accepte.
const PNG_1PX = Uint8Array.from(
  atob(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
  ),
  (c) => c.charCodeAt(0)
);

// ─────────────────────────────────────────────────────────── santé
titre("1. Sonde de santé");
{
  const r = await appel("/");
  verifier("GET / renvoie 200", r.statut === 200, "recu " + r.statut);
  verifier("base de donnees connectee", r.data?.base === "connectée", "recu " + r.data?.base);
}

// ─────────────────────────────────────────────────────────── auth
titre("2. Authentification");
let JETON = null;
{
  let r = await appel("/api/auth/login", { methode: "POST", corps: {} });
  verifier("login sans identifiants -> 422", r.statut === 422, "recu " + r.statut);

  r = await appel("/api/auth/login", { methode: "POST", corps: { email: EMAIL, password: "mauvais" } });
  verifier("mauvais mot de passe -> 401", r.statut === 401, "recu " + r.statut);
  const msgMdp = r.data?.message;

  r = await appel("/api/auth/login", { methode: "POST", corps: { email: "inconnu@nulle.part", password: "mauvais" } });
  verifier("compte inexistant -> 401", r.statut === 401, "recu " + r.statut);
  verifier(
    "message identique dans les deux cas (pas d'enumeration des comptes)",
    r.data?.message === msgMdp,
    JSON.stringify([msgMdp, r.data?.message])
  );

  r = await appel("/api/auth/login", { methode: "POST", corps: { email: EMAIL, password: MDP } });
  verifier("identifiants valides -> 200 + jeton", r.statut === 200 && !!r.data?.token, "recu " + r.statut);
  verifier("le hash du mot de passe n'est jamais renvoye", !JSON.stringify(r.data).includes("motDePasse"));
  JETON = r.data?.token;

  r = await appel("/api/auth/me");
  verifier("/me sans jeton -> 401", r.statut === 401, "recu " + r.statut);

  r = await appel("/api/auth/me", { jeton: "jeton.bidon.xyz" });
  verifier("/me avec jeton invalide -> 401", r.statut === 401, "recu " + r.statut);

  r = await appel("/api/auth/me", { jeton: JETON });
  verifier("/me avec jeton valide -> 200", r.statut === 200, "recu " + r.statut);
}

// ─────────────────────────────────────────── realisations : acces
titre("3. Realisations — controle d'acces");
{
  let r = await appel("/api/realisations");
  verifier("GET public -> 200 + liste", r.statut === 200 && Array.isArray(r.data?.items), "recu " + r.statut);

  r = await appel("/api/realisations?all=1");
  verifier("?all=1 sans jeton -> 401 (brouillons proteges)", r.statut === 401, "recu " + r.statut);

  r = await appel("/api/realisations", { methode: "POST", corps: { nom: "X" } });
  verifier("POST sans jeton -> 401", r.statut === 401, "recu " + r.statut);

  r = await appel("/api/realisations/000000000000000000000000", { methode: "DELETE" });
  verifier("DELETE sans jeton -> 401", r.statut === 401, "recu " + r.statut);
}

// ─────────────────────────────────────── realisations : ecriture
titre("4. Realisations — creation, slug, liste blanche");
let idPublie = null;
let idDoublon = null;
let idBrouillon = null;
{
  let r = await appel("/api/realisations", { methode: "POST", jeton: JETON, corps: { localisation: "Rabat" } });
  verifier("POST sans nom -> 422 + champ en erreur", r.statut === 422 && !!r.data?.errors?.nom, "recu " + r.statut);

  r = await appel("/api/realisations", {
    methode: "POST",
    jeton: JETON,
    corps: {
      nom: "Résidence Été — R+4",
      localisation: "Agdal, Rabat",
      type: "Résidentiel",
      annee: 2025,
      statut: "en-cours",
      publie: true,
      prestations: ["Gros oeuvre", "   "],
      role: "superadmin",
    },
  });
  verifier("POST valide -> 201", r.statut === 201, "recu " + r.statut);
  verifier("slug : accents translitteres", r.data?.slug === "residence-ete-r-4", "slug = " + r.data?.slug);
  verifier("prestations vides filtrees", r.data?.prestations?.length === 1, r.data?.prestations?.length + " conservee(s)");
  verifier("champ hors liste blanche ignore", r.data?.role === undefined, "role = " + r.data?.role);
  idPublie = r.data?._id;

  r = await appel("/api/realisations", { methode: "POST", jeton: JETON, corps: { nom: "Résidence Été — R+4" } });
  verifier("nom en double -> slug suffixe", r.data?.slug === "residence-ete-r-4-2", "slug = " + r.data?.slug);
  idDoublon = r.data?._id;

  r = await appel("/api/realisations", {
    methode: "POST",
    jeton: JETON,
    corps: { nom: "Chantier confidentiel", publie: false },
  });
  verifier("brouillon cree -> 201", r.statut === 201, "recu " + r.statut);
  idBrouillon = r.data?._id;

  r = await appel("/api/realisations");
  const slugsPublics = (r.data?.items || []).map((i) => i.slug);
  verifier("brouillon ABSENT de la liste publique", !slugsPublics.includes("chantier-confidentiel"), slugsPublics.join(", "));

  r = await appel("/api/realisations?all=1", { jeton: JETON });
  verifier(
    "brouillon PRESENT avec ?all=1 + jeton",
    (r.data?.items || []).some((i) => i.slug === "chantier-confidentiel")
  );

  r = await appel("/api/realisations/chantier-confidentiel");
  verifier("GET /:slug d'un brouillon -> 404", r.statut === 404, "recu " + r.statut);

  r = await appel("/api/realisations/residence-ete-r-4");
  verifier("GET /:slug publie -> 200", r.statut === 200, "recu " + r.statut);

  r = await appel("/api/realisations/slug-inexistant");
  verifier("GET /:slug inconnu -> 404", r.statut === 404, "recu " + r.statut);
}

// ─────────────────────────────────── realisations : modification
titre("5. Realisations — modification");
{
  let r = await appel("/api/realisations/" + idPublie, {
    methode: "PUT",
    jeton: JETON,
    corps: { videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", nom: "Nom change" },
  });
  verifier("PUT -> 200", r.statut === 200, "recu " + r.statut);
  verifier(
    "lien YouTube converti en URL d'integration",
    r.data?.videoUrl === "https://www.youtube.com/embed/dQw4w9WgXcQ",
    "recu " + r.data?.videoUrl
  );
  verifier("slug NON regenere au changement de nom (URL preservee)", r.data?.slug === "residence-ete-r-4", "slug = " + r.data?.slug);

  r = await appel("/api/realisations/" + idPublie, { methode: "PUT", jeton: JETON, corps: { videoUrl: "https://vimeo.com/123456789" } });
  verifier("lien Vimeo converti", r.data?.videoUrl === "https://player.vimeo.com/video/123456789", "recu " + r.data?.videoUrl);

  r = await appel("/api/realisations/identifiant-malforme", { methode: "PUT", jeton: JETON, corps: { nom: "X" } });
  verifier("PUT avec identifiant malforme -> 400", r.statut === 400, "recu " + r.statut);

  r = await appel("/api/realisations/64b7f9c2e1a2b3c4d5e6f7a8", { methode: "PUT", jeton: JETON, corps: { nom: "X" } });
  verifier("PUT sur identifiant inexistant -> 404", r.statut === 404, "recu " + r.statut);

  r = await appel("/api/realisations/" + idPublie, { methode: "PUT", jeton: JETON, corps: { statut: "invente" } });
  verifier("statut hors liste ignore", r.data?.statut !== "invente", "statut = " + r.data?.statut);
}

// ─────────────────────────────────────────────────────── uploads
titre("6. Envoi de photos (Cloudinary)");
let publicIdPhoto = null;
{
  let r = await appel("/api/uploads", { methode: "POST", form: new FormData() });
  verifier("upload sans jeton -> 401", r.statut === 401, "recu " + r.statut);

  r = await appel("/api/uploads", { methode: "POST", jeton: JETON, form: new FormData() });
  verifier("upload sans fichier -> 422", r.statut === 422, "recu " + r.statut);

  const fdTexte = new FormData();
  fdTexte.append("image", fichier("virus.txt", "text/plain", [65, 66, 67]));
  r = await appel("/api/uploads", { methode: "POST", jeton: JETON, form: fdTexte });
  verifier("format non image refuse -> 400", r.statut === 400, "recu " + r.statut);

  const fdGros = new FormData();
  fdGros.append("image", new File([new Uint8Array(13 * 1024 * 1024)], "enorme.png", { type: "image/png" }));
  r = await appel("/api/uploads", { methode: "POST", jeton: JETON, form: fdGros });
  verifier("image > 12 Mo refusee -> 400", r.statut === 400, "recu " + r.statut);

  const fdOk = new FormData();
  fdOk.append("image", new File([PNG_1PX], "photo.png", { type: "image/png" }));
  r = await appel("/api/uploads", { methode: "POST", jeton: JETON, form: fdOk });
  verifier("image valide -> 201 + URL Cloudinary", r.statut === 201 && /res\.cloudinary\.com/.test(r.data?.url || ""), "recu " + r.statut);
  verifier("rangee dans le dossier du projet", (r.data?.publicId || "").startsWith("bim-leaders/realisations"), r.data?.publicId);
  publicIdPhoto = r.data?.publicId;
}

// ───────────────────────────────────────────── demandes (leads)
// ATTENTION : POST /api/leads est limite a 5 requetes / 15 min et par IP.
// L'ordre ci-dessous consomme exactement 5 requetes, la 6e valide le 429.
titre("7. Demandes — depot public");
let idLead = null;
{
  // (1/5) demande valide, deposee depuis l'arbre anglais du site.
  let r = await appel("/api/leads", {
    methode: "POST",
    corps: { nom: "Client Test", telephone: "0642485076", email: "client@example.com", message: "Projet de villa a Rabat.", type: "contact", langue: "en" },
  });
  verifier("demande valide -> 201", r.statut === 201, "recu " + r.statut);

  // (2/5) piege a robots
  const avant = (await appel("/api/leads", { jeton: JETON })).data?.items?.length ?? -1;
  r = await appel("/api/leads", {
    methode: "POST",
    corps: { nom: "Robot", telephone: "0600000000", email: "bot@spam.net", message: "spam", siteWeb: "http://spam.net" },
  });
  const apres = (await appel("/api/leads", { jeton: JETON })).data?.items?.length ?? -2;
  verifier("piege a robots -> 200 (le robot croit avoir reussi)", r.statut === 200, "recu " + r.statut);
  verifier("...mais RIEN n'est enregistre en base", avant === apres, avant + " -> " + apres);

  // (3/5) envoi trop rapide
  r = await appel("/api/leads", {
    methode: "POST",
    corps: { nom: "Trop vite", telephone: "0600000000", email: "a@b.co", message: "x", ouvertDepuis: "500" },
  });
  verifier("formulaire rempli en moins de 3 s -> 400", r.statut === 400, "recu " + r.statut);

  // (4/5) champs manquants
  r = await appel("/api/leads", { methode: "POST", corps: { nom: "Sans contact" } });
  verifier("champs obligatoires manquants -> 422", r.statut === 422, "recu " + r.statut);
  verifier(
    "erreurs detaillees champ par champ",
    !!(r.data?.errors?.telephone && r.data?.errors?.email && r.data?.errors?.message),
    Object.keys(r.data?.errors || {}).join(", ")
  );

  // (5/5) email invalide, formulaire anglais.
  // Le site etant bilingue, l'erreur doit revenir dans la langue de la page :
  // un formulaire traduit qui repond en francais ne sert a rien.
  r = await appel("/api/leads", {
    methode: "POST",
    corps: { nom: "Mauvais mail", telephone: "0642485076", email: "pas-un-email", message: "x", langue: "en" },
  });
  verifier("email malforme -> 422", r.statut === 422 && !!r.data?.errors?.email, "recu " + r.statut);
  verifier(
    "...et l'erreur revient en anglais",
    /look right/i.test(r.data?.errors?.email || ""),
    r.data?.errors?.email
  );
}

titre("8. Demandes — consultation (dashboard)");
{
  let r = await appel("/api/leads");
  verifier("GET sans jeton -> 401", r.statut === 401, "recu " + r.statut);

  r = await appel("/api/leads", { jeton: JETON });
  verifier("GET avec jeton -> 200", r.statut === 200, "recu " + r.statut);
  verifier("compteur de non-lues present", typeof r.data?.nonLues === "number", "nonLues = " + r.data?.nonLues);
  idLead = r.data?.items?.[0]?._id;
  verifier("la demande valide est bien enregistree", !!idLead);
  // On affiche l'adresse retenue : derriere Cloudflare, c'est le seul moyen de
  // voir d'un coup d'oeil si c'est bien le visiteur et non un relais
  // (cf. le middleware req.clientIp dans src/index.js).
  verifier("l'IP de l'auteur est tracee", !!r.data?.items?.[0]?.ip, "");
  // La langue de depot est conservee : c'est elle qui dit au gerant dans quelle
  // langue rappeler le prospect.
  verifier(
    "la langue de la demande est conservee",
    r.data?.items?.[0]?.langue === "en",
    "langue = " + r.data?.items?.[0]?.langue
  );
  console.log("         adresse enregistree : " + r.data?.items?.[0]?.ip);

  r = await appel("/api/leads/" + idLead, { methode: "PUT", jeton: JETON, corps: { statut: "inconnu" } });
  verifier("statut hors liste -> 422", r.statut === 422, "recu " + r.statut);

  r = await appel("/api/leads/" + idLead, { methode: "PUT", jeton: JETON, corps: { statut: "lu" } });
  verifier("passage a « lu » -> 200", r.statut === 200 && r.data?.statut === "lu", "recu " + r.statut);

  r = await appel("/api/leads/64b7f9c2e1a2b3c4d5e6f7a8", { methode: "PUT", jeton: JETON, corps: { statut: "lu" } });
  verifier("PUT sur demande inexistante -> 404", r.statut === 404, "recu " + r.statut);
}

titre("9. Limitation de debit");
{
  // 6e requete sur /api/leads dans la fenetre de 15 min.
  const r = await appel("/api/leads", {
    methode: "POST",
    corps: { nom: "Sixieme", telephone: "0642485076", email: "six@example.com", message: "test" },
  });
  verifier("6e depot en 15 min -> 429", r.statut === 429, "recu " + r.statut);
  verifier("message d'attente explicite", /minute/i.test(r.data?.message || ""), r.data?.message);
}

titre("10. CORS et routes inconnues");
{
  // Par defaut on exige un CORS restreint : c'est l'etat correct en production.
  // CORS_OUVERT=1 pour une instance ou CORS_ORIGIN n'est pas encore defini
  // (l'API accepte alors toutes les origines, cf. src/index.js).
  let r = await appel("/api/realisations", { origine: "https://site-pirate.example" });
  if (process.env.CORS_OUVERT === "1") {
    console.log("  \x1b[33mNOTE\x1b[0m  CORS volontairement ouvert (CORS_ORIGIN non defini) -> " + r.statut);
    verifier("l'API repond bien malgre une origine inconnue", r.statut === 200, "recu " + r.statut);
  } else {
    verifier("origine non autorisee -> 403", r.statut === 403, "recu " + r.statut + " — CORS_ORIGIN est-il defini ?");
  }

  // L'origine autorisee depend de l'instance : les localhost en developpement,
  // le domaine du site en production. D'ou la variable plutot qu'une valeur en
  // dur, qui faisait echouer la suite contre Render.
  const origineOk = process.env.ORIGINE_AUTORISEE || "http://localhost:3000";
  r = await appel("/api/realisations", { origine: origineOk });
  verifier("origine autorisee (" + origineOk + ") -> 200", r.statut === 200, "recu " + r.statut);

  r = await appel("/api/route-qui-nexiste-pas");
  verifier("route inconnue -> 404", r.statut === 404, "recu " + r.statut);
}

// ─────────────────────────────────────────────────────── menage
titre("11. Suppression et menage");
{
  let r = await appel("/api/realisations/" + idPublie, { methode: "DELETE", jeton: JETON });
  verifier("DELETE realisation -> 200", r.statut === 200, "recu " + r.statut);

  r = await appel("/api/realisations/" + idPublie, { methode: "DELETE", jeton: JETON });
  verifier("DELETE repete -> 404", r.statut === 404, "recu " + r.statut);

  for (const id of [idDoublon, idBrouillon]) {
    await appel("/api/realisations/" + id, { methode: "DELETE", jeton: JETON });
  }
  r = await appel("/api/leads/" + idLead, { methode: "DELETE", jeton: JETON });
  verifier("DELETE demande -> 200", r.statut === 200, "recu " + r.statut);

  r = await appel("/api/realisations?all=1", { jeton: JETON });
  verifier("plus aucune realisation en base", r.data?.items?.length === 0, r.data?.items?.length + " restante(s)");

  r = await appel("/api/leads", { jeton: JETON });
  verifier("plus aucune demande en base", r.data?.items?.length === 0, r.data?.items?.length + " restante(s)");
}

console.log("\n" + "=".repeat(64));
console.log("\x1b[1m" + ok + " tests reussis, " + echecs.length + " echoues\x1b[0m");
if (echecs.length) {
  console.log("\n\x1b[31mEchecs :\x1b[0m");
  echecs.forEach((e) => console.log("  - " + e));
}
// La photo de test reste sur Cloudinary : elle n'est rattachee a aucune fiche,
// donc aucune route ne la supprimerait. On la signale pour le menage final.
console.log("\nPhoto de test a supprimer sur Cloudinary : " + publicIdPhoto);
process.exit(echecs.length ? 1 : 0);
