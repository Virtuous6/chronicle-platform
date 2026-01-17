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
  <header class="border-b border-chronicle-border bg-chronicle-bg">
    <nav class="mx-auto max-w-7xl px-6 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-8">
          <a href="/" class="text-2xl font-bold text-chronicle-text">Chronicle</a>
          <div class="hidden md:flex gap-6">
            <a href="/" class="text-sm text-chronicle-text-muted hover:text-chronicle-text">Home</a>
            <a href="/about" class="text-sm text-chronicle-text-muted hover:text-chronicle-text">About</a>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <a href="/admin" class="text-sm text-chronicle-text-muted hover:text-chronicle-text">Admin</a>
          <a href="/admin" class="rounded-md bg-chronicle-accent px-4 py-2 text-sm font-medium text-white hover:bg-orange-600">
            Dashboard
          </a>
        </div>
      </div>
    </nav>
  </header>

  <!-- Main Content with Table-like Layout -->
  <main class="mx-auto max-w-7xl">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-0">
      
      <!-- Left Column - Featured Notes -->
      <aside class="lg:col-span-3 border-r border-chronicle-border px-6 py-8">
        <h2 class="text-xs font-semibold text-chronicle-text-muted uppercase tracking-wider mb-8">NOTES</h2>
        <div class="space-y-8">
          {#each featuredNotes as article}
            <a href="/{article.slug}" class="block group">
              <article>
                {#if article.hero_image_url}
                  <img src={article.hero_image_url} alt={article.title} class="w-full h-40 object-cover mb-4" />
                {/if}
                <div class="text-xs text-chronicle-text-muted uppercase mb-2">
                  Featured · {formatDate(article.published_at)}
                </div>
                <h3 class="text-lg font-serif font-bold text-chronicle-text group-hover:opacity-80 mb-2">
                  {article.title}
                </h3>
                <p class="text-sm text-chronicle-text-muted">{article.excerpt}</p>
              </article>
            </a>
          {/each}
        </div>
      </aside>

      <!-- Center Column - News Feed -->
      <section class="lg:col-span-6 border-r border-chronicle-border px-6 py-8">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-xs font-semibold text-chronicle-text-muted uppercase tracking-wider">NEWS</h2>
          <a href="#" class="text-xs text-chronicle-text-muted hover:text-chronicle-text">RSS</a>
        </div>
        
        <!-- Hero Featured Article -->
        {#if newsArticles.length > 0}
          <a href="/{newsArticles[0].slug}" class="block group mb-8">
            <article class="relative overflow-hidden">
              <div class="aspect-[16/9] bg-gradient-to-br from-teal-700 to-teal-800"></div>
              <div class="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 to-transparent p-8">
                <div>
                  <div class="text-xs uppercase mb-2 opacity-90">
                    Featured · {formatDate(newsArticles[0].published_at)}
                  </div>
                  <h2 class="text-3xl font-serif font-bold mb-2 group-hover:opacity-80">
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
              <article class="pb-6">
                <div class="text-xs text-chronicle-text-muted uppercase mb-2">
                  {formatDate(article.published_at)}
                </div>
                <h3 class="text-xl font-serif font-bold text-chronicle-text group-hover:opacity-80 mb-2">
                  {article.title}
                </h3>
                <p class="text-sm text-chronicle-text-muted">{article.excerpt}</p>
              </article>
            </a>
          {/each}
        </div>
      </section>

      <!-- Right Column - Videos -->
      <aside class="lg:col-span-3 px-6 py-8">
        <h2 class="text-xs font-semibold text-chronicle-text-muted uppercase tracking-wider mb-8">VIDEOS</h2>
        <div class="space-y-6">
          {#each videos as video}
            <a href="/{video.slug}" class="block group">
              <article>
                {#if video.hero_image_url}
                  <img src={video.hero_image_url} alt={video.title} class="w-full h-32 object-cover mb-3" />
                {/if}
                <h3 class="text-sm font-serif font-bold text-chronicle-text group-hover:opacity-80 mb-1">
                  {video.title}
                </h3>
                <div class="text-xs text-chronicle-text-muted">
                  {formatDate(video.published_at)}
                </div>
              </article>
            </a>
          {/each}
        </div>
      </aside>

    </div>
  </main>

  <!-- Footer -->
  <footer class="border-t border-chronicle-border bg-chronicle-bg mt-20">
    <div class="mx-auto max-w-7xl px-6 py-12">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 class="font-bold text-chronicle-text mb-4">Product</h3>
          <ul class="space-y-2 text-sm text-chronicle-text-muted">
            <li><a href="/" class="hover:text-chronicle-text">Home</a></li>
            <li><a href="/about" class="hover:text-chronicle-text">About</a></li>
          </ul>
        </div>
        <div>
          <h3 class="font-bold text-chronicle-text mb-4">Resources</h3>
          <ul class="space-y-2 text-sm text-chronicle-text-muted">
            <li><a href="/" class="hover:text-chronicle-text">Chronicle</a></li>
            <li><a href="/" class="hover:text-chronicle-text">Documentation</a></li>
          </ul>
        </div>
        <div>
          <h3 class="font-bold text-chronicle-text mb-4">Community</h3>
          <ul class="space-y-2 text-sm text-chronicle-text-muted">
            <li><a href="#" class="hover:text-chronicle-text">Twitter</a></li>
            <li><a href="#" class="hover:text-chronicle-text">GitHub</a></li>
          </ul>
        </div>
      </div>
      <div class="mt-8 pt-8 border-t border-chronicle-border text-sm text-chronicle-text-muted">
        <p>&copy; 2026 Chronicle. All rights reserved.</p>
      </div>
    </div>
  </footer>
</div>
