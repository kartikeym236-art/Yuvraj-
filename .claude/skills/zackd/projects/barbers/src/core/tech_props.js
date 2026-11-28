// Tech / geopolitics props for explainer reels (all procedural, no brand logos):
// phone() chip() gpu() euvMachine() bus() container() cargoPlane() laserChamber() wafer() hair() fab() sun() globe(A)
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { glowSprite } from './materials.js';

const canvasTex = (w, h, fn, srgb = true) => { const c = document.createElement('canvas'); c.width = w; c.height = h; fn(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c); if (srgb) t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t; };
const std = (o) => new THREE.MeshPhysicalMaterial({ roughness: 0.4, metalness: 0, ...o });
const shadowAll = (g) => { g.traverse((m) => { if (m.isMesh) { m.castShadow = true; m.receiveShadow = true; } }); return g; };
const rnd = (s) => { const x = Math.sin(s * 127.1 + 0.7) * 43758.5453; return x - Math.floor(x); };

/** generic smartphone, 15 cm tall, screen faces +z. P.setScreen(k) brightness */
export function phone() {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new RoundedBoxGeometry(0.072, 0.15, 0.008, 6, 0.009), std({ color: '#2b2e33', metalness: 0.85, roughness: 0.28, clearcoat: 1 }));
  const scr = canvasTex(360, 760, (g2, w, h) => { const gr = g2.createLinearGradient(0, 0, w, h); gr.addColorStop(0, '#2a7bff'); gr.addColorStop(0.5, '#7b3cff'); gr.addColorStop(1, '#ff5fa2');
    g2.fillStyle = gr; g2.fillRect(0, 0, w, h); g2.fillStyle = 'rgba(255,255,255,0.85)'; g2.font = '600 70px Inter'; g2.textAlign = 'center'; g2.fillText('9:41', w / 2, 170);
    for (let i = 0; i < 16; i++) { g2.fillStyle = 'rgba(255,255,255,0.22)'; const x = 40 + (i % 4) * 75, y = 330 + Math.floor(i / 4) * 95; g2.beginPath(); g2.roundRect(x, y, 56, 56, 14); g2.fill(); } });
  const screenMat = new THREE.MeshPhysicalMaterial({ map: scr, emissiveMap: scr, emissive: '#ffffff', emissiveIntensity: 0.7, roughness: 0.08, clearcoat: 1 });
  const screen = new THREE.Mesh(new RoundedBoxGeometry(0.066, 0.143, 0.001, 4, 0.0075), screenMat); screen.position.z = 0.0042;
  const bump = new THREE.Mesh(new RoundedBoxGeometry(0.03, 0.03, 0.003, 4, 0.006), std({ color: '#3a3d42', metalness: 0.8, roughness: 0.3 }));
  bump.position.set(-0.016, 0.052, -0.005);
  for (let i = 0; i < 3; i++) { const l = new THREE.Mesh(new THREE.CylinderGeometry(0.0055, 0.0055, 0.003, 32), std({ color: '#0b0c0e', metalness: 0.5, roughness: 0.1, clearcoat: 1 }));
    l.rotation.x = Math.PI / 2; l.position.set(-0.023 + (i % 2) * 0.013, 0.061 - Math.floor(i / 2) * 0.013 - (i === 2 ? 0 : 0), -0.007); g.add(l); }
  g.add(body, screen, bump); shadowAll(g);
  return { group: g, setScreen(k) { screenMat.emissiveIntensity = 0.7 * k; screenMat.color.setScalar(0.15 + 0.85 * k); } };
}

