import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import SkipLink from "@/components/SkipLink";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SkipLink />
      <div className="min-h-screen">
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </div>
      <BackToTop />
    </>
  );
}
