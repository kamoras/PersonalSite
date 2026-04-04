"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/**
 * Drop-in replacement for framer-motion's useInView.
 * When a section is already above the viewport on mount (e.g. after navigating
 * directly to a hash anchor further down the page), it returns true immediately
 * so the section renders visibly without waiting for a scroll event.
 */
export function useScrollAwareInView(options?: Parameters<typeof useInView>[1]) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, ...options });
  const [alreadyPassed, setAlreadyPassed] = useState(false);

  useLayoutEffect(() => {
    if (!ref.current) return;
    const rect = (ref.current as HTMLElement).getBoundingClientRect();
    // Element is entirely above the viewport — it will never enter view by scrolling down
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (rect.bottom < 0) setAlreadyPassed(true);
  }, []);

  return { ref, isInView: isInView || alreadyPassed };
}
