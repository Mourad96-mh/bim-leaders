"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { submitLead } from "@/lib/api";
import { CONTACT, TYPES_CLIENT, TYPES_PROJET, BUDGETS } from "@/content/contact";
import {
  TYPES_COLLABORATION,
  FOURCHETTES_INVESTISSEMENT,
} from "@/content/investisseurs";
import { Icon } from "./Icon";

// Formulaire de demande, dans ses deux variantes :
//   kind="contact"    → §13.1 (9 champs + pièce jointe)
//   kind="investisseur" → §10 bis.5 (dossier investisseur)
//
// La validation ici est un CONFORT (retour immédiat), pas une sécurité : le
// serveur revalide tout (§19). Les erreurs renvoyées par l'API champ par champ
// sont réaffichées telles quelles.
export default function LeadForm({ kind = "contact" }) {
  const isInvest = kind === "investisseur";
  const copy = isInvest ? null : CONTACT;

  const searchParams = useSearchParams();
  const [values, setValues] = useState({});
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState("");
  const fileInput = useRef(null);
  // Horodatage d'ouverture : le serveur rejette les envois trop rapides, qui
  // trahissent un robot (§19 « protection anti-spam »).
  const openedAt = useRef(Date.now());

  // Pré-remplissage depuis les liens des pages Particuliers / Investisseurs
  // (ex. /contact/?sujet=etude-terrain).
  useEffect(() => {
    const sujet = searchParams.get("sujet");
    const projet = searchParams.get("projet");
    setValues((v) => ({
      ...v,
      ...(sujet && TYPES_PROJET.some((t) => t.value === sujet) ? { typeProjet: sujet } : {}),
      ...(projet ? { projet } : {}),
    }));
  }, [searchParams]);

  const set = (name) => (e) => {
    setValues((v) => ({ ...v, [name]: e.target.value }));
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  };

  function pickFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > CONTACT.upload.maxMb * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        fichier: `Fichier trop volumineux (max ${CONTACT.upload.maxMb} Mo).`,
      }));
      e.target.value = "";
      return;
    }
    setErrors((prev) => ({ ...prev, fichier: undefined }));
    setFile(f);
  }

  function clearFile() {
    setFile(null);
    if (fileInput.current) fileInput.current.value = "";
  }

  function validate() {
    const e = {};
    if (!values.nom?.trim()) e.nom = "Indiquez votre nom.";
    if (!values.telephone?.trim()) e.telephone = "Indiquez un numéro de téléphone.";
    if (!values.email?.trim()) e.email = "Indiquez votre e-mail.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email))
      e.email = "Cette adresse e-mail semble incorrecte.";
    if (!values.message?.trim()) e.message = "Décrivez votre projet en quelques mots.";
    return e;
  }

  async function onSubmit(event) {
    event.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length) {
      // Ramène le premier champ fautif à l'écran plutôt que de laisser
      // l'utilisateur chercher où ça bloque.
      document.querySelector(`[name="${Object.keys(found)[0]}"]`)?.focus();
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    const fd = new FormData();
    fd.append("type", kind);
    Object.entries(values).forEach(([k, v]) => v && fd.append(k, v));
    fd.append("ouvertDepuis", String(Date.now() - openedAt.current));
    if (file) fd.append("fichier", file);

    try {
      await submitLead(fd);
      setStatus("sent");
    } catch (err) {
      if (err.fields) setErrors(err.fields);
      setErrorMsg(err.message || CONTACT.errorText);
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="form-card">
        <div className="form-success">
          <span className="fs-ic">
            <Icon name="check" size={30} />
          </span>
          <h3>{isInvest ? "Demande reçue" : CONTACT.successTitle}</h3>
          <p>
            {isInvest
              ? "Merci. Nous étudions votre demande et revenons vers vous pour vous transmettre le dossier investisseur."
              : CONTACT.successText}
          </p>
        </div>
      </div>
    );
  }

  const err = (name) =>
    errors[name] ? (
      <span className="field-error" role="alert">
        {errors[name]}
      </span>
    ) : null;
  const invalid = (name) => (errors[name] ? "true" : undefined);

  return (
    <form className="form-card" onSubmit={onSubmit} noValidate>
      <h2>{isInvest ? "Demander le dossier investisseur" : CONTACT.formTitle}</h2>

      {status === "error" && (
        <div className="form-alert form-alert--err" role="alert">
          <Icon name="alert" size={18} />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Piège à robots : invisible et retiré du parcours clavier. */}
      <div className="hp-field" aria-hidden="true">
        <label htmlFor="site-web">Ne pas remplir</label>
        <input id="site-web" name="siteWeb" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="nom">
            {isInvest ? "Nom / Société" : "Nom et prénom"} <span className="field-required">*</span>
          </label>
          <input
            id="nom"
            name="nom"
            type="text"
            autoComplete="name"
            value={values.nom || ""}
            onChange={set("nom")}
            aria-invalid={invalid("nom")}
            required
          />
          {err("nom")}
        </div>

        <div className="field">
          <label htmlFor="telephone">
            Téléphone <span className="field-required">*</span>
          </label>
          <input
            id="telephone"
            name="telephone"
            type="tel"
            autoComplete="tel"
            value={values.telephone || ""}
            onChange={set("telephone")}
            aria-invalid={invalid("telephone")}
            required
          />
          {err("telephone")}
        </div>
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="email">
            E-mail <span className="field-required">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email || ""}
            onChange={set("email")}
            aria-invalid={invalid("email")}
            required
          />
          {err("email")}
        </div>

        {isInvest ? (
          <div className="field">
            <label htmlFor="fonction">Fonction</label>
            <input
              id="fonction"
              name="fonction"
              type="text"
              value={values.fonction || ""}
              onChange={set("fonction")}
            />
          </div>
        ) : (
          <div className="field">
            <label htmlFor="typeClient">Type de client</label>
            <select
              id="typeClient"
              name="typeClient"
              value={values.typeClient || ""}
              onChange={set("typeClient")}
            >
              <option value="">— Sélectionner —</option>
              {TYPES_CLIENT.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {isInvest ? (
        <>
          <div className="field-row">
            <div className="field">
              <label htmlFor="pays">Pays</label>
              <input
                id="pays"
                name="pays"
                type="text"
                autoComplete="country-name"
                value={values.pays || ""}
                onChange={set("pays")}
              />
            </div>
            <div className="field">
              <label htmlFor="typePartenaire">Type de partenaire</label>
              <input
                id="typePartenaire"
                name="typePartenaire"
                type="text"
                placeholder="Investisseur, fonds, promoteur…"
                value={values.typePartenaire || ""}
                onChange={set("typePartenaire")}
              />
            </div>
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="fourchette">Fourchette d&apos;investissement</label>
              <select
                id="fourchette"
                name="fourchette"
                value={values.fourchette || ""}
                onChange={set("fourchette")}
              >
                <option value="">— Sélectionner —</option>
                {FOURCHETTES_INVESTISSEMENT.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="collaboration">Type de collaboration souhaitée</label>
              <select
                id="collaboration"
                name="collaboration"
                value={values.collaboration || ""}
                onChange={set("collaboration")}
              >
                <option value="">— Sélectionner —</option>
                {TYPES_COLLABORATION.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="field">
            <label htmlFor="secteur">Secteur d&apos;intérêt</label>
            <input
              id="secteur"
              name="secteur"
              type="text"
              placeholder="Résidentiel, commercial, industriel…"
              value={values.secteur || ""}
              onChange={set("secteur")}
            />
          </div>
        </>
      ) : (
        <>
          <div className="field-row">
            <div className="field">
              <label htmlFor="typeProjet">Type de projet</label>
              <select
                id="typeProjet"
                name="typeProjet"
                value={values.typeProjet || ""}
                onChange={set("typeProjet")}
              >
                <option value="">— Sélectionner —</option>
                {TYPES_PROJET.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="localisation">Localisation</label>
              <input
                id="localisation"
                name="localisation"
                type="text"
                placeholder="Ville, quartier"
                value={values.localisation || ""}
                onChange={set("localisation")}
              />
            </div>
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="surface">Surface du terrain / projet</label>
              <input
                id="surface"
                name="surface"
                type="text"
                placeholder="ex. 320 m²"
                value={values.surface || ""}
                onChange={set("surface")}
              />
            </div>
            <div className="field">
              <label htmlFor="budget">Budget indicatif</label>
              <select id="budget" name="budget" value={values.budget || ""} onChange={set("budget")}>
                <option value="">— Sélectionner —</option>
                {BUDGETS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </>
      )}

      <div className="field">
        <label htmlFor="message">
          Message <span className="field-required">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={values.message || ""}
          onChange={set("message")}
          aria-invalid={invalid("message")}
          placeholder={
            isInvest
              ? "Décrivez votre profil et le type de projet qui vous intéresse."
              : "Décrivez votre projet : nature des travaux, échéance, contraintes connues…"
          }
          required
        />
        {err("message")}
      </div>

      <div className="field file-field">
        <label htmlFor="fichier">Pièce jointe (facultatif)</label>
        <label className="file-drop" htmlFor="fichier">
          <span className="file-ic">
            <Icon name="upload" size={22} />
          </span>
          <span>{CONTACT.upload.hint}</span>
        </label>
        <input
          id="fichier"
          name="fichier"
          type="file"
          ref={fileInput}
          accept={CONTACT.upload.accept}
          onChange={pickFile}
        />
        {file && (
          <span className="file-chosen">
            <Icon name="check" size={15} />
            {file.name} ({(file.size / 1024 / 1024).toFixed(1)} Mo)
            <button type="button" className="file-remove" onClick={clearFile} aria-label="Retirer le fichier">
              <Icon name="x" size={15} />
            </button>
          </span>
        )}
        {err("fichier")}
      </div>

      <button type="submit" className="btn btn-primary" disabled={status === "sending"} style={{ width: "100%", justifyContent: "center" }}>
        {status === "sending" ? (
          <>
            <span className="spinner" aria-hidden="true" />
            Envoi en cours…
          </>
        ) : (
          <>
            {isInvest ? "Demander le dossier" : "Envoyer ma demande"}
            <Icon name="arrow" size={17} />
          </>
        )}
      </button>

      <p className="field-hint" style={{ marginTop: 14 }}>
        Les informations transmises servent uniquement à traiter votre demande et ne sont
        communiquées à aucun tiers.
      </p>
    </form>
  );
}
