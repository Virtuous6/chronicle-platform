# Chronicle - Content Platform

A modern content platform inspired by [ampcode.com/chronicle](https://ampcode.com/chronicle), built with SvelteKit, Tailwind CSS, and Supabase.

## Features

### Public-Facing Website
- **Three-column layout** organizing content into Notes, News, and Videos
- **Responsive design** that works beautifully on all devices
- **Individual article pages** with full-width hero images and clean typography
- **Markdown rendering** for rich content formatting
- **Category-based organization** for easy content discovery

### Admin Interface
- **Dashboard** with article statistics and management
- **Create/Edit articles** with markdown editor
- **Category management** (Notes, News, Videos)
- **Featured articles** highlighting
- **Draft/Publish workflow** for content control
- **Hero image support** for visual impact

## Tech Stack

### Frontend
- **SvelteKit** - Fast, modern web framework
- **Tailwind CSS** - Utility-first styling
- **TypeScript** - Type-safe development
- **Marked** - Markdown parsing

### Backend
- **Supabase** - PostgreSQL database with real-time capabilities
- **Row Level Security** - Secure data access
- **RESTful API** - Clean data endpoints

## Getting Started

### Prerequisites
- Node.js 18+ installed
- Supabase account (free tier works great)

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   
   The `.env` file is already configured with your Supabase credentials:
   ```env
   PUBLIC_SUPABASE_URL=https://ktmxcvvhfeeuocjymzpy.supabase.co
   PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   
   Visit `http://localhost:5173` to see your Chronicle site!

## Project Structure

```
chronicle-clone/
├── src/
│   ├── lib/
│   │   └── supabase.ts          # Supabase client configuration
│   ├── routes/
│   │   ├── +page.svelte         # Homepage with three-column layout
│   │   ├── +page.server.ts      # Homepage data loading
│   │   ├── [slug]/
│   │   │   ├── +page.svelte     # Individual article pages
│   │   │   └── +page.server.ts  # Article data loading
│   │   ├── admin/
│   │   │   ├── +page.svelte     # Admin dashboard
│   │   │   ├── +page.server.ts  # Admin data loading
│   │   │   └── new/
│   │   │       └── +page.svelte # New article form
│   │   └── api/
│   │       └── articles/
│   │           └── +server.ts   # Article creation API
│   ├── app.css                  # Global styles with Tailwind
│   └── app.html                 # HTML template
├── migrations/
│   └── 001_initial_schema.sql   # Database schema
└── package.json                 # Dependencies
```

## Database Schema

The database includes two main tables:

**Authors** - Content creators
- id, name, slug, bio, avatar_url

**Articles** - Content items
- id, title, slug, excerpt, content, category, featured, hero_image_url, author_id, published_at

Row Level Security (RLS) is enabled to ensure public users can only read published articles.

## Usage

### Creating Articles

1. Navigate to `/admin` to see the admin dashboard
2. Click "New Article" to create content
3. Fill in the form with title, content (markdown), category, etc.
4. Check "Publish Now" to make it live, or leave unchecked to save as draft
5. Click "Create Article" to save

### Managing Content

The admin dashboard shows:
- Total articles count
- Published vs draft articles
- Featured articles
- Full article list with edit/view links

### Customizing Design

The site uses Tailwind CSS with a stone/blue color scheme. Edit `tailwind.config.js` and component files to customize colors, fonts, and layout.

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Build for Production

```bash
npm run build
npm run preview  # Test production build locally
```

## License

MIT License - feel free to use this project as a starting point for your own content platform!

## Acknowledgments

Inspired by the beautiful design of [Amp's Chronicle](https://ampcode.com/chronicle).
