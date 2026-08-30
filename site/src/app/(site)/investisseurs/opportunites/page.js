import OpportunitesView, { opportunitesMetadata } from "@/views/OpportunitesView";

export const metadata = opportunitesMetadata("fr");

export default function Page() {
  return <OpportunitesView lang="fr" />;
}
