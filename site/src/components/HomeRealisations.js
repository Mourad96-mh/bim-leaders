"use client";

import Link from "next/link";
import { HOME } from "@/content/home";
import { useRealisations } from "@/lib/useRealisations";
import { Icon } from "./Icon";
import Reveal from "./Reveal";
import ProjectCard from "./ProjectCard";

// §6.7 — aperçu des réalisations sur l'accueil.
//
// Tant qu'aucun projet n'a été publié depuis le dashboard, la section entière
// est MASQUÉE plutôt que d'afficher une galerie vide ou des projets fictifs :
// une page d'accueil sans bloc « réalisations » est plus crédible qu'une
// promesse suivie d'un trou. Elle apparaît d'elle-même au premier projet ajouté.
export default function HomeRealisations({ limit = 3 }) {
  const projets = useRealisations();
  if (!projets.length) return null;

  return (
    <section className="section section--sand">
      <div className="container">
        <Reveal>
          <div className="section-head center">
            <span className="eyebrow">{HOME.realisations.eyebrow}</span>
            <h2>{HOME.realisations.title}</h2>
            <p>{HOME.realisations.text}</p>
          </div>
        </Reveal>

        <div className="proj-grid">
          {projets.slice(0, limit).map((p) => (
            <Reveal key={p.slug || p._id}>
              <ProjectCard projet={p} />
            </Reveal>
          ))}
        </div>

        <div className="cta-row cta-row--center" style={{ marginTop: 40 }}>
          <Link className="btn btn-primary" href={HOME.realisations.cta.href}>
            {HOME.realisations.cta.label}
            <Icon name="arrow" size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
