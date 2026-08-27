"use client";

import { useCallback, useEffect, useState } from "react";
import {
  listRealisationsAdmin,
  deleteRealisation,
  updateRealisation,
} from "@/lib/api";
import { statutLabel } from "@/lib/realisations";
import { Icon } from "@/components/Icon";
import RealisationForm from "@/components/admin/RealisationForm";

// Écran principal du tableau de bord : la liste des réalisations.
//
// L'édition se fait sur la MÊME route, en basculant l'affichage, plutôt que sur
// une route /admin/realisations/<id>/ : en export statique, une route dynamique
// devrait connaître tous ses identifiants au build — ce qui est impossible pour
// des fiches créées après coup.
export default function AdminRealisationsPage() {
  const [projets, setProjets] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState("");
  const [edition, setEdition] = useState(null); // null | "nouveau" | projet

  const charger = useCallback(async () => {
    setChargement(true);
    setErreur("");
    try {
      const data = await listRealisationsAdmin();
      setProjets(data.items || []);
    } catch (err) {
      setErreur(err.message || "Chargement impossible.");
    } finally {
      setChargement(false);
    }
  }, []);

  useEffect(() => {
    charger();
  }, [charger]);

  async function supprimer(projet) {
    // Confirmation explicite avec le nom : une suppression détruit aussi les
    // photos chez Cloudinary et n'est pas réversible.
    if (!window.confirm(`Supprimer définitivement « ${projet.nom} » et ses photos ?`)) return;
    try {
      await deleteRealisation(projet._id);
      await charger();
    } catch (err) {
      setErreur(err.message || "Suppression impossible.");
    }
  }

  async function basculerPublication(projet) {
    try {
      await updateRealisation(projet._id, { publie: !projet.publie });
      await charger();
    } catch (err) {
      setErreur(err.message || "Modification impossible.");
    }
  }

  if (edition) {
    return (
      <RealisationForm
        projet={edition === "nouveau" ? null : edition}
        onClose={() => setEdition(null)}
        onSaved={async () => {
          setEdition(null);
          await charger();
        }}
      />
    );
  }

  return (
    <>
      <div className="admin-head">
        <div>
          <h1>Réalisations</h1>
          <p>
            {projets.length} projet{projets.length > 1 ? "s" : ""} —{" "}
            {projets.filter((p) => p.publie).length} publié
            {projets.filter((p) => p.publie).length > 1 ? "s" : ""}
          </p>
        </div>
        <button type="button" className="btn btn-primary" onClick={() => setEdition("nouveau")}>
          <Icon name="plus" size={17} />
          Nouvelle réalisation
        </button>
      </div>

      {erreur && (
        <div className="form-alert form-alert--err" role="alert">
          <Icon name="alert" size={18} />
          <span>{erreur}</span>
        </div>
      )}

      <div className="admin-card">
        {chargement ? (
          <p style={{ color: "var(--ink-400)", padding: "30px 0", textAlign: "center" }}>
            Chargement…
          </p>
        ) : projets.length === 0 ? (
          <div className="empty-state">
            <span className="empty-ic">
              <Icon name="crane" size={30} />
            </span>
            <h3>Aucune réalisation pour l&apos;instant</h3>
            <p>
              Ajoutez votre premier projet : il apparaîtra sur la page Réalisations du site et
              sur la page d&apos;accueil.
            </p>
            <div className="cta-row cta-row--center">
              <button type="button" className="btn btn-primary" onClick={() => setEdition("nouveau")}>
                <Icon name="plus" size={17} />
                Ajouter un projet
              </button>
            </div>
          </div>
        ) : (
          <div className="table-scroll">
            <table className="admin-table">
              <thead>
                <tr>
                  <th style={{ width: 78 }}>Photo</th>
                  <th>Projet</th>
                  <th>Type</th>
                  <th>Statut</th>
                  <th>Ordre</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projets.map((p) => (
                  <tr key={p._id} style={{ opacity: p.publie ? 1 : 0.55 }}>
                    <td>
                      {p.photos?.[0] ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img className="admin-thumb" src={p.photos[0].url} alt="" />
                      ) : (
                        <span
                          className="admin-thumb"
                          style={{ display: "grid", placeItems: "center", color: "var(--ink-400)" }}
                        >
                          <Icon name="image" size={18} />
                        </span>
                      )}
                    </td>
                    <td>
                      <strong>{p.nom}</strong>
                      <br />
                      <span style={{ color: "var(--ink-400)", fontSize: "0.86rem" }}>
                        {[p.localisation, p.annee].filter(Boolean).join(" · ")}
                        {!p.publie && " — brouillon"}
                      </span>
                    </td>
                    <td>{p.type || "—"}</td>
                    <td>
                      <span className={`badge ${p.statut === "en-cours" ? "badge--warn" : "badge--ok"}`}>
                        {statutLabel(p.statut)}
                      </span>
                    </td>
                    <td>{p.ordre}</td>
                    <td>
                      <div className="admin-actions">
                        <button
                          type="button"
                          className="icon-btn"
                          onClick={() => basculerPublication(p)}
                          title={p.publie ? "Dépublier" : "Publier"}
                          aria-label={p.publie ? `Dépublier ${p.nom}` : `Publier ${p.nom}`}
                        >
                          <Icon name="eye" size={16} />
                        </button>
                        <button
                          type="button"
                          className="icon-btn"
                          onClick={() => setEdition(p)}
                          title="Modifier"
                          aria-label={`Modifier ${p.nom}`}
                        >
                          <Icon name="edit" size={16} />
                        </button>
                        <button
                          type="button"
                          className="icon-btn icon-btn--danger"
                          onClick={() => supprimer(p)}
                          title="Supprimer"
                          aria-label={`Supprimer ${p.nom}`}
                        >
                          <Icon name="trash" size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="admin-card">
        <p style={{ color: "var(--ink-600)", fontSize: "0.93rem" }}>
          <strong>À savoir :</strong> un projet ajouté ici apparaît immédiatement dans la
          grille des réalisations du site. Sa page détaillée
          (<code>/realisations/…</code>) est créée au déploiement suivant.
        </p>
      </div>
    </>
  );
}
