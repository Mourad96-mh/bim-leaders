import Link from "next/link";
import { HOME } from "@/content/home";
import { SERVICES } from "@/content/services";
import { BIM } from "@/content/bim";
import { COMPANY } from "@/lib/company";
import { buildMetadata } from "@/lib/seo";
import { Icon } from "@/components/Icon";
import Reveal from "@/components/Reveal";
import CardMedia from "@/components/CardMedia";
import Chain from "@/components/Chain";
import ContactButtons from "@/components/ContactButtons";
import HomeRealisations from "@/components/HomeRealisations";

export const metadata = buildMetadata({
  path: "/",
  absoluteTitle: HOME.metaTitle,
  description: HOME.metaDescription,
});

export default function HomePage() {
  return (
    <>
      {/* -------------------------------------------------- §6.1 Hero ------- */}
      <section className="hero">
        <span className="hero-grid-lines" aria-hidden="true" />
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">
              <Icon name="helmet" size={15} />
              {HOME.hero.eyebrow}
            </span>
            <h1>{HOME.hero.title}</h1>
            <p className="hero-sub">{HOME.hero.subtitle}</p>
            <div className="cta-row">
              <Link className="btn btn-primary" href={HOME.hero.ctaPrimary.href}>
                {HOME.hero.ctaPrimary.label}
                <Icon name="arrow" size={17} />
              </Link>
              <Link className="btn btn-ghost" href={HOME.hero.ctaSecondary.href}>
                {HOME.hero.ctaSecondary.label}
              </Link>
            </div>
            <div className="hero-trust">
              {HOME.hero.trust.map((t) => (
                <span key={t}>
                  <span className="tick">
                    <Icon name="check" size={13} />
                  </span>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Photo d'illustration, et non une réalisation BIM Leaders : le
              cahier des charges interdit de présenter comme telle une image qui
              n'en est pas une. Origine et licence de chaque photo : /credits/.
              À remplacer par un vrai chantier dès que le client en fournit un —
              il suffit de déposer le fichier dans assets-src/ sous le même nom.
              Image du plus grand élément affiché au chargement (LCP) : chargée
              en priorité, jamais en lazy. */}
          <Reveal className="hero-visual">
            <div className="hero-photo">
              <picture>
                <source srcSet="/img/hero.webp" type="image/webp" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/img/hero.jpg"
                  alt="Conducteur de travaux consultant les plans d'exécution sur un chantier"
                  width="1400"
                  height="875"
                  fetchPriority="high"
                  decoding="async"
                />
              </picture>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Bandeau de chiffres : uniquement des faits vérifiables issus des
          documents du client (capital, nombre de métiers, périmètre). */}
      <section className="stats-strip">
        <div className="container stats-grid">
          <div className="stat">
            <span className="stat-value">6</span>
            <span className="stat-label">domaines d&apos;intervention</span>
          </div>
          <div className="stat">
            <span className="stat-value">BIM</span>
            <span className="stat-label">intégré à chaque projet</span>
          </div>
          <div className="stat">
            <span className="stat-value">A→Z</span>
            <span className="stat-label">de l&apos;étude à la livraison</span>
          </div>
        </div>
      </section>

      {/* --------------------------------------- §6.2 Présentation --------- */}
      <section className="section">
        <div className="container narrow-prose">
          <Reveal>
            <div className="section-head center">
              <span className="eyebrow">Qui sommes-nous</span>
              <h2>{HOME.intro.title}</h2>
            </div>
            <p className="prose-p">{HOME.intro.text}</p>
            <p className="prose-p">{HOME.intro.text2}</p>
            <div className="cta-row cta-row--center" style={{ marginTop: 30 }}>
              <Link className="btn btn-ghost" href={HOME.intro.cta.href}>
                {HOME.intro.cta.label}
                <Icon name="arrow" size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------- §6.3 Domaines d'intervention ------ */}
      <section className="section section--sand">
        <div className="container">
          <Reveal>
            <div className="section-head center">
              <span className="eyebrow">{HOME.domaines.eyebrow}</span>
              <h2>{HOME.domaines.title}</h2>
              <p>{HOME.domaines.text}</p>
            </div>
          </Reveal>
          <div className="cards">
            {SERVICES.map((s) => (
              <Reveal key={s.slug} className="card card--media">
                <Link href={`/construction/${s.slug}/`} className="card-link">
                  <CardMedia icon={s.icon} img={s.image} alt={s.imageAlt || s.title} tone="blue" />
                  <div className="card-body">
                    <h3>{s.title}</h3>
                    <p>{s.short}</p>
                    <span className="card-more">
                      Voir le détail
                      <Icon name="arrow" size={15} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="cta-row cta-row--center" style={{ marginTop: 40 }}>
            <Link className="btn btn-primary" href={HOME.domaines.cta.href}>
              {HOME.domaines.cta.label}
              <Icon name="arrow" size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* -------------------------------------------- §6.4 Section BIM ----- */}
      <section className="section section--blue">
        <div className="container">
          <Reveal>
            <div className="section-head center">
              <span className="eyebrow eyebrow--onDark">{HOME.bim.eyebrow}</span>
              <h2>{HOME.bim.title}</h2>
              <p>{HOME.bim.text}</p>
            </div>
          </Reveal>

          <Reveal>
            <Chain steps={BIM.chain} />
          </Reveal>

          <div className="why-grid" style={{ marginTop: 48 }}>
            {BIM.values.map((v) => (
              <Reveal key={v.key} className="why-item">
                <span className="why-ic">
                  <Icon name={v.icon} size={24} />
                </span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </Reveal>
            ))}
          </div>

          <div className="cta-row cta-row--center" style={{ marginTop: 44 }}>
            <Link className="btn btn-light" href={HOME.bim.cta.href}>
              {HOME.bim.cta.label}
              <Icon name="arrow" size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------- §6.5 Particuliers · §6.6 Investisseurs -------- */}
      <section className="section">
        <div className="container">
          <div className="duo">
            <Reveal className="duo-card">
              <span className="duo-ic">
                <Icon name="ruler" size={26} />
              </span>
              <span className="eyebrow">{HOME.particuliers.eyebrow}</span>
              <h3>{HOME.particuliers.title}</h3>
              <p>{HOME.particuliers.text}</p>
              <div className="cta-row" style={{ marginTop: 22 }}>
                <Link className="btn btn-accent" href={HOME.particuliers.cta.href}>
                  {HOME.particuliers.cta.label}
                  <Icon name="arrow" size={16} />
                </Link>
              </div>
            </Reveal>

            <Reveal className="duo-card">
              <span className="duo-ic">
                <Icon name="building" size={26} />
              </span>
              <span className="eyebrow">{HOME.investisseurs.eyebrow}</span>
              <h3>{HOME.investisseurs.title}</h3>
              <p>{HOME.investisseurs.text}</p>
              <div className="cta-row" style={{ marginTop: 22 }}>
                <Link className="btn btn-accent" href={HOME.investisseurs.cta.href}>
                  {HOME.investisseurs.cta.label}
                  <Icon name="arrow" size={16} />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* -------------------------------------- §6.7 Réalisations ---------- */}
      <HomeRealisations />

      {/* ------------------------------------- §6.8 Appel à l'action ------- */}
      <section className="section section--blue">
        <div className="container final-cta">
          <Reveal>
            <h2>{HOME.finalCta.title}</h2>
            <p>{HOME.finalCta.text}</p>
            <div className="cta-row cta-row--center">
              <Link className="btn btn-light" href={HOME.finalCta.cta.href}>
                {HOME.finalCta.cta.label}
                <Icon name="arrow" size={17} />
              </Link>
            </div>
            <div style={{ marginTop: 26, display: "flex", justifyContent: "center" }}>
              <ContactButtons variant="center" />
            </div>
            <p style={{ marginTop: 22, fontSize: "0.9rem", opacity: 0.7 }}>
              {COMPANY.address.district}, {COMPANY.address.locality} —{" "}
              {COMPANY.areaServed.slice(0, 4).join(" · ")}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
