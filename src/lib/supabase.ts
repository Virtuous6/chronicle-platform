import { createClient } from '@supabase/supabase-js';

// Get environment variables with fallbacks
// Vite provides these via import.meta.env at runtime
const supabaseUrl = (import.meta.env.PUBLIC_SUPABASE_URL as string | undefined) 
  || 'https://ktmxcvvhfeeuocjymzpy.supabase.co';
const supabaseAnonKey = (import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string | undefined) 
  || 'placeholder-key';

// Create Supabase client - will work even with placeholder key for development
// Actual queries will fail gracefully if credentials are invalid
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
