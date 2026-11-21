"""Remove plain light borders/frames that image generators sometimes draw.

    python pipeline/crop_borders.py projects/<name>/images

Finds the bright, uniform margin on all four sides, crops just inside the
drawn frame line and resizes back to the original size. Images without a
border are left untouched.
"""
import sys
from pathlib import Path
import numpy as np
from PIL import Image


def inner_box(a):
    h, w = a.shape
    def edge(lines):
        for i, line in enumerate(lines):
            if line.mean() < 200 or line.std() > 25:
                return i
        return 0
    t = edge(a); b = edge(a[::-1]); l = edge(a.T); r = edge(a.T[::-1])
    pad = 14                                  # skip the dark frame line itself
    return l + pad, t + pad, w - r - pad, h - b - pad


def main(d):
    for p in sorted(Path(d).iterdir()):
        if p.suffix.lower() not in (".jpg", ".jpeg", ".png"):
            continue
        im = Image.open(p).convert("RGB")
        a = np.asarray(im.convert("L"), float)
        strips = [a[:20], a[-20:], a[:, :20], a[:, -20:]]
        if not all(s.mean() > 200 and s.std() < 18 for s in strips):
            continue
        box = inner_box(a)
        if box[2] - box[0] < im.width * 0.6 or box[3] - box[1] < im.height * 0.6:
            continue
        im.crop(box).resize(im.size, Image.LANCZOS).save(p, quality=95)
        print("cropped", p.name, box)


if __name__ == "__main__":
    main(sys.argv[1])
