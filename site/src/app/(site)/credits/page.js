import { PHOTO_CREDITS } from "@/content/credits";
import { buildMetadata, breadcrumbLd, JsonLd } from "@/lib/seo";
import Reveal from "@/components/Reveal";
import PageHead from "@/components/PageHead";

// Page d'attribution des photos. Elle existe pour une raison juridique : les
// licences CC BY-SA exigent de nommer l'auteur, la licence et la source, et de
// signaler les modifications. `noindex` : c'est une page d'obligation légale,
// pas de référencement — elle n'a rien à disputer aux pages métier.
export const metadata = buildMetadata({
  path: "/credits/",
  title: "Crédits photo",
  description:
    "Origine, auteur et licence des photographies d'illustration utilisées sur le site de BIM Leaders.",
  noindex: true,
});

const crumbs = [
  { name: "Accueil", path: "/" },
  { name: "Crédits photo", path: "/credits/" },
];

export default function CreditsPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd(crumbs)} />

      <PageHead
        eyebrow="Mentions"
        title="Crédits photo"
        text="Les photographies d'illustration de ce site proviennent de Wikimedia Commons. Elles illustrent un métier du bâtiment ; aucune n'est une réalisation de BIM Leaders."
        crumbs={crumbs}
        icon="layers"
      />

      <section className="section">
        <div className="container narrow-prose">
          <Reveal>
            <p className="prose-p">
              Nos propres chantiers sont présentés dans la rubrique{" "}
              <a href="/realisations/">Réalisations</a>, et nulle part ailleurs.
            </p>
            <ul className="credits-list">
              {PHOTO_CREDITS.map((c) => (
                <li key={c.usage}>
                  <span className="credit-usage">{c.usage}</span>
                  <span className="credit-line">
                    <a href={c.source} target="_blank" rel="noopener noreferrer">
                      {c.title}
                    </a>
                    {" — "}
                    {c.author}
                    {", "}
                    <a href={c.licenseUrl} target="_blank" rel="noopener noreferrer">
                      {c.license}
                    </a>
                    {c.modified ? ` · ${c.modified}` : null}
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
