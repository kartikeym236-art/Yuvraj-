"""Remove the new Gemini marks from square scene images, in place.

    python pipeline/remove_marks.py projects/<name>/images   [--sheet out.png]

1. New-style sparkle (centre ~853,853 on 1024px): inverse-blends sparkle2_alpha.npy where the
   image edges follow its outline.
2. "AI" pill badge (bottom-right, ~968,974): found by edge template match against ai_badge.png
   (works on light AND dark backgrounds), then inpainted.
Use --no-sparkle for Composio/API Gemini images (they have no sparkle; detection then only darkens).
Always writes a corner contact sheet: LOOK AT IT before rendering (the user caught a missed badge once).
"""
import sys, glob, cv2, numpy as np
from pathlib import Path
HERE = Path(__file__).parent
A = np.load(HERE / "sparkle2_alpha.npy"); C, R = 853, 48; W = (slice(C - R, C + R), slice(C - R, C + R))
GA = A - cv2.GaussianBlur(A, (0, 0), 6)
T = cv2.Canny(cv2.cvtColor(cv2.imread(str(HERE / "ai_badge.png")), cv2.COLOR_BGR2GRAY), 40, 120)

def clean(img, sparkle=True):
    img = cv2.resize(img, (1024, 1024)) if img.shape[:2] != (1024, 1024) else img
    o = img.astype(np.float32); g = o[W].mean(2); hp = g - cv2.GaussianBlur(g, (0, 0), 6)
    sp = sparkle and float((GA * hp).sum() / np.sqrt((GA * GA).sum() * (hp * hp).sum() + 1e-9)) > 0.05
    if sp: a = A[..., None]; o[W] = np.clip((o[W] - 255 * a) / (1 - a), 0, 255)
    o = o.astype(np.uint8)
    e = cv2.Canny(cv2.cvtColor(o[860:1024, 840:1024], cv2.COLOR_BGR2GRAY), 40, 120)
    r = cv2.matchTemplate(e, T, cv2.TM_CCORR_NORMED); bd = r.max() > 0.4
    if bd:
        y, x = np.unravel_index(r.argmax(), r.shape); x += 840; y += 860
        m = np.zeros(o.shape[:2], np.uint8); cv2.rectangle(m, (x - 4, y - 4), (x + T.shape[1] + 4, y + T.shape[0] + 4), 255, -1)
        o = cv2.inpaint(o, m, 9, cv2.INPAINT_TELEA)
    return o, sp, bd

if __name__ == "__main__":
    d = Path(sys.argv[1]); sheet = sys.argv[sys.argv.index("--sheet") + 1] if "--sheet" in sys.argv else str(d.parent / "out" / "corners.png")
    nosp = "--no-sparkle" in sys.argv
    fs = sorted(p for p in d.iterdir() if p.suffix.lower() in (".png", ".jpg", ".jpeg")); tiles = []; ns = nb = 0
    for p in fs:
        o, sp, bd = clean(cv2.imread(str(p)), not nosp); ns += sp; nb += bd; cv2.imwrite(str(p), o)
        t = cv2.resize(o[760:1024, 760:1024], (132, 132)); cv2.putText(t, p.stem[-3:], (2, 12), 0, 0.4, (0, 0, 255), 1); tiles.append(t)
    while len(tiles) % 12: tiles.append(np.zeros_like(tiles[0]))
    Path(sheet).parent.mkdir(parents=True, exist_ok=True)
    cv2.imwrite(sheet, np.vstack([np.hstack(tiles[i:i + 12]) for i in range(0, len(tiles), 12)]))
    print(f"sparkle {ns}, AI badge {nb} of {len(fs)}; check {sheet}")
