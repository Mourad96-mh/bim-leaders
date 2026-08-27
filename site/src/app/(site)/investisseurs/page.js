import Link from "next/link";
import { INVESTISSEURS, OPPORTUNITES } from "@/content/investisseurs";
import { COMPANY } from "@/lib/company";
import { buildMetadata, breadcrumbLd, JsonLd } from "@/lib/seo";
import { Icon } from "@/components/Icon";
import Reveal from "@/components/Reveal";
import PageHead from "@/components/PageHead";
import Chain from "@/components/Chain";
import ContactButtons from "@/components/ContactButtons";

export const metadata = buildMetadata({
  path: "/investisseurs/",
  title: INVESTISSEURS.metaTitle,
  description: INVESTISSEURS.metaDescription,
});

const crumbs = [
  { name: "Accueil", path: "/" },
  { name: "Investisseurs", path: "/investisseurs/" },
];

const serviceLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Accompagnement des investisseurs immobiliers",
  serviceType: "Développement et réalisation de projets immobiliers",
  description: INVESTISSEURS.message,
  provider: { "@id": `${COMPANY.siteUrl}/#business` },
  areaServed: COMPANY.areaServed.map((name) => ({ "@type": "City", name })),
  url: `${COMPANY.siteUrl}/investisseurs/`,
  audience: { "@type": "Audience", audienceType: "Investisseurs et promoteurs immobiliers" },
};

export default function InvestisseursPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd(crumbs)} />
      <JsonLd data={serviceLd} />

      <PageHead
        eyebrow={INVESTISSEURS.hero.eyebrow}
        title={INVESTISSEURS.hero.title}
        text={INVESTISSEURS.hero.text}
        crumbs={crumbs}
        icon="building"
      />

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="lead-prose">
              <p>{INVESTISSEURS.positioning}</p>
            </div>
          </Reveal>

          {/* §10.2 — les douze prestations du parcours. */}
          <Reveal>
            <div className="section-head center">
              <span className="eyebrow">Notre périmètre</span>
              <h2>De l&apos;analyse initiale à la livraison</h2>
            </div>
            <ul className="tick-grid">
              {INVESTISSEURS.prestations.map((p) => (
                <li key={p}>
                  <span className="tick">
                    <Icon name="check" size={12} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* §29 — parcours client « Investisseur ». */}
      <section className="section section--sand">
        <div className="container">
          <Reveal>
            <div className="section-head center">
              <span className="eyebrow">Le parcours</span>
              <h2>Un seul partenaire technique sur tout le cycle</h2>
              <p>{INVESTISSEURS.message}</p>
            </div>
          </Reveal>
          <Reveal>
            <Chain steps={INVESTISSEURS.journey} />
          </Reveal>
        </div>
      </section>

      {/* §10 bis — passerelle vers les opportunités d'investissement. Le compteur
          n'est affiché que s'il y a effectivement des projets ouverts. */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="duo" style={{ maxWidth: 920 }}>
              <div className="duo-card">
                <span className="duo-ic">
                  <Icon name="handshake" size={26} />
                </span>
                <h3>Vous avez un projet</h3>
                <p>
                  Terrain, programme ou simple intention : nous étudions la faisabilité,
                  concevons, modélisons, chiffrons et réalisons.
                </p>
                <div className="cta-row" style={{ marginTop: 22 }}>
                  <Link className="btn btn-primary" href={INVESTISSEURS.cta.href}>
                    {INVESTISSEURS.cta.label}
                    <Icon name="arrow" size={16} />
                  </Link>
                </div>
              </div>

              <div className="duo-card">
                <span className="duo-ic">
                  <Icon name="spark" size={26} />
                </span>
                <h3>Vous cherchez un projet</h3>
                <p>
                  BIM Leaders développe aussi ses propres projets immobiliers, déjà étudiés et
                  modélisés, ouverts à des investisseurs ou partenaires financiers.
                </p>
                <div className="cta-row" style={{ marginTop: 22 }}>
                  <Link className="btn btn-accent" href="/investisseurs/opportunites/">
                    Voir les opportunités
                    {OPPORTUNITES.length > 0 && ` (${OPPORTUNITES.length})`}
                    <Icon name="arrow" size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* §10 bis.6 — le cycle complet, financement compris. */}
      <section className="section section--blue">
        <div className="container">
          <Reveal>
            <div className="section-head center">
              <span className="eyebrow eyebrow--onDark">Constructeur et développeur</span>
              <h2>Un cycle complet, financement compris</h2>
              <p>
                BIM Leaders n&apos;intervient pas seulement en exécution : l&apos;entreprise
                prépare, conçoit, modélise et peut rechercher le financement d&apos;un projet.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <Chain steps={INVESTISSEURS.cycle} />
          </Reveal>

          <div className="final-cta" style={{ marginTop: 52 }}>
            <div className="cta-row cta-row--center">
              <Link className="btn btn-light" href={INVESTISSEURS.cta.href}>
                {INVESTISSEURS.cta.label}
                <Icon name="arrow" size={17} />
              </Link>
            </div>
            <div style={{ marginTop: 24, display: "flex", justifyContent: "center" }}>
              <ContactButtons
                variant="center"
                message="Bonjour BIM Leaders, je souhaite vous présenter un projet immobilier."
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
