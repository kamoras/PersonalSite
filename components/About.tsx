import { GraduationCap } from "lucide-react";
import { aboutContent } from "@/lib/portfolio";

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <p aria-hidden="true" className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--color-gold)] mb-4">
            01 — About
          </p>
          <h2 id="about-heading" className="font-playfair text-3xl md:text-4xl font-light tracking-tight">
            {aboutContent.heading.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="font-semibold">{aboutContent.heading.split(" ").slice(-1)[0]}</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="space-y-6">
            {aboutContent.paragraphs.map((paragraph, index) => (
              <p
                key={paragraph}
                className={`${index === 0 ? "drop-cap" : ""} text-base leading-relaxed text-[var(--text-secondary)]`}
              >
                {paragraph}
              </p>
            ))}

            <div className="pt-1 flex flex-wrap gap-2">
              {aboutContent.badges.map((badge, index) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--color-card-border)] px-3 py-1.5 text-xs font-mono text-[var(--text-muted)]"
                >
                  <span
                    aria-hidden="true"
                    className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${index === 0 ? "bg-emerald-500" : "bg-amber-400"}`}
                  />
                  {badge}
                </span>
              ))}
            </div>

            <div className="mt-2 space-y-4 border-t border-[var(--color-card-border)] pt-5">
              {aboutContent.techGroups.map((group) => (
                <div key={group.label} className="flex items-start gap-4">
                  <span className="w-24 flex-shrink-0 pt-0.5 font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                    {group.label}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded border border-[var(--color-card-border)] px-2.5 py-0.5 text-xs font-mono text-[var(--text-muted)]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-2 border-t border-[var(--color-card-border)] pt-5">
              <div className="mb-4 flex items-center gap-2">
                <GraduationCap size={12} className="text-[var(--text-muted)]" aria-hidden="true" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                  Education
                </span>
              </div>
              <div className="space-y-4">
                {aboutContent.education.map((education) => (
                  <div key={education.school}>
                    <div className="mb-0.5 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                      <p className="text-sm font-medium leading-snug">{education.degree}</p>
                      {education.current && (
                        <span className="font-mono text-[10px] text-[var(--color-gold)]">
                          In Progress
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[var(--text-secondary)]">{education.school}</p>
                    {education.detail && (
                      <p className="mt-0.5 text-xs text-[var(--text-muted)]">{education.detail}</p>
                    )}
                    <p className="mt-1 font-mono text-[10px] text-[var(--text-muted)]">
                      {education.period}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {aboutContent.skills.map((skill) => (
              <article
                key={skill.title}
                className="relative rounded-xl border border-[var(--color-card-border)] border-l-[3px] bg-[var(--color-card-bg)] p-5"
                style={{ borderLeftColor: skill.accentColor }}
              >
                <p className="mb-3 font-mono text-[10px] tracking-widest text-[var(--color-gold)] opacity-70">
                  {skill.num}
                </p>
                <h3 className="mb-2 text-sm font-semibold leading-snug">{skill.title}</h3>
                <p className="text-xs leading-relaxed text-[var(--text-muted)]">
                  {skill.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
