// Scene building blocks: studio void, x-ray glass, scanned head, blood-vessel interior, small props.
import * as THREE from 'three';

/** seamless studio void (sky blue by default) with soft key / rim / fill lights and a shadow-catching floor.
 *  V.setColor('#6E5FA8') recolours it live. Topic colours: white '#F2F4F5', purple '#6E5FA8', navy '#14233F', black '#0B0B0E'. */
export function studioVoid(env, col = '#5BC4F0') {
  const scene = new THREE.Scene();
  const uniforms = { uTop: { value: new THREE.Color() }, uBot: { value: new THREE.Color() }, uMid: { value: new THREE.Color() } };
  const bg = new THREE.Mesh(new THREE.SphereGeometry(60, 48, 24), new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, uniforms,
    vertexShader: 'varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
    fragmentShader: `uniform vec3 uTop, uBot, uMid; varying vec3 vP;
      void main(){ float y = vP.y; vec3 c = y > 0.0 ? mix(uMid, uTop, smoothstep(0.0, 0.7, y)) : mix(uMid, uBot, smoothstep(0.0, -0.5, y));
        gl_FragColor = vec4(c, 1.0); }`,
  }));
  bg.frustumCulled = false; bg.renderOrder = -10; scene.add(bg);
  // floor that only receives shadows (keeps the void seamless)
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), new THREE.ShadowMaterial({ opacity: 0.18 }));
  floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor);
  const key = new THREE.DirectionalLight('#fff4e8', 2.4); key.position.set(-2.2, 4.2, 3.2); key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048); key.shadow.radius = 6; key.shadow.bias = -0.0004; key.shadow.normalBias = 0.02;
  Object.assign(key.shadow.camera, { left: -1.5, right: 1.5, top: 2.2, bottom: -0.2, near: 0.5, far: 12 });
  const rim = new THREE.DirectionalLight('#dff3ff', 1.6); rim.position.set(2.5, 2.5, -3);
  const fill = new THREE.HemisphereLight('#e8f6ff', '#9aa7b3', 0.5);
  scene.add(key, key.target, rim, fill);
  if (env) { scene.environment = env; scene.environmentIntensity = 0.55; }
  const V = { scene, key, rim, fill, bg, floor, color: new THREE.Color(col),
    setColor(c) {
      V.color.set(c); const hsl = {}; V.color.getHSL(hsl);
      uniforms.uMid.value.copy(V.color);
      uniforms.uTop.value.setHSL(hsl.h, hsl.s * 0.9, Math.min(1, hsl.l * 1.12 + 0.04));
      uniforms.uBot.value.setHSL(hsl.h, hsl.s, hsl.l * 0.78);
      scene.fog = null;
    } };
  V.setColor(col);
  return V;
}

/** x-ray glass for light backgrounds: fresnel rim, faint body. Works on skinned meshes too.
 *  Recolour: mat.uniforms.uCol.value.set('#ff3b3b'); strength: mat.uniforms.uK.value (0..1). */
export function glassMaterial(col = '#E9F7FF', { base = 0.06, rim = 0.75, power = 2.2 } = {}) {
  const uniforms = { uCol: { value: new THREE.Color(col) }, uBase: { value: base }, uRim: { value: rim }, uPow: { value: power }, uK: { value: 1 } };
  const m = new THREE.MeshBasicMaterial({ transparent: true, depthWrite: false, side: THREE.FrontSide });
  m.uniforms = uniforms;
  m.onBeforeCompile = (s) => {
    Object.assign(s.uniforms, uniforms);
    s.vertexShader = 'varying vec3 gN; varying vec3 gV;\n' + s.vertexShader.replace('#include <project_vertex>', `#include <project_vertex>
      #ifdef USE_SKINNING
        gN = normalize(normalMatrix * objectNormal);
      #else
        gN = normalize(normalMatrix * normal);
      #endif
      gV = -mvPosition.xyz;`);
    s.fragmentShader = 'uniform vec3 uCol; uniform float uBase, uRim, uPow, uK; varying vec3 gN; varying vec3 gV;\n' + s.fragmentShader.replace(
      'vec4 diffuseColor = vec4( diffuse, opacity );',
      `vec3 nn = normalize(gN); if (!gl_FrontFacing) nn = -nn; float f = pow(1.0 - abs(dot(nn, normalize(gV))), uPow);
       f = clamp(f, 0.0, 1.0); vec4 diffuseColor = vec4(mix(uCol, vec3(1.0), f * 0.55), clamp((uBase + f * uRim) * uK, 0.0, 1.0));`);
  };
  m.customProgramCacheKey = () => 'zk-glass';
  return m;
}

/** photo-scanned head (Lee Perry-Smith, CC BY 3.0). Bust ~36 cm tall, origin = bust centre, face +z.
 *  setXray(k): 0 skin, 1 glass (in between: skin fades out while the glass fades in). */
