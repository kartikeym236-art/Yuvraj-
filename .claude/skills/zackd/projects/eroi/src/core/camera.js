// Camera grammar from the reference films (see STYLE_REFS.md). A shot is ONE slow, motivated move between two framings,
// eased in and out, plus a whisper of handheld drift - never a locked-off frame, never a fast swoop.
//
//   const S = { target: V3(0, 1.2, 0), dist: 2.2, yaw: 0.3, pitch: -0.08, fov: 32 };      // framing = orbit around a target
//   move(cam, S, { ...S, dist: 1.9, yaw: 0.22 }, lt / d)          slow push-in with a slight arc (the default shot)
//   frame(cam, S)                                                  apply one framing
//   handheld(cam, t, 1)                                            subtle organic sway (call after move/frame)
//   focusOf(cam, S.target) -> distance for look.focus (keep the subject sharp, background soft)
// Framing presets around a standing person at `p` (feet) of height ~1.75: SHOT.wide / full / medium / close / ecu / low / ots / top.
import * as THREE from 'three';

const ease = (k) => (k <= 0 ? 0 : k >= 1 ? 1 : k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);
const easeSoft = (k) => (k <= 0 ? 0 : k >= 1 ? 1 : 0.5 - 0.5 * Math.cos(Math.PI * k));   // gentler: sine in-out

export function frame(cam, { target, dist, yaw = 0, pitch = 0, fov = 32, roll = 0, offset = null }) {
  const cp = Math.cos(pitch);
  cam.position.set(target.x + Math.sin(yaw) * cp * dist, target.y - Math.sin(pitch) * dist, target.z + Math.cos(yaw) * cp * dist);
  cam.up.set(0, 1, 0); cam.lookAt(target); if (roll) cam.rotateZ(roll);
  if (offset) { cam.translateX(offset[0] || 0); cam.translateY(offset[1] || 0); }   // screen-space nudge (subject off-centre)
  if (cam.fov !== fov) { cam.fov = fov; cam.updateProjectionMatrix(); }
  return cam;
}

/** interpolate two framings by k (0..1) with an eased curve; ease: 'soft' (default), 'cubic', 'linear' */
export function move(cam, A, B, k, { ease: e = 'soft' } = {}) {
  const u = e === 'linear' ? Math.min(1, Math.max(0, k)) : e === 'cubic' ? ease(k) : easeSoft(k);
  const L = (a, b) => a + (b - a) * u;
  return frame(cam, { target: A.target.clone().lerp(B.target, u), dist: L(A.dist, B.dist), yaw: L(A.yaw || 0, B.yaw || 0), pitch: L(A.pitch || 0, B.pitch || 0),
    fov: L(A.fov || 32, B.fov || 32), roll: L(A.roll || 0, B.roll || 0), offset: A.offset || B.offset ? [L(A.offset?.[0] || 0, B.offset?.[0] || 0), L(A.offset?.[1] || 0, B.offset?.[1] || 0)] : null });
}

/** organic handheld sway: small rotations from summed sines (deterministic). amt 1 = reference level (~0.15 deg) */
export function handheld(cam, t, amt = 1) {
  const a = amt * 0.0026;
  cam.rotateX((Math.sin(t * 0.9) * 0.6 + Math.sin(t * 2.3 + 1.3) * 0.3 + Math.sin(t * 5.1 + 0.4) * 0.1) * a);
  cam.rotateY((Math.sin(t * 0.7 + 2.1) * 0.6 + Math.sin(t * 1.9 + 0.2) * 0.3 + Math.sin(t * 4.3 + 2.0) * 0.1) * a);
  cam.rotateZ(Math.sin(t * 0.5 + 0.7) * a * 0.4);
  return cam;
}

export const focusOf = (cam, p) => cam.position.distanceTo(p);

/** framings around a standing person whose feet are at p (Vector3) and who faces +z rotated by `face` (radians) */
export function SHOT(p, face = 0) {
  const T = (y) => new THREE.Vector3(p.x, p.y + y, p.z);
  return {
    wide: { target: T(1.0), dist: 6.5, yaw: face + 0.35, pitch: -0.12, fov: 34 },
    full: { target: T(0.95), dist: 4.2, yaw: face + 0.25, pitch: -0.05, fov: 32 },
    medium: { target: T(1.32), dist: 2.3, yaw: face + 0.22, pitch: -0.03, fov: 30 },
    close: { target: T(1.58), dist: 1.05, yaw: face + 0.18, pitch: -0.02, fov: 28 },
    ecu: { target: T(1.62), dist: 0.55, yaw: face + 0.12, pitch: 0, fov: 26 },
    low: { target: T(1.4), dist: 1.9, yaw: face + 0.3, pitch: 0.28, fov: 34 },          // looking up at them (power, tension)
    high: { target: T(1.1), dist: 3.0, yaw: face + 0.2, pitch: -0.55, fov: 32 },         // looking down (small, alone)
    ots: { target: T(1.5), dist: 1.6, yaw: face + Math.PI + 0.35, pitch: -0.06, fov: 30 }, // over the shoulder, from behind them
    top: { target: T(0.5), dist: 4.0, yaw: face, pitch: -1.35, fov: 34 },
  };
}

/** standard shot: start framing -> end framing over the shot (k = lt/d), plus handheld. Returns the focus distance. */
export function shot(cam, A, B, lt, d, t, { hand = 1, ease: e = 'soft' } = {}) {
  move(cam, A, B, Math.min(1, lt / Math.max(0.001, d)), { ease: e }); if (hand) handheld(cam, t, hand);
  return focusOf(cam, A.target.clone().lerp(B.target, Math.min(1, lt / d)));
}
