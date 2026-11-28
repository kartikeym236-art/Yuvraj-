// "Organic" emphasis effects (user feedback 2026-11-28): every number / price / big fact gets its own visual beat.
//   bigText(str, o)        3D-ish text card (canvas on a plane, depth layers); T.set(str); T.slam(k) overshoot scale-in
//   counter(o)             bigText that counts: C.at(value)
//   moneyRain(o)           banknotes + coins falling and fluttering: R.update(t, t0, k)  (t0 = start, k = 0..1 visibility)
//   pie(fracs, colors)     3D pie; P.update(grow 0..1, pop index, popK)
//   stamp(text, color)     rubber stamp slam: S.slam(k)
//   paper(text)            document that can tear in two: D.tear(k)
//   boom(scene)            explosion flash + smoke puffs: B.update(t, t0)
//   markers(n, o)          memorial markers rising across a field: M.update(k)
//   chain(len)             chain links; C.breakAt(k) pieces fall
import * as THREE from 'three';
import { glowSprite } from './materials.js';

const ctex = (w, h, fn) => { const c = document.createElement('canvas'); c.width = w; c.height = h; const g = c.getContext('2d'); fn(g, w, h);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return { t, c, g }; };
const rnd = (s) => { const x = Math.sin(s * 78.233 + 1.3) * 43758.5453; return x - Math.floor(x); };

export function bigText(str, { color = '#ffffff', stroke = '#000000', strokeW = 0, height = 0.3, font = '900', depth = 6, depthColor = '#00000055', glow = null } = {}) {
  const W = 2048, H = 512, layers = [], g = new THREE.Group();
  const draw = (cv, gg, s, col, isDepth) => { gg.clearRect(0, 0, W, H); gg.font = `${font} 360px Inter, sans-serif`; gg.textAlign = 'center'; gg.textBaseline = 'middle';
    let fs = 360; while (gg.measureText(s).width > W * 0.94 && fs > 80) { fs -= 10; gg.font = `${font} ${fs}px Inter, sans-serif`; }
    if (!isDepth && glow) { gg.shadowColor = glow; gg.shadowBlur = 40; }
    if (strokeW && !isDepth) { gg.lineWidth = strokeW; gg.strokeStyle = stroke; gg.strokeText(s, W / 2, H / 2 + 10); }
    gg.fillStyle = col; gg.fillText(s, W / 2, H / 2 + 10); gg.shadowBlur = 0; };
  const mk = (col, isDepth, z) => { const { t, c, g: gg } = ctex(W, H, () => {}); const m = new THREE.Mesh(new THREE.PlaneGeometry(height * 4, height),
    new THREE.MeshBasicMaterial({ map: t, transparent: true, depthWrite: false, toneMapped: false })); m.position.z = z; m.renderOrder = 20 + layers.length; g.add(m);
    layers.push({ t, c, gg, col, isDepth }); return m; };
  for (let i = depth; i > 0; i--) mk(depthColor, true, -i * height * 0.012);
  mk(color, false, 0);
  let cur = null;
  const T = { group: g,
    set(s) { if (s === cur) return; cur = s; layers.forEach((L) => { draw(L.c, L.gg, s, L.col, L.isDepth); L.t.needsUpdate = true; }); },
    slam(k) { const s = k <= 0 ? 0.0001 : k < 0.6 ? (k / 0.6) * 1.18 : 1.18 - 0.18 * Math.sin(((k - 0.6) / 0.4) * Math.PI / 2); g.scale.setScalar(s); g.visible = k > 0;
      layers.forEach((L) => (L.isDepth ? 0 : 0)); },
    opacity(a) { g.children.forEach((m) => (m.material.opacity = a)); } };
  T.set(str); return T;
}

export function counter({ from = 0, to = 100, fmt = (v) => Math.round(v).toLocaleString('en-US'), ...o } = {}) {
  const T = bigText(fmt(from), o);
  return { ...T, at(k) { T.set(fmt(from + (to - from) * Math.min(1, Math.max(0, k)))); } };
}

