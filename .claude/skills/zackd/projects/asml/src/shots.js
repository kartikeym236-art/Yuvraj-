// "The Most Important Company In The AI Race" (ASML / EUV) - Things Explained reel on the user's own voiceover.
// Procedural props on the studio void, Earth globe with country highlights, the EUV source chamber macro. No brand logos.
import * as THREE from 'three';
import { add, cue, cut, Wd, V3, eio, eo, seg, pulse, lerp, lerpV, debugCam, lineStart, lineEnd, TL } from './core/timeline.js';
import * as SETS from './core/sets.js';
import * as P from './core/tech_props.js';
import { glowSprite } from './core/materials.js';
import { A } from './core/assets.js';

export const PRELOAD = {
  hdri: { studio: 'assets/hdri/studio_small_09_2k.hdr' },
  tex: { earthDay: 'assets/earth/earth_day_4096.jpg', earthLights: 'assets/earth/earth_lights_2048.png' },
};
const SKY = '#5BC4F0', SPACE = '#0A1428', NL = [52.25, 5.4], VELD = [51.42, 5.4], US = [39, -98], CN = [34, 104];

export async function buildShots(E) {
  const geo = await (await fetch('assets/earth/countries.geojson')).json();
  const V = SETS.studioVoid(A.env.studio, SKY), cam = E.camera(30);
  const LOOK = { aperture: 0.0012, bloom: 0.18, bloomThreshold: 0.85, ao: 0 };
  // --- props ------------------------------------------------------------------------------------------------------
  const PH = P.phone(), CH = P.chip(), GP = P.gpu();
  const BIG = new THREE.Group(); BIG.scale.setScalar(0.1); V.scene.add(BIG);          // 1:10 world for machine / bus / containers
  const M = P.euvMachine(); BIG.add(M.group);
  const BUS = P.bus(); BIG.add(BUS.group);
  const CONT = Array.from({ length: 40 }, (_, i) => { const c = P.container(['#c8432f', '#2f6fc8', '#e0a020', '#3a9a5a', '#8a8f98'][i % 5]); BIG.add(c); return c; });
  const PLANES = [P.cargoPlane(), P.cargoPlane()]; PLANES.forEach((p) => BIG.add(p.group));
  const FABS = ['#3ad1ff', '#5a7dff', '#38b6ff'].map((c) => { const f = P.fab(c); BIG.add(f.group); return f; });
  const beams = FABS.map(() => { const b = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 1, 8), new THREE.MeshBasicMaterial({ color: '#7fd8ff', transparent: true, opacity: 0, depthWrite: false })); V.scene.add(b); return b; });
  const WF = P.wafer(); V.scene.add(WF.group);
  [PH, CH, GP].forEach((p) => V.scene.add(p.group));
  const links = [0, 1, 2].map(() => { const l = new THREE.Mesh(new THREE.CylinderGeometry(0.0025, 0.0025, 1, 8), new THREE.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0, depthWrite: false })); V.scene.add(l); return l; });
  const hub = glowSprite('#ffffff', 0.25); V.scene.add(hub);
  const sparks = new THREE.Points(new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(Array.from({ length: 600 }, (_, i) => [((i * 0.618) % 1 - 0.5) * 1.6, ((i * 0.377) % 1) * 0.6, ((i * 0.733) % 1 - 0.5) * 0.6]).flat(), 3)),
    new THREE.PointsMaterial({ color: '#ffd27a', size: 0.012, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false })); V.scene.add(sparks);
  // globe world (own scene, dark space void)
  const GS = new THREE.Scene(); GS.background = new THREE.Color(SPACE);
  GS.add(new THREE.AmbientLight('#8fb0ff', 0.25)); const gsun = new THREE.DirectionalLight('#ffffff', 2.4); gsun.position.set(3, 2, 4); GS.add(gsun);
  const starsG = new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(Array.from({ length: 1500 }, (_, i) => { const t = i * 2.399, z = 1 - 2 * ((i + 0.5) / 1500), r = Math.sqrt(1 - z * z); return [Math.cos(t) * r * 40, z * 40, Math.sin(t) * r * 40]; }).flat(), 3));
  GS.add(new THREE.Points(starsG, new THREE.PointsMaterial({ color: '#ffffff', size: 0.06, transparent: true, opacity: 0.7 })));
  const G = P.globe(A, geo); GS.add(G.group);
  const pinNL = G.pin(VELD[0], VELD[1], '#ffb020');
  const arcUS = G.arc(US, NL, '#ff5a4a', 0.4), arcCN = G.arc(NL, CN, '#ff5a4a', 0.45);
  const wall = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.22, 0.16), new THREE.MeshPhysicalMaterial({ color: '#ff3030', emissive: '#ff2020', emissiveIntensity: 0.6, transparent: true, opacity: 0 }));
  GS.add(wall);
  const GLOOK = { aperture: 0, bloom: 0.35, bloomThreshold: 0.7, ao: 0, vignette: 0.45 };
  const gcam = (lat, lon, dist, latT = lat, lonT = lon) => { cam.fov = 40; cam.position.copy(G.toVec(lat, lon, dist)); cam.up.set(0, 1, 0); cam.lookAt(G.toVec(latT, lonT, 0.0)); };
  // chamber + hair macro
  const LC = P.laserChamber(E, A.env.studio);
  const HM = P.hairMacro(); const HS = new THREE.Scene(); HS.background = new THREE.Color('#0d1424'); HS.add(HM.group);
  HS.add(new THREE.HemisphereLight('#bcd8ff', '#0d1424', 1.2)); const hl = new THREE.DirectionalLight('#ffffff', 2); hl.position.set(10, 20, 10); HS.add(hl);
  const SUN = P.sun(); LC.scene.add(SUN.group); SUN.group.position.set(0.95, 1.55, 0.9);

  function reset() {
    V.setColor(SKY); [PH, CH, GP].forEach((p) => (p.group.visible = false)); PH.setScreen(1); CH.setGlow(0);
    BIG.visible = false; M.reset(); BUS.group.visible = false; CONT.forEach((c) => (c.visible = false)); PLANES.forEach((p) => (p.group.visible = false));
    FABS.forEach((f) => { f.group.visible = false; f.setLit(0); }); beams.forEach((b) => (b.material.opacity = 0)); WF.group.visible = false;
    links.forEach((l) => (l.material.opacity = 0)); hub.material.opacity = 0; sparks.material.opacity = 0;
    G.clear(); pinNL.set(0); arcUS.set(0); arcCN.set(0); wall.material.opacity = 0; wall.visible = false; G.setNight(0); arcUS.colorTo('#ff5a4a');
    cam.up.set(0, 1, 0); cam.fov = 30;
  }
  const look = (from, to, tgt, lt, d, L = LOOK, scene = V.scene) => { cam.position.copy(lerpV(from, to, eio(Math.min(1, lt / d)))); cam.lookAt(tgt); debugCam(cam);
    E.render(scene, cam, { ...L, focus: cam.position.distanceTo(tgt) }); };
  const UP = V3(0, 1, 0);
  const link = (l, a, b, k) => { const dir = b.clone().sub(a); l.quaternion.setFromUnitVectors(UP, dir.clone().normalize()); l.scale.set(1, Math.max(1e-4, dir.length() * k), 1); l.position.copy(a).addScaledVector(dir, k / 2); l.material.opacity = k > 0 ? 0.8 : 0; };
  const C0 = V3(0, 1.4, 0);
  const machineAt = () => { BIG.visible = true; BIG.position.set(0, 0, 0); M.group.position.set(0, 0, 0); M.group.rotation.y = 0; };

  // ===== L0-L2: everyday tech =====
  const phonePose = (t) => { PH.group.visible = true; PH.group.position.set(0, 1.4, 0); PH.group.rotation.set(0.12, -0.5 + t * 0.35, 0.08); };
  const CAMP0 = V3(0.05, 1.43, 0.42), CAMP1 = V3(0.02, 1.42, 0.36);
  add({ id: 'S01', at: 0, note: 'phone turning (frame 0 mid-action)', draw(lt, d, t, blit) { reset(); phonePose(t); look(CAMP0, CAMP1, C0, lt, d); blit(); } });
  add({ id: 'S02', at: cut(1), transition: { type: 'whip', dur: 0.3 }, note: 'AI chip lights up', draw(lt, d, t, blit) {
    reset(); CH.group.visible = true; CH.group.position.set(0, 1.38 + 0.03 * eo(seg(lt, 0, 0.6)), 0); CH.group.rotation.set(0.0, t * 0.3, 0); CH.setGlow(seg(lt, 0.15, 0.6));
    look(V3(0.12, 1.55, 0.2), V3(0.09, 1.52, 0.16), V3(0, 1.4, 0), lt, d); blit(); } });
  add({ id: 'S03', at: cut(2), transition: { type: 'whip', dur: 0.3 }, note: 'graphics card, fans spin', draw(lt, d, t, blit) {
    reset(); GP.group.visible = true; GP.group.position.set(0, 1.4, 0); GP.group.rotation.set(0.05, -0.35 + lt * 0.15, 0); GP.update(t);
    look(V3(0.12, 1.46, 0.42), V3(0.06, 1.44, 0.36), V3(0, 1.4, 0), lt, d); blit(); } });
  cue(0.0, 'whoosh_soft', { gain: 0.3, dur: 0.5 }); cue(cut(1), 'whoosh', { gain: 0.3 }); cue(Wd('chip', 1), 'molecule', { gain: 0.35 }); cue(cut(2), 'whoosh', { gain: 0.3 });
  // L3 "depends on one company you've probably never heard of."
  add({ id: 'S04', at: cut(3), transition: { type: 'zoomblur', dur: 0.35 }, note: 'three devices linked to one glowing point', draw(lt, d, t, blit) {
    reset(); const pts = [V3(-0.26, 1.48, 0), V3(0, 1.48, -0.05), V3(0.26, 1.48, 0)], H0 = V3(0, 1.2, 0.05);
    PH.group.visible = true; PH.group.position.copy(pts[0]); PH.group.rotation.set(0, 0.4 + t * 0.2, 0); PH.group.scale.setScalar(1);
    CH.group.visible = true; CH.group.position.copy(pts[1]); CH.group.rotation.set(0.9, t * 0.2, 0); CH.setGlow(1);
    GP.group.visible = true; GP.group.position.copy(pts[2]); GP.group.rotation.set(0, -0.4 - t * 0.1, 0); GP.group.scale.setScalar(0.7); GP.update(t);
    const k = eo(seg(t, Wd('depends', 3), Wd('one', 3) + 0.3)); links.forEach((l, i) => link(l, pts[i], H0, k));
    hub.position.copy(H0); hub.material.opacity = seg(t, Wd('one', 3), Wd('one', 3) + 0.4) * (0.75 + 0.25 * Math.sin(t * 6));
    look(V3(0, 1.42, 2.1), V3(0, 1.38, 1.85), V3(0, 1.36, 0), lt, d); GP.group.scale.setScalar(1); blit(); } });
  cue(Wd('depends', 3), 'zip', { gain: 0.3 }); cue(Wd('one', 3), 'sparkle', { dur: 0.8, gain: 0.3 });

  // ===== L4-L7: where it is (globe) =====
  add({ id: 'S05', at: cut(4), transition: { type: 'zoomblur', dur: 0.35 }, note: 'globe: USA lights, then dims', draw(lt, d, t, blit) {
    reset(); const k = seg(t, Wd('America', 4), Wd('America', 4) + 0.3), off = seg(t, lineEnd(4) - 0.05, lineEnd(4) + 0.25);
    G.highlight('USA', k * (1 - off), '#5fb0ff'); gcam(lerp(30, 38, eio(lt / d)), lerp(-110, -95, eio(lt / d)), 3.4); E.render(GS, cam, GLOOK); blit(); } });
  add({ id: 'S06', at: cut(5), transition: { type: 'whip', dur: 0.35, dir: 1 }, note: 'fly to the Netherlands, pin at Veldhoven', draw(lt, d, t, blit) {
    reset(); const fly = eio(seg(lt, 0, 1.4)), zin = eio(seg(t, Wd('Veldhoven', 5) - 0.6, lineEnd(5) + 0.3));
    G.highlight('NLD', seg(t, Wd('Dutch', 5), Wd('Dutch', 5) + 0.4), '#ffb020'); pinNL.set(eo(seg(t, Wd('Veldhoven', 5), Wd('Veldhoven', 5) + 0.4)));
    gcam(lerp(42, 51.5, fly), lerp(-40, 5.2, fly), lerp(3.2, 2.0, fly) - 0.75 * zin, VELD[0], VELD[1]); E.render(GS, cam, GLOOK); blit(); } });
  cue(cut(5), 'whoosh', { gain: 0.35 }); cue(Wd('Veldhoven', 5), 'pop', { gain: 0.4 });
  add({ id: 'S07', at: cut(6), transition: { type: 'zoomblur', dur: 0.35 }, note: 'pull back: one glowing pin on Earth', draw(lt, d, t, blit) {
    reset(); G.highlight('NLD', 1, '#ffb020'); pinNL.set(1); G.setNight(0.25 * eio(lt / d));
    gcam(lerp(48, 40, eio(lt / d)), lerp(5, 20, eio(lt / d)), lerp(1.6, 3.6, eo(Math.min(1, lt / d))), VELD[0], VELD[1]); E.render(GS, cam, GLOOK); blit(); } });
  cue(cut(6), 'whoosh_soft', { gain: 0.35, dur: 0.8 });
  add({ id: 'S08', at: cut(7), transition: { type: 'dissolve', dur: 0.4 }, note: 'machine silhouette lights up, chip floats above', draw(lt, d, t, blit) {
    reset(); machineAt(); const k = seg(lt, 0.1, 1.0); M.setGlow(k); V.setColor('#2c5d86'); V.key.intensity = 2.4 * (0.2 + 0.8 * k);
    CH.group.visible = true; CH.group.position.set(0.1, 0.62 + 0.03 * Math.sin(t * 2), 0.25); CH.group.rotation.set(0.6, t * 0.5, 0); CH.setGlow(seg(t, Wd('advanced', 7), Wd('advanced', 7) + 0.5));
    look(V3(1.2, 1.4, 4.6), V3(0.9, 1.2, 4.2), V3(0, 0.3, 0), lt, d); V.key.intensity = 2.4; blit(); } });
  cue(Wd('chips', 7), 'molecule', { gain: 0.35 });

  // ===== L8-L12: the machine =====
  add({ id: 'S09', at: cut(8), transition: { type: 'zoomblur', dur: 0.3 }, note: 'EUV machine hero orbit', draw(lt, d, t, blit) {
    reset(); machineAt(); M.setGlow(0.5 + 0.5 * Math.sin(t * 3));
    const a = lerp(0.9, 0.35, eio(lt / d)); const p = V3(Math.sin(a) * 4.4, 1.6, Math.cos(a) * 4.4); look(p, p, V3(0, 0.2, 0), 1, 1, { ...LOOK, ao: 0.6 }); blit(); } });
  cue(cut(8) + 0.1, 'shimmer', { dur: 1.2, gain: 0.3 });
  add({ id: 'S10', at: cut(9), transition: { type: 'whip', dur: 0.3 }, note: 'school bus drives in beside it', draw(lt, d, t, blit) {
    reset(); machineAt(); BUS.group.visible = true; BUS.group.position.set(lerp(-30, 0.5, eo(seg(lt, 0, 1.2))), 0, 4.4);
    look(V3(2.6, 2.3, 4.6), V3(2.3, 2.0, 4.2), V3(0, 0.2, 0.2), lt, d); blit(); } });
  cue(cut(9) + 0.05, 'slide', { dur: 1.1, gain: 0.35 });
  add({ id: 'S11', at: cut(10), transition: { type: 'dissolve', dur: 0.3 }, note: 'gold sheen, sparks', draw(lt, d, t, blit) {
    reset(); machineAt(); const k = seg(t, Wd('$200', 10), Wd('$200', 10) + 0.5); M.setGold(k); sparks.material.opacity = 0.9 * k; sparks.rotation.y = t * 0.2;
    const a = lerp(-0.5, -0.2, eio(lt / d)); look(V3(Math.sin(a) * 4.2, 1.2, Math.cos(a) * 4.2), V3(Math.sin(a) * 3.9, 1.1, Math.cos(a) * 3.9), V3(0, 0.25, 0), lt, d, { ...LOOK, bloom: 0.3 }); blit(); } });
  cue(Wd('$200', 10), 'sparkle', { dur: 1, gain: 0.35 });
  add({ id: 'S12', at: cut(11), transition: { type: 'flip', dur: 0.3 }, note: 'exploded view, 100,000 parts', draw(lt, d, t, blit) {
    reset(); machineAt(); M.explode(eio(seg(t, Wd('100,000', 11) - 0.2, lineEnd(11) + 0.3)));
    look(V3(2.4, 2.0, 4.6), V3(2.8, 2.6, 5.6), V3(0, 0.35, 0), lt, d); blit(); } });
  cue(Wd('100,000', 11) - 0.1, 'whoosh', { gain: 0.4 }); cue(Wd('100,000', 11) + 0.3, 'bubbles', { dur: 1.2, gain: 0.25 });
  add({ id: 'S13', at: cut(12), transition: { type: 'whip', dur: 0.3 }, note: '40 containers drop in, cargo planes fly over', draw(lt, d, t, blit) {
    reset(); BIG.visible = true; M.group.visible = false; const tc = cut(12) + 0.3;
    CONT.forEach((c, i) => { const r = Math.floor(i / 8), col = i % 8, at = tc + i * 0.035, k = eo(seg(t, at, at + 0.35)); c.visible = k > 0;
      c.position.set(-14 + r * 6.8 - 6, lerp(25, 1.3, k), -17 + col * 4.9); c.rotation.y = Math.PI / 2; });
    PLANES.forEach((p, i) => { const tp = Wd('cargo', 12) - 0.4 + i * 0.5, k = seg(t, tp, tp + 2.2); p.group.visible = k > 0 && k < 1;
      p.group.position.set(lerp(-80, 80, k), 22 + i * 6, -10 + i * 14); p.group.rotation.set(0, 0, 0.06); });
    look(V3(7.5, 6.5, 9.5), V3(6.8, 6.0, 8.8), V3(-0.6, 0.6, 0), lt, d); blit(); } });
  CONT.forEach((_, i) => { if (i % 8 === 0) cue(Wd('40', 12) + i * 0.035 + 0.3, 'thud', { gain: 0.3 }); });
  cue(Wd('cargo', 12) - 0.2, 'whoosh_soft', { dur: 1.5, gain: 0.4 });

  // ===== L13-L17: how it works =====
  add({ id: 'S14', at: cut(13), transition: { type: 'flip', dur: 0.3 }, note: 'push into the source module', draw(lt, d, t, blit) {
    reset(); machineAt(); M.setGlow(1); const k = ei3(seg(lt, 0.1, d)); const T = V3(-0.32, 0.18, 0.17);
    look(V3(-0.1, 0.8, 3.6), V3(-0.31, 0.2, 0.3), T, k * d, d); blit(); } });
  cue(cut(13) + 0.2, 'whoosh', { gain: 0.4 });
  add({ id: 'S15', at: cut(14), transition: { type: 'zoomblur', dur: 0.35 }, note: 'tin droplets, laser hits', draw(lt, d, t, blit) {
    LC.update(t, 0.15, 0); LC.cam.position.set(lerp(1.8, 1.3, eio(lt / d)), 0.2, lerp(4.5, 3.6, eio(lt / d))); LC.cam.lookAt(0, 0, 0); SUN.group.visible = false; E.render(LC.scene, LC.cam, LC.look); blit(); } });
  for (let tt = cut(14) + 0.3; tt < cut(15); tt += 0.95) cue(tt, 'tock', { gain: 0.25 });
  cue(Wd('laser', 14), 'zip', { gain: 0.35 });
  add({ id: 'S16', at: cut(15), transition: { type: 'zoomblur', dur: 0.25 }, note: '50,000 per second: strobing', draw(lt, d, t, blit) {
    LC.update(t, 0.95, 0.2); LC.cam.position.set(0.9, 0.1, lerp(2.8, 2.4, lt / d)); LC.cam.lookAt(0, 0, 0); SUN.group.visible = false; E.render(LC.scene, LC.cam, LC.look); blit(); } });
  cue(cut(15), 'sizzle', { dur: 2, gain: 0.35 }); cue(cut(15), 'tick', { dur: 2, gain: 0.2 });
  add({ id: 'S17', at: cut(16), transition: { type: 'dissolve', dur: 0.3 }, note: 'plasma flash vs the sun', draw(lt, d, t, blit) {
    LC.update(t, 0.35, 0.45 * eo(seg(lt, 0, 0.8))); SUN.group.visible = t > Wd('sun', 16) - 0.4; SUN.update(t); SUN.group.scale.setScalar(Math.max(1e-3, 0.32 * eo(seg(t, Wd('sun', 16) - 0.4, Wd('sun', 16)))));
    LC.cam.position.set(lerp(0.9, 1.1, eio(lt / d)), lerp(0.2, 0.5, eio(lt / d)), lerp(3.0, 3.9, eio(lt / d))); LC.cam.lookAt(0.45, 0.45, 0); E.render(LC.scene, LC.cam, { ...LC.look, exposure: 0.7, bloom: 0.55, bloomThreshold: 0.7 }); blit(); } });
  cue(cut(16), 'rumble', { dur: 2, gain: 0.45 });
  add({ id: 'S18', at: cut(17), transition: { type: 'whip', dur: 0.3 }, note: 'wafer: light writes circuits', draw(lt, d, t, blit) {
    reset(); V.setColor('#24476a'); WF.group.visible = true; WF.group.position.set(0, 1.3, 0); WF.group.rotation.set(0.25, t * 0.25, 0);
    WF.mat.iridescenceThicknessRange = [100, 400 + 600 * seg(lt, 0, d)];
    look(V3(0, 1.75, 0.95), V3(0.05, 1.62, 0.8), V3(0, 1.3, 0), lt, d, { ...LOOK, bloom: 0.25 }); blit(); } });
  add({ id: 'S19', at: Wd('thinner', 17) - 0.2, transition: { type: 'zoomblur', dur: 0.35 }, note: 'macro: human hair over circuit lines', draw(lt, d, t, blit) {
    cam.position.set(lerp(10, 7, eio(lt / d)), lerp(34, 26, eio(lt / d)), lerp(16, 12, eio(lt / d))); cam.lookAt(0, 0, 0);
    E.render(HS, cam, { ...LOOK, aperture: 0, bloom: 0.3 }); blit(); } });
  cue(Wd('carves', 17), 'sizzle', { dur: 1, gain: 0.25 }); cue(Wd('thinner', 17) - 0.2, 'whoosh_soft', { gain: 0.3, dur: 0.6 });

  // ===== L18-L19: who depends on it =====
  add({ id: 'S20', at: cut(18), transition: { type: 'whip', dur: 0.3 }, note: 'three fabs light up on their names, beams to the machine', draw(lt, d, t, blit) {
    reset(); BIG.visible = true; M.group.position.set(0, 0, -6); M.group.scale.setScalar(0.8); M.setGlow(1);
    const names = [Wd('TSMC', 18), Wd('Samsung', 18), Wd('Intel', 18)];
    FABS.forEach((f, i) => { f.group.visible = true; f.group.position.set(-6.5 + i * 6.5, 0, 6); f.setLit(seg(t, names[i], names[i] + 0.3));
      const a = V3(-0.65 + i * 0.65, 0.25, 0.6), b = V3(0, 0.25, -0.5); link(beams[i], a, b, seg(t, Wd('depend', 18), Wd('depend', 18) + 0.5)); });
    look(V3(0, 2.6, 5.6), V3(0, 2.3, 5.1), V3(0, 0.2, 0), lt, d); M.group.scale.setScalar(1); blit(); } });
  [0, 1, 2].forEach((i) => cue(Wd(['TSMC', 'Samsung', 'Intel'][i], 18), 'pop', { gain: 0.35 }));
  add({ id: 'S21', at: cut(19), transition: { type: 'dissolve', dur: 0.3 }, note: 'without it: the AI chip goes dark', draw(lt, d, t, blit) {
    reset(); const off = seg(t, Wd('no', 19), Wd('no', 19) + 0.4); CH.group.visible = true; CH.group.position.set(0, 1.4, 0); CH.group.rotation.set(0.15, t * 0.3, 0);
    CH.setGlow(1 - off); V.setColor('#' + new THREE.Color(SKY).lerp(new THREE.Color('#1a2638'), off).getHexString());
    look(V3(0.1, 1.55, 0.24), V3(0.07, 1.5, 0.18), V3(0, 1.4, 0), lt, d); blit(); } });
  cue(Wd('no', 19), 'thud', { gain: 0.4 });

  // ===== L20-L22: geopolitics =====
  add({ id: 'S22', at: cut(20), transition: { type: 'flip', dur: 0.3 }, note: 'globe turns red-tinted, night side', draw(lt, d, t, blit) {
    reset(); G.setNight(0.6); G.highlight('USA', 0.6, '#5fb0ff'); G.highlight('NLD', 0.8, '#ffb020'); G.highlight('CHN', 0.6, '#ff4a4a');
    gcam(lerp(30, 40, eio(lt / d)), lerp(-60, -20, eio(lt / d)), 3.9, 40, 0); E.render(GS, cam, { ...GLOOK, warm: 0.3 }); blit(); } });
  cue(cut(20), 'alarm', { dur: 1.5, gain: 0.25 });
  add({ id: 'S23', at: cut(21), transition: { type: 'whip', dur: 0.3 }, note: 'US pushes NL; arc to China blocked', draw(lt, d, t, blit) {
    reset(); G.setNight(0.4); G.highlight('USA', 0.7, '#5fb0ff'); G.highlight('NLD', 0.9, '#ffb020'); G.highlight('CHN', 0.7, '#ff4a4a'); pinNL.set(1);
    arcUS.colorTo('#5fb0ff'); arcUS.set(eio(seg(t, Wd('pushed', 21) - 0.2, Wd('pushed', 21) + 0.6)));
    const kb = seg(t, Wd('block', 21), Wd('block', 21) + 0.3); arcCN.set(Math.min(0.55, 0.55 * eio(seg(t, Wd('sales', 21) - 0.2, Wd('sales', 21) + 0.6))));
    const wp = G.toVec(44, 55, 1.28); wall.visible = kb > 0; wall.material.opacity = kb; wall.position.copy(wp); wall.lookAt(0, 0, 0);
    const k = eio(seg(lt, 0, d)); gcam(lerp(48, 42, k), lerp(-35, 60, k), lerp(3.4, 3.1, k), 42, lerp(-30, 60, k)); E.render(GS, cam, GLOOK); blit(); } });
  cue(Wd('pushed', 21), 'whoosh', { gain: 0.35 }); cue(Wd('block', 21), 'slam', { gain: 0.45 });
  add({ id: 'S24', at: cut(22), transition: { type: 'dissolve', dur: 0.35 }, note: 'China: ghost machine flickers, never completes', draw(lt, d, t, blit) {
    reset(); V.setColor('#3a1d24'); machineAt(); const k = seg(lt, 0.2, d * 0.7);
    M.ghost(1, Math.max(0, Math.sin(t * 23)) * seg(t, Wd('can', 22), Wd('can', 22) + 0.2)); M.explode(0.25 * (1 - k) + 0.12 * Math.sin(t * 3) ** 2);
    look(V3(-3.2, 1.6, 3.2), V3(-2.9, 1.4, 2.9), V3(0, 0.25, 0), lt, d, { ...LOOK, bloom: 0.4, bloomThreshold: 0.6 }); blit(); } });
  cue(Wd('can', 22), 'boing', { gain: 0.2 }); cue(cut(22), 'rumble', { dur: 1.6, gain: 0.3 });

  // ===== L23-L26: payoff + CTA =====
  add({ id: 'S25', at: cut(23), transition: { type: 'flip', dur: 0.3 }, note: 'line-up dims one by one on NVIDIA / Apple / OpenAI', draw(lt, d, t, blit) {
    reset(); const pts = [V3(-0.24, 1.42, 0), V3(0, 1.42, 0), V3(0.24, 1.42, 0)];
    GP.group.visible = true; GP.group.position.copy(pts[0]); GP.group.rotation.set(0, 0.5, 0); GP.group.scale.setScalar(0.65); GP.update(t);
    PH.group.visible = true; PH.group.position.copy(pts[1]); PH.group.rotation.set(0, -0.2 + 0.1 * Math.sin(t), 0); PH.setScreen(1 - 0.85 * seg(t, Wd('Apple', 23), Wd('Apple', 23) + 0.3));
    CH.group.visible = true; CH.group.position.copy(pts[2]); CH.group.rotation.set(1.1, t * 0.2, 0); CH.setGlow(1 - seg(t, Wd('OpenAI', 23), Wd('OpenAI', 23) + 0.3));
    look(V3(0, 1.46, 2.0), V3(0, 1.44, 1.8), V3(0, 1.42, 0), lt, d); GP.group.scale.setScalar(1); blit(); } });
  add({ id: 'S26', at: cut(24), transition: { type: 'zoomblur', dur: 0.35 }, note: 'machine -> wafer -> chip', draw(lt, d, t, blit) {
    reset(); machineAt(); BIG.position.set(-0.45, 0, -0.6); M.setGlow(1);
    const kw = eo(seg(t, Wd('machines', 24), Wd('machines', 24) + 0.6)), kc = eo(seg(t, Wd('chips', 24) - 0.2, Wd('chips', 24) + 0.4));
    WF.group.visible = kw > 0; WF.group.position.set(lerp(-0.4, 0.3, kw), 0.75, 0.4); WF.group.rotation.set(0.5, t * 0.4, 0); WF.group.scale.setScalar(2);
    CH.group.visible = kc > 0; CH.group.position.set(lerp(0.3, 0.85, kc), 0.8, 0.45); CH.group.scale.setScalar(4); CH.group.rotation.set(0.7, t * 0.5, 0); CH.setGlow(kc);
    look(V3(0.3, 1.5, 4.6), V3(0.4, 1.4, 4.2), V3(0.05, 0.4, 0), lt, d); CH.group.scale.setScalar(1); blit(); } });
  cue(Wd('machines', 24), 'whoosh_soft', { gain: 0.3 }); cue(Wd('chips', 24), 'molecule', { gain: 0.35 });
  add({ id: 'S27', at: cut(25), transition: { type: 'dissolve', dur: 0.4 }, note: 'CTA: night globe, NL pin glowing', draw(lt, d, t, blit) {
    reset(); G.setNight(0.85); G.highlight('NLD', 1, '#ffb020'); pinNL.set(1);
    gcam(lerp(35, 45, eio(lt / d)), lerp(-10, 15, eio(lt / d)), 3.0, 48, 5); E.render(GS, cam, GLOOK); blit(); } });
  add({ id: 'S28', at: Wd('Things', 26) - 0.6, transition: { type: 'dissolve', dur: 0.45 }, note: 'loop back to the phone (frame 0 framing)', draw(lt, d, t, blit) {
    reset(); phonePose(t - TL.duration); look(V3(0.12, 1.47, 0.62), CAMP0, C0, lt, d); blit(); } });
  cue(Wd('Things', 26), 'sparkle', { dur: 1, gain: 0.25 });
}
const ei3 = (k) => k * k * (3 - 2 * k);
