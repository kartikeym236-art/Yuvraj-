// Barbershop sets and props for "The Two Barbers" (built in code).
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { room } from './core/rooms.js';
import { Reflector } from 'three/addons/objects/Reflector.js';

const rnd = (i) => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
function ctex(w, h, fn, rep) { const c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d'); fn(x, w, h);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; if (rep) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(...rep); } return t; }

const chrome = () => new THREE.MeshPhysicalMaterial({ color: '#d9dde2', metalness: 1, roughness: 0.12 });

export function barberChair({ leather = '#8e1b1b' } = {}) {
  const g = new THREE.Group(), L = new THREE.MeshPhysicalMaterial({ color: leather, roughness: 0.38, clearcoat: 0.5, sheen: 0.3 }), C = chrome();
  const add = (geo, m, x, y, z, rx = 0) => { const o = new THREE.Mesh(geo, m); o.position.set(x, y, z); o.rotation.x = rx; o.castShadow = o.receiveShadow = true; g.add(o); return o; };
  add(new THREE.CylinderGeometry(0.3, 0.32, 0.05, 48), C, 0, 0.025, 0);
  add(new THREE.CylinderGeometry(0.06, 0.08, 0.38, 24), C, 0, 0.23, 0);
  add(new RoundedBoxGeometry(0.56, 0.12, 0.52, 4, 0.04), L, 0, 0.48, 0);
  add(new RoundedBoxGeometry(0.56, 0.62, 0.1, 4, 0.04), L, 0, 0.86, 0.25, -0.12);
  add(new RoundedBoxGeometry(0.26, 0.16, 0.08, 4, 0.03), L, 0, 1.26, 0.31, -0.12);
  for (const s of [-1, 1]) { add(new RoundedBoxGeometry(0.07, 0.06, 0.46, 3, 0.02), L, s * 0.31, 0.68, -0.02); add(new THREE.CylinderGeometry(0.012, 0.012, 0.16, 12), C, s * 0.31, 0.6, -0.2); }
  add(new THREE.BoxGeometry(0.4, 0.02, 0.14), C, 0, 0.16, -0.42);
  add(new THREE.CylinderGeometry(0.012, 0.012, 0.32, 12), C, 0, 0.3, -0.33, 0.5);
  return g;                                                   // faces -z (the mirror); seat top at y ~0.54
}

export function scissors() {
  const g = new THREE.Group(), C = chrome(), H = new THREE.MeshStandardMaterial({ color: '#1b1b1b', roughness: 0.5 });
  const half = (s) => { const p = new THREE.Group();
    const b = new THREE.Mesh(new THREE.BoxGeometry(0.008, 0.002, 0.075), C); b.position.set(0, 0, -0.04); p.add(b);
    const r = new THREE.Mesh(new THREE.TorusGeometry(0.012, 0.003, 8, 20), H); r.position.set(s * 0.012, 0, 0.022); r.rotation.x = Math.PI / 2; p.add(r); g.add(p); return p; };
  const A = half(1), B = half(-1);
  return { group: g, snip(k) { const a = 0.05 + 0.3 * k; A.rotation.y = a; B.rotation.y = -a; } };
}

export function barberPole() {
  const t = ctex(256, 512, (x, W, H) => { const cols = ['#d61f2c', '#ffffff', '#1f4fd6', '#ffffff']; for (let i = -8; i < 16; i++) { x.fillStyle = cols[((i % 4) + 4) % 4];
    x.beginPath(); x.moveTo(0, i * 64); x.lineTo(W, i * 64 - 128); x.lineTo(W, i * 64 - 64); x.lineTo(0, i * 64 + 64); x.fill(); } }, [1, 1]);
  const g = new THREE.Group();
  const cyl = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.7, 32), new THREE.MeshStandardMaterial({ map: t, roughness: 0.3, emissive: '#ffffff', emissiveMap: t, emissiveIntensity: 0.25 })); g.add(cyl);
  const glass = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.7, 32, 1, true), new THREE.MeshPhysicalMaterial({ color: '#ffffff', transparent: true, opacity: 0.18, roughness: 0.05 })); g.add(glass);
  for (const y of [-0.38, 0.38]) { const c = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.06, 32), chrome()); c.position.y = y; g.add(c); }
  const top = new THREE.Mesh(new THREE.SphereGeometry(0.08, 24, 16), chrome()); top.position.y = 0.45; g.add(top);
  return { group: g, update(time) { t.offset.y = -time * 0.35; } };
}

