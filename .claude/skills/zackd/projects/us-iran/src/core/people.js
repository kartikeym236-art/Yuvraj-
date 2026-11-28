// Stylised clay-figurine people (~1.75 m, feet at y = 0, facing +z). Recognisable by silhouette (hair, headwear, beard,
// outfit, props), deliberately NOT photoreal likenesses. figure(spec) -> F; F.pose({...}) each frame.
//   spec: { skin, outfit: 'suit'|'uniform'|'robe'|'casual', suit, trousers, shirt, tie, hair: 'bald_fringe'|'slick'|'short'|'swoop'|'none',
//           hairColor, beard: 'full'|null, beardColor, mustache, mustacheColor, headwear: 'turban'|'beret'|'cap'|null, headwearColor,
//           nose (scale), ears (scale), brows (color), browW, width (body), glasses: 'sun'|null, medals, sash, epaulettes, buttons }
//   F.pose({ armL: [fwd, side], armR: [fwd, side], elbowL, elbowR, head: [x, y, z], lean, mouth (-1 frown .. 1 smile), talk 0..1,
//            brow (-1 angry .. 1 raised), blink 0..1 })
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

const M = (color, o = {}) => new THREE.MeshPhysicalMaterial({ color, roughness: 0.55, clearcoat: 0.15, sheen: 0.3, sheenColor: new THREE.Color('#ffffff'), ...o });
const mesh = (g, m, x = 0, y = 0, z = 0) => { const o = new THREE.Mesh(g, m); o.position.set(x, y, z); o.castShadow = true; o.receiveShadow = true; return o; };

export const PRESETS = {
  mosaddegh: { skin: '#d8b096', outfit: 'suit', suit: '#6d7077', trousers: '#5d6067', shirt: '#f2efe8', tie: '#3a3d45', hair: 'bald_fringe', hairColor: '#cfcac4',
    nose: 1.7, ears: 1.15, brows: '#8d8780', browW: 1, width: 0.9, age: 1 },
  shah: { skin: '#d9b08f', outfit: 'uniform', suit: '#d9cfb8', trousers: '#cfc5ad', hair: 'slick', hairColor: '#2a241f', nose: 1.35, brows: '#2a241f',
    medals: true, sash: '#2e5fb0', epaulettes: '#d9a93b', buttons: '#d9a93b', width: 1 },
  khomeini: { skin: '#cfa587', outfit: 'robe', suit: '#1d1c1f', trousers: '#3b3128', shirt: '#4a3a2c', hair: 'none', headwear: 'turban', headwearColor: '#161517',
    beard: 'full', beardColor: '#e9e6e1', mustache: true, mustacheColor: '#e2ded8', brows: '#2f2b28', browW: 1.5, nose: 1.25, width: 1 },
  saddam: { skin: '#c99876', outfit: 'uniform', suit: '#5b6243', trousers: '#545b3d', hair: 'short', hairColor: '#1b1816', headwear: 'beret', headwearColor: '#121212',
    mustache: true, mustacheColor: '#141210', brows: '#141210', browW: 1.3, nose: 1.2, epaulettes: '#8a8f6a', buttons: '#c9a64a', width: 1.08 },
  obama: { skin: '#8a5c40', outfit: 'suit', suit: '#2c3038', trousers: '#2a2e35', shirt: '#f4f5f7', tie: '#6e9ad0', hair: 'short', hairColor: '#4b4743',
    ears: 1.3, nose: 1.05, brows: '#2a2522', width: 0.92, pin: true },
  trump: { skin: '#e8b48c', outfit: 'suit', suit: '#1f2a44', trousers: '#1d273f', shirt: '#ffffff', tie: '#c81e2b', tieLong: true, hair: 'swoop', hairColor: '#e7c983',
    nose: 1.05, brows: '#d6b77a', width: 1.18, pin: true },
  agent: { skin: '#e0b597', outfit: 'suit', suit: '#17191d', trousers: '#17191d', shirt: '#ffffff', tie: '#17191d', hair: 'short', hairColor: '#3a2e26', glasses: 'sun', width: 1 },
  british: { skin: '#e8c3a6', outfit: 'suit', suit: '#3e4a3a', trousers: '#3a4436', shirt: '#f4f1ea', tie: '#7a1f2a', hair: 'short', hairColor: '#8a6a4a', mustache: true,
    mustacheColor: '#7a5a3c', headwear: 'cap', headwearColor: '#2f3a2c', width: 1.02 },
  student: { skin: '#cfa284', outfit: 'casual', suit: '#6b7f9a', trousers: '#3b3f48', hair: 'short', hairColor: '#1d1916', mustache: true, mustacheColor: '#1d1916', width: 0.95 },
};

