import type { Metadata } from "next";
import SiteFrame from "@/components/SiteFrame";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Publications from "@/components/Publications";
import Projects from "@/components/Projects";
import LatestWriting from "@/components/LatestWriting";
import Community from "@/components/Community";
import { ContactFooter } from "@/components/Footer";
import HashScrollHandler from "@/components/HashScrollHandler";
import { getAllPostsMeta } from "@/lib/posts";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  alternates: {
    canonical: absoluteUrl(),
    types: { "application/rss+xml": absoluteUrl(siteConfig.feedPath) },
  },
};

export default function Home() {
  const posts = getAllPostsMeta().slice(0, 4);

  return (
    <SiteFrame onHome footer={<ContactFooter />}>
      <Hero />
      <About />
      <Experience />
      <Publications />
      <Projects />
      {posts.length > 0 && <LatestWriting posts={posts} />}
      <Community />
      <HashScrollHandler />
    </SiteFrame>
  );
}
