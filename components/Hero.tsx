"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { ArrowDown, Mail, MapPin } from "lucide-react";
import { Github, Linkedin } from "./BrandIcons";
import { useTheme } from "./ThemeProvider";
import Image from "next/image";

const stats = [
  { value: 9, suffix: "+", label: "yrs experience" },
  { value: 5, suffix: "",  label: "companies" },
  { value: 7, suffix: "",  label: "engineering roles" },
];

function AnimatedStat({
  value,
  suffix,
  label,
  animate,
}: {
  value: number;
  suffix: string;
  label: string;
  animate: boolean;
}) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView || !animate) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplay(value);
      return;
    }
    const duration = 1200;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, value, animate]);

  return (
    <div ref={ref} className="flex flex-col items-center md:items-start">
      <span className="font-mono text-2xl font-bold tabular-nums leading-none">
        {display}{suffix}
      </span>
      <span className="font-mono text-xs text-[var(--text-muted)] mt-1 tracking-wide">
        {label}
      </span>
    </div>
  );
}

export default function Hero() {
  const { theme } = useTheme();
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-label="Introduction"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Decorative grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Decorative blue orb — technical, cool */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-[0.06] blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)" }}
      />
      {/* Decorative amber orb — warmth, personality */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-[0.05] blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #c9a465 0%, transparent 70%)" }}
      />

      <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-20 w-full">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-16 md:gap-20">

          {/* ── Text column ── */}
          <div className="flex-1 text-center md:text-left">

            <motion.p
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 16 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={prefersReducedMotion ? undefined : { duration: 0.5, ease: "easeOut" }}
              className="font-mono text-xs tracking-[0.35em] uppercase text-[var(--color-gold)] mb-5"
            >
              Senior Engineer · Cisco ThousandEyes
            </motion.p>

            <motion.h1
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={prefersReducedMotion ? undefined : { duration: 0.6, delay: 0.08, ease: "easeOut" }}
              className="font-playfair text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-none mb-6"
            >
              Ryan{" "}
              <span className="gradient-name font-bold">Mack</span>
            </motion.h1>

            <motion.p
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={prefersReducedMotion ? undefined : { duration: 0.6, delay: 0.16, ease: "easeOut" }}
              className="hero-tagline text-base md:text-lg text-[var(--text-secondary)] max-w-lg leading-relaxed mb-10"
            >
              <span className="inline-flex items-center gap-2">
                Guilford, Connecticut
                <MapPin size={14} aria-hidden="true" />
              </span>
            </motion.p>

            <motion.div
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 16 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={prefersReducedMotion ? undefined : { duration: 0.5, delay: 0.24, ease: "easeOut" }}
              className="flex flex-wrap items-center gap-3 justify-center md:justify-start"
            >
              <a
                href="#experience"
                className="px-6 py-3 bg-[#c9a465] hover:bg-[#d4b870] text-[#100d09] rounded-lg text-sm font-semibold transition-colors"
              >
                View Experience
              </a>
              <a
                href="/documents/Ryan-M-Mack-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download resume (PDF, opens in new tab)"
                className={`px-6 py-3 rounded-lg text-sm font-medium border transition-colors ${
                  theme === "dark"
                    ? "border-white/15 hover:border-white/25 hover:bg-white/5"
                    : "border-black/15 hover:border-black/20 hover:bg-black/5"
                }`}
              >
                Download Resume
              </a>
            </motion.div>

            {/* Social icons */}
            <motion.div
              initial={prefersReducedMotion ? undefined : { opacity: 0 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1 }}
              transition={prefersReducedMotion ? undefined : { duration: 0.5, delay: 0.35 }}
              className="flex items-center gap-1 mt-8 justify-center md:justify-start"
            >
              {[
                { href: "https://github.com/kamoras", icon: Github, label: "GitHub profile (opens in new tab)" },
                { href: "https://www.linkedin.com/in/ryan-mack", icon: Linkedin, label: "LinkedIn profile (opens in new tab)" },
                { href: "mailto:mack.ryanm@gmail.com", icon: Mail, label: "Send email" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={href}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2.5 rounded-md text-[var(--text-muted)] hover:text-current transition-colors"
                >
                  <Icon size={18} aria-hidden="true" />
                </a>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={prefersReducedMotion ? undefined : { opacity: 0 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1 }}
              transition={prefersReducedMotion ? undefined : { duration: 0.5, delay: 0.5 }}
              className={`flex items-center gap-8 mt-10 pt-8 border-t ${
                theme === "dark" ? "border-white/[0.08]" : "border-black/[0.08]"
              } justify-center md:justify-start`}
            >
              {stats.map(({ value, suffix, label }) => (
                <AnimatedStat
                  key={label}
                  value={value}
                  suffix={suffix}
                  label={label}
                  animate={!prefersReducedMotion}
                />
              ))}
            </motion.div>
          </div>

          {/* ── Photo column ── */}
          <motion.div
            initial={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.96 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
            transition={prefersReducedMotion ? undefined : { duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="flex-shrink-0"
          >
            {/* Gradient border frame — gilded portrait */}
            <div
              className="relative w-52 h-52 md:w-64 md:h-64 rounded-2xl p-[2px] rotate-1"
              style={{
                background: "linear-gradient(135deg, rgba(201,164,101,0.7) 0%, rgba(240,208,128,0.35) 50%, rgba(201,164,101,0.2) 100%)",
              }}
            >
              {/* Outer glow */}
              <div aria-hidden="true" className="absolute -inset-4 rounded-3xl blur-2xl" style={{ background: "radial-gradient(circle, rgba(201,164,101,0.12) 0%, transparent 70%)" }} />
              <div className="relative w-full h-full rounded-[14px] overflow-hidden">
                <Image
                  src="/images/ryan.jpg"
                  alt="Ryan Mack"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Decorative scroll hint */}
        <motion.div
          aria-hidden="true"
          initial={prefersReducedMotion ? undefined : { opacity: 0 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1 }}
          transition={prefersReducedMotion ? undefined : { duration: 0.5, delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--text-muted)]"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <ArrowDown size={12} className="animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}
