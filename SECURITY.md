# Security Policy

## Supported Versions

Only the latest deployment of [ryan-mack.dev](https://ryan-mack.dev) is actively maintained.

## Reporting a Vulnerability

Please **do not** open a public GitHub issue for security vulnerabilities.

Instead, report them privately via [GitHub's private vulnerability reporting](https://github.com/kamoras/PersonalSite/security/advisories/new). I'll respond as quickly as possible and coordinate a fix before any public disclosure.

## Scope

This is a static site with no backend, no user accounts, and no database. The primary security concerns are:

- Content Security Policy configuration (`public/staticwebapp.config.json`)
- Third-party script integrity (Calendly, Umami)
- Dependency vulnerabilities (monitored via Dependabot)
