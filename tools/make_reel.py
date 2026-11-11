"""Assemble a 9:16 reel from scene images + background music + top caption.

Layout matches the reference reels: black 1080x1920 canvas, hook caption at the
top (white, last word yellow), square scene image in the middle with a slow zoom.
Each image stays on screen for its scene's narration time (from the prompts
file), so cuts land on the script beats.

Usage:
  python tools/make_reel.py prompts/vanished/scenes.py \
      --images images/vanished --music path/to/music.mp3 \
      --caption "TALENT WHICH THEY VANISHED" --out reel.mp4

Images: name them by scene number, e.g. 1.png, 01.jpg, scene_01.webp.
Missing scenes get a dark placeholder card, so you can preview before all
images are ready. Optional --voice adds a voiceover on top of the music.
"""
import argparse
import importlib.util
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "prompts"))
from build_prompts import WORDS_PER_SEC, spoken_words  # noqa: E402

W, H = 1080, 1920
IMG_SIZE = 1080
IMG_Y = 470            # top of the square image
CAPTION_GAP = 60       # space between caption bottom and image top
FPS = 30
YELLOW = (232, 200, 74)
FONT_CANDIDATES = [
    "/usr/share/fonts/opentype/inter/Inter-Bold.otf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
]


def font(size):
    for p in FONT_CANDIDATES:
        if Path(p).exists():
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()


def load_scenes(path):
    spec = importlib.util.spec_from_file_location("scenes_mod", path)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    scenes = mod.SCENES[: getattr(mod, "LIMIT", None) or len(mod.SCENES)]
    return [(text, spoken_words(text) / WORDS_PER_SEC) for text, _, _ in scenes]


def caption_png(text, highlight, dest):
    """Transparent overlay with the hook caption; `highlight` words drawn yellow."""
    canvas = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(canvas)
    words = text.split()
    hl = {w.upper() for w in highlight.split()} if highlight else {words[-1].upper()}
    size = 78
    while True:
        f = font(size)
        space = d.textlength(" ", font=f)
        lines, cur = [], []
        for w in words:                       # greedy wrap to 960px
            trial = cur + [w]
            if cur and sum(d.textlength(x, font=f) for x in trial) + space * (len(trial) - 1) > 960:
                lines.append(cur)
                cur = [w]
            else:
                cur = trial
        lines.append(cur)
        if len(lines) == 1 or size <= 56:
            break
        size -= 4
    line_h = int(size * 1.2)
    y = IMG_Y - CAPTION_GAP - line_h * len(lines)
    for line in lines:
        width = sum(d.textlength(x, font=f) for x in line) + space * (len(line) - 1)
        x = (W - width) / 2
        for w in line:
            fill = YELLOW if w.upper().strip(",.!?") in hl else (255, 255, 255)
            d.text((x, y), w, font=f, fill=fill, stroke_width=2, stroke_fill=(0, 0, 0))
            x += d.textlength(w, font=f) + space
        y += line_h
    canvas.save(dest)


def find_image(folder, n):
    if not folder or not folder.exists():
        return None
    for p in sorted(folder.iterdir()):
        m = re.fullmatch(r"(?:scene[_-]?)?0*(\d+)\.(png|jpe?g|webp)", p.name, re.I)
        if m and int(m.group(1)) == n:
            return p
    return None


def placeholder(n, text, dest):
    img = Image.new("RGB", (IMG_SIZE, IMG_SIZE), (38, 40, 46))
    d = ImageDraw.Draw(img)
    d.text((IMG_SIZE / 2, 470), f"Scene {n}", font=font(90), fill=(200, 200, 200), anchor="mm")
    d.text((IMG_SIZE / 2, 590), f"“{text}”", font=font(40), fill=(150, 150, 150), anchor="mm")
    img.save(dest)


def square(src, dest):
    """Center-crop to a square at 2x size (smoother zoom)."""
    img = Image.open(src).convert("RGB")
    s = min(img.size)
    left, top = (img.width - s) // 2, (img.height - s) // 2
    img.crop((left, top, left + s, top + s)).resize((IMG_SIZE * 2, IMG_SIZE * 2), Image.LANCZOS).save(dest)


