// §13 du cahier des charges — rubrique Contact, et §10 bis.5 pour le formulaire
// investisseur. Les listes ci-dessous pilotent À LA FOIS les <select> du
// formulaire et la validation côté serveur (server/src/routes/leads.js les
// réimporte via une copie synchronisée) : ajouter une option ici sans la
// répercuter côté API ferait rejeter la soumission.

// §13.1 — « Type de client ».
export const TYPES_CLIENT = [
  "Particulier",
  "Investisseur",
  "Promoteur immobilier",
  "Entreprise",
  "Architecte / Bureau d'études",
  "Autre",
];

// §13.2 — « Types de projet ». Les `value` servent aussi de paramètre ?sujet=
// dans les liens venant des pages Particuliers et Investisseurs.
export const TYPES_PROJET = [
  { value: "construction-maison", label: "Construction maison" },
  { value: "construction-immeuble", label: "Construction immeuble" },
  { value: "etude-terrain", label: "Étude de terrain" },
  { value: "projet-immobilier", label: "Projet immobilier" },
  { value: "projet-investisseur", label: "Projet investisseur" },
  { value: "travaux", label: "Travaux" },
  { value: "autre", label: "Autre" },
];

export const BUDGETS = [
  "Moins de 500 000 MAD",
  "500 000 – 1 000 000 MAD",
  "1 – 3 MDH",
  "3 – 10 MDH",
  "Plus de 10 MDH",
  "À définir",
];

export const CONTACT = {
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

  // Pièce jointe (§13.1 « pièce jointe éventuelle ») — limites appliquées côté
  // client ET côté serveur.
  upload: {
    maxMb: 10,
    accept: ".pdf,.jpg,.jpeg,.png,.webp,.dwg,.zip",
    hint: "PDF, image, DWG ou ZIP — 10 Mo maximum. Plan de terrain, titre foncier ou esquisse si vous en disposez.",
  },

  metaTitle: "Contact — demander un devis ou une étude | BIM Leaders",
  metaDescription:
    "Contactez BIM Leaders à Rabat pour un devis de construction, une étude de terrain avant achat ou un projet d'investissement immobilier. Téléphone, WhatsApp et formulaire.",
};

// §10 bis.4 — page/formulaire « Demander le dossier investisseur ».
export const DOSSIER_FORM = {
  title: "Demander le dossier investisseur",
  text: "Les données financières détaillées ne sont pas publiées sur le site. Après qualification de votre demande, nous vous transmettons le dossier complet du projet.",
  successTitle: "Demande reçue",
  successText:
    "Merci. Nous étudions votre demande et revenons vers vous pour vous transmettre le dossier investisseur.",
  metaTitle: "Demander le dossier investisseur — BIM Leaders",
  metaDescription:
    "Recevez le dossier complet d'un projet immobilier BIM Leaders : études, plans, données BIM, budget prévisionnel, calendrier et modalités de partenariat.",
};
