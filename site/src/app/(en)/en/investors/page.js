import InvestisseursView, { investisseursMetadata } from "@/views/InvestisseursView";

export const metadata = investisseursMetadata("en");

export default function Page() {
  return <InvestisseursView lang="en" />;
}
