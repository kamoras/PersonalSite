"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useScrollAwareInView } from "@/lib/useScrollAwareInView";
import { useTheme } from "./ThemeProvider";
import { ExternalLink, BarChart2, AudioLines } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Project = {
  name: string;
  tagline: string;
  href: string;
  ariaLabel: string;
  icon: LucideIcon;
  description: string;
  stats: { value: string; label: string }[];
  tags: string[];
};

const projects: Project[] = [
  {
    name: "Civitas",
    tagline: "Expose the Machine",
    href: "https://civitas.paramain.com/",
    ariaLabel: "Visit Civitas — political transparency platform (opens in new tab)",
    icon: BarChart2,
    description:
      "A political transparency platform that aggregates public federal records to surface connections between campaign donations and legislative voting. AI analysis runs entirely on a Raspberry Pi 5 — no cloud APIs, no data leaves the device.",
    stats: [
      { value: "535", label: "Congress members scored" },
      { value: "47", label: "Presidents analyzed" },
      { value: "9", label: "SCOTUS justices" },
      { value: "Nightly", label: "Pipeline updates" },
    ],
    tags: ["FEC", "Congress.gov", "GovInfo", "Federal Register", "BLS", "Senate Lobbying"],
  },
  {
    name: "Spliced",
    tagline: "Rebuild the Mix",
    href: "https://spliced.paramain.com",
    ariaLabel: "Visit Spliced — a daily music mixer puzzle (opens in new tab)",
    icon: AudioLines,
    description:
      "A daily music puzzle built like a tiny audio mixer. Four mystery songs are sliced into clips and shuffled across four tracks — route every clip back into place and lock all four before your mistakes run out. Everyone gets the same byte-identical puzzle each day.",
    stats: [
      { value: "Daily", label: "New puzzle" },
      { value: "4", label: "Mixer tracks" },
      { value: "1,460", label: "Song catalog" },
      { value: "30s", label: "Audio previews" },
    ],
    tags: ["Web Audio API", "React", "dnd-kit", "Vite", "Vercel"],
  },
];

export default function Projects() {
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

  return (
    <section id="projects" aria-labelledby="projects-heading" ref={ref} className="py-32">
      <div className="max-w-6xl mx-auto px-6">

        <motion.div {...fade()} className="mb-16">
          <p aria-hidden="true" className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--color-gold)] mb-4">
            04 — Projects
          </p>
          <h2 id="projects-heading" className="font-playfair text-3xl md:text-4xl font-light tracking-tight">
            Built <span className="font-semibold">outside work</span>
          </h2>
        </motion.div>

        <div className="space-y-6">
          {projects.map((project, i) => {
            const Icon = project.icon;
            return (
              <motion.a
                key={project.name}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={project.ariaLabel}
                {...fade(0.1 + i * 0.1)}
                className={`group block p-6 md:p-10 rounded-2xl border ${borderColor} ${cardBg} transition-[border-color,box-shadow,transform] duration-[250ms] hover:border-[rgba(201,164,101,0.3)] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.22)]`}
              >
                {/* Card header */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`flex-shrink-0 p-3 rounded-xl border ${borderColor} ${iconBg}`}>
                      <Icon size={22} className="text-[var(--color-gold)]" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-mono text-[10px] tracking-widest uppercase text-[var(--color-gold)] opacity-70">
                        Personal Project
                      </p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span aria-hidden="true" className={`w-1.5 h-1.5 rounded-full animate-pulse ${theme === "dark" ? "bg-emerald-400" : "bg-emerald-600"}`} />
                        <span className={`font-mono text-xs ${theme === "dark" ? "text-emerald-400" : "text-emerald-700"}`}>
                          Live
                        </span>
                      </div>
                    </div>
                  </div>
                  <ExternalLink
                    size={16}
                    className="text-[var(--text-muted)] flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-hidden="true"
                  />
                </div>

                {/* Title */}
                <h3 className="font-playfair text-2xl md:text-3xl font-semibold mb-1">
                  {project.name}
                </h3>
                <p className="font-playfair italic text-base text-[var(--color-gold)] mb-5 tracking-wide">
                  {project.tagline}
                </p>

                <p className="text-base text-[var(--text-secondary)] leading-relaxed mb-8 max-w-2xl">
                  {project.description}
                </p>

                {/* Stats */}
                <div className={`flex flex-wrap gap-x-8 gap-y-4 py-6 border-t border-b ${borderColor} mb-8`}>
                  {project.stats.map(({ value, label }) => (
                    <div key={label}>
                      <p className="font-mono text-xl font-bold tabular-nums">{value}</p>
                      <p className="font-mono text-xs text-[var(--text-muted)] mt-0.5">{label}</p>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-2.5 py-0.5 rounded font-mono text-xs border ${borderColor} text-[var(--text-muted)]`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.a>
            );
          })}
        </div>

      </div>
    </section>
  );
}
