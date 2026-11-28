// Props for the EROI reel (all built in code, realistic proportions, PBR materials).
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

const rnd = (i) => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
const std = (color, o = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.6, metalness: 0.1, ...o });
function ctex(w, h, fn, rep) { const c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d'); fn(x, w, h);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; if (rep) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(...rep); } return t; }
const mesh = (geo, m, x = 0, y = 0, z = 0, parent) => { const o = new THREE.Mesh(geo, m); o.position.set(x, y, z); o.castShadow = o.receiveShadow = true; if (parent) parent.add(o); return o; };

/** soft smoke puffs rising from a point (deterministic). update(t, on, p) */
let PUFF = null;
const puffTex = () => PUFF || (PUFF = ctex(128, 128, (x, W) => { const g = x.createRadialGradient(W / 2, W / 2, 0, W / 2, W / 2, W / 2); g.addColorStop(0, 'rgba(255,255,255,0.9)'); g.addColorStop(0.5, 'rgba(255,255,255,0.35)'); g.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = g; x.fillRect(0, 0, W, W); }));
export function smoke(n = 14, { color = '#3a3836', size = 0.6, rise = 2.2, spread = 0.5, rate = 0.5 } = {}) {
  const g = new THREE.Group(), sp = [];
  for (let i = 0; i < n; i++) { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: puffTex(), color, transparent: true, depthWrite: false, opacity: 0.6 })); g.add(s); sp.push(s); }
  return { group: g, update(t, on = 1) { sp.forEach((s, i) => { const ph = (t * rate + i / n) % 1; s.position.set((rnd(i) - 0.5) * spread * ph + Math.sin(t + i) * 0.1 * ph, ph * rise, (rnd(i + 3) - 0.5) * spread * ph);
    const sc = size * (0.35 + ph * 1.4); s.scale.set(sc, sc, sc); s.material.opacity = on * 0.55 * Math.sin(Math.PI * ph); s.material.rotation = i + t * 0.2; }); } };
}

/** realistic steel oil drum: ribs, rim, lid with bung */
export function drumGeo() {
  const pts = [[0, 0], [0.27, 0], [0.285, 0.01], [0.285, 0.02], [0.28, 0.03], [0.28, 0.28], [0.29, 0.29], [0.28, 0.3], [0.28, 0.58], [0.29, 0.59], [0.28, 0.6], [0.28, 0.85], [0.285, 0.86], [0.285, 0.87], [0.27, 0.88], [0, 0.875]];
  return new THREE.LatheGeometry(pts.map(([a, b]) => new THREE.Vector2(a, b)), 40);
}
/** grid of drums (instanced) that pop in; colours per instance. layout cols x rows, spacing s */
export function drumGrid(n = 100, { cols = 10, s = 0.66, color = '#1a1a1c' } = {}) {
  const m = new THREE.InstancedMesh(drumGeo(), new THREE.MeshPhysicalMaterial({ color: '#ffffff', metalness: 0.55, roughness: 0.38, clearcoat: 0.6 }), n);
  m.castShadow = m.receiveShadow = true; const o = new THREE.Object3D(), c = new THREE.Color(color), rows = Math.ceil(n / cols);
  for (let i = 0; i < n; i++) m.setColorAt(i, c);
  const G = { mesh: m, n, cols, rows, s,
    pos: (i) => new THREE.Vector3(((i % cols) - (cols - 1) / 2) * s, 0, (Math.floor(i / cols) - (rows - 1) / 2) * s),
    /** shown(i) -> 0..1 pop scale; color(i) -> THREE.Color|null */
    update(shown, colorOf) { for (let i = 0; i < n; i++) { const k = shown(i); o.position.copy(G.pos(i)); o.position.y = 0; const sc = k <= 0 ? 0.0001 : k < 0.7 ? (k / 0.7) * 1.12 : 1.12 - 0.12 * ((k - 0.7) / 0.3);
      o.scale.setScalar(sc); o.rotation.y = rnd(i) * 6; o.updateMatrix(); m.setMatrixAt(i, o.matrix); const cc = colorOf && colorOf(i); m.setColorAt(i, cc || c); }
      m.instanceMatrix.needsUpdate = true; m.instanceColor.needsUpdate = true; } };
  return G;
}

