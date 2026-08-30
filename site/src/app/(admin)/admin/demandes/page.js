"use client";

import { useCallback, useEffect, useState } from "react";
import { listLeads, markLead, deleteLead } from "@/lib/api";
import { Icon } from "@/components/Icon";
import { useAdmin } from "@/components/admin/AdminShell";

// Boîte de réception des demandes (§21 « génération de prospects »).
//
// Le client a choisi de NE PAS recevoir de notification par e-mail : les
// demandes sont consultées ici. C'est donc cet écran qui doit rendre une
// demande impossible à manquer — d'où le compteur dans la barre latérale et
// le passage automatique de « nouveau » à « lu » à l'ouverture d'une fiche.

const LIBELLE_STATUT = {
  nouveau: { label: "Nouveau", tone: "accent" },
  lu: { label: "Lu", tone: "neutral" },
  traite: { label: "Traité", tone: "ok" },
};

const dateFr = (iso) =>
  new Date(iso).toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

export default function AdminDemandesPage() {
  const [leads, setLeads] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState("");
  const [ouvert, setOuvert] = useState(null);
  const [filtre, setFiltre] = useState("tous");
  const admin = useAdmin();

  const charger = useCallback(async () => {
    setChargement(true);
    try {
      const data = await listLeads();
      setLeads(data.items || []);
    } catch (err) {
      setErreur(err.message || "Chargement impossible.");
    } finally {
      setChargement(false);
    }
  }, []);

  useEffect(() => {
    charger();
  }, [charger]);

  // Ouvrir une demande la marque lue : le compteur ne reste pas allumé sur du
  // courrier déjà consulté.
  async function ouvrir(lead) {
    setOuvert(lead);
    if (lead.statut === "nouveau") {
      try {
        await markLead(lead._id, "lu");
        setLeads((prev) => prev.map((l) => (l._id === lead._id ? { ...l, statut: "lu" } : l)));
        admin?.rafraichirCompteur?.();
      } catch {
        /* sans gravité : la demande reste marquée « nouveau » */
      }
    }
  }

  async function changerStatut(lead, statut) {
    try {
      await markLead(lead._id, statut);
      setLeads((prev) => prev.map((l) => (l._id === lead._id ? { ...l, statut } : l)));
      setOuvert((o) => (o && o._id === lead._id ? { ...o, statut } : o));
      admin?.rafraichirCompteur?.();
    } catch (err) {
      setErreur(err.message || "Modification impossible.");
    }
  }

  async function supprimer(lead) {
    if (!window.confirm(`Supprimer définitivement la demande de ${lead.nom} ?`)) return;
    try {
      await deleteLead(lead._id);
      setOuvert(null);
      await charger();
      admin?.rafraichirCompteur?.();
    } catch (err) {
      setErreur(err.message || "Suppression impossible.");
    }
  }

  const visibles = filtre === "tous" ? leads : leads.filter((l) => l.statut === filtre);

  // ------------------------------------------------------------- détail ----
  if (ouvert) {
    const champs = [
      ["Type de demande", ouvert.type === "investisseur" ? "Dossier investisseur" : "Contact"],
      ["Téléphone", ouvert.telephone],
      ["E-mail", ouvert.email],
      ["Type de client", ouvert.typeClient],
      ["Type de projet", ouvert.typeProjet],
      ["Localisation", ouvert.localisation],
      ["Surface", ouvert.surface],
      ["Budget indicatif", ouvert.budget],
      ["Fonction", ouvert.fonction],
      ["Pays", ouvert.pays],
      ["Type de partenaire", ouvert.typePartenaire],
      ["Secteur d'intérêt", ouvert.secteur],
      ["Fourchette d'investissement", ouvert.fourchette],
      ["Collaboration souhaitée", ouvert.collaboration],
      ["Projet concerné", ouvert.projet],
      // Langue de la page d'où vient la demande : c'est dans cette langue qu'il
      // faut répondre. Les demandes antérieures à la mise en bilingue n'ont pas
      // le champ — on les considère françaises, ce qu'elles étaient.
      ["Langue du demandeur", ouvert.langue === "en" ? "Anglais" : "Français"],
      ["Reçue le", dateFr(ouvert.createdAt)],
    ].filter(([, v]) => v);

    return (
      <>
        <div className="admin-head">
          <div>
            <h1>{ouvert.nom}</h1>
            <p>{dateFr(ouvert.createdAt)}</p>
          </div>
          <button type="button" className="btn btn-ghost" onClick={() => setOuvert(null)}>
            <Icon name="arrow" size={16} />
            Retour à la liste
          </button>
        </div>

        <div className="admin-card">
          <div className="cta-row" style={{ marginBottom: 24 }}>
            <a className="btn btn-primary" href={`tel:${ouvert.telephone}`}>
              <Icon name="phone" size={16} />
              Appeler
            </a>
            <a
              className="btn btn-whats"
              href={`https://wa.me/${ouvert.telephone.replace(/\D/g, "").replace(/^0/, "212")}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="whatsapp" size={16} />
              WhatsApp
            </a>
            <a className="btn btn-ghost" href={`mailto:${ouvert.email}`}>
              <Icon name="mail" size={16} />
              Répondre par e-mail
            </a>
          </div>

          <dl className="spec-list">
            {champs.map(([label, valeur]) => (
              <div className="spec-row" key={label}>
                <dt>{label}</dt>
                <dd>{valeur}</dd>
              </div>
            ))}
          </dl>

          <h2 style={{ fontSize: "1.05rem", color: "var(--blue-900)", margin: "26px 0 10px" }}>
            Message
          </h2>
          <p style={{ color: "var(--ink-600)", whiteSpace: "pre-wrap", lineHeight: 1.7 }}>
            {ouvert.message}
          </p>

          {ouvert.fichier?.url && (
            <>
              <h2 style={{ fontSize: "1.05rem", color: "var(--blue-900)", margin: "26px 0 10px" }}>
                Pièce jointe
              </h2>
              <a
                className="btn btn-ghost"
                href={ouvert.fichier.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="download" size={16} />
                {ouvert.fichier.nom}
                {ouvert.fichier.taille
                  ? ` (${(ouvert.fichier.taille / 1024 / 1024).toFixed(1)} Mo)`
                  : ""}
              </a>
            </>
          )}

          <div className="cta-row" style={{ marginTop: 30, borderTop: "1px solid var(--steel-200)", paddingTop: 22 }}>
            {ouvert.statut !== "traite" ? (
              <button type="button" className="btn btn-accent" onClick={() => changerStatut(ouvert, "traite")}>
                <Icon name="check" size={16} />
                Marquer comme traitée
              </button>
            ) : (
              <button type="button" className="btn btn-ghost" onClick={() => changerStatut(ouvert, "lu")}>
                Rouvrir la demande
              </button>
            )}
            <button type="button" className="btn btn-ghost" onClick={() => supprimer(ouvert)}>
              <Icon name="trash" size={16} />
              Supprimer
            </button>
          </div>
        </div>
      </>
    );
  }

  // -------------------------------------------------------------- liste ----
  return (
    <>
      <div className="admin-head">
        <div>
          <h1>Demandes reçues</h1>
          <p>
            {leads.length} demande{leads.length > 1 ? "s" : ""} —{" "}
            {leads.filter((l) => l.statut === "nouveau").length} non lue
            {leads.filter((l) => l.statut === "nouveau").length > 1 ? "s" : ""}
          </p>
        </div>
        <div className="filters" style={{ margin: 0 }}>
          {[
            ["tous", "Toutes"],
            ["nouveau", "Non lues"],
            ["lu", "Lues"],
            ["traite", "Traitées"],
          ].map(([cle, label]) => (
            <button
              key={cle}
              type="button"
              className={`filter-btn ${filtre === cle ? "is-active" : ""}`}
              onClick={() => setFiltre(cle)}
            >
              {label}
            </button>
          ))}
        </div>
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
        ) : visibles.length === 0 ? (
          <div className="empty-state">
            <span className="empty-ic">
              <Icon name="inbox" size={30} />
            </span>
            <h3>Aucune demande</h3>
            <p>
              Les demandes envoyées depuis le formulaire de contact et depuis le formulaire
              investisseur apparaîtront ici.
            </p>
          </div>
        ) : (
          <div className="table-scroll">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Demandeur</th>
                  <th>Type</th>
                  <th>Projet</th>
                  <th>Reçue le</th>
                  <th>Statut</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {visibles.map((l) => (
                  <tr
                    key={l._id}
                    style={{ fontWeight: l.statut === "nouveau" ? 600 : 400, cursor: "pointer" }}
                    onClick={() => ouvrir(l)}
                  >
                    <td>
                      {l.nom}
                      <br />
                      <span style={{ color: "var(--ink-400)", fontSize: "0.86rem", fontWeight: 400 }}>
                        {l.telephone}
                      </span>
                    </td>
                    <td>
                      {l.type === "investisseur" ? "Investisseur" : "Contact"}
                      {/* Seul l'anglais est signalé : le français est le cas
                          courant, le marquer partout n'apprendrait rien. */}
                      {l.langue === "en" && (
                        <span className="badge badge--neutral" style={{ marginLeft: 8 }}>
                          EN
                        </span>
                      )}
                    </td>
                    <td>{l.typeProjet || l.projet || "—"}</td>
                    <td>{dateFr(l.createdAt)}</td>
                    <td>
                      <span className={`badge badge--${LIBELLE_STATUT[l.statut].tone}`}>
                        {LIBELLE_STATUT[l.statut].label}
                      </span>
                    </td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <div className="admin-actions">
                        <button
                          type="button"
                          className="icon-btn"
                          onClick={() => ouvrir(l)}
                          title="Ouvrir"
                          aria-label={`Ouvrir la demande de ${l.nom}`}
                        >
                          <Icon name="eye" size={16} />
                        </button>
                        <button
                          type="button"
                          className="icon-btn icon-btn--danger"
                          onClick={() => supprimer(l)}
                          title="Supprimer"
                          aria-label={`Supprimer la demande de ${l.nom}`}
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
    </>
  );
}
