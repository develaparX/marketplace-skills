// index.js
const config = require('./config');
const BrowserManager = require('./src/browser');
const SidebarDiscovery = require('./src/discovery');
const ContentExtractor = require('./src/extractor');
const LLMProcessor = require('./src/processor');
const SkillGenerator = require('./src/generator');

async function main() {
  console.log('🚀 Starting TikTok Shop Docs Scraper...');

  // Check for API key
  if (!config.llm.apiKey) {
    console.error('❌ Error: OPENAI_API_KEY environment variable not set');
    console.log('Set it with: export OPENAI_API_KEY="your-key-here"');
    process.exit(1);
  }

  const browser = new BrowserManager(config);
  const discovery = new SidebarDiscovery(browser, config);
  const extractor = new ContentExtractor(browser);
  const processor = new LLMProcessor(config);
  const generator = new SkillGenerator(config);

  try {
    // Step 1: Discover API links
    console.log('\n📋 Discovering API documentation links...');
    const links = await discovery.discoverLinks();
    console.log(`Found ${links.length} API documentation pages`);

    if (links.length === 0) {
      console.log('No API links found. Exiting.');
      return;
    }

    // Step 2: Process each page
    const generatedSkills = [];

    for (let i = 0; i < links.length; i++) {
      const link = links[i];
      console.log(`\n📄 Processing [${i + 1}/${links.length}]: ${link.title}`);

      try {
        // Navigate to page
        await browser.navigate(link.href);
        await new Promise((r) => setTimeout(r, 2000)); // Wait for render

        // Extract content
        const markdown = await extractor.extract();
        console.log(`  ✓ Extracted ${markdown.length} characters`);

        // Parse with LLM
        console.log('  🤖 Parsing with AI...');
        const apiData = await processor.parseAPIDocumentation(markdown, link.title);

        if (!apiData) {
          console.log('  ⚠️  Failed to parse, skipping');
          continue;
        }

        // Generate skill content
        console.log('  ✍️  Generating skill...');
        const skillContent = await processor.generateSkillContent(apiData);

        if (!skillContent) {
          console.log('  ⚠️  Failed to generate skill, skipping');
          continue;
        }

        // Save skill file
        const result = await generator.generate(apiData, skillContent);
        generatedSkills.push({
          name: apiData.name,
          filename: result.filename,
          description: apiData.description,
        });

        console.log(`  ✓ Generated: ${result.filename}`);

        // Rate limiting - wait between requests
        await new Promise((r) => setTimeout(r, 1000));
      } catch (error) {
        console.error(`  ❌ Error processing ${link.title}:`, error.message);
      }
    }

    // Step 3: Generate index
    if (generatedSkills.length > 0) {
      console.log('\n📚 Generating master index...');
      await generator.generateIndex(generatedSkills);
    }

    console.log(`\n✅ Done! Generated ${generatedSkills.length} skills`);
    console.log(`📁 Skills saved to: ${config.output.dir}`);
  } finally {
    await browser.close();
  }
}

main().catch(console.error);
