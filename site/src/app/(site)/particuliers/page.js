import Link from "next/link";
import { PARTICULIERS } from "@/content/particuliers";
import { COMPANY } from "@/lib/company";
import { buildMetadata, breadcrumbLd, JsonLd } from "@/lib/seo";
import { Icon } from "@/components/Icon";
import Reveal from "@/components/Reveal";
import PageHead from "@/components/PageHead";
import Chain from "@/components/Chain";
import ContactButtons from "@/components/ContactButtons";

export const metadata = buildMetadata({
  path: "/particuliers/",
  title: PARTICULIERS.metaTitle,
  description: PARTICULIERS.metaDescription,
});

const crumbs = [
  { name: "Accueil", path: "/" },
  { name: "Particuliers", path: "/particuliers/" },
];

// Le service est décrit en `Service` schema.org avec ses étapes : c'est ce que
// Google comprend le mieux pour une prestation d'étude.
const serviceLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Étude de terrain avant achat",
  serviceType: "Étude préliminaire de potentiel constructible",
  description: PARTICULIERS.hero.text,
  provider: { "@id": `${COMPANY.siteUrl}/#business` },
  areaServed: COMPANY.areaServed.map((name) => ({ "@type": "City", name })),
  url: `${COMPANY.siteUrl}/particuliers/`,
  audience: { "@type": "Audience", audienceType: "Particuliers" },
};

export default function ParticuliersPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd(crumbs)} />
      <JsonLd data={serviceLd} />

      <PageHead
        eyebrow={PARTICULIERS.hero.eyebrow}
        title={PARTICULIERS.hero.title}
        text={PARTICULIERS.hero.text}
        crumbs={crumbs}
        icon="ruler"
      />

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="lead-prose">
              <p>{PARTICULIERS.positioning}</p>
            </div>
          </Reveal>

          <Reveal style={{ display: "flex", justifyContent: "center", marginBottom: 44 }}>
            <div className="pills">
              {PARTICULIERS.configurations.map((c) => (
                <span key={c} className="pill">
                  {c}
                </span>
              ))}
              <span className="pills-note">{PARTICULIERS.configurationsNote}</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* §9.2 — le processus en 7 étapes. */}
      <section className="section section--sand">
        <div className="container">
          <Reveal>
            <div className="section-head center">
              <span className="eyebrow">Le processus</span>
              <h2>De la parcelle à la décision, en sept étapes</h2>
              <p>
                Une étude préliminaire courte, pensée pour vous donner de quoi décider —
                pas un dossier que vous n&apos;aurez pas le temps de lire.
              </p>
            </div>
          </Reveal>

          <div className="steps">
            {PARTICULIERS.process.map((step) => (
              <Reveal key={step.n} className="step-card">
                <span className="step-n">{step.n}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            ))}
          </div>

          {/* Mention imposée par le §9.2 — voir content/particuliers.js. */}
          <Reveal style={{ marginTop: 34 }}>
            <div className="notice">
              <span className="notice-ic">
                <Icon name="alert" size={20} />
              </span>
              <span>{PARTICULIERS.disclaimer}</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* §29 — parcours client « Particulier ». */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="section-head center">
              <span className="eyebrow">Et ensuite ?</span>
              <h2>Votre parcours, de bout en bout</h2>
              <p>
                Si le terrain vous convient, nous pouvons enchaîner : BIM Leaders reste votre
                interlocuteur jusqu&apos;à la livraison.
              </p>
            </div>
          </Reveal>
          <Reveal>
            <Chain steps={PARTICULIERS.journey} />
          </Reveal>
        </div>
      </section>

      <section className="section section--blue">
        <div className="container final-cta">
          <Reveal>
            <h2>{PARTICULIERS.pitch}</h2>
            <p>
              Envoyez-nous la localisation et la superficie du terrain que vous visez. Nous
              vous dirons ce qu&apos;il est possible d&apos;y envisager.
            </p>
            <div className="cta-row cta-row--center">
              <Link className="btn btn-light" href={PARTICULIERS.cta.href}>
                {PARTICULIERS.cta.label}
                <Icon name="arrow" size={17} />
              </Link>
            </div>
            <div style={{ marginTop: 24, display: "flex", justifyContent: "center" }}>
              <ContactButtons
                variant="center"
                message="Bonjour BIM Leaders, je souhaite une étude de terrain avant achat."
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
