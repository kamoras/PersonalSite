import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Publications from "@/components/Publications";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";

export default function Home() {
  return (
    <ThemeProvider>
      {/* Skip-to-content link: visually hidden until focused by keyboard */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:text-sm focus:font-medium"
      >
        Skip to main content
      </a>
      <div className="min-h-screen">
        <Navbar />
        <main id="main-content">
          <Hero />
          <About />
          <div aria-hidden="true" className="ornament-divider max-w-6xl mx-auto px-6 -mt-12 mb-0 text-lg select-none">
            ◆
          </div>
          <Experience />
          <div aria-hidden="true" className="ornament-divider max-w-6xl mx-auto px-6 -mt-12 mb-0 text-lg select-none">
            ◆
          </div>
          <Publications />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
