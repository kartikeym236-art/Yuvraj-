import * as THREE from 'three';
import { add, cue, cut, Wd, V3, eio, seg, lerpV, debugCam } from './core/timeline.js';
import * as SETS from './core/sets.js';
import { realHead } from './core/anatomy.js';
import { bodyAnatomy, PARTS_PRELOAD } from './core/anatomy_body.js';
import { A } from './core/assets.js';

const HEAD = ['brain', 'skull', 'mandible', 'tongue', 'softpalate', 'nerves', 'carotid', 'circle', 'aca', 'mca', 'basilar'];
const BODYP = ['heartwall', 'heart', 'lungR', 'lungL', 'liver', 'stomach', 'smallint', 'largeint', 'kidneyR', 'kidneyL', 'pancreas', 'spleen',
  'ribcage', 'spine', 'pelvis', 'arteries_all', 'skin'];
export const PRELOAD = {
  models: { head: 'assets/models/lps_LeePerrySmith.glb' }, hdri: { studio: 'assets/hdri/studio_small_09_2k.hdr' },
  obj: { ...Object.fromEntries(HEAD.map((k) => [k, `assets/anatomy/${k}.obj`])), ...PARTS_PRELOAD(BODYP) },
  tex: { col: 'assets/models/lps_Map-COL.jpg', nrm: 'assets/models/lps_Infinite-Level_02_Tangent_SmoothUV.jpg', spec: 'assets/models/lps_Map-SPEC.jpg' },
};
export function buildShots(E) {
  const V = SETS.studioVoid(A.env.studio), gmat = SETS.glassMaterial();
  const H = SETS.scanHead(A.models.head, A.tex.col, A.tex.nrm, gmat, { spec: A.tex.spec }); H.group.position.set(0, 1.6, 0); V.scene.add(H.group);
  const AN = realHead(A); H.group.add(AN.group);
  const BODY = bodyAnatomy(A); BODY.group.position.x = 1.2; V.scene.add(BODY.group);   // standing next to the bust
  const VS = SETS.vessel(E);
  const cam = E.camera(30), LOOK = { aperture: 0.0015, bloom: 0.12, bloomThreshold: 0.9 }, LX = { aperture: 0.0008, bloom: 0.3, bloomThreshold: 0.78 };
  const C = V3(0, 1.66, 0.02);
  window.__D = { V, H, AN, BODY, VS, cam };
  const reset = (x) => { H.setXray(x); AN.reset(); AN.group.visible = x > 0; H.group.visible = true; BODY.group.visible = false; BODY.reset(); };
  add({ id: 'S1', at: 0, note: 'skin 3/4', draw(lt, d, t, blit) {
    reset(0);
    cam.position.copy(lerpV(V3(0.45, 1.72, 0.95), V3(0.35, 1.7, 0.8), eio(lt / d))); cam.lookAt(C); debugCam(cam);
    E.render(V.scene, cam, { ...LOOK, focus: cam.position.distanceTo(C) }); blit(); } });
  add({ id: 'S2', at: Wd('Skin', 1), transition: { type: 'dissolve', dur: 0.4 }, note: 'glass + anatomy', draw(lt, d, t, blit) {
    reset(1); AN.setNerves(seg(t, Wd('glows', 1), Wd('glows', 1) + 0.6)); AN.setCold(seg(lt, 0.3, 1));
    cam.position.copy(lerpV(V3(0.55, 1.7, 0.6), V3(0.62, 1.68, 0.2), eio(lt / d))); cam.lookAt(C); debugCam(cam);
    E.render(V.scene, cam, { ...LX, focus: cam.position.distanceTo(C) }); blit(); } });
  add({ id: 'S3', at: cut(2), transition: { type: 'whip', dur: 0.35 }, note: 'glass body, organs', draw(lt, d, t, blit) {
    reset(0); H.group.visible = false; BODY.group.visible = true; BODY.show(['skin', 'heart', 'lungs', 'liver', 'stomach', 'gut', 'kidneys', 'arteries', 'bones', 'pancreas', 'spleen']);
    BODY.setPulse(Math.max(0, Math.sin(t * 7))); BODY.setFlow(t);
    const T = V3(1.2, 1.2, 0); cam.position.copy(lerpV(V3(1.55, 1.35, 1.35), V3(1.45, 1.3, 1.1), eio(lt / d))); cam.lookAt(T); debugCam(cam);
    E.render(V.scene, cam, { ...LX, ao: 0, focus: cam.position.distanceTo(T) }); blit(); } });
  add({ id: 'S4', at: Wd('inside', 2), transition: { type: 'zoomblur', dur: 0.4 }, note: 'vessel', draw(lt, d, t, blit) {
    const z = -lt * 1.2; VS.update(t, z, 0, 0, 0); VS.cam.position.set(0, 0, z); VS.cam.lookAt(0.1, -0.05, z - 5);
    E.render(VS.scene, VS.cam, VS.look); blit(); } });
  add({ id: 'S5', at: cut(3), transition: { type: 'flip', dur: 0.35 }, note: 'heart close', draw(lt, d, t, blit) {
    reset(0); H.group.visible = false; BODY.group.visible = true; BODY.show(['heart', 'lungs', 'arteries']); BODY.setPulse(Math.max(0, Math.sin(t * 7)));
    const T = BODY.centre('heart'); cam.position.copy(T).add(lerpV(V3(0.12, 0.05, 0.42), V3(0.18, 0.04, 0.32), eio(lt / d))); cam.lookAt(T); debugCam(cam);
    E.render(V.scene, cam, { ...LX, ao: 0, focus: cam.position.distanceTo(T) }); blit(); } });
  cue(Wd('Skin', 1), 'whoosh_soft', { dur: 0.6, gain: 0.4 }); cue(cut(2), 'whoosh', { gain: 0.35 }); cue(Wd('inside', 2), 'whoosh_soft', { gain: 0.4 });
  cue(cut(3), 'heartbeat_fast', { dur: 2, bpm: 80, gain: 0.5 });
}