export function sign(text, { w = 2.2, bg = '#1c2a3a', fg = '#f4d58d', worn = false } = {}) {
  const t = ctex(1024, 256, (x, W, H) => { x.fillStyle = bg; x.fillRect(0, 0, W, H); x.strokeStyle = fg; x.lineWidth = 10; x.strokeRect(18, 18, W - 36, H - 36);
    x.fillStyle = fg; x.font = '900 150px Inter, sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, W / 2, H / 2 + 8);
    if (worn) for (let i = 0; i < 1400; i++) { x.fillStyle = `rgba(60,40,20,${0.08 + rnd(i) * 0.2})`; x.fillRect(rnd(i + 1) * W, rnd(i + 2) * H, 3 + rnd(i + 3) * 14, 2 + rnd(i + 4) * 8); } });
  const m = new THREE.Mesh(new RoundedBoxGeometry(w, w / 4, 0.06, 3, 0.02), [0, 1, 2, 3, 4, 5].map((i) => (i === 4 ? new THREE.MeshStandardMaterial({ map: t, roughness: 0.4 }) : new THREE.MeshStandardMaterial({ color: bg, roughness: 0.5 }))));
  m.castShadow = true; return m;
}

/** hair clippings scattered on a floor area (instanced little curls) */
export function clippings(n = 600, { w = 3, d = 3, color = '#2b1d12', seed = 1, size = 1 } = {}) {
  const geo = new THREE.TorusGeometry(0.05 * size, 0.0018 * size, 3, 6, Math.PI * 0.35), m = new THREE.MeshStandardMaterial({ color, roughness: 0.8 });
  const im = new THREE.InstancedMesh(geo, m, n), o = new THREE.Object3D();
  for (let i = 0; i < n; i++) { const cl = rnd(i * 3 + seed) < 0.6; const cx = (rnd(Math.floor(i / 25) + seed * 7) - 0.5) * w, cz = (rnd(Math.floor(i / 25) + seed * 9) - 0.5) * d;
    o.position.set(cl ? cx + (rnd(i + 1) - 0.5) * 0.35 : (rnd(i + 2) - 0.5) * w, 0.004 + rnd(i + 5) * 0.006, cl ? cz + (rnd(i + 3) - 0.5) * 0.35 : (rnd(i + 4) - 0.5) * d);
    o.rotation.set(Math.PI / 2 + (rnd(i + 6) - 0.5) * 0.5, 0, rnd(i + 7) * 6.28); o.scale.setScalar(0.6 + rnd(i + 8) * 1.2); o.updateMatrix(); im.setMatrixAt(i, o.matrix); }
  im.receiveShadow = true; return im;
}

/** hair bits falling from point p during a cut (deterministic) */
export function falling(n = 60, color = '#2b1d12') {
  const im = new THREE.InstancedMesh(new THREE.BoxGeometry(0.002, 0.02, 0.002), new THREE.MeshStandardMaterial({ color, roughness: 0.8 }), n), o = new THREE.Object3D();
  return { mesh: im, update(t, p, on = 1) { im.visible = on > 0; for (let i = 0; i < n; i++) { const ph = (t * 0.6 + rnd(i)) % 1;
    o.position.set(p.x + (rnd(i + 1) - 0.5) * 0.25 + Math.sin(t * 2 + i) * 0.02 * ph, p.y - ph * 1.1, p.z + (rnd(i + 2) - 0.5) * 0.25); o.rotation.set(t * 3 + i, i, t * 2); o.scale.setScalar(on);
    o.updateMatrix(); im.setMatrixAt(i, o.matrix); } im.instanceMatrix.needsUpdate = true; } };
}

/** barber cape over a seated customer: wide cone from the neck */
export function cape(color = '#1b1b1f') {
  const g = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.5, 0.8, 40, 1, true), new THREE.MeshPhysicalMaterial({ color, roughness: 0.55, sheen: 0.5, side: THREE.DoubleSide }));
  g.castShadow = true; return g;
}

