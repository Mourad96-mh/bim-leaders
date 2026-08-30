import Link from "next/link";
import { notFound } from "next/navigation";
import { snapshot, getRealisation, statutLabel } from "@/lib/realisations";
import { getRealisationsPage } from "@/content/realisations";
import { COMPANY } from "@/lib/company";
import { path, projectPath, projectPaths } from "@/lib/i18n";
import { t } from "@/lib/ui";
import { buildMetadata, breadcrumbLd, JsonLd } from "@/lib/seo";
import { Icon } from "@/components/Icon";
import Reveal from "@/components/Reveal";
import PageHead from "@/components/PageHead";
import Gallery from "@/components/Gallery";
import BeforeAfter from "@/components/BeforeAfter";

// ⚠️ En export statique, seules les fiches présentes dans le SNAPSHOT au moment
// du build existent en tant que pages. Un projet ajouté depuis le dashboard
// apparaît immédiatement dans la GRILLE (rafraîchie côté client) mais n'a sa
// page dédiée qu'après un nouveau déploiement — le prebuild refait le snapshot.
// C'est le compromis assumé de l'hébergement statique sur Hostinger.
//
// ⚠️ Next REFUSE de construire une route dynamique qui ne prérend aucun chemin
// (« Page is missing generateStaticParams() so it cannot be used with output:
// export »). Or le catalogue est légitimement vide tant que le client n'a pas
// saisi son premier chantier. On émet donc, dans ce cas seulement, une page
// sentinelle : non indexée, absente du sitemap et de toute navigation, elle
// existe uniquement pour que le build passe. Elle disparaît d'elle-même dès la
// première réalisation publiée.
//
// Le SLUG est commun aux deux langues (il vient de la base), donc les deux
// arbres prérendent exactement la même liste.
const SENTINELLE = "a-venir";

export function realisationParams() {
  const projets = snapshot();
  if (projets.length === 0) return [{ slug: SENTINELLE }];
  return projets.map((p) => ({ slug: p.slug }));
}

export function realisationMetadata(slug, lang) {
  const copy = getRealisationsPage(lang);
  const projet = getRealisation(slug);

  if (!projet) {
    return buildMetadata({
      lang,
      paths: projectPaths(slug),
      title: copy.sentinelMetaTitle,
      description: copy.sentinelMetaDescription,
      noindex: true,
    });
  }

  const type = projet.type || copy.fallbackType;
  const lieu = projet.localisation ? copy.inLocation(projet.localisation) : "";
  return buildMetadata({
    lang,
    paths: projectPaths(slug),
    title: `${projet.nom} — ${type}${lieu}`,
    description:
      projet.description?.slice(0, 300) || copy.fallbackDescription(projet.nom, type, lieu),
    image: projet.photos?.[0]?.url || "/og.jpg",
  });
}

export default function RealisationView({ slug, lang = "fr" }) {
  const copy = getRealisationsPage(lang);
  const ui = t(lang);
  const projet = getRealisation(slug);

  const baseCrumbs = [
    { name: ui.nav.home, path: path("home", lang) },
    { name: ui.nav.realisations, path: path("realisations", lang) },
  ];

  // Page sentinelle (catalogue encore vide) : on annonce l'absence de contenu
  // au lieu d'inventer un projet, et on renvoie le visiteur vers le contact.
  if (!projet) {
    if (slug !== SENTINELLE) notFound();
    return (
      <>
        <PageHead
          eyebrow={copy.title}
          title={copy.sentinelTitle}
          crumbs={baseCrumbs}
          icon="building"
          lang={lang}
        />
        <section className="section">
          <div className="container">
            <div className="empty-state">
              <span className="empty-ic">
                <Icon name="crane" size={30} />
              </span>
              <h3>{copy.sentinelEmptyTitle}</h3>
              <p>{copy.sentinelEmptyText}</p>
              <div className="cta-row cta-row--center">
                <Link className="btn btn-primary" href={path("contact", lang)}>
                  {copy.emptyCta}
                  <Icon name="arrow" size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  const crumbs = [...baseCrumbs, { name: projet.nom, path: projectPath(slug, lang) }];

  const specs = [
    [ui.projects.specType, projet.type],
    [ui.projects.specLocation, projet.localisation],
    [ui.projects.specArea, projet.surface],
    [ui.projects.specYear, projet.annee],
    [ui.projects.specStatus, statutLabel(projet.statut, lang)],
  ].filter(([, v]) => v);

  const projetLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: projet.nom,
    description: projet.description,
    dateCreated: projet.annee ? String(projet.annee) : undefined,
    creator: { "@id": `${COMPANY.siteUrl}/#business` },
    locationCreated: projet.localisation
      ? { "@type": "Place", name: projet.localisation }
      : undefined,
    image: projet.photos?.map((p) => p.url),
    url: `${COMPANY.siteUrl}${projectPath(slug, lang)}`,
  };

  return (
    <>
      <JsonLd data={breadcrumbLd(crumbs)} />
      <JsonLd data={projetLd} />

      <PageHead
        eyebrow={statutLabel(projet.statut, lang)}
        title={projet.nom}
        text={
          projet.type && projet.localisation
            ? `${projet.type} — ${projet.localisation}`
            : projet.type
        }
        crumbs={crumbs}
        icon="building"
        lang={lang}
      />

      <section className="section">
        <div className="container service-detail-grid">
          <div>
            {projet.description && (
              <Reveal>
                <p className="service-intro">{projet.description}</p>
              </Reveal>
            )}

            {projet.prestations?.length > 0 && (
              <Reveal>
                <h2>{ui.projects.works}</h2>
                <ul className="check-list">
                  {projet.prestations.map((p) => (
                    <li key={p}>
                      <span className="tick">
                        <Icon name="check" size={13} />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            {projet.photos?.length > 0 && (
              <Reveal style={{ marginTop: 44 }}>
                <h2>{ui.projects.photos}</h2>
                <div style={{ marginTop: 20 }}>
                  <Gallery photos={projet.photos} titre={projet.nom} lang={lang} />
                </div>
              </Reveal>
            )}

            {projet.avantApres?.length > 0 && (
              <Reveal style={{ marginTop: 44 }}>
                <h2>{ui.projects.beforeAfter}</h2>
                <div style={{ display: "grid", gap: 20, marginTop: 20 }}>
                  {projet.avantApres.map((pair, i) => (
                    <BeforeAfter
                      key={i}
                      avant={pair.avant}
                      apres={pair.apres}
                      alt={projet.nom}
                      lang={lang}
                    />
                  ))}
                </div>
              </Reveal>
            )}

            {projet.videoUrl && (
              <Reveal style={{ marginTop: 44 }}>
                <h2>{ui.projects.video}</h2>
                <div className="video-embed" style={{ marginTop: 20 }}>
                  <iframe
                    src={projet.videoUrl}
                    title={copy.videoTitle(projet.nom)}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </Reveal>
            )}
          </div>

          <aside className="service-aside">
            <h3>{ui.projects.specs}</h3>
            <dl className="spec-list">
              {specs.map(([label, value]) => (
                <div className="spec-row" key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>

            <div className="cta-row cta-row--stack" style={{ marginTop: 26 }}>
              <Link className="btn btn-primary" href={path("contact", lang)}>
                {ui.projects.similar}
              </Link>
              <Link className="btn btn-ghost" href={path("realisations", lang)}>
                <Icon name="arrow" size={16} />
                {ui.projects.backToAll}
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
