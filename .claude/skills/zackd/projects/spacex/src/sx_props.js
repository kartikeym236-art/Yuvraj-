// Props for the SpaceX-shares reel (built in code; no logos - plain text names only).
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { actor } from './core/actors.js';

const rnd = (i) => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
const std = (color, o = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.55, metalness: 0.1, ...o });
function ctex(w, h, fn) { const c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d'); fn(x, w, h);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t; }

/** share certificate: cream paper, ornate border, "SPACEX", "1 SHARE", gold seal. Two-sided plane, slight bend */
export function certificate({ w = 0.6 } = {}) {
  const t = ctex(1024, 720, (x, W, H) => { x.fillStyle = '#f3ecd8'; x.fillRect(0, 0, W, H);
    for (let i = 0; i < 4; i++) { x.strokeStyle = i % 2 ? '#2e5d8a' : '#8a6a2e'; x.lineWidth = 8 - i * 1.5; x.strokeRect(24 + i * 14, 24 + i * 14, W - 48 - i * 28, H - 48 - i * 28); }
    for (let k = 0; k < 60; k++) { x.strokeStyle = 'rgba(46,93,138,0.12)'; x.lineWidth = 2; x.beginPath(); x.ellipse(W / 2, H / 2, 120 + k * 6, 60 + k * 3, 0, 0, 7); x.stroke(); }
    x.fillStyle = '#1d2b3c'; x.textAlign = 'center'; x.font = '700 40px Inter, serif'; x.fillText('STOCK CERTIFICATE', W / 2, 140);
    x.font = '900 120px Inter, serif'; x.fillText('SPACEX', W / 2, 290); x.font = '800 66px Inter'; x.fillStyle = '#8a6a2e'; x.fillText('ONE SHARE', W / 2, 400);
    x.fillStyle = '#5a6470'; for (let i = 0; i < 4; i++) x.fillRect(220, 460 + i * 30, W - 440 - rnd(i) * 160, 10);
    const sx = W - 170, sy = H - 150; x.fillStyle = '#c9a23a'; x.beginPath(); for (let k = 0; k < 24; k++) { const a = (k / 24) * 6.283, r = k % 2 ? 62 : 74; x.lineTo(sx + Math.cos(a) * r, sy + Math.sin(a) * r); } x.fill();
    x.fillStyle = '#e8c860'; x.beginPath(); x.arc(sx, sy, 48, 0, 7); x.fill(); x.fillStyle = '#8a6a2e'; x.font = '900 30px Inter'; x.fillText('SX', sx, sy + 10);
    x.strokeStyle = '#1b3fa0'; x.lineWidth = 4; x.beginPath(); x.moveTo(140, H - 120); for (let k = 140; k < 360; k += 8) x.lineTo(k, H - 120 - Math.sin(k * 0.09) * 14); x.stroke(); });
  const geo = new THREE.PlaneGeometry(w, w * 0.703, 12, 1); const P = geo.attributes.position; for (let i = 0; i < P.count; i++) P.setZ(i, Math.sin((P.getX(i) / w + 0.5) * Math.PI) * w * 0.03); geo.computeVertexNormals();
  const m = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ map: t, side: THREE.DoubleSide, roughness: 0.75 })); m.castShadow = true;
  return m;
}

