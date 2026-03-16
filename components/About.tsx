"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { GraduationCap } from "lucide-react";

const skills = [
  {
    num: "01",
    title: "Software Design",
    description:
      "Architect systems that survive production. From API contracts to deployment topology, designing for correctness, maintainability, and scale from day one.",
    accentColor: "#60a5fa",
  },
  {
    num: "02",
    title: "Systems Programming",
    description:
      "Deep expertise in C++, Java, and Python across a decade of production engineering — performance-critical code, memory management, and embedded systems.",
    accentColor: "#a78bfa",
  },
  {
    num: "03",
    title: "Cloud & Infrastructure",
    description:
      "Kubernetes, Docker, AWS — building and operating distributed systems at enterprise scale. Comfortable owning infrastructure end to end.",
    accentColor: "#34d399",
  },
  {
    num: "04",
    title: "Technical Leadership",
    description:
      "Leading cross-functional projects from architecture to delivery: stakeholder alignment, mentoring engineers, and driving execution in high-growth teams.",
    accentColor: "#fbbf24",
  },
];

const techGroups = [
  { label: "Languages", items: ["C++", "Java", "Python", "TypeScript", "C#", "Go"] },
  { label: "Infrastructure", items: ["Kubernetes", "Docker", "AWS", "Linux", "gRPC"] },
  { label: "Platforms", items: ["Node.js", "PostgreSQL", "Flask", "CMake"] },
];

const education = [
  {
    degree: "M.S., Computer Science",
    school: "Georgia Institute of Technology",
    detail: "Specialization: Computing Systems",
    period: "Jan 2022 — Aug 2026",
    current: true,
  },
  {
    degree: "B.S.E., Computer Science and Engineering",
    school: "University of Connecticut",
    detail: null,
    period: "Aug 2013 — May 2017",
    current: false,
  },
];

export default function About() {
  const { theme } = useTheme();
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const borderColor = theme === "dark" ? "border-white/[0.08]" : "border-black/[0.08]";

  const fade = (delay = 0) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: isInView ? { opacity: 1, y: 0 } : {},
          transition: { duration: 0.55, delay },
        };

  return (
    <section id="about" ref={ref} className="py-32">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section header */}
        <motion.div {...fade()} className="mb-16">
          <p aria-hidden="true" className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--color-gold)] mb-4">
            01 — About
          </p>
          <h2 className="font-playfair text-3xl md:text-4xl font-light tracking-tight">
            Shipping software that <span className="font-semibold">scales</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* ── Bio column ── */}
          <motion.div {...fade(0.1)} className="space-y-6">
            <p className="drop-cap text-base leading-relaxed text-[var(--text-secondary)]">
              I&apos;m Ryan — a Senior Software Engineer at{" "}
              <span className="text-[var(--color-gold)]">Cisco ThousandEyes</span>{" "}
              leading development on the Enterprise Agent, the core product that makes
              network visibility possible for enterprises worldwide.
            </p>
            <p className="text-base leading-relaxed text-[var(--text-secondary)]">
              Over 9+ years across research labs, startups, and Cisco-scale infrastructure,
              I&apos;ve owned every phase of the development lifecycle — inventing new systems
              with <span className="text-current font-medium">a granted patent and patents pending</span>,
              scaling production software to thousands of customers, and mentoring the
              next generation of engineers.
            </p>

            {/* Patent badges */}
            <div className="pt-1 flex flex-wrap gap-2">
              <span
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono border ${borderColor} text-[var(--text-muted)]`}
              >
                <span aria-hidden="true" className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${theme === "dark" ? "bg-emerald-400" : "bg-emerald-600"}`} />
                Patent Granted
              </span>
              <span
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono border ${borderColor} text-[var(--text-muted)]`}
              >
                <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                Patents Pending
              </span>
            </div>

            {/* Grouped tech stack */}
            <div className={`pt-5 mt-2 border-t ${borderColor} space-y-4`}>
              {techGroups.map((group) => (
                <div key={group.label} className="flex items-start gap-4">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--text-muted)] w-24 flex-shrink-0 pt-0.5">
                    {group.label}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className={`px-2.5 py-0.5 rounded text-xs font-mono border ${borderColor} text-[var(--text-muted)]`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Education */}
            <div className={`pt-5 mt-2 border-t ${borderColor}`}>
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap size={12} className="text-[var(--text-muted)]" aria-hidden="true" />
                <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--text-muted)]">
                  Education
                </span>
              </div>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.school} className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 mb-0.5">
                        <p className="text-sm font-medium leading-snug">{edu.degree}</p>
                        {edu.current && (
                          <span className={`font-mono text-[10px] ${theme === "dark" ? "text-emerald-400" : "text-emerald-700"}`}>
                            In Progress
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[var(--text-secondary)]">{edu.school}</p>
                      {edu.detail && (
                        <p className="text-xs text-[var(--text-muted)] mt-0.5">{edu.detail}</p>
                      )}
                      <p className="font-mono text-[10px] text-[var(--text-muted)] mt-1">{edu.period}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Skill cards ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.title}
                {...(prefersReducedMotion
                  ? {}
                  : {
                      initial: { opacity: 0, y: 16 },
                      animate: isInView ? { opacity: 1, y: 0 } : {},
                      transition: { duration: 0.5, delay: 0.2 + i * 0.07 },
                    })}
                className={`relative p-5 rounded-xl border border-l-[3px] ${borderColor} ${
                  theme === "dark" ? "bg-white/[0.02]" : "bg-black/[0.01]"
                }`}
                style={{ borderLeftColor: skill.accentColor }}
              >
                <p className="font-mono text-[10px] text-[var(--color-gold)] mb-3 tracking-widest opacity-70">
                  {skill.num}
                </p>
                <h3 className="text-sm font-semibold mb-2 leading-snug">{skill.title}</h3>
                <p className="text-xs leading-relaxed text-[var(--text-muted)]">
                  {skill.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
