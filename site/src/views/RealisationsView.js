import Link from "next/link";
import { snapshot } from "@/lib/realisations";
import { getRealisationsPage } from "@/content/realisations";
import { COMPANY } from "@/lib/company";
import { path, paths, projectPath } from "@/lib/i18n";
import { t } from "@/lib/ui";
import { buildMetadata, breadcrumbLd, JsonLd } from "@/lib/seo";
import { Icon } from "@/components/Icon";
import Reveal from "@/components/Reveal";
import PageHead from "@/components/PageHead";
import RealisationsList from "@/components/RealisationsList";

// §11 du cahier des charges — le portfolio.
//
// Les projets viennent de MongoDB et n'existent qu'en français (saisis par le
// gérant) : seul l'habillage de la rubrique est traduit. Voir l'avertissement en
// tête de content/realisations.js.

export const realisationsMetadata = (lang) => {
  const copy = getRealisationsPage(lang);
  return buildMetadata({
    lang,
    paths: paths("realisations"),
    title: copy.metaTitle,
    description: copy.metaDescription,
  });
};

export default function RealisationsView({ lang = "fr" }) {
  const copy = getRealisationsPage(lang);
  const ui = t(lang);

  const crumbs = [
    { name: ui.nav.home, path: path("home", lang) },
    { name: ui.nav.realisations, path: path("realisations", lang) },
  ];

  // Lecture synchrone du snapshot : sert uniquement à poser le JSON-LD dans le
  // HTML statique. L'affichage, lui, passe par le composant client qui
  // rafraîchit la liste depuis l'API.
  const projets = snapshot();

  const listLd =
    projets.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: copy.ldName,
          numberOfItems: projets.length,
          itemListElement: projets.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: p.nom,
            url: `${COMPANY.siteUrl}${projectPath(p.slug, lang)}`,
          })),
        }
      : null;

  return (
    <>
      <JsonLd data={breadcrumbLd(crumbs)} />
      {listLd && <JsonLd data={listLd} />}

      <PageHead
        eyebrow={copy.eyebrow}
        title={copy.title}
        text={copy.text}
        crumbs={crumbs}
        icon="building"
        lang={lang}
      />

      <section className="section">
        <div className="container">
          <RealisationsList lang={lang} />
        </div>
      </section>

      <section className="section section--blue">
        <div className="container final-cta">
          <Reveal>
            <h2>{copy.finalCta.title}</h2>
            <p>{copy.finalCta.text}</p>
            <div className="cta-row cta-row--center">
              <Link className="btn btn-light" href={path("contact", lang)}>
                {copy.finalCta.cta}
                <Icon name="arrow" size={17} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
