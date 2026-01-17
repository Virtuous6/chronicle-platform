<script lang="ts">
</script>

<svelte:head>
  <title>Security - The 7th Signal</title>
  <meta name="description" content="Security policies and practices at The 7th Signal" />
</svelte:head>

<div class="min-h-screen bg-chronicle-bg">
  <!-- Header -->
  <header class="border-b border-chronicle-border">
    <nav class="mx-auto max-w-[1400px] px-6 py-4 flex items-center">
      <a href="/" class="hover:opacity-80">
        <span class="amp-logo text-2xl text-chronicle-text">The 7th Signal</span>
      </a>
    </nav>
  </header>

  <!-- Content -->
  <main class="mx-auto max-w-3xl px-6 py-16">
    <h1 class="font-display text-5xl md:text-6xl lg:text-7xl text-chronicle-text italic mb-12 leading-tight">
      Security
    </h1>

    <div class="space-y-12 font-serif text-chronicle-text">
      <section>
        <h2 class="font-display text-2xl text-chronicle-text mb-4">Data Protection</h2>
        <p class="text-lg leading-relaxed text-chronicle-text-muted mb-4">
          We take the protection of your data seriously. All user data is stored securely with strict access controls and regular security audits.
        </p>
        <p class="text-lg leading-relaxed text-chronicle-text-muted">
          Personal information is never sold or shared with third parties without explicit consent.
        </p>
      </section>

      <section>
        <h2 class="font-display text-2xl text-chronicle-text mb-4">Encryption</h2>
        <p class="text-lg leading-relaxed text-chronicle-text-muted mb-4">
          All data in transit is encrypted using TLS 1.3. Data at rest is encrypted using AES-256 encryption.
        </p>
        <p class="text-lg leading-relaxed text-chronicle-text-muted">
          API communications are secured with industry-standard authentication protocols.
        </p>
      </section>

      <section>
        <h2 class="font-display text-2xl text-chronicle-text mb-4">Compliance</h2>
        <p class="text-lg leading-relaxed text-chronicle-text-muted mb-4">
          Our security practices are designed to meet or exceed industry standards including SOC 2 Type II and GDPR requirements.
        </p>
        <p class="text-lg leading-relaxed text-chronicle-text-muted">
          Regular third-party audits ensure ongoing compliance with evolving security standards.
        </p>
      </section>

      <section>
        <h2 class="font-display text-2xl text-chronicle-text mb-4">Vulnerability Reporting</h2>
        <p class="text-lg leading-relaxed text-chronicle-text-muted">
          If you discover a security vulnerability, please report it to our security team. We appreciate responsible disclosure and will work with you to address any issues promptly.
        </p>
      </section>

      <section>
        <h2 class="font-display text-2xl text-chronicle-text mb-4">Infrastructure Security</h2>
        <p class="text-lg leading-relaxed text-chronicle-text-muted mb-4">
          Our infrastructure is hosted on secure, SOC 2 compliant cloud providers with redundant systems and automatic failover capabilities.
        </p>
        <p class="text-lg leading-relaxed text-chronicle-text-muted">
          Network security includes firewalls, intrusion detection systems, and continuous monitoring.
        </p>
      </section>
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
