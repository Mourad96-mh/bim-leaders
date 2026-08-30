// §13 du cahier des charges — rubrique Contact, et §10 bis.5 pour le formulaire
// investisseur.
//
// ⚠️ VALEURS ENVOYÉES À L'API — règle centrale de ce fichier :
// chaque option de <select> a un `value` STABLE et EN FRANÇAIS, et un `label`
// traduit. Le `value` est ce qui part vers l'API, est stocké en base et s'affiche
// dans le dashboard : le gérant lit donc des demandes homogènes, qu'elles
// viennent de /contact/ ou de /en/contact/. Traduire un `value` reviendrait à
// créer deux vocabulaires pour la même chose dans la même base.

// §13.1 — « Type de client ».
export const TYPES_CLIENT = [
  { value: "Particulier", label: { fr: "Particulier", en: "Private individual" } },
  { value: "Investisseur", label: { fr: "Investisseur", en: "Investor" } },
  { value: "Promoteur immobilier", label: { fr: "Promoteur immobilier", en: "Property developer" } },
  { value: "Entreprise", label: { fr: "Entreprise", en: "Company" } },
  {
    value: "Architecte / Bureau d'études",
    label: { fr: "Architecte / Bureau d'études", en: "Architect / Design office" },
  },
  { value: "Autre", label: { fr: "Autre", en: "Other" } },
];

// §13.2 — « Types de projet ». Les `value` servent aussi de paramètre ?sujet=
// dans les liens venant des pages Particuliers et Investisseurs — ils sont donc
// déjà des identifiants techniques, identiques dans les deux langues.
export const TYPES_PROJET = [
  { value: "construction-maison", label: { fr: "Construction maison", en: "House construction" } },
  {
    value: "construction-immeuble",
    label: { fr: "Construction immeuble", en: "Apartment building construction" },
  },
  { value: "etude-terrain", label: { fr: "Étude de terrain", en: "Plot study" } },
  { value: "projet-immobilier", label: { fr: "Projet immobilier", en: "Property project" } },
  { value: "projet-investisseur", label: { fr: "Projet investisseur", en: "Investor project" } },
  { value: "travaux", label: { fr: "Travaux", en: "Works" } },
  { value: "autre", label: { fr: "Autre", en: "Other" } },
];

export const BUDGETS = [
  { value: "Moins de 500 000 MAD", label: { fr: "Moins de 500 000 MAD", en: "Under 500,000 MAD" } },
  {
    value: "500 000 – 1 000 000 MAD",
    label: { fr: "500 000 – 1 000 000 MAD", en: "500,000 – 1,000,000 MAD" },
  },
  { value: "1 – 3 MDH", label: { fr: "1 – 3 MDH", en: "1 – 3 million MAD" } },
  { value: "3 – 10 MDH", label: { fr: "3 – 10 MDH", en: "3 – 10 million MAD" } },
  { value: "Plus de 10 MDH", label: { fr: "Plus de 10 MDH", en: "Over 10 million MAD" } },
  { value: "À définir", label: { fr: "À définir", en: "To be defined" } },
];

/** Aplatit une liste d'options { value, label:{fr,en} } pour un <select>. */
export const options = (list, lang = "fr") =>
  list.map((o) => ({ value: o.value, label: o.label[lang] || o.label.fr }));

// Pièce jointe (§13.1 « pièce jointe éventuelle ») — limites appliquées côté
// client ET côté serveur. La limite est un fait, pas une traduction.
export const UPLOAD = {
  maxMb: 10,
  accept: ".pdf,.jpg,.jpeg,.png,.webp,.dwg,.zip",
};

