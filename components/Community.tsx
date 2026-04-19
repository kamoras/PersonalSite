import { ArrowRight, CalendarDays, Users } from "lucide-react";
import { communityContent } from "@/lib/portfolio";
import { siteConfig } from "@/lib/site";

export default function Community() {
  return (
    <section id="community" aria-labelledby="community-heading" className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <p aria-hidden="true" className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--color-gold)] mb-4">
            05 — Community
          </p>
          <h2 id="community-heading" className="font-playfair text-3xl md:text-4xl font-light tracking-tight">
            Giving <span className="font-semibold">back</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <div className="rounded-2xl border border-[rgba(201,164,101,0.25)] bg-[var(--color-card-bg)] p-6 shadow-[0_0_40px_rgba(201,164,101,0.05)] md:p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="rounded-xl border border-[var(--color-card-border)] bg-black/5 p-3">
                  <Users size={20} className="text-[var(--color-gold)]" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-mono text-[10px] tracking-widest uppercase text-[var(--color-gold)] opacity-70">
                    Open offer
                  </p>
                  <h3 className="text-sm font-semibold mt-0.5">Free 1:1 Mentorship</h3>
                </div>
              </div>

              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                {communityContent.mentorship}
              </p>

              <div className="mb-5 rounded-xl border border-[var(--color-card-border)] bg-black/5 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <CalendarDays size={16} className="text-[var(--color-gold)]" aria-hidden="true" />
                  <p className="font-mono text-[10px] tracking-widest uppercase text-[var(--color-gold)] opacity-70">
                    Booking
                  </p>
                </div>
                <a
                  href={siteConfig.links.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-[#c9a465] hover:bg-[#d4b870] text-[#100d09] rounded-lg text-sm font-semibold transition-colors"
                >
                  Book a session
                  <ArrowRight size={15} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          <div>
            <p className="font-mono text-[10px] tracking-widest uppercase text-[var(--text-muted)] mb-6">
              Volunteer work
            </p>
            <ul className="space-y-4 list-none">
              {communityContent.volunteering.map((v) => (
                <li
                  key={v.org}
                  className="rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-4"
                >
                  <div className="flex items-start justify-between gap-2 mb-0.5">
                    <p className="text-sm font-medium leading-snug">{v.org}</p>
                    {v.current && (
                      <div className="flex items-center gap-1 flex-shrink-0 pt-0.5">
                        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        <span className="font-mono text-[10px] text-[var(--color-gold)]">Ongoing</span>
                      </div>
                    )}
                  </div>
                  <p className="font-mono text-[10px] text-[var(--color-gold)] opacity-70 mb-2">{v.role}</p>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-2">{v.description}</p>
                  <p className="font-mono text-[10px] text-[var(--text-muted)]">{v.period}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
