<script lang="ts">
  import { marked } from 'marked';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  const article = $derived(data.article);
  const htmlContent = $derived(marked(article.content));

  function formatDate(dateString: string | null): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase();
  }

  // Format category for display (uppercase)
  const categoryDisplay = $derived(article.category?.toUpperCase() || 'NEWS');
</script>

<svelte:head>
  <title>{article.title} - The 7th Signal</title>
  <meta name="description" content={article.excerpt || ''} />
</svelte:head>

<div class="min-h-screen bg-chronicle-bg article-page-grid">
  <!-- Header - Logo at left, breadcrumb aligned with centered content -->
  <header class="sticky top-0 z-50 bg-chronicle-bg/95 backdrop-blur-sm">
    <div class="flex items-center px-6 py-4">
      <!-- Logo - Fixed width column on left -->
      <div class="w-48 flex-shrink-0">
        <a href="/" class="hover:opacity-80">
          <span class="amp-logo text-2xl text-chronicle-text">The 7th Signal</span>
        </a>
      </div>
      
      <!-- Breadcrumb - Aligned with content column, with vertical divider -->
      <div class="flex items-center gap-2 text-sm tracking-wider text-chronicle-text-muted border-l-2 border-chronicle-accent pl-4">
        <a href="/chronicle" class="hover:text-chronicle-text uppercase">Chronicle</a>
        <span>//</span>
        <span>[{categoryDisplay}]</span>
        <span class="text-chronicle-text uppercase">{article.title.toUpperCase()}</span>
      </div>
    </div>
  </header>

  <!-- Hero Image (full-width, reasonable height constraint) -->
  {#if article.hero_image_url}
    <div class="w-full mt-8">
      <img 
        src={article.hero_image_url} 
        alt={article.title}
        class="w-full max-h-[400px] object-cover"
      />
    </div>
  {/if}

  <!-- Article Content - Centered column -->
  <article class="mx-auto max-w-3xl px-6 py-16">
    <!-- Date with left accent border -->
    <div class="border-l-2 border-chronicle-accent pl-4 mb-6">
      <time class="text-sm text-chronicle-text-muted tracking-widest">{formatDate(article.published_at)}</time>
    </div>

    <!-- Large Italic Serif Title -->
    <h1 class="font-display text-5xl md:text-6xl lg:text-7xl text-chronicle-text italic mb-8 leading-tight">
      {article.title}
    </h1>

    <!-- Excerpt as Lead -->
    {#if article.excerpt}
      <p class="text-xl text-chronicle-text leading-relaxed mb-12 font-serif">
        {article.excerpt}
      </p>
    {/if}

    <!-- Article Body -->
    <div class="prose prose-invert prose-lg max-w-none">
      {@html htmlContent}
    </div>
  </article>

  <!-- Footer - Logo aligned with header -->
  <footer class="border-t border-chronicle-border mt-20">
    <div class="mx-auto max-w-[1600px] px-6 py-16">
      <div class="grid grid-cols-12 gap-8">
        <!-- Left: Logo and Status - Same column as header logo -->
        <div class="col-span-12 md:col-span-3">
          <a href="/" class="hover:opacity-80">
            <div class="amp-logo text-2xl text-chronicle-text mb-6">The 7th Signal</div>
          </a>
          <div class="flex items-center gap-2 text-sm text-chronicle-text-muted mb-4">
            <span class="w-2 h-2 rounded-full bg-green-500"></span>
            All Systems Operational
          </div>
          <div class="space-y-2 text-sm text-chronicle-text-muted">
            <a href="/security" class="block hover:text-chronicle-text">Security</a>
            <a href="/terms" class="block hover:text-chronicle-text">Terms of Service</a>
          </div>
        </div>

        <!-- Right: 4 Link Columns -->
        <div class="col-span-12 md:col-span-9 flex flex-wrap gap-12 md:gap-16 text-sm md:justify-end">
          <div>
            <h4 class="text-chronicle-text font-medium mb-4">Product</h4>
            <ul class="space-y-2 text-chronicle-text-muted">
              <li><a href="/admin" class="hover:text-chronicle-text">Dashboard</a></li>
              <li><a href="/manual" class="hover:text-chronicle-text">Owner's Manual</a></li>
              <li><a href="/models" class="hover:text-chronicle-text">Models</a></li>
              <li><a href="/free" class="hover:text-chronicle-text">The 7th Signal Free</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-chronicle-text font-medium mb-4">Resources</h4>
            <ul class="space-y-2 text-chronicle-text-muted">
              <li><a href="/chronicle" class="hover:text-chronicle-text">Chronicle</a></li>
              <li><a href="/pricing" class="hover:text-chronicle-text">Pricing</a></li>
              <li><a href="/podcast" class="hover:text-chronicle-text">Podcast</a></li>
              <li><a href="/press-kit" class="hover:text-chronicle-text">Press Kit</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-chronicle-text font-medium mb-4">Guides</h4>
            <ul class="space-y-2 text-chronicle-text-muted">
              <li><a href="/guides/how-to-build-an-agent" class="hover:text-chronicle-text">How to Build an Agent</a></li>
              <li><a href="/guides/context-management" class="hover:text-chronicle-text">Context Management</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-chronicle-text font-medium mb-4">Community</h4>
            <ul class="space-y-2 text-chronicle-text-muted">
              <li><a href="https://twitter.com/the7thsignal" class="hover:text-chronicle-text">𝕏 @the7thsignal</a></li>
              <li><a href="https://youtube.com/@the7thsignal" class="hover:text-chronicle-text">YouTube</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
</div>

<style>
  /* Amp-style vertical grid lines pattern */
  .article-page-grid {
    position: relative;
    background-image: 
      repeating-linear-gradient(
        90deg,
        transparent 0,
        transparent calc(33.333% - 1px),
        rgba(100, 130, 120, 0.12) calc(33.333% - 1px),
        rgba(100, 130, 120, 0.12) 33.333%
      );
    background-size: 100% 100%;
  }

  /* Add subtle dashed effect overlay */
  .article-page-grid::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background-image: 
      repeating-linear-gradient(
        180deg,
        transparent 0,
        transparent 8px,
        rgba(100, 130, 120, 0.08) 8px,
        rgba(100, 130, 120, 0.08) 9px
      );
    background-position: 33.333% 0, 66.666% 0;
    background-size: 1px 100%;
    background-repeat: repeat-y;
  }

  :global(.prose-invert p) {
    @apply text-chronicle-text leading-relaxed mb-6;
    font-family: 'Source Serif 4', Georgia, serif;
    font-size: 1.125rem;
    line-height: 1.8;
  }

  :global(.prose-invert h2) {
    @apply text-2xl font-normal text-chronicle-text mt-12 mb-4;
    font-family: 'Playfair Display', Georgia, serif;
  }

  :global(.prose-invert h3) {
    @apply text-xl font-normal text-chronicle-text mt-8 mb-3;
    font-family: 'Playfair Display', Georgia, serif;
  }

  :global(.prose-invert ul, .prose-invert ol) {
    @apply my-4 ml-6;
  }

  :global(.prose-invert li) {
    @apply mb-2 text-chronicle-text;
    font-family: 'Source Serif 4', Georgia, serif;
  }

  :global(.prose-invert a) {
    @apply text-chronicle-accent underline hover:no-underline;
  }

  :global(.prose-invert blockquote) {
    @apply border-l-2 border-chronicle-accent/50 pl-6 italic text-chronicle-text-muted my-8;
  }

  :global(.prose-invert code) {
    @apply px-1.5 py-0.5 rounded text-sm font-mono text-chronicle-text;
    background-color: #0d2528;
  }

  :global(.prose-invert pre) {
    @apply p-6 rounded my-8 overflow-x-auto;
    background-color: #0d2528;
  }

  :global(.prose-invert pre code) {
    @apply bg-transparent p-0;
  }

  :global(.prose-invert strong) {
    @apply font-bold text-chronicle-text;
  }

  :global(.prose-invert img) {
    @apply my-8 w-full h-auto;
  }
</style>