def run(cmd):
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("scenes", type=Path)
    ap.add_argument("--images", type=Path)
    ap.add_argument("--music", type=Path)
    ap.add_argument("--music-start", type=float, default=0.0, help="seconds into the track to start")
    ap.add_argument("--music-volume", type=float, default=1.0)
    ap.add_argument("--voice", type=Path, help="optional voiceover file")
    ap.add_argument("--caption", default="")
    ap.add_argument("--highlight", default="", help="caption words to colour yellow (default: last word)")
    ap.add_argument("--out", type=Path, default=Path("reel.mp4"))
    a = ap.parse_args()

    scenes = load_scenes(a.scenes)
    total = sum(d for _, d in scenes)
    tmp = Path(tempfile.mkdtemp(prefix="reel_"))
    try:
        cap = tmp / "caption.png"
        caption_png(a.caption, a.highlight, cap)
        missing, clips = [], []
        for i, (text, dur) in enumerate(scenes, 1):
            src = find_image(a.images, i)
            sq = tmp / f"sq_{i:03d}.png"
            if src:
                square(src, sq)
            else:
                missing.append(i)
                ph = tmp / f"ph_{i:03d}.png"
                placeholder(i, text, ph)
                square(ph, sq)
            frames = max(1, round(dur * FPS))
            clip = tmp / f"clip_{i:03d}.mp4"
            zoom = (f"zoompan=z='1+0.06*on/{frames}':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)'"
                    f":d={frames}:s={IMG_SIZE}x{IMG_SIZE}:fps={FPS}")
            run(["ffmpeg", "-y", "-i", str(sq), "-i", str(cap),
                 "-f", "lavfi", "-i", f"color=black:s={W}x{H}:r={FPS}:d={frames / FPS:.3f}",
                 "-filter_complex",
                 f"[0:v]{zoom},setsar=1[img];[2:v][img]overlay=0:{IMG_Y}[bg];[bg][1:v]overlay=0:0,format=yuv420p[v]",
                 "-map", "[v]", "-frames:v", str(frames), "-c:v", "libx264", "-preset", "veryfast",
                 "-crf", "18", str(clip)])
            clips.append(clip)

        lst = tmp / "list.txt"
        lst.write_text("".join(f"file '{c}'\n" for c in clips))
        video = tmp / "video.mp4"
        run(["ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", str(lst), "-c", "copy", str(video)])

        cmd = ["ffmpeg", "-y", "-i", str(video)]
        filters, mix = [], []
        if a.music:
            cmd += ["-ss", str(a.music_start), "-i", str(a.music)]
            filters.append(f"[{len(mix) + 1}:a]volume={a.music_volume},afade=t=in:d=1,"
                           f"afade=t=out:st={max(0, total - 2):.2f}:d=2[m]")
            mix.append("[m]")
        if a.voice:
            cmd += ["-i", str(a.voice)]
            filters.append(f"[{len(mix) + 1}:a]anull[vo]")
            mix.append("[vo]")
        if mix:
            out_a = mix[0] if len(mix) == 1 else "[a]"
            if len(mix) > 1:
                filters.append(f"{''.join(mix)}amix=inputs={len(mix)}:duration=first:normalize=0[a]")
            cmd += ["-filter_complex", ";".join(filters), "-map", "0:v", "-map", out_a,
                    "-c:a", "aac", "-b:a", "192k"]
        cmd += ["-c:v", "copy", "-t", f"{total:.2f}", "-movflags", "+faststart", str(a.out)]
        run(cmd)
    finally:
        shutil.rmtree(tmp, ignore_errors=True)

    print(f"Wrote {a.out}  ({total:.1f}s, {len(scenes)} scenes)")
    if missing:
        print(f"Placeholders used for {len(missing)} scene(s): {missing[:10]}{' ...' if len(missing) > 10 else ''}")


if __name__ == "__main__":
    main()
