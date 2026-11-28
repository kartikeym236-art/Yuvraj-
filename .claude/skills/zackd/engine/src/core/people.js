// Stylised clay-figurine people (~1.75 m, feet at y = 0, facing +z). Recognisable by silhouette (hair, headwear, beard,
// outfit, props), deliberately NOT photoreal likenesses. figure(spec) -> F; F.pose({...}) each frame.
//   spec: { skin, outfit: 'suit'|'uniform'|'robe'|'casual', suit, trousers, shirt, tie, hair: 'bald_fringe'|'slick'|'short'|'swoop'|'none',
//           hairColor, beard: 'full'|null, beardColor, mustache, mustacheColor, headwear: 'turban'|'beret'|'cap'|null, headwearColor,
//           nose (scale), ears (scale), brows (color), browW, width (body), glasses: 'sun'|null, medals, sash, epaulettes, buttons }
//   F.pose({ armL: [fwd, side], armR: [fwd, side], elbowL, elbowR, head: [x, y, z], lean, mouth (-1 frown .. 1 smile), talk 0..1,
//            brow (-1 angry .. 1 raised), blink 0..1 })
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { buildHead } from './head.js';

const M = (color, o = {}) => new THREE.MeshPhysicalMaterial({ color, roughness: 0.55, clearcoat: 0.15, sheen: 0.3, sheenColor: new THREE.Color('#ffffff'), ...o });
const mesh = (g, m, x = 0, y = 0, z = 0) => { const o = new THREE.Mesh(g, m); o.position.set(x, y, z); o.castShadow = true; o.receiveShadow = true; return o; };

