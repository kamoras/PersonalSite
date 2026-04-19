import { ImageResponse } from "next/og";
import { getPost } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";
export const alt = `${siteConfig.name} article card`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  return new ImageResponse(
    (
      <div
        style={{
          background: "#100d09",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 88px",
          color: "#ede8df",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at top right, rgba(201,164,101,0.16), transparent 35%), radial-gradient(circle at left center, rgba(59,130,246,0.12), transparent 30%)",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: "20px", position: "relative" }}>
          <div
            style={{
              fontSize: "18px",
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              color: "#c9a465",
              fontFamily: "monospace",
            }}
          >
            Writing
          </div>
          <div
            style={{
              fontSize: "64px",
              lineHeight: 1.08,
              fontWeight: 700,
              maxWidth: "980px",
            }}
          >
            {post.title}
          </div>
          <div
            style={{
              fontSize: "26px",
              lineHeight: 1.45,
              color: "#a8a090",
              maxWidth: "920px",
            }}
          >
            {post.description}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "relative",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: "28px",
          }}
        >
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "999px",
                background: "#c9a465",
              }}
            />
            <div style={{ fontSize: "22px", color: "#ede8df" }}>{siteConfig.name}</div>
          </div>
          <div
            style={{
              fontSize: "18px",
              letterSpacing: "0.08em",
              fontFamily: "monospace",
              color: "#8a8275",
            }}
          >
            {siteConfig.domain}
          </div>
        </div>
      </div>
    ),
    size
  );
}
