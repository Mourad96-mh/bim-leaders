import Link from "next/link";
import { getParticuliers } from "@/content/particuliers";
import { COMPANY, text } from "@/lib/company";
import { path, paths } from "@/lib/i18n";
import { t } from "@/lib/ui";
import { buildMetadata, breadcrumbLd, JsonLd } from "@/lib/seo";
import { Icon } from "@/components/Icon";
import Reveal from "@/components/Reveal";
import PageHead from "@/components/PageHead";
import Chain from "@/components/Chain";
import ContactButtons from "@/components/ContactButtons";

// §9 du cahier des charges — Particuliers : l'étude de terrain avant achat.
//
// ⚠️ La mention `disclaimer` est imposée par le §9.2 et doit rester affichée
// dans les DEUX langues (cf. l'avertissement en tête de content/particuliers.js).

export const particuliersMetadata = (lang) => {
  const p = getParticuliers(lang);
  return buildMetadata({
    lang,
    paths: paths("particuliers"),
    title: p.metaTitle,
    description: p.metaDescription,
  });
};

export default function ParticuliersView({ lang = "fr" }) {
  const p = getParticuliers(lang);
  const ui = t(lang);
  const brand = text(lang);

  const crumbs = [
    { name: ui.nav.home, path: path("home", lang) },
    { name: ui.nav.particuliers, path: path("particuliers", lang) },
  ];

  // Lien vers le formulaire avec le sujet pré-rempli. `sujet` est un identifiant
  // technique, identique dans les deux langues (cf. content/contact.js).
  const ctaHref = `${path("contact", lang)}?sujet=etude-terrain`;

  // Le service est décrit en `Service` schema.org avec ses étapes : c'est ce que
  // Google comprend le mieux pour une prestation d'étude.
  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: p.ldName,
    serviceType: p.ldType,
    description: p.hero.text,
    provider: { "@id": `${COMPANY.siteUrl}/#business` },
    areaServed: brand.areaServed.map((name) => ({ "@type": "City", name })),
    url: `${COMPANY.siteUrl}${path("particuliers", lang)}`,
    inLanguage: lang,
    audience: { "@type": "Audience", audienceType: p.ldAudience },
  };

  return (
    <>
      <JsonLd data={breadcrumbLd(crumbs)} />
      <JsonLd data={serviceLd} />

      <PageHead
        eyebrow={p.hero.eyebrow}
        title={p.hero.title}
        text={p.hero.text}
        crumbs={crumbs}
        icon="ruler"
        lang={lang}
      />

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="lead-prose">
              <p>{p.positioning}</p>
            </div>
          </Reveal>

          <Reveal style={{ display: "flex", justifyContent: "center", marginBottom: 44 }}>
            <div className="pills">
              {p.configurations.map((c) => (
                <span key={c} className="pill">
                  {c}
                </span>
              ))}
              <span className="pills-note">{p.configurationsNote}</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* §9.2 — le processus en 7 étapes. */}
      <section className="section section--sand">
        <div className="container">
          <Reveal>
            <div className="section-head center">
              <span className="eyebrow">{p.processHead.eyebrow}</span>
              <h2>{p.processHead.title}</h2>
              <p>{p.processHead.text}</p>
            </div>
          </Reveal>

          <div className="steps">
            {p.process.map((step) => (
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
              <span>{p.disclaimer}</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* §29 — parcours client « Particulier ». */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="section-head center">
              <span className="eyebrow">{p.journeyHead.eyebrow}</span>
              <h2>{p.journeyHead.title}</h2>
              <p>{p.journeyHead.text}</p>
            </div>
          </Reveal>
          <Reveal>
            <Chain steps={p.journey} />
          </Reveal>
        </div>
      </section>

      <section className="section section--blue">
        <div className="container final-cta">
          <Reveal>
            <h2>{p.pitch}</h2>
            <p>{p.finalText}</p>
            <div className="cta-row cta-row--center">
              <Link className="btn btn-light" href={ctaHref}>
                {p.cta}
                <Icon name="arrow" size={17} />
              </Link>
            </div>
            <div style={{ marginTop: 24, display: "flex", justifyContent: "center" }}>
              <ContactButtons variant="center" message="terrain" lang={lang} />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
