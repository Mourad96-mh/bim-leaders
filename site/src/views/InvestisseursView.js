import Link from "next/link";
import { getInvestisseurs, OPPORTUNITES } from "@/content/investisseurs";
import { COMPANY, text } from "@/lib/company";
import { path, paths } from "@/lib/i18n";
import { t } from "@/lib/ui";
import { buildMetadata, breadcrumbLd, JsonLd } from "@/lib/seo";
import { Icon } from "@/components/Icon";
import Reveal from "@/components/Reveal";
import PageHead from "@/components/PageHead";
import Chain from "@/components/Chain";
import ContactButtons from "@/components/ContactButtons";

// §10 du cahier des charges — Investisseurs.

export const investisseursMetadata = (lang) => {
  const inv = getInvestisseurs(lang);
  return buildMetadata({
    lang,
    paths: paths("investisseurs"),
    title: inv.metaTitle,
    description: inv.metaDescription,
  });
};

export default function InvestisseursView({ lang = "fr" }) {
  const inv = getInvestisseurs(lang);
  const ui = t(lang);
  const brand = text(lang);

  const crumbs = [
    { name: ui.nav.home, path: path("home", lang) },
    { name: ui.nav.investisseurs, path: path("investisseurs", lang) },
  ];

  const ctaHref = `${path("contact", lang)}?sujet=projet-investisseur`;

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: inv.ldName,
    serviceType: inv.ldType,
    description: inv.message,
    provider: { "@id": `${COMPANY.siteUrl}/#business` },
    areaServed: brand.areaServed.map((name) => ({ "@type": "City", name })),
    url: `${COMPANY.siteUrl}${path("investisseurs", lang)}`,
    inLanguage: lang,
    audience: { "@type": "Audience", audienceType: inv.ldAudience },
  };

  return (
    <>
      <JsonLd data={breadcrumbLd(crumbs)} />
      <JsonLd data={serviceLd} />

      <PageHead
        eyebrow={inv.hero.eyebrow}
        title={inv.hero.title}
        text={inv.hero.text}
        crumbs={crumbs}
        icon="building"
        lang={lang}
      />

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="lead-prose">
              <p>{inv.positioning}</p>
            </div>
          </Reveal>

          {/* §10.2 — les douze prestations du parcours. */}
          <Reveal>
            <div className="section-head center">
              <span className="eyebrow">{inv.prestationsHead.eyebrow}</span>
              <h2>{inv.prestationsHead.title}</h2>
            </div>
            <ul className="tick-grid">
              {inv.prestations.map((p) => (
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
              <span className="eyebrow">{inv.journeyHead.eyebrow}</span>
              <h2>{inv.journeyHead.title}</h2>
              <p>{inv.message}</p>
            </div>
          </Reveal>
          <Reveal>
            <Chain steps={inv.journey} />
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
                <h3>{inv.duo.haveTitle}</h3>
                <p>{inv.duo.haveText}</p>
                <div className="cta-row" style={{ marginTop: 22 }}>
                  <Link className="btn btn-primary" href={ctaHref}>
                    {inv.cta}
                    <Icon name="arrow" size={16} />
                  </Link>
                </div>
              </div>

              <div className="duo-card">
                <span className="duo-ic">
                  <Icon name="spark" size={26} />
                </span>
                <h3>{inv.duo.seekTitle}</h3>
                <p>{inv.duo.seekText}</p>
                <div className="cta-row" style={{ marginTop: 22 }}>
                  <Link className="btn btn-accent" href={path("opportunites", lang)}>
                    {inv.duo.seekCta}
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
              <span className="eyebrow eyebrow--onDark">{inv.cycleHead.eyebrow}</span>
              <h2>{inv.cycleHead.title}</h2>
              <p>{inv.cycleHead.text}</p>
            </div>
          </Reveal>
          <Reveal>
            <Chain steps={inv.cycle} />
          </Reveal>

          <div className="final-cta" style={{ marginTop: 52 }}>
            <div className="cta-row cta-row--center">
              <Link className="btn btn-light" href={ctaHref}>
                {inv.cta}
                <Icon name="arrow" size={17} />
              </Link>
            </div>
            <div style={{ marginTop: 24, display: "flex", justifyContent: "center" }}>
              <ContactButtons variant="center" message="investisseur" lang={lang} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