/** AI chip on a small board, package 4 cm. C.setGlow(k) */
export function chip() {
  const g = new THREE.Group();
  const pcb = new THREE.Mesh(new RoundedBoxGeometry(0.11, 0.004, 0.11, 2, 0.002), std({ color: '#0f5b3a', roughness: 0.5, clearcoat: 0.6 }));
  const traces = canvasTex(512, 512, (c, w, h) => { c.fillStyle = '#0f5b3a'; c.fillRect(0, 0, w, h); c.strokeStyle = '#c9a65a'; c.lineWidth = 3;
    for (let i = 0; i < 70; i++) { let x = rnd(i) * w, y = rnd(i + 50) * h; c.beginPath(); c.moveTo(x, y); for (let k = 0; k < 4; k++) { if (k % 2) x += (rnd(i * 7 + k) - 0.5) * 200; else y += (rnd(i * 3 + k) - 0.5) * 200; c.lineTo(x, y); } c.stroke(); } });
  pcb.material.map = traces; pcb.material.color.set('#ffffff');
  const sub = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.003, 0.05), std({ color: '#1f2a24', roughness: 0.6 })); sub.position.y = 0.0035;
  const lid = canvasTex(512, 512, (c, w, h) => { const gr = c.createLinearGradient(0, 0, w, h); gr.addColorStop(0, '#d9dde2'); gr.addColorStop(1, '#9aa1a9'); c.fillStyle = gr; c.fillRect(0, 0, w, h);
    c.fillStyle = 'rgba(40,45,52,0.75)'; c.font = '900 150px Inter'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('AI', w / 2, h / 2); });
  const lidMat = std({ map: lid, metalness: 0.9, roughness: 0.25, emissive: '#3ad1ff', emissiveIntensity: 0 });
  const top = new THREE.Mesh(new RoundedBoxGeometry(0.04, 0.004, 0.04, 3, 0.0015), lidMat); top.position.y = 0.007;
  const glow = glowSprite('#3ad1ff', 0.12); glow.position.y = 0.01;
  g.add(pcb, sub, top, glow); shadowAll(g);
  return { group: g, lidMat, setGlow(k) { lidMat.emissiveIntensity = 0.35 * k; glow.material.opacity = 0.6 * k; } };
}

/** generic graphics card 27 cm, fans face +z. G.update(t, spin) */
export function gpu() {
  const g = new THREE.Group();
  const shroud = new THREE.Mesh(new RoundedBoxGeometry(0.27, 0.11, 0.04, 4, 0.006), std({ color: '#1c1e22', metalness: 0.6, roughness: 0.35, clearcoat: 0.5 }));
  const pcb = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.1, 0.003), std({ color: '#103d2a' })); pcb.position.z = -0.022;
  const gold = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.008, 0.002), std({ color: '#d4a843', metalness: 1, roughness: 0.25 })); gold.position.set(-0.04, -0.056, -0.022);
  const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.27, 0.004, 0.041), std({ color: '#7de04a', emissive: '#7de04a', emissiveIntensity: 0.6 })); stripe.position.y = 0.04;
  const fans = [];
  for (const x of [-0.065, 0.065]) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.043, 0.004, 12, 48), std({ color: '#2c2f35', metalness: 0.7, roughness: 0.3 })); ring.position.set(x, -0.004, 0.021);
    const fan = new THREE.Group(); fan.position.set(x, -0.004, 0.019);
    for (let i = 0; i < 9; i++) { const b = new THREE.Mesh(new THREE.BoxGeometry(0.036, 0.012, 0.002), std({ color: '#0d0e10', roughness: 0.45 }));
      b.position.x = 0.02; const p = new THREE.Group(); p.rotation.z = i / 9 * Math.PI * 2; b.rotation.x = 0.5; p.add(b); fan.add(p); }
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.006, 32), std({ color: '#26282c', metalness: 0.5 })); hub.rotation.x = Math.PI / 2; fan.add(hub);
    g.add(ring, fan); fans.push(fan);
  }
  g.add(shroud, pcb, gold, stripe); shadowAll(g);
  return { group: g, update(t, spin = 1) { fans.forEach((f, i) => (f.rotation.z = t * 14 * spin * (i ? 1 : -1))); } };
}

