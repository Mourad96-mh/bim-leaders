// §10 et §10 bis du cahier des charges — rubrique Investisseurs.
//
// Deux blocs distincts, et le cahier insiste sur la distinction (§10 bis.1) :
//   1. ACCOMPAGNEMENT  — la prestation de service (étude → livraison)
//   2. OPPORTUNITÉS    — les projets propres de BIM Leaders qui cherchent un
//                        financement. À NE PAS CONFONDRE avec « Réalisations »,
//                        qui ne présente que des projets réalisés ou en cours.

const FR = {
  hero: {
    eyebrow: "Investisseurs",
    title: "Votre projet immobilier, de l'idée à la réalisation.",
    text: "BIM Leaders accompagne les investisseurs dans le développement et la réalisation de projets immobiliers, de l'étude initiale à la livraison.",
  },

  // §10.1 — le positionnement à faire passer.
  positioning:
    "BIM Leaders se présente aux investisseurs et porteurs de projets immobiliers comme un partenaire technique et opérationnel, capable d'intervenir sur l'ensemble du cycle du projet.",

  // §10.2 — les douze étapes du parcours, dans l'ordre du cahier.
  prestationsHead: {
    eyebrow: "Notre périmètre",
    title: "De l'analyse initiale à la livraison",
  },
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
  cta: "Présenter mon projet",

  // §29 — parcours client « Investisseur ».
  journeyHead: {
    eyebrow: "Le parcours",
    title: "Un seul partenaire technique sur tout le cycle",
  },
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

  // Passerelle vers les opportunités (§10 bis).
  duo: {
    haveTitle: "Vous avez un projet",
    haveText:
      "Terrain, programme ou simple intention : nous étudions la faisabilité, concevons, modélisons, chiffrons et réalisons.",
    seekTitle: "Vous cherchez un projet",
    seekText:
      "BIM Leaders développe aussi ses propres projets immobiliers, déjà étudiés et modélisés, ouverts à des investisseurs ou partenaires financiers.",
    seekCta: "Voir les opportunités",
  },

  // §10 bis.6 — le cycle complet à afficher en bas de la rubrique.
  cycleHead: {
    eyebrow: "Constructeur et développeur",
    title: "Un cycle complet, financement compris",
    text: "BIM Leaders n'intervient pas seulement en exécution : l'entreprise prépare, conçoit, modélise et peut rechercher le financement d'un projet.",
  },
  cycle: ["Étude", "Conception", "BIM", "Recherche de financement", "Construction", "Livraison"],

  metaTitle: "Accompagnement des investisseurs immobiliers — BIM Leaders",
  metaDescription:
    "BIM Leaders accompagne investisseurs et promoteurs de l'étude de faisabilité à la livraison : conception, modélisation BIM, estimation budgétaire, réalisation et suivi de chantier.",

  ldName: "Accompagnement des investisseurs immobiliers",
  ldType: "Développement et réalisation de projets immobiliers",
  ldAudience: "Investisseurs et promoteurs immobiliers",
};

