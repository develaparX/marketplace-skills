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
      await page.waitForSelector('#doc_left_menu', { timeout });
    } catch (err) {
      console.error('[SidebarDiscovery] sidebar not found:', err.message);
      return [];
    }

    // Expand all collapsed categories
    // Categories are <a> without href, links are <a> with href
    const expanded = await page.evaluate(() => {
      let count = 0;
      // Find all category toggles (no href, has arrow icon)
      const categories = document.querySelectorAll(
        '#doc_left_menu a.style-module__side-menu-dir--IbLLG'
      );
      categories.forEach((cat) => {
        // Click to expand
        cat.click();
        count++;
      });
      return count;
    });

    // Wait for expanded content to load
    await new Promise((r) => setTimeout(r, 1500));

    // Now extract all links with href
    const links = await page.$$eval(
      '#doc_left_menu a[href*="/docv2/page/"]',
      (els) =>
        els.map((el) => {
          // Get method tag (GET/POST/PUT/DELETE) if exists
          const tag = el.querySelector('.arco-tag-content .text');
          const method = tag ? tag.textContent.trim() : '';
          const title = el
            .querySelector('.style-module__allow-wrap--f5G3W')
            ?.textContent?.trim();
          return { title, href: el.href, method };
        })
    );

    // Deduplicate by href
    const unique = [
      ...new Map(links.map((link) => [link.href, link])).values(),
    ];

    // Filter: skip empty titles
    return unique.filter((link) => link.title && link.title.length > 0);
  }
}

module.exports = SidebarDiscovery;
