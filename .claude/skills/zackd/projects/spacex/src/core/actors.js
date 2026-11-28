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
  // rotate a bone about an axis given in the CHARACTER's frame (x = his left, y = up, z = forward) - rig independent
  const gq = new THREE.Quaternion(), wq = new THREE.Quaternion(), pq = new THREE.Quaternion(), dq = new THREE.Quaternion(), ax = new THREE.Vector3();
  const rotC = (name, axis, ang) => { const b = bones[name]; if (!b || !ang) return;
    group.updateWorldMatrix(true, false); group.getWorldQuaternion(gq); b.updateWorldMatrix(true, false);
    b.getWorldQuaternion(wq); b.parent.getWorldQuaternion(pq); ax.set(...axis).applyQuaternion(gq).normalize();
    dq.setFromAxisAngle(ax, ang); b.quaternion.copy(pq.invert().multiply(dq.multiply(wq))); };
  const wp = (n) => { bones[n].updateWorldMatrix(true, false); return bones[n].getWorldPosition(new THREE.Vector3()); };
  const charDir = (v) => { group.updateWorldMatrix(true, false); group.getWorldQuaternion(gq); return new THREE.Vector3(...v).normalize().applyQuaternion(gq); };
  const worldRot = (name, q) => { const b = bones[name]; b.updateWorldMatrix(true, false); b.getWorldQuaternion(wq); b.parent.getWorldQuaternion(pq); b.quaternion.copy(pq.invert().multiply(q.clone().multiply(wq))); };
  const aimBone = (name, child, dir) => { if (!bones[name] || !bones[child]) return; const cur = wp(child).sub(wp(name)).normalize(); worldRot(name, new THREE.Quaternion().setFromUnitVectors(cur, charDir(dir))); };
  const twistPalm = (S, side, palmDir, foreDir) => {                // roll the forearm about its axis until the palm faces palmDir
    const axis = wp(S + 'Hand').sub(wp(S + 'ForeArm')).normalize();
    const across = wp(S + 'HandIndex1').sub(wp(S + 'HandPinky1')), along = wp(S + 'HandMiddle1').sub(wp(S + 'Hand'));
    const n = (side === 'L' ? new THREE.Vector3().crossVectors(along, across) : new THREE.Vector3().crossVectors(across, along)).normalize();
    const want = charDir(palmDir); const pn = n.clone().addScaledVector(axis, -n.dot(axis)).normalize(), pw = want.clone().addScaledVector(axis, -want.dot(axis)).normalize();
    const ang = Math.atan2(new THREE.Vector3().crossVectors(pn, pw).dot(axis), pn.dot(pw));
    worldRot(S + 'ForeArm', new THREE.Quaternion().setFromAxisAngle(axis, ang)); };
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
      const dom = b && k > 0.5 ? b : a;                                              // arms follow the dominant clip
      if (relax && /walk|run/i.test(dom)) F.walkArms({ carry: F._carry });           // borrowed walk arms look stiff too
      else if (relax && /idle/i.test(dom)) F.relax(t);                               // the borrowed idle's arms look stiff - use natural arms
      else if (relax) F.grip('R', relax, { thumb: 0.3 }).grip('L', relax, { thumb: 0.3 });
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
    /** aim an arm by directions in the CHARACTER frame (x = his left, y = up, z = forward; vectors need not be unit).
     *  upper: shoulder->elbow, fore: elbow->wrist, palm: where the palm faces, hand: wrist->knuckles (default = fore).
     *  Rig independent: measures the bones' current directions and rotates them onto the targets. */
    aim(side, { upper, fore, palm = null, hand = null } = {}) {
      const S = side === 'L' ? 'Left' : 'Right';
      aimBone(S + 'Arm', S + 'ForeArm', upper); aimBone(S + 'ForeArm', S + 'Hand', fore); aimBone(S + 'Hand', S + 'HandMiddle1', hand || fore);
      if (palm) twistPalm(S, side, palm, fore);
      return F;
    },
    /** natural walking arms: each arm swings opposite its own leg (read from the legs' current pose), close to the body,
     *  palms to the thighs. carry 'L' | 'R' keeps that arm straight down holding a bag a little away from the leg. */
    walkArms({ swing = 0.55, carry = null } = {}) {
      group.updateWorldMatrix(true, false); group.getWorldQuaternion(gq); const inv = gq.clone().invert();
      const legFwd = (S) => { const v = wp(S + 'Leg').sub(wp(S + 'UpLeg')).applyQuaternion(inv); return v.z / v.length(); };
      for (const [side, S, sx] of [['L', 'Left', 1], ['R', 'Right', -1]]) {
        if (carry === side) { F.aim(side, { upper: [sx * 0.28, -1, 0], fore: [sx * 0.22, -1, 0.02], palm: [-sx, 0, 0] }); F.grip(side, 0.85, { thumb: 0.5 }); continue; }
        const k = -legFwd(S) * swing * 2.2;                                        // leg forward -> this arm back
        F.aim(side, { upper: [sx * 0.12, -1, k], fore: [sx * 0.05, -1, 0.28 + Math.max(0, k) * 0.9], palm: [-sx, 0, 0.1] }); F.grip(side, 0.35, { thumb: 0.3 });
      }
      return F;
    },
    /** carry a bag in 'L' / 'R' while walking or standing (null to stop) */
    carry(side) { F._carry = side; return F; },
    /** relaxed standing arms: hang by the sides, elbows soft, palms to the thighs, breathing sway */
    relax(t = 0) {
      const br = Math.sin(t * 1.7) * 0.03;
      F.aim('L', { upper: [0.12, -1, 0.04 + br], fore: [0.04, -1, 0.22], palm: [-1, 0, 0.15] });
      F.aim('R', { upper: [-0.12, -1, 0.04 - br], fore: [-0.04, -1, 0.22], palm: [1, 0, 0.15] });
      F.grip('L', 0.35, { thumb: 0.3 }).grip('R', 0.35, { thumb: 0.3 }); return F;
    },
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
    /** sculpt this actor's face (its own copy of the head) + paint skin details. See faceShape() for the options. Call BEFORE hair(). */
    face(spec = {}) { faceShape(root, spec); return F; },
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

