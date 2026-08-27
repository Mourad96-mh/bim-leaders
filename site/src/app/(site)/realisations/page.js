import Link from "next/link";
import { snapshot } from "@/lib/realisations";
import { COMPANY } from "@/lib/company";
import { buildMetadata, breadcrumbLd, JsonLd } from "@/lib/seo";
import { Icon } from "@/components/Icon";
import Reveal from "@/components/Reveal";
import PageHead from "@/components/PageHead";
import RealisationsList from "@/components/RealisationsList";

export const metadata = buildMetadata({
  path: "/realisations/",
  title: "Réalisations — projets livrés et chantiers en cours",
  description:
    "Le portfolio de BIM Leaders : projets de construction réalisés et chantiers en cours à Rabat et au Maroc. Photos, caractéristiques et prestations réalisées pour chaque projet.",
});

const crumbs = [
  { name: "Accueil", path: "/" },
  { name: "Réalisations", path: "/realisations/" },
];

export default function RealisationsPage() {
  // Lecture synchrone du snapshot : sert uniquement à poser le JSON-LD dans le
  // HTML statique. L'affichage, lui, passe par le composant client qui
  // rafraîchit la liste depuis l'API.
  const projets = snapshot();

  const listLd =
    projets.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Réalisations de BIM Leaders",
          numberOfItems: projets.length,
          itemListElement: projets.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: p.nom,
            url: `${COMPANY.siteUrl}/realisations/${p.slug}/`,
          })),
        }
      : null;

  return (
    <>
      <JsonLd data={breadcrumbLd(crumbs)} />
      {listLd && <JsonLd data={listLd} />}

      <PageHead
        eyebrow="Notre portfolio"
        title="Réalisations"
        text="Les projets que nous avons livrés et ceux que nous construisons en ce moment. Chaque fiche détaille la nature du projet, les prestations réalisées et les photos de chantier."
        crumbs={crumbs}
        icon="building"
      />

      <section className="section">
        <div className="container">
          <RealisationsList />
        </div>
      </section>

      <section className="section section--blue">
        <div className="container final-cta">
          <Reveal>
            <h2>Votre projet a sa place ici</h2>
            <p>
              Parlez-nous de ce que vous voulez construire : nous étudions la faisabilité et
              revenons vers vous avec une première lecture technique et budgétaire.
            </p>
            <div className="cta-row cta-row--center">
              <Link className="btn btn-light" href="/contact/">
                Demander un devis
                <Icon name="arrow" size={17} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
