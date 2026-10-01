import type { ComponentType, SVGProps } from "react";
import { Github, Linkedin, Bluesky, Instagram } from "@/components/BrandIcons";
import { siteConfig } from "@/lib/site";

export type SocialLink = {
  key: string;
  name: string;
  handle: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;
};

// Single source of truth for the social profiles, rendered in the rail, the
// mobile contents sheet and the footers so the set never drifts.
// Email lives separately as the dedicated contact action, not a profile.
export const socialLinks: SocialLink[] = [
  { key: "github", name: "GitHub", handle: "kamoras", href: siteConfig.links.github, icon: Github },
  { key: "linkedin", name: "LinkedIn", handle: "ryan-mack", href: siteConfig.links.linkedin, icon: Linkedin },
  { key: "bluesky", name: "Bluesky", handle: "@ryan-mack.dev", href: siteConfig.links.bluesky, icon: Bluesky },
  { key: "instagram", name: "Instagram", handle: "kamoras95", href: siteConfig.links.instagram, icon: Instagram },
];
