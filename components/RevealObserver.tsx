"use client";

import { useEffect } from "react";

// Eases .reveal elements in the first time they scroll into view. Elements
// already on screen at load are shown immediately, so nothing above the fold
// waits on an animation. The hidden state only exists under html.js and
// prefers-reduced-motion: no-preference (see globals.css). Marking the page
// hydrated cancels the CSS failsafe that shows everything if this never runs.
export default function RevealObserver() {
  useEffect(() => {
    const markHydrated = () => document.documentElement.classList.add("hydrated");
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.in)"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("in"));
      markHydrated();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px" }
    );

    for (const el of elements) {
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("in");
      else observer.observe(el);
    }
    markHydrated();
    return () => observer.disconnect();
  }, []);

  return null;
}
