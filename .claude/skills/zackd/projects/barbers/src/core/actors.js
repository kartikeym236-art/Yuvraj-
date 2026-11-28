// Realistic rigged people (the reference look: real-proportioned humans that act, not figurines).
// Models in assets/models/people/ all share the Mixamo skeleton (readyplayer.me without the "mixamorig:" prefix), so every
// clip works on every body: Xbot gives idle / walk / run / agree / headShake / sad_pose / sneak_pose, Soldier gives
// Idle / Walk / Run, Michelle gives SambaDance.
//
//   PRELOAD.models = { ...ACTOR_MODELS }                     (or only the ones you use)
//   const man = actor('rpm', { shirt: '#2b5fd9', pants: '#30343c', skin: 1.0 });  scene.add(man.group)
//   in draw(): man.play('idle', lt)  /  man.blend('idle', 'agree', k, lt)  then  man.pose({ head:[x,y,z], armR:[...], ... })
//              man.talk(k) (mouth, rpm only)  man.lookAt(worldPoint, k)
// Everything is a pure function of time: play() sets the clip time directly, no mixer state carries between frames.
import * as THREE from 'three';
import * as SkeletonUtils from 'three/addons/utils/SkeletonUtils.js';
import { A } from './assets.js';

export const ACTOR_MODELS = {
  rpm: 'assets/models/people/readyplayer.me.glb',      // realistic man: beard, shirt, trousers, shoes; mouthOpen/mouthSmile morphs
  michelle: 'assets/models/people/Michelle.glb',      // realistic woman, casual clothes
  soldier: 'assets/models/people/Soldier.glb',        // armoured soldier (police / army stand-in)
  xbot: 'assets/models/people/Xbot.glb',              // mannequin; mostly the animation library
};
const CLIP_SRC = ['xbot', 'soldier', 'michelle'];

// clip library: name -> { clip (bone names canonical, rotations + Hips position only), src (model key) }
let LIB = null;
function clipLib() {
  if (LIB) return LIB; LIB = {};
  for (const k of CLIP_SRC) for (const c of A.models[k]?.animations || []) {
    const name = c.name.toLowerCase(); if (LIB[name] || name === 'tpose') continue;
    const cc = c.clone(); cc.tracks.forEach((t) => (t.name = t.name.replace(/^mixamorig:?/, '')));
    cc.tracks = cc.tracks.filter((t) => t.name.endsWith('.quaternion') || t.name === 'Hips.position');
    LIB[name] = { clip: cc, src: k };
  }
  return LIB;
}

const canon = (n) => n.replace(/^mixamorig:?/, '');

/** rest data of a skeleton, measured relative to its own root: per bone the parent's world rotation and the bone's own */
function restInfo(root) {
  root.updateMatrixWorld(true); const inv = new THREE.Matrix4().copy(root.matrixWorld).invert(), rinv = new THREE.Quaternion();
  root.getWorldQuaternion(rinv); rinv.invert();
  const bones = {}, info = {};
  root.traverse((o) => { if (o.isBone) { o.name = canon(o.name); bones[o.name] = o; } });
  for (const [n, b] of Object.entries(bones)) {
    const pw = new THREE.Quaternion(); b.parent.getWorldQuaternion(pw); pw.premultiply(rinv);
    const pos = new THREE.Vector3(); b.getWorldPosition(pos); pos.applyMatrix4(inv);
    const pm = new THREE.Matrix4().copy(inv).multiply(b.parent.matrixWorld);   // parent space -> root space
    info[n] = { P: pw, r: b.quaternion.clone(), pos, pm, pmInv: pm.clone().invert() };
  }
  return { bones, info };
}

