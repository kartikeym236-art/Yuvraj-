// Shared drawing helpers and the difference engine.
'use strict';

const INK = '#262626';
const SW = 4;
const st = `stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round" stroke-linecap="round"`;

// ---------- seeded randomness ----------
function makeRng(seed) {
  let a = seed >>> 0;
  const next = () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const r = {
    next,
    range: (lo, hi) => lo + next() * (hi - lo),
    int: (lo, hi) => Math.floor(lo + next() * (hi - lo + 1)),
    pick: (arr) => arr[Math.floor(next() * arr.length)],
    chance: (p) => next() < p,
    shuffle: (arr) => {
      const out = arr.slice();
      for (let i = out.length - 1; i > 0; i--) {
        const j = Math.floor(next() * (i + 1));
        [out[i], out[j]] = [out[j], out[i]];
      }
      return out;
    },
  };
  return r;
}

// ---------- primitive SVG helpers ----------
const f = (n) => (Math.round(n * 10) / 10).toString();
const C = (cx, cy, r, fill, extra = '') =>
  `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(r)}" fill="${fill}" ${st} ${extra}/>`;
const E = (cx, cy, rx, ry, fill, extra = '') =>
  `<ellipse cx="${f(cx)}" cy="${f(cy)}" rx="${f(rx)}" ry="${f(ry)}" fill="${fill}" ${st} ${extra}/>`;
const R = (x, y, w, h, fill, rx = 0, extra = '') =>
  `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" rx="${f(rx)}" fill="${fill}" ${st} ${extra}/>`;
const P = (d, fill, extra = '') => `<path d="${d}" fill="${fill}" ${st} ${extra}/>`;
const L = (x1, y1, x2, y2, w = SW, col = INK) =>
  `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>`;
const S = (d, w = SW, col = INK) =>
  `<path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
const G = (inner, transform) => `<g transform="${transform}">${inner}</g>`;
const mirror = (inner, W = 720) => G(inner, `translate(${W},0) scale(-1,1)`);

function star(cx, cy, ro, ri, fill, rot = -90, extra = '') {
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 ? ri : ro;
    const a = ((rot + i * 36) * Math.PI) / 180;
    pts.push(`${f(cx + r * Math.cos(a))},${f(cy + r * Math.sin(a))}`);
  }
  return `<polygon points="${pts.join(' ')}" fill="${fill}" ${st} ${extra}/>`;
}
function heart(cx, cy, s, fill, extra = '') {
  const d = `M${f(cx)} ${f(cy + s * 0.9)} C${f(cx - s * 1.3)} ${f(cy + s * 0.1)} ${f(cx - s * 0.9)} ${f(cy - s * 0.9)} ${f(cx)} ${f(cy - s * 0.35)} C${f(cx + s * 0.9)} ${f(cy - s * 0.9)} ${f(cx + s * 1.3)} ${f(cy + s * 0.1)} ${f(cx)} ${f(cy + s * 0.9)} Z`;
  return P(d, fill, extra);
}
function bow(cx, cy, s, fill) {
  return (
    P(`M${f(cx)} ${f(cy)} L${f(cx - s)} ${f(cy - s * 0.6)} L${f(cx - s)} ${f(cy + s * 0.6)} Z`, fill) +
    P(`M${f(cx)} ${f(cy)} L${f(cx + s)} ${f(cy - s * 0.6)} L${f(cx + s)} ${f(cy + s * 0.6)} Z`, fill) +
    C(cx, cy, s * 0.25, fill)
  );
}
function flake(cx, cy, r, col = '#9cc9e8', w = 4) {
  let s = '';
  for (let i = 0; i < 6; i++) {
    const a = (i * 60 * Math.PI) / 180;
    const x = cx + r * Math.cos(a), y = cy + r * Math.sin(a);
    s += L(cx, cy, x, y, w, col);
    const mx = cx + r * 0.6 * Math.cos(a), my = cy + r * 0.6 * Math.sin(a);
    for (const d of [-1, 1]) {
      const b = a + d * 0.7;
      s += L(mx, my, mx + r * 0.3 * Math.cos(b), my + r * 0.3 * Math.sin(b), w, col);
    }
  }
  return s;
}

// ---------- items ----------
// An item is a piece of the drawing that can carry one difference.
//   draw(fill)  -> svg string
//   kinds       -> allowed difference kinds:
//                  color | hide | show | scale | rotate | flip | swap
//   cx, cy, r   -> where it is (used for spacing and the answer key)
function I(draw, o = {}) {
  const item = Object.assign(
    { draw: typeof draw === 'function' ? draw : () => draw, fill: null, alt: [], kinds: [], cx: 0, cy: 0, r: 20 },
    o
  );
  if (item.optional) item.kinds = ['show'];
  return item;
}

function renderItem(it, mod) {
  if (typeof it === 'string') return it;
  if (it.optional && !(mod && mod.kind === 'show')) return '';
  if (mod && mod.kind === 'hide') return '';
  let fill = it.fill;
  if (mod && mod.kind === 'color') fill = mod.to;
  let s = mod && mod.kind === 'swap' ? it.swap(fill) : it.draw(fill);
  if (mod) {
    const { cx, cy } = it;
    if (mod.kind === 'scale') s = G(s, `translate(${f(cx)},${f(cy)}) scale(${mod.k}) translate(${f(-cx)},${f(-cy)})`);
    if (mod.kind === 'rotate') s = G(s, `rotate(${mod.a},${f(cx)},${f(cy)})`);
    if (mod.kind === 'flip') s = G(s, `translate(${f(2 * cx)},0) scale(-1,1)`);
  }
  return s;
}

function renderFigure(items, mods, prefix) {
  return items
    .map((it) => renderItem(it, mods.get(it)))
    .join('\n')
    .replace(/ID_/g, prefix + '_');
}

// Pick n items far enough apart and give each one difference.
function chooseMods(items, n, rng, minDist = 85) {
  const cands = rng.shuffle(items.filter((o) => typeof o === 'object' && o.kinds.length));
  const chosen = [];
  for (const c of cands) {
    if (chosen.length >= n) break;
    if (chosen.every((d) => Math.hypot(d.cx - c.cx, d.cy - c.cy) >= minDist)) chosen.push(c);
  }
  if (chosen.length < n) throw new Error(`only ${chosen.length} spaced candidates for ${n} differences`);
  const mods = new Map();
  for (const c of chosen) {
    const kind = rng.pick(c.kinds);
    const m = { kind };
    if (kind === 'color') {
      const opts = c.alt.filter((x) => x.toLowerCase() !== String(c.fill).toLowerCase());
      if (!opts.length) throw new Error('color mod without alt');
      m.to = rng.pick(opts);
    }
    if (kind === 'scale') m.k = c.scaleK || rng.pick([0.68, 1.4]);
    if (kind === 'rotate') m.a = (c.rot || 28) * (rng.chance(0.5) ? 1 : -1);
    mods.set(c, m);
  }
  return mods;
}

module.exports = { INK, SW, st, makeRng, f, C, E, R, P, L, S, G, mirror, star, heart, bow, flake, I, renderFigure, chooseMods };
