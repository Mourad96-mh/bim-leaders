import { Suspense } from "react";
import { getContact } from "@/content/contact";
import { COMPANY, telHref, whatsappHref, text, openingHours } from "@/lib/company";
import { path, paths } from "@/lib/i18n";
import { t } from "@/lib/ui";
import { buildMetadata, breadcrumbLd, JsonLd } from "@/lib/seo";
import { Icon } from "@/components/Icon";
import Reveal from "@/components/Reveal";
import PageHead from "@/components/PageHead";
import LeadForm from "@/components/LeadForm";

// §13 du cahier des charges — page Contact.

export const contactMetadata = (lang) => {
  const c = getContact(lang);
  return buildMetadata({
    lang,
    paths: paths("contact"),
    title: c.metaTitle,
    description: c.metaDescription,
  });
};

// Carte sans clé API : le paramètre `output=embed` de Google Maps suffit pour un
// simple repère, et évite d'exposer une clé côté client (§19).
const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  `${COMPANY.address.street}, ${COMPANY.address.district}, ${COMPANY.address.locality}`
)}&output=embed`;

export default function ContactView({ lang = "fr" }) {
  const c = getContact(lang);
  const ui = t(lang);
  const brand = text(lang);

  const crumbs = [
    { name: ui.nav.home, path: path("home", lang) },
    { name: ui.nav.contact, path: path("contact", lang) },
  ];

  return (
    <>
      <JsonLd data={breadcrumbLd(crumbs)} />

      <PageHead
        eyebrow={c.hero.eyebrow}
        title={c.hero.title}
        text={c.hero.text}
        crumbs={crumbs}
        icon="mail"
        lang={lang}
      />

      <section className="section">
        <div className="container contact-grid">
          {/* useSearchParams (pré-remplissage ?sujet=) impose une frontière
              Suspense, sinon le prérendu statique échoue au build. */}
          <Suspense fallback={<div className="form-card" style={{ minHeight: 620 }} />}>
            <LeadForm kind="contact" lang={lang} />
          </Suspense>

          <div className="contact-side">
            <Reveal className="contact-block">
              <h3>
                <span className="cb-ic">
                  <Icon name="phone" size={19} />
                </span>
                {c.reach}
              </h3>
              <div className="phone-list">
                <a className="phone-link" href={`tel:${telHref()}`}>
                  <span className="pl-ic">
                    <Icon name="phone" size={16} />
                  </span>
                  <span className="pl-text">{COMPANY.phoneDisplay}</span>
                </a>
                <a
                  className="phone-link"
                  href={whatsappHref(ui.whatsappMessage.default)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="pl-ic">
                    <Icon name="whatsapp" size={16} />
                  </span>
                  <span className="pl-text">
                    <span className="pl-label">WhatsApp</span>
                    {COMPANY.phoneDisplay}
                  </span>
                </a>
                <a className="phone-link" href={`mailto:${COMPANY.email}`}>
                  <span className="pl-ic">
                    <Icon name="mail" size={16} />
                  </span>
                  <span className="pl-text" style={{ wordBreak: "break-all" }}>
                    {COMPANY.email}
                  </span>
                </a>
              </div>
            </Reveal>

            <Reveal className="contact-block">
              <h3>
                <span className="cb-ic">
                  <Icon name="pin" size={19} />
                </span>
                {c.addressTitle}
              </h3>
              <p className="contact-address">
                <strong>{COMPANY.legalName}</strong>
                <br />
                {COMPANY.address.street}
                <br />
                {COMPANY.address.district}, {COMPANY.address.locality}
                <br />
                {brand.countryName}
              </p>
              <a
                className="addr-map"
                href={COMPANY.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {c.openMaps}
                <Icon name="arrow" size={14} />
              </a>
              <p className="contact-address contact-address--coverage">
                {c.coverage} {brand.areaServed.join(" · ")}
              </p>
            </Reveal>

            <Reveal className="contact-block">
              <h3>
                <span className="cb-ic">
                  <Icon name="clock" size={19} />
                </span>
                {c.hoursTitle}
              </h3>
              <div className="contact-meta">
                {openingHours(lang).map((h) => (
                  <span
                    key={h.days}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 16,
                      color: "var(--ink-600)",
                      fontSize: "0.95rem",
                    }}
                  >
                    <span>{h.days}</span>
                    <strong style={{ color: "var(--blue-800)" }}>{h.time}</strong>
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal className="map-embed">
              <iframe
                src={mapSrc}
                title={`${c.mapTitle} ${COMPANY.legalName}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
