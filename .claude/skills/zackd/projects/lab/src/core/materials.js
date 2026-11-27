// Realistic tissue materials: wet clearcoat, sheen, procedural micro-surface (object-space noise, no UVs needed),
// plus two live controls on every organ material: m.userData.inflate.value (push along normals, in mesh units = mm for
// BodyParts3D) and the usual emissive / emissiveIntensity / opacity.
import * as THREE from 'three';

const KINDS = {
  artery:   { color: '#B3161E', rough: 0.3, coat: 0.8, sheen: '#ff7a6a', pat: 'wet', scale: 0.25 },
  vein:     { color: '#4B3A8F', rough: 0.32, coat: 0.8, sheen: '#9a8cff', pat: 'wet', scale: 0.25 },
  nerve:    { color: '#F1E3B8', rough: 0.55, coat: 0.3, sheen: '#ffffff', pat: 'fibre', scale: 0.6 },
  cord:     { color: '#EFE2C4', rough: 0.5, coat: 0.4, sheen: '#ffffff', pat: 'fibre', scale: 0.3 },
  heart:    { color: '#A5232A', rough: 0.36, coat: 0.7, sheen: '#ff8a7a', pat: 'fibre', scale: 0.12 },
  lung:     { color: '#E59A9C', rough: 0.55, coat: 0.35, sheen: '#ffd0d0', pat: 'porous', scale: 0.2 },
  liver:    { color: '#7A2420', rough: 0.3, coat: 0.85, sheen: '#c0504a', pat: 'lobule', scale: 0.08 },
  stomach:  { color: '#D98A86', rough: 0.4, coat: 0.7, sheen: '#ffc0b8', pat: 'wet', scale: 0.1 },
  gut:      { color: '#E0928A', rough: 0.38, coat: 0.75, sheen: '#ffc8c0', pat: 'wet', scale: 0.12 },
  kidney:   { color: '#8E2E2A', rough: 0.32, coat: 0.8, sheen: '#d06a60', pat: 'wet', scale: 0.12 },
  pancreas: { color: '#E5B48C', rough: 0.5, coat: 0.5, sheen: '#fff0d8', pat: 'lobule', scale: 0.25 },
  spleen:   { color: '#6E2238', rough: 0.35, coat: 0.7, sheen: '#b0506a', pat: 'wet', scale: 0.12 },
  bladder:  { color: '#E8B0A0', rough: 0.4, coat: 0.7, sheen: '#ffe0d0', pat: 'wet', scale: 0.1 },
  diaphragm:{ color: '#B5464A', rough: 0.45, coat: 0.5, sheen: '#ff9a90', pat: 'fibre', scale: 0.1 },
  bone:     { color: '#EDE3CF', rough: 0.6, coat: 0.2, sheen: '#ffffff', pat: 'porous', scale: 0.35, opacity: 0.72 },
  brain:    { color: '#E7B7B1', rough: 0.45, coat: 0.55, sheen: '#ffe4dc', pat: 'wet', scale: 0.15 },
  tongue:   { color: '#D46A72', rough: 0.45, coat: 0.6, sheen: '#ffb0b8', pat: 'porous', scale: 0.6 },
  gland:    { color: '#E8A24A', rough: 0.45, coat: 0.5, sheen: '#fff0c8', pat: 'lobule', scale: 0.3 },
};

export function organMat(kind = 'gut', over = {}) {
  const k = KINDS[kind] || KINDS.gut;
  const m = new THREE.MeshPhysicalMaterial({ color: k.color, roughness: k.rough, clearcoat: k.coat, clearcoatRoughness: 0.18,
    sheen: 0.5, sheenColor: new THREE.Color(k.sheen), sheenRoughness: 0.5, emissive: '#000000',
    transparent: (k.opacity ?? 1) < 1, opacity: k.opacity ?? 1, depthWrite: (k.opacity ?? 1) >= 1, ...over });
  const inflate = { value: 0 }, pat = { value: ['wet', 'fibre', 'porous', 'lobule'].indexOf(k.pat) }, sc = { value: k.scale };
  m.userData.inflate = inflate; m.userData.kind = kind;
  m.onBeforeCompile = (s) => {
    s.uniforms.uInflate = inflate; s.uniforms.uPat = pat; s.uniforms.uNS = sc;
    s.vertexShader = 'uniform float uInflate; varying vec3 vOP;\n' + s.vertexShader
      .replace('#include <begin_vertex>', '#include <begin_vertex>\n transformed += normalize(objectNormal) * uInflate; vOP = position;');
    s.fragmentShader = `uniform float uPat, uNS; varying vec3 vOP;
      float hs(vec3 p){ return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453); }
      float vn(vec3 p){ vec3 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
        return mix(mix(mix(hs(i), hs(i + vec3(1,0,0)), f.x), mix(hs(i + vec3(0,1,0)), hs(i + vec3(1,1,0)), f.x), f.y),
                   mix(mix(hs(i + vec3(0,0,1)), hs(i + vec3(1,0,1)), f.x), mix(hs(i + vec3(0,1,1)), hs(i + vec3(1,1,1)), f.x), f.y), f.z); }
      float micro(vec3 p){ p *= uNS;
        if (uPat < 0.5) return vn(p) * 0.6 + vn(p * 2.7) * 0.4;                       // wet
        if (uPat < 1.5) return 0.5 + 0.5 * sin(p.z * 6.0 + vn(p * 0.8) * 4.0);         // fibre
        if (uPat < 2.5) return smoothstep(0.35, 0.7, vn(p * 2.0));                     // porous
        return smoothstep(0.2, 0.8, abs(vn(p) - vn(p * 1.9 + 3.1)) * 2.0); }           // lobule
      ` + s.fragmentShader
      .replace('#include <color_fragment>', '#include <color_fragment>\n float mz = micro(vOP); diffuseColor.rgb *= 0.92 + 0.14 * mz;')
      .replace('#include <normal_fragment_maps>', `#include <normal_fragment_maps>
        { float hgt = micro(vOP); vec3 dpx = dFdx(-vViewPosition), dpy = dFdy(-vViewPosition);
          float dhx = dFdx(hgt), dhy = dFdy(hgt); vec3 r1 = cross(dpy, normal), r2 = cross(normal, dpx); float det = dot(dpx, r1);
          if (abs(det) > 1e-9) normal = normalize(abs(det) * normal - 0.18 * sign(det) * (dhx * r1 + dhy * r2)); }`);
  };
  m.customProgramCacheKey = () => 'zk-organ';
  return m;
}

/** soft additive glow sprite (radial gradient), for pain / cold / hormone highlights */
let glowTex = null;
export function glowSprite(color = '#ff3030', size = 0.05, { additive = true } = {}) {
  if (!glowTex) {
    const c = document.createElement('canvas'); c.width = c.height = 128; const g = c.getContext('2d');
    const gr = g.createRadialGradient(64, 64, 0, 64, 64, 64); gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.35, 'rgba(255,255,255,0.45)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 128, 128); glowTex = new THREE.CanvasTexture(c);
  }
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color, transparent: true, depthWrite: false,
    blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending, opacity: 0 }));
  s.scale.setScalar(size); s.renderOrder = 10; return s;
}
