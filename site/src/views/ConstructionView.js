import Link from "next/link";
import { getServices, getConstructionPage } from "@/content/services";
import { COMPANY } from "@/lib/company";
import { path, paths, servicePath } from "@/lib/i18n";
import { t } from "@/lib/ui";
import { buildMetadata, breadcrumbLd, JsonLd } from "@/lib/seo";
import { Icon } from "@/components/Icon";
import Reveal from "@/components/Reveal";
import CardMedia from "@/components/CardMedia";
import PageHead from "@/components/PageHead";
import ContactButtons from "@/components/ContactButtons";

// §7 du cahier des charges — sommaire des six métiers.

export const constructionMetadata = (lang) => {
  const page = getConstructionPage(lang);
  return buildMetadata({
    lang,
    paths: paths("construction"),
    title: page.metaTitle,
    description: page.metaDescription,
  });
};

export default function ConstructionView({ lang = "fr" }) {
  const page = getConstructionPage(lang);
  const services = getServices(lang);
  const ui = t(lang);

  const crumbs = [
    { name: ui.nav.home, path: path("home", lang) },
    { name: ui.nav.construction, path: path("construction", lang) },
  ];

  // Liste de services en données structurées : aide Google à comprendre que la
  // page est un sommaire de prestations et non un article.
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: page.ldName,
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.title,
      url: `${COMPANY.siteUrl}${servicePath(s.slug, lang)}`,
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbLd(crumbs)} />
      <JsonLd data={itemListLd} />

      <PageHead
        eyebrow={page.eyebrow}
        title={page.title}
        text={page.text}
        crumbs={crumbs}
        icon="crane"
        lang={lang}
      />

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="lead-prose">
              <p>{page.lead}</p>
            </div>
          </Reveal>

          <div className="cards">
            {services.map((s) => (
              <Reveal key={s.key} className="card card--media">
                <Link href={servicePath(s.slug, lang)} className="card-link">
                  <CardMedia icon={s.icon} img={s.image} alt={s.imageAlt || s.title} tone="blue" />
                  <div className="card-body">
                    <h2 style={{ fontSize: "1.16rem", marginBottom: 10 }}>{s.title}</h2>
                    <p>{s.short}</p>
                    <span className="card-more">
                      {ui.cta.detail}
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
            <h2>{page.finalCta.title}</h2>
            <p>{page.finalCta.text}</p>
            <div className="cta-row cta-row--center">
              <Link className="btn btn-light" href={path("contact", lang)}>
                {page.finalCta.cta}
                <Icon name="arrow" size={17} />
              </Link>
            </div>
            <div style={{ marginTop: 24, display: "flex", justifyContent: "center" }}>
              <ContactButtons variant="center" lang={lang} />
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
