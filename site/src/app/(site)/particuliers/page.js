import ParticuliersView, { particuliersMetadata } from "@/views/ParticuliersView";

export const metadata = particuliersMetadata("fr");

export default function Page() {
  return <ParticuliersView lang="fr" />;
}
