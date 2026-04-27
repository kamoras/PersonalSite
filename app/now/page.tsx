import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `Now — ${siteConfig.name}`,
  description: "What Ryan Mack is focused on right now.",
  alternates: {
    canonical: absoluteUrl("/now"),
  },
  openGraph: {
    title: `Now — ${siteConfig.name}`,
    description: "What Ryan Mack is focused on right now.",
    url: absoluteUrl("/now"),
    siteName: siteConfig.name,
    type: "website",
  },
};

const LAST_UPDATED = "April 2026";

export default function NowPage() {
  return (
    <div
      className="max-w-3xl mx-auto px-6 pb-24"
      style={{ paddingTop: "calc(7rem + env(safe-area-inset-top, 0px))" }}
    >
      <nav aria-label="Back navigation" className="mb-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--color-gold)] transition-colors font-mono"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          Home
        </Link>
      </nav>

      <header className="mb-12">
        <p className="font-mono text-xs text-[var(--color-gold)] uppercase tracking-widest mb-3">
          /now
        </p>
        <h1 className="font-playfair text-3xl md:text-4xl font-semibold leading-tight mb-4">
          What I&apos;m doing now
        </h1>
        <p className="text-sm text-[var(--text-muted)] font-mono">
          Last updated {LAST_UPDATED} · San Francisco, CA
        </p>
      </header>

      <div className="prose-custom space-y-10">
        <section>
          <h2 className="font-playfair text-xl font-semibold mb-4 text-[var(--color-gold)]">
            Work
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Senior Software Engineer at{" "}
            <strong className="text-[var(--text-primary)]">Cisco ThousandEyes</strong>, working on
            network intelligence and observability tooling. Focused on making complex distributed
            systems legible — both to the engineers who build them and the customers who rely on them.
          </p>
        </section>

        <section>
          <h2 className="font-playfair text-xl font-semibold mb-4 text-[var(--color-gold)]">
            Learning
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Going deeper on distributed systems theory — reading through papers on consensus
            protocols and working through the implications for real-world system design. Also spending
            time with Rust for systems programming practice.
          </p>
        </section>

        <section>
          <h2 className="font-playfair text-xl font-semibold mb-4 text-[var(--color-gold)]">
            Writing
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Working on a series of posts about systems design patterns that don&apos;t make it into
            textbooks — the kind of things you only learn by operating software at scale. Drafting
            slowly, publishing when it&apos;s right.
          </p>
          <p className="mt-3">
            <Link
              href="/blog"
              className="text-sm font-mono text-[var(--color-gold)] hover:underline underline-offset-4"
            >
              See everything I&apos;ve published →
            </Link>
          </p>
        </section>

        <section>
          <h2 className="font-playfair text-xl font-semibold mb-4 text-[var(--color-gold)]">
            Mentoring
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Doing free 1:1 sessions for people breaking into tech or navigating early career
            decisions. Resume reviews, interview prep, career strategy. If you want to chat,{" "}
            <Link
              href="/#community"
              className="text-[var(--color-gold)] hover:underline underline-offset-4"
            >
              book a free session
            </Link>
            .
          </p>
        </section>
      </div>

      <p className="mt-16 text-xs text-[var(--text-muted)] font-mono">
        This is a{" "}
        <a
          href="https://nownownow.com/about"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[var(--color-gold)] transition-colors"
        >
          /now page
        </a>
        . The idea was started by Derek Sivers.
      </p>
    </div>
  );
}
