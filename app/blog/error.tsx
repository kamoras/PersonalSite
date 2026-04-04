"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function BlogError({
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
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p
          aria-hidden="true"
          className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--color-gold)] mb-5"
        >
          Error
        </p>
        <h1 className="font-playfair text-4xl md:text-5xl font-light tracking-tight mb-4">
          Couldn&apos;t load <span className="font-semibold">this post</span>
        </h1>
        <p className="text-[var(--text-secondary)] text-base leading-relaxed mb-8">
          Something went wrong loading this page. You can try again or browse all posts.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#c9a465] hover:bg-[#d4b870] text-[#100d09] rounded-lg text-sm font-semibold transition-colors"
          >
            Try again
          </button>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--color-gold)] border border-[var(--color-card-border)] transition-colors"
          >
            All posts
          </Link>
        </div>
      </div>
    </div>
  );
}
