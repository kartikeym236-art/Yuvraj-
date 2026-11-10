// Generates N "Find X Differences" puzzles (+ answer keys) as PNGs.
// Usage: node generate.js [count=50] [outDir=output] [seed=2026]
'use strict';
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const { makeRng, renderFigure, chooseMods, f } = require('./lib');
const themes = require('./themes');

const COUNT = +(process.argv[2] || 50);
const OUT = path.resolve(process.argv[3] || 'output');
const SEED = +(process.argv[4] || 2026);
const CW = 1600, CH = 2000;
const CELL = { y: 365, h: 1590, w: 760, xs: [20, 820] };
const BG = '#fbf3f8';
const font = fs.readFileSync(path.join(__dirname, 'Poppins-ExtraBold.ttf')).toString('base64');

function placement(W, H, i) {
  const s = Math.min((CELL.w - 20) / W, (CELL.h - 20) / H);
  const x = CELL.xs[i] + (CELL.w - W * s) / 2;
  const y = CELL.y + (CELL.h - H * s) / 2;
  return { s, x, y };
}

function page(fig, n, mods, answers) {
  const title = `Find ${n} Difference${n > 1 ? 's' : ''}`;
  let body = `<rect width="${CW}" height="${CH}" fill="${BG}"/>`;
  body += `<rect x="78" y="55" width="1444" height="270" rx="135" fill="#b3191f"/>`;
  body += `<text x="800" y="238" text-anchor="middle" font-family="Poppins" font-size="${n > 1 ? 150 : 158}" fill="#ffffff">${title}</text>`;
  ['L', 'R'].forEach((side, i) => {
    const pl = placement(fig.W, fig.H, i);
    const figMods = side === 'R' ? mods : new Map();
    body += `<g transform="translate(${f(pl.x)},${f(pl.y)}) scale(${pl.s.toFixed(4)})">${renderFigure(fig.items, figMods, side + Math.random().toString(36).slice(2, 6))}</g>`;
    if (answers) {
      let k = 1;
      for (const [it] of mods) {
        const cx = pl.x + it.cx * pl.s, cy = pl.y + it.cy * pl.s, r = Math.max(34, (it.r + 16) * pl.s);
        body += `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(r)}" fill="none" stroke="#e8141c" stroke-width="7"/>`;
        body += `<circle cx="${f(cx + r * 0.72)}" cy="${f(cy - r * 0.72)}" r="17" fill="#e8141c"/><text x="${f(cx + r * 0.72)}" y="${f(cy - r * 0.72 + 8)}" font-family="Poppins" font-size="22" text-anchor="middle" fill="#fff">${k++}</text>`;
      }
    }
  });
  return `<!doctype html><html><head><style>@font-face{font-family:Poppins;src:url(data:font/ttf;base64,${font})}html,body{margin:0;padding:0;background:${BG}}</style></head><body><svg xmlns="http://www.w3.org/2000/svg" width="${CW}" height="${CH}" viewBox="0 0 ${CW} ${CH}">${body}</svg></body></html>`;
}

(async () => {
  fs.mkdirSync(path.join(OUT, 'puzzles'), { recursive: true });
  fs.mkdirSync(path.join(OUT, 'answers'), { recursive: true });
  const browser = await chromium.launch();
  const pg = await browser.newPage({ viewport: { width: CW, height: CH }, deviceScaleFactor: 1 });
  const names = Object.keys(themes);
  const master = makeRng(SEED);
  // balanced mix of 1..5 differences, shuffled
  const counts = master.shuffle(Array.from({ length: COUNT }, (_, i) => (i % 5) + 1));
  const manifest = [];
  for (let i = 0; i < COUNT; i++) {
    const theme = names[i % names.length];
    const n = counts[i];
    let fig, mods, seed;
    for (let attempt = 0; ; attempt++) {
      seed = SEED * 1000 + i * 37 + attempt;
      const rng = makeRng(seed);
      fig = themes[theme](rng);
      try { mods = chooseMods(fig.items, n, rng); break; } catch (e) { if (attempt > 20) throw e; }
    }
    const id = String(i + 1).padStart(2, '0');
    const file = `${id}_${theme}_find-${n}.png`;
    for (const [dir, ans] of [['puzzles', false], ['answers', true]]) {
      await pg.setContent(page(fig, n, mods, ans));
      await pg.evaluate(() => document.fonts.ready);
      await pg.screenshot({ path: path.join(OUT, dir, file), clip: { x: 0, y: 0, width: CW, height: CH } });
    }
    manifest.push({ file, theme, differences: n, changes: [...mods].map(([it, m]) => ({ kind: m.kind, at: [Math.round(it.cx), Math.round(it.cy)] })) });
    process.stdout.write(`${file}\n`);
  }
  fs.writeFileSync(path.join(OUT, 'answers.json'), JSON.stringify(manifest, null, 2));
  await browser.close();
})();
