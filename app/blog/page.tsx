import Link from "next/link";
import type { Metadata } from "next";
import { Rss } from "lucide-react";
import SiteFrame from "@/components/SiteFrame";
import EssayArchive from "@/components/EssayArchive";
import { SiteFooter } from "@/components/Footer";
import { getAllPostsMeta, getTopics } from "@/lib/posts";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { ogImage } from "@/lib/og";

const blogOgImage = ogImage("/blog/og.png", `Writing | ${siteConfig.name}`);

export const metadata: Metadata = {
  title: `Writing | ${siteConfig.name}`,
  description: siteConfig.blogDescription,
  keywords: ["software engineering", "AI", "tech culture", "open source", "distributed systems", "engineering blog"],
  alternates: {
    canonical: absoluteUrl("/blog"),
    types: {
      "application/rss+xml": absoluteUrl(siteConfig.feedPath),
    },
  },
  openGraph: {
    title: `Writing | ${siteConfig.name}`,
    description: siteConfig.blogDescription,
    url: absoluteUrl("/blog"),
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US",
    images: [blogOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `Writing | ${siteConfig.name}`,
    description: siteConfig.blogDescription,
    images: [blogOgImage],
  },
};

export default function BlogIndex() {
  const posts = getAllPostsMeta();
  const years = [...new Set(posts.map((p) => p.date.slice(0, 4)))];

  return (
    <SiteFrame
      currentPage="writing"
      footer={<SiteFooter />}
      tocExtra={years.map((year) => (
        <li key={year} className="sub">
          <a href={`#y${year}`}>{year}</a>
        </li>
      ))}
    >
      <header className="wrap page-head">
        <h1 className="page-title">Writing</h1>
        <div className="intro-grid">
          <div>
            <p className="page-intro">{siteConfig.blogDescription}</p>
            <div className="actions">
              <a className="btn" href={siteConfig.feedPath} type="application/rss+xml">
                <Rss size={14} aria-hidden="true" />
                Subscribe via RSS
              </a>
              <Link className="textlink" href="/#community">Free mentorship</Link>
            </div>
          </div>
        </div>
      </header>

      <div className="wrap">
        {posts.length === 0 ? (
          <p className="page-intro">No essays yet. Check back soon.</p>
        ) : (
          <EssayArchive posts={posts} topics={getTopics(posts)} />
        )}
      </div>
    </SiteFrame>
  );
}
