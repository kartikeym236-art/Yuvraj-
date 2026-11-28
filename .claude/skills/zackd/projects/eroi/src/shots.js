// "We Will Stop Using Oil - Here's Why (EROI)" - Things Explained, on the user's voiceover (voiceover_8.mp3, 88.2 s).
// Realistic + logical: every claim is shown physically. EROI = oil drums: red = energy spent, black = oil you get.
// Style: STYLE_REFS.md (one slow eased move per caption phrase, handheld sway, shallow focus, natural arms via actors.js).
import * as THREE from 'three';
import { add, cue, cut, Wd, V3, eio, eo, seg, pulse, lerp, lineStart, lineEnd, TL } from './core/timeline.js';
import { actor, ACTOR_MODELS } from './core/actors.js';
import { shot, frame } from './core/camera.js';
import { nameTag } from './core/devices.js';
import * as SETS from './core/sets.js';
import * as W from './core/world_props.js';
import * as FX from './core/fx.js';
import { A } from './core/assets.js';
import * as P from './eroi_props.js';

export const PRELOAD = { hdri: { studio: 'assets/hdri/studio_small_09_2k.hdr', sunset: 'assets/hdri/venice_sunset_1k.hdr' }, models: { rpm: ACTOR_MODELS.rpm, xbot: ACTOR_MODELS.xbot, soldier: ACTOR_MODELS.soldier, michelle: ACTOR_MODELS.michelle } };
const RED = '#c0392b', OIL = '#151517';

