"use client";

import { useEffect, useRef, useState } from "react";
import { Link2 } from "lucide-react";

export default function CopyLink({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      return;
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1800);
  };

  return (
    <>
      <button type="button" className="copy-link" onClick={copy}>
        <Link2 size={15} aria-hidden="true" />
        {copied ? "Copied" : "Copy link"}
      </button>
      <span className="sr-only" aria-live="polite">{copied ? "Link copied to clipboard" : ""}</span>
    </>
  );
}
