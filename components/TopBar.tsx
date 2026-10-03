"use client";

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

type Props = {
  /** Contents of the sheet, rendered on the server. */
  sheet: React.ReactNode;
};

const SHEET_ID = "contents-sheet";

// Replaces the rail below 1200px with a full-height Contents sheet. The sheet
// is a native <details>, so it still opens when JavaScript is off or the app
// bundle fails to load; this component only adds scroll lock, a focus trap and
// Escape. Closing on link clicks is in the pre-paint script (lib/theme.ts).
export default function TopBar({ sheet }: Props) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const summaryRef = useRef<HTMLElement>(null);
  const sheetRef = useRef<HTMLElement>(null);

  // Read the open state from the element itself rather than from toggle events,
  // so a sheet opened before hydration is still picked up.
  const subscribe = useCallback((onChange: () => void) => {
    const details = detailsRef.current;
    details?.addEventListener("toggle", onChange);
    return () => details?.removeEventListener("toggle", onChange);
  }, []);
  const open = useSyncExternalStore(
    subscribe,
    () => detailsRef.current?.open ?? false,
    () => false
  );

  useEffect(() => {
    if (!open) return;
    const close = () => {
      if (detailsRef.current) detailsRef.current.open = false;
    };

    document.body.style.overflow = "hidden";
    // The sheet covers the page; keep screen readers' browse mode out of it too.
    const page = document.querySelector<HTMLElement>(".frame");
    if (page) page.inert = true;
    sheetRef.current?.querySelector<HTMLElement>("a, button")?.focus({ preventScroll: true });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        summaryRef.current?.focus({ preventScroll: true });
        return;
      }
      if (e.key !== "Tab") return;
      // Trap focus within the sheet and its toggle, which stays reachable as "Close".
      const focusable = [
        summaryRef.current,
        ...Array.from(sheetRef.current?.querySelectorAll<HTMLElement>("a, button") ?? []),
      ].filter((el): el is HTMLElement => el !== null);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    // The sheet only exists below 1200px; widening the window must not leave
    // the page scroll-locked behind an invisible sheet.
    const wide = window.matchMedia("(min-width: 1200px)");
    const onWide = () => {
      if (wide.matches) close();
    };

    document.addEventListener("keydown", onKeyDown);
    wide.addEventListener("change", onWide);
    return () => {
      document.body.style.overflow = "";
      if (page) page.inert = false;
      document.removeEventListener("keydown", onKeyDown);
      wide.removeEventListener("change", onWide);
    };
  }, [open]);

  return (
    <header className="topbar" data-print-hidden>
      <Link className="mark" href="/" aria-label="R·M, Ryan Mack, home">
        R<span>·</span>M
      </Link>
      <ThemeToggle />
      <details ref={detailsRef} className="menu">
        <summary ref={summaryRef} className="menu-btn" aria-controls={SHEET_ID}>
          <span className="when-closed">Contents</span>
          <span className="when-open">Close</span>
        </summary>
        <nav
          id={SHEET_ID}
          ref={sheetRef}
          className="sheet"
          aria-label="Contents"
        >
          {sheet}
        </nav>
      </details>
    </header>
  );
}
