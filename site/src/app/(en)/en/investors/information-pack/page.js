import DossierView, { dossierMetadata } from "@/views/DossierView";

export const metadata = dossierMetadata("en");

export default function Page() {
  return <DossierView lang="en" />;
}
