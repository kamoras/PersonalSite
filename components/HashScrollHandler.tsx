"use client";

import { useEffect } from "react";

// Handles hash-link navigation from other pages (e.g. /blog → /#contact).
// Next.js App Router doesn't reliably scroll to the hash after a cross-route
// navigation because client components may not have painted yet. This runs
// after mount and fires the scroll once the DOM is ready.
export default function HashScrollHandler() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    // Double rAF ensures we're after the first browser paint and React has
    // finished committing all client components to the DOM.
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        let id = hash.slice(1);
        try {
          id = decodeURIComponent(id);
        } catch {
          // Malformed percent-encoding — fall back to raw value.
        }
        const el = document.getElementById(id);
        if (!el) return;
        const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth";
        el.scrollIntoView({ behavior });
      });
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, []);

  return null;
}
