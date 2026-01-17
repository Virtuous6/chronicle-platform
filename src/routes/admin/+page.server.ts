import { supabase } from '$lib/supabase';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  try {
    const { data: articles, error: articlesError } = await supabase
      .from('articles')
      .select(`
        id,
        title,
        slug,
        category,
        featured,
        published_at,
        created_at
      `)
      .order('created_at', { ascending: false });

    if (articlesError) {
      console.error('Error fetching articles:', articlesError);
    }

    return {
      articles: articles || []
    };
  } catch (error) {
    console.error('Error loading admin page:', error);
    return {
      articles: []
    };
  }
};
