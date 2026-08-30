import "@/app/globals.css";
import "@/app/patterns.css";

// Enveloppe <html>/<body> commune aux TROIS racines du site.
//
// POURQUOI trois racines et pas un app/layout.js unique : l'attribut
// <html lang> doit valoir « fr » sur /contact/ et « en » sur /en/contact/. Un
// layout racine partagé ne peut pas le savoir — il ne reçoit ni params ni
// pathname. Next permet alors de supprimer app/layout.js et de donner à chaque
// groupe de routes sa propre racine ; c'est ce que font (site), (en) et (admin),
// et c'est ce composant qui leur évite de dupliquer trois fois les polices et
// les feuilles de style.
//
// Conséquence assumée : passer d'une racine à l'autre (français ↔ anglais,
// site ↔ dashboard) provoque un rechargement complet plutôt qu'une navigation
// client. C'est sans effet ici — on ne change de langue qu'une fois.
export default function HtmlShell({ lang, children }) {
  return (
    <html lang={lang}>
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
