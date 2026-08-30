"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRealisations } from "@/lib/useRealisations";
import { categoriesOf } from "@/lib/realisations";
import { getRealisationsPage } from "@/content/realisations";
import { path } from "@/lib/i18n";
import { t } from "@/lib/ui";
import { Icon } from "./Icon";
import Reveal from "./Reveal";
import ProjectCard from "./ProjectCard";

// §11 — le portfolio : galerie filtrable par catégorie.
//
// Les projets viennent du snapshot figé au build (donc présents dans le HTML
// pour Google) puis sont rafraîchis côté client depuis l'API — voir
// lib/realisations.js. Les catégories sont déduites des projets existants : rien
// à maintenir en double quand le gérant ajoute un type de projet inédit.
export default function RealisationsList({ lang = "fr" }) {
  const projets = useRealisations();
  const copy = getRealisationsPage(lang);
  const ui = t(lang);
  const tous = ui.projects.all;
  const [filtre, setFiltre] = useState(tous);

  const categories = useMemo(() => categoriesOf(projets, lang), [projets, lang]);
  const visibles = useMemo(
    () => (filtre === tous ? projets : projets.filter((p) => p.type === filtre)),
    [projets, filtre, tous]
  );

  if (!projets.length) {
    return (
      <div className="empty-state">
        <span className="empty-ic">
          <Icon name="crane" size={30} />
        </span>
        <h3>{copy.emptyTitle}</h3>
        <p>{copy.emptyText}</p>
        <div className="cta-row cta-row--center">
          <Link className="btn btn-primary" href={path("contact", lang)}>
            {copy.emptyCta}
            <Icon name="arrow" size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Le filtre n'apparaît que s'il y a réellement plusieurs catégories. */}
      {categories.length > 2 && (
        <div className="filters">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              className={`filter-btn ${filtre === c ? "is-active" : ""}`}
              onClick={() => setFiltre(c)}
              aria-pressed={filtre === c}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <div className="proj-grid">
        {visibles.map((p) => (
          <Reveal key={p.slug || p._id}>
            <ProjectCard projet={p} lang={lang} />
          </Reveal>
        ))}
      </div>

      {visibles.length === 0 && (
        <p style={{ textAlign: "center", color: "var(--ink-400)", padding: "40px 0" }}>
          {ui.projects.emptyCategory}
        </p>
      )}
    </>
  );
}
