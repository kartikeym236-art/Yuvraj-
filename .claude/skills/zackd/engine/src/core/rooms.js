// Believable interiors in the reference palette (soft sky-blue walls, warm wood, white cove light, big window daylight).
//   const R = room(E, { w: 7, d: 6, h: 2.8, wall: '#8fc3e6', floor: 'wood', window: true, env: A.env.studio });
//   R.scene, R.counter(x, z, len)  -> kitchen/work counter,  R.shelf(x, z, len), R.sun (directional light), R.fill
import * as THREE from 'three';

function woodTex(rep = 6) {
  const W = 1024, c = document.createElement('canvas'); c.width = c.height = W; const x = c.getContext('2d');
  for (let i = 0; i < 8; i++) { const y = (i * W) / 8, hue = 28 + ((i * 37) % 7), l = 52 + ((i * 53) % 9);
    x.fillStyle = `hsl(${hue} 38% ${l}%)`; x.fillRect(0, y, W, W / 8);
    for (let k = 0; k < 40; k++) { x.strokeStyle = `hsla(${hue} 40% ${l - 12}% / ${0.08 + ((k * 13) % 10) / 100})`; x.lineWidth = 1 + (k % 3);
      x.beginPath(); const yy = y + ((k * 29) % (W / 8)); x.moveTo(0, yy); for (let s = 0; s <= W; s += 64) x.lineTo(s, yy + Math.sin(s * 0.01 + k) * 2.5); x.stroke(); }
    x.fillStyle = 'rgba(0,0,0,0.25)'; x.fillRect(0, y, W, 3); x.fillRect(((i * 389) % W), y, 3, W / 8); }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(rep, rep); t.anisotropy = 8; return t;
}

