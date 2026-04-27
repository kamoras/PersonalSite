# Contributing

This is a personal portfolio site — unsolicited feature PRs aren't expected, but there are a few ways contributions are welcome:

- **Bug reports** — if something is broken or looks wrong, open an issue
- **Typos or content errors** — PRs welcome for any mistakes in blog posts or copy
- **Accessibility issues** — please open an issue if you encounter any accessibility problems

## Running locally

```bash
npm install
npm run dev      # development server at localhost:3000
npm run build    # static export → /out
npm run lint     # ESLint
```

## Before opening a PR

- `npm run build` must pass
- `npm run lint` must be clean
- All CI checks (Build, Lighthouse, Deploy Preview) must pass
