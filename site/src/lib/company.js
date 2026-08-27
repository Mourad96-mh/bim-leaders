// Source unique de vérité pour l'identité de BIM LEADERS.
// Alimente : l'en-tête, le pied de page, les boutons d'appel/WhatsApp, la page
// contact, le JSON-LD LocalBusiness, le sitemap et les métadonnées.
//
// ✅ Toutes les valeurs ci-dessous proviennent des documents officiels du client
//    (Cahier des charges — Août 2026, et Offre de service BIM LEADERS).
//    Les rares champs encore à confirmer sont marqués « À CONFIRMER ».

export const COMPANY = {
  name: "BIM LEADERS",
  legalName: "SOCIETE BIM LEADERS SARL AU",
  // Domaine de production, sans slash final. Utilisé par les métadonnées, le
  // sitemap, robots.txt et le JSON-LD.
  siteUrl: "https://bimleaders.ma",

  // §28 du cahier des charges — message central de la marque.
  slogan: "Construire avec vision.",
  baseline:
    "BIM Leaders associe expertise de la construction, technologie BIM et accompagnement immobilier pour concevoir et réaliser des projets maîtrisés.",

  activity: "Entrepreneur de bâtiments & travaux publics",
  director: "Zakariae Oudagdaguene",
  directorRole: "Gérant",

  // Mentions légales (page À propos + pied de page).
  legal: {
    form: "SARL à Associé Unique",
    capital: "500 000,00 MAD",
    rc: "166803",
    rcCity: "Rabat",
    ice: "003242006000093",
  },

  phone: "0642485076",
  phoneDisplay: "+212 6 42 48 50 76",
  whatsapp: "212642485076",
  email: "bimleaders.services@gmail.com",

  address: {
    street: "Rue Al Achari, Imm 2, App 29",
    district: "Agdal",
    locality: "Rabat",
    region: "Rabat-Salé-Kénitra",
    country: "MA",
    countryName: "Maroc",
  },
  // --- À CONFIRMER : coordonnées GPS exactes du siège (Agdal, Rabat). ---
  // Valeurs provisoires centrées sur Agdal ; à ajuster depuis Google Maps avant
  // mise en ligne (elles pilotent le JSON-LD `geo` et la carte de la page contact).
  geo: { lat: 33.9955, lng: -6.8555 },
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Rue+Al+Achari+Agdal+Rabat",

  // --- À CONFIRMER : horaires réels. Provisoire, format lisible + JSON-LD. ---
  hours: [
    { days: "Lundi – Vendredi", time: "08h30 – 18h30" },
    { days: "Samedi", time: "09h00 – 13h00" },
  ],
  hoursLd: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:30", closes: "18:30" },
    { days: ["Saturday"], opens: "09:00", closes: "13:00" },
  ],

  // Zone d'intervention déclarée (JSON-LD `areaServed` + textes SEO).
  areaServed: ["Rabat", "Salé", "Témara", "Kénitra", "Casablanca", "Maroc"],

  // --- À CONFIRMER : profils sociaux officiels. Tableau vide = aucune icône
  // affichée et pas de `sameAs` dans le JSON-LD (mieux que de pointer à faux). ---
  social: [],
};

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

export const NAV = [
  { href: "/", label: "Accueil" },
  { href: "/construction/", label: "Construction" },
  { href: "/bim/", label: "BIM" },
  { href: "/particuliers/", label: "Particuliers" },
  { href: "/investisseurs/", label: "Investisseurs" },
  { href: "/realisations/", label: "Réalisations" },
  { href: "/a-propos/", label: "À propos" },
  { href: "/contact/", label: "Contact" },
];
