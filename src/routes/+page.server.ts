import { supabase } from '$lib/supabase';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  // Fetch featured notes
  const { data: featuredNotes } = await supabase
    .from('articles')
    .select(`
      id,
      title,
      slug,
      excerpt,
      hero_image_url,
      published_at,
      author:authors(name, slug, avatar_url)
    `)
    .eq('category', 'note')
    .eq('featured', true)
    .order('published_at', { ascending: false })
    .limit(3);

  // Fetch news articles
  const { data: newsArticles } = await supabase
    .from('articles')
    .select(`
      id,
      title,
      slug,
      excerpt,
      published_at
    `)
    .eq('category', 'news')
    .order('published_at', { ascending: false })
    .limit(20);

  // Fetch videos
  const { data: videos } = await supabase
    .from('articles')
    .select(`
      id,
      title,
      slug,
      hero_image_url,
      published_at
    `)
    .eq('category', 'video')
    .order('published_at', { ascending: false })
    .limit(10);

  return {
    featuredNotes: featuredNotes || [],
    newsArticles: newsArticles || [],
    videos: videos || []
  };
};
