"use client";

import { siteConfig } from "@/lib/site";

declare global {
  interface Window {
    Calendly?: { initPopupWidget: (opts: { url: string }) => void };
  }
}

let calendlyLoader: Promise<void> | null = null;

function loadCalendly(): Promise<void> {
  calendlyLoader ??= new Promise<void>((resolve, reject) => {
    if (!document.querySelector('link[href*="assets.calendly.com"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      document.head.appendChild(link);
    }

    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.onload = () => resolve();
    script.onerror = () => {
      script.remove();
      calendlyLoader = null;
      reject(new Error("Calendly widget failed to load"));
    };
    document.head.appendChild(script);
  });
  return calendlyLoader;
}

// The booking button is a real link to Calendly, so it still works when the
// widget script is blocked (ad blockers, strict privacy settings). The
// fallback navigates in place because a window.open after an async load is no
// longer tied to the click and gets popup-blocked.
function openCalendlyPopup(event: React.MouseEvent<HTMLAnchorElement>, url: string) {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
  event.preventDefault();
  const fallback = () => window.location.assign(url);
  loadCalendly()
    .then(() => (window.Calendly ? window.Calendly.initPopupWidget({ url }) : fallback()))
    .catch(fallback);
}

const calendlyUrl = `${siteConfig.links.calendly}?hide_gdpr_banner=1&primary_color=d4ae6b`;

export default function BookingLink({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <a
      href={calendlyUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={(event) => openCalendlyPopup(event, calendlyUrl)}
    >
      {children}
    </a>
  );
}
