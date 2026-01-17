import { supabase } from '$lib/supabase';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  try {
    const { data: article, error: articleError } = await supabase
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

    if (articleError || !article) {
      throw error(404, 'Article not found');
    }

    // Fix author type - Supabase returns object for single relation, not array
    const articleWithAuthor = {
      ...article,
      author: Array.isArray(article.author) ? article.author[0] : article.author
    };

    return {
      article: articleWithAuthor
    };
  } catch (err) {
    if (err && typeof err === 'object' && 'status' in err) {
      throw err; // Re-throw SvelteKit errors
    }
    throw error(500, 'Failed to load article');
  }
};
