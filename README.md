# BIM LEADERS — site web

Site vitrine et outil de génération de prospects de **SOCIETE BIM LEADERS SARL AU**
(entrepreneur de bâtiments & travaux publics, Agdal — Rabat), avec un tableau de
bord permettant au gérant de publier lui-même ses réalisations.

Réalisé d'après le *Cahier des charges — Conception et développement du site web*
(août 2026). Les renvois du type « §11 » dans le code pointent vers ses sections.

> **Message central de la marque : « Construire avec vision. »**
> Le BIM y est présenté comme une **valeur ajoutée à la construction**, jamais
> comme une activité indépendante (§2.2 du cahier). Toute réécriture des textes
> doit respecter ce positionnement.

---

## Architecture

Deux applications indépendantes dans un seul dépôt, parce que l'hébergement est
lui-même scindé :

```
site/     Next.js 15 (App Router, JavaScript, CSS pur)
          output: "export"  →  site/out/  →  Hostinger (bimleaders.ma)

server/   Express 4 + Mongoose + Cloudinary (ESM)
          →  Render (API)  +  MongoDB Atlas  +  Cloudinary (médias)
```

### Pourquoi séparer

Hostinger est un hébergement mutualisé : il sert des fichiers, il n'exécute pas
Node. Le site est donc **entièrement statique**, et tout ce qui est dynamique —
réalisations, demandes reçues, envoi d'images — vit dans l'API sur Render.

Trois conséquences structurantes, à connaître avant toute modification :

1. **Le contenu dynamique est figé au build.** `site/scripts/sync-content.mjs`
   interroge l'API en `prebuild` et écrit `site/src/lib/realisations.data.json`,
   qui part dans le HTML généré. Sans cela, Google indexerait des pages vides.
   Après le chargement, `lib/useRealisations.js` rafraîchit la liste depuis
   l'API pour montrer ce qui a été ajouté depuis le dernier déploiement.
2. **L'authentification est un jeton JWT en en-tête**, pas un cookie httpOnly :
   le site et l'API sont sur deux domaines, un cookie ne suivrait pas.
3. **Une nouvelle réalisation apparaît tout de suite dans la grille, mais sa
   page dédiée `/realisations/<slug>/` n'existe qu'après un nouveau build.**
   C'est le compromis assumé du statique.

### Tolérance à la panne

Le plan gratuit de Render met le service en veille après ~15 minutes. Le script
de snapshot le réveille avec deux tentatives et 60 s de patience, et **conserve
le snapshot précédent** si l'API reste injoignable : un build ne dépend jamais du
réveil d'un service tiers.

---

## Démarrer en local

### L'API

```bash
cd server
npm install
cp .env.example .env        # puis renseigner MONGODB_URI, JWT_SECRET, CLOUDINARY_*
npm run create-admin contact@bimleaders.ma "MotDePasseSolide2026" "Zakariae"
npm run dev                 # http://localhost:4000
```

### Le site

```bash
cd site
npm install
cp .env.local.example .env.local    # CONTENT_API_URL + NEXT_PUBLIC_API_URL → http://localhost:4000
npm run dev                         # http://localhost:3000
```

Le tableau de bord est sur `/admin/`.

---

## Scripts du site

| Commande | Effet |
|---|---|
| `npm run dev` | serveur de développement |
| `npm run build` | snapshot du contenu puis export statique dans `out/` |
| `npm run logo` | régénère logo, favicon et symbole depuis `logo-source.jpeg` |
| `npm run og` | régénère l'image de partage `public/og.jpg` |
| `npm run media` | optimise `assets-src/` → `public/img/` en WebP + JPG |
| `npm run check:responsive` | détecte les débordements horizontaux réels sur 15 largeurs |

`check:responsive` mesure le **DOM** via CDP, pas des captures d'écran : Edge en
mode headless rogne environ 60 px à droite et produit de faux positifs.

---

## Déploiement

### API sur Render

Service web Node, racine `server/`, `npm install` puis `npm start`.
Variables : `MONGODB_URI`, `JWT_SECRET`, `CORS_ORIGIN`, `CLOUDINARY_*`.

> `CORS_ORIGIN` doit lister les origines Hostinger (`https://bimleaders.ma`,
> `https://www.bimleaders.ma`). **Laissée vide, l'API accepte toutes les
> origines** — acceptable en local, jamais en production.

### Site sur Hostinger

```bash
cd site
npm run build                                   # → out/
tar.exe --format zip -a -c -f ../bimleaders-site.zip -C out .
```

> ⚠️ **Ne jamais fabriquer cette archive avec `Compress-Archive`** (PowerShell 5.1) :
> il écrit des séparateurs antislash dans le zip, et l'extraction côté Linux
> produit des fichiers nommés `_next\static\…` au lieu d'une arborescence — tout
> le site tombe en `ChunkLoadError`. `tar.exe` (livré avec Windows) écrit des
> slashes. Vérifier avant envoi : `unzip -l ../bimleaders-site.zip | grep '\\\\'`
> doit ne rien renvoyer.

Supprimer l'ancien `_next` et les anciens HTML sur le serveur avant d'extraire.

---

## Où se trouve quoi

| Besoin | Fichier |
|---|---|
| Téléphone, e-mail, adresse, horaires, mentions légales | `site/src/lib/company.js` |
| Les 6 métiers (textes, prestations, SEO) | `site/src/content/services.js` |
| Rubrique BIM | `site/src/content/bim.js` |
| Étude de terrain (particuliers) | `site/src/content/particuliers.js` |
| Investisseurs **et opportunités d'investissement** | `site/src/content/investisseurs.js` |
| À propos, valeurs, équipe | `site/src/content/apropos.js` |
| Textes de la page d'accueil | `site/src/content/home.js` |
| Champs et listes des formulaires | `site/src/content/contact.js` |
| Palette, typographie, composants | `site/src/app/globals.css` + `patterns.css` |

Les **réalisations** ne sont pas dans ces fichiers : elles vivent en base et
s'éditent depuis `/admin/`. Les **opportunités d'investissement**, elles, sont
éditées dans `content/investisseurs.js` (choix validé avec le client).

---

## À compléter avant mise en ligne

Ces points sont marqués `À CONFIRMER` ou `PLACEHOLDER` dans le code :

- [ ] Coordonnées GPS exactes du siège (`company.js` → `geo`) — pilotent le JSON-LD et la carte
- [ ] Horaires d'ouverture réels (`company.js` → `hours` / `hoursLd`)
- [ ] Profils sociaux officiels (`company.js` → `social`, vide pour l'instant)
- [ ] Photos de chantier réelles (aucune photo d'illustration n'est présentée comme une réalisation BIM Leaders)
- [ ] Premières réalisations saisies dans le tableau de bord
- [ ] Opportunités d'investissement, si le client souhaite en publier