/** social-post card (no real handle): avatar, name, text, like/retweet bar; laughing reactions pop with react(k) */
export function postCard(text = 'Every kid in America gets 1 SpaceX share.') {
  const t = ctex(1024, 560, (x, W, H) => { x.fillStyle = '#ffffff'; x.beginPath(); x.roundRect(0, 0, W, H, 40); x.fill();
    x.fillStyle = '#1d2b3c'; x.beginPath(); x.arc(90, 90, 46, 0, 7); x.fill(); x.fillStyle = '#ffffff'; x.font = '800 40px Inter'; x.textAlign = 'center'; x.fillText('EM', 90, 104);
    x.textAlign = 'left'; x.fillStyle = '#0f1419'; x.font = '800 40px Inter'; x.fillText('Elon Musk', 160, 82); x.fillStyle = '#536471'; x.font = '500 32px Inter'; x.fillText('posted', 160, 124);
    x.fillStyle = '#0f1419'; x.font = '600 50px Inter'; const words = text.split(' '); let line = '', y = 230; for (const wd of words) { if (x.measureText(line + wd).width > W - 120) { x.fillText(line, 60, y); line = ''; y += 66; } line += wd + ' '; } x.fillText(line, 60, y);
    x.fillStyle = '#536471'; x.font = '500 34px Inter'; ['12K', '48K', '310K'].forEach((s, i) => x.fillText(s, 120 + i * 300, H - 50)); });
  const g = new THREE.Group();
  const card = new THREE.Mesh(new RoundedBoxGeometry(1.0, 0.547, 0.02, 4, 0.03), [0, 1, 2, 3, 4, 5].map((i) => (i === 4 ? new THREE.MeshStandardMaterial({ map: t, roughness: 0.5 }) : std('#ffffff'))));
  card.castShadow = true; g.add(card);
  const lol = ['HAHA', 'LOL', 'HAHA', 'LMAO', 'LOL'].map((s, i) => { const tt = ctex(256, 128, (x, W, H) => { x.fillStyle = '#ffd23a'; x.beginPath(); x.roundRect(4, 4, W - 8, H - 8, 50); x.fill(); x.fillStyle = '#1d2b3c'; x.font = '900 60px Inter'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, W / 2, H / 2 + 3); });
    const m = new THREE.Mesh(new THREE.PlaneGeometry(0.34, 0.17), new THREE.MeshBasicMaterial({ map: tt, transparent: true, toneMapped: false, depthWrite: false })); m.position.set([-0.45, 0.42, -0.1, 0.5, 0.05][i], [0.4, 0.38, -0.42, -0.36, 0.52][i], 0.05 + i * 0.01); m.rotation.z = (rnd(i) - 0.5) * 0.4; g.add(m); return m; });
  return { group: g, react(k) { lol.forEach((m, i) => { const s = Math.max(0.0001, Math.min(1, k * 5 - i)); const p = s < 0.7 ? (s / 0.7) * 1.15 : 1.15 - 0.15 * ((s - 0.7) / 0.3); m.scale.setScalar(p); m.visible = s > 0.01; }); } };
}