/** stylised EUV lithography machine, ~ bus size (12 m long), built from modules that can explode apart.
 *  M.explode(k) 0..1 parts fly out; M.ghost(k) wireframe ghost; M.setGlow(k) blue status light; scale with M.group.scale */
export function euvMachine() {
  const g = new THREE.Group(), parts = [];
  const white = std({ color: '#eef1f4', roughness: 0.32, clearcoat: 0.4 }), grey = std({ color: '#b9c0c8', metalness: 0.6, roughness: 0.3 });
  const dark = std({ color: '#2a2f36', metalness: 0.4, roughness: 0.4 }), accent = std({ color: '#1e6bff', emissive: '#1e6bff', emissiveIntensity: 0.5 });
  const add = (geo, mat, x, y, z, ry = 0) => { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.rotation.y = ry; m.userData.home = m.position.clone(); m.userData.rot = null; g.add(m); parts.push(m); return m; };
  const rb = (w, h, d, r = 0.12) => new RoundedBoxGeometry(w, h, d, 4, r);
  add(rb(5.2, 2.6, 3.2), white, -3.2, 1.3, 0);                   // source module (laser + tin)
  add(rb(4.2, 3.0, 3.4), white, 1.6, 1.5, 0);                    // illuminator / projection optics
  add(rb(3.4, 2.2, 3.0), white, 5.4, 1.1, 0);                    // wafer stage
  add(rb(2.2, 1.6, 2.6), grey, -6.6, 0.8, 0);                    // CO2 drive laser
  add(new THREE.CylinderGeometry(0.9, 0.9, 2.6, 48), grey, -3.2, 2.9, 0);   // vacuum vessel dome
  add(new THREE.SphereGeometry(0.95, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2), grey, -3.2, 4.2, 0);
  add(rb(3.6, 0.5, 3.6, 0.1), dark, 1.6, 3.25, 0);
  for (let i = 0; i < 4; i++) add(new THREE.CylinderGeometry(0.12, 0.12, 9.5, 16), grey, 0, 0.35 + i * 0.12, 1.75 - i * 0.04).rotation.z = Math.PI / 2;
  for (let i = 0; i < 6; i++) add(rb(0.9, 1.2, 0.08, 0.03), grey, -4.6 + i * 1.9, 1.5, 1.72);     // service panels
  add(rb(10.5, 0.08, 0.06, 0.02), accent, 0, 2.2, 1.73);          // blue status line
  add(rb(13.5, 0.3, 3.8, 0.05), dark, -0.4, 0.15, 0);             // base frame
  // many small parts (instanced) for the "100,000 parts" explode
  const N = 900, small = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), std({ color: '#cfd5dc', metalness: 0.7, roughness: 0.35 }), N);
  const S = Array.from({ length: N }, (_, i) => ({ p: new THREE.Vector3((rnd(i) - 0.5) * 12, 0.4 + rnd(i + 3) * 3, (rnd(i + 5) - 0.5) * 3),
    d: new THREE.Vector3(rnd(i + 7) - 0.5, rnd(i + 9) * 0.8 + 0.1, rnd(i + 11) - 0.5).normalize(), s: 0.05 + rnd(i + 13) * 0.18, r: rnd(i + 17) * 6 }));
  small.visible = false; g.add(small);
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), v = new THREE.Vector3(), sc = new THREE.Vector3();
  const ghostMat = new THREE.MeshBasicMaterial({ color: '#ff4b4b', wireframe: true, transparent: true, opacity: 0.5 });
  shadowAll(g);
  const M = { group: g, parts, accent,
    explode(k) {
      parts.forEach((p, i) => { const dir = p.userData.home.clone().setY(p.userData.home.y * 1.4 + 1).normalize(); p.position.copy(p.userData.home).addScaledVector(dir, k * (3 + rnd(i) * 4));
        const r0 = (p.userData.rot ||= p.rotation.clone()); p.rotation.set(r0.x + k * (rnd(i + 1) - 0.5) * 1.5, r0.y, r0.z + k * (rnd(i + 2) - 0.5) * 1.2); });
      small.visible = k > 0.01 && !M.ghosted;
      S.forEach((s, i) => { v.copy(s.p).addScaledVector(s.d, k * (5 + s.r * 2)); e.set(k * s.r, k * s.r * 0.7, 0); q.setFromEuler(e);
        small.setMatrixAt(i, m4.compose(v, q, sc.setScalar(s.s * Math.min(1, k * 4)))); });
      small.instanceMatrix.needsUpdate = true;
    },
    ghost(k, flicker = 0) { M.ghosted = k > 0; parts.forEach((p) => { if (!p.userData.mat) p.userData.mat = p.material; p.material = k > 0 ? ghostMat : p.userData.mat; }); ghostMat.opacity = 0.55 * (1 - flicker); },
    setGlow(k) { accent.emissiveIntensity = 0.5 + 1.5 * k; },
    setGold(k) { white.color.set('#eef1f4').lerp(new THREE.Color('#ffd27a'), k * 0.6); white.metalness = 0.6 * k; },
    reset() { M.explode(0); M.ghost(0); M.setGlow(0); M.setGold(0); g.visible = true; },
  };
  return M;
}

