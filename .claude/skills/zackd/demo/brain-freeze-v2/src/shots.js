// "Why Ice Cream Gives You Brain Freeze" - scanned head on the sky-blue void, glass x-ray head with BodyParts3D anatomy,
// blood-vessel macros. Every shot is a pure function of time; reset() first, then pose, camera, render, blit.
import * as THREE from 'three';
import { add, cue, cut, Wd, V3, eio, eo, seg, pulse, lerp, lerpV, debugCam, lineEnd } from './core/timeline.js';
import * as SETS from './core/sets.js';
import { realHead } from './core/anatomy.js';
import { glowSprite } from './core/materials.js';
import { A } from './core/assets.js';

const HEADP = ['brain', 'skull', 'mandible', 'tongue', 'softpalate', 'nerves', 'carotid', 'circle', 'aca', 'mca', 'basilar'];
export const PRELOAD = {
  models: { head: 'assets/models/lps_LeePerrySmith.glb' }, hdri: { studio: 'assets/hdri/studio_small_09_2k.hdr' },
  obj: Object.fromEntries(HEADP.map((k) => [k, `assets/anatomy/${k}.obj`])),
  tex: { col: 'assets/models/lps_Map-COL.jpg', nrm: 'assets/models/lps_Infinite-Level_02_Tangent_SmoothUV.jpg', spec: 'assets/models/lps_Map-SPEC.jpg' },
};

