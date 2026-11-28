// "Elon's SpaceX Shares For Every Kid" - Things Explained, on the user's voiceover (voiceover_9.mp3, 62.9 s). Music: Paris.
// Elon Musk-inspired 3D character (musk.js, reviewed by the user). Money -> big digits + money rain, numbers -> counters.
import * as THREE from 'three';
import { add, cue, cut, Wd, V3, eio, eo, seg, pulse, lerp, lineStart, lineEnd, TL } from './core/timeline.js';
import { ACTOR_MODELS, actor } from './core/actors.js';
import { shot, frame } from './core/camera.js';
import { nameTag, thoughtBubble, whiteboard } from './core/devices.js';
import { mapKit } from './core/map3d.js';
import { room } from './core/rooms.js';
import * as SETS from './core/sets.js';
import * as FX from './core/fx.js';
import * as TP from './core/tech_props.js';
import { A } from './core/assets.js';
import { makeMusk } from './musk.js';
import * as X from './sx_props.js';

export const PRELOAD = { hdri: { studio: 'assets/hdri/studio_small_09_2k.hdr', sunset: 'assets/hdri/venice_sunset_1k.hdr' },
  models: { rpm: ACTOR_MODELS.rpm, xbot: ACTOR_MODELS.xbot, soldier: ACTOR_MODELS.soldier, michelle: ACTOR_MODELS.michelle, car: 'assets/models/props/ferrari.glb' } };
const GOLD = '#ffd23a';

