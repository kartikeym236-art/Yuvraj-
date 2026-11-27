// voidMood(V, night 0..1, heat 0..1): sky-blue day -> navy night; heat -> warm orange-red. Returns look tweaks to spread
// into E.render's look ({ ...LOOK, ...mood }).
import * as THREE from 'three';

const DAY = new THREE.Color('#5BC4F0'), NIGHT = new THREE.Color('#14233F'), HOT = new THREE.Color('#F2753A');
export function voidMood(V, night = 0, heat = 0, base = DAY) {
  const c = base.clone().lerp(NIGHT, night).lerp(HOT, heat * heat);
  V.setColor('#' + c.getHexString());
  V.key.intensity = 2.4 * (1 - 0.45 * night); V.key.color.set('#fff4e8').lerp(new THREE.Color('#b8c8ff'), night).lerp(new THREE.Color('#ffd0a0'), heat);
  V.fill.intensity = 0.5 * (1 - 0.5 * night);
  return { exposure: 1 - 0.2 * night, warm: 0.6 * heat - 0.3 * night };
}
