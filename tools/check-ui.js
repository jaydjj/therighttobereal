#!/usr/bin/env node
/*
  UI check: run before every push that touches the site's look.
    node tools/check-ui.js            (builds with Jekyll into a temp folder, then checks)
    node tools/check-ui.js _site      (checks an already-built folder)

  Opens every page at desktop (1280px) and phone (390px) widths, shows hidden states
  (e.g. "Want reminders?"), and fails if anything breaks the rules in DESIGN.md:
    1. Type: only the four styles at the seven sizes in assets/styles.css (--t-display ... --t-label).
    2. Contrast: all text meets WCAG AA (4.5:1, or 3:1 for large text).
    3. Colour on black: no red text, buttons or bars on black; labels on black are gold.
    4. Layout: nothing wider than the screen at phone width; no lines between sections.
    5. Images: every image has alt text.
  Needs Playwright (preinstalled in Claude's cloud sessions).
*/
const { chromium } = require('playwright');
const { execSync } = require('child_process');
const http = require('http');
const fs = require('fs');
const os = require('os');
const path = require('path');

const root = path.resolve(__dirname, '..');
const PAGES = ['/', '/404.html'];
const WIDTHS = [1280, 390];

let site = process.argv[2] && path.resolve(process.argv[2]);
if (!site) {
  site = fs.mkdtempSync(path.join(os.tmpdir(), 'rtbr-site-'));
  execSync(`jekyll build -q -s "${root}" -d "${site}"`, { stdio: 'inherit' });
}

const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon' };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p.endsWith('/')) p += 'index.html';
  const f = path.join(site, p);
  if (!f.startsWith(site) || !fs.existsSync(f)) { res.statusCode = 404; return res.end(); }
  res.setHeader('Content-Type', types[path.extname(f)] || 'application/octet-stream');
  fs.createReadStream(f).pipe(res);
}).listen(0);

function audit() {
  const out = [];
  const px = v => Math.round(parseFloat(v) * 10) / 10;
  const parse = c => (c.match(/[\d.]+/g) || [0, 0, 0, 0]).map(Number);
  const lum = ([r, g, b]) => { const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
  const bgOf = el => { for (let e = el; e; e = e.parentElement) { const c = parse(getComputedStyle(e).backgroundColor); if (c.length < 4 || c[3] > 0.9) return c.slice(0, 3); } return [239, 230, 212]; };
  const near = (a, b) => a.every((v, i) => Math.abs(v - b[i]) < 6);
  const RED = [158, 42, 31];
  const isDark = c => lum(c) < 0.05;
  const label = (el, txt) => `${el.tagName.toLowerCase()}${el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/).join('.') : ''} "${txt.slice(0, 40)}"`;

  // The seven sizes, read from the CSS tokens at this screen width.
  const probe = document.createElement('span');
  document.body.appendChild(probe);
  const size = {};
  for (const t of ['display', 'h2', 'title', 'lead', 'body', 'small', 'label']) {
    probe.style.fontSize = `var(--t-${t})`;
    size[t] = px(getComputedStyle(probe).fontSize);
  }
  probe.remove();
  const allowed = [
    { family: 'DM Serif Display', weight: '400', sizes: ['display', 'h2', 'title'], styles: ['normal', 'italic'], caps: false },
    { family: 'Work Sans', weight: '400', sizes: ['lead', 'body', 'small'], styles: ['normal'], caps: false },
    { family: 'Work Sans', weight: '600', sizes: ['label'], styles: ['normal'], caps: true },
  ];

  for (const el of document.querySelectorAll('body *')) {
    if (el.closest('svg, script, style, .visually-hidden')) continue;
    const txt = [...el.childNodes].filter(n => n.nodeType === 3 && n.textContent.trim()).map(n => n.textContent.trim()).join(' ');
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') continue;

    // Colour on black (backgrounds of buttons and bars too)
    const bg = bgOf(el.parentElement || el);
    const ownBg = parse(cs.backgroundColor);
    if (isDark(bg) && (ownBg.length < 4 || ownBg[3] > 0.9) && near(ownBg.slice(0, 3), RED)) out.push(`red on black: ${label(el, txt || el.textContent.trim())}`);

    if (!txt && el.tagName !== 'INPUT') continue;
    const text = txt || el.placeholder || '';

    // 1. Type
    const fam = cs.fontFamily.split(',')[0].replace(/["']/g, '').trim();
    const s = px(cs.fontSize);
    const caps = cs.textTransform === 'uppercase';
    const ok = allowed.some(a => a.family === fam && a.weight === cs.fontWeight && a.styles.includes(cs.fontStyle) && a.caps === caps && a.sizes.some(k => Math.abs(size[k] - s) < 0.6));
    if (!ok) out.push(`type: ${fam} ${cs.fontWeight} ${cs.fontStyle}${caps ? ' caps' : ''} ${s}px is not one of the seven sizes: ${label(el, text)}`);

    // 2. Contrast
    const back = bgOf(el);
    let fg = parse(cs.color);
    if (fg.length >= 4 && fg[3] < 1) fg = fg.slice(0, 3).map((v, i) => v * fg[3] + back[i] * (1 - fg[3]));
    const L1 = lum(fg.slice(0, 3)), L2 = lum(back);
    const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
    const large = s >= 24;
    if (ratio < (large ? 3 : 4.5)) out.push(`contrast ${ratio.toFixed(2)}:1: ${label(el, text)}`);

    // 3. Text colour on black: never red; labels gold
    if (isDark(back)) {
      if (near(fg.slice(0, 3), RED)) out.push(`red text on black: ${label(el, text)}`);
      if (caps && !el.closest('.btn, .tag') && !near(fg.slice(0, 3), [217, 164, 65])) out.push(`label on black is not gold: ${label(el, text)}`);
    }
  }

  // 4. Layout
  const wide = [...document.querySelectorAll('body *')].filter(e => e.getBoundingClientRect().right > innerWidth + 1 && getComputedStyle(e).position !== 'fixed');
  if (wide.length) out.push(`wider than the screen: ${wide.slice(0, 3).map(e => label(e, '')).join(', ')}`);
  for (const sec of document.querySelectorAll('section, footer')) {
    const cs = getComputedStyle(sec);
    if (parseFloat(cs.borderTopWidth) || parseFloat(cs.borderBottomWidth)) out.push(`line between sections: ${label(sec, '')}`);
  }

  // 5. Images
  for (const img of document.querySelectorAll('img')) if (!img.alt || !img.alt.trim()) out.push(`image without alt text: ${img.src}`);
  return out;
}

(async () => {
  const port = server.address().port;
  const browser = await chromium.launch();
  let failures = 0;
  for (const width of WIDTHS) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    for (const u of PAGES) {
      await page.goto(`http://localhost:${port}${u}`);
      await page.evaluate(() => document.fonts.ready);
      // Show hidden states (e.g. the line after pledging) so they're checked too.
      await page.evaluate(() => document.querySelectorAll('main [hidden]').forEach(e => e.removeAttribute('hidden')));
      const problems = [...new Set(await page.evaluate(audit))];
      failures += problems.length;
      console.log(`${problems.length ? 'FAIL' : 'ok  '} ${u} at ${width}px${problems.length ? '\n  - ' + problems.join('\n  - ') : ''}`);
    }
    await page.close();
  }
  await browser.close();
  server.close();
  if (failures) { console.log(`\n${failures} problem(s). Fix before pushing.`); process.exit(1); }
  console.log('\nAll UI checks pass.');
})();
