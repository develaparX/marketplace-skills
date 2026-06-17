module.exports = {
  baseUrl: 'https://partner.tiktokshop.com/docv2',
  startUrl: '/page/get-categories-202309',
  llm: {
    provider: 'openai',
    model: 'gpt-4o-mini',
    apiKey: process.env.OPENAI_API_KEY,
  },
  output: {
    dir: './skills/tiktok-shop',
  },
  browser: {
    headless: true,
    timeout: 30000,
  },
};
