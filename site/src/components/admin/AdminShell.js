"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { API_URL, getToken, logout as clearToken } from "@/lib/api";
import { Icon } from "../Icon";
import LoginCard from "./LoginCard";

// Coquille du tableau de bord : garde d'authentification + barre latérale.
//
// La garde est CÔTÉ CLIENT parce qu'il ne peut pas en être autrement : le site
// est un export statique, il n'y a aucun serveur pour protéger une route. Ce
// n'est pas un problème de sécurité — les pages du dashboard ne contiennent
// aucune donnée en dur, et TOUTES les données passent par l'API, qui exige un
// jeton valide. Sans jeton, l'écran s'affiche vide.

const AdminContext = createContext(null);
export const useAdmin = () => useContext(AdminContext);

const LIENS = [
  { href: "/admin/", label: "Réalisations", icon: "building" },
  { href: "/admin/demandes/", label: "Demandes", icon: "inbox" },
];

export default function AdminShell({ children }) {
  const pathname = usePathname();
  // "verification" tant qu'on n'a pas confirmé le jeton auprès de l'API :
  // afficher l'écran de connexion pendant ce laps de temps ferait clignoter le
  // formulaire à chaque rechargement de page.
  const [etat, setEtat] = useState("verification");
  const [admin, setAdmin] = useState(null);
  const [nonLues, setNonLues] = useState(0);

  const verifier = useCallback(async () => {
    const token = getToken();
    if (!token || !API_URL) {
      setEtat("deconnecte");
      return;
    }
    try {
      const res = await fetch(`${API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("jeton refusé");
      setAdmin(await res.json());
      setEtat("connecte");
    } catch {
      clearToken();
      setEtat("deconnecte");
    }
  }, []);

  useEffect(() => {
    verifier();
  }, [verifier]);

  // Compteur de demandes non lues : sans notification par e-mail (choix validé
  // avec le client), c'est le seul signal qui dit au gérant qu'il a du courrier.
  const rafraichirCompteur = useCallback(async () => {
    const token = getToken();
    if (!token || !API_URL) return;
    try {
      const res = await fetch(`${API_URL}/api/leads`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) return;
      const data = await res.json();
      setNonLues(data.nonLues || 0);
    } catch {
      /* silencieux : un compteur absent ne doit pas casser le tableau de bord */
    }
  }, []);

  useEffect(() => {
    if (etat === "connecte") rafraichirCompteur();
  }, [etat, pathname, rafraichirCompteur]);

  function seDeconnecter() {
    clearToken();
    setAdmin(null);
    setEtat("deconnecte");
  }

  if (etat === "verification") {
    return (
      <div className="login-shell">
        <span className="spinner" style={{ width: 28, height: 28, borderWidth: 3 }} />
      </div>
    );
  }

  if (etat === "deconnecte") {
    return <LoginCard onSuccess={verifier} />;
  }

  return (
    <AdminContext.Provider value={{ admin, rafraichirCompteur }}>
      <div className="admin-shell">
        <aside className="admin-side">
          <div className="admin-brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-light.png" alt="BIM Leaders" />
            <span>Tableau de bord</span>
          </div>

          <nav className="admin-nav">
            {LIENS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={pathname === l.href ? "is-active" : ""}
              >
                <Icon name={l.icon} size={18} />
                {l.label}
                {l.href === "/admin/demandes/" && nonLues > 0 && (
                  <span
                    style={{
                      marginLeft: "auto",
                      background: "var(--cyan-500)",
                      color: "#fff",
                      borderRadius: 999,
                      padding: "1px 8px",
                      fontSize: "0.74rem",
                      fontWeight: 700,
                    }}
                  >
                    {nonLues}
                  </span>
                )}
              </Link>
            ))}

            <div className="admin-nav-spacer" />

            <Link href="/" target="_blank">
              <Icon name="eye" size={18} />
              Voir le site
            </Link>
            <button type="button" onClick={seDeconnecter}>
              <Icon name="logout" size={18} />
              Se déconnecter
            </button>
          </nav>
        </aside>

        <div className="admin-main">{children}</div>
      </div>
    </AdminContext.Provider>
  );
}
