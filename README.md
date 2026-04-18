# ryan-mack.dev

Personal portfolio and writing site for Ryan Mack — Senior Software Engineer at Cisco ThousandEyes.

Built with Next.js (static export), Tailwind CSS v4, and framer-motion. Deployed to Azure Static Web Apps via GitHub Actions.

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
  resume/             # Resume page
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
  ThemeProvider.tsx   # Dark/light theme + localStorage persistence
  TextToSpeech.tsx    # Browser Speech API reader for blog posts
  BlogContent.tsx     # Markdown renderer for blog posts
content/
  posts/              # Blog posts as Markdown files
lib/
  posts.ts            # Blog post loading + metadata parsing
  useScrollAwareInView.ts
public/
  images/             # Static images (profile photo, company logos)
  resume/             # Resume PDF
```

## Development

```bash
npm install
npm run dev       # starts at http://localhost:3000
npm run build     # generates static output in /out
npm run lint      # ESLint
```

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

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `AZURE_STATIC_WEB_APPS_API_TOKEN_*` | Deploy only | Azure SWA deployment token |
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | Optional | Enables Umami analytics |

## CI/CD

Every PR runs:
- **Build** — `npm run build` (static export must succeed)
- **Lint** — ESLint
- **Lighthouse** — SEO ≥ 90, Accessibility ≥ 90, Best Practices ≥ 90, Performance reported (warn only). Results posted as a PR comment.

Merges to `main` deploy automatically to Azure Static Web Apps.

## Design system

- **Dark academia palette** — warm dark (`#100d09`) and warm parchment (`#faf7f2`)
- **Gold accent** — `#c9a465` (dark) / `#7a5c12` (light), 4.5:1+ contrast
- **Fonts** — Playfair Display for headings, Geist for body, Geist Mono for labels
- **Motion** — framer-motion scroll-triggered animations; all respect `prefers-reduced-motion`
- **Accessibility** — WCAG AA contrast throughout, ARIA labels, keyboard navigation, focus-visible styles
