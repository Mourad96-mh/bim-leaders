import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getServices,
  getService,
  serviceSlugs,
  getConstructionPage,
} from "@/content/services";
import { COMPANY, telHref, text } from "@/lib/company";
import { path, servicePath, servicePaths } from "@/lib/i18n";
import { t } from "@/lib/ui";
import { buildMetadata, breadcrumbLd, JsonLd } from "@/lib/seo";
import { Icon } from "@/components/Icon";
import Reveal from "@/components/Reveal";
import PageHead from "@/components/PageHead";

// Fiche d'un métier — /construction/gros-oeuvre/ et /en/construction/structural-works/.
//
// Les SLUGS DIFFÈRENT d'une langue à l'autre : chaque arbre génère donc ses
// propres pages à partir de son propre catalogue. C'est la `key` du métier, elle
// stable, qui relie les deux fiches pour le canonique et les hreflang.

/** Slugs à pré-générer pour une langue (obligatoire en export statique). */
export const serviceParams = (lang) => serviceSlugs(lang).map((slug) => ({ slug }));

export function serviceMetadata(slug, lang) {
  const service = getService(slug, lang);
  if (!service) return {};
  return buildMetadata({
    lang,
    paths: servicePaths(service.key),
    title: service.metaTitle,
    description: service.metaDescription,
  });
}

export default function ServiceView({ slug, lang = "fr" }) {
  const service = getService(slug, lang);
  if (!service) notFound();

  const page = getConstructionPage(lang);
  const ui = t(lang);
  const brand = text(lang);
  const others = getServices(lang).filter((s) => s.slug !== slug);

  const crumbs = [
    { name: ui.nav.home, path: path("home", lang) },
    { name: ui.nav.construction, path: path("construction", lang) },
    { name: service.title, path: servicePath(slug, lang) },
  ];

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.short,
    serviceType: service.title,
    provider: { "@id": `${COMPANY.siteUrl}/#business` },
    areaServed: brand.areaServed.map((name) => ({ "@type": "City", name })),
    url: `${COMPANY.siteUrl}${servicePath(slug, lang)}`,
    inLanguage: lang,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: page.detail.offerCatalog(service.title),
      itemListElement: service.prestations.map((p) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: p },
      })),
    },
  };

  return (
    <>
      <JsonLd data={breadcrumbLd(crumbs)} />
      <JsonLd data={serviceLd} />

      <PageHead
        eyebrow={page.title}
        title={service.title}
        text={service.short}
        crumbs={crumbs}
        icon={service.icon}
        lang={lang}
      />

      <section className="section">
        <div className="container service-detail-grid">
          <div>
            {/* Photo d'illustration du lot — pas une réalisation BIM Leaders
                (crédits et licences sur /credits/). */}
            {service.image && (
              <Reveal>
                <figure className="service-photo">
                  <picture>
                    <source srcSet={`/img/${service.image}.webp`} type="image/webp" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/img/${service.image}.jpg`}
                      alt={service.imageAlt || service.title}
                      width="800"
                      height="450"
                      decoding="async"
                    />
                  </picture>
                </figure>
              </Reveal>
            )}

            <Reveal>
              <p className="service-intro">{service.intro}</p>
            </Reveal>

            <Reveal>
              <h2>{page.detail.prestations}</h2>
              <ul className="check-list">
                {service.prestations.map((p) => (
                  <li key={p}>
                    <span className="tick">
                      <Icon name="check" size={13} />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* §2.2 : le BIM doit être présenté comme une valeur ajoutée à la
                construction. Chaque métier porte donc son propre apport BIM,
                concret, plutôt qu'un discours générique. */}
            <Reveal style={{ marginTop: 44 }}>
              <div className="notice">
                <span className="notice-ic">
                  <Icon name="layers" size={20} />
                </span>
                <span>
                  <strong style={{ display: "block", marginBottom: 4, color: "var(--blue-900)" }}>
                    {page.detail.bimTitle}
                  </strong>
                  {service.bimValue}
                </span>
              </div>
            </Reveal>
          </div>

          <aside className="service-aside">
            <h3>{page.detail.asideTitle}</h3>
            <p>{page.detail.asideText}</p>
            <div className="cta-row cta-row--stack">
              <Link className="btn btn-primary" href={path("contact", lang)}>
                {ui.cta.quote}
              </Link>
              <a className="btn btn-ghost" href={`tel:${telHref()}`}>
                <Icon name="phone" size={17} />
                {COMPANY.phoneDisplay}
              </a>
            </div>

            <div className="aside-others">
              <h4>{page.detail.others}</h4>
              {others.map((o) => (
                <Link key={o.key} href={servicePath(o.slug, lang)} className="aside-other">
                  <span className="ao-ic">
                    <Icon name={o.icon} size={16} />
                  </span>
                  {o.title}
                  <span className="ao-arrow">
                    <Icon name="arrow" size={15} />
                  </span>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
