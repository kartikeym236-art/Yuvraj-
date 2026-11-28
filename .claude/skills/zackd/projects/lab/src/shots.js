import * as THREE from 'three';
import { add, V3 } from './core/timeline.js';
import { ACTOR_MODELS } from './core/actors.js';
import { frame, handheld } from './core/camera.js';
import * as SETS from './core/sets.js';
import { A } from './core/assets.js';
import { makeMusk } from './musk.js';
export const PRELOAD = { hdri: { studio: 'assets/hdri/studio_small_09_2k.hdr' }, models: { rpm: ACTOR_MODELS.rpm, xbot: ACTOR_MODELS.xbot, soldier: ACTOR_MODELS.soldier, michelle: ACTOR_MODELS.michelle } };
export async function buildShots(E) {
  const cam = E.camera(30); const V = SETS.studioVoid(A.env.studio, '#cfd6de'); const m = makeMusk(); V.scene.add(m.group);
  const H = () => m.at('Head');
  const views = [
    { target: () => V3(0, 1.0, 0), dist: 5.2, yaw: 0.0, fov: 30 },
    { target: () => H().add(V3(0, 0.06, 0)), dist: 0.75, yaw: 0.0, fov: 28 },
    { target: () => H().add(V3(0, 0.06, 0)), dist: 0.75, yaw: 0.6, fov: 28 },
    { target: () => H().add(V3(0, 0.06, 0)), dist: 0.75, yaw: 1.55, fov: 28 },
    { target: () => H().add(V3(0, -0.15, 0)), dist: 1.6, yaw: 0.35, fov: 30 },
  ];
  views.forEach((v, i) => add({ id: 'v' + i, at: i * 2, draw(lt, d, t, blit) { m.play('idle', 1.2); m.talk(0, 0.25);
    frame(cam, { target: v.target(), dist: v.dist, yaw: v.yaw, pitch: 0, fov: v.fov }); E.render(V.scene, cam, { ao: 0.6, vignette: 0.2, aperture: 0 }); blit(); } }));
}
