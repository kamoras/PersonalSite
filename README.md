# ryan-mack.dev

[![CI](https://github.com/kamoras/PersonalSite/actions/workflows/azure-static-web-apps-calm-cliff-026fb3d10.yml/badge.svg)](https://github.com/kamoras/PersonalSite/actions/workflows/azure-static-web-apps-calm-cliff-026fb3d10.yml)
[![Lighthouse Accessibility](https://img.shields.io/badge/Lighthouse-Accessibility%20100-brightgreen?logo=lighthouse)](https://ryan-mack.dev)
[![Lighthouse SEO](https://img.shields.io/badge/Lighthouse-SEO%20100-brightgreen?logo=lighthouse)](https://ryan-mack.dev)
[![Lighthouse Best Practices](https://img.shields.io/badge/Lighthouse-Best%20Practices%2096-brightgreen?logo=lighthouse)](https://ryan-mack.dev)

Personal portfolio and writing site for Ryan Mack — Senior Software Engineer at Cisco ThousandEyes.

Built with Next.js static export and Tailwind CSS v4. Deployed to Azure Static Web Apps via GitHub Actions.

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, `output: "export"`) |
| Styling | Tailwind CSS v4 |
| Animation | framer-motion |
| Icons | lucide-react |
| Blog | Markdown → unified/remark/rehype pipeline |
| Fonts | Geist Sans, Geist Mono, Playfair Display (via `next/font/google`) |
| Analytics | Umami (self-hosted, opt-in via env var) |
| Hosting | Azure Static Web Apps |
| CI/CD | GitHub Actions |

## Project structure

```
app/                  # Next.js App Router pages and layouts
  blog/               # Blog index + dynamic [slug] pages
  layout.tsx          # Root layout (fonts, metadata, theme-color)
  page.tsx            # Homepage (assembles all sections)
  globals.css         # Design tokens, base styles, animations
components/           # React components (one per section/feature)
  Navbar.tsx
  Hero.tsx
  About.tsx
  Experience.tsx
  Publications.tsx
  Projects.tsx
  Community.tsx
  Footer.tsx
  ThemeProvider.tsx   # Dark/light theme + system preference support
  TextToSpeech.tsx    # Browser Speech API reader for blog posts
  BlogContent.tsx     # Markdown renderer for blog posts
  GiscusComments.tsx  # GitHub Discussions-backed comments (giscus)
content/
  posts/              # Blog posts as Markdown files
lib/
  posts.ts            # Blog post loading, frontmatter validation, related posts
  site.ts             # Site metadata, profile links, canonical URLs
  useScrollAwareInView.ts
  theme.ts            # Shared theme constants + pre-paint init script
public/
  apple-touch-icon.png
  favicon.png
  images/             # Static images (profile photo, company logos)
  documents/          # Resume PDF and other downloadable assets
scripts/
  generate-feed.mjs   # RSS feed generation before build
  smoke-check.mjs     # Static export smoke checks
```

## Development

```bash
nvm use        # or install Node 22 first
npm install
npm run dev       # starts at http://localhost:3000
npm run build     # generates static output in /out
npm run lint      # ESLint
npm run smoke     # validate the exported site in /out
```

`npm run build` runs RSS feed generation automatically before the Next.js build.
The project expects Node 20.9+; the checked-in `.nvmrc` tracks the CI runtime (`22`).

## Writing a blog post

Add a Markdown file to `content/posts/`. Required frontmatter:

```markdown
---
title: "Post title"
date: "YYYY-MM-DD"
description: "One-sentence summary shown in the index and OG tags."
tags: ["tag1", "tag2"]
---

Post body here.
```

The slug is derived from the filename. Reading time is computed automatically.
Invalid or incomplete frontmatter fails fast during build-time content loading with a descriptive error.

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `AZURE_STATIC_WEB_APPS_API_TOKEN_*` | Deploy only | Azure SWA deployment token |
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | Optional | Enables Umami analytics |

## CI/CD

Every PR runs:
- **Build** — `npm run build` (static export must succeed)
- **Smoke** — validates the exported homepage, blog, resume PDF + redirect, and RSS feed
- **Lint** — ESLint
- **Lighthouse** — SEO ≥ 90, Accessibility ≥ 90, Best Practices ≥ 90, Performance reported (warn only). Results posted as a PR comment.

Merges to `main` deploy automatically to Azure Static Web Apps.

## Design system

- **Dark academia palette** — warm dark (`#100d09`) and warm parchment (`#faf7f2`)
- **Gold accent** — `#c9a465` (dark) / `#7a5c12` (light), 4.5:1+ contrast
- **Fonts** — Playfair Display for headings, Geist for body, Geist Mono for labels
- **Motion** — framer-motion animations respect `prefers-reduced-motion`
- **Accessibility** — WCAG AA contrast throughout, ARIA labels, keyboard navigation, focus-visible styles
