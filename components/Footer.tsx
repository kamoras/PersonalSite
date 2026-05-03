"use client";

import { Mail, FileText } from "lucide-react";
import { Github, Linkedin, Bluesky, Instagram } from "./BrandIcons";
import { useTheme } from "./ThemeProvider";
import { mailtoUrl, siteConfig } from "@/lib/site";
import NewsletterSignup from "./NewsletterSignup";

const social = [
  { href: siteConfig.links.github, icon: Github, label: "GitHub profile (opens in new tab)", external: true },
  { href: siteConfig.links.linkedin, icon: Linkedin, label: "LinkedIn profile (opens in new tab)", external: true },
  { href: siteConfig.links.bluesky, icon: Bluesky, label: "Bluesky profile (opens in new tab)", external: true },
  { href: siteConfig.links.instagram, icon: Instagram, label: "Instagram profile (opens in new tab)", external: true },
  { href: mailtoUrl(), icon: Mail, label: "Send email", external: false },
  { href: siteConfig.resumeDocumentPath, icon: FileText, label: "View resume PDF (opens in new tab)", external: true },
];

export default function Footer() {
  const { theme } = useTheme();
  const borderColor = theme === "dark" ? "border-white/[0.08]" : "border-black/[0.08]";

  return (
    <footer id="contact" className="relative overflow-hidden">
      {/* Ambient top glow */}
      <div aria-hidden="true" className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-[rgba(201,164,101,0.35)] to-transparent" />
      <div aria-hidden="true" className="absolute -top-16 left-1/2 -translate-x-1/2 w-[500px] h-48 rounded-full pointer-events-none blur-3xl" style={{ background: "radial-gradient(circle, rgba(201,164,101,0.06) 0%, transparent 70%)" }} />

      <div className={`border-t ${borderColor} relative`}>
        <div className="max-w-6xl mx-auto px-6 pt-20 pb-12">

          {/* CTA block — centered */}
          <div className="text-center mb-16">
            <p aria-hidden="true" className="font-mono text-xs tracking-[0.3em] uppercase text-[var(--color-gold)] mb-5">
              06 — Contact
            </p>
            <h2 className="font-playfair text-4xl md:text-5xl font-light tracking-tight mb-4">
              Let&apos;s <span className="font-semibold">connect</span>
            </h2>
            <p className="text-[var(--text-secondary)] text-base max-w-sm mx-auto mb-8 leading-relaxed">
              Open to conversations, collaborations, and the right opportunities.
            </p>
            <a
              href={mailtoUrl()}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#c9a465] hover:bg-[#d4b870] text-[#100d09] rounded-lg text-sm font-semibold transition-colors"
            >
              <Mail size={15} aria-hidden="true" />
              Send a message
            </a>
          </div>

          {/* Newsletter signup */}
          <div className={`max-w-sm mx-auto pb-10 border-b ${borderColor} mb-10`}>
            <NewsletterSignup variant="footer" />
          </div>

          {/* Social row */}
          <div className={`flex items-center justify-center gap-2 pb-10 border-b ${borderColor}`}>
            {social.map(({ href, icon: Icon, label, external }) => (
              <a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                className="p-3 rounded-lg text-[var(--text-muted)] hover:text-current transition-colors"
              >
                <Icon size={18} aria-hidden="true" />
              </a>
            ))}
          </div>

          {/* Wordmark / copyright */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-8">
            <p className="font-mono text-xs text-[var(--text-muted)]">
              © {new Date().getFullYear()} {siteConfig.name}
            </p>
            <p className="font-mono text-xs text-[var(--text-muted)]">
              {siteConfig.domain}
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
