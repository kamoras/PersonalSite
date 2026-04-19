import { ExternalLink, BookOpen, Award } from "lucide-react";
import { publicationItems } from "@/lib/portfolio";

export default function Publications() {
  return (
    <section id="publications" aria-labelledby="publications-heading" className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <p aria-hidden="true" className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--color-gold)] mb-4">
            03 — Publications
          </p>
          <h2 id="publications-heading" className="font-playfair text-3xl md:text-4xl font-light tracking-tight">
            Research & <span className="font-semibold">writing</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {publicationItems.map((item) => {
            const Icon = item.kind === "Patent" ? Award : BookOpen;
            const badge = "badge" in item ? item.badge : null;
            const patentNumber = "patentNumber" in item ? item.patentNumber : null;
            return (
              <a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${item.kind}: ${item.title} (opens in new tab)`}
                className="group relative flex flex-col gap-5 rounded-2xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-6 transition-[border-color,box-shadow,transform] duration-[250ms] hover:-translate-y-0.5 hover:border-[rgba(201,164,101,0.3)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.22)] md:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="rounded-xl border border-[var(--color-card-border)] bg-black/5 p-3">
                    <Icon size={20} className="text-[var(--color-gold)]" aria-hidden="true" />
                  </div>
                  <div className="flex items-center gap-2">
                    {badge && (
                      <span className="rounded-full bg-[rgba(201,164,101,0.12)] px-2 py-1 font-mono text-[10px] text-[var(--color-gold)]">
                        {badge}
                      </span>
                    )}
                    <ExternalLink
                      size={14}
                      className="mt-1 flex-shrink-0 text-[var(--text-muted)] opacity-0 transition-opacity group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                <div className="flex-1">
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-[var(--color-gold)] opacity-70">
                    {item.kind}
                    {patentNumber ? ` · ${patentNumber}` : ""}
                  </p>
                  <h3 className="mb-3 text-base font-semibold leading-snug">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                    {item.summary}
                  </p>
                </div>

                <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="font-mono text-xs text-[var(--text-muted)]">{item.source}</span>
                  <span aria-hidden="true" className="text-[var(--text-muted)] opacity-40">·</span>
                  <span className="font-mono text-xs text-[var(--text-muted)]">{item.outlet}</span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
