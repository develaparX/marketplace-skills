// src/generator.js
const fs = require('fs').promises;
const path = require('path');

class SkillGenerator {
  constructor(config) {
    this.config = config;
    this.outputDir = config.output.dir;
  }

  async generate(apiData, skillContent) {
    await fs.mkdir(this.outputDir, { recursive: true });
    const filename = this.createFilename(apiData.name);
    const filepath = path.join(this.outputDir, filename);
    const platform = apiData.targetName || 'TikTok Shop';

    const skillMarkdown = `# ${platform} API: ${apiData.name}

${skillContent}

---
*Auto-generated from ${platform} documentation*
*Endpoint: \`${apiData.method} ${apiData.path}\`*
`;

    await fs.writeFile(filepath, skillMarkdown, 'utf-8');
    console.log(`Generated: ${filepath}`);

    return { filename, filepath };
  }

  async generateIndex(skills) {
    await fs.mkdir(this.outputDir, { recursive: true });
    // ponytail: detect platform from first skill or output dir
    const platform = this.outputDir.includes('shopee') ? 'Shopee' : 'TikTok Shop';
    const indexContent = `# ${platform} API Skills

## Available APIs

${skills
  .map((skill) => `- [${skill.name}](./${skill.filename}) - ${skill.description}`)
  .join('\n')}

---
*Auto-generated index. Each skill contains implementation details for the corresponding ${platform} API.*
`;

    const indexPath = path.join(this.outputDir, '_index.md');
    await fs.writeFile(indexPath, indexContent, 'utf-8');
    console.log(`Generated index: ${indexPath}`);
  }

  createFilename(name) {
    return (
      (name || 'unnamed')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '') + '.md'
    );
  }
}

module.exports = SkillGenerator;
