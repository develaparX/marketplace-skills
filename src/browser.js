// src/browser.js
const { chromium } = require('playwright');

class BrowserManager {
  constructor(config) {
    this.config = config;
    this.browser = null;
    this.page = null;
  }

  async launch() {
    this.browser = await chromium.launch({
      headless: this.config.browser.headless,
    });
    this.page = await this.browser.newPage();
    this.page.setDefaultTimeout(this.config.browser.timeout);
    return this.page;
  }

  async navigate(url) {
    if (!this.page) await this.launch();
    await this.page.goto(url, { waitUntil: 'networkidle' });
    return this.page;
  }

  async waitForContent(selector) {
    await this.page.waitForSelector(selector, { timeout: this.config.browser.timeout });
  }

  async getContent() {
    return await this.page.content();
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
      this.page = null;
    }
  }
}

module.exports = BrowserManager;
