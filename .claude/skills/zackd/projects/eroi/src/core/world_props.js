// Settings for history / geopolitics explainers (procedural, original): outdoor desert world with sky, oil field, flags,
// buildings (parliament, embassy compound, palace throne room, cell), vehicles (tank, jet), centrifuge hall, table, satellite, folder.
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { Sky } from 'three/addons/objects/Sky.js';
import { glowSprite } from './materials.js';

const M = (color, o = {}) => new THREE.MeshPhysicalMaterial({ color, roughness: 0.6, ...o });
const box = (w, h, d, mat, x = 0, y = 0, z = 0, r = 0) => { const m = new THREE.Mesh(r ? new RoundedBoxGeometry(w, h, d, 2, r) : new THREE.BoxGeometry(w, h, d), mat); m.position.set(x, y, z); m.castShadow = true; m.receiveShadow = true; return m; };
const cyl = (rt, rb, h, mat, x = 0, y = 0, z = 0, seg = 24) => { const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), mat); m.position.set(x, y, z); m.castShadow = true; m.receiveShadow = true; return m; };
const ctex = (w, h, fn, rep) => { const c = document.createElement('canvas'); c.width = w; c.height = h; fn(c.getContext('2d'), w, h); const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; if (rep) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(rep[0], rep[1]); } return t; };
const rnd = (s) => { const x = Math.sin(s * 12.9898 + 4.1) * 43758.5453; return x - Math.floor(x); };

/** load an SVG (e.g. assets/flags/ir.svg) into a 1024x768 canvas texture */
export async function flagTex(url) {
  const img = new Image(); img.src = url; await img.decode();
  return ctex(1024, 768, (g, w, h) => g.drawImage(img, 0, 0, w, h));
}
/** pre-1979 Iranian tricolour with a golden sun emblem (drawn, simplified) */
export function oldIranFlagTex() {
  return ctex(1024, 768, (g, w, h) => { g.fillStyle = '#239f40'; g.fillRect(0, 0, w, h / 3); g.fillStyle = '#ffffff'; g.fillRect(0, h / 3, w, h / 3); g.fillStyle = '#da0000'; g.fillRect(0, 2 * h / 3, w, h / 3);
    g.fillStyle = '#e8a91c'; g.beginPath(); g.arc(w / 2 + 40, h / 2 - 20, 46, 0, 7); g.fill(); for (let i = 0; i < 16; i++) { const a = i / 16 * 6.283; g.fillRect(w / 2 + 40 + Math.cos(a) * 54 - 4, h / 2 - 20 + Math.sin(a) * 54 - 4, 8, 8); }
    g.beginPath(); g.ellipse(w / 2 - 20, h / 2 + 50, 110, 34, 0, 0, 7); g.fill(); g.fillRect(w / 2 - 110, h / 2 + 50, 18, 60); g.fillRect(w / 2 + 70, h / 2 + 50, 18, 60); });
}

/** waving flag on a pole. F.update(t, wind); F.setTex(tex) */
export function flag(tex, { w = 0.9, pole = 2.2 } = {}) {
  const g = new THREE.Group(); g.add(cyl(0.018, 0.022, pole, M('#c9ccd1', { metalness: 0.9, roughness: 0.3 }), 0, pole / 2, 0, 12));
  const geo = new THREE.PlaneGeometry(w, w * 0.75, 24, 12); geo.translate(w / 2, 0, 0);
  const mat = new THREE.MeshStandardMaterial({ map: tex, side: THREE.DoubleSide, roughness: 0.75 });
  const cloth = new THREE.Mesh(geo, mat); cloth.position.set(0.02, pole - w * 0.375 - 0.03, 0); cloth.castShadow = true; g.add(cloth);
  const base = geo.attributes.position.array.slice();
  return { group: g, cloth, setTex(t) { mat.map = t; mat.needsUpdate = true; },
    update(t, wind = 1) { const p = geo.attributes.position.array; for (let i = 0; i < p.length; i += 3) { const x = base[i], k = x / w;
      p[i + 2] = Math.sin(x * 7 - t * 6) * 0.06 * k * wind + Math.sin(x * 3 - t * 3 + base[i + 1] * 2) * 0.03 * k * wind; p[i + 1] = base[i + 1] - k * k * 0.05 * (1.3 - wind); }
      geo.attributes.position.needsUpdate = true; geo.computeVertexNormals(); } };
}

