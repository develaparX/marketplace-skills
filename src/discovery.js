// src/discovery.js
class SidebarDiscovery {
  constructor(browserManager, config) {
    this.browser = browserManager;
    this.config = config;
  }

  async discoverLinks() {
    const page = await this.browser.navigate(
      `${this.config.baseUrl}${this.config.startUrl}`
    );

    // Wait for sidebar to render
    await page.waitForSelector('a[href*="/docv2/page/"]', { timeout: 15000 });

    // Extract all doc links from sidebar
    const links = await page.$$eval('a[href*="/docv2/page/"]', (els) =>
      els.map((el) => ({
        title: el.textContent.trim(),
        href: el.href,
      }))
    );

    // Deduplicate by href
    const unique = [...new Map(links.map((link) => [link.href, link])).values()];

    // Filter out non-API pages (keep only API-related)
    const apiLinks = unique.filter((link) =>
      link.title.toLowerCase().includes('api') ||
      link.href.includes('api') ||
      link.title.toLowerCase().includes('get-') ||
      link.title.toLowerCase().includes('create-') ||
      link.title.toLowerCase().includes('update-') ||
      link.title.toLowerCase().includes('delete-') ||
      link.title.toLowerCase().includes('query-') ||
      link.title.toLowerCase().includes('batch-')
    );

    return apiLinks;
  }
}

module.exports = SidebarDiscovery;
