import ConstructionView, { constructionMetadata } from "@/views/ConstructionView";

export const metadata = constructionMetadata("en");

export default function Page() {
  return <ConstructionView lang="en" />;
}