/** outdoor world: sand ground (100 m), physical sky, warm sun with shadows, fog. O.setSun(elevationDeg, azimuthDeg); O.setDusk(k) */
export function outdoor(E, { sand = '#d9b47c' } = {}) {
  const scene = new THREE.Scene();
  const sandTex = ctex(512, 512, (g, w, h) => { g.fillStyle = sand; g.fillRect(0, 0, w, h); for (let i = 0; i < 9000; i++) { const v = (rnd(i) - 0.5) * 30;
    g.fillStyle = `rgba(${120 + v},${90 + v},${50 + v},0.10)`; g.fillRect(rnd(i + 1) * w, rnd(i + 2) * h, 2 + rnd(i + 3) * 4, 1 + rnd(i + 4) * 2); }
    for (let i = 0; i < 40; i++) { g.strokeStyle = 'rgba(150,110,60,0.12)'; g.lineWidth = 6; g.beginPath(); g.moveTo(0, rnd(i + 9) * h); g.bezierCurveTo(w * 0.3, rnd(i + 10) * h, w * 0.6, rnd(i + 11) * h, w, rnd(i + 12) * h); g.stroke(); } }, [40, 40]);
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), new THREE.MeshStandardMaterial({ map: sandTex, roughness: 0.95 })); ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; scene.add(ground);
  const sky = new Sky(); sky.scale.setScalar(450); scene.add(sky); const u = sky.material.uniforms;
  u.turbidity.value = 6; u.rayleigh.value = 1.6; u.mieCoefficient.value = 0.006; u.mieDirectionalG.value = 0.8;
  const sun = new THREE.DirectionalLight('#fff1dc', 3); sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, { left: -12, right: 12, top: 12, bottom: -12, near: 1, far: 80 }); sun.shadow.bias = -0.0005; scene.add(sun, sun.target);
  const hemi = new THREE.HemisphereLight('#bcd6ff', '#c9a26e', 0.9); scene.add(hemi);
  scene.fog = new THREE.Fog('#e8d2b0', 30, 140);
  const O = { scene, ground, sky, sun, hemi, sunDir: new THREE.Vector3(),
    setSun(el = 25, az = 200) { const phi = THREE.MathUtils.degToRad(90 - el), th = THREE.MathUtils.degToRad(az); O.sunDir.setFromSphericalCoords(1, phi, th);
      u.sunPosition.value.copy(O.sunDir); sun.position.copy(O.sunDir).multiplyScalar(40); sun.target.position.set(0, 0, 0); },
    setDusk(k) { O.setSun(25 - 22 * k, 200); sun.color.set('#fff1dc').lerp(new THREE.Color('#ff8a4a'), k); sun.intensity = 3 - 1.6 * k; hemi.intensity = 0.9 - 0.5 * k;
      scene.fog.color.set('#e8d2b0').lerp(new THREE.Color('#6a4a5a'), k); u.rayleigh.value = 1.6 + 1.5 * k; },
    setNight(k) { O.setSun(25 - 30 * k, 200); sun.intensity = 3 * (1 - k) + 0.3; sun.color.set('#fff1dc').lerp(new THREE.Color('#8aa0ff'), k); hemi.intensity = 0.9 - 0.75 * k;
      scene.fog.color.set('#e8d2b0').lerp(new THREE.Color('#0d1424'), k); } };
  O.setSun(); return O;
}