/** yellow school bus ~12 m */
export function bus() {
  const g = new THREE.Group(), yel = std({ color: '#f6b800', roughness: 0.35, clearcoat: 0.8 });
  const body = new THREE.Mesh(new RoundedBoxGeometry(11, 2.6, 2.5, 4, 0.25), yel); body.position.y = 1.85; g.add(body);
  const hood = new THREE.Mesh(new RoundedBoxGeometry(1.6, 1.3, 2.4, 4, 0.2), yel); hood.position.set(6.1, 1.2, 0); g.add(hood);
  const win = std({ color: '#1a2430', roughness: 0.05, clearcoat: 1 });
  for (let i = 0; i < 9; i++) for (const z of [-1.26, 1.26]) { const w = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.8, 0.02), win); w.position.set(-4.6 + i * 1.12, 2.5, z); g.add(w); }
  const stripe = new THREE.Mesh(new THREE.BoxGeometry(11.02, 0.12, 2.52), std({ color: '#111' })); stripe.position.y = 1.6; g.add(stripe);
  for (const x of [-3.6, 4.2]) for (const z of [-1.1, 1.1]) { const w = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.4, 32), std({ color: '#151515', roughness: 0.8 }));
    w.rotation.x = Math.PI / 2; w.position.set(x, 0.55, z); g.add(w); }
  return { group: shadowAll(g) };
}

/** 40 ft shipping container (12.2 x 2.6 x 2.4 m), corrugated */
const corr = canvasTex(256, 64, (c, w, h) => { for (let x = 0; x < w; x += 8) { c.fillStyle = (x / 8) % 2 ? '#d8d8d8' : '#ffffff'; c.fillRect(x, 0, 8, h); } });
export function container(color = '#c8432f') {
  const t = corr.clone(); t.wrapS = THREE.RepeatWrapping; t.repeat.set(6, 1); t.needsUpdate = true;
  const m = new THREE.Mesh(new THREE.BoxGeometry(12.2, 2.6, 2.4), std({ color, map: t, roughness: 0.55, metalness: 0.3 }));
  m.castShadow = true; m.receiveShadow = true; return m;
}

