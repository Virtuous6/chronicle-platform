# Atomic Architecture Map (Reasoning Units)

> **The 7th Signal Platform** — A SvelteKit 2 + Supabase content management system

---

## Why this doc exists

This document decomposes the codebase into **independent atomic reasoning units ("atoms")** so we can:
- **Navigate** the system quickly ("where do I build X?")
- **Change** one area without accidentally breaking others
- **Validate** behavior with clear invariants + existing tests/docs

---

## How to use this doc (practical workflow)

1. **Step 1 — Identify the atom(s)** you're touching using the "Atom Index" below
2. **Step 2 — Confirm dependencies** (DB tables, Supabase client, external APIs) before coding
3. **Step 3 — Preserve invariants** listed under that atom (these are the "must not break" rules)
4. **Step 4 — Verify with evidence**: run `pnpm check` and test affected routes

---

## Definition: "Atomic Reasoning Unit" (Atom)

An **atom** is the smallest unit with:
- **A stable interface** (API route, function boundary, input/output contract)
- **Local invariants** (rules that should always hold)
- **Explicit dependencies** (DB schema, Supabase, external APIs, other atoms)

An atom may be fully independent or "independent given its dependencies."

---

## Atom Index

| ID | Name | Location | Layer |
|----|------|----------|-------|
| DB-1 | Authors Table | `migrations/001_initial_schema.sql#L2-L9` | Database |
| DB-2 | Articles Table | `migrations/001_initial_schema.sql#L12-L25` | Database |
| LIB-1 | Supabase Client | `src/lib/supabase.ts` | Lib |
| LIB-2 | Article Type | `src/lib/supabase.ts#L14-L31` | Lib |
| LIB-3 | Lib Index | `src/lib/index.ts` | Lib |
| API-1 | POST /api/articles | `src/routes/api/articles/+server.ts` | API |
| PUB-1 | Root Layout | `src/routes/+layout.svelte` | Public Routes |
| PUB-2 | Homepage Loader | `src/routes/+page.server.ts` | Public Routes |
| PUB-3 | Homepage UI | `src/routes/+page.svelte` | Public Routes |
| PUB-4 | Article Loader | `src/routes/[slug]/+page.server.ts` | Public Routes |
| PUB-5 | Article Page UI | `src/routes/[slug]/+page.svelte` | Public Routes |
| ADM-1 | Admin Dashboard Loader | `src/routes/admin/+page.server.ts` | Admin Routes |
| ADM-2 | Admin Dashboard UI | `src/routes/admin/+page.svelte` | Admin Routes |
| ADM-3 | New Article Form | `src/routes/admin/new/+page.svelte` | Admin Routes |
| CFG-1 | App Type Declarations | `src/app.d.ts` | Config |
| CFG-2 | HTML Shell Template | `src/app.html` | Config |
| CFG-3 | Global CSS | `src/app.css` | Config |
| CFG-4 | SvelteKit Config | `svelte.config.js` | Config |
| CFG-5 | Tailwind Config | `tailwind.config.js` | Config |
| CFG-6 | Vite Config | `vite.config.ts` | Config |
| CFG-7 | PostCSS Config | `postcss.config.js` | Config |
| CFG-8 | TypeScript Config | `tsconfig.json` | Config |
| CFG-9 | Package Manifest | `package.json` | Config |

---

## Layer 1: Database Schema

### DB-1: Authors Table

