// The Elon Musk-inspired character (recognisable, stylised 3D - not a photo-real copy).
// Long, broad lower face (wide jaw, full lower cheeks, wide chin), smaller hooded blue-grey eyes, straight brows, thin lips
// with a closed-mouth smirk, high forehead with receding temples, dark swept-back hair, light stubble, ~55 years old;
// tall and broad; all-black outfit.
import { actor } from './core/actors.js';
export function makeMusk() {
  const a = actor('rpm', { shirt: '#1a1b1e', pants: '#23262c', shoes: '#151515', skin: 1.02 }).part('Beard', false)
    .face({ faceLen: 1.1, chinDown: 0.004, chinFwd: 0.004, chinWide: 0.004, jaw: 0.009, jowl: 0.0042, forehead: 0.004, brow: 0.0025,
      eyes: 0.88, eyeBack: 0.001, lidDrop: 0.0032, lidRaise: 0.0012, lipThin: 0.0018, noseLong: 0.002, noseNarrow: 0.2,
      browColor: '#4a3527', browW: 0.62, browY: 0.0115, age: 0.85, stubble: 0.45, skinTint: '#f8e4da', iris: '#8fa6b4' })
    .hair('swept', { color: '#3a2a1f', seed: 11 });
  a.root.scale.multiplyScalar(1.06);                                   // ~1.88 m
  if (a.bones.Neck) a.bones.Neck.scale.set(1.15, 1, 1.15);
  for (const b of ['LeftShoulder', 'RightShoulder']) if (a.bones[b]) a.bones[b].scale.set(1.05, 1.05, 1.05);
  a.smirk = 0.3;                                                       // default closed-mouth smile for talk(0, smirk)
  return a;
}
