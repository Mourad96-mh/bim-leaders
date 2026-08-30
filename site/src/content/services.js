// §7 du cahier des charges — « Construction & services », le cœur de métier.
// Les prestations listées proviennent de l'Offre de service officielle de
// BIM LEADERS (§1 « Présentation de l'entreprise »), qui détaille les trois
// familles : gros/second œuvre, lots techniques, aménagements extérieurs & VRD.
//
// SITE BILINGUE — ce fichier porte les deux versions du catalogue :
//   • SERVICES_FR → arbre français, servi à la racine (/construction/…)
//   • SERVICES_EN → arbre anglais, servi sous /en/ (/en/construction/…)
// Les deux tableaux sont dans le MÊME ORDRE et partagent le champ `key`, qui est
// l'identité stable d'un métier d'une langue à l'autre : c'est lui qui permet au
// sélecteur de langue et aux balises hreflang de faire correspondre
// /construction/gros-oeuvre/ et /en/construction/structural-works/.
//
// ⚠️ Ajouter un métier = ajouter UN objet DANS CHAQUE tableau, avec le même
//    `key`. La page /construction/, la page détail, le menu, le sitemap, les
//    alternates hreflang et le JSON-LD OfferCatalog suivent tout seuls.
//
// `image` désigne un fichier de public/img/ (WebP + repli JPG, générés par
// scripts/make-webp.mjs) — commun aux deux langues, seul `imageAlt` est traduit.
// Ce sont des PHOTOS D'ILLUSTRATION du métier, jamais des réalisations
// BIM Leaders : origine et licence de chacune dans content/credits.js.

