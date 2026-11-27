// Boot: script.json + data/lines.json + data/words.json -> PRELOAD -> shots -> window.OP (used by tools/capture.mjs).
// A shot may declare transition: { type: 'flip'|'zoomblur'|'whip'|'dissolve', dur: 0.3, dir: 1 } (blends into it around its start).
import { TL, finalizeShots, QS } from './core/timeline.js';
import { makeEngine, W, H } from './core/engine.js';
import { load, A } from './core/assets.js';
import { buildCards, drawCaption } from './core/captions.js';
import * as SHOTS from './shots.js';

const cv = document.getElementById('cv'), ctx = cv.getContext('2d');
const glc = document.getElementById('gl');
const mk = () => { const c = document.createElement('canvas'); c.width = W; c.height = H; return c; };
const bufA = mk(), bufB = mk(), ca = bufA.getContext('2d'), cb = bufB.getContext('2d');
const FADE_IN = 0.18, FADE_OUT = 0.3;
let E, cards = [];

const getJSON = async (u, opt) => { const r = await fetch(u, { cache: 'no-store' }); if (!r.ok) { if (opt) return null; throw new Error(`${u}: ${r.status}`); } return r.json(); };

function drawShot(s, t, target) {
  const lt = Math.max(0, t - s.start), d = s.end - s.start;
  const blit = () => { target.drawImage(E.renderer.domElement, 0, 0, W, H); };
  try { s.draw(lt, d, t, blit); } catch (e) { console.error(`shot ${s.id} at ${t.toFixed(2)}: ${e.stack || e}`); throw e; }
}

function compose(type, k, dir = 1) {
  const kk = k * k * (3 - 2 * k);
  ctx.save(); ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
  if (type === 'dissolve') { ctx.drawImage(bufA, 0, 0); ctx.globalAlpha = kk; ctx.drawImage(bufB, 0, 0); }
  else if (type === 'zoomblur') {
    const layers = 6, out = kk < 0.5, src = out ? bufA : bufB, amt = out ? kk * 2 : (1 - kk) * 2;
    if (!out) ctx.drawImage(bufA, 0, 0);                         // keep something under B while it streaks in
    for (let i = 0; i < layers; i++) { const s = 1 + amt * 0.35 * (i / layers); ctx.globalAlpha = i === 0 ? 1 : 0.5 / layers * (layers - i) / layers * 3;
      ctx.drawImage(src, W / 2 - W * s / 2, H / 2 - H * s / 2, W * s, H * s); }
    ctx.globalAlpha = 1; const f = 1 - Math.abs(kk - 0.5) * 2; ctx.fillStyle = `rgba(255,255,255,${0.25 * f})`; ctx.fillRect(0, 0, W, H);
  } else if (type === 'whip') {
    const off = kk * W * dir;
    for (let i = 0; i < 8; i++) { const o = off - i * 40 * dir * Math.sin(Math.PI * kk); ctx.globalAlpha = i ? 0.18 : 1;
      ctx.drawImage(bufA, -o, 0); ctx.drawImage(bufB, -o + W * dir, 0); }
  } else if (type === 'flip') {                                  // cube turns on a vertical axis, black behind
    const a = kk * Math.PI / 2, wa = Math.cos(a) * W, wb = Math.sin(a) * W, x = dir > 0 ? 0 : W - wa - wb;
    const shade = (w, v) => { ctx.fillStyle = `rgba(0,0,0,${v})`; ctx.fillRect(w[0], 0, w[1], H); };
    const sq = 0.08 * Math.sin(2 * a);                           // slight shrink at the edge (perspective hint)
    if (dir > 0) { ctx.drawImage(bufA, x, H * sq / 2, wa, H * (1 - sq)); shade([x, wa], 0.6 * kk); ctx.drawImage(bufB, x + wa, H * sq / 2, wb, H * (1 - sq)); shade([x + wa, wb], 0.6 * (1 - kk)); }
    else { ctx.drawImage(bufB, x, H * sq / 2, wb, H * (1 - sq)); shade([x, wb], 0.6 * (1 - kk)); ctx.drawImage(bufA, x + wb, H * sq / 2, wa, H * (1 - sq)); shade([x + wb, wa], 0.6 * kk); }
  }
  ctx.restore();
}

