import "./globals.css";
import "./patterns.css";
import { COMPANY } from "@/lib/company";
import { HOME } from "@/content/home";

// Racine minimale : <html>, <body>, les polices et les métadonnées par défaut.
//
// Le HABILLAGE du site (en-tête, pied de page, boutons flottants, JSON-LD) vit
// dans app/(site)/layout.js, pas ici, pour que le dashboard — app/(admin)/ —
// n'en hérite pas. Les parenthèses sont des groupes de routes Next : elles
// n'apparaissent PAS dans les URLs.
export const metadata = {
  metadataBase: new URL(COMPANY.siteUrl),
  title: {
    default: HOME.metaTitle,
    template: "%s | BIM Leaders",
  },
  description: HOME.metaDescription,
  applicationName: COMPANY.name,
  authors: [{ name: COMPANY.legalName }],
  creator: COMPANY.legalName,
};

export const viewport = { themeColor: "#1b4a8f" };

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
