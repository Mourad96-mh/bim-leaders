import Link from "next/link";
import { COMPANY, NAV, telHref } from "@/lib/company";
import { SERVICES } from "@/content/services";
import { Icon } from "./Icon";
import SocialLinks from "./SocialLinks";

export default function Footer() {
  const year = new Date().getFullYear();
  // Le pied de page reprend les métiers plutôt que la nav complète : ce sont les
  // pages qui portent le référencement local, et elles n'ont pas d'autre point
  // d'entrée global que la page /construction/.
  const pagesUtiles = NAV.filter((n) => n.href !== "/" && n.href !== "/construction/");

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link href="/" className="brand brand--footer" aria-label="BIM Leaders — accueil">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-light.png" alt="BIM Leaders" className="brand-logo brand-logo--footer" />
          </Link>
          <p>
            {COMPANY.activity}. {COMPANY.baseline}
          </p>
          <p className="footer-areas" style={{ marginTop: 18 }}>
            <Icon name="pin" size={17} />
            <span>{COMPANY.areaServed.join(" · ")}</span>
          </p>
        </div>

        <div className="footer-col">
          <h2>Nos métiers</h2>
          {SERVICES.map((s) => (
            <Link key={s.slug} href={`/construction/${s.slug}/`}>
              {s.title}
            </Link>
          ))}
        </div>

        <div className="footer-col">
          <h2>Le site</h2>
          {pagesUtiles.map((n) => (
            <Link key={n.href} href={n.href}>
              {n.label}
            </Link>
          ))}
        </div>

        <div className="footer-col">
          <h2>Contact</h2>
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
          </span>
          <SocialLinks variant="footer" />
          <span className="footer-credit">{COMPANY.slogan}</span>
        </div>
      </div>
    </footer>
  );
}
