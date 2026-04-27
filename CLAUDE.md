# CLAUDE.md

Guidelines for working on ryan-mack.dev with Claude Code.

## Project overview

Personal portfolio and writing site — static Next.js export deployed to Azure Static Web Apps. Every change is visible to the public; quality matters.

## Commands

```bash
npm run dev      # development server (localhost:3000)
npm run build    # static export → /out (must pass before any PR)
npm run lint     # ESLint — must be clean
```

## Quality gates — these must pass before declaring work done

1. **Build passes** — `npm run build` completes without errors. This is non-negotiable; a broken build means a broken site.
2. **Lint is clean** — `npm run lint` with zero errors. No disabling lint rules without a documented reason in the code.
3. **No TypeScript errors** — the build catches these, but check explicitly if touching types.
4. **Accessibility preserved** — any new UI must have correct ARIA labels, keyboard navigation, and `aria-hidden` on decorative elements. Don't remove existing ARIA attributes.
5. **Contrast maintained** — text must meet WCAG AA (4.5:1). All current color tokens are verified; don't introduce new colors without checking contrast.
6. **`prefers-reduced-motion` respected** — all framer-motion animations check `useReducedMotion()` and skip or simplify when true.
7. **Mobile tested** — changes to layout, the navbar, or the safe area must account for iOS Safari behaviour (viewport-fit=cover, safe-area-inset-top, position:fixed quirks).

## Code conventions

- **No comments explaining what code does** — names do that. Only comment *why* something non-obvious is happening (a workaround, a hidden constraint, an iOS Safari bug).
- **No unused imports or variables** — ESLint enforces this; don't suppress it.
- **Client components only where necessary** — prefer server components. Mark `"use client"` only when you need browser APIs, hooks, or event handlers.
- **CSS variables for colors** — use `var(--color-gold)`, `var(--text-muted)`, etc. Don't hardcode hex values in components except where the design token doesn't exist and you add one to `globals.css`.
- **Tailwind for layout, CSS variables for theme** — don't fight the system.

## Blog posts

New posts go in `content/posts/` as Markdown with required frontmatter: `title`, `date`, `description`, `tags`. Slug comes from the filename.

## What to avoid

- **Don't add features or abstractions beyond what's asked.** A bug fix doesn't need surrounding cleanup. Three similar lines is better than a premature abstraction.
- **Don't add error handling for scenarios that can't happen** inside the static build pipeline.
- **Don't touch `package-lock.json` manually** — let `npm install` manage it.
- **Don't force-push to `main`.**
- **Don't merge a PR with a failing build or lint.**

## Documentation

When adding a new page, section, or user-facing feature:
- Update `README.md` — add the feature to the project structure and any relevant sections.
- Update the wiki (`https://github.com/kamoras/PersonalSite/wiki`) — edit or create the relevant wiki page. Wiki pages live in the `PersonalSite.wiki` git repo; clone it, edit, and push.

## PR workflow

- Branch from `main`, name it `feature/<description>` or `fix/<description>`.
- Every PR gets a build + lint + Lighthouse CI run automatically.
- Lighthouse gates: SEO ≥ 90, Accessibility ≥ 90, Best Practices ≥ 90. Performance is reported but not a hard gate (CI runners throttle CPU; real-device scores are higher).
- Keep PRs focused — one concern per PR.

## Architecture notes

- **Static export** — `output: "export"` in `next.config.ts`. No server-side rendering at runtime. No API routes. Everything is pre-rendered at build time.
- **Theme** — `ThemeProvider` stores preference in `localStorage`, toggles `html.light` class on `document.documentElement`, and updates `<meta name="theme-color">`. CSS variables in `:root` handle dark mode; `.light` overrides handle light mode. Use `useTheme()` hook to read current theme in client components.
- **Fonts** — loaded via `next/font/google` in `layout.tsx`. Playfair Display is the display serif (headings only); Geist is the sans-serif body font.
- **Animations** — framer-motion with `useScrollAwareInView` for scroll-triggered sections. Hero heading and eyebrow are plain HTML (no animation) to avoid delaying LCP.
- **Blog** — Markdown files in `content/posts/` processed at build time by `lib/posts.ts`. The pipeline: gray-matter (frontmatter) → remark → rehype → sanitized HTML. `getRelatedPosts(slug, tags)` returns up to 3 posts sharing tags, used on post pages.
- **Comments** — `GiscusComments` (`components/GiscusComments.tsx`) renders a GitHub Discussions-backed comment thread via `@giscus/react`. It reads the current theme via `useTheme()` and maps to giscus theme tokens.
- **iOS safe area** — `viewport-fit=cover` is set in the Viewport export. The navbar has `padding-top: env(safe-area-inset-top)`. A dedicated cover `<div>` in `layout.tsx` at `z-index: 9999` covers the safe area with `var(--color-bg)`.
