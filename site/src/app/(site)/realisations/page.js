import RealisationsView, { realisationsMetadata } from "@/views/RealisationsView";

export const metadata = realisationsMetadata("fr");

export default function Page() {
  return <RealisationsView lang="fr" />;
}
