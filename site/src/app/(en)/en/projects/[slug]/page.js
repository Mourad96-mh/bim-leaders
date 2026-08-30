import RealisationView, { realisationParams, realisationMetadata } from "@/views/RealisationView";

// Même liste de slugs que l'arbre français : ils viennent de la base, où ils
// n'existent qu'en un seul exemplaire.
export function generateStaticParams() {
  return realisationParams();
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return realisationMetadata(slug, "en");
}

export default async function Page({ params }) {
  const { slug } = await params;
  return <RealisationView slug={slug} lang="en" />;
}
