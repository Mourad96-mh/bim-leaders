import { Icon } from "./Icon";

// Le schéma de chaîne demandé au §6.4 :
//   Conception → Modélisation → Coordination → … → Suivi
// Sert aussi aux parcours clients (§29) et au cycle investisseur (§10 bis.6).
//
// Les flèches sont décoratives (aria-hidden) : un lecteur d'écran lit la suite
// des étapes, ce qui suffit à comprendre l'enchaînement.
export default function Chain({ steps, numbered = false }) {
  return (
    <ol className="chain">
      {steps.map((step, i) => (
        <li key={step} style={{ display: "contents" }}>
          <span className="chain-step">
            {numbered && <span className="chain-n">{i + 1}</span>}
            {step}
          </span>
          {i < steps.length - 1 && (
            <span className="chain-arrow" aria-hidden="true">
              <Icon name="arrow" size={16} />
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}
