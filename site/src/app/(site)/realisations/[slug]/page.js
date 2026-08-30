import RealisationView, { realisationParams, realisationMetadata } from "@/views/RealisationView";

export function generateStaticParams() {
  return realisationParams();
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return realisationMetadata(slug, "fr");
}

export default async function Page({ params }) {
  const { slug } = await params;
  return <RealisationView slug={slug} lang="fr" />;
}
