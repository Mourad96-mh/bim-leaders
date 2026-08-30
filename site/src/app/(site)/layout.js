import HtmlShell from "@/components/HtmlShell";
import { rootMetadata, businessLd } from "@/lib/siteChrome";
import { JsonLd } from "@/lib/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyBar from "@/components/StickyBar";

// RACINE FRANÇAISE — l'arbre servi à la racine du domaine (/contact/, /bim/…).
//
// C'est bien une racine et non un layout imbriqué : il n'y a plus d'app/layout.js
// (cf. le commentaire de HtmlShell). Chaque groupe de routes — (site), (en),
// (admin) — porte son propre <html>, ce qui est la seule façon de faire varier
// l'attribut `lang`. Les parenthèses sont des groupes Next : elles n'apparaissent
// PAS dans les URLs, donc ce fichier gouverne bien « / » et non « /site/ ».

export const metadata = rootMetadata("fr");
export const viewport = { themeColor: "#1b4a8f" };

export default function SiteLayout({ children }) {
  return (
    <HtmlShell lang="fr">
      <JsonLd data={businessLd("fr")} />
      <Header lang="fr" />
      <main>{children}</main>
      <Footer lang="fr" />
      <StickyBar lang="fr" />
    </HtmlShell>
  );
}
