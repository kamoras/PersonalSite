"use client";

import { useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col">
      <a
        href="#main-content"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-[100] focus-visible:px-4 focus-visible:py-2 focus-visible:bg-[#c9a465] focus-visible:text-[#100d09] focus-visible:rounded-lg focus-visible:text-sm focus-visible:font-medium"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <p
            aria-hidden="true"
            className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--color-gold)] mb-5"
          >
            Error
          </p>
          <h1 className="font-playfair text-4xl md:text-5xl font-light tracking-tight mb-4">
            Something went <span className="font-semibold">wrong</span>
          </h1>
          <p className="text-[var(--text-secondary)] text-base leading-relaxed mb-8">
            An unexpected error occurred. You can try again or return home.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#c9a465] hover:bg-[#d4b870] text-[#100d09] rounded-lg text-sm font-semibold transition-colors"
            >
              Try again
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--color-gold)] border border-[var(--color-card-border)] transition-colors"
            >
              Go home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
