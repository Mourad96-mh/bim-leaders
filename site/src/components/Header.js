"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { path, switchPath, otherLocale, LOCALE_LABELS } from "@/lib/i18n";
import { t, NAV_KEYS } from "@/lib/ui";
import Logo from "./Logo";

// En-tête collant : logo, navigation, sélecteur de langue, et le bouton d'action
// principal « DEMANDER UN DEVIS » exigé par le §5 du cahier des charges.
// Sous 980px la nav bascule en panneau déroulant piloté par le burger.
export default function Header({ lang = "fr" }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const ui = t(lang);

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

  const home = path("home", lang);

  // Une entrée est active pour sa page ET ses sous-pages (/construction/ doit
  // rester allumé sur /construction/gros-oeuvre/), sauf l'accueil — qui, en
  // anglais, est /en/ et non / : d'où la comparaison à `home` et non à "/".
  const isActive = (href) =>
    href === home ? pathname === home : pathname.startsWith(href);

  // Équivalent de la page courante dans l'autre langue. Calculé à partir du seul
  // chemin : l'en-tête coiffe toutes les pages et ne sait pas laquelle il rend.
  const other = otherLocale(lang);
  const otherHref = switchPath(pathname || home, other);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Logo height={52} lang={lang} />

        <nav className={`main-nav ${open ? "is-open" : ""}`} aria-label={ui.nav.aria}>
          {NAV_KEYS.map((key) => {
            const href = path(key, lang);
            return (
              <Link
                key={key}
                href={href}
                className={`nav-link ${isActive(href) ? "is-active" : ""}`}
                aria-current={isActive(href) ? "page" : undefined}
              >
                {ui.nav[key]}
              </Link>
            );
          })}

          {/* Sélecteur de langue. Un lien, pas un <select> : c'est une autre URL,
              elle doit être suivable par un robot comme par un clic milieu. */}
          <Link
            href={otherHref}
            className="lang-switch"
            hrefLang={other}
            lang={other}
            aria-label={ui.nav.langSwitchTo}
            title={LOCALE_LABELS[other].full}
          >
            {LOCALE_LABELS[other].short}
          </Link>

          <Link href={path("contact", lang)} className="btn btn-accent nav-cta">
            {ui.nav.cta}
          </Link>
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className={`burger ${open ? "is-open" : ""}`}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? ui.nav.closeMenu : ui.nav.openMenu}
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
