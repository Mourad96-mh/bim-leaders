import Link from "next/link";
import { COMPANY, telHref, text } from "@/lib/company";
import { path, servicePath } from "@/lib/i18n";
import { t, NAV_KEYS } from "@/lib/ui";
import Logo from "./Logo";
import { getServices } from "@/content/services";
import { Icon } from "./Icon";
import SocialLinks from "./SocialLinks";

export default function Footer({ lang = "fr" }) {
  const year = new Date().getFullYear();
  const ui = t(lang);
  const brand = text(lang);

  // Le pied de page reprend les métiers plutôt que la nav complète : ce sont les
  // pages qui portent le référencement local, et elles n'ont pas d'autre point
  // d'entrée global que la page /construction/.
  const pagesUtiles = NAV_KEYS.filter((k) => k !== "home" && k !== "construction");

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo variant="light" className="brand--footer" height={58} lang={lang} />
          <p>
            {brand.activity}. {brand.baseline}
          </p>
          <p className="footer-areas" style={{ marginTop: 18 }}>
            <Icon name="pin" size={17} />
            <span>{brand.areaServed.join(" · ")}</span>
          </p>
        </div>

        <div className="footer-col">
          <h2>{ui.footer.trades}</h2>
          {getServices(lang).map((s) => (
            <Link key={s.slug} href={servicePath(s.slug, lang)}>
              {s.title}
            </Link>
          ))}
        </div>

        <div className="footer-col">
          <h2>{ui.footer.site}</h2>
          {pagesUtiles.map((key) => (
            <Link key={key} href={path(key, lang)}>
              {ui.nav[key]}
            </Link>
          ))}
        </div>

        <div className="footer-col">
          <h2>{ui.footer.contact}</h2>
          <a className="footer-icon-link" href={`tel:${telHref()}`}>
            <Icon name="phone" size={16} />
            {COMPANY.phoneDisplay}
          </a>
          <a className="footer-icon-link" href={`mailto:${COMPANY.email}`}>
            <Icon name="mail" size={16} />
            {COMPANY.email}
          </a>
          <a
            className="footer-icon-link footer-map"
            href={COMPANY.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="pin" size={16} />
            <span>
              {COMPANY.address.street}
              <br />
              {COMPANY.address.district}, {COMPANY.address.locality}
            </span>
          </a>
        </div>
      </div>

      <div className="container">
        <div className="footer-bottom">
          <span>
            © {year} {COMPANY.legalName} — RC {COMPANY.legal.rc} · ICE {COMPANY.legal.ice}
            {" · "}
            {/* Attribution des photos d'illustration : exigée par leurs licences. */}
            <Link href={path("credits", lang)} className="footer-legal-link">
              {ui.footer.credits}
            </Link>
          </span>
          <SocialLinks variant="footer" lang={lang} />
          <span className="footer-credit">{brand.slogan}</span>
        </div>
      </div>
    </footer>
  );
}