export const PRESETS = {
  mosaddegh: { face: { faceLen: 1.16, jaw: 0.82, chin: 0.8, nose: 1.85, noseW: 1.05, hook: 1.1, brow: 0.8, cheek: 0.7, lips: 0.7, eyes: 0.95, droop: 0.7, age: 1, ears: 1.15 }, eyeColor: '#3a2618', skin: '#d8b096', outfit: 'suit', suit: '#6d7077', trousers: '#5d6067', shirt: '#f2efe8', tie: '#3a3d45', hair: 'bald_fringe', hairColor: '#cfcac4',
    nose: 1.7, ears: 1.15, brows: '#8d8780', browW: 1, width: 0.9, age: 1 },
  shah: { face: { faceLen: 1.1, jaw: 1.0, chin: 1.1, nose: 1.5, noseW: 0.95, hook: 0.9, brow: 1.2, cheek: 0.9, lips: 0.8, eyes: 0.95, age: 0.3, hairline: 0.62, recede: 0.35, hairSide: 0.12, hairT: 0.07 }, skin: '#d9b08f', outfit: 'uniform', suit: '#d9cfb8', trousers: '#cfc5ad', hair: 'slick', hairColor: '#2a241f', nose: 1.35, brows: '#2a241f',
    medals: true, sash: '#2e5fb0', epaulettes: '#d9a93b', buttons: '#d9a93b', width: 1 },
  khomeini: { face: { faceLen: 1.12, jaw: 0.95, chin: 1, nose: 1.35, noseW: 1.0, hook: 0.6, brow: 1.6, cheek: 0.9, lips: 0.8, eyes: 0.9, droop: 0.6, age: 0.9 }, skin: '#cfa587', outfit: 'robe', suit: '#1d1c1f', trousers: '#3b3128', shirt: '#4a3a2c', hair: 'none', headwear: 'turban', headwearColor: '#161517',
    beard: 'full', beardColor: '#dcd8d2', mustache: true, mustacheColor: '#cfcac3', brows: '#2f2b28', browW: 2.2, nose: 1.25, width: 1 },
  saddam: { face: { faceLen: 1.0, jaw: 1.15, chin: 1.0, nose: 1.25, noseW: 1.15, brow: 1.3, cheek: 1.15, lips: 1.0, eyes: 0.95, age: 0.3, hairline: 0.55, hairT: 0.05, stubble: 0.35 }, mustacheW: 1.35, skin: '#c99876', outfit: 'uniform', suit: '#5b6243', trousers: '#545b3d', hair: 'short', hairColor: '#1b1816', headwear: 'beret', headwearColor: '#121212',
    mustache: true, mustacheColor: '#141210', brows: '#141210', browW: 1.3, nose: 1.2, epaulettes: '#8a8f6a', buttons: '#c9a64a', width: 1.08 },
  obama: { face: { faceLen: 1.08, jaw: 0.95, chin: 1.0, nose: 0.85, noseW: 1.3, lips: 1.15, cheek: 0.9, ears: 1.35, eyes: 1.0, hairline: 0.64, recede: 0.18, hairSide: 0.1, hairT: 0.025 }, skin: '#8a5c40', outfit: 'suit', suit: '#2c3038', trousers: '#2a2e35', shirt: '#f4f5f7', tie: '#6e9ad0', hair: 'short', hairColor: '#4b4743',
    ears: 1.3, nose: 1.05, brows: '#2a2522', width: 0.92, pin: true },
  trump: { face: { faceLen: 1.0, jaw: 1.2, chin: 0.85, cheek: 1.4, nose: 0.85, noseW: 1.1, lips: 0.7, eyes: 0.8, droop: 0.3, age: 0.85, hairline: 0.48, hairT: 0.08, ears: 1.05 }, eyeColor: '#4a6a8a', skin: '#e9a67e', outfit: 'suit', suit: '#1f2a44', trousers: '#1d273f', shirt: '#ffffff', tie: '#c81e2b', tieLong: true, hair: 'swoop', hairColor: '#e7c983',
    nose: 1.05, brows: '#d6b77a', width: 1.18, pin: true },
  agent: { face: { stubble: 0.2 }, skin: '#e0b597', outfit: 'suit', suit: '#17191d', trousers: '#17191d', shirt: '#ffffff', tie: '#17191d', hair: 'short', hairColor: '#3a2e26', glasses: 'sun', width: 1 },
  british: { face: { nose: 1.2, age: 0.4 }, skin: '#e8c3a6', outfit: 'suit', suit: '#3e4a3a', trousers: '#3a4436', shirt: '#f4f1ea', tie: '#7a1f2a', hair: 'short', hairColor: '#8a6a4a', mustache: true,
    mustacheColor: '#7a5a3c', headwear: 'cap', headwearColor: '#2f3a2c', width: 1.02 },
  student: { face: { stubble: 0.5 }, skin: '#cfa284', outfit: 'casual', suit: '#6b7f9a', trousers: '#3b3f48', hair: 'short', hairColor: '#1d1916', mustache: true, mustacheColor: '#1d1916', width: 0.95 },
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
    : [[0.001, 0.86], [0.19, 0.86], [0.195, 1.0], [0.21, 1.25], [0.205, 1.4], [0.13, 1.49], [0.001, 1.51]];
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
  const arm = (s) => { const sh = new THREE.Group(); sh.position.set(s * 0.232 * W, 1.41, 0); body.add(sh);
    sh.add(mesh(new THREE.CapsuleGeometry(0.056 * W, 0.26, 6, 14), robe ? cloth : cloth, 0, -0.17, 0));
    const el = new THREE.Group(); el.position.y = -0.33; sh.add(el);
    el.add(mesh(new THREE.CapsuleGeometry(0.05 * W, 0.22, 6, 14), cloth, 0, -0.13, 0));
    const hand = mesh(new THREE.SphereGeometry(0.052, 16, 12), skin, 0, -0.3, 0); hand.scale.set(0.85, 1.1, 0.7); el.add(hand);
    return { sh, el, hand }; };
  const AL = arm(1), AR = arm(-1);              // L = figure's left (+x)
  // head
  const neck = mesh(new THREE.CylinderGeometry(0.058, 0.066, 0.12, 20), skin, 0, 1.52, 0); body.add(neck);
  const head = new THREE.Group(); head.position.set(0, 1.635, 0.008); body.add(head);
  const HD = buildHead(S); head.add(HD.group);
  const hs = S.headScale || 1.12, TOP = 0.105 * 0.9 * hs, HWs = 0.076 * hs * 1.06, HDs = 0.094 * hs * 1.06, EY = 0.15 * 0.105 * 0.9 * hs;
  const hairG = new THREE.Group(); head.add(hairG);
  if (S.headwear === 'turban') { const tw = M(S.headwearColor, { roughness: 0.85, sheen: 0.7, clearcoat: 0 });
    for (let i = 0; i < 3; i++) { const t = mesh(new THREE.TorusGeometry(HWs * (0.98 - i * 0.1), 0.024, 14, 56), tw, 0, TOP * (0.86 + i * 0.16), -0.016 - i * 0.004);
      t.rotation.set(Math.PI / 2 + 0.22 - i * 0.05, 0, (i % 2 ? 0.06 : -0.06)); t.scale.set(1, HDs / HWs * 1.06, 1); hairG.add(t); }
    const top = mesh(new THREE.SphereGeometry(HWs * 0.95, 40, 20), tw, 0, TOP * 1.12, -0.018); top.scale.set(1.04, 0.5, HDs / HWs * 1.02); hairG.add(top);
    const fold = mesh(new THREE.TorusGeometry(HWs * 0.7, 0.011, 10, 40, Math.PI), tw, 0, TOP * 1.12, HDs * 0.2); fold.rotation.set(-0.9, 0, 0.3); hairG.add(fold); }
  if (S.headwear === 'beret') { const bm = M(S.headwearColor, { roughness: 0.95, sheen: 0.4, clearcoat: 0 });
    const b = mesh(new THREE.SphereGeometry(HWs * 1.12, 40, 20), bm, -0.016, TOP * 0.8, -0.008); b.scale.set(1.0, 0.36, HDs / HWs * 1.04); b.rotation.set(-0.06, 0, 0.26); hairG.add(b);
    const badge = mesh(new THREE.SphereGeometry(0.008, 12, 8), M('#d8b040', { metalness: 1, roughness: 0.3 }), -0.025, TOP * 0.74, HDs * 1.0); badge.scale.set(1, 1.3, 0.4); hairG.add(badge); }
  if (S.headwear === 'cap') { const c = mesh(new THREE.CylinderGeometry(HWs * 1.12, HWs * 1.05, 0.05, 40), M(S.headwearColor), 0, TOP * 0.82, -0.004); c.scale.z = HDs / HWs; hairG.add(c);
    const v = mesh(new THREE.CylinderGeometry(HWs * 0.8, HWs * 0.8, 0.006, 24, 1, false, 0, Math.PI), M('#111'), 0, TOP * 0.62, HDs * 0.85); v.rotation.y = Math.PI / 2; v.rotation.x = 0.2; hairG.add(v); }
  if (S.glasses === 'sun') for (const s2 of [-1, 1]) { const g = mesh(new RoundedBoxGeometry(0.036, 0.022, 0.004, 2, 0.006), M('#050505', { roughness: 0.05, clearcoat: 1 }), s2 * 0.345 * HWs, EY, HDs * 0.93); head.add(g); }
  // shirt collar for suits
  if (S.outfit === 'suit') { const col = mesh(new THREE.CylinderGeometry(0.068, 0.074, 0.035, 24, 1, true), M(S.shirt, { side: THREE.DoubleSide })); col.position.y = 1.5; body.add(col); }
  root.traverse((o) => { if (o.isMesh) o.castShadow = true; });
  const F = { group: root, body, head, HD, AL, AR, spec: S, skinMat: skin, clothMat: cloth,
    pose(p = {}) {
      const [lf, ls] = p.armL || [0, 0.08], [rf, rs] = p.armR || [0, 0.08];
      AL.sh.rotation.set(-lf, 0, ls); AR.sh.rotation.set(-rf, 0, -rs);
      AL.el.rotation.set(-(p.elbowL ?? 0.15), 0, 0); AR.el.rotation.set(-(p.elbowR ?? 0.15), 0, 0);
      const h = p.head || [0, 0, 0]; head.rotation.set(h[0], h[1], h[2]); body.rotation.x = p.lean || 0;
      HD.setTalk(p.talk || 0); HD.setBrow(p.brow || 0); HD.setBlink(p.blink || 0); HD.setLook(...(p.look || [0, 0]));
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
