#!/usr/bin/env python3
"""Generate "Find the N" puzzle videos.

Each video: a 4:5 puzzle card (random target + look-alike distractor)
centered on a 9:16 black background, 15 s long, with the voiceover.

Usage: python3 generate.py VOICEOVER.mp3 OUT_DIR [COUNT] [SEED]
"""
import os, random, subprocess, sys, zipfile
from PIL import Image, ImageDraw, ImageFont

W, H = 1080, 1920            # 9:16 frame
CW, CH = 1000, 1250          # 4:5 card
COLS, ROWS = 9, 12
DURATION = 15
FONT = "/usr/share/fonts/truetype/freefont/FreeSansBold.ttf"

# digits that are easy to mistake for one another
LOOKALIKE = {
    "0": "689", "1": "74", "2": "7", "3": "859", "4": "1", "5": "638",
    "6": "5809", "7": "12", "8": "36950", "9": "8063",
}

def make_pair(rng, used):
    while True:
        a, b = rng.choice("123456789"), rng.choice("0123456789")
        distractor = a + b
        i = rng.randrange(2)
        pool = [d for d in LOOKALIKE[distractor[i]] if not (i == 0 and d == "0")]
        t = list(distractor); t[i] = rng.choice(pool); target = "".join(t)
        if target != distractor and (target, distractor) not in used:
            used.add((target, distractor))
            return target, distractor

def fit_font(text, max_w, max_h, squeeze=1.0):
    size = 10
    while True:
        f = ImageFont.truetype(FONT, size + 1)
        l, t, r, b = f.getbbox(text)
        if (r - l) * squeeze > max_w or (b - t) > max_h:
            return ImageFont.truetype(FONT, size)
        size += 1

def draw_text_squeezed(img, xy, text, font, squeeze):
    """Draw text horizontally condensed (like the original's tight type)."""
    l, t, r, b = font.getbbox(text)
    tile = Image.new("L", (r - l + 4, b - t + 4), 0)
    ImageDraw.Draw(tile).text((2 - l, 2 - t), text, font=font, fill=255)
    tile = tile.resize((max(1, int(tile.width * squeeze)), tile.height), Image.LANCZOS)
    img.paste((17, 17, 17), (int(xy[0]), int(xy[1])), tile)
    return tile.size

def make_card(target, distractor, rng):
    card = Image.new("RGB", (CW, CH), (246, 246, 244))
    pad_x, pad_top = 55, 50
    # title
    title = f"Find the {target}"
    tf = fit_font(title, CW - 2 * pad_x, 150)
    tw, th = draw_text_squeezed(card, (pad_x, pad_top), title, tf, 1.0)
    # grid
    gx0, gx1 = pad_x, CW - pad_x
    gy0, gy1 = pad_top + th + 45, CH - 45
    cw, ch = (gx1 - gx0) / COLS, (gy1 - gy0) / ROWS
    squeeze = 0.86
    nf = fit_font("88", cw * 0.96, ch * 0.80, squeeze)
    tr, tc = rng.randrange(ROWS), rng.randrange(COLS)
    for r in range(ROWS):
        for c in range(COLS):
            txt = target if (r, c) == (tr, tc) else distractor
            l, t, rr, b = nf.getbbox(txt)
            w, h = (rr - l + 4) * squeeze, b - t + 4
            draw_text_squeezed(card, (gx0 + c * cw + (cw - w) / 2,
                                      gy0 + r * ch + (ch - h) / 2), txt, nf, squeeze)
    return card, (tr + 1, tc + 1)

def main():
    audio, out = sys.argv[1], sys.argv[2]
    count = int(sys.argv[3]) if len(sys.argv) > 3 else 50
    rng = random.Random(int(sys.argv[4]) if len(sys.argv) > 4 else None)
    os.makedirs(out, exist_ok=True)
    used, answers = set(), []
    for n in range(1, count + 1):
        target, distractor = make_pair(rng, used)
        card, pos = make_card(target, distractor, rng)
        frame = Image.new("RGB", (W, H), (0, 0, 0))
        frame.paste(card, ((W - CW) // 2, (H - CH) // 2))
        png = os.path.join(out, f"frame_{n:02d}.png")
        frame.save(png)
        mp4 = os.path.join(out, f"find_the_{n:02d}_{target}.mp4")
        subprocess.run([
            "ffmpeg", "-y", "-v", "error", "-loop", "1", "-framerate", "30", "-i", png,
            "-i", audio, "-t", str(DURATION),
            "-c:v", "libx264", "-tune", "stillimage", "-crf", "20", "-pix_fmt", "yuv420p",
            "-r", "30", "-af", f"afade=t=out:st={DURATION - 0.3}:d=0.3",
            "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", mp4], check=True)
        os.remove(png)
        answers.append(f"{n:02d}  Find the {target}  (distractor {distractor})  "
                       f"answer: row {pos[0]}, column {pos[1]}")
        print(answers[-1], flush=True)
    with open(os.path.join(out, "answers.txt"), "w") as f:
        f.write("\n".join(answers) + "\n")
    zpath = os.path.join(out, "find_the_number_videos.zip")
    with zipfile.ZipFile(zpath, "w", zipfile.ZIP_STORED) as z:
        for name in sorted(os.listdir(out)):
            if name.endswith((".mp4", ".txt")):
                z.write(os.path.join(out, name), name)
    print("zip:", zpath)

if __name__ == "__main__":
    main()
