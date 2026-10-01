"use client";

import { useEffect, useRef, useState } from "react";

// Renders the real value in the prerendered HTML (and for visitors without
// JavaScript). With JavaScript and motion allowed, the number stays hidden
// (see [data-countup] in globals.css) until this component decides: it counts
// up from 0 when on screen at load, or simply reveals the value otherwise, so
// the prerendered value never flashes before the count starts.
// Matches the failsafe-show delay in globals.css.
const FAILSAFE_MS = 2500;

export default function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reveal = () => el.setAttribute("data-ready", "");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Past FAILSAFE_MS the CSS failsafe has already shown the final value;
    // counting again from 0 would replay it.
    if (reduce || performance.now() > FAILSAFE_MS || el.getBoundingClientRect().top >= window.innerHeight) {
      reveal();
      return;
    }

    const duration = 1200;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      reveal();
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return (
    <span ref={ref} data-countup>
      <span aria-hidden="true">{display}{suffix}</span>
      <span className="sr-only">{value}{suffix}</span>
    </span>
  );
}
