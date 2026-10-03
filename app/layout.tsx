import type { Metadata, Viewport } from "next";
import { Fraunces, Geist_Mono, Newsreader } from "next/font/google";
import Script from "next/script";
import ThemeProvider from "@/components/ThemeProvider";
import { serializeJsonLd, siteConfig } from "@/lib/site";
import { themeInitializationScript } from "@/lib/theme";
import { ogImage } from "@/lib/og";
import "./globals.css";

// Display serif. The opsz axis keeps strokes sturdy from 18px headings up to
// the poster-size name. The SOFT and WONK axes are left out: together they
// roughly double the font files for a barely visible difference.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

// Labels only, so it isn't worth a preload competing with the text that
// becomes the largest paint.
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

// theme-color is deliberately not set here: Next.js would emit one tag per
// color scheme and re-insert them on client navigation, overriding a manual
// theme toggle. The theme script and ThemeProvider own a single tag instead.
export const viewport: Viewport = {
  viewportFit: "cover",
};

const homeOgImage = ogImage("/og.png", `${siteConfig.name}, ${siteConfig.jobTitle} at ${siteConfig.employer}`);

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: ["software engineer", siteConfig.employer, "distributed systems", "engineering"],
  authors: [{ name: siteConfig.name }],
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", type: "image/png", sizes: "96x96" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US",
    images: [homeOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [homeOgImage],
  },
  metadataBase: new URL(siteConfig.url),
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  jobTitle: siteConfig.jobTitle,
  description: siteConfig.description,
  worksFor: {
    "@type": "Organization",
    name: siteConfig.employer,
  },
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "Georgia Institute of Technology",
      description: "M.S. Computer Science, Human-Computer Interaction",
    },
    {
      "@type": "CollegeOrUniversity",
      name: "University of Connecticut",
      description: "B.S.E. Computer Science and Engineering",
    },
  ],
  url: siteConfig.url,
  email: siteConfig.email,
  sameAs: [
    siteConfig.links.github,
    siteConfig.links.linkedin,
    siteConfig.links.bluesky,
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Font variables live on <html> because the design tokens that reference
    // them (--display, --serif, --mono) are defined on :root.
    <html lang="en" className={`${fraunces.variable} ${newsreader.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeInitializationScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
        />
        <ThemeProvider>{children}</ThemeProvider>
        {process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
          <Script
            defer
            src="https://cloud.umami.is/script.js"
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