/** banknotes (dollar green or pound purple) + gold coins raining in a column of width w, from height h */
export function moneyRain({ n = 160, coins = 60, w = 1.6, d = 0.8, h = 2.4, kind = 'dollar', size = 0.16 } = {}) {
  const g = new THREE.Group();
  const note = ctex(512, 220, (c, W, H) => { const base = kind === 'pound' ? '#8a6bb8' : '#6f9e6a', dark = kind === 'pound' ? '#4a2f72' : '#2f5a32';
    c.fillStyle = base; c.fillRect(0, 0, W, H); c.strokeStyle = dark; c.lineWidth = 10; c.strokeRect(10, 10, W - 20, H - 20);
    c.fillStyle = dark; c.beginPath(); c.ellipse(W / 2, H / 2, 62, 78, 0, 0, 7); c.fill(); c.fillStyle = base; c.beginPath(); c.ellipse(W / 2, H / 2, 48, 62, 0, 0, 7); c.fill();
    c.fillStyle = dark; c.font = '900 76px Inter'; c.textAlign = 'center'; c.textBaseline = 'middle'; const sym = kind === 'pound' ? '£' : '$';
    c.fillText(sym, W / 2, H / 2 + 4); c.font = '900 52px Inter'; c.fillText(kind === 'pound' ? '50' : '100', 70, 60); c.fillText(kind === 'pound' ? '50' : '100', W - 70, H - 55); });
  const bills = new THREE.InstancedMesh(new THREE.PlaneGeometry(size, size * 0.43), new THREE.MeshStandardMaterial({ map: note.t, side: THREE.DoubleSide, roughness: 0.7 }), n);
  const coin = new THREE.InstancedMesh(new THREE.CylinderGeometry(size * 0.16, size * 0.16, size * 0.025, 24), new THREE.MeshStandardMaterial({ color: '#e5b53a', metalness: 1, roughness: 0.25 }), coins);
  bills.castShadow = true; coin.castShadow = true; g.add(bills, coin);
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), v = new THREE.Vector3(), s = new THREE.Vector3(1, 1, 1);
  const R = { group: g,
    update(t, t0 = 0, k = 1) {
      g.visible = k > 0; if (!g.visible) return; const lt = t - t0;
      for (let i = 0; i < n; i++) { const st = rnd(i) * 1.4, fall = Math.max(0, lt - st), speed = 0.55 + rnd(i + 3) * 0.35;
        const y = Math.max(0.01, h - fall * speed * h * 0.6);
        v.set((rnd(i + 1) - 0.5) * w + Math.sin(fall * 3 + i) * 0.05 * w, y, (rnd(i + 2) - 0.5) * d);
        const landed = y <= 0.011; e.set(landed ? -Math.PI / 2 : fall * 4 + i, landed ? rnd(i) * 6 : fall * 2.3 + i, landed ? 0 : Math.sin(fall * 5 + i) * 0.8); q.setFromEuler(e);
        bills.setMatrixAt(i, m4.compose(v, q, s.setScalar(lt > st ? k : 0.0001))); }
      for (let i = 0; i < coins; i++) { const st = 0.2 + rnd(i + 40) * 1.2, fall = Math.max(0, lt - st);
        const y = Math.max(0.006, h - 0.5 * 9.8 * 0.18 * fall * fall * h); v.set((rnd(i + 41) - 0.5) * w * 0.8, y, (rnd(i + 42) - 0.5) * d * 0.8);
        e.set(fall * 9 + i, 0, fall * 6); q.setFromEuler(e); coin.setMatrixAt(i, m4.compose(v, q, s.setScalar(lt > st ? k : 0.0001))); }
      bills.instanceMatrix.needsUpdate = true; coin.instanceMatrix.needsUpdate = true;
    } };
  R.update(0, 0, 0); return R;
}

