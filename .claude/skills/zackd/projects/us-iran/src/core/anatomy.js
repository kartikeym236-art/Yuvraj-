// Real BodyParts3D head anatomy, aligned to the scanned head (scanHead) or to heroMan's head.
// AN = realHead(A, fit) -> { group, parts, brainMat, boneMat, arteryMat, nerveMat, glow, setWiden, setCold, setWarm,
//                            setNerves, setTongue, setArteryColor, reset }
// Parts used if loaded in PRELOAD.obj: brain skull mandible tongue softpalate nerves carotid circle aca mca basilar head_arteries
import * as THREE from 'three';
import { organMat, glowSprite } from './materials.js';

// skull-centre (BodyParts3D mm) -> head origin offset; fit for the Lee Perry-Smith bust (origin = bust centre)
export const LPS_FIT = { x: 0, y: 0.079, z: 0.014, s: 0.94 };

/** BodyParts3D mm frame -> three.js metres: z up -> y up, front (-y) -> +z */
export function bp3dGroup() { const g = new THREE.Group(); g.scale.setScalar(0.001); g.rotation.x = -Math.PI / 2; return g; }

export function realHead(A, fit = LPS_FIT) {
  fit = { ...LPS_FIT, ...fit };
  const group = new THREE.Group(), inner = bp3dGroup(); group.add(inner);
  const mats = {
    brain: organMat('brain'), bone: organMat('bone', { opacity: 0.1, transparent: true, depthWrite: false }),
    artery: organMat('artery'), nerve: organMat('nerve', { emissive: '#ffd23a', emissiveIntensity: 0 }),
    tongue: organMat('tongue'), palate: organMat('tongue', { color: '#E0848A' }),
  };
  const use = { brain: 'brain', skull: 'bone', mandible: 'bone', tongue: 'tongue', softpalate: 'palate', nerves: 'nerve',
    carotid: 'artery', circle: 'artery', aca: 'artery', mca: 'artery', basilar: 'artery', head_arteries: 'artery' };
  const parts = {};
  for (const [k, mk] of Object.entries(use)) {
    if (!A.obj[k]) continue;
    if (k === 'head_arteries' && (A.obj.carotid || A.obj.mca)) continue;      // avoid doubles
    const g = A.obj[k].clone(); g.traverse((m) => { if (m.isMesh) { m.material = mats[mk]; m.castShadow = false; m.renderOrder = mk === 'bone' ? 3 : 1; } });
    inner.add(g); parts[k] = g;
  }
  // centre on the skull (or brain) bounding box
  const ref = parts.skull || parts.brain || inner; inner.updateMatrixWorld(true);
  const c = new THREE.Box3().setFromObject(ref).getCenter(new THREE.Vector3());
  inner.position.sub(c);
  group.position.set(fit.x, fit.y, fit.z); group.scale.setScalar(fit.s);
  // palate point (roof of the mouth) for the cold/warm glow
  let palate = new THREE.Vector3(0, -0.045, 0.045);
  if (parts.softpalate || parts.tongue) { group.updateMatrixWorld(true);
    const b = new THREE.Box3().setFromObject(parts.softpalate || parts.tongue); palate = group.worldToLocal(b.getCenter(new THREE.Vector3()));
    if (!parts.softpalate) palate.y += 0.012; palate.z += 0.012; }
  const glow = glowSprite('#7fdcff', 0.06); glow.position.copy(palate); group.add(glow);
  const tongueBase = parts.tongue ? parts.tongue.position.clone() : null;
  const arteries = ['carotid', 'circle', 'aca', 'mca', 'basilar', 'head_arteries'];
  const AN = { group, parts, mats, brainMat: mats.brain, boneMat: mats.bone, arteryMat: mats.artery, nerveMat: mats.nerve, glow,
    show(list) { for (const [k, g] of Object.entries(parts)) g.visible = list.includes(k) || (list.includes('arteries') && arteries.includes(k)); },
    setWiden(k) { mats.artery.userData.inflate.value = 1.1 * k; },           // mm: arteries swell
    setCold(k) { glow.material.color.set('#7fdcff'); glow.material.opacity = k * 0.9; glow.scale.setScalar(0.04 + 0.04 * k);
      mats.palate.emissive.set('#3fb8ff'); mats.palate.emissiveIntensity = k * 0.6; },
    setWarm(k) { if (k <= 0) return; glow.material.color.set('#ff8a2a'); glow.material.opacity = k * 0.9; glow.scale.setScalar(0.04 + 0.04 * k);
      mats.palate.emissive.set('#ff7a20'); mats.palate.emissiveIntensity = k * 0.6; },
    setNerves(k) { mats.nerve.emissiveIntensity = 0.9 * k; mats.nerve.color.set('#F1E3B8').lerp(new THREE.Color('#FFD23A'), k); },
    setTongue(k) { if (parts.tongue) parts.tongue.position.copy(tongueBase).add(new THREE.Vector3(0, 0, 9 * k)); },  // mm, up
    setArteryColor(c) { mats.artery.color.set(c); },
    reset() { AN.setWiden(0); AN.setCold(0); mats.palate.emissiveIntensity = 0; AN.setNerves(0); AN.setTongue(0);
      AN.setArteryColor('#B3161E'); mats.artery.emissiveIntensity = 0; mats.brain.emissive.set('#000000'); mats.brain.color.set('#E7B7B1');
      mats.bone.opacity = 0.1; group.visible = true; for (const g of Object.values(parts)) g.visible = true; },
  };
  AN.reset();
  return AN;
}
