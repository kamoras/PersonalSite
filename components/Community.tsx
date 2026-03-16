"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { Users } from "lucide-react";
import Script from "next/script";

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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  // Sync container height to Calendly's reported content height
  const [calendlyHeight, setCalendlyHeight] = useState(420);
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (!e.origin.includes("calendly.com")) return;
      const data = e.data as { event?: string; payload?: { height?: string | number } };
      if (data?.event === "calendly.page_height") {
        const raw = data.payload?.height;
        const px = typeof raw === "number" ? raw : parseInt(raw ?? "", 10);
        if (!isNaN(px) && px > 0) setCalendlyHeight(px);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

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

  return (
    <section id="community" ref={ref} className="py-32">
      <div className="max-w-6xl mx-auto px-6">

        <motion.div {...fade()} className="mb-16">
          <p aria-hidden="true" className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--color-gold)] mb-4">
            05 — Community
          </p>
          <h2 className="font-playfair text-3xl md:text-4xl font-light tracking-tight">
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
                  <p className="text-sm font-semibold mt-0.5">Free 1:1 Mentorship</p>
                </div>
              </div>

              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                I offer free 1:1 sessions to anyone looking to break into software engineering, grow their
                career, prep for interviews, or navigate the industry. No catch — book a time that works for you.
              </p>

              {/* Inline Calendly embed — height driven by postMessage from widget */}
              <div
                className="calendly-inline-widget rounded-xl overflow-hidden mb-2"
                data-url="https://calendly.com/ryan-m-mack?hide_gdpr_banner=1&primary_color=c9a465"
                aria-label="Calendly booking widget — book a free mentoring session with Ryan Mack"
                style={{
                  minWidth: "320px",
                  height: `${calendlyHeight}px`,
                  transition: "height 0.3s ease",
                }}
              />
              <Script
                src="https://assets.calendly.com/assets/external/widget.js"
                strategy="lazyOnload"
              />

              <p className="font-mono text-[10px] text-[var(--text-muted)]">
                Powered by{" "}
                <a
                  href="https://calendly.com/ryan-m-mack"
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
          <motion.div {...fade(0.15)} className="space-y-4">
            <p className="font-mono text-[10px] tracking-widest uppercase text-[var(--text-muted)] mb-6">
              Volunteer work
            </p>
            {volunteering.map((v, i) => (
              <motion.div
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
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
