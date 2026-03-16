"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { ExternalLink, BookOpen, Award } from "lucide-react";

export default function Publications() {
  const { theme } = useTheme();
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

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
    <section id="publications" aria-labelledby="publications-heading" ref={ref} className="py-32">
      <div className="max-w-6xl mx-auto px-6">

        <motion.div {...fade()} className="mb-16">
          <p aria-hidden="true" className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--color-gold)] mb-4">
            03 — Publications
          </p>
          <h2 id="publications-heading" className="font-playfair text-3xl md:text-4xl font-light tracking-tight">
            Research & <span className="font-semibold">writing</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">

          {/* Article */}
          <motion.a
            href="https://medium.com/thousandeyes-engineering/enhancing-support-for-multiple-platforms-a-comprehensive-analysis-9deea3e233a2"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Read: Enhancing Support for Multiple Platforms — ThousandEyes Engineering (opens in new tab)"
            {...fade(0.1)}
            className={`group relative p-6 md:p-8 rounded-2xl border ${borderColor} ${cardBg} flex flex-col gap-5 transition-[border-color,box-shadow,transform] duration-[250ms] hover:border-[rgba(201,164,101,0.3)] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.22)]`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className={`flex-shrink-0 p-3 rounded-xl border ${borderColor} ${iconBg}`}>
                <BookOpen size={20} className="text-[var(--color-gold)]" aria-hidden="true" />
              </div>
              <ExternalLink
                size={14}
                className="text-[var(--text-muted)] mt-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-hidden="true"
              />
            </div>

            <div className="flex-1">
              <p className="font-mono text-[10px] tracking-widest uppercase text-[var(--color-gold)] opacity-70 mb-2">
                Article
              </p>
              <h3 className="text-base font-semibold leading-snug mb-3">
                Enhancing Support for Multiple Platforms: A Comprehensive Analysis
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Published in the ThousandEyes Engineering blog — an in-depth analysis of the engineering challenges and architectural strategies behind expanding Enterprise Agent platform support across operating systems at fleet scale.
              </p>
            </div>

            <div className="flex items-center gap-2 mt-auto">
              <span className="font-mono text-xs text-[var(--text-muted)]">ThousandEyes Engineering</span>
              <span aria-hidden="true" className="text-[var(--text-muted)] opacity-40">·</span>
              <span className="font-mono text-xs text-[var(--text-muted)]">Medium</span>
            </div>
          </motion.a>

          {/* Patent */}
          <motion.a
            href="https://patentsgazette.uspto.gov/week08/OG/html/1543-4/US12562955-20260224.html"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View patent US 12,562,955 B1 on USPTO (opens in new tab)"
            {...fade(0.15)}
            className={`group relative p-6 md:p-8 rounded-2xl border ${borderColor} ${cardBg} flex flex-col gap-5 transition-[border-color,box-shadow,transform] duration-[250ms] hover:border-[rgba(201,164,101,0.3)] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.22)]`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className={`flex-shrink-0 p-3 rounded-xl border ${borderColor} ${iconBg}`}>
                <Award size={20} className="text-[var(--color-gold)]" aria-hidden="true" />
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`font-mono text-[10px] px-2 py-1 rounded-full ${
                    theme === "dark"
                      ? "text-emerald-400 bg-emerald-400/10"
                      : "text-emerald-700 bg-emerald-700/10"
                  }`}
                >
                  Granted
                </span>
                <ExternalLink
                  size={14}
                  className="text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-hidden="true"
                />
              </div>
            </div>

            <div className="flex-1">
              <p className="font-mono text-[10px] tracking-widest uppercase text-[var(--color-gold)] opacity-70 mb-2">
                Patent · US 12,562,955 B1
              </p>
              <h3 className="text-base font-semibold leading-snug mb-3">
                Integrated Active Network Performance Monitoring Across Vantage Points
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                A technique for identifying nodes lacking monitoring agents across distributed networks and combining data from multiple collection strategies to diagnose the root causes of network performance degradation.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-auto">
              <span className="font-mono text-xs text-[var(--text-muted)]">Cisco Technology, Inc.</span>
              <span aria-hidden="true" className="text-[var(--text-muted)] opacity-40">·</span>
              <span className="font-mono text-xs text-[var(--text-muted)]">Granted Feb 24, 2026</span>
            </div>
          </motion.a>

        </div>
      </div>
    </section>
  );
}
