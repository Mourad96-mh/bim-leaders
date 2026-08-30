import Link from "next/link";
import { projectPath } from "@/lib/i18n";
import { t } from "@/lib/ui";
import { Icon } from "./Icon";
import { statutLabel } from "@/lib/realisations";

// Fiche d'une réalisation dans une grille (§11 « affichage des informations
// principales »). Les photos viennent de Cloudinary via le dashboard : elles
// sont donc déjà dimensionnées côté service, d'où le <img> simple plutôt que
// next/image (inopérant en export statique de toute façon).
//
// Le nom, le lieu et la description du projet sont ceux saisis par le gérant,
// donc en français dans les deux langues (cf. content/realisations.js) ; le
// statut et le lien, eux, suivent la langue de la page.
export default function ProjectCard({ projet, lang = "fr" }) {
  const cover = projet.photos?.[0];
  const enCours = projet.statut === "en-cours";

  return (
    <article className="proj-card">
      <Link href={projectPath(projet.slug, lang)} style={{ display: "contents" }}>
        <div className="proj-visual">
          <span className={`badge ${enCours ? "badge--warn" : "badge--ok"}`}>
            {statutLabel(projet.statut, lang)}
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
            {t(lang).projects.see}
            <Icon name="arrow" size={15} />
          </span>
        </div>
      </Link>
    </article>
  );
}
