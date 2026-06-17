// src/discovery.js
class SidebarDiscovery {
  constructor(browserManager, config) {
    this.browser = browserManager;
    this.config = config;
  }

  async discoverLinks() {
    const timeout = this.config.browser?.timeout ?? 15000;

    let page;
    try {
      page = await this.browser.navigate(
        `${this.config.baseUrl}${this.config.startUrl}`
      );
    } catch (err) {
      console.error('[SidebarDiscovery] navigation failed:', err.message);
      return [];
    }

    try {
      await page.waitForSelector('a[href*="/docv2/page/"]', { timeout });
    } catch (err) {
      console.error('[SidebarDiscovery] sidebar not found:', err.message);
      return [];
    }

    const links = await page.$$eval('a[href*="/docv2/page/"]', (els) =>
      els.map((el) => ({
        title: el.textContent.trim(),
        href: el.href,
      }))
    );

    // Deduplicate by href, keep all docs
    const unique = [...new Map(links.map((link) => [link.href, link])).values()];

    // Filter: skip empty titles and non-doc links
    return unique.filter((link) => link.title.length > 0);
  }
}

module.exports = SidebarDiscovery;
