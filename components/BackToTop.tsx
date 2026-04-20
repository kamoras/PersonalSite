"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function BackToTop() {
  const { theme } = useTheme();
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "instant" : "smooth" });
  };

  const buttonClass =
    theme === "dark"
      ? "bg-[#1a1714] border border-white/[0.12] text-[var(--text-muted)] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
      : "bg-[#faf7f2] border border-black/[0.12] text-[var(--text-muted)] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]";

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.2 }}
          onClick={handleClick}
          aria-label="Scroll back to top"
          className={`fixed bottom-8 right-6 z-40 p-3 rounded-full shadow-lg transition-colors duration-200 ${buttonClass}`}
        >
          <ArrowUp size={16} aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
