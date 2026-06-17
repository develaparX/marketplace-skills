// index.js
const fs = require('fs').promises;
const path = require('path');
const config = require('./config');
const BrowserManager = require('./src/browser');
const SidebarDiscovery = require('./src/discovery');
const ContentExtractor = require('./src/extractor');
const LLMProcessor = require('./src/processor');
const SkillGenerator = require('./src/generator');

// Parse flags
const forceRegenerate = process.argv.includes('--re');
const onlyTiktok = process.argv.includes('--tiktok');
const onlyShopee = process.argv.includes('--shopee');

// Determine targets
const selectedTargets = onlyTiktok ? ['tiktok']
  : onlyShopee ? ['shopee']
  : ['tiktok', 'shopee']; // default: both

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

// ponytail: check if skill file already exists
async function skillExists(dir, name) {
  if (!name) return false;
  const filename = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '.md';
  try {
    await fs.access(path.join(dir, filename));
    return true;
  } catch {
    return false;
  }
}

async function runTarget(targetKey, processor) {
  const targetCfg = config.targets[targetKey];
  if (!targetCfg) {
    console.error(`Unknown target: ${targetKey}`);
    return [];
  }

  console.log(`\n${'═'.repeat(50)}`);
  console.log(`🎯 Target: ${targetCfg.name} (${targetKey})`);
  console.log(`   Docs:  ${targetCfg.baseUrl}${targetCfg.startUrl}`);
  console.log(`   Output: ${targetCfg.output.dir}`);
  console.log(`${'═'.repeat(50)}`);

  const browser = new BrowserManager(config);
  const discovery = new SidebarDiscovery(browser, config);
  const extractor = new ContentExtractor(browser);
  const generator = new SkillGenerator({ ...config, output: targetCfg.output });

  try {
    // Step 1: Discover API links
    const spinner1 = new Spinner('Discovering API documentation links...').start();
    let links = [];
    try {
      links = await discovery.discoverLinks(targetKey);
    } catch (err) {
      spinner1.fail(`Discovery failed: ${err.message}`);
      return [];
    }
    spinner1.succeed(`Found ${links.length} API documentation pages`);

    if (!Array.isArray(links) || links.length === 0) {
      console.log('No API links found. Skipping.');
      return [];
    }

    // Step 2: Process each page
    const generatedSkills = [];

    for (let i = 0; i < links.length; i++) {
      const link = links[i];
      
      // ponytail: skip invalid links
      if (!link?.href) {
        console.log(`\n📄 [${i + 1}/${links.length}] ⚠️  Invalid link, skipping`);
        continue;
      }
      
      const title = link.title || `Page ${i + 1}`;
      console.log(`\n📄 [${i + 1}/${links.length}] ${title}`);

      // Skip if already generated (unless --re)
      if (!forceRegenerate && await skillExists(targetCfg.output.dir, title)) {
        console.log('  ⏭️  Already exists, skipping');
        continue;
      }

      try {
        // Navigate to page
        const spinnerNav = new Spinner('  Loading page...').start();
        await browser.navigate(link.href);
        await new Promise((r) => setTimeout(r, 2000));
        spinnerNav.succeed('  Page loaded');

        // Extract content
        const spinnerExtract = new Spinner('  Extracting content...').start();
        const markdown = await extractor.extract();
        
        // ponytail: skip empty/invalid content
        if (!markdown || markdown.length < 50) {
          spinnerExtract.fail('  Content too short or empty, skipping');
          continue;
        }
        
        spinnerExtract.succeed(`  Extracted ${markdown.length} characters`);

        // Parse with LLM (10 retries with exponential backoff)
        const spinnerParse = new Spinner('  🤖 AI parsing documentation...').start();
        const t0 = Date.now();
        let apiData = null;
        for (let attempt = 0; attempt < 10; attempt++) {
          apiData = await processor.parseAPIDocumentation(markdown, link.title, targetCfg.name);
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
        
        // ponytail: fallbacks for missing fields
        if (!apiData.name) apiData.name = title;
        if (!apiData.method) apiData.method = 'UNKNOWN';
        if (!apiData.path) apiData.path = '/';
        if (!apiData.description) apiData.description = 'No description available';
        if (!Array.isArray(apiData.parameters)) apiData.parameters = [];
        if (!Array.isArray(apiData.response_fields)) apiData.response_fields = [];
        if (!Array.isArray(apiData.error_codes)) apiData.error_codes = [];
        
        // Inject target info into apiData
        apiData.target = targetKey;
        apiData.targetName = targetCfg.name;
        
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
    console.log(`✅ ${targetCfg.name}: Generated ${generatedSkills.length} skills`);
    console.log(`📁 ${targetCfg.output.dir}`);
    console.log(`${'─'.repeat(50)}`);

    return generatedSkills;
  } finally {
    await browser.close();
  }
}

async function main() {
  console.log('🚀 Multi-Platform Docs Scraper\n');
  console.log(`   Model:   ${config.llm.model}`);
  console.log(`   API:     ${config.llm.baseUrl}`);
  console.log(`   Targets: ${selectedTargets.join(', ')}`);
  console.log(`   Mode:    ${forceRegenerate ? 'Regenerate all' : 'Skip existing'}\n`);

  const processor = new LLMProcessor(config);

  // Test LLM first
  const llmOk = await testLLM(processor);
  if (!llmOk) {
    console.log('\nFix .env and try again.');
    process.exit(1);
  }

  const allResults = {};

  for (const target of selectedTargets) {
    const results = await runTarget(target, processor);
    allResults[target] = results;
  }

  // Summary
  console.log(`\n${'═'.repeat(50)}`);
  console.log('📊 Summary:');
  for (const [target, results] of Object.entries(allResults)) {
    console.log(`   ${config.targets[target].name}: ${results.length} skills`);
  }
  console.log(`${'═'.repeat(50)}`);
}

main().catch(console.error);
