// src/processor.js
const OpenAI = require('openai');

class LLMProcessor {
  constructor(config) {
    this.config = config;
    this.client = new OpenAI({
      apiKey: config.llm.apiKey,
      baseURL: config.llm.baseUrl,
    });
  }

  async testConnection() {
    try {
      const response = await this.client.chat.completions.create({
        model: this.config.llm.model,
        messages: [{ role: 'user', content: 'Say "OK" in one word.' }],
        max_tokens: 10,
      });
      // API responded = connection works, even if content is empty
      return !!response.choices?.[0];
    } catch (err) {
      console.error('\n   Detail:', err.message);
      if (err.status) console.error('   Status:', err.status);
      return false;
    }
  }

  cleanJson(str) {
    // Remove markdown code block markers
    let cleaned = str.replace(/```(?:json)?\s*/g, '').replace(/```/g, '');
    
    // Escape literal control chars inside JSON strings
    // Match JSON strings properly: "..." with escaped chars handled
    cleaned = cleaned.replace(/"(?:[^"\\]|\\.)*"/g, (match) => {
      return match
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r')
        .replace(/\t/g, '\\t')
        .replace(/\0/g, '\\0');
    });
    
    // Remove trailing commas before } or ]
    cleaned = cleaned.replace(/,\s*([}\]])/g, '$1');
    
    return cleaned;
  }

  async parseAPIDocumentation(markdown, pageTitle) {
    const prompt = `You are an API documentation parser. Extract structured data from this TikTok Shop API documentation.

Page Title: ${pageTitle}

Documentation:
${markdown}

Extract and return a JSON object with this exact structure:
{
  "name": "API endpoint name",
  "method": "HTTP method (GET/POST/PUT/DELETE)",
  "path": "API path (e.g., /api/products)",
  "description": "What this API does (1-2 sentences)",
  "parameters": [
    {
      "name": "parameter_name",
      "type": "string/number/boolean/array/object",
      "required": true/false,
      "description": "What this parameter does"
    }
  ],
  "response_fields": [
    {
      "name": "field_name",
      "type": "string/number/boolean/array/object",
      "description": "What this field contains"
    }
  ],
  "error_codes": [
    {
      "code": "error_code",
      "description": "What this error means"
    }
  ],
  "example_request": "Example curl or HTTP request",
  "example_response": "Example JSON response"
}

If any field cannot be determined from the docs, use null. Return ONLY the JSON object, no other text.`;

    // ponytail: 10 retries with exponential backoff
    for (let attempt = 0; attempt < 10; attempt++) {
      try {
        const response = await this.client.chat.completions.create({
          model: this.config.llm.model,
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.1,
          max_tokens: 4000,
        });

        if (!response.choices?.[0]?.message?.content) {
          return null;
        }

        const content = response.choices[0].message.content;

        // Parse JSON from response (handle markdown code blocks)
        const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/) || [null, content];
        const cleanedJson = this.cleanJson(jsonMatch[1].trim());
        return JSON.parse(cleanedJson);
      } catch (error) {
        if (attempt < 9) {
          const delay = Math.min(1000 * Math.pow(2, attempt), 10000); // exponential backoff, max 10s
          if (attempt > 0) {
            console.error(`\n   ⚠️  Retry ${attempt + 1}/10 after ${delay/1000}s...`);
          }
          await new Promise(r => setTimeout(r, delay));
        } else {
          console.error(`\n   ❌ Failed after 10 attempts: ${error.message}`);
          return null;
        }
      }
    }
  }

  async generateSkillContent(apiData) {
    const prompt = `Convert this API data into a clear, implementation-focused skill document.

API Data:
${JSON.stringify(apiData, null, 2)}

Write a markdown document that explains HOW to implement this API. Include:
1. What this API does and when to use it
2. The exact endpoint and HTTP method
3. Required headers and authentication
4. All parameters with types and descriptions
5. Response structure
6. Error handling
7. Common pitfalls and best practices
8. Code example (language agnostic - use pseudocode/curl)

Write in a practical, developer-focused style. No fluff, just actionable information.`;

    // ponytail: single retry with backoff, more if throughput matters
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const response = await this.client.chat.completions.create({
          model: this.config.llm.model,
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.3,
          max_tokens: 3000,
        });

        if (!response.choices?.[0]?.message?.content) {
          return null;
        }

        return response.choices[0].message.content;
      } catch (error) {
        if (attempt === 0) {
          await new Promise(r => setTimeout(r, 2000));
        } else {
          console.error('Skill generation error:', error.message);
          return null;
        }
      }
    }
  }
}

module.exports = LLMProcessor;
