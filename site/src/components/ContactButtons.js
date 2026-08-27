import { COMPANY, telHref, whatsappHref } from "@/lib/company";
import { Icon } from "./Icon";

// Paire « Appeler / WhatsApp ». `variant` ne change que la disposition
// (cf. .cta-row--center / --stack dans globals.css), jamais le contenu.
export default function ContactButtons({
  variant = "default",
  message = "Bonjour BIM Leaders, je souhaite un devis pour mon projet.",
}) {
  return (
    <div className={`cta-row cta-row--${variant}`}>
      <a className="btn btn-primary" href={`tel:${telHref()}`}>
        <Icon name="phone" size={18} />
        Appeler {COMPANY.phoneDisplay}
      </a>
      <a
        className="btn btn-whats"
        href={whatsappHref(message)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon name="whatsapp" size={18} />
        WhatsApp
      </a>
    </div>
  );
}
