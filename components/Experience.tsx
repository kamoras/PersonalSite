"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useScrollAwareInView } from "@/lib/useScrollAwareInView";
import { useTheme } from "./ThemeProvider";
import { MapPin } from "lucide-react";
import Image from "next/image";

const experiences = [
  {
    id: 1,
    title: "Senior Software Engineer II",
    company: "Cisco ThousandEyes",
    location: "San Francisco, CA (Remote)",
    period: "Nov 2024 — Present",
    logo: "/images/te.jpg",
    current: true,
    tags: ["C++", "Java", "Python"],
    description: [
      "Continuing to work on major projects as a senior member of the Enterprise Agents engineering team.",
      "Primarily work in C++, Java, and Python to deliver high-impact projects for the business. A key concern has been support for our software on new platforms and operating systems.",
      "Working cross-team and driving projects through completion are key skills in this role.",
    ],
  },
  {
    id: 2,
    title: "Senior Software Engineer I",
    company: "Cisco ThousandEyes",
    location: "San Francisco, CA (Remote)",
    period: "Apr 2022 — Nov 2024",
    logo: "/images/te.jpg",
    current: false,
    tags: ["C++", "Java", "Python", "Linux"],
    description: [
      "ThousandEyes is a key part of Cisco as it continually strives to enhance Network Assurance. My team works on the core ThousandEyes product, the Enterprise Agent — collecting network data sent to a cloud backend to create insightful views for customers, making the entire internet as visible as a local network.",
      "As a member of a team in hyper-growth mode, I took ownership across the full stack. After mastering these systems, I quickly became a teacher and mentor for new engineers joining the team.",
      "Led large cross-functional projects: creating the solution architecture, earning stakeholder buy-in, scoping work, and executing side-by-side with my teammates while keeping stakeholders updated through each phase.",
    ],
  },
  {
    id: 3,
    title: "Senior Software Engineer",
    company: "Datto",
    location: "Norwalk, CT",
    period: "Oct 2019 — Apr 2022",
    logo: "/images/datto.jpg",
    current: false,
    tags: ["C++", "PHP", "Grafana"],
    description: [
      "Joined Datto, a rapidly growing startup, in 2019. A year later, watched as CEO Tim Weller rang the NYSE bell as the company went public (NYSE:MSP).",
      "Worked on the core Datto BCDR (backup and continuity) product using C++ and PHP, leading OKRs each quarter to enhance this central part of the business. Used data and visualizations like Grafana to drive development decisions.",
      "During my time at Datto, we doubled our customer base while reducing support ticket volume — evolving the product from a fledgling R&D project into a mature piece of software.",
    ],
  },
  {
    id: 4,
    title: "Software Development Engineer",
    company: "PerkinElmer",
    location: "Shelton, CT",
    period: "Oct 2018 — Oct 2019",
    logo: "/images/perkin.jpg",
    current: false,
    tags: ["C#", "C++", "Kubernetes", "Docker", "Python"],
    description: [
      "Worked on a desktop app for Windows — Syngistix — in C# and C++, following agile and TDD practices. Modernized a legacy software product into something more maintainable.",
      "Creator of the first PoC for PerkinElmer's instrument cloud platform. Working with minimal requirements, I built a first-of-its-kind instrument cloud using Kubernetes, Docker, Python Flask, and Node.js — then taught my team the technologies as I learned them.",
    ],
  },
  {
    id: 5,
    title: "Staff Software Engineer",
    company: "Capgemini Engineering",
    location: "Burlington, MA",
    period: "Jun 2018 — Oct 2018",
    logo: "/images/capg.jpg",
    current: false,
    tags: ["C++", "Python", "Embedded"],
    description: [
      "Worked on projects for ASML in Wilton, CT, focusing on embedded programming for EUV (extreme ultraviolet) lithography systems.",
      "Wrote software to improve the function of the 'top' of ASML lithography devices — responsible for handling the reticle (the glass photomask used to etch semiconductor chip designs into silicon wafers) through complex robotics in a clean environment.",
    ],
  },
  {
    id: 6,
    title: "Software Engineer II",
    company: "Thermo Fisher Scientific",
    location: "Guilford, CT",
    period: "May 2017 — Jun 2018",
    logo: "/images/thermo.jpg",
    current: false,
    tags: ["Java", "C++", "Linux"],
    description: [
      "Full-time member of the team maintaining genetic sequencing devices at the Ion Torrent division of Thermo Fisher.",
      "Used Java to create robust user experiences and provide localization for global customers. Maintained a C++ backend and consistently cut bottlenecks — our next-generation product became capable of running an entire DNA sequence in a single work shift (8 hours), previously unheard of.",
    ],
  },
  {
    id: 7,
    title: "Software Engineering Intern",
    company: "Thermo Fisher Scientific",
    location: "Guilford, CT",
    period: "May 2016 — Aug 2016",
    logo: "/images/thermo.jpg",
    current: false,
    tags: ["C++", "Java", "Python"],
    description: [
      "Internship working with a team of ~5 engineers maintaining software for Ion Torrent genetic sequencing devices. Responsibilities included software development, troubleshooting technical issues, and testing new hardware and software.",
    ],
  },
];

