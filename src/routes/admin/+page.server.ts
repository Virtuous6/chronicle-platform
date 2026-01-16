import { supabase } from '$lib/supabase';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const { data: articles } = await supabase
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

  return {
    articles: articles || []
  };
};