/** cargo plane ~ 40 m, nose +x */
export function cargoPlane() {
  const g = new THREE.Group(), w = std({ color: '#f2f4f6', roughness: 0.35, clearcoat: 0.5 }), gr = std({ color: '#9aa3ad', metalness: 0.5 });
  const f = new THREE.Mesh(new THREE.CapsuleGeometry(2.6, 30, 8, 24), w); f.rotation.z = Math.PI / 2; g.add(f);
  const wing = new THREE.Mesh(new THREE.BoxGeometry(7, 0.5, 44), w); wing.position.set(1, 0.6, 0); wing.rotation.y = 0.12; g.add(wing);
  const tail = new THREE.Mesh(new THREE.BoxGeometry(5, 7, 0.4), w); tail.position.set(-15, 4.5, 0); g.add(tail);
  const stab = new THREE.Mesh(new THREE.BoxGeometry(4, 0.4, 16), w); stab.position.set(-15, 7.5, 0); g.add(stab);
  for (const z of [-8, -14, 8, 14]) { const e = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.1, 4.5, 24), gr); e.rotation.z = Math.PI / 2; e.position.set(3, -0.8, z); g.add(e); }
  return { group: shadowAll(g) };
}

/** vacuum chamber macro: falling tin droplets, laser pulses, plasma flash, collector mirror (dark scene of its own).
 *  L.update(t, rate 0..1 (1 = blur-fast), heat 0..1). Camera: L.cam */
export function laserChamber(E, env = null) {
  const scene = new THREE.Scene(); scene.background = new THREE.Color('#070a14'); scene.fog = new THREE.FogExp2('#070a14', 0.08);
  if (env) { scene.environment = env; scene.environmentIntensity = 0.35; }
  const rim = new THREE.DirectionalLight('#7fa0ff', 1.5); rim.position.set(-3, 4, 2); scene.add(rim);
  scene.add(new THREE.HemisphereLight('#4a6cff', '#05070d', 0.6));
  const mirror = new THREE.Mesh(new THREE.SphereGeometry(2.2, 64, 32, 0, Math.PI * 2, Math.PI * 0.62, Math.PI * 0.38), std({ color: '#c7d4ff', metalness: 1, roughness: 0.08, side: THREE.DoubleSide }));
  mirror.rotation.x = Math.PI / 2; mirror.position.z = 0.9; scene.add(mirror);
  const N = 40, drops = new THREE.InstancedMesh(new THREE.SphereGeometry(0.06, 20, 12), std({ color: '#e8e2da', metalness: 0.6, roughness: 0.2, emissive: '#ff7a20', emissiveIntensity: 1.1 }), N);
  scene.add(drops);
  const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 8, 16), new THREE.MeshBasicMaterial({ color: '#ff3b2a', transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }));
  beam.rotation.z = Math.PI / 2; beam.position.set(-4, 0, 0); scene.add(beam);
  const flash = glowSprite('#c6a3ff', 2.2), core = glowSprite('#ffffff', 0.8); scene.add(flash, core);
  const pl = new THREE.PointLight('#b48cff', 0, 12, 1.5); scene.add(pl);
  const cam = E.camera(40); const m4 = new THREE.Matrix4(), v = new THREE.Vector3(), q = new THREE.Quaternion(), s = new THREE.Vector3(1, 1, 1);
  return { scene, cam, look: { ao: 0, aperture: 0, bloom: 0.9, bloomThreshold: 0.55, bloomRadius: 0.6, exposure: 1.1, vignette: 0.55 },
    update(t, rate = 0.25, heat = 0) {
      const period = 1.1 - rate, ph = (t % period) / period;           // one hit per period at the centre
      for (let i = 0; i < N; i++) { const y = 2.2 - ((i / N) * 4.4 + (t / period) * (4.4 / N) * 1) % 4.4;
        const hitNow = Math.abs(y) < 0.06 && ph < 0.15; v.set(0, y, 0); s.setScalar(hitNow ? 0 : rate > 0.7 ? 1 : 1);
        if (rate > 0.7) s.set(1, 1 + rate * 3, 1); drops.setMatrixAt(i, m4.compose(v, q, s)); }
      drops.instanceMatrix.needsUpdate = true;
      const fire = ph < 0.12 ? 1 - ph / 0.12 : 0, f = Math.max(fire, rate > 0.7 ? 0.6 + 0.4 * Math.sin(t * 60) ** 2 : 0);
      beam.material.opacity = 0.18 + 0.8 * f; flash.material.opacity = Math.min(1, 0.15 + 0.5 * heat + 0.85 * f); core.material.opacity = Math.min(1, 0.2 + 0.6 * heat + f);
      flash.scale.setScalar(1.6 + 2.5 * heat + f); pl.intensity = 6 + 40 * (f + heat);
    } };
}

