// "Why America And Iran Are Always Fighting" - Things Explained, on the user's voiceover (voiceover_6.mp3).
// Stylised figurines (people.js), organic emphasis (fx.js: year slams, counters, pies, money rain, stamps, tearing paper),
// settings (world_props.js), globe (tech_props.js). Every shot is a pure function of time.
import * as THREE from 'three';
import { add, cue, cut, Wd, V3, eio, eo, seg, pulse, lerp, lerpV, debugCam, lineStart, lineEnd, TL } from './core/timeline.js';
import * as SETS from './core/sets.js';
import * as P from './core/tech_props.js';
import * as W from './core/world_props.js';
import * as FX from './core/fx.js';
import { figure, crowd, blink } from './core/people.js';
import { glowSprite } from './core/materials.js';
import { A } from './core/assets.js';

export const PRELOAD = {
  hdri: { studio: 'assets/hdri/studio_small_09_2k.hdr', sunset: 'assets/hdri/venice_sunset_1k.hdr' },
  tex: { earthDay: 'assets/earth/earth_day_4096.jpg', earthLights: 'assets/earth/earth_lights_2048.png' },
};
const TEHRAN = [35.69, 51.39], NYC = [40.7, -74], BAGHDAD = [33.3, 44.4], BEIRUT = [33.9, 35.5], GAZA = [31.4, 34.4], KHUZ = [[31.3, 48.7], [30.4, 49.2], [31.9, 49.6], [29.9, 50.4], [32.4, 48.4]];
const SKY = '#5BC4F0';

