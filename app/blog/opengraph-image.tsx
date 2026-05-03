import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";
export const alt = `Writing — ${siteConfig.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#100d09",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px 96px",
          fontFamily: "Georgia, 'Times New Roman', serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(201,164,101,0.07) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            width: "48px",
            height: "3px",
            background: "#c9a465",
            marginBottom: "40px",
            borderRadius: "2px",
          }}
        />

        <div
          style={{
            fontSize: "22px",
            letterSpacing: "0.26em",
            textTransform: "uppercase",
            color: "#c9a465",
            fontFamily: "monospace",
            marginBottom: "28px",
          }}
        >
          Writing
        </div>

        <div
          style={{
            fontSize: "72px",
            fontWeight: "700",
            color: "#ede8df",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            marginBottom: "24px",
          }}
        >
          Thoughts &amp; perspectives
        </div>

        <div
          style={{
            fontSize: "26px",
            color: "#a8a090",
            lineHeight: 1.45,
            maxWidth: "820px",
          }}
        >
          On software, technology, and whatever else is worth putting into words.
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "48px",
            right: "96px",
            fontSize: "18px",
            color: "#5a5248",
            fontFamily: "monospace",
            letterSpacing: "0.05em",
          }}
        >
          {siteConfig.domain}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            right: "0",
            height: "3px",
            background: "linear-gradient(to right, transparent, rgba(201,164,101,0.4), transparent)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
