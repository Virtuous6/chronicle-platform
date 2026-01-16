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

  <!-- Hero Section -->
  {#if article.hero_image_url}
    <div class="relative h-96 overflow-hidden bg-teal-900">
      <img 
        src={article.hero_image_url} 
        alt={article.title}
        class="w-full h-full object-cover opacity-70"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-teal-900/80 to-transparent"></div>
    </div>
  {:else}
    <div class="h-64 bg-gradient-to-br from-teal-800 to-teal-900"></div>
  {/if}

  <!-- Article Content -->
  <article class="mx-auto max-w-3xl px-6 -mt-32 relative z-10">
    <!-- Article Header -->
    <div class="bg-white/90 backdrop-blur-sm rounded-sm shadow-lg p-8 mb-8">
      <div class="text-xs text-chronicle-text-light uppercase tracking-wider mb-4">
        <a href="/" class="hover:text-chronicle-text-dark">Chronicle</a>
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
            <div class="font-medium text-chronicle-text-dark">{article.author.name}</div>
            <div class="text-sm text-chronicle-text-light">{formatDate(article.published_at)}</div>
          </div>
        </div>
      {/if}

      <h1 class="text-4xl md:text-5xl font-serif font-bold text-chronicle-text-dark mb-4 leading-tight">
        {article.title}
      </h1>

      {#if article.excerpt}
        <p class="text-xl text-chronicle-text leading-relaxed">
          {article.excerpt}
        </p>
      {/if}
    </div>

    <!-- Article Body -->
    <div class="bg-white/90 backdrop-blur-sm rounded-sm shadow-lg p-8 mb-12">
      <div class="prose prose-stone prose-lg max-w-none">
        {@html htmlContent}
      </div>
    </div>

    <!-- Back to Home -->
    <div class="mb-12">
      <a 
        href="/" 
        class="inline-flex items-center gap-2 text-chronicle-text hover:text-chronicle-text-dark font-medium"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Chronicle
      </a>
    </div>
  </article>

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

<style>
  :global(.prose h1) {
    @apply text-3xl font-serif font-bold text-chronicle-text-dark mt-8 mb-4;
  }

  :global(.prose h2) {
    @apply text-2xl font-serif font-bold text-chronicle-text-dark mt-6 mb-3;
  }

  :global(.prose h3) {
    @apply text-xl font-serif font-bold text-chronicle-text-dark mt-4 mb-2;
  }

  :global(.prose p) {
    @apply text-chronicle-text leading-relaxed mb-4;
  }

  :global(.prose ul, .prose ol) {
    @apply my-4 ml-6;
  }

  :global(.prose li) {
    @apply mb-2 text-chronicle-text;
  }

  :global(.prose code) {
    @apply bg-stone-200 px-2 py-1 rounded text-sm font-mono text-chronicle-text-dark;
  }

  :global(.prose pre) {
    @apply bg-stone-800 text-stone-100 p-4 rounded-sm overflow-x-auto my-4;
  }

  :global(.prose pre code) {
    @apply bg-transparent p-0 text-stone-100;
  }

  :global(.prose a) {
    @apply text-blue-600 hover:text-blue-700 underline;
  }

  :global(.prose strong) {
    @apply font-bold text-chronicle-text-dark;
  }

  :global(.prose blockquote) {
    @apply border-l-4 border-stone-400 pl-4 italic text-chronicle-text my-4;
  }
</style>