export function room(E, { w = 7, d = 6, h = 2.8, wall = '#8fc3e6', floor = 'wood', ceiling = '#f4f6f8', window: win = true, env = null, sunColor = '#fff1dc', sun = 3.2 } = {}) {
  const scene = new THREE.Scene(); scene.background = new THREE.Color(wall);
  if (env) { scene.environment = env; scene.environmentIntensity = 0.55; }
  const wm = new THREE.MeshStandardMaterial({ color: wall, roughness: 0.92 });
  const fm = floor === 'wood' ? new THREE.MeshStandardMaterial({ map: woodTex(w / 1.2), roughness: 0.45 }) : new THREE.MeshStandardMaterial({ color: floor, roughness: 0.4, metalness: 0.05 });
  const plane = (W, H, m, pos, rot) => { const p = new THREE.Mesh(new THREE.PlaneGeometry(W, H), m); p.position.copy(pos); p.rotation.set(...rot); p.receiveShadow = true; scene.add(p); return p; };
  plane(w, d, fm, new THREE.Vector3(0, 0, 0), [-Math.PI / 2, 0, 0]);
  plane(w, d, new THREE.MeshStandardMaterial({ color: ceiling, roughness: 0.9 }), new THREE.Vector3(0, h, 0), [Math.PI / 2, 0, 0]);
  plane(w, h, wm, new THREE.Vector3(0, h / 2, -d / 2), [0, 0, 0]);
  plane(d, h, wm, new THREE.Vector3(-w / 2, h / 2, 0), [0, Math.PI / 2, 0]);
  plane(d, h, wm, new THREE.Vector3(w / 2, h / 2, 0), [0, -Math.PI / 2, 0]);
  plane(w, h, wm, new THREE.Vector3(0, h / 2, d / 2), [0, Math.PI, 0]);
  // skirting + cove light strip (the warm line along the ceiling in the reference kitchen)
  const sk = new THREE.Mesh(new THREE.BoxGeometry(w, 0.1, 0.02), new THREE.MeshStandardMaterial({ color: '#f2f2f2', roughness: 0.6 })); sk.position.set(0, 0.05, -d / 2 + 0.011); scene.add(sk);
  const cove = new THREE.Mesh(new THREE.BoxGeometry(w, 0.03, 0.03), new THREE.MeshBasicMaterial({ color: '#fff4dc', toneMapped: false })); cove.position.set(0, h - 0.12, -d / 2 + 0.03); scene.add(cove);
  if (win) {   // window in the left wall: bright frame + daylight beam
    const fr = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.5 });
    const glass = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 1.3), new THREE.MeshBasicMaterial({ color: '#eaf6ff', toneMapped: false })); glass.position.set(-w / 2 + 0.01, 1.55, -0.6); glass.rotation.y = Math.PI / 2; scene.add(glass);
    [[0, 0.65], [0, -0.65]].forEach(([, y]) => { const b = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.05, 1.7), fr); b.position.set(-w / 2 + 0.03, 1.55 + y, -0.6); scene.add(b); });
    [-0.8, 0, 0.8].forEach((z) => { const b = new THREE.Mesh(new THREE.BoxGeometry(0.06, 1.35, 0.05), fr); b.position.set(-w / 2 + 0.03, 1.55, -0.6 + z); scene.add(b); });
  }
  const S = new THREE.DirectionalLight(sunColor, sun); S.position.set(-w * 0.9, h * 1.6, 0.8); S.target.position.set(0.5, 0, -0.4); S.castShadow = true;
  S.shadow.mapSize.set(2048, 2048); S.shadow.camera.left = S.shadow.camera.bottom = -5; S.shadow.camera.right = S.shadow.camera.top = 5; S.shadow.bias = -0.0004; S.shadow.normalBias = 0.02; S.shadow.radius = 5;
  scene.add(S, S.target);
  const fill = new THREE.HemisphereLight('#dff0ff', '#a07a5a', 0.6); scene.add(fill);
  const key = new THREE.PointLight('#ffe9cf', 6, 6, 2); key.position.set(1.2, h - 0.3, 1.2); scene.add(key);
  const R = { scene, sun: S, fill, key, w, d, h,
    counter(x = 0, z = -d / 2 + 0.35, len = 3, { top = '#e9e4dc', body = '#ffffff' } = {}) {
      const g = new THREE.Group(); const b = new THREE.Mesh(new THREE.BoxGeometry(len, 0.86, 0.62), new THREE.MeshStandardMaterial({ color: body, roughness: 0.5 }));
      b.position.y = 0.43; b.castShadow = b.receiveShadow = true; g.add(b);
      const tp = new THREE.Mesh(new THREE.BoxGeometry(len + 0.04, 0.05, 0.66), new THREE.MeshPhysicalMaterial({ color: top, roughness: 0.25, clearcoat: 0.5 })); tp.position.y = 0.885; tp.castShadow = tp.receiveShadow = true; g.add(tp);
      for (let i = 0; i < Math.floor(len / 0.6); i++) { const dr = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.7, 0.01), new THREE.MeshStandardMaterial({ color: body, roughness: 0.45 })); dr.position.set(-len / 2 + 0.3 + i * 0.6, 0.43, 0.315); g.add(dr);
        const hd = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.012, 0.02), new THREE.MeshStandardMaterial({ color: '#9aa0a6', metalness: 1, roughness: 0.3 })); hd.position.set(-len / 2 + 0.3 + i * 0.6, 0.72, 0.33); g.add(hd); }
      g.position.set(x, 0, z); scene.add(g); return g; },
    shelf(x = 0, z = -d / 2 + 0.2, len = 2, rows = 3) {
      const g = new THREE.Group(), m = new THREE.MeshStandardMaterial({ color: '#d9d4cc', roughness: 0.6 });
      for (let r = 0; r < rows; r++) { const s = new THREE.Mesh(new THREE.BoxGeometry(len, 0.03, 0.3), m); s.position.y = 0.6 + r * 0.45; s.castShadow = s.receiveShadow = true; g.add(s);
        for (let i = 0; i < 6; i++) { const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.05 + (i % 3) * 0.015, 0.06, 0.12 + (i % 2) * 0.08, 24), new THREE.MeshStandardMaterial({ color: ['#c46a3f', '#d9a066', '#8a5a3c', '#e2c9a6'][(i + r) % 4], roughness: 0.6 }));
          pot.position.set(-len / 2 + 0.2 + i * (len - 0.4) / 5, 0.6 + r * 0.45 + 0.08, 0); pot.castShadow = true; g.add(pot); } }
      g.position.set(x, 0, z); scene.add(g); return g; },
  };
  return R;
}
