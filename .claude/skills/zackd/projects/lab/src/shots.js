import * as THREE from 'three';
import { add, V3, TL } from './core/timeline.js';
import { actor, ACTOR_MODELS } from './core/actors.js';
import { room } from './core/rooms.js';
import { frame } from './core/camera.js';
import { A } from './core/assets.js';
export const PRELOAD = { hdri: { studio: 'assets/hdri/studio_small_09_2k.hdr' }, models: { ...ACTOR_MODELS } };
export async function buildShots(E) {
  const cam = E.camera(30); const R = room(E, { env: A.env.studio });
  const a = actor('rpm', { shirt: '#ffffff' }).hair('neat', { color: '#1c140f' }); a.part('Beard', false);
  const b = actor('rpm', { shirt: '#6b4b3a', skin: 0.8 }).hair('messy', { color: '#3a2a1e', seed: 3 });
  const c = actor('rpm', { shirt: '#2f62d8' }).hair('short', { color: '#111' });
  [a, b, c].forEach((x, i) => { x.group.position.set(-0.7 + i * 0.7, 0, -1); R.scene.add(x.group); });
  const chair = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), new THREE.MeshStandardMaterial({ color: '#333' })); chair.position.set(1.3, 0.25, -1.1); R.scene.add(chair);
  const d = actor('rpm', { shirt: '#c0392b' }).hair('neat'); d.group.position.set(1.3, 0, -1.0); R.scene.add(d.group);
  const pose = (t) => { a.play('idle', t).pose({ armR: [-1.2, 0, 0], foreR: [0, -1.2, 0] }).grip('R', 0.7); b.play('idle', t).pose({ armR: [0, 0, -1.2], foreR: [-1.2, 0, 0] }).grip('R', 0.7); c.play('idle', t).pose({ armR: [0, -1.2, 0], foreR: [0, 0, -1.2] }).grip('R', 0.7); d.play('idle', t).sit(1); };
  add({ id: 'front', at: 0, draw(lt, dd, t, blit) { pose(t); frame(cam, { target: V3(0, 1.3, -1), dist: 4.0, yaw: 0, pitch: 0, fov: 30 }); E.render(R.scene, cam, { ao: 0.5 }); blit(); } });
  add({ id: 'heads', at: 3, draw(lt, dd, t, blit) { pose(t); frame(cam, { target: V3(0, 1.3, -1), dist: 4.0, yaw: 1.3, pitch: 0, fov: 30 }); E.render(R.scene, cam, { ao: 0.5 }); blit(); } });
  add({ id: 'back', at: 6, draw(lt, dd, t, blit) { pose(t); frame(cam, { target: V3(1.3, 1.0, -1), dist: 2.6, yaw: 1.2, pitch: -0.05, fov: 30 }); E.render(R.scene, cam, { ao: 0.5 }); blit(); } });
  add({ id: 'hands', at: 9, draw(lt, dd, t, blit) { pose(t); frame(cam, { target: a.at('RightHand').add(V3(0.05, -0.05, 0.05)), dist: 0.6, yaw: 0.0, pitch: -0.1, fov: 30 }); E.render(R.scene, cam, { ao: 0.5 }); blit(); } });
}