export function figure(spec = {}) {
  const S = { skin: '#d8ad8f', outfit: 'suit', suit: '#333', trousers: '#2c2c2c', shirt: '#fff', tie: null, hair: 'short', hairColor: '#2a2420', nose: 1, ears: 1,
    brows: '#2a2420', browW: 1, width: 1, ...(typeof spec === 'string' ? PRESETS[spec] : spec) };
  const skin = M(S.skin, { roughness: 0.5, sheen: 0.5, sheenColor: new THREE.Color('#ffd9c4') }), cloth = M(S.suit, { roughness: 0.75, clearcoat: 0 }),
    pants = M(S.trousers, { roughness: 0.8, clearcoat: 0 }), hairM = M(S.hairColor, { roughness: 0.65, sheen: 0, clearcoat: 0.3 }), dark = M('#141414', { roughness: 0.4 });
  const root = new THREE.Group(), body = new THREE.Group(); root.add(body);
  const W = S.width;
  // legs + shoes (a robe hides them)
  const legs = new THREE.Group(); body.add(legs);
  for (const x of [-0.1, 0.1]) { legs.add(mesh(new THREE.CapsuleGeometry(0.075 * W, 0.72, 6, 16), pants, x * W, 0.5, 0));
    legs.add(mesh(new RoundedBoxGeometry(0.12, 0.08, 0.26, 3, 0.035), M('#1b1b1d', { roughness: 0.3, clearcoat: 0.8 }), x * W, 0.04, 0.04)); }
  // torso (lathe) - robe goes to the floor
  const robe = S.outfit === 'robe';
  const prof = robe ? [[0.001, 0.02], [0.34, 0.02], [0.3, 0.5], [0.25, 0.95], [0.25, 1.25], [0.24, 1.42], [0.16, 1.5], [0.001, 1.52]]
    : [[0.001, 0.86], [0.2, 0.86], [0.21, 1.0], [0.235, 1.28], [0.23, 1.42], [0.15, 1.5], [0.001, 1.52]];
  const torso = mesh(new THREE.LatheGeometry(prof.map(([r, y]) => new THREE.Vector2(r * W, y)), 40), cloth); torso.scale.z = 0.62; body.add(torso);
  if (robe) legs.visible = false;
  const chest = new THREE.Group(); body.add(chest);
  const front = (o, y, z = 0.148 * W) => { o.position.y = y; o.position.z += z; chest.add(o); return o; };
  if (S.outfit === 'suit') {
    const v = new THREE.Shape(); v.moveTo(-0.07, 0.2); v.lineTo(0.07, 0.2); v.lineTo(0, -0.02); v.lineTo(-0.07, 0.2);
    front(mesh(new THREE.ShapeGeometry(v), M(S.shirt, { side: THREE.DoubleSide })), 1.26, 0.152 * W);
    if (S.tie) { const tl = S.tieLong ? 0.36 : 0.26; front(mesh(new RoundedBoxGeometry(0.045, tl, 0.012, 2, 0.005), M(S.tie, { clearcoat: 0.5 })), 1.45 - tl / 2 - 0.02, 0.158 * W); }
    for (const s of [-1, 1]) { const l = mesh(new RoundedBoxGeometry(0.05, 0.24, 0.01, 2, 0.004), M(new THREE.Color(S.suit).multiplyScalar(0.8))); l.rotation.z = s * 0.32; l.position.x = s * 0.06; front(l, 1.33, 0.153 * W); }
    if (S.pin) front(mesh(new THREE.SphereGeometry(0.008, 10, 8), M('#c8102e', { emissive: '#3a0008' })), 1.36, 0.16 * W).position.x = 0.1;
  }
  if (S.outfit === 'uniform') {
    if (S.buttons) for (let i = 0; i < 5; i++) front(mesh(new THREE.SphereGeometry(0.01, 10, 8), M(S.buttons, { metalness: 0.9, roughness: 0.3 })), 1.02 + i * 0.08, 0.15 * W);
    if (S.medals) for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) { const md = front(mesh(new THREE.BoxGeometry(0.022, 0.012, 0.008), M(['#c8102e', '#1f5fbf', '#2e9a4a', '#e0b030'][(r + c) % 4])), 1.33 - r * 0.018, 0.152 * W); md.position.x = 0.05 + c * 0.024; }
    if (S.sash) { const sh = mesh(new THREE.BoxGeometry(0.06, 0.6, 0.012), M(S.sash, { clearcoat: 0.6 })); sh.rotation.z = 0.75; sh.position.set(0, 1.18, 0.155 * W); chest.add(sh); }
    if (S.epaulettes) for (const s of [-1, 1]) body.add(mesh(new RoundedBoxGeometry(0.11, 0.025, 0.09, 2, 0.01), M(S.epaulettes, { metalness: 0.7, roughness: 0.35 }), s * 0.19 * W, 1.47, 0));
    const belt = mesh(new THREE.CylinderGeometry(0.212 * W, 0.212 * W, 0.04, 32), M('#2a2219', { roughness: 0.4 })); belt.scale.z = 0.62; belt.position.y = 0.98; body.add(belt);
  }
  if (S.outfit === 'casual') { const col = mesh(new THREE.TorusGeometry(0.07, 0.015, 8, 24), cloth); col.rotation.x = Math.PI / 2; col.position.y = 1.49; body.add(col); }
  if (robe) { const inner = front(mesh(new RoundedBoxGeometry(0.16, 0.9, 0.02, 2, 0.01), M(S.shirt)), 0.95, 0.09); inner.scale.x = W; }
  // arms
  const arm = (s) => { const sh = new THREE.Group(); sh.position.set(s * 0.255 * W, 1.42, 0); body.add(sh);
    sh.add(mesh(new THREE.CapsuleGeometry(0.062 * W, 0.26, 6, 14), robe ? cloth : cloth, 0, -0.17, 0));
    const el = new THREE.Group(); el.position.y = -0.33; sh.add(el);
    el.add(mesh(new THREE.CapsuleGeometry(0.055 * W, 0.22, 6, 14), cloth, 0, -0.13, 0));
    const hand = mesh(new THREE.SphereGeometry(0.052, 16, 12), skin, 0, -0.3, 0); hand.scale.set(0.85, 1.1, 0.7); el.add(hand);
    return { sh, el, hand }; };
  const AL = arm(1), AR = arm(-1);              // L = figure's left (+x)
  // head
  const neck = mesh(new THREE.CylinderGeometry(0.055, 0.06, 0.12, 16), skin, 0, 1.53, 0); body.add(neck);
  const head = new THREE.Group(); head.position.set(0, 1.6, 0); body.add(head);
  const skull = mesh(new THREE.SphereGeometry(0.118, 40, 30), skin, 0, 0.045, 0); skull.scale.set(0.9, 1.1, 0.98); head.add(skull);
  const jaw = mesh(new THREE.SphereGeometry(0.085, 30, 20), skin, 0, -0.03, 0.006); jaw.scale.set(0.9, 0.85, 0.92); head.add(jaw);
  const cheekG = new THREE.SphereGeometry(0.03, 16, 12); for (const s of [-1, 1]) { const ck = mesh(cheekG, skin, s * 0.05, 0.012, 0.062); ck.scale.set(1, 0.8, 0.8); head.add(ck); }
  for (const s of [-1, 1]) { const e = mesh(new THREE.SphereGeometry(0.03, 16, 12), skin, s * 0.106, 0.035, -0.005); e.scale.set(0.45 * S.ears, 1.05 * S.ears, 0.8 * S.ears); head.add(e); }
  const nose = mesh(new THREE.SphereGeometry(0.02, 20, 14), skin, 0, 0.03, 0.1 + 0.003 * S.nose); nose.scale.set(0.8, 1.5 + 0.35 * (S.nose - 1), 0.9 + 0.45 * (S.nose - 1)); nose.rotation.x = -0.25; head.add(nose);
  const tip = mesh(new THREE.SphereGeometry(0.016, 16, 12), skin, 0, 0.0, 0.112 + 0.012 * (S.nose - 1)); tip.scale.set(1.25, 0.9, 1); head.add(tip);
  const eyes = [], lids = [];
  for (const s of [-1, 1]) {
    const w = mesh(new THREE.SphereGeometry(0.0175, 16, 12), M('#efe9e2', { roughness: 0.2, clearcoat: 1 }), s * 0.038, 0.052, 0.088); w.scale.set(1.2, 0.85, 0.8); head.add(w);
    const ir = mesh(new THREE.SphereGeometry(0.0105, 14, 10), M('#2a1a10', { roughness: 0.1, clearcoat: 1 }), s * 0.038, 0.052, 0.0985); head.add(ir); eyes.push(ir);
    const lid = mesh(new THREE.SphereGeometry(0.0175, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), skin, s * 0.038, 0.053, 0.088); lid.scale.set(1.2, 1, 1); lid.rotation.x = -1.15; head.add(lid); lids.push(lid);
    const br = mesh(new RoundedBoxGeometry(0.042, 0.009 * S.browW, 0.01, 2, 0.004), M(S.brows, { roughness: 0.8 }), s * 0.04, 0.077, 0.1); head.add(br); eyes.push(br);
  }
  const brows = eyes.filter((_, i) => i % 2 === 1);
  const mouth = mesh(new THREE.TorusGeometry(0.022, 0.005, 8, 20, Math.PI), M('#9a4a45', { roughness: 0.4 }), 0, -0.028, 0.093); mouth.rotation.z = Math.PI; head.add(mouth);
  const mouthIn = mesh(new THREE.SphereGeometry(0.018, 16, 10), M('#3a1412'), 0, -0.03, 0.089); mouthIn.scale.set(1.1, 0.05, 0.5); head.add(mouthIn);
  // hair / headwear / facial hair
  const hairG = new THREE.Group(); head.add(hairG);
  if (S.hair === 'bald_fringe') { const fg = new THREE.TorusGeometry(0.1, 0.024, 10, 40, Math.PI * 1.15); fg.rotateZ(Math.PI * 0.925); fg.rotateX(Math.PI / 2);
    const f = mesh(fg, hairM, 0, 0.035, -0.008); f.scale.set(0.95, 1.6, 1.05); hairG.add(f); }
  if (S.hair === 'slick' || S.hair === 'short' || S.hair === 'swoop') {
    const cap = mesh(new THREE.SphereGeometry(0.1235, 40, 20, 0, Math.PI * 2, 0, S.hair === 'short' ? 1.25 : 1.35), hairM, 0, 0.047, -0.004); cap.scale.set(0.93, 1.1, 1.0);
    cap.rotation.x = S.hair === 'slick' ? -0.5 : -0.42; hairG.add(cap);
    if (S.hair === 'slick') { const back = mesh(new THREE.SphereGeometry(0.11, 24, 16), hairM, 0, 0.07, -0.03); back.scale.set(0.95, 1.0, 1.0); hairG.add(back); }
    if (S.hair === 'swoop') {
      const sw = mesh(new THREE.SphereGeometry(0.105, 30, 20), hairM, 0.008, 0.13, 0.025); sw.scale.set(1.12, 0.42, 1.08); sw.rotation.set(0.18, 0, -0.1); hairG.add(sw);
      const fr = mesh(new THREE.SphereGeometry(0.05, 20, 14), hairM, -0.03, 0.125, 0.085); fr.scale.set(1.7, 0.55, 0.8); fr.rotation.z = 0.2; hairG.add(fr);
      for (const s of [-1, 1]) { const sd = mesh(new THREE.SphereGeometry(0.06, 20, 14), hairM, s * 0.09, 0.08, -0.02); sd.scale.set(0.55, 0.9, 1.1); hairG.add(sd); }
    }
  }
  if (S.headwear === 'turban') { const tw = M(S.headwearColor, { roughness: 0.8, sheen: 0.6 });
    for (let i = 0; i < 4; i++) { const t = mesh(new THREE.TorusGeometry(0.105 - i * 0.012, 0.035, 12, 40), tw, 0, 0.1 + i * 0.03, -0.005); t.rotation.x = Math.PI / 2 + 0.12; t.scale.set(1, 1.06, 1); hairG.add(t); }
    const top = mesh(new THREE.SphereGeometry(0.08, 24, 14), tw, 0, 0.18, -0.01); top.scale.set(1.1, 0.7, 1.15); hairG.add(top); }
  if (S.headwear === 'beret') { const b = mesh(new THREE.SphereGeometry(0.128, 32, 16), M(S.headwearColor, { roughness: 0.9 }), -0.018, 0.13, -0.004); b.scale.set(1.0, 0.42, 1.05); b.rotation.z = 0.22; hairG.add(b);
    const band = mesh(new THREE.TorusGeometry(0.108, 0.01, 8, 32), M('#0a0a0a'), 0, 0.105, -0.006); band.rotation.x = Math.PI / 2; hairG.add(band); }
  if (S.headwear === 'cap') { const c = mesh(new THREE.CylinderGeometry(0.125, 0.12, 0.06, 32), M(S.headwearColor), 0, 0.15, 0.0); hairG.add(c);
    const v = mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.01, 24, 1, false, 0, Math.PI), M('#111'), 0, 0.125, 0.07); v.rotation.y = Math.PI / 2; hairG.add(v); }
  if (S.beard === 'full') { const bm = M(S.beardColor, { roughness: 0.9, sheen: 0.8 });
    const b = mesh(new THREE.SphereGeometry(0.092, 30, 20), bm, 0, -0.075, 0.03); b.scale.set(1.0, 1.45, 0.9); head.add(b);
    const sides = mesh(new THREE.TorusGeometry(0.083, 0.03, 10, 30, Math.PI), bm, 0, -0.005, 0.0); sides.rotation.set(0, 0, Math.PI); sides.scale.set(1, 1.1, 1.05); head.add(sides); }
  if (S.mustache) { const m = mesh(new THREE.CapsuleGeometry(0.012, 0.05, 6, 12), M(S.mustacheColor, { roughness: 0.85 }), 0, -0.012, 0.102); m.rotation.z = Math.PI / 2; m.scale.set(1, 1, 0.7); head.add(m); }
  if (S.glasses === 'sun') for (const s of [-1, 1]) { const g = mesh(new RoundedBoxGeometry(0.05, 0.03, 0.008, 2, 0.008), M('#050505', { roughness: 0.05, clearcoat: 1 }), s * 0.038, 0.052, 0.108); head.add(g); }
  root.traverse((o) => { if (o.isMesh) o.castShadow = true; });
  const F = { group: root, body, head, AL, AR, spec: S, skinMat: skin, clothMat: cloth,
    pose(p = {}) {
      const [lf, ls] = p.armL || [0, 0.08], [rf, rs] = p.armR || [0, 0.08];
      AL.sh.rotation.set(-lf, 0, ls); AR.sh.rotation.set(-rf, 0, -rs);
      AL.el.rotation.set(-(p.elbowL ?? 0.15), 0, 0); AR.el.rotation.set(-(p.elbowR ?? 0.15), 0, 0);
      const h = p.head || [0, 0, 0]; head.rotation.set(h[0], h[1], h[2]); body.rotation.x = p.lean || 0;
      const sm = p.mouth || 0; mouth.rotation.z = sm >= 0 ? Math.PI : 0; mouth.position.y = sm >= 0 ? -0.024 : -0.036; mouth.scale.set(1, Math.max(0.15, Math.abs(sm)), 1);
      mouthIn.scale.y = 0.05 + 0.9 * (p.talk || 0); mouthIn.position.y = -0.03 - 0.006 * (p.talk || 0);
      const b = p.brow || 0; brows.forEach((br, i) => { br.rotation.z = (i ? -1 : 1) * -0.35 * b * -1; br.position.y = 0.077 + 0.007 * b; });
      lids.forEach((l) => { l.rotation.x = -1.15 + 1.1 * (p.blink || 0) + (S.age ? 0.25 : 0); });
    },
  };
  F.pose({});
  return F;
}

