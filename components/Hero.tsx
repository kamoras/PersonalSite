"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, MapPin } from "lucide-react";
import PrideFlag from "./PrideFlag";
import Image from "next/image";
import { siteConfig } from "@/lib/site";
import { socialLinks } from "@/lib/socials";

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
  // Start at the real value so the prerendered HTML (and visitors without JS)
  // show it. The count-up only runs when the stat is on screen at load, where
  // the row is still fading in from opacity 0 and the reset to 0 is hidden; a
  // stat below the fold (e.g. landscape phones) keeps its value rather than
  // visibly snapping to 0 when scrolled to.
  const [display, setDisplay] = useState(value);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!animate || !el || el.getBoundingClientRect().top >= window.innerHeight) return;
    const duration = 1200;
    const startTime = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, animate]);

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
  // `initial` is inlined into the prerendered HTML, where the motion preference
  // is unknown, so it must not depend on it or hydration fails. Reduced motion
  // zeroes the transition instead, which lands on the final state immediately.
  const prefersReducedMotion = useReducedMotion();
  const [firstName, ...restName] = siteConfig.name.split(" ");
  const highlightedName = restName.join(" ") || firstName;

  // Rainbow the name during Pride Month. Read through useSyncExternalStore so the
  // prerendered name stays gold and the swap happens client-side without a
  // hydration mismatch when the build month differs from the visit month.
  const isPrideMonth = useSyncExternalStore(
    () => () => {},
    () => new Date().getMonth() === 5,
    () => false
  );

  return (
    <section
      aria-label="Introduction"
      className="relative min-h-svh flex items-center justify-center overflow-hidden"
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

      <div className="relative max-w-6xl mx-auto px-6 pb-20 w-full" style={{ paddingTop: "calc(6rem + env(safe-area-inset-top, 0px))" }}>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-16 md:gap-20">

          {/* ── Text column ── */}
          <div className="flex-1 text-center md:text-left">

            <p className="font-mono text-xs tracking-[0.35em] uppercase text-[var(--color-gold)] mb-5 flex items-center gap-2.5 justify-center md:justify-start">
              {isPrideMonth && (
                <PrideFlag
                  title="In support of LGBTQ+ Pride"
                  className="h-3.5 w-auto rounded-[2px] shadow-sm flex-shrink-0"
                />
              )}
              <span>Senior Engineer · {siteConfig.employer}</span>
            </p>

            <h1 className="font-playfair text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-none mb-6">
              {firstName}{" "}
              <span className={`gradient-name font-bold${isPrideMonth ? " gradient-name-pride" : ""}`}>
                {highlightedName}
              </span>
            </h1>

            <p className="hero-tagline text-base md:text-lg text-[var(--text-secondary)] max-w-lg leading-relaxed mb-10">
              <span className="inline-flex items-center gap-2">
                Guilford, Connecticut
                <MapPin size={14} aria-hidden="true" />
              </span>
            </p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, delay: 0.24, ease: "easeOut" }}
              className="flex flex-wrap items-center gap-3 justify-center md:justify-start"
            >
              <a
                href="#experience"
                className="px-6 py-3 bg-[#c9a465] hover:bg-[#d4b870] text-[#100d09] rounded-lg text-sm font-semibold transition-colors"
              >
                View Experience
              </a>
              <a
                href={siteConfig.resumeDocumentPath}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View resume PDF (opens in new tab)"
                className="px-6 py-3 rounded-lg text-sm font-medium border border-[var(--color-border-strong)] hover:border-[var(--color-border-hover)] hover:bg-[var(--color-chip-bg)] transition-colors"
              >
                View Resume
              </a>
            </motion.div>

            {/* Social icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, delay: 0.35 }}
              className="flex items-center gap-1 mt-8 justify-center md:justify-start"
            >
              {socialLinks.map(({ key, href, icon: Icon, label }) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, delay: 0.5 }}
              className="flex items-center gap-8 mt-10 pt-8 border-t border-[var(--color-card-border)] justify-center md:justify-start"
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
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.7, delay: 0.15, ease: "easeOut" }}
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--text-muted)]"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <ArrowDown size={12} className="animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}
