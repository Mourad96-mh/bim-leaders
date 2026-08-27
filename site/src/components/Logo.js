import Link from "next/link";

// Verrouillage de marque : le SYMBOLE du logo officiel (les arcs, extraits par
// scripts/make-logo-assets.mjs) + le nom retypographié en HTML.
//
// POURQUOI pas l'image complète du logo : le fichier fourni par le client fait
// 720×447, et son lettrage n'occupe qu'environ 12 % de la hauteur. Posé à 52 px
// dans l'en-tête, « BIM LEADERS » tomberait sous 8 px de hauteur de capitale —
// illisible sur mobile, et flou sur les écrans standard. En composant le nom en
// texte, il reste net à toutes les tailles, sélectionnable, lisible par les
// lecteurs d'écran, et il se recolore pour les fonds sombres sans second export.
//
// L'image complète (public/logo.png) reste utilisée là où la place le permet :
// carte de connexion du dashboard et image de partage Open Graph.
export default function Logo({ variant = "dark", className = "", size = 46 }) {
  const light = variant === "light";
  return (
    <Link
      href="/"
      className={`brand ${light ? "brand--light" : ""} ${className}`.trim()}
      aria-label="BIM Leaders — accueil"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={light ? "/logo-mark-light.png" : "/logo-mark.png"}
        alt=""
        aria-hidden="true"
        className="brand-mark"
        width={size}
        height={size}
        style={{ width: `${size}px`, height: `${size}px` }}
      />
      <span className="brand-word">
        <strong>BIM LEADERS</strong>
        <span>Services</span>
      </span>
    </Link>
  );
}
