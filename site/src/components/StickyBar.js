"use client";

import { usePathname } from "next/navigation";
import { COMPANY, telHref, whatsappHref } from "@/lib/company";
import { t } from "@/lib/ui";
import { Icon } from "./Icon";

// Boutons flottants « Appeler » et « WhatsApp », toujours à portée de pouce
// (§15 : « les boutons d'action devront rester facilement accessibles »).
//
// Masqués sur /admin : le dashboard n'est pas une page vitrine, et les boutons
// recouvriraient les actions du tableau.
export default function StickyBar({ lang = "fr" }) {
  const pathname = usePathname();
  const ui = t(lang);
  if (pathname?.startsWith("/admin")) return null;

  return (
    <div className="fab-stack">
      <a
        className="fab fab-whats"
        href={whatsappHref(ui.whatsappMessage.default)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ui.cta.whatsappAria}
      >
        <Icon name="whatsapp" size={26} />
      </a>
      <a
        className="fab fab-call"
        href={`tel:${telHref()}`}
        aria-label={`${ui.cta.callAria} ${COMPANY.phoneDisplay}`}
      >
        <Icon name="phone" size={24} />
      </a>
    </div>
  );
}
