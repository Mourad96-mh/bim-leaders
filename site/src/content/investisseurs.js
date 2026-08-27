// §10 et §10 bis du cahier des charges — rubrique Investisseurs.
//
// Deux blocs distincts, et le cahier insiste sur la distinction (§10 bis.1) :
//   1. ACCOMPAGNEMENT  — la prestation de service (étude → livraison)
//   2. OPPORTUNITÉS    — les projets propres de BIM Leaders qui cherchent un
//                        financement. À NE PAS CONFONDRE avec « Réalisations »,
//                        qui ne présente que des projets réalisés ou en cours.

export const INVESTISSEURS = {
  hero: {
    eyebrow: "Investisseurs",
    title: "Votre projet immobilier, de l'idée à la réalisation.",
    text: "BIM Leaders accompagne les investisseurs dans le développement et la réalisation de projets immobiliers, de l'étude initiale à la livraison.",
    cta: { label: "Présenter mon projet", href: "/contact/?sujet=projet-investisseur" },
  },

  // §10.1 — le positionnement à faire passer.
  positioning:
    "BIM Leaders se présente aux investisseurs et porteurs de projets immobiliers comme un partenaire technique et opérationnel, capable d'intervenir sur l'ensemble du cycle du projet.",

  // §10.2 — les onze étapes du parcours, dans l'ordre du cahier.
  prestations: [
    "Analyse du projet",
    "Étude de faisabilité",
    "Conception",
    "Modélisation BIM",
    "Coordination",
    "Estimation des quantités",
    "Estimation budgétaire",
    "Planification",
    "Réalisation",
    "Suivi de chantier",
    "Contrôle qualité",
    "Livraison",
  ],

  // §10.3 — message et CTA repris du cahier.
  message:
    "BIM Leaders accompagne les investisseurs dans le développement de projets immobiliers en combinant expertise de construction, coordination technique et approche BIM.",
  cta: { label: "Présenter mon projet", href: "/contact/?sujet=projet-investisseur" },

  // §29 — parcours client « Investisseur ».
  journey: [
    "Opportunité",
    "Faisabilité",
    "Conception",
    "BIM",
    "Budget",
    "Planification",
    "Construction",
    "Suivi",
    "Livraison",
  ],

  // §10 bis.6 — le cycle complet à afficher en bas de la rubrique.
  cycle: ["Étude", "Conception", "BIM", "Recherche de financement", "Construction", "Livraison"],

  metaTitle: "Accompagnement des investisseurs immobiliers — BIM Leaders",
  metaDescription:
    "BIM Leaders accompagne investisseurs et promoteurs de l'étude de faisabilité à la livraison : conception, modélisation BIM, estimation budgétaire, réalisation et suivi de chantier.",
};

// §10 bis.3 — statuts possibles d'une opportunité. La clé sert de valeur stockée,
// `label` s'affiche en badge, `tone` pilote la couleur (cf. globals.css .badge--*).
export const OPPORTUNITY_STATUSES = [
  { key: "preparation", label: "Projet en préparation", tone: "neutral" },
  { key: "recherche-investisseur", label: "Recherche d'investisseur", tone: "accent" },
  { key: "partenaire-financier", label: "Partenaire financier recherché", tone: "accent" },
  { key: "financement-en-cours", label: "Financement en cours", tone: "warn" },
  { key: "finance", label: "Projet financé", tone: "ok" },
  { key: "developpement", label: "Projet en développement", tone: "ok" },
];

export const statusOf = (key) =>
  OPPORTUNITY_STATUSES.find((s) => s.key === key) || OPPORTUNITY_STATUSES[0];

export const OPPORTUNITES_INTRO = {
  title: "Opportunités d'investissement",
  text: "BIM Leaders développe également certains projets immobiliers en propre ou en partenariat, préparés en amont à travers des études, une conception préliminaire, une modélisation BIM, une estimation budgétaire et une étude de faisabilité. Certains de ces projets peuvent être proposés à des investisseurs ou partenaires financiers.",
  // Rappel de la distinction imposée par §10 bis.1.
  note: "Cette rubrique est distincte de la page « Réalisations », qui présente uniquement les projets déjà réalisés ou en cours de réalisation.",
};

// ---------------------------------------------------------------------------
// LES OPPORTUNITÉS ELLES-MÊMES
//
// Éditées ici (choix validé avec le client : le dashboard ne gère que les
// Réalisations). Ajouter une opportunité = ajouter un objet ; la page et le
// sitemap suivent automatiquement.
//
// --- PLACEHOLDER : aucune opportunité réelle n'a encore été communiquée. ---
// Le tableau est VIDE volontairement : la page affiche alors un message
// « aucune opportunité ouverte actuellement » plutôt que de faux projets.
// Ne jamais publier d'opportunité fictive : ce sont des informations
// financières présentées à des investisseurs.
//
// Modèle d'un objet complet (§10 bis.2) :
//   {
//     slug: "residence-agdal-r4",
//     nom: "Résidence Agdal R+4",
//     localisation: "Agdal, Rabat",
//     typeProjet: "Immeuble résidentiel",
//     surfaceTerrain: "620 m²",
//     configuration: "R+4 + 2 sous-sols",
//     surfaceDeveloppee: "3 100 m²",
//     nbLogements: 18,
//     etatAvancement: "Études préliminaires achevées",
//     etudesRealisees: ["Étude de faisabilité", "Conception préliminaire", "Modélisation BIM"],
//     statut: "recherche-investisseur",
//     images: ["opp-agdal-1", "opp-agdal-2"],
//   }
// ---------------------------------------------------------------------------
export const OPPORTUNITES = [];

// §10 bis.4 — ce que contient le dossier investisseur transmis APRÈS
// qualification du prospect. Volontairement pas publié sur le site : la page
// liste ces éléments pour donner envie de demander le dossier.
export const DOSSIER_CONTENU = [
  "Présentation complète du projet",
  "Études disponibles",
  "Plans et conception",
  "Données BIM",
  "Budget prévisionnel",
  "Besoin de financement",
  "Calendrier prévisionnel",
  "Hypothèses financières",
  "Modalités envisagées de partenariat",
];

// §10 bis.5 — types de collaboration proposés dans le formulaire investisseur.
export const TYPES_COLLABORATION = [
  "Investissement financier",
  "Co-investissement",
  "Joint-venture",
  "Financement de projet",
  "Acquisition d'un projet",
  "Autre",
];

// Fourchettes proposées dans le formulaire (§10 bis.5).
export const FOURCHETTES_INVESTISSEMENT = [
  "Moins de 1 MDH",
  "1 – 5 MDH",
  "5 – 10 MDH",
  "10 – 30 MDH",
  "Plus de 30 MDH",
  "À définir",
];
