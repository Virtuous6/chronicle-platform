<svelte:head>
  <title>Pricing - The 7th Signal</title>
  <meta name="description" content="Choose the plan that fits your needs" />
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

  <!-- Hero -->
  <section class="mx-auto max-w-[1400px] px-6 py-20 text-center">
    <h1 class="font-display text-5xl md:text-6xl lg:text-7xl text-chronicle-text italic mb-6">
      Pricing
    </h1>
    <p class="font-serif text-xl text-chronicle-text-muted max-w-2xl mx-auto">
      Choose the plan that fits your needs. Start free, upgrade when you're ready.
    </p>
  </section>

  <!-- Pricing Tiers -->
  <section class="mx-auto max-w-[1200px] px-6 pb-24">
    <div class="grid md:grid-cols-3 gap-8">
      <!-- Free Tier -->
      <div class="border border-chronicle-border rounded-lg p-8 flex flex-col">
        <h2 class="font-display text-2xl text-chronicle-text mb-2">Free</h2>
        <p class="text-chronicle-text-muted font-serif mb-6">For individuals getting started</p>
        <div class="mb-8">
          <span class="font-display text-4xl text-chronicle-text">$0</span>
          <span class="text-chronicle-text-muted">/month</span>
        </div>
        <ul class="space-y-3 text-chronicle-text-muted font-serif mb-8 flex-1">
          <li class="flex items-start gap-2">
            <span class="text-chronicle-accent">✓</span>
            <span>Up to 3 projects</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-chronicle-accent">✓</span>
            <span>Basic analytics</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-chronicle-accent">✓</span>
            <span>Community support</span>
          </li>
        </ul>
        <button class="w-full py-3 border border-chronicle-border text-chronicle-text rounded hover:border-chronicle-accent transition-colors">
          Get Started
        </button>
      </div>

      <!-- Pro Tier -->
      <div class="border-2 border-chronicle-accent rounded-lg p-8 flex flex-col relative">
        <div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-chronicle-accent text-chronicle-bg px-3 py-1 text-xs uppercase tracking-wider font-medium rounded">
          Most Popular
        </div>
        <h2 class="font-display text-2xl text-chronicle-text mb-2">Pro</h2>
        <p class="text-chronicle-text-muted font-serif mb-6">For professionals and teams</p>
        <div class="mb-8">
          <span class="font-display text-4xl text-chronicle-text">$29</span>
          <span class="text-chronicle-text-muted">/month</span>
        </div>
        <ul class="space-y-3 text-chronicle-text-muted font-serif mb-8 flex-1">
          <li class="flex items-start gap-2">
            <span class="text-chronicle-accent">✓</span>
            <span>Unlimited projects</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-chronicle-accent">✓</span>
            <span>Advanced analytics</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-chronicle-accent">✓</span>
            <span>Priority support</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-chronicle-accent">✓</span>
            <span>Custom integrations</span>
          </li>
        </ul>
        <button class="w-full py-3 bg-chronicle-accent text-chronicle-bg rounded hover:bg-chronicle-accent-hover transition-colors font-medium">
          Start Free Trial
        </button>
      </div>

      <!-- Enterprise Tier -->
      <div class="border border-chronicle-border rounded-lg p-8 flex flex-col">
        <h2 class="font-display text-2xl text-chronicle-text mb-2">Enterprise</h2>
        <p class="text-chronicle-text-muted font-serif mb-6">For organizations at scale</p>
        <div class="mb-8">
          <span class="font-display text-4xl text-chronicle-text">Custom</span>
        </div>
        <ul class="space-y-3 text-chronicle-text-muted font-serif mb-8 flex-1">
          <li class="flex items-start gap-2">
            <span class="text-chronicle-accent">✓</span>
            <span>Everything in Pro</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-chronicle-accent">✓</span>
            <span>Dedicated support</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-chronicle-accent">✓</span>
            <span>SLA guarantees</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-chronicle-accent">✓</span>
            <span>Custom contracts</span>
          </li>
        </ul>
        <button class="w-full py-3 border border-chronicle-border text-chronicle-text rounded hover:border-chronicle-accent transition-colors">
          Contact Sales
        </button>
      </div>
    </div>
  </section>

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