export async function buildShots(E) {
  const geo = await (await fetch('assets/earth/countries.geojson')).json();
  const FL = Object.fromEntries(await Promise.all(['us', 'ir', 'gb', 'iq', 'il'].map(async (c) => [c, await W.flagTex(`assets/flags/${c}.svg`)])));
  FL.irOld = W.oldIranFlagTex();
  const cam = E.camera(30), LOOK = { aperture: 0.001, bloom: 0.16, bloomThreshold: 0.85, ao: 0 };
  // ---------- studio void world ----------
  const V = SETS.studioVoid(A.env.studio, SKY);
  const who = Object.fromEntries(['mosaddegh', 'shah', 'khomeini', 'saddam', 'obama', 'trump', 'agent', 'british'].map((n) => { const f = figure(n); V.scene.add(f.group); return [n, f]; }));
  const fUS = W.flag(FL.us, { w: 0.9, pole: 2.3 }), fIR = W.flag(FL.ir, { w: 0.9, pole: 2.3 }); V.scene.add(fUS.group, fIR.group);
  const fX = W.flag(FL.gb, { w: 0.8, pole: 2.2 }); V.scene.add(fX.group);                    // generic flag behind a person (texture swapped per shot)
  const spark = glowSprite('#ffb347', 0.5); V.scene.add(spark);
  const year = FX.bigText('1951', { height: 0.42, color: '#ffffff', depthColor: '#00000066', glow: '#ffffff88' }); V.scene.add(year.group);
  const num = FX.counter({ from: 0, to: 100, height: 0.3, color: '#ffd23a', depthColor: '#5a3a0088' }); V.scene.add(num.group);
  const label = FX.bigText('16%', { height: 0.3, color: '#ffffff' }); V.scene.add(label.group);
  const pie1 = FX.pie([0.84, 0.16], ['#2b4c9b', '#239f40'], { r: 0.42 }), pie2 = FX.pie([0.6, 0.4], ['#239f40', '#c8102e'], { r: 0.42 }); V.scene.add(pie1.group, pie2.group);
  const rainGB = FX.moneyRain({ n: 140, coins: 40, w: 0.7, d: 0.5, h: 1.9, kind: 'pound', size: 0.13 }), rainIR = FX.moneyRain({ n: 14, coins: 6, w: 0.3, d: 0.3, h: 1.9, kind: 'pound', size: 0.13 });
  const rainUS = FX.moneyRain({ n: 150, coins: 50, w: 1.2, d: 0.6, h: 2.0, kind: 'dollar', size: 0.13 }); V.scene.add(rainGB.group, rainIR.group, rainUS.group);
  const oilBarrels = W.barrels(18, { color: '#1d1d1f' }), usBarrels = W.barrels(18, { color: '#b22234' }); V.scene.add(oilBarrels.group, usBarrels.group);
  const drop = new THREE.Mesh(new THREE.SphereGeometry(0.08, 32, 24), new THREE.MeshPhysicalMaterial({ color: '#050505', roughness: 0.05, clearcoat: 1, metalness: 0.2 })); V.scene.add(drop);
  const pool = new THREE.Mesh(new THREE.CircleGeometry(0.4, 48), new THREE.MeshPhysicalMaterial({ color: '#050505', roughness: 0.05, clearcoat: 1 })); pool.rotation.x = -Math.PI / 2; pool.position.y = 0.003; V.scene.add(pool);
  const parl = W.facade({ w: 16, cols: 8 }); parl.group.scale.setScalar(0.18); V.scene.add(parl.group);
  const crowdV = crowd(70, { w: 2.6, d: 0.8, signs: 10, seed: 3 }); crowdV.group.scale.setScalar(0.55); V.scene.add(crowdV.group);
  const fold = W.folder('OPERATION AJAX'); V.scene.add(fold.group);
  const desk = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.06, 1.4), new THREE.MeshPhysicalMaterial({ color: '#3a2618', roughness: 0.35, clearcoat: 0.7 })); desk.receiveShadow = true; V.scene.add(desk);
  const lampL = new THREE.SpotLight('#ffd8a0', 0, 6, 0.5, 0.5, 1.2); lampL.castShadow = true; V.scene.add(lampL, lampL.target);
  const ped = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.4, 0.5, 32), new THREE.MeshPhysicalMaterial({ color: '#d8d2c6', roughness: 0.5 })); ped.castShadow = true; V.scene.add(ped);
  const tankV = W.tank(); tankV.group.scale.setScalar(0.16); V.scene.add(tankV.group);
  const hostages = crowd(52, { w: 1.8, d: 0.9, palette: ['#c9c3b8', '#a9b4c2', '#8a8f98'], seed: 9 }); hostages.group.scale.setScalar(0.32); V.scene.add(hostages.group);
  const pages = Array.from({ length: 10 }, () => { const p = FX.paper('', { w: 0.5, lines: 0, sign: false }); V.scene.add(p.group); return p; });
  const stampS = FX.stamp('SANCTIONS'), stampW = FX.stamp('WORST DEAL EVER', '#c81e2b'); V.scene.add(stampS.group, stampW.group);
  const chains = [0, 1, 2, 3].map(() => { const c = FX.chain(18, { link: 0.07 }); V.scene.add(c.group); return c; });
  const deal = FX.paper('NUCLEAR DEAL', { w: 0.36 }); V.scene.add(deal.group);
  const tbl = W.table(2); V.scene.add(tbl.group);
  // ---------- outdoor ----------
  const O = W.outdoor(E); O.scene.environment = A.env.sunset; O.scene.environmentIntensity = 0.4;
  const jacks = [0, 1, 2].map((i) => { const j = W.pumpjack(); j.group.position.set(-6 + i * 7, 0, -4 - i * 3); j.group.rotation.y = 0.4 - i * 0.3; O.scene.add(j.group); return j; });
  const der = W.derrick(); der.group.position.set(9, 0, -14); O.scene.add(der.group);
  const fO = W.flag(FL.gb, { w: 2.2, pole: 7 }); fO.group.position.set(2.5, 0, 2); O.scene.add(fO.group);
  const brit = figure('british'); brit.group.position.set(0.6, 0, 4.2); brit.group.rotation.y = 0.3; O.scene.add(brit.group);
  const crowdO = crowd(260, { w: 16, d: 9, signs: 40, seed: 5 }); O.scene.add(crowdO.group);
  const emb = W.embassy(FL.us); emb.group.position.set(0, 0, -6); O.scene.add(emb.group);
  const plane = P.cargoPlane(); plane.group.scale.setScalar(0.25); O.scene.add(plane.group);
  const tanksO = [0, 1, 2, 3].map((i) => { const t = W.tank(); t.group.position.set(-8 + i * 5.5, 0, -6 - (i % 2) * 5); O.scene.add(t.group); return t; });
  const booms = [0, 1, 2, 3, 4].map(() => FX.boom(O.scene, { size: 3 }));
  const graves = FX.markers(1500, { w: 40, d: 45 }); graves.group.position.set(0, 0, 4); O.scene.add(graves.group);
  const jets = [W.jet('#7d8792'), W.jet('#8a929c'), W.jet('#7a848f')]; jets.forEach((j) => { j.group.scale.setScalar(0.6); O.scene.add(j.group); });
  const khom = figure('khomeini'), sadO = figure('saddam'); O.scene.add(khom.group, sadO.group);
  const fO2 = W.flag(FL.ir, { w: 2.4, pole: 8 }); O.scene.add(fO2.group);
  // ---------- interiors ----------
  const TR = W.throneRoom(); const shahT = figure('shah'); TR.scene.add(shahT.group); TR.scene.environment = A.env.sunset; TR.scene.environmentIntensity = 0.3;
  const CL = W.cell(); const CH = W.centrifugeHall();
  // ---------- globe ----------
  const GS = new THREE.Scene(); GS.background = new THREE.Color('#0A1428'); GS.add(new THREE.AmbientLight('#8fb0ff', 0.3)); const gsun = new THREE.DirectionalLight('#ffffff', 2.4); gsun.position.set(3, 2, 4); GS.add(gsun);
  GS.add(new THREE.Points(new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(Array.from({ length: 1500 }, (_, i) => { const t = i * 2.399, z = 1 - 2 * ((i + 0.5) / 1500), r = Math.sqrt(1 - z * z); return [Math.cos(t) * r * 40, z * 40, Math.sin(t) * r * 40]; }).flat(), 3)), new THREE.PointsMaterial({ color: '#fff', size: 0.06, transparent: true, opacity: 0.7 })));
  const G = P.globe(A, geo); GS.add(G.group);
  const oilPins = KHUZ.map((p) => G.pin(p[0], p[1], '#111111'));
  const arcNY = G.arc(TEHRAN, NYC, '#ffffff', 0.5), arcHz = G.arc(TEHRAN, BEIRUT, '#ffd23a', 0.12), arcHm = G.arc(TEHRAN, GAZA, '#ffd23a', 0.14);
  const strikes = [[33.72, 51.73], [34.88, 50.99], [32.65, 51.67]].map((p) => { const b = glowSprite('#ff7a2a', 0.18); b.position.copy(G.toVec(p[0], p[1], 1.01)); GS.add(b); return b; });
  const arcIL = G.arc([31.5, 34.8], [33.72, 51.73], '#ff5a4a', 0.25), arcUSs = G.arc([22, 62], [34.88, 50.99], '#5fb0ff', 0.25);
  const sat = W.satellite(); sat.group.scale.setScalar(0.06); GS.add(sat.group); const satBeam = new THREE.Mesh(new THREE.ConeGeometry(0.12, 1, 24, 1, true), new THREE.MeshBasicMaterial({ color: '#7fd8ff', transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending })); GS.add(satBeam);
  const coins = Array.from({ length: 10 }, () => { const c = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.004, 20), new THREE.MeshStandardMaterial({ color: '#e5b53a', metalness: 1, roughness: 0.25, emissive: '#5a3a00' })); GS.add(c); return c; });
  const GLOOK = { aperture: 0, bloom: 0.35, bloomThreshold: 0.7, ao: 0, vignette: 0.45 };
  const gcam = (lat, lon, dist, latT = lat, lonT = lon) => { cam.fov = 40; cam.position.copy(G.toVec(lat, lon, dist)); cam.up.set(0, 1, 0); cam.lookAt(G.toVec(latT, lonT, 0)); };

  const fits = [];
  function reset() {
    fits.length = 0; cam.fov = 30; V.setColor(SKY); V.key.intensity = 2.4; lampL.intensity = 0;
    Object.values(who).forEach((f) => { f.group.visible = false; f.group.position.set(0, 0, 0); f.group.rotation.set(0, 0, 0); f.pose({}); });
    [fUS, fIR, fX].forEach((f) => { f.group.visible = false; f.group.rotation.set(0, 0, 0); });
    [spark, drop, pool, parl.group, crowdV.group, fold.group, desk, ped, tankV.group, hostages.group, tbl.group, deal.group, oilBarrels.group, usBarrels.group].forEach((o) => (o.visible = false));
    [year, num, label].forEach((x) => x.slam(0)); pie1.group.visible = pie2.group.visible = false;
    [rainGB, rainIR, rainUS].forEach((r) => r.update(0, 0, 0)); pages.forEach((p) => (p.group.visible = false)); stampS.slam(0); stampW.slam(0);
    chains.forEach((c) => (c.group.visible = false)); deal.tear(0);
    // outdoor
    jacks.forEach((j) => (j.group.visible = false)); der.group.visible = false; fO.group.visible = false; brit.group.visible = false; crowdO.group.visible = false; emb.group.visible = false;
    plane.group.visible = false; tanksO.forEach((t) => (t.group.visible = false)); booms.forEach((b) => b.update(-10, 0)); graves.group.visible = false; jets.forEach((j) => (j.group.visible = false));
    khom.group.visible = false; sadO.group.visible = false; fO2.group.visible = false; O.setDusk(0);
    // globe
    G.clear(); G.setNight(0); oilPins.forEach((p) => p.set(0)); [arcNY, arcHz, arcHm, arcIL, arcUSs].forEach((a) => a.set(0)); strikes.forEach((s) => (s.material.opacity = 0));
    sat.group.visible = false; satBeam.material.opacity = 0; coins.forEach((c) => (c.visible = false));
  }
  const look = (from, to, tgt, lt, d, L = LOOK, scene = V.scene) => { cam.position.copy(lerpV(from, to, eio(Math.min(1, Math.max(0, lt / d))))); cam.lookAt(tgt); debugCam(cam);
    cam.updateMatrixWorld(); fits.forEach(([o, w]) => { o.quaternion.copy(cam.quaternion); const D = cam.position.distanceTo(o.position), vis = 2 * D * Math.tan(cam.fov * Math.PI / 360) * (9 / 16); o.scale.multiplyScalar(Math.min(1, 0.9 * vis / w)); });
    E.render(scene, cam, { ...L, focus: cam.position.distanceTo(tgt) }); };
  const show = (f, x = 0, z = 0, ry = 0) => { f.group.visible = true; f.group.position.set(x, 0, z); f.group.rotation.y = ry; return f; };
  const talk = (t, a, b) => (t > a && t < b ? Math.abs(Math.sin(t * 13)) * 0.7 : 0);
  /** year / number slam centred at y (in front of the camera target) */
  const yearCard = (T, str, k, pos) => { T.set(str); T.slam(k); T.group.position.copy(pos); fits.push([T.group, T === year ? 1.05 : 1.2]); };

  // ===== L0 "Why are America and Iran always fighting?" - two flags square off (frame 0 mid-action)
  const flagsDuel = (t, lt, d, k0 = 0.35) => { const k = Math.min(1, k0 + eio(seg(lt, 0, 1.6)) * (1 - k0));
    fUS.group.visible = fIR.group.visible = true; fUS.group.position.set(lerp(-1.6, -0.62, k), 0, 0); fIR.group.position.set(lerp(1.6, 0.62, k), 0, 0);
    fIR.group.rotation.y = Math.PI; fUS.update(t, 1.2); fIR.update(t + 0.7, 1.2); };
  add({ id: 'S01', at: 0, note: 'US vs Iran flags square off', draw(lt, d, t, blit) { reset(); V.setColor('#4a8fc4'); flagsDuel(t, lt, d);
    spark.visible = true; spark.position.set(0, 1.75, 0.1); spark.material.opacity = seg(t, 1.4, 1.8) * (0.6 + 0.4 * Math.sin(t * 30)); spark.scale.setScalar(0.4 + 0.4 * seg(t, 1.4, 2));
    look(V3(0, 1.6, 4.2), V3(0, 1.62, 3.8), V3(0, 1.55, 0), lt, d); blit(); } });
  cue(0.05, 'whoosh', { gain: 0.35 }); cue(1.5, 'slam', { gain: 0.35 });
  // ===== L1 "It all started with oil." - a black drop falls onto a barrel and spreads
  add({ id: 'S02', at: cut(1), transition: { type: 'flip', dur: 0.3 }, note: 'oil drop splashes', draw(lt, d, t, blit) {
    reset(); V.setColor('#d9b47c'); const tO = Wd('oil', 1) - 0.25, k = seg(t, tO - 0.45, tO);
    drop.visible = k < 1; drop.position.set(0, lerp(2.4, 0.08, k * k), 0); drop.scale.set(1, 1 + 0.6 * k, 1);
    pool.visible = t > tO; pool.scale.setScalar(Math.max(0.001, eo(seg(t, tO, tO + 0.6)))); oilBarrels.group.visible = false;
    look(V3(0, 0.9, 2.4), V3(0, 0.8, 2.1), V3(0, 0.25, 0), lt, d); blit(); } });
  cue(Wd('oil', 1) - 0.25, 'plop', { gain: 0.5 });
  // ===== L2 "Iran sits on some of the largest oil reserves on Earth." - globe, Iran, oil pins
  add({ id: 'S03', at: cut(2), transition: { type: 'zoomblur', dur: 0.35 }, note: 'globe: Iran + oil fields', draw(lt, d, t, blit) {
    reset(); G.highlight('IRN', seg(lt, 0.1, 0.6), '#2ea84a'); oilPins.forEach((p, i) => p.set(eo(seg(t, Wd('oil', 2) - 0.2 + i * 0.12, Wd('oil', 2) + 0.2 + i * 0.12))));
    const k = eio(seg(lt, 0, d)); gcam(lerp(20, 30, k), lerp(20, 50, k), lerp(3.4, 2.0, k), 32, 52); E.render(GS, cam, GLOOK); blit(); } });
  KHUZ.forEach((_, i) => cue(Wd('oil', 2) + i * 0.12, 'pop', { gain: 0.25 }));
  // ===== L3 "But in the early 1950s, a British company controlled it," - oil field under a British flag
  add({ id: 'S04', at: cut(3), transition: { type: 'flip', dur: 0.3 }, note: 'oil field, British flag, officer', draw(lt, d, t, blit) {
    reset(); jacks.forEach((j) => { j.group.visible = true; j.update(t); }); der.group.visible = true; fO.group.visible = true; fO.setTex(FL.gb); fO.update(t, 1);
    brit.group.visible = true; brit.pose({ armL: [0.9, 0.25], armR: [0.9, 0.25], elbowL: 1.6, elbowR: 1.6, mouth: 0.4, blink: blink(t) });
    look(V3(-2.5, 2.6, 11), V3(-1.2, 2.2, 9), V3(1, 2, 0), lt, d, { ...LOOK, aperture: 0 }, O.scene); blit(); } });
  cue(cut(3) + 0.1, 'whoosh_soft', { gain: 0.3 }); cue(Wd('British', 3), 'tock', { gain: 0.3 });
  // ===== L4 "and Iran got only about 16 percent of the profits." - pie + money pile mostly British
  add({ id: 'S05', at: cut(4), transition: { type: 'whip', dur: 0.3 }, note: '84/16 pie, pounds rain on UK side', draw(lt, d, t, blit) {
    reset(); V.setColor('#3f6f9a'); pie1.group.visible = true; pie1.group.position.set(0, 1.0, 0); pie1.group.rotation.set(0.9, 0, 0);
    const t16 = Wd('sixteen', 4); pie1.update(eo(seg(lt, 0, 0.6)), 1, eo(seg(t, t16, t16 + 0.4)));
    yearCard(label, '16%', seg(t, t16, t16 + 0.35), V3(0.25, 1.62, 0.5));
    rainGB.group.position.set(-0.5, -0.05, 0); rainGB.update(t, Wd('profits', 4) - 0.6, 1); rainIR.group.position.set(0.55, -0.05, 0); rainIR.update(t, Wd('profits', 4) - 0.6, 1);
    look(V3(0, 1.45, 3.4), V3(0, 1.4, 3.1), V3(0, 1.0, 0), lt, d); blit(); } });
  cue(Wd('sixteen', 4), 'pop', { gain: 0.45 }); cue(Wd('profits', 4) - 0.5, 'bubbles', { dur: 1.4, gain: 0.3 });
  // ===== L5 "In 1951, Iran's democratically elected prime minister," - year slam, then parliament + cheering crowd
  add({ id: 'S06', at: cut(5), transition: { type: 'zoomblur', dur: 0.3 }, note: '1951 slam', draw(lt, d, t, blit) {
    reset(); V.setColor('#2f7a4a'); cam.position.set(0, 1.5, 2.2); cam.lookAt(0, 1.5, 0); yearCard(year, '1951', seg(lt, 0, 0.35), V3(0, 1.55, 0.6));
    look(V3(0, 1.5, 2.2), V3(0, 1.5, 2.0), V3(0, 1.5, 0), lt, d); blit(); } });
  cue(cut(5) + 0.05, 'slam', { gain: 0.45 });
  add({ id: 'S07', at: Wd('Iran', 5) - 0.1, transition: { type: 'whip', dur: 0.3 }, note: 'parliament, crowd cheers, Mosaddegh in front', draw(lt, d, t, blit) {
    reset(); V.setColor('#7fb8d8'); parl.group.visible = true; parl.group.position.set(0, 0, -1.6); crowdV.group.visible = true; crowdV.group.position.set(0, 0, 0.2); crowdV.update(t, 0.4 + 0.5 * seg(t, Wd('elected', 5), Wd('elected', 5) + 0.5));
    const m = show(who.mosaddegh, 0, 1.0); m.pose({ armR: [2.6 * seg(t, Wd('elected', 5), Wd('elected', 5) + 0.4), 0.2], mouth: 0.6, blink: blink(t) });
    look(V3(0.4, 1.7, 4.6), V3(0.2, 1.6, 4.0), V3(0, 1.3, 0), lt, d); blit(); } });
  cue(Wd('elected', 5), 'shimmer', { dur: 1, gain: 0.3 });
  // ===== L6 "Mohammad Mosaddegh, nationalized the oil." - close, fist up; flag swap UK -> Iran
  add({ id: 'S08', at: cut(6), transition: { type: 'dissolve', dur: 0.3 }, note: 'Mosaddegh close; flag swaps to Iran', draw(lt, d, t, blit) {
    reset(); V.setColor('#d9b47c'); const m = show(who.mosaddegh, 0, 0, -0.25); const tn = Wd('nationalized', 6), k = seg(t, tn, tn + 0.35);
    m.pose({ armR: [2.4 * k, 0.15], elbowR: 0.4 + 0.8 * k, mouth: 0.3 + 0.5 * k, talk: talk(t, lineStart(6), tn), brow: 0.5 * k, blink: blink(t, 2) });
    fX.group.visible = true; fX.group.position.set(0.55, 0, -0.6); fX.setTex(t < tn + 0.15 ? FL.gb : FL.irOld); fX.update(t, 1);
    oilBarrels.group.visible = true; oilBarrels.group.position.set(-0.1, 0, -1.4); oilBarrels.group.scale.setScalar(0.55);
    look(V3(0.15, 1.66, 1.5), V3(0.1, 1.64, 1.25), V3(0.05, 1.58, 0), lt, d); blit(); } });
  cue(Wd('nationalized', 6), 'slam', { gain: 0.4 }); cue(Wd('nationalized', 6) + 0.1, 'whoosh', { gain: 0.3 });
  // ===== L7 "Britain was furious." - officer slams fist, red void
  add({ id: 'S09', at: cut(7), transition: { type: 'whip', dur: 0.25, dir: -1 }, note: 'British officer furious', draw(lt, d, t, blit) {
    reset(); V.setColor('#a8322c'); const b = show(who.british, 0, 0, 0.2); const k = pulse(t, Wd('furious', 7) - 0.1, Wd('furious', 7) + 0.5);
    b.pose({ armR: [1.2 + 0.8 * k, 0.1], elbowR: 1.4, brow: -1, mouth: -0.8, talk: 0.4 * k, head: [0.08 * k, 0, 0] });
    look(V3(0.2, 1.65, 1.35), V3(0.12, 1.65, 1.2), V3(0, 1.6, 0), lt, d); blit(); } });
  cue(Wd('furious', 7), 'thud', { gain: 0.5 });
  // ===== L8 "So in 1953, the CIA and British intelligence ran Operation Ajax" - year, then secret folder at night
  add({ id: 'S10', at: cut(8), transition: { type: 'flip', dur: 0.3 }, note: '1953 slam (night)', draw(lt, d, t, blit) {
    reset(); V.setColor('#14233F'); cam.position.set(0, 1.5, 2.2); cam.lookAt(0, 1.5, 0); yearCard(year, '1953', seg(lt, 0, 0.35), V3(0, 1.55, 0.6));
    look(V3(0, 1.5, 2.2), V3(0, 1.5, 2.0), V3(0, 1.5, 0), lt, d, { ...LOOK, exposure: 0.9 }); blit(); } });
  cue(cut(8) + 0.05, 'slam', { gain: 0.45 });
  add({ id: 'S11', at: Wd('CIA', 8) - 0.1, transition: { type: 'dissolve', dur: 0.3 }, note: 'agents + TOP SECRET folder: Operation Ajax', draw(lt, d, t, blit) {
    reset(); V.setColor('#0e1626'); V.key.intensity = 0.5; lampL.intensity = 60; lampL.position.set(0, 2.6, 0.6); lampL.target.position.set(0, 0.8, 0);
    desk.visible = true; desk.position.set(0, 0.78, 0); fold.group.visible = true; fold.group.position.set(0, 0.82, 0.15); fold.open(0);
    const a = show(who.agent, -0.55, -0.55, 0.45), b = show(who.british, 0.6, -0.6, -0.45);
    a.pose({ armL: [0.5, 0.1], mouth: -0.2, blink: blink(t) }); b.pose({ armR: [0.6, 0.1], mouth: -0.3, brow: -0.6, blink: blink(t, 1) });
    const k = eo(seg(t, Wd('Ajax', 8) - 0.5, Wd('Ajax', 8))); fold.group.rotation.y = 0;
    look(V3(0, 2.3, 2.4), V3(0, 1.9, 1.5 - 0.3 * k), V3(0, 0.9, 0.1), lt, d, { ...LOOK, bloom: 0.25 }); blit(); } });
  cue(Wd('CIA', 8), 'tock', { gain: 0.3 }); cue(Wd('Ajax', 8) - 0.3, 'slide', { dur: 0.5, gain: 0.35 });
  // ===== L9 "and overthrew him." - Mosaddegh topples off his pedestal, a tank behind
  add({ id: 'S12', at: cut(9), transition: { type: 'flip', dur: 0.3 }, note: 'Mosaddegh topples', draw(lt, d, t, blit) {
    reset(); V.setColor('#2a3550'); ped.visible = true; ped.position.set(0, 0.25, 0); const m = show(who.mosaddegh, 0, 0); m.group.position.y = 0.5;
    const k = ei3(seg(t, Wd('overthrew', 9), Wd('overthrew', 9) + 0.7)); m.group.rotation.x = -1.5 * k; m.group.position.z = -0.9 * k; m.group.position.y = 0.5 - 0.45 * k;
    m.pose({ mouth: -0.5, brow: 0.6 });
    tankV.group.visible = true; tankV.group.position.set(lerp(-2.5, -1.0, eo(seg(lt, 0, d))), 0, -1.6); tankV.update(t, 0.4);
    look(V3(0.6, 1.4, 4.0), V3(0.4, 1.3, 3.6), V3(0, 1.0, 0), lt, d); blit(); } });
  cue(Wd('overthrew', 9) + 0.5, 'thud', { gain: 0.5 }); cue(cut(9), 'rumble', { dur: 1.3, gain: 0.3 });
  // ===== L10 "They put the Shah, Mohammad Reza Pahlavi, back in full power." - throne room
  add({ id: 'S13', at: cut(10), transition: { type: 'zoomblur', dur: 0.35 }, note: 'the Shah before his throne', draw(lt, d, t, blit) {
    reset(); shahT.group.position.set(0, 0.5, -0.9); shahT.pose({ mouth: 0.3, head: [-0.05, 0, 0], blink: blink(t), armL: [0.1, 0.12], armR: [0.1, 0.12] });
    TR.key.intensity = 120 + 120 * seg(t, Wd('full', 10), Wd('full', 10) + 0.6);
    look(V3(0.3, 1.8, 7.5), V3(0.1, 1.95, 3.2), V3(0, 1.8, -1.0), lt, d, { ...LOOK, bloom: 0.3, bloomThreshold: 0.75 }, TR.scene); blit(); } });
  cue(cut(10) + 0.1, 'whoosh_soft', { dur: 1, gain: 0.3 }); cue(Wd('full', 10), 'sparkle', { dur: 1, gain: 0.35 });
  // ===== L11 "He ruled for 26 years," - year counter 1953 -> 1979 over the Shah
  add({ id: 'S14', at: cut(11), transition: { type: 'dissolve', dur: 0.25 }, note: 'counter 1953 -> 1979', draw(lt, d, t, blit) {
    reset(); V.setColor('#b8862c'); const s = show(who.shah, 0, -0.4); s.pose({ mouth: 0.35, blink: blink(t) });
    num.at(0); num.set(String(Math.round(lerp(1953, 1979, eio(seg(t, Wd('ruled', 11), lineEnd(11)))))));
    num.slam(seg(lt, 0, 0.3)); num.group.position.set(0, 1.97, 0.4); fits.push([num.group, 1.2]);
    look(V3(0, 1.5, 2.6), V3(0, 1.48, 2.3), V3(0, 1.35, 0), lt, d); blit(); } });
  cue(cut(11), 'tick', { dur: 1.4, gain: 0.3 });
  // ===== L12 "and American companies got a 40 percent share of Iran's oil." - pie + US barrels + dollars
  add({ id: 'S15', at: cut(12), transition: { type: 'whip', dur: 0.3 }, note: '40% slice pops, dollars rain', draw(lt, d, t, blit) {
    reset(); V.setColor('#3f6f9a'); pie2.group.visible = true; pie2.group.position.set(0, 1.0, 0); pie2.group.rotation.set(0.9, 0, 0);
    const t40 = Wd('forty', 12); pie2.update(eo(seg(lt, 0, 0.5)), 1, eo(seg(t, t40, t40 + 0.4))); yearCard(label, '40%', seg(t, t40, t40 + 0.35), V3(0.3, 1.62, 0.5));
    rainUS.group.position.set(0, -0.05, -0.2); rainUS.update(t, Wd('share', 12) - 0.4, 1);
    usBarrels.group.visible = true; usBarrels.group.position.set(lerp(-3, -1.2, eo(seg(lt, 0.2, 1.2))), 0, -0.6); usBarrels.group.scale.setScalar(0.4);
    look(V3(0, 1.45, 3.4), V3(0, 1.4, 3.1), V3(0, 1.0, 0), lt, d); blit(); } });
  cue(Wd('forty', 12), 'pop', { gain: 0.45 }); cue(Wd('share', 12) - 0.3, 'bubbles', { dur: 1.5, gain: 0.3 });
  // ===== L13 "But his secret police tortured opponents and crushed dissent." - bare cell (no gore)
  add({ id: 'S16', at: cut(13), transition: { type: 'flip', dur: 0.3 }, note: 'interrogation cell', draw(lt, d, t, blit) {
    CL.update(t); cam.fov = 30; look(V3(2.4, 1.9, 4.2), V3(1.8, 1.7, 3.4), V3(0, 1.0, -0.6), lt, d, { ...LOOK, aperture: 0, bloom: 0.3, vignette: 0.6 }, CL.scene); blit(); } });
  cue(cut(13), 'rumble', { dur: 2.5, gain: 0.25 }); cue(Wd('crushed', 13), 'slam', { gain: 0.3 });
  // ===== L14 "In 1979, Iranians rose up." - year, then a crowd at dusk
  add({ id: 'S17', at: cut(14), transition: { type: 'zoomblur', dur: 0.3 }, note: '1979 slam', draw(lt, d, t, blit) {
    reset(); V.setColor('#8a2a24'); cam.position.set(0, 1.5, 2.2); cam.lookAt(0, 1.5, 0); yearCard(year, '1979', seg(lt, 0, 0.35), V3(0, 1.55, 0.6));
    look(V3(0, 1.5, 2.2), V3(0, 1.5, 2.0), V3(0, 1.5, 0), lt, d); blit(); } });
  cue(cut(14) + 0.05, 'slam', { gain: 0.45 });
  add({ id: 'S18', at: Wd('Iranians', 14) - 0.1, transition: { type: 'whip', dur: 0.3 }, note: 'crowd rises up at dusk', draw(lt, d, t, blit) {
    reset(); O.setDusk(0.75); crowdO.group.visible = true; crowdO.group.position.set(0, 0, 0); crowdO.update(t, 0.3 + 0.7 * seg(t, Wd('rose', 14), Wd('rose', 14) + 0.4));
    fO.group.visible = true; fO.setTex(FL.irOld); fO.group.position.set(-3, 0, -3); fO.update(t, 1.2);
    look(V3(0, 1.6, 9), V3(0, 2.2, 7.5), V3(0, 1.4, 0), lt, d, { ...LOOK, aperture: 0 }, O.scene); blit(); } });
  cue(Wd('rose', 14), 'whoosh', { gain: 0.35 });
  // ===== L15 "The Shah fled," - plane takes off at dusk
  add({ id: 'S19', at: cut(15), transition: { type: 'whip', dur: 0.25 }, note: 'plane takes off', draw(lt, d, t, blit) {
    reset(); O.setDusk(0.85); plane.group.visible = true; const k = seg(lt, 0, d + 0.4); plane.group.position.set(lerp(-14, 10, k), 1 + 5 * k * k, -10); plane.group.rotation.z = 0.15 * k;
    look(V3(0, 2, 6), V3(0, 2.4, 6), V3(0, 3.0, -10), lt, d, { ...LOOK, aperture: 0 }, O.scene); blit(); } });
  cue(cut(15), 'whoosh_soft', { dur: 1, gain: 0.45 });
  // ===== L16 "and Ayatollah Khomeini took power." - Khomeini before the cheering crowd, new flag
  add({ id: 'S20', at: cut(16), transition: { type: 'dissolve', dur: 0.3 }, note: 'Khomeini takes power', draw(lt, d, t, blit) {
    reset(); O.setDusk(0.55); khom.group.visible = true; khom.group.position.set(0, 0, 5.2); khom.pose({ armR: [1.6 * seg(t, Wd('power', 16) - 0.3, Wd('power', 16) + 0.2), 0.3], brow: -0.3, blink: blink(t) });
    crowdO.group.visible = true; crowdO.group.position.set(0, 0, -2); crowdO.update(t, 0.9); fO2.group.visible = true; fO2.group.position.set(1.6, 0, 3); fO2.update(t, 1.2);
    look(V3(0.6, 1.7, 8.8), V3(0.4, 1.75, 7.6), V3(0, 1.55, 5), lt, d, { ...LOOK, aperture: 0.0008, focus: 3 }, O.scene); blit(); } });
  cue(Wd('Khomeini', 16), 'shimmer', { dur: 1.2, gain: 0.3 });
  // ===== L17 "When the Shah was let into the US, Iranian students stormed the American embassy"
  add({ id: 'S21', at: cut(17), transition: { type: 'zoomblur', dur: 0.3 }, note: 'globe arc Tehran -> New York', draw(lt, d, t, blit) {
    reset(); G.highlight('IRN', 0.6, '#2ea84a'); G.highlight('USA', 0.6, '#5fb0ff'); arcNY.set(eio(seg(lt, 0.1, 1.5)));
    const k = eio(seg(lt, 0, d)); gcam(lerp(45, 50, k), lerp(20, -30, k), 3.6, 40, lerp(20, -20, k)); E.render(GS, cam, GLOOK); blit(); } });
  cue(cut(17) + 0.1, 'whoosh_soft', { dur: 1.2, gain: 0.35 });
  add({ id: 'S22', at: Wd('Iranian', 17) - 0.1, transition: { type: 'whip', dur: 0.3 }, note: 'students storm the embassy', draw(lt, d, t, blit) {
    reset(); O.setDusk(0.2); emb.group.visible = true; emb.flag.update(t, 1);
    crowdO.group.visible = true; const k = eio(seg(t, Wd('stormed', 17) - 0.3, lineEnd(17) + 0.3)); crowdO.group.position.set(0, 0, lerp(6, 1.5, k)); crowdO.update(t, 0.8);
    look(V3(-3, 3.2, 16), V3(-2, 3.4, 13), V3(0, 2, -3), lt, d, { ...LOOK, aperture: 0 }, O.scene); blit(); } });
  cue(Wd('stormed', 17), 'rumble', { dur: 1.5, gain: 0.4 });
  // ===== L18 "and held 52 Americans hostage" - 52 figures fill in, counter to 52
  add({ id: 'S23', at: cut(18), transition: { type: 'flip', dur: 0.3 }, note: '52 hostages count up', draw(lt, d, t, blit) {
    reset(); V.setColor('#2c3a50'); hostages.group.visible = true; hostages.group.position.set(0, 0, 0); hostages.update(0, 0);
    const k = eio(seg(t, Wd('fifty-two', 18) - 0.3, Wd('hostage', 18) + 0.2)); num.at(0); num.set(String(Math.round(52 * k))); num.slam(seg(lt, 0, 0.3));
    num.group.position.set(0, 1.25, 0.4); fits.push([num.group, 1.2]);
    hostages.group.scale.setScalar(0.32); hostages.group.children.forEach((m) => { if (m.isInstancedMesh) m.count = Math.max(1, Math.round(52 * k)); });
    look(V3(0, 1.4, 2.8), V3(0, 1.35, 2.5), V3(0, 0.7, 0), lt, d); blit(); } });
  cue(Wd('fifty-two', 18), 'tick', { dur: 1.2, gain: 0.3 });
  // ===== L19 "for 444 days." - day counter + calendar pages flying off
  add({ id: 'S24', at: cut(19), transition: { type: 'whip', dur: 0.25 }, note: '444 days counter, calendar pages fly', draw(lt, d, t, blit) {
    reset(); V.setColor('#2c3a50'); const k = eio(seg(lt, 0.05, d - 0.2));
    num.at(0); num.set(`DAY ${Math.round(1 + 443 * k)}`); num.slam(seg(lt, 0, 0.25)); num.group.position.set(0, 1.55, 0.3); fits.push([num.group, 1.2]);
    pages.forEach((p, i) => { const pk = ((lt * 6 + i / pages.length) % 1); p.group.visible = true; p.group.position.set(pk * 1.6 - 0.1, 1.0 + pk * 0.8, -0.2 - i * 0.002); p.group.rotation.set(0, -pk * 1.2, -pk * 0.8); });
    look(V3(0, 1.35, 2.6), V3(0, 1.35, 2.4), V3(0, 1.25, 0), lt, d); blit(); } });
  cue(cut(19), 'tick', { dur: 1.6, gain: 0.35 });
  // ===== L20 "They feared another coup." - flashback: the secret folder, sepia
  add({ id: 'S25', at: cut(20), transition: { type: 'dissolve', dur: 0.3 }, note: 'flashback folder (sepia)', draw(lt, d, t, blit) {
    reset(); V.setColor('#5a4630'); desk.visible = true; desk.position.set(0, 0.78, 0); fold.group.visible = true; fold.group.position.set(0, 0.82, 0.15);
    const m = show(who.mosaddegh, 0.45, -0.3, -0.3); m.pose({ mouth: -0.3, brow: 0.4 });
    look(V3(0, 2.1, 2.0), V3(0, 2.0, 1.7), V3(0, 1.0, 0.1), lt, d, { ...LOOK, saturation: 0.35, warm: 0.7, vignette: 0.7 }); blit(); } });
  cue(cut(20), 'whoosh_soft', { gain: 0.3 });
  // ===== L21 "Then in 1980, Saddam Hussein's Iraq invaded Iran," - year, Saddam, tanks
  add({ id: 'S26', at: cut(21), transition: { type: 'flip', dur: 0.3 }, note: '1980 slam', draw(lt, d, t, blit) {
    reset(); V.setColor('#5b6243'); cam.position.set(0, 1.5, 2.2); cam.lookAt(0, 1.5, 0); yearCard(year, '1980', seg(lt, 0, 0.35), V3(0, 1.55, 0.6));
    look(V3(0, 1.5, 2.2), V3(0, 1.5, 2.0), V3(0, 1.5, 0), lt, d); blit(); } });
  cue(cut(21) + 0.05, 'slam', { gain: 0.45 });
  add({ id: 'S27', at: Wd('Saddam', 21) - 0.1, transition: { type: 'whip', dur: 0.3 }, note: 'Saddam before the Iraqi flag', draw(lt, d, t, blit) {
    reset(); V.setColor('#7a6a4a'); const s = show(who.saddam, 0, 0, 0.15); s.pose({ armR: [0.9, 0.1], elbowR: 1.2, brow: -0.6, mouth: 0.2, blink: blink(t) });
    fX.group.visible = true; fX.setTex(FL.iq); fX.group.position.set(0.5, 0, -0.6); fX.update(t, 1);
    look(V3(0.2, 1.66, 1.6), V3(0.15, 1.64, 1.35), V3(0, 1.55, 0), lt, d); blit(); } });
  add({ id: 'S28', at: Wd('invaded', 21) - 0.1, transition: { type: 'whip', dur: 0.3 }, note: 'tanks roll, explosions', draw(lt, d, t, blit) {
    reset(); O.setDusk(0.35); tanksO.forEach((tk, i) => { tk.group.visible = true; tk.group.position.x = -8 + i * 5.5 + lt * 2.2; tk.update(t, 0.1 * Math.sin(t + i)); });
    booms.forEach((b, i) => { b.group.position.set(-6 + i * 4, 0, -16 - i * 3); b.update(t, Wd('invaded', 21) + i * 0.25); });
    look(V3(-6, 2.5, 9), V3(-3, 2.2, 8), V3(0, 1.2, -6), lt, d, { ...LOOK, aperture: 0, bloom: 0.35 }, O.scene); blit(); } });
  cue(Wd('invaded', 21), 'slam', { gain: 0.4 }); [0, 1, 2].forEach((i) => cue(Wd('invaded', 21) + 0.25 + i * 0.25, 'thud', { gain: 0.35 }));
  // ===== L22 "and over time the US backed Iraq with intelligence." - satellite beams intel onto Iraq
  add({ id: 'S29', at: cut(22), transition: { type: 'zoomblur', dur: 0.3 }, note: 'satellite intel beam onto Iraq', draw(lt, d, t, blit) {
    reset(); G.highlight('IRQ', 0.8, '#c8a84a'); G.highlight('IRN', 0.5, '#2ea84a'); const sp = G.toVec(33, 44, 1.55);
    sat.group.visible = true; sat.group.position.copy(sp); sat.group.lookAt(0, 0, 0); const kb = seg(t, Wd('intelligence', 22) - 0.4, Wd('intelligence', 22));
    satBeam.material.opacity = 0.35 * kb * (0.7 + 0.3 * Math.sin(t * 12)); satBeam.position.copy(G.toVec(33, 44, 1.27)); satBeam.scale.set(1, 0.55, 1); satBeam.lookAt(0, 0, 0); satBeam.rotateX(-Math.PI / 2);
    const k = eio(seg(lt, 0, d)); gcam(lerp(25, 30, k), lerp(30, 42, k), lerp(3.0, 2.6, k), 33, 44); E.render(GS, cam, GLOOK); blit(); } });
  cue(Wd('intelligence', 22) - 0.3, 'zip', { gain: 0.35 });
  // ===== L23 "Hundreds of thousands died." - memorial markers rise across the battlefield
  add({ id: 'S30', at: cut(23), transition: { type: 'dissolve', dur: 0.4 }, note: 'memorial markers to the horizon', draw(lt, d, t, blit) {
    reset(); O.setDusk(0.9); graves.group.visible = true; graves.update(eio(seg(lt, 0, d)));
    look(V3(0, 1.6, 9), V3(0, 3.5, 11), V3(0, 0.5, -10), lt, d, { ...LOOK, aperture: 0, saturation: 0.6 }, O.scene); blit(); } });
  cue(cut(23), 'whoosh_soft', { dur: 1.2, gain: 0.25 });
  // ===== L24 "Iran answered by funding groups like Hezbollah and Hamas," - money arcs to Lebanon and Gaza
  add({ id: 'S31', at: cut(24), transition: { type: 'flip', dur: 0.3 }, note: 'money flows from Iran to Lebanon and Gaza', draw(lt, d, t, blit) {
    reset(); G.highlight('IRN', 0.6, '#2ea84a'); const kh = eio(seg(t, Wd('Hezbollah', 24) - 0.3, Wd('Hezbollah', 24) + 0.4)), km = eio(seg(t, Wd('Hamas', 24) - 0.3, Wd('Hamas', 24) + 0.4));
    arcHz.set(kh); arcHm.set(km);
    coins.forEach((c, i) => { const a = i % 2 ? km : kh, ph = (lt * 0.8 + i / coins.length) % 1, from = TEHRAN, to = i % 2 ? GAZA : BEIRUT; c.visible = a > 0.9;
      c.position.copy(G.toVec(from[0] + (to[0] - from[0]) * ph, from[1] + (to[1] - from[1]) * ph, 1.0 + 0.13 * Math.sin(Math.PI * ph) + 0.01)); c.rotation.set(t * 4 + i, t * 3, 0); });
    const k = eio(seg(lt, 0, d)); gcam(lerp(26, 30, k), lerp(38, 44, k), lerp(1.8, 1.55, k), 33, 43); E.render(GS, cam, GLOOK); blit(); } });
  cue(Wd('funding', 24), 'bubbles', { dur: 1.2, gain: 0.3 }); cue(Wd('Hezbollah', 24), 'pop', { gain: 0.3 }); cue(Wd('Hamas', 24), 'pop', { gain: 0.3 });
  // ===== L25 "and building a nuclear program." - centrifuge hall
  add({ id: 'S32', at: cut(25), transition: { type: 'zoomblur', dur: 0.3 }, note: 'centrifuge cascade', draw(lt, d, t, blit) {
    CH.update(t, 1); cam.fov = 35; look(V3(4.5, 2.6, 5), V3(3, 2.2, 4), V3(0, 1.1, -3), lt, d, { ...LOOK, aperture: 0, bloom: 0.45, bloomThreshold: 0.6 }, CH.scene); blit(); } });
  cue(cut(25), 'shimmer', { dur: 1.6, gain: 0.3 });
  // ===== L26 "America answered with sanctions." - chains wrap Iran's oil barrels, SANCTIONS stamp
  add({ id: 'S33', at: cut(26), transition: { type: 'flip', dur: 0.3 }, note: 'SANCTIONS stamp + chains on oil', draw(lt, d, t, blit) {
    reset(); V.setColor('#5a2a2a'); oilBarrels.group.visible = true; oilBarrels.group.position.set(0, 0, -0.3); oilBarrels.group.scale.setScalar(0.45);
    chains.forEach((c, i) => { c.group.visible = true; c.group.position.set(-0.75 + i * 0.5, lerp(3, 1.25, eo(seg(lt, 0.05 + i * 0.06, 0.45 + i * 0.06))), 0.05); c.breakAt(0); });
    stampS.slam(seg(t, Wd('sanctions', 26) - 0.05, Wd('sanctions', 26) + 0.3)); stampS.group.position.set(0, 1.2, 0.6); fits.push([stampS.group, 1.2]);
    look(V3(0, 1.3, 3.2), V3(0, 1.28, 3.0), V3(0, 0.9, 0), lt, d); blit(); } });
  cue(cut(26) + 0.1, 'zip', { gain: 0.3 }); cue(Wd('sanctions', 26), 'slam', { gain: 0.5 });
  // ===== L27 "In 2015, Obama's deal lifted sanctions" - year, Obama signs, chains break
  add({ id: 'S34', at: cut(27), transition: { type: 'zoomblur', dur: 0.3 }, note: '2015 + Obama signs, chains fall', draw(lt, d, t, blit) {
    reset(); V.setColor('#3a6a9a'); yearCard(year, '2015', seg(lt, 0, 0.3) * (1 - seg(t, Wd('Obama', 27) - 0.2, Wd('Obama', 27))), V3(0, 1.9, 0.4));
    tbl.group.visible = true; tbl.group.position.set(0, 0, 0); tbl.chairs.forEach((c) => (c.visible = false));
    const o = show(who.obama, 0, -0.75); o.pose({ armR: [0.9, 0.05], elbowR: 1.1 + 0.15 * Math.sin(t * 9) * seg(t, Wd('deal', 27), Wd('deal', 27) + 0.5), mouth: 0.5, blink: blink(t), head: [0.25, 0, 0] });
    deal.group.visible = true; deal.group.position.set(0, 0.81, -0.1); deal.group.rotation.set(-Math.PI / 2, 0, 0);
    chains.forEach((c, i) => { c.group.visible = true; c.group.position.set(-1.1 + i * 0.75, 1.9, 0.4); c.breakAt(eio(seg(t, Wd('lifted', 27), Wd('lifted', 27) + 0.9))); });
    look(V3(0, 1.9, 3.1), V3(0, 1.8, 2.8), V3(0, 1.1, -0.2), lt, d); blit(); } });
  cue(cut(27) + 0.05, 'slam', { gain: 0.4 }); cue(Wd('lifted', 27), 'sparkle', { dur: 1, gain: 0.35 });
  // ===== L28 "in exchange for strict nuclear limits." - most centrifuges sink away
  add({ id: 'S35', at: cut(28), transition: { type: 'dissolve', dur: 0.3 }, note: 'centrifuges reduced', draw(lt, d, t, blit) {
    CH.update(t, 1 - 0.7 * eio(seg(t, Wd('limits', 28) - 0.6, Wd('limits', 28) + 0.3))); cam.fov = 35;
    look(V3(0, 4.5, 6), V3(0, 4.2, 5.2), V3(0, 0.8, -3), lt, d, { ...LOOK, aperture: 0, bloom: 0.4, bloomThreshold: 0.6 }, CH.scene); blit(); } });
  cue(Wd('limits', 28) - 0.4, 'slide', { dur: 0.8, gain: 0.3 });
  // ===== L29 "Trump tore it up in 2018, calling it the worst deal ever." - tears the deal, 2018, stamp
  add({ id: 'S36', at: cut(29), transition: { type: 'flip', dur: 0.3 }, note: 'Trump tears up the deal', draw(lt, d, t, blit) {
    reset(); V.setColor('#7a2a32'); const tr = show(who.trump, 0, 0); const tt = Wd('tore', 29), k = eio(seg(t, tt, tt + 0.6));
    tr.pose({ armL: [1.1, 0.1 + 0.6 * k], armR: [1.1, 0.1 + 0.6 * k], elbowL: 0.9, elbowR: 0.9, brow: -0.6, mouth: -0.4, talk: talk(t, Wd('calling', 29), lineEnd(29)), blink: blink(t) });
    deal.group.visible = true; deal.group.position.set(0, 1.32, 0.42); deal.group.rotation.set(0, 0, 0); deal.tear(k);
    yearCard(year, '2018', seg(t, Wd('twenty', 29), Wd('twenty', 29) + 0.3) * (1 - seg(t, Wd('worst', 29) - 0.3, Wd('worst', 29) - 0.1)), V3(0, 2.05, 0.4));
    stampW.slam(seg(t, Wd('worst', 29), Wd('worst', 29) + 0.3)); stampW.group.position.set(0, 2.0, 0.5); fits.push([stampW.group, 1.2]);
    look(V3(0, 1.75, 2.7), V3(0, 1.7, 2.45), V3(0, 1.6, 0), lt, d); blit(); } });
  cue(Wd('tore', 29), 'zip', { gain: 0.45 }); cue(Wd('twenty', 29), 'slam', { gain: 0.35 }); cue(Wd('worst', 29), 'thud', { gain: 0.4 });
  // ===== L30 "In his second term, talks failed, sanctions returned," - empty table, chair shoved, stamp again
  add({ id: 'S37', at: cut(30), transition: { type: 'whip', dur: 0.3 }, note: 'talks fail: empty table; sanctions return', draw(lt, d, t, blit) {
    reset(); V.setColor('#3a3a44'); tbl.group.visible = true; tbl.chairs.forEach((c) => (c.visible = true)); const kf = eo(seg(t, Wd('failed', 30) - 0.1, Wd('failed', 30) + 0.4));
    tbl.chairs[0].position.z = -0.95 - 0.6 * kf; tbl.chairs[0].rotation.y = 0.5 * kf; tbl.chairs[1].position.z = 0.95; tbl.chairs[1].rotation.y = Math.PI;
    stampS.slam(seg(t, Wd('returned', 30) - 0.05, Wd('returned', 30) + 0.3)); stampS.group.position.set(0, 1.35, 0.4); fits.push([stampS.group, 1.2]);
    look(V3(1.6, 2.1, 2.6), V3(1.4, 2.0, 2.3), V3(0, 0.8, 0), lt, d); blit(); } });
  cue(Wd('failed', 30), 'slide', { dur: 0.4, gain: 0.35 }); cue(Wd('returned', 30), 'slam', { gain: 0.5 });
  // ===== L31 "and the US and Israel struck Iran directly." - globe strike arcs + flashes on nuclear sites
  add({ id: 'S38', at: cut(31), transition: { type: 'zoomblur', dur: 0.3 }, note: 'strike arcs, flashes on nuclear sites', draw(lt, d, t, blit) {
    reset(); G.setNight(0.8); G.highlight('IRN', 0.5, '#2ea84a'); G.highlight('ISR', 0.8, '#5fb0ff');
    arcUSs.set(eio(seg(t, Wd('US', 31) - 0.1, Wd('US', 31) + 0.6))); arcIL.set(eio(seg(t, Wd('Israel', 31) - 0.2, Wd('Israel', 31) + 0.5)));
    const ts = Wd('struck', 31); strikes.forEach((s, i) => { const k = t - ts - i * 0.12; s.material.opacity = k > 0 ? Math.exp(-k * 1.2) * (0.7 + 0.3 * Math.sin(t * 30 + i)) : 0; s.scale.setScalar(0.12 + 0.2 * Math.max(0, Math.min(1, k * 3))); });
    const k = eio(seg(lt, 0, d)); gcam(lerp(24, 30, k), lerp(42, 49, k), lerp(2.2, 1.7, k), 33, 49); E.render(GS, cam, { ...GLOOK, bloom: 0.6 }); blit(); } });
  cue(Wd('US', 31), 'whoosh', { gain: 0.35 }); cue(Wd('struck', 31), 'slam', { gain: 0.45 }); cue(Wd('struck', 31) + 0.3, 'rumble', { dur: 1.4, gain: 0.45 });
  // ===== L32 "70 years of oil, coups and revenge." - counter 1953 -> 2025, then 70 YEARS
  add({ id: 'S39', at: cut(32), transition: { type: 'flip', dur: 0.3 }, note: '1953 -> 2025, 70 YEARS', draw(lt, d, t, blit) {
    reset(); V.setColor('#1d2a3a'); const k = eio(seg(lt, 0, 1.2));
    num.at(0); num.set(lt < 1.3 ? String(Math.round(lerp(1953, 2025, k))) : '70 YEARS'); num.slam(lt < 1.3 ? seg(lt, 0, 0.2) : seg(lt, 1.3, 1.6)); num.group.position.set(0, 1.7, 0.3); fits.push([num.group, 1.2]);
    oilBarrels.group.visible = t > Wd('oil', 32); oilBarrels.group.position.set(-0.9, 0, -0.4); oilBarrels.group.scale.setScalar(0.3);
    fold.group.visible = t > Wd('coups', 32); fold.group.position.set(0, 0.5, 0); fold.group.rotation.set(0.9, 0, 0); fold.open(0);
    tankV.group.visible = t > Wd('revenge', 32); tankV.group.position.set(0.9, 0, -0.4); tankV.group.scale.setScalar(0.12); tankV.update(t, -0.6);
    look(V3(0, 1.5, 3.2), V3(0, 1.45, 3.0), V3(0, 1.1, 0), lt, d); tankV.group.scale.setScalar(0.16); blit(); } });
  cue(cut(32), 'tick', { dur: 1.2, gain: 0.3 }); cue(cut(32) + 1.3, 'slam', { gain: 0.4 }); ['oil', 'coups', 'revenge'].forEach((w) => cue(Wd(w, 32), 'pop', { gain: 0.3 }));
  // ===== L33 "And it's still not over." - the flags square off again, spark (mirrors frame 0)
  add({ id: 'S40', at: cut(33), transition: { type: 'dissolve', dur: 0.3 }, note: 'flags again, sparks', draw(lt, d, t, blit) {
    reset(); V.setColor('#4a8fc4'); flagsDuel(t, lt, d, 0.6); spark.visible = true; spark.position.set(0, 1.75, 0.1); spark.material.opacity = 0.7 + 0.3 * Math.sin(t * 40); spark.scale.setScalar(0.55);
    look(V3(0, 1.62, 3.6), V3(0, 1.62, 3.3), V3(0, 1.55, 0), lt, d); blit(); } });
  cue(cut(33), 'heartbeat_fast', { dur: 1.2, bpm: 120, gain: 0.4 });
  // ===== L34-35 CTA - night globe between the two countries, ending back on the flags (loop)
  add({ id: 'S41', at: cut(34), transition: { type: 'zoomblur', dur: 0.35 }, note: 'CTA: night globe, US <-> Iran', draw(lt, d, t, blit) {
    reset(); G.setNight(0.85); G.highlight('USA', 0.7, '#5fb0ff'); G.highlight('IRN', 0.7, '#2ea84a'); arcNY.set(1);
    const k = eio(seg(lt, 0, d)); gcam(lerp(40, 48, k), lerp(-10, 20, k), lerp(3.8, 3.4, k), 40, lerp(-10, 20, k)); E.render(GS, cam, GLOOK); blit(); } });
  add({ id: 'S42', at: TL.duration - 1.5, transition: { type: 'dissolve', dur: 0.5 }, note: 'loop back to the flags', draw(lt, d, t, blit) {
    reset(); V.setColor('#4a8fc4'); flagsDuel(t, 0, d, 0.35); look(V3(0, 1.6, 4.2), V3(0, 1.6, 4.2), V3(0, 1.55, 0), lt, d); blit(); } });
  cue(Wd('Things', 35), 'sparkle', { dur: 1, gain: 0.25 });
}
const ei3 = (k) => k * k * (3 - 2 * k);
