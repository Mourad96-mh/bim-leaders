import Link from "next/link";
import { getApropos } from "@/content/apropos";
import { COMPANY, text } from "@/lib/company";
import { path, paths } from "@/lib/i18n";
import { t } from "@/lib/ui";
import { buildMetadata, breadcrumbLd, JsonLd } from "@/lib/seo";
import { Icon } from "@/components/Icon";
import Reveal from "@/components/Reveal";
import PageHead from "@/components/PageHead";
import ContactButtons from "@/components/ContactButtons";

// §12 du cahier des charges — À propos.
//
// Le bloc « Informations légales » mélange volontairement deux sources : les
// VALEURS viennent de COMPANY (elles ne se traduisent pas — un numéro d'ICE est
// un numéro d'ICE), les INTITULÉS de t(lang).legal, et la forme juridique de
// text(lang) puisqu'elle, elle, a une formulation anglaise.

export const aproposMetadata = (lang) => {
  const a = getApropos(lang);
  return buildMetadata({
    lang,
    paths: paths("apropos"),
    title: a.metaTitle,
    description: a.metaDescription,
  });
};

export default function AproposView({ lang = "fr" }) {
  const a = getApropos(lang);
  const ui = t(lang);
  const brand = text(lang);

  const crumbs = [
    { name: ui.nav.home, path: path("home", lang) },
    { name: ui.nav.apropos, path: path("apropos", lang) },
  ];

  return (
    <>
      <JsonLd data={breadcrumbLd(crumbs)} />

      <PageHead
        eyebrow={a.hero.eyebrow}
        title={a.hero.title}
        text={a.hero.text}
        crumbs={crumbs}
        icon="helmet"
        lang={lang}
      />

      {/* Mission & vision */}
      <section className="section">
        <div className="container">
          <div className="duo" style={{ maxWidth: 920 }}>
            <Reveal className="duo-card">
              <span className="duo-ic">
                <Icon name="target" size={26} />
              </span>
              <h3>{a.missionTitle}</h3>
              <p>{a.mission}</p>
            </Reveal>
            <Reveal className="duo-card">
              <span className="duo-ic">
                <Icon name="eye" size={26} />
              </span>
              <h3>{a.visionTitle}</h3>
              <p>{a.vision}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Les six valeurs de l'Offre de service. */}
      <section className="section section--sand">
        <div className="container">
          <Reveal>
            <div className="section-head center">
              <span className="eyebrow">{a.valuesHead.eyebrow}</span>
              <h2>{a.valuesHead.title}</h2>
            </div>
          </Reveal>
          <div className="cards">
            {a.values.map((v) => (
              <Reveal key={v.title} className="value-card">
                <span className="value-ic">
                  <Icon name={v.icon} size={26} />
                </span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Encadrement de chantier. */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="section-head center">
              <span className="eyebrow">{a.team.eyebrow}</span>
              <h2>{a.team.title}</h2>
              <p>{a.team.intro}</p>
            </div>
          </Reveal>

          <div className="steps">
            {a.team.roles.map((r, i) => (
              <Reveal key={r.title} className="step-card">
                <span className="step-n">{String.fromCharCode(65 + i)}</span>
                <h3>{r.title}</h3>
                <p>{r.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Bureau d'étude interne — argument différenciant fort. */}
      <section className="section section--blue">
        <div className="container">
          <Reveal>
            <div className="section-head center">
              <span className="eyebrow eyebrow--onDark">{a.bureauEtude.eyebrow}</span>
              <h2>{a.bureauEtude.title}</h2>
              <p>{a.bureauEtude.text}</p>
            </div>
          </Reveal>
          <Reveal style={{ maxWidth: 860, margin: "0 auto" }}>
            <ul className="tick-grid tick-grid--onDark">
              {a.bureauEtude.livrables.map((l) => (
                <li key={l}>
                  <span className="tick">
                    <Icon name="check" size={12} />
                  </span>
                  {l}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Méthodologie d'exécution. */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="section-head center">
              <span className="eyebrow">{a.engagementsHead.eyebrow}</span>
              <h2>{a.engagementsHead.title}</h2>
            </div>
          </Reveal>
          <div className="cards">
            {a.engagements.map((e) => (
              <Reveal key={e.title} className="value-card">
                <span className="value-ic">
                  <Icon name="shield" size={26} />
                </span>
                <h3>{e.title}</h3>
                <p>{e.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* §12 — « Pourquoi choisir BIM Leaders ? » */}
      <section className="section section--sand">
        <div className="container narrow-prose">
          <Reveal>
            <div className="section-head center">
              <h2>{a.why.title}</h2>
            </div>
            <ul className="check-list">
              {a.why.points.map((p) => (
                <li key={p}>
                  <span className="tick">
                    <Icon name="check" size={13} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Mentions légales : réelles, issues du cahier des charges (§B). */}
      <section className="section">
        <div className="container narrow-prose">
          <Reveal>
            <div className="section-head center">
              <span className="eyebrow">{ui.legal.heading}</span>
              <h2>{COMPANY.legalName}</h2>
            </div>
            <dl className="spec-list">
              <div className="spec-row">
                <dt>{ui.legal.form}</dt>
                <dd>{brand.legalForm}</dd>
              </div>
              <div className="spec-row">
                <dt>{ui.legal.capital}</dt>
                <dd>{COMPANY.legal.capital}</dd>
              </div>
              <div className="spec-row">
                <dt>{ui.legal.rc}</dt>
                <dd>
                  RC {COMPANY.legal.rcCity} : {COMPANY.legal.rc}
                </dd>
              </div>
              <div className="spec-row">
                <dt>{ui.legal.ice}</dt>
                <dd>{COMPANY.legal.ice}</dd>
              </div>
              <div className="spec-row">
                <dt>{ui.legal.director}</dt>
                <dd>{COMPANY.director}</dd>
              </div>
              <div className="spec-row">
                <dt>{ui.legal.activity}</dt>
                <dd>{brand.activity}</dd>
              </div>
              <div className="spec-row">
                <dt>{ui.legal.office}</dt>
                <dd>
                  {COMPANY.address.street}, {COMPANY.address.district}, {COMPANY.address.locality}
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="section section--blue">
        <div className="container final-cta">
          <Reveal>
            <h2>{a.finalCta.title}</h2>
            <p>{a.finalCta.text}</p>
            <div className="cta-row cta-row--center">
              <Link className="btn btn-light" href={path("contact", lang)}>
                {a.finalCta.cta}
                <Icon name="arrow" size={17} />
              </Link>
            </div>
            <div style={{ marginTop: 24, display: "flex", justifyContent: "center" }}>
              <ContactButtons variant="center" lang={lang} />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
