import type { ComponentType, SVGProps } from "react";
import { Github, Linkedin, Bluesky, Instagram } from "@/components/BrandIcons";
import { siteConfig } from "@/lib/site";

export type SocialLink = {
  key: string;
  href: string;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;
};

// Single source of truth for the social profile icons. Rendered identically in
// the hero, navbar (desktop + mobile), and footer so the set never drifts.
// Email lives separately as the dedicated contact action, not a profile.
export const socialLinks: SocialLink[] = [
  { key: "github", href: siteConfig.links.github, label: "GitHub profile (opens in new tab)", icon: Github },
  { key: "linkedin", href: siteConfig.links.linkedin, label: "LinkedIn profile (opens in new tab)", icon: Linkedin },
  { key: "bluesky", href: siteConfig.links.bluesky, label: "Bluesky profile (opens in new tab)", icon: Bluesky },
  { key: "instagram", href: siteConfig.links.instagram, label: "Instagram profile (opens in new tab)", icon: Instagram },
];
