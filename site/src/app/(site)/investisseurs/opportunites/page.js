import Link from "next/link";
import {
  OPPORTUNITES,
  OPPORTUNITES_INTRO,
  DOSSIER_CONTENU,
  statusOf,
} from "@/content/investisseurs";
import { buildMetadata, breadcrumbLd, JsonLd } from "@/lib/seo";
import { Icon } from "@/components/Icon";
import Reveal from "@/components/Reveal";
import PageHead from "@/components/PageHead";

export const metadata = buildMetadata({
  path: "/investisseurs/opportunites/",
  title: "Opportunités d'investissement immobilier",
  description:
    "Projets immobiliers développés par BIM Leaders et ouverts à des investisseurs ou partenaires financiers : études réalisées, modélisation BIM, estimation budgétaire et étude de faisabilité.",
});

const crumbs = [
  { name: "Accueil", path: "/" },
  { name: "Investisseurs", path: "/investisseurs/" },
  { name: "Opportunités", path: "/investisseurs/opportunites/" },
];

export default function OpportunitesPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd(crumbs)} />

      <PageHead
        eyebrow="Investisseurs"
        title={OPPORTUNITES_INTRO.title}
        text={OPPORTUNITES_INTRO.text}
        crumbs={crumbs}
        icon="spark"
      />

      <section className="section">
        <div className="container">
          {/* §10 bis.1 — rappel de la distinction avec « Réalisations ». */}
          <Reveal style={{ marginBottom: 40 }}>
            <div className="notice" style={{ maxWidth: 860, margin: "0 auto" }}>
              <span className="notice-ic">
                <Icon name="alert" size={20} />
              </span>
              <span>{OPPORTUNITES_INTRO.note}</span>
            </div>
          </Reveal>

          {OPPORTUNITES.length === 0 ? (
            /* Aucune opportunité ouverte : on le dit franchement et on ouvre une
               porte, plutôt que d'afficher une grille vide ou des projets
               fictifs — il s'agit d'informations présentées à des investisseurs. */
            <Reveal>
              <div className="empty-state">
                <span className="empty-ic">
                  <Icon name="building" size={30} />
                </span>
                <h3>Aucune opportunité ouverte actuellement</h3>
                <p>
                  Les projets en recherche de financement sont publiés ici dès qu&apos;ils sont
                  ouverts aux partenaires. Vous pouvez nous laisser vos coordonnées pour être
                  informé des prochaines, ou nous présenter votre propre projet.
                </p>
                <div className="cta-row cta-row--center">
                  <Link className="btn btn-primary" href="/contact/?sujet=projet-investisseur">
                    Être informé des prochaines opportunités
                    <Icon name="arrow" size={16} />
                  </Link>
                </div>
              </div>
            </Reveal>
          ) : (
            <div style={{ display: "grid", gap: 24 }}>
              {OPPORTUNITES.map((o) => {
                const statut = statusOf(o.statut);
                return (
                  <Reveal key={o.slug} className="opp-card">
                    <div className="opp-visual">
                      {o.images?.[0] && (
                        <picture>
                          <source srcSet={`/img/${o.images[0]}.webp`} type="image/webp" />
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={`/img/${o.images[0]}.jpg`} alt={o.nom} loading="lazy" />
                        </picture>
                      )}
                    </div>
                    <div className="opp-body">
                      <span className={`badge badge--${statut.tone}`}>{statut.label}</span>
                      <h3>{o.nom}</h3>
                      <span className="opp-loc">
                        <Icon name="pin" size={14} />
                        {o.localisation} — {o.typeProjet}
                      </span>

                      <div className="opp-specs">
                        {o.surfaceTerrain && (
                          <div className="opp-spec">
                            <span className="opp-spec-label">Terrain</span>
                            <span className="opp-spec-value">{o.surfaceTerrain}</span>
                          </div>
                        )}
                        {o.configuration && (
                          <div className="opp-spec">
                            <span className="opp-spec-label">Configuration</span>
                            <span className="opp-spec-value">{o.configuration}</span>
                          </div>
                        )}
                        {o.surfaceDeveloppee && (
                          <div className="opp-spec">
                            <span className="opp-spec-label">Surface développée</span>
                            <span className="opp-spec-value">{o.surfaceDeveloppee}</span>
                          </div>
                        )}
                        {o.nbLogements && (
                          <div className="opp-spec">
                            <span className="opp-spec-label">Logements / lots</span>
                            <span className="opp-spec-value">{o.nbLogements}</span>
                          </div>
                        )}
                      </div>

                      {o.etatAvancement && (
                        <p style={{ color: "var(--ink-600)", fontSize: "0.95rem", marginBottom: 14 }}>
                          <strong>État d&apos;avancement :</strong> {o.etatAvancement}
                        </p>
                      )}
                      {o.etudesRealisees?.length > 0 && (
                        <ul className="tick-grid" style={{ marginBottom: 20 }}>
                          {o.etudesRealisees.map((e) => (
                            <li key={e}>
                              <span className="tick">
                                <Icon name="check" size={12} />
                              </span>
                              {e}
                            </li>
                          ))}
                        </ul>
                      )}

                      <Link
                        className="btn btn-accent"
                        href={`/investisseurs/dossier/?projet=${encodeURIComponent(o.slug)}`}
                      >
                        Demander le dossier investisseur
                        <Icon name="arrow" size={16} />
                      </Link>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* §10 bis.4 — ce que contient le dossier transmis après qualification. */}
      <section className="section section--sand">
        <div className="container">
          <Reveal>
            <div className="section-head center">
              <span className="eyebrow">Dossier investisseur</span>
              <h2>Ce que vous recevez après qualification</h2>
              <p>
                Les données financières détaillées ne sont pas publiées sur le site. Elles sont
                transmises directement aux partenaires intéressés.
              </p>
            </div>
          </Reveal>

          <Reveal style={{ maxWidth: 780, margin: "0 auto" }}>
            <ul className="tick-grid">
              {DOSSIER_CONTENU.map((d) => (
                <li key={d}>
                  <span className="tick">
                    <Icon name="check" size={12} />
                  </span>
                  {d}
                </li>
              ))}
            </ul>
            <div className="cta-row cta-row--center" style={{ marginTop: 34 }}>
              <Link className="btn btn-primary" href="/investisseurs/dossier/">
                Demander le dossier investisseur
                <Icon name="arrow" size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
