<script lang="ts">
  import { goto } from '$app/navigation';

  let title = $state('');
  let slug = $state('');
  let excerpt = $state('');
  let content = $state('');
  let category = $state<'note' | 'news' | 'video'>('note');
  let featured = $state(false);
  let heroImageUrl = $state('');
  let publishNow = $state(false);
  let saving = $state(false);
  let error = $state('');

  function generateSlug() {
    slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  async function handleSubmit() {
    if (!title || !content) {
      error = 'Title and content are required';
      return;
    }

    if (!slug) {
      generateSlug();
    }

    saving = true;
    error = '';

    try {
      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          slug,
          excerpt,
          content,
          category,
          featured,
          hero_image_url: heroImageUrl || null,
          published_at: publishNow ? new Date().toISOString() : null,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create article');
      }

      goto('/admin');
    } catch (err) {
      error = err instanceof Error ? err.message : 'An error occurred';
      saving = false;
    }
  }
</script>

<svelte:head>
  <title>New Article - Chronicle Admin</title>
</svelte:head>

<div class="min-h-screen bg-stone-50">
  <!-- Header -->
  <header class="border-b border-stone-300 bg-white">
    <nav class="mx-auto max-w-7xl px-6 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-8">
          <a href="/" class="text-2xl font-bold text-stone-900">Chronicle</a>
          <span class="text-sm text-stone-500">Admin › New Article</span>
        </div>
        <div class="flex items-center gap-4">
          <a href="/admin" class="text-sm text-stone-600 hover:text-stone-900">Cancel</a>
        </div>
      </div>
    </nav>
  </header>

  <!-- Main Content -->
  <main class="mx-auto max-w-4xl px-6 py-12">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-stone-900 mb-2">Create New Article</h1>
      <p class="text-stone-600">Add a new article to your Chronicle</p>
    </div>

    {#if error}
      <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
        {error}
      </div>
    {/if}

    <form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }} class="space-y-6">
      <!-- Title -->
      <div class="bg-white rounded-lg border border-stone-200 p-6">
        <label for="title" class="block text-sm font-medium text-stone-900 mb-2">
          Title *
        </label>
        <input
          id="title"
          type="text"
          bind:value={title}
          onblur={generateSlug}
          class="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter article title"
          required
        />
      </div>

      <!-- Slug -->
      <div class="bg-white rounded-lg border border-stone-200 p-6">
        <label for="slug" class="block text-sm font-medium text-stone-900 mb-2">
          Slug *
        </label>
        <input
          id="slug"
          type="text"
          bind:value={slug}
          class="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
          placeholder="article-url-slug"
          required
        />
        <p class="text-xs text-stone-500 mt-2">
          URL: /{slug || 'article-url-slug'}
        </p>
      </div>

      <!-- Excerpt -->
      <div class="bg-white rounded-lg border border-stone-200 p-6">
        <label for="excerpt" class="block text-sm font-medium text-stone-900 mb-2">
          Excerpt
        </label>
        <textarea
          id="excerpt"
          bind:value={excerpt}
          rows="3"
          class="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Brief summary of the article"
        ></textarea>
      </div>

      <!-- Content -->
      <div class="bg-white rounded-lg border border-stone-200 p-6">
        <label for="content" class="block text-sm font-medium text-stone-900 mb-2">
          Content * (Markdown)
        </label>
        <textarea
          id="content"
          bind:value={content}
          rows="20"
          class="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
          placeholder="# Article Title

Write your article content here using Markdown..."
          required
        ></textarea>
      </div>

      <!-- Category & Settings -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white rounded-lg border border-stone-200 p-6">
          <label for="category" class="block text-sm font-medium text-stone-900 mb-2">
            Category *
          </label>
          <select
            id="category"
            bind:value={category}
            class="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="note">Note</option>
            <option value="news">News</option>
            <option value="video">Video</option>
          </select>
        </div>

        <div class="bg-white rounded-lg border border-stone-200 p-6">
          <label for="heroImageUrl" class="block text-sm font-medium text-stone-900 mb-2">
            Hero Image URL
          </label>
          <input
            id="heroImageUrl"
            type="url"
            bind:value={heroImageUrl}
            class="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://example.com/image.jpg"
          />
        </div>
      </div>

      <!-- Checkboxes -->
      <div class="bg-white rounded-lg border border-stone-200 p-6 space-y-4">
        <label class="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            bind:checked={featured}
            class="w-4 h-4 text-blue-600 border-stone-300 rounded focus:ring-blue-500"
          />
          <span class="text-sm font-medium text-stone-900">Featured Article</span>
        </label>

        <label class="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            bind:checked={publishNow}
            class="w-4 h-4 text-blue-600 border-stone-300 rounded focus:ring-blue-500"
          />
          <span class="text-sm font-medium text-stone-900">Publish Now</span>
        </label>
      </div>

      <!-- Actions -->
      <div class="flex items-center justify-end gap-4">
        <a href="/admin" class="px-6 py-2 text-stone-600 hover:text-stone-900">
          Cancel
        </a>
        <button
          type="submit"
          disabled={saving}
          class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {saving ? 'Creating...' : 'Create Article'}
        </button>
      </div>
    </form>
  </main>
</div>
