import Link from "next/link";
import {
  OPPORTUNITES,
  getOpportunitesIntro,
  getDossierContenu,
  localizeOpportunite,
  statusOf,
} from "@/content/investisseurs";
import { path, paths } from "@/lib/i18n";
import { t } from "@/lib/ui";
import { buildMetadata, breadcrumbLd, JsonLd } from "@/lib/seo";
import { Icon } from "@/components/Icon";
import Reveal from "@/components/Reveal";
import PageHead from "@/components/PageHead";

// §10 bis du cahier des charges — opportunités d'investissement.
//
// Les opportunités sont éditées dans content/investisseurs.js et portent leurs
// textes sous forme { fr, en } : `localizeOpportunite` les aplatit dans la
// langue de la page.

export const opportunitesMetadata = (lang) => {
  const intro = getOpportunitesIntro(lang);
  return buildMetadata({
    lang,
    paths: paths("opportunites"),
    title: intro.metaTitle,
    description: intro.metaDescription,
  });
};

export default function OpportunitesView({ lang = "fr" }) {
  const intro = getOpportunitesIntro(lang);
  const ui = t(lang);

  const crumbs = [
    { name: ui.nav.home, path: path("home", lang) },
    { name: ui.nav.investisseurs, path: path("investisseurs", lang) },
    { name: intro.title, path: path("opportunites", lang) },
  ];

  const dossierHref = path("dossier", lang);

  return (
    <>
      <JsonLd data={breadcrumbLd(crumbs)} />

      <PageHead
        eyebrow={intro.eyebrow}
        title={intro.title}
        text={intro.text}
        crumbs={crumbs}
        icon="spark"
        lang={lang}
      />

      <section className="section">
        <div className="container">
          {/* §10 bis.1 — rappel de la distinction avec « Réalisations ». */}
          <Reveal style={{ marginBottom: 40 }}>
            <div className="notice" style={{ maxWidth: 860, margin: "0 auto" }}>
              <span className="notice-ic">
                <Icon name="alert" size={20} />
              </span>
              <span>{intro.note}</span>
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
                <h3>{intro.emptyTitle}</h3>
                <p>{intro.emptyText}</p>
                <div className="cta-row cta-row--center">
                  <Link
                    className="btn btn-primary"
                    href={`${path("contact", lang)}?sujet=projet-investisseur`}
                  >
                    {intro.emptyCta}
                    <Icon name="arrow" size={16} />
                  </Link>
                </div>
              </div>
            </Reveal>
          ) : (
            <div style={{ display: "grid", gap: 24 }}>
              {OPPORTUNITES.map((raw) => {
                const o = localizeOpportunite(raw, lang);
                const statut = statusOf(o.statut, lang);
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
                            <span className="opp-spec-label">{intro.specTerrain}</span>
                            <span className="opp-spec-value">{o.surfaceTerrain}</span>
                          </div>
                        )}
                        {o.configuration && (
                          <div className="opp-spec">
                            <span className="opp-spec-label">{intro.specConfiguration}</span>
                            <span className="opp-spec-value">{o.configuration}</span>
                          </div>
                        )}
                        {o.surfaceDeveloppee && (
                          <div className="opp-spec">
                            <span className="opp-spec-label">{intro.specSurface}</span>
                            <span className="opp-spec-value">{o.surfaceDeveloppee}</span>
                          </div>
                        )}
                        {o.nbLogements && (
                          <div className="opp-spec">
                            <span className="opp-spec-label">{intro.specLogements}</span>
                            <span className="opp-spec-value">{o.nbLogements}</span>
                          </div>
                        )}
                      </div>

                      {o.etatAvancement && (
                        <p
                          style={{
                            color: "var(--ink-600)",
                            fontSize: "0.95rem",
                            marginBottom: 14,
                          }}
                        >
                          <strong>{intro.progress}</strong> {o.etatAvancement}
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
                        href={`${dossierHref}?projet=${encodeURIComponent(o.slug)}`}
                      >
                        {intro.askDossier}
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
              <span className="eyebrow">{intro.dossierHead.eyebrow}</span>
              <h2>{intro.dossierHead.title}</h2>
              <p>{intro.dossierHead.text}</p>
            </div>
          </Reveal>

          <Reveal style={{ maxWidth: 780, margin: "0 auto" }}>
            <ul className="tick-grid">
              {getDossierContenu(lang).map((d) => (
                <li key={d}>
                  <span className="tick">
                    <Icon name="check" size={12} />
                  </span>
                  {d}
                </li>
              ))}
            </ul>
            <div className="cta-row cta-row--center" style={{ marginTop: 34 }}>
              <Link className="btn btn-primary" href={dossierHref}>
                {intro.askDossier}
                <Icon name="arrow" size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