export function pie(fracs = [0.84, 0.16], colors = ['#2b4c9b', '#2e9a4a'], { r = 0.5, hgt = 0.12 } = {}) {
  const g = new THREE.Group(), slices = []; let a0 = 0;
  fracs.forEach((f, i) => { const len = f * Math.PI * 2;
    const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, hgt, 64, 1, false, a0, len), new THREE.MeshPhysicalMaterial({ color: colors[i], roughness: 0.35, clearcoat: 0.6 }));
    m.castShadow = true; m.userData.mid = a0 + len / 2; g.add(m); slices.push(m); a0 += len; });
  return { group: g, slices, update(grow = 1, pop = -1, popK = 0) {
    slices.forEach((s, i) => { s.scale.set(1, Math.max(0.001, grow), 1); const k = i === pop ? popK : 0;
      s.position.set(Math.sin(s.userData.mid) * 0.25 * r * k, 0.6 * hgt * k, Math.cos(s.userData.mid) * 0.25 * r * k); }); } };
}

export function stamp(text = 'SANCTIONS', color = '#d0202a', { w = 1.2 } = {}) {
  const { t } = ctex(1024, 340, (c, W, H) => { c.strokeStyle = color; c.lineWidth = 26; c.strokeRect(20, 20, W - 40, H - 40); c.fillStyle = color;
    c.font = '900 170px Inter'; c.textAlign = 'center'; c.textBaseline = 'middle'; let fs = 170; while (c.measureText(text).width > W - 120) { fs -= 8; c.font = `900 ${fs}px Inter`; }
    c.fillText(text, W / 2, H / 2 + 6); const img = c.getImageData(0, 0, W, H); for (let i = 0; i < img.data.length; i += 4) if (Math.random() < 0.12) img.data[i + 3] *= 0.3; c.putImageData(img, 0, 0); });
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, w / 3), new THREE.MeshBasicMaterial({ map: t, transparent: true, depthWrite: false })); m.renderOrder = 15;
  return { group: m, slam(k) { m.visible = k > 0; const s = k < 0.4 ? 2.2 - 1.2 * (k / 0.4) : 1; m.scale.setScalar(s); m.material.opacity = Math.min(1, k * 3); } };
}

export function paper(title = 'AGREEMENT', { w = 0.42, lines = 14, sign = true } = {}) {
  const tex = (half) => ctex(512, 700, (c, W, H) => { c.fillStyle = '#f6f2e8'; c.fillRect(0, 0, W, H); c.fillStyle = '#222'; c.font = '800 44px Inter'; c.textAlign = 'center';
    c.fillText(title, W / 2, 80); c.fillStyle = '#9a958a'; for (let i = 0; i < lines; i++) c.fillRect(50, 130 + i * 30, W - 100 - rnd(i) * 120, 9);
    if (sign) { c.strokeStyle = '#1b3fa0'; c.lineWidth = 4; c.beginPath(); c.moveTo(300, 640); for (let x = 300; x < 470; x += 10) c.lineTo(x, 640 - Math.sin(x * 0.12) * 14); c.stroke(); } }).t;
  const g = new THREE.Group(), T = tex();
  const halves = [0, 1].map((i) => { const geo = new THREE.PlaneGeometry(w / 2, w * 1.37, 1, 1); const uv = geo.attributes.uv;
    for (let k = 0; k < uv.count; k++) uv.setX(k, uv.getX(k) * 0.5 + i * 0.5);
    const m = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ map: T, side: THREE.DoubleSide, roughness: 0.8 })); m.castShadow = true; g.add(m); return m; });
  return { group: g, tear(k) { halves.forEach((m, i) => { const s = i ? 1 : -1; m.position.set(s * (w / 4 + 0.25 * w * k), -0.6 * w * k * k, 0.05 * k);
    m.rotation.set(0.4 * k, s * 0.3 * k, s * 0.6 * k); }); } };
}

