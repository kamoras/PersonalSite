# GEMINI.md

Guidelines for working on ryan-mack.dev with Gemini CLI.

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
6. **`prefers-reduced-motion` respected** — every animation or transition must be removed or frozen under `prefers-reduced-motion: reduce` (the global rule in `globals.css` covers CSS; JS-driven motion checks `matchMedia`).
7. **Mobile tested** — changes to layout, the top bar, or the safe area must account for iOS Safari behaviour (viewport-fit=cover, safe-area-inset-top, position:fixed quirks).

## Code conventions

- **No comments explaining what code does** — names do that. Only comment *why* something non-obvious is happening (a workaround, a hidden constraint, an iOS Safari bug).
- **No unused imports or variables** — ESLint enforces this; don't suppress it.
- **Client components only where necessary** — prefer server components. Mark `"use client"` only when you need browser APIs, hooks, or event handlers.
- **CSS variables for colors** — use `var(--gold)`, `var(--muted)`, `var(--text)`, etc. Don't hardcode hex values in components except where the design token doesn't exist and you add one to `globals.css`.
- **Design-system classes and CSS variables** — reuse the classes in `globals.css` (`.label`, `.meta`, `.btn`, `.textlink`, `.mnote`, `.row`, …) before inventing new styles; Tailwind utilities are fine for one-offs.

## Blog posts

New posts go in `content/posts/` as Markdown with required frontmatter: `title`, `date`, `description`, `tags`, plus an optional `pullquote` (a sentence quoted verbatim from the post, shown in the margin of the Writing archive). Slug comes from the filename.

**Keep the author's employer out of the blog.** Essays and essay pages don't name or highlight where the author works; the blog is personal and the employer doesn't necessarily endorse it. The employer belongs on the homepage (hero, About, Experience), not in posts, bylines or author bios.

## What to avoid

- **Don't add features or abstractions beyond what's asked.** A bug fix doesn't need surrounding cleanup. Three similar lines is better than a premature abstraction.
- **Don't add error handling for scenarios that can't happen** inside the static build pipeline.
- **Don't touch `package-lock.json` manually** — let `npm install` manage it.
- **Don't force-push to `main`.**
- **Don't merge a PR with a failing build or lint.**

## Documentation

When adding a new page, section, or user-facing feature, update `README.md`: add the feature to the project structure and any relevant sections. The README is the project's documentation; the GitHub wiki is no longer maintained, so don't update it.

## PR workflow

- Branch from `main`, name it `feature/<description>` or `fix/<description>`.
- Every PR gets a build + lint + Lighthouse CI run automatically.
- Lighthouse gates: SEO ≥ 90, Accessibility ≥ 90, Best Practices ≥ 90. Performance is reported but not a hard gate (CI runners throttle CPU; real-device scores are higher).
- Keep PRs focused — one concern per PR.

## Architecture notes

- **Static export** — `output: "export"` in `next.config.ts`. No server-side rendering at runtime. No API routes. Everything is pre-rendered at build time.
- **CSP** — headers live in `public/staticwebapp.config.json`. Inline scripts are allowed by hash: `postbuild` (`scripts/csp-hashes.mjs`) writes the hashes into `out/staticwebapp.config.json`, and `npm run smoke` fails if any inline script isn't covered. A new third-party script or endpoint needs its origin added to the CSP, or it will be silently blocked in production.
- **Theme** — `ThemeProvider` stores preference in `localStorage`, toggles `html.light` class on `document.documentElement`, and updates `<meta name="theme-color">`. CSS variables in `:root` handle dark mode; `.light` overrides handle light mode. Use `useTheme()` from `components/ThemeProvider.tsx` to read current theme in client components.
- **Fonts** — loaded via `next/font/google` in `layout.tsx`. Fraunces is the display serif (names, headings; its opsz axis is used), Newsreader is the reading serif for all body text, and Geist Mono is for labels and metadata. The font variables are set on `<html>` because the `--display`/`--serif`/`--mono` tokens on `:root` reference them.
- **Layout ("Marginalia")** — every page renders `SiteFrame`: a sticky contents rail (≥1200px) or a sticky top bar with a mobile Contents sheet (`TopBar`), then the page. Content uses a main column plus a margin column (`.grid-margin`, `.row`, `.read`); the margin holds notes, pull quotes and, on essays, sidenotes. The section list comes from `lib/nav.ts`.
- **Styling** — the design system is class-based CSS in `globals.css` (tokens, type recipes, frame, components) with Tailwind for occasional utilities. Don't hardcode colours in components; add a token.
- **Animations** — no animation library. Rows with `.reveal` ease in once via `RevealObserver` (IntersectionObserver); the hidden state only applies under `html.js` (set by the pre-paint script) and `prefers-reduced-motion: no-preference`, so no-JS and reduced-motion visitors see everything. The hero name is plain HTML for LCP; only the hero figures count up (`CountUp`, skipped under reduced motion). If the app bundle never loads, a CSS failsafe reveals hidden content after 2.5s (cancelled by `html.hydrated`, which `RevealObserver` sets). The surname shimmer (one pass) and status-dot pulse (two cycles) are finite CSS animations, so motion stops within 5s (WCAG 2.2.2), and are frozen by the reduced-motion rules. Controls that need the app bundle (theme toggle, Listen, Copy link, the archive's topic filter, and the topic tags that link to it) are hidden without JS and invisible until `html.hydrated`. The Contents sheet is a native `<details>`, so it opens without JS; closing it on link clicks, and scrolling to top when R·M is clicked on the homepage, live in the pre-paint script (`lib/theme.ts`) so they work even if the bundle fails.
- **Essays** — `ArticleBody` sets footnotes as margin sidenotes ≥900px and as tap-to-expand inline notes below that; the Notes list (with ↩ back-links) stays the accessible copy. `SectionTracker` drives `aria-current` in the rail and the reading-progress hairline. `ListenButton` instances share one speech controller (`lib/speech.ts`).
- **Blog** — Markdown files in `content/posts/` processed at build time by `lib/posts.ts`. The pipeline: js-yaml (frontmatter) → remark → rehype → sanitized HTML. `getRelatedPosts(slug, tags)` returns up to 3 tag-matched posts, displayed on each post page.
- **Comments** — `GiscusComments` (`components/GiscusComments.tsx`) renders a GitHub Discussions-backed comment thread via `@giscus/react`. It reads the current theme via `useTheme()` and maps to giscus theme tokens.
- **iOS safe area** — `viewport-fit=cover` is set in the Viewport export. The sticky top bar pads itself by `env(safe-area-inset-top)` and is opaque `var(--bg)`, and `html` carries the same background so overscroll and the notch area match. The mobile sheet and the rail pad by the bottom inset. The skip link sits above the bar.
- **Theme-dependent styling** — style through CSS variables or the `light:` Tailwind variant (defined in `globals.css`), not `useTheme()`-driven class names. Pages are prerendered with no knowledge of the visitor's theme, so class names chosen from `useTheme()` render as dark until hydration.
- **Social images** — `og.png` route handlers (`app/og.png`, `app/blog/og.png`, `app/blog/[slug]/og.png`), not the `opengraph-image` file convention: static export writes that convention without a file extension and Azure serves it as `application/octet-stream`.
