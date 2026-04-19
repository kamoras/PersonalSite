import Image from "next/image";
import { ArrowDown, ArrowRight, Mail, MapPin } from "lucide-react";
import { Github, Linkedin } from "./BrandIcons";
import { heroContent } from "@/lib/portfolio";
import { mailtoUrl, siteConfig } from "@/lib/site";

export default function Hero() {
  const [firstName, ...restName] = siteConfig.name.split(" ");
  const highlightedName = restName.join(" ") || firstName;

  return (
    <section
      aria-label="Introduction"
      className="relative min-h-screen overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/4 h-[420px] w-[420px] rounded-full opacity-[0.06] blur-3xl"
        style={{ background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)" }}
      />
      <div
        aria-hidden="true"
        className="absolute right-0 top-1/3 h-[360px] w-[360px] rounded-full opacity-[0.06] blur-3xl"
        style={{ background: "radial-gradient(circle, #c9a465 0%, transparent 70%)" }}
      />

      <div
        className="relative mx-auto flex min-h-screen max-w-6xl items-center px-6 pb-16"
        style={{ paddingTop: "calc(6rem + env(safe-area-inset-top, 0px))" }}
      >
        <div className="grid w-full gap-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,360px)] lg:items-center">
          <div className="text-center lg:text-left">
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.35em] text-[var(--color-gold)]">
              {heroContent.eyebrow}
            </p>

            <h1 className="mb-6 font-playfair text-5xl font-semibold leading-none tracking-tight sm:text-6xl lg:text-8xl">
              {firstName} <span className="gradient-name font-bold">{highlightedName}</span>
            </h1>

            <div className="mb-6 flex flex-wrap items-center justify-center gap-2 text-sm text-[var(--text-muted)] lg:justify-start">
              <MapPin size={14} aria-hidden="true" />
              <span>{heroContent.location}</span>
            </div>

            <p className="mb-5 max-w-3xl text-balance font-playfair text-2xl italic leading-relaxed text-[var(--text-secondary)] sm:text-3xl">
              {heroContent.intro}
            </p>

            <p className="mb-8 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
              {heroContent.detail}
            </p>

            <ul className="mb-10 flex flex-wrap justify-center gap-2 lg:justify-start">
              {heroContent.proofPoints.map((point) => (
                <li
                  key={point}
                  className="rounded-full border border-[var(--color-card-border)] bg-[var(--color-card-bg)] px-3 py-1.5 font-mono text-xs text-[var(--text-muted)]"
                >
                  {point}
                </li>
              ))}
            </ul>

            <div className="mb-10 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <a
                href="#experience"
                className="inline-flex items-center gap-2 rounded-lg bg-[#c9a465] px-6 py-3 text-sm font-semibold text-[#100d09] transition-colors hover:bg-[#d4b870]"
              >
                Review Experience
                <ArrowRight size={15} aria-hidden="true" />
              </a>
              <a
                href={mailtoUrl()}
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-card-border)] px-6 py-3 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
              >
                <Mail size={15} aria-hidden="true" />
                Start a conversation
              </a>
              <a
                href={siteConfig.resumePagePath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-card-border)] px-6 py-3 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
              >
                View resume
              </a>
            </div>

            <div className="mb-10 flex items-center justify-center gap-1 lg:justify-start">
              {[
                {
                  href: siteConfig.links.github,
                  icon: Github,
                  label: "GitHub profile (opens in new tab)",
                },
                {
                  href: siteConfig.links.linkedin,
                  icon: Linkedin,
                  label: "LinkedIn profile (opens in new tab)",
                },
                { href: mailtoUrl(), icon: Mail, label: "Send email" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={href}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="rounded-md p-2.5 text-[var(--text-muted)] transition-colors hover:text-[var(--color-gold)]"
                >
                  <Icon size={18} aria-hidden="true" />
                </a>
              ))}
            </div>

            <dl className="grid gap-4 border-t border-[var(--color-card-border)] pt-8 sm:grid-cols-3">
              {heroContent.stats.map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <dt className="font-mono text-xs tracking-wide text-[var(--text-muted)]">
                    {stat.label}
                  </dt>
                  <dd className="mt-2 font-mono text-2xl font-bold tracking-tight text-[var(--color-fg)]">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <aside className="mx-auto w-full max-w-sm">
            <div className="relative rounded-[28px] border border-[rgba(201,164,101,0.25)] bg-[var(--color-card-bg)] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.22)]">
              <div
                aria-hidden="true"
                className="absolute inset-x-10 -top-10 h-20 rounded-full blur-3xl"
                style={{ background: "radial-gradient(circle, rgba(201,164,101,0.18) 0%, transparent 70%)" }}
              />
              <div className="relative overflow-hidden rounded-[22px] border border-[var(--color-card-border)]">
                <Image
                  src="/images/ryan.jpg"
                  alt="Ryan Mack"
                  width={720}
                  height={900}
                  priority
                  className="aspect-[4/5] w-full object-cover object-top"
                />
              </div>
              <div className="mt-5 rounded-2xl border border-[var(--color-card-border)] bg-black/10 p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--color-gold)]">
                  Current focus
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                  Shipping platform support, operating-system expansion, and maintainable agent runtime work for enterprise observability customers.
                </p>
              </div>
            </div>
          </aside>
        </div>

        <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[var(--text-muted)]">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <ArrowDown size={12} className="animate-bounce" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
