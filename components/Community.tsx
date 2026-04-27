"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useScrollAwareInView } from "@/lib/useScrollAwareInView";
import { useTheme } from "./ThemeProvider";
import { Users, ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/site";

declare global {
  interface Window {
    Calendly?: { initPopupWidget: (opts: { url: string }) => void };
  }
}

function openCalendlyPopup(url: string) {
  const open = () => window.Calendly!.initPopupWidget({ url });

  if (window.Calendly) {
    open();
    return;
  }

  if (!document.querySelector('link[href*="assets.calendly.com"]')) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    document.head.appendChild(link);
  }

  const script = document.createElement("script");
  script.src = "https://assets.calendly.com/assets/external/widget.js";
  script.onload = open;
  document.head.appendChild(script);
}

const volunteering = [
  {
    org: "Blue Horizon Sailing",
    role: "Technology Volunteer",
    period: "Jan 2026 — Present",
    current: true,
    description: "Providing technical support and expertise for the organization.",
  },
  {
    org: "Braven",
    role: "Volunteer Coach",
    period: "Oct 2023 — Present",
    current: true,
    description:
      "Mock interview events for university students entering the workforce at San Jose State and CUNY City College.",
  },
  {
    org: "UConn Center for Career Development",
    role: "Advisor",
    period: "May 2017 — Jul 2024",
    current: false,
    description:
      "7 years mentoring students through HuskyLink — career guidance, resume reviews, and mock interviews.",
  },
  {
    org: "Genesys Works Bay Area",
    role: "Volunteer",
    period: "Nov 2023 — Jan 2024",
    current: false,
    description: "Helped high school students with college essays and major selection.",
  },
];

export default function Community() {
  const { theme } = useTheme();
  const prefersReducedMotion = useReducedMotion();
  const { ref, isInView } = useScrollAwareInView({ margin: "-80px" });

  const borderColor = theme === "dark" ? "border-white/[0.08]" : "border-black/[0.08]";
  const cardBg = theme === "dark" ? "bg-white/[0.02]" : "bg-black/[0.01]";
  const iconBg = theme === "dark" ? "bg-white/[0.03]" : "bg-black/[0.02]";

  const fade = (delay = 0) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: isInView ? { opacity: 1, y: 0 } : {},
          transition: { duration: 0.55, delay },
        };

  const calendlyUrl = `${siteConfig.links.calendly}?hide_gdpr_banner=1&primary_color=c9a465`;

  return (
    <section id="community" aria-labelledby="community-heading" ref={ref} className="py-32">
      <div className="max-w-6xl mx-auto px-6">

        <motion.div {...fade()} className="mb-16">
          <p aria-hidden="true" className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--color-gold)] mb-4">
            05 — Community
          </p>
          <h2 id="community-heading" className="font-playfair text-3xl md:text-4xl font-light tracking-tight">
            Giving <span className="font-semibold">back</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* Free mentoring CTA */}
          <motion.div {...fade(0.1)}>
            <div className={`p-6 md:p-8 rounded-2xl border border-[rgba(201,164,101,0.25)] ${cardBg} shadow-[0_0_40px_rgba(201,164,101,0.05)]`}>
              <div className="flex items-center gap-3 mb-5">
                <div className={`flex-shrink-0 p-3 rounded-xl border ${borderColor} ${iconBg}`}>
                  <Users size={20} className="text-[var(--color-gold)]" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-mono text-[10px] tracking-widest uppercase text-[var(--color-gold)] opacity-70">
                    Open offer
                  </p>
                  <h3 className="text-sm font-semibold mt-0.5">Free 1:1 Mentorship</h3>
                </div>
              </div>

              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-8">
                I offer free 1:1 sessions to anyone looking to break into software engineering, grow their
                career, prep for interviews, or navigate the industry. No catch — book a time that works for you.
              </p>

              <button
                onClick={() => openCalendlyPopup(calendlyUrl)}
                className="group flex items-center justify-between w-full px-5 py-4 rounded-xl border border-[rgba(201,164,101,0.4)] text-sm font-medium text-[var(--color-gold)] hover:bg-[rgba(201,164,101,0.08)] hover:border-[rgba(201,164,101,0.7)] transition-all duration-200"
                aria-label="Open booking overlay to schedule a free mentoring session with Ryan Mack"
              >
                <span>Book a free session</span>
                <ArrowRight size={15} className="opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200" aria-hidden="true" />
              </button>

              <p className="font-mono text-[10px] text-[var(--text-muted)] mt-4">
                Powered by{" "}
                <a
                  href={siteConfig.links.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-current transition-colors"
                >
                  Calendly
                </a>
              </p>
            </div>
          </motion.div>

          {/* Volunteer list */}
          <motion.div {...fade(0.15)}>
            <p className="font-mono text-[10px] tracking-widest uppercase text-[var(--text-muted)] mb-6">
              Volunteer work
            </p>
            <ul className="space-y-4 list-none">
              {volunteering.map((v, i) => (
                <motion.li
                  key={v.org}
                  {...(prefersReducedMotion
                    ? {}
                    : {
                        initial: { opacity: 0, x: 12 },
                        animate: isInView ? { opacity: 1, x: 0 } : {},
                        transition: { duration: 0.4, delay: 0.25 + i * 0.07 },
                      })}
                  className={`p-4 rounded-xl border ${borderColor} ${cardBg}`}
                >
                  <div className="flex items-start justify-between gap-2 mb-0.5">
                    <p className="text-sm font-medium leading-snug">{v.org}</p>
                    {v.current && (
                      <div className="flex items-center gap-1 flex-shrink-0 pt-0.5">
                        <span aria-hidden="true" className={`w-1.5 h-1.5 rounded-full animate-pulse ${theme === "dark" ? "bg-emerald-400" : "bg-emerald-600"}`} />
                        <span className={`font-mono text-[10px] ${theme === "dark" ? "text-emerald-400" : "text-emerald-700"}`}>
                          Ongoing
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="font-mono text-[10px] text-[var(--color-gold)] opacity-70 mb-2">{v.role}</p>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-2">{v.description}</p>
                  <p className="font-mono text-[10px] text-[var(--text-muted)]">{v.period}</p>
                </motion.li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
