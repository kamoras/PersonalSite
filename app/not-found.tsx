import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Page Not Found — Ryan Mack",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <p
            aria-hidden="true"
            className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--color-gold)] mb-5"
          >
            404
          </p>
          <h1 className="font-playfair text-4xl md:text-5xl font-light tracking-tight mb-4">
            Page <span className="font-semibold">not found</span>
          </h1>
          <p className="text-[var(--text-secondary)] text-base leading-relaxed mb-8">
            This page doesn&apos;t exist, or it may have moved.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#c9a465] hover:bg-[#d4b870] text-[#100d09] rounded-lg text-sm font-semibold transition-colors"
            >
              Go home
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--color-gold)] border border-[var(--color-card-border)] transition-colors"
            >
              Read the blog
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
