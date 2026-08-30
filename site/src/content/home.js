// §6 du cahier des charges — page d'accueil.
// Les titres, messages et libellés de boutons français ci-dessous sont ceux
// PROPOSÉS PAR LE CLIENT dans le cahier (§6.1 à §6.8). Ils ont été repris à
// l'identique partout où le document en donnait la formulation exacte.
//
// La version anglaise est une ADAPTATION, pas un calque : les mêmes arguments,
// dans une langue commerciale anglaise naturelle. Les `href` sont absents de ce
// fichier — les liens se construisent avec lib/i18n.js, qui sait produire l'URL
// de chaque page dans chaque langue.

import { text } from "@/lib/company";

const FR = {
  // §6.1 — section hero.
  hero: {
    eyebrow: "Entrepreneur de bâtiments & travaux publics",
    title: "Construire avec vision.",
    subtitle: text("fr").baseline,
    ctaPrimary: "Demander un devis",
    ctaSecondary: "Découvrir nos réalisations",
    // Gages de confiance affichés sous les boutons.
    trust: ["Tous corps d'état", "Bureau d'étude interne", "Approche BIM"],
    imageAlt: "Conducteur de travaux consultant les plans d'exécution sur un chantier",
  },

  // Bandeau de chiffres : uniquement des faits vérifiables issus des documents
  // du client (nombre de métiers, périmètre).
  stats: [
    { value: "6", label: "domaines d'intervention" },
    { value: "BIM", label: "intégré à chaque projet" },
    { value: "A→Z", label: "de l'étude à la livraison" },
  ],

  // §6.2 — présentation courte de l'entreprise.
  intro: {
    eyebrow: "Qui sommes-nous",
    title: "Un constructeur qui conçoit avant de bâtir",
    text: "BIM Leaders est une entreprise de bâtiment et travaux publics basée à Rabat. Notre cœur de métier est la construction : gros œuvre, second œuvre, lots techniques et aménagements extérieurs, sur des projets résidentiels, commerciaux et industriels.",
    text2: "Notre particularité est d'intégrer le BIM à notre approche des projets. Le modèle numérique nous sert à mieux concevoir, visualiser, coordonner les corps d'état et anticiper les incompatibilités — avant que les équipes n'arrivent sur le chantier.",
    cta: "En savoir plus sur nous",
  },

  // §6.3 — les six domaines d'intervention (rendus depuis content/services.js).
  domaines: {
    eyebrow: "Nos domaines d'intervention",
    title: "Six métiers, une seule responsabilité",
    text: "Du terrassement aux finitions, BIM Leaders prend en charge l'ensemble des lots et en assure la coordination.",
    cta: "Voir tous nos métiers",
  },

  // §6.4 — section BIM (le schéma de la chaîne vient de content/bim.js).
  bim: {
    eyebrow: "La valeur ajoutée technologique",
    title: "Le BIM au service de la construction",
    text: "Nous construisons d'abord le projet en numérique. Cela nous permet de le montrer au client, de confronter les lots entre eux et de régler les conflits sur le modèle plutôt que sur le chantier.",
    cta: "Notre approche BIM",
  },

  // §6.5 — section Particuliers, formulations exactes du cahier.
  particuliers: {
    eyebrow: "Particuliers",
    title: "Vous envisagez d'acheter un terrain ?",
    text: "Avant de vous engager, BIM Leaders vous accompagne dans l'étude préliminaire du potentiel de votre terrain et vous aide à visualiser votre futur projet.",
    cta: "Étudier mon terrain",
  },

  // §6.6 — section Investisseurs, formulations exactes du cahier.
  investisseurs: {
    eyebrow: "Investisseurs",
    title: "Vous avez un projet immobilier ?",
    text: "BIM Leaders accompagne les investisseurs dans le développement et la réalisation de projets immobiliers, de l'étude initiale à la livraison.",
    cta: "Présenter mon projet",
  },

  // §6.7 — galerie de réalisations (alimentée par l'API / le snapshot).
  realisations: {
    eyebrow: "Nos réalisations",
    title: "Des projets livrés, des chantiers en cours",
    text: "Découvrez les projets que nous réalisons, du logement individuel à l'immeuble en R+4.",
    cta: "Voir toutes nos réalisations",
  },

  // §6.8 — appel à l'action final, formulation exacte du cahier.
  finalCta: {
    title: "Vous avez un projet de construction ou d'investissement immobilier ?",
    text: "Parlons-en. Nous étudions votre demande et revenons vers vous avec une première lecture technique et budgétaire.",
    cta: "Parlons de votre projet",
  },

  metaTitle: "BIM Leaders — Construction, BTP & BIM à Rabat | Construire avec vision",
  metaDescription:
    "Entreprise de bâtiment et travaux publics à Rabat : gros œuvre, second œuvre, électricité, plomberie, climatisation, VRD. Approche BIM et accompagnement des projets immobiliers. Devis gratuit.",
};

