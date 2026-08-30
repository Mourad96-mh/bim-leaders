// Crédits photo — obligation de licence, pas décoration.
//
// Les photos d'illustration du site viennent de Wikimedia Commons. Toutes sont
// réutilisables commercialement, mais les licences CC BY-SA imposent de citer
// l'auteur, la licence et la source, et de signaler les recadrages. C'est ce que
// publie la page /credits/ (et /en/credits/), liée depuis le pied de page.
//
// Ces images illustrent un MÉTIER ; aucune n'est présentée comme un chantier de
// BIM Leaders. Dès que le client fournit ses propres photos, il suffit de
// remplacer les fichiers dans assets-src/, de relancer `npm run media`, et de
// retirer l'entrée ci-dessous : une entrée en moins = une ligne en moins sur
// les deux pages de crédits.
//
// Ce qui se traduit : `usage` (la rubrique où la photo apparaît) et `modified`
// (la mention de recadrage exigée par la licence). Ce qui ne se traduit PAS :
// le titre de l'œuvre, le nom de l'auteur, le nom de la licence et les URLs —
// ce sont des données d'attribution, elles doivent rester telles quelles.

const RECADREE = { fr: "Recadrée et redimensionnée.", en: "Cropped and resized." };

export const PHOTO_CREDITS = [
  {
    usage: { fr: "Page d'accueil — visuel principal", en: "Home page — main image" },
    title: "Baustelle Hölzla",
    author: "Ermell",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.fr",
    source: "https://commons.wikimedia.org/wiki/File:Baustelle_H%C3%B6lzla_6066312.jpg",
    modified: RECADREE,
  },
  {
    usage: { fr: "Gros œuvre", en: "Structural works" },
    title: "A worker ties together reinforcing bar",
    author: "Bill Dowell (U.S. Army Corps of Engineers)",
    license: "Domaine public",
    licenseUrl: "https://commons.wikimedia.org/wiki/Template:PD-USGov",
    source:
      "https://commons.wikimedia.org/wiki/File:A_worker_ties_together_reinforcing_bar,_or_rebar,_to_strengthen_concrete_floors_for_a_facility_that_will_house_372_students_as_part_of_the_Herat_University_Women%27s_Dormitory_Project_in_Herat_province_140311-A-DT641-242.jpg",
    modified: RECADREE,
  },
  {
    usage: { fr: "Second œuvre", en: "Finishing works" },
    title: "Verlegen von Fliesen mit einem Nivelliersystem",
    author: "Frank Winkelmann",
    license: "CC0 1.0",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/deed.fr",
    source:
      "https://commons.wikimedia.org/wiki/File:Verlegen_von_Fliesen_mit_einem_Nivelliersystem.jpg",
    modified: RECADREE,
  },
  {
    usage: { fr: "Électricité & plomberie", en: "Electrical & plumbing" },
    title: "Man electrical technician working switchboard with fuses",
    author: "Cláudio Marques Unip. LDA",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.fr",
    source:
      "https://commons.wikimedia.org/wiki/File:Man-electrical-technician-working-switchboard-with-fuses.jpg",
    modified: RECADREE,
  },
  {
    usage: { fr: "Climatisation & désenfumage", en: "HVAC & smoke extraction" },
    title: "Air handling units in large commercial building, Brisbane",
    author: "Kgbo",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.fr",
    source:
      "https://commons.wikimedia.org/wiki/File:Air_handling_units_in_large_commercial_building,_Brisbane.jpg",
    modified: RECADREE,
  },
  {
    usage: { fr: "Aménagement extérieur", en: "External works & landscaping" },
    title: "Pflasterarbeiten am Bertoldsbrunnen in Freiburg",
    author: "Andreas Schwarzkopf",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/deed.fr",
    source:
      "https://commons.wikimedia.org/wiki/File:Pflasterarbeiten_am_Bertoldsbrunnen_in_Freiburg_2.jpg",
    modified: RECADREE,
  },
  {
    usage: { fr: "Assainissement & voirie", en: "Drainage & roadworks" },
    title: "Paving Machines",
    author: "باراد",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.fr",
    source: "https://commons.wikimedia.org/wiki/File:Paving_Machines.jpg",
    modified: RECADREE,
  },
];

/** Crédits aplatis dans une langue, prêts à rendre. */
export const getCredits = (lang = "fr") =>
  PHOTO_CREDITS.map((c) => ({
    ...c,
    usage: c.usage[lang] || c.usage.fr,
    modified: c.modified?.[lang] || c.modified?.fr,
  }));

const FR = {
  eyebrow: "Mentions",
  title: "Crédits photo",
  text: "Les photographies d'illustration de ce site proviennent de Wikimedia Commons. Elles illustrent un métier du bâtiment ; aucune n'est une réalisation de BIM Leaders.",
  ourWorkBefore: "Nos propres chantiers sont présentés dans la rubrique ",
  ourWorkLink: "Réalisations",
  ourWorkAfter: ", et nulle part ailleurs.",
  metaTitle: "Crédits photo",
  metaDescription:
    "Origine, auteur et licence des photographies d'illustration utilisées sur le site de BIM Leaders.",
};

const EN = {
  eyebrow: "Notices",
  title: "Photo credits",
  text: "The illustrative photographs on this site come from Wikimedia Commons. They illustrate a building trade; none of them is a BIM Leaders project.",
  ourWorkBefore: "Our own sites are shown in the ",
  ourWorkLink: "Projects",
  ourWorkAfter: " section, and nowhere else.",
  metaTitle: "Photo credits",
  metaDescription:
    "Source, author and licence of the illustrative photographs used on the BIM Leaders website.",
};

const BY_LOCALE = { fr: FR, en: EN };
export const getCreditsPage = (lang = "fr") => BY_LOCALE[lang] || FR;