export async function buildShots(E) {
  const cam = E.camera(32), cam2 = E.camera(34);
  for (const c of [cam, cam2]) { c.near = 0.04; c.far = 1600; c.updateProjectionMatrix(); }   // the launch shots sit 300 m back
  const LOOK = { aperture: 0.0012, maxblur: 0.008, bloom: 0.14, bloomThreshold: 0.85, ao: 0.5, vignette: 0.36, warm: 0.08 };
  const LS = { ...LOOK, aperture: 0, ao: 0.55 };
  // ---------- stage ----------
  const ST = X.stage(); ST.scene.environment = A.env.studio; ST.scene.environmentIntensity = 0.35;
  const musk = makeMusk(); ST.scene.add(musk.group);
  const stamps = [FX.stamp('GENIUS?', '#1f9d55', { w: 0.7 }), FX.stamp('STUNT?', '#e0a020', { w: 0.64 }), FX.stamp('NEVER?', '#d0202a', { w: 0.64 })]; stamps.forEach((s) => ST.scene.add(s.group));
  const bubble = new THREE.Group(); { const b = new THREE.Mesh(new RoundedBox(0.8, 0.5), new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.4 })); bubble.add(b);
    const tail = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.16, 3), b.material); tail.position.set(-0.22, -0.3, 0); tail.rotation.z = 0.5; bubble.add(tail);
    bubble.userData.dots = [-0.2, 0, 0.2].map((x) => { const s = new THREE.Mesh(new THREE.SphereGeometry(0.045, 16, 12), new THREE.MeshStandardMaterial({ color: '#2b5fd9' })); s.position.set(x, 0, 0.05); bubble.add(s); return s; }); }
  ST.scene.add(bubble);
  const endT = FX.bigText('Things Explained', { height: 0.5, color: GOLD, stroke: '#14202b', strokeW: 34, depthColor: '#000000cc' }); ST.scene.add(endT.group);
  // ---------- infographic studio ----------
  const V = SETS.studioVoid(A.env.studio, '#1d2a3a'); Object.assign(V.key.shadow.camera, { left: -4, right: 4, top: 4, bottom: -4 }); V.key.shadow.camera.updateProjectionMatrix();
  const certs = Array.from({ length: 2 }, () => { const c = X.certificate({ w: 0.9 }); V.scene.add(c); return c; });
  const big = FX.bigText('1', { height: 0.9, color: '#ffffff', depthColor: '#00000099' }); V.scene.add(big.group);
  const sub = FX.bigText('SHARE', { height: 0.34, color: GOLD, depthColor: '#00000099' }); V.scene.add(sub.group);
  const post = X.postCard(); V.scene.add(post.group);
  const yearC = FX.counter({ from: 2026, to: 2031, fmt: (v) => String(Math.floor(v)), height: 0.45, color: '#ffffff', depthColor: '#00000099' }); V.scene.add(yearC.group);
  const wb = whiteboard(1.9, 1.15, { texts: [{ text: '70,000,000 kids', x: 0.5, y: 0.2, size: 74 }, { text: '× 2 shares', x: 0.5, y: 0.42, size: 74 }, { text: '× $130', x: 0.5, y: 0.64, size: 74 }, { text: '≈ $18 billion / year', x: 0.5, y: 0.88, size: 80 }], strokes: [[[0.18, 0.75], [0.82, 0.75]]] });
  V.scene.add(wb.group);
  const money = FX.bigText('$18 BILLION', { height: 0.24, color: '#7ee08a', stroke: '#0b2a12', strokeW: 26, depthColor: '#00000099', glow: '#7ee08a66' }); V.scene.add(money.group);
  const price = FX.bigText('$130', { height: 0.42, color: '#7ee08a', stroke: '#0b2a12', strokeW: 26, depthColor: '#00000099' }); V.scene.add(price.group);
  const rain = FX.moneyRain({ n: 200, coins: 60, w: 2.6, d: 1.0, h: 3.0, kind: 'dollar', size: 0.2 }); V.scene.add(rain.group);
  const stack = Array.from({ length: 36 }, (_, i) => { const c = X.certificate({ w: 0.42 }); c.rotation.x = -Math.PI / 2; c.rotation.z = (Math.sin(i * 2.1)) * 0.08; V.scene.add(c); return c; });
  const kidV = X.kid({ shirt: '#e0a020' }); V.scene.add(kidV.group);
  const sharesC = FX.counter({ from: 0, to: 36, fmt: (v) => `${Math.round(v)} shares`, height: 0.3, color: GOLD, depthColor: '#00000099' }); V.scene.add(sharesC.group);
  const cash = new THREE.Group(); for (let i = 0; i < 14; i++) { const b = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.035, 0.16), new THREE.MeshStandardMaterial({ color: '#6f9e6a', roughness: 0.7 })); b.position.y = 0.018 + i * 0.036; b.rotation.y = Math.sin(i) * 0.06; b.castShadow = true; cash.add(b); } V.scene.add(cash);
  const vs = FX.bigText('VS', { height: 0.4, color: '#ffffff', depthColor: '#00000099' }); V.scene.add(vs.group);
  const blockT = labelBlock('TESLA', '#c0392b'), blockS = labelBlock('SPACEX', '#2e5d8a'); V.scene.add(blockT, blockS);
  const chipP = TP.chip(); chipP.group.scale.setScalar(5); V.scene.add(chipP.group);
  const robot = actor('xbot'); robot.root.scale.multiplyScalar(0.42); V.scene.add(robot.group);
  const car = A.models.car.scene.clone(); car.scale.setScalar(0.32); car.traverse((o) => { if (o.isMesh) o.castShadow = true; }); V.scene.add(car);
  const miniRocket = X.rocket(); miniRocket.group.scale.setScalar(0.009); V.scene.add(miniRocket.group);
  const merged = X.certificate({ w: 1.3 }); V.scene.add(merged);
  // ---------- map ----------
  const geo = await (await fetch('assets/earth/map_countries_50m.geojson')).json();
  const M = mapKit(geo, { center: [38.5, -97], span: 32, k: 0.11, colors: { USA: '#2e5d8a' }, rest: '#8a8478', only: ['USA', 'CAN', 'MEX'] });
  const MS = new THREE.Scene(); MS.background = new THREE.Color('#0f1217'); MS.add(M.group); MS.environment = A.env.studio; MS.environmentIntensity = 0.35;
  const ml = new THREE.DirectionalLight('#ffffff', 2.4); ml.position.set(-3, 6, 4); ml.castShadow = true; ml.shadow.mapSize.set(2048, 2048); Object.assign(ml.shadow.camera, { left: -6, right: 6, top: 6, bottom: -6 }); MS.add(ml, new THREE.AmbientLight('#ffffff', 0.45));
  const NK = 700, kids = new THREE.InstancedMesh(new THREE.CapsuleGeometry(0.018, 0.04, 4, 8), new THREE.MeshStandardMaterial({ color: '#ffd23a', roughness: 0.5, emissive: '#ffb020', emissiveIntensity: 0.25 }), NK); MS.add(kids);
  const kidPts = []; { let i = 0, k = 0; while (kidPts.length < NK && k < 40000) { k++; const lat = 25 + rnd(k) * 24, lon = -124 + rnd(k + 9) * 57; if (inUSA(geo, lat, lon)) kidPts.push(M.xyz(lat, lon, 0.045)); } }
  const kidsC = FX.counter({ from: 0, to: 70, fmt: (v) => `${Math.round(v)} MILLION KIDS`, height: 0.32, color: GOLD, depthColor: '#00000099' }); MS.add(kidsC.group);
  // ---------- kid's room ----------
  const RM = room(E, { env: A.env.studio, wall: '#9cc6e4' }); const kid = X.kid({ shirt: '#3aa060', seed: 4 }); RM.scene.add(kid.group);
  const handCert = X.certificate({ w: 0.3 }); RM.scene.add(handCert); const desk = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.06, 0.6), new THREE.MeshStandardMaterial({ color: '#a07a4c', roughness: 0.6 })); desk.position.set(0, 0.62, -0.75); desk.castShadow = true; RM.scene.add(desk);
  const bub = thoughtBubble(E, { w: 0.36 }); RM.scene.add(bub.group);
  const qms = Array.from({ length: 3 }, () => { const q = FX.bigText('?', { height: 0.22, color: '#ffffff', depthColor: '#00000088' }); RM.scene.add(q.group); return q; });
  // ---------- launch site / space ----------
  const LS2 = new THREE.Scene(); LS2.background = new THREE.Color('#8fb4d8'); LS2.fog = new THREE.Fog('#c6d6e4', 400, 1400); LS2.environment = A.env.sunset; LS2.environmentIntensity = 0.6;
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(4000, 4000), new THREE.MeshStandardMaterial({ color: '#b9a682', roughness: 0.95 })); ground.rotation.x = -Math.PI / 2; ground.position.y = -20; ground.receiveShadow = true; LS2.add(ground);
  const sun = new THREE.DirectionalLight('#fff1dc', 3); sun.position.set(-200, 300, 200); sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048); Object.assign(sun.shadow.camera, { left: -120, right: 120, top: 160, bottom: -60, near: 10, far: 900 }); LS2.add(sun, sun.target, new THREE.HemisphereLight('#cfe3ff', '#9a8a6a', 0.8));
  const rk = X.rocket(); LS2.add(rk.group);
  const engineers = [X.kid({ shirt: '#ffffff', h: 1, seed: 5 }), X.kid({ shirt: '#ffffff', h: 1, seed: 8, hair: '#111' }), X.kid({ shirt: '#ffffff', h: 1, seed: 9, hair: '#6b4a2a' })];
  engineers.forEach((e) => { if (e.bones.Head) e.bones.Head.scale.setScalar(1); LS2.add(e.group); });
  const SP = new THREE.Scene(); SP.background = new THREE.Color('#020308'); SP.add(X.stars()); const mz = X.mars(6); mz.group.position.set(0, 0, 0); SP.add(mz.group);
  const sunS = new THREE.DirectionalLight('#fff4e0', 3.2); sunS.position.set(-10, 4, 8); SP.add(sunS, new THREE.AmbientLight('#404860', 0.25));
  const craft = X.rocket(); craft.group.scale.setScalar(0.01); SP.add(craft.group);

  // ---------- helpers ----------
  const hideV = () => [...certs, big.group, sub.group, post.group, yearC.group, wb.group, money.group, price.group, rain.group, ...stack, kidV.group, sharesC.group, cash, vs.group, blockT, blockS, chipP.group, robot.group, car, miniRocket.group, merged].forEach((o) => (o.visible = false));
  const faceCam = (o) => o.quaternion.copy(cam.quaternion);
  const inFront = (o, x, y, d) => { o.position.copy(cam.position).add(V3(x, y, -d).applyQuaternion(cam.quaternion)); faceCam(o); return o; };
  const pop = (k) => (k <= 0 ? 0.0001 : k < 0.7 ? (k / 0.7) * 1.12 : 1.12 - 0.12 * ((k - 0.7) / 0.3));
  const muskStage = (t, { talk = true } = {}) => { musk.group.position.set(0, 0, 0.5); musk.group.rotation.set(0, -0.1, 0); musk.play('idle', t); musk.talk(talk ? Math.max(0, Math.sin(t * 13) * 0.25) : 0, musk.smirk); };
  const R = (scene, look, f) => E.render(scene, cam, f ? { ...look, focus: f } : look);

  // ===== L0 "Elon Musk | just raised his promise again." - on stage, spotlight, rocket on the screen
  add({ id: 'A01', at: 0, note: 'Musk on stage', draw(lt, d, t, blit) { stamps.forEach((s) => (s.group.visible = false)); bubble.visible = false; endT.group.visible = false; muskStage(t);
    const h = musk.at('Head'); const f = shot(cam, { target: V3(0, 1.6, 0), dist: 7.5, yaw: 0.25, pitch: 0.02, fov: 34 }, { target: h.clone().add(V3(0, -0.2, 0)), dist: 2.6, yaw: 0.15, pitch: 0.02, fov: 32 }, lt, d, t, { ease: 'cubic' });
    R(ST.scene, LOOK, f); blit(); } });
  // ===== L1 "He now says he'll give | two SpaceX shares | to every child in America, | every single year."
  add({ id: 'B01', at: cut(1), note: 'Musk close', draw(lt, d, t, blit) { muskStage(t); stamps.forEach((s) => (s.group.visible = false)); bubble.visible = false; endT.group.visible = false;
    const h = musk.at('Head'); const f = shot(cam, { target: h.clone().add(V3(0, -0.05, 0)), dist: 1.2, yaw: -0.3, pitch: 0.02, fov: 30 }, { target: h.clone().add(V3(0, -0.04, 0)), dist: 1.0, yaw: -0.22, pitch: 0.02, fov: 30 }, lt, d, t);
    R(ST.scene, { ...LOOK, aperture: 0.002 }, f); blit(); } });
  add({ id: 'B02', at: Wd('two', 1) - 0.15, transition: { type: 'zoomblur', dur: 0.3 }, note: 'two certificates', draw(lt, d, t, blit) { hideV(); V.setColor('#1d2a3a');
    frameV(lt, d, t, 3.2, 0.1); const k1 = eo(seg(t, Wd('two', 1), Wd('two', 1) + 0.35)), k2 = eo(seg(t, Wd('two', 1) + 0.15, Wd('two', 1) + 0.5));
    certs.forEach((c, i) => { c.visible = true; c.position.set((i ? 0.18 : -0.18), 1.15 + (i ? -0.12 : 0.12), i * 0.02); c.rotation.set(0, 0, i ? -0.08 : 0.08); c.scale.setScalar(pop(i ? k2 : k1)); });
    big.group.visible = true; big.set('2'); inFront(big.group, 0, 0.62, 3.2); big.slam(eo(seg(t, Wd('shares', 1), Wd('shares', 1) + 0.3)));
    R(V.scene, LS); blit(); } });
  cue(Wd('two', 1), 'pop', { gain: 0.3 }); cue(Wd('two', 1) + 0.15, 'pop', { gain: 0.3 });
  add({ id: 'B03', at: Wd('child', 1) - 0.25, transition: { type: 'whip', dur: 0.3 }, note: 'US map fills with kids', draw(lt, d, t, blit) {
    const c = M.xyz(38, -97); frame(cam, { target: c, dist: 6.2 - eio(seg(lt, 0, d)) * 0.6, yaw: 0.02, pitch: -1.05, fov: 34 });
    fillKids(seg(t, Wd('child', 1), lineEnd(1))); kidsC.group.visible = false; R(MS, { aperture: 0, bloom: 0.2, ao: 0.4, vignette: 0.45 }); blit(); } });
  add({ id: 'B04', at: Wd('single', 1) - 0.4, transition: { type: 'dissolve', dur: 0.2 }, note: 'every single year', draw(lt, d, t, blit) { hideV(); V.setColor('#1d2a3a'); frameV(lt, d, t, 3.2, 0.1);
    yearC.group.visible = true; inFront(yearC.group, 0, 0.45, 3.2); yearC.slam(1); yearC.at(seg(lt, 0.1, d));
    certs.forEach((c, i) => { c.visible = true; c.position.set(i ? 0.2 : -0.2, 0.95 - (lt * 0.5 % 0.5) * 0, 0); c.rotation.set(-0.2, 0, i ? -0.1 : 0.1); c.scale.setScalar(0.8); });
    R(V.scene, LS); blit(); } });
  // ===== L2 "First, | he promised one share." - ONE
  add({ id: 'C01', at: cut(2), transition: { type: 'flip', dur: 0.3 }, note: 'one share', draw(lt, d, t, blit) { hideV(); V.setColor('#24303f'); frameV(lt, d, t, 3.0, 0.05);
    const k = eo(seg(t, Wd('one', 2), Wd('one', 2) + 0.35)), kc = eo(seg(t, cut(2) + 0.1, cut(2) + 0.45)); certs[0].visible = true; certs[0].position.set(0, 1.05, 0); certs[0].rotation.set(0, 0, 0.04); certs[0].scale.setScalar(pop(kc));
    big.group.visible = true; big.set('1'); inFront(big.group, 0, 0.6, 3.0); big.slam(k); R(V.scene, LS); blit(); } });
  cue(Wd('one', 2), 'slam', { gain: 0.35 });
  // ===== L3 "People laughed | and called it | another random tweet." - post card + laughing reactions
  add({ id: 'C02', at: cut(3), note: 'random tweet', draw(lt, d, t, blit) { hideV(); V.setColor('#24303f'); frameV(lt, d, t, 2.6, 0.08);
    post.group.visible = true; post.group.position.set(0, 1.25, 0); post.group.rotation.set(-0.05, 0.05 * Math.sin(t), 0.02); post.react(seg(t, Wd('laughed', 3) - 0.1, Wd('laughed', 3) + 1.2));
    R(V.scene, LS); blit(); } });
  ['laughed'].forEach((w) => { for (let i = 0; i < 5; i++) cue(Wd(w, 3) + i * 0.22, 'pop', { gain: 0.2 }); });
  // ===== L4 "Then he doubled it | to two." - x2
  add({ id: 'C03', at: cut(4), transition: { type: 'whip', dur: 0.3 }, note: 'doubled to two', draw(lt, d, t, blit) { hideV(); V.setColor('#24303f'); frameV(lt, d, t, 3.2, 0.05);
    const k2 = eo(seg(t, Wd('two', 4) - 0.1, Wd('two', 4) + 0.3)); certs.forEach((c, i) => { c.visible = i === 0 || k2 > 0; c.position.set(i ? 0.2 : -0.2 * k2, 1.1 + (i ? -0.1 : 0.1) * k2, i * 0.02); c.rotation.set(0, 0, i ? -0.08 : 0.08 * k2); c.scale.setScalar(i ? pop(k2) : 1); });
    big.group.visible = true; big.set(k2 > 0 ? '×2' : '1'); inFront(big.group, 0, 0.62, 3.2); big.slam(k2 > 0 ? k2 : 1); R(V.scene, LS); blit(); } });
  cue(Wd('two', 4), 'slam', { gain: 0.35 });
  // ===== L5 "And now, | it's two shares | every year." - 2 per year, years tick
  add({ id: 'C04', at: cut(5), note: '2 every year', draw(lt, d, t, blit) { hideV(); V.setColor('#24303f'); frameV(lt, d, t, 3.4, 0.05);
    certs.forEach((c, i) => { c.visible = true; c.position.set(i ? 0.2 : -0.2, 1.0, i * 0.02); c.rotation.set(0, 0, i ? -0.08 : 0.08); c.scale.setScalar(0.85); });
    sub.group.visible = true; sub.set('2 EVERY YEAR'); inFront(sub.group, 0, 0.42, 3.4); sub.group.scale.setScalar(0.62); sub.slam(eo(seg(t, Wd('every', 5), Wd('every', 5) + 0.3))); sub.group.scale.multiplyScalar(0.62);
    yearC.group.visible = true; inFront(yearC.group, 0, 0.72, 3.4); yearC.slam(eo(seg(t, Wd('every', 5), Wd('every', 5) + 0.3))); yearC.at(seg(t, Wd('every', 5), lineEnd(5) + 0.3));
    R(V.scene, LS); blit(); } });
  // ===== L6 + L7 "Do the math. | America has about | seventy million kids."
  add({ id: 'D01', at: cut(6), transition: { type: 'zoomblur', dur: 0.3 }, note: 'whiteboard', draw(lt, d, t, blit) { hideV(); V.setColor('#2a3440');
    frame(cam, { target: V3(0, 1.3, 0), dist: 5.6 - eio(seg(lt, 0, d)) * 0.3, yaw: 0.05, pitch: 0, fov: 32 }); wb.group.visible = true; wb.group.position.set(0, 1.3, 0); wb.draw(0.22 * seg(lt, 0.2, d)); R(V.scene, LS); blit(); } });
  add({ id: 'D02', at: cut(7), transition: { type: 'whip', dur: 0.3 }, note: '70 million kids on the map', draw(lt, d, t, blit) {
    const c = M.xyz(38, -97); frame(cam, { target: c, dist: 6.4 - eio(seg(lt, 0, d)) * 0.5, yaw: 0.02, pitch: -1.0, fov: 34 });
    const ks = seg(t, Wd('seventy', 7) - 0.4, lineEnd(7)); fillKids(Math.max(0.15, ks));
    kidsC.group.visible = true; inFront(kidsC.group, 0, 0.62, 3.2); kidsC.slam(eo(seg(t, Wd('seventy', 7) - 0.1, Wd('seventy', 7) + 0.25))); kidsC.at(eo(seg(t, Wd('seventy', 7), Wd('kids', 7) + 0.2)));
    R(MS, { aperture: 0, bloom: 0.2, ao: 0.4, vignette: 0.45 }); blit(); } });
  cue(Wd('seventy', 7), 'slam', { gain: 0.3 });
  // ===== L8 "At around | a hundred and thirty dollars | a share, | that's roughly | eighteen billion dollars | in a single year."
  add({ id: 'D03', at: cut(8), transition: { type: 'flip', dur: 0.3 }, note: '$130 a share', draw(lt, d, t, blit) { hideV(); V.setColor('#16261c'); frameV(lt, d, t, 3.0, 0.05);
    certs[0].visible = true; certs[0].position.set(0, 0.85, 0); certs[0].rotation.set(-0.2, 0, 0.05);
    price.group.visible = true; inFront(price.group, 0, 0.55, 3.0); price.slam(eo(seg(t, Wd('hundred', 8), Wd('hundred', 8) + 0.3)));
    R(V.scene, LS); blit(); } });
  cue(Wd('hundred', 8), 'slam', { gain: 0.3 });
  add({ id: 'D04', at: Wd("that's", 8) - 0.2, transition: { type: 'dissolve', dur: 0.2 }, note: 'the sum on the board', draw(lt, d, t, blit) { hideV(); V.setColor('#2a3440');
    frame(cam, { target: V3(0, 1.3, 0), dist: 5.2, yaw: 0.05 - lt * 0.02, pitch: 0, fov: 32 }); wb.group.visible = true; wb.group.position.set(0, 1.3, 0); wb.draw(Math.min(1, 0.5 + seg(t, Wd("that's", 8) - 0.2, Wd('eighteen', 8) - 0.1) * 0.5)); R(V.scene, LS); blit(); } });
  add({ id: 'D05', at: Wd('eighteen', 8) - 0.15, transition: { type: 'zoomblur', dur: 0.25 }, note: '$18 BILLION + money rain', draw(lt, d, t, blit) { hideV(); V.setColor('#16261c');
    frame(cam, { target: V3(0, 1.3, 0), dist: 4.2 - eio(seg(lt, 0, d)) * 0.4, yaw: 0.04, pitch: -0.05, fov: 34 });
    const te = Wd('eighteen', 8); money.group.visible = true; inFront(money.group, 0, 0.35, 3.6); money.slam(eo(seg(t, te, te + 0.3)));
    rain.group.visible = true; rain.group.position.set(0, 0, -0.3); rain.update(t, te, 1); R(V.scene, LS); blit(); } });
  cue(Wd('eighteen', 8), 'slam', { gain: 0.45 }); cue(Wd('eighteen', 8) + 0.1, 'sparkle', { gain: 0.35 });
  // ===== L9 "Do it every year, | and a child born today | could own dozens | of SpaceX shares | by adulthood." - the kid grows, the stack grows
  add({ id: 'E01', at: cut(9), transition: { type: 'whip', dur: 0.3 }, note: 'kid grows, shares pile up', draw(lt, d, t, blit) { hideV(); V.setColor('#1d2a3a');
    const g = eio(seg(t, Wd('child', 9), lineEnd(9))); kidV.group.visible = true; kidV.group.position.set(-0.28, 0, 0.0); kidV.group.rotation.set(0, 0.35, 0);
    kidV.root.scale.setScalar(lerp(0.45, 1.0, g)); if (kidV.bones.Head) kidV.bones.Head.scale.setScalar(lerp(1.4, 1.0, g)); kidV.play('idle', t);
    const n = Math.round(g * 36); stack.forEach((c, i) => { c.visible = i < n; c.position.set(0.32, 0.01 + i * 0.012, 0.25); });
    sharesC.group.visible = true; inFront(sharesC.group, 0, 0.75, 3.6); sharesC.group.scale.multiplyScalar(0.8); sharesC.at(g);
    frame(cam, { target: V3(0, 0.75 + g * 0.2, 0), dist: 3.9 + g * 0.4, yaw: 0.1, pitch: -0.08, fov: 34 }); inFront(sharesC.group, 0, 0.75, 3.6); sharesC.group.scale.setScalar(0.8); R(V.scene, LS); blit(); } });
  // ===== L10 "So why shares | and not cash?" - certificate vs cash
  add({ id: 'F01', at: cut(10), transition: { type: 'flip', dur: 0.3 }, note: 'shares vs cash', draw(lt, d, t, blit) { hideV(); V.setColor('#24303f'); frameV(lt, d, t, 4.6, 0.05);
    certs[0].visible = true; certs[0].position.set(-0.38, 1.0, 0); certs[0].rotation.set(-0.1, 0.25, 0.05); certs[0].scale.setScalar(0.75);
    cash.visible = true; cash.position.set(0.4, 0.75, 0); cash.scale.setScalar(pop(eo(seg(t, Wd('cash', 10) - 0.2, Wd('cash', 10) + 0.2))));
    vs.group.visible = true; inFront(vs.group, 0, 0.1, 4.6); vs.slam(eo(seg(t, Wd('and', 10), Wd('and', 10) + 0.3))); R(V.scene, LS); blit(); } });
  // ===== L11 "Because a share | makes kids curious." - kid holds the certificate, thought bubble: rocket
  add({ id: 'G01', at: cut(11), transition: { type: 'dissolve', dur: 0.3 }, note: 'curious kid + bubble', draw(lt, d, t, blit) {
    kid.group.position.set(0, 0, -0.2); kid.group.rotation.set(0, 0, 0); kid.play('idle', t, { relax: 0 }).aim('R', { upper: [-0.25, -0.7, 0.6], fore: [0.3, 0.3, 1], palm: [0.6, 0.6, 0.3] }).aim('L', { upper: [0.25, -0.7, 0.6], fore: [-0.3, 0.3, 1], palm: [-0.6, 0.6, 0.3] }).grip('R', 0.6).grip('L', 0.6).pose({ head: [0.35, 0, 0] });
    const a = kid.at('RightHand'), b = kid.at('LeftHand'); handCert.position.copy(a).lerp(b, 0.5).add(V3(0, 0.05, 0.02)); handCert.rotation.set(-0.9, 0, 0);
    frame(cam2, { target: V3(0, 50, 0), dist: 165, yaw: 0.3, pitch: 0.02, fov: 40 }); bub.group.visible = false; rk.flame(0, t); bub.capture(LS2, cam2);
    const h = kid.at('Head'); bub.group.position.copy(h).add(V3(0.12, 0.22, 0.05)); const f = shot(cam, { target: h.clone().add(V3(0.05, -0.05, 0)), dist: 1.6, yaw: 0.35, pitch: -0.05, fov: 32 }, { target: h.clone().add(V3(0.07, 0.02, 0)), dist: 1.35, yaw: 0.25, pitch: -0.05, fov: 32 }, lt, d, t);
    bub.face(cam); bub.show(eo(seg(t, Wd('curious', 11) - 0.2, Wd('curious', 11) + 0.25))); qms.forEach((q) => (q.group.visible = false));
    R(RM.scene, { ...LOOK, aperture: 0.002 }, f); blit(); } });
  cue(Wd('curious', 11) - 0.1, 'pop', { gain: 0.3 });
  // ===== L12 "They'll ask: | What is SpaceX?" - question marks pop around the kid
  add({ id: 'G02', at: cut(12), note: 'questions', draw(lt, d, t, blit) {
    kid.group.position.set(0, 0, -0.2); kid.play('idle', t).pose({ head: [-0.15, 0.25 * Math.sin(t * 1.5), 0.1] }); bub.show(0);
    const h = kid.at('Head'); const f = shot(cam, { target: h.clone().add(V3(0, 0.05, 0)), dist: 1.5, yaw: -0.3, pitch: 0.05, fov: 32 }, { target: h.clone().add(V3(0, 0.08, 0)), dist: 1.3, yaw: -0.2, pitch: 0.05, fov: 32 }, lt, d, t);
    qms.forEach((q, i) => { q.group.visible = true; const ti = Wd('What', 12) - 0.2 + i * 0.25; q.group.position.copy(h).add(V3(-0.25 + i * 0.25, 0.28 + (i % 2) * 0.08, 0.05)); faceCam(q.group); q.slam(eo(seg(t, ti, ti + 0.3))); q.group.rotateZ((i - 1) * 0.25); });
    R(RM.scene, { ...LOOK, aperture: 0.002 }, f); blit(); } });
  for (let i = 0; i < 3; i++) cue(Wd('What', 12) - 0.2 + i * 0.25, 'pop', { gain: 0.25 });
  // ===== L13 "How do rockets work?" - launch
  add({ id: 'H01', at: cut(13), transition: { type: 'whip', dur: 0.3 }, note: 'launch', draw(lt, d, t, blit) { qms.forEach((q) => (q.group.visible = false));
    const up = Math.max(0, lt - 0.15); rk.group.position.y = 2.5 * up * up; rk.flame(eo(seg(lt, 0, 0.3)), t);
    frame(cam, { target: V3(0, 55 + rk.group.position.y * 0.6, 0), dist: 300, yaw: 0.35, pitch: -0.03, fov: 34 }); R(LS2, { ...LOOK, aperture: 0, bloom: 0.3, bloomThreshold: 0.7 }); blit(); } });
  cue(cut(13), 'whoosh', { gain: 0.45 });
  // ===== L14 "How do we | get to Mars?" - the ship arcs toward Mars
  add({ id: 'H02', at: cut(14), transition: { type: 'zoomblur', dur: 0.3 }, note: 'to Mars', draw(lt, d, t, blit) {
    mz.planet.rotation.y = t * 0.05; const k = eio(seg(lt, 0, d)); craft.group.position.set(lerp(-26, -9, k), lerp(-14, -2, k), lerp(14, 4, k)); craft.group.rotation.set(0, 0, -1.0 + k * 0.3); craft.flame(0.6, t);
    frame(cam, { target: V3(-6, -2, 4), dist: 34 - k * 6, yaw: -0.5, pitch: -0.05, fov: 34 }); R(SP, { ...LOOK, aperture: 0, bloom: 0.25, vignette: 0.5 }); blit(); } });
  // ===== L15 "That curiosity | is how you create | the next generation | of engineers." - young engineers before the rocket
  add({ id: 'H03', at: cut(15), transition: { type: 'dissolve', dur: 0.35 }, note: 'next generation of engineers', draw(lt, d, t, blit) { rk.group.position.y = 0; rk.flame(0, t);
    engineers.forEach((e, i) => { e.group.position.set(-1.2 + i * 1.2, -20, 55 + (i % 2) * 0.6); e.group.rotation.set(0, Math.PI + (i - 1) * 0.15, 0); e.play('idle', t + i); e.pose({ head: [-0.35, 0, 0] }); });
    const f = shot(cam, { target: V3(0, -18.6, 50), dist: 9, yaw: 0.12, pitch: 0.12, fov: 44 }, { target: V3(0, -12, 40), dist: 22, yaw: 0.06, pitch: 0.28, fov: 46 }, lt, d, t);
    R(LS2, { ...LOOK, aperture: 0 }); blit(); } });
  // ===== L16 "And if Tesla | and SpaceX merge, | as some reports suggest, | each share could include | rockets, AI, | robots | and self-driving cars."
  add({ id: 'I01', at: cut(16), transition: { type: 'flip', dur: 0.3 }, note: 'merge', draw(lt, d, t, blit) { hideV(); V.setColor('#1d2a3a'); frameV(lt, d, t, 3.4, 0.05);
    const km = eio(seg(t, Wd('merge', 16) - 0.3, Wd('merge', 16) + 0.5)); blockT.visible = blockS.visible = true; blockT.position.set(lerp(-0.6, -0.001, km), 1.2, 0); blockS.position.set(lerp(0.6, 0.001, km), 1.2, 0);
    blockT.scale.setScalar(pop(eo(seg(t, Wd('Tesla', 16), Wd('Tesla', 16) + 0.3))) * (1 - km * 0.999)); blockS.scale.setScalar(pop(eo(seg(t, Wd('SpaceX', 16), Wd('SpaceX', 16) + 0.3))) * (1 - km * 0.999));
    merged.visible = km > 0.6; merged.position.set(0, 1.2, 0); merged.rotation.set(0, 0, 0); merged.scale.setScalar(pop(seg(km, 0.6, 1)));
    R(V.scene, LS); blit(); } });
  cue(Wd('merge', 16), 'whoosh', { gain: 0.3 });
  add({ id: 'I02', at: Wd('include', 16) - 0.3, transition: { type: 'dissolve', dur: 0.2 }, note: 'what one share holds', draw(lt, d, t, blit) { hideV(); V.setColor('#1d2a3a');
    frame(cam, { target: V3(0, 0.45, 0.15), dist: 5.4 - eio(seg(lt, 0, d)) * 0.4, yaw: 0.05 + lt * 0.02, pitch: -0.32, fov: 34 });
    merged.visible = true; merged.position.set(0, 0.012, 0.2); merged.rotation.set(-Math.PI / 2, 0, 0); merged.scale.setScalar(1.4);
    const ks = [Wd('rockets', 16), Wd('AI', 16), Wd('robots', 16), Wd('self-driving', 16)];
    miniRocket.group.visible = true; miniRocket.group.position.set(-0.55, 0.15, 0.1); miniRocket.group.scale.setScalar(0.009 * pop(eo(seg(t, ks[0] - 0.1, ks[0] + 0.25))));
    chipP.group.visible = true; chipP.group.position.set(-0.15, 0.05, 0.45); chipP.group.scale.setScalar(4.5 * pop(eo(seg(t, ks[1] - 0.1, ks[1] + 0.25)))); chipP.setGlow(1);
    robot.group.visible = true; robot.group.position.set(0.25, 0, -0.05); robot.group.rotation.set(0, -0.3, 0); robot.play('idle', t); robot.root.scale.setScalar(0.42 * pop(eo(seg(t, ks[2] - 0.1, ks[2] + 0.25))));
    car.visible = true; car.position.set(0.5, 0, 0.5); car.rotation.set(0, -0.8, 0); car.scale.setScalar(0.32 * pop(eo(seg(t, ks[3] - 0.1, ks[3] + 0.25))));
    R(V.scene, LS); blit(); } });
  ['rockets', 'AI', 'robots', 'self-driving'].forEach((w) => cue(Wd(w, 16), 'pop', { gain: 0.3 }));
  // ===== L17 "Is this genius, | a publicity stunt, | or a promise | that will never happen?" - stamps around him
  add({ id: 'J01', at: cut(17), transition: { type: 'whip', dur: 0.3 }, note: 'genius / stunt / never', draw(lt, d, t, blit) { muskStage(t, { talk: false }); bubble.visible = false; endT.group.visible = false;
    const h = musk.at('Head'); const f = shot(cam, { target: h.clone().add(V3(0, -0.25, 0)), dist: 2.2, yaw: 0.2, pitch: 0.02, fov: 32 }, { target: h.clone().add(V3(0, -0.2, 0)), dist: 1.8, yaw: 0.1, pitch: 0.02, fov: 32 }, lt, d, t);
    const ts = [Wd('genius', 17), Wd('stunt', 17), Wd('never', 17)]; stamps.forEach((s, i) => { s.group.visible = true; inFront(s.group, [-0.1, 0.12, -0.05][i], [0.0, -0.2, -0.4][i], 2.6); s.slam(seg(t, ts[i], ts[i] + 0.25)); s.group.rotateZ([0.1, -0.08, 0.06][i]); });
    R(ST.scene, { ...LOOK, aperture: 0.0015 }, f); blit(); } });
  ['genius', 'stunt', 'never'].forEach((w) => cue(Wd(w, 17), 'slam', { gain: 0.35 }));
  // ===== L18 "Tell me | in the comments." - comment bubble
  add({ id: 'J02', at: cut(18), note: 'comments', draw(lt, d, t, blit) { muskStage(t, { talk: false }); stamps.forEach((s) => (s.group.visible = false)); endT.group.visible = false;
    const h = musk.at('Head'); const f = shot(cam, { target: h.clone().add(V3(0, -0.35, 0)), dist: 2.8, yaw: -0.2, pitch: 0.02, fov: 32 }, { target: h.clone().add(V3(0, -0.3, 0)), dist: 2.5, yaw: -0.12, pitch: 0.02, fov: 32 }, lt, d, t);
    bubble.visible = true; inFront(bubble, -0.12, -0.02, 1.6); bubble.scale.setScalar(0.36 * pop(seg(t, Wd('comments', 18) - 0.35, Wd('comments', 18) + 0.05))); bubble.userData.dots.forEach((s, i) => (s.position.y = 0.04 * Math.max(0, Math.sin(t * 8 - i * 0.9))));
    R(ST.scene, { ...LOOK, aperture: 0.0015 }, f); blit(); } });
  cue(Wd('comments', 18) - 0.3, 'pop', { gain: 0.35 });
  // ===== L19 "And if you want updates ... | Things Explained." - wide stage, title
  add({ id: 'K01', at: cut(19), transition: { type: 'dissolve', dur: 0.3 }, note: 'end', draw(lt, d, t, blit) { muskStage(t, { talk: false }); stamps.forEach((s) => (s.group.visible = false)); bubble.visible = false;
    const f = shot(cam, { target: V3(0, 1.8, 0), dist: 6, yaw: 0.1, pitch: 0.02, fov: 34 }, { target: V3(0, 2.6, -1), dist: 9, yaw: 0.0, pitch: -0.02, fov: 34 }, lt, d, t);
    endT.group.visible = true; inFront(endT.group, 0, 0.9, 7); endT.slam(eo(seg(t, Wd('follow', 19) - 0.1, Wd('follow', 19) + 0.25)));
    R(ST.scene, LOOK, f); blit(); } });
  cue(Wd('follow', 19) - 0.1, 'slam', { gain: 0.3 });

  // ---------- local helpers ----------
  function frameV(lt, d, t, dist, yaw) { shot(cam, { target: V3(0, 1.1, 0), dist: dist + 0.25, yaw, pitch: -0.04, fov: 32 }, { target: V3(0, 1.1, 0), dist, yaw: yaw * 0.4, pitch: -0.03, fov: 32 }, lt, d, t); }
  function fillKids(k) { const o = new THREE.Object3D(); const n = Math.floor(k * kidPts.length);
    for (let i = 0; i < kidPts.length; i++) { const s = i < n ? Math.min(1, (k * kidPts.length - i) / 20) : 0.0001; o.position.copy(kidPts[i]); o.position.y += 0.03; o.scale.setScalar(s); o.updateMatrix(); kids.setMatrixAt(i, o.matrix); }
    kids.count = kidPts.length; kids.instanceMatrix.needsUpdate = true; }
}

