import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
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
        <main id="main-content">{children}</main>
        <Footer />
      </div>
      <BackToTop />
    </>
  );
}
