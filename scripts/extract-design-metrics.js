#!/usr/bin/env node
/**
 * Extrait les métriques de design d'une page web via Puppeteer.
 * Usage: node scripts/extract-design-metrics.js <url> [output-path]
 * Retourne un JSON avec : couleurs, polices, mise en page, structure.
 */
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');

(async () => {
  const url = process.argv[2];
  if (!url) {
    console.error('Usage: node extract-design-metrics.js <url> [output-path]');
    process.exit(1);
  }

  const outputPath = process.argv[3] || path.join(__dirname, '..', 'data', 'audits',
    url.replace(/https?:\/\//, '').replace(/[\/:?#&=]/g, '_') + '-design.json');

  console.error(`🌐 Navigation vers ${url}...`);
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));

  console.error(`🔍 Analyse du design...`);

  const metrics = await page.evaluate(() => {
    const results = {};
    const allEls = document.querySelectorAll('*');
    const body = document.body;

    // 1. Couleurs dominantes (top 10 couleurs de background + text présentes)
    const colorCount = {};
    function addColor(c, key) {
      if (!c || c === 'transparent' || c === 'rgba(0, 0, 0, 0)' || c.includes('initial')) return;
      const normalized = c.replace(/\s+/g, '').toLowerCase();
      colorCount[normalized] = (colorCount[normalized] || 0) + 1;
    }
    for (const el of allEls) {
      const cs = getComputedStyle(el);
      addColor(cs.color, 'text');
      addColor(cs.backgroundColor, 'bg');
      addColor(cs.borderColor, 'border');
    }
    const topColors = Object.entries(colorCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 12)
      .map(([c, count]) => ({ color: c, count }));

    // 2. Polices utilisées
    const fontFamilies = new Set();
    const fontSizes = {};
    for (const el of allEls) {
      const cs = getComputedStyle(el);
      const ff = cs.fontFamily;
      const fs = cs.fontSize;
      if (el.children.length === 0 && ff) {
        fontFamilies.add(ff);
        fontSizes[fs] = (fontSizes[fs] || 0) + 1;
      }
    }

    // 3. Structure de la page
    const sections = document.querySelectorAll('section, div.section, [class*="section"], [class*="hero"], [class*="banner"]');
    const hasHeader = !!document.querySelector('header');
    const hasFooter = !!document.querySelector('footer');
    const hasNav = !!document.querySelector('nav');
    const hasMain = !!document.querySelector('main');
    const hasArticle = !!document.querySelector('article');
    const hasSticky = !!document.querySelector('[class*="sticky"], [class*="fixed"]');

    // 4. Images
    const images = Array.from(document.images).map(img => ({
      src: img.src.substring(0, 80),
      alt: img.alt || '(vide)',
      width: img.naturalWidth,
      height: img.naturalHeight,
      isLarge: img.naturalWidth >= 400 && img.naturalHeight >= 300
    }));
    const professionalPhotos = images.filter(i => i.isLarge).length;

    // 5. Liens et CTA
    const links = Array.from(document.querySelectorAll('a'));
    const ctaLinks = links.filter(a => {
      const text = (a.textContent || '').toLowerCase().trim();
      const cls = (a.className || '').toLowerCase();
      return text.includes('contact') || text.includes('appel') || text.includes('rendez-vous')
        || text.includes('devis') || text.includes('gratuit') || text.includes('discut')
        || cls.includes('cta') || cls.includes('btn') || cls.includes('button') || cls.includes('primary');
    });

    // 6. Typographie
    const hCount = { h1: 0, h2: 0, h3: 0 };
    ['h1','h2','h3'].forEach(t => {
      hCount[t] = document.querySelectorAll(t).length;
    });

    // 7. Espacement et mise en page
    const bodyEl = document.body;
    const bodyCS = getComputedStyle(bodyEl);
    const pageWidth = bodyEl.scrollWidth;
    const maxWidth = bodyCS.maxWidth !== 'none' ? bodyCS.maxWidth : 'none';

    // 8. Modernité technique
    const hasCSSGrid = !!document.querySelector('[style*="display: grid"], [style*="display:grid"]');
    const hasFlexbox = !!document.querySelector('[style*="display: flex"], [style*="display:flex"]');
    const hasCustomProps = document.styleSheets.length > 0 && Array.from(document.styleSheets).some(s => {
      try {
        return Array.from(s.cssRules || []).some(r => r.cssText && r.cssText.includes('--'));
      } catch(e) { return false; }
    });
    const totalCSSRules = Array.from(document.styleSheets).reduce((acc, s) => {
      try { return acc + (s.cssRules ? s.cssRules.length : 0); } catch(e) { return acc; }
    }, 0);

    // 9. Ombres et coins arrondis
    let shadowCount = 0, radiusCount = 0;
    for (const el of allEls) {
      const cs = getComputedStyle(el);
      if (cs.boxShadow && cs.boxShadow !== 'none') shadowCount++;
      if (cs.borderRadius && cs.borderRadius !== '0px') radiusCount++;
    }

    // 10. Palette subjective
    const hasModernDark = topColors.some(c => c.color.includes('#050505') || c.color.includes('#111'));
    const hasAccentColor = topColors.some(c => {
      const rgb = c.color;
      return rgb.includes('200') || rgb.includes('c8') || rgb.includes('ff0') || rgb.includes('gold');
    });

    return {
      colors: {
        palette: topColors,
        paletteSize: topColors.length,
        hasDarkBackground: hasModernDark,
        hasAccentColor: hasAccentColor,
        dominantColors: topColors.slice(0, 5).map(c => c.color)
      },
      typography: {
        fontFamilies: Array.from(fontFamilies),
        fontSizes: Object.entries(fontSizes).sort((a,b) => b[1]-a[1]).slice(0, 5),
        headingCount: hCount,
      },
      layout: {
        pageWidth,
        maxWidth,
        sections: sections.length,
        semanticTags: { header: hasHeader, footer: hasFooter, nav: hasNav, main: hasMain, article: hasArticle },
        hasStickyHeader: hasSticky,
        usesCSSGrid: hasCSSGrid,
        usesFlexbox: hasFlexbox,
        usesCustomProperties: hasCustomProps,
        totalCSSRules,
        shadows: shadowCount,
        roundedCorners: radiusCount,
      },
      images: {
        total: images.length,
        professionalSize: professionalPhotos,
        withoutAlt: images.filter(i => !i.alt).length,
      },
      cta: {
        totalCTALinks: ctaLinks.length,
        ctaTexts: ctaLinks.slice(0, 5).map(a => (a.textContent || '').trim()).filter(t => t),
      },
    };
  });

  // Sauvegarder
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(metrics, null, 2), 'utf-8');
  console.error(`✅ Design metrics sauvegardé: ${outputPath}`);
  console.log(JSON.stringify(metrics, null, 2));

  await browser.close();
})();
