import Link from "next/link";
import type { Metadata } from "next";
import SiteFrame from "@/components/SiteFrame";
import { SiteFooter } from "@/components/Footer";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `Page not found | ${siteConfig.name}`,
};

export default function NotFound() {
  return (
    <SiteFrame footer={<SiteFooter />}>
      <header className="wrap page-head">
        <h1 className="page-title">Not found</h1>
        <div className="intro-grid">
          <div>
            <p className="page-intro">This page doesn&rsquo;t exist, or it may have moved.</p>
            <div className="actions">
              <Link className="btn solid" href="/">
                Go home
              </Link>
              <Link className="textlink" href="/blog">Read the essays</Link>
            </div>
          </div>
        </div>
      </header>
    </SiteFrame>
  );
}