function draw(t) {
  t = Math.max(0, Math.min(TL.duration - 1e-3, t));
  const shots = TL.shots; let i = shots.findIndex((s) => t >= s.start && t < s.end); if (i < 0) i = shots.length - 1;
  // transition window: [start - dur/2, start + dur/2] of the shot that declares it
  let done = false;
  for (const j of [i, i + 1]) {
    const s = shots[j], p = shots[j - 1]; if (!s || !p || !s.transition) continue;
    const dur = s.transition.dur ?? 0.3, a = s.start - dur / 2;
    if (t >= a && t < a + dur) {
      drawShot(p, Math.min(t, p.end + dur), ca); drawShot(s, Math.max(t, s.start), cb);
      compose(s.transition.type || 'dissolve', (t - a) / dur, s.transition.dir ?? 1); done = true; break;
    }
  }
  if (!done) drawShot(shots[i], t, ctx);
  drawCaption(ctx, cards, t);
  const fade = Math.min(1, t / FADE_IN, (TL.duration - t) / FADE_OUT);
  if (fade < 1) { ctx.fillStyle = `rgba(0,0,0,${1 - Math.max(0, fade)})`; ctx.fillRect(0, 0, W, H); }
}

function check() {
  const out = { duration: TL.duration, shots: TL.shots.map((s) => ({ id: s.id, start: +s.start.toFixed(2), end: +s.end.toFixed(2), note: s.note || '', transition: s.transition?.type })),
    cards: cards.map((c) => ({ text: c.text, s: +c.s.toFixed(2), e: +c.e.toFixed(2), len: +(c.e - c.s).toFixed(2) })), cues: TL.cues.length, problems: [] };
  if (!TL.shots.length) out.problems.push('no shots');
  else if (TL.shots[0].start > 0.01) out.problems.push(`first shot starts at ${TL.shots[0].start}`);
  TL.shots.forEach((s) => { if (s.end - s.start < 0.4) out.problems.push(`shot ${s.id} is only ${(s.end - s.start).toFixed(2)} s`); });
  out.cards.forEach((c) => { if (c.len < 0.3) out.problems.push(`card "${c.text}" only ${c.len} s (first word not matched?)`); });
  return out;
}

async function boot() {
  const status = (m) => { ctx.fillStyle = '#111'; ctx.fillRect(0, 0, W, H); ctx.fillStyle = '#fff'; ctx.font = '700 40px Inter, sans-serif'; ctx.textAlign = 'center'; ctx.fillText(m, W / 2, H / 2); };
  status('loading…');
  await document.fonts.load('900 104px Inter').catch(() => {});
  const [script, lines, words] = await Promise.all([getJSON('script.json'), getJSON('data/lines.json'), getJSON('data/words.json', true)]);
  Object.assign(TL, { script, lines: lines.lines, duration: lines.duration, words: words || [] });
  E = makeEngine(glc);
  await load(SHOTS.PRELOAD || {}, E.renderer, (d, n) => status(`loading assets ${d}/${n}`));
  await SHOTS.buildShots(E, A);
  finalizeShots(); cards = buildCards();
  window.OP = { ready: true, duration: TL.duration, get shots() { return TL.shots; }, cards, cues: TL.cues, A, E, TL, check, draw,
    frame(t, q = 0.92) { draw(t); return cv.toDataURL('image/jpeg', q); },
    /** contact sheet: frames at times ts, cols wide, each 270x480 with a label; returns a jpeg data URL */
    sheet(ts, cols = 6, labels = []) {
      const w = 270, h = 480, rows = Math.ceil(ts.length / cols), S = document.createElement('canvas'); S.width = cols * w; S.height = rows * (h + 34);
      const g = S.getContext('2d'); g.fillStyle = '#222'; g.fillRect(0, 0, S.width, S.height);
      ts.forEach((t, n) => { draw(t); const x = (n % cols) * w, y = Math.floor(n / cols) * (h + 34); g.drawImage(cv, x, y + 34, w, h);
        g.fillStyle = '#fff'; g.font = '600 20px Inter, sans-serif'; g.fillText(labels[n] || t.toFixed(2), x + 6, y + 24); });
      return S.toDataURL('image/jpeg', 0.85);
    } };
  if (QS.has('capture')) { draw(0); return; }
  // interactive preview: play with the mix (or narration) as the clock
  const btn = document.getElementById('play'); btn.hidden = false; draw(0);
  const audio = new Audio(); audio.src = 'data/mix.wav'; audio.onerror = () => { if (!audio.src.endsWith('narration.wav')) audio.src = 'data/narration.wav'; };
  btn.onclick = () => { btn.hidden = true; audio.currentTime = 0; audio.play().catch(() => {}); const t0 = performance.now();
    const loop = () => { const t = audio.paused || !isFinite(audio.duration) ? (performance.now() - t0) / 1000 : audio.currentTime; draw(t);
      if (t < TL.duration) requestAnimationFrame(loop); else btn.hidden = false; }; loop(); };
  window.addEventListener('keydown', (e) => { if (e.key === ' ') btn.onclick(); });
}
boot().catch((e) => { console.error(e.stack || e); window.OP = { error: String(e.stack || e) }; });
