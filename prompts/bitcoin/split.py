"""Split 2x2 Gemini grids into panels: remove sparkle, find gutters, crop, FSRCNN x3 upscale to 1920x1080."""
import sys, json, shutil, tempfile, re
from pathlib import Path
import cv2, numpy as np
sys.path.insert(0, str(Path(__file__).resolve().parents[2] / "pipeline"))
import make_video as mv
src, order, mapping, dst = Path(sys.argv[1]), json.load(open(sys.argv[2])), json.load(open(sys.argv[3])), Path(sys.argv[4])
dst.mkdir(parents=True, exist_ok=True)
tmp = Path(tempfile.mkdtemp()); (tmp/"in").mkdir()
for i, f in enumerate(order): shutil.copy(src/f, tmp/"in"/f"{i:03d}.jpg")
clean, rep = mv.clean_images(tmp/"in", tmp)
print("sparkle removed", sum(rep.values()), "/", len(rep))
sr = cv2.dnn_superres.DnnSuperResImpl_create(); sr.readModel(str(Path.home()/"sr/FSRCNN_x3.pb")); sr.setModel("fsrcnn", 3)
def gutter(prof, lo, hi):
    c = [x for x in range(lo, hi) if prof[x][0] > 238 and prof[x][1] < 8]
    return (min(c), max(c)) if c else ((lo+hi)//2, (lo+hi)//2)
for i, g in enumerate(mapping):   # g = grid number for file i
    img = cv2.imread(str(clean/f"{i:03d}.jpg")); h, w = img.shape[:2]; gr = img.mean(2)
    cx = gutter([(gr[:, x].mean(), gr[:, x].std()) for x in range(w)], int(w*.45), int(w*.55))
    cy = gutter([(gr[y, :].mean(), gr[y, :].std()) for y in range(h)], int(h*.45), int(h*.55))
    boxes = [(0, cx[0]-1, 0, cy[0]-1), (cx[1]+2, w, 0, cy[0]-1), (0, cx[0]-1, cy[1]+2, h), (cx[1]+2, w, cy[1]+2, h)]
    for k, (x0, x1, y0, y1) in enumerate(boxes):
        p = img[y0+2:y1-2, x0+2:x1-2]
        u = cv2.resize(sr.upsample(p), (1920, 1080), interpolation=cv2.INTER_AREA)
        bl = cv2.GaussianBlur(u, (0, 0), 1.2); u = cv2.addWeighted(u, 1.25, bl, -0.25, 0)
        cv2.imwrite(str(dst/f"g{g:03d}_{k+1}.jpg"), u, [cv2.IMWRITE_JPEG_QUALITY, 93])