const FR = {
  hero: {
    eyebrow: "Contact",
    title: "Parlons de votre projet",
    text: "Décrivez-nous votre projet en quelques lignes. Nous revenons vers vous avec une première lecture technique et, si nous disposons des éléments nécessaires, un ordre de grandeur budgétaire.",
  },

  formTitle: "Demander un devis ou une étude",
  // Message affiché après un envoi réussi (§21 « afficher une confirmation »).
  successTitle: "Demande envoyée",
  successText:
    "Merci, votre demande est bien enregistrée. Nous revenons vers vous dans les meilleurs délais.",
  errorText:
    "L'envoi a échoué. Vous pouvez réessayer, ou nous joindre directement par téléphone ou WhatsApp.",

  uploadHint:
    "PDF, image, DWG ou ZIP — 10 Mo maximum. Plan de terrain, titre foncier ou esquisse si vous en disposez.",

  // Colonne de droite de la page contact.
  reach: "Nous joindre",
  addressTitle: "Adresse",
  openMaps: "Ouvrir dans Google Maps",
  coverage: "Zone d'intervention :",
  hoursTitle: "Horaires",
  mapTitle: "Localisation de",

  metaTitle: "Contact — demander un devis ou une étude | BIM Leaders",
  metaDescription:
    "Contactez BIM Leaders à Rabat pour un devis de construction, une étude de terrain avant achat ou un projet d'investissement immobilier. Téléphone, WhatsApp et formulaire.",
};

const EN = {
  hero: {
    eyebrow: "Contact",
    title: "Tell us about your project",
    text: "Describe your project in a few lines. We'll come back to you with an initial technical read and, where we have enough to go on, a budget order of magnitude.",
  },

  formTitle: "Request a quote or a study",
  successTitle: "Enquiry sent",
  successText:
    "Thank you — your enquiry has been recorded. We'll get back to you as soon as we can.",
  errorText:
    "The message could not be sent. Please try again, or reach us directly by phone or WhatsApp.",

  uploadHint:
    "PDF, image, DWG or ZIP — 10 MB maximum. A site plan, title deed or sketch, if you have one.",

  reach: "Reach us",
  addressTitle: "Address",
  openMaps: "Open in Google Maps",
  coverage: "Areas we cover:",
  hoursTitle: "Opening hours",
  mapTitle: "Location of",

  metaTitle: "Contact — request a quote or a study | BIM Leaders",
  metaDescription:
    "Contact BIM Leaders in Rabat for a construction quote, a plot study before you buy, or a property investment project. Phone, WhatsApp and enquiry form.",
};

const BY_LOCALE = { fr: FR, en: EN };
export const getContact = (lang = "fr") => BY_LOCALE[lang] || FR;

// §10 bis.4 — page/formulaire « Demander le dossier investisseur ».
const DOSSIER_FR = {
  eyebrow: "Investisseurs",
  title: "Demander le dossier investisseur",
  text: "Les données financières détaillées ne sont pas publiées sur le site. Après qualification de votre demande, nous vous transmettons le dossier complet du projet.",
  successTitle: "Demande reçue",
  successText:
    "Merci. Nous étudions votre demande et revenons vers vous pour vous transmettre le dossier investisseur.",
  contentTitle: "Contenu du dossier",
  privacyTitle: "Confidentialité",
  privacyText:
    "Les données financières détaillées des projets ne sont pas publiées sur le site. Elles sont transmises directement, après qualification de votre demande, aux investisseurs et partenaires intéressés.",
  metaTitle: "Demander le dossier investisseur — BIM Leaders",
  metaDescription:
    "Recevez le dossier complet d'un projet immobilier BIM Leaders : études, plans, données BIM, budget prévisionnel, calendrier et modalités de partenariat.",
};

const DOSSIER_EN = {
  eyebrow: "Investors",
  title: "Request the investor pack",
  text: "Detailed financial data is not published on the site. Once your enquiry is qualified, we send you the full project pack.",
  successTitle: "Enquiry received",
  successText:
    "Thank you. We are reviewing your enquiry and will come back to you with the investor pack.",
  contentTitle: "What the pack contains",
  privacyTitle: "Confidentiality",
  privacyText:
    "Detailed project financials are not published on the site. They go directly to interested investors and partners once an enquiry has been qualified.",
  metaTitle: "Request the investor pack — BIM Leaders",
  metaDescription:
    "Receive the full pack for a BIM Leaders property project: studies, drawings, BIM data, forecast budget, programme and partnership terms.",
};

const DOSSIER_BY_LOCALE = { fr: DOSSIER_FR, en: DOSSIER_EN };
export const getDossierForm = (lang = "fr") => DOSSIER_BY_LOCALE[lang] || DOSSIER_FR;
