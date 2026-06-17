require('dotenv').config();

if (!process.env.OPENAI_API_KEY) {
  console.error('OPENAI_API_KEY env var is required');
  process.exit(1);
}

module.exports = {
  baseUrl: 'https://partner.tiktokshop.com/docv2',
  startUrl: '/api-document',
  llm: {
    provider: 'openai',
    model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    apiKey: process.env.OPENAI_API_KEY,
    baseUrl: process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1',
  },
  output: {
    dir: './skills/tiktok-shop',
  },
  browser: {
    headless: true,
    timeout: 30000,
  },
};
