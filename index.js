// index.js
const config = require('./config');
const BrowserManager = require('./src/browser');
const SidebarDiscovery = require('./src/discovery');
const ContentExtractor = require('./src/extractor');
const LLMProcessor = require('./src/processor');
const SkillGenerator = require('./src/generator');

// Simple spinner
class Spinner {
  constructor(text) {
    this.text = text;
    this.frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    this.i = 0;
    this.timer = null;
  }

  start() {
    process.stdout.write(`\r${this.frames[0]} ${this.text}`);
    this.timer = setInterval(() => {
      this.i = (this.i + 1) % this.frames.length;
      process.stdout.write(`\r${this.frames[this.i]} ${this.text}`);
    }, 80);
    return this;
  }

  succeed(text) {
    clearInterval(this.timer);
    process.stdout.write(`\r✅ ${text}\n`);
  }

  fail(text) {
    clearInterval(this.timer);
    process.stdout.write(`\r❌ ${text}\n`);
  }

  stop() {
    clearInterval(this.timer);
    process.stdout.write('\r');
  }
}

async function testLLM(processor) {
  const spinner = new Spinner('Testing LLM connection...').start();
  try {
    const result = await processor.testConnection();
    if (result) {
      spinner.succeed(`LLM connected: ${config.llm.model} @ ${config.llm.baseUrl}`);
      return true;
    } else {
      spinner.fail('LLM test failed - check API key and base URL');
      return false;
    }
  } catch (err) {
    spinner.fail(`LLM test failed: ${err.message}`);
    return false;
  }
}

async function main() {
  console.log('🚀 TikTok Shop Docs Scraper\n');
  console.log(`   Model: ${config.llm.model}`);
  console.log(`   API:   ${config.llm.baseUrl}`);
  console.log(`   Docs:  ${config.baseUrl}${config.startUrl}\n`);

  const browser = new BrowserManager(config);
  const discovery = new SidebarDiscovery(browser, config);
  const extractor = new ContentExtractor(browser);
  const processor = new LLMProcessor(config);
  const generator = new SkillGenerator(config);

  // Test LLM first
  const llmOk = await testLLM(processor);
  if (!llmOk) {
    console.log('\nFix .env and try again.');
    process.exit(1);
  }

  try {
    // Step 1: Discover API links
    const spinner1 = new Spinner('Discovering API documentation links...').start();
    const links = await discovery.discoverLinks();
    spinner1.succeed(`Found ${links.length} API documentation pages`);

    if (links.length === 0) {
      console.log('No API links found. Exiting.');
      return;
    }

    // Step 2: Process each page
    const generatedSkills = [];

    for (let i = 0; i < links.length; i++) {
      const link = links[i];
      console.log(`\n📄 [${i + 1}/${links.length}] ${link.title}`);

      try {
        // Navigate to page
        const spinnerNav = new Spinner('  Loading page...').start();
        await browser.navigate(link.href);
        await new Promise((r) => setTimeout(r, 2000));
        spinnerNav.succeed('  Page loaded');

        // Extract content
        const spinnerExtract = new Spinner('  Extracting content...').start();
        const markdown = await extractor.extract();
        spinnerExtract.succeed(`  Extracted ${markdown.length} characters`);

        // Parse with LLM (10 retries with exponential backoff)
        const spinnerParse = new Spinner('  🤖 AI parsing documentation...').start();
        const t0 = Date.now();
        let apiData = null;
        for (let attempt = 0; attempt < 10; attempt++) {
          apiData = await processor.parseAPIDocumentation(markdown, link.title);
          if (apiData) break;
          if (attempt < 9) {
            const delay = Math.min(1000 * Math.pow(2, attempt), 10000);
            spinnerParse.text = `  🤖 Retry ${attempt + 1}/10...`;
            await new Promise(r => setTimeout(r, delay));
          }
        }
        const parseTime = ((Date.now() - t0) / 1000).toFixed(1);

        if (!apiData) {
          spinnerParse.fail('  Failed to parse after 10 attempts, skipping');
          continue;
        }
        spinnerParse.succeed(`  Parsed in ${parseTime}s → ${apiData.name}`);

        // Generate skill content
        const spinnerGen = new Spinner('  ✍️  Generating skill...').start();
        const t1 = Date.now();
        const skillContent = await processor.generateSkillContent(apiData);
        const genTime = ((Date.now() - t1) / 1000).toFixed(1);

        if (!skillContent) {
          spinnerGen.fail('  Failed to generate skill, skipping');
          continue;
        }
        spinnerGen.succeed(`  Skill generated in ${genTime}s`);

        // Save skill file
        const result = await generator.generate(apiData, skillContent);
        generatedSkills.push({
          name: apiData.name,
          filename: result.filename,
          description: apiData.description,
        });

        console.log(`  📁 Saved: ${result.filename}`);

        // Rate limiting
        await new Promise((r) => setTimeout(r, 500));
      } catch (error) {
        console.error(`  ❌ Error: ${error.message}`);
      }
    }

    // Step 3: Generate index
    if (generatedSkills.length > 0) {
      const spinnerIndex = new Spinner('Generating master index...').start();
      await generator.generateIndex(generatedSkills);
      spinnerIndex.succeed('Index generated');
    }

    console.log(`\n${'─'.repeat(50)}`);
    console.log(`✅ Done! Generated ${generatedSkills.length} skills`);
    console.log(`📁 ${config.output.dir}`);
    console.log(`${'─'.repeat(50)}`);
  } finally {
    await browser.close();
  }
}

main().catch(console.error);
