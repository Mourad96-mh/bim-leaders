import DossierView, { dossierMetadata } from "@/views/DossierView";

export const metadata = dossierMetadata("fr");

export default function Page() {
  return <DossierView lang="fr" />;
}