/** stainless two-stage rocket (generic) on a launch mount; flame(k) with exhaust plume */
export function rocket() {
  const g = new THREE.Group(), steel = new THREE.MeshPhysicalMaterial({ color: '#c9ced4', metalness: 1, roughness: 0.22, clearcoat: 0.4 }), dark = std('#2b2e33', { metalness: 0.6, roughness: 0.4 });
  const R = 4.5;
  const booster = new THREE.Mesh(new THREE.CylinderGeometry(R, R, 70, 48, 1, true), steel); booster.position.y = 35; g.add(booster);
  const ship = new THREE.Mesh(new THREE.CylinderGeometry(R, R, 40, 48, 1, true), steel); ship.position.y = 90; g.add(ship);
  const nose = new THREE.Mesh(new THREE.SphereGeometry(R, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2), steel); nose.scale.y = 2.2; nose.position.y = 110; g.add(nose);
  const ring = new THREE.Mesh(new THREE.CylinderGeometry(R * 1.01, R * 1.01, 1.2, 48, 1, true), dark); ring.position.y = 70; g.add(ring);
  for (let i = 0; i < 4; i++) { const f = new THREE.Mesh(new THREE.BoxGeometry(0.4, 8, 5), dark); const a = (i / 4) * Math.PI * 2 + 0.4; f.position.set(Math.cos(a) * (R + 2), i < 2 ? 104 : 74, Math.sin(a) * (R + 2)); f.rotation.y = -a; g.add(f); }
  const mount = new THREE.Group(); g.add(mount); const mm = std('#4a4f58', { metalness: 0.7, roughness: 0.45 });
  for (const [x, z] of [[-7, -7], [7, -7], [7, 7], [-7, 7]]) { const l = new THREE.Mesh(new THREE.BoxGeometry(2, 20, 2), mm); l.position.set(x, -10, z); mount.add(l); }
  const tower = new THREE.Mesh(new THREE.BoxGeometry(9, 140, 9), new THREE.MeshStandardMaterial({ color: '#3a3f47', metalness: 0.6, roughness: 0.5, wireframe: false })); tower.position.set(-22, 50, 0); g.add(tower);
  for (let i = 0; i < 14; i++) { const b = new THREE.Mesh(new THREE.BoxGeometry(9.4, 0.6, 9.4), std('#2b2f36')); b.position.set(-22, -15 + i * 10, 0); g.add(b); }
  g.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  const flameT = ctex(128, 256, (x, W, H) => { const gr = x.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, 'rgba(255,255,240,1)'); gr.addColorStop(0.25, 'rgba(255,200,80,0.95)'); gr.addColorStop(0.7, 'rgba(255,110,30,0.5)'); gr.addColorStop(1, 'rgba(255,80,20,0)');
    x.fillStyle = gr; x.beginPath(); x.moveTo(W * 0.3, 0); x.lineTo(W * 0.7, 0); x.lineTo(W, H); x.lineTo(0, H); x.fill(); });
  const flames = [0, 1, 2].map((i) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(R * 2.2, 40), new THREE.MeshBasicMaterial({ map: flameT, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false, side: THREE.DoubleSide }));
    m.position.y = -20; m.rotation.y = (i / 3) * Math.PI; g.add(m); return m; });
  const puff = ctex(128, 128, (x, W) => { const gg = x.createRadialGradient(W / 2, W / 2, 0, W / 2, W / 2, W / 2); gg.addColorStop(0, 'rgba(255,255,255,0.95)'); gg.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = gg; x.fillRect(0, 0, W, W); });
  const clouds = Array.from({ length: 40 }, (_, i) => { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: puff, color: '#e9e4dc', transparent: true, depthWrite: false })); g.add(s); return s; });
  return { group: g, flame(k, t) { flames.forEach((m, i) => { m.visible = k > 0.01; m.scale.set(1 + 0.06 * Math.sin(t * 30 + i), k * (1 + 0.1 * Math.sin(t * 23 + i * 2)), 1); m.position.y = -20 * k; });
      clouds.forEach((s, i) => { const a = rnd(i) * 6.28, r = (8 + rnd(i + 1) * 40) * k, ph = (t * 0.3 + rnd(i + 2)) % 1; s.position.set(Math.cos(a) * r, -14 + rnd(i + 3) * 8 + ph * 6, Math.sin(a) * r); const sc = (10 + rnd(i + 4) * 18) * k; s.scale.set(sc, sc, sc); s.material.opacity = 0.85 * k * (1 - ph * 0.5); s.visible = k > 0.01; }); } };
}

/** Mars: procedural rusty planet + faint atmosphere */
export function mars(r = 6) {
  const t = ctex(1024, 512, (x, W, H) => { x.fillStyle = '#b5532f'; x.fillRect(0, 0, W, H);
    for (let i = 0; i < 3000; i++) { const c = rnd(i) < 0.5 ? `rgba(90,35,20,${0.05 + rnd(i + 1) * 0.15})` : `rgba(230,150,100,${0.04 + rnd(i + 2) * 0.1})`; x.fillStyle = c; x.beginPath(); x.ellipse(rnd(i + 3) * W, rnd(i + 4) * H, 4 + rnd(i + 5) * 40, 3 + rnd(i + 6) * 18, 0, 0, 7); x.fill(); }
    x.fillStyle = 'rgba(245,240,235,0.85)'; x.fillRect(0, 0, W, 18); x.fillRect(0, H - 14, W, 14); });
  const g = new THREE.Group(), p = new THREE.Mesh(new THREE.SphereGeometry(r, 96, 64), new THREE.MeshStandardMaterial({ map: t, roughness: 0.95 })); g.add(p);
  const atm = new THREE.Mesh(new THREE.SphereGeometry(r * 1.03, 64, 48), new THREE.MeshBasicMaterial({ color: '#ff9a6a', transparent: true, opacity: 0.12, side: THREE.BackSide, blending: THREE.AdditiveBlending, depthWrite: false })); g.add(atm);
  return { group: g, planet: p };
}

