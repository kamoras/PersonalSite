"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "instant" : "smooth" });
  };

  if (!visible) {
    return null;
  }

  return (
    <button
      onClick={handleClick}
      aria-label="Scroll back to top"
      className="fixed bottom-8 right-6 z-40 rounded-full border border-[var(--color-card-border)] bg-[var(--color-bg)] p-3 text-[var(--text-muted)] shadow-lg transition-colors duration-200 hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
    >
      <ArrowUp size={16} aria-hidden="true" />
    </button>
  );
}