export function hardHat(color = '#f2c230') {
  const g = new THREE.Group(), m = new THREE.MeshPhysicalMaterial({ color, roughness: 0.35, clearcoat: 0.8 });
  mesh(new THREE.SphereGeometry(0.115, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), m, 0, 0, 0, g).scale.set(1, 0.95, 1.12);
  const brim = mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.012, 40), m, 0, 0.004, 0.02, g); brim.scale.set(1, 1, 1.15);
  mesh(new THREE.BoxGeometry(0.02, 0.02, 0.24), m, 0, 0.105, 0, g);
  return g;
}

export function truckTanker({ cab = '#c0392b', tank = '#d9dde2' } = {}) {
  const g = new THREE.Group(), C = std(cab, { roughness: 0.35, metalness: 0.3 }), T = new THREE.MeshPhysicalMaterial({ color: tank, metalness: 1, roughness: 0.22 }), K = std('#1b1b1d', { roughness: 0.8 });
  mesh(new RoundedBoxGeometry(2.2, 2.0, 2.4, 3, 0.15), C, 4.4, 1.6, 0, g);                                 // cab
  mesh(new THREE.BoxGeometry(0.05, 0.8, 2.0), std('#1d2b36', { metalness: 0.6, roughness: 0.1 }), 5.52, 2.0, 0, g);   // windscreen
  mesh(new THREE.BoxGeometry(9, 0.3, 2.2), K, 0.5, 0.75, 0, g);                                            // chassis
  const tk = mesh(new THREE.CylinderGeometry(1.15, 1.15, 6.6, 40), T, -0.6, 2.05, 0, g); tk.rotation.z = Math.PI / 2;
  for (const x of [-3.2, -2.1, 2.5, 4.4]) for (const z of [-1.0, 1.0]) { const w = mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.35, 28), K, x, 0.5, z, g); w.rotation.x = Math.PI / 2; }
  const stack = mesh(new THREE.CylinderGeometry(0.08, 0.08, 1.6, 12), T, 3.3, 3.0, 1.05, g);
  const sm = smoke(12, { color: '#2e2c2a', size: 0.7, rise: 2.5, rate: 0.7 }); sm.group.position.set(3.3, 3.8, 1.05); g.add(sm.group);
  return { group: g, smoke: sm };
}

export function tankerShip() {
  const g = new THREE.Group(), hull = std('#2b2f36', { roughness: 0.5, metalness: 0.4 }), red = std('#8e2a22', { roughness: 0.6 }), wh = std('#e9e9e6', { roughness: 0.5 });
  const shape = new THREE.Shape(); shape.moveTo(-30, -4); shape.lineTo(26, -4); shape.quadraticCurveTo(34, -4, 36, 0); shape.quadraticCurveTo(34, 4, 26, 4); shape.lineTo(-30, 4); shape.lineTo(-30, -4);
  const hg = new THREE.ExtrudeGeometry(shape, { depth: 6, bevelEnabled: false }); hg.rotateX(-Math.PI / 2); hg.translate(0, -3, 0);
  mesh(hg, hull, 0, 0, 0, g); const bot = new THREE.ExtrudeGeometry(shape, { depth: 3, bevelEnabled: false }); bot.rotateX(-Math.PI / 2); bot.translate(0, -6, 0); mesh(bot, red, 0, 0, 0, g);
  mesh(new THREE.BoxGeometry(8, 7, 7), wh, -24, 6.5, 0, g);                                                 // bridge
  mesh(new THREE.BoxGeometry(8.2, 1, 7.2), std('#1d2b36', { metalness: 0.6, roughness: 0.1 }), -24, 8.5, 0, g);
  const fun = mesh(new THREE.CylinderGeometry(1.2, 1.4, 4, 24), red, -28, 11, 0, g);
  for (let i = 0; i < 6; i++) mesh(new THREE.CylinderGeometry(0.15, 0.15, 7.6, 8), std('#c8b23a'), -14 + i * 7, 3.3, 0, g).rotation.x = Math.PI / 2;
  const sm = smoke(16, { color: '#2a2826', size: 4, rise: 14, spread: 3, rate: 0.35 }); sm.group.position.set(-28, 13, 0); g.add(sm.group);
  return { group: g, smoke: sm };
}

