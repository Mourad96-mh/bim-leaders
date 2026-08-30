import { COMPANY, telHref, whatsappHref } from "@/lib/company";
import { t } from "@/lib/ui";
import { Icon } from "./Icon";

// Paire « Appeler / WhatsApp ». `variant` ne change que la disposition
// (cf. .cta-row--center / --stack dans globals.css), jamais le contenu.
//
// `message` désigne une CLÉ de ui.whatsappMessage (« default », « terrain »,
// « investisseur ») et non un texte : le message pré-rempli doit arriver chez
// BIM Leaders dans la langue du visiteur, pas dans celle du code appelant.
export default function ContactButtons({ variant = "default", message = "default", lang = "fr" }) {
  const ui = t(lang);

  return (
    <div className={`cta-row cta-row--${variant}`}>
      <a className="btn btn-primary" href={`tel:${telHref()}`}>
        <Icon name="phone" size={18} />
        {ui.cta.call} {COMPANY.phoneDisplay}
      </a>
      <a
        className="btn btn-whats"
        href={whatsappHref(ui.whatsappMessage[message] || ui.whatsappMessage.default)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon name="whatsapp" size={18} />
        {ui.cta.whatsapp}
      </a>
    </div>
  );
}
