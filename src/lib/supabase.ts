import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

export const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

export type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category: 'note' | 'news' | 'video';
  featured: boolean;
  hero_image_url: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  author: {
    name: string;
    slug: string;
    avatar_url: string | null;
  } | null;
};
