"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/**
 * Wraps framer-motion's useInView and adds awareness of hash-scroll navigation.
 * Sections above the viewport (because the page landed at a hash anchor below
 * them) return isInView:true immediately so they render visibly rather than
 * staying hidden at opacity 0. Defaults to once:true — callers can override.
 */
export function useScrollAwareInView(options?: Parameters<typeof useInView>[1]) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, ...options });
  const [alreadyPassed, setAlreadyPassed] = useState(false);

  useLayoutEffect(() => {
    const check = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      // Element is entirely above the viewport — it will never enter view by scrolling down
      if (rect.bottom < 0) setAlreadyPassed(true);
    };

    // Check immediately on mount
    check();

    // HashScrollHandler fires after two rAFs (post-paint). Re-check once layout
    // has settled so sections that scroll out of view after the hash jump are caught.
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(check);
    });

    // Also re-check on the first scroll or hashchange in case navigation settles later
    window.addEventListener("scroll", check, { passive: true, once: true });
    window.addEventListener("hashchange", check, { once: true });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      window.removeEventListener("scroll", check);
      window.removeEventListener("hashchange", check);
    };
  }, []);

  return { ref, isInView: isInView || alreadyPassed };
}
