"use client";

import { useEffect, useState } from "react";
import { snapshot, sortRealisations } from "./realisations";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");

// Rafraîchissement « live » des réalisations.
//
// Part TOUJOURS du snapshot figé au build (donc jamais d'écran vide, et le
// contenu est déjà dans le HTML pour Google), puis va chercher la liste à jour
// afin d'afficher ce que le gérant a ajouté depuis le dernier déploiement.
export function useRealisations(initial = snapshot()) {
  const [items, setItems] = useState(initial);

  useEffect(() => {
    if (!API_URL) return;
    let annule = false;

    fetch(`${API_URL}/api/realisations`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((data) => {
        const list = Array.isArray(data) ? data : data.items || [];
        if (!annule) setItems(sortRealisations(list.filter((r) => r.publie !== false)));
      })
      // Échec silencieux volontaire : le snapshot reste affiché. Une API Render
      // en veille ne doit pas produire d'erreur visible sur une page vitrine.
      .catch(() => {});

    return () => {
      annule = true;
    };
  }, []);

  return items;
}
