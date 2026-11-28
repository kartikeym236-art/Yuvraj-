// Asset loader. shots.js exports PRELOAD = { models: {k: url.glb}, hdri: {k: url.hdr}, obj: {k: url.obj}, tex: {k: url.jpg} }
// After load(): A.models[k] (gltf), A.hdr[k] (equirect texture), A.env[k] (PMREM env map), A.obj[k] (Group), A.tex[k].
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';

export const A = { models: {}, hdr: {}, env: {}, obj: {}, tex: {} };

export async function load(PRELOAD, renderer, onProgress = () => {}) {
  const jobs = [], gl = new GLTFLoader(), ol = new OBJLoader(), hl = new RGBELoader(), tl = new THREE.TextureLoader();
  let done = 0, total = 0;
  const job = (p) => { total++; jobs.push(p.then((r) => { onProgress(++done, total); return r; })); };
  for (const [k, u] of Object.entries(PRELOAD.models || {})) job(gl.loadAsync(u).then((g) => (A.models[k] = g)));
  for (const [k, u] of Object.entries(PRELOAD.obj || {})) job(ol.loadAsync(u).then((g) => (A.obj[k] = prepObj(g))));
  for (const [k, u] of Object.entries(PRELOAD.tex || {})) job(tl.loadAsync(u).then((t) => (A.tex[k] = t)));
  for (const [k, u] of Object.entries(PRELOAD.hdri || {})) job(hl.loadAsync(u).then((t) => {
    t.mapping = THREE.EquirectangularReflectionMapping; A.hdr[k] = t;
    const pm = new THREE.PMREMGenerator(renderer); A.env[k] = pm.fromEquirectangular(t).texture; pm.dispose();
  }));
  await Promise.all(jobs);
  return A;
}

/** OBJ from tools/bp3d_build.py: weld vertices and compute smooth normals so organs are not faceted */
function prepObj(g) {
  g.traverse((m) => {
    if (!m.isMesh) return;
    let geo = m.geometry; geo.deleteAttribute('normal'); geo.deleteAttribute('uv');
    geo = BufferGeometryUtils.mergeVertices(geo, 0.05); geo.computeVertexNormals(); m.geometry = geo;
  });
  return g;
}

/** find a bone by (partial) name inside a skinned model */
export function bone(root, name) {
  let b = null; root.traverse((o) => { if (!b && o.isBone && o.name.toLowerCase().includes(name.toLowerCase())) b = o; }); return b;
}
