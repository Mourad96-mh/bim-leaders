"use client";

import { useState } from "react";
import { login, API_URL } from "@/lib/api";
import { Icon } from "../Icon";

export default function LoginCard({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [erreur, setErreur] = useState("");
  const [envoi, setEnvoi] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setEnvoi(true);
    setErreur("");
    try {
      await login(email, motDePasse);
      onSuccess?.();
    } catch (err) {
      setErreur(err.message || "Connexion impossible.");
      setEnvoi(false);
    }
  }

  return (
    <div className="login-shell">
      <form className="login-card" onSubmit={onSubmit}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="BIM Leaders" />
        <h1>Tableau de bord</h1>
        <p>Réservé à l&apos;administration du site</p>

        {!API_URL && (
          <div className="form-alert form-alert--err">
            <Icon name="alert" size={18} />
            <span>
              L&apos;adresse de l&apos;API n&apos;est pas configurée
              (<code>NEXT_PUBLIC_API_URL</code>).
            </span>
          </div>
        )}

        {erreur && (
          <div className="form-alert form-alert--err" role="alert">
            <Icon name="alert" size={18} />
            <span>{erreur}</span>
          </div>
        )}

        <div className="field">
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="motdepasse">Mot de passe</label>
          <input
            id="motdepasse"
            type="password"
            autoComplete="current-password"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={envoi}>
          {envoi ? (
            <>
              <span className="spinner" aria-hidden="true" />
              Connexion…
            </>
          ) : (
            <>
              <Icon name="lock" size={17} />
              Se connecter
            </>
          )}
        </button>
      </form>
    </div>
  );
}
