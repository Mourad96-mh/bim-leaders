import AproposView, { aproposMetadata } from "@/views/AproposView";

export const metadata = aproposMetadata("fr");

export default function Page() {
  return <AproposView lang="fr" />;
}
