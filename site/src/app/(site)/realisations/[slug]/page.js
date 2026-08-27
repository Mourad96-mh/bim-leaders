import Link from "next/link";
import { notFound } from "next/navigation";
import { snapshot, getRealisation, statutLabel } from "@/lib/realisations";
import { COMPANY } from "@/lib/company";
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
const SENTINELLE = "a-venir";

export function generateStaticParams() {
  const projets = snapshot();
  if (projets.length === 0) return [{ slug: SENTINELLE }];
  return projets.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const projet = getRealisation(slug);
  if (!projet) {
    return buildMetadata({
      path: `/realisations/${slug}/`,
      title: "Réalisation à venir",
      description: "Cette réalisation n'est pas encore publiée.",
      noindex: true,
    });
  }

  const lieu = projet.localisation ? ` à ${projet.localisation}` : "";
  return buildMetadata({
    path: `/realisations/${slug}/`,
    title: `${projet.nom} — ${projet.type || "projet de construction"}${lieu}`,
    description:
      projet.description?.slice(0, 300) ||
      `${projet.nom} : ${projet.type || "projet de construction"} réalisé par BIM Leaders${lieu}.`,
    image: projet.photos?.[0]?.url || "/og.jpg",
  });
}

export default async function RealisationPage({ params }) {
  const { slug } = await params;
  const projet = getRealisation(slug);

  // Page sentinelle (catalogue encore vide) : on annonce l'absence de contenu
  // au lieu d'inventer un projet, et on renvoie le visiteur vers le contact.
  if (!projet) {
    if (slug !== SENTINELLE) notFound();
    return (
      <>
        <PageHead
          eyebrow="Réalisations"
          title="Cette réalisation n'est pas encore publiée"
          crumbs={[
            { name: "Accueil", path: "/" },
            { name: "Réalisations", path: "/realisations/" },
          ]}
          icon="building"
        />
        <section className="section">
          <div className="container">
            <div className="empty-state">
              <span className="empty-ic">
                <Icon name="crane" size={30} />
              </span>
              <h3>Aucune fiche à afficher</h3>
              <p>
                Nos réalisations sont en cours de publication. Parlez-nous de votre projet :
                nous vous présenterons des références comparables.
              </p>
              <div className="cta-row cta-row--center">
                <Link className="btn btn-primary" href="/contact/">
                  Parlons de votre projet
                  <Icon name="arrow" size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  const crumbs = [
    { name: "Accueil", path: "/" },
    { name: "Réalisations", path: "/realisations/" },
    { name: projet.nom, path: `/realisations/${slug}/` },
  ];

  const specs = [
    ["Type de projet", projet.type],
    ["Localisation", projet.localisation],
    ["Surface", projet.surface],
    ["Année", projet.annee],
    ["Statut", statutLabel(projet.statut)],
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
    url: `${COMPANY.siteUrl}/realisations/${slug}/`,
  };

  return (
    <>
      <JsonLd data={breadcrumbLd(crumbs)} />
      <JsonLd data={projetLd} />

      <PageHead
        eyebrow={statutLabel(projet.statut)}
        title={projet.nom}
        text={projet.type && projet.localisation ? `${projet.type} — ${projet.localisation}` : projet.type}
        crumbs={crumbs}
        icon="building"
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
                <h2>Prestations réalisées</h2>
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
                <h2>Photos du chantier</h2>
                <div style={{ marginTop: 20 }}>
                  <Gallery photos={projet.photos} titre={projet.nom} />
                </div>
              </Reveal>
            )}

            {projet.avantApres?.length > 0 && (
              <Reveal style={{ marginTop: 44 }}>
                <h2>Avant / après</h2>
                <div style={{ display: "grid", gap: 20, marginTop: 20 }}>
                  {projet.avantApres.map((pair, i) => (
                    <BeforeAfter
                      key={i}
                      avant={pair.avant}
                      apres={pair.apres}
                      alt={projet.nom}
                    />
                  ))}
                </div>
              </Reveal>
            )}

            {projet.videoUrl && (
              <Reveal style={{ marginTop: 44 }}>
                <h2>Vidéo</h2>
                <div className="video-embed" style={{ marginTop: 20 }}>
                  <iframe
                    src={projet.videoUrl}
                    title={`Vidéo — ${projet.nom}`}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </Reveal>
            )}
          </div>

          <aside className="service-aside">
            <h3>Caractéristiques</h3>
            <dl className="spec-list">
              {specs.map(([label, value]) => (
                <div className="spec-row" key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>

            <div className="cta-row cta-row--stack" style={{ marginTop: 26 }}>
              <Link className="btn btn-primary" href="/contact/">
                Un projet similaire ?
              </Link>
              <Link className="btn btn-ghost" href="/realisations/">
                <Icon name="arrow" size={16} />
                Toutes les réalisations
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
