"use client";

import { useCallback, useEffect, useState } from "react";
import { Icon } from "./Icon";

// Galerie photo d'une réalisation + visionneuse plein écran (§11).
//
// Écrite à la main plutôt qu'avec une bibliothèque : le besoin tient en une
// centaine de lignes, et une dépendance de galerie pèse plus lourd que ça sur
// le premier chargement (§18 « réduction des scripts inutiles »).
export default function Gallery({ photos = [], titre = "" }) {
  const [index, setIndex] = useState(null);
  const ouvert = index !== null;

  const fermer = useCallback(() => setIndex(null), []);
  const suivant = useCallback(
    () => setIndex((i) => (i === null ? null : (i + 1) % photos.length)),
    [photos.length]
  );
  const precedent = useCallback(
    () => setIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length)),
    [photos.length]
  );

  // Clavier : Échap ferme, les flèches naviguent. Sans cela la visionneuse est
  // un piège pour qui n'utilise pas la souris.
  useEffect(() => {
    if (!ouvert) return;
    const onKey = (e) => {
      if (e.key === "Escape") fermer();
      if (e.key === "ArrowRight") suivant();
      if (e.key === "ArrowLeft") precedent();
    };
    window.addEventListener("keydown", onKey);
    // Bloque le défilement de la page sous la visionneuse.
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [ouvert, fermer, suivant, precedent]);

  if (!photos.length) return null;

  return (
    <>
      <div className="gallery">
        {photos.map((p, i) => (
          <button
            key={p.url || i}
            type="button"
            className="gallery-item"
            onClick={() => setIndex(i)}
            aria-label={`Agrandir la photo ${i + 1} sur ${photos.length}${titre ? ` — ${titre}` : ""}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.url} alt={p.alt || `${titre} — photo ${i + 1}`} loading="lazy" />
          </button>
        ))}
      </div>

      {ouvert && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Photo ${index + 1} sur ${photos.length}`}
          // Clic sur le fond (et non sur l'image) : ferme.
          onClick={(e) => e.target === e.currentTarget && fermer()}
        >
          <button type="button" className="lightbox-close" onClick={fermer} aria-label="Fermer">
            <Icon name="x" size={22} />
          </button>

          {photos.length > 1 && (
            <>
              <button
                type="button"
                className="lightbox-nav lightbox-nav--prev"
                onClick={precedent}
                aria-label="Photo précédente"
              >
                <Icon name="arrow" size={20} />
              </button>
              <button
                type="button"
                className="lightbox-nav lightbox-nav--next"
                onClick={suivant}
                aria-label="Photo suivante"
              >
                <Icon name="arrow" size={20} />
              </button>
            </>
          )}

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photos[index].url} alt={photos[index].alt || `${titre} — photo ${index + 1}`} />

          <p className="lightbox-caption">
            {photos[index].alt || titre}
            {photos.length > 1 && ` — ${index + 1} / ${photos.length}`}
          </p>
        </div>
      )}
    </>
  );
}