/** silicon wafer (30 cm) with a die grid; W.setShine(k) */
export function wafer() {
  const tex = canvasTex(1024, 1024, (c, w, h) => { c.fillStyle = '#6d7480'; c.fillRect(0, 0, w, h); const n = 22, d = w / n;
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { const hue = 200 + 120 * ((i + j) / (2 * n)) + rnd(i * 31 + j) * 30;
      c.fillStyle = `hsl(${hue}, 55%, ${45 + rnd(i + j * 7) * 15}%)`; c.fillRect(i * d + 2, j * d + 2, d - 4, d - 4);
      c.strokeStyle = 'rgba(255,255,255,0.25)'; c.lineWidth = 1; for (let k = 1; k < 6; k++) { c.beginPath(); c.moveTo(i * d + 2, j * d + k * d / 6); c.lineTo(i * d + d - 2, j * d + k * d / 6); c.stroke(); } } });
  const m = new THREE.MeshPhysicalMaterial({ map: tex, metalness: 0.45, roughness: 0.18, iridescence: 1, iridescenceIOR: 1.6, clearcoat: 1 });
  const g = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.002, 96), m); g.castShadow = true;
  return { group: g, mat: m };
}

/** macro: a human hair (~70 microns) lying across nanometre circuit lines. scale: 1 unit = 10 microns */
export function hairMacro() {
  const g = new THREE.Group();
  const lines = canvasTex(1024, 256, (c, w, h) => { c.fillStyle = '#1a1f2b'; c.fillRect(0, 0, w, h); for (let x = 0; x < w; x += 4) { c.fillStyle = '#69c8ff'; c.fillRect(x, 0, 2, h); } });
  lines.wrapS = lines.wrapT = THREE.RepeatWrapping; lines.repeat.set(30, 8);
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), std({ map: lines, metalness: 0.6, roughness: 0.3, emissive: '#1e6bff', emissiveMap: lines, emissiveIntensity: 0.35 }));
  floor.rotation.x = -Math.PI / 2; g.add(floor);
  const cut = canvasTex(256, 512, (c, w, h) => { c.fillStyle = '#4a2f1c'; c.fillRect(0, 0, w, h); for (let y = 0; y < h; y += 18) { c.strokeStyle = 'rgba(255,220,180,0.25)'; c.lineWidth = 3; c.beginPath(); c.moveTo(0, y); c.quadraticCurveTo(w / 2, y + 12, w, y); c.stroke(); } });
  cut.wrapS = cut.wrapT = THREE.RepeatWrapping; cut.repeat.set(4, 6);
  const hair = new THREE.Mesh(new THREE.CylinderGeometry(3.5, 3.5, 60, 64), std({ map: cut, roughness: 0.45, clearcoat: 0.6, sheen: 0.5, sheenColor: new THREE.Color('#ffcc99') }));
  hair.rotation.z = Math.PI / 2; hair.rotation.y = 0.5; hair.position.y = 3.5; g.add(hair);
  return { group: g, hair, floor };
}

/** generic chip fab building; F.setLit(k) */
export function fab(color = '#ffffff') {
  const g = new THREE.Group(), w = std({ color: '#e9edf2', roughness: 0.5 });
  const a = new THREE.Mesh(new RoundedBoxGeometry(6, 2.2, 4, 3, 0.1), w); a.position.y = 1.1; g.add(a);
  const b = new THREE.Mesh(new RoundedBoxGeometry(2.4, 3.6, 2.4, 3, 0.1), w); b.position.set(-1.6, 1.8, -0.4); g.add(b);
  for (const x of [1.2, 2.2]) { const s = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 2.2, 16), std({ color: '#b9c0c8', metalness: 0.5 })); s.position.set(x, 3.2, -1); g.add(s); }
  const band = new THREE.Mesh(new THREE.BoxGeometry(6.05, 0.25, 4.05), std({ color, emissive: color, emissiveIntensity: 0 })); band.position.y = 1.9; g.add(band);
  shadowAll(g);
  return { group: g, setLit(k) { band.material.emissiveIntensity = 1.2 * k; } };
}

