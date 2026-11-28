// "The Two Barbers" puzzle - Things Explained, on the user's voiceover (voiceover_7.mp3, 52.5 s).
// Reference style (STYLE_REFS.md): realistic rigged people (actors.js) in believable sets, one slow eased move per caption
// phrase with handheld sway + shallow focus, physical explainers (stamp, ?, labels). Hands that hold things are posed
// explicitly (grip) and checked on the sheet.
import * as THREE from 'three';
import { add, cue, cut, Wd, V3, eio, eo, seg, pulse, lerp, lineStart, lineEnd, TL } from './core/timeline.js';
import { actor, ACTOR_MODELS } from './core/actors.js';
import { shot, frame, handheld } from './core/camera.js';
import { nameTag } from './core/devices.js';
import * as FX from './core/fx.js';
import { glowSprite } from './core/materials.js';
import { A } from './core/assets.js';
import { shop, street, scissors, falling, cape } from './barber_props.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

export const PRELOAD = { hdri: { studio: 'assets/hdri/studio_small_09_2k.hdr', sunset: 'assets/hdri/venice_sunset_1k.hdr' }, models: { ...ACTOR_MODELS } };

export async function buildShots(E) {
  const cam = E.camera(32);
  const S1 = shop(E, A.env.studio, { clean: true }), S2 = shop(E, A.env.studio, { clean: false }), ST = street(E, A.env.sunset);
  const LOOK = { aperture: 0.0016, maxblur: 0.009, bloom: 0.1, bloomThreshold: 0.9, ao: 0.6, vignette: 0.32, warm: 0.12 };
  const LOOK_ST = { ...LOOK, aperture: 0.0008, warm: 0.18 };

  // ---------- cast ----------
  const mkB1 = () => actor('rpm', { shirt: '#f4f4f2', pants: '#2b2d33' }).hair('neat', { color: '#1a120c' }).part('Beard', false);
  const mkB2 = () => actor('rpm', { shirt: '#6f7f8c', pants: '#3a3026', skin: 0.86 }).hair('messy', { color: '#4a3524', seed: 3 });
  const B1 = mkB1(), B2 = mkB2();                       // the barbers (moved between sets as needed)
  const you = actor('rpm', { shirt: '#3e8f5a', pants: '#2c3440', skin: 0.95 }).hair('short', { color: '#7a5a3a', seed: 7 }).part('Beard', false);
  const extras = [
    actor('rpm', { shirt: '#c0392b', pants: '#2c3e50' }).hair('short', { color: '#111' }).part('Beard', false),
    actor('rpm', { shirt: '#2a7bd6', pants: '#3b3b3b', skin: 0.78 }).hair('neat', { color: '#0e0e0e', seed: 9 }),
    actor('rpm', { shirt: '#e0a020', pants: '#34495e', skin: 0.7 }).hair('short', { color: '#0d0d0d' }),
    actor('rpm', { shirt: '#7a5ab0', pants: '#222' }).hair('neat', { color: '#6b4a2a', seed: 5 }).part('Beard', false),
  ];
  const allPeople = [B1, B2, you, ...extras];
  // props
  const sc1 = scissors(), sc2 = scissors(); const fall = falling(70, '#2b1d12'), fall2 = falling(70, '#4a3524');
  const capeM = cape('#16181c'), capeM2 = cape('#22252b');
  const suitcase = new THREE.Group(); { const b = new THREE.Mesh(new RoundedBoxGeometry(0.42, 0.55, 0.18, 4, 0.03), new THREE.MeshPhysicalMaterial({ color: '#b5482f', roughness: 0.4, clearcoat: 0.5 }));
    b.position.y = -0.3; b.castShadow = true; suitcase.add(b); const h = new THREE.Mesh(new THREE.TorusGeometry(0.05, 0.01, 8, 16, Math.PI), new THREE.MeshStandardMaterial({ color: '#222' })); h.position.y = -0.02; suitcase.add(h); }
  const qm = FX.bigText('?', { height: 0.5, color: '#ffffff', depthColor: '#00000088' });
  const stampW = FX.stamp('WRONG CHOICE', '#d0202a', { w: 1.6 }), stampX = FX.stamp('NO!', '#d0202a', { w: 0.45 }), stampOK = FX.stamp('SKILLED', '#1f9d55', { w: 0.3 });
  const tag1 = nameTag('BARBER 1', { color: '#1f4fd6' }), tag2 = nameTag('BARBER 2', { color: '#c0392b' });
  const endT = FX.bigText('Things Explained', { height: 0.42, color: '#ffffff', depthColor: '#00000088' });
  const bubble = new THREE.Group(); { const b = new THREE.Mesh(new RoundedBoxGeometry(0.8, 0.5, 0.08, 5, 0.12), new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.4 })); bubble.add(b);
    const tail = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.16, 3), b.material); tail.position.set(-0.22, -0.3, 0); tail.rotation.z = 0.5; bubble.add(tail);
    const d = [-0.2, 0, 0.2].map((x) => { const s = new THREE.Mesh(new THREE.SphereGeometry(0.045, 16, 12), new THREE.MeshStandardMaterial({ color: '#2b5fd9' })); s.position.set(x, 0, 0.05); bubble.add(s); return s; }); bubble.userData.dots = d; }
  const sparks = Array.from({ length: 6 }, () => glowSprite('#ffffff', 0.12));
  const glint = new THREE.Mesh(new THREE.PlaneGeometry(0.35, 1.4), new THREE.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }));
  glint.rotation.z = 0.5;

  // ---------- staging helpers ----------
  const place = (scene, ...objs) => objs.forEach((o) => { const g = o.group || o.mesh || o; if (g.parent !== scene) scene.add(g); g.visible = true; });
  const hideAll = () => { allPeople.forEach((p) => (p.group.visible = false)); [sc1.group, sc2.group, fall.mesh, fall2.mesh, capeM, capeM2, suitcase, qm.group, stampW.group, stampX.group, stampOK.group,
    tag1.group, tag2.group, endT.group, bubble, glint, ...sparks].forEach((o) => (o.visible = false)); };
  const pos = (a, x, z, ry = 0) => { a.group.position.set(x, 0, z); a.group.rotation.set(0, ry, 0); };
  const boneQ = (a, b) => { a.group.updateMatrixWorld(true); return a.bones[b].getWorldQuaternion(new THREE.Quaternion()); };
  const holdScissors = (a, s, t, on = 1) => {                       // scissors in the right hand, blades forward, snipping
    const q = boneQ(a, 'RightHand'); s.group.position.copy(a.at('RightHand')).add(new THREE.Vector3(0, 0.06, 0.03).applyQuaternion(q));
    s.group.quaternion.copy(q).multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI / 2, 0, 0))); s.snip(on * Math.abs(Math.sin(t * 9))); s.group.visible = true; };
  const cutting = (a, t) => { const w = Math.sin(t * 3.1) * 0.06;            // both hands at the customer's head, small working motion
    a.play('idle', t, { relax: 0 }).pose({ head: [0.3, 0, 0], spine: [0.18, 0, 0] })
      .aim('R', { upper: [-0.5, -0.65 + w, 0.6], fore: [0.6, -0.2 + w, 0.8], palm: [0.2, -1, 0] }).aim('L', { upper: [0.45, -0.7, 0.55], fore: [-0.55, -0.15 - w, 0.8], palm: [-0.2, -1, 0] })
      .grip('R', 0.5).grip('L', 0.4); return a; };
  const seated = (a, chair, scene, cp, t) => { const c = chair.getWorldPosition(new THREE.Vector3()); pos(a, c.x, c.z - 0.02, Math.PI); place(scene, a); a.play('idle', t).sit(1, { seat: 0.54 });
    cp.position.copy(a.at('Neck')).add(V3(0, -0.36, 0)); place(scene, cp); return c; };
  const barberBehind = (a, chair, scene, t, s) => { const c = chair.getWorldPosition(new THREE.Vector3()); pos(a, c.x + 0.12, c.z + 0.5, Math.PI - 0.1); place(scene, a); cutting(a, t); holdScissors(a, s, t); };
  const walkTo = (a, scene, from, to, t0, t1, t, speed = 1) => { const k = Math.min(1, Math.max(0, (t - t0) / (t1 - t0))); const p = from.clone().lerp(to, k);
    a.group.position.copy(p); const d = to.clone().sub(from); a.group.rotation.set(0, Math.atan2(d.x, d.z), 0); place(scene, a); a.play(k < 1 ? 'walk' : 'idle', t * speed); };
  const pop = (k) => (k <= 0 ? 0 : k < 0.7 ? (k / 0.7) * 1.12 : 1.12 - 0.12 * ((k - 0.7) / 0.3));
  const faceCam = (o) => o.quaternion.copy(cam.quaternion);
  const R = (scene, look, focus) => E.render(scene, cam, { ...look, focus });
  const chairA = S1.chairs[0], chairB = S2.chairs[0];

  // ===== L0 "You're new in town | and you need a haircut." - she walks into town with a suitcase (tracking)
  add({ id: 'A01', at: 0, note: 'you arrive, tracking', draw(lt, d, t, blit) { hideAll();
    const p = V3(-6 + t * 1.05, 0.14, -1.4); you.group.position.copy(p); you.group.rotation.set(0, Math.PI / 2, 0); place(ST.scene, you); you.play('walk', t);
    you.aim('R', { upper: [-0.12, -1, 0.02], fore: [-0.05, -1, 0.04], palm: [1, 0, 0] }).grip('R', 0.85); const q = boneQ(you, 'RightHand'); suitcase.position.copy(you.at('RightHand')).add(V3(0, -0.02, 0)); suitcase.quaternion.setFromEuler(new THREE.Euler(0, Math.PI / 2, 0)); place(ST.scene, suitcase);
    const f = shot(cam, { target: p.clone().add(V3(0.3, 1.1, 0)), dist: 4.4, yaw: 0.75, pitch: -0.04, fov: 32 }, { target: p.clone().add(V3(0.3, 1.15, 0)), dist: 3.6, yaw: 0.55, pitch: -0.02, fov: 32 }, lt, d, t);
    ST.s1.pole.update(t); ST.s2.pole.update(t); R(ST.scene, LOOK_ST, f); blit(); } });
  add({ id: 'A02', at: Wd('need', 0) - 0.15, note: 'close: she looks for a barber', draw(lt, d, t, blit) { hideAll();
    const p = V3(-6 + t * 1.05, 0.14, -1.4); you.group.position.copy(p); you.group.rotation.set(0, Math.PI / 2 - 0.5 * eio(seg(lt, 0, 0.8)), 0); place(ST.scene, you); you.blend('walk', 'idle', eio(seg(lt, 0, 0.6)), t);
    you.pose({ head: [-0.05, -0.35 * eio(seg(lt, 0.2, 1)), 0] });
    const h = you.at('Head'); const f = shot(cam, { target: h.clone().add(V3(0, 0.02, 0)), dist: 1.2, yaw: 1.2, pitch: 0, fov: 30 }, { target: h.clone().add(V3(0, 0.03, 0)), dist: 1.0, yaw: 1.05, pitch: 0, fov: 30 }, lt, d, t);
    R(ST.scene, { ...LOOK_ST, aperture: 0.003 }, f); blit(); } });
  // ===== L1 "There are only | two barbers." - the two shopfronts, side by side
  add({ id: 'A03', at: cut(1), transition: { type: 'dissolve', dur: 0.2 }, note: 'two shopfronts', draw(lt, d, t, blit) { hideAll(); ST.s1.pole.update(t); ST.s2.pole.update(t);
    const f = shot(cam, { target: V3(0, 2.3, -3.8), dist: 21, yaw: 0.7, pitch: -0.05, fov: 40 }, { target: V3(0, 2.2, -3.8), dist: 19, yaw: 0.62, pitch: -0.04, fov: 40 }, lt, d, t);
    const k1 = eo(seg(t, Wd('two', 1), Wd('two', 1) + 0.3)), k2 = eo(seg(t, Wd('two', 1) + 0.15, Wd('two', 1) + 0.45));
    place(ST.scene, tag1, tag2); tag1.group.position.set(-2.3, 5.0, -3.6); tag2.group.position.set(2.3, 5.0, -3.6);
    tag1.show(k1, cam); tag2.show(k2, cam); tag1.group.scale.multiplyScalar(3.2); tag2.group.scale.multiplyScalar(3.2);
    R(ST.scene, LOOK_ST, f); blit(); } });
  cue(Wd('two', 1), 'pop', { gain: 0.3 }); cue(Wd('two', 1) + 0.15, 'pop', { gain: 0.3 });
  // ===== L2 "Which one | do you choose?" - over her shoulder, she looks from one shop to the other
  add({ id: 'A04', at: cut(2), note: 'OTS: which one?', draw(lt, d, t, blit) { hideAll(); ST.s1.pole.update(t); ST.s2.pole.update(t);
    pos(you, 0.3, 1.2, Math.PI); place(ST.scene, you); you.play('idle', t); const look = Math.sin(eio(seg(lt, 0, d)) * Math.PI * 1.5) * 0.45;
    you.pose({ head: [0, look, 0], neck: [0, look * 0.4, 0] });
    const f = shot(cam, { target: V3(0.1, 2.0, -3.5), dist: 7.4, yaw: 0.12, pitch: -0.06, fov: 44 }, { target: V3(0.1, 2.0, -3.5), dist: 6.6, yaw: 0.06, pitch: -0.05, fov: 44 }, lt, d, t);
    R(ST.scene, { ...LOOK_ST, aperture: 0.0004 }, f); blit(); } });
  // ===== L3 "The first shop | is spotless." - shop 1 wide, sparkles
  add({ id: 'B01', at: cut(3), transition: { type: 'whip', dur: 0.3 }, note: 'shop 1 spotless', draw(lt, d, t, blit) { hideAll(); S1.pole.update(t);
    pos(B1, 0.0, -0.6, 0.15); place(S1.scene, B1); B1.play('idle', t);
    const f = shot(cam, { target: V3(0, 1.2, -1.2), dist: 3.4, yaw: -0.35, pitch: -0.12, fov: 36 }, { target: V3(0, 1.2, -1.3), dist: 2.9, yaw: -0.25, pitch: -0.1, fov: 36 }, lt, d, t);
    sparks.forEach((s, i) => { place(S1.scene, s); const ts = Wd('spotless', 3) + i * 0.12; s.position.set(-1.6 + i * 0.6, 0.05 + (i % 2) * 1.5, -2.2 + (i % 3) * 0.9); s.scale.setScalar(0.25 * pulse(t, ts, ts + 0.5)); });
    R(S1.scene, LOOK, f); blit(); } });
  cue(Wd('spotless', 3), 'sparkle', { gain: 0.35 });
  // ===== L4 "The floor is swept, | the mirrors shine," - floor insert (glossy tiles), then mirror glint
  add({ id: 'B02', at: cut(4), note: 'floor insert', draw(lt, d, t, blit) { hideAll(); S1.pole.update(t);
    const f = shot(cam, { target: V3(-0.6, 0.02, -0.4), dist: 1.6, yaw: 0.4, pitch: -0.32, fov: 30 }, { target: V3(0.2, 0.02, -0.6), dist: 1.5, yaw: 0.25, pitch: -0.3, fov: 30 }, lt, d, t);
    R(S1.scene, { ...LOOK, aperture: 0.004 }, f); blit(); } });
  add({ id: 'B03', at: Wd('mirrors', 4) - 0.25, note: 'mirror shine', draw(lt, d, t, blit) { hideAll(); S1.pole.update(t);
    place(S1.scene, glint); glint.position.set(lerp(-1.6, 1.6, eio(seg(lt, 0.15, d))), 1.65, -2.46);
    const f = shot(cam, { target: V3(0, 1.6, -2.4), dist: 2.2, yaw: -0.5, pitch: 0, fov: 32 }, { target: V3(0.1, 1.6, -2.4), dist: 2.0, yaw: -0.35, pitch: 0, fov: 32 }, lt, d, t);
    R(S1.scene, { ...LOOK, aperture: 0.002 }, f); blit(); } });
  cue(Wd('mirrors', 4) + 0.2, 'sparkle', { gain: 0.3 });
  // ===== L5 "and the barber himself | has a perfect, | sharp haircut." - barber 1, push in to his hair
  add({ id: 'B04', at: cut(5), note: 'barber 1 medium', draw(lt, d, t, blit) { hideAll(); S1.pole.update(t);
    pos(B1, -0.2, -0.5, 0.25); place(S1.scene, B1); B1.play('idle', t + 2).talk(0, 0.6);
    const h = B1.at('Head');
    const f = shot(cam, { target: h.clone().add(V3(0, -0.12, 0)), dist: 1.45, yaw: 0.45, pitch: 0.06, fov: 30 }, { target: h.clone().add(V3(0, -0.05, 0)), dist: 1.15, yaw: 0.35, pitch: 0.04, fov: 30 }, lt, d, t);
    R(S1.scene, LOOK, f); blit(); } });
  add({ id: 'B05', at: Wd('sharp', 5) - 0.2, note: 'his perfect hair close', draw(lt, d, t, blit) { hideAll(); S1.pole.update(t);
    pos(B1, -0.2, -0.5, 0.25); place(S1.scene, B1); B1.play('idle', t + 2).talk(0, 0.7);
    const h = B1.at('Head').add(V3(0, 0.1, 0)); const f = shot(cam, { target: h, dist: 0.75, yaw: 0.9, pitch: -0.1, fov: 28 }, { target: h, dist: 0.62, yaw: 0.7, pitch: -0.08, fov: 28 }, lt, d, t);
    sparks.slice(0, 2).forEach((s, i) => { place(S1.scene, s); s.position.copy(h).add(V3(-0.06 + i * 0.12, 0.08, 0.04)); s.scale.setScalar(0.08 * pulse(lt, 0.2 + i * 0.2, 0.8 + i * 0.2)); });
    R(S1.scene, { ...LOOK, aperture: 0.003 }, f); blit(); } });
  cue(Wd('sharp', 5), 'sparkle', { gain: 0.3 });
  // ===== L6 "The second shop | is a mess." - shop 2 wide
  add({ id: 'C01', at: cut(6), transition: { type: 'whip', dur: 0.3 }, note: 'shop 2 mess', draw(lt, d, t, blit) { hideAll(); S2.pole.update(t);
    const f = shot(cam, { target: V3(0, 1.0, -1.2), dist: 3.4, yaw: 0.35, pitch: -0.2, fov: 36 }, { target: V3(0, 1.0, -1.3), dist: 2.9, yaw: 0.25, pitch: -0.18, fov: 36 }, lt, d, t);
    R(S2.scene, { ...LOOK, warm: 0.25, saturation: 0.9 }, f); blit(); } });
  // ===== L7 "Hair everywhere, | a cracked mirror," - clippings low dolly, then crack
  add({ id: 'C02', at: cut(7), note: 'hair on floor', draw(lt, d, t, blit) { hideAll(); S2.pole.update(t);
    const f = shot(cam, { target: V3(-0.5, 0.02, -0.2), dist: 1.1, yaw: -0.3, pitch: -0.35, fov: 30 }, { target: V3(0.2, 0.02, -0.3), dist: 1.0, yaw: -0.15, pitch: -0.3, fov: 30 }, lt, d, t);
    R(S2.scene, { ...LOOK, aperture: 0.004, warm: 0.25 }, f); blit(); } });
  add({ id: 'C03', at: Wd('cracked', 7) - 0.2, note: 'cracked mirror', draw(lt, d, t, blit) { hideAll(); S2.pole.update(t);
    const f = shot(cam, { target: V3(0.5, 1.75, -2.45), dist: 1.6, yaw: 0.35, pitch: -0.02, fov: 30 }, { target: V3(0.5, 1.75, -2.45), dist: 1.3, yaw: 0.25, pitch: -0.02, fov: 30 }, lt, d, t);
    R(S2.scene, { ...LOOK, aperture: 0.002, warm: 0.25 }, f); blit(); } });
  cue(Wd('cracked', 7), 'thud', { gain: 0.35 });
  // ===== L8 "and the barber's own hair | looks terrible." - barber 2, push in on the hair
  add({ id: 'C04', at: cut(8), note: 'barber 2 close', draw(lt, d, t, blit) { hideAll(); S2.pole.update(t);
    pos(B2, 0.3, -0.4, -0.3); place(S2.scene, B2); B2.play('idle', t + 1);
    const h = B2.at('Head'); const f = shot(cam, { target: h.clone().add(V3(0, -0.15, 0)), dist: 1.8, yaw: -0.35, pitch: 0.05, fov: 30 }, { target: h.clone().add(V3(0, 0.06, 0)), dist: 0.85, yaw: -0.25, pitch: -0.05, fov: 28 }, lt, d, t, { ease: 'cubic' });
    R(S2.scene, { ...LOOK, warm: 0.25 }, f); blit(); } });
  cue(Wd('terrible', 8), 'boing', { gain: 0.25 });
  // ===== L9 "Most people pick | the first barber." - people walk into shop 1
  add({ id: 'D01', at: cut(9), transition: { type: 'dissolve', dur: 0.25 }, note: 'people go to shop 1', draw(lt, d, t, blit) { hideAll(); ST.s1.pole.update(t); ST.s2.pole.update(t);
    const door = ST.s1.door; const t0 = cut(9);
    [you, ...extras].forEach((a, i) => walkTo(a, ST.scene, V3(2.8 + i * 0.9, 0.14, -0.6 - (i % 2) * 0.6), door.clone().add(V3(0.15 * i, 0, 0.5 + 0.55 * i)), t0 - 0.8 + i * 0.3, t0 + 2.4 + i * 0.3, t));
    const f = shot(cam, { target: V3(0, 2.0, -3.4), dist: 19, yaw: 0.68, pitch: -0.08, fov: 40 }, { target: V3(-0.6, 1.9, -3.4), dist: 17, yaw: 0.6, pitch: -0.07, fov: 40 }, lt, d, t);
    R(ST.scene, LOOK_ST, f); blit(); } });
  // ===== L10 "But that's | the wrong choice." - stamp on shop 1
  add({ id: 'D02', at: cut(10), note: 'WRONG CHOICE stamp', draw(lt, d, t, blit) { hideAll(); ST.s1.pole.update(t);
    const f = shot(cam, { target: V3(-2.3, 2.4, -3.8), dist: 7.5, yaw: 0.2, pitch: -0.02, fov: 32 }, { target: V3(-2.3, 2.4, -3.8), dist: 6.6, yaw: 0.12, pitch: -0.02, fov: 32 }, lt, d, t);
    place(ST.scene, stampW); stampW.group.position.set(-2.3, 2.3, -3.2); faceCam(stampW.group); stampW.slam(seg(t, Wd('wrong', 10), Wd('wrong', 10) + 0.25)); stampW.group.rotateZ(-0.12);
    R(ST.scene, LOOK_ST, f); blit(); } });
  cue(Wd('wrong', 10), 'slam', { gain: 0.4 });
  // ===== L11+L12 "Here's why. | There are only | two barbers in town." - both barbers side by side in front of their shops
  add({ id: 'E01', at: cut(11), transition: { type: 'flip', dur: 0.3 }, note: 'the two barbers', draw(lt, d, t, blit) { hideAll(); ST.s1.pole.update(t); ST.s2.pole.update(t);
    pos(B1, -0.42, -2.6, 0.15); pos(B2, 0.42, -2.6, -0.15); place(ST.scene, B1, B2); B1.play('idle', t); B2.play('idle', t + 1.3);
    const tt = Wd('two', 12); place(ST.scene, tag1, tag2); tag1.group.position.copy(B1.at('Head')).add(V3(0, 0.35, 0)); tag2.group.position.copy(B2.at('Head')).add(V3(0, 0.35, 0));
    tag1.show(eo(seg(t, tt, tt + 0.3)), cam); tag2.show(eo(seg(t, tt + 0.15, tt + 0.45)), cam);
    const f = shot(cam, { target: V3(0, 1.45, -2.6), dist: 4.6, yaw: 0.05, pitch: -0.02, fov: 32 }, { target: V3(0, 1.5, -2.6), dist: 3.9, yaw: -0.03, pitch: -0.02, fov: 32 }, lt, d, t);
    R(ST.scene, LOOK_ST, f); blit(); } });
  cue(Wd('two', 12), 'pop', { gain: 0.3 }); cue(Wd('two', 12) + 0.15, 'pop', { gain: 0.3 });
  // ===== L13 "Barbers can't cut | their own hair." - barber 1 tries at his mirror, red X
  add({ id: 'E02', at: cut(13), note: "can't cut own hair", draw(lt, d, t, blit) { hideAll(); S1.pole.update(t);
    pos(B1, 0.0, -1.4, 0.2); place(S1.scene, B1); B1.play('idle', t).aim('R', { upper: [-0.55, 0.3, 0.15], fore: [0.6, 0.55, -0.55], palm: [0.2, -0.4, -1] }).grip('R', 0.5).pose({ head: [0.12, 0, 0] }); holdScissors(B1, sc1, t);
    const h = B1.at('Head'); const f = shot(cam, { target: h.clone().add(V3(0, -0.05, 0)), dist: 1.7, yaw: 0.55, pitch: -0.05, fov: 30 }, { target: h.clone().add(V3(0, 0, 0)), dist: 1.4, yaw: 0.42, pitch: -0.05, fov: 30 }, lt, d, t);
    place(S1.scene, stampX); stampX.group.position.copy(cam.position).add(V3(0.16, 0.05, -1.5).applyQuaternion(cam.quaternion)); faceCam(stampX.group); stampX.group.rotateZ(0.1); stampX.slam(seg(t, Wd("can't", 13), Wd("can't", 13) + 0.25));
    R(S1.scene, LOOK, f); blit(); } });
  cue(Wd("can't", 13), 'slam', { gain: 0.35 });
  // ===== L14 "So who gave | the first barber | his perfect haircut?" - barber 1 in the chair (shop 2), ? pops
  add({ id: 'F01', at: cut(14), transition: { type: 'dissolve', dur: 0.25 }, note: 'B1 in chair, ?', draw(lt, d, t, blit) { hideAll(); S2.pole.update(t);
    seated(B1, chairB, S2.scene, capeM, t); const h = B1.at('Head').add(V3(0, 0.08, 0));
    const f = shot(cam, { target: h.clone().add(V3(0, -0.12, 0)), dist: 1.15, yaw: Math.PI + 0.75, pitch: -0.08, fov: 30 }, { target: h, dist: 0.8, yaw: Math.PI + 0.6, pitch: -0.1, fov: 30 }, lt, d, t);
    place(S2.scene, qm); qm.group.position.copy(h).add(V3(0.0, 0.35, 0)); faceCam(qm.group); qm.slam(eo(seg(t, Wd('haircut', 14) - 0.3, Wd('haircut', 14))));
    R(S2.scene, { ...LOOK, warm: 0.22 }, f); blit(); } });
  cue(Wd('haircut', 14) - 0.3, 'pop', { gain: 0.3 });
  // ===== L15 "The second barber." - pull back: barber 2 is behind him, cutting
  add({ id: 'F02', at: cut(15), note: 'reveal B2 cutting B1', draw(lt, d, t, blit) { hideAll(); S2.pole.update(t);
    const c = seated(B1, chairB, S2.scene, capeM, t); barberBehind(B2, chairB, S2.scene, t, sc2);
    place(S2.scene, fall); fall.update(t, B1.at('Head').add(V3(0, 0.1, 0)), 1);
    const f = shot(cam, { target: c.clone().add(V3(0.05, 1.3, 0.2)), dist: 1.1, yaw: Math.PI + 0.75, pitch: -0.05, fov: 32 }, { target: c.clone().add(V3(0.1, 1.35, 0.35)), dist: 2.0, yaw: Math.PI + 1.3, pitch: -0.05, fov: 34 }, lt, d, t, { ease: 'cubic' });
    R(S2.scene, { ...LOOK, warm: 0.22 }, f); blit(); } });
  cue(cut(15) + 0.1, 'zip', { gain: 0.2 });
  // ===== L16 "And who gave | the second barber | that terrible haircut?" - barber 2 in the chair (shop 1), ?
  add({ id: 'F03', at: cut(16), transition: { type: 'dissolve', dur: 0.25 }, note: 'B2 in chair, ?', draw(lt, d, t, blit) { hideAll(); S1.pole.update(t);
    seated(B2, chairA, S1.scene, capeM2, t); const h = B2.at('Head').add(V3(0, 0.08, 0));
    const f = shot(cam, { target: h.clone().add(V3(0, -0.12, 0)), dist: 1.15, yaw: Math.PI - 0.75, pitch: -0.08, fov: 30 }, { target: h, dist: 0.8, yaw: Math.PI - 0.6, pitch: -0.1, fov: 30 }, lt, d, t);
    place(S1.scene, qm); qm.group.position.copy(h).add(V3(0.0, 0.35, 0)); faceCam(qm.group); qm.slam(eo(seg(t, Wd('haircut', 16) - 0.3, Wd('haircut', 16))));
    R(S1.scene, LOOK, f); blit(); } });
  cue(Wd('haircut', 16) - 0.3, 'pop', { gain: 0.3 });
  // ===== L17 "The first one." - barber 1 behind him, cutting
  add({ id: 'F04', at: cut(17), note: 'reveal B1 cutting B2', draw(lt, d, t, blit) { hideAll(); S1.pole.update(t);
    const c = seated(B2, chairA, S1.scene, capeM2, t); barberBehind(B1, chairA, S1.scene, t, sc1);
    place(S1.scene, fall2); fall2.update(t, B2.at('Head').add(V3(0, 0.1, 0)), 1);
    const f = shot(cam, { target: c.clone().add(V3(0, 1.3, 0.3)), dist: 1.6, yaw: Math.PI - 1.45, pitch: -0.04, fov: 34 }, { target: c.clone().add(V3(0, 1.35, 0.35)), dist: 2.1, yaw: Math.PI - 1.3, pitch: -0.04, fov: 34 }, lt, d, t, { ease: 'cubic' });
    R(S1.scene, LOOK, f); blit(); } });
  cue(cut(17) + 0.1, 'zip', { gain: 0.2 });
  // ===== L18 "So the messy barber | is actually | the skilled one." - barber 2 hero, low angle
  add({ id: 'G01', at: cut(18), transition: { type: 'whip', dur: 0.3 }, note: 'B2 hero low angle', draw(lt, d, t, blit) { hideAll(); S2.pole.update(t);
    pos(B2, 0.2, -0.3, -0.1); place(S2.scene, B2); B2.play('idle', t).talk(0, 0.8);
    const h = B2.at('Head'); const f = shot(cam, { target: h.clone().add(V3(0, -0.12, 0)), dist: 1.5, yaw: -0.25, pitch: 0.3, fov: 32 }, { target: h.clone().add(V3(0, -0.05, 0)), dist: 1.2, yaw: -0.15, pitch: 0.24, fov: 32 }, lt, d, t);
    place(S2.scene, stampOK); stampOK.group.position.copy(cam.position).add(V3(-0.01, -0.1, -1.2).applyQuaternion(cam.quaternion)); stampOK.group.material.depthTest = false; stampOK.group.renderOrder = 30; faceCam(stampOK.group); stampOK.slam(seg(t, Wd('skilled', 18), Wd('skilled', 18) + 0.25)); stampOK.group.rotateZ(0.08);
    R(S2.scene, { ...LOOK, warm: 0.22 }, f); blit(); } });
  cue(Wd('skilled', 18), 'slam', { gain: 0.35 });
  // ===== L19 "His shop is messy | because he's busy." - busy shop 2: customer in chair, two waiting
  add({ id: 'G02', at: cut(19), note: 'busy shop 2', draw(lt, d, t, blit) { hideAll(); S2.pole.update(t);
    seated(extras[0], chairB, S2.scene, capeM, t); barberBehind(B2, chairB, S2.scene, t, sc2); place(S2.scene, fall); fall.update(t, extras[0].at('Head').add(V3(0, 0.1, 0)), 1);
    [extras[1], extras[2]].forEach((a, i) => { pos(a, 2.22, 0.1 + i * 0.75, -Math.PI / 2); place(S2.scene, a); a.play('idle', t + i).sit(1, { seat: 0.45 }); });
    const f = shot(cam, { target: V3(-0.2, 1.1, -0.8), dist: 3.4, yaw: 0.62, pitch: -0.12, fov: 38 }, { target: V3(-0.35, 1.1, -0.9), dist: 3.0, yaw: 0.52, pitch: -0.1, fov: 38 }, lt, d, t);
    R(S2.scene, { ...LOOK, warm: 0.22 }, f); blit(); } });
  // ===== L20 "Everyone smart | goes to him." - queue outside shop 2, shop 1 empty
  add({ id: 'G03', at: cut(20), transition: { type: 'dissolve', dur: 0.25 }, note: 'queue at shop 2', draw(lt, d, t, blit) { hideAll(); ST.s1.pole.update(t); ST.s2.pole.update(t);
    const door = ST.s2.door; [you, ...extras].forEach((a, i) => { pos(a, door.x + 0.15 + i * 0.7, door.z + 0.75 + (i % 2) * 0.12, -Math.PI / 2 - 0.25); place(ST.scene, a); a.play('idle', t + i * 0.7); });
    const f = shot(cam, { target: V3(3.6, 1.9, -3.2), dist: 12, yaw: -0.25, pitch: -0.08, fov: 40 }, { target: V3(3.8, 1.8, -3.2), dist: 10.5, yaw: -0.18, pitch: -0.07, fov: 40 }, lt, d, t);
    R(ST.scene, LOOK_ST, f); blit(); } });
  // ===== L21 "The lesson? | Don't judge someone | by their appearance." - barber 2 close, slow push (he smiles)
  add({ id: 'H01', at: cut(21), transition: { type: 'dissolve', dur: 0.25 }, note: 'lesson: B2 close', draw(lt, d, t, blit) { hideAll(); S2.pole.update(t);
    pos(B2, 0.2, -0.3, 0.1); place(S2.scene, B2); B2.play('idle', t + 3).talk(0, eo(seg(lt, 0.8, 1.6)));
    const h = B2.at('Head'); const f = shot(cam, { target: h.clone().add(V3(0, -0.05, 0)), dist: 1.4, yaw: 0.25, pitch: 0, fov: 30 }, { target: h.clone().add(V3(0, 0, 0)), dist: 0.95, yaw: 0.15, pitch: 0, fov: 30 }, lt, d, t);
    R(S2.scene, { ...LOOK, warm: 0.2, aperture: 0.003 }, f); blit(); } });
  // ===== L22 "Judge them | by their work." - his work: barber 1's perfect haircut, B2 finishing it (rack focus hair -> scissors)
  add({ id: 'H02', at: cut(22), note: 'his work', draw(lt, d, t, blit) { hideAll(); S2.pole.update(t);
    seated(B1, chairB, S2.scene, capeM, t); barberBehind(B2, chairB, S2.scene, t, sc2);
    const h = B1.at('Head').add(V3(0, 0.1, 0)); const f = shot(cam, { target: h, dist: 0.95, yaw: Math.PI + 1.0, pitch: -0.15, fov: 28 }, { target: h, dist: 0.8, yaw: Math.PI + 0.85, pitch: -0.12, fov: 28 }, lt, d, t);
    R(S2.scene, { ...LOOK, warm: 0.2, aperture: 0.003 }, f); blit(); } });
  // ===== L23 "Did you get it right? | Tell me | in the comments." - you in barber 2's chair, comment bubble pops
  add({ id: 'I01', at: cut(23), transition: { type: 'whip', dur: 0.3 }, note: 'you in the chair + comment bubble', draw(lt, d, t, blit) { hideAll(); S2.pole.update(t);
    const c = seated(you, chairB, S2.scene, capeM, t); you.pose({ head: [0.05, 0, 0] }); barberBehind(B2, chairB, S2.scene, t, sc2);
    place(S2.scene, fall); fall.update(t, you.at('Head').add(V3(0, 0.1, 0)), 1);
    const f = shot(cam, { target: c.clone().add(V3(0.05, 1.35, 0.3)), dist: 2.0, yaw: Math.PI + 1.25, pitch: -0.04, fov: 34 }, { target: c.clone().add(V3(0.05, 1.38, 0.3)), dist: 1.7, yaw: Math.PI + 1.1, pitch: -0.04, fov: 34 }, lt, d, t);
    place(S2.scene, bubble); bubble.position.copy(cam.position).add(V3(-0.11, 0.02, -1.6).applyQuaternion(cam.quaternion)); faceCam(bubble); bubble.scale.setScalar(0.32 * Math.max(0.001, pop(seg(t, Wd('comments', 23) - 0.35, Wd('comments', 23) + 0.05))));
    bubble.userData.dots.forEach((s, i) => (s.position.y = 0.04 * Math.max(0, Math.sin(t * 8 - i * 0.9))));
    R(S2.scene, { ...LOOK, warm: 0.2 }, f); blit(); } });
  cue(Wd('comments', 23) - 0.3, 'pop', { gain: 0.35 });
  // ===== L24 "And if you like | puzzles like this, | ... | Things Explained." - street, crane up from shop 2, end title
  add({ id: 'J01', at: cut(24), transition: { type: 'dissolve', dur: 0.3 }, note: 'end: shop 2 + title', draw(lt, d, t, blit) { hideAll(); ST.s1.pole.update(t); ST.s2.pole.update(t);
    const door = ST.s2.door; [you, ...extras].forEach((a, i) => { pos(a, door.x + 0.15 + i * 0.7, door.z + 0.75 + (i % 2) * 0.12, -Math.PI / 2 - 0.25); place(ST.scene, a); a.play('idle', t + i * 0.7); });
    const f = shot(cam, { target: V3(2.6, 2.6, -3.5), dist: 10, yaw: -0.2, pitch: -0.05, fov: 38 }, { target: V3(2.6, 3.0, -3.5), dist: 12, yaw: -0.1, pitch: -0.08, fov: 38 }, lt, d, t);
    place(ST.scene, endT); endT.group.position.copy(cam.position).add(V3(0, 0.95, -5.2).applyQuaternion(cam.quaternion)); faceCam(endT.group); endT.slam(eo(seg(t, Wd('follow', 24) - 0.1, Wd('follow', 24) + 0.25)));
    R(ST.scene, LOOK_ST, f); blit(); } });
  cue(Wd('follow', 24) - 0.1, 'slam', { gain: 0.3 });
}
