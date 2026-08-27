import Link from "next/link";
import { Icon } from "./Icon";
import { statutLabel } from "@/lib/realisations";

// Fiche d'une réalisation dans une grille (§11 « affichage des informations
// principales »). Les photos viennent de Cloudinary via le dashboard : elles
// sont donc déjà dimensionnées côté service, d'où le <img> simple plutôt que
// next/image (inopérant en export statique de toute façon).
export default function ProjectCard({ projet }) {
  const cover = projet.photos?.[0];
  const enCours = projet.statut === "en-cours";

  return (
    <article className="proj-card">
      <Link href={`/realisations/${projet.slug}/`} style={{ display: "contents" }}>
        <div className="proj-visual">
          <span className={`badge ${enCours ? "badge--warn" : "badge--ok"}`}>
            {statutLabel(projet.statut)}
          </span>
          {cover ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={cover.url} alt={cover.alt || projet.nom} loading="lazy" />
          ) : (
            <span className="bp-grid" aria-hidden="true" />
          )}
          {projet.photos?.length > 1 && (
            <span className="proj-count">
              <Icon name="image" size={13} />
              {projet.photos.length}
            </span>
          )}
        </div>

        <div className="proj-body">
          <h3>{projet.nom}</h3>
          <div className="proj-meta">
            {projet.localisation && (
              <span>
                <Icon name="pin" size={13} />
                {projet.localisation}
              </span>
            )}
            {projet.annee && (
              <span>
                <Icon name="clock" size={13} />
                {projet.annee}
              </span>
            )}
            {projet.surface && (
              <span>
                <Icon name="ruler" size={13} />
                {projet.surface}
              </span>
            )}
          </div>
          {projet.description && <p>{projet.description}</p>}
          <span className="proj-more">
            Voir le projet
            <Icon name="arrow" size={15} />
          </span>
        </div>
      </Link>
    </article>
  );
}