export function scanHead(gltf, col, nrm, glassMat, { spec } = {}) {
  let src; gltf.scene.traverse((o) => { if (o.isMesh && !src) src = o; });
  const geo = src.geometry.clone();
  if (col) { col.colorSpace = THREE.SRGBColorSpace; col.anisotropy = 8; }   // TextureLoader default flipY=true matches this scan's UVs
  const skinMat = new THREE.MeshPhysicalMaterial({ map: col || null, normalMap: nrm || null, normalScale: new THREE.Vector2(0.8, 0.8),
    roughness: 0.52, roughnessMap: null, specularIntensityMap: spec || null, specularIntensity: 0.6, sheen: 0.25,
    sheenColor: new THREE.Color('#ffd9c8'), sheenRoughness: 0.6, clearcoat: 0.05, clearcoatRoughness: 0.5 });
  const skin = new THREE.Mesh(geo, skinMat); skin.castShadow = true; skin.receiveShadow = true;
  const xray = new THREE.Mesh(geo, glassMat || glassMaterial()); xray.renderOrder = 5; xray.visible = false;
  const group = new THREE.Group(); const S = 0.0453; skin.scale.setScalar(S); xray.scale.setScalar(S);
  group.add(skin, xray);
  const bounds = new THREE.Box3().setFromObject(skin);
  return {
    group, skin, xray, bounds, scale: S,
    setXray(k) {
      k = Math.min(1, Math.max(0, k));
      skin.visible = k < 1; xray.visible = k > 0;
      skinMat.transparent = k > 0; skinMat.opacity = 1 - k; skinMat.depthWrite = k < 0.5;
      xray.material.uniforms.uK.value = k;
    },
  };
}

/** blood-vessel macro: textured wet wall, biconcave red cells (varied sizes), white cells, platelets, fog.
 *  VS.update(t, camZ, co2 0..1 (darker blood), dark 0..1, cold 0..1 icy). Camera looks down -z; VS.cam is yours to move. */
