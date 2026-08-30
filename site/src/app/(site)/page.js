import HomeView, { homeMetadata } from "@/views/HomeView";

export const metadata = homeMetadata("fr");

export default function Page() {
  return <HomeView lang="fr" />;
}
