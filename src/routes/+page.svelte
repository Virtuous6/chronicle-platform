<script lang="ts">
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  const { featuredNotes, newsArticles, videos } = data;

  function formatDate(dateString: string | null): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  }
</script>

<svelte:head>
  <title>Chronicle</title>
</svelte:head>

<div class="min-h-screen bg-chronicle-bg">
  <!-- Header -->
  <header class="border-b border-stone-300 bg-white/80 backdrop-blur-sm">
    <nav class="mx-auto max-w-7xl px-6 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-8">
          <a href="/" class="text-2xl font-bold text-chronicle-text-dark">Chronicle</a>
          <div class="hidden md:flex gap-6">
            <a href="/" class="text-sm text-chronicle-text hover:text-chronicle-text-dark">Home</a>
            <a href="/about" class="text-sm text-chronicle-text hover:text-chronicle-text-dark">About</a>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <a href="/admin" class="text-sm text-chronicle-text hover:text-chronicle-text-dark">Admin</a>
          <a href="/admin" class="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            Get Started
          </a>
        </div>
      </div>
    </nav>
  </header>

  <!-- Main Content -->
  <main class="mx-auto max-w-7xl px-6 py-12">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      <!-- Left Column - Featured Notes -->
      <aside class="lg:col-span-3">
        <h2 class="text-xs font-semibold text-chronicle-text-light uppercase tracking-wider mb-6">Notes</h2>
        <div class="space-y-6">
          {#each featuredNotes as article}
            <a href="/{article.slug}" class="block group">
              <article class="border border-stone-300 bg-white/60 p-4 rounded-sm hover:bg-white transition-colors">
                {#if article.hero_image_url}
                  <img src={article.hero_image_url} alt={article.title} class="w-full h-32 object-cover rounded-sm mb-3" />
                {/if}
                <div class="text-xs text-chronicle-text-light uppercase mb-2">
                  Featured · {formatDate(article.published_at)}
                </div>
                <h3 class="text-lg font-serif font-bold text-chronicle-text-dark group-hover:text-chronicle-text mb-2">
                  {article.title}
                </h3>
                <p class="text-sm text-chronicle-text line-clamp-2">{article.excerpt}</p>
              </article>
            </a>
          {/each}
        </div>
      </aside>

      <!-- Center Column - News Feed -->
      <section class="lg:col-span-6">
        <h2 class="text-xs font-semibold text-chronicle-text-light uppercase tracking-wider mb-6">News</h2>
        
        <!-- Hero Featured Article -->
        {#if newsArticles.length > 0}
          <a href="/{newsArticles[0].slug}" class="block group mb-8">
            <article class="relative overflow-hidden rounded-sm bg-stone-800 text-white">
              <div class="aspect-[16/9] bg-gradient-to-br from-teal-800 to-teal-900"></div>
              <div class="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent">
                <div class="p-8">
                  <div class="text-xs uppercase mb-2 opacity-90">
                    Featured · {formatDate(newsArticles[0].published_at)}
                  </div>
                  <h2 class="text-3xl font-serif font-bold mb-2 group-hover:opacity-80 transition-opacity">
                    {newsArticles[0].title}
                  </h2>
                  <p class="text-sm opacity-90">{newsArticles[0].excerpt}</p>
                </div>
              </div>
            </article>
          </a>
        {/if}

        <!-- News List -->
        <div class="space-y-6">
          {#each newsArticles as article}
            <a href="/{article.slug}" class="block group">
              <article class="border-b border-stone-300 pb-6">
                <div class="text-xs text-chronicle-text-light uppercase mb-2">
                  {formatDate(article.published_at)}
                </div>
                <h3 class="text-xl font-serif font-bold text-chronicle-text-dark group-hover:text-chronicle-text mb-2">
                  {article.title}
                </h3>
                <p class="text-sm text-chronicle-text">{article.excerpt}</p>
              </article>
            </a>
          {/each}
        </div>
      </section>

      <!-- Right Column - Videos -->
      <aside class="lg:col-span-3">
        <h2 class="text-xs font-semibold text-chronicle-text-light uppercase tracking-wider mb-6">Videos</h2>
        <div class="space-y-6">
          {#each videos as video}
            <a href="/{video.slug}" class="block group">
              <article class="border border-stone-300 bg-white/60 rounded-sm overflow-hidden hover:bg-white transition-colors">
                {#if video.hero_image_url}
                  <img src={video.hero_image_url} alt={video.title} class="w-full h-32 object-cover" />
                {/if}
                <div class="p-4">
                  <h3 class="text-sm font-serif font-bold text-chronicle-text-dark group-hover:text-chronicle-text mb-1">
                    {video.title}
                  </h3>
                  <div class="text-xs text-chronicle-text-light">
                    {formatDate(video.published_at)}
                  </div>
                </div>
              </article>
            </a>
          {/each}
        </div>
      </aside>

    </div>
  </main>

  <!-- Footer -->
  <footer class="border-t border-stone-300 bg-white/80 backdrop-blur-sm mt-20">
    <div class="mx-auto max-w-7xl px-6 py-12">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 class="font-bold text-chronicle-text-dark mb-4">Product</h3>
          <ul class="space-y-2 text-sm text-chronicle-text">
            <li><a href="/" class="hover:text-chronicle-text-dark">Home</a></li>
            <li><a href="/about" class="hover:text-chronicle-text-dark">About</a></li>
          </ul>
        </div>
        <div>
          <h3 class="font-bold text-chronicle-text-dark mb-4">Resources</h3>
          <ul class="space-y-2 text-sm text-chronicle-text">
            <li><a href="/" class="hover:text-chronicle-text-dark">Chronicle</a></li>
            <li><a href="/" class="hover:text-chronicle-text-dark">Documentation</a></li>
          </ul>
        </div>
        <div>
          <h3 class="font-bold text-chronicle-text-dark mb-4">Community</h3>
          <ul class="space-y-2 text-sm text-chronicle-text">
            <li><a href="#" class="hover:text-chronicle-text-dark">Twitter</a></li>
            <li><a href="#" class="hover:text-chronicle-text-dark">GitHub</a></li>
          </ul>
        </div>
      </div>
      <div class="mt-8 pt-8 border-t border-stone-300 text-sm text-chronicle-text-light">
        <p>&copy; 2026 Chronicle. All rights reserved.</p>
      </div>
    </div>
  </footer>
</div>
