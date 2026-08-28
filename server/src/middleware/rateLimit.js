// Limitation de débit en mémoire (§19 « protection anti-spam »).
//
// Volontairement SANS dépendance ni Redis : une seule instance Render tourne, et
// le besoin se limite à empêcher qu'un robot poste cent demandes d'affilée.
//
// ⚠️ Conséquence assumée : le compteur repart de zéro à chaque redémarrage du
// service (et le plan gratuit de Render met en veille après inactivité). C'est
// acceptable ici — cette limite est un garde-fou de confort, pas une protection
// contre une attaque distribuée. Le piège à robots et le délai minimum de
// remplissage, dans routes/leads.js, font le gros du travail.

const seaux = new Map();

/**
 * @param {object} options
 * @param {number} options.fenetreMs  durée de la fenêtre glissante
 * @param {number} options.max        nombre de requêtes autorisées par fenêtre
 * @param {string} options.message
 */
export default function rateLimit({ fenetreMs = 15 * 60 * 1000, max = 5, message }) {
  return (req, res, next) => {
    // req.clientIp, pas req.ip : cf. le middleware dans src/index.js — sur
    // Render, req.ip est l'adresse du noeud Cloudflare, pas celle du visiteur.
    const cle = `${req.baseUrl}|${req.clientIp || req.ip}`;
    const maintenant = Date.now();

    const horodatages = (seaux.get(cle) || []).filter((t) => maintenant - t < fenetreMs);

    if (horodatages.length >= max) {
      const attente = Math.ceil((fenetreMs - (maintenant - horodatages[0])) / 60000);
      return res.status(429).json({
        message:
          message ||
          `Trop de demandes envoyées. Réessayez dans ${attente} minute${attente > 1 ? "s" : ""}.`,
      });
    }

    horodatages.push(maintenant);
    seaux.set(cle, horodatages);

    // Ménage opportuniste : sans cela la Map grossirait indéfiniment sur un
    // service qui tourne des semaines.
    if (seaux.size > 5000) {
      for (const [k, v] of seaux) {
        if (v.every((t) => maintenant - t >= fenetreMs)) seaux.delete(k);
      }
    }

    return next();
  };
}
