import OpportunitesView, { opportunitesMetadata } from "@/views/OpportunitesView";

export const metadata = opportunitesMetadata("en");

export default function Page() {
  return <OpportunitesView lang="en" />;
}