export function actor(model = 'rpm', { shirt, pants, shoes, skin = 1, hat = false, scale = 1, shadows = true } = {}) {
  const src = A.models[model]; if (!src) throw new Error(`actor: PRELOAD.models.${model} missing`);
  const group = new THREE.Group(), root = SkeletonUtils.clone(src.scene); group.add(root); root.scale.multiplyScalar(scale);
  const morphs = [];
  root.traverse((o) => {
    if (o.isMesh) {
      o.castShadow = shadows; o.receiveShadow = true; o.frustumCulled = false;
      o.material = o.material.clone(); const n = o.material.name.toLowerCase();
      if (shirt && /top|body_?mat|ch03/.test(n) && !/skin/.test(n)) o.material.color.set(shirt);
      if (pants && /bottom/.test(n)) o.material.color.set(pants);
      if (shoes && /footwear/.test(n)) o.material.color.set(shoes);
      if (/skin|wolf3d_body/.test(n)) o.material.color.setScalar(skin);
      if (/headwear/.test(n)) o.visible = hat;
      if (o.morphTargetDictionary) morphs.push(o);
      o.material.envMapIntensity = 0.8;
    }
  });
  const T = restInfo(root), bones = T.bones, hips = bones.Hips;
  // one hidden driver skeleton per clip source; its pose is mapped onto this body through the rest offsets:
  //   q_target = (P_T^-1 P_S) q_source (r_S^-1 P_S^-1 P_T r_T)
  const drivers = {};
  const driver = (k) => { if (drivers[k]) return drivers[k];
    const dr = SkeletonUtils.clone(A.models[k].scene), S = restInfo(dr), map = {};
    for (const n of Object.keys(T.bones)) { const s = S.info[n], t = T.info[n]; if (!s) continue;
      map[n] = { L: t.P.clone().invert().multiply(s.P), R: s.r.clone().invert().multiply(s.P.clone().invert()).multiply(t.P).multiply(t.r) }; }
    const hs = S.info.Hips.pos.y, ht = T.info.Hips.pos.y;
    return (drivers[k] = { root: dr, S, map, mixer: new THREE.AnimationMixer(dr), actions: {}, ratio: ht / hs }); };
  const sample = (name, t, inPlace) => {               // pose of clip `name` at time t, as target-local quaternions + hips position
    const L = clipLib()[name.toLowerCase()]; if (!L) throw new Error('no clip ' + name + ' (have: ' + Object.keys(clipLib()) + ')');
    const D = driver(L.src); D.mixer.stopAllAction();
    const ac = D.actions[name] || (D.actions[name] = D.mixer.clipAction(L.clip, D.root)); ac.reset().play(); D.mixer.setTime(Math.max(0, t));
    const out = {};
    for (const [n, m] of Object.entries(D.map)) out[n] = m.L.clone().multiply(D.S.bones[n].quaternion).multiply(m.R);
    // hips: driver hips position in its root space, scaled to this body, into this body's hips-parent space
    const hp = D.S.bones.Hips.position.clone().applyMatrix4(D.S.info.Hips.pm).multiplyScalar(D.ratio);
    if (inPlace) { hp.x = T.info.Hips.pos.x; hp.z = T.info.Hips.pos.z; }
    out.__hips = hp.applyMatrix4(T.info.Hips.pmInv);
    return out;
  };
  const rest = Object.fromEntries(Object.entries(bones).map(([k, b]) => [k, b.quaternion.clone()]));
const q = new THREE.Quaternion(), e = new THREE.Euler();
  const rot = (b, x = 0, y = 0, z = 0) => { if (!bones[b]) return; e.set(x, y, z); q.setFromEuler(e); bones[b].quaternion.multiply(q); };

  const F = {
    group, root, bones, clips: () => Object.keys(clipLib()),
    /** one clip at clip-time t (seconds, loops); inPlace keeps walking/running on the spot (move the group yourself) */
    play(name, t, { inPlace = true, speed = 1, relax = 0.32 } = {}) { return F.blend(name, null, 0, t, { inPlace, speed, relax }); },
    /** cross-fade clip a -> b by k (0..1) */
    blend(a, b, k, t, { inPlace = true, speed = 1, relax = 0.32 } = {}) {
      Object.entries(rest).forEach(([n, r]) => bones[n].quaternion.copy(r));
      const pa = sample(a, t * speed, inPlace), pb = b && k > 0 ? sample(b, t * speed, inPlace) : null;
      for (const n of Object.keys(pa)) { if (n === '__hips') continue; bones[n].quaternion.copy(pa[n]); if (pb && pb[n]) bones[n].quaternion.slerp(pb[n], k); }
      hips.position.copy(pa.__hips); if (pb) hips.position.lerp(pb.__hips, k);
      if (relax) F.grip('R', relax, { thumb: 0.3 }).grip('L', relax, { thumb: 0.3 });   // idle clips leave hands splayed - soften them
      return F;
    },
    /** extra bone rotations on top of the clip (radians, local axes of Mixamo bones):
     *  head [nod down +x, turn +y, tilt +z], spine [lean fwd +x, twist +y, side +z],
     *  armL/armR [x, y, z] (shoulder joint), foreL/foreR [x, y, z] (elbow), handL/handR */
    pose({ head, neck, spine, armL, armR, foreL, foreR, handL, handR, legL, legR, kneeL, kneeR, footL, footR, hipsDown = 0, hipsFwd = 0 } = {}) {
      if (legL) rot('LeftUpLeg', ...legL); if (legR) rot('RightUpLeg', ...legR);
      if (kneeL) rot('LeftLeg', ...kneeL); if (kneeR) rot('RightLeg', ...kneeR);
      if (footL) rot('LeftFoot', ...footL); if (footR) rot('RightFoot', ...footR);
      if (hipsDown || hipsFwd) { const p = hips.parent.worldToLocal(hips.getWorldPosition(new THREE.Vector3()).add(new THREE.Vector3(0, -hipsDown, hipsFwd).applyQuaternion(group.quaternion))); hips.position.copy(p); }
      if (spine) { rot('Spine', ...spine.map((v) => v / 3)); rot('Spine1', ...spine.map((v) => v / 3)); rot('Spine2', ...spine.map((v) => v / 3)); }
      if (neck) rot('Neck', ...neck); if (head) rot('Head', ...head);
      if (armL) rot('LeftArm', ...armL); if (armR) rot('RightArm', ...armR);
      if (foreL) rot('LeftForeArm', ...foreL); if (foreR) rot('RightForeArm', ...foreR);
      if (handL) rot('LeftHand', ...handL); if (handR) rot('RightHand', ...handR);
      return F;
    },
    /** turn the head (and a little of the neck/spine) toward a world point, k = 0..1 */
    lookAt(p, k = 1) {
      group.updateMatrixWorld(true); const h = bones.Head, hp = new THREE.Vector3(); h.getWorldPosition(hp);
      const d = p.clone().sub(hp); const gq = new THREE.Quaternion(); group.getWorldQuaternion(gq); d.applyQuaternion(gq.invert());
      const yaw = Math.atan2(d.x, d.z), pitch = -Math.atan2(d.y, Math.hypot(d.x, d.z));
      rot('Neck', pitch * 0.3 * k, yaw * 0.35 * k, 0); rot('Head', pitch * 0.6 * k, yaw * 0.55 * k, 0); return F;
    },
    /** mouth open 0..1 (rpm has a mouthOpen morph; others nod the jaw-less head slightly) */
    /** sitting on a seat of height `seat` (m): thighs forward, knees bent, hips lowered. k blends stand -> sit */
    sit(k = 1, { seat = 0.5, spread = 0.12 } = {}) {
      group.updateMatrixWorld(true); const hy = T.info.Hips.pos.y;
      F.pose({ legL: [-1.5 * k, 0, -spread * k], legR: [-1.5 * k, 0, spread * k], kneeL: [1.5 * k, 0, 0], kneeR: [1.5 * k, 0, 0], hipsDown: (hy - seat - 0.05) * k, hipsFwd: 0 });
      return F;
    },
    /** curl the fingers of 'L' / 'R' hand by k (0 open .. 1 fist); thumb k2. axis: local curl axis of Mixamo finger bones */
    grip(side = 'R', k = 1, { thumb = 0.6, axis = 'z' } = {}) {
      const S = side === 'L' ? 'Left' : 'Right', sg = (side === 'L' ? 1 : -1) * (axis === 'x' ? -1 : 1);
      for (const f of ['Index', 'Middle', 'Ring', 'Pinky']) for (let j = 1; j <= 3; j++) {
        const a = k * (j === 1 ? 1.0 : 1.2) * sg; rot(`${S}Hand${f}${j}`, axis === 'x' ? a : 0, 0, axis === 'z' ? a : 0); }
      for (let j = 1; j <= 3; j++) rot(`${S}HandThumb${j}`, 0, thumb * 0.5 * -sg, 0);
      return F;
    },
    /** hair grown as a shell from the head mesh (fits + follows the head exactly). style 'neat' | 'messy' | 'short' | null */
    hair(style = 'neat', { color = '#2a1d15', seed = 1 } = {}) {
      if (F._hair) { F._hair.parent.remove(F._hair); F._hair = null; } if (!style) return F;
      F._hair = hairShell(root, style, color, seed); return F;
    },
    /** show / hide parts by mesh name fragment, e.g. part('Beard', false), part('Headwear', false) */
    part(name, on) { root.traverse((o) => { if (o.isMesh && o.name.toLowerCase().includes(name.toLowerCase())) o.visible = on; }); return F; },
    talk(k, smile = 0) {
      morphs.forEach((m) => { const d = m.morphTargetDictionary; if (d.mouthOpen !== undefined) m.morphTargetInfluences[d.mouthOpen] = k; if (d.mouthSmile !== undefined) m.morphTargetInfluences[d.mouthSmile] = smile; });
      return F;
    },
    /** world position of a bone (e.g. 'RightHand' to attach a prop, 'Head' for a thought bubble) */
    at(b) { group.updateMatrixWorld(true); return bones[b].getWorldPosition(new THREE.Vector3()); },
  };
  F.play('idle', 0); return F;
}

