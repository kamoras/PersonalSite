import type { Metadata } from "next";
import { Download, ExternalLink } from "lucide-react";
import { resumeContent } from "@/lib/portfolio";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `Resume — ${siteConfig.name}`,
  description: `Resume and professional highlights for ${siteConfig.name}.`,
};

export default function ResumePage() {
  return (
    <main
      className="mx-auto max-w-6xl px-6 pb-20"
      style={{ paddingTop: "calc(7rem + env(safe-area-inset-top, 0px))" }}
    >
      <header className="mb-12 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_320px] lg:items-end">
        <div>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-[var(--color-gold)]">
            Resume
          </p>
          <h1 className="mb-4 font-playfair text-4xl font-semibold tracking-tight md:text-5xl">
            Professional summary and downloadable resume
          </h1>
          <p className="max-w-3xl text-base leading-relaxed text-[var(--text-secondary)] md:text-lg">
            {resumeContent.summary}
          </p>
        </div>

        <div className="flex flex-wrap gap-3 lg:justify-end">
          <a
            href={siteConfig.resumeDocumentPath}
            download
            className="inline-flex items-center gap-2 rounded-lg bg-[#c9a465] px-5 py-3 text-sm font-semibold text-[#100d09] transition-colors hover:bg-[#d4b870]"
          >
            <Download size={16} aria-hidden="true" />
            Download PDF
          </a>
          <a
            href={siteConfig.resumeDocumentPath}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-card-border)] px-5 py-3 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
          >
            <ExternalLink size={16} aria-hidden="true" />
            Open PDF
          </a>
        </div>
      </header>

      <section className="mb-12 grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="rounded-2xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-6 md:p-8">
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-gold)]">
            Highlights
          </p>
          <ul className="space-y-4">
            {resumeContent.highlights.map((highlight) => (
              <li
                key={highlight}
                className="rounded-xl border border-[var(--color-card-border)] bg-black/5 px-4 py-3 text-sm leading-relaxed text-[var(--text-secondary)]"
              >
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        <aside className="rounded-2xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-6">
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-gold)]">
            Focus Areas
          </p>
          <ul className="space-y-3">
            {resumeContent.focusAreas.map((area) => (
              <li
                key={area}
                className="rounded-lg border border-[var(--color-card-border)] px-3 py-2 text-sm text-[var(--text-secondary)]"
              >
                {area}
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section
        aria-labelledby="resume-preview-heading"
        className="overflow-hidden rounded-2xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)]"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--color-card-border)] px-6 py-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-gold)]">
              Preview
            </p>
            <h2 id="resume-preview-heading" className="mt-1 text-base font-semibold">
              Embedded PDF preview
            </h2>
          </div>
          <p className="text-sm text-[var(--text-muted)]">
            If the embed fails on your device, use the PDF links above.
          </p>
        </div>
        <iframe
          src={siteConfig.resumeDocumentPath}
          className="h-[80vh] min-h-[640px] w-full border-0"
          title={`Resume — ${siteConfig.name}`}
        />
      </section>
    </main>
  );
}
