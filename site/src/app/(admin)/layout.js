import HtmlShell from "@/components/HtmlShell";

// RACINE DU DASHBOARD — sans habillage vitrine, et sans métadonnées de marque.
//
// Elle n'existe que parce qu'app/layout.js a disparu (cf. HtmlShell) : il faut
// bien que quelqu'un rende <html> et <body> pour /admin/. Le contenu du shell —
// en-tête d'administration, navigation — reste dans admin/layout.js.
//
// `lang="fr"` en dur et assumé : le tableau de bord est l'outil du gérant, il
// n'est pas traduit et n'a pas vocation à l'être.
export const viewport = { themeColor: "#1b4a8f" };

export default function AdminRootLayout({ children }) {
  return <HtmlShell lang="fr">{children}</HtmlShell>;
}
