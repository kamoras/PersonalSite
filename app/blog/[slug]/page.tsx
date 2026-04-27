import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllPostSlugs, getPost, getRelatedPosts, formatDate } from "@/lib/posts";
import { ArrowLeft } from "lucide-react";
import BlogContent from "@/components/BlogContent";
import TextToSpeech from "@/components/TextToSpeechLoader";
import GiscusComments from "@/components/GiscusComments";
import { absoluteUrl, siteConfig } from "@/lib/site";

function hasPost(slug: string): boolean {
  return getAllPostSlugs().includes(slug);
}

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!hasPost(slug)) return {};

  const post = await getPost(slug);

  return {
    title: `${post.title} — ${siteConfig.name}`,
    description: post.description,
    keywords: post.tags,
    alternates: {
      canonical: absoluteUrl(`/blog/${slug}`),
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: absoluteUrl(`/blog/${slug}`),
      siteName: siteConfig.name,
      type: "article",
      publishedTime: post.date,
      authors: [siteConfig.name],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!hasPost(slug)) notFound();

  const post = await getPost(slug);
  const postUrl = absoluteUrl(`/blog/${slug}`);
  const related = getRelatedPosts(slug, post.tags);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    author: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    datePublished: post.date,
    url: postUrl,
    ...(post.tags.length > 0 && { keywords: post.tags.join(", ") }),
    mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Writing", item: absoluteUrl("/blog") },
      { "@type": "ListItem", position: 3, name: post.title, item: postUrl },
    ],
  };

  return (
    <div className="max-w-3xl mx-auto px-6 pb-24" style={{ paddingTop: "calc(7rem + env(safe-area-inset-top, 0px))" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Back link */}
      <nav aria-label="Back navigation" className="mb-10">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--color-gold)] transition-colors font-mono"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          All posts
        </Link>
      </nav>

      {/* Post header */}
      <header className="mb-10">
        <h1 className="font-playfair text-3xl md:text-4xl font-semibold leading-tight mb-5">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--text-muted)] font-mono mb-5">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingTime} min read</span>
          <span aria-hidden="true">·</span>
          <TextToSpeech title={post.title} text={post.contentText} />
        </div>

        {post.tags.length > 0 && (
          <ul aria-label="Tags" className="flex flex-wrap gap-2 list-none mb-8">
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

        {/* Ornamental divider */}
        <div
          aria-hidden="true"
          className="ornament-divider text-lg select-none"
        >
          ◆
        </div>
      </header>

      {/* Post body */}
      <BlogContent html={post.contentHtml} />

      {/* Related posts */}
      {related.length > 0 && (
        <section aria-label="Related posts" className="mt-16 pt-10 border-t border-[var(--color-card-border)]">
          <h2 className="font-playfair text-xl font-semibold mb-6">Related posts</h2>
          <ul className="space-y-4 list-none">
            {related.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="group block p-4 rounded-lg border border-[var(--color-card-border)] hover:border-[var(--color-gold)] transition-colors"
                >
                  <p className="font-semibold group-hover:text-[var(--color-gold)] transition-colors mb-1">
                    {p.title}
                  </p>
                  <p className="text-sm text-[var(--text-muted)] font-mono">
                    {formatDate(p.date)} · {p.readingTime} min read
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Comments */}
      <section aria-label="Comments" className="mt-16 pt-10 border-t border-[var(--color-card-border)]">
        <h2 className="font-playfair text-xl font-semibold mb-6">Discussion</h2>
        <GiscusComments />
      </section>

      {/* Footer nav */}
      <footer className="mt-10 pt-6 border-t border-[var(--color-card-border)]">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--color-gold)] transition-colors font-mono"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          Back to all posts
        </Link>
      </footer>
    </div>
  );
}
