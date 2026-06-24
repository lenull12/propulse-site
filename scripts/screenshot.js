#!/usr/bin/env node
/**
 * Prend un screenshot d'une page web en full-page.
 * Usage: node scripts/screenshot.js <url> [output-path]
 */
const path = require('path');
const puppeteer = require('puppeteer');

(async () => {
  const url = process.argv[2];
  if (!url) {
    console.error('Usage: node screenshot.js <url> [output-path]');
    process.exit(1);
  }

  const outputPath = process.argv[3] || path.join(__dirname, '..', 'data', 'screenshots',
    url.replace(/https?:\/\//, '').replace(/[\/:?#&=]/g, '_') + '.png');

  // Ensure output directory exists
  const dir = path.dirname(outputPath);
  const fs = require('fs');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  console.error(`🌐 Navigation vers ${url}...`);
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

  // Wait a bit for fonts and images to finish loading
  await new Promise(r => setTimeout(r, 2000));

  console.error(`📸 Capture de ${outputPath}...`);
  await page.screenshot({ path: outputPath, fullPage: true });

  console.error(`✅ Screenshot sauvegardé: ${outputPath}`);
  console.log(outputPath);

  await browser.close();
})();
