import { MapPin } from "lucide-react";
import Image from "next/image";
import { experienceItems } from "@/lib/portfolio";

function ExperienceCard({
  exp,
}: {
  exp: (typeof experienceItems)[number];
}) {
  return (
    <article
      aria-label={`${exp.title} at ${exp.company}${exp.current ? ", current role" : ""}`}
      className={`exp-card rounded-2xl border bg-[var(--color-card-bg)] p-6 md:p-8 ${
        exp.current ? "border-[rgba(201,164,101,0.35)] shadow-[0_0_40px_rgba(201,164,101,0.07)]" : "border-[var(--color-card-border)]"
      }`}
    >
      <div className="flex items-start gap-5">
        <div
          className={`h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl border bg-white/5 ${
            exp.current ? "border-[rgba(201,164,101,0.35)]" : "border-[var(--color-card-border)]"
          }`}
        >
          <Image
            src={exp.logo}
            alt={`${exp.company} logo`}
            width={48}
            height={48}
            className="w-full h-full object-contain p-1"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-1">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 min-w-0">
              <h3 className="text-base font-semibold">{exp.title}</h3>
              <span className="text-[var(--text-secondary)] text-sm">{exp.company}</span>
            </div>
            {exp.current && (
              <div className="flex-shrink-0 flex items-center gap-1.5 pt-0.5">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span className="font-mono text-xs text-[var(--color-gold)]">Current</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-5">
            <span className="font-mono text-xs text-[var(--text-muted)]">
              <span className="sr-only">Period: </span>
              {exp.period}
            </span>
            <span className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
              <MapPin size={11} aria-hidden="true" />
              <span className="sr-only">Location: </span>
              {exp.location}
            </span>
          </div>

          <div className="space-y-2 mb-5">
            {exp.description.map((para, i) => (
              <p key={i} className="text-sm leading-relaxed text-[var(--text-secondary)]">
                {para}
              </p>
            ))}
          </div>

          <ul aria-label="Technologies used" className="flex flex-wrap gap-2 list-none">
            {exp.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-md bg-black/5 px-2.5 py-0.5 font-mono text-xs text-[var(--text-muted)]"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-20">
          <p
            aria-hidden="true"
            className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--color-gold)] mb-4"
          >
            02 — Experience
          </p>
          <h2 id="experience-heading" className="font-playfair text-3xl md:text-4xl font-light tracking-tight">
            A decade of <span className="font-semibold">engineering excellence</span>
          </h2>
        </div>

        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute left-[27px] top-14 bottom-14 w-px"
            style={{
              background: "linear-gradient(to bottom, transparent 0%, rgba(201,164,101,0.12) 15%, rgba(201,164,101,0.12) 85%, transparent 100%)",
            }}
          />
          <div className="space-y-4">
            {experienceItems.map((exp) => (
              <ExperienceCard key={exp.id} exp={exp} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
