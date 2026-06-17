// src/discovery.js
class SidebarDiscovery {
  constructor(browserManager, config) {
    this.browser = browserManager;
    this.config = config;
  }

  async discoverLinks() {
    const timeout = this.config.timeout ?? 15000;

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

    const unique = [...new Map(links.map((link) => [link.href, link])).values()];

    const methodRe = /\b(get|create|update|delete|query|batch)\b/i;
    const apiLinks = unique.filter((link) =>
      methodRe.test(link.title) ||
      /\/api\//i.test(link.href)
    );

    return apiLinks;
  }
}

module.exports = SidebarDiscovery;
