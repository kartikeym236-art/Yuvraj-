// Storytelling devices from the reference films (STYLE_REFS.md): they explain without words on screen.
//   thoughtBubble(E)      cloud bubble above a head that shows ANOTHER scene live (memory / imagined option)
//   measure(len, text)    white dimension bracket with a label ("3 in") beside an object - sizes, comparisons
//   labelCan(text)        metal tin with a printed paper label ("BASIC" / "SPECIAL") - name the thing physically
//   whiteboard(w, h)      board whose doodle draws itself stroke by stroke (red marker), for a plan / idea
//   nameTag(text)         small banner with a name over a person (first appearance of a real person)
import * as THREE from 'three';

function canvasTex(w, h, fn) { const c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d'); fn(x, w, h);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return { t, c, x }; }

/** bubble.capture(scene, cam) renders the inner scene (call each frame BEFORE E.render); bubble.show(k) pops it in; place
 *  bubble.group above the head and face it to the camera with bubble.face(cam) */
export function thoughtBubble(E, { w = 0.62, res = 512 } = {}) {
  const rt = new THREE.WebGLRenderTarget(res, Math.round(res * 0.72), { samples: 4 }); rt.texture.colorSpace = THREE.SRGBColorSpace;
  const group = new THREE.Group(), inner = new THREE.Group(); group.add(inner);
  // cloud outline: overlapping white circles drawn into an alpha texture (soft shadow underneath)
  const { t: cloudT } = canvasTex(1024, 760, (x, W, H) => {
    const puffs = []; for (let i = 0; i < 14; i++) { const a = (i / 14) * Math.PI * 2; puffs.push([W / 2 + Math.cos(a) * W * 0.4, H / 2 + Math.sin(a) * H * 0.36, W * (0.1 + 0.025 * ((i * 7) % 3))]); }
    x.shadowColor = 'rgba(0,0,0,0.35)'; x.shadowBlur = 30; x.fillStyle = '#ffffff';
    puffs.forEach(([a, b, r]) => { x.beginPath(); x.arc(a, b, r, 0, 7); x.fill(); }); x.beginPath(); x.ellipse(W / 2, H / 2, W * 0.4, H * 0.36, 0, 0, 7); x.fill(); });
  const cloud = new THREE.Mesh(new THREE.PlaneGeometry(w * 1.25, w * 1.25 * 0.742), new THREE.MeshBasicMaterial({ map: cloudT, transparent: true, depthWrite: false, toneMapped: false }));
  const pic = new THREE.Mesh(new THREE.CircleGeometry(0.5, 64), new THREE.MeshBasicMaterial({ map: rt.texture, toneMapped: false })); pic.scale.set(w * 0.82, w * 0.56, 1); pic.position.z = 0.003;
  inner.add(cloud, pic);
  const dots = [0.06, 0.04, 0.025].map((r, i) => { const d = new THREE.Mesh(new THREE.CircleGeometry(r, 32), new THREE.MeshBasicMaterial({ color: '#fff', toneMapped: false })); d.position.set(-w * 0.18 + i * 0.03, -w * 0.42 - i * 0.07, 0); inner.add(d); return d; });
  return { group, rt,
    capture(scene, cam) { const r = E.renderer, prev = r.getRenderTarget(); const asp = cam.aspect; cam.aspect = rt.width / rt.height; cam.updateProjectionMatrix();
      r.setRenderTarget(rt); r.clear(); r.render(scene, cam); r.setRenderTarget(prev); cam.aspect = asp; cam.updateProjectionMatrix(); },
    show(k) { group.visible = k > 0.01; const s = k < 0.7 ? (k / 0.7) * 1.08 : 1.08 - 0.08 * ((k - 0.7) / 0.3); inner.scale.setScalar(Math.max(0.001, s)); dots.forEach((d, i) => (d.visible = k > 0.15 * (3 - i))); },
    face(cam) { group.quaternion.copy(cam.quaternion); } };
}

export function measure(len = 0.2, text = '3 in', { vertical = false, color = '#ffffff', tick = 0.025, lw = 0.006 } = {}) {
  const g = new THREE.Group(), m = new THREE.MeshBasicMaterial({ color, toneMapped: false });
  const bar = (w, h, x, y) => { const b = new THREE.Mesh(new THREE.PlaneGeometry(w, h), m); b.position.set(x, y, 0); g.add(b); return b; };
  const L = vertical ? [bar(lw, len, 0, 0), bar(tick * 2, lw, 0, len / 2), bar(tick * 2, lw, 0, -len / 2)] : [bar(len, lw, 0, 0), bar(lw, tick * 2, len / 2, 0), bar(lw, tick * 2, -len / 2, 0)];
  const { t } = canvasTex(512, 192, (x, W, H) => { x.font = '800 120px Inter, sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.shadowColor = 'rgba(0,0,0,.5)'; x.shadowBlur = 12; x.fillStyle = color; x.fillText(text, W / 2, H / 2); });
  const lab = new THREE.Mesh(new THREE.PlaneGeometry(len * 0.0 + 0.16, 0.06), new THREE.MeshBasicMaterial({ map: t, transparent: true, depthWrite: false, toneMapped: false }));
  if (vertical) lab.position.set(-0.1, 0, 0); else lab.position.set(0, 0.05, 0); g.add(lab);
  return { group: g, show(k) { g.visible = k > 0.01; const s = Math.max(0.001, k); L.forEach((b) => (vertical ? b.scale.set(1, b === L[0] ? s : 1, 1) : b.scale.set(b === L[0] ? s : 1, 1, 1))); lab.material.opacity = Math.min(1, k * 2 - 0.6); } };
}

export function labelCan(text = 'BASIC', { r = 0.09, h = 0.16, metal = '#b9bec4', paper = '#ffffff', ink = '#1b1b1b' } = {}) {
  const g = new THREE.Group();
  const { t } = canvasTex(1024, 256, (x, W, H) => { x.fillStyle = paper; x.fillRect(0, 0, W, H); x.fillStyle = ink; x.font = '800 150px Inter, sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, W * 0.25, H / 2 + 6); });
  t.wrapS = THREE.RepeatWrapping; t.offset.x = 0.0;
  const met = new THREE.MeshPhysicalMaterial({ color: metal, metalness: 1, roughness: 0.28, clearcoat: 0.4 });
  const body = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, 64, 1, true), met); body.castShadow = true; g.add(body);
  const lab = new THREE.Mesh(new THREE.CylinderGeometry(r * 1.004, r * 1.004, h * 0.42, 64, 1, true), new THREE.MeshStandardMaterial({ map: t, roughness: 0.7 })); g.add(lab);
  const lid = new THREE.Mesh(new THREE.CylinderGeometry(r * 1.02, r * 1.02, h * 0.06, 64), met); lid.position.y = h / 2; lid.castShadow = true; g.add(lid);
  const bot = new THREE.Mesh(new THREE.CircleGeometry(r, 48), met); bot.rotation.x = Math.PI / 2; bot.position.y = -h / 2; g.add(bot);
  g.children.forEach((c) => (c.position.y += h / 2));
  return { group: g, lid, open(k) { lid.position.set(k * r * 0.6, h + k * 0.06, 0); lid.rotation.z = -k * 0.5; } };
}

/** strokes: array of polylines in 0..1 board coords ([[x,y],...]); text items: {text, x, y, size}; draw(k) reveals in order */
export function whiteboard(w = 1.6, h = 1.0, { strokes = [], texts = [], ink = '#e4483b' } = {}) {
  const g = new THREE.Group(), R = 1024, RH = Math.round((R * h) / w);
  const { t, x } = canvasTex(R, RH, () => {});
  const board = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshStandardMaterial({ map: t, roughness: 0.25, metalness: 0 })); g.add(board);
  const frameM = new THREE.MeshStandardMaterial({ color: '#c8ccd2', metalness: 0.7, roughness: 0.35 });
  [[w + 0.04, 0.03, 0, h / 2], [w + 0.04, 0.03, 0, -h / 2], [0.03, h, w / 2, 0], [0.03, h, -w / 2, 0]].forEach(([a, b, px, py]) => { const f = new THREE.Mesh(new THREE.BoxGeometry(a, b, 0.03), frameM); f.position.set(px, py, 0); g.add(f); });
  const total = strokes.length + texts.length; let last = -1;
  return { group: g, draw(k) {
    const q = Math.round(k * 400); if (q === last) return; last = q;
    x.fillStyle = '#fbfbf8'; x.fillRect(0, 0, R, RH); x.strokeStyle = ink; x.fillStyle = ink; x.lineWidth = 7; x.lineCap = x.lineJoin = 'round';
    const n = k * total;
    strokes.forEach((s, i) => { const u = Math.min(1, Math.max(0, n - i)); if (u <= 0) return; const m = Math.max(2, Math.ceil(s.length * u)); x.beginPath(); s.slice(0, m).forEach(([a, b], j) => (j ? x.lineTo(a * R, b * RH) : x.moveTo(a * R, b * RH))); x.stroke(); });
    texts.forEach((s, i) => { const u = n - strokes.length - i; if (u <= 0) return; x.globalAlpha = Math.min(1, u * 2); x.font = `italic 700 ${s.size || 60}px Inter, sans-serif`; x.textAlign = 'center'; x.fillText(s.text, s.x * R, s.y * RH); x.globalAlpha = 1; });
    t.needsUpdate = true; } };
}

export function nameTag(text, { color = '#e3262d', w = 0.7 } = {}) {
  const { t } = canvasTex(1024, 220, (x, W, H) => { x.fillStyle = color; x.beginPath(); x.roundRect(20, 30, W - 40, H - 60, 24); x.fill(); x.fillStyle = '#fff'; x.font = '800 96px Inter, sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, W / 2, H / 2 + 4); });
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, (w * 220) / 1024), new THREE.MeshBasicMaterial({ map: t, transparent: true, depthWrite: false, toneMapped: false }));
  const g = new THREE.Group(); g.add(m);
  return { group: g, show(k, cam) { g.visible = k > 0.01; g.scale.setScalar(Math.max(0.001, k < 0.7 ? (k / 0.7) * 1.1 : 1.1 - 0.1 * ((k - 0.7) / 0.3))); if (cam) g.quaternion.copy(cam.quaternion); } };
}

/** plain ceramic mug (lathe) with optional liquid; height ~0.1 m, handle on +x */
export function mug({ color = '#f4f1ea', liquid = '#3b2416', h = 0.1, r = 0.04 } = {}) {
  const g = new THREE.Group(), m = new THREE.MeshPhysicalMaterial({ color, roughness: 0.25, clearcoat: 0.6 });
  const pts = [[0, 0], [r * 0.92, 0], [r, 0.006], [r, h], [r * 0.9, h], [r * 0.9, 0.01], [0, 0.01]].map(([a, b]) => new THREE.Vector2(a, b));
  const body = new THREE.Mesh(new THREE.LatheGeometry(pts, 48), m); body.castShadow = body.receiveShadow = true; g.add(body);
  const hd = new THREE.Mesh(new THREE.TorusGeometry(h * 0.27, r * 0.16, 12, 32, Math.PI), m); hd.rotation.z = -Math.PI / 2; hd.position.set(r, h * 0.52, 0); hd.castShadow = true; g.add(hd);
  if (liquid) { const l = new THREE.Mesh(new THREE.CircleGeometry(r * 0.88, 40), new THREE.MeshPhysicalMaterial({ color: liquid, roughness: 0.1, clearcoat: 1 })); l.rotation.x = -Math.PI / 2; l.position.y = h * 0.82; g.add(l); }
  return { group: g };
}
