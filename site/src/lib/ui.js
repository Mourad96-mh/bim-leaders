// Libellés d'INTERFACE, dans les deux langues.
//
// Frontière avec content/ : ici vivent les chaînes de l'HABILLAGE et les
// libellés réutilisés d'une page à l'autre — navigation, boutons, formulaire,
// visionneuse photo, intitulés de fiche. Le DISCOURS COMMERCIAL, lui, reste
// dans content/ à côté du reste de la copie de sa rubrique.
//
// Les deux blocs ont exactement la même forme : `t(lang).nav.contact`. Une clé
// ajoutée d'un côté doit l'être de l'autre — c'est ce que vérifie
// scripts/check-i18n.mjs, lancé au prebuild.

const FR = {
  // --- Navigation & habillage ---------------------------------------------
  nav: {
    aria: "Navigation principale",
    home: "Accueil",
    construction: "Construction",
    bim: "BIM",
    particuliers: "Particuliers",
    investisseurs: "Investisseurs",
    realisations: "Réalisations",
    apropos: "À propos",
    contact: "Contact",
    credits: "Crédits photo",
    cta: "Demander un devis",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    langAria: "Choisir la langue",
    langSwitchTo: "Voir cette page en anglais",
  },
  brand: { homeAria: "BIM Leaders Services — accueil" },
  footer: {
    trades: "Nos métiers",
    site: "Le site",
    contact: "Contact",
    credits: "Crédits photo",
  },
  social: { follow: "Suivre BIM Leaders sur" },

  // --- Actions récurrentes -------------------------------------------------
  cta: {
    quote: "Demander un devis",
    talk: "Parlons de votre projet",
    detail: "Voir le détail",
    call: "Appeler",
    whatsapp: "WhatsApp",
    whatsappAria: "Écrire à BIM Leaders sur WhatsApp",
    callAria: "Appeler BIM Leaders au",
    learnMore: "En savoir plus",
  },
  // Messages WhatsApp pré-remplis, par contexte.
  whatsappMessage: {
    default: "Bonjour BIM Leaders, je souhaite un devis pour mon projet.",
    terrain: "Bonjour BIM Leaders, je souhaite une étude de terrain avant achat.",
    investisseur: "Bonjour BIM Leaders, je souhaite vous présenter un projet immobilier.",
  },

  breadcrumb: { aria: "Fil d'Ariane" },

  // --- Réalisations : galerie, fiche, visionneuse --------------------------
  projects: {
    all: "Tous",
    see: "Voir le projet",
    emptyCategory: "Aucun projet dans cette catégorie pour le moment.",
    statusDone: "Projet réalisé",
    statusOngoing: "Chantier en cours",
    specs: "Caractéristiques",
    specType: "Type de projet",
    specLocation: "Localisation",
    specArea: "Surface",
    specYear: "Année",
    specStatus: "Statut",
    works: "Prestations réalisées",
    photos: "Photos du chantier",
    beforeAfter: "Avant / après",
    video: "Vidéo",
    similar: "Un projet similaire ?",
    backToAll: "Toutes les réalisations",
  },
  gallery: {
    enlarge: (i, n) => `Agrandir la photo ${i} sur ${n}`,
    photoOf: (i, n) => `Photo ${i} sur ${n}`,
    close: "Fermer",
    prev: "Photo précédente",
    next: "Photo suivante",
  },
  beforeAfter: {
    before: "Avant",
    after: "Après",
    beforeAlt: "avant travaux",
    afterAlt: "après travaux",
    compare: "Comparer avant et après",
    valueText: (n) => `${n} % de l'image après travaux masquée`,
  },

  // --- Formulaire de demande ----------------------------------------------
  form: {
    honeypot: "Ne pas remplir",
    required: "*",
    select: "— Sélectionner —",
    name: "Nom et prénom",
    nameCompany: "Nom / Société",
    phone: "Téléphone",
    email: "E-mail",
    role: "Fonction",
    clientType: "Type de client",
    country: "Pays",
    partnerType: "Type de partenaire",
    partnerTypeHint: "Investisseur, fonds, promoteur…",
    range: "Fourchette d'investissement",
    collaboration: "Type de collaboration souhaitée",
    sector: "Secteur d'intérêt",
    sectorHint: "Résidentiel, commercial, industriel…",
    projectType: "Type de projet",
    location: "Localisation",
    locationHint: "Ville, quartier",
    area: "Surface du terrain / projet",
    areaHint: "ex. 320 m²",
    budget: "Budget indicatif",
    message: "Message",
    messageHint: "Décrivez votre projet : nature des travaux, échéance, contraintes connues…",
    messageHintInvest: "Décrivez votre profil et le type de projet qui vous intéresse.",
    file: "Pièce jointe (facultatif)",
    fileRemove: "Retirer le fichier",
    fileUnit: "Mo",
    submit: "Envoyer ma demande",
    submitInvest: "Demander le dossier",
    sending: "Envoi en cours…",
    privacy:
      "Les informations transmises servent uniquement à traiter votre demande et ne sont communiquées à aucun tiers.",
    // Validation côté navigateur — le serveur revalide et renvoie ses propres
    // messages, eux aussi traduits (cf. server/src/routes/leads.js).
    errName: "Indiquez votre nom.",
    errPhone: "Indiquez un numéro de téléphone.",
    errEmail: "Indiquez votre e-mail.",
    errEmailFormat: "Cette adresse e-mail semble incorrecte.",
    errMessage: "Décrivez votre projet en quelques mots.",
    errFileSize: (mb) => `Fichier trop volumineux (max ${mb} Mo).`,
  },

  // --- Mentions légales (page À propos) ------------------------------------
  legal: {
    heading: "Informations légales",
    form: "Forme juridique",
    capital: "Capital social",
    rc: "Registre de commerce",
    ice: "ICE",
    director: "Gérant",
    activity: "Activité",
    office: "Siège social",
  },
};

