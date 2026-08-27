import AdminShell from "@/components/admin/AdminShell";

// Le tableau de bord n'hérite PAS de l'habillage du site : il vit dans le groupe
// de routes (admin), distinct de (site). Pas d'en-tête, pas de pied de page,
// pas de boutons flottants, pas de JSON-LD.
export const metadata = {
  title: "Tableau de bord | BIM Leaders",
  // Ceinture et bretelles avec le Disallow de robots.txt : le dashboard n'a
  // rien à faire dans un index de moteur de recherche.
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
  return <AdminShell>{children}</AdminShell>;
}