/** moving sea: displaced plane, update(t) */
export function ocean(size = 400, { color = '#1d4a63' } = {}) {
  const geo = new THREE.PlaneGeometry(size, size, 120, 120); geo.rotateX(-Math.PI / 2);
  const m = new THREE.Mesh(geo, new THREE.MeshPhysicalMaterial({ color, roughness: 0.18, metalness: 0.1, clearcoat: 1, clearcoatRoughness: 0.15 })); m.receiveShadow = true;
  const P = geo.attributes.position, base = P.array.slice();
  return { mesh: m, update(t) { for (let i = 0; i < P.count; i++) { const x = base[i * 3], z = base[i * 3 + 2];
    P.array[i * 3 + 1] = Math.sin(x * 0.08 + t * 1.1) * 0.45 + Math.sin(z * 0.11 + t * 0.8) * 0.35 + Math.sin((x + z) * 0.23 + t * 1.7) * 0.15; }
    P.needsUpdate = true; geo.computeVertexNormals(); } };
}

export function offshoreRig() {
  const g = new THREE.Group(), st = std('#c9cdd2', { metalness: 0.7, roughness: 0.4 }), ye = std('#e0b02a', { roughness: 0.5 }), rd = std('#b8342a', { roughness: 0.5 });
  for (const [x, z] of [[-9, -9], [9, -9], [9, 9], [-9, 9]]) { mesh(new THREE.CylinderGeometry(1.6, 1.8, 26, 24), ye, x, 3, z, g); }
  for (const y of [-2, 6]) for (const [a, b] of [[[-9, -9], [9, -9]], [[9, -9], [9, 9]], [[9, 9], [-9, 9]], [[-9, 9], [-9, -9]]]) {
    const L = mesh(new THREE.CylinderGeometry(0.35, 0.35, 18, 8), ye, (a[0] + b[0]) / 2, y, (a[1] + b[1]) / 2, g); if (a[0] === b[0]) L.rotation.x = Math.PI / 2; else L.rotation.z = Math.PI / 2; }
  mesh(new THREE.BoxGeometry(26, 3, 26), st, 0, 17, 0, g); mesh(new THREE.BoxGeometry(24, 2.5, 24), std('#8c949c', { metalness: 0.5, roughness: 0.5 }), 0, 19.7, 0, g);
  mesh(new THREE.BoxGeometry(10, 6, 8), std('#f0f0ec'), -6, 24, -6, g); mesh(new THREE.BoxGeometry(6, 4, 6), rd, 7, 23, 7, g);
  // derrick tower
  for (const [x, z] of [[-1.6, -1.6], [1.6, -1.6], [1.6, 1.6], [-1.6, 1.6]]) { const l = mesh(new THREE.CylinderGeometry(0.18, 0.18, 22, 8), st, x * 0.7 + 3, 31, z * 0.7 - 2, g); l.rotation.set(z * 0.05, 0, -x * 0.05); }
  for (let i = 0; i < 8; i++) mesh(new THREE.BoxGeometry(3.4 - i * 0.25, 0.15, 3.4 - i * 0.25), st, 3, 22 + i * 2.6, -2, g);
  const heli = mesh(new THREE.CylinderGeometry(5, 5, 0.4, 40), std('#3a7a4a'), -8, 21.2, 8, g);
  const flareArm = mesh(new THREE.CylinderGeometry(0.3, 0.3, 16, 8), st, 18, 24, 0, g); flareArm.rotation.z = -1.0;
  const flame = new THREE.Sprite(new THREE.SpriteMaterial({ map: puffTex(), color: '#ffae42', transparent: true, depthWrite: false, blending: THREE.AdditiveBlending })); flame.position.set(25, 28.5, 0); flame.scale.setScalar(4); g.add(flame);
  return { group: g, update(t) { const f = 3.6 + Math.sin(t * 13) * 0.4 + Math.sin(t * 7.3) * 0.3; flame.scale.set(f, f * 1.4, 1); } };
}

/** old wooden derrick (early 1900s) with an oil gusher */
export function woodDerrick() {
  const g = new THREE.Group(), w = std('#6e5233', { roughness: 0.9 }), H = 11;
  for (const [x, z] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) { const l = mesh(new THREE.BoxGeometry(0.22, H, 0.22), w, x * 1.25, H / 2, z * 1.25, g); l.rotation.set(z * 0.1, 0, -x * 0.1); }
  for (let i = 1; i < 8; i++) { const y = i * 1.35, s = 2.5 * (1 - (y / H) * 0.8);
    for (const r of [0, 1]) for (const sg of [-1, 1]) { const b = mesh(new THREE.BoxGeometry(r ? 0.12 : s, 0.12, r ? s : 0.12), w, r ? sg * s / 2 : 0, y, r ? 0 : sg * s / 2, g); } }
  const drops = new THREE.InstancedMesh(new THREE.SphereGeometry(0.09, 8, 6), new THREE.MeshPhysicalMaterial({ color: '#0b0a09', roughness: 0.1, clearcoat: 1 }), 220), o = new THREE.Object3D(); g.add(drops);
  return { group: g, update(t, on = 1) { for (let i = 0; i < 220; i++) { const ph = (t * 0.55 + rnd(i)) % 1, a = rnd(i + 2) * 6.28, r = ph * (1.2 + rnd(i + 5) * 2.5);
    o.position.set(Math.cos(a) * r, (H + 3) * Math.sin(Math.PI * Math.min(1, ph * 1.15)) * (0.8 + rnd(i + 7) * 0.3), Math.sin(a) * r); o.scale.setScalar(on * (0.6 + rnd(i + 9))); o.updateMatrix(); drops.setMatrixAt(i, o.matrix); }
    drops.instanceMatrix.needsUpdate = true; } };
}

