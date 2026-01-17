<script lang="ts">
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  // Mock data matching The 7th Signal exactly
  const mockFeaturedNotes = [
    {
      id: 1,
      slug: 'how-to-pair-with-an-agent',
      title: 'How to Pair With an Agent',
      excerpt: "Trust isn't a feeling. It's a passing test suite.",
      published_at: '2026-01-14',
      hero_image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      featured: true
    },
    {
      id: 2,
      slug: 'a-codebase-by-an-agent-for-an-agent',
      title: 'A Codebase by an Agent for an Agent',
      excerpt: 'What happens when you let an agent build a codebase for itself?',
      published_at: '2025-12-18',
      hero_image_url: null,
      featured: false
    }
  ];

  const mockGuides = [
    {
      id: 1,
      slug: 'context-management-in-the-7th-signal',
      title: 'Context Management in The 7th Signal',
      hero_image_url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=300&h=400&fit=crop'
    },
    {
      id: 2,
      slug: 'how-to-build-an-agent',
      title: 'How to Build an Agent',
      hero_image_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&h=400&fit=crop'
    }
  ];

  const mockNewsArticles = [
    {
      id: 1,
      slug: 'tab-tab-dead',
      title: 'Tab, Tab, Dead',
      excerpt: 'We\'re removing The 7th Signal Tab. It is not part of the future we see.',
      published_at: '2026-01-15',
      hero_image_url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=500&fit=crop',
      featured: true
    },
    {
      id: 2,
      slug: 'painter',
      title: 'Painter',
      excerpt: 'Generate and edit images with the painter tool',
      published_at: '2026-01-14'
    },
    {
      id: 3,
      slug: 'handoff-please',
      title: 'Handoff, Please',
      excerpt: 'Move to a new thread without commands or buttons',
      published_at: '2026-01-13'
    },
    {
      id: 4,
      slug: 'stick-a-fork-in-it',
      title: "Stick a Fork in It, It's Done",
      excerpt: "We're ripping out the Fork command",
      published_at: '2026-01-13'
    },
    {
      id: 5,
      slug: 'todos-are-done',
      title: 'TODOs Are Done',
      excerpt: 'The TODO list feature is now gone from The 7th Signal',
      published_at: '2026-01-12'
    },
    {
      id: 6,
      slug: 'agents-panel',
      title: 'Agents Panel',
      excerpt: 'A new panel for viewing and managing multiple agent threads',
      published_at: '2026-01-09'
    },
    {
      id: 7,
      slug: 'frontier-is-now-free',
      title: 'The Frontier Is Now Free',
      excerpt: '$10/day for any mode, including smart with Opus 4.5',
      published_at: '2026-01-08'
    },
    {
      id: 8,
      slug: 'efficient-mcp-tool-loading',
      title: 'Efficient MCP Tool Loading',
      excerpt: 'Load MCP tools into your context window only when you use them',
      published_at: '2026-01-08'
    }
  ];

  const mockVideos = [
    {
      id: 1,
      slug: 'episode-02-mckay-wrigley',
      title: 'Episode 02: McKay Wrigley',
      published_at: '2025-12-09',
      hero_image_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=180&fit=crop'
    },
    {
      id: 2,
      slug: 'importance-of-feedback-loops',
      title: 'Episode 8: Importance of Feedback Loops',
      published_at: '2025-12-06',
      hero_image_url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=300&h=180&fit=crop'
    },
    {
      id: 3,
      slug: 'opus-45-higher-highs',
      title: 'Opus 4.5: Higher Highs and Higher Lows',
      published_at: '2025-12-06',
      hero_image_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=300&h=180&fit=crop'
    },
    {
      id: 4,
      slug: 'code-the-impossible-color',
      title: 'Code the Impossible: Color in Tucanty',
      published_at: '2025-12-06',
      hero_image_url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=300&h=180&fit=crop'
    },
    {
      id: 5,
      slug: 'build-crew-live-episode-6',
      title: 'Build Crew Live Episode 6',
      published_at: '2025-12-03',
      hero_image_url: 'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=300&h=180&fit=crop'
    }
  ];

  // Use mock data or real data
  const featuredNotes = $derived(mockFeaturedNotes);
  const guides = $derived(mockGuides);
  const newsArticles = $derived(mockNewsArticles);
  const videos = $derived(mockVideos);

  function formatDate(dateString: string | null): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  function formatDateUppercase(dateString: string | null): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    const month = date.toLocaleDateString('en-US', { month: 'long' }).toUpperCase();
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  }

  function formatFeaturedDate(dateString: string | null): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }
