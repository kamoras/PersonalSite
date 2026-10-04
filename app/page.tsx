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
import { absoluteUrl, serializeJsonLd, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  alternates: {
    canonical: absoluteUrl(),
    types: { "application/rss+xml": absoluteUrl(siteConfig.feedPath) },
  },
};

// Only on the homepage: it names the employer, which stays off the blog.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  jobTitle: siteConfig.jobTitle,
  description: siteConfig.description,
  worksFor: {
    "@type": "Organization",
    name: siteConfig.employer,
  },
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "Georgia Institute of Technology",
      description: "M.S. Computer Science, Human-Computer Interaction",
    },
    {
      "@type": "CollegeOrUniversity",
      name: "University of Connecticut",
      description: "B.S.E. Computer Science and Engineering",
    },
  ],
  url: siteConfig.url,
  email: siteConfig.email,
  sameAs: [
    siteConfig.links.github,
    siteConfig.links.linkedin,
    siteConfig.links.bluesky,
  ],
};

export default function Home() {
  const posts = getAllPostsMeta().slice(0, 4);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />
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
    </>
  );
}
