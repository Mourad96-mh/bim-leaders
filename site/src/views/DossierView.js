import { Suspense } from "react";
import { getDossierForm } from "@/content/contact";
import { getDossierContenu } from "@/content/investisseurs";
import { path, paths } from "@/lib/i18n";
import { t } from "@/lib/ui";
import { buildMetadata, breadcrumbLd, JsonLd } from "@/lib/seo";
import { Icon } from "@/components/Icon";
import Reveal from "@/components/Reveal";
import PageHead from "@/components/PageHead";
import LeadForm from "@/components/LeadForm";

// §10 bis.4 — demande du dossier investisseur.

export const dossierMetadata = (lang) => {
  const d = getDossierForm(lang);
  return buildMetadata({
    lang,
    paths: paths("dossier"),
    title: d.metaTitle,
    description: d.metaDescription,
  });
};

export default function DossierView({ lang = "fr" }) {
  const d = getDossierForm(lang);
  const ui = t(lang);

  const crumbs = [
    { name: ui.nav.home, path: path("home", lang) },
    { name: ui.nav.investisseurs, path: path("investisseurs", lang) },
    { name: d.title, path: path("dossier", lang) },
  ];

  return (
    <>
      <JsonLd data={breadcrumbLd(crumbs)} />

      <PageHead
        eyebrow={d.eyebrow}
        title={d.title}
        text={d.text}
        crumbs={crumbs}
        icon="clipboard"
        lang={lang}
      />

      <section className="section">
        <div className="container contact-grid">
          {/* useSearchParams (?projet=) impose une frontière Suspense, sinon le
              prérendu statique échoue au build. */}
          <Suspense fallback={<div className="form-card" style={{ minHeight: 620 }} />}>
            <LeadForm kind="investisseur" lang={lang} />
          </Suspense>

          <div className="contact-side">
            <Reveal className="contact-block">
              <h3>
                <span className="cb-ic">
                  <Icon name="clipboard" size={19} />
                </span>
                {d.contentTitle}
              </h3>
              <ul className="check-list">
                {getDossierContenu(lang).map((item) => (
                  <li key={item} style={{ fontSize: "0.94rem" }}>
                    <span className="tick">
                      <Icon name="check" size={12} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="contact-block">
              <h3>
                <span className="cb-ic">
                  <Icon name="shield" size={19} />
                </span>
                {d.privacyTitle}
              </h3>
              <p className="contact-address">{d.privacyText}</p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
