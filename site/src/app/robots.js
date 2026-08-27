import { COMPANY } from "@/lib/company";

// Requis par `output: "export"` — génère un robots.txt statique au build.
export const dynamic = "force-static";

const BASE = COMPANY.siteUrl;

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Le dashboard n'a rien à faire dans l'index : il est derrière un mot de
        // passe, mais autant ne pas l'exposer dans les résultats de recherche.
        disallow: ["/admin/"],
      },
      // On accueille explicitement les robots des moteurs de réponse, pour que
      // le site puisse être cité par ChatGPT, Claude, Gemini et Perplexity.
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-Web",
          "anthropic-ai",
          "Google-Extended",
          "PerplexityBot",
          "Perplexity-User",
          "Applebot-Extended",
          "CCBot",
        ],
        allow: "/",
        disallow: ["/admin/"],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
