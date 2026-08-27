"use client";

import { useCallback, useRef, useState } from "react";

// Comparateur avant/après (§11 « galerie avant/après »).
//
// La position du curseur est portée par une variable CSS (--pos) plutôt que par
// un re-rendu React à chaque pixel : le navigateur ne fait alors que recalculer
// un clip-path, ce qui reste fluide au doigt sur mobile.
export default function BeforeAfter({ avant, apres, alt = "" }) {
  const ref = useRef(null);
  const [pos, setPos] = useState(50);

  const deplacer = useCallback((clientX) => {
    const el = ref.current;
    if (!el) return;
    const { left, width } = el.getBoundingClientRect();
    const pct = Math.min(100, Math.max(0, ((clientX - left) / width) * 100));
    setPos(pct);
    el.style.setProperty("--pos", `${pct}%`);
  }, []);

  // Un seul jeu de gestionnaires pour souris, stylet et doigt.
  const onPointerDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    deplacer(e.clientX);
  };
  const onPointerMove = (e) => {
    if (e.buttons !== 0 || e.pointerType === "touch") deplacer(e.clientX);
  };

  // Accessibilité : le curseur est un vrai slider pilotable au clavier.
  const onKeyDown = (e) => {
    const pas = e.shiftKey ? 10 : 2;
    if (e.key === "ArrowLeft") setPosClamped(pos - pas);
    else if (e.key === "ArrowRight") setPosClamped(pos + pas);
    else return;
    e.preventDefault();
  };
  function setPosClamped(v) {
    const pct = Math.min(100, Math.max(0, v));
    setPos(pct);
    ref.current?.style.setProperty("--pos", `${pct}%`);
  }

  if (!avant || !apres) return null;

  return (
    <div
      className="ba"
      ref={ref}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      style={{ "--pos": `${pos}%` }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={avant} alt={alt ? `${alt} — avant travaux` : "Avant travaux"} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="ba-after" src={apres} alt={alt ? `${alt} — après travaux` : "Après travaux"} />

      <span className="ba-label ba-label--before">Avant</span>
      <span className="ba-label ba-label--after">Après</span>

      <div
        className="ba-handle"
        role="slider"
        tabIndex={0}
        aria-label="Comparer avant et après"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        aria-valuetext={`${Math.round(pos)} % de l'image après travaux masquée`}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}