/** one barbershop interior. clean: spotless tiles, shining mirror. messy: clippings, cracked mirror, clutter */
export function shop(E, env, { clean = true } = {}) {
  const R = room(E, { w: 5.2, d: 5, h: 3, wall: clean ? '#9fd0ea' : '#86a9b8', floor: '#ffffff', env, window: true, sun: clean ? 3.2 : 2.6 });
  R.scene.environmentIntensity = clean ? 0.7 : 0.45;
  const tiles = ctex(1024, 1024, (x, W, H) => { const n = 8; for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { x.fillStyle = (i + j) % 2 ? '#1d1f22' : '#f2f2ee'; x.fillRect(i * W / n, j * H / n, W / n, H / n); }
    if (!clean) for (let i = 0; i < 3000; i++) { x.fillStyle = `rgba(90,70,40,${0.05 + rnd(i) * 0.12})`; x.beginPath(); x.arc(rnd(i + 1) * W, rnd(i + 2) * H, 2 + rnd(i + 3) * 18, 0, 7); x.fill(); } }, [3, 3]);
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(5.2, 5), new THREE.MeshPhysicalMaterial({ map: tiles, roughness: clean ? 0.08 : 0.6, clearcoat: clean ? 1 : 0, clearcoatRoughness: 0.05 }));
  floor.rotation.x = -Math.PI / 2; floor.position.y = 0.002; floor.receiveShadow = true; R.scene.add(floor);
  // mirror wall + counter
  const mirror = new Reflector(new THREE.PlaneGeometry(2.8, 1.1), { textureWidth: 900, textureHeight: 354, color: clean ? 0xd6dde2 : 0x8f8a80, clipBias: 0.003 });
  mirror.position.set(0, 1.65, -2.468); R.scene.add(mirror);
  { const ob = mirror.onBeforeRender; mirror.onBeforeRender = (r, sc, c) => { if (!sc.overrideMaterial) ob(r, sc, c); }; }   // reflect once per frame, not in the AO / DOF passes
  const frame = new THREE.Mesh(new RoundedBoxGeometry(2.9, 1.2, 0.04, 3, 0.015), new THREE.MeshStandardMaterial({ color: clean ? '#f6f6f6' : '#6b5440', roughness: 0.4 })); frame.position.set(0, 1.65, -2.5); R.scene.add(frame);
  if (!clean) {   // crack: bright jagged lines radiating from a point
    const ct = ctex(1024, 400, (x, W, H) => { x.strokeStyle = 'rgba(255,255,255,0.9)'; x.lineWidth = 2.5; const cx = W * 0.68, cy = H * 0.38;
      for (let i = 0; i < 14; i++) { let px = cx, py = cy; const a0 = (i / 14) * 6.28 + rnd(i) * 0.4; x.beginPath(); x.moveTo(px, py);
        for (let s = 0; s < 7; s++) { const a = a0 + (rnd(i * 9 + s) - 0.5) * 0.7, l = 30 + rnd(i * 5 + s) * 70; px += Math.cos(a) * l; py += Math.sin(a) * l; x.lineTo(px, py); } x.stroke(); }
      x.lineWidth = 1.5; for (let r = 18; r < 90; r += 26) { x.beginPath(); for (let k = 0; k <= 14; k++) { const a = (k / 14) * 6.28; x.lineTo(cx + Math.cos(a) * r * (0.8 + rnd(k + r) * 0.4), cy + Math.sin(a) * r * (0.8 + rnd(k + r) * 0.4)); } x.stroke(); } });
    const crack = new THREE.Mesh(new THREE.PlaneGeometry(2.8, 1.1), new THREE.MeshBasicMaterial({ map: ct, transparent: true, depthWrite: false, toneMapped: false })); crack.position.set(0, 1.65, -2.462); R.scene.add(crack); R.crack = crack;
  }
  const counter = new THREE.Mesh(new RoundedBoxGeometry(3.0, 0.08, 0.45, 3, 0.02), new THREE.MeshPhysicalMaterial({ color: clean ? '#ffffff' : '#7a6650', roughness: 0.3, clearcoat: 0.6 }));
  counter.position.set(0, 0.95, -2.28); counter.castShadow = counter.receiveShadow = true; R.scene.add(counter);
  const cab = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.9, 0.42), new THREE.MeshStandardMaterial({ color: clean ? '#f0f0f0' : '#5e4c3a', roughness: 0.5 })); cab.position.set(0, 0.45, -2.29); cab.castShadow = true; R.scene.add(cab);
  // bottles / tools on the counter (neat rows vs knocked over)
  const bm = ['#2a7bd6', '#e0a020', '#3aa060', '#c0392b', '#7a5ab0'];
  for (let i = 0; i < 9; i++) { const b = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.04, 0.18 + (i % 3) * 0.04, 20), new THREE.MeshPhysicalMaterial({ color: bm[i % 5], roughness: 0.15, transmission: 0.3, thickness: 0.05 }));
    b.castShadow = true; if (clean) b.position.set(-1.3 + i * 0.12, 1.08 + (i % 3) * 0.02, -2.35); else { b.position.set(-1.3 + rnd(i) * 2.6, 1.04, -2.2 - rnd(i + 3) * 0.2); if (rnd(i + 5) < 0.4) { b.rotation.z = Math.PI / 2; b.position.y = 1.03; } } R.scene.add(b); }
  const chairs = [-0.8, 0.8].map((x) => { const c = barberChair({ leather: clean ? '#8e1b1b' : '#6a3a2a' }); c.position.set(x, 0, -1.25); R.scene.add(c); return c; });
  const pole = barberPole(); pole.group.position.set(2.45, 1.7, -1.6); R.scene.add(pole.group);
  // waiting bench along the right wall
  const bench = new THREE.Mesh(new RoundedBoxGeometry(0.5, 0.45, 2.2, 3, 0.03), new THREE.MeshStandardMaterial({ color: clean ? '#2f3540' : '#5a3d2a', roughness: 0.6 })); bench.position.set(2.3, 0.225, 0.6); bench.castShadow = true; R.scene.add(bench);
  if (!clean) {
    R.scene.add(clippings(2600, { w: 4.4, d: 4, seed: 3 }));
    for (let i = 0; i < 6; i++) { const mg = new THREE.Mesh(new THREE.BoxGeometry(0.21, 0.006, 0.28), new THREE.MeshStandardMaterial({ color: ['#d8c6a0', '#c0392b', '#2a7bd6', '#f4f4f4'][i % 4], roughness: 0.6 }));
      mg.position.set(1.7 + rnd(i) * 0.6, 0.006 + i * 0.001, -0.4 + rnd(i + 9) * 2); mg.rotation.y = rnd(i + 2) * 3; R.scene.add(mg); }
    const broom = new THREE.Group(); const st = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 1.3, 12), new THREE.MeshStandardMaterial({ color: '#9c7a4c' })); st.position.y = 0.75; broom.add(st);
    const br = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.1, 0.06), new THREE.MeshStandardMaterial({ color: '#c8a35a', roughness: 0.9 })); br.position.y = 0.06; broom.add(br);
    broom.position.set(-2.3, 0, -1.9); broom.rotation.z = 0.18; R.scene.add(broom);
  }
  R.mirror = mirror; R.chairs = chairs; R.pole = pole;
  return R;
}

