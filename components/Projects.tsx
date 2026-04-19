import { ExternalLink, BarChart2 } from "lucide-react";
import { projectItems } from "@/lib/portfolio";

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <p aria-hidden="true" className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--color-gold)] mb-4">
            04 — Projects
          </p>
          <h2 id="projects-heading" className="font-playfair text-3xl md:text-4xl font-light tracking-tight">
            Built <span className="font-semibold">outside work</span>
          </h2>
        </div>

        <div className="space-y-6">
          {projectItems.map((project) => (
            <a
              key={project.name}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${project.name} (opens in new tab)`}
              className="group block rounded-2xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-6 transition-[border-color,box-shadow,transform] duration-[250ms] hover:-translate-y-0.5 hover:border-[rgba(201,164,101,0.3)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.22)] md:p-10"
            >
              <div className="mb-6 flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="rounded-xl border border-[var(--color-card-border)] bg-black/5 p-3">
                    <BarChart2 size={22} className="text-[var(--color-gold)]" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--color-gold)] opacity-70">
                      Personal Project
                    </p>
                    <div className="mt-0.5 flex items-center gap-1.5">
                      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      <span className="font-mono text-xs text-[var(--color-gold)]">{project.status}</span>
                    </div>
                  </div>
                </div>
                <ExternalLink
                  size={16}
                  className="mt-1 flex-shrink-0 text-[var(--text-muted)] opacity-0 transition-opacity group-hover:opacity-100"
                  aria-hidden="true"
                />
              </div>

              <h3 className="mb-1 font-playfair text-2xl font-semibold md:text-3xl">
                {project.name}
              </h3>
              <p className="mb-5 font-playfair text-base italic tracking-wide text-[var(--color-gold)]">
                {project.subtitle}
              </p>

              <p className="mb-4 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]">
                {project.summary}
              </p>
              <p className="mb-8 max-w-2xl text-sm leading-relaxed text-[var(--text-muted)]">
                {project.detail}
              </p>

              <div className="mb-8 grid gap-4 border-y border-[var(--color-card-border)] py-6 sm:grid-cols-2 lg:grid-cols-4">
                {project.impact.map((stat) => (
                  <div key={stat.label}>
                    <p className="font-mono text-xl font-bold tabular-nums">{stat.value}</p>
                    <p className="mt-0.5 font-mono text-xs text-[var(--text-muted)]">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {project.sources.map((source) => (
                  <span
                    key={source}
                    className="rounded border border-[var(--color-card-border)] px-2.5 py-0.5 font-mono text-xs text-[var(--text-muted)]"
                  >
                    {source}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
