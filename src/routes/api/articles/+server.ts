import { json } from '@sveltejs/kit';
import { supabase } from '$lib/supabase';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const body = await request.json();
    
    const { title, slug, excerpt, content, category, featured, hero_image_url, published_at } = body;

    // Get the default author (Alex Chen)
    const { data: author } = await supabase
      .from('authors')
      .select('id')
      .eq('slug', 'joe-lucky')
      .single();

    if (!author) {
      return json({ error: 'Default author not found' }, { status: 500 });
    }

    const { data, error } = await supabase
      .from('articles')
      .insert({
        title,
        slug,
        excerpt,
        content,
        category,
        featured: featured || false,
        hero_image_url,
        author_id: author.id,
        published_at: published_at || null,
      })
      .select()
      .single();

    if (error) {
      return json({ error: error.message }, { status: 400 });
    }

    return json({ data }, { status: 201 });
  } catch (err) {
    return json({ error: 'Internal server error' }, { status: 500 });
  }
};
