import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";
import { ogImageSize } from "@/lib/og";

export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#14110d",
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
            background: "radial-gradient(circle, rgba(212,174,107,0.07) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            width: "48px",
            height: "3px",
            background: "#d4ae6b",
            marginBottom: "40px",
            borderRadius: "2px",
          }}
        />

        <div
          style={{
            fontSize: "86px",
            fontWeight: "700",
            color: "#eee7da",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            marginBottom: "20px",
          }}
        >
          {siteConfig.name}
        </div>

        <div
          style={{
            fontSize: "30px",
            color: "#a39985",
            marginBottom: "12px",
            letterSpacing: "0.01em",
            fontWeight: "400",
          }}
        >
          {siteConfig.jobTitle}
        </div>

        <div
          style={{
            fontSize: "22px",
            color: "#d4ae6b",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontFamily: "monospace",
            fontWeight: "400",
          }}
        >
          {siteConfig.employer}
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
            background: "linear-gradient(to right, transparent, rgba(212,174,107,0.4), transparent)",
          }}
        />
      </div>
    ),
    ogImageSize
  );
}
