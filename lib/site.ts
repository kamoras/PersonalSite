export const siteConfig = {
  name: "Ryan Mack",
  domain: "ryan-mack.dev",
  url: "https://ryan-mack.dev",
  description:
    "Software engineer at Cisco ThousandEyes. Writing about technology, engineering, and whatever else is worth thinking about.",
  blogDescription:
    "Writing about software, technology, and whatever else is worth putting into words.",
  email: "mack.ryanm@gmail.com",
  jobTitle: "Senior Software Engineer",
  employer: "Cisco ThousandEyes",
  resumePagePath: "/resume",
  resumeDocumentPath: "/documents/Ryan-M-Mack-Resume.pdf",
  opengraphImagePath: "/opengraph-image.png",
  links: {
    github: "https://github.com/kamoras",
    linkedin: "https://www.linkedin.com/in/ryan-mack",
    bluesky: "https://bsky.app/profile/ryan-mack.dev",
    instagram: "https://www.instagram.com/kamoras95/",
    calendly: "https://calendly.com/ryan-m-mack",
  },
} as const;

export function absoluteUrl(path = ""): string {
  return new URL(path, siteConfig.url).toString();
}

export function mailtoUrl(email = siteConfig.email): string {
  return `mailto:${email}`;
}
