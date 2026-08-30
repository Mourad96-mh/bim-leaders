// Source unique de vérité pour l'identité de BIM LEADERS.
// Alimente : l'en-tête, le pied de page, les boutons d'appel/WhatsApp, la page
// contact, le JSON-LD LocalBusiness, le sitemap et les métadonnées.
//
// ✅ Toutes les valeurs ci-dessous proviennent des documents officiels du client
//    (Cahier des charges — Août 2026, et Offre de service BIM LEADERS).
//    Les rares champs encore à confirmer sont marqués « À CONFIRMER ».
//
// SITE BILINGUE — deux exports, et la frontière entre eux compte :
//   • COMPANY       → les FAITS, identiques dans toutes les langues (numéro,
//                     ICE, RC, coordonnées GPS, horaires en chiffres…). Un
//                     numéro de téléphone ne se traduit pas.
//   • COMPANY_TEXT  → la PROSE de marque (slogan, baseline, activité) et les
//                     rares libellés qui accompagnent un fait — les jours
//                     d'ouverture, par exemple.
// Accès : `text(lang).slogan`.

export const COMPANY = {
  name: "BIM LEADERS",
  legalName: "SOCIETE BIM LEADERS SARL AU",
  // Domaine de production, sans slash final. Utilisé par les métadonnées, le
  // sitemap, robots.txt et le JSON-LD.
  siteUrl: "https://bimleaders.ma",

  director: "Zakariae Oudagdaguene",

  // Mentions légales (page À propos + pied de page).
  legal: {
    form: "SARL à Associé Unique",
    formEn: "Single-shareholder limited liability company (SARL AU)",
    capital: "500 000,00 MAD",
    rc: "166803",
    rcCity: "Rabat",
    ice: "003242006000093",
  },

  phone: "0629123053",
  phoneDisplay: "+212 6 29 12 30 53",
  whatsapp: "212629123053",
  email: "bimleaders.services@gmail.com",

  address: {
    street: "Rue Al Achari, Imm 2, App 29",
    district: "Agdal",
    locality: "Rabat",
    region: "Rabat-Salé-Kénitra",
    country: "MA",
  },
  // --- À CONFIRMER : coordonnées GPS exactes du siège (Agdal, Rabat). ---
  // Valeurs provisoires centrées sur Agdal ; à ajuster depuis Google Maps avant
  // mise en ligne (elles pilotent le JSON-LD `geo` et la carte de la page contact).
  geo: { lat: 33.9955, lng: -6.8555 },
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Rue+Al+Achari+Agdal+Rabat",

  // --- À CONFIRMER : horaires réels. Provisoire. ---
  // Les HEURES vivent ici (elles ne se traduisent pas) ; les LIBELLÉS de jours
  // sont dans COMPANY_TEXT, appariés par `key`.
  hours: [
    { key: "weekdays", time: "08h30 – 18h30", timeEn: "8:30 am – 6:30 pm" },
    { key: "saturday", time: "09h00 – 13h00", timeEn: "9:00 am – 1:00 pm" },
  ],
  hoursLd: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:30", closes: "18:30" },
    { days: ["Saturday"], opens: "09:00", closes: "13:00" },
  ],

  // Zone d'intervention déclarée (JSON-LD `areaServed` + textes SEO).
  // Ce sont des noms de villes : identiques dans les deux langues.
  areaServed: ["Rabat", "Salé", "Témara", "Kénitra", "Casablanca", "Maroc"],
  areaServedEn: ["Rabat", "Salé", "Témara", "Kénitra", "Casablanca", "Morocco"],

  // --- À CONFIRMER : profils sociaux officiels. Tableau vide = aucune icône
  // affichée et pas de `sameAs` dans le JSON-LD (mieux que de pointer à faux). ---
  social: [],
};