let STRAND = null;
function strandTex() {                       // fine hair streaks for the bump map (head UV space, repeated)
  if (STRAND) return STRAND; const W = 512, c = document.createElement('canvas'); c.width = c.height = W; const x = c.getContext('2d');
  x.fillStyle = '#808080'; x.fillRect(0, 0, W, W);
  for (let i = 0; i < 2600; i++) { const px = (Math.sin(i * 91.7) * 0.5 + 0.5) * W, py = (Math.sin(i * 37.3) * 0.5 + 0.5) * W, l = 30 + (i % 50);
    x.strokeStyle = i % 2 ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)'; x.lineWidth = 1 + (i % 3) * 0.5; x.beginPath(); x.moveTo(px, py); x.lineTo(px + l * 0.15, py + l); x.stroke(); }
  STRAND = new THREE.CanvasTexture(c); STRAND.wrapS = STRAND.wrapT = THREE.RepeatWrapping; STRAND.repeat.set(4, 4); return STRAND;
}
function hairShell(root, style, color, seed) {
  let head = null; root.traverse((o) => { if (o.isSkinnedMesh && /head/i.test(o.name) && !head) head = o; });
  if (!head) return null;
  const sk = head.skeleton, hi = sk.bones.findIndex((b) => /head$/i.test(b.name)), M = new THREE.Matrix4().copy(sk.boneInverses[hi]).multiply(head.bindMatrix);
  const g = head.geometry, P = g.attributes.position, N = g.attributes.normal, n = P.count, L = [], v = new THREE.Vector3();
  let mn = new THREE.Vector3(1e9, 1e9, 1e9), mx = new THREE.Vector3(-1e9, -1e9, -1e9);
  for (let i = 0; i < n; i++) { v.fromBufferAttribute(P, i).applyMatrix4(M); L.push(v.clone()); mn.min(v); mx.max(v); }
  const rnd = (i) => { const x = Math.sin(i * 12.9898 + seed * 78.233) * 43758.5453; return x - Math.floor(x); };
  const noise = (p, f) => Math.sin(p.x * f + seed) * Math.sin(p.y * f * 1.3 + 2 * seed) * Math.sin(p.z * f * 0.9 + 3);
  const sm = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
  const H = mx.y - mn.y, cz = (mx.z + mn.z) / 2, Dz = (mx.z - mn.z) / 2, cx = (mx.x + mn.x) / 2, Wx = (mx.x - mn.x) / 2;
  const mask = new Float32Array(n), off = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const p = L[i], u = (p.y - mn.y) / H, f = (p.z - cz) / Dz, s = Math.abs(p.x - cx) / Wx;      // u: chin 0 .. crown 1, f: back -1 .. front 1
    // hairline: high at the forehead, lower over the temples, down to the nape at the back, clear of the ears
    const line = 0.84 * sm(-0.2, 0.75, f) + 0.64 * (1 - sm(-0.2, 0.75, f)) - 0.2 * sm(-0.1, -0.9, f) - 0.05 * sm(0.5, 0.95, f) * sm(0.55, 0.2, s) + (style === 'messy' ? -0.03 : 0);
    let m = sm(line - 0.035, line + 0.045, u);
    if (s > 0.82 && u < 0.66 && f > -0.55) m *= 1 - sm(0.82, 0.92, s);                       // ears
    if (style === 'messy') m *= 0.55 + 0.45 * sm(-0.3, 0.2, noise(p, 60));                    // patchy
    mask[i] = m;
    const top = sm(line, 1, u);
    if (style === 'neat') off[i] = (0.006 + 0.012 * top - 0.004 * sm(0.75, 0.9, s) * (1 - top) - (Math.abs(p.x - cx - Wx * 0.32) < Wx * 0.03 && f > -0.2 && u > 0.8 ? 0.004 : 0)) * m;
    else if (style === 'short') off[i] = (0.004 + 0.005 * top) * m;
    else off[i] = (0.012 + 0.016 * top + 0.012 * Math.abs(noise(p, 38)) + (rnd(i) > 0.93 ? 0.02 + 0.02 * rnd(i + 7) : 0)) * m;
  }
  const geo = g.clone(); const pos = geo.attributes.position;
  for (let i = 0; i < n; i++) { v.fromBufferAttribute(N, i).normalize(); pos.setXYZ(i, pos.getX(i) + v.x * off[i], pos.getY(i) + v.y * off[i], pos.getZ(i) + v.z * off[i]); }
  // keep triangles that are mostly inside the mask; sink their edge vertices under the scalp so no gap shows
  const idx = g.index ? g.index.array : Array.from({ length: n }, (_, i) => i), keep = [];
  for (let t = 0; t < idx.length; t += 3) { const a = idx[t], b = idx[t + 1], c = idx[t + 2]; if (Math.max(mask[a], mask[b], mask[c]) > 0.35) keep.push(a, b, c); }
  for (const i of keep) if (mask[i] < 0.35) { v.fromBufferAttribute(N, i).normalize(); pos.setXYZ(i, P.getX(i) - v.x * 0.002, P.getY(i) - v.y * 0.002, P.getZ(i) - v.z * 0.002); }
  geo.setIndex(keep); geo.computeVertexNormals();
  // strand look: vertex-colour streaks (lighter tips, darker roots) + slight sheen
  const col = new THREE.Color(color), cols = new Float32Array(n * 4), c2 = new THREE.Color();
  for (let i = 0; i < n; i++) { const k = 0.8 + 0.3 * Math.abs(noise(L[i], style === 'messy' ? 90 : 160)); c2.copy(col).multiplyScalar(k);
    cols[i * 4] = c2.r; cols[i * 4 + 1] = c2.g; cols[i * 4 + 2] = c2.b; cols[i * 4 + 3] = Math.min(1, Math.max(0, (mask[i] - 0.3) / 0.45)); }   // alpha: soft hairline
  geo.setAttribute('color', new THREE.BufferAttribute(cols, 4));
  const mat = new THREE.MeshPhysicalMaterial({ color: '#ffffff', vertexColors: true, alphaHash: true, roughness: style === 'messy' ? 0.85 : 0.62,
    bumpMap: strandTex(), bumpScale: style === 'messy' ? 3 : 1.6, sheen: 0.35, sheenColor: col.clone().offsetHSL(0, 0, 0.25), sheenRoughness: 0.5 });
  const m = new THREE.SkinnedMesh(geo, mat); m.name = 'HairShell'; m.castShadow = true; m.frustumCulled = false;
  head.parent.add(m); m.bind(sk, head.bindMatrix); return m;
}

/** speech-like mouth movement for t inside [a, b] (deterministic) */
export const mouth = (t, a = -1e9, b = 1e9) => (t < a || t > b ? 0 : Math.max(0, Math.sin(t * 17) * 0.5 + Math.sin(t * 9.3) * 0.35 + 0.15) * 0.8);
