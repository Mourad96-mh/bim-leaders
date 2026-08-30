import BimView, { bimMetadata } from "@/views/BimView";

export const metadata = bimMetadata("fr");

export default function Page() {
  return <BimView lang="fr" />;
}
