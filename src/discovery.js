// src/discovery.js
class SidebarDiscovery {
  constructor(browserManager, config) {
    this.browser = browserManager;
    this.config = config;
  }

  async discoverLinks(target) {
    if (target === 'shopee') return this.discoverLinksShopee();
    return this.discoverLinksTiktok();
  }

  async discoverLinksShopee() {
    const timeout = this.config.browser?.timeout ?? 30000;
    const targetCfg = this.config.targets.shopee;

    let page;
    try {
      page = await this.browser.navigate(
        `${targetCfg.baseUrl}${targetCfg.startUrl}`
      );
    } catch (err) {
      console.error('[SidebarDiscovery:Shopee] navigation failed:', err.message);
      return [];
    }

    // Wait for SPA to render - try multiple selectors
    const sidebarSelectors = [
      '.api-reference-category-box',
      '.category-item-name-box',
      '[data-ts-primary_category]',
      '.timestone-category',
      '#__nuxt .sidebar',
      '[class*="sidebar"]',
      '[class*="menu"]',
    ];

    let found = false;
    for (const sel of sidebarSelectors) {
      try {
        await page.waitForSelector(sel, { timeout: 5000, state: 'attached' });
        console.log(`  [Shopee] Found sidebar with: ${sel}`);
        found = true;
        break;
      } catch {
        // try next selector
      }
    }

    if (!found) {
      // Fallback: wait for any content to load
      console.log('  [Shopee] Sidebar selectors not found, waiting for page load...');
      await new Promise((r) => setTimeout(r, 8000));
      
      // Debug: log page content
      const bodyText = await page.evaluate(() => document.body?.innerText?.slice(0, 500) || 'empty');
      console.log(`  [Shopee] Page content preview: ${bodyText.slice(0, 200)}`);
    }

    // Expand all collapsed categories by clicking category headers
    try {
      await page.evaluate(() => {
        document.querySelectorAll('.category-item-name-box, [class*="category-folded"]').forEach((el) => el.click());
      });
      await new Promise((r) => setTimeout(r, 2000));
    } catch (e) {
      console.log('  [Shopee] Could not expand categories:', e.message);
    }

    // Extract all API items from sidebar
    const links = await page.evaluate(() => {
      // Try multiple selectors for API items
      const selectors = [
        '.timestone-category[data-ts-content_name]',
        '[data-ts-content_name]',
        'a[href*="/documents/v2/v2."]',
      ];
      
      for (const sel of selectors) {
        const items = document.querySelectorAll(sel);
        if (items.length > 0) {
          return Array.from(items).map((el) => {
            const contentName = el.getAttribute('data-ts-content_name');
            const contentId = el.getAttribute('data-ts-content_id');
            const version = el.getAttribute('data-ts-version') || 'V2';
            const titleEl = el.querySelector('.api-reference-item-name-container, [class*="item-name"]');
            const title = titleEl ? titleEl.textContent.trim() : (contentName || el.textContent.trim());

            // Parse category from contentName: "v2.ams.get_open_campaign_added_product" → "ams"
            const parts = (contentName || '').split('.');
            const category = parts.length >= 2 ? parts[1] : 'unknown';

            // Build URL
            const href = contentName 
              ? `https://open.shopee.com/documents/v2/${contentName}?module=${contentId}&type=1`
              : el.href;

            return { title, href, category, contentName, version };
          });
        }
      }
      return [];
    });

    // Deduplicate by href
    const unique = [...new Map(links.map((link) => [link.href, link])).values()];
    return unique.filter((link) => link.title && link.title.length > 0);
  }

  async discoverLinksTiktok() {
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
      // Click sidebar toggle to expand if hidden
      const toggle = await page.$('.api-doc-module__icon--JQF1g');
      if (toggle) {
        await toggle.click();
        await new Promise((r) => setTimeout(r, 500));
      }
      await page.waitForSelector('#doc_left_menu', { timeout, state: 'attached' });
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
