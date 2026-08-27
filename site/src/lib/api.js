// Client de l'API Express (Render). Tout ce qui sort du site statique passe ici.
//
// Le site est un export statique servi par Hostinger : il n'a AUCUN code serveur.
// Les échanges se font donc en cross-origin vers l'API, ce qui a deux
// conséquences structurantes :
//   • l'authentification est un JETON JWT en en-tête `Authorization: Bearer`,
//     stocké dans localStorage — un cookie httpOnly ne serait pas renvoyé depuis
//     un autre domaine ;
//   • l'API doit autoriser l'origine Hostinger dans sa variable CORS_ORIGIN.

export const API_URL = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");

const TOKEN_KEY = "bim_admin_token";

export const getToken = () => {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(TOKEN_KEY);
  } catch {
    // Navigation privée ou stockage bloqué : on se comporte comme non connecté.
    return null;
  }
};

export const setToken = (token) => {
  try {
    if (token) window.localStorage.setItem(TOKEN_KEY, token);
    else window.localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* stockage indisponible : la session ne survivra pas au rechargement */
  }
};

export class ApiError extends Error {
  constructor(message, status, fields) {
    super(message);
    this.status = status;
    this.fields = fields || null; // erreurs de validation champ par champ
  }
}

async function request(path, { method = "GET", body, auth = false, isForm = false } = {}) {
  if (!API_URL) {
    throw new ApiError(
      "L'API n'est pas configurée (NEXT_PUBLIC_API_URL manquant).",
      0
    );
  }

  const headers = {};
  if (!isForm) headers["Content-Type"] = "application/json";
  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  let res;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: isForm ? body : body ? JSON.stringify(body) : undefined,
    });
  } catch {
    // Panne réseau ou service Render endormi : message actionnable plutôt que
    // « Failed to fetch », qui n'apprend rien au visiteur.
    throw new ApiError(
      "Connexion au serveur impossible. Réessayez dans un instant.",
      0
    );
  }

  const payload = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new ApiError(
      payload.message || `Erreur ${res.status}`,
      res.status,
      payload.errors
    );
  }
  return payload;
}

// ------------------------------------------------------------- Public ------
// Envoi d'une demande (contact ou dossier investisseur). Passe par FormData
// pour pouvoir porter la pièce jointe (§13.1).
export function submitLead(formData) {
  return request("/api/leads", { method: "POST", body: formData, isForm: true });
}

// -------------------------------------------------------------- Admin ------
export async function login(email, password) {
  const data = await request("/api/auth/login", {
    method: "POST",
    body: { email, password },
  });
  setToken(data.token);
  return data;
}

export const logout = () => setToken(null);

export const listRealisationsAdmin = () =>
  request("/api/realisations?all=1", { auth: true });
export const createRealisation = (data) =>
  request("/api/realisations", { method: "POST", body: data, auth: true });
export const updateRealisation = (id, data) =>
  request(`/api/realisations/${id}`, { method: "PUT", body: data, auth: true });
export const deleteRealisation = (id) =>
  request(`/api/realisations/${id}`, { method: "DELETE", auth: true });

// L'envoi d'images passe par l'API (multer → Cloudinary) plutôt qu'en direct
// depuis le navigateur : les identifiants Cloudinary ne quittent jamais le
// serveur (§19 « absence de données sensibles exposées côté client »).
export function uploadImage(file) {
  const fd = new FormData();
  fd.append("image", file);
  return request("/api/uploads", { method: "POST", body: fd, auth: true, isForm: true });
}

export const listLeads = () => request("/api/leads", { auth: true });
export const markLead = (id, statut) =>
  request(`/api/leads/${id}`, { method: "PUT", body: { statut }, auth: true });
export const deleteLead = (id) =>
  request(`/api/leads/${id}`, { method: "DELETE", auth: true });
