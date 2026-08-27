import Link from "next/link";
import { BIM } from "@/content/bim";
import { SERVICES } from "@/content/services";
import { buildMetadata, breadcrumbLd, JsonLd } from "@/lib/seo";
import { Icon } from "@/components/Icon";
import Reveal from "@/components/Reveal";
import PageHead from "@/components/PageHead";
import Chain from "@/components/Chain";

export const metadata = buildMetadata({
  path: "/bim/",
  title: BIM.metaTitle,
  description: BIM.metaDescription,
});

const crumbs = [
  { name: "Accueil", path: "/" },
  { name: "BIM", path: "/bim/" },
];

export default function BimPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd(crumbs)} />

      <PageHead
        eyebrow="La valeur ajoutée technologique"
        title={BIM.title}
        text={BIM.intro}
        crumbs={crumbs}
        icon="layers"
      />

      {/* §8.1 — le message que le visiteur doit retenir, isolé et mis en avant. */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="lead-prose">
              <p style={{ fontSize: "1.2rem", color: "var(--blue-800)", fontWeight: 500 }}>
                {BIM.takeaway}
              </p>
            </div>
          </Reveal>

          <Reveal>
            <Chain steps={BIM.chain} numbered />
          </Reveal>
        </div>
      </section>

      {/* §8.2 — les cinq valeurs apportées par le BIM. */}
      <section className="section section--sand">
        <div className="container">
          <Reveal>
            <div className="section-head center">
              <span className="eyebrow">Ce que le BIM apporte</span>
              <h2>Cinq bénéfices concrets sur le chantier</h2>
              <p>
                Le modèle numérique n&apos;est pas un livrable décoratif : il sert à préparer,
                coordonner et suivre l&apos;exécution.
              </p>
            </div>
          </Reveal>

          <div className="cards">
            {BIM.values.map((v) => (
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
          {BIM.sections.map((s, i) => (
            <Reveal key={s.id} id={s.id} style={{ marginBottom: i === BIM.sections.length - 1 ? 0 : 44 }}>
              <h2 style={{ fontSize: "clamp(1.3rem, 2.6vw, 1.7rem)", color: "var(--blue-900)", marginBottom: 12 }}>
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
              <span>{BIM.note}</span>
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
              <span className="eyebrow">Sur le terrain</span>
              <h2>Le BIM, lot par lot</h2>
              <p>
                Chaque métier a sa page : vous y trouverez ce que la modélisation change
                concrètement sur ce lot précis.
              </p>
            </div>
          </Reveal>
          <div className="cta-row cta-row--center" style={{ flexWrap: "wrap" }}>
            {SERVICES.map((s) => (
              <Link key={s.slug} href={`/construction/${s.slug}/`} className="btn btn-ghost">
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
            <h2>Voir votre projet avant de le construire</h2>
            <p>
              Présentez-nous votre projet : nous vous dirons ce que la modélisation peut y
              apporter, et à quel moment.
            </p>
            <div className="cta-row cta-row--center">
              <Link className="btn btn-light" href={BIM.cta.href}>
                {BIM.cta.label}
                <Icon name="arrow" size={17} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
