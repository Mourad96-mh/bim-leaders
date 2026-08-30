import Link from "next/link";
import { getCredits, getCreditsPage } from "@/content/credits";
import { path, paths } from "@/lib/i18n";
import { t } from "@/lib/ui";
import { buildMetadata, breadcrumbLd, JsonLd } from "@/lib/seo";
import Reveal from "@/components/Reveal";
import PageHead from "@/components/PageHead";

// Page d'attribution des photos. Elle existe pour une raison juridique : les
// licences CC BY-SA exigent de nommer l'auteur, la licence et la source, et de
// signaler les modifications. `noindex` : c'est une page d'obligation légale,
// pas de référencement — elle n'a rien à disputer aux pages métier.
//
// Les noms d'auteurs, titres d'œuvres et intitulés de licence ne sont PAS
// traduits : ce sont des données d'attribution (cf. content/credits.js).

export const creditsMetadata = (lang) => {
  const c = getCreditsPage(lang);
  return buildMetadata({
    lang,
    paths: paths("credits"),
    title: c.metaTitle,
    description: c.metaDescription,
    noindex: true,
  });
};

export default function CreditsView({ lang = "fr" }) {
  const c = getCreditsPage(lang);
  const crumbs = [
    { name: t(lang).nav.home, path: path("home", lang) },
    { name: c.title, path: path("credits", lang) },
  ];

  return (
    <>
      <JsonLd data={breadcrumbLd(crumbs)} />

      <PageHead
        eyebrow={c.eyebrow}
        title={c.title}
        text={c.text}
        crumbs={crumbs}
        icon="layers"
        lang={lang}
      />

      <section className="section">
        <div className="container narrow-prose">
          <Reveal>
            <p className="prose-p">
              {c.ourWorkBefore}
              <Link href={path("realisations", lang)}>{c.ourWorkLink}</Link>
              {c.ourWorkAfter}
            </p>
            <ul className="credits-list">
              {getCredits(lang).map((credit) => (
                <li key={credit.source}>
                  <span className="credit-usage">{credit.usage}</span>
                  <span className="credit-line">
                    <a href={credit.source} target="_blank" rel="noopener noreferrer">
                      {credit.title}
                    </a>
                    {" — "}
                    {credit.author}
                    {", "}
                    <a href={credit.licenseUrl} target="_blank" rel="noopener noreferrer">
                      {credit.license}
                    </a>
                    {credit.modified ? ` · ${credit.modified}` : null}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}