/** oil pumpjack (~6 m). P.update(t) rocks the beam */
export function pumpjack(color = '#2c3440', head = '#d9a12b') {
  const g = new THREE.Group(), steel = M(color, { metalness: 0.6, roughness: 0.4 }), hm = M(head, { metalness: 0.4, roughness: 0.4 });
  g.add(box(5.5, 0.3, 1.4, steel, 0, 0.15, 0));
  for (const s of [-1, 1]) { const leg = box(0.22, 3.6, 0.22, steel, 0.4, 1.9, s * 0.45); leg.rotation.x = s * -0.12; g.add(leg); }
  const beamP = new THREE.Group(); beamP.position.set(0.4, 3.7, 0); g.add(beamP);
  beamP.add(box(5.0, 0.32, 0.36, steel, 0.4, 0, 0));
  const hd = new THREE.Mesh(new THREE.CylinderGeometry(1.0, 1.0, 0.5, 32, 1, false, -Math.PI / 2.3, Math.PI / 1.3), hm); hd.rotation.x = Math.PI / 2; hd.rotation.z = Math.PI; hd.position.set(2.7, -0.2, 0); hd.castShadow = true; beamP.add(hd);
  const crank = new THREE.Group(); crank.position.set(-1.7, 1.2, 0); g.add(crank); crank.add(box(1.6, 0.5, 0.3, hm, 0, -0.4, 0.55)); crank.add(box(1.6, 0.5, 0.3, hm, 0, -0.4, -0.55));
  g.add(box(1.2, 1.0, 1.0, steel, -2.2, 0.8, 0)); g.add(cyl(0.12, 0.12, 2.6, steel, 3.4, 1.3, 0)); g.add(cyl(0.35, 0.35, 0.6, steel, 3.4, 0.3, 0));
  return { group: g, update(t) { const a = Math.sin(t * 2.2); beamP.rotation.z = a * 0.22; crank.rotation.z = t * 2.2; } };
}
/** lattice oil derrick (~14 m) */
export function derrick(color = '#4a4f58') {
  const g = new THREE.Group(), m = M(color, { metalness: 0.7, roughness: 0.45 }), H = 14;
  for (const [x, z] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) { const l = cyl(0.08, 0.08, H, m, x * 1.0, H / 2, z * 1.0, 8); l.rotation.set(z * 0.13, 0, -x * 0.13); g.add(l); }
  for (let i = 1; i < 10; i++) { const y = i * 1.4, s = 1.9 * (1 - y / H * 0.85);
    for (const r of [0, Math.PI / 2]) { const b = box(s * 1.05, 0.06, 0.06, m, 0, y, 0); b.rotation.y = r; const b2 = b.clone(); b.position.z = s / 2; b2.position.z = -s / 2; if (r) { b.position.set(s / 2, y, 0); b2.position.set(-s / 2, y, 0); } g.add(b, b2); } }
  g.add(box(2.6, 0.4, 2.6, m, 0, 0.2, 0));
  return { group: g };
}
/** oil barrels (instanced). B.update(t) */
export function barrels(n = 24, { color = '#1f4fa0', w = 3, d = 2, stack = false } = {}) {
  const tex = ctex(256, 256, (g, W, H) => { g.fillStyle = color; g.fillRect(0, 0, W, H); g.fillStyle = 'rgba(0,0,0,0.25)'; g.fillRect(0, 40, W, 10); g.fillRect(0, H - 50, W, 10); });
  const m = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.29, 0.29, 0.88, 24), new THREE.MeshStandardMaterial({ map: tex, metalness: 0.5, roughness: 0.4 }), n); m.castShadow = true; m.receiveShadow = true;
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), v = new THREE.Vector3(), s = new THREE.Vector3(1, 1, 1);
  for (let i = 0; i < n; i++) { const c = i % 6, r = Math.floor(i / 6); m.setMatrixAt(i, m4.compose(v.set((c - 2.5) * 0.62 + (r % 2) * 0.31 - (stack ? 0 : (rnd(i) - 0.5) * 0.1), 0.44 + (stack ? r * 0.89 : 0), stack ? 0 : (r - 1) * 0.62), q, s)); }
  return { group: m, mat: m.material };
}

