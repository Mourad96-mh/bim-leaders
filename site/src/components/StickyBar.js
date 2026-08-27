"use client";

import { usePathname } from "next/navigation";
import { COMPANY, telHref, whatsappHref } from "@/lib/company";
import { Icon } from "./Icon";

// Boutons flottants « Appeler » et « WhatsApp », toujours à portée de pouce
// (§15 : « les boutons d'action devront rester facilement accessibles »).
//
// Masqués sur /admin : le dashboard n'est pas une page vitrine, et les boutons
// recouvriraient les actions du tableau.
export default function StickyBar() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <div className="fab-stack">
      <a
        className="fab fab-whats"
        href={whatsappHref("Bonjour BIM Leaders, je souhaite un devis pour mon projet.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Écrire à BIM Leaders sur WhatsApp"
      >
        <Icon name="whatsapp" size={26} />
      </a>
      <a
        className="fab fab-call"
        href={`tel:${telHref()}`}
        aria-label={`Appeler BIM Leaders au ${COMPANY.phoneDisplay}`}
      >
        <Icon name="phone" size={24} />
      </a>
    </div>
  );
}
