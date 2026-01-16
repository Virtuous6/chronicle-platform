<script lang="ts">
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  const { articles } = data;

  function formatDate(dateString: string | null): string {
    if (!dateString) return 'Not published';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
</script>

<svelte:head>
  <title>Admin - Chronicle</title>
</svelte:head>

<div class="min-h-screen bg-stone-50">
  <!-- Header -->
  <header class="border-b border-stone-300 bg-white">
    <nav class="mx-auto max-w-7xl px-6 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-8">
          <a href="/" class="text-2xl font-bold text-stone-900">Chronicle</a>
          <span class="text-sm text-stone-500">Admin</span>
        </div>
        <div class="flex items-center gap-4">
          <a href="/" class="text-sm text-stone-600 hover:text-stone-900">View Site</a>
          <a href="/admin/new" class="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            New Article
          </a>
        </div>
      </div>
    </nav>
  </header>

  <!-- Main Content -->
  <main class="mx-auto max-w-7xl px-6 py-12">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-stone-900 mb-2">Articles</h1>
      <p class="text-stone-600">Manage your Chronicle content</p>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-white rounded-lg border border-stone-200 p-6">
        <div class="text-sm text-stone-500 uppercase tracking-wider mb-2">Total Articles</div>
        <div class="text-3xl font-bold text-stone-900">{articles.length}</div>
      </div>
      <div class="bg-white rounded-lg border border-stone-200 p-6">
        <div class="text-sm text-stone-500 uppercase tracking-wider mb-2">Published</div>
        <div class="text-3xl font-bold text-green-600">
          {articles.filter(a => a.published_at).length}
        </div>
      </div>
      <div class="bg-white rounded-lg border border-stone-200 p-6">
        <div class="text-sm text-stone-500 uppercase tracking-wider mb-2">Drafts</div>
        <div class="text-3xl font-bold text-amber-600">
          {articles.filter(a => !a.published_at).length}
        </div>
      </div>
      <div class="bg-white rounded-lg border border-stone-200 p-6">
        <div class="text-sm text-stone-500 uppercase tracking-wider mb-2">Featured</div>
        <div class="text-3xl font-bold text-blue-600">
          {articles.filter(a => a.featured).length}
        </div>
      </div>
    </div>

    <!-- Articles Table -->
    <div class="bg-white rounded-lg border border-stone-200 overflow-hidden">
      <table class="w-full">
        <thead class="bg-stone-50 border-b border-stone-200">
          <tr>
            <th class="text-left px-6 py-3 text-xs font-semibold text-stone-600 uppercase tracking-wider">
              Title
            </th>
            <th class="text-left px-6 py-3 text-xs font-semibold text-stone-600 uppercase tracking-wider">
              Category
            </th>
            <th class="text-left px-6 py-3 text-xs font-semibold text-stone-600 uppercase tracking-wider">
              Status
            </th>
            <th class="text-left px-6 py-3 text-xs font-semibold text-stone-600 uppercase tracking-wider">
              Published
            </th>
            <th class="text-right px-6 py-3 text-xs font-semibold text-stone-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-stone-200">
          {#each articles as article}
            <tr class="hover:bg-stone-50 transition-colors">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div>
                    <div class="font-medium text-stone-900">{article.title}</div>
                    <div class="text-sm text-stone-500">/{article.slug}</div>
                  </div>
                  {#if article.featured}
                    <span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-700">
                      Featured
                    </span>
                  {/if}
                </div>
              </td>
              <td class="px-6 py-4">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                  {article.category === 'note' ? 'bg-purple-100 text-purple-700' : ''}
                  {article.category === 'news' ? 'bg-green-100 text-green-700' : ''}
                  {article.category === 'video' ? 'bg-red-100 text-red-700' : ''}
                ">
                  {article.category}
                </span>
              </td>
              <td class="px-6 py-4">
                {#if article.published_at}
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    Published
                  </span>
                {:else}
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                    Draft
                  </span>
                {/if}
              </td>
              <td class="px-6 py-4 text-sm text-stone-600">
                {formatDate(article.published_at)}
              </td>
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end gap-2">
                  <a 
                    href="/{article.slug}" 
                    target="_blank"
                    class="text-sm text-stone-600 hover:text-stone-900"
                  >
                    View
                  </a>
                  <a 
                    href="/admin/edit/{article.id}" 
                    class="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Edit
                  </a>
                </div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>

      {#if articles.length === 0}
        <div class="text-center py-12">
          <p class="text-stone-500 mb-4">No articles yet</p>
          <a 
            href="/admin/new" 
            class="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            Create your first article
          </a>
        </div>
      {/if}
    </div>
  </main>
</div>
