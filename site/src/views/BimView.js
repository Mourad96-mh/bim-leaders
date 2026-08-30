import Link from "next/link";
import { getBim } from "@/content/bim";
import { getServices } from "@/content/services";
import { path, paths, servicePath } from "@/lib/i18n";
import { t } from "@/lib/ui";
import { buildMetadata, breadcrumbLd, JsonLd } from "@/lib/seo";
import { Icon } from "@/components/Icon";
import Reveal from "@/components/Reveal";
import PageHead from "@/components/PageHead";
import Chain from "@/components/Chain";

// §8 du cahier des charges — rubrique BIM, présentée comme une valeur ajoutée à
// la construction et jamais comme une activité autonome (§2.2).

export const bimMetadata = (lang) => {
  const bim = getBim(lang);
  return buildMetadata({
    lang,
    paths: paths("bim"),
    title: bim.metaTitle,
    description: bim.metaDescription,
  });
};

export default function BimView({ lang = "fr" }) {
  const bim = getBim(lang);
  const ui = t(lang);

  const crumbs = [
    { name: ui.nav.home, path: path("home", lang) },
    { name: ui.nav.bim, path: path("bim", lang) },
  ];

  return (
    <>
      <JsonLd data={breadcrumbLd(crumbs)} />

      <PageHead
        eyebrow={bim.pageEyebrow}
        title={bim.title}
        text={bim.intro}
        crumbs={crumbs}
        icon="layers"
        lang={lang}
      />

      {/* §8.1 — le message que le visiteur doit retenir, isolé et mis en avant. */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="lead-prose">
              <p style={{ fontSize: "1.2rem", color: "var(--blue-800)", fontWeight: 500 }}>
                {bim.takeaway}
              </p>
            </div>
          </Reveal>

          <Reveal>
            <Chain steps={bim.chain} numbered />
          </Reveal>
        </div>
      </section>

      {/* §8.2 — les cinq valeurs apportées par le BIM. */}
      <section className="section section--sand">
        <div className="container">
          <Reveal>
            <div className="section-head center">
              <span className="eyebrow">{bim.valuesHead.eyebrow}</span>
              <h2>{bim.valuesHead.title}</h2>
              <p>{bim.valuesHead.text}</p>
            </div>
          </Reveal>

          <div className="cards">
            {bim.values.map((v) => (
              <Reveal key={v.key} className="value-card">
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

      {/* Sous-rubriques de l'arborescence (§5) : approche, modélisation,
          coordination, quantités & estimation, suivi de projet. */}
      <section className="section">
        <div className="container narrow-prose">
          {bim.sections.map((s, i) => (
            <Reveal
              key={s.id}
              id={s.id}
              style={{ marginBottom: i === bim.sections.length - 1 ? 0 : 44 }}
            >
              <h2
                style={{
                  fontSize: "clamp(1.3rem, 2.6vw, 1.7rem)",
                  color: "var(--blue-900)",
                  marginBottom: 12,
                }}
              >
                {s.title}
              </h2>
              <p className="prose-p">{s.text}</p>
            </Reveal>
          ))}

          <Reveal style={{ marginTop: 44 }}>
            <div className="notice">
              <span className="notice-ic">
                <Icon name="spark" size={20} />
              </span>
              <span>{bim.note}</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Rattachement explicite au chantier : la page BIM ne doit jamais se lire
          comme une offre indépendante (§2.2). */}
      <section className="section section--sand">
        <div className="container">
          <Reveal>
            <div className="section-head center">
              <span className="eyebrow">{bim.tradesHead.eyebrow}</span>
              <h2>{bim.tradesHead.title}</h2>
              <p>{bim.tradesHead.text}</p>
            </div>
          </Reveal>
          <div className="cta-row cta-row--center" style={{ flexWrap: "wrap" }}>
            {getServices(lang).map((s) => (
              <Link key={s.key} href={servicePath(s.slug, lang)} className="btn btn-ghost">
                <Icon name={s.icon} size={16} />
                {s.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--blue">
        <div className="container final-cta">
          <Reveal>
            <h2>{bim.finalCta.title}</h2>
            <p>{bim.finalCta.text}</p>
            <div className="cta-row cta-row--center">
              <Link className="btn btn-light" href={path("contact", lang)}>
                {bim.finalCta.cta}
                <Icon name="arrow" size={17} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
