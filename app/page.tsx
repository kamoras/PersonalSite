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
      {/* Skip-to-content link: visually hidden until focused by keyboard */}
      <a
        href="#main-content"
        className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-[100] focus-visible:px-4 focus-visible:py-2 focus-visible:bg-[#c9a465] focus-visible:text-[#100d09] focus-visible:rounded-lg focus-visible:text-sm focus-visible:font-medium"
      >
        Skip to main content
      </a>
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
