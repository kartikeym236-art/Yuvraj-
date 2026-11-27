// Timeline helpers shared by shots.js and main.js. Every shot is a pure function of time.
import * as THREE from 'three';

export const TL = { lines: [], words: [], duration: 30, shots: [], cues: [], script: {} };

export const V3 = (x = 0, y = 0, z = 0) => new THREE.Vector3(x, y, z);
export const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
export const lerp = (a, b, k) => a + (b - a) * k;
export const lerpV = (a, b, k) => a.clone().lerp(b, k);
export const seg = (t, a, b) => clamp((t - a) / (b - a));                 // 0..1 progress of t through [a, b]
export const eio = (k) => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);   // ease in-out (cubic)
export const eo = (k) => 1 - Math.pow(1 - k, 3);                          // ease out
export const ei = (k) => k * k * k;                                       // ease in
export const pulse = (t, a, b) => Math.sin(Math.PI * seg(t, a, b));       // 0 -> 1 -> 0 across [a, b]
export const smooth = (a, b, x) => { const k = clamp((x - a) / (b - a)); return k * k * (3 - 2 * k); };

const norm = (w) => w.toLowerCase().replace(/[^a-z0-9]+/g, '');

/** time just before line i starts (a cut lands here). cut(n) for n >= lines gives the end. */
export function cut(i) {
  const L = TL.lines;
  if (i <= 0) return 0;
  if (i >= L.length) return TL.duration;
  return Math.max(0, L[i].start - 0.12);
}
/** when a line starts / ends */
export const lineStart = (i) => TL.lines[i]?.start ?? 0;
export const lineEnd = (i) => TL.lines[i]?.end ?? TL.duration;

/** time a word is spoken: Wd('insulin', 4) = first word in line 4 that matches. Exact match wins over prefix match.
 *  Wd('word', i, n) = n-th match (0-based). Returns the line start if nothing matches (and warns once). */
const warned = new Set();
export function Wd(word, i, n = 0) {
  const ws = TL.words.filter((w) => w.line === i), q = norm(word);
  let m = ws.filter((w) => norm(w.w) === q);
  if (m.length <= n) m = ws.filter((w) => norm(w.w).startsWith(q));
  if (m.length > n) return m[n].s;
  if (!warned.has(word + i)) { warned.add(word + i); console.warn(`Wd: "${word}" not found in line ${i}`); }
  return lineStart(i);
}

/** register a shot: { id, at, note, draw(lt, d, t, blit), transition: {type, dur, dir} }. A shot runs until the next one. */
export function add(shot) { TL.shots.push(shot); return shot; }
/** register a sound cue for tools/mix.py: cue(time, 'whoosh', { gain: 0.4, dur: 1, pan: -0.3 }) */
export function cue(t, type, o = {}) { TL.cues.push({ t: +(+t).toFixed(3), type, gain: 0.45, ...o }); }

/** shots sorted, with derived start/end */
export function finalizeShots() {
  TL.shots.sort((a, b) => a.at - b.at);
  TL.shots.forEach((s, k) => { s.start = s.at; s.end = k < TL.shots.length - 1 ? TL.shots[k + 1].at : TL.duration; });
  return TL.shots;
}

/** query-string options: ?capture&res=1.5&cam=x,y,z,lx,ly,lz */
export const QS = new URLSearchParams(location.search);
export function debugCam(cam) {
  const c = QS.get('cam'); if (!c) return false;
  const v = c.split(',').map(Number); cam.position.set(v[0], v[1], v[2]); cam.lookAt(v[3], v[4], v[5]); return true;
}
