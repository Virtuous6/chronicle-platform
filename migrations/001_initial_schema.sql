-- Create authors table
CREATE TABLE IF NOT EXISTS authors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('note', 'news', 'video')),
  featured BOOLEAN DEFAULT FALSE,
  hero_image_url TEXT,
  author_id UUID REFERENCES authors(id),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_featured ON articles(featured);

-- Enable Row Level Security
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;

-- Allow public to read published articles
CREATE POLICY "Public can read published articles"
  ON articles FOR SELECT
  USING (published_at IS NOT NULL AND published_at <= NOW());

-- Allow public to read authors
CREATE POLICY "Public can read authors"
  ON authors FOR SELECT
  USING (true);

-- Insert sample author
INSERT INTO authors (name, slug, bio) VALUES
  ('Alex Chen', 'alex-chen', 'Content creator and developer')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample articles
INSERT INTO articles (title, slug, excerpt, content, category, featured, hero_image_url, author_id, published_at) VALUES
  (
    'How to Build with AI',
    'how-to-build-with-ai',
    'A comprehensive guide to building modern applications with AI assistance.',
    '# How to Build with AI

This is a comprehensive guide to building modern applications with AI assistance.

## Getting Started

AI tools have revolutionized how we build software. Here are some key principles:

1. **Start with clear specifications**
2. **Iterate quickly**
3. **Test thoroughly**

## Best Practices

When working with AI coding assistants, remember to:

- Provide context
- Review generated code
- Maintain security standards',
    'note',
    true,
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
    (SELECT id FROM authors WHERE slug = 'alex-chen'),
    NOW() - INTERVAL '2 days'
  ),
  (
    'Welcome to Chronicle',
    'welcome-to-chronicle',
    'Introducing our new content platform built with SvelteKit and Supabase.',
    '# Welcome to Chronicle

We''re excited to introduce Chronicle, a modern content platform built with cutting-edge technologies.

## Tech Stack

- **SvelteKit**: Fast, modern frontend framework
- **Supabase**: PostgreSQL database with real-time capabilities
- **Tailwind CSS**: Utility-first styling

## Features

Chronicle provides a clean, organized way to share notes, news, and videos with your audience.',
    'news',
    false,
    NULL,
    (SELECT id FROM authors WHERE slug = 'alex-chen'),
    NOW()
  ),
  (
    'Building Modern Web Apps',
    'building-modern-web-apps',
    'Best practices for creating fast, scalable web applications.',
    '# Building Modern Web Apps

Learn the best practices for creating fast, scalable web applications in 2026.

## Performance

- Optimize bundle sizes
- Implement lazy loading
- Use modern image formats

## Scalability

Design your architecture to handle growth from day one.',
    'news',
    false,
    NULL,
    (SELECT id FROM authors WHERE slug = 'alex-chen'),
    NOW() - INTERVAL '1 day'
  ),
  (
    'Getting Started with SvelteKit',
    'getting-started-sveltekit',
    'A video tutorial on building your first SvelteKit application.',
    '# Getting Started with SvelteKit

Watch this comprehensive video tutorial to build your first SvelteKit application.

## What You''ll Learn

- Project setup
- Routing basics
- Data fetching
- Deployment',
    'video',
    false,
    'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
    (SELECT id FROM authors WHERE slug = 'alex-chen'),
    NOW() - INTERVAL '6 days'
  )
ON CONFLICT (slug) DO NOTHING;
