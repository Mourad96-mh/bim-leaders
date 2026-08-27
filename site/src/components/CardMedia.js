import { Icon } from "./Icon";

// Visuel d'en-tête d'une carte service. Avec `img` (nom de fichier dans
// /public/img/), affiche la photo optimisée (WebP + repli JPG) et place l'icône
// du métier en pastille. Sans photo, replie sur le panneau dégradé « plan ».
export default function CardMedia({ icon, img, alt = "", tone = "blue" }) {
  if (img) {
    return (
      <div className="card-media card-media--photo">
        <picture>
          <source srcSet={`/img/${img}.webp`} type="image/webp" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/img/${img}.jpg`} alt={alt} loading="lazy" width="800" height="450" />
        </picture>
        <span className={`card-media-badge tone-${tone}`} aria-hidden="true">
          <Icon name={icon} size={20} />
        </span>
      </div>
    );
  }

  return (
    <div className={`card-media card-media--blueprint tone-${tone}`} role="img" aria-label={alt}>
      <span className="bp-grid" aria-hidden="true" />
      <span className="card-media-ic">
        <Icon name={icon} size={40} />
      </span>
    </div>
  );
}
