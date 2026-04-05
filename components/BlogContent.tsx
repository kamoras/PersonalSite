"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface Tooltip {
  html: string;
  anchorRect: DOMRect;
}

export default function BlogContent({ html }: { html: string }) {
  const articleRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);

  const closeTooltip = useCallback(() => setTooltip(null), []);

  // Intercept footnote ref clicks
  useEffect(() => {
    const article = articleRef.current;
    if (!article) return;

    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a[data-footnote-ref]");
      if (!anchor) return;

      e.preventDefault();

      const targetId = anchor.getAttribute("href")?.slice(1);
      if (!targetId) return;

      const footnoteEl = document.getElementById(targetId);
      if (!footnoteEl) return;

      // Clone the footnote, strip the back-reference arrow
      const clone = footnoteEl.cloneNode(true) as HTMLElement;
      clone.querySelector("[data-footnote-backref]")?.remove();

      setTooltip({
        html: clone.innerHTML,
        anchorRect: anchor.getBoundingClientRect(),
      });
    };

    article.addEventListener("click", handleClick);
    return () => article.removeEventListener("click", handleClick);
  }, []);

  // Close on outside click or Escape
  useEffect(() => {
    if (!tooltip) return;

    const handleOutside = (e: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(e.target as Node)) {
        // Let the article click handler update the tooltip when switching footnotes
        if ((e.target as HTMLElement).closest("a[data-footnote-ref]")) return;
        closeTooltip();
      }
    };

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeTooltip();
    };

    // Defer listener so the opening click doesn't immediately close the tooltip
    const id = setTimeout(() => {
      document.addEventListener("click", handleOutside);
      document.addEventListener("keydown", handleKey);
    }, 0);

    return () => {
      clearTimeout(id);
      document.removeEventListener("click", handleOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, [tooltip, closeTooltip]);

  const tooltipStyle = (): React.CSSProperties => {
    if (!tooltip) return {};
    const { anchorRect } = tooltip;
    const WIDTH = 320;
    const MARGIN = 12;

    let left = anchorRect.left;
    if (left + WIDTH > window.innerWidth - MARGIN) {
      left = window.innerWidth - WIDTH - MARGIN;
    }
    if (left < MARGIN) left = MARGIN;

    return {
      position: "fixed",
      left,
      top: anchorRect.bottom + 8,
      width: WIDTH,
      zIndex: 50,
    };
  };

  return (
    <>
      <article
        ref={articleRef}
        className="blog-prose"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {tooltip && (
        <div
          ref={tooltipRef}
          style={tooltipStyle()}
          role="tooltip"
          className="rounded-lg border border-[var(--color-card-border)] bg-[var(--color-bg)] px-4 py-3 text-sm text-[var(--text-muted)] shadow-xl"
          dangerouslySetInnerHTML={{ __html: tooltip.html }}
        />
      )}
    </>
  );
}