/** small sun for comparisons */
export function sun() {
  const tex = canvasTex(512, 256, (c, w, h) => { c.fillStyle = '#ff9a2a'; c.fillRect(0, 0, w, h); for (let i = 0; i < 1500; i++) { c.fillStyle = `rgba(255,${200 + rnd(i) * 55 | 0},80,${0.15 + rnd(i + 1) * 0.25})`; c.beginPath(); c.arc(rnd(i + 2) * w, rnd(i + 3) * h, 2 + rnd(i + 4) * 6, 0, 7); c.fill(); } });
  const m = new THREE.Mesh(new THREE.SphereGeometry(1, 48, 24), new THREE.MeshBasicMaterial({ map: tex, color: '#ffffff' }));
  const g = new THREE.Group(); g.add(m); const glow = glowSprite('#ff8a20', 4); glow.material.opacity = 0.8; g.add(glow);
  return { group: g, update(t) { m.rotation.y = t * 0.2; } };
}

/** Earth with day texture, night lights, atmosphere, faint country borders and per-country highlight layers.
 *  E = globe(A, geojson) -> { group, highlight(code, k, color), pin(lat, lon) -> {group}, arc(a, b, color) -> {set(k)}, toVec(lat, lon, r),
 *  setNight(k), setTint(color, k) }   codes are ISO-3 (USA, NLD, CHN …) */
