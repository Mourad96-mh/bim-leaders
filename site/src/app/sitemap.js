import { COMPANY } from "@/lib/company";
import { SERVICE_SLUGS } from "@/content/services";
import { snapshot } from "@/lib/realisations";

// Requis par `output: "export"` — génère un sitemap.xml statique au build.
export const dynamic = "force-static";

const BASE = COMPANY.siteUrl;

// Sitemap auto-alimenté : un métier ajouté dans content/services.js ou une
// réalisation publiée depuis le dashboard (donc présente dans le snapshot au
// prochain build) y apparaissent sans intervention.
export default function sitemap() {
  const now = new Date();

  const routes = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/construction/", priority: 0.9, changeFrequency: "monthly" },
    ...SERVICE_SLUGS.map((slug) => ({
      path: `/construction/${slug}/`,
      priority: 0.8,
      changeFrequency: "monthly",
    })),
    { path: "/bim/", priority: 0.9, changeFrequency: "monthly" },
    { path: "/particuliers/", priority: 0.9, changeFrequency: "monthly" },
    { path: "/investisseurs/", priority: 0.9, changeFrequency: "monthly" },
    { path: "/investisseurs/opportunites/", priority: 0.7, changeFrequency: "weekly" },
    { path: "/investisseurs/dossier/", priority: 0.5, changeFrequency: "yearly" },
    { path: "/realisations/", priority: 0.9, changeFrequency: "weekly" },
    ...snapshot().map((p) => ({
      path: `/realisations/${p.slug}/`,
      priority: 0.7,
      changeFrequency: "monthly",
    })),
    { path: "/a-propos/", priority: 0.7, changeFrequency: "yearly" },
    { path: "/contact/", priority: 0.8, changeFrequency: "yearly" },
  ];

  return routes.map((r) => ({
    url: `${BASE}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
