// Captions: white Inter Black 104 px, soft dark shadow, no outline / box, centred at y 1500 (78 % of 1920).
// Cards come from script.json "caps" ("If you eat | a whole bag | of candy,"), timed to data/words.json.
import { TL } from './timeline.js';

const norm = (w) => w.toLowerCase().replace(/[^a-z0-9]+/g, '');

export function buildCards() {
  const cards = [];
  TL.script.lines.forEach((ln, i) => {
    const ws = TL.words.filter((w) => w.line === i);
    const caps = (ln.caps || ln.text).split('|').map((s) => s.trim()).filter(Boolean);
    let k = 0;                                                         // search position inside the line's words
    for (const c of caps) {
      const first = norm(c.split(/\s+/)[0]);
      let j = ws.findIndex((w, n) => n >= k && norm(w.w) === first);   // exact match first
      if (j < 0) j = ws.findIndex((w, n) => n >= k && (norm(w.w).startsWith(first) || first.startsWith(norm(w.w))));
      if (j < 0) j = Math.min(k, ws.length - 1);
      const nWords = c.split(/\s+/).length;
      cards.push({ text: c, line: i, s: ws[j]?.s ?? TL.lines[i].start, lastWord: Math.min(ws.length - 1, j + nWords - 1) });
      k = j + 1;
    }
  });
  cards.forEach((c, n) => {
    const next = cards[n + 1], ws = TL.words.filter((w) => w.line === c.line);
    const spokenEnd = (ws[c.lastWord]?.e ?? TL.lines[c.line].end) + 0.35;
    c.e = next ? (next.line === c.line ? next.s : Math.min(next.s, Math.max(spokenEnd, TL.lines[c.line].end + 0.25))) : Math.min(TL.duration, spokenEnd + 0.3);
  });
  return cards;
}

export function drawCaption(ctx, cards, t, { y = 1500, size = 104 } = {}) {
  const c = cards.find((c) => t >= c.s && t < c.e); if (!c) return;
  ctx.save();
  let fs = size; ctx.font = `900 ${fs}px Inter, sans-serif`;
  while (ctx.measureText(c.text).width > 960 && fs > 60) { fs -= 4; ctx.font = `900 ${fs}px Inter, sans-serif`; }
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  const pop = Math.min(1, (t - c.s) / 0.08), sc = 0.94 + 0.06 * pop;
  ctx.translate(540, y); ctx.scale(sc, sc);
  ctx.shadowColor = 'rgba(0,0,0,0.55)'; ctx.shadowBlur = 22; ctx.shadowOffsetY = 5;
  ctx.fillStyle = '#ffffff'; ctx.fillText(c.text, 0, 0);
  ctx.shadowBlur = 6; ctx.shadowOffsetY = 2; ctx.shadowColor = 'rgba(0,0,0,0.35)'; ctx.fillText(c.text, 0, 0);
  ctx.restore();
}