function RoundedBox(w, h) { return new THREE.BoxGeometry(w, h, 0.08); }
function rnd(i) { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); }
function labelBlock(text, color) {
  const c = document.createElement('canvas'); c.width = 512; c.height = 512; const x = c.getContext('2d'); x.fillStyle = color; x.fillRect(0, 0, 512, 512); x.fillStyle = '#ffffff'; x.font = '900 96px Inter'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 256, 260);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  const m = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.6, 0.6), new THREE.MeshPhysicalMaterial({ map: t, roughness: 0.35, clearcoat: 0.5 })); m.castShadow = true; return m;
}
function inUSA(geo, lat, lon) {   // point-in-polygon on the US lower-48 rings
  if (!inUSA.rings) { const f = geo.features.find((q) => (q.properties.adm0_a3 || '') === 'USA'); inUSA.rings = f.geometry.coordinates.map((p) => p[0]).filter((r) => r.some(([x, y]) => y > 25 && y < 50 && x > -125 && x < -66)); }
  let inside = false; for (const r of inUSA.rings) for (let i = 0, j = r.length - 1; i < r.length; j = i++) { const [xi, yi] = r[i], [xj, yj] = r[j]; if ((yi > lat) !== (yj > lat) && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) inside = !inside; }
  return inside;
}
