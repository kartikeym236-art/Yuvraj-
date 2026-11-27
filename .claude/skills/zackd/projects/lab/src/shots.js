import * as THREE from 'three';
import { add, cue, cut, Wd, V3, eio, seg, lerpV, debugCam } from './core/timeline.js';
import * as SETS from './core/sets.js';
import { realHead } from './core/anatomy.js';
import { A } from './core/assets.js';

export const PRELOAD = {
  models: { head: 'assets/models/lps_LeePerrySmith.glb' }, hdri: { studio: 'assets/hdri/studio_small_09_2k.hdr' },
  obj: Object.fromEntries(['brain', 'skull', 'mandible', 'tongue', 'softpalate', 'nerves', 'carotid', 'circle', 'aca', 'mca', 'basilar'].map((k) => [k, `assets/anatomy/${k}.obj`])),
  tex: { col: 'assets/models/lps_Map-COL.jpg', nrm: 'assets/models/lps_Infinite-Level_02_Tangent_SmoothUV.jpg', spec: 'assets/models/lps_Map-SPEC.jpg' },
};
export function buildShots(E) {
  const V = SETS.studioVoid(A.env.studio), gmat = SETS.glassMaterial();
  const H = SETS.scanHead(A.models.head, A.tex.col, A.tex.nrm, gmat, { spec: A.tex.spec }); H.group.position.set(0, 1.6, 0); V.scene.add(H.group);
  const AN = realHead(A); H.group.add(AN.group);
  const cam = E.camera(30), LOOK = { aperture: 0.0015, bloom: 0.12, bloomThreshold: 0.9 }, LX = { aperture: 0.0008, bloom: 0.3, bloomThreshold: 0.78 };
  const C = V3(0, 1.66, 0.02);
  window.__D = { V, H, AN, cam };
  add({ id: 'S1', at: 0, note: 'skin 3/4', draw(lt, d, t, blit) {
    H.setXray(0); AN.group.visible = false;
    cam.position.copy(lerpV(V3(0.45, 1.72, 0.95), V3(0.35, 1.7, 0.8), eio(lt / d))); cam.lookAt(C); debugCam(cam);
    E.render(V.scene, cam, { ...LOOK, focus: cam.position.distanceTo(C) }); blit(); } });
  add({ id: 'S2', at: cut(1), transition: { type: 'dissolve', dur: 0.4 }, note: 'glass + anatomy', draw(lt, d, t, blit) {
    H.setXray(1); AN.reset(); AN.group.visible = true; AN.setNerves(seg(t, Wd('glows', 1), Wd('glows', 1) + 0.6));
    cam.position.copy(lerpV(V3(0.55, 1.7, 0.6), V3(0.62, 1.68, 0.2), eio(lt / d))); cam.lookAt(C); debugCam(cam);
    E.render(V.scene, cam, { ...LX, focus: cam.position.distanceTo(C) }); blit(); } });
  cue(cut(1), 'whoosh_soft', { dur: 0.6, gain: 0.4 });
}
