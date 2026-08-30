import ParticuliersView, { particuliersMetadata } from "@/views/ParticuliersView";

export const metadata = particuliersMetadata("en");

export default function Page() {
  return <ParticuliersView lang="en" />;
}
