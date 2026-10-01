# ryan-mack.dev

[![CI](https://github.com/kamoras/PersonalSite/actions/workflows/azure-static-web-apps-calm-cliff-026fb3d10.yml/badge.svg)](https://github.com/kamoras/PersonalSite/actions/workflows/azure-static-web-apps-calm-cliff-026fb3d10.yml)
[![Lighthouse Accessibility](https://img.shields.io/badge/Lighthouse-Accessibility%20100-brightgreen?logo=lighthouse)](https://www.ryan-mack.dev)
[![Lighthouse SEO](https://img.shields.io/badge/Lighthouse-SEO%20100-brightgreen?logo=lighthouse)](https://www.ryan-mack.dev)
[![Lighthouse Best Practices](https://img.shields.io/badge/Lighthouse-Best%20Practices%2096-brightgreen?logo=lighthouse)](https://www.ryan-mack.dev)

Personal portfolio and writing site for Ryan Mack — Senior Software Engineer at Cisco ThousandEyes.

Built with Next.js static export and Tailwind CSS v4. Deployed to Azure Static Web Apps via GitHub Actions.

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, `output: "export"`) |
| Styling | Tailwind CSS v4 |
| Motion | CSS transitions + one IntersectionObserver (no animation library) |
| Icons | lucide-react |
| Blog | Markdown → unified/remark/rehype pipeline |
| Fonts | Fraunces, Newsreader, Geist Mono (via `next/font/google`) |
| Analytics | Umami (self-hosted, opt-in via env var) |
| Hosting | Azure Static Web Apps |
| CI/CD | GitHub Actions |

## Project structure

```
app/                  # Next.js App Router pages and layouts
  blog/               # Blog index + dynamic [slug] pages
  layout.tsx          # Root layout (fonts, metadata, theme init script)
  page.tsx            # Homepage (assembles all sections)
  og.png/             # Social card image route handlers (also under blog/ and blog/[slug]/)
  globals.css         # Design tokens, base styles, animations
components/           # React components
  SiteFrame.tsx       # Shared frame: rail (≥1200px) or top bar + mobile Contents sheet
  TopBar.tsx          # Top bar and Contents sheet (<1200px): a native <details>, so it opens without JS
  SiteToc.tsx         # Site contents (rail + sheet)
  SkipLink.tsx        # Skip to main content
  ElsewhereLinks.tsx  # Résumé, RSS and social links in the rail and sheet
  HashScrollHandler.tsx # Scrolls to a section after client navigation to /#section
  SectionTracker.tsx  # aria-current for the section being read; essay progress line
  RevealObserver.tsx  # Rows ease in once on scroll (reduced-motion safe, CSS failsafe if JS never loads)
  SectionHead.tsx     # Homepage section heading
  Hero.tsx About.tsx Experience.tsx Publications.tsx Projects.tsx
  LatestWriting.tsx Community.tsx Footer.tsx
  EssayArchive.tsx    # Blog index: essays grouped by year (server-rendered)
  TopicFilter.tsx     # Topic chips synced to ?topic=, hides non-matching essays
  ArticleBody.tsx     # Essay body: margin sidenotes / inline notes
  ListenButton.tsx    # Text-to-speech control (shared controller in lib/speech.ts)
  CountUp.tsx BookingLink.tsx CopyLink.tsx ThemeToggle.tsx PrideFlag.tsx
  ThemeProvider.tsx   # Dark/light theme + system preference support
  GiscusComments.tsx  # GitHub Discussions-backed comments (giscus)
content/
  posts/              # Blog posts as Markdown files
lib/
  posts.ts            # Blog post loading, frontmatter validation, related posts
  site.ts             # Site metadata, profile links, canonical URLs (www host)
  og.ts               # Shared social image size + metadata helper
  socials.tsx         # Canonical social profile list (rail, sheet, footers)
  nav.ts              # Homepage sections, shared by the rail and menus
  speech.ts           # Web Speech reader shared by Listen buttons
  format.ts           # Date formatting (safe for client components)
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
pullquote: "Optional: one sentence quoted verbatim from the post."
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
- **Smoke** — validates the exported homepage, blog, resume PDF + redirect, RSS feed, `.png` social images, and in-page footnote links
- **Lint** — ESLint
- **Lighthouse** — SEO ≥ 90, Accessibility ≥ 90, Best Practices ≥ 90, Performance reported (warn only). Results posted as a PR comment.

Merges to `main` deploy automatically to Azure Static Web Apps.

## Design system

"Marginalia" — an annotated manuscript: a contents rail, a main column, and a margin that holds notes, pull quotes and essay sidenotes.

- **Palette** — near-black `#14110d` / parchment `#f5efe3`, candlelight gold `#d4ae6b` / `#7a5712`. Every text token is measured against WCAG AA in both themes (values are annotated in `globals.css`); status green `#34d399` / `#036a4d` is only used with a text label.
- **Type** — Fraunces (display), Newsreader (reading text), Geist Mono (labels).
- **Grid** — rail 15–17rem, margin 15–22rem, 900/1200/1600px breakpoints; below 1200px a Contents sheet replaces the rail; below 900px the margin folds inline.
- **Motion** — rows ease in once; the surname shimmers once on load and the current-status dots pulse twice; nothing loops, so all motion stops within 5s (WCAG 2.2.2). Everything is removed under `prefers-reduced-motion`.
- **Accessibility** — AA contrast, visible focus rings, targets of at least 24px (44px for primary controls), landmarks and `aria-current` in the contents, sidenotes duplicated in an accessible Notes list.
