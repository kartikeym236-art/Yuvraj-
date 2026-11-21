"""Brightness -35, Contrast +45, Saturation -7, Sharpness +60, Clarity +35, Grain +40 (phone-editor style scales)."""
import sys, cv2, numpy as np
def adjust(im):
    f = im.astype(np.float32) / 255
    f = f * (1 - 0.35 * 0.5)                                   # brightness -35
    f = (f - 0.5) * (1 + 0.45 * 0.6) + 0.5                      # contrast +45
    g = f.mean(2, keepdims=True); f = g + (f - g) * 0.93        # saturation -7
    L = cv2.GaussianBlur(f, (0, 0), 25); f = f + (f - L) * 0.35 # clarity +35 (local contrast)
    b = cv2.GaussianBlur(f, (0, 0), 1.2); f = f + (f - b) * 0.9 # sharpness +60
    n = np.random.default_rng(7).normal(0, 0.04 * 0.40 * 2.5, f.shape[:2])[..., None]
    f = f + n                                                    # grain +40 (monochrome)
    return (np.clip(f, 0, 1) * 255).astype(np.uint8)
if __name__ == "__main__":
    for p in sys.argv[1:]: cv2.imwrite(p, adjust(cv2.imread(p)))