const SERVICES_FR = [
  {
    key: "gros-oeuvre",
    slug: "gros-oeuvre",
    icon: "crane",
    title: "Gros œuvre",
    short: "La structure qui porte tout le projet : fondations, béton armé, maçonnerie.",
    intro:
      "Le gros œuvre constitue la charpente du bâtiment : c'est lui qui détermine sa solidité, sa durée de vie et la faisabilité de tout ce qui viendra ensuite. BIM Leaders réalise l'ensemble des travaux de structure, des terrassements jusqu'au dernier plancher, sur des projets résidentiels, commerciaux et industriels.",
    prestations: [
      "Terrassements et fondations",
      "Structure en béton armé : semelles, poteaux, poutres, planchers",
      "Sous-sols, voiles et murs de soutènement",
      "Maçonnerie et cloisonnement",
      "Étanchéité des toitures, terrasses et parties enterrées",
      "Coffrage, ferraillage et coulage sur chantier",
    ],
    // Ce que le BIM apporte spécifiquement à ce lot (§8.2 du cahier).
    bimValue:
      "Le modèle numérique permet de vérifier la structure avant le premier coulage : réservations, trémies et passages techniques sont anticipés au lieu d'être repris au marteau-piqueur.",
    image: "svc-gros-oeuvre",
    imageAlt: "Ferrailleur ligaturant les armatures d'un plancher avant coulage",
    metaTitle: "Gros œuvre à Rabat — fondations, béton armé, maçonnerie",
    metaDescription:
      "BIM Leaders réalise le gros œuvre de vos projets à Rabat et partout au Maroc : terrassements, fondations, structure béton armé, maçonnerie et étanchéité. Devis gratuit.",
  },
  {
    key: "second-oeuvre",
    slug: "second-oeuvre",
    icon: "renovate",
    title: "Second œuvre",
    short: "Tout ce qui rend le bâtiment habitable : revêtements, menuiseries, finitions.",
    intro:
      "Le second œuvre transforme une structure en un bâtiment livrable. C'est l'étape la plus visible pour le client final, celle où la qualité d'exécution se juge au millimètre. BIM Leaders prend en charge l'ensemble des lots de finition et coordonne les corps d'état entre eux pour tenir le délai de livraison.",
    prestations: [
      "Revêtements sols et murs : carrelage, marbre, faïence",
      "Menuiserie bois, aluminium et métallique",
      "Peinture intérieure et extérieure",
      "Faux plafonds et habillages décoratifs",
      "Cloisons, doublages et isolation",
      "Lustrerie et accessoires sanitaires",
    ],
    bimValue:
      "Les quantités de revêtement, de peinture et de menuiserie sont extraites du modèle : le métré est fiable dès la préparation, ce qui limite les commandes en trop et les ruptures en cours de chantier.",
    image: "svc-second-oeuvre",
    imageAlt: "Pose d'un carreau grand format à la ventouse sur colle peignée",
    metaTitle: "Second œuvre & finitions — revêtements, menuiserie, peinture",
    metaDescription:
      "Travaux de second œuvre par BIM Leaders : carrelage et marbre, menuiserie bois/aluminium/métallique, peinture, faux plafonds et cloisons. Rabat et tout le Maroc.",
  },
  {
    key: "electricite-plomberie",
    slug: "electricite-plomberie",
    icon: "bolt",
    title: "Électricité & plomberie",
    short: "Les réseaux qui alimentent le bâtiment, du tableau général au point d'eau.",
    intro:
      "Électricité et plomberie forment les lots techniques les plus sensibles d'un projet : ils traversent toute la structure et croisent tous les autres corps d'état. BIM Leaders les traite comme un ensemble cohérent, des plans d'exécution établis par son bureau d'étude interne jusqu'aux essais de mise en service.",
    prestations: [
      "Électricité de bâtiment : courants forts et courants faibles",
      "Tableaux électriques, distribution et mise à la terre",
      "Éclairage intérieur et extérieur",
      "Plomberie sanitaire : alimentation et évacuation",
      "Production et distribution d'eau chaude",
      "Plans d'exécution électricité et plomberie",
    ],
    bimValue:
      "La coordination 3D confronte les réseaux électriques et hydrauliques à la structure et à la climatisation avant les travaux : les incompatibilités se règlent sur le modèle, pas sur le chantier.",
    image: "svc-electricite-plomberie",
    imageAlt: "Électricien contrôlant un tableau de distribution au multimètre",
    metaTitle: "Électricité & plomberie du bâtiment — BIM Leaders",
    metaDescription:
      "Installation électrique et plomberie sanitaire par BIM Leaders : courants forts et faibles, tableaux, éclairage, alimentation et évacuation, plans d'exécution.",
  },
  {
    key: "climatisation-desenfumage",
    slug: "climatisation-desenfumage",
    icon: "wind",
    title: "Climatisation & désenfumage",
    short: "Confort thermique, renouvellement d'air et sécurité incendie.",
    intro:
      "La climatisation, la ventilation et le désenfumage conditionnent à la fois le confort des occupants et la conformité du bâtiment aux exigences de sécurité. BIM Leaders installe ces systèmes et produit les plans d'exécution correspondants via son bureau d'étude interne.",
    prestations: [
      "Climatisation : split, gainable, VRV/VRF",
      "Ventilation mécanique et renouvellement d'air",
      "Réseaux de gaines et diffusion d'air",
      "Systèmes de désenfumage",
      "Plans d'exécution climatisation et désenfumage",
      "Mise en service et réglages",
    ],
    bimValue:
      "Les gaines sont les réseaux les plus encombrants d'un bâtiment. Les modéliser tôt permet de fixer les hauteurs sous faux plafond dès la conception, au lieu de les subir à la pose.",
    image: "svc-climatisation-desenfumage",
    imageAlt: "Centrale de traitement d'air et réseau de gaines dans un local technique",
    metaTitle: "Climatisation, ventilation & désenfumage — BIM Leaders",
    metaDescription:
      "Installation de climatisation, ventilation et désenfumage par BIM Leaders : split et VRV, réseaux de gaines, systèmes de désenfumage, plans d'exécution.",
  },
  {
    key: "amenagement-exterieur",
    slug: "amenagement-exterieur",
    icon: "tree",
    title: "Aménagement extérieur",
    short: "Les abords du bâtiment : accès, revêtements, espaces verts, clôtures.",
    intro:
      "L'aménagement extérieur donne au projet sa première impression et son usage quotidien. BIM Leaders traite les abords comme une partie intégrante de l'ouvrage : accès, stationnement, revêtements, clôtures et espaces plantés sont conçus avec la même exigence que le bâti.",
    prestations: [
      "Voies d'accès, allées et stationnement",
      "Revêtements extérieurs : pavage, dallage, béton désactivé",
      "Clôtures, portails et murs de clôture",
      "Espaces verts et plantations",
      "Éclairage extérieur et mobilier",
      "Terrasses, escaliers et emmarchements",
    ],
    bimValue:
      "Le terrain et les niveaux extérieurs sont modélisés avec le bâtiment : les raccordements de niveaux, les pentes d'évacuation et les accès se calent avant terrassement.",
    image: "svc-amenagement-exterieur",
    imageAlt: "Pose manuelle de pavés sur une allée en cours d'aménagement",
    metaTitle: "Aménagement extérieur & abords — BIM Leaders",
    metaDescription:
      "Aménagement extérieur par BIM Leaders : accès et stationnement, pavage et dallage, clôtures et portails, espaces verts, éclairage extérieur et terrasses.",
  },
  {
    key: "assainissement-voirie",
    slug: "assainissement-voirie",
    icon: "road",
    title: "Assainissement & voirie",
    short: "Les réseaux enterrés et la voirie : VRD au sens complet.",
    intro:
      "L'assainissement et la voirie forment le socle invisible du projet. Mal exécutés, ils se rappellent au bon souvenir du maître d'ouvrage des années plus tard. BIM Leaders réalise les travaux de VRD en s'appuyant sur des plans de réseaux coordonnés avec la structure et les lots techniques.",
    prestations: [
      "Réseaux d'assainissement eaux usées et eaux pluviales",
      "Regards, boîtes de branchement et raccordements",
      "Drainage et évacuation des eaux de ruissellement",
      "Voirie : couches de forme, de base et de roulement",
      "Bordures, caniveaux et trottoirs",
      "Réseaux divers enterrés (VRD)",
    ],
    bimValue:
      "Les réseaux enterrés sont positionnés dans le modèle avec les fondations : les croisements avec les semelles et les regards sont vus avant l'ouverture des tranchées.",
    image: "svc-assainissement-voirie",
    imageAlt: "Finisseur et compacteur posant la couche de roulement d'une voirie",
    metaTitle: "Assainissement & voirie (VRD) — BIM Leaders",
    metaDescription:
      "Travaux d'assainissement et de voirie par BIM Leaders : réseaux eaux usées et pluviales, regards et raccordements, drainage, voirie, bordures et VRD.",
  },
];

