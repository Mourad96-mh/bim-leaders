import BimView, { bimMetadata } from "@/views/BimView";

export const metadata = bimMetadata("en");

export default function Page() {
  return <BimView lang="en" />;
}
