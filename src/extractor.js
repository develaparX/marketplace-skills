class ContentExtractor {
  constructor(browserManager) {
    this.browser = browserManager;
  }

  async extract() {
    const page = this.browser.page;

    await page.waitForSelector('main, article, [class*="content"], [class*="doc"]', {
      timeout: 10000,
    });

    const html = await page.evaluate(() => {
      const selectors = [
        'main',
        'article',
        '[class*="content-wrapper"]',
        '[class*="doc-content"]',
        '[class*="markdown-body"]',
      ];

      for (const selector of selectors) {
        const el = document.querySelector(selector);
        if (el && el.innerText.trim().length > 100) {
          return el.innerHTML;
        }
      }

      return document.body.innerHTML;
    });

    return this.htmlToMarkdown(html);
  }

  htmlToMarkdown(html) {
    let md = html;

    md = md.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
    md = md.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');

    md = md.replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n\n');
    md = md.replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n\n');
    md = md.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n\n');
    md = md.replace(/<h4[^>]*>(.*?)<\/h4>/gi, '#### $1\n\n');

    md = md.replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**');
    md = md.replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**');
    md = md.replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*');
    md = md.replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*');

    md = md.replace(/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi, '```\n$1\n```\n\n');
    md = md.replace(/<code[^>]*>(.*?)<\/code>/gi, '`$1`');

    md = md.replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)');

    md = md.replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n');
    md = md.replace(/<\/?[uo]l[^>]*>/gi, '\n');

    md = md.replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n');
    md = md.replace(/<br\s*\/?>/gi, '\n');

    md = md.replace(/<table[^>]*>/gi, '\n');
    md = md.replace(/<\/table>/gi, '\n');
    md = md.replace(/<tr[^>]*>/gi, '| ');
    md = md.replace(/<\/tr>/gi, ' |\n');
    md = md.replace(/<t[dh][^>]*>(.*?)<\/t[dh]>/gi, '$1 | ');

    md = md.replace(/<[^>]+>/g, '');

    md = md.replace(/&nbsp;/g, ' ');
    md = md.replace(/&lt;/g, '<');
    md = md.replace(/&gt;/g, '>');
    md = md.replace(/&amp;/g, '&');
    md = md.replace(/\n\s*\n\s*\n/g, '\n\n');
    md = md.trim();

    return md;
  }
}

module.exports = ContentExtractor;