/** the street: two shopfronts side by side (left = clean shop 1, right = messy shop 2) */
export function street(E, env) {
  const scene = new THREE.Scene(); scene.background = new THREE.Color('#9fd3f2'); scene.environment = env; scene.environmentIntensity = 0.6;
  scene.fog = new THREE.Fog('#bfe2f5', 35, 110);
  const asphalt = ctex(512, 512, (x, W, H) => { x.fillStyle = '#56595e'; x.fillRect(0, 0, W, H); for (let i = 0; i < 6000; i++) { const v = rnd(i) * 40; x.fillStyle = `rgba(${70 + v},${72 + v},${78 + v},0.5)`; x.fillRect(rnd(i + 1) * W, rnd(i + 2) * H, 2, 2); } }, [20, 20]);
  const road = new THREE.Mesh(new THREE.PlaneGeometry(80, 40), new THREE.MeshStandardMaterial({ map: asphalt, roughness: 0.9 })); road.rotation.x = -Math.PI / 2; road.receiveShadow = true; scene.add(road);
  const slab = ctex(512, 512, (x, W, H) => { x.fillStyle = '#c9c4bb'; x.fillRect(0, 0, W, H); x.strokeStyle = '#a8a39a'; x.lineWidth = 4; for (let i = 0; i <= 4; i++) { x.beginPath(); x.moveTo(i * W / 4, 0); x.lineTo(i * W / 4, H); x.moveTo(0, i * H / 4); x.lineTo(W, i * H / 4); x.stroke(); } }, [12, 2]);
  const walk = new THREE.Mesh(new THREE.BoxGeometry(40, 0.14, 4), new THREE.MeshStandardMaterial({ map: slab, roughness: 0.8 })); walk.position.set(0, 0.07, -2); walk.receiveShadow = true; scene.add(walk);
  const sun = new THREE.DirectionalLight('#fff3df', 3.2); sun.position.set(-8, 14, 10); sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, { left: -10, right: 10, top: 10, bottom: -10, near: 1, far: 60 }); sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.02; scene.add(sun, sun.target);
  scene.add(new THREE.HemisphereLight('#d8ecff', '#8a7a6a', 0.9));
  const front = (x, clean) => { const g = new THREE.Group(); g.position.set(x, 0.14, -4);
    const wallM = new THREE.MeshStandardMaterial({ color: clean ? '#f3f1ec' : '#a35d3e', roughness: clean ? 0.6 : 0.95 });
    const wall = new THREE.Mesh(new THREE.BoxGeometry(4.4, 4.4, 0.3), wallM); wall.position.y = 2.2; wall.castShadow = wall.receiveShadow = true; g.add(wall);
    const glass = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 1.8), new THREE.MeshPhysicalMaterial({ color: clean ? '#bcd8e6' : '#6f7a70', metalness: 0.9, roughness: clean ? 0.03 : 0.35 })); glass.position.set(-0.6, 1.5, 0.16); g.add(glass);
    const door = new THREE.Mesh(new THREE.BoxGeometry(0.95, 2.2, 0.05), new THREE.MeshStandardMaterial({ color: clean ? '#20303f' : '#4a3426', roughness: 0.5 })); door.position.set(1.25, 1.1, 0.17); g.add(door);
    const sg = sign('BARBER', { bg: clean ? '#16222e' : '#3b2a1e', fg: clean ? '#f4d58d' : '#d8c8a0', worn: !clean, w: 2.6 }); sg.position.set(0, 3.4, 0.2); if (!clean) sg.rotation.z = -0.05; g.add(sg);
    const aw = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.06, 1.0), new THREE.MeshStandardMaterial({ map: ctex(512, 64, (c, W, H) => { for (let i = 0; i < 16; i++) { c.fillStyle = i % 2 ? '#ffffff' : (clean ? '#1f4fd6' : '#8a3b2e'); c.fillRect(i * W / 16, 0, W / 16, H); } }), roughness: 0.8 }));
    aw.position.set(0, 2.75, 0.55); aw.rotation.x = 0.25; aw.castShadow = true; g.add(aw);
    const pole = barberPole(); pole.group.position.set(2.0, 1.6, 0.35); g.add(pole.group);
    if (!clean) { const cl = clippings(300, { w: 1.2, d: 0.6, seed: 8 }); cl.position.set(1.2, 0.0, 0.7); g.add(cl); }
    scene.add(g); return { group: g, pole, door: new THREE.Vector3(x + 1.25, 0.14, -3.6) }; };
  const s1 = front(-2.3, true), s2 = front(2.3, false);
  // town around them
  for (let i = 0; i < 8; i++) { const h = 4 + rnd(i) * 5, b = new THREE.Mesh(new THREE.BoxGeometry(4.4, h, 3), new THREE.MeshStandardMaterial({ color: ['#e7d7b8', '#cfd8dc', '#d9b8a6', '#bfcbb0'][i % 4], roughness: 0.9 }));
    const x = (i < 4 ? -6.9 - i * 4.6 : 6.9 + (i - 4) * 4.6); b.position.set(x, h / 2, -5.4); b.castShadow = b.receiveShadow = true; scene.add(b); }
  return { scene, sun, s1, s2 };
}