const EN = {
  hero: {
    eyebrow: "Investors",
    title: "Your property project, from idea to delivery.",
    text: "BIM Leaders supports investors in developing and delivering property projects, from the first study through to handover.",
  },

  positioning:
    "To investors and property project sponsors, BIM Leaders is a technical and operational partner able to step in at any point across the full life of a project.",

  prestationsHead: {
    eyebrow: "Our scope",
    title: "From first analysis to handover",
  },
  prestations: [
    "Project analysis",
    "Feasibility study",
    "Design",
    "BIM modelling",
    "Coordination",
    "Quantity take-off",
    "Budget estimating",
    "Programming",
    "Construction",
    "Site supervision",
    "Quality control",
    "Handover",
  ],

  message:
    "BIM Leaders supports investors in developing property projects by combining construction expertise, technical coordination and a BIM-led approach.",
  cta: "Present my project",

  journeyHead: {
    eyebrow: "The journey",
    title: "One technical partner across the whole cycle",
  },
  journey: [
    "Opportunity",
    "Feasibility",
    "Design",
    "BIM",
    "Budget",
    "Programme",
    "Construction",
    "Monitoring",
    "Handover",
  ],

  duo: {
    haveTitle: "You have a project",
    haveText:
      "A plot, a brief, or simply an intention: we study feasibility, design, model, price and build.",
    seekTitle: "You are looking for a project",
    seekText:
      "BIM Leaders also develops its own property projects — already studied and modelled — open to investors and financial partners.",
    seekCta: "See the opportunities",
  },

  cycleHead: {
    eyebrow: "Contractor and developer",
    title: "A complete cycle, funding included",
    text: "BIM Leaders does more than build: the company prepares, designs, models, and can go out and find the funding for a project.",
  },
  cycle: ["Study", "Design", "BIM", "Fundraising", "Construction", "Handover"],

  metaTitle: "Support for property investors — BIM Leaders",
  metaDescription:
    "BIM Leaders supports investors and developers from feasibility study to handover: design, BIM modelling, budget estimating, construction and site supervision.",

  ldName: "Support for property investors",
  ldType: "Property project development and delivery",
  ldAudience: "Property investors and developers",
};

const BY_LOCALE = { fr: FR, en: EN };

export const getInvestisseurs = (lang = "fr") => BY_LOCALE[lang] || FR;

// ---------------------------------------------------------------------------
// §10 bis.3 — statuts possibles d'une opportunité. La `key` est la valeur
// stockée, `tone` pilote la couleur (cf. globals.css .badge--*), et le libellé
// affiché est traduit.
// ---------------------------------------------------------------------------
export const OPPORTUNITY_STATUSES = [
  {
    key: "preparation",
    tone: "neutral",
    label: { fr: "Projet en préparation", en: "Project in preparation" },
  },
  {
    key: "recherche-investisseur",
    tone: "accent",
    label: { fr: "Recherche d'investisseur", en: "Seeking an investor" },
  },
  {
    key: "partenaire-financier",
    tone: "accent",
    label: { fr: "Partenaire financier recherché", en: "Financial partner sought" },
  },
  {
    key: "financement-en-cours",
    tone: "warn",
    label: { fr: "Financement en cours", en: "Funding under way" },
  },
  { key: "finance", tone: "ok", label: { fr: "Projet financé", en: "Project funded" } },
  {
    key: "developpement",
    tone: "ok",
    label: { fr: "Projet en développement", en: "Project in development" },
  },
];

export const statusOf = (key, lang = "fr") => {
  const s = OPPORTUNITY_STATUSES.find((x) => x.key === key) || OPPORTUNITY_STATUSES[0];
  return { key: s.key, tone: s.tone, label: s.label[lang] || s.label.fr };
};

const OPPORTUNITES_INTRO_FR = {
  eyebrow: "Investisseurs",
  title: "Opportunités d'investissement",
  text: "BIM Leaders développe également certains projets immobiliers en propre ou en partenariat, préparés en amont à travers des études, une conception préliminaire, une modélisation BIM, une estimation budgétaire et une étude de faisabilité. Certains de ces projets peuvent être proposés à des investisseurs ou partenaires financiers.",
  // Rappel de la distinction imposée par §10 bis.1.
  note: "Cette rubrique est distincte de la page « Réalisations », qui présente uniquement les projets déjà réalisés ou en cours de réalisation.",
  emptyTitle: "Aucune opportunité ouverte actuellement",
  emptyText:
    "Les projets en recherche de financement sont publiés ici dès qu'ils sont ouverts aux partenaires. Vous pouvez nous laisser vos coordonnées pour être informé des prochaines, ou nous présenter votre propre projet.",
  emptyCta: "Être informé des prochaines opportunités",
  specTerrain: "Terrain",
  specConfiguration: "Configuration",
  specSurface: "Surface développée",
  specLogements: "Logements / lots",
  progress: "État d'avancement :",
  askDossier: "Demander le dossier investisseur",
  dossierHead: {
    eyebrow: "Dossier investisseur",
    title: "Ce que vous recevez après qualification",
    text: "Les données financières détaillées ne sont pas publiées sur le site. Elles sont transmises directement aux partenaires intéressés.",
  },
  metaTitle: "Opportunités d'investissement immobilier",
  metaDescription:
    "Projets immobiliers développés par BIM Leaders et ouverts à des investisseurs ou partenaires financiers : études réalisées, modélisation BIM, estimation budgétaire et étude de faisabilité.",
};