| Attribute | Value |
|-----------|-------|
| **Location** | [migrations/001_initial_schema.sql#L2-L9](file:///Users/josephsanchez/Documents/Chronicle-platform/chronicle-platform/migrations/001_initial_schema.sql#L2-L9) |
| **Purpose** | Stores content author profiles |
| **Interface** | Columns: `id` (UUID PK), `name` (TEXT), `slug` (TEXT), `bio` (TEXT), `avatar_url` (TEXT), `created_at` (TIMESTAMPTZ) |
| **Dependencies** | PostgreSQL `gen_random_uuid()`, Supabase RLS |
| **Invariants** | • `slug` UNIQUE NOT NULL<br>• `name` NOT NULL<br>• RLS: public can read all authors |
| **Consumers** | PUB-2, PUB-4, API-1 |

---

### DB-2: Articles Table

| Attribute | Value |
|-----------|-------|
| **Location** | [migrations/001_initial_schema.sql#L12-L25](file:///Users/josephsanchez/Documents/Chronicle-platform/chronicle-platform/migrations/001_initial_schema.sql#L12-L25) |
| **Purpose** | Stores all content: notes, news, videos |
| **Interface** | Columns: `id`, `title`, `slug`, `excerpt`, `content`, `category`, `featured`, `hero_image_url`, `author_id` (FK→authors), `published_at`, `created_at`, `updated_at` |
| **Dependencies** | DB-1 (authors FK), PostgreSQL CHECK |
| **Invariants** | • `slug` UNIQUE NOT NULL<br>• `title`, `content` NOT NULL<br>• `category` IN ('note', 'news', 'video')<br>• RLS: public reads only WHERE `published_at IS NOT NULL AND published_at <= NOW()` |
| **Consumers** | All route loaders, API-1 |

**Indexes:**
| Index | Purpose |
|-------|---------|
| `idx_articles_published` | Published date ordering |
| `idx_articles_category` | Category filtering |
| `idx_articles_slug` | Slug lookups |
| `idx_articles_featured` | Featured content queries |

---

## Layer 2: Lib (Shared Code)

### LIB-1: Supabase Client

| Attribute | Value |
|-----------|-------|
| **Location** | [src/lib/supabase.ts](file:///Users/josephsanchez/Documents/Chronicle-platform/chronicle-platform/src/lib/supabase.ts) |
| **Purpose** | Singleton Supabase client for all database operations |
| **Interface** | `export const supabase: SupabaseClient` |
| **Dependencies** | `@supabase/supabase-js`, env: `PUBLIC_SUPABASE_URL`, `PUBLIC_SUPABASE_ANON_KEY` |
| **Invariants** | • Falls back to hardcoded URL if env missing<br>• Uses anon key (respects RLS policies) |
| **Consumers** | PUB-2, PUB-4, ADM-1, API-1 |

---

### LIB-2: Article Type

| Attribute | Value |
|-----------|-------|
| **Location** | [src/lib/supabase.ts#L14-L31](file:///Users/josephsanchez/Documents/Chronicle-platform/chronicle-platform/src/lib/supabase.ts#L14-L31) |
| **Purpose** | Core domain type for content items |
| **Interface** | `{ id, title, slug, excerpt?, content, category: 'note'\|'news'\|'video', featured, hero_image_url?, published_at?, created_at, updated_at, author?: { name, slug, avatar_url? } }` |
| **Dependencies** | None |
| **Invariants** | • `category` is union of exactly 3 values<br>• `author` is nullable nested object |
| **Consumers** | All components rendering articles |

---

### LIB-3: Lib Index

| Attribute | Value |
|-----------|-------|
| **Location** | [src/lib/index.ts](file:///Users/josephsanchez/Documents/Chronicle-platform/chronicle-platform/src/lib/index.ts) |
| **Purpose** | Entry point for `$lib` imports (currently empty placeholder) |
| **Interface** | No exports |
| **Dependencies** | None |
| **Invariants** | Must exist for SvelteKit `$lib` alias resolution |

---

## Layer 3: API Routes

### API-1: POST /api/articles

| Attribute | Value |
|-----------|-------|
| **Location** | [src/routes/api/articles/+server.ts](file:///Users/josephsanchez/Documents/Chronicle-platform/chronicle-platform/src/routes/api/articles/+server.ts) |
| **Purpose** | Creates a new article in the database |
| **HTTP Method** | `POST` |
| **Dependencies** | LIB-1 (supabase), DB-1 (authors), DB-2 (articles) |

**Request Body:**
```typescript
{
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  featured?: boolean;      // defaults to false
  hero_image_url: string;
  published_at?: string;   // defaults to null
}
```

**Responses:**
| Status | Condition |
|--------|-----------|
| `201` | Success: `{ data: Article }` |
| `400` | Supabase insert error (e.g., duplicate slug) |
| `500` | Default author "joe-lucky" not found |

**Invariants:**
- Default author with slug `'joe-lucky'` must exist
- `featured` defaults to `false`
- `published_at` defaults to `null`
- ⚠️ No authentication—any client can create articles

---

## Layer 4: Public Routes

### PUB-1: Root Layout

| Attribute | Value |
|-----------|-------|
| **Location** | [src/routes/+layout.svelte](file:///Users/josephsanchez/Documents/Chronicle-platform/chronicle-platform/src/routes/+layout.svelte) |
| **Purpose** | Provides global CSS and favicon for all routes |
| **Interface** | Props: `children` (Snippet) |
| **Dependencies** | `$lib/assets/favicon.svg`, `../app.css` |
| **Invariants** | Must wrap all child routes; favicon always present |
| **UI Elements** | `<svelte:head>` with favicon link |

---

### PUB-2: Homepage Loader

| Attribute | Value |
|-----------|-------|
| **Location** | [src/routes/+page.server.ts](file:///Users/josephsanchez/Documents/Chronicle-platform/chronicle-platform/src/routes/+page.server.ts) |
| **Purpose** | Fetches featured notes, news articles, and videos |
| **Interface** | Returns: `{ featuredNotes[], newsArticles[], videos[] }` |
| **Dependencies** | LIB-1 (supabase) |
| **Invariants** | • Featured notes: `category='note'` AND `featured=true`<br>• News: `category='news'`<br>• Videos: `category='video'`<br>• All ordered by `published_at` DESC<br>• Returns empty arrays on error |

---

### PUB-3: Homepage UI

| Attribute | Value |
|-----------|-------|
| **Location** | [src/routes/+page.svelte](file:///Users/josephsanchez/Documents/Chronicle-platform/chronicle-platform/src/routes/+page.svelte) |
| **Purpose** | Renders The 7th Signal-style three-column layout: Notes, News, Videos |
| **Interface** | Props: `data.featuredNotes`, `data.newsArticles`, `data.videos` |
| **Dependencies** | PUB-2 (data), CFG-3 (component classes) |
| **Invariants** | • First news article is hero with featured overlay<br>• Uses mock data for display<br>• Links use `/{slug}` pattern |

**Layout Structure:**
| Section | Description |
|---------|-------------|
| Header | "The 7th Signal" logo, nav links (The 7th Signal, Owner's Manual, Models, The 7th Signal Free, Pricing), Dashboard button |
| Left Column (NOTES) | Featured note with image overlay, article list, GUIDES section, FOLLOW THE 7TH SIGNAL social icons |
| Center Column (NEWS) | Hero image with featured badge, chronological news list with dates |
| Right Column (VIDEOS) | Video thumbnails with play button overlays |
| Footer | The 7th Signal logo, status indicator, link columns (Developers, Resources, Company, Legal) |

**Helper Functions:**
| Function | Purpose |
|----------|---------|
| `formatDate()` | Standard date format (e.g., "Jan 14, 2026") |
| `formatDateUppercase()` | Uppercase month format for display |
| `formatFeaturedDate()` | Featured badge format (e.g., "14 JAN 2026") |
| `formatNewsDate()` | News list format (e.g., "14 JAN") |

**UI Elements:** Header nav, 3-column grid, featured cards with image overlays, social icons, footer with columns

---

### PUB-4: Article Loader

| Attribute | Value |
|-----------|-------|
| **Location** | [src/routes/[slug]/+page.server.ts](file:///Users/josephsanchez/Documents/Chronicle-platform/chronicle-platform/src/routes/%5Bslug%5D/+page.server.ts) |
| **Purpose** | Fetches single article by slug with author relation |
| **Interface** | Params: `slug`; Returns: `{ article }` |
| **Dependencies** | LIB-1 (supabase), `@sveltejs/kit/error` |
| **Invariants** | • Throws 404 if article not found<br>• Throws 500 on unexpected error<br>• Author normalized from array to single object |

---

### PUB-5: Article Page UI

| Attribute | Value |
|-----------|-------|
| **Location** | [src/routes/[slug]/+page.svelte](file:///Users/josephsanchez/Documents/Chronicle-platform/chronicle-platform/src/routes/%5Bslug%5D/+page.svelte) |
| **Purpose** | Renders full article with markdown content |
| **Interface** | Props: `data.article` |
| **Dependencies** | PUB-4 (data), `marked` (markdown parser) |
| **Invariants** | • Content rendered as HTML via `marked()`<br>• Breadcrumb shows category<br>• Meta description uses excerpt |
| **UI Elements** | Header, Hero image (or gradient fallback), Article card, Prose content, "Back to The 7th Signal" link, Footer |

---

## Layer 5: Admin Routes

### ADM-1: Admin Dashboard Loader

| Attribute | Value |
|-----------|-------|
| **Location** | [src/routes/admin/+page.server.ts](file:///Users/josephsanchez/Documents/Chronicle-platform/chronicle-platform/src/routes/admin/+page.server.ts) |
| **Purpose** | Fetches all articles for admin dashboard |
| **Interface** | Returns: `{ articles: Article[] }` with `id`, `title`, `slug`, `category`, `featured`, `published_at`, `created_at` |
| **Dependencies** | LIB-1 (supabase) |
| **Invariants** | • Returns `{ articles: [] }` on error<br>• Articles ordered by `created_at` DESC |

---

### ADM-2: Admin Dashboard UI

| Attribute | Value |
|-----------|-------|
| **Location** | [src/routes/admin/+page.svelte](file:///Users/josephsanchez/Documents/Chronicle-platform/chronicle-platform/src/routes/admin/+page.svelte) |
| **Purpose** | Displays article management dashboard with stats |
| **Interface** | Props: `data.articles` |
| **Dependencies** | ADM-1 (data), `$types` |
| **Invariants** | • `formatDate()` returns "Not published" for null dates<br>• Categories: `note`, `news`, `video` |

**Stats Cards:**
| Stat | Calculation |
|------|-------------|
| Total Articles | `articles.length` |
| Published | `articles.filter(a => a.published_at).length` |
| Drafts | `articles.filter(a => !a.published_at).length` |
| Featured | `articles.filter(a => a.featured).length` |

**User Interactions:**
- Navigate to "New Article" (`/admin/new`)
- View article (`/{slug}`)
- Edit article (`/admin/edit/{id}`)
- View site (`/`)

---

### ADM-3: New Article Form

| Attribute | Value |
|-----------|-------|
| **Location** | [src/routes/admin/new/+page.svelte](file:///Users/josephsanchez/Documents/Chronicle-platform/chronicle-platform/src/routes/admin/new/+page.svelte) |
| **Purpose** | Form for creating new articles with validation and API submission |
| **Interface** | State: `title`, `slug`, `excerpt`, `content`, `category`, `featured`, `heroImageUrl`, `publishNow`, `saving`, `error` |
| **Dependencies** | `$app/navigation` (`goto`), API-1 |
| **Invariants** | • `title` and `content` required<br>• `slug` auto-generated from title if empty<br>• `category` must be `'note' \| 'news' \| 'video'`<br>• `published_at` set only if `publishNow` is true |

**Form Fields:**
| Field | Type | Required | Default |
|-------|------|----------|---------|
| `title` | text | ✅ | `''` |
| `slug` | text | ✅ (auto-gen) | `''` |
| `excerpt` | textarea | ❌ | `''` |
| `content` | textarea | ✅ | `''` |
| `category` | select | ✅ | `'note'` |
| `heroImageUrl` | url | ❌ | `''` |
| `featured` | checkbox | ❌ | `false` |
| `publishNow` | checkbox | ❌ | `false` |

**Slug Generation:**
```javascript
title.toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '')
```

---

## Layer 6: Configuration

### CFG-1: App Type Declarations

| Attribute | Value |
|-----------|-------|
| **Location** | [src/app.d.ts](file:///Users/josephsanchez/Documents/Chronicle-platform/chronicle-platform/src/app.d.ts) |
| **Purpose** | SvelteKit global type augmentation |
| **Interface** | `App.Error`, `App.Locals`, `App.PageData`, `App.PageState`, `App.Platform` |
| **Invariants** | Must `export {}` to be module; extends global `App` namespace |

---

### CFG-2: HTML Shell Template

| Attribute | Value |
|-----------|-------|
| **Location** | [src/app.html](file:///Users/josephsanchez/Documents/Chronicle-platform/chronicle-platform/src/app.html) |
| **Purpose** | Root HTML template for all pages |
| **Interface** | Placeholders: `%sveltekit.head%`, `%sveltekit.body%` |
| **Invariants** | `lang="en"`, viewport meta required; `data-sveltekit-preload-data="hover"` enables prefetching |

---

### CFG-3: Global CSS

| Attribute | Value |
|-----------|-------|
| **Location** | [src/app.css](file:///Users/josephsanchez/Documents/Chronicle-platform/chronicle-platform/src/app.css) |
| **Purpose** | Tailwind CSS layers, Google Fonts imports, and component utility classes |
| **Interface** | `@import url(...)`, `@tailwind base/components/utilities`, `@layer base`, `@layer components` |
| **Dependencies** | Google Fonts (Playfair Display, Source Serif 4, JetBrains Mono) |
| **Invariants** | Order must be imports → base → components → utilities |

**Component Classes:**
| Class | Purpose |
|-------|---------|
| `.amp-logo` | Logo typography (Playfair Display, light weight) |
| `.section-label` | Section headers (NOTES, NEWS, VIDEOS) |
| `.featured-badge` | Featured article badges (golden accent) |
| `.article-date` | Date display formatting (uppercase) |
| `.article-title` | Article headline typography (Playfair Display) |
| `.article-title-italic` | Italic variant for titles |
| `.nav-link` | Navigation link styling with hover |
| `.dashboard-btn` | Dashboard button with accent border |

---

### CFG-4: SvelteKit Config

| Attribute | Value |
|-----------|-------|
| **Location** | [svelte.config.js](file:///Users/josephsanchez/Documents/Chronicle-platform/chronicle-platform/svelte.config.js) |
| **Purpose** | SvelteKit framework configuration |
| **Interface** | `{ preprocess: vitePreprocess(), kit: { adapter: adapter() } }` |
| **Dependencies** | `@sveltejs/adapter-auto`, `@sveltejs/vite-plugin-svelte` |
| **Invariants** | Uses auto-adapter (deployment target auto-detected) |

---

### CFG-5: Tailwind Config

| Attribute | Value |
|-----------|-------|
| **Location** | [tailwind.config.js](file:///Users/josephsanchez/Documents/Chronicle-platform/chronicle-platform/tailwind.config.js) |
| **Purpose** | Tailwind CSS customization with The 7th Signal design tokens |
| **Dependencies** | Tailwind CSS v3 |

**Custom Colors:**
| Token | Hex | Usage |
|-------|-----|-------|
| `chronicle-bg` | `#091c1f` | Page background |
| `chronicle-bg-light` | `#0d2528` | Lighter background variant |
| `chronicle-text` | `#f7fff5` | Primary text |
| `chronicle-text-muted` | `#8a9a92` | Secondary/muted text |
| `chronicle-border` | `#1e3538` | Borders, dividers |
| `chronicle-accent` | `#c8a05c` | Golden accent (featured badges, buttons) |
| `chronicle-accent-hover` | `#d4b06c` | Accent hover state |

**Font Families:**
| Token | Stack |
|-------|-------|
| `font-display` | Playfair Display, Georgia, serif |
| `font-serif` | Source Serif 4, Georgia, serif |
| `font-sans` | system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif |
| `font-mono` | JetBrains Mono, Menlo, Monaco, monospace |

**Invariants:** Content scans `./src/**/*.{html,js,svelte,ts}`; `letterSpacing.widest` = `0.2em`

---

### CFG-6: Vite Config

| Attribute | Value |
|-----------|-------|
| **Location** | [vite.config.ts](file:///Users/josephsanchez/Documents/Chronicle-platform/chronicle-platform/vite.config.ts) |
| **Purpose** | Vite build tool configuration |
| **Interface** | `defineConfig({ plugins: [sveltekit()] })` |
| **Invariants** | Minimal config; SvelteKit plugin handles defaults |

---

### CFG-7: PostCSS Config

| Attribute | Value |
|-----------|-------|
| **Location** | [postcss.config.js](file:///Users/josephsanchez/Documents/Chronicle-platform/chronicle-platform/postcss.config.js) |
| **Purpose** | PostCSS pipeline for CSS processing |
| **Interface** | `{ plugins: { tailwindcss: {}, autoprefixer: {} } }` |
| **Invariants** | Tailwind must run before autoprefixer |

---

### CFG-8: TypeScript Config

| Attribute | Value |
|-----------|-------|
| **Location** | [tsconfig.json](file:///Users/josephsanchez/Documents/Chronicle-platform/chronicle-platform/tsconfig.json) |
| **Purpose** | TypeScript compiler options |
| **Interface** | Extends `.svelte-kit/tsconfig.json` |
| **Invariants** | `strict: true` enforced; path aliases from SvelteKit |

---

### CFG-9: Package Manifest

| Attribute | Value |
|-----------|-------|
| **Location** | [package.json](file:///Users/josephsanchez/Documents/Chronicle-platform/chronicle-platform/package.json) |
| **Purpose** | Project metadata, scripts, dependencies |

**Scripts:**
| Command | Action |
|---------|--------|
| `pnpm dev` | Start dev server |
| `pnpm build` | Production build |
| `pnpm preview` | Preview production build |
| `pnpm check` | TypeScript/Svelte check |

**Runtime Dependencies:**
- `@supabase/supabase-js@^2.90.1`
- `marked@^17.0.1`

**Dev Dependencies:**
- SvelteKit 2, Svelte 5, Tailwind 3, Vite 7, TypeScript 5

---

## Dependency Graph

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           CHRONICLE PLATFORM                             │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│   ┌──────────────┐         ┌──────────────┐         ┌──────────────┐    │
│   │  CFG Layer   │         │   DB Layer   │         │  Lib Layer   │    │
│   │  (configs)   │         │  (Supabase)  │◄────────│  (supabase   │    │
│   └──────────────┘         │              │         │   client)    │    │
│                            │  ┌────────┐  │         └──────┬───────┘    │
│                            │  │authors │  │                │            │
│                            │  └───┬────┘  │                │            │
│                            │      │FK     │                │            │
│                            │  ┌───▼────┐  │                │            │
│                            │  │articles│  │                │            │
│                            │  └────────┘  │                │            │
│                            └──────────────┘                │            │
│                                    ▲                       │            │
│                                    │                       │            │
│   ┌────────────────────────────────┴───────────────────────┴──────┐     │
│   │                         Route Layers                          │     │
│   ├───────────────────────────────────────────────────────────────┤     │
│   │                                                               │     │
│   │  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐       │     │
│   │  │ Public      │    │ Admin       │    │ API         │       │     │
│   │  │ Routes      │    │ Routes      │    │ Routes      │       │     │
│   │  │             │    │             │    │             │       │     │
│   │  │ PUB-1..5    │    │ ADM-1..3    │    │ API-1       │       │     │
│   │  │             │    │      │      │    │             │       │     │
│   │  └─────────────┘    └──────┼──────┘    └─────────────┘       │     │
│   │                            │                   ▲              │     │
│   │                            └───────────────────┘              │     │
│   │                         (POST /api/articles)                  │     │
│   └───────────────────────────────────────────────────────────────┘     │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## RLS Policies Summary

| Policy | Table | Effect |
|--------|-------|--------|
| Public can read published articles | `articles` | SELECT only where `published_at <= NOW()` |
| Public can read authors | `authors` | SELECT all |

**Note:** No INSERT/UPDATE/DELETE policies—write operations require service role key.

---

## Quick Reference: Common Tasks

| Task | Atoms to Touch | Verification |
|------|----------------|--------------|
| Add new article field | DB-2, LIB-2, API-1, ADM-3, PUB-5 | `pnpm check`, test create/view |
| Change homepage layout | PUB-3, CFG-5 | `pnpm dev`, visual check |
| Add new category | DB-2 (CHECK), LIB-2, ADM-3 | Migration + `pnpm check` |
| Fix article not loading | PUB-4, LIB-1 | Check slug, RLS policy |
| Style changes | CFG-3, CFG-5, component | `pnpm dev`, visual check |
| Add authentication | API-1, ADM-*, CFG-1 | New middleware + RLS |
