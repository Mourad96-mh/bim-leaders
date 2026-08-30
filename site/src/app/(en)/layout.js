import HtmlShell from "@/components/HtmlShell";
import { rootMetadata, businessLd } from "@/lib/siteChrome";
import { JsonLd } from "@/lib/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyBar from "@/components/StickyBar";

// RACINE ANGLAISE — le miroir de (site), pour tout ce qui vit sous /en/.
//
// Le fichier est volontairement le jumeau exact de (site)/layout.js à la langue
// près : tout ce qui pourrait diverger entre les deux (métadonnées de base,
// JSON-LD de l'entreprise) est parti dans lib/siteChrome.js, justement pour ne
// pas pouvoir être corrigé d'un seul côté.
//
// ⚠️ Ce groupe ne crée AUCUN segment d'URL : c'est le dossier `en/` à
// l'intérieur qui donne le préfixe /en/.

export const metadata = rootMetadata("en");
export const viewport = { themeColor: "#1b4a8f" };

export default function EnLayout({ children }) {
  return (
    <HtmlShell lang="en">
      <JsonLd data={businessLd("en")} />
      <Header lang="en" />
      <main>{children}</main>
      <Footer lang="en" />
      <StickyBar lang="en" />
    </HtmlShell>
  );
}
