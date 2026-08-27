"use client";

import { useEffect, useState } from "react";
import { createRealisation, updateRealisation, uploadImage } from "@/lib/api";
import { STATUTS } from "@/lib/realisations";
import { Icon } from "../Icon";

// Formulaire d'une réalisation — création et modification.
//
// Pensé pour un utilisateur non technique : aucun champ « slug », aucun jargon.
// L'URL de la fiche est fabriquée par le serveur à partir du nom, et n'est plus
// modifiée ensuite pour ne pas casser un lien déjà partagé.

const VIDE = {
  nom: "",
  localisation: "",
  type: "",
  surface: "",
  annee: "",
  description: "",
  statut: "realise",
  prestations: [],
  photos: [],
  videoUrl: "",
  ordre: 100,
  publie: true,
};

export default function RealisationForm({ projet, onClose, onSaved }) {
  const [v, setV] = useState(VIDE);
  const [prestationSaisie, setPrestationSaisie] = useState("");
  const [envoiPhoto, setEnvoiPhoto] = useState(false);
  const [enregistrement, setEnregistrement] = useState(false);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    setV(projet ? { ...VIDE, ...projet, annee: projet.annee || "" } : VIDE);
  }, [projet]);

  const set = (champ) => (e) => {
    const val = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setV((prev) => ({ ...prev, [champ]: val }));
  };

  function ajouterPrestation() {
    const p = prestationSaisie.trim();
    if (!p) return;
    setV((prev) => ({ ...prev, prestations: [...prev.prestations, p] }));
    setPrestationSaisie("");
  }

  function retirerPrestation(i) {
    setV((prev) => ({ ...prev, prestations: prev.prestations.filter((_, j) => j !== i) }));
  }

  // Envoi séquentiel plutôt qu'en parallèle : sur une connexion mobile
  // marocaine, cinq photos en parallèle saturent le lien et échouent toutes.
  async function ajouterPhotos(e) {
    const fichiers = [...e.target.files];
    e.target.value = "";
    if (!fichiers.length) return;

    setEnvoiPhoto(true);
    setErreur("");
    try {
      for (const f of fichiers) {
        // eslint-disable-next-line no-await-in-loop
        const res = await uploadImage(f);
        setV((prev) => ({
          ...prev,
          photos: [...prev.photos, { url: res.url, publicId: res.publicId, alt: "" }],
        }));
      }
    } catch (err) {
      setErreur(err.message || "Envoi de l'image impossible.");
    } finally {
      setEnvoiPhoto(false);
    }
  }

  // La photo n'est retirée que de la fiche ici ; le fichier n'est réellement
  // supprimé chez Cloudinary qu'à l'enregistrement, côté serveur — annuler
  // l'édition ne doit rien détruire.
  const retirerPhoto = (i) =>
    setV((prev) => ({ ...prev, photos: prev.photos.filter((_, j) => j !== i) }));

  const legender = (i) => (e) =>
    setV((prev) => ({
      ...prev,
      photos: prev.photos.map((p, j) => (j === i ? { ...p, alt: e.target.value } : p)),
    }));

  async function onSubmit(e) {
    e.preventDefault();
    if (!v.nom.trim()) {
      setErreur("Le nom du projet est obligatoire.");
      return;
    }
    setEnregistrement(true);
    setErreur("");
    try {
      const charge = { ...v, annee: v.annee ? Number(v.annee) : undefined };
      if (projet?._id) await updateRealisation(projet._id, charge);
      else await createRealisation(charge);
      onSaved?.();
    } catch (err) {
      setErreur(err.message || "Enregistrement impossible.");
      setEnregistrement(false);
    }
  }

  return (
    <form className="admin-card" onSubmit={onSubmit}>
      <div className="admin-head" style={{ marginBottom: 22 }}>
        <div>
          <h1 style={{ fontSize: "1.3rem" }}>
            {projet ? "Modifier la réalisation" : "Nouvelle réalisation"}
          </h1>
          {projet && (
            <p>
              URL publique : <code>/realisations/{projet.slug}/</code>
            </p>
          )}
        </div>
        <button type="button" className="btn btn-ghost" onClick={onClose}>
          <Icon name="x" size={16} />
          Annuler
        </button>
      </div>

      {erreur && (
        <div className="form-alert form-alert--err" role="alert">
          <Icon name="alert" size={18} />
          <span>{erreur}</span>
        </div>
      )}

      <div className="field">
        <label htmlFor="nom">
          Nom du projet <span className="field-required">*</span>
        </label>
        <input
          id="nom"
          value={v.nom}
          onChange={set("nom")}
          placeholder="Résidence Al Manar"
          required
        />
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="localisation">Localisation</label>
          <input
            id="localisation"
            value={v.localisation}
            onChange={set("localisation")}
            placeholder="Agdal, Rabat"
          />
        </div>
        <div className="field">
          <label htmlFor="type">Type de projet</label>
          <input
            id="type"
            value={v.type}
            onChange={set("type")}
            placeholder="Immeuble résidentiel"
          />
          <span className="field-hint">Sert de catégorie aux filtres du portfolio.</span>
        </div>
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="surface">Surface</label>
          <input id="surface" value={v.surface} onChange={set("surface")} placeholder="1 250 m²" />
        </div>
        <div className="field">
          <label htmlFor="annee">Année</label>
          <input
            id="annee"
            type="number"
            min="1990"
            max="2100"
            value={v.annee}
            onChange={set("annee")}
            placeholder="2026"
          />
        </div>
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="statut">Statut</label>
          <select id="statut" value={v.statut} onChange={set("statut")}>
            {STATUTS.map((s) => (
              <option key={s.key} value={s.key}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="ordre">Ordre d&apos;affichage</label>
          <input id="ordre" type="number" value={v.ordre} onChange={set("ordre")} />
          <span className="field-hint">Plus le nombre est petit, plus le projet remonte.</span>
        </div>
      </div>

      <div className="field">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          rows={4}
          value={v.description}
          onChange={set("description")}
          placeholder="Nature du projet, contraintes, ce qui a été réalisé…"
        />
      </div>

      <div className="field">
        <label htmlFor="prestation">Prestations réalisées</label>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            id="prestation"
            value={prestationSaisie}
            onChange={(e) => setPrestationSaisie(e.target.value)}
            placeholder="Gros œuvre, étanchéité…"
            onKeyDown={(e) => {
              // Entrée ajoute la prestation au lieu de soumettre le formulaire.
              if (e.key === "Enter") {
                e.preventDefault();
                ajouterPrestation();
              }
            }}
          />
          <button type="button" className="btn btn-ghost" onClick={ajouterPrestation}>
            <Icon name="plus" size={16} />
            Ajouter
          </button>
        </div>
        {v.prestations.length > 0 && (
          <ul style={{ listStyle: "none", padding: 0, margin: "14px 0 0", display: "grid", gap: 8 }}>
            {v.prestations.map((p, i) => (
              <li
                key={`${p}-${i}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  background: "var(--steel-100)",
                  borderRadius: "var(--radius-sm)",
                  padding: "9px 12px",
                  fontSize: "0.93rem",
                }}
              >
                <Icon name="check" size={14} />
                <span style={{ flex: 1 }}>{p}</span>
                <button
                  type="button"
                  className="file-remove"
                  onClick={() => retirerPrestation(i)}
                  aria-label={`Retirer « ${p} »`}
                >
                  <Icon name="x" size={15} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="field file-field">
        <label htmlFor="photos">Photos du chantier</label>
        <label className="file-drop" htmlFor="photos">
          <span className="file-ic">
            {envoiPhoto ? <span className="spinner" style={{ borderTopColor: "var(--cyan-600)", borderColor: "rgba(17,136,204,0.3)" }} /> : <Icon name="upload" size={22} />}
          </span>
          <span>
            {envoiPhoto
              ? "Envoi en cours… ne fermez pas la page."
              : "Choisir des photos (JPG, PNG, WebP — 12 Mo max). La première sert de couverture."}
          </span>
        </label>
        <input
          id="photos"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          multiple
          onChange={ajouterPhotos}
          disabled={envoiPhoto}
        />

        {v.photos.length > 0 && (
          <div className="thumb-grid" style={{ marginTop: 16 }}>
            {v.photos.map((p, i) => (
              <div key={p.publicId || p.url}>
                <div className="thumb">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.url} alt={p.alt || `Photo ${i + 1}`} />
                  <button
                    type="button"
                    className="thumb-del"
                    onClick={() => retirerPhoto(i)}
                    aria-label={`Retirer la photo ${i + 1}`}
                  >
                    <Icon name="x" size={13} />
                  </button>
                </div>
                <input
                  value={p.alt}
                  onChange={legender(i)}
                  placeholder="Description de la photo"
                  style={{
                    width: "100%",
                    marginTop: 6,
                    fontSize: "0.8rem",
                    padding: "6px 8px",
                    border: "1px solid var(--steel-200)",
                    borderRadius: 8,
                  }}
                />
              </div>
            ))}
          </div>
        )}
        <span className="field-hint">
          La description de chaque photo est lue par les moteurs de recherche et par les
          lecteurs d&apos;écran : décrivez ce qu&apos;on y voit.
        </span>
      </div>

      <div className="field">
        <label htmlFor="videoUrl">Vidéo (facultatif)</label>
        <input
          id="videoUrl"
          value={v.videoUrl}
          onChange={set("videoUrl")}
          placeholder="https://www.youtube.com/watch?v=…"
        />
        <span className="field-hint">
          Collez le lien YouTube ou Vimeo tel quel : il est converti automatiquement.
        </span>
      </div>

      <div className="field">
        <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
          <input type="checkbox" checked={v.publie} onChange={set("publie")} style={{ width: "auto" }} />
          Publier sur le site
        </label>
        <span className="field-hint">
          Décoché, le projet reste un brouillon : invisible sur le site public.
        </span>
      </div>

      <div className="cta-row" style={{ marginTop: 24 }}>
        <button type="submit" className="btn btn-primary" disabled={enregistrement || envoiPhoto}>
          {enregistrement ? (
            <>
              <span className="spinner" aria-hidden="true" />
              Enregistrement…
            </>
          ) : (
            <>
              <Icon name="check" size={17} />
              Enregistrer
            </>
          )}
        </button>
        <button type="button" className="btn btn-ghost" onClick={onClose}>
          Annuler
        </button>
      </div>
    </form>
  );
}
