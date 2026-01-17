import { supabase } from '$lib/supabase';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  try {
    // Fetch featured notes
    const { data: featuredNotes, error: featuredError } = await supabase
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
    const { data: newsArticles, error: newsError } = await supabase
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
    const { data: videos, error: videosError } = await supabase
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

    // Log errors but don't fail - return empty arrays
    if (featuredError) console.error('Error fetching featured notes:', featuredError);
    if (newsError) console.error('Error fetching news articles:', newsError);
    if (videosError) console.error('Error fetching videos:', videosError);

    return {
      featuredNotes: featuredNotes || [],
      newsArticles: newsArticles || [],
      videos: videos || []
    };
  } catch (error) {
    console.error('Error loading page data:', error);
    return {
      featuredNotes: [],
      newsArticles: [],
      videos: []
    };
  }
};
