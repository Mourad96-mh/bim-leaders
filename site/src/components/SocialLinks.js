import { COMPANY } from "@/lib/company";
import { t } from "@/lib/ui";
import { Icon } from "./Icon";

// Rangée d'icônes réseaux sociaux, alimentée par COMPANY.social — source unique
// partagée avec le `sameAs` du JSON-LD.
//
// COMPANY.social est actuellement VIDE (aucun profil officiel communiqué) : le
// composant ne rend alors rien du tout, ce qui est préférable à des icônes
// pointant vers des pages inexistantes. Renseigner le tableau suffit à les faire
// apparaître dans le pied de page.
export default function SocialLinks({ variant = "footer", size = 16, className = "", lang = "fr" }) {
  if (!COMPANY.social?.length) return null;

  return (
    <ul className={`social-links social-links--${variant} ${className}`.trim()}>
      {COMPANY.social.map((s) => (
        <li key={s.url}>
          <a
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${t(lang).social.follow} ${s.name}`}
            title={s.name}
          >
            <Icon name={s.icon} size={size} />
          </a>
        </li>
      ))}
    </ul>
  );
}