export function vessel(E, { R = 1, len = 60, cells = 260 } = {}) {
  const scene = new THREE.Scene(); const fogC = new THREE.Color('#3a0508');
  scene.background = fogC.clone(); scene.fog = new THREE.FogExp2(fogC.clone(), 0.09);
  // wall: noise texture -> colour + bump
  const cv = document.createElement('canvas'); cv.width = 512; cv.height = 512; const g = cv.getContext('2d');
  g.fillStyle = '#a01818'; g.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 2600; i++) {
    const x = Math.random() * 512, y = Math.random() * 512, r = 4 + Math.random() * 26;
    const gr = g.createRadialGradient(x, y, 0, x, y, r); const l = Math.random() > 0.5 ? 'rgba(255,120,110,0.10)' : 'rgba(60,0,8,0.12)';
    gr.addColorStop(0, l); gr.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = gr; g.fillRect(x - r, y - r, 2 * r, 2 * r);
  }
  for (let i = 0; i < 40; i++) { g.strokeStyle = 'rgba(70,0,10,0.25)'; g.lineWidth = 1 + Math.random() * 3; g.beginPath();
    let x = Math.random() * 512, y = Math.random() * 512; g.moveTo(x, y);
    for (let k = 0; k < 8; k++) { x += (Math.random() - 0.5) * 60; y += Math.random() * 50; g.lineTo(x, y); } g.stroke(); }
  const tex = new THREE.CanvasTexture(cv); tex.wrapS = tex.wrapT = THREE.RepeatWrapping; tex.repeat.set(3, 10); tex.colorSpace = THREE.SRGBColorSpace;
  const wallMat = new THREE.MeshPhysicalMaterial({ map: tex, bumpMap: tex, bumpScale: 2.5, roughness: 0.32, clearcoat: 0.8, clearcoatRoughness: 0.25,
    side: THREE.BackSide, color: '#ffffff', sheen: 0.4, sheenColor: new THREE.Color('#ff8a7a') });
  const wall = new THREE.Mesh(new THREE.CylinderGeometry(R, R, len, 64, 40, true), wallMat);
  wall.rotation.x = Math.PI / 2; wall.position.z = -len / 2 + 4; scene.add(wall);
  // red blood cell: lathe of a biconcave disc profile
  const prof = []; for (let i = 0; i <= 24; i++) { const r = i / 24 * 0.5; const x = r / 0.5;
    const hgt = 0.5 * Math.sqrt(Math.max(0, 1 - x * x)) * (0.18 + 0.9 * x * x - 0.72 * x * x * x * x) * 0.5; prof.push(new THREE.Vector2(r, hgt)); }
  for (let i = 24; i >= 0; i--) prof.push(new THREE.Vector2(prof[i].x, -prof[i].y));
  const rbcGeo = new THREE.LatheGeometry(prof, 40); rbcGeo.computeVertexNormals();
  const rbcMat = new THREE.MeshPhysicalMaterial({ color: '#c4161c', roughness: 0.35, clearcoat: 0.6, clearcoatRoughness: 0.3,
    sheen: 0.6, sheenColor: new THREE.Color('#ff6a5a'), transmission: 0, emissive: '#2a0000' });
  const rbc = new THREE.InstancedMesh(rbcGeo, rbcMat, cells); scene.add(rbc);
  const wbc = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(0.22, 4), new THREE.MeshPhysicalMaterial({ color: '#f1ece2', roughness: 0.6, sheen: 0.5 }), 6); scene.add(wbc);
  const plt = new THREE.InstancedMesh(new THREE.SphereGeometry(0.05, 12, 8), new THREE.MeshStandardMaterial({ color: '#e8b0a0', roughness: 0.5 }), 50); scene.add(plt);
  const rnd = (s) => { const x = Math.sin(s * 127.1) * 43758.5453; return x - Math.floor(x); };
  const P = Array.from({ length: cells }, (_, i) => ({ r: (0.3 + 0.6 * Math.sqrt(rnd(i + 1))) * R, a: rnd(i + 7) * 6.283, z: rnd(i + 13) * len,
    s: 0.75 + rnd(i + 3) * 0.5, rx: rnd(i + 5) * 6.28, ry: rnd(i + 9) * 6.28, w: 0.3 + rnd(i + 11) }));
  const light = new THREE.PointLight('#ffd0c0', 30, 14, 1.6); scene.add(light);
  const amb = new THREE.HemisphereLight('#ff9a8a', '#300004', 0.9); scene.add(amb);
  const cam = E.camera(55); const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), p = new THREE.Vector3(), sc = new THREE.Vector3();
  const flowSpeed = 3.0;
  const VS = { scene, cam, wallMat, rbcMat, light, look: { aperture: 0, ao: 0, bloom: 0.25, bloomThreshold: 0.82, exposure: 0.85, vignette: 0.5 },
    update(t, camZ = 0, co2 = 0, dark = 0, cold = 0) {
      const z0 = camZ + 3;                                         // cells live in a window around the camera
      P.forEach((c, i) => {
        let z = ((c.z - t * flowSpeed * (0.8 + 0.2 * c.w)) % len + len) % len; z = z0 - z;
        p.set(Math.cos(c.a + t * 0.1 * c.w) * c.r, Math.sin(c.a + t * 0.1 * c.w) * c.r, z);
        e.set(c.rx + t * 0.7 * c.w, c.ry + t * 0.5, 0); q.setFromEuler(e); sc.setScalar(c.s * 0.36);
        rbc.setMatrixAt(i, m4.compose(p, q, sc));
      });
      rbc.instanceMatrix.needsUpdate = true;
      for (let i = 0; i < 6; i++) { const z = z0 - ((i * 9.7 - t * flowSpeed * 0.6) % len + len) % len;
        p.set(Math.cos(i * 2.1) * 0.7, Math.sin(i * 2.1) * 0.7, z); wbc.setMatrixAt(i, m4.compose(p, q.identity(), sc.setScalar(0.7 + 0.15 * Math.sin(i)))); }
      wbc.instanceMatrix.needsUpdate = true;
      for (let i = 0; i < 50; i++) { const z = z0 - ((rnd(i + 99) * len - t * flowSpeed) % len + len) % len; const r = rnd(i + 40) * 0.8, a = rnd(i + 41) * 6.28;
        p.set(Math.cos(a) * r, Math.sin(a) * r, z); plt.setMatrixAt(i, m4.compose(p, q.identity(), sc.setScalar(0.8 + rnd(i) * 0.6))); }
      plt.instanceMatrix.needsUpdate = true;
      wall.position.z = camZ - len / 2 + 6; tex.offset.y = (camZ / len) * 10;
      light.position.set(0, 0.2, camZ + 0.5);
      const red = new THREE.Color('#c4161c').lerp(new THREE.Color('#6d0d22'), co2).lerp(new THREE.Color('#9fc8ff'), cold * 0.55);
      rbcMat.color.copy(red); wallMat.color.set('#ffffff').lerp(new THREE.Color('#bcd6ff'), cold * 0.6);
      const f = fogC.clone().lerp(new THREE.Color('#12020a'), dark).lerp(new THREE.Color('#2a3c58'), cold * 0.6);
      scene.background.copy(f); scene.fog.color.copy(f); light.intensity = 30 * (1 - 0.6 * dark);
    } };
  return VS;
}

/** simple ice-cream cone prop (cone + 2 scoops), ~14 cm tall, origin at the cone tip */
export function iceCream(colors = ['#FBE7C6', '#F7A8C2']) {
  const g = new THREE.Group();
  const cone = new THREE.Mesh(new THREE.ConeGeometry(0.03, 0.11, 32, 1, true), new THREE.MeshStandardMaterial({ color: '#D9A25B', roughness: 0.8, side: THREE.DoubleSide }));
  cone.rotation.x = Math.PI; cone.position.y = 0.055; g.add(cone);
  colors.forEach((c, i) => { const s = new THREE.Mesh(new THREE.SphereGeometry(0.034 - i * 0.004, 32, 24), new THREE.MeshPhysicalMaterial({ color: c, roughness: 0.55, sheen: 0.5 }));
    s.position.y = 0.12 + i * 0.045; s.scale.y = 0.9; s.castShadow = true; g.add(s); });
  return g;
}
