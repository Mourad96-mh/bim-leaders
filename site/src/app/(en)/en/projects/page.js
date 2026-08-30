import RealisationsView, { realisationsMetadata } from "@/views/RealisationsView";

export const metadata = realisationsMetadata("en");

export default function Page() {
  return <RealisationsView lang="en" />;
}
