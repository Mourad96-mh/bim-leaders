import ConstructionView, { constructionMetadata } from "@/views/ConstructionView";

export const metadata = constructionMetadata("fr");

export default function Page() {
  return <ConstructionView lang="fr" />;
}
