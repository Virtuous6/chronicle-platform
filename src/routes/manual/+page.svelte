<script lang="ts">
  const sections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      description: 'Learn the basics of The 7th Signal platform and get up and running quickly.'
    },
    {
      id: 'features',
      title: 'Features',
      description: 'Explore the full range of capabilities available to you.'
    },
    {
      id: 'configuration',
      title: 'Configuration',
      description: 'Customize settings and preferences to match your workflow.'
    },
    {
      id: 'integrations',
      title: 'Integrations',
      description: 'Connect with external services and tools.'
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      description: 'Common issues and how to resolve them.'
    },
    {
      id: 'faq',
      title: 'FAQ',
      description: 'Frequently asked questions and answers.'
    }
  ];
</script>

<svelte:head>
  <title>Owner's Manual - The 7th Signal</title>
  <meta name="description" content="Documentation and guides for The 7th Signal platform." />
</svelte:head>

<div class="min-h-screen bg-chronicle-bg">
  <!-- Header -->
  <header class="border-b border-chronicle-border">
    <nav class="mx-auto max-w-[1400px] px-6 py-4 flex items-center justify-between">
      <a href="/" class="hover:opacity-80">
        <span class="amp-logo text-2xl text-chronicle-text">The 7th Signal</span>
      </a>
    </nav>
  </header>

  <!-- Main Content -->
  <main class="mx-auto max-w-4xl px-6 py-16">
    <!-- Title -->
    <h1 class="font-display text-5xl md:text-6xl text-chronicle-text mb-4">Owner's Manual</h1>
    <p class="text-xl text-chronicle-text-muted font-serif mb-16">
      Everything you need to know about The 7th Signal platform.
    </p>

    <!-- Sections Grid -->
    <div class="grid gap-8 md:grid-cols-2">
      {#each sections as section}
        <a 
          href="/manual/{section.id}" 
          class="block p-6 border border-chronicle-border rounded-lg hover:border-chronicle-accent transition-colors"
        >
          <h2 class="font-display text-2xl text-chronicle-text mb-2">{section.title}</h2>
          <p class="text-chronicle-text-muted font-serif">{section.description}</p>
        </a>
      {/each}
    </div>
  </main>

  <!-- Footer -->
  <footer class="border-t border-chronicle-border mt-20">
    <div class="mx-auto max-w-[1400px] px-6 py-16">
      <div class="flex flex-col md:flex-row md:justify-between gap-12">
        <!-- Left: Logo and Status -->
        <div class="md:w-1/3">
          <div class="amp-logo text-3xl text-chronicle-text mb-6">The 7th Signal</div>
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
        <div class="flex flex-wrap gap-12 md:gap-16 text-sm">
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
