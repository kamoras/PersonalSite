"use client";

import { useState, FormEvent, useId } from "react";

type Variant = "post" | "index" | "footer";
type Status = "idle" | "loading" | "success" | "error";

interface Props {
  variant?: Variant;
}

export default function NewsletterSignup({ variant = "post" }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const inputId = useId();
  const headingId = useId();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading" || status === "success") return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const apiKey = process.env.NEXT_PUBLIC_BUTTONDOWN_API_KEY;
      if (!apiKey) {
        setErrorMessage("Newsletter signup is currently unavailable.");
        setStatus("error");
        return;
      }

      const res = await fetch("https://api.buttondown.email/v1/subscribers", {
        method: "POST",
        headers: {
          Authorization: `Token ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email_address: email }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        const data: Record<string, unknown> = await res.json().catch(() => ({}));
        const detail = typeof data?.detail === "string" ? data.detail : "";
        if (res.status === 409 || detail.toLowerCase().includes("already")) {
          setErrorMessage("You’re already subscribed — thanks!");
        } else {
          setErrorMessage("Something went wrong. Please try again.");
        }
        setStatus("error");
      }
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  const isDisabled = status === "loading" || status === "success";

  if (variant === "footer") {
    return (
      <div>
        <p className="text-sm text-[var(--text-secondary)] mb-3">
          Get new posts in your inbox
        </p>
        <form
          onSubmit={handleSubmit}
          aria-label="Newsletter signup"
          className="flex gap-2"
        >
          <input
            id={inputId}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            autoComplete="email"
            disabled={isDisabled}
            aria-label="Email address"
            className="flex-1 min-w-0 px-3 py-2 text-sm rounded-lg border border-[var(--color-card-border)] bg-[var(--color-card-bg)] text-[var(--color-fg)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={isDisabled}
            aria-label={
              status === "loading"
                ? "Subscribing"
                : status === "success"
                  ? "Subscribed"
                  : "Subscribe to newsletter"
            }
            className="shrink-0 px-4 py-2 text-sm font-semibold rounded-lg disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ backgroundColor: "var(--color-gold)", color: "var(--color-bg)" }}
          >
            {status === "loading" ? "Subscribing…" : status === "success" ? "Done!" : "Subscribe"}
          </button>
        </form>
        <div role="status" aria-live="polite" className="mt-2 text-xs min-h-[1rem]">
          {status === "success" && (
            <span className="text-[var(--color-gold)]">You&apos;re in — thank you!</span>
          )}
          {status === "error" && (
            <span className="text-[var(--color-error)]">{errorMessage}</span>
          )}
        </div>
      </div>
    );
  }

  return (
    <section
      aria-labelledby={headingId}
      className="mt-16 pt-10 border-t border-[var(--color-card-border)]"
    >
      <h2
        id={headingId}
        className="font-playfair text-xl font-semibold mb-2"
      >
        Get new posts in your inbox
      </h2>
      <p className="text-sm text-[var(--text-secondary)] mb-5">
        No spam. Just writing, when there&apos;s something worth sharing.
      </p>
      <form
        onSubmit={handleSubmit}
        aria-label="Newsletter signup"
        className="flex flex-col sm:flex-row gap-3"
      >
        <label htmlFor={inputId} className="sr-only">
          Email address
        </label>
        <input
          id={inputId}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          autoComplete="email"
          disabled={isDisabled}
          className="flex-1 px-4 py-2.5 text-sm rounded-lg border border-[var(--color-card-border)] bg-[var(--color-card-bg)] text-[var(--color-fg)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={isDisabled}
          className="sm:shrink-0 px-5 py-2.5 text-sm font-semibold rounded-lg disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ backgroundColor: "var(--color-gold)", color: "var(--color-bg)" }}
        >
          {status === "loading" ? "Subscribing…" : status === "success" ? "Subscribed!" : "Subscribe"}
        </button>
      </form>
      <div role="status" aria-live="polite" className="mt-3 text-sm min-h-[1.25rem]">
        {status === "success" && (
          <span className="text-[var(--color-gold)]">
            You&apos;re in — thank you for subscribing!
          </span>
        )}
        {status === "error" && (
          <span className="text-[var(--color-error)]">{errorMessage}</span>
        )}
      </div>
    </section>
  );
}