export function globe(A, geo) {
  const g = new THREE.Group(), R = 1;
  const day = A.tex.earthDay; day.colorSpace = THREE.SRGBColorSpace; day.anisotropy = 8;
  const lights = A.tex.earthLights; lights.colorSpace = THREE.SRGBColorSpace;
  const mat = new THREE.MeshStandardMaterial({ map: day, roughness: 0.75, metalness: 0, emissiveMap: lights, emissive: '#ffd9a0', emissiveIntensity: 0 });
  if (A.tex.earthSpec) mat.roughnessMap = null;
  const earth = new THREE.Mesh(new THREE.SphereGeometry(R, 128, 64), mat); g.add(earth);
  const atm = new THREE.Mesh(new THREE.SphereGeometry(R * 1.035, 96, 48), new THREE.ShaderMaterial({ side: THREE.BackSide, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: { uCol: { value: new THREE.Color('#5fb4ff') } },
    vertexShader: 'varying vec3 vN; varying vec3 vV; void main(){ vN = normalize(normalMatrix * normal); vec4 mv = modelViewMatrix * vec4(position,1.0); vV = -mv.xyz; gl_Position = projectionMatrix * mv; }',
    fragmentShader: 'uniform vec3 uCol; varying vec3 vN; varying vec3 vV; void main(){ float f = pow(1.0 - abs(dot(normalize(vN), normalize(vV))), 2.0); gl_FragColor = vec4(uCol, f * 0.9); }' }));
  g.add(atm);
  const W = 4096, H = 2048, px = (lon, lat) => [(lon + 180) / 360 * W, (90 - lat) / 180 * H];
  const drawFeat = (c, f, fill, stroke) => { const polys = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates;
    for (const poly of polys) { c.beginPath(); for (const ring of poly) ring.forEach(([lo, la], i) => { const [x, y] = px(lo, la); i ? c.lineTo(x, y) : c.moveTo(x, y); }); if (fill) c.fill('evenodd'); if (stroke) c.stroke(); } };
  const borders = canvasTex(W, H, (c) => { c.strokeStyle = 'rgba(255,255,255,0.55)'; c.lineWidth = 2.2; geo.features.forEach((f) => drawFeat(c, f, false, true)); });
  const bMesh = new THREE.Mesh(new THREE.SphereGeometry(R * 1.001, 128, 64), new THREE.MeshBasicMaterial({ map: borders, transparent: true, opacity: 0.35, depthWrite: false })); g.add(bMesh);
  const layers = {};
  function layer(code) {
    if (layers[code]) return layers[code];
    const f = geo.features.find((f) => f.properties.ADM0_A3 === code || f.properties.ISO_A3 === code); if (!f) return null;
    const tex = canvasTex(W, H, (c) => { c.fillStyle = '#ffffff'; c.strokeStyle = '#ffffff'; c.lineWidth = 5; drawFeat(c, f, true, true); });
    const m = new THREE.Mesh(new THREE.SphereGeometry(R * 1.002, 128, 64), new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0, depthWrite: false, color: '#ffb020' }));
    g.add(m); return (layers[code] = m);
  }
  const toVec = (lat, lon, r = R) => { const u = (lon + 180) / 360, v = (90 - lat) / 180;
    return new THREE.Vector3(-r * Math.cos(u * 2 * Math.PI) * Math.sin(v * Math.PI), r * Math.cos(v * Math.PI), r * Math.sin(u * 2 * Math.PI) * Math.sin(v * Math.PI)); };
  const G = { group: g, earth, mat, toVec, layers,
    highlight(code, k, color = '#ffb020') { const l = layer(code); if (!l) return; l.material.color.set(color); l.material.opacity = 0.75 * k; l.visible = k > 0; },
    clear() { Object.values(layers).forEach((l) => { l.material.opacity = 0; l.visible = false; }); },
    setNight(k) { mat.emissiveIntensity = 1.6 * k; mat.color.setScalar(1 - 0.75 * k); },
    pin(lat, lon, color = '#ffb020') {
      const p = new THREE.Group(); const head = new THREE.Mesh(new THREE.SphereGeometry(0.018, 24, 16), std({ color, emissive: color, emissiveIntensity: 0.8 }));
      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.003, 0.003, 0.06, 8), std({ color: '#ffffff' })); stem.position.y = -0.03; head.position.y = 0.0;
      const halo = glowSprite(color, 0.12); p.add(head, stem, halo); const n = toVec(lat, lon).normalize();
      p.position.copy(n.clone().multiplyScalar(R + 0.06)); p.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), n); g.add(p);
      return { group: p, set(k) { p.visible = k > 0; const s = Math.max(0.001, k); p.scale.setScalar(s); p.position.copy(n.clone().multiplyScalar(R + 0.06 + 0.25 * (1 - k))); halo.material.opacity = 0.8 * k; } };
    },
    arc(a, b, color = '#ffb020', lift = 0.35) {
      const A3 = toVec(a[0], a[1]), B3 = toVec(b[0], b[1]); const pts = [];
      for (let i = 0; i <= 64; i++) { const k = i / 64; const p = A3.clone().lerp(B3, k).normalize().multiplyScalar(R + lift * Math.sin(Math.PI * k) + 0.005); pts.push(p); }
      const tube = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 128, 0.008, 8), new THREE.MeshBasicMaterial({ color, transparent: true }));
      const count = tube.geometry.index.count; tube.geometry.setDrawRange(0, 0); g.add(tube);
      const tip = glowSprite(color, 0.1); g.add(tip);
      return { tube, set(k) { tube.visible = k > 0; tube.geometry.setDrawRange(0, Math.floor(count * Math.min(1, k) / 6) * 6); tip.material.opacity = k > 0 && k < 1 ? 1 : 0;
        tip.position.copy(pts[Math.min(64, Math.floor(k * 64))]); }, colorTo(c) { tube.material.color.set(c); } };
    },
  };
  return G;
}
