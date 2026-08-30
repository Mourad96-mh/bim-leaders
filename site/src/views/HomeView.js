import Link from "next/link";
import { getHome } from "@/content/home";
import { getServices } from "@/content/services";
import { getBim } from "@/content/bim";
import { COMPANY, text } from "@/lib/company";
import { path, paths, servicePath } from "@/lib/i18n";
import { t } from "@/lib/ui";
import { buildMetadata } from "@/lib/seo";
import { Icon } from "@/components/Icon";
import Reveal from "@/components/Reveal";
import CardMedia from "@/components/CardMedia";
import Chain from "@/components/Chain";
import ContactButtons from "@/components/ContactButtons";
import HomeRealisations from "@/components/HomeRealisations";

// §6 du cahier des charges — page d'accueil, dans les deux langues.
//
// Les LIBELLÉS de bouton viennent de content/home.js, les DESTINATIONS de
// lib/i18n.js : le contenu ne porte plus d'URL en dur, sans quoi la version
// anglaise renverrait vers les pages françaises.

export const homeMetadata = (lang) => {
  const home = getHome(lang);
  return buildMetadata({
    lang,
    paths: paths("home"),
    absoluteTitle: home.metaTitle,
    description: home.metaDescription,
  });
};

export default function HomeView({ lang = "fr" }) {
  const home = getHome(lang);
  const bim = getBim(lang);
  const ui = t(lang);
  const brand = text(lang);

  return (
    <>
      {/* -------------------------------------------------- §6.1 Hero ------- */}
      <section className="hero">
        <span className="hero-grid-lines" aria-hidden="true" />
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">
              <Icon name="helmet" size={15} />
              {home.hero.eyebrow}
            </span>
            <h1>{home.hero.title}</h1>
            <p className="hero-sub">{home.hero.subtitle}</p>
            <div className="cta-row">
              <Link className="btn btn-primary" href={path("contact", lang)}>
                {home.hero.ctaPrimary}
                <Icon name="arrow" size={17} />
              </Link>
              <Link className="btn btn-ghost" href={path("realisations", lang)}>
                {home.hero.ctaSecondary}
              </Link>
            </div>
            <div className="hero-trust">
              {home.hero.trust.map((gage) => (
                <span key={gage}>
                  <span className="tick">
                    <Icon name="check" size={13} />
                  </span>
                  {gage}
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
                  alt={home.hero.imageAlt}
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
          documents du client (nombre de métiers, périmètre). */}
      <section className="stats-strip">
        <div className="container stats-grid">
          {home.stats.map((s) => (
            <div className="stat" key={s.label}>
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* --------------------------------------- §6.2 Présentation --------- */}
      <section className="section">
        <div className="container narrow-prose">
          <Reveal>
            <div className="section-head center">
              <span className="eyebrow">{home.intro.eyebrow}</span>
              <h2>{home.intro.title}</h2>
            </div>
            <p className="prose-p">{home.intro.text}</p>
            <p className="prose-p">{home.intro.text2}</p>
            <div className="cta-row cta-row--center" style={{ marginTop: 30 }}>
              <Link className="btn btn-ghost" href={path("apropos", lang)}>
                {home.intro.cta}
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
              <span className="eyebrow">{home.domaines.eyebrow}</span>
              <h2>{home.domaines.title}</h2>
              <p>{home.domaines.text}</p>
            </div>
          </Reveal>
          <div className="cards">
            {getServices(lang).map((s) => (
              <Reveal key={s.key} className="card card--media">
                <Link href={servicePath(s.slug, lang)} className="card-link">
                  <CardMedia icon={s.icon} img={s.image} alt={s.imageAlt || s.title} tone="blue" />
                  <div className="card-body">
                    <h3>{s.title}</h3>
                    <p>{s.short}</p>
                    <span className="card-more">
                      {ui.cta.detail}
                      <Icon name="arrow" size={15} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="cta-row cta-row--center" style={{ marginTop: 40 }}>
            <Link className="btn btn-primary" href={path("construction", lang)}>
              {home.domaines.cta}
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
              <span className="eyebrow eyebrow--onDark">{home.bim.eyebrow}</span>
              <h2>{home.bim.title}</h2>
              <p>{home.bim.text}</p>
            </div>
          </Reveal>

          <Reveal>
            <Chain steps={bim.chain} />
          </Reveal>

          <div className="why-grid" style={{ marginTop: 48 }}>
            {bim.values.map((v) => (
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
            <Link className="btn btn-light" href={path("bim", lang)}>
              {home.bim.cta}
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
              <span className="eyebrow">{home.particuliers.eyebrow}</span>
              <h3>{home.particuliers.title}</h3>
              <p>{home.particuliers.text}</p>
              <div className="cta-row" style={{ marginTop: 22 }}>
                <Link className="btn btn-accent" href={path("particuliers", lang)}>
                  {home.particuliers.cta}
                  <Icon name="arrow" size={16} />
                </Link>
              </div>
            </Reveal>

            <Reveal className="duo-card">
              <span className="duo-ic">
                <Icon name="building" size={26} />
              </span>
              <span className="eyebrow">{home.investisseurs.eyebrow}</span>
              <h3>{home.investisseurs.title}</h3>
              <p>{home.investisseurs.text}</p>
              <div className="cta-row" style={{ marginTop: 22 }}>
                <Link className="btn btn-accent" href={path("investisseurs", lang)}>
                  {home.investisseurs.cta}
                  <Icon name="arrow" size={16} />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* -------------------------------------- §6.7 Réalisations ---------- */}
      <HomeRealisations lang={lang} />

      {/* ------------------------------------- §6.8 Appel à l'action ------- */}
      <section className="section section--blue">
        <div className="container final-cta">
          <Reveal>
            <h2>{home.finalCta.title}</h2>
            <p>{home.finalCta.text}</p>
            <div className="cta-row cta-row--center">
              <Link className="btn btn-light" href={path("contact", lang)}>
                {home.finalCta.cta}
                <Icon name="arrow" size={17} />
              </Link>
            </div>
            <div style={{ marginTop: 26, display: "flex", justifyContent: "center" }}>
              <ContactButtons variant="center" lang={lang} />
            </div>
            <p style={{ marginTop: 22, fontSize: "0.9rem", opacity: 0.7 }}>
              {COMPANY.address.district}, {COMPANY.address.locality} —{" "}
              {brand.areaServed.slice(0, 4).join(" · ")}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