export async function buildShots(E) {
  const cam = E.camera(32);
  const LOOK = { aperture: 0.0008, maxblur: 0.008, bloom: 0.12, bloomThreshold: 0.88, ao: 0.5, vignette: 0.34, warm: 0.15 };
  const LS = { ...LOOK, aperture: 0, ao: 0.6, warm: 0 };                     // studio infographics: everything sharp
  const SEPIA = { ...LOOK, saturation: 0.18, warm: 0.9, contrast: 1.12, vignette: 0.5, grain: 0.06 };

  // ---------- oil field (desert, low sun) ----------
  const F = W.outdoor(E); F.scene.environment = A.env.sunset; F.scene.environmentIntensity = 0.5; F.setSun(14, 235);
  const jacks = [[-6, -9, 0.3], [5, -15, -0.2], [16, -24, 0.4], [-16, -20, 0.1]].map(([x, z, r]) => { const j = W.pumpjack(); j.group.position.set(x, 0, z); j.group.rotation.y = r; F.scene.add(j.group); return j; });
  const engineSmoke = P.smoke(14, { color: '#2e2b29', size: 1.3, rise: 4.5, rate: 0.6 }); engineSmoke.group.position.set(-8.2, 1.5, -8.4); F.scene.add(engineSmoke.group);
  const drill = W.derrick(); drill.group.position.set(14, 0, -4); F.scene.add(drill.group);
  const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 9, 16), new THREE.MeshStandardMaterial({ color: '#9aa0a8', metalness: 0.9, roughness: 0.3 })); pipe.position.set(14, 4.5, -4); pipe.castShadow = true; F.scene.add(pipe);
  const kelly = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), new THREE.MeshStandardMaterial({ color: '#c0392b', roughness: 0.4 })); kelly.position.set(14, 8.6, -4); F.scene.add(kelly);
  const drillSmoke = P.smoke(12, { color: '#33302d', size: 1, rise: 4, rate: 0.5 }); drillSmoke.group.position.set(16.5, 1.5, -3); F.scene.add(drillSmoke.group);
  const drumField = P.drumGrid(360, { cols: 24, s: 0.64, color: OIL }); drumField.mesh.position.set(-2, 0, 1); F.scene.add(drumField.mesh);
  const truck = P.truckTanker(); truck.group.scale.setScalar(0.9); F.scene.add(truck.group);
  const road = new THREE.Mesh(new THREE.PlaneGeometry(200, 7), new THREE.MeshStandardMaterial({ color: '#4d4a46', roughness: 0.95 })); road.rotation.x = -Math.PI / 2; road.position.set(0, 0.02, 14); road.receiveShadow = true; F.scene.add(road);
  const woods = [[-9, -8], [-2, -14], [6, -10], [13, -18], [-15, -16]].map(([x, z]) => { const d = P.woodDerrick(); d.group.position.set(x, 0, z); F.scene.add(d.group); return d; });
  const exc = P.excavator(); exc.group.position.set(60, 0, -6); exc.group.rotation.y = -0.6; F.scene.add(exc.group);
  const pile = new THREE.Group(); for (let i = 0; i < 40; i++) { const r = new THREE.Mesh(new THREE.DodecahedronGeometry(0.4 + Math.sin(i * 3.1) * 0.25, 0), new THREE.MeshStandardMaterial({ color: ['#7a5a3c', '#8c6b48', '#6a5038'][i % 3], roughness: 0.95 }));
    r.position.set(Math.sin(i * 2.4) * 2.2 * Math.sqrt(i / 40), 0.2 + (1 - i / 40) * 1.2, Math.cos(i * 2.4) * 2.2 * Math.sqrt(i / 40)); r.castShadow = true; pile.add(r); }
  pile.position.set(66, 0, -4); F.scene.add(pile);
  const man = actor('rpm', { shirt: '#3d6fa8', pants: '#3b3a36' }).hair('neat', { color: '#2a1d15' }).part('Beard', false); F.scene.add(man.group);
  const hat = P.hardHat(); F.scene.add(hat);
  const stopS = FX.stamp('STOP', RED, { w: 1.6 }); F.scene.add(stopS.group);
  const yr1900 = FX.bigText('EARLY 1900s', { height: 0.9, color: '#f3e3c3', depthColor: '#00000088' }); F.scene.add(yr1900.group);

  // ---------- sea ----------
  const S = W.outdoor(E); S.ground.visible = false; S.scene.environment = A.env.sunset; S.scene.environmentIntensity = 0.45; S.setSun(9, 240); S.scene.fog.color.set('#9aa8b4'); S.scene.fog.near = 260; S.scene.fog.far = 900;
  const sea = P.ocean(900); S.scene.add(sea.mesh);
  const rig = P.offshoreRig(); S.scene.add(rig.group);
  const ship = P.tankerShip(); ship.group.position.set(40, 0.5, -60); ship.group.rotation.y = 0.35; S.scene.add(ship.group);
  S.sun.shadow.camera.left = S.sun.shadow.camera.bottom = -45; S.sun.shadow.camera.right = S.sun.shadow.camera.top = 45; S.sun.shadow.camera.far = 200; S.sun.shadow.camera.updateProjectionMatrix();

  // ---------- green homestead ----------
  const G = W.outdoor(E, { sand: '#6f8f45' }); G.scene.environment = A.env.sunset; G.scene.environmentIntensity = 0.55; G.setSun(16, 230); G.scene.fog.color.set('#cfd9c4');
  const home = P.house(); home.group.position.set(0, 0, -6); home.group.rotation.y = -Math.PI / 2; G.scene.add(home.group);
  const bench = P.workbench(); bench.group.position.set(6.5, 0, -1.5); G.scene.add(bench.group);
  const porch = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.45, 0.5), new THREE.MeshStandardMaterial({ color: '#7a5a3c', roughness: 0.8 })); porch.position.set(-5.2, 0.225, -2.2); porch.castShadow = true; G.scene.add(porch);
  for (let i = 0; i < 36; i++) { const p = new THREE.Mesh(new THREE.SphereGeometry(0.22 + (i % 3) * 0.05, 12, 8), new THREE.MeshStandardMaterial({ color: ['#3f7a2e', '#4f8a34', '#5c9a3a'][i % 3], roughness: 0.8 }));
    p.position.set(-6 + (i % 9) * 0.8, 0.18, 2.5 + Math.floor(i / 9) * 0.9); p.scale.y = 0.7; p.castShadow = true; G.scene.add(p); }
  for (let i = 0; i < 9; i++) { const t = new THREE.Group(), x = [-14, -11, 12, 15, -18, 19, -8, 9, 22][i], z = [-14, -20, -16, -22, -8, -10, -26, -28, -18][i];
    const tr = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.28, 2.4, 10), new THREE.MeshStandardMaterial({ color: '#5a4030' })); tr.position.y = 1.2; t.add(tr);
    const cr = new THREE.Mesh(new THREE.IcosahedronGeometry(1.9, 1), new THREE.MeshStandardMaterial({ color: '#3f6d2c', roughness: 0.9, flatShading: true })); cr.position.y = 3.6; cr.castShadow = true; t.add(cr); t.position.set(x, 0, z); G.scene.add(t); }
  const farm = P.solarFarm(4, 7); farm.position.set(30, 0, -12); G.scene.add(farm);
  const truck2 = P.truckTanker({ cab: '#2a6fb0', tank: '#d9dde2' }); truck2.group.scale.setScalar(0.9); G.scene.add(truck2.group);
  const crate = new THREE.Mesh(new THREE.BoxGeometry(5.5, 1.6, 2.0), new THREE.MeshStandardMaterial({ color: '#c8a46a', roughness: 0.8 })); truck2.group.add(crate); crate.position.set(-0.6, 3.2, 0);
  const road2 = new THREE.Mesh(new THREE.PlaneGeometry(200, 7), new THREE.MeshStandardMaterial({ color: '#55524c', roughness: 0.95 })); road2.rotation.x = -Math.PI / 2; road2.position.set(0, 0.02, 14); G.scene.add(road2);
  const mug = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.036, 0.1, 24), new THREE.MeshPhysicalMaterial({ color: '#f1ede4', roughness: 0.3, clearcoat: 0.6 })); G.scene.add(mug);
  const folk = [actor('rpm', { shirt: '#b5523b', pants: '#2c3440', skin: 0.8 }).hair('short', { color: '#111' }), actor('rpm', { shirt: '#5a8a4a', pants: '#3b3b3b' }).hair('neat', { color: '#6b4a2a', seed: 4 }).part('Beard', false),
    actor('rpm', { shirt: '#d9a12b', pants: '#34495e', skin: 0.68 }).hair('short', { color: '#0d0d0d', seed: 6 })];
  folk.forEach((f) => G.scene.add(f.group));
  const notYet = FX.stamp('NOT YET', RED, { w: 3.2 }); G.scene.add(notYet.group);
  const endT = FX.bigText('Things Explained', { height: 0.5, color: '#ffd23a', stroke: '#14202b', strokeW: 34, depthColor: '#000000cc' }); G.scene.add(endT.group);

  // ---------- studio (infographics) ----------
  const V = SETS.studioVoid(A.env.studio, '#33404e');
  Object.assign(V.key.shadow.camera, { left: -7, right: 7, top: 7, bottom: -7, near: 0.5, far: 30 }); V.key.shadow.camera.updateProjectionMatrix(); V.key.position.set(-4, 9, 6);
  const eroi = FX.bigText('EROI', { height: 0.9, color: '#ffffff', depthColor: '#00000099', glow: '#ffffff55' }); V.scene.add(eroi.group);
  const words = ['ENERGY', 'RETURN', 'ON', 'INVESTMENT'].map((w) => { const t = FX.bigText(w, { height: 0.32, color: '#ffd23a', depthColor: '#00000088' }); V.scene.add(t.group); return t; });
  const yr = FX.bigText('1930', { height: 0.75, color: '#ffffff', depthColor: '#00000099' }); V.scene.add(yr.group);
  const ratio = FX.bigText('1 : 100', { height: 0.6, color: '#ffd23a', depthColor: '#00000099' }); V.scene.add(ratio.group);
  const grid = P.drumGrid(100, { cols: 10, s: 0.66, color: OIL }); grid.mesh.position.set(0, 0, -1.2); V.scene.add(grid.mesh);
  const inDrum = new THREE.Mesh(P.drumGeo(), new THREE.MeshPhysicalMaterial({ color: RED, metalness: 0.55, roughness: 0.38, clearcoat: 0.6 })); inDrum.castShadow = true; inDrum.position.set(0, 0, 3.4); V.scene.add(inDrum);
  const outDrum = new THREE.Mesh(P.drumGeo(), new THREE.MeshPhysicalMaterial({ color: OIL, metalness: 0.55, roughness: 0.38, clearcoat: 0.6 })); outDrum.castShadow = true; V.scene.add(outDrum);
  const tagIn = nameTag('ENERGY IN', { color: RED, w: 1.4 }), tagOut = nameTag('OIL OUT', { color: '#2b2b2f', w: 1.4 }); V.scene.add(tagIn.group, tagOut.group);
  const study = FX.paper('APPLIED ENERGY', { w: 1.1, sign: false }); V.scene.add(study.group);
  const half = FX.bigText('HALF', { height: 0.75, color: '#ffffff', depthColor: '#00000099' }); V.scene.add(half.group);
  const rock = P.strata(); rock.group.position.set(0, 0, 0); V.scene.add(rock.group);
  const tok = P.tokamak(); tok.group.position.set(0, 1.4, 0); V.scene.add(tok.group);
  const years = FX.counter({ from: 1955, to: 2025, fmt: (v) => String(Math.round(v)), height: 0.75, color: '#ffffff', depthColor: '#00000099' }); V.scene.add(years.group);
  const away = nameTag('"30 YEARS AWAY"', { color: '#7b3fc4', w: 2.2 }); V.scene.add(away.group);

  // ---------- helpers ----------
  const hide = () => { [man, ...folk].forEach((a) => (a.group.visible = false)); [hat, stopS.group, yr1900.group, notYet.group, endT.group, eroi.group, yr.group, ratio.group, grid.mesh, inDrum, outDrum, tagIn.group, tagOut.group,
    study.group, half.group, rock.group, tok.group, years.group, away.group, drumField.mesh, truck.group, truck2.group, mug, ...words.map((w) => w.group), ...woods.map((w) => w.group)].forEach((o) => (o.visible = false)); };
  const show = (...o) => o.forEach((x) => ((x.group || x).visible = true));
  const at = (a, x, z, ry = 0) => { a.group.position.set(x, 0, z); a.group.rotation.set(0, ry, 0); a.group.visible = true; };
  const wearHat = (a) => { a.group.updateMatrixWorld(true); const q = a.bones.Head.getWorldQuaternion(new THREE.Quaternion()); hat.position.copy(a.at('Head')).add(new THREE.Vector3(0, 0.105, 0.012).applyQuaternion(q)); hat.quaternion.copy(q); hat.visible = true; };
  const faceCam = (o) => o.quaternion.copy(cam.quaternion);
  const inFront = (o, x, y, d) => { o.position.copy(cam.position).add(V3(x, y, -d).applyQuaternion(cam.quaternion)); faceCam(o); };
  const field = (t, { pump = true, smokeOn = 0 } = {}) => { jacks.forEach((j, i) => j.update(pump === true ? t + i * 0.7 : pump)); engineSmoke.update(t, smokeOn); };
  const R = (scene, look, focus) => E.render(scene, cam, focus ? { ...look, focus } : look);
  const studioGrid = (fn) => { grid.mesh.visible = true; grid.update((i) => 1, fn); };

  // ===== L0 "Pro-oil people say | we'll never run out of oil." - oil field at sunset, the confident oil man
  add({ id: 'A01', at: 0, note: 'oil field + oil man', draw(lt, d, t, blit) { hide(); field(t);
    at(man, 0.5, 4, -0.25); man.play('idle', t);
    const h = man.at('Head'); const f = shot(cam, { target: h.clone().add(V3(-0.3, -0.5, 0)), dist: 6.2, yaw: 0.3, pitch: 0.04, fov: 34 }, { target: h.clone().add(V3(-0.2, -0.3, 0)), dist: 4.4, yaw: 0.2, pitch: 0.03, fov: 34 }, lt, d, t);
    R(F.scene, LOOK, f); blit(); } });
  add({ id: 'A02', at: Wd('never', 0) - 0.15, note: 'endless drums', draw(lt, d, t, blit) { hide(); field(t); drumField.mesh.visible = true; drumField.update(() => 1);
    const f = shot(cam, { target: V3(-6, 0.6, 1), dist: 5, yaw: 1.2, pitch: -0.18, fov: 34 }, { target: V3(2, 0.6, 1), dist: 5, yaw: 1.05, pitch: -0.2, fov: 34 }, lt, d, t, { ease: 'linear' });
    R(F.scene, { ...LOOK, aperture: 0.0015 }, f); blit(); } });
  // ===== L1 "And they're right." - he nods
  add({ id: 'A03', at: cut(1), note: 'nod', draw(lt, d, t, blit) { hide(); field(t);
    at(man, 0.5, 4, -0.25); man.play('agree', lt + 0.3).relax(t);
    const h = man.at('Head'); const f = shot(cam, { target: h.clone().add(V3(0, -0.12, 0)), dist: 1.5, yaw: 0.3, pitch: 0.02, fov: 30 }, { target: h.clone().add(V3(0, -0.08, 0)), dist: 1.25, yaw: 0.22, pitch: 0.02, fov: 30 }, lt, d, t);
    R(F.scene, { ...LOOK, aperture: 0.002 }, f); blit(); } });
  // ===== L2 "Just not the way | they think." - he shakes his head, the pumpjack behind him
  add({ id: 'A04', at: cut(2), note: 'head shake', draw(lt, d, t, blit) { hide(); field(t);
    at(man, 0.5, 4, -0.25); man.play('headshake', lt).relax(t);
    const h = man.at('Head'); const f = shot(cam, { target: h.clone().add(V3(0, -0.15, 0)), dist: 1.7, yaw: -0.35, pitch: 0.06, fov: 30 }, { target: h.clone().add(V3(0, -0.1, 0)), dist: 1.4, yaw: -0.28, pitch: 0.05, fov: 30 }, lt, d, t);
    R(F.scene, { ...LOOK, aperture: 0.002 }, f); blit(); } });
  // ===== L3 "We'll be forced | to stop using oil | because of one term: | EROI." - pumpjack slows to a stop, then the term
  add({ id: 'B01', at: cut(3), transition: { type: 'dissolve', dur: 0.25 }, note: 'pumpjack slows and stops', draw(lt, d, t, blit) { hide();
    const ts = cut(3), slow = Math.min(lt, 1.2 * (1 - Math.exp(-lt / 1.2)) ); field(0, { pump: ts + slow * 1.0 });
    const f = shot(cam, { target: V3(-6, 2.4, -9), dist: 17, yaw: 0.35, pitch: -0.03, fov: 34 }, { target: V3(-6, 2.4, -9), dist: 15, yaw: 0.28, pitch: -0.03, fov: 34 }, lt, d, t);
    R(F.scene, LOOK, f); blit(); } });
  add({ id: 'B02', at: Wd('term', 3) - 0.3, transition: { type: 'zoomblur', dur: 0.3 }, note: 'EROI', draw(lt, d, t, blit) { hide(); V.setColor('#2f3b48');
    const f = shot(cam, { target: V3(0, 1.3, 0), dist: 6.5, yaw: 0.06, pitch: 0, fov: 32 }, { target: V3(0, 1.3, 0), dist: 5.6, yaw: 0, pitch: 0, fov: 32 }, lt, d, t);
    eroi.group.visible = true; eroi.group.position.set(0, 1.35, 0); faceCam(eroi.group); eroi.slam(eo(seg(t, Wd('EROI', 3) - 0.05, Wd('EROI', 3) + 0.3)));
    R(V.scene, LS); blit(); } });
  cue(Wd('EROI', 3), 'slam', { gain: 0.4 });
  // ===== L4 "Energy Return | on Investment." - the four words build under it
  add({ id: 'B03', at: cut(4), note: 'Energy Return on Investment', draw(lt, d, t, blit) { hide(); V.setColor('#2f3b48');
    const f = shot(cam, { target: V3(0, 1.2, 0), dist: 5.6, yaw: 0, pitch: 0, fov: 32 }, { target: V3(0, 1.1, 0), dist: 5.9, yaw: -0.04, pitch: 0, fov: 32 }, lt, d, t);
    eroi.group.visible = true; eroi.group.position.set(0, 2.05, 0); faceCam(eroi.group); eroi.slam(1); eroi.group.scale.setScalar(0.7);
    const ks = [Wd('Energy', 4), Wd('Return', 4), Wd('on', 4), Wd('Investment', 4)];
    words.forEach((w, i) => { w.group.visible = true; w.group.position.set(0, 1.3 - i * 0.38, 0); faceCam(w.group); w.slam(eo(seg(t, ks[i] - 0.05, ks[i] + 0.25))); });
    R(V.scene, LS); blit(); } });
  ['Energy', 'Return', 'Investment'].forEach((w) => cue(Wd(w, 4), 'pop', { gain: 0.25 }));
  // ===== L5 "Pumping oil | burns energy." - the pumpjack's engine, exhaust smoke
  add({ id: 'C01', at: cut(5), transition: { type: 'whip', dur: 0.3 }, note: 'engine burns fuel', draw(lt, d, t, blit) { hide(); field(t, { smokeOn: eo(seg(t, Wd('burns', 5) - 0.4, Wd('burns', 5))) });
    const f = shot(cam, { target: V3(-7.2, 2.4, -9), dist: 13, yaw: 0.55, pitch: -0.03, fov: 34 }, { target: V3(-7.6, 2.4, -9), dist: 11, yaw: 0.45, pitch: -0.03, fov: 34 }, lt, d, t);
    R(F.scene, { ...LOOK, aperture: 0.0015 }, f); blit(); } });
  // ===== L6 "Drills, pumps, | trucks, ships." - four quick inserts, each burning fuel
  add({ id: 'C02', at: cut(6), note: 'drill', draw(lt, d, t, blit) { hide(); field(t); pipe.rotation.y = t * 6; kelly.rotation.y = t * 6; drillSmoke.update(t, 1);
    const f = shot(cam, { target: V3(14, 4.5, -4), dist: 14, yaw: 0.35, pitch: 0.08, fov: 34 }, { target: V3(14, 5, -4), dist: 12.5, yaw: 0.28, pitch: 0.1, fov: 34 }, lt, d, t);
    R(F.scene, LOOK, f); blit(); } });
  add({ id: 'C03', at: Wd('pumps', 6) - 0.1, note: 'pump', draw(lt, d, t, blit) { hide(); field(t, { smokeOn: 1 });
    const f = shot(cam, { target: V3(-6, 2.8, -9), dist: 11, yaw: -0.5, pitch: 0, fov: 34 }, { target: V3(-6, 2.8, -9), dist: 10, yaw: -0.42, pitch: 0, fov: 34 }, lt, d, t);
    R(F.scene, LOOK, f); blit(); } });
  add({ id: 'C04', at: Wd('trucks', 6) - 0.1, note: 'truck', draw(lt, d, t, blit) { hide(); field(t); truck.group.visible = true; const x = -12 + (t - Wd('trucks', 6)) * 9; truck.group.position.set(x, 0, 14); truck.smoke.update(t, 1);
    const f = shot(cam, { target: V3(x + 2, 1.8, 14), dist: 13, yaw: 0.7, pitch: -0.02, fov: 34 }, { target: V3(x + 2, 1.8, 14), dist: 12, yaw: 0.55, pitch: -0.02, fov: 34 }, lt, d, t);
    R(F.scene, LOOK, f); blit(); } });
  add({ id: 'C05', at: Wd('ships', 6) - 0.1, note: 'ship', draw(lt, d, t, blit) { hide(); sea.update(t); rig.update(t); ship.smoke.update(t, 1); ship.group.position.set(40 + t * 3, 0.5, -60);
    const f = shot(cam, { target: ship.group.position.clone().add(V3(0, 8, 0)), dist: 215, yaw: -0.25, pitch: -0.2, fov: 32 }, { target: ship.group.position.clone().add(V3(0, 8, 0)), dist: 195, yaw: -0.15, pitch: -0.2, fov: 32 }, lt, d, t);
    R(S.scene, { ...LOOK, aperture: 0 }); blit(); } });
  // ===== L7 "In 1930, | America used about | one barrel's worth of energy | to get a hundred | barrels out." - 1 red drum : 100 black drums
  add({ id: 'D01', at: cut(7), transition: { type: 'zoomblur', dur: 0.3 }, note: '1930: 1 in, 100 out', draw(lt, d, t, blit) { hide(); V.setColor('#33404e');
    const f = shot(cam, { target: V3(0, 0.4, 0.8), dist: 18, yaw: 0, pitch: -0.95, fov: 34 }, { target: V3(0, 0.4, 0.8), dist: 16.5, yaw: 0.04, pitch: -0.98, fov: 34 }, lt, d, t);
    show(yr); yr.set('1930'); inFront(yr.group, 0, 1.25, 8); yr.slam(eo(seg(t, Wd('1930', 7), Wd('1930', 7) + 0.3)));
    const k1 = eo(seg(t, Wd('one', 7), Wd('one', 7) + 0.35)); show(inDrum); inDrum.scale.setScalar(Math.max(0.001, k1 * 1.6)); show(tagIn); tagIn.group.position.set(0, 1.9, 3.4); tagIn.show(k1, cam);
    const th = Wd('hundred', 7); grid.mesh.visible = true; grid.update((i) => eo(seg(t, th - 0.2 + i * 0.012, th + 0.15 + i * 0.012)), null);
    show(tagOut); tagOut.group.position.set(0, 1.3, -4.6); tagOut.show(eo(seg(t, th + 0.6, th + 0.9)), cam);
    show(ratio); ratio.set('1 : 100'); inFront(ratio.group, 0, 0.55, 8); ratio.slam(eo(seg(t, Wd('barrels', 7), Wd('barrels', 7) + 0.3)));
    R(V.scene, LS); blit(); } });
  cue(Wd('1930', 7), 'slam', { gain: 0.35 }); cue(Wd('one', 7), 'pop', { gain: 0.3 }); cue(Wd('hundred', 7), 'sparkle', { gain: 0.3 });
  // ===== L8 "Today, | one study ... Applied Energy | ... about fifteen." - the study, then 15 of 100 turn red
  add({ id: 'D02', at: cut(8), note: 'today: 15 of 100', draw(lt, d, t, blit) { hide(); V.setColor('#33404e');
    const f = shot(cam, { target: V3(0, 0.2, -1.2), dist: 15, yaw: 0, pitch: -1.0, fov: 34 }, { target: V3(0, 0.2, -1.2), dist: 14, yaw: 0.04, pitch: -1.03, fov: 34 }, lt, d, t);
    const tf = Wd('fifteen', 8); studioGrid((i) => (i < 15 && t > tf + i * 0.03 ? new THREE.Color(RED) : null));
    show(yr); yr.set('TODAY'); inFront(yr.group, 0, 1.25, 8); yr.slam(eo(seg(t, cut(8), cut(8) + 0.3)) * (1 - seg(t, Wd('journal', 8), Wd('journal', 8) + 0.2)));
    const ks = seg(t, Wd('journal', 8) - 0.2, Wd('journal', 8) + 0.4), ke = seg(t, tf - 0.4, tf); show(study); inFront(study.group, lerp(1.0, 0.0, eo(ks)), lerp(0.3, 0.2, ks), 3.2); study.tear(0);
    study.group.rotateZ(lerp(0.5, -0.06, eo(ks))); study.group.visible = ks > 0 && ke < 1; study.group.scale.setScalar(1 - ke);
    show(ratio); ratio.set('15 of 100'); inFront(ratio.group, 0, 0.55, 8); ratio.slam(eo(seg(t, tf, tf + 0.3)));
    R(V.scene, LS); blit(); } });
  cue(Wd('fifteen', 8), 'slam', { gain: 0.3 });
  // ===== L9 "By 2050, | it projects fifty." - 50 red
  add({ id: 'D03', at: cut(9), note: '2050: 50 of 100', draw(lt, d, t, blit) { hide(); V.setColor('#3a2f33');
    const f = shot(cam, { target: V3(0, 0.2, -1.2), dist: 14, yaw: 0.04, pitch: -1.03, fov: 34 }, { target: V3(0, 0.2, -1.2), dist: 13, yaw: 0.08, pitch: -1.08, fov: 34 }, lt, d, t);
    const t50 = Wd('fifty', 9); studioGrid((i) => (i < 15 || (i < 50 && t > t50 + (i - 15) * 0.012) ? new THREE.Color(RED) : null));
    show(yr); yr.set('2050'); inFront(yr.group, 0, 1.25, 8); yr.slam(eo(seg(t, Wd('2050', 9), Wd('2050', 9) + 0.3)));
    show(ratio); ratio.set('50 of 100'); inFront(ratio.group, 0, 0.55, 8); ratio.slam(eo(seg(t, t50 + 0.2, t50 + 0.5)));
    R(V.scene, LS); blit(); } });
  cue(Wd('2050', 9), 'slam', { gain: 0.35 }); cue(Wd('fifty', 9) + 0.2, 'slam', { gain: 0.3 });
  // ===== L10 "Half the oil, | just to get the oil." - top-down: half red / half black
  add({ id: 'D04', at: cut(10), note: 'HALF', draw(lt, d, t, blit) { hide(); V.setColor('#3a2f33');
    const f = shot(cam, { target: V3(0, 0, -1.2), dist: 13, yaw: 0, pitch: -1.3, fov: 34 }, { target: V3(0, 0, -1.2), dist: 12, yaw: 0.12, pitch: -1.38, fov: 34 }, lt, d, t);
    studioGrid((i) => (i < 50 ? new THREE.Color(RED) : null));
    show(half); inFront(half.group, 0, 1.2, 8); half.slam(eo(seg(t, cut(10), cut(10) + 0.3)));
    R(V.scene, LS); blit(); } });
  cue(cut(10), 'slam', { gain: 0.35 });
  // ===== L11 "And you don't need | to read the studies." - the study tears in half
  add({ id: 'E01', at: cut(11), transition: { type: 'flip', dur: 0.3 }, note: 'study tears', draw(lt, d, t, blit) { hide(); V.setColor('#33404e');
    const f = shot(cam, { target: V3(0, 1.3, 0), dist: 4, yaw: 0, pitch: 0, fov: 32 }, { target: V3(0, 1.3, 0), dist: 3.6, yaw: 0.05, pitch: 0, fov: 32 }, lt, d, t);
    show(study); study.group.position.set(0, 1.4, 0); study.group.rotation.set(0, 0, 0); study.group.scale.setScalar(1); study.tear(eio(seg(t, Wd('studies', 11) - 0.2, Wd('studies', 11) + 0.5)));
    R(V.scene, LS); blit(); } });
  cue(Wd('studies', 11) - 0.1, 'crinkle', { gain: 0.35 });
  // ===== L12 "Just look around." - the oil man looks around the field
  add({ id: 'E02', at: cut(12), transition: { type: 'whip', dur: 0.3 }, note: 'look around', draw(lt, d, t, blit) { hide(); field(t);
    at(man, 0.5, 4, -0.25); man.play('idle', t); const lk = Math.sin(eio(seg(lt, 0, d)) * Math.PI * 1.3) * 0.6; man.pose({ head: [0, lk, 0], neck: [0, lk * 0.35, 0] });
    const h = man.at('Head'); const f = shot(cam, { target: h.clone().add(V3(0, -0.3, 0)), dist: 3.2, yaw: Math.PI + 0.3, pitch: -0.05, fov: 36 }, { target: h.clone().add(V3(0, -0.3, 0)), dist: 3.6, yaw: Math.PI + 0.1, pitch: -0.05, fov: 36 }, lt, d, t);
    R(F.scene, { ...LOOK, aperture: 0.0006 }, f); blit(); } });
  // ===== L13 "In the early 1900s, | almost all our oil | came from easy wells | on land." - sepia wooden derricks gushing
  add({ id: 'F01', at: cut(13), transition: { type: 'dissolve', dur: 0.35 }, note: '1900s easy land wells (sepia)', draw(lt, d, t, blit) { hide(); jacks.forEach((j) => (j.group.visible = false));
    woods.forEach((w, i) => { w.group.visible = true; w.update(t + i * 0.37, 1); });
    const f = shot(cam, { target: V3(-1, 5, -13), dist: 46, yaw: 0.12, pitch: -0.06, fov: 34 }, { target: V3(-1, 5, -13), dist: 40, yaw: 0.05, pitch: -0.05, fov: 34 }, lt, d, t);
    show(yr1900); yr1900.group.position.set(-1, 17, -8); faceCam(yr1900.group); yr1900.slam(eo(seg(t, Wd('1900s', 13), Wd('1900s', 13) + 0.3)) * (1 - seg(t, Wd('almost', 13) + 0.6, Wd('almost', 13) + 0.9)));
    R(F.scene, SEPIA); jacks.forEach((j) => (j.group.visible = true)); blit(); } });
  cue(Wd('1900s', 13), 'slam', { gain: 0.3 });
  // ===== L14 "Now we build | massive rigs out at sea | and crack rock apart | to get it." - offshore rig, then fracking cutaway
  add({ id: 'F02', at: cut(14), transition: { type: 'whip', dur: 0.3 }, note: 'offshore rig', draw(lt, d, t, blit) { hide(); sea.update(t); rig.update(t); ship.smoke.update(t, 1);
    const f = shot(cam, { target: V3(0, 16, 0), dist: 70, yaw: 0.6, pitch: -0.02, fov: 34 }, { target: V3(0, 18, 0), dist: 58, yaw: 0.45, pitch: -0.04, fov: 34 }, lt, d, t);
    R(S.scene, { ...LOOK, aperture: 0 }); blit(); } });
  add({ id: 'F03', at: Wd('crack', 14) - 0.2, transition: { type: 'dissolve', dur: 0.2 }, note: 'fracking cutaway', draw(lt, d, t, blit) { hide(); V.setColor('#2a2f36');
    show(rock); rock.frack(eio(seg(t, Wd('crack', 14), Wd('crack', 14) + 1.4))); rock.glow(0);
    const f = shot(cam, { target: V3(0, rock.top / 2, 0), dist: 12, yaw: 0.35, pitch: -0.12, fov: 32 }, { target: V3(0, rock.oilY + 0.3, 0.6), dist: 8.5, yaw: 0.22, pitch: -0.08, fov: 32 }, lt, d, t);
    R(V.scene, LS); blit(); } });
  cue(Wd('crack', 14), 'thud', { gain: 0.35 });
  // ===== L15 "Nobody does that | for oil that's | easy to reach." - the rig, alone in the sea, pull back
  add({ id: 'F04', at: cut(15), transition: { type: 'dissolve', dur: 0.25 }, note: 'rig pull-back', draw(lt, d, t, blit) { hide(); sea.update(t); rig.update(t); ship.smoke.update(t, 1);
    const f = shot(cam, { target: V3(0, 18, 0), dist: 45, yaw: -0.4, pitch: -0.12, fov: 34 }, { target: V3(0, 14, 0), dist: 120, yaw: -0.55, pitch: -0.18, fov: 34 }, lt, d, t);
    R(S.scene, { ...LOOK, aperture: 0 }); blit(); } });
  // ===== L16 "So what happens ... one barrel of oil | to get one barrel back?" - 1 red : 1 black
  add({ id: 'G01', at: cut(16), transition: { type: 'zoomblur', dur: 0.3 }, note: '1 : 1', draw(lt, d, t, blit) { hide(); V.setColor('#3a2f33');
    const f = shot(cam, { target: V3(0, 0.75, 0), dist: 5.2, yaw: 0, pitch: -0.1, fov: 32 }, { target: V3(0, 0.75, 0), dist: 4.6, yaw: 0.06, pitch: -0.08, fov: 32 }, lt, d, t);
    const k1 = eo(seg(t, Wd('barrel', 16) - 0.1, Wd('barrel', 16) + 0.3)), k2 = eo(seg(t, Wd('back', 16) - 0.5, Wd('back', 16) - 0.1));
    show(inDrum, outDrum); inDrum.position.set(-0.45, 0, 0); outDrum.position.set(0.45, 0, 0); inDrum.scale.setScalar(Math.max(0.001, k1 * 1.1)); outDrum.scale.setScalar(Math.max(0.001, k2 * 1.1));
    show(tagIn, tagOut); tagIn.group.position.set(-0.45, 1.25, 0); tagOut.group.position.set(0.45, 1.45, 0); tagIn.show(k1, cam); tagOut.show(k2, cam); tagIn.group.scale.multiplyScalar(0.55); tagOut.group.scale.multiplyScalar(0.55);
    show(ratio); ratio.set('1 : 1'); inFront(ratio.group, 0, -0.75, 3.4); ratio.slam(eo(seg(t, Wd('back', 16), Wd('back', 16) + 0.3)));
    R(V.scene, LS); inDrum.position.set(0, 0, 3.4); blit(); } });
  cue(Wd('back', 16), 'slam', { gain: 0.35 });
  // ===== L17 "We stop." - the pumpjack is frozen, STOP
  add({ id: 'G02', at: cut(17), note: 'STOP', draw(lt, d, t, blit) { hide(); field(0, { pump: 3.2 });
    const f = shot(cam, { target: V3(-6, 2.4, -9), dist: 15, yaw: 0.3, pitch: -0.03, fov: 34 }, { target: V3(-6, 2.4, -9), dist: 14, yaw: 0.27, pitch: -0.03, fov: 34 }, lt, d, t);
    show(stopS); inFront(stopS.group, 0, 0.2, 5); stopS.slam(seg(t, Wd('stop', 17), Wd('stop', 17) + 0.25)); stopS.group.rotateZ(-0.1);
    R(F.scene, LOOK, f); blit(); } });
  cue(Wd('stop', 17), 'slam', { gain: 0.45 });
  // ===== L18 "The oil's still | down there." - cutaway: the oil layer is still full
  add({ id: 'G03', at: cut(18), transition: { type: 'dissolve', dur: 0.25 }, note: 'oil still underground', draw(lt, d, t, blit) { hide(); V.setColor('#2a2f36');
    show(rock); rock.frack(0); rock.glow(eo(seg(lt, 0.3, 1.0)));
    const f = shot(cam, { target: V3(0, rock.top / 2, 0), dist: 12, yaw: 0.25, pitch: -0.1, fov: 32 }, { target: V3(0, rock.oilY + 0.2, 0.6), dist: 8.5, yaw: 0.15, pitch: -0.06, fov: 32 }, lt, d, t, { ease: 'cubic' });
    R(V.scene, LS); blit(); } });
  // ===== L19 "There's just | no reason to pump it." - abandoned pumpjack at dusk
  add({ id: 'G04', at: cut(19), transition: { type: 'dissolve', dur: 0.3 }, note: 'abandoned at dusk', draw(lt, d, t, blit) { hide(); F.setDusk(0.75); field(0, { pump: 3.2 });
    const f = shot(cam, { target: V3(-6, 2.2, -9), dist: 16, yaw: -0.35, pitch: 0.02, fov: 34 }, { target: V3(-6, 2.4, -9), dist: 13, yaw: -0.3, pitch: 0.02, fov: 34 }, lt, d, t);
    R(F.scene, { ...LOOK, saturation: 0.8 }, f); F.setDusk(0); F.setSun(14, 235); blit(); } });
  // ===== L20 "The big hope | is fusion." - tokamak, plasma ring
  add({ id: 'H01', at: cut(20), transition: { type: 'zoomblur', dur: 0.3 }, note: 'fusion reactor', draw(lt, d, t, blit) { hide(); V.setColor('#1d2230');
    show(tok); tok.update(t, eo(seg(t, Wd('fusion', 20) - 0.3, Wd('fusion', 20) + 0.2)));
    const f = shot(cam, { target: V3(0, 1.4, 0), dist: 9.5, yaw: 0.5, pitch: -0.45, fov: 32 }, { target: V3(0, 1.4, 0), dist: 8.2, yaw: 0.25, pitch: -0.4, fov: 32 }, lt, d, t);
    R(V.scene, { ...LS, bloom: 0.5, bloomThreshold: 0.6 }); blit(); } });
  cue(Wd('fusion', 20), 'whoosh_soft', { gain: 0.3 });
  // ===== L21 'But fusion has been | "a few decades away" | for over seventy years.' - years run 1955 -> 2025, the promise never moves
  add({ id: 'H02', at: cut(21), note: '30 years away, for 70 years', draw(lt, d, t, blit) { hide(); V.setColor('#1d2230');
    show(tok); tok.update(t, 1);
    const f = shot(cam, { target: V3(0, 1.8, 0), dist: 10, yaw: -0.1, pitch: -0.3, fov: 32 }, { target: V3(0, 1.8, 0), dist: 9.3, yaw: -0.25, pitch: -0.3, fov: 32 }, lt, d, t);
    show(away); away.group.position.set(0, 2.9, 0); away.show(eo(seg(t, Wd('few', 21) - 0.2, Wd('few', 21) + 0.2)), cam);
    show(years); inFront(years.group, 0, -1.5, 8); years.slam(eo(seg(t, Wd('seventy', 21) - 0.6, Wd('seventy', 21) - 0.3))); years.at(eio(seg(t, Wd('seventy', 21) - 0.3, lineEnd(21) + 0.3)));
    R(V.scene, { ...LS, bloom: 0.45, bloomThreshold: 0.6 }); blit(); } });
  // ===== L22 "And green tech | can't build | more green tech, | not yet." - solar farm, NOT YET
  add({ id: 'I01', at: cut(22), transition: { type: 'whip', dur: 0.3 }, note: 'solar farm, NOT YET', draw(lt, d, t, blit) { hide();
    const f = shot(cam, { target: V3(30, 1.2, -8), dist: 14, yaw: 0.65, pitch: -0.25, fov: 34 }, { target: V3(30, 1.2, -8), dist: 12, yaw: 0.5, pitch: -0.22, fov: 34 }, lt, d, t);
    show(notYet); inFront(notYet.group, 0, 0.35, 8); notYet.slam(seg(t, Wd('not', 22), Wd('not', 22) + 0.25)); notYet.group.rotateZ(-0.08);
    R(G.scene, LOOK, f); blit(); } });
  cue(Wd('not', 22), 'slam', { gain: 0.4 });
  // ===== L23 "Solar panels | still need diesel | to dig up the metal, | ships burning oil | to carry it, | and trucks | to bring it to you."
  add({ id: 'I02', at: cut(23), note: 'panel close', draw(lt, d, t, blit) { hide();
    const f = shot(cam, { target: V3(30, 1.15, -12), dist: 3.0, yaw: 0.25, pitch: -0.55, fov: 32 }, { target: V3(30.4, 1.15, -12), dist: 2.6, yaw: 0.12, pitch: -0.5, fov: 32 }, lt, d, t);
    R(G.scene, { ...LOOK, aperture: 0.002 }, f); blit(); } });
  add({ id: 'I03', at: Wd('diesel', 23) - 0.3, transition: { type: 'whip', dur: 0.25 }, note: 'excavator on diesel', draw(lt, d, t, blit) { hide(); field(t); exc.update(t);
    const f = shot(cam, { target: V3(62, 2.4, -5), dist: 13, yaw: 0.9, pitch: -0.08, fov: 34 }, { target: V3(62, 2.4, -5), dist: 11, yaw: 0.75, pitch: -0.06, fov: 34 }, lt, d, t);
    R(F.scene, LOOK, f); blit(); } });
  add({ id: 'I04', at: Wd('ships', 23) - 0.2, transition: { type: 'whip', dur: 0.25 }, note: 'ship burning oil', draw(lt, d, t, blit) { hide(); sea.update(t); rig.update(t); ship.smoke.update(t, 1); ship.group.position.set(40 + t * 3, 0.5, -60);
    const p = ship.group.position; const f = shot(cam, { target: p.clone().add(V3(0, 9, 0)), dist: 215, yaw: -0.25, pitch: -0.2, fov: 32 }, { target: p.clone().add(V3(0, 9, 0)), dist: 195, yaw: -0.15, pitch: -0.2, fov: 32 }, lt, d, t);
    R(S.scene, { ...LOOK, aperture: 0 }); blit(); } });
  add({ id: 'I05', at: Wd('trucks', 23) - 0.2, transition: { type: 'whip', dur: 0.25 }, note: 'truck brings panels', draw(lt, d, t, blit) { hide(); show(truck2); const x = -22 + (t - Wd('trucks', 23)) * 8;
    truck2.group.position.set(x, 0, 14); truck2.smoke.update(t, 1); home.setPanels(0);
    const f = shot(cam, { target: V3(x + 2, 2, 14), dist: 14, yaw: 0.85, pitch: -0.03, fov: 34 }, { target: V3(x + 2, 2, 14), dist: 12.5, yaw: 0.7, pitch: -0.03, fov: 34 }, lt, d, t);
    R(G.scene, LOOK, f); blit(); } });
  // ===== L24 "So the key is | to see how much abundance | we still have." - the homestead at golden hour, him looking out
  add({ id: 'J01', at: cut(24), transition: { type: 'dissolve', dur: 0.35 }, note: 'homestead, abundance', draw(lt, d, t, blit) { hide(); home.setPanels(0);
    at(man, -1.0, 4.5, Math.PI + 0.15); G.scene.add(man.group); man.play('idle', t); man.pose({ head: [-0.1, 0, 0] });
    const f = shot(cam, { target: V3(-1.05, 1.45, 4.0), dist: 3.8, yaw: 0.22, pitch: -0.03, fov: 36 }, { target: V3(-1.05, 1.5, 3.8), dist: 3.3, yaw: 0.15, pitch: -0.02, fov: 36 }, lt, d, t);
    R(G.scene, LOOK, f); blit(); } });
  // ===== L25 "Slow down." - he sits on the porch bench with a mug
  add({ id: 'J02', at: cut(25), note: 'slow down', draw(lt, d, t, blit) { hide(); home.setPanels(0);
    at(man, -5.2, -2.15, 0); G.scene.add(man.group); man.play('idle', t * 0.6).sit(1, { seat: 0.45 });
    man.aim('R', { upper: [-0.25, -0.75, 0.45], fore: [0.35, 0.1, 1], palm: [0.8, 0.4, 0] }).grip('R', 0.7); man.aim('L', { upper: [0.3, -0.7, 0.45], fore: [-0.6, 0.15, 0.8], palm: [-1, 0.2, 0] }).grip('L', 0.8);
    show(mug); const q = man.bones.RightHand.getWorldQuaternion(new THREE.Quaternion()); mug.position.copy(man.at('RightHand')).add(V3(0.02, 0.0, 0.07).applyQuaternion(q)); mug.rotation.set(0, 0, 0);
    const h = man.at('Head'); const f = shot(cam, { target: h.clone().add(V3(0, -0.35, 0)), dist: 2.6, yaw: 0.35, pitch: -0.05, fov: 32 }, { target: h.clone().add(V3(0, -0.3, 0)), dist: 2.4, yaw: 0.3, pitch: -0.05, fov: 32 }, lt, d, t);
    R(G.scene, { ...LOOK, aperture: 0.0016 }, f); blit(); } });
  // ===== L26 "Get some | solar panels." - panels appear on the roof one by one
  add({ id: 'J03', at: cut(26), transition: { type: 'whip', dur: 0.3 }, note: 'roof panels', draw(lt, d, t, blit) { hide(); home.setPanels(eio(seg(t, Wd('solar', 26) - 0.2, Wd('solar', 26) + 0.9)));
    const f = shot(cam, { target: V3(0, 4, -6), dist: 13, yaw: 0.2, pitch: -0.25, fov: 34 }, { target: V3(0, 4, -6), dist: 11.5, yaw: 0.1, pitch: -0.22, fov: 34 }, lt, d, t);
    R(G.scene, LOOK, f); blit(); } });
  for (let i = 0; i < 6; i++) cue(Wd('solar', 26) - 0.2 + i * 0.18, 'tock', { gain: 0.18 });
  // ===== L27 "Learn real skills." - at the workbench, hands on the work
  add({ id: 'J04', at: cut(27), note: 'workbench', draw(lt, d, t, blit) { hide(); home.setPanels(1);
    at(man, 6.5, -2.05, 0); G.scene.add(man.group); const w = Math.sin(t * 3) * 0.05;
    man.play('idle', t, { relax: 0 }).pose({ head: [0.45, 0, 0], spine: [0.25, 0, 0] })
      .aim('R', { upper: [-0.35, -0.75, 0.55], fore: [0.25, -0.55 + w, 0.8], palm: [0.1, -1, 0] }).aim('L', { upper: [0.35, -0.8, 0.5], fore: [-0.25, -0.6, 0.8], palm: [-0.1, -1, 0] }).grip('R', 0.25).grip('L', 0.25);
    const h = man.at('Head'); const f = shot(cam, { target: h.clone().add(V3(0, -0.45, 0.25)), dist: 2.2, yaw: 0.55, pitch: -0.12, fov: 32 }, { target: h.clone().add(V3(0, -0.45, 0.25)), dist: 1.9, yaw: 0.45, pitch: -0.12, fov: 32 }, lt, d, t);
    R(G.scene, { ...LOOK, aperture: 0.0018 }, f); blit(); } });
  // ===== L28 "Get involved | in your community." - neighbours together in the garden
  add({ id: 'J05', at: cut(28), transition: { type: 'dissolve', dur: 0.3 }, note: 'community', draw(lt, d, t, blit) { hide(); home.setPanels(1);
    const spots = [[-3.2, 1.6, 0.9], [-1.9, 2.4, -2.6], [-3.6, 3.2, 2.3], [-2.2, 1.0, -1.0]];
    [man, ...folk].forEach((a, i) => { at(a, spots[i][0], spots[i][1], spots[i][2]); G.scene.add(a.group); if (i % 2) a.play('agree', t + i).relax(t); else a.play('idle', t + i * 0.7); a.talk(0, 0.6); });
    const f = shot(cam, { target: V3(-2.7, 1.3, 2), dist: 6, yaw: 0.3, pitch: -0.08, fov: 34 }, { target: V3(-2.7, 1.3, 2), dist: 5.2, yaw: 0.18, pitch: -0.06, fov: 34 }, lt, d, t);
    R(G.scene, { ...LOOK, aperture: 0.0012 }, f); blit(); } });
  // ===== L29 "If you're prepared, | the decline can lead | to a better way of life." - homestead, crane up at golden hour
  add({ id: 'J06', at: cut(29), transition: { type: 'dissolve', dur: 0.35 }, note: 'better way of life', draw(lt, d, t, blit) { hide(); home.setPanels(1);
    const spots = [[-3.2, 1.6, 0.9], [-1.9, 2.4, -2.6], [-3.6, 3.2, 2.3], [-2.2, 1.0, -1.0]];
    [man, ...folk].forEach((a, i) => { at(a, spots[i][0], spots[i][1], spots[i][2]); G.scene.add(a.group); a.play('idle', t + i * 0.7); });
    const f = shot(cam, { target: V3(0, 2, -2), dist: 13, yaw: -0.3, pitch: -0.08, fov: 34 }, { target: V3(0, 3.5, -4), dist: 19, yaw: -0.15, pitch: -0.2, fov: 34 }, lt, d, t);
    R(G.scene, LOOK, f); blit(); } });
  // ===== L30 "If you want updates ... | Things Explained." - title over the homestead
  add({ id: 'K01', at: cut(30), note: 'end title', draw(lt, d, t, blit) { hide(); home.setPanels(1);
    const f = shot(cam, { target: V3(0, 4, -4), dist: 19, yaw: -0.15, pitch: -0.2, fov: 34 }, { target: V3(0, 5, -4), dist: 21, yaw: -0.05, pitch: -0.15, fov: 34 }, lt, d, t);
    show(endT); inFront(endT.group, 0, 0.9, 7); endT.slam(eo(seg(t, Wd('follow', 30) - 0.1, Wd('follow', 30) + 0.25)));
    R(G.scene, LOOK, f); blit(); } });
  cue(Wd('follow', 30) - 0.1, 'slam', { gain: 0.3 });
}
