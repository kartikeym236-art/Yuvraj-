// Renderer + post stack. E.render(scene, cam, look) with look = {
//   exposure 1, focus (m, distance of the sharp plane; default: none), aperture 0 (DOF strength, ~0.0005-0.003), maxblur 0.01,
//   bloom 0.15, bloomThreshold 0.85, bloomRadius 0.4, ao 0.85 (0 = off), aoRadius 0.25,
//   vignette 0.35, grain 0.025, warm 0 (-1 cool .. 1 warm), saturation 1, contrast 1 }
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { GTAOPass } from 'three/addons/postprocessing/GTAOPass.js';
import { BokehPass } from 'three/addons/postprocessing/BokehPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { QS } from './timeline.js';

export const W = 1080, H = 1920;
export const DEFAULT_LOOK = { exposure: 1, aperture: 0, maxblur: 0.01, bloom: 0.15, bloomThreshold: 0.85, bloomRadius: 0.4,
  ao: 0.85, aoRadius: 0.25, vignette: 0.35, grain: 0.025, warm: 0, saturation: 1, contrast: 1 };

const GradeShader = {
  uniforms: { tDiffuse: { value: null }, uVig: { value: 0.35 }, uGrain: { value: 0.02 }, uWarm: { value: 0 }, uSat: { value: 1 },
    uCon: { value: 1 }, uSeed: { value: 0 }, uAspect: { value: W / H } },
  vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
  fragmentShader: `uniform sampler2D tDiffuse; uniform float uVig, uGrain, uWarm, uSat, uCon, uSeed, uAspect; varying vec2 vUv;
    float h(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233)) + uSeed) * 43758.5453); }
    void main(){ vec4 c = texture2D(tDiffuse, vUv); vec3 col = c.rgb;
      float l = dot(col, vec3(0.2126, 0.7152, 0.0722)); col = mix(vec3(l), col, uSat);
      col = (col - 0.18) * uCon + 0.18; col = max(col, 0.0);
      col *= vec3(1.0 + 0.06 * uWarm, 1.0 + 0.01 * uWarm, 1.0 - 0.07 * uWarm);
      vec2 q = (vUv - 0.5) * vec2(1.0, 1.0 / uAspect) * 1.25; col *= 1.0 - uVig * smoothstep(0.25, 0.85, length(q) * 1.4);
      col += (h(vUv * 1000.0) - 0.5) * uGrain * (0.3 + l);
      gl_FragColor = vec4(col, c.a); }`,
};

export function makeEngine(canvas) {
  const res = +(QS.get('res') || 1);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, preserveDrawingBuffer: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(res); renderer.setSize(W, H, false);
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const rt = new THREE.WebGLRenderTarget(W * res, H * res, { type: THREE.HalfFloatType, samples: 4 });
  const composer = new EffectComposer(renderer, rt); composer.setPixelRatio(1); composer.setSize(W * res, H * res);
  const dummyS = new THREE.Scene(), dummyC = new THREE.PerspectiveCamera();
  const rp = new RenderPass(dummyS, dummyC);
  const ao = new GTAOPass(dummyS, dummyC, W * res, H * res); ao.output = GTAOPass.OUTPUT.Default;
  const bokeh = new BokehPass(dummyS, dummyC, { focus: 1, aperture: 0.001, maxblur: 0.01 });
  const bloom = new UnrealBloomPass(new THREE.Vector2(W * res / 2, H * res / 2), 0.15, 0.4, 0.85);
  const grade = new ShaderPass(GradeShader), out = new OutputPass();
  [rp, ao, bokeh, bloom, grade, out].forEach((p) => composer.addPass(p));
  let frameNo = 0;

  const E = {
    renderer, composer, res, W, H,
    camera(fov = 30) { const c = new THREE.PerspectiveCamera(fov, W / H, 0.01, 200); return c; },
    render(scene, cam, look = {}) {
      const L = { ...DEFAULT_LOOK, ...look };
      cam.aspect = W / H; cam.updateProjectionMatrix();
      renderer.toneMappingExposure = L.exposure;
      rp.scene = scene; rp.camera = cam;
      ao.enabled = L.ao > 0;
      if (ao.enabled) {
        if (ao.scene !== scene || ao.camera !== cam) { ao.scene = scene; ao.camera = cam; ao.setSceneClipBox?.(null); }
        ao.blendIntensity = L.ao; ao.updateGtaoMaterial({ radius: L.aoRadius, distanceExponent: 1, thickness: 1, scale: 1, samples: 12 });
        ao.updatePdMaterial({ lumaPhi: 10, depthPhi: 2, normalPhi: 3, radius: 6, rings: 2, samples: 12 });
      }
      bokeh.enabled = L.aperture > 0 && L.focus > 0;
      if (bokeh.enabled) {
        bokeh.scene = scene; bokeh.camera = cam;
        const u = bokeh.uniforms; u.focus.value = L.focus; u.aperture.value = L.aperture; u.maxblur.value = L.maxblur;
        u.nearClip.value = cam.near; u.farClip.value = cam.far; u.aspect.value = cam.aspect;
      }
      bloom.enabled = L.bloom > 0; bloom.strength = L.bloom; bloom.threshold = L.bloomThreshold; bloom.radius = L.bloomRadius;
      const g = grade.uniforms; g.uVig.value = L.vignette; g.uGrain.value = L.grain; g.uWarm.value = L.warm;
      g.uSat.value = L.saturation; g.uCon.value = L.contrast; g.uSeed.value = (frameNo++ % 97) * 0.731;
      composer.render();
    },
  };
  return E;
}