let smokeTex = null;
export function boom(scene, { color = '#ffb347', size = 1 } = {}) {
  if (!smokeTex) smokeTex = ctex(128, 128, (c) => { const g = c.createRadialGradient(64, 64, 0, 64, 64, 64); g.addColorStop(0, 'rgba(90,85,80,0.9)'); g.addColorStop(1, 'rgba(90,85,80,0)'); c.fillStyle = g; c.fillRect(0, 0, 128, 128); }).t;
  const g = new THREE.Group(), flash = glowSprite(color, 1.6 * size), core = glowSprite('#ffffff', 0.7 * size); g.add(flash, core);
  const puffs = Array.from({ length: 10 }, (_, i) => { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: smokeTex, transparent: true, depthWrite: false, opacity: 0 })); g.add(s); return s; });
  const light = new THREE.PointLight(color, 0, 8 * size, 1.5); g.add(light); scene.add(g);
  return { group: g, update(t, t0) { const lt = t - t0; g.visible = lt >= 0 && lt < 4;
    const f = lt < 0 ? 0 : Math.exp(-lt * 4); flash.material.opacity = f; core.material.opacity = f; flash.scale.setScalar((0.8 + lt * 2) * size); light.intensity = 40 * f;
    puffs.forEach((p, i) => { const pl = lt - i * 0.04; p.material.opacity = pl > 0 ? Math.max(0, 0.65 * (1 - pl / 3.5)) : 0;
      p.position.set((rnd(i) - 0.5) * 0.6 * size, (0.2 + pl * 0.35) * size, (rnd(i + 5) - 0.5) * 0.4 * size); p.scale.setScalar((0.4 + pl * 0.5) * size); }); } };
}

export function markers(n = 1500, { w = 30, d = 30, color = '#efece6' } = {}) {
  const m = new THREE.InstancedMesh(new THREE.BoxGeometry(0.12, 0.3, 0.04), new THREE.MeshStandardMaterial({ color, roughness: 0.7 }), n); m.castShadow = true;
  const P = Array.from({ length: n }, (_, i) => { const row = Math.floor(i / 50), col = i % 50; return { x: (col / 49 - 0.5) * w + (rnd(i) - 0.5) * 0.1, z: -row * (d / (n / 50)), d: row * 0.03 + col * 0.002 }; });
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), v = new THREE.Vector3(), s = new THREE.Vector3();
  return { group: m, update(k) { P.forEach((p, i) => { const r = Math.min(1, Math.max(0, (k * 1.6 - p.d * 0.8) * 3)); m.setMatrixAt(i, m4.compose(v.set(p.x, 0.15 * r, p.z), q, s.set(1, Math.max(0.001, r), 1))); });
    m.instanceMatrix.needsUpdate = true; } };
}

export function chain(len = 14, { link = 0.09, color = '#9aa0a8' } = {}) {
  const g = new THREE.Group(), mat = new THREE.MeshStandardMaterial({ color, metalness: 1, roughness: 0.3 }), links = [];
  for (let i = 0; i < len; i++) { const l = new THREE.Mesh(new THREE.TorusGeometry(link * 0.45, link * 0.12, 8, 20), mat); l.scale.y = 1.5; l.rotation.y = i % 2 ? Math.PI / 2 : 0;
    l.position.y = -i * link * 1.05; l.castShadow = true; g.add(l); links.push(l); }
  return { group: g, links, breakAt(k) { links.forEach((l, i) => { const s = (i % 7) / 7; const kk = Math.max(0, k - s * 0.2);
    l.position.x = (rnd(i) - 0.5) * kk * 0.6; l.position.y = -i * link * 1.05 - 2.4 * kk * kk; l.rotation.z = kk * (rnd(i + 2) - 0.5) * 6; }); } };
}
