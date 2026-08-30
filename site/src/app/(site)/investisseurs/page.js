import InvestisseursView, { investisseursMetadata } from "@/views/InvestisseursView";

export const metadata = investisseursMetadata("fr");

export default function Page() {
  return <InvestisseursView lang="fr" />;
}