/** classical facade (parliament / palace): columns, steps, pediment. w metres wide */
export function facade({ w = 16, color = '#efe6d6', cols = 8, h = 8 } = {}) {
  const g = new THREE.Group(), m = M(color, { roughness: 0.75 });
  g.add(box(w + 2, 0.4, 5, m, 0, 0.2, 0), box(w + 1.4, 0.4, 4.4, m, 0, 0.6, 0.3), box(w + 0.8, 0.4, 3.8, m, 0, 1.0, 0.6));
  for (let i = 0; i < cols; i++) { const x = (i / (cols - 1) - 0.5) * w; g.add(cyl(0.38, 0.45, h, m, x, 1.2 + h / 2, 1.0, 20)); }
  g.add(box(w + 1.2, 0.9, 3.4, m, 0, 1.2 + h + 0.45, 0.4)); const ped = new THREE.Mesh(new THREE.CylinderGeometry(0.01, (w + 1.2) / 2, 2.2, 3, 1), m); ped.rotation.set(Math.PI / 2, 0, 0); ped.scale.set(1, 1, 0.55);
  ped.rotation.set(0, 0, 0); ped.rotation.x = -Math.PI / 2; ped.rotation.z = Math.PI; ped.position.set(0, 1.2 + h + 1.9, 0.4); ped.scale.set(1, 0.55, 1); g.add(ped);
  g.add(box(w + 1, h + 1, 1, M('#d8cdb8'), 0, (h + 1) / 2 + 1.2, -1.6));
  for (let i = 0; i < cols - 1; i++) { const x = ((i + 0.5) / (cols - 1) - 0.5) * w; g.add(box(1.0, 2.6, 0.1, M('#3a2f26', { roughness: 0.5 }), x, 2.5, -1.05)); }
  return { group: g };
}
/** walled embassy compound: brick wall with gate, a 3-storey building, flag pole (pass the US flag texture) */
export function embassy(flagT) {
  const g = new THREE.Group(), brick = ctex(256, 128, (c, W, H) => { c.fillStyle = '#b8a28a'; c.fillRect(0, 0, W, H); c.strokeStyle = '#9c866e'; c.lineWidth = 3;
    for (let y = 0; y < H; y += 16) { c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); for (let x = (y / 16) % 2 ? 0 : 16; x < W; x += 32) { c.beginPath(); c.moveTo(x, y); c.lineTo(x, y + 16); c.stroke(); } } }, [8, 1]);
  const wm = new THREE.MeshStandardMaterial({ map: brick, roughness: 0.9 });
  g.add(box(12, 2.6, 0.4, wm, -8.5, 1.3, 0), box(12, 2.6, 0.4, wm, 8.5, 1.3, 0));
  const gate = new THREE.Group(); for (let i = 0; i < 12; i++) gate.add(cyl(0.03, 0.03, 2.4, M('#26292e', { metalness: 0.8 }), -2.2 + i * 0.4, 1.2, 0, 8)); gate.add(box(4.8, 0.08, 0.08, M('#26292e'), 0, 2.3, 0)); g.add(gate);
  const bm = M('#d9d2c4', { roughness: 0.8 }); g.add(box(14, 9, 6, bm, 0, 4.5, -9));
  for (let r = 0; r < 3; r++) for (let c = 0; c < 9; c++) g.add(box(0.9, 1.4, 0.1, M('#2b3644', { roughness: 0.15, clearcoat: 1 }), -5.6 + c * 1.4, 2 + r * 2.6, -5.95));
  const F = flag(flagT, { w: 1.6, pole: 7 }); F.group.position.set(4, 0, -3); g.add(F.group);
  return { group: g, flag: F, gate };
}
/** palace throne room: red carpet, gold throne, pillars, warm light */
export function throneRoom() {
  const scene = new THREE.Scene(); scene.background = new THREE.Color('#2a1a10');
  scene.add(new THREE.HemisphereLight('#ffd9a0', '#3a2010', 0.6)); const key = new THREE.SpotLight('#ffd08a', 120, 30, 0.6, 0.6, 1.2); key.position.set(3, 9, 6); key.castShadow = true; scene.add(key, key.target);
  const fl = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), M('#5a3e28', { roughness: 0.3, clearcoat: 0.6 })); fl.rotation.x = -Math.PI / 2; fl.receiveShadow = true; scene.add(fl);
  scene.add(box(2.4, 0.02, 20, M('#9a1420', { roughness: 0.9 }), 0, 0.01, 4));
  scene.add(box(4, 0.5, 2.5, M('#c9a23a', { metalness: 0.9, roughness: 0.3 }), 0, 0.25, -1.5));
  const gold = M('#e1b44a', { metalness: 1, roughness: 0.25 }), red = M('#8a1020', { roughness: 0.7, sheen: 0.8 });
  const th = new THREE.Group(); th.position.set(0, 0.5, -1.6); scene.add(th);
  th.add(box(1.2, 0.5, 0.9, gold, 0, 0.25, 0, 0.05), box(1.0, 0.15, 0.8, red, 0, 0.55, 0.05, 0.05), box(1.2, 1.9, 0.18, gold, 0, 1.2, -0.38, 0.05), box(0.95, 1.5, 0.05, red, 0, 1.1, -0.27, 0.02));
  for (const s of [-1, 1]) th.add(box(0.15, 0.55, 0.85, gold, s * 0.6, 0.6, 0, 0.04));
  const sunE = glowSprite('#ffcf6a', 1.4); sunE.position.set(0, 2.35, -0.5); sunE.material.opacity = 0.7; th.add(sunE);
  for (let i = 0; i < 6; i++) for (const s of [-1, 1]) scene.add(cyl(0.35, 0.4, 8, M('#e8dcc4', { roughness: 0.5 }), s * 3.2, 4, 3 - i * 3.2, 20));
  scene.add(box(14, 9, 0.5, M('#6a3a24', { roughness: 0.6 }), 0, 4.5, -4));
  return { scene, throne: th, key };
}
/** bare interrogation cell (tasteful: lamp, empty chair, barred window light). C.update(t) swings the lamp */
export function cell() {
  const scene = new THREE.Scene(); scene.background = new THREE.Color('#050506'); scene.fog = new THREE.Fog('#050506', 6, 16);
  const wall = M('#4a4d50', { roughness: 0.95 }); scene.add(box(8, 0.1, 8, wall, 0, -0.05, 0), box(8, 5, 0.2, wall, 0, 2.5, -2.5), box(0.2, 5, 8, wall, -3, 2.5, 0));
  const chair = new THREE.Group(); const wd = M('#3a2c20'); chair.add(box(0.5, 0.05, 0.5, wd, 0, 0.48, 0), box(0.5, 0.6, 0.05, wd, 0, 0.8, -0.23)); for (const [x, z] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) chair.add(box(0.04, 0.48, 0.04, wd, x * 0.22, 0.24, z * 0.22));
  chair.position.set(0.2, 0, -0.6); chair.rotation.y = 0.4; scene.add(chair);
  const lamp = new THREE.Group(); lamp.position.set(0.2, 4, -0.4); scene.add(lamp); lamp.add(cyl(0.005, 0.005, 1.6, M('#111'), 0, -0.8, 0, 6));
  const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.06, 16, 12), new THREE.MeshBasicMaterial({ color: '#ffe2a0' })); bulb.position.y = -1.65; lamp.add(bulb);
  const pl = new THREE.PointLight('#ffd890', 18, 9, 1.6); pl.position.y = -1.7; pl.castShadow = true; lamp.add(pl);
  const win = new THREE.SpotLight('#9ab4ff', 60, 14, 0.25, 0.3, 1); win.position.set(2.5, 4.5, 3); win.target.position.set(-0.8, 0, -1.8); scene.add(win, win.target); win.castShadow = true;
  const bars = new THREE.Group(); for (let i = 0; i < 6; i++) bars.add(box(0.05, 1.4, 0.05, M('#111'), -0.5 + i * 0.2, 0, 0)); bars.position.set(1.8, 3.6, 2.4); scene.add(bars);
  scene.add(new THREE.AmbientLight('#404860', 0.25));
  return { scene, update(t) { lamp.rotation.z = Math.sin(t * 1.6) * 0.12; lamp.rotation.x = Math.sin(t * 1.1) * 0.06; } };
}
/** main battle tank (~7 m), olive by default. T.update(t, turretYaw) */
export function tank(color = '#6b6a48') {
  const g = new THREE.Group(), m = M(color, { roughness: 0.8 }), d = M('#222', { roughness: 0.9 });
  g.add(box(6.2, 1.0, 3.2, m, 0, 0.95, 0, 0.12), box(6.6, 0.8, 0.7, d, 0, 0.5, 1.45, 0.25), box(6.6, 0.8, 0.7, d, 0, 0.5, -1.45, 0.25));
  const tur = new THREE.Group(); tur.position.y = 1.65; g.add(tur); tur.add(box(3, 0.8, 2.3, m, -0.2, 0, 0, 0.2)); const gun = cyl(0.1, 0.12, 4.2, m, 3.2, 0.05, 0, 12); gun.rotation.z = Math.PI / 2; tur.add(gun);
  return { group: g, update(t, yaw = 0) { tur.rotation.y = yaw; } };
}
/** fighter jet (~15 m), nose +x. J.setGlow(k) afterburner */
export function jet(color = '#8f98a4') {
  const g = new THREE.Group(), m = M(color, { metalness: 0.5, roughness: 0.4 });
  const f = new THREE.Mesh(new THREE.CapsuleGeometry(0.75, 11, 8, 20), m); f.rotation.z = Math.PI / 2; f.castShadow = true; g.add(f);
  const nose = new THREE.Mesh(new THREE.ConeGeometry(0.75, 2.6, 20), m); nose.rotation.z = -Math.PI / 2; nose.position.x = 7.4; g.add(nose);
  const can = new THREE.Mesh(new THREE.SphereGeometry(0.55, 20, 12), M('#1a2433', { roughness: 0.05, clearcoat: 1 })); can.scale.set(2.2, 0.8, 0.9); can.position.set(4, 0.65, 0); g.add(can);
  const wing = new THREE.Shape(); wing.moveTo(2, 0); wing.lineTo(-3, 6); wing.lineTo(-4.5, 6); wing.lineTo(-4, 0); wing.lineTo(2, 0);
  for (const s of [-1, 1]) { const w = new THREE.Mesh(new THREE.ExtrudeGeometry(wing, { depth: 0.15, bevelEnabled: false }), m); w.rotation.x = s * Math.PI / 2; w.position.y = -0.1; g.add(w); }
  const tail = new THREE.Shape(); tail.moveTo(0, 0); tail.lineTo(-2.5, 3); tail.lineTo(-3.6, 3); tail.lineTo(-3.4, 0);
  for (const s of [-1, 1]) { const t = new THREE.Mesh(new THREE.ExtrudeGeometry(tail, { depth: 0.1, bevelEnabled: false }), m); t.position.set(-3.5, 0.4, s * 0.8); t.rotation.x = s * 0.25; g.add(t); }
  const ab = glowSprite('#ff9a4a', 2.2); ab.position.x = -6.6; g.add(ab);
  return { group: g, setGlow(k) { ab.material.opacity = k; } };
}
/** centrifuge cascade hall. C.update(t, count 0..1 = how many stay up, glow) */
export function centrifugeHall(rows = 6, cols = 14) {
  const scene = new THREE.Scene(); scene.background = new THREE.Color('#0d1218'); scene.fog = new THREE.Fog('#0d1218', 8, 30);
  scene.add(new THREE.HemisphereLight('#cfe4ff', '#1a2028', 0.8)); const l = new THREE.DirectionalLight('#ffffff', 1.6); l.position.set(4, 10, 6); l.castShadow = true; scene.add(l);
  const fl = new THREE.Mesh(new THREE.PlaneGeometry(60, 60), M('#2a3038', { roughness: 0.4, clearcoat: 0.5 })); fl.rotation.x = -Math.PI / 2; fl.receiveShadow = true; scene.add(fl);
  const n = rows * cols, cm = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.12, 0.12, 2.2, 20), M('#dfe4ea', { metalness: 0.7, roughness: 0.3 }), n); cm.castShadow = true; scene.add(cm);
  const rings = new THREE.InstancedMesh(new THREE.TorusGeometry(0.13, 0.018, 8, 20), M('#3fa9ff', { emissive: '#3fa9ff', emissiveIntensity: 0.8 }), n); scene.add(rings);
  for (let r = 0; r < rows; r++) scene.add(box(cols * 0.5 + 0.5, 0.06, 0.06, M('#9aa3ad', { metalness: 0.8 }), 0, 2.25, -r * 1.3));
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), v = new THREE.Vector3(), s = new THREE.Vector3(), e = new THREE.Euler(Math.PI / 2, 0, 0), qr = new THREE.Quaternion().setFromEuler(e);
  const C = { scene, rings, update(t, keep = 1) { for (let i = 0; i < n; i++) { const r = Math.floor(i / cols), c = i % cols, gone = rnd(i) > keep, k = gone ? Math.min(1, (1 - keep) * 3) : 0;
      v.set((c - (cols - 1) / 2) * 0.5, 1.1 - 2.4 * k * (gone ? 1 : 0), -r * 1.3); cm.setMatrixAt(i, m4.compose(v, q, s.set(1, gone ? Math.max(0.001, 1 - k) : 1, 1)));
      rings.setMatrixAt(i, m4.compose(v.set(v.x, gone ? -5 : 1.6 + 0.3 * Math.sin(t * 8 + i), v.z), qr, s.set(1, 1, 1))); }
    cm.instanceMatrix.needsUpdate = true; rings.instanceMatrix.needsUpdate = true; } };
  C.update(0, 1); return C;
}
/** negotiation table with chairs; T.chairs[i] to move */
export function table(seats = 2) {
  const g = new THREE.Group(), wd = M('#4a2f1e', { roughness: 0.4, clearcoat: 0.6 });
  g.add(box(2.4, 0.08, 1.1, wd, 0, 0.76, 0, 0.03)); for (const [x, z] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) g.add(box(0.07, 0.74, 0.07, wd, x * 1.1, 0.37, z * 0.48));
  const chairs = []; for (let i = 0; i < seats; i++) { const c = new THREE.Group(), cm = M('#2a2a2e', { roughness: 0.5 }); c.add(box(0.5, 0.08, 0.5, cm, 0, 0.47, 0, 0.02), box(0.5, 0.7, 0.07, cm, 0, 0.85, -0.22, 0.02));
    for (const [x, z] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) c.add(box(0.04, 0.45, 0.04, cm, x * 0.2, 0.22, z * 0.2)); const s = i % 2 ? 1 : -1; c.position.set(0, 0, s * 0.95); c.rotation.y = s > 0 ? Math.PI : 0; g.add(c); chairs.push(c); }
  g.add(box(0.06, 0.25, 0.06, M('#c9ccd1', { metalness: 0.9 }), -0.9, 0.92, 0));
  return { group: g, chairs };
}
/** small satellite with solar panels */
export function satellite() {
  const g = new THREE.Group(); g.add(box(0.5, 0.5, 0.7, M('#d4af37', { metalness: 0.9, roughness: 0.3 })));
  for (const s of [-1, 1]) { const p = box(1.4, 0.02, 0.5, M('#1d3d8a', { metalness: 0.6, roughness: 0.2, clearcoat: 1 }), s * 1.0, 0, 0); g.add(p); }
  const dish = new THREE.Mesh(new THREE.SphereGeometry(0.25, 20, 10, 0, Math.PI * 2, 0, 1.0), M('#eeeeee', { side: THREE.DoubleSide })); dish.rotation.x = Math.PI; dish.position.y = -0.4; g.add(dish);
  return { group: g };
}
/** manila folder with a red TOP SECRET stamp and a title; F.open(k) */
export function folder(title = 'OPERATION AJAX') {
  const tex = ctex(800, 560, (c, W, H) => { c.fillStyle = '#d8b878'; c.fillRect(0, 0, W, H); c.strokeStyle = '#b8964f'; c.lineWidth = 6; c.strokeRect(14, 14, W - 28, H - 28);
    c.fillStyle = '#3a2f20'; c.font = '700 54px Courier New, monospace'; c.textAlign = 'center'; c.fillText(title, W / 2, 380);
    c.save(); c.translate(W / 2, 200); c.rotate(-0.12); c.strokeStyle = '#c0202a'; c.lineWidth = 10; c.strokeRect(-230, -60, 460, 120); c.fillStyle = '#c0202a'; c.font = '900 82px Inter'; c.fillText('TOP SECRET', 0, 30); c.restore(); });
  const g = new THREE.Group(), base = box(0.8, 0.01, 0.56, new THREE.MeshStandardMaterial({ color: '#c9a868', roughness: 0.8 }), 0, 0, 0); g.add(base);
  const lidP = new THREE.Group(); lidP.position.set(-0.4, 0.008, 0); g.add(lidP);
  const lid = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 0.56), new THREE.MeshStandardMaterial({ map: tex, roughness: 0.8, side: THREE.DoubleSide })); lid.rotation.x = -Math.PI / 2; lid.position.x = 0.4; lid.castShadow = true; lidP.add(lid);
  return { group: g, open(k) { lidP.rotation.z = k * 2.6; } };
}
