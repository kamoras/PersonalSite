import Link from "next/link";
import type { Metadata } from "next";
import { getAllPostsMeta, formatDate } from "@/lib/posts";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `Writing — ${siteConfig.name}`,
  description: siteConfig.blogDescription,
  openGraph: {
    title: `Writing — ${siteConfig.name}`,
    description: siteConfig.blogDescription,
    url: absoluteUrl("/blog"),
    siteName: siteConfig.name,
    type: "website",
    images: [{ url: siteConfig.opengraphImagePath, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Writing — ${siteConfig.name}`,
    description: siteConfig.blogDescription,
    images: [siteConfig.opengraphImagePath],
  },
};

export default function BlogIndex() {
  const posts = getAllPostsMeta();

  return (
    <div className="max-w-3xl mx-auto px-6 pb-24" style={{ paddingTop: "calc(7rem + env(safe-area-inset-top, 0px))" }}>
      <header className="mb-14">
        <p aria-hidden="true" className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--color-gold)] mb-4">
          Writing
        </p>
        <h1 className="font-playfair text-4xl md:text-5xl font-light tracking-tight mb-4">
          Thoughts &amp; <span className="font-semibold">perspectives</span>
        </h1>
        <p className="hero-tagline text-[var(--text-muted)] text-lg">
          On software, technology, and whatever else is worth putting into words.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="text-[var(--text-muted)]">No posts yet — check back soon.</p>
      ) : (
        <ol aria-label="Blog posts" className="flex flex-col gap-6 list-none">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <article className="blog-card rounded-2xl border p-6 md:p-8">
                  <h2 className="font-playfair text-xl md:text-2xl font-semibold mb-2 group-hover:text-[var(--color-gold)] transition-colors">
                    {post.title}
                  </h2>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--text-muted)] font-mono mb-4">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span aria-hidden="true">·</span>
                    <span>{post.readingTime} min read</span>
                  </div>

                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5">
                    {post.description}
                  </p>

                  {post.tags.length > 0 && (
                    <ul aria-label="Tags" className="flex flex-wrap gap-2 list-none">
                      {post.tags.map((tag) => (
                        <li
                          key={tag}
                          className="text-xs font-mono px-2.5 py-0.5 rounded-md border border-[rgba(201,164,101,0.25)] text-[var(--color-gold)]"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
