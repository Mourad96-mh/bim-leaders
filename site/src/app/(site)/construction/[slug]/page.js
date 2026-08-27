import Link from "next/link";
import { notFound } from "next/navigation";
import { SERVICES, SERVICE_SLUGS, getService } from "@/content/services";
import { COMPANY, telHref } from "@/lib/company";
import { buildMetadata, breadcrumbLd, JsonLd } from "@/lib/seo";
import { Icon } from "@/components/Icon";
import Reveal from "@/components/Reveal";
import PageHead from "@/components/PageHead";

// Obligatoire en export statique : Next doit connaître à l'avance la liste des
// pages à générer. Ajouter un métier dans content/services.js suffit.
export function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return buildMetadata({
    path: `/construction/${slug}/`,
    title: service.metaTitle,
    description: service.metaDescription,
  });
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = SERVICES.filter((s) => s.slug !== slug);
  const crumbs = [
    { name: "Accueil", path: "/" },
    { name: "Construction", path: "/construction/" },
    { name: service.title, path: `/construction/${slug}/` },
  ];

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.short,
    serviceType: service.title,
    provider: { "@id": `${COMPANY.siteUrl}/#business` },
    areaServed: COMPANY.areaServed.map((name) => ({ "@type": "City", name })),
    url: `${COMPANY.siteUrl}/construction/${slug}/`,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Prestations — ${service.title}`,
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
        eyebrow="Construction & services"
        title={service.title}
        text={service.short}
        crumbs={crumbs}
        icon={service.icon}
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
              <h2>Nos prestations</h2>
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
                    Ce que le BIM change sur ce lot
                  </strong>
                  {service.bimValue}
                </span>
              </div>
            </Reveal>
          </div>

          <aside className="service-aside">
            <h3>Parlons de votre projet</h3>
            <p>
              Un devis pour ce lot, ou pour l&apos;ensemble des travaux ? Décrivez-nous votre
              projet, nous vous répondons rapidement.
            </p>
            <div className="cta-row cta-row--stack">
              <Link className="btn btn-primary" href="/contact/">
                Demander un devis
              </Link>
              <a className="btn btn-ghost" href={`tel:${telHref()}`}>
                <Icon name="phone" size={17} />
                {COMPANY.phoneDisplay}
              </a>
            </div>

            <div className="aside-others">
              <h4>Nos autres métiers</h4>
              {others.map((o) => (
                <Link key={o.slug} href={`/construction/${o.slug}/`} className="aside-other">
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
