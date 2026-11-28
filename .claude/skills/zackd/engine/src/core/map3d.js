// Extruded 3D country map on a dark grid floor (the "Professor of How" geopolitics look): orange land with a thick white
// coastline rim, the country in focus in another colour and raised, bobbing red 3D arrows, bold red labels with a white
// outline, dashed curved routes that draw on, round portrait/flag pins, and dioramas standing on the map.
//
//   const geo = await (await fetch('assets/earth/map_countries_50m.geojson')).json();   // 10m for close-ups of small countries
//   const M = mapKit(geo, { center: [23.7, 90.4], span: 22, k: 0.12,
//                           colors: { IND: '#ec8a2c', BGD: '#3d6b35' }, rest: '#d9d3c7' });
//   scene.add(M.group);  M.raise('BGD', 0.06)  M.xyz(lat, lon) -> Vector3 on the land top
//   const a = M.arrow(lat, lon);  a.update(t)          bobbing red arrow pointing at a spot
//   const L = M.label('BANGLADESH', lat, lon, { size: 0.35 });  L.show(k)
//   const r = M.route([lat,lon], [lat,lon], { color: '#ffd23a' });  r.draw(k)     dashed arc drawing on (k 0..1)
//   const p = M.pin(texture, lat, lon);  p.show(k, cam)  round portrait / flag badge on a stick, faces the camera
//   M.place(object3d, lat, lon)                          stand a diorama / figure on the land
// Units: k world units per degree of longitude at the map centre. Feature codes: ADM0_A3 (IND, BGD, IRN, USA, ...).
import * as THREE from 'three';
import { LineSegments2 } from 'three/addons/lines/LineSegments2.js';
import { LineSegmentsGeometry } from 'three/addons/lines/LineSegmentsGeometry.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import { bigText } from './fx.js';

const code = (f) => (f.properties.adm0_a3 || f.properties.ADM0_A3 || f.properties.iso_a3 || '').toUpperCase();

