import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Display serif — used for h1/h2 headings only
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ryan Mack — Senior Software Engineer",
  description:
    "Senior Software Engineer at Cisco ThousandEyes. Technical leadership in distributed systems, cloud infrastructure, and enterprise software.",
  keywords: ["software engineer", "technical leadership", "Cisco ThousandEyes", "distributed systems"],
  authors: [{ name: "Ryan Mack" }],
  openGraph: {
    title: "Ryan Mack — Senior Software Engineer",
    description: "Senior Software Engineer at Cisco ThousandEyes. Technical leadership in distributed systems, cloud infrastructure, and enterprise software.",
    url: "https://ryan-mack.dev",
    siteName: "Ryan Mack",
    type: "profile",
  },
  twitter: {
    card: "summary",
    title: "Ryan Mack — Senior Software Engineer",
    description: "Senior Software Engineer at Cisco ThousandEyes.",
  },
  metadataBase: new URL("https://ryan-mack.dev"),
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ryan Mack",
  jobTitle: "Senior Software Engineer",
  worksFor: {
    "@type": "Organization",
    name: "Cisco ThousandEyes",
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
  url: "https://ryan-mack.dev",
  email: "mack.ryanm@gmail.com",
  sameAs: [
    "https://github.com/kamoras",
    "https://www.linkedin.com/in/ryan-mack",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
