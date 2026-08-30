"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { submitLead } from "@/lib/api";
import {
  getContact,
  getDossierForm,
  options,
  TYPES_CLIENT,
  TYPES_PROJET,
  BUDGETS,
  UPLOAD,
} from "@/content/contact";
import { TYPES_COLLABORATION, FOURCHETTES_INVESTISSEMENT } from "@/content/investisseurs";
import { t } from "@/lib/ui";
import { Icon } from "./Icon";

// Formulaire de demande, dans ses deux variantes :
//   kind="contact"      → §13.1 (9 champs + pièce jointe)
//   kind="investisseur" → §10 bis.5 (dossier investisseur)
//
// La validation ici est un CONFORT (retour immédiat), pas une sécurité : le
// serveur revalide tout (§19). Les erreurs renvoyées par l'API champ par champ
// sont réaffichées telles quelles — l'API les renvoie dans la langue passée en
// `langue`, d'où l'envoi de ce champ avec la demande.
//
// ⚠️ BILINGUE — ce que le visiteur VOIT est traduit ; ce qui PART vers l'API ne
// l'est pas. Les <option> affichent `label` et envoient `value`, resté français
// (cf. content/contact.js). Le gérant lit donc des demandes homogènes dans son
// dashboard, qu'elles viennent de /contact/ ou de /en/contact/.
export default function LeadForm({ kind = "contact", lang = "fr" }) {
  const isInvest = kind === "investisseur";
  const ui = t(lang);
  const f = ui.form;
  const contact = getContact(lang);
  const dossier = getDossierForm(lang);

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
  // (ex. /contact/?sujet=etude-terrain, /en/contact/?sujet=etude-terrain — le
  // paramètre est un identifiant technique, identique dans les deux langues).
  useEffect(() => {
    const sujet = searchParams.get("sujet");
    const projet = searchParams.get("projet");
    setValues((v) => ({
      ...v,
      ...(sujet && TYPES_PROJET.some((x) => x.value === sujet) ? { typeProjet: sujet } : {}),
      ...(projet ? { projet } : {}),
    }));
  }, [searchParams]);

  const set = (name) => (e) => {
    setValues((v) => ({ ...v, [name]: e.target.value }));
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  };

  function pickFile(e) {
    const chosen = e.target.files?.[0];
    if (!chosen) return;
    if (chosen.size > UPLOAD.maxMb * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, fichier: f.errFileSize(UPLOAD.maxMb) }));
      e.target.value = "";
      return;
    }
    setErrors((prev) => ({ ...prev, fichier: undefined }));
    setFile(chosen);
  }

  function clearFile() {
    setFile(null);
    if (fileInput.current) fileInput.current.value = "";
  }

  function validate() {
    const e = {};
    if (!values.nom?.trim()) e.nom = f.errName;
    if (!values.telephone?.trim()) e.telephone = f.errPhone;
    if (!values.email?.trim()) e.email = f.errEmail;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email)) e.email = f.errEmailFormat;
    if (!values.message?.trim()) e.message = f.errMessage;
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
    // Langue de la demande : elle dit au serveur dans quelle langue formuler ses
    // messages d'erreur, et indique au gérant dans quelle langue répondre.
    fd.append("langue", lang);
    fd.append("ouvertDepuis", String(Date.now() - openedAt.current));
    if (file) fd.append("fichier", file);

    try {
      await submitLead(fd);
      setStatus("sent");
    } catch (err) {
      if (err.fields) setErrors(err.fields);
      setErrorMsg(err.message || contact.errorText);
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
          <h3>{isInvest ? dossier.successTitle : contact.successTitle}</h3>
          <p>{isInvest ? dossier.successText : contact.successText}</p>
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
      <h2>{isInvest ? dossier.title : contact.formTitle}</h2>

      {status === "error" && (
        <div className="form-alert form-alert--err" role="alert">
          <Icon name="alert" size={18} />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Piège à robots : invisible et retiré du parcours clavier. */}
      <div className="hp-field" aria-hidden="true">
        <label htmlFor="site-web">{f.honeypot}</label>
        <input id="site-web" name="siteWeb" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="nom">
            {isInvest ? f.nameCompany : f.name} <span className="field-required">{f.required}</span>
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
            {f.phone} <span className="field-required">{f.required}</span>
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
            {f.email} <span className="field-required">{f.required}</span>
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
            <label htmlFor="fonction">{f.role}</label>
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
            <label htmlFor="typeClient">{f.clientType}</label>
            <select
              id="typeClient"
              name="typeClient"
              value={values.typeClient || ""}
              onChange={set("typeClient")}
            >
              <option value="">{f.select}</option>
              {options(TYPES_CLIENT, lang).map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
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
              <label htmlFor="pays">{f.country}</label>
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
              <label htmlFor="typePartenaire">{f.partnerType}</label>
              <input
                id="typePartenaire"
                name="typePartenaire"
                type="text"
                placeholder={f.partnerTypeHint}
                value={values.typePartenaire || ""}
                onChange={set("typePartenaire")}
              />
            </div>
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="fourchette">{f.range}</label>
              <select
                id="fourchette"
                name="fourchette"
                value={values.fourchette || ""}
                onChange={set("fourchette")}
              >
                <option value="">{f.select}</option>
                {options(FOURCHETTES_INVESTISSEMENT, lang).map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="collaboration">{f.collaboration}</label>
              <select
                id="collaboration"
                name="collaboration"
                value={values.collaboration || ""}
                onChange={set("collaboration")}
              >
                <option value="">{f.select}</option>
                {options(TYPES_COLLABORATION, lang).map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="field">
            <label htmlFor="secteur">{f.sector}</label>
            <input
              id="secteur"
              name="secteur"
              type="text"
              placeholder={f.sectorHint}
              value={values.secteur || ""}
              onChange={set("secteur")}
            />
          </div>
        </>
      ) : (
        <>
          <div className="field-row">
            <div className="field">
              <label htmlFor="typeProjet">{f.projectType}</label>
              <select
                id="typeProjet"
                name="typeProjet"
                value={values.typeProjet || ""}
                onChange={set("typeProjet")}
              >
                <option value="">{f.select}</option>
                {options(TYPES_PROJET, lang).map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="localisation">{f.location}</label>
              <input
                id="localisation"
                name="localisation"
                type="text"
                placeholder={f.locationHint}
                value={values.localisation || ""}
                onChange={set("localisation")}
              />
            </div>
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="surface">{f.area}</label>
              <input
                id="surface"
                name="surface"
                type="text"
                placeholder={f.areaHint}
                value={values.surface || ""}
                onChange={set("surface")}
              />
            </div>
            <div className="field">
              <label htmlFor="budget">{f.budget}</label>
              <select id="budget" name="budget" value={values.budget || ""} onChange={set("budget")}>
                <option value="">{f.select}</option>
                {options(BUDGETS, lang).map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </>
      )}

      <div className="field">
        <label htmlFor="message">
          {f.message} <span className="field-required">{f.required}</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={values.message || ""}
          onChange={set("message")}
          aria-invalid={invalid("message")}
          placeholder={isInvest ? f.messageHintInvest : f.messageHint}
          required
        />
        {err("message")}
      </div>

      <div className="field file-field">
        <label htmlFor="fichier">{f.file}</label>
        <label className="file-drop" htmlFor="fichier">
          <span className="file-ic">
            <Icon name="upload" size={22} />
          </span>
          <span>{contact.uploadHint}</span>
        </label>
        <input
          id="fichier"
          name="fichier"
          type="file"
          ref={fileInput}
          accept={UPLOAD.accept}
          onChange={pickFile}
        />
        {file && (
          <span className="file-chosen">
            <Icon name="check" size={15} />
            {file.name} ({(file.size / 1024 / 1024).toFixed(1)} {f.fileUnit})
            <button
              type="button"
              className="file-remove"
              onClick={clearFile}
              aria-label={f.fileRemove}
            >
              <Icon name="x" size={15} />
            </button>
          </span>
        )}
        {err("fichier")}
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={status === "sending"}
        style={{ width: "100%", justifyContent: "center" }}
      >
        {status === "sending" ? (
          <>
            <span className="spinner" aria-hidden="true" />
            {f.sending}
          </>
        ) : (
          <>
            {isInvest ? f.submitInvest : f.submit}
            <Icon name="arrow" size={17} />
          </>
        )}
      </button>

      <p className="field-hint" style={{ marginTop: 14 }}>
        {f.privacy}
      </p>
    </form>
  );
}
