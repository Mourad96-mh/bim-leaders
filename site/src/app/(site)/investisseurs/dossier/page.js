import { Suspense } from "react";
import { DOSSIER_FORM } from "@/content/contact";
import { DOSSIER_CONTENU } from "@/content/investisseurs";
import { buildMetadata, breadcrumbLd, JsonLd } from "@/lib/seo";
import { Icon } from "@/components/Icon";
import Reveal from "@/components/Reveal";
import PageHead from "@/components/PageHead";
import LeadForm from "@/components/LeadForm";

export const metadata = buildMetadata({
  path: "/investisseurs/dossier/",
  title: DOSSIER_FORM.metaTitle,
  description: DOSSIER_FORM.metaDescription,
});

const crumbs = [
  { name: "Accueil", path: "/" },
  { name: "Investisseurs", path: "/investisseurs/" },
  { name: "Dossier investisseur", path: "/investisseurs/dossier/" },
];

export default function DossierPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd(crumbs)} />

      <PageHead
        eyebrow="Investisseurs"
        title={DOSSIER_FORM.title}
        text={DOSSIER_FORM.text}
        crumbs={crumbs}
        icon="clipboard"
      />

      <section className="section">
        <div className="container contact-grid">
          <Suspense fallback={<div className="form-card" style={{ minHeight: 620 }} />}>
            <LeadForm kind="investisseur" />
          </Suspense>

          <div className="contact-side">
            <Reveal className="contact-block">
              <h3>
                <span className="cb-ic">
                  <Icon name="clipboard" size={19} />
                </span>
                Contenu du dossier
              </h3>
              <ul className="check-list">
                {DOSSIER_CONTENU.map((d) => (
                  <li key={d} style={{ fontSize: "0.94rem" }}>
                    <span className="tick">
                      <Icon name="check" size={12} />
                    </span>
                    {d}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="contact-block">
              <h3>
                <span className="cb-ic">
                  <Icon name="shield" size={19} />
                </span>
                Confidentialité
              </h3>
              <p className="contact-address">
                Les données financières détaillées des projets ne sont pas publiées sur le
                site. Elles sont transmises directement, après qualification de votre demande,
                aux investisseurs et partenaires intéressés.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