// ---------- face sculpting (real-person-inspired characters) ----------
// Landmarks are found on the head mesh itself (eyes from the eye meshes, nose tip = most forward point, chin = lowest
// front point), then gaussian "clay" moves are applied in head-bone space and skin details are painted onto a copy of
// the face texture at the UVs of the vertices in each region. Options (all optional, 0 / 1 = no change):
//   faceLen (lower-face stretch, 1.08 = 8 % longer), jaw (jaw-angle widening, m), chinDown, chinFwd (m), cheekHollow (m),
//   forehead (m up), brow (brow-ridge forward, m), eyes (eye scale), eyeBack (m), lipThin (m), noseLong (m), noseNarrow (0..1),
//   browColor, browW (0..1 thickness), age (0..1 lines + under-eye), stubble (0..1), skinTint ('#rrggbb' multiply, optional)
function faceShape(root, o) {
  const meshes = {}; root.traverse((m) => { if (m.isSkinnedMesh) meshes[m.name] = m; });
  const head = meshes.Wolf3D_Head; if (!head) return;
  const sk = head.skeleton, hi = sk.bones.findIndex((b) => /head$/i.test(b.name));
  const toLocal = (m) => new THREE.Matrix4().copy(sk.boneInverses[hi]).multiply(m.bindMatrix);
  const M = toLocal(head), Mi = M.clone().invert(), v = new THREE.Vector3();
  const centre = (m) => { if (!m) return null; const Lm = toLocal(m), P = m.geometry.attributes.position, c = new THREE.Vector3(); for (let i = 0; i < P.count; i++) c.add(v.fromBufferAttribute(P, i).applyMatrix4(Lm)); return c.divideScalar(P.count); };
  const eL = centre(meshes.EyeLeft), eR = centre(meshes.EyeRight); if (!eL || !eR) return;
  const eyeY = (eL.y + eR.y) / 2, eyeX = Math.abs(eL.x - eR.x) / 2, cx = (eL.x + eR.x) / 2;
  head.geometry = head.geometry.clone(); const g = head.geometry, P = g.attributes.position, n = P.count, L = [];
  let nose = null, chin = null, zMax = -1e9;
  for (let i = 0; i < n; i++) { const p = v.fromBufferAttribute(P, i).applyMatrix4(M).clone(); L.push(p);
    if (Math.abs(p.x - cx) < 0.012 && p.y < eyeY && p.y > eyeY - 0.06 && (!nose || p.z > nose.z)) nose = p;
    if (p.z > zMax) zMax = p.z; }
  for (const p of L) if (Math.abs(p.x - cx) < 0.012 && p.z > zMax - 0.05 && (!chin || p.y < chin.y)) chin = p;
  const mouthY = nose.y - (nose.y - chin.y) * 0.42, F = zMax;
  const gauss = (p, c, r) => Math.exp(-p.distanceToSquared(c) / (r * r));
  const moves = [];                                                    // [centre, radius, displacement]
  const C = (x, y, z) => new THREE.Vector3(cx + x, y, z);
  if (o.chinDown || o.chinFwd) moves.push([C(0, chin.y + 0.01, F - 0.03), 0.028, new THREE.Vector3(0, -(o.chinDown || 0), o.chinFwd || 0)]);
  if (o.jaw) for (const sg of [-1, 1]) moves.push([C(sg * eyeX * 1.75, chin.y + 0.03, F - 0.07), 0.03, new THREE.Vector3(sg * o.jaw, -(o.jaw * 0.6), 0)]);
  if (o.cheekHollow) for (const sg of [-1, 1]) moves.push([C(sg * eyeX * 1.35, mouthY + 0.012, F - 0.04), 0.022, new THREE.Vector3(-sg * o.cheekHollow * 0.6, 0, -o.cheekHollow)]);
  if (o.forehead) moves.push([C(0, eyeY + 0.075, F - 0.03), 0.05, new THREE.Vector3(0, o.forehead, 0)]);
  if (o.brow) for (const sg of [-1, 1]) moves.push([C(sg * eyeX, eyeY + 0.02, F - 0.012), 0.018, new THREE.Vector3(0, 0, o.brow)]);
  if (o.lipThin) moves.push([C(0, mouthY, F - 0.012), 0.012, new THREE.Vector3(0, 0, -o.lipThin)]);
  if (o.noseLong) moves.push([nose.clone(), 0.014, new THREE.Vector3(0, -o.noseLong * 0.6, o.noseLong)]);
  if (o.jowl) for (const sg of [-1, 1]) moves.push([C(sg * eyeX * 1.5, mouthY - 0.006, F - 0.05), 0.026, new THREE.Vector3(sg * o.jowl, -o.jowl * 0.25, o.jowl * 0.35)]);
  if (o.chinWide) for (const sg of [-1, 1]) moves.push([C(sg * 0.013, chin.y + 0.008, F - 0.025), 0.016, new THREE.Vector3(sg * o.chinWide, 0, 0)]);
  // eyelids: hooded upper lid (drops over the eye), slightly raised lower lid -> smaller, narrower eyes
  if (o.lidDrop || o.lidRaise) for (const ec of [eL, eR]) {
    if (o.lidDrop) moves.push([new THREE.Vector3(ec.x, ec.y + 0.008, ec.z + 0.006), 0.011, new THREE.Vector3(0, -o.lidDrop, o.lidDrop * 0.4)]);
    if (o.lidRaise) moves.push([new THREE.Vector3(ec.x, ec.y - 0.008, ec.z + 0.006), 0.009, new THREE.Vector3(0, o.lidRaise, o.lidRaise * 0.3)]); }
  const lenK = (o.faceLen || 1) - 1;
  for (let i = 0; i < n; i++) { const p = L[i], q = p.clone();
    if (lenK && p.y < eyeY && p.z > chin.z - 0.07 && p.y > chin.y - 0.03) q.y -= (eyeY - p.y) * lenK * Math.min(1, (p.z - (chin.z - 0.07)) / 0.04);
    if (o.noseNarrow && Math.abs(p.y - (nose.y + 0.012)) < 0.022 && p.z > nose.z - 0.025) q.x = cx + (p.x - cx) * (1 - o.noseNarrow * 0.2 * gauss(p, nose, 0.025));
    for (const [c, r, d] of moves) q.addScaledVector(d, gauss(p, c, r));
    v.copy(q).applyMatrix4(Mi); P.setXYZ(i, v.x, v.y, v.z); }
  g.computeVertexNormals();
  // the eyes follow the stretch, and can be made a little smaller / deeper set
  for (const [nm, ec] of [['EyeLeft', eL], ['EyeRight', eR]]) { const em = meshes[nm]; if (!em) continue; em.geometry = em.geometry.clone();
    const Le = toLocal(em), Lei = Le.clone().invert(), EP = em.geometry.attributes.position, s = o.eyes || 1;
    for (let i = 0; i < EP.count; i++) { const p = v.fromBufferAttribute(EP, i).applyMatrix4(Le); p.sub(ec).multiplyScalar(s).add(ec); p.z -= o.eyeBack || 0; p.applyMatrix4(Lei); EP.setXYZ(i, p.x, p.y, p.z); } }
  for (const nm of ['Wolf3D_Teeth']) { const tm = meshes[nm]; if (!tm || !lenK) continue; tm.geometry = tm.geometry.clone(); const Lt = toLocal(tm), Lti = Lt.clone().invert(), TP = tm.geometry.attributes.position;
    for (let i = 0; i < TP.count; i++) { const p = v.fromBufferAttribute(TP, i).applyMatrix4(Lt); p.y -= (eyeY - p.y) * lenK * 0.6; p.applyMatrix4(Lti); TP.setXYZ(i, p.x, p.y, p.z); } }
  // ---- skin painting on a copy of the face texture, at the UVs of region vertices ----
  const map = head.material.map, img = map && map.image; const uv = g.attributes.uv; if (!img || !uv) return;
  const W = img.width, H = img.height, cv = document.createElement('canvas'); cv.width = W; cv.height = H; const x = cv.getContext('2d'); x.drawImage(img, 0, 0);
  const rnd = (i) => { const a = Math.sin(i * 91.17 + 7.3) * 43758.5; return a - Math.floor(a); };
  const R = W / 1024, idx = g.index ? g.index.array : null, T = idx ? idx.length / 3 : n / 3, tri = (k, j) => (idx ? idx[k * 3 + j] : k * 3 + j);
  const layer = () => { const c = document.createElement('canvas'); c.width = W; c.height = H; return c; };
  // fill every triangle with the average of a per-vertex weight (smooth regions, no dots); blur when compositing
  const paint = (wf, style, blur, alpha = 1, op = 'source-over') => { const w = new Float32Array(n); let any = false; for (let i = 0; i < n; i++) { w[i] = L[i].z < F - 0.07 ? 0 : wf(L[i]); if (w[i] > 0.01) any = true; } if (!any) return;
    const c = layer(), y = c.getContext('2d'); y.fillStyle = style;
    for (let k = 0; k < T; k++) { const a1 = tri(k, 0), b1 = tri(k, 1), c1 = tri(k, 2), ww = (w[a1] + w[b1] + w[c1]) / 3; if (ww < 0.02) continue;
      y.globalAlpha = Math.min(1, ww); y.beginPath(); y.moveTo(uv.getX(a1) * W, uv.getY(a1) * H); y.lineTo(uv.getX(b1) * W, uv.getY(b1) * H); y.lineTo(uv.getX(c1) * W, uv.getY(c1) * H); y.closePath(); y.fill(); y.stroke && (y.lineWidth = 1.5 * R, y.strokeStyle = style, y.stroke()); }
    x.save(); x.globalAlpha = alpha; x.globalCompositeOperation = op; x.filter = `blur(${blur * R}px)`; x.drawImage(c, 0, 0); x.restore(); };
  const sm2 = (a, b, t) => { const k = Math.min(1, Math.max(0, (t - a) / (b - a))); return k * k * (3 - 2 * k); };
  const band = (d, w) => 1 - sm2(w * 0.5, w, Math.abs(d));                                 // 1 inside |d| < w/2, soft to 0 at w
  // skin colour sampled from the cheek, to paint out the stylised brows
  let skin = 'rgb(214,170,140)'; { let best = 0, bd = 1e9; for (let i = 0; i < n; i++) { const p = L[i]; const d = Math.abs(p.y - (eyeY - 0.03)) + Math.abs(Math.abs(p.x - cx) - eyeX); if (p.z > F - 0.05 && d < bd) { bd = d; best = i; } }
    const px = x.getImageData(Math.floor(uv.getX(best) * W), Math.floor(uv.getY(best) * H), 1, 1).data; skin = `rgb(${px[0]},${px[1]},${px[2]})`; }
  const browLine = (p) => { const dx = Math.abs(p.x - cx), t = (dx - (eyeX - 0.02)) / 0.042; return { t, y: eyeY + (o.browY ?? 0.015) + 0.0035 * Math.sin(Math.PI * Math.min(1, Math.max(0, t)) * 0.9) - 0.004 * Math.max(0, t - 0.7) }; };
  if (o.browColor) {
    paint((p) => { const { t } = browLine(p); return t > -0.25 && t < 1.25 ? band(p.y - (eyeY + 0.017), 0.03) : 0; }, skin, 5);              // cover the old brows
    paint((p) => { const { t, y } = browLine(p); if (t < -0.05 || t > 1.05) return 0; const th = (0.0062 - 0.0032 * t) * (o.browW || 1); return band(p.y - y, th * 1.7) * sm2(-0.05, 0.15, t) * (1 - sm2(0.8, 1.05, t)); }, o.browColor, 3.2, 0.85);
  }
  if (o.age) {
    paint((p) => band(Math.abs(p.x - cx) - eyeX, 0.03) * band(p.y - (eyeY - 0.012), 0.012), 'rgb(105,60,55)', 4, 0.22 * o.age);                     // under-eye
    paint((p) => { const tt = (nose.y - 0.004 - p.y) / (nose.y - 0.004 - mouthY); if (tt < -0.05 || tt > 1.2) return 0; return band(Math.abs(p.x - cx) - eyeX * (0.62 + 0.32 * tt), 0.007); }, 'rgb(115,65,58)', 2.5, 0.35 * o.age);   // smile lines
    paint((p) => (Math.abs(p.x - cx) < eyeX * 1.3 ? Math.max(band(p.y - (eyeY + 0.042), 0.0035), band(p.y - (eyeY + 0.055), 0.0035)) : 0), 'rgb(140,90,80)', 1.5, 0.22 * o.age);   // forehead
  }
  if (o.stubble) {
    const sp = layer(), sx = sp.getContext('2d'); for (let k = 0; k < W * H * 0.01; k++) { sx.fillStyle = `rgba(45,32,26,${0.25 + rnd(k) * 0.5})`; sx.fillRect(rnd(k + 1) * W, rnd(k + 2) * H, 1.4 * R, 1.4 * R); }
    const pat = x.createPattern(sp, 'no-repeat');
    paint((p) => { if (p.y > nose.y - 0.01 || p.y < chin.y - 0.025) return 0; const lip = band(p.y - mouthY, 0.012) * band(p.x - cx, eyeX * 1.4); return (1 - lip) * sm2(chin.y - 0.025, chin.y - 0.005, p.y); }, pat, 0.6, 0.55 * o.stubble);
    paint((p) => { if (p.y > nose.y - 0.01 || p.y < chin.y - 0.025) return 0; return sm2(chin.y - 0.025, chin.y - 0.005, p.y) * (1 - band(p.y - mouthY, 0.01) * band(p.x - cx, eyeX * 1.4)); }, 'rgb(70,55,50)', 6, 0.12 * o.stubble, 'multiply');
  }
  if (o.skinTint) { x.globalCompositeOperation = 'multiply'; x.fillStyle = o.skinTint; x.fillRect(0, 0, W, H); x.globalCompositeOperation = 'source-over'; }
  const t2 = new THREE.CanvasTexture(cv); t2.flipY = map.flipY; t2.colorSpace = map.colorSpace; t2.wrapS = map.wrapS; t2.wrapT = map.wrapT; t2.anisotropy = 8;
  head.material.map = t2; head.material.needsUpdate = true;
  if (o.iris) for (const nm of ['EyeLeft', 'EyeRight']) { const em = meshes[nm]; const mp = em && em.material.map; if (!mp || !mp.image) continue;
    if (!faceShape._iris) { const im = mp.image, c3 = document.createElement('canvas'); c3.width = im.width; c3.height = im.height; const z = c3.getContext('2d'); z.drawImage(im, 0, 0);
      const d = z.getImageData(0, 0, c3.width, c3.height), px = d.data, tc = new THREE.Color(o.iris);
      for (let k = 0; k < px.length; k += 4) { const r = px[k] / 255, gg = px[k + 1] / 255, b = px[k + 2] / 255, mx = Math.max(r, gg, b), mn = Math.min(r, gg, b), sat = mx ? (mx - mn) / mx : 0;
        if (sat > 0.18 && r >= b && mx < 0.9) { const l = 0.3 * r + 0.59 * gg + 0.11 * b, f = l * 2.2; px[k] = Math.min(255, tc.r * f * 255); px[k + 1] = Math.min(255, tc.g * f * 255); px[k + 2] = Math.min(255, tc.b * f * 255); } }
      z.putImageData(d, 0, 0); const t3 = new THREE.CanvasTexture(c3); t3.flipY = mp.flipY; t3.colorSpace = mp.colorSpace; faceShape._iris = t3; }
    em.material.map = faceShape._iris; em.material.needsUpdate = true; }
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
    const line = 0.84 * sm(-0.2, 0.75, f) + 0.64 * (1 - sm(-0.2, 0.75, f)) - 0.2 * sm(-0.1, -0.9, f) - 0.05 * sm(0.5, 0.95, f) * sm(0.55, 0.2, s) + (style === 'messy' ? -0.03 : 0)
      + (style === 'swept' ? 0.035 + 0.11 * sm(0.3, 0.85, f) * sm(0.18, 0.5, s) - 0.02 * sm(0.5, 0.9, f) * (1 - sm(0.1, 0.25, s)) : 0);   // swept: receding temples (M-shaped hairline)
    let m = sm(line - 0.035, line + 0.045, u);
    if (s > 0.82 && u < 0.66 && f > -0.55) m *= 1 - sm(0.82, 0.92, s);                       // ears
    if (style === 'messy') m *= 0.55 + 0.45 * sm(-0.3, 0.2, noise(p, 60));                    // patchy
    mask[i] = m;
    const top = sm(line, 1, u);
    if (style === 'neat') off[i] = (0.006 + 0.012 * top - 0.004 * sm(0.75, 0.9, s) * (1 - top) - (Math.abs(p.x - cx - Wx * 0.32) < Wx * 0.03 && f > -0.2 && u > 0.8 ? 0.004 : 0)) * m;
    else if (style === 'short') off[i] = (0.004 + 0.005 * top) * m;
    else if (style === 'swept') off[i] = (0.006 + 0.038 * top * (0.4 + 0.6 * sm(-0.7, 0.6, f)) + 0.018 * sm(0.3, 0.85, f) * sm(0.55, 0.95, u) - 0.007 * sm(0.7, 0.9, s) * (1 - top) + 0.0025 * noise(p, 55)) * m;   // swept back + up: lift at the front, volume on top, short sides
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