const SERVICES_EN = [
  {
    key: "gros-oeuvre",
    slug: "structural-works",
    icon: "crane",
    title: "Structural works",
    short: "The frame that carries the whole project: foundations, reinforced concrete, masonry.",
    intro:
      "Structural works are the backbone of a building: they determine how solid it is, how long it lasts, and what is feasible in every trade that follows. BIM Leaders carries out the full scope of structural work — from earthworks to the topmost slab — on residential, commercial and industrial projects.",
    prestations: [
      "Earthworks and foundations",
      "Reinforced concrete frame: footings, columns, beams, slabs",
      "Basements, shear walls and retaining walls",
      "Masonry and partition walls",
      "Waterproofing of roofs, terraces and below-grade structures",
      "On-site formwork, rebar fixing and concrete pouring",
    ],
    bimValue:
      "The model lets us check the structure before the first pour: openings, shafts and service penetrations are planned in advance instead of being cut back out with a jackhammer.",
    image: "svc-gros-oeuvre",
    imageAlt: "Steel fixer tying slab reinforcement before the concrete pour",
    metaTitle: "Structural works in Rabat — foundations, concrete frame, masonry",
    metaDescription:
      "BIM Leaders delivers the structural works on your project in Rabat and across Morocco: earthworks, foundations, reinforced concrete frame, masonry and waterproofing. Free quote.",
  },
  {
    key: "second-oeuvre",
    slug: "finishing-works",
    icon: "renovate",
    title: "Finishing works",
    short: "Everything that makes a building liveable: floor and wall finishes, joinery, fit-out.",
    intro:
      "Finishing works turn a structure into a building you can hand over. This is the stage the end client actually sees, and where workmanship is judged to the millimetre. BIM Leaders takes on the full finishing scope and coordinates the trades against one another so the handover date holds.",
    prestations: [
      "Floor and wall finishes: tiling, marble, ceramic",
      "Timber, aluminium and metal joinery",
      "Interior and exterior painting",
      "Suspended ceilings and decorative cladding",
      "Partitions, linings and insulation",
      "Light fittings and sanitary accessories",
    ],
    bimValue:
      "Quantities for finishes, paint and joinery are taken straight from the model: the take-off is reliable from the planning stage, which cuts both over-ordering and mid-project shortages.",
    image: "svc-second-oeuvre",
    imageAlt: "Large-format tile being set with suction handles onto combed adhesive",
    metaTitle: "Finishing works & fit-out — tiling, joinery, painting",
    metaDescription:
      "Finishing works by BIM Leaders: tiling and marble, timber, aluminium and metal joinery, painting, suspended ceilings and partitions. Rabat and across Morocco.",
  },
  {
    key: "electricite-plomberie",
    slug: "electrical-plumbing",
    icon: "bolt",
    title: "Electrical & plumbing",
    short: "The services that feed the building, from the main board to the last outlet.",
    intro:
      "Electrical and plumbing are the most sensitive service packages on a project: they run through the whole structure and cross every other trade. BIM Leaders treats them as one coherent scope, from the shop drawings produced by our in-house design office through to commissioning tests.",
    prestations: [
      "Building electrical: power and low-current systems",
      "Distribution boards, circuits and earthing",
      "Interior and exterior lighting",
      "Sanitary plumbing: supply and drainage",
      "Hot water generation and distribution",
      "Electrical and plumbing shop drawings",
    ],
    bimValue:
      "3D coordination tests the electrical and hydraulic services against the structure and the HVAC before work starts: clashes are resolved on the model, not on site.",
    image: "svc-electricite-plomberie",
    imageAlt: "Electrician testing a distribution board with a multimeter",
    metaTitle: "Building electrical & plumbing — BIM Leaders",
    metaDescription:
      "Electrical installation and sanitary plumbing by BIM Leaders: power and low-current systems, distribution boards, lighting, supply and drainage, shop drawings.",
  },
  {
    key: "climatisation-desenfumage",
    slug: "hvac-smoke-extraction",
    icon: "wind",
    title: "HVAC & smoke extraction",
    short: "Thermal comfort, fresh air and fire safety.",
    intro:
      "Air conditioning, ventilation and smoke extraction govern both occupant comfort and the building's compliance with fire safety requirements. BIM Leaders installs these systems and produces the matching shop drawings through its in-house design office.",
    prestations: [
      "Air conditioning: split, ducted, VRV/VRF",
      "Mechanical ventilation and fresh air supply",
      "Ductwork and air distribution",
      "Smoke extraction systems",
      "HVAC and smoke extraction shop drawings",
      "Commissioning and balancing",
    ],
    bimValue:
      "Ducts are the bulkiest services in a building. Modelling them early fixes ceiling voids at design stage, instead of leaving them to be discovered at installation.",
    image: "svc-climatisation-desenfumage",
    imageAlt: "Air handling unit and ductwork in a plant room",
    metaTitle: "Air conditioning, ventilation & smoke extraction — BIM Leaders",
    metaDescription:
      "Air conditioning, ventilation and smoke extraction by BIM Leaders: split and VRV systems, ductwork, smoke extraction systems and shop drawings.",
  },
  {
    key: "amenagement-exterieur",
    slug: "landscaping",
    icon: "tree",
    title: "External works & landscaping",
    short: "The grounds around the building: access, paving, planting, boundary walls.",
    intro:
      "External works set the first impression of a project and shape how it is used day to day. BIM Leaders treats the surroundings as part of the building itself: access, parking, paving, boundaries and planted areas are designed to the same standard as the structure.",
    prestations: [
      "Access roads, driveways and parking",
      "External paving: block paving, flagstones, exposed aggregate concrete",
      "Fencing, gates and boundary walls",
      "Green areas and planting",
      "External lighting and street furniture",
      "Terraces, external stairs and steps",
    ],
    bimValue:
      "The site and its external levels are modelled together with the building: level transitions, drainage falls and access points are resolved before earthworks begin.",
    image: "svc-amenagement-exterieur",
    imageAlt: "Paving blocks being laid by hand on a driveway under construction",
    metaTitle: "External works & landscaping — BIM Leaders",
    metaDescription:
      "External works by BIM Leaders: access and parking, block paving and flagstones, fencing and gates, planting, external lighting and terraces.",
  },
  {
    key: "assainissement-voirie",
    slug: "drainage-roadworks",
    icon: "road",
    title: "Drainage & roadworks",
    short: "Buried services and road construction: infrastructure works in full.",
    intro:
      "Drainage and roadworks are the invisible base of a project. Done badly, they come back to haunt the client years later. BIM Leaders carries out infrastructure works from service drawings coordinated with the structure and the building services.",
    prestations: [
      "Foul and storm water drainage networks",
      "Manholes, connection chambers and service connections",
      "Land drainage and surface water disposal",
      "Roadworks: capping, base and wearing courses",
      "Kerbs, channels and footways",
      "Buried utility networks",
    ],
    bimValue:
      "Buried services are positioned in the model alongside the foundations: crossings with footings and manholes are seen before a single trench is opened.",
    image: "svc-assainissement-voirie",
    imageAlt: "Paver and roller laying the wearing course of a road",
    metaTitle: "Drainage & roadworks — BIM Leaders",
    metaDescription:
      "Drainage and roadworks by BIM Leaders: foul and storm water networks, manholes and connections, land drainage, road construction, kerbs and buried utilities.",
  },
];