</script>

<svelte:head>
  <title>Chronicle - The 7th Signal</title>
</svelte:head>

<div class="h-dvh flex flex-col overflow-hidden bg-chronicle-bg chronicle-grid">
  <!-- Header -->
  <header class="flex-shrink-0 bg-chronicle-bg/95 backdrop-blur-sm">
    <nav class="mx-auto max-w-[1600px] px-6 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center gap-2">
          <a href="/" class="flex items-center gap-2">
            <span class="amp-logo text-2xl text-chronicle-text">The 7th Signal</span>
          </a>
        </div>

        <!-- Navigation -->
        <div class="flex items-center gap-8">
          <a href="/chronicle" class="nav-link">Chronicle</a>
          <a href="/manual" class="nav-link">Owner's Manual</a>
          <a href="/models" class="nav-link">Models</a>
          <a href="/free" class="nav-link">The 7th Signal Free</a>
          <a href="/pricing" class="nav-link">Pricing</a>
          <a href="/admin" class="dashboard-btn">Sign In</a>
          <a href="/admin" class="px-4 py-1.5 text-sm bg-chronicle-accent text-chronicle-bg rounded hover:bg-chronicle-accent-hover transition-colors">Get Started</a>
        </div>
      </div>
    </nav>
  </header>

  <!-- Main Content -->
  <main class="flex-1 min-h-0 mx-auto max-w-[1600px] w-full">
    <div class="grid grid-cols-12 h-full">
      
      <!-- Left Column - Notes -->
      <aside class="col-span-3 border-r border-chronicle-border px-6 py-6 overflow-y-auto">
        <h2 class="section-label mb-6">NOTES</h2>
        
        <!-- Featured Note -->
        {#if featuredNotes[0]}
          <a href="/chronicle/{featuredNotes[0].slug}" class="block group mb-6">
            <article class="relative">
              {#if featuredNotes[0].hero_image_url}
                <div class="relative">
                  <img 
                    src={featuredNotes[0].hero_image_url} 
                    alt={featuredNotes[0].title} 
                    class="w-full h-48 object-cover"
                  />
                  <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4">
                    <div class="featured-badge mb-1">
                      FEATURED {formatFeaturedDate(featuredNotes[0].published_at)}
                    </div>
                    <h3 class="article-title text-xl text-white group-hover:opacity-80 leading-tight">
                      {featuredNotes[0].title}
                    </h3>
                    <p class="text-sm text-white/80 mt-1">{featuredNotes[0].excerpt}</p>
                  </div>
                </div>
              {/if}
            </article>
          </a>
        {/if}

        <!-- More Notes -->
        <div class="space-y-5 mb-8">
          {#each featuredNotes.slice(1) as note}
            <a href="/chronicle/{note.slug}" class="block group">
              <article>
                <div class="article-date mb-1">
                  {formatDateUppercase(note.published_at)}
                </div>
                <h3 class="article-title text-base text-chronicle-text group-hover:opacity-80 mb-1">
                  {note.title}
                </h3>
                <p class="text-sm text-chronicle-text-muted">{note.excerpt}</p>
              </article>
            </a>
          {/each}
        </div>

        <!-- Guides Section -->
        <h2 class="section-label mb-4">GUIDES</h2>
        <div class="flex overflow-x-auto gap-3 mb-8 scroll-smooth">
          {#each guides as guide}
            <a href="/chronicle/{guide.slug}" class="block group flex-shrink-0 w-[45%]">
              <div class="relative aspect-[3/4] overflow-hidden">
                <img 
                  src={guide.hero_image_url} 
                  alt={guide.title}
                  class="w-full h-full object-cover"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-3">
                  <span class="text-xs text-white font-medium uppercase tracking-wide leading-tight">
                    {guide.title}
                  </span>
                </div>
              </div>
            </a>
          {/each}
        </div>

        <!-- Follow Section -->
        <div class="pt-6 border-t border-chronicle-border">
          <h2 class="section-label mb-4">FOLLOW THE 7TH SIGNAL</h2>
          <div class="flex gap-4">
            <a href="https://twitter.com" class="text-chronicle-text-muted hover:text-chronicle-text" aria-label="Follow on X">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="https://github.com" class="text-chronicle-text-muted hover:text-chronicle-text" aria-label="GitHub">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="https://youtube.com" class="text-chronicle-text-muted hover:text-chronicle-text" aria-label="YouTube">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a href="https://linkedin.com" class="text-chronicle-text-muted hover:text-chronicle-text" aria-label="LinkedIn">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
      </aside>

      <!-- Center Column - News -->
      <section class="col-span-6 border-r border-chronicle-border px-6 py-6 overflow-y-auto">
        <div class="flex items-center justify-between mb-6">
          <h2 class="section-label">NEWS</h2>
          <a href="/rss.xml" class="flex items-center gap-1 text-xs text-chronicle-text-muted hover:text-chronicle-text">
            <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19 7.38 20 6.18 20C5 20 4 19 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1z"/>
            </svg>
            RSS
          </a>
        </div>
        
        <!-- Featured News Hero -->
        {#if newsArticles[0]}
          <a href="/chronicle/{newsArticles[0].slug}" class="block group mb-6">
            <article class="relative overflow-hidden">
              <div class="relative aspect-[16/9]">
                <img 
                  src={newsArticles[0].hero_image_url} 
                  alt={newsArticles[0].title}
                  class="w-full h-full object-cover"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div class="absolute bottom-0 right-0 p-6 max-w-md text-right">
                  <div class="featured-badge mb-2">
                    FEATURED {formatFeaturedDate(newsArticles[0].published_at)}
                  </div>
                  <h2 class="article-title text-3xl text-white group-hover:opacity-80 leading-tight">
                    {newsArticles[0].title}
                  </h2>
                  <p class="text-sm text-white/80 mt-2">{newsArticles[0].excerpt}</p>
                </div>
              </div>
            </article>
          </a>
        {/if}

        <!-- News List -->
        <div class="space-y-0">
          {#each newsArticles as article, i}
            <a href="/chronicle/{article.slug}" class="block group py-4 border-b border-chronicle-border last:border-b-0">
              <article class="flex gap-6">
                <div class="w-32 flex-shrink-0 text-right">
                  <span class="article-date">
                    {formatDateUppercase(article.published_at)}
                  </span>
                </div>
                <div class="flex-1">
                  <h3 class="article-title text-xl text-chronicle-text group-hover:opacity-80 mb-1">
                    {article.title}
                  </h3>
                  <p class="text-sm text-chronicle-text-muted">{article.excerpt}</p>
                </div>
              </article>
            </a>
          {/each}
        </div>
      </section>

      <!-- Right Column - Videos -->
      <aside class="col-span-3 px-6 py-6 overflow-y-auto">
        <h2 class="section-label mb-6">VIDEOS</h2>
        <div class="space-y-5">
          {#each videos as video}
            <a href="/chronicle/{video.slug}" class="block group">
              <article>
                {#if video.hero_image_url}
                  <img 
                    src={video.hero_image_url} 
                    alt={video.title} 
                    class="w-full aspect-video object-cover mb-2"
                  />
                {/if}
                <h3 class="article-title text-sm text-chronicle-text group-hover:opacity-80 leading-snug mb-1">
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
</div>

<style>
  /* Amp-style vertical grid lines pattern */
  .chronicle-grid {
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
  .chronicle-grid::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    background-image: 
      repeating-linear-gradient(
        180deg,
        transparent 0,
        transparent 8px,
        rgba(100, 130, 120, 0.06) 8px,
        rgba(100, 130, 120, 0.06) 9px
      );
  }

  /* Ensure content stays above the grid */
  .chronicle-grid > * {
    position: relative;
    z-index: 1;
  }
</style>
