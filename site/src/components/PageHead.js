import Link from "next/link";
import { Icon } from "./Icon";

// Bandeau de tête des pages intérieures : fil d'Ariane, titre, accroche, et une
// icône filigrane côté droit. Le fil d'Ariane visible double le BreadcrumbList
// en JSON-LD posé par chaque page (cf. lib/seo.js).
export default function PageHead({ eyebrow, title, text, crumbs = [], icon }) {
  return (
    <section className="page-head">
      {icon && (
        <span className="ph-icon" aria-hidden="true">
          <Icon name={icon} size={180} />
        </span>
      )}
      <div className="container">
        {crumbs.length > 0 && (
          <nav className="crumbs" aria-label="Fil d'Ariane">
            {crumbs.map((c, i) => (
              <span key={c.path} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                {i > 0 && <span aria-hidden="true">/</span>}
                {i === crumbs.length - 1 ? (
                  <span aria-current="page">{c.name}</span>
                ) : (
                  <Link href={c.path}>{c.name}</Link>
                )}
              </span>
            ))}
          </nav>
        )}
        {eyebrow && <span className="eyebrow eyebrow--onDark">{eyebrow}</span>}
        <h1>{title}</h1>
        {text && <p>{text}</p>}
      </div>
    </section>
  );
}
