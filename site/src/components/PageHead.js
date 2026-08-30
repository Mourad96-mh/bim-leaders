import Link from "next/link";
import { t } from "@/lib/ui";
import { Icon } from "./Icon";

// Bandeau de tête des pages intérieures : fil d'Ariane, titre, accroche, et une
// icône filigrane côté droit. Le fil d'Ariane visible double le BreadcrumbList
// en JSON-LD posé par chaque page (cf. lib/seo.js) : les deux sont construits à
// partir de la même liste `crumbs`, déjà traduite par la page appelante.
export default function PageHead({ eyebrow, title, text, crumbs = [], icon, lang = "fr" }) {
  return (
    <section className="page-head">
      {icon && (
        <span className="ph-icon" aria-hidden="true">
          <Icon name={icon} size={180} />
        </span>
      )}
      <div className="container">
        {crumbs.length > 0 && (
          <nav className="crumbs" aria-label={t(lang).breadcrumb.aria}>
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
