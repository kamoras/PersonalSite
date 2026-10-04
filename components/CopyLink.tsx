"use client";

import { useEffect, useRef, useState } from "react";
import { Link2 } from "lucide-react";

export default function CopyLink({ url }: { url: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const copy = async () => {
    let next: "copied" | "failed" = "copied";
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      next = "failed";
    }
    setStatus(next);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("idle"), next === "failed" ? 4000 : 1800);
  };

  return (
    <>
      <button type="button" className="copy-link" onClick={copy}>
        <Link2 size={15} aria-hidden="true" />
        {status === "copied" ? "Copied" : status === "failed" ? "Couldn\u2019t copy" : "Copy link"}
      </button>
      <span className="sr-only" aria-live="polite">
        {status === "copied"
          ? "Link copied to clipboard"
          : status === "failed"
            ? "Couldn\u2019t copy the link. It\u2019s in the address bar."
            : ""}
      </span>
    </>
  );
}
