"""Draft projects/<name>/scenes.json from the scene prompts, then make review sheets.

    python pipeline/draft_scenes.py projects/<name> [--prompts prompts/<name>/scenes.py] [--force]
    python pipeline/draft_scenes.py projects/<name> --sheets-only

How the draft is made:
  * Lines: the narration chunks from prompts/<name>/scenes.py (one prompt = one image),
    re-cut from the project's script.txt so {display|spoken} numbers survive.
    Without a scenes.py, lines are split at punctuation (Claude re-splits them).
  * Images: Gemini filenames end in a microsecond timestamp (..._1794339504419622.jpg),
    and the user generates scenes in prompt order, so sorting by that number gives a
    near-correct scene order (in past projects 75-97% of neighbours were already right).
  * Exact duplicate uploads are dropped (reported).

It always writes review sheets out/review/sheet_NN.jpg: 12 tiles each showing the image
with its scene number and narration line, so a mismatch is visible at a glance.
The draft is a starting point: Claude views every sheet and fixes scenes.json.
"""
import argparse
import importlib.util
import json
import re
import textwrap
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont

FONT = "/usr/share/fonts/opentype/inter/Inter-Bold.otf"
TOKEN = re.compile(r"\{([^|{}]+)\|([^{}]+)\}(\S*)|\S+")


def gemini_key(p: Path):
    m = re.search(r"_(\d{13,})$", p.stem)
    return (0, int(m.group(1)), p.name) if m else (1, 0, p.name)


def norm(s: str) -> str:
    return re.sub(r"[^a-z0-9]", "", s.lower())


def load_prompt_lines(path: Path):
    spec = importlib.util.spec_from_file_location("scenes_mod", path)
    mod = importlib.util.module_from_spec(spec)
    import sys
    sys.path.insert(0, str(path.parent.parent))
    spec.loader.exec_module(mod)
    return [s[0] for s in mod.SCENES]


def recut(script: str, prompt_lines):
    """Cut the raw script into the prompt lines, keeping {display|spoken} tokens intact."""
    raw = [m.group(0) for m in TOKEN.finditer(script.replace("—", " — "))]
    disp = [m.group(1) + m.group(3) if m.group(1) else m.group(0)
            for m in TOKEN.finditer(script.replace("—", " — "))]
    out, i = [], 0
    for line in prompt_lines:
        target = norm(line)
        got, j = "", i
        while j < len(raw) and len(got) < len(target):
            got += norm(disp[j]); j += 1
        if got != target:
            raise ValueError(f"prompt line {line!r} does not match script.txt near "
                             f"{' '.join(disp[i:i + 8])!r}")
        out.append(" ".join(raw[i:j]).replace(" — ", " — ")); i = j
    if i < len(raw):
        print(f"note: {len(raw) - i} script words after the last prompt line were added as extra lines")
        out += punct_split(" ".join(raw[i:]))
    return out


def punct_split(text: str):
    parts = re.split(r"(?<=[,.?!;:])\s+", text.strip())
    return [p for p in parts if p]


def dedupe(images):
    seen, keep, dropped = [], [], []
    for p in images:
        a = np.asarray(Image.open(p).convert("L").resize((32, 32)), dtype=np.float32)
        dup = next((q for q, b in seen if np.abs(a - b).mean() < 1.0), None)
        if dup:
            dropped.append((p.name, dup.name))
        else:
            seen.append((p, a)); keep.append(p)
    return keep, dropped


def sheets(proj: Path, scenes, per=12, cols=4, tile=360):
    out = proj / "out" / "review"
    out.mkdir(parents=True, exist_ok=True)
    for old in out.glob("sheet_*.jpg"):
        old.unlink()
    font = ImageFont.truetype(FONT, 22)
    small = ImageFont.truetype(FONT, 18)
    cap_h = 78
    paths = []
    for s in range(0, len(scenes), per):
        chunk = scenes[s:s + per]
        rows = (len(chunk) + cols - 1) // cols
        sheet = Image.new("RGB", (cols * tile, rows * (tile + cap_h)), "white")
        d = ImageDraw.Draw(sheet)
        for k, sc in enumerate(chunk):
            x, y = (k % cols) * tile, (k // cols) * (tile + cap_h)
            img = Image.open(proj / "images" / sc["image"]).convert("RGB").resize((tile - 6, tile - 6))
            sheet.paste(img, (x + 3, y + 3))
            d.rectangle([x + 3, y + 3, x + 58, y + 33], fill="black")
            d.text((x + 8, y + 5), f"{s + k + 1}", font=font, fill="yellow")
            line = textwrap.shorten(sc["line"], 70, placeholder="…")
            for n, part in enumerate(textwrap.wrap(line, 34)[:2]):
                d.text((x + 6, y + tile + 4 + n * 22), part, font=small, fill="black")
            d.text((x + 6, y + tile + 50), sc["image"][:38], font=ImageFont.truetype(FONT, 13), fill="grey")
        p = out / f"sheet_{s // per + 1:02d}.jpg"
        sheet.save(p, quality=85)
        paths.append(p)
    return paths


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("project", type=Path)
    ap.add_argument("--prompts", type=Path)
    ap.add_argument("--force", action="store_true", help="overwrite an existing scenes.json")
    ap.add_argument("--sheets-only", action="store_true", help="only rebuild review sheets from scenes.json")
    a = ap.parse_args()
    proj = a.project.resolve()
    sj = proj / "scenes.json"

    if not a.sheets_only:
        if sj.exists() and not a.force:
            raise SystemExit(f"{sj} exists; pass --force to redraft, or --sheets-only to review it")
        script = (proj / "script.txt").read_text(encoding="utf-8")
        pfile = a.prompts or (proj.parents[1] / "prompts" / proj.name / "scenes.py")
        lines = None
        if pfile.exists():
            try:
                lines = recut(script, load_prompt_lines(pfile))
                print(f"{len(lines)} lines from {pfile.relative_to(proj.parents[1])}")
            except ValueError as e:   # transcription differs from the prompt script
                print(f"{e}\nfalling back to punctuation split; re-split by the prompt lines while reviewing")
        if lines is None:
            lines = punct_split(script.replace("\n", " "))
            print(f"{len(lines)} lines split at punctuation" + ("" if pfile.exists() else f" (no {pfile.name})"))
        images = sorted((p for p in (proj / "images").iterdir()
                         if p.suffix.lower() in {".jpg", ".jpeg", ".png", ".webp"}), key=gemini_key)
        images, dropped = dedupe(images)
        for d, k in dropped:
            print(f"duplicate upload skipped: {d} (same as {k})")
        print(f"{len(images)} images, {len(lines)} lines")
        if len(images) != len(lines):
            print("COUNTS DIFFER: merge lines (fewer images) or split lines (more images) while reviewing.")
        n = min(len(images), len(lines))
        scenes = [{"line": lines[k], "image": images[k].name} for k in range(n)]
        if len(lines) > n:                          # extra lines ride on the last image for now
            scenes[-1]["line"] += " " + " ".join(lines[n:])
        unused = [p.name for p in images[n:]]
        if unused:
            print(f"unused images (place them while reviewing): {unused}")
        sj.write_text(json.dumps(scenes, indent=1, ensure_ascii=False))
        print(f"wrote draft {sj.relative_to(proj.parents[1])}")
    scenes = json.loads(sj.read_text())
    for p in sheets(proj, scenes):
        print(f"review sheet: {p.relative_to(proj.parents[1])}")


if __name__ == "__main__":
    main()
