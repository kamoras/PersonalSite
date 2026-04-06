import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume — Ryan Mack",
};

export default function ResumePage() {
  return (
    <iframe
      src="/documents/Ryan-M-Mack-Resume.pdf"
      className="fixed inset-0 w-full h-full border-0"
      title="Resume — Ryan Mack"
    />
  );
}
