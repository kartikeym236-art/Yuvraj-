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
    play(name, t, { inPlace = true, speed = 1 } = {}) { return F.blend(name, null, 0, t, { inPlace, speed }); },
    /** cross-fade clip a -> b by k (0..1) */
    blend(a, b, k, t, { inPlace = true, speed = 1 } = {}) {
      Object.entries(rest).forEach(([n, r]) => bones[n].quaternion.copy(r));
      const pa = sample(a, t * speed, inPlace), pb = b && k > 0 ? sample(b, t * speed, inPlace) : null;
      for (const n of Object.keys(pa)) { if (n === '__hips') continue; bones[n].quaternion.copy(pa[n]); if (pb && pb[n]) bones[n].quaternion.slerp(pb[n], k); }
      hips.position.copy(pa.__hips); if (pb) hips.position.lerp(pb.__hips, k);
      return F;
    },
    /** extra bone rotations on top of the clip (radians, local axes of Mixamo bones):
     *  head [nod down +x, turn +y, tilt +z], spine [lean fwd +x, twist +y, side +z],
     *  armL/armR [x, y, z] (shoulder joint), foreL/foreR [x, y, z] (elbow), handL/handR */
    pose({ head, neck, spine, armL, armR, foreL, foreR, handL, handR } = {}) {
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
    talk(k, smile = 0) {
      morphs.forEach((m) => { const d = m.morphTargetDictionary; if (d.mouthOpen !== undefined) m.morphTargetInfluences[d.mouthOpen] = k; if (d.mouthSmile !== undefined) m.morphTargetInfluences[d.mouthSmile] = smile; });
      return F;
    },
    /** world position of a bone (e.g. 'RightHand' to attach a prop, 'Head' for a thought bubble) */
    at(b) { group.updateMatrixWorld(true); return bones[b].getWorldPosition(new THREE.Vector3()); },
  };
  F.play('idle', 0); return F;
}

/** speech-like mouth movement for t inside [a, b] (deterministic) */
export const mouth = (t, a = -1e9, b = 1e9) => (t < a || t > b ? 0 : Math.max(0, Math.sin(t * 17) * 0.5 + Math.sin(t * 9.3) * 0.35 + 0.15) * 0.8);