export function buildShots(E) {
  const V = SETS.studioVoid(A.env.studio, '#5BC4F0'), gmat = SETS.glassMaterial();
  const H = SETS.scanHead(A.models.head, A.tex.col, A.tex.nrm, gmat, { spec: A.tex.spec });
  const HP = V3(0, 1.6, 0); H.group.position.copy(HP); V.scene.add(H.group);
  const AN = realHead(A); H.group.add(AN.group);
  const VS = SETS.vessel(E);
  const cone = SETS.iceCream(['#FFF3DC', '#F7A8C2']); cone.scale.setScalar(0.8); V.scene.add(cone);
  // head-local landmarks (metres from the bust centre)
  const LIPS = V3(0, 0.026, 0.1), FORE = V3(0, 0.118, 0.085), BRAIN = V3(0, 0.1, -0.005);
  const W = (v) => H.group.localToWorld(v.clone());
  const pain = glowSprite('#ff2a1a', 0.16); pain.position.copy(FORE).add(V3(0, 0, 0.02)); H.group.add(pain);
  const painIn = glowSprite('#ff3a1a', 0.12); painIn.position.copy(BRAIN).add(V3(0, 0.01, 0.04)); H.group.add(painIn);
  const cam = E.camera(30);
  const LOOK = { aperture: 0.0015, bloom: 0.12, bloomThreshold: 0.9 };
  const LX = { aperture: 0.0008, bloom: 0.3, bloomThreshold: 0.78, ao: 0.5 };
  const LXG = { exposure: 0.82, aperture: 0.0008, bloom: 0.18, bloomThreshold: 0.88, ao: 0.5 };   // glowing-brain shots
  const T0 = W(V3(0, 0.06, 0.04));                                       // shot-1 look-at (loop target)
  const CAM0 = V3(0.42, 1.69, 0.86), CAM0b = V3(0.36, 1.68, 0.74);

  function reset(x = 0) {
    H.group.position.copy(HP); H.group.rotation.set(0, 0, 0); H.group.updateMatrixWorld(true);
    H.setXray(x); AN.reset(); AN.group.visible = x > 0;
    gmat.uniforms.uCol.value.set('#E9F7FF'); pain.material.opacity = 0; painIn.material.opacity = 0;
    cone.visible = false; V.setColor('#5BC4F0');
  }
  /** cone with its top scoop touching the lips; k = 0 far away .. 1 at the lips; bite = small dip */
  function placeCone(k, bite = 0) {
    cone.visible = true; const lips = W(LIPS);
    const away = V3(0.02, -0.16, 0.2).multiplyScalar(1 - eio(k));
    cone.rotation.set(-0.95 + 0.1 * bite, 0.12, 0.05);                  // tilted toward the face
    const top = V3(0, 0.168 * 0.8, 0).applyEuler(cone.rotation);               // scoop top in cone space
    cone.position.copy(lips).sub(top).add(V3(0.006, -0.012 - 0.006 * bite, 0.03 + 0.006 * bite)).add(away);
  }
  const shoot = (from, to, look, lt, d, L, tgt) => { cam.position.copy(lerpV(from, to, eio(Math.min(1, lt / d)))); cam.lookAt(tgt); debugCam(cam);
    E.render(V.scene, cam, { ...L, focus: cam.position.distanceTo(tgt) }); };

  // L0 "If you eat ice cream too fast," - mid-bite, frame 0 is action
  add({ id: 'S01', at: 0, note: 'mid-bite, cone at the lips (loop start)', draw(lt, d, t, blit) {
    reset(0); placeCone(1, pulse(t, 0, 1.2) + pulse(t, 1.3, 2.3) * 0.8);
    shoot(CAM0, CAM0b, null, lt, d, LOOK, T0); blit(); } });
  cue(0.05, 'crunch', { gain: 0.35, dur: 0.6 }); cue(1.35, 'crunch', { gain: 0.3, dur: 0.5 });
  // L1 "you might get a sudden, stabbing pain right behind your forehead."
  add({ id: 'S02', at: cut(1), transition: { type: 'zoomblur', dur: 0.3 }, note: 'face close, wince', draw(lt, d, t, blit) {
    reset(0); const k = seg(t, Wd('stabbing', 1), Wd('stabbing', 1) + 0.35);
    H.group.rotation.set(-0.1 * k, 0.12 * k, 0.04 * k); H.group.updateMatrixWorld(true);
    placeCone(1 - eio(seg(lt, 0, 0.8)));                                  // cone pulls away
    pain.material.opacity = k * (0.55 + 0.25 * Math.sin(t * 14)); pain.scale.setScalar(0.12 + 0.05 * k);
    const T = W(V3(0, 0.08, 0.06)); shoot(V3(0.26, 1.71, 0.62), V3(0.2, 1.7, 0.52), null, lt, d, LOOK, T); blit(); } });
  cue(Wd('stabbing', 1), 'thud', { gain: 0.4 });
  // L2 "It's called brain freeze, but your brain isn't actually freezing."
  add({ id: 'S03', at: cut(2), transition: { type: 'dissolve', dur: 0.45 }, note: 'skin -> glass, icy brain', draw(lt, d, t, blit) {
    reset(1); const ice = 1 - seg(t, Wd('isn', 2), Wd('isn', 2) + 0.8);
    AN.brainMat.color.set('#E7B7B1').lerp(new THREE.Color('#9fdcff'), ice * 0.8); AN.brainMat.emissive.set('#3ab0ff'); AN.brainMat.emissiveIntensity = 0.25 * ice;
    const T = W(BRAIN); shoot(V3(0.5, 1.75, 0.62), V3(0.42, 1.73, 0.5), null, lt, d, LXG, T); blit(); } });
  cue(cut(2) + 0.05, 'shimmer', { dur: 1.2, gain: 0.35 });
  add({ id: 'S04', at: Wd('but', 2), transition: { type: 'flip', dur: 0.3 }, note: 'normal brain, side', draw(lt, d, t, blit) {
    reset(1); const T = W(BRAIN); shoot(V3(0.62, 1.72, 0.12), V3(0.58, 1.72, 0.02), null, lt, d, LX, T); blit(); } });
  cue(Wd('but', 2), 'whoosh_soft', { gain: 0.35, dur: 0.5 });
  // L3 "When something ice cold touches the roof of your mouth,"
  add({ id: 'S05', at: cut(3), transition: { type: 'dissolve', dur: 0.4 }, note: 'glass side, cone in, palate goes icy', draw(lt, d, t, blit) {
    reset(1); placeCone(0.6 + 0.4 * eio(seg(lt, 0, 1.2)));
    AN.setCold(seg(t, Wd('touches', 3), Wd('touches', 3) + 0.6));
    const T = W(V3(0, 0.03, 0.05)); shoot(V3(0.5, 1.64, 0.3), V3(0.44, 1.64, 0.2), null, lt, d, LX, T); blit(); } });
  cue(Wd('touches', 3), 'sparkle', { dur: 0.9, gain: 0.3 });
  // L4 "it chills the blood vessels running just above it." - inside a vessel, icy
  add({ id: 'S06', at: cut(4), transition: { type: 'zoomblur', dur: 0.35 }, note: 'vessel, cold', draw(lt, d, t, blit) {
    const z = -lt * 0.9; VS.update(t, z, 0, 0, eio(seg(lt, 0, 1.5)) * 0.9);
    VS.cam.position.set(0.12, -0.1, z); VS.cam.lookAt(0.05, 0, z - 5); E.render(VS.scene, VS.cam, VS.look); blit(); } });
  cue(cut(4), 'whoosh_soft', { gain: 0.4, dur: 0.6 });
  // L5 "Scientists think your body panics,"
  add({ id: 'S07', at: cut(5), transition: { type: 'zoomblur', dur: 0.3 }, note: 'glass head 3/4, arteries flash', draw(lt, d, t, blit) {
    reset(1); AN.setCold(1 - seg(lt, 0, 1)); const k = pulse(t, Wd('panics', 5), Wd('panics', 5) + 0.9);
    AN.arteryMat.emissive.set('#ff2020'); AN.arteryMat.emissiveIntensity = 0.5 * k * (0.6 + 0.4 * Math.sin(t * 18));
    const T = W(V3(0, 0.05, 0.02)); shoot(V3(0.38, 1.7, 0.66), V3(0.32, 1.69, 0.58), null, lt, d, LX, T); blit(); } });
  cue(Wd('panics', 5), 'heartbeat_fast', { dur: 1.4, bpm: 130, gain: 0.45 });
  // L6 "and the arteries feeding your brain suddenly widen,"
  add({ id: 'S08', at: cut(6), transition: { type: 'whip', dur: 0.3, dir: -1 }, note: 'arteries widen', draw(lt, d, t, blit) {
    reset(1); AN.show(['brain', 'skull', 'arteries', 'tongue', 'softpalate']);
    AN.setWiden(eio(seg(t, Wd('widen', 6), Wd('widen', 6) + 0.5)));
    AN.arteryMat.emissive.set('#ff2a2a'); AN.arteryMat.emissiveIntensity = 0.25;
    const T = W(V3(0, 0.02, 0.0)); shoot(V3(0.34, 1.6, 0.42), V3(0.3, 1.62, 0.34), null, lt, d, LX, T); blit(); } });
  cue(Wd('widen', 6), 'slide', { dur: 0.6, gain: 0.35 });
  // L7 "rushing in warm blood to protect it." - fast warm vessel
  add({ id: 'S09', at: cut(7), transition: { type: 'zoomblur', dur: 0.3 }, note: 'vessel, warm rush', draw(lt, d, t, blit) {
    const z = -lt * 3.2; VS.update(t * 1.8, z, 0, 0, 0);
    VS.cam.position.set(-0.1, 0.12, z); VS.cam.lookAt(0, 0, z - 5); E.render(VS.scene, VS.cam, { ...VS.look, warm: 0.6, exposure: 0.95 }); blit(); } });
  cue(cut(7), 'whoosh', { gain: 0.4 });
  // L8 "But that sudden rush raises the pressure inside your head,"
  add({ id: 'S10', at: cut(8), transition: { type: 'flip', dur: 0.32 }, note: 'pressure: glass goes red, pulsing', draw(lt, d, t, blit) {
    reset(1); AN.setWiden(1); const k = seg(t, Wd('pressure', 8), Wd('pressure', 8) + 0.6);
    gmat.uniforms.uCol.value.set('#E9F7FF').lerp(new THREE.Color('#ff4a4a'), k * (0.65 + 0.35 * Math.sin(t * 9)));
    painIn.material.opacity = 0.35 * k;
    const T = W(V3(0, 0.07, 0.01)); shoot(V3(-0.42, 1.73, 0.55), V3(-0.36, 1.72, 0.46), null, lt, d, LXG, T); blit(); } });
  cue(cut(8), 'whoosh_soft', { gain: 0.35, dur: 0.5 }); cue(Wd('pressure', 8), 'rumble', { dur: 1.2, gain: 0.4 });
  // L9 "and the nerves there read it as a stabbing headache."
  add({ id: 'S11', at: cut(9), transition: { type: 'dissolve', dur: 0.35 }, note: 'nerves glow yellow', draw(lt, d, t, blit) {
    reset(1); AN.setWiden(1); AN.setNerves(seg(t, Wd('nerves', 9), Wd('nerves', 9) + 0.5));
    const k = seg(t, Wd('stabbing', 9), Wd('stabbing', 9) + 0.3); painIn.material.opacity = 0.7 * k * (0.7 + 0.3 * Math.sin(t * 15));
    const T = W(V3(0, 0.06, 0.06)); shoot(V3(0.3, 1.7, 0.45), V3(0.24, 1.69, 0.38), null, lt, d, LXG, T); blit(); } });
  cue(Wd('nerves', 9), 'zip', { gain: 0.3 }); cue(Wd('stabbing', 9), 'thud', { gain: 0.4 });
  // L10 "The good news is that it's harmless, and it fades within a minute or two."
  add({ id: 'S12', at: cut(10), transition: { type: 'dissolve', dur: 0.45 }, note: 'skin, calm, slow pull-out', draw(lt, d, t, blit) {
    reset(0); const fade = 1 - seg(t, Wd('fades', 10), Wd('fades', 10) + 1.4);
    pain.material.opacity = 0.35 * fade; H.group.rotation.set(-0.05 * fade, 0.06 * fade, 0); H.group.updateMatrixWorld(true);
    const T = W(V3(0, 0.05, 0.03)); shoot(V3(-0.3, 1.7, 0.62), V3(-0.5, 1.68, 1.15), null, lt, d, LOOK, T); blit(); } });
  cue(Wd('harmless', 10), 'sparkle', { dur: 1, gain: 0.25 });
  // L11 "And to make it stop even faster,"
  add({ id: 'S13', at: cut(11), transition: { type: 'whip', dur: 0.3 }, note: 'glass mouth side', draw(lt, d, t, blit) {
    reset(1); AN.setCold(0.5);
    const T = W(V3(0, 0.02, 0.04)); shoot(V3(0.5, 1.6, 0.36), V3(0.44, 1.6, 0.3), null, lt, d, LX, W(V3(0, 0.0, 0.04))); blit(); } });
  // L12 "press your tongue against the roof of your mouth, and warm it back up."
  add({ id: 'S14', at: cut(12), note: 'tongue presses up', draw(lt, d, t, blit) {
    reset(1); AN.setTongue(eio(seg(t, Wd('press', 12), Wd('press', 12) + 0.7)));
    const w = seg(t, Wd('warm', 12), Wd('warm', 12) + 0.8); AN.setCold(0.5 * (1 - seg(t, Wd('press', 12), Wd('warm', 12)))); AN.setWarm(w);
    const T = W(V3(0, 0.02, 0.04)); shoot(V3(0.44, 1.6, 0.3), V3(0.4, 1.6, 0.26), null, lt, d, LX, W(V3(0, 0.0, 0.04))); blit(); } });
  cue(Wd('press', 12), 'gulp', { gain: 0.3 }); cue(Wd('warm', 12), 'shimmer', { dur: 1, gain: 0.3 });
  // loop: last ~1.4 s returns to shot 1's exact framing and the cone coming back to the lips
  add({ id: 'S15', at: Wd('back', 12) - 0.2, transition: { type: 'dissolve', dur: 0.4 }, note: 'loop back to frame 0', draw(lt, d, t, blit) {
    reset(0); placeCone(eio(seg(lt, 0, d)));
    const k = eio(seg(lt, 0, d)); cam.position.copy(lerpV(CAM0b, CAM0, k)); cam.lookAt(T0); debugCam(cam);
    E.render(V.scene, cam, { ...LOOK, focus: cam.position.distanceTo(T0) }); blit(); } });
}
