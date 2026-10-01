"use client";

import { useEffect } from "react";
import Link from "next/link";
import SiteFrame from "@/components/SiteFrame";
import { SiteFooter } from "@/components/Footer";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <SiteFrame footer={<SiteFooter />}>
      <header className="wrap page-head">
        <h1 className="page-title">Something broke</h1>
        <div className="intro-grid">
          <div>
            <p className="page-intro">An unexpected error occurred. You can try again or return home.</p>
            <div className="actions">
              <button type="button" className="btn solid" onClick={reset}>
                Try again
              </button>
              <Link className="textlink" href="/">Go home</Link>
            </div>
          </div>
        </div>
      </header>
    </SiteFrame>
  );
}
