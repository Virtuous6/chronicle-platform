# AGENTS.md

> Instructions for AI agents working on The 7th Signal Platform codebase.

## Project Overview

The 7th Signal Platform is a SvelteKit 2 content management system with Supabase backend. It serves three content types: **notes**, **news**, and **videos**.

## Commands

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Start development server |
| `pnpm build` | Production build |
| `pnpm preview` | Preview production build locally |
| `pnpm check` | Run TypeScript and Svelte type checking |

**Always run `pnpm check` after making changes to verify types.**

## Known Warnings (Safe to Ignore)

The `pnpm check` command shows CSS warnings about "Unknown at rule @apply" in `src/routes/[slug]/+page.svelte`. These are false positives—svelte-check doesn't understand Tailwind's `@apply` directive. The styles work correctly.

## Project Structure

```
src/
├── lib/
│   ├── supabase.ts      # Supabase client + Article type
│   └── index.ts         # Lib exports (empty)
├── routes/
│   ├── +layout.svelte   # Root layout
│   ├── +page.*          # Homepage
│   ├── [slug]/          # Article detail page
│   ├── admin/           # Admin dashboard
│   │   └── new/         # New article form
│   └── api/
│       └── articles/    # POST endpoint for creating articles
└── app.css              # Tailwind imports + Google Fonts + component classes
```

## Critical Invariants

### Database

- **Default author must exist**: The slug `'joe-lucky'` must exist in the `authors` table. The API uses this as the default author for new articles.
- **Slugs are unique**: Both `authors.slug` and `articles.slug` have unique constraints.
- **Categories are constrained**: Articles must have category `'note'`, `'news'`, or `'video'`.
- **RLS policies**: Public can only read published articles (`published_at <= NOW()`).

### Code Conventions

- Use Tailwind CSS with custom `chronicle-*` color tokens (defined in `tailwind.config.js`). Note: CSS class names retain `chronicle-*` for functionality.
- Use `marked` for Markdown rendering in article pages.
- Server loaders return empty arrays on error (graceful degradation).
- Form components handle their own state and API calls.

## Environment Variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `PUBLIC_SUPABASE_URL` | Yes* | Supabase project URL |
| `PUBLIC_SUPABASE_ANON_KEY` | Yes* | Supabase anonymous key |

*Falls back to hardcoded values if missing, but should be set in production.

## Design Tokens

| Token | Hex | Usage |
|-------|-----|-------|
| `chronicle-bg` | `#091c1f` | Page background |
| `chronicle-bg-light` | `#0d2528` | Lighter background variant |
| `chronicle-text` | `#f7fff5` | Primary text |
| `chronicle-text-muted` | `#8a9a92` | Secondary text |
| `chronicle-border` | `#1e3538` | Borders, dividers |
| `chronicle-accent` | `#c8a05c` | Golden accent (featured badges, buttons) |
| `chronicle-accent-hover` | `#d4b06c` | Accent hover state |

## Typography

| Font Family | Usage |
|-------------|-------|
| `font-display` | Playfair Display — headlines, logo |
| `font-serif` | Source Serif 4 — body text |
| `font-sans` | System fonts — UI elements, labels |
| `font-mono` | JetBrains Mono — code blocks |

## Component Classes (in app.css)

| Class | Purpose |
|-------|---------|
| `.amp-logo` | Logo typography |
| `.section-label` | Section headers (NOTES, NEWS, VIDEOS) |
| `.featured-badge` | Featured article badges |
| `.article-title` | Article headline typography |
| `.nav-link` | Navigation link styling |
| `.dashboard-btn` | Dashboard button with border |

## Security Notes

- **No authentication on admin routes** — anyone can access `/admin` and create articles.
- **No auth on API** — `POST /api/articles` is unprotected.
- This is acceptable for development but must be addressed before production.

## Architecture Reference

See [ATOMIC_ARCHITECTURE.md](./ATOMIC_ARCHITECTURE.md) for detailed documentation of all components, their dependencies, and invariants.

## Ralph Automation

This project uses Ralph for autonomous PRD implementation.

### Running Ralph

```bash
./scripts/ralph/ralph.sh [max_iterations]
```

### PRD Location

- PRD markdown: `tasks/prd-*.md`
- PRD state: `tasks/prd.json`
- Progress log: `progress.txt`

### Quality Gates

Ralph iterations must pass:
1. `pnpm check` - TypeScript validation
2. All acceptance criteria in the story

### Story Guidelines

- One story per iteration
- Stories execute in priority order
- Each story should be completable in one context window
- Update this AGENTS.md when discovering new patterns

### Routing Conventions

| Route | Purpose |
|-------|---------|
| `/home` | Marketing homepage |
| `/chronicle` | Blog 3-column layout |
| `/chronicle/[slug]` | Article detail page |
| `/admin` | Admin dashboard |

### Layout Patterns

- Blog page: viewport-locked with `h-dvh flex flex-col overflow-hidden`
- Columns: independent scroll with `overflow-y-auto`
- Article pages: full-page scroll with footer
