"use client";

import { useEffect } from "react";

// Marks the link for the section currently being read with
// aria-current="location": links carry data-section="<id>", sections carry
// data-track and an id. Optionally drives a reading-progress hairline
// ([data-progress]) from how far the reader is through [data-progress-of].
export default function SectionTracker() {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-track]"));
    const progressBar = document.querySelector<HTMLElement>("[data-progress]");
    const progressOf = document.querySelector<HTMLElement>("[data-progress-of]");
    if (sections.length === 0 && !progressBar) return;

    const update = () => {
      const trigger = window.innerHeight * 0.35;
      let current: string | null = null;
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= trigger) current = section.id;
      }
      // The last section's top may never reach the trigger on a short page.
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80;
      if (atBottom && sections.length > 0) current = sections[sections.length - 1].id;

      document.querySelectorAll<HTMLElement>("a[data-section]").forEach((link) => {
        if (link.dataset.section === current) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });

      if (progressBar && progressOf) {
        const rect = progressOf.getBoundingClientRect();
        const travel = rect.height - window.innerHeight;
        const p = travel > 0 ? Math.min(1, Math.max(0, -rect.top / travel)) : 1;
        progressBar.style.setProperty("--p", String(p));
      }
    };

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return null;
}