/** geological cutaway block: rock layers, oil layer, a well (vertical + horizontal), fractures that grow (frack k) */
export function strata({ w = 6, d = 3, layers = [['#b9a27e', 0.6], ['#8f7a5c', 0.9], ['#6f6352', 0.8], ['#4c463e', 0.7], ['#262320', 0.5], ['#5a5248', 0.9]] } = {}) {
  const g = new THREE.Group(); let y = 0; const oilIdx = 4, H = layers.reduce((a, l) => a + l[1], 0);
  const top = H; let oilY = 0;
  layers.forEach(([c, h], i) => { const tex = ctex(512, 128, (x, W, Hh) => { x.fillStyle = c; x.fillRect(0, 0, W, Hh); for (let k = 0; k < 1500; k++) { x.fillStyle = `rgba(0,0,0,${rnd(k + i * 9) * 0.15})`; x.fillRect(rnd(k) * W, rnd(k + 1) * Hh, 2 + rnd(k + 2) * 6, 1 + rnd(k + 3) * 3); }
      if (i === oilIdx) for (let k = 0; k < 500; k++) { x.fillStyle = 'rgba(10,8,6,0.9)'; x.beginPath(); x.arc(rnd(k + 5) * W, rnd(k + 6) * Hh, 1 + rnd(k + 7) * 3, 0, 7); x.fill(); } });
    const m = mesh(new THREE.BoxGeometry(w, h, d), new THREE.MeshStandardMaterial({ map: tex, roughness: i === oilIdx ? 0.3 : 0.9, metalness: i === oilIdx ? 0.2 : 0 }), 0, top - y - h / 2, 0, g); if (i === oilIdx) oilY = top - y - h / 2; y += h; });
  const pipe = std('#9aa0a8', { metalness: 0.8, roughness: 0.3 });
  mesh(new THREE.CylinderGeometry(0.05, 0.05, top - oilY, 12), pipe, -1.5, (top + oilY) / 2, d / 2 - 0.3, g);
  const hz = mesh(new THREE.CylinderGeometry(0.05, 0.05, 3.2, 12), pipe, 0.1, oilY, d / 2 - 0.3, g); hz.rotation.z = Math.PI / 2;
  const cracks = []; const cm = new THREE.MeshBasicMaterial({ color: '#f4e3b0', toneMapped: false });
  for (let i = 0; i < 9; i++) { const c = new THREE.Mesh(new THREE.PlaneGeometry(0.02, 1), cm); c.position.set(-1.1 + i * 0.36, oilY, d / 2 - 0.28); c.rotation.z = (rnd(i) - 0.5) * 0.4; g.add(c); cracks.push(c); }
  const oilGlow = mesh(new THREE.BoxGeometry(w * 0.98, layers[oilIdx][1] * 0.9, 0.01), new THREE.MeshBasicMaterial({ color: '#d89a2a', transparent: true, opacity: 0, toneMapped: false }), 0, oilY, d / 2 + 0.006, g);
  return { group: g, top, oilY, frack(k) { cracks.forEach((c, i) => { const s = Math.max(0.0001, Math.min(1, k * 1.4 - i * 0.04)); c.scale.y = s * (0.5 + rnd(i + 3) * 0.6); }); },
    glow(k) { oilGlow.material.opacity = k * 0.35; } };
}