const OPPORTUNITES_INTRO_EN = {
  eyebrow: "Investors",
  title: "Investment opportunities",
  text: "BIM Leaders also develops property projects of its own or in partnership, worked up in advance through studies, preliminary design, BIM modelling, budget estimating and a feasibility study. Some of these projects may be offered to investors or financial partners.",
  note: "This section is separate from the Projects page, which shows only schemes already completed or currently under construction.",
  emptyTitle: "No opportunities open at the moment",
  emptyText:
    "Projects seeking funding are published here as soon as they open to partners. You are welcome to leave us your details to hear about the next ones, or to present a project of your own.",
  emptyCta: "Hear about the next opportunities",
  specTerrain: "Plot area",
  specConfiguration: "Configuration",
  specSurface: "Gross floor area",
  specLogements: "Units",
  progress: "Stage reached:",
  askDossier: "Request the investor pack",
  dossierHead: {
    eyebrow: "Investor pack",
    title: "What you receive once qualified",
    text: "Detailed financial data is not published on the site. It goes directly to interested partners.",
  },
  metaTitle: "Property investment opportunities",
  metaDescription:
    "Property projects developed by BIM Leaders and open to investors or financial partners: completed studies, BIM modelling, budget estimates and feasibility studies.",
};

const INTRO_BY_LOCALE = { fr: OPPORTUNITES_INTRO_FR, en: OPPORTUNITES_INTRO_EN };
export const getOpportunitesIntro = (lang = "fr") =>
  INTRO_BY_LOCALE[lang] || OPPORTUNITES_INTRO_FR;

// ---------------------------------------------------------------------------
// LES OPPORTUNITÉS ELLES-MÊMES
//
// Éditées ici (choix validé avec le client : le dashboard ne gère que les
// Réalisations). Ajouter une opportunité = ajouter un objet ; la page et le
// sitemap suivent automatiquement, dans les deux langues.
//
// --- PLACEHOLDER : aucune opportunité réelle n'a encore été communiquée. ---
// Le tableau est VIDE volontairement : la page affiche alors un message
// « aucune opportunité ouverte actuellement » plutôt que de faux projets.
// Ne jamais publier d'opportunité fictive : ce sont des informations
// financières présentées à des investisseurs.
//
// Modèle d'un objet complet (§10 bis.2). Les champs de TEXTE prennent un objet
// { fr, en } ; les champs CHIFFRÉS restent des valeurs simples, une surface ne
// se traduisant pas. Si `en` manque, la page anglaise affiche le français —
// tolérable pour une donnée factuelle, à éviter pour une description :
//   {
//     slug: "residence-agdal-r4",
//     nom: { fr: "Résidence Agdal R+4", en: "Agdal G+4 Residence" },
//     localisation: { fr: "Agdal, Rabat", en: "Agdal, Rabat" },
//     typeProjet: { fr: "Immeuble résidentiel", en: "Residential building" },
//     surfaceTerrain: "620 m²",
//     configuration: { fr: "R+4 + 2 sous-sols", en: "G+4 + 2 basements" },
//     surfaceDeveloppee: "3 100 m²",
//     nbLogements: 18,
//     etatAvancement: {
//       fr: "Études préliminaires achevées",
//       en: "Preliminary studies complete",
//     },
//     etudesRealisees: {
//       fr: ["Étude de faisabilité", "Conception préliminaire", "Modélisation BIM"],
//       en: ["Feasibility study", "Preliminary design", "BIM modelling"],
//     },
//     statut: "recherche-investisseur",
//     images: ["opp-agdal-1", "opp-agdal-2"],
//   }
// ---------------------------------------------------------------------------
export const OPPORTUNITES = [];

