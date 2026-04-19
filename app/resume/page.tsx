import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `Resume — ${siteConfig.name}`,
};

export default function ResumePage() {
  return (
    <iframe
      src={siteConfig.resumeDocumentPath}
      className="fixed inset-0 w-full h-full border-0"
      title={`Resume — ${siteConfig.name}`}
    />
  );
}
