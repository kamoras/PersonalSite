export const siteConfig = {
  name: "Ryan Mack",
  domain: "ryan-mack.dev",
  // The apex domain 301-redirects to www (Squarespace DNS forwarding), so www
  // is the canonical host for canonical URLs, the sitemap, and social cards.
  url: "https://www.ryan-mack.dev",
  description:
    "Software engineer at Cisco ThousandEyes. Writing about technology, engineering, and whatever else is worth thinking about.",
  blogDescription:
    "Writing about software, technology, and whatever else is worth putting into words.",
  email: "mack.ryanm@gmail.com",
  jobTitle: "Senior Software Engineer",
  employer: "Cisco ThousandEyes",
  resumeDocumentPath: "/documents/Ryan-M-Mack-Resume.pdf",
  feedPath: "/feed.xml",
  links: {
    github: "https://github.com/kamoras",
    linkedin: "https://www.linkedin.com/in/ryan-mack",
    bluesky: "https://bsky.app/profile/ryan-mack.dev",
    instagram: "https://www.instagram.com/kamoras95/",
    calendly: "https://calendly.com/ryan-m-mack",
  },
} as const;

// JSON-LD is inlined in a <script>; escaping "<" keeps a title or description
// containing "</script>" from ending the block early.
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function absoluteUrl(path = ""): string {
  return new URL(path, siteConfig.url).toString();
}

export function mailtoUrl(email = siteConfig.email): string {
  return `mailto:${email}`;
}
