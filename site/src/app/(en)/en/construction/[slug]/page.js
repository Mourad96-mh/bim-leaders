import ServiceView, { serviceParams, serviceMetadata } from "@/views/ServiceView";

// Les slugs anglais sont ceux de SERVICES_EN : /en/construction/structural-works/
// et non /en/construction/gros-oeuvre/.
export function generateStaticParams() {
  return serviceParams("en");
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return serviceMetadata(slug, "en");
}

export default async function Page({ params }) {
  const { slug } = await params;
  return <ServiceView slug={slug} lang="en" />;
}
