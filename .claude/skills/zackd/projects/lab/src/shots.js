import * as THREE from 'three';
import { add, V3 } from './core/timeline.js';
import { actor, ACTOR_MODELS } from './core/actors.js';
import { room } from './core/rooms.js';
import { frame } from './core/camera.js';
import { A } from './core/assets.js';
export const PRELOAD = { hdri: { studio: 'assets/hdri/studio_small_09_2k.hdr' }, models: { ...ACTOR_MODELS } };
export async function buildShots(E) {
  const cam = E.camera(30); const R = room(E, { env: A.env.studio });
  const m = [0, 1, 2].map((i) => { const a = actor('rpm', { shirt: ['#f4f4f2', '#6f7f8c', '#3e8f5a'][i] }).hair(['neat', 'messy', 'short'][i]); a.group.position.set(-0.75 + i * 0.75, 0, -1); R.scene.add(a.group); return a; });
  const pose = (t) => { m[0].play('idle', t);                                                               // natural stand
    m[1].play('idle', t).aim('R', { upper: [-0.55, -0.55, 0.65], fore: [0.55, -0.05, 0.85], palm: [0.2, -1, 0] }).aim('L', { upper: [0.5, -0.6, 0.6], fore: [-0.55, 0, 0.85], palm: [-0.2, -1, 0] }).grip('R', 0.5).grip('L', 0.4);
    m[2].play('idle', t).aim('R', { upper: [-0.5, 0.55, 0.25], fore: [0.55, 0.45, -0.5], palm: [0, -0.5, -1] }).grip('R', 0.5); };      // holding at chest
  add({ id: 'front', at: 0, draw(lt, d, t, blit) { pose(t); frame(cam, { target: V3(0, 1.15, -1), dist: 4.6, yaw: 0, pitch: 0, fov: 30 }); E.render(R.scene, cam, { ao: 0.5 }); blit(); } });
  add({ id: 'side', at: 3, draw(lt, d, t, blit) { pose(t); frame(cam, { target: V3(0, 1.15, -1), dist: 4.6, yaw: 1.2, pitch: 0, fov: 30 }); E.render(R.scene, cam, { ao: 0.5 }); blit(); } });
  add({ id: 'hand', at: 6, draw(lt, d, t, blit) { pose(t); frame(cam, { target: V3(0, 1.4, -1), dist: 2.2, yaw: -0.5, pitch: 0, fov: 30 }); E.render(R.scene, cam, { ao: 0.5 }); blit(); } });
}
