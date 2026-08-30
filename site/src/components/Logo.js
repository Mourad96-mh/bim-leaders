import Link from "next/link";
import { path } from "@/lib/i18n";
import { t } from "@/lib/ui";

// Logo officiel COMPLET (symbole + lettrage), tel que fourni par le client.
//
// POURQUOI l'image entière et non plus « symbole + nom retypographié en HTML » :
// le premier fichier reçu était un JPEG basse définition au format 1,6:1, dont
// le lettrage ne faisait que 12 % de la hauteur — posé à 52 px dans l'en-tête,
// « BIM LEADERS » tombait sous 8 px de hauteur de capitale, illisible. Le lockup
// officiel livré depuis (PNG 2024×712, ratio 2,9:1) porte un lettrage cinq fois
// plus haut en proportion : à 52 px il reste net, et l'image est plus étroite
// que l'ancien montage. On affiche donc la marque telle qu'elle a été dessinée.
//
// Les deux déclinaisons sont générées par scripts/make-logo-assets.mjs :
// /logo.png pour les fonds clairs, /logo-light.png pour les fonds sombres.
//
// Le logo renvoie à l'accueil DE LA LANGUE COURANTE : depuis /en/contact/ il
// mène à /en/, pas à la racine française.
const RATIO = 900 / 310; // ratio natif des fichiers générés

export default function Logo({ variant = "dark", className = "", height = 52, lang = "fr" }) {
  const light = variant === "light";
  return (
    <Link
      href={path("home", lang)}
      className={`brand ${light ? "brand--light" : ""} ${className}`.trim()}
      aria-label={t(lang).brand.homeAria}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={light ? "/logo-light.png" : "/logo.png"}
        alt="BIM Leaders Services"
        className="brand-logo"
        // Dimensions intrinsèques : elles fixent le ratio, donc la place est
        // réservée avant le chargement (pas de décalage sous l'en-tête collant).
        // La hauteur AFFICHÉE reste pilotée par le CSS, qui la plafonne sur
        // mobile — d'où la variable plutôt qu'un `height` en dur.
        width={Math.round(height * RATIO)}
        height={height}
        style={{ "--brand-logo-h": `${height}px` }}
      />
    </Link>
  );
}