/** Aplatit une opportunité dans une langue : { fr, en } → chaîne. */
export function localizeOpportunite(o, lang = "fr") {
  const pick = (v) => (v && typeof v === "object" && !Array.isArray(v) ? v[lang] ?? v.fr : v);
  const pickList = (v) => (Array.isArray(v) ? v : pick(v) || []);
  return {
    ...o,
    nom: pick(o.nom),
    localisation: pick(o.localisation),
    typeProjet: pick(o.typeProjet),
    configuration: pick(o.configuration),
    etatAvancement: pick(o.etatAvancement),
    etudesRealisees: pickList(o.etudesRealisees),
  };
}

// §10 bis.4 — ce que contient le dossier investisseur transmis APRÈS
// qualification du prospect. Volontairement pas publié sur le site : la page
// liste ces éléments pour donner envie de demander le dossier.
const DOSSIER_CONTENU_BY_LOCALE = {
  fr: [
    "Présentation complète du projet",
    "Études disponibles",
    "Plans et conception",
    "Données BIM",
    "Budget prévisionnel",
    "Besoin de financement",
    "Calendrier prévisionnel",
    "Hypothèses financières",
    "Modalités envisagées de partenariat",
  ],
  en: [
    "Full project presentation",
    "Studies available",
    "Drawings and design",
    "BIM data",
    "Forecast budget",
    "Funding requirement",
    "Indicative programme",
    "Financial assumptions",
    "Proposed partnership terms",
  ],
};
export const getDossierContenu = (lang = "fr") =>
  DOSSIER_CONTENU_BY_LOCALE[lang] || DOSSIER_CONTENU_BY_LOCALE.fr;

// ---------------------------------------------------------------------------
// §10 bis.5 — options du formulaire investisseur.
//
// ⚠️ `value` est ce qui PART VERS L'API et s'affiche dans le dashboard : il
// reste EN FRANÇAIS dans les deux langues, pour que le gérant lise des demandes
// homogènes quelle que soit la langue du visiteur. Seul `label` est traduit.
// ---------------------------------------------------------------------------
export const TYPES_COLLABORATION = [
  { value: "Investissement financier", label: { fr: "Investissement financier", en: "Financial investment" } },
  { value: "Co-investissement", label: { fr: "Co-investissement", en: "Co-investment" } },
  { value: "Joint-venture", label: { fr: "Joint-venture", en: "Joint venture" } },
  { value: "Financement de projet", label: { fr: "Financement de projet", en: "Project finance" } },
  { value: "Acquisition d'un projet", label: { fr: "Acquisition d'un projet", en: "Acquiring a project" } },
  { value: "Autre", label: { fr: "Autre", en: "Other" } },
];

export const FOURCHETTES_INVESTISSEMENT = [
  { value: "Moins de 1 MDH", label: { fr: "Moins de 1 MDH", en: "Under 1 million MAD" } },
  { value: "1 – 5 MDH", label: { fr: "1 – 5 MDH", en: "1 – 5 million MAD" } },
  { value: "5 – 10 MDH", label: { fr: "5 – 10 MDH", en: "5 – 10 million MAD" } },
  { value: "10 – 30 MDH", label: { fr: "10 – 30 MDH", en: "10 – 30 million MAD" } },
  { value: "Plus de 30 MDH", label: { fr: "Plus de 30 MDH", en: "Over 30 million MAD" } },
  { value: "À définir", label: { fr: "À définir", en: "To be defined" } },
];
