import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { getAdjacentPosts, getAllPostSlugs, getPost, getRelatedPosts } from "@/lib/posts";
import { formatDate, formatShortDate } from "@/lib/format";
import { Bluesky, Linkedin } from "@/components/BrandIcons";
import ArticleBody from "@/components/ArticleBody";
import CopyLink from "@/components/CopyLink";
import ListenButton from "@/components/ListenButton";
import GiscusComments from "@/components/GiscusComments";
import SiteFrame from "@/components/SiteFrame";
import BookingLink from "@/components/BookingLink";
import { SiteFooter } from "@/components/Footer";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { ogImage } from "@/lib/og";

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
  const image = ogImage(`/blog/${slug}/og.png`, post.title);

  return {
    title: `${post.title} | ${siteConfig.name}`,
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
      locale: "en_US",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [image],
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
    dateModified: post.date,
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

  const { newer, older } = getAdjacentPosts(slug);
  const listenText = `${post.title}. ${post.contentText}`;
  const essayToc = [
    ...post.headings.map(({ id, text }) => ({ id, text })),
    ...(post.notesCount > 0 ? [{ id: "user-content-footnote-label", text: "Notes" }] : []),
    { id: "discussion", text: "Discussion" },
  ];
  const tocLinks = (className: string) => (
    <ol className={className}>
      {essayToc.map(({ id, text }) => (
        <li key={id}>
          <a href={`#${id}`} data-section={id}>
            <span className="t">{text}</span>
          </a>
        </li>
      ))}
    </ol>
  );
  const shareText = encodeURIComponent(`${post.title} ${postUrl}`);

  return (
    <SiteFrame
      currentPage="writing"
      railLabel="Essay contents"
      rail={
        <>
          <Link className="back-link" href="/blog"><span aria-hidden="true">←</span> All essays</Link>
          <p className="label rail-label essay-label" aria-hidden="true">In this essay</p>
          <p className="essay-title" aria-hidden="true">{post.title}</p>
          <div className="relative">
            <span className="progress" data-progress aria-hidden="true" />
            {tocLinks("toc")}
          </div>
        </>
      }
      railFoot={<ListenButton text={listenText} minutes={post.readingTime} />}
      sheet={
        <>
          <p className="label sheet-label">In this essay</p>
          {tocLinks("")}
          <p className="label sheet-label spaced">Site</p>
          <ol>
            <li>
              <Link href="/blog">All essays</Link>
            </li>
            <li>
              <Link href="/">Home</Link>
            </li>
          </ol>
        </>
      }
      footer={<SiteFooter />}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <article className="read" aria-labelledby="post-title">
        <header className="post-head">
          <p className="meta">
            <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingTime} min read
          </p>
          <h1 className="post-title" id="post-title">{post.title}</h1>
          <div className="head-grid">
            <p className="deck">{post.description}</p>
            <div className="byline">
              <Image src="/images/ryan.jpg" alt="" width={104} height={104} />
              <p className="meta">
                <b>{siteConfig.name}</b>
                {siteConfig.jobTitle},<br />
                {siteConfig.employer}
              </p>
            </div>
          </div>
          <div className="toolbar" data-print-hidden>
            <ListenButton text={listenText} minutes={post.readingTime} showStop />
            <ul className="tags topic-tags" aria-label="Topics">
              {post.tags.map((tag) => (
                <li key={tag}>
                  <Link href={`/blog?topic=${encodeURIComponent(tag)}`}>{tag}</Link>
                </li>
              ))}
            </ul>
            <span className="spacer" />
            <div className="share">
              <CopyLink url={postUrl} />
              <a href={`https://bsky.app/intent/compose?text=${shareText}`} target="_blank" rel="noopener noreferrer">
                <Bluesky width={15} height={15} aria-hidden="true" />
                <span className="stext">Bluesky</span>
                <span className="sr-only"> (share, opens in new tab)</span>
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin width={15} height={15} aria-hidden="true" />
                <span className="stext">LinkedIn</span>
                <span className="sr-only"> (share, opens in new tab)</span>
              </a>
            </div>
          </div>
        </header>

        <ArticleBody html={post.contentHtml} />

        <div className="end" data-print-hidden>
          <div>
            <div className="author">
              <Image src="/images/ryan.jpg" alt="" width={128} height={128} />
              <div>
                <p>
                  <b>{siteConfig.name}</b> is a senior software engineer at {siteConfig.employer}, where he works on
                  the Enterprise Agent. He offers free 1:1 mentorship to anyone breaking into the field.
                </p>
                <p className="links">
                  <BookingLink className="textlink">Book a session</BookingLink>
                  <a className="textlink" href={siteConfig.feedPath} type="application/rss+xml">Subscribe via RSS</a>
                </p>
              </div>
            </div>
          </div>
          {related.length > 0 && (
            <aside className="related" aria-labelledby="related-heading">
              <h2 className="label" id="related-heading">Related essays</h2>
              <ol>
                {related.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/blog/${p.slug}`}>{p.title}</Link>
                    <span className="meta">
                      {formatShortDate(p.date)}, {p.date.slice(0, 4)} · {p.readingTime} min
                    </span>
                  </li>
                ))}
              </ol>
            </aside>
          )}
        </div>

        {(older || newer) && (
          <nav className="pager" aria-label="More essays" data-print-hidden>
            {older && (
              <Link href={`/blog/${older.slug}`} rel="prev">
                <span className="label"><span aria-hidden="true">←</span> Older</span>
                <b>{older.title}</b>
              </Link>
            )}
            {newer && (
              <Link href={`/blog/${newer.slug}`} rel="next" className="newer">
                <span className="label">Newer <span aria-hidden="true">→</span></span>
                <b>{newer.title}</b>
              </Link>
            )}
          </nav>
        )}

        <section className="discussion" id="discussion" data-track aria-labelledby="discussion-heading" data-print-hidden>
          <div className="discussion-head">
            <h2 id="discussion-heading">Discussion</h2>
          </div>
          <div className="giscus-frame">
            <GiscusComments />
          </div>
        </section>
        <aside className="disc-note" aria-label="About comments" data-print-hidden>
          <p className="mnote">
            Comments live in GitHub Discussions on the site&rsquo;s repository. Sign in with GitHub to join in.
          </p>
        </aside>
      </article>
    </SiteFrame>
  );
}