const TEXT_FR = {
  // §28 du cahier des charges — message central de la marque.
  slogan: "Construire avec vision.",
  baseline:
    "BIM Leaders associe expertise de la construction, technologie BIM et accompagnement immobilier pour concevoir et réaliser des projets maîtrisés.",
  activity: "Entrepreneur de bâtiments & travaux publics",
  directorRole: "Gérant",
  legalForm: COMPANY.legal.form,
  countryName: "Maroc",
  areaServed: COMPANY.areaServed,
  hourDays: { weekdays: "Lundi – Vendredi", saturday: "Samedi" },
  // Description longue du JSON-LD GeneralContractor.
  businessDescription:
    "Entreprise marocaine de bâtiment et travaux publics à Rabat : gros œuvre, second œuvre, électricité, plomberie, climatisation, désenfumage, aménagement extérieur, assainissement et voirie. Approche BIM et accompagnement des projets immobiliers.",
  offerCatalog: "Construction & services",
  ogImageAlt: "BIM Leaders — construction, BTP et BIM au Maroc",
  keywords: [
    "BIM Leaders",
    "entreprise de construction Rabat",
    "entreprise BTP Maroc",
    "travaux de bâtiment Rabat",
    "gros œuvre Rabat",
    "second œuvre",
    "électricité plomberie bâtiment",
    "climatisation désenfumage",
    "assainissement voirie VRD",
    "BIM Maroc",
    "construction maison Maroc",
    "construction immeuble Rabat",
    "étude de terrain avant achat",
    "potentiel constructible terrain",
    "projet immobilier investisseur Maroc",
    "développement immobilier Rabat",
  ],
};

const TEXT_EN = {
  slogan: "Building with vision.",
  baseline:
    "BIM Leaders brings together construction expertise, BIM technology and property development support to design and deliver projects that stay under control.",
  activity: "Building & civil engineering contractor",
  directorRole: "Managing director",
  legalForm: COMPANY.legal.formEn,
  countryName: "Morocco",
  areaServed: COMPANY.areaServedEn,
  hourDays: { weekdays: "Monday – Friday", saturday: "Saturday" },
  businessDescription:
    "Moroccan building and civil engineering contractor based in Rabat: structural works, finishing works, electrical, plumbing, air conditioning, smoke extraction, external works, drainage and roadworks. BIM-led delivery and support for property projects.",
  offerCatalog: "Construction & services",
  ogImageAlt: "BIM Leaders — construction, civil engineering and BIM in Morocco",
  keywords: [
    "BIM Leaders",
    "construction company Rabat",
    "building contractor Morocco",
    "civil engineering Morocco",
    "structural works Rabat",
    "finishing works Morocco",
    "building electrical and plumbing",
    "HVAC smoke extraction",
    "drainage and roadworks",
    "BIM Morocco",
    "build a house in Morocco",
    "apartment building construction Rabat",
    "plot study before buying",
    "development potential of a plot",
    "property investment Morocco",
    "property development Rabat",
  ],
};

const TEXT_BY_LOCALE = { fr: TEXT_FR, en: TEXT_EN };

/** Prose de marque dans une langue. `text("en").slogan` → "Building with vision." */
export const text = (lang = "fr") => TEXT_BY_LOCALE[lang] || TEXT_FR;

/** Horaires prêts à afficher : jours traduits + heures au format local. */
export const openingHours = (lang = "fr") =>
  COMPANY.hours.map((h) => ({
    days: text(lang).hourDays[h.key],
    time: lang === "en" ? h.timeEn : h.time,
  }));

// +212... au format tel: — Google et les navigateurs attendent l'international.
export function telHref(local = COMPANY.phone) {
  return `+212${local.replace(/\D/g, "").replace(/^0/, "")}`;
}

// Lien WhatsApp avec message pré-rempli.
// ⚠️ Ne jamais passer ce lien dans esc_url côté serveur : les retours à la ligne
// encodés (%0A) y survivent mal. Ici on reste côté React, donc c'est sûr.
export function whatsappHref(message) {
  const base = `https://wa.me/${COMPANY.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
