<script lang="ts">
  import { marked } from 'marked';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  const { article } = data;

  const htmlContent = marked(article.content);

  function formatDate(dateString: string | null): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  }
</script>

<svelte:head>
  <title>{article.title} - Chronicle</title>
  <meta name="description" content={article.excerpt || ''} />
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

  <!-- Hero Section -->
  {#if article.hero_image_url}
    <div class="relative h-96 overflow-hidden">
      <img 
        src={article.hero_image_url} 
        alt={article.title}
        class="w-full h-full object-cover opacity-60"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-chronicle-bg/90 to-transparent"></div>
    </div>
  {:else}
    <div class="h-64 bg-gradient-to-br from-teal-700 to-teal-800"></div>
  {/if}

  <!-- Article Content -->
  <article class="mx-auto max-w-3xl px-6 -mt-32 relative z-10">
    <!-- Article Header -->
    <div class="bg-chronicle-bg border border-chronicle-border p-8 mb-8">
      <div class="text-xs text-chronicle-text-muted uppercase tracking-wider mb-4">
        <a href="/" class="hover:text-chronicle-text">Chronicle</a>
        <span class="mx-2">›</span>
        <span class="capitalize">{article.category}</span>
        <span class="mx-2">›</span>
        <span>{article.title}</span>
      </div>

      {#if article.author}
        <div class="flex items-center gap-3 mb-4">
          {#if article.author.avatar_url}
            <img 
              src={article.author.avatar_url} 
              alt={article.author.name}
              class="w-10 h-10 rounded-full"
            />
          {/if}
          <div>
            <div class="font-medium text-chronicle-text">{article.author.name}</div>
            <div class="text-sm text-chronicle-text-muted">{formatDate(article.published_at)}</div>
          </div>
        </div>
      {/if}

      <h1 class="text-4xl md:text-5xl font-serif font-bold text-chronicle-text mb-4 leading-tight">
        {article.title}
      </h1>

      {#if article.excerpt}
        <p class="text-xl text-chronicle-text-muted leading-relaxed">
          {article.excerpt}
        </p>
      {/if}
    </div>

    <!-- Article Body -->
    <div class="bg-chronicle-bg border border-chronicle-border p-8 mb-12">
      <div class="prose prose-invert prose-lg max-w-none">
        {@html htmlContent}
      </div>
    </div>

    <!-- Back to Home -->
    <div class="mb-12">
      <a 
        href="/" 
        class="inline-flex items-center gap-2 text-chronicle-text-muted hover:text-chronicle-text font-medium"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Chronicle
      </a>
    </div>
  </article>

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

<style>
  :global(.prose-invert h1) {
    @apply text-3xl font-serif font-bold text-chronicle-text mt-8 mb-4;
  }

  :global(.prose-invert h2) {
    @apply text-2xl font-serif font-bold text-chronicle-text mt-6 mb-3;
  }

  :global(.prose-invert h3) {
    @apply text-xl font-serif font-bold text-chronicle-text mt-4 mb-2;
  }

  :global(.prose-invert p) {
    @apply text-chronicle-text-muted leading-relaxed mb-4;
  }

  :global(.prose-invert ul, .prose-invert ol) {
    @apply my-4 ml-6;
  }

  :global(.prose-invert li) {
    @apply mb-2 text-chronicle-text-muted;
  }

  :global(.prose-invert code) {
    @apply bg-black/30 px-2 py-1 rounded text-sm font-mono text-chronicle-text;
  }

  :global(.prose-invert pre) {
    @apply bg-black/30 border border-chronicle-border p-4 rounded overflow-x-auto my-4;
  }

  :global(.prose-invert pre code) {
    @apply bg-transparent p-0 text-chronicle-text-muted;
  }

  :global(.prose-invert a) {
    @apply text-blue-400 hover:text-blue-300 underline;
  }

  :global(.prose-invert strong) {
    @apply font-bold text-chronicle-text;
  }

  :global(.prose-invert blockquote) {
    @apply border-l-4 border-chronicle-border pl-4 italic text-chronicle-text-muted my-4;
  }
</style>
