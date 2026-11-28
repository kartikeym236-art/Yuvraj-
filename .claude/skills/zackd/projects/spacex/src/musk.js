// The Elon Musk-inspired character (recognisable, stylised 3D - not a photo-real copy).
// Long face with a strong square jaw, high forehead, receding temples, dark swept-back hair, deep-set eyes, thin lips,
// light stubble and age lines; tall and broad; black blazer over a black tee.
import { actor } from './core/actors.js';
export function makeMusk() {
  const a = actor('rpm', { shirt: '#1a1b1e', pants: '#23262c', shoes: '#151515', skin: 1.02 }).part('Beard', false)
    .face({ faceLen: 1.1, chinDown: 0.004, chinFwd: 0.004, jaw: 0.006, cheekHollow: 0.003, forehead: 0.004, brow: 0.002, eyes: 0.9, eyeBack: 0.0015,
      lipThin: 0.0015, noseLong: 0.002, noseNarrow: 0.3, browColor: '#4a3527', browW: 1, age: 0.75, stubble: 0.5, skinTint: '#f6e6dc' })
    .hair('swept', { color: '#3a2a1f', seed: 11 });
  a.root.scale.multiplyScalar(1.06);                                   // ~1.88 m
  if (a.bones.Neck) a.bones.Neck.scale.set(1.12, 1, 1.12);
  for (const b of ['LeftShoulder', 'RightShoulder']) if (a.bones[b]) a.bones[b].scale.set(1.05, 1.05, 1.05);
  return a;
}
