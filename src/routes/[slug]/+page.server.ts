import { supabase } from '$lib/supabase';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const { data: article } = await supabase
    .from('articles')
    .select(`
      id,
      title,
      slug,
      content,
      excerpt,
      hero_image_url,
      published_at,
      category,
      author:authors(name, slug, avatar_url)
    `)
    .eq('slug', params.slug)
    .single();

  if (!article) {
    throw error(404, 'Article not found');
  }

  return {
    article
  };
};
