import Link from "next/link";
import { SERVICES } from "@/content/services";
import { COMPANY } from "@/lib/company";
import { buildMetadata, breadcrumbLd, JsonLd } from "@/lib/seo";
import { Icon } from "@/components/Icon";
import Reveal from "@/components/Reveal";
import CardMedia from "@/components/CardMedia";
import PageHead from "@/components/PageHead";
import ContactButtons from "@/components/ContactButtons";

export const metadata = buildMetadata({
  path: "/construction/",
  title: "Construction & services — nos 6 métiers",
  description:
    "Gros œuvre, second œuvre, électricité & plomberie, climatisation & désenfumage, aménagement extérieur, assainissement & voirie. BIM Leaders prend en charge tous les corps d'état à Rabat et au Maroc.",
});

const crumbs = [
  { name: "Accueil", path: "/" },
  { name: "Construction", path: "/construction/" },
];

// Liste de services en données structurées : aide Google à comprendre que la
// page est un sommaire de prestations et non un article.
const itemListLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Domaines d'intervention de BIM Leaders",
  itemListElement: SERVICES.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: s.title,
    url: `${COMPANY.siteUrl}/construction/${s.slug}/`,
  })),
};

export default function ConstructionPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd(crumbs)} />
      <JsonLd data={itemListLd} />

      <PageHead
        eyebrow="Notre cœur de métier"
        title="Construction & services"
        text="La construction est l'activité principale de BIM Leaders. Du terrassement aux finitions, nous intervenons sur l'ensemble des corps d'état — et nous en assurons la coordination, ce qui vous donne un seul interlocuteur responsable du résultat."
        crumbs={crumbs}
        icon="crane"
      />

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="lead-prose">
              <p>
                Nos équipes interviennent sur des projets résidentiels, commerciaux et
                industriels. Chaque lot s&apos;appuie sur les plans d&apos;exécution produits par
                notre bureau d&apos;étude interne, et sur un modèle BIM qui confronte les
                corps d&apos;état entre eux avant le démarrage des travaux.
              </p>
            </div>
          </Reveal>

          <div className="cards">
            {SERVICES.map((s) => (
              <Reveal key={s.slug} className="card card--media">
                <Link href={`/construction/${s.slug}/`} className="card-link">
                  <CardMedia icon={s.icon} img={s.image} alt={s.imageAlt || s.title} tone="blue" />
                  <div className="card-body">
                    <h2 style={{ fontSize: "1.16rem", marginBottom: 10 }}>{s.title}</h2>
                    <p>{s.short}</p>
                    <span className="card-more">
                      Voir le détail
                      <Icon name="arrow" size={15} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--blue">
        <div className="container final-cta">
          <Reveal>
            <h2>Un projet à chiffrer ?</h2>
            <p>
              Décrivez-nous votre projet : nous revenons vers vous avec une première lecture
              technique et un ordre de grandeur budgétaire.
            </p>
            <div className="cta-row cta-row--center">
              <Link className="btn btn-light" href="/contact/">
                Demander un devis
                <Icon name="arrow" size={17} />
              </Link>
            </div>
            <div style={{ marginTop: 24, display: "flex", justifyContent: "center" }}>
              <ContactButtons variant="center" />
            </div>
            <p style={{ marginTop: 20, fontSize: "0.9rem", opacity: 0.7 }}>
              {COMPANY.legalName} — {COMPANY.address.district}, {COMPANY.address.locality}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
