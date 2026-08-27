// §7 du cahier des charges — « Construction & services », le cœur de métier.
// Les prestations listées proviennent de l'Offre de service officielle de
// BIM LEADERS (§1 « Présentation de l'entreprise »), qui détaille les trois
// familles : gros/second œuvre, lots techniques, aménagements extérieurs & VRD.
//
// Ajouter un métier = ajouter un objet ici : la page /construction/, la page
// détail /construction/<slug>/, le menu, le sitemap et le JSON-LD OfferCatalog
// se mettent à jour tout seuls.

export const SERVICES = [
  {
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
    metaTitle: "Gros œuvre à Rabat — fondations, béton armé, maçonnerie",
    metaDescription:
      "BIM Leaders réalise le gros œuvre de vos projets à Rabat et partout au Maroc : terrassements, fondations, structure béton armé, maçonnerie et étanchéité. Devis gratuit.",
  },
  {
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
    metaTitle: "Second œuvre & finitions — revêtements, menuiserie, peinture",
    metaDescription:
      "Travaux de second œuvre par BIM Leaders : carrelage et marbre, menuiserie bois/aluminium/métallique, peinture, faux plafonds et cloisons. Rabat et tout le Maroc.",
  },
  {
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
    metaTitle: "Électricité & plomberie du bâtiment — BIM Leaders",
    metaDescription:
      "Installation électrique et plomberie sanitaire par BIM Leaders : courants forts et faibles, tableaux, éclairage, alimentation et évacuation, plans d'exécution.",
  },
  {
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
    metaTitle: "Climatisation, ventilation & désenfumage — BIM Leaders",
    metaDescription:
      "Installation de climatisation, ventilation et désenfumage par BIM Leaders : split et VRV, réseaux de gaines, systèmes de désenfumage, plans d'exécution.",
  },
  {
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
    metaTitle: "Aménagement extérieur & abords — BIM Leaders",
    metaDescription:
      "Aménagement extérieur par BIM Leaders : accès et stationnement, pavage et dallage, clôtures et portails, espaces verts, éclairage extérieur et terrasses.",
  },
  {
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
    metaTitle: "Assainissement & voirie (VRD) — BIM Leaders",
    metaDescription:
      "Travaux d'assainissement et de voirie par BIM Leaders : réseaux eaux usées et pluviales, regards et raccordements, drainage, voirie, bordures et VRD.",
  },
];

export const SERVICE_SLUGS = SERVICES.map((s) => s.slug);
export const getService = (slug) => SERVICES.find((s) => s.slug === slug);
