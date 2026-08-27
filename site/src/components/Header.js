"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "@/lib/company";
import Logo from "./Logo";

// En-tête collant : logo, navigation, et le bouton d'action principal
// « DEMANDER UN DEVIS » exigé par le §5 du cahier des charges.
// Sous 980px la nav bascule en panneau déroulant piloté par le burger.
export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Referme le menu à chaque changement de page : sans cela, la navigation
  // interne laisse le panneau ouvert par-dessus la nouvelle page.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Empêche le défilement de l'arrière-plan pendant que le menu est ouvert.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Une entrée est active pour sa page ET ses sous-pages (/construction/ doit
  // rester allumé sur /construction/gros-oeuvre/), sauf l'accueil.
  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Logo height={52} />

        <nav className={`main-nav ${open ? "is-open" : ""}`} aria-label="Navigation principale">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link ${isActive(item.href) ? "is-active" : ""}`}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/contact/" className="btn btn-accent nav-cta">
            Demander un devis
          </Link>
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className={`burger ${open ? "is-open" : ""}`}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