// ---------------------------------------------------------------------------
// L'HABILLAGE de la rubrique : ce qui entoure le catalogue sur /construction/
// et sur la fiche d'un métier. Séparé des six objets ci-dessus parce qu'il ne
// décrit aucun métier en particulier — et parce qu'un métier ajouté ne doit
// obliger à toucher à rien de tout cela.
// ---------------------------------------------------------------------------
const PAGE_FR = {
  eyebrow: "Notre cœur de métier",
  title: "Construction & services",
  text: "La construction est l'activité principale de BIM Leaders. Du terrassement aux finitions, nous intervenons sur l'ensemble des corps d'état — et nous en assurons la coordination, ce qui vous donne un seul interlocuteur responsable du résultat.",
  lead: "Nos équipes interviennent sur des projets résidentiels, commerciaux et industriels. Chaque lot s'appuie sur les plans d'exécution produits par notre bureau d'étude interne, et sur un modèle BIM qui confronte les corps d'état entre eux avant le démarrage des travaux.",

  // Nom de la liste de services en données structurées (schema.org ItemList).
  ldName: "Domaines d'intervention de BIM Leaders",

  finalCta: {
    title: "Un projet à chiffrer ?",
    text: "Décrivez-nous votre projet : nous revenons vers vous avec une première lecture technique et un ordre de grandeur budgétaire.",
    cta: "Demander un devis",
  },

  metaTitle: "Construction & services — nos 6 métiers",
  metaDescription:
    "Gros œuvre, second œuvre, électricité & plomberie, climatisation & désenfumage, aménagement extérieur, assainissement & voirie. BIM Leaders prend en charge tous les corps d'état à Rabat et au Maroc.",

  // Fiche d'un métier.
  detail: {
    prestations: "Nos prestations",
    bimTitle: "Ce que le BIM change sur ce lot",
    asideTitle: "Parlons de votre projet",
    asideText:
      "Un devis pour ce lot, ou pour l'ensemble des travaux ? Décrivez-nous votre projet, nous vous répondons rapidement.",
    others: "Nos autres métiers",
    // Préfixe du catalogue d'offres JSON-LD : « Prestations — Gros œuvre ».
    offerCatalog: (title) => `Prestations — ${title}`,
  },
};

