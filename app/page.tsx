import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Publications from "@/components/Publications";
import Projects from "@/components/Projects";
import Community from "@/components/Community";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import HashScrollHandler from "@/components/HashScrollHandler";
import { absoluteUrl } from "@/lib/site";
import SkipLink from "@/components/SkipLink";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl() },
};

const Divider = () => (
  <div aria-hidden="true" className="ornament-divider max-w-6xl mx-auto px-6 -mt-12 mb-0 text-lg select-none">
    ◆
  </div>
);

export default function Home() {
  return (
    <>
      <SkipLink />
      <div className="min-h-screen">
        <Navbar />
        <main id="main-content">
          <Hero />
          <About />
          <Divider />
          <Experience />
          <Divider />
          <Publications />
          <Divider />
          <Projects />
          <Divider />
          <Community />
        </main>
        <Footer />
      </div>
      <BackToTop />
      <HashScrollHandler />
    </>
  );
}
