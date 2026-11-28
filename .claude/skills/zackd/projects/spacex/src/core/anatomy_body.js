// Whole-body BodyParts3D anatomy (organs, bones, full artery + vein network) in metres, feet at y = 0, facing +z.
// BODY = bodyAnatomy(A, { fit, glass })  -> { group, parts, mats, skin, show(list), setPulse(k), setFlow(t), centre(name) }
// Groups for show(): heart lungs liver stomach gut kidneys esophagus trachea diaphragm bones cord arteries veins pancreas
//                    spleen bladder gallbladder adrenals brain skin
// Load the OBJs you need in PRELOAD.obj (see PARTS). 'skin' (if loaded) becomes a glass body shell = the glass man.
import * as THREE from 'three';
import { organMat } from './materials.js';
import { glassMaterial } from './sets.js';
import { bp3dGroup } from './anatomy.js';

export const PARTS = ['heartwall', 'heart', 'lungR', 'lungL', 'liver', 'stomach', 'smallint', 'largeint', 'kidneyR', 'kidneyL', 'esophagus',
  'trachea', 'diaphragm', 'ribcage', 'spine', 'pelvis', 'spinalcord', 'arteries_all', 'veins_all', 'pancreas', 'spleen', 'bladder', 'adrenals', 'skin'];
export const PARTS_PRELOAD = (list = PARTS) => Object.fromEntries(list.map((k) => [k, `assets/anatomy/${k}.obj`]));

const GROUPS = { heart: ['heartwall', 'heart'], lungs: ['lungR', 'lungL'], liver: ['liver'], stomach: ['stomach'], gut: ['smallint', 'largeint'],
  kidneys: ['kidneyR', 'kidneyL', 'ureters'], esophagus: ['esophagus'], trachea: ['trachea'], diaphragm: ['diaphragm'],
  bones: ['ribcage', 'spine', 'pelvis', 'skull', 'mandible'], cord: ['spinalcord'], arteries: ['arteries_all'], veins: ['veins_all'],
  pancreas: ['pancreas'], spleen: ['spleen'], bladder: ['bladder'], gallbladder: ['gallbladder'], adrenals: ['adrenals'],
  brain: ['brain'], skin: ['skin'] };
const KIND = { heartwall: 'heart', heart: 'artery', lungR: 'lung', lungL: 'lung', liver: 'liver', stomach: 'stomach', smallint: 'gut',
  largeint: 'gut', kidneyR: 'kidney', kidneyL: 'kidney', ureters: 'bladder', esophagus: 'stomach', trachea: 'cord', diaphragm: 'diaphragm',
  ribcage: 'bone', spine: 'bone', pelvis: 'bone', skull: 'bone', mandible: 'bone', spinalcord: 'cord', arteries_all: 'artery',
  veins_all: 'vein', pancreas: 'pancreas', spleen: 'spleen', bladder: 'bladder', gallbladder: 'gland', adrenals: 'gland', brain: 'brain' };

/** fit: { s, x, y, z } applied after the feet are put on the floor. For heroMan use HERO_FIT. */
export const HERO_FIT = { s: 1.06, x: 0.005, y: 0.074, z: 0 };

export function bodyAnatomy(A, { fit = { s: 1, x: 0, y: 0, z: 0 }, glass = null } = {}) {
  const group = new THREE.Group(), inner = bp3dGroup(); group.add(inner);
  const mats = {}, parts = {}, pieces = {};
  for (const [name, kind] of Object.entries({ ...KIND, skin: 'skin' })) {
    if (!A.obj[name]) continue;
    const g = A.obj[name].clone();
    let mat;
    if (name === 'skin') mat = glass || glassMaterial('#EAF6FF', { base: 0.04, rim: 0.65 });
    else { const mk = Object.keys(GROUPS).find((G) => GROUPS[G].includes(name)) || name; mat = mats[mk] ||= organMat(kind); }
    g.traverse((m) => { if (m.isMesh) { m.material = mat; m.renderOrder = name === 'skin' ? 6 : kind === 'bone' ? 3 : 1; } });
    inner.add(g); pieces[name] = g;
  }
  // feet on the floor, centred on x/z by the spine (or everything)
  inner.updateMatrixWorld(true);
  const all = new THREE.Box3().setFromObject(inner), axis = new THREE.Box3().setFromObject(pieces.spine || pieces.skin || inner);
  const c = axis.getCenter(new THREE.Vector3());
  const footY = pieces.skin ? all.min.y : all.min.y - 0.02;                 // without skin the lowest organ is not the foot
  inner.position.set(-c.x, -footY, -c.z * 0.4);
  if (!pieces.skin && pieces.pelvis) inner.position.y = 0.92 - new THREE.Box3().setFromObject(pieces.pelvis).min.y + 0.0;
  group.scale.setScalar(fit.s); group.position.set(fit.x, fit.y, fit.z);
  for (const [G, list] of Object.entries(GROUPS)) { const ps = list.filter((k) => pieces[k]); if (ps.length) parts[G] = ps.map((k) => pieces[k]); }
  if (pieces.skin) mats.skin = pieces.skin.children[0]?.material;
  const BODY = { group, parts, pieces, mats, skin: pieces.skin,
    show(list) { for (const [G, ps] of Object.entries(parts)) ps.forEach((p) => (p.visible = list.includes(G))); },
    /** heartbeat 0..1: chambers swell and redden */
    setPulse(k) { if (mats.heart) { mats.heart.userData.inflate.value = 2.2 * k; mats.heart.emissive.set('#ff2020'); mats.heart.emissiveIntensity = 0.25 * k; } },
    /** living shimmer on the vessels */
    setFlow(t) { for (const G of ['arteries', 'veins']) if (mats[G]) { mats[G].emissive.set(G === 'arteries' ? '#ff1a1a' : '#5040ff'); mats[G].emissiveIntensity = 0.08 + 0.05 * Math.sin(t * 6); } },
    /** world-space centre of a group (after you moved BODY.group) */
    centre(G) { group.updateMatrixWorld(true); const b = new THREE.Box3(); (parts[G] || []).forEach((p) => b.expandByObject(p)); return b.getCenter(new THREE.Vector3()); },
    reset() { for (const m of Object.values(mats)) if (m && m.userData?.inflate) { m.userData.inflate.value = 0; m.emissiveIntensity = 0; } },
  };
  return BODY;
}