const PAGE_EN = {
  eyebrow: "Our core business",
  title: "Construction & services",
  text: "Construction is what BIM Leaders does first and foremost. From earthworks to final finishes we take on every trade — and we coordinate them, which leaves you with a single party answerable for the result.",
  lead: "Our teams work on residential, commercial and industrial projects. Every package is built from shop drawings produced by our in-house design office, and from a BIM model that tests the trades against one another before work starts on site.",

  ldName: "What BIM Leaders builds",

  finalCta: {
    title: "A project to price?",
    text: "Tell us about your project and we will come back to you with an initial technical read and a budget order of magnitude.",
    cta: "Request a quote",
  },

  metaTitle: "Construction & services — our 6 trades",
  metaDescription:
    "Structural works, finishing works, electrical & plumbing, HVAC & smoke extraction, external works, drainage & roadworks. BIM Leaders takes on every trade in Rabat and across Morocco.",

  detail: {
    prestations: "What we do",
    bimTitle: "What BIM changes on this package",
    asideTitle: "Tell us about your project",
    asideText:
      "A quote for this package, or for the works as a whole? Describe your project and we will get back to you quickly.",
    others: "Our other trades",
    offerCatalog: (title) => `Services — ${title}`,
  },
};

const BY_LOCALE = { fr: SERVICES_FR, en: SERVICES_EN };
const PAGE_BY_LOCALE = { fr: PAGE_FR, en: PAGE_EN };

/** Habillage éditorial de la rubrique Construction (hors catalogue). */
export const getConstructionPage = (lang = "fr") => PAGE_BY_LOCALE[lang] || PAGE_FR;

export const getServices = (lang = "fr") => BY_LOCALE[lang] || SERVICES_FR;
export const getService = (slug, lang = "fr") => getServices(lang).find((s) => s.slug === slug);
export const serviceSlugs = (lang = "fr") => getServices(lang).map((s) => s.slug);

// Passerelles entre langues : utilisées par le sélecteur de langue et par les
// alternates hreflang, qui doivent pointer d'un slug vers son équivalent.
export const serviceKeyBySlug = (slug, lang = "fr") => getService(slug, lang)?.key;
export const serviceSlugByKey = (key, lang = "fr") =>
  getServices(lang).find((s) => s.key === key)?.slug;
