import Link from "next/link";
import { APROPOS } from "@/content/apropos";
import { COMPANY } from "@/lib/company";
import { buildMetadata, breadcrumbLd, JsonLd } from "@/lib/seo";
import { Icon } from "@/components/Icon";
import Reveal from "@/components/Reveal";
import PageHead from "@/components/PageHead";
import ContactButtons from "@/components/ContactButtons";

export const metadata = buildMetadata({
  path: "/a-propos/",
  title: APROPOS.metaTitle,
  description: APROPOS.metaDescription,
});

const crumbs = [
  { name: "Accueil", path: "/" },
  { name: "À propos", path: "/a-propos/" },
];

export default function AProposPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd(crumbs)} />

      <PageHead
        eyebrow={APROPOS.hero.eyebrow}
        title={APROPOS.hero.title}
        text={APROPOS.hero.text}
        crumbs={crumbs}
        icon="helmet"
      />

      {/* Mission & vision */}
      <section className="section">
        <div className="container">
          <div className="duo" style={{ maxWidth: 920 }}>
            <Reveal className="duo-card">
              <span className="duo-ic">
                <Icon name="target" size={26} />
              </span>
              <h3>Notre mission</h3>
              <p>{APROPOS.mission}</p>
            </Reveal>
            <Reveal className="duo-card">
              <span className="duo-ic">
                <Icon name="eye" size={26} />
              </span>
              <h3>Notre vision</h3>
              <p>{APROPOS.vision}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Les six valeurs de l'Offre de service. */}
      <section className="section section--sand">
        <div className="container">
          <Reveal>
            <div className="section-head center">
              <span className="eyebrow">Nos valeurs</span>
              <h2>Six principes qui tiennent nos chantiers</h2>
            </div>
          </Reveal>
          <div className="cards">
            {APROPOS.values.map((v) => (
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
              <span className="eyebrow">Moyens humains</span>
              <h2>Un encadrement présent sur le chantier</h2>
              <p>{APROPOS.team.intro}</p>
            </div>
          </Reveal>

          <div className="steps">
            {APROPOS.team.roles.map((r, i) => (
              <Reveal key={r.title} className="step-card">
                <span className="step-n">{i + 1}</span>
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
              <span className="eyebrow eyebrow--onDark">Veille technique</span>
              <h2>{APROPOS.bureauEtude.title}</h2>
              <p>{APROPOS.bureauEtude.text}</p>
            </div>
          </Reveal>
          <Reveal style={{ maxWidth: 860, margin: "0 auto" }}>
            <ul className="tick-grid tick-grid--onDark">
              {APROPOS.bureauEtude.livrables.map((l) => (
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
              <span className="eyebrow">Méthodologie</span>
              <h2>Nos engagements d&apos;exécution</h2>
            </div>
          </Reveal>
          <div className="cards">
            {APROPOS.engagements.map((e) => (
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
              <h2>{APROPOS.why.title}</h2>
            </div>
            <ul className="check-list">
              {APROPOS.why.points.map((p) => (
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
              <span className="eyebrow">Informations légales</span>
              <h2>{COMPANY.legalName}</h2>
            </div>
            <dl className="spec-list">
              <div className="spec-row">
                <dt>Forme juridique</dt>
                <dd>{COMPANY.legal.form}</dd>
              </div>
              <div className="spec-row">
                <dt>Capital social</dt>
                <dd>{COMPANY.legal.capital}</dd>
              </div>
              <div className="spec-row">
                <dt>Registre de commerce</dt>
                <dd>
                  RC {COMPANY.legal.rcCity} : {COMPANY.legal.rc}
                </dd>
              </div>
              <div className="spec-row">
                <dt>ICE</dt>
                <dd>{COMPANY.legal.ice}</dd>
              </div>
              <div className="spec-row">
                <dt>Gérant</dt>
                <dd>{COMPANY.director}</dd>
              </div>
              <div className="spec-row">
                <dt>Activité</dt>
                <dd>{COMPANY.activity}</dd>
              </div>
              <div className="spec-row">
                <dt>Siège social</dt>
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
            <h2>Travaillons ensemble</h2>
            <p>
              Un projet de construction, une étude de terrain ou un programme immobilier :
              présentez-nous votre besoin.
            </p>
            <div className="cta-row cta-row--center">
              <Link className="btn btn-light" href="/contact/">
                Parlons de votre projet
                <Icon name="arrow" size={17} />
              </Link>
            </div>
            <div style={{ marginTop: 24, display: "flex", justifyContent: "center" }}>
              <ContactButtons variant="center" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
