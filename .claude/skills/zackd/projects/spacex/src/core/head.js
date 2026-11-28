// Sculpted head for people.js: ONE displaced sphere (forehead, brow ridge, sockets, cheekbones, nose, lips, chin, jaw),
// a painted face texture (skin variation, lips, brows, under-eye, stubble, age lines), hair / beard / moustache shells that
// hug the skull, eyeballs with irises + lids, shaped ears. Stylised, recognisable, NOT a photoreal likeness.
// buildHead(S) -> { group, setLook(yaw, pitch), setBlink(k), setBrow(k), setTalk(k), setSmile(k), anchors: { top, mouth, chin } }
import * as THREE from 'three';

const sst = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
const g3 = (p, c, s) => { const dx = p.x - c[0], dy = p.y - c[1], dz = p.z - c[2]; return Math.exp(-(dx * dx + dy * dy + dz * dz) / (s * s)); };
const rnd = (s) => { const x = Math.sin(s * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
const HW = 0.076, HH = 0.105, HD = 0.094;            // half width / height / depth in metres (before the stylise scale)

/** unit-sphere direction -> canvas pixel on the SphereGeometry UV layout (front +z is u = 0.25) */
const uvOf = (x, y, z, W, H) => { let phi = Math.atan2(z, -x); if (phi < 0) phi += Math.PI * 2; return [phi / (Math.PI * 2) * W, Math.acos(Math.max(-1, Math.min(1, y))) / Math.PI * H]; };

export const FACE_DEFAULT = { faceLen: 1, jaw: 1, chin: 1, nose: 1, noseW: 1, hook: 0, brow: 1, cheek: 1, lips: 1, eyes: 1, droop: 0, age: 0, ears: 1,
  hairline: 0.55, recede: 0.25, hairSide: 0.12, hairBack: -0.4, hairT: 0.06, part: 0, stubble: 0 };

function sculpt(p, F) {
  const front = sst(0.15, 0.75, p.z);
  let d = 0, fz = 0;
  d += 0.06 * F.brow * Math.exp(-((p.y - 0.3) ** 2) / 0.012) * Math.exp(-(p.x * p.x) / 0.4) * front;      // brow ridge
  for (const s of [-1, 1]) {
    d -= 0.13 * g3(p, [s * 0.35, 0.15, 0.86], 0.15);                                                      // eye sockets
    d += 0.05 * F.cheek * g3(p, [s * 0.56, -0.1, 0.76], 0.24);                                             // cheekbones
    d -= 0.01 * g3(p, [s * 0.86, 0.34, 0.32], 0.25);                                                      // temples
    d += 0.035 * F.age * g3(p, [s * 0.48, -0.62, 0.58], 0.2);                                              // jowls
    d += 0.02 * F.age * g3(p, [s * 0.36, 0.03, 0.88], 0.07);                                               // eye bags
    fz += 0.035 * F.noseW * g3(p, [s * 0.12, -0.25, 0.94], 0.08);                                          // nostril wings
  }
  const nx = Math.exp(-(p.x * p.x) / (0.011 * F.noseW * F.noseW)), win = Math.exp(-(((p.y + 0.04) / 0.27) ** 4));
  fz += F.nose * 0.13 * sst(0.2, -0.15, p.y) * nx * win * front;                                           // nose ridge
  fz += F.nose * 0.055 * g3(p, [0, -0.19, 1.0], 0.1);                                                      // tip
  fz += F.hook * 0.04 * g3(p, [0, 0.02, 0.98], 0.09);                                                       // bridge bump
  d += 0.055 * F.lips * g3(p, [0, -0.4, 0.93], 0.11) * Math.exp(-(p.x * p.x) / 0.08) + 0.065 * F.lips * g3(p, [0, -0.52, 0.9], 0.1) * Math.exp(-(p.x * p.x) / 0.07);      // lips
  d -= 0.035 * Math.exp(-((p.y + 0.46) ** 2) / 0.0006) * Math.exp(-(p.x * p.x) / 0.06) * front;              // mouth line
  d += 0.07 * F.chin * g3(p, [0, -0.82, 0.6], 0.2);                                                        // chin
  d += 0.05 * g3(p, [0, 0.12, -0.95], 0.5);                                                                // back of the skull
  const jawK = 1 - (1 - F.jaw * 0.82) * sst(0.0, -0.95, p.y);                                              // narrower jaw toward the chin
  return { d, fz, jawK };
}

function paintFace(S, F) {
  const W = 1024, H = 512, c = document.createElement('canvas'); c.width = W; c.height = H; const g = c.getContext('2d');
  const base = new THREE.Color(S.skin), dark = base.clone().multiplyScalar(0.82), warm = base.clone().lerp(new THREE.Color('#e07a6a'), 0.25);
  g.fillStyle = '#' + base.getHexString(); g.fillRect(0, 0, W, H);
  for (let i = 0; i < 2500; i++) { const v = (rnd(i) - 0.5) * 0.08; g.fillStyle = `rgba(${v > 0 ? '255,255,255' : '0,0,0'},${Math.abs(v)})`; g.fillRect(rnd(i + 1) * W, rnd(i + 2) * H, 2 + rnd(i + 3) * 6, 2 + rnd(i + 4) * 6); }
  const at = (x, y, z) => uvOf(x, y, z, W, H);
  const blob = (dir, rx, ry, col, a) => { const [u, v] = at(...dir); const gr = g.createRadialGradient(u, v, 0, u, v, Math.max(rx, ry));
    gr.addColorStop(0, col.replace('A', a)); gr.addColorStop(1, col.replace('A', 0)); g.save(); g.translate(u, v); g.scale(rx / Math.max(rx, ry), ry / Math.max(rx, ry)); g.translate(-u, -v);
    g.fillStyle = gr; g.fillRect(u - Math.max(rx, ry), v - Math.max(rx, ry), 2 * Math.max(rx, ry), 2 * Math.max(rx, ry)); g.restore(); };
  const rgb = (c) => `rgba(${(c.r * 255) | 0},${(c.g * 255) | 0},${(c.b * 255) | 0},A)`;
  for (const s of [-1, 1]) { blob([s * 0.55, -0.15, 0.8], 46, 30, rgb(warm), 0.35); blob([s * 0.36, 0.06, 0.9], 30, 12, rgb(dark), 0.35 + 0.3 * F.age); }
  blob([0, -0.05, 1], 14, 40, rgb(warm), 0.15);
  // lips
  const lipC = base.clone().lerp(new THREE.Color('#9a4a46'), 0.6);
  blob([0, -0.4, 0.91], 36, 9, rgb(lipC), 1); blob([0, -0.52, 0.87], 34, 12, rgb(lipC), 1);
  const [mu, mv] = at(0, -0.46, 0.88); g.strokeStyle = 'rgba(55,18,18,0.85)'; g.lineWidth = 3; g.beginPath(); g.moveTo(mu - 36, mv + 1); g.quadraticCurveTo(mu, mv + 3, mu + 36, mv + 1); g.stroke();
  // stubble / beard shadow
  if (F.stubble > 0) for (let i = 0; i < 9000 * F.stubble; i++) { const x = (rnd(i + 50) - 0.5) * 1.3, y = -0.25 - rnd(i + 51) * 0.75, z = Math.sqrt(Math.max(0, 1 - x * x - y * y));
    if (z < 0.2 || (Math.abs(x) < 0.22 && y > -0.62 && y < -0.38)) continue; const [u, v] = at(x, y, z); g.fillStyle = `rgba(30,25,22,${0.25 * F.stubble})`; g.fillRect(u, v, 1.5, 1.5); }
  // painted brows (geometry brows sit on top for movement)
  g.strokeStyle = S.brows; g.lineCap = 'round';
  for (const s of [-1, 1]) for (let i = 0; i < 40; i++) { const t = i / 39, x = s * (0.18 + 0.36 * t), y = 0.33 + 0.05 * Math.sin(t * Math.PI) - 0.04 * t, [u, v] = at(x, y, Math.sqrt(1 - x * x - y * y));
    g.globalAlpha = 0.5; g.lineWidth = 2 * F.browW || 2; g.beginPath(); g.moveTo(u, v + 4); g.lineTo(u + s * 5, v - 3); g.stroke(); }
  g.globalAlpha = 1;
  // age lines
  if (F.age > 0) { g.strokeStyle = `rgba(90,50,40,${0.35 * F.age})`; g.lineWidth = 2;
    for (let k = 0; k < 3; k++) { const y = 0.5 + k * 0.08; const [u0, v0] = at(-0.4, y, Math.sqrt(1 - 0.16 - y * y)), [u1, v1] = at(0.4, y, Math.sqrt(1 - 0.16 - y * y)); g.beginPath(); g.moveTo(u0, v0); g.quadraticCurveTo((u0 + u1) / 2, v0 - 4, u1, v1); g.stroke(); }
    for (const s of [-1, 1]) { const [u0, v0] = at(s * 0.2, -0.22, 0.95), [u1, v1] = at(s * 0.36, -0.55, 0.75); g.beginPath(); g.moveTo(u0, v0); g.quadraticCurveTo(u0 + s * 14, (v0 + v1) / 2, u1, v1); g.stroke(); } }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t;
}

function strandTex(color, dir = 'back') {
  const W = 512, H = 256, c = document.createElement('canvas'); c.width = W; c.height = H; const g = c.getContext('2d'), col = new THREE.Color(color);
  g.fillStyle = '#' + col.getHexString(); g.fillRect(0, 0, W, H);
  for (let i = 0; i < 2600; i++) { const v = rnd(i) - 0.5, x = rnd(i + 1) * W, y = rnd(i + 2) * H, l = 8 + rnd(i + 3) * 24;
    g.strokeStyle = v > 0 ? `rgba(255,255,255,${v * 0.22})` : `rgba(0,0,0,${-v * 0.35})`; g.lineWidth = 1; g.beginPath(); g.moveTo(x, y);
    if (dir === 'down') g.lineTo(x + (rnd(i) - 0.5) * 3, y + l); else g.lineTo(x + l, y + (rnd(i + 4) - 0.5) * 3); g.stroke(); }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; return t;
}

/** shell over part of the head: mask(p) 0..1 picks the area, thick(p) the offset (unit space), extra(p) a free offset vector */
function shell(geo, dirs, mask, thick, extra, mat) {
  const g = geo.clone(), pos = g.attributes.position, idx = g.index.array, keep = [];
  const inside = new Float32Array(pos.count);
  for (let i = 0; i < pos.count; i++) { const p = dirs[i], m = mask(p); inside[i] = m;
    const t = m > 0.01 ? thick(p) * m - 0.02 * (1 - m) : -0.02, e = extra && m > 0.01 ? extra(p, m) : null;
    pos.setXYZ(i, pos.getX(i) + p.x * t * HW + (e ? e.x * HW : 0), pos.getY(i) + p.y * t * HH + (e ? e.y * HH : 0), pos.getZ(i) + p.z * t * HD + (e ? e.z * HD : 0)); }
  for (let i = 0; i < idx.length; i += 3) if (Math.max(inside[idx[i]], inside[idx[i + 1]], inside[idx[i + 2]]) > 0.35) keep.push(idx[i], idx[i + 1], idx[i + 2]);
  g.setIndex(keep); g.computeVertexNormals();
  const m = new THREE.Mesh(g, mat); m.castShadow = true; return m;
}

export function buildHead(S) {
  const F = { ...FACE_DEFAULT, ...(S.face || {}), browW: S.browW || 1 };
  const geo = new THREE.SphereGeometry(1, 160, 120), pos = geo.attributes.position, dirs = [];
  for (let i = 0; i < pos.count; i++) {
    const p = new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i)); dirs.push(p.clone());
    const { d, fz, jawK } = sculpt(p, F); const yl = p.y < 0 ? p.y * F.faceLen : p.y * 0.9, top = 1 + 0.09 * sst(0.1, 0.75, p.y) - 0.05 * sst(0.75, 1.0, p.y);
    pos.setXYZ(i, p.x * (1 + d) * jawK * top * HW, yl * (1 + d) * HH, (p.z * (1 + d) + fz) * top * HD);
  }
  geo.computeVertexNormals();
  const skinMat = new THREE.MeshPhysicalMaterial({ map: paintFace(S, F), roughness: 0.55, sheen: 0.5, sheenColor: new THREE.Color('#ffd8c8'), sheenRoughness: 0.5, clearcoat: 0.08 });
  const g = new THREE.Group(), head = new THREE.Mesh(geo, skinMat); head.castShadow = true; head.receiveShadow = true; g.add(head);
  // eyes
  const irisTex = (() => { const c = document.createElement('canvas'); c.width = 256; c.height = 128; const x = c.getContext('2d'); x.fillStyle = '#f1ece6'; x.fillRect(0, 0, 256, 128);
    const gr = x.createRadialGradient(64, 64, 2, 64, 64, 34); gr.addColorStop(0, '#050403'); gr.addColorStop(0.35, '#0a0705'); gr.addColorStop(0.4, S.eyeColor || '#4a2f1c'); gr.addColorStop(0.95, '#1a120c'); gr.addColorStop(1, 'rgba(0,0,0,0)');
    x.fillStyle = gr; x.beginPath(); x.ellipse(64, 64, 17, 34, 0, 0, 7); x.fill(); x.fillStyle = 'rgba(255,255,255,0.9)'; x.beginPath(); x.ellipse(70, 54, 3, 6, 0, 0, 7); x.fill(); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t; })();
  const eyeMat = new THREE.MeshPhysicalMaterial({ map: irisTex, roughness: 0.1, clearcoat: 1 }), er = 0.0118 * F.eyes;
  const eyes = [], lids = [], lowers = [], brows = [];
  for (const s of [-1, 1]) {
    const ep = new THREE.Vector3(s * 0.345 * HW, 0.15 * HH, 0.745 * HD);
    const e = new THREE.Mesh(new THREE.SphereGeometry(er, 32, 24), eyeMat); e.position.copy(ep); g.add(e); eyes.push(e);
    const lid = new THREE.Mesh(new THREE.SphereGeometry(er * 1.12, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5), skinMat); lid.position.copy(ep); g.add(lid); lids.push(lid);
    const lo = new THREE.Mesh(new THREE.SphereGeometry(er * 1.1, 32, 16, 0, Math.PI * 2, Math.PI * 0.62, Math.PI * 0.38), skinMat); lo.position.copy(ep); g.add(lo); lowers.push(lo);
    const br = new THREE.Mesh(new THREE.CapsuleGeometry(0.0032 * (S.browW || 1), 0.024, 4, 10), new THREE.MeshStandardMaterial({ color: S.brows, roughness: 0.9 }));
    br.rotation.z = Math.PI / 2 - s * 0.08; const bp = new THREE.Group(); bp.position.set(s * 0.35 * HW, 0.3 * HH, 0.865 * HD + 0.002); bp.rotation.set(-0.25, s * 0.42, 0); bp.add(br); g.add(bp); brows.push(br);
  }
  // ears
  const earMat = skinMat;
  for (const s of [-1, 1]) { const ear = new THREE.Group(); ear.position.set(s * 0.98 * HW, 0.02 * HH, -0.08 * HD); ear.rotation.y = s * 0.35; ear.scale.setScalar(F.ears); g.add(ear);
    const rim = new THREE.Mesh(new THREE.TorusGeometry(0.0165, 0.0065, 10, 28, Math.PI * 1.45), earMat); rim.rotation.set(0, s * Math.PI / 2, 0.55); rim.scale.set(1, 1.55, 1); ear.add(rim);
    const bowl = new THREE.Mesh(new THREE.SphereGeometry(0.019, 20, 16), earMat); bowl.scale.set(0.42, 1.35, 0.85); bowl.position.x = -s * 0.002; ear.add(bowl);
    const lobe = new THREE.Mesh(new THREE.SphereGeometry(0.008, 12, 10), earMat); lobe.position.set(0, -0.025, 0.004); lobe.scale.set(0.6, 1, 1); ear.add(lobe); }
  // hair
  const hairMat = new THREE.MeshPhysicalMaterial({ color: '#ffffff', map: strandTex(S.hairColor || '#222', S.hair === 'bald_fringe' ? 'down' : 'back'), roughness: 0.6, sheen: 0.6, sheenColor: new THREE.Color('#ffffff'), sheenRoughness: 0.4 });
  const edge = (p) => { const wf = sst(0.2, 0.8, p.z), wb = sst(0.05, -0.6, p.z), ws = Math.max(0, 1 - wf - wb);
    return wf * (F.hairline + F.recede * p.x * p.x * 3) + ws * F.hairSide + wb * F.hairBack; };
  const earCut = (p) => 1 - g3(p, [p.x > 0 ? 0.98 : -0.98, 0.0, -0.05], 0.28);
  if (S.hair === 'short' || S.hair === 'slick' || S.hair === 'swoop') {
    const mask = (p) => sst(-0.06, 0.06, p.y - edge(p)) * earCut(p);
    const thick = (p) => F.hairT + (S.hair === 'swoop' ? 0.06 + 0.26 * g3(p, [0.08, 0.5, 0.82], 0.38) + 0.03 * g3(p, [0, 0.95, 0], 0.5) + 0.12 * g3(p, [-0.72, 0.35, 0.15], 0.35) + 0.12 * g3(p, [0.72, 0.35, 0.15], 0.35) : S.hair === 'slick' ? 0.06 * g3(p, [0, 0.85, 0.3], 0.5) : 0);
    const extra = S.hair === 'swoop' ? (p, m) => new THREE.Vector3(-0.1 * g3(p, [0.1, 0.55, 0.8], 0.4), -0.06 * g3(p, [0.15, 0.5, 0.82], 0.3), 0.1 * g3(p, [0.1, 0.55, 0.8], 0.4)) : null;
    g.add(shell(geo, dirs, mask, thick, extra, hairMat));
    if (S.hair === 'slick' && F.part) { /* side part: thin groove drawn as a darker line in the strand map via a second, thinner shell is overkill; the strand direction already reads */ }
  }
  if (S.hair === 'bald_fringe') g.add(shell(geo, dirs, (p) => sst(-0.4, -0.15, p.y) * sst(0.35, 0.05, p.y) * sst(0.5, 0.15, p.z) * earCut(p), () => 0.035, null, hairMat));
  if (S.beard === 'full') { const bm = new THREE.MeshPhysicalMaterial({ color: '#ffffff', map: strandTex(S.beardColor, 'down'), roughness: 0.85, sheen: 0.8, sheenColor: new THREE.Color('#ffffff') });
    const mask = (p) => sst(-0.1, -0.3, p.y) * sst(-0.2, 0.15, p.z) * (1 - g3(p, [0, -0.46, 0.92], 0.13));
    g.add(shell(geo, dirs, mask, (p) => 0.1 + 0.08 * g3(p, [0, -0.85, 0.5], 0.4), (p, m) => new THREE.Vector3(0, -0.55 * m * g3(p, [0, -0.95, 0.45], 0.5), 0.08 * m * g3(p, [0, -0.9, 0.5], 0.4)), bm)); }
  if (S.mustache) { const mm = new THREE.MeshPhysicalMaterial({ color: '#ffffff', map: strandTex(S.mustacheColor, 'down'), roughness: 0.85 });
    const mask = (p) => sst(0.25, 0.6, Math.exp(-((p.x / (0.3 * (S.mustacheW || 1))) ** 2) - ((p.y + 0.335) / 0.065) ** 2)) * sst(0.6, 0.85, p.z);
    g.add(shell(geo, dirs, mask, () => 0.07, (p, m) => new THREE.Vector3(0, -0.04 * m * (Math.abs(p.x) * 2), 0.01), mm)); }
  // mouth opening (talk) + smile corners
  const mouthIn = new THREE.Mesh(new THREE.SphereGeometry(0.012, 16, 10), new THREE.MeshStandardMaterial({ color: '#2a0e0c', roughness: 0.6 }));
  mouthIn.position.set(0, -0.46 * HH * F.faceLen, 0.86 * HD); mouthIn.scale.set(1.5, 0.05, 0.6); g.add(mouthIn);
  g.scale.setScalar(S.headScale || 1.12);
  const H = { group: g, eyes, lids, F, top: (S.headScale || 1.12) * HH, anchors: { mouth: new THREE.Vector3(0, -0.5 * HH * F.faceLen, 0.95 * HD), top: new THREE.Vector3(0, HH * 1.05, 0) },
    setLook(yaw = 0, pitch = 0) { eyes.forEach((e) => e.rotation.set(pitch, yaw, 0)); },
    setBlink(k) { lids.forEach((l) => (l.rotation.x = -0.32 + 1.15 * k + 0.2 * F.droop)); },
    setBrow(k) { brows.forEach((b, i) => { const s = i ? 1 : -1; b.position.y = 0.006 * Math.max(0, k) - 0.003 * Math.max(0, -k);
      b.rotation.z = Math.PI / 2 - s * 0.08 + s * 0.38 * Math.max(0, -k) - s * 0.12 * Math.max(0, k); }); },
    setTalk(k) { mouthIn.scale.y = 0.05 + 0.75 * k; },
    setSmile() {} };
  H.setLook(0, 0); H.setBlink(0); H.setBrow(0); H.setTalk(0);
  return H;
}
