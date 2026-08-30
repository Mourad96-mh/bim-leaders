import AproposView, { aproposMetadata } from "@/views/AproposView";

export const metadata = aproposMetadata("en");

export default function Page() {
  return <AproposView lang="en" />;
}