/** starfield */
export function stars(n = 1500, R = 300) {
  const geo = new THREE.BufferGeometry(), pos = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) { const u = rnd(i) * 2 - 1, a = rnd(i + 7) * 6.283, s = Math.sqrt(1 - u * u); pos.set([Math.cos(a) * s * R, u * R, Math.sin(a) * s * R], i * 3); }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  return new THREE.Points(geo, new THREE.PointsMaterial({ color: '#ffffff', size: 1.2, sizeAttenuation: false, toneMapped: false }));
}

/** a child: the same realistic body, scaled down with child proportions (bigger head, shorter limbs) */
export function kid({ shirt = '#e0a020', hair = '#3a2a1f', seed = 2, h = 0.62 } = {}) {
  const a = actor('rpm', { shirt, pants: '#34495e' }).part('Beard', false).hair('short', { color: hair, seed });
  a.root.scale.multiplyScalar(h);
  if (a.bones.Head) a.bones.Head.scale.setScalar(1.32);
  for (const b of ['LeftUpLeg', 'RightUpLeg']) if (a.bones[b]) a.bones[b].scale.set(1, 0.92, 1);
  return a;
}

/** stage: dark floor with a glossy sheen, big LED screen showing a rocket silhouette over a starfield, spotlight */
export function stage() {
  const scene = new THREE.Scene(); scene.background = new THREE.Color('#07090d');
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), new THREE.MeshPhysicalMaterial({ color: '#0d1016', roughness: 0.25, clearcoat: 0.8 })); floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor);
  const scr = ctex(1024, 1820, (x, W, H) => { const gr = x.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, '#05070f'); gr.addColorStop(1, '#1a2a4a'); x.fillStyle = gr; x.fillRect(0, 0, W, H);
    for (let i = 0; i < 400; i++) { x.fillStyle = `rgba(255,255,255,${rnd(i) * 0.8})`; x.fillRect(rnd(i + 1) * W, rnd(i + 2) * H * 0.8, 2, 2); }
    x.fillStyle = '#c9ced4'; x.fillRect(W / 2 - 60, H * 0.18, 120, H * 0.6); x.beginPath(); x.ellipse(W / 2, H * 0.18, 60, 150, 0, Math.PI, 0); x.fill();
    const fl = x.createLinearGradient(0, H * 0.78, 0, H); fl.addColorStop(0, 'rgba(255,220,120,0.95)'); fl.addColorStop(1, 'rgba(255,90,20,0)'); x.fillStyle = fl; x.beginPath(); x.moveTo(W / 2 - 60, H * 0.78); x.lineTo(W / 2 + 60, H * 0.78); x.lineTo(W / 2 + 140, H); x.lineTo(W / 2 - 140, H); x.fill(); });
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(6, 10.7), new THREE.MeshBasicMaterial({ map: scr, toneMapped: false })); screen.position.set(0, 5.5, -5); scene.add(screen);
  const spot = new THREE.SpotLight('#fff3e2', 60, 30, 0.38, 0.6, 1.2); spot.position.set(2, 9, 6); spot.castShadow = true; spot.shadow.mapSize.set(2048, 2048); scene.add(spot, spot.target);
  const rim = new THREE.SpotLight('#7fb2ff', 40, 30, 0.5, 0.7, 1.3); rim.position.set(-3, 6, -4); scene.add(rim, rim.target);
  scene.add(new THREE.HemisphereLight('#8aa0c0', '#101010', 0.35));
  return { scene, spot, rim, screen };
}
