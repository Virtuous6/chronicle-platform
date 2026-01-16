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

<div class="min-h-screen bg-stone-100">
  <!-- Header -->
  <header class="border-b border-stone-300 bg-white">
    <nav class="mx-auto max-w-7xl px-6 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-8">
          <a href="/" class="text-2xl font-bold text-stone-900">Chronicle</a>
          <div class="hidden md:flex gap-6">
            <a href="/" class="text-sm text-stone-600 hover:text-stone-900">Home</a>
            <a href="/about" class="text-sm text-stone-600 hover:text-stone-900">About</a>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <a href="/admin" class="text-sm text-stone-600 hover:text-stone-900">Admin</a>
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
        <h2 class="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-6">Notes</h2>
        <div class="space-y-6">
          {#each featuredNotes as article}
            <a href="/{article.slug}" class="block group">
              <article class="border border-stone-300 bg-white p-4 rounded-lg hover:shadow-lg transition-shadow">
                {#if article.hero_image_url}
                  <img src={article.hero_image_url} alt={article.title} class="w-full h-32 object-cover rounded mb-3" />
                {/if}
                <div class="text-xs text-stone-500 uppercase mb-2">
                  Featured · {formatDate(article.published_at)}
                </div>
                <h3 class="text-lg font-bold text-stone-900 group-hover:text-blue-600 mb-2">
                  {article.title}
                </h3>
                <p class="text-sm text-stone-600 line-clamp-2">{article.excerpt}</p>
              </article>
            </a>
          {/each}
        </div>
      </aside>

      <!-- Center Column - News Feed -->
      <section class="lg:col-span-6">
        <h2 class="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-6">News</h2>
        
        <!-- Hero Featured Article -->
        {#if newsArticles.length > 0}
          <a href="/{newsArticles[0].slug}" class="block group mb-8">
            <article class="relative overflow-hidden rounded-lg bg-stone-800 text-white">
              <div class="aspect-[16/9] bg-gradient-to-br from-blue-600 to-purple-700"></div>
              <div class="absolute inset-0 flex items-end">
                <div class="p-8">
                  <div class="text-xs uppercase mb-2 opacity-90">
                    Featured · {formatDate(newsArticles[0].published_at)}
                  </div>
                  <h2 class="text-3xl font-bold mb-2 group-hover:text-blue-300 transition-colors">
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
              <article class="border-b border-stone-200 pb-6">
                <div class="text-xs text-stone-500 uppercase mb-2">
                  {formatDate(article.published_at)}
                </div>
                <h3 class="text-xl font-bold text-stone-900 group-hover:text-blue-600 mb-2">
                  {article.title}
                </h3>
                <p class="text-sm text-stone-600">{article.excerpt}</p>
              </article>
            </a>
          {/each}
        </div>
      </section>

      <!-- Right Column - Videos -->
      <aside class="lg:col-span-3">
        <h2 class="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-6">Videos</h2>
        <div class="space-y-6">
          {#each videos as video}
            <a href="/{video.slug}" class="block group">
              <article class="border border-stone-300 bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                {#if video.hero_image_url}
                  <img src={video.hero_image_url} alt={video.title} class="w-full h-32 object-cover" />
                {/if}
                <div class="p-4">
                  <h3 class="text-sm font-bold text-stone-900 group-hover:text-blue-600 mb-1">
                    {video.title}
                  </h3>
                  <div class="text-xs text-stone-500">
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
  <footer class="border-t border-stone-300 bg-white mt-20">
    <div class="mx-auto max-w-7xl px-6 py-12">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 class="font-bold text-stone-900 mb-4">Product</h3>
          <ul class="space-y-2 text-sm text-stone-600">
            <li><a href="/" class="hover:text-stone-900">Home</a></li>
            <li><a href="/about" class="hover:text-stone-900">About</a></li>
          </ul>
        </div>
        <div>
          <h3 class="font-bold text-stone-900 mb-4">Resources</h3>
          <ul class="space-y-2 text-sm text-stone-600">
            <li><a href="/" class="hover:text-stone-900">Chronicle</a></li>
            <li><a href="/" class="hover:text-stone-900">Documentation</a></li>
          </ul>
        </div>
        <div>
          <h3 class="font-bold text-stone-900 mb-4">Community</h3>
          <ul class="space-y-2 text-sm text-stone-600">
            <li><a href="#" class="hover:text-stone-900">Twitter</a></li>
            <li><a href="#" class="hover:text-stone-900">GitHub</a></li>
          </ul>
        </div>
      </div>
      <div class="mt-8 pt-8 border-t border-stone-200 text-sm text-stone-500">
        <p>&copy; 2026 Chronicle. All rights reserved.</p>
      </div>
    </div>
  </footer>
</div>