const EN = {
  hero: {
    eyebrow: "Building & civil engineering contractor",
    title: "Building with vision.",
    subtitle: text("en").baseline,
    ctaPrimary: "Request a quote",
    ctaSecondary: "See our projects",
    trust: ["All trades in-house", "In-house design office", "BIM-led delivery"],
    imageAlt: "Site manager reviewing shop drawings on a construction site",
  },

  stats: [
    { value: "6", label: "areas of expertise" },
    { value: "BIM", label: "built into every project" },
    { value: "A→Z", label: "from study to handover" },
  ],

  intro: {
    eyebrow: "Who we are",
    title: "A contractor that designs before it builds",
    text: "BIM Leaders is a building and civil engineering company based in Rabat. Construction is our core business: structural works, finishing works, building services and external works, on residential, commercial and industrial projects.",
    text2: "What sets us apart is that BIM sits at the heart of how we run a project. The digital model helps us design, visualise, coordinate every trade and spot clashes early — before the crews ever reach the site.",
    cta: "More about us",
  },

  domaines: {
    eyebrow: "What we build",
    title: "Six trades, one point of responsibility",
    text: "From earthworks to final finishes, BIM Leaders takes on every package and coordinates them all.",
    cta: "See all our trades",
  },

  bim: {
    eyebrow: "The technology edge",
    title: "BIM in the service of construction",
    text: "We build the project digitally first. That lets us show it to the client, test the trades against one another, and settle clashes on the model rather than on site.",
    cta: "Our approach to BIM",
  },

  particuliers: {
    eyebrow: "Individuals",
    title: "Thinking of buying a plot?",
    text: "Before you commit, BIM Leaders carries out a preliminary study of what your plot could support, and helps you picture the building you could put on it.",
    cta: "Study my plot",
  },

  investisseurs: {
    eyebrow: "Investors",
    title: "Have a property project?",
    text: "BIM Leaders supports investors in developing and delivering property projects, from the first study through to handover.",
    cta: "Present my project",
  },

  realisations: {
    eyebrow: "Our projects",
    title: "Buildings delivered, sites under way",
    text: "A look at what we build, from individual homes to five-storey apartment buildings.",
    cta: "See all our projects",
  },

  finalCta: {
    title: "Planning a construction or property investment project?",
    text: "Let's talk it through. We review your enquiry and come back to you with an initial technical and budget read.",
    cta: "Tell us about your project",
  },

  metaTitle: "BIM Leaders — Construction, civil engineering & BIM in Rabat | Building with vision",
  metaDescription:
    "Building and civil engineering contractor in Rabat: structural and finishing works, electrical, plumbing, HVAC, drainage and roadworks. BIM-led delivery and support for property projects. Free quote.",
};

const BY_LOCALE = { fr: FR, en: EN };

export const getHome = (lang = "fr") => BY_LOCALE[lang] || FR;