/** standard blink: returns 0..1 for time t (a quick blink every ~3.3 s, offset by seed) */
export const blink = (t, seed = 0) => { const p = (t + seed * 1.7) % 3.3; return p < 0.12 ? Math.sin(p / 0.12 * Math.PI) : 0; };

/** crowd of simple figurines (instanced): bodies, heads, raised fists, optional signs. C.update(t, energy 0..1) */
export function crowd(n = 120, { w = 6, d = 3, palette = ['#3b3f48', '#5a4a3a', '#2c3a4a', '#6a5a4a', '#283038', '#4a3a3a'], skin = ['#c99a78', '#b88a6a', '#d8ac8a'], signs = 0, signColor = '#f2efe8', seed = 1 } = {}) {
  const g = new THREE.Group(), rnd = (s) => { const x = Math.sin(s * 91.7 + seed * 13.1) * 43758.5453; return x - Math.floor(x); };
  const bodyG = new THREE.CapsuleGeometry(0.2, 0.9, 4, 12), headG = new THREE.SphereGeometry(0.12, 16, 12), armG = new THREE.CapsuleGeometry(0.05, 0.42, 4, 8);
  const bodies = new THREE.InstancedMesh(bodyG, M('#ffffff', { roughness: 0.8 }), n), heads = new THREE.InstancedMesh(headG, M('#ffffff', { roughness: 0.6 }), n),
    arms = new THREE.InstancedMesh(armG, M('#ffffff', { roughness: 0.8 }), n);
  const P = Array.from({ length: n }, (_, i) => ({ x: (rnd(i) - 0.5) * w, z: (rnd(i + 50) - 0.5) * d, ph: rnd(i + 9) * 6.28, h: 0.92 + rnd(i + 3) * 0.16, up: rnd(i + 7) < 0.6 }));
  P.forEach((p, i) => { bodies.setColorAt(i, new THREE.Color(palette[i % palette.length])); heads.setColorAt(i, new THREE.Color(skin[i % skin.length])); arms.setColorAt(i, new THREE.Color(palette[i % palette.length])); });
  [bodies, heads, arms].forEach((m) => { m.castShadow = true; m.instanceColor.needsUpdate = true; g.add(m); });
  const signMesh = signs ? new THREE.InstancedMesh(new THREE.BoxGeometry(0.5, 0.32, 0.02), M(signColor, { roughness: 0.9 }), signs) : null; if (signMesh) g.add(signMesh);
  const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), v = new THREE.Vector3(), one = new THREE.Vector3(1, 1, 1), sc = new THREE.Vector3();
  const C = { group: g, update(t, energy = 0.5) {
    P.forEach((p, i) => { const jump = Math.max(0, Math.sin(t * 7 + p.ph)) * 0.06 * energy, y = jump;
      bodies.setMatrixAt(i, m4.compose(v.set(p.x, 0.65 * p.h + y, p.z), q.identity(), sc.set(1, p.h, 1)));
      heads.setMatrixAt(i, m4.compose(v.set(p.x, 1.38 * p.h + y, p.z), q.identity(), one));
      const raise = p.up ? energy : 0, wave = Math.sin(t * 6 + p.ph) * 0.3 * energy;
      e.set(0, 0, -(0.2 + raise * 2.6 + wave * raise)); q.setFromEuler(e);
      arms.setMatrixAt(i, m4.compose(v.set(p.x + 0.22 + 0.15 * raise, (1.05 + 0.3 * raise) * p.h + y, p.z), q, one));
      if (signMesh && i < signs) { e.set(0, 0, wave * 0.3); q.setFromEuler(e); signMesh.setMatrixAt(i, m4.compose(v.set(p.x, 2.0 * p.h + y + 0.1 * energy, p.z + 0.05), q, one)); }
    });
    [bodies, heads, arms].forEach((m) => (m.instanceMatrix.needsUpdate = true)); if (signMesh) signMesh.instanceMatrix.needsUpdate = true;
  } };
  C.update(0, 0);
  return C;
}
