"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#14110d",
          color: "#eee7da",
          fontFamily: "Georgia, serif",
          padding: "1.5rem",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: "28rem" }}>
          <p
            style={{
              fontFamily: "monospace",
              fontSize: "0.75rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#d4ae6b",
              marginBottom: "1.25rem",
            }}
          >
            Error
          </p>
          <h1
            style={{
              fontSize: "2.25rem",
              fontWeight: 300,
              letterSpacing: "-0.025em",
              margin: "0 0 1rem",
            }}
          >
            Something went <strong style={{ fontWeight: 600 }}>wrong</strong>
          </h1>
          <p
            style={{
              color: "#a39985",
              fontSize: "1rem",
              lineHeight: 1.625,
              margin: "0 0 2rem",
            }}
          >
            An unexpected error occurred. You can try again or return home.
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <button
              onClick={reset}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1.5rem",
                backgroundColor: "#d4ae6b",
                color: "#14110d",
                border: "none",
                borderRadius: "0.5rem",
                fontSize: "0.875rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Try again
            </button>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- global-error replaces root layout; Link is unavailable here */}
            <a
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1.5rem",
                borderRadius: "0.5rem",
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "#a39985",
                border: "1px solid rgba(238,231,218,0.5)",
                textDecoration: "none",
              }}
            >
              Go home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
