"""Remove the semi-transparent sparkle watermark (bottom-right) from every scene image.

The mark is white blended at ~35% opacity: obs = img*(1-a) + 255*a.
wm_alpha.npy holds `a` (estimated from flat-background images), so we invert
the blend exactly (no inpainting, so lines crossing the mark stay intact).
Cleaned copies go to clean/ with the same filenames; originals are untouched.
"""
from pathlib import Path
import cv2, numpy as np

HERE = Path(__file__).parent
SRC, OUT = HERE / "source", HERE / "clean"
C, R = 922, 40
alpha = np.load(HERE / "wm_alpha.npy")
alpha = np.where(alpha > 0.04, alpha, 0)[..., None]

OUT.mkdir(exist_ok=True)
for p in sorted(SRC.glob("*.jpg")):
    img = cv2.imread(str(p)).astype(float)
    win = img[C-R:C+R, C-R:C+R]
    fixed = np.clip((win - 255 * alpha) / (1 - alpha), 0, 255)
    img[C-R:C+R, C-R:C+R] = fixed
    img = img.astype(np.uint8)
    cv2.imwrite(str(OUT / p.name), img, [cv2.IMWRITE_JPEG_QUALITY, 95])
print("cleaned", len(list(OUT.glob('*.jpg'))))