export function tokamak() {
  const g = new THREE.Group(), coil = std('#b87333', { metalness: 0.9, roughness: 0.3 }), steel = std('#aeb4bb', { metalness: 0.85, roughness: 0.25 });
  const vessel = mesh(new THREE.TorusGeometry(1.2, 0.5, 32, 96), new THREE.MeshPhysicalMaterial({ color: '#c8ccd2', metalness: 0.9, roughness: 0.2, transparent: true, opacity: 0.35 }), 0, 0, 0, g); vessel.rotation.x = Math.PI / 2;
  for (let i = 0; i < 16; i++) { const a = (i / 16) * Math.PI * 2, c = mesh(new THREE.TorusGeometry(0.62, 0.09, 12, 40), coil, Math.cos(a) * 1.2, 0, Math.sin(a) * 1.2, g); c.rotation.y = -a; }
  mesh(new THREE.CylinderGeometry(0.4, 0.4, 1.6, 32), steel, 0, 0, 0, g);
  const plasma = new THREE.Mesh(new THREE.TorusGeometry(1.2, 0.2, 24, 96), new THREE.MeshBasicMaterial({ color: '#c06bff', transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }));
  plasma.rotation.x = Math.PI / 2; g.add(plasma);
  return { group: g, update(t, on = 1) { plasma.material.opacity = on * (0.6 + 0.3 * Math.sin(t * 9) * Math.sin(t * 3.1)); plasma.scale.setScalar(1 + 0.03 * Math.sin(t * 5)); } };
}

let CELLS = null;
const cellTex = () => CELLS || (CELLS = ctex(512, 1024, (x, W, H) => { x.fillStyle = '#c8ccd2'; x.fillRect(0, 0, W, H); const c = 6, r = 10, pw = W / c, ph = H / r;
  for (let i = 0; i < c; i++) for (let j = 0; j < r; j++) { const gr = x.createLinearGradient(i * pw, j * ph, (i + 1) * pw, (j + 1) * ph); gr.addColorStop(0, '#1b2f63'); gr.addColorStop(1, '#0f1d42'); x.fillStyle = gr; x.fillRect(i * pw + 3, j * ph + 3, pw - 6, ph - 6);
    x.strokeStyle = 'rgba(200,210,230,0.35)'; x.lineWidth = 1; x.beginPath(); x.moveTo(i * pw + pw / 2, j * ph + 3); x.lineTo(i * pw + pw / 2, (j + 1) * ph - 3); x.stroke(); } }));
export function solarPanel({ w = 1.0, h = 1.7 } = {}) {
  const g = new THREE.Group();
  mesh(new THREE.BoxGeometry(w, 0.035, h), [0, 1, 2, 3, 4, 5].map((i) => (i === 2 ? new THREE.MeshPhysicalMaterial({ map: cellTex(), roughness: 0.12, metalness: 0.3, clearcoat: 1 }) : std('#c8ccd2', { metalness: 0.8, roughness: 0.3 }))), 0, 0, 0, g);
  return g;
}
export function solarFarm(rows = 4, cols = 6) {
  const g = new THREE.Group(), legM = std('#9aa0a8', { metalness: 0.8, roughness: 0.3 });
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { const p = solarPanel(); p.rotation.x = -0.5; p.position.set((c - (cols - 1) / 2) * 1.15, 1.1, r * 2.6); g.add(p);
    mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.1, 8), legM, (c - (cols - 1) / 2) * 1.15, 0.55, r * 2.6, g); }
  return g;
}

export function excavator() {
  const g = new THREE.Group(), y = std('#e6a817', { roughness: 0.45, metalness: 0.2 }), k = std('#1b1b1d', { roughness: 0.8 });
  for (const z of [-1.1, 1.1]) mesh(new RoundedBoxGeometry(4.2, 0.9, 0.7, 3, 0.3), k, 0, 0.45, z, g);
  const top = new THREE.Group(); top.position.y = 1.0; g.add(top);
  mesh(new RoundedBoxGeometry(3.2, 1.3, 2.4, 3, 0.1), y, -0.5, 0.75, 0, top); mesh(new RoundedBoxGeometry(1.2, 1.4, 1.1, 3, 0.08), y, 0.6, 1.7, 0.6, top);
  mesh(new THREE.BoxGeometry(0.02, 0.8, 0.9), std('#1d2b36', { metalness: 0.6, roughness: 0.1 }), 1.21, 1.8, 0.6, top);
  const boom = new THREE.Group(); boom.position.set(1.0, 1.2, -0.3); top.add(boom); mesh(new THREE.BoxGeometry(3.4, 0.4, 0.4), y, 1.6, 0, 0, boom);
  const stick = new THREE.Group(); stick.position.set(3.3, 0, 0); boom.add(stick); mesh(new THREE.BoxGeometry(0.35, 2.4, 0.35), y, 0, -1.1, 0, stick);
  const bucket = new THREE.Group(); bucket.position.set(0, -2.3, 0); stick.add(bucket); mesh(new THREE.BoxGeometry(0.9, 0.7, 0.9), k, 0.25, -0.2, 0, bucket);
  const sm = smoke(10, { color: '#2a2826', size: 0.6, rise: 2, rate: 0.8 }); sm.group.position.set(-1.6, 2.6, 0.6); top.add(sm.group);
  mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.8, 10), k, -1.6, 2.1, 0.6, top);
  return { group: g, smoke: sm, update(t) { const a = Math.sin(t * 1.3); boom.rotation.z = 0.35 + a * 0.25; stick.rotation.z = -0.9 - a * 0.35; bucket.rotation.z = -0.6 + a * 0.6; top.rotation.y = Math.sin(t * 0.4) * 0.2; sm.update(t); } };
}

