import { ImageResponse } from "next/og";
import { getAllPostSlugs, getPost } from "@/lib/posts";
import { siteConfig } from "@/lib/site";
import { ogImageSize } from "@/lib/og";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = await getPost(slug);

  return new ImageResponse(
    (
      <div
        style={{
          background: "#14110d",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 88px",
          color: "#eee7da",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at top right, rgba(212,174,107,0.16), transparent 35%), radial-gradient(circle at left center, rgba(212,174,107,0.06), transparent 30%)",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: "20px", position: "relative" }}>
          <div
            style={{
              fontSize: "18px",
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              color: "#d4ae6b",
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
              color: "#a39985",
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
                background: "#d4ae6b",
              }}
            />
            <div style={{ fontSize: "22px", color: "#eee7da" }}>{siteConfig.name}</div>
          </div>
          <div
            style={{
              fontSize: "18px",
              letterSpacing: "0.08em",
              fontFamily: "monospace",
              color: "#a39985",
            }}
          >
            {siteConfig.domain}
          </div>
        </div>
      </div>
    ),
    ogImageSize
  );
}