const EN = {
  nav: {
    aria: "Main navigation",
    home: "Home",
    construction: "Construction",
    bim: "BIM",
    particuliers: "Individuals",
    investisseurs: "Investors",
    realisations: "Projects",
    apropos: "About",
    contact: "Contact",
    credits: "Photo credits",
    cta: "Request a quote",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    langAria: "Choose a language",
    langSwitchTo: "View this page in French",
  },
  brand: { homeAria: "BIM Leaders Services — home" },
  footer: {
    trades: "What we build",
    site: "The site",
    contact: "Contact",
    credits: "Photo credits",
  },
  social: { follow: "Follow BIM Leaders on" },

  cta: {
    quote: "Request a quote",
    talk: "Tell us about your project",
    detail: "See details",
    call: "Call",
    whatsapp: "WhatsApp",
    whatsappAria: "Message BIM Leaders on WhatsApp",
    callAria: "Call BIM Leaders on",
    learnMore: "Find out more",
  },
  whatsappMessage: {
    default: "Hello BIM Leaders, I would like a quote for my project.",
    terrain: "Hello BIM Leaders, I would like a plot study before I buy.",
    investisseur: "Hello BIM Leaders, I would like to present a property project.",
  },

  breadcrumb: { aria: "Breadcrumb" },

  projects: {
    all: "All",
    see: "View project",
    emptyCategory: "No projects in this category yet.",
    statusDone: "Completed project",
    statusOngoing: "Work in progress",
    specs: "Project facts",
    specType: "Project type",
    specLocation: "Location",
    specArea: "Floor area",
    specYear: "Year",
    specStatus: "Status",
    works: "Works carried out",
    photos: "Site photographs",
    beforeAfter: "Before / after",
    video: "Video",
    similar: "A similar project?",
    backToAll: "All projects",
  },
  gallery: {
    enlarge: (i, n) => `Enlarge photo ${i} of ${n}`,
    photoOf: (i, n) => `Photo ${i} of ${n}`,
    close: "Close",
    prev: "Previous photo",
    next: "Next photo",
  },
  beforeAfter: {
    before: "Before",
    after: "After",
    beforeAlt: "before the works",
    afterAlt: "after the works",
    compare: "Compare before and after",
    valueText: (n) => `${n}% of the after image hidden`,
  },

  form: {
    honeypot: "Do not fill in",
    required: "*",
    select: "— Select —",
    name: "Full name",
    nameCompany: "Name / Company",
    phone: "Phone",
    email: "Email",
    role: "Role",
    clientType: "Type of client",
    country: "Country",
    partnerType: "Type of partner",
    partnerTypeHint: "Investor, fund, developer…",
    range: "Investment range",
    collaboration: "Type of partnership sought",
    sector: "Sector of interest",
    sectorHint: "Residential, commercial, industrial…",
    projectType: "Project type",
    location: "Location",
    locationHint: "City, district",
    area: "Plot / project area",
    areaHint: "e.g. 320 m²",
    budget: "Indicative budget",
    message: "Message",
    messageHint: "Describe your project: scope of works, timescale, any known constraints…",
    messageHintInvest: "Tell us about your profile and the kind of project you are looking for.",
    file: "Attachment (optional)",
    fileRemove: "Remove file",
    fileUnit: "MB",
    submit: "Send my enquiry",
    submitInvest: "Request the pack",
    sending: "Sending…",
    privacy:
      "The information you send is used solely to handle your enquiry and is never passed on to third parties.",
    errName: "Please enter your name.",
    errPhone: "Please enter a phone number.",
    errEmail: "Please enter your email address.",
    errEmailFormat: "That email address doesn't look right.",
    errMessage: "Tell us about your project in a few words.",
    errFileSize: (mb) => `File too large (max ${mb} MB).`,
  },

  legal: {
    heading: "Legal information",
    form: "Legal form",
    capital: "Share capital",
    rc: "Commercial register",
    ice: "ICE number",
    director: "Managing director",
    activity: "Activity",
    office: "Registered office",
  },
};

const BY_LOCALE = { fr: FR, en: EN };

/** Dictionnaire d'interface d'une langue. `t("en").nav.contact` → "Contact" */
export const t = (lang = "fr") => BY_LOCALE[lang] || FR;

// L'ordre du menu principal. Les libellés viennent de `t(lang).nav`, les URLs de
// lib/i18n.js : une seule liste pour les deux langues, impossible de les
// désynchroniser.
export const NAV_KEYS = [
  "home",
  "construction",
  "bim",
  "particuliers",
  "investisseurs",
  "realisations",
  "apropos",
  "contact",
];
