import ServiceView, { serviceParams, serviceMetadata } from "@/views/ServiceView";

// Obligatoire en export statique : Next doit connaître à l'avance la liste des
// pages à générer. Ajouter un métier dans content/services.js suffit.
export function generateStaticParams() {
  return serviceParams("fr");
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return serviceMetadata(slug, "fr");
}

export default async function Page({ params }) {
  const { slug } = await params;
  return <ServiceView slug={slug} lang="fr" />;
}