export function mapKit(geo, { center = [0, 0], span = 30, k = 0.1, h = 0.05, colors = {}, rest = '#a29b90', side = 0.55,
  rim = '#ffffff', rimW = 3.2, floor = '#17181b', grid = true, only = null } = {}) {
  const [lat0, lon0] = center, cx = Math.cos((lat0 * Math.PI) / 180);
  const P = (lat, lon) => new THREE.Vector2((lon - lon0) * cx * k, -(lat - lat0) * k);
  const group = new THREE.Group(), land = new THREE.Group(); group.add(land);
  const C = {}; const lift = {};
  const rimMat = new LineMaterial({ color: rim, linewidth: rimW, resolution: new THREE.Vector2(1080, 1920), worldUnits: false });
  rimMat.transparent = true; rimMat.depthWrite = false;   // one draw per country, and kept out of the AO / DOF passes (they were 40 s a frame)
  for (const f of geo.features) {
    const c = code(f); if (only && !only.includes(c)) continue;
    const polys = f.geometry.coordinates; let hit = false;
    for (const poly of polys) for (const [x, y] of poly[0]) if (Math.abs(y - lat0) < span && Math.abs(((x - lon0 + 540) % 360) - 180) < span / cx) { hit = true; break; }
    if (!hit) continue;
    const col = new THREE.Color(colors[c] || rest);
    const top = new THREE.MeshStandardMaterial({ color: col, roughness: 0.75, metalness: 0 });
    const wall = new THREE.MeshStandardMaterial({ color: col.clone().multiplyScalar(side), roughness: 0.85 });
    const g = new THREE.Group(); g.name = c; land.add(g); const seg = [];
    for (const poly of polys) {
      const outer = poly[0].map(([x, y]) => P(y, x)); if (outer.length < 4) continue;
      const sh = new THREE.Shape(outer); poly.slice(1).forEach((r) => sh.holes.push(new THREE.Path(r.map(([x, y]) => P(y, x)))));
      const eg = new THREE.ExtrudeGeometry(sh, { depth: h, bevelEnabled: false, curveSegments: 1 });
      eg.rotateX(Math.PI / 2); eg.translate(0, h, 0);                    // shape xy -> map xz, extrude downward from y = h
      const m = new THREE.Mesh(eg, [top, wall]); m.castShadow = true; m.receiveShadow = true; g.add(m);
      for (let i = 0; i < outer.length - 1; i++) seg.push(outer[i].x, h + 0.002, outer[i].y, outer[i + 1].x, h + 0.002, outer[i + 1].y);
    }
    if (seg.length) { const lg = new LineSegmentsGeometry(); lg.setPositions(seg); const ln = new LineSegments2(lg, rimMat); ln.renderOrder = 5; g.add(ln); }
    C[c] = { group: g, top, wall, color: col.clone() }; lift[c] = 0;
  }
  // floor: dark, slightly glossy, with a faint grid and brighter axis lines (as in the reference)
  const S = 2048, cv = document.createElement('canvas'); cv.width = cv.height = S; const x = cv.getContext('2d');
  x.fillStyle = floor; x.fillRect(0, 0, S, S);
  if (grid) { for (let i = 0; i <= 16; i++) { const p = (i / 16) * S; x.strokeStyle = i % 4 === 0 ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.08)'; x.lineWidth = i % 4 === 0 ? 5 : 3;
    x.beginPath(); x.moveTo(p, 0); x.lineTo(p, S); x.moveTo(0, p); x.lineTo(S, p); x.stroke(); } }
  const ft = new THREE.CanvasTexture(cv); ft.colorSpace = THREE.SRGBColorSpace; ft.wrapS = ft.wrapT = THREE.RepeatWrapping; ft.repeat.set(4, 4); ft.anisotropy = 8;
  const fl = new THREE.Mesh(new THREE.PlaneGeometry(span * k * 8, span * k * 8), new THREE.MeshStandardMaterial({ map: ft, roughness: 0.55, metalness: 0.1 }));
  fl.rotation.x = -Math.PI / 2; fl.position.y = -0.001; fl.receiveShadow = true; group.add(fl);

  const xyz = (lat, lon, up = 0) => { const p = P(lat, lon); return new THREE.Vector3(p.x, h + up, p.y); };
  const M = {
    group, land, countries: C, xyz, k, h,
    /** lift a country (world units) - the "this one" emphasis */
    raise(c, y = 0.05) { if (C[c]) C[c].group.position.y = y; return M; },
    /** recolour / dim: color(c, '#3d6b35') ; dim(k) darkens everything except the listed codes */
    color(c, col) { if (C[c]) { C[c].top.color.set(col); C[c].wall.color.set(col).multiplyScalar(side); } return M; },
    dim(amount, keep = []) { for (const [c, o] of Object.entries(C)) { const f = keep.includes(c) ? 1 : 1 - amount; o.top.color.copy(o.color).multiplyScalar(f); o.wall.color.copy(o.color).multiplyScalar(f * side); } return M; },
    place(obj, lat, lon, up = 0) { obj.position.copy(xyz(lat, lon, up)); return obj; },
    arrow(lat, lon, { color = '#e3262d', size = 0.45, tilt = 0.55 } = {}) {
      const s = new THREE.Shape([[-0.18, 0], [0.18, 0], [0.18, 0.55], [0.4, 0.55], [0, 1], [-0.4, 0.55], [-0.18, 0.55]].map(([a, b]) => new THREE.Vector2(a, b)));
      const g2 = new THREE.ExtrudeGeometry(s, { depth: 0.14, bevelEnabled: true, bevelSize: 0.03, bevelThickness: 0.03, bevelSegments: 2 }); g2.translate(0, 0, -0.07); g2.rotateZ(Math.PI); g2.scale(size, size, size);
      const am = new THREE.Mesh(g2, new THREE.MeshStandardMaterial({ color, roughness: 0.7, metalness: 0, emissive: '#7a0a0e', emissiveIntensity: 0.9 })); am.castShadow = true;
      const pivot = new THREE.Group(); pivot.add(am); group.add(pivot); const base = xyz(lat, lon);
      const up = new THREE.Vector3();
      const A2 = { group: pivot, update(t, show = 1, cam = null) { pivot.visible = show > 0.01;
        // billboard toward the camera; the tip touches the spot and the arrow bobs along the screen's up axis
        if (cam) { pivot.quaternion.copy(cam.quaternion); up.set(0, 1, 0).applyQuaternion(cam.quaternion); } else { pivot.rotation.set(0, 0, 0); up.set(0, 1, 0); }
        am.rotation.set(0, 0, tilt); const tip = new THREE.Vector3(0, -size, 0).applyEuler(am.rotation);
        pivot.position.copy(base).addScaledVector(up, 0.04 + Math.abs(Math.sin(t * 4.2)) * size * 0.25).sub(tip.applyQuaternion(pivot.quaternion));
        pivot.scale.setScalar(Math.max(0.001, show)); } };
      A2.update(0); return A2;
    },
    label(text, lat, lon, { color = '#e3262d', size = 0.2, up = 0.02, flat = 0.95, yaw = 0, outline = '#ffffff' } = {}) {
      const T = bigText(text, { height: size, color, stroke: outline, strokeW: 26, depth: 5, depthColor: '#7a0d10' });
      const piv = new THREE.Group(); piv.add(T.group); T.group.rotation.x = -flat; piv.rotation.y = yaw; piv.position.copy(xyz(lat, lon, up)); group.add(piv);
      return { group: piv, text: T, show(k) { T.slam(k); } };
    },
    route(a, b, { color = '#ffd23a', lift: arcH = 0.6, dashes = 36, r = 0.012 } = {}) {
      const p0 = xyz(...a, 0.02), p1 = xyz(...b, 0.02), mid = p0.clone().lerp(p1, 0.5); mid.y += arcH * p0.distanceTo(p1) * 0.35 + 0.05;
      const curve = new THREE.QuadraticBezierCurve3(p0, mid, p1), g2 = new THREE.Group(); group.add(g2);
      const mat = new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.5, roughness: 0.4 });
      const ds = [];
      for (let i = 0; i < dashes; i++) { const u0 = i / dashes, u1 = (i + 0.55) / dashes; const sub = new THREE.CatmullRomCurve3([curve.getPoint(u0), curve.getPoint((u0 + u1) / 2), curve.getPoint(u1)]);
        const m = new THREE.Mesh(new THREE.TubeGeometry(sub, 4, r, 6), mat); g2.add(m); ds.push(m); }
      const head = new THREE.Mesh(new THREE.SphereGeometry(r * 2.4, 16, 12), mat); g2.add(head);
      return { group: g2, curve, draw(kk) { const n = Math.floor(kk * dashes + 1e-6); ds.forEach((m, i) => (m.visible = i < n)); head.visible = kk > 0 && kk < 1; head.position.copy(curve.getPoint(Math.min(1, kk))); },
        at: (u) => curve.getPoint(u) };
    },
    pin(tex, lat, lon, { size = 0.32, ring = '#e3262d', stick = 0.35 } = {}) {
      const g2 = new THREE.Group(); group.add(g2); g2.position.copy(xyz(lat, lon));
      const st = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, stick, 8), new THREE.MeshStandardMaterial({ color: '#dddddd' })); st.position.y = stick / 2; g2.add(st);
      const face = new THREE.Group(); face.position.y = stick + size / 2; g2.add(face);
      const disc = new THREE.Mesh(new THREE.CircleGeometry(size / 2, 64), new THREE.MeshBasicMaterial({ map: tex, toneMapped: false })); disc.position.z = 0.004; face.add(disc);
      const rr = new THREE.Mesh(new THREE.CircleGeometry(size / 2 + 0.03, 64), new THREE.MeshBasicMaterial({ color: '#ffffff' })); face.add(rr);
      const r2 = new THREE.Mesh(new THREE.RingGeometry(size / 2 + 0.03, size / 2 + 0.05, 64), new THREE.MeshBasicMaterial({ color: ring })); r2.position.z = 0.002; face.add(r2);
      return { group: g2, show(kk, cam) { g2.visible = kk > 0.01; g2.scale.setScalar(Math.max(0.001, kk < 0.7 ? (kk / 0.7) * 1.12 : 1.12 - 0.12 * ((kk - 0.7) / 0.3)));
        if (cam) { const q = new THREE.Quaternion(); cam.getWorldQuaternion(q); const pq = new THREE.Quaternion(); g2.getWorldQuaternion(pq); face.quaternion.copy(pq.invert().multiply(q)); } } };
    },
  };
  return M;
}

/** circular image texture from any image url (portrait / flag), centre-cropped */
export async function roundTex(url, { size = 512, bg = '#ffffff' } = {}) {
  const img = new Image(); img.src = url; await img.decode();
  const cv = document.createElement('canvas'); cv.width = cv.height = size; const x = cv.getContext('2d');
  x.fillStyle = bg; x.fillRect(0, 0, size, size);
  const s = Math.min(img.width, img.height); x.drawImage(img, (img.width - s) / 2, (img.height - s) / 2, s, s, 0, 0, size, size);
  const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; return t;
}
