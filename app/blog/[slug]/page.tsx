import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllPostSlugs, getPost, formatDate } from "@/lib/posts";
import { ArrowLeft } from "lucide-react";
import BlogContent from "@/components/BlogContent";
import TextToSpeech from "@/components/TextToSpeech";

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const slugs = getAllPostSlugs();
  if (!slugs.includes(slug)) return {};

  const post = await getPost(slug);
  return {
    title: `${post.title} — Ryan Mack`,
    description: post.description,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://ryan-mack.dev/blog/${slug}`,
      siteName: "Ryan Mack",
      type: "article",
      publishedTime: post.date,
      authors: ["Ryan Mack"],
      images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: ["/opengraph-image.png"],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const slugs = getAllPostSlugs();
  if (!slugs.includes(slug)) notFound();

  const post = await getPost(slug);
  const postUrl = `https://ryan-mack.dev/blog/${slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    author: {
      "@type": "Person",
      name: "Ryan Mack",
      url: "https://ryan-mack.dev",
    },
    publisher: {
      "@type": "Person",
      name: "Ryan Mack",
      url: "https://ryan-mack.dev",
    },
    datePublished: post.date,
    url: postUrl,
    ...(post.tags.length > 0 && { keywords: post.tags.join(", ") }),
    image: "https://ryan-mack.dev/opengraph-image.png",
    mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://ryan-mack.dev" },
      { "@type": "ListItem", position: 2, name: "Writing", item: "https://ryan-mack.dev/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: postUrl },
    ],
  };

  return (
    <div className="max-w-3xl mx-auto px-6 pt-28 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Back link */}
      <nav aria-label="Breadcrumb" className="mb-10">
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
          <TextToSpeech title={post.title} html={post.contentHtml} />
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

      {/* Footer nav */}
      <footer className="mt-16 pt-10 border-t border-[var(--color-card-border)]">
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