type Experience = (typeof experiences)[0];

function ExperienceCard({ exp, index }: { exp: Experience; index: number }) {
  const { theme } = useTheme();
  const prefersReducedMotion = useReducedMotion();
  const { ref, isInView } = useScrollAwareInView({ margin: "-80px" });

  const borderColor = exp.current
    ? "border-[rgba(201,164,101,0.35)]"
    : theme === "dark"
    ? "border-white/[0.08]"
    : "border-black/[0.08]";
  const cardBg = theme === "dark" ? "bg-white/[0.02]" : "bg-black/[0.01]";

  return (
    <motion.article
      ref={ref}
      aria-label={`${exp.title} at ${exp.company}${exp.current ? ", current role" : ""}`}
      {...(prefersReducedMotion
        ? {}
        : {
            initial: { opacity: 0, y: 24 },
            animate: isInView ? { opacity: 1, y: 0 } : {},
            transition: { duration: 0.5, delay: index * 0.05 },
          })}
      className={`exp-card p-6 md:p-8 rounded-2xl border ${borderColor} ${cardBg} ${
        exp.current ? "shadow-[0_0_40px_rgba(201,164,101,0.07)]" : ""
      }`}
    >
      <div className="flex items-start gap-5">
        {/* Company logo */}
        <div
          className={`flex-shrink-0 w-12 h-12 rounded-xl border ${borderColor} overflow-hidden bg-white/5`}
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
                <span aria-hidden="true" className={`w-1.5 h-1.5 rounded-full animate-pulse ${theme === "dark" ? "bg-emerald-400" : "bg-emerald-600"}`} />
                <span className={`font-mono text-xs ${theme === "dark" ? "text-emerald-400" : "text-emerald-700"}`}>Current</span>
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
                className={`px-2.5 py-0.5 rounded-md font-mono text-xs text-[var(--text-muted)] ${
                  theme === "dark" ? "bg-white/5" : "bg-black/5"
                }`}
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.article>
  );
}

export default function Experience() {
  const prefersReducedMotion = useReducedMotion();
  const { ref, isInView } = useScrollAwareInView({ margin: "-100px" });

  return (
    <section id="experience" aria-labelledby="experience-heading" ref={ref} className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          {...(prefersReducedMotion
            ? {}
            : {
                initial: { opacity: 0, y: 20 },
                animate: isInView ? { opacity: 1, y: 0 } : {},
                transition: { duration: 0.6 },
              })}
          className="mb-20"
        >
          <p
            aria-hidden="true"
            className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--color-gold)] mb-4"
          >
            02 — Experience
          </p>
          <h2 id="experience-heading" className="font-playfair text-3xl md:text-4xl font-light tracking-tight">
            A decade of <span className="font-semibold">engineering excellence</span>
          </h2>
        </motion.div>

        {/* Timeline: vertical connector line */}
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute left-[27px] top-14 bottom-14 w-px"
            style={{
              background: "linear-gradient(to bottom, transparent 0%, rgba(201,164,101,0.12) 15%, rgba(201,164,101,0.12) 85%, transparent 100%)",
            }}
          />
          <div className="space-y-4">
            {experiences.map((exp, i) => (
              <ExperienceCard key={exp.id} exp={exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