export function house({ wall = '#efe7da', roof = '#7a3b2e' } = {}) {
  const g = new THREE.Group();
  mesh(new THREE.BoxGeometry(8, 3.2, 6), std(wall, { roughness: 0.85 }), 0, 1.6, 0, g);
  const rs = new THREE.Shape([new THREE.Vector2(-4.4, 0), new THREE.Vector2(4.4, 0), new THREE.Vector2(0, 2.6)]);
  const rg = new THREE.ExtrudeGeometry(rs, { depth: 6.8, bevelEnabled: false }); rg.translate(0, 3.2, -3.4); mesh(rg, std(roof, { roughness: 0.7 }), 0, 0, 0, g);
  mesh(new THREE.BoxGeometry(1.1, 2.1, 0.08), std('#4a3426'), 1.6, 1.05, 3.02, g);
  for (const x of [-2.4, -0.6]) mesh(new THREE.BoxGeometry(1.3, 1.1, 0.06), std('#bcd8e6', { metalness: 0.6, roughness: 0.05 }), x, 1.9, 3.02, g);
  // roof panels on the +x slope (ridge runs along z): slope angle a, panels lie in the roof plane
  const panels = [], a = Math.atan2(2.6, 4.4);
  for (let i = 0; i < 6; i++) { const u = 0.3 + Math.floor(i / 3) * 0.36, z = -1.9 + (i % 3) * 1.9;
    const holder = new THREE.Group(); holder.position.set(4.4 * (1 - u), 3.2 + 2.6 * u + 0.06, z); holder.rotation.z = -a; g.add(holder);
    const p = solarPanel({ w: 1.55, h: 1.75 }); holder.add(p); panels.push({ holder, i }); }
  return { group: g, setPanels(k) { panels.forEach(({ holder, i }) => { const s = Math.max(0.0001, Math.min(1, k * 6 - i)); holder.scale.setScalar(s); holder.visible = s > 0.01; }); } };
}

export function workbench() {
  const g = new THREE.Group(), wood = std('#a07a4c', { roughness: 0.75 }), metal = std('#8c9198', { metalness: 0.8, roughness: 0.35 });
  mesh(new THREE.BoxGeometry(1.8, 0.08, 0.8), wood, 0, 0.9, 0, g);
  for (const [x, z] of [[-0.8, -0.32], [0.8, -0.32], [0.8, 0.32], [-0.8, 0.32]]) mesh(new THREE.BoxGeometry(0.08, 0.9, 0.08), wood, x, 0.45, z, g);
  mesh(new THREE.BoxGeometry(0.9, 0.04, 0.2), std('#d8b27a', { roughness: 0.7 }), 0.1, 0.96, 0.05, g);                // plank
  const ham = new THREE.Group(); mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.3, 10), wood, 0, 0, 0, ham).rotation.z = Math.PI / 2; mesh(new THREE.BoxGeometry(0.04, 0.1, 0.04), metal, 0.15, 0, 0, ham); ham.position.set(-0.55, 0.96, -0.1); g.add(ham);
  mesh(new THREE.BoxGeometry(0.3, 0.12, 0.18), std('#c0392b', { roughness: 0.4 }), 0.65, 1.0, -0.2, g);              // tool box
  const pegs = mesh(new THREE.BoxGeometry(1.8, 0.9, 0.03), std('#c9a97a', { roughness: 0.8 }), 0, 1.5, -0.42, g);
  for (let i = 0; i < 6; i++) mesh(new THREE.BoxGeometry(0.04, 0.25 + rnd(i) * 0.15, 0.03), metal, -0.7 + i * 0.28, 1.55, -0.39, g);
  return { group: g };
}
