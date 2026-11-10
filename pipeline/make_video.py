"""One-command short-video pipeline.

    python pipeline/make_video.py projects/<name>            # full run
    python pipeline/make_video.py projects/<name> --speed 1.0

Project folder layout (see CLAUDE.md):
    images/        scene images (any names, any order)
    voiceover.*    narration audio (mp3/wav/m4a)
    music.*        background music (optional)
    title.txt      top caption; wrap the highlighted word(s) in *stars*
    script.txt     exact voiceover text (needed for word timing)
    scenes.json    [{"line": "...", "image": "file.jpg"}, ...] in narration order;
                   written by Claude after matching each line to an image

Steps: forced-align script to audio -> cap long pauses -> remove sparkle watermark -> scene
timeline -> 9:16 render with title, one-word captions and ducked music.
Outputs go to <project>/out/.
"""
import argparse, csv, json, re, subprocess
from pathlib import Path

import cv2
import numpy as np
from pocketsphinx import Decoder

HERE = Path(__file__).parent
W, H, IMG_Y, IMG = 1080, 1920, 420, 1080
YELLOW = "&H0016C8FF"            # ASS BGR for #FFC816
AUDIO_EXT = (".mp3", ".wav", ".m4a", ".aac", ".ogg", ".flac")


def find(proj, stem):
    for p in sorted(proj.iterdir()):
        if p.stem.lower().startswith(stem) and p.suffix.lower() in AUDIO_EXT:
            return p
    return None


def norm(w):
    return re.sub(r"[^a-z']", "", w.lower())


def duration(path):
    return float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                                          "-of", "csv=p=0", str(path)]).decode())


# 1. forced alignment ---------------------------------------------------------
def _align_chunk(data, words, offset, pad=0.3):
    data = bytes(int(pad * 16000) * 2) + data + bytes(int(pad * 16000) * 2)   # silence the decoder can rest in
    offset -= pad
    d = Decoder(samprate=16000, loglevel="FATAL")
    d.set_align_text(" ".join(words))
    d.start_utt(); d.process_raw(data, full_utt=True); d.end_utt()
    d.set_alignment()
    d.start_utt(); d.process_raw(data, full_utt=True); d.end_utt()
    al = [(re.sub(r"\(\d+\)", "", w.name), offset + w.start / 100, offset + (w.start + w.duration) / 100)
          for w in d.get_alignment() if w.name != "<sil>"]
    if [a[0] for a in al] != words:
        raise RuntimeError("word mismatch")
    return al


def _recognise(data):
    d = Decoder(samprate=16000, loglevel="FATAL")
    d.start_utt(); d.process_raw(data, full_utt=True); d.end_utt()
    return [(re.sub(r"\(\d+\)", "", s.word), s.start_frame / 100, s.end_frame / 100)
            for s in d.seg() if s.word[0] not in "<[" ]


def align(voice, script, out):
    """Word-level forced alignment of script.txt to the voiceover.

    Tries the whole script at once; if pocketsphinx gives up (long or slightly
    mismatched audio), aligns sentence by sentence, cutting the audio at the
    pauses between sentences found by a rough recognition pass.
    """
    raw = out / "voice16k.raw"
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", str(voice), "-ar", "16000", "-ac", "1",
                    "-f", "s16le", str(raw)], check=True)
    data = raw.read_bytes(); raw.unlink()
    words = [norm(w) for w in script.split() if norm(w)]
    lex = Decoder(samprate=16000, loglevel="FATAL")
    oov = sorted({w for w in words if lex.lookup_word(w) is None})
    if oov:
        raise SystemExit(f"Words not in pronunciation dictionary: {oov}. "
                         "Spell them phonetically in script.txt (e.g. 'Jensen' -> 'jen sen').")
    try:
        al = _align_chunk(data, words, 0.0)
    except RuntimeError:
        al = _align_by_sentence(data, script, words)
    (out / "word_alignment.json").write_text(json.dumps(al))
    return al


def _align_by_sentence(data, script, words):
    import difflib
    sents, cur = [], []
    for tok in script.split():
        if norm(tok):
            cur.append(norm(tok))
        if re.search(r"[.!?][\"')\]]*$", tok) and cur:
            sents.append(cur); cur = []
    if cur:
        sents.append(cur)
    rec = _recognise(data)
    sm = difflib.SequenceMatcher(None, words, [r[0] for r in rec], autojunk=False)
    t_of = {}
    for b in sm.get_matching_blocks():
        for k in range(b.size):
            t_of[b.a + k] = rec[b.b + k]
    total = len(data) / 32000
    # boundary between sentences = middle of the gap between last matched word and next matched word
    bounds, idx = [0.0], 0
    for s in sents[:-1]:
        idx += len(s)
        prev = max((t_of[i][2] for i in range(idx) if i in t_of), default=bounds[-1])
        nxt = min((t_of[i][1] for i in range(idx, len(words)) if i in t_of), default=total)
        bounds.append(max((prev + nxt) / 2, bounds[-1]))
    bounds.append(total)
    al, bad = [], []
    for k, s in enumerate(sents):
        for pad in (0.0, 0.3, 0.6):
            a, b = max(bounds[k] - pad, 0), min(bounds[k + 1] + pad, total)
            chunk = data[int(a * 16000) * 2:int(b * 16000) * 2]
            try:
                al += _align_chunk(chunk, s, a); break
            except RuntimeError:
                continue
        else:
            bad.append(" ".join(s))
    if bad:
        raise SystemExit("These sentences don't match the audio; check script.txt against the voiceover:\n  "
                         + "\n  ".join(bad))
    return al


# 1b. shorten long pauses ----------------------------------------------------
def tighten(voice, al, out, max_gap):
    """Cap every silence (incl. lead-in/tail) at max_gap seconds; return new audio + remapped words."""
    total = duration(voice)
    cuts = []                                   # (start, end) of removed audio
    if al[0][1] > max_gap / 2:
        cuts.append((0.0, al[0][1] - max_gap / 2))
    for (_, _, e), (_, s, _) in zip(al, al[1:]):
        if s - e > max_gap:
            cuts.append((e + max_gap / 2, s - max_gap / 2))
    if total - al[-1][2] > max_gap:
        cuts.append((al[-1][2] + max_gap, total))
    if not cuts:
        return voice, al, 0.0
    keep, t = [], 0.0
    for a, b in cuts:
        if a > t:
            keep.append((t, a))
        t = b
    if t < total:
        keep.append((t, total))

    def remap(x):
        return x - sum(min(b, x) - a for a, b in cuts if a < x)

    fc = "".join(f"[0:a]atrim={a:.3f}:{b:.3f},asetpts=PTS-STARTPTS,afade=t=in:d=0.01,"
                 f"afade=t=out:st={max(b - a - 0.01, 0):.3f}:d=0.01[s{i}];" for i, (a, b) in enumerate(keep))
    fc += "".join(f"[s{i}]" for i in range(len(keep))) + f"concat=n={len(keep)}:v=0:a=1[a]"
    tight = out / "voice_tight.wav"
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", str(voice), "-filter_complex", fc,
                    "-map", "[a]", str(tight)], check=True)
    new = [(w, round(remap(s), 3), round(remap(e), 3)) for w, s, e in al]
    (out / "word_alignment_tight.json").write_text(json.dumps(new))
    return tight, new, sum(b - a for a, b in cuts)


# 2. watermark removal --------------------------------------------------------
def clean_images(img_dir, out):
    """Invert the Gemini sparkle (white, ~35% opacity, centre 922,922 on 1024px) when present."""
    alpha = np.load(HERE / "wm_alpha.npy")
    alpha = np.where(alpha > 0.04, alpha, 0)
    C, R = 922, alpha.shape[0] // 2
    shape = (alpha > 0.15).astype(np.uint8)
    k = np.ones((7, 7), np.uint8)
    inner = (shape - cv2.erode(shape, k)).astype(bool)    # thin band just inside the sparkle
    outer = (cv2.dilate(shape, k) - shape).astype(bool)   # thin band just outside it
    a = alpha[..., None]

    def step(x):   # brightness jump across the sparkle outline
        g = x.mean(2)
        return np.median(g[inner]) - np.median(g[outer])

    gx_a = cv2.Sobel(alpha.astype(np.float32), cv2.CV_32F, 1, 0)
    gy_a = cv2.Sobel(alpha.astype(np.float32), cv2.CV_32F, 0, 1)
    band = np.hypot(gx_a, gy_a) > 0.02
    ga = np.concatenate([gx_a[band], gy_a[band]])

    def shape_corr(x):   # do the image's edges follow the sparkle outline? (~0 clean, >0.2 marked)
        g = x.mean(2).astype(np.float32)
        gi = np.concatenate([cv2.Sobel(g, cv2.CV_32F, 1, 0)[band], cv2.Sobel(g, cv2.CV_32F, 0, 1)[band]])
        return float((ga * gi).sum() / np.sqrt((ga * ga).sum() * (gi * gi).sum() + 1e-9))

    dst = out / "clean"; dst.mkdir(exist_ok=True)
    report = {}
    for p in sorted(img_dir.iterdir()):
        if p.suffix.lower() not in (".jpg", ".jpeg", ".png", ".webp"):
            continue
        img = cv2.imread(str(p), cv2.IMREAD_COLOR)
        img = cv2.resize(img, (1024, 1024), interpolation=cv2.INTER_AREA) if img.shape[:2] != (1024, 1024) else img
        f = img.astype(float)
        win = f[C-R:C+R, C-R:C+R]
        fixed = np.clip((win - 255 * a) / (1 - a), 0, 255)
        # apply if the sparkle shows as a brightness jump at its outline, or its edges are in the image
        has_mark = (step(win) > 4 and abs(step(fixed)) < 0.5 * step(win)) or shape_corr(win) > 0.2
        if has_mark:
            f[C-R:C+R, C-R:C+R] = fixed
        report[p.name] = bool(has_mark)
        cv2.imwrite(str(dst / (p.stem + ".jpg")), f.astype(np.uint8), [cv2.IMWRITE_JPEG_QUALITY, 95])
    return dst, report


# 3. timeline -----------------------------------------------------------------
def timeline(scenes, al, total, out):
    i, rows = 0, []
    for k, sc in enumerate(scenes):
        ws = [norm(w) for w in sc["line"].split() if norm(w)]
        got = [a[0] for a in al[i:i + len(ws)]]
        if got != ws:
            raise SystemExit(f"scenes.json line {k+1} {sc['line']!r} does not match narration at that point: {got}")
        rows.append(dict(scene=k + 1, start=0.0 if k == 0 else al[i][1], line=sc["line"], image=sc["image"]))
        i += len(ws)
    if i != len(al):
        raise SystemExit(f"scenes.json covers {i} of {len(al)} words; every word must belong to a scene.")
    for k, r in enumerate(rows):
        r["end"] = rows[k + 1]["start"] if k + 1 < len(rows) else total
        r["duration"] = round(r["end"] - r["start"], 3)
    with open(out / "timeline.csv", "w", newline="") as fh:
        w = csv.DictWriter(fh, fieldnames=["scene", "start", "end", "duration", "line", "image"])
        w.writeheader(); w.writerows(rows)
    return rows


# 4. render -------------------------------------------------------------------
def ass_time(x):
    return f"{int(x//3600)}:{int(x%3600//60):02}:{x%60:05.2f}"


def srt_time(x):
    return f"{int(x//3600):02}:{int(x%3600//60):02}:{int(x%60):02},{int(round(x%1*1000)):03}"


def build_ass(title, script, al, speed, dur, out):
    display = [re.sub(r"[,.:;\"“”‘’]|^'|'$", "", t) for t in script.split() if norm(t)]
    cap_size = round(78 * 0.6 * IMG / 1024)
    ev, srt = [], []
    for i, ((_, s, e), w) in enumerate(zip(al, display)):
        s, e = s / speed, e / speed
        nxt = al[i + 1][1] / speed if i + 1 < len(al) else dur
        end = min(nxt if nxt - e < 0.25 else e + 0.15, nxt)
        ev.append(f"Dialogue: 1,{ass_time(s)},{ass_time(end)},Cap,,0,0,0,,"
                  f"{{\\pos({W//2},{IMG_Y + IMG//2})\\fscx85\\fscy85\\t(0,80,\\fscx100\\fscy100)}}{w.upper()}")
        srt.append(f"{i+1}\n{srt_time(s)} --> {srt_time(end)}\n{w.upper()}\n")
    if title:
        t = re.sub(r"\*(.+?)\*", lambda m: f"{{\\c{YELLOW}}}{m.group(1)}{{\\c&H00FFFFFF}}", title.strip())
        plain = len(re.sub(r"\*", "", title.strip()))
        size = min(66, int(66 * 29 / max(plain, 1)))   # 66px fits ~29 chars on one line
        ev.append(f"Dialogue: 0,{ass_time(0)},{ass_time(dur + 1)},Title,,0,0,0,,"
                  f"{{\\pos({W//2},{IMG_Y - 28})\\fs{size}}}{t}")
    (out / "words.srt").write_text("\n".join(srt))
    ass = out / "subs.ass"
    ass.write_text(f"""[Script Info]
ScriptType: v4.00+
PlayResX: {W}
PlayResY: {H}
WrapStyle: 2

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Cap,Inter Black,{cap_size},&H00FFFFFF,&H00FFFFFF,&H00000000,&H80000000,-1,0,0,0,100,100,1,0,1,4,2,5,0,0,0,1
Style: Title,Inter Display Black,66,&H00FFFFFF,&H00FFFFFF,&H00000000,&H99000000,-1,0,0,0,100,100,-1,0,1,0,4,2,0,0,0,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
""" + "\n".join(ev) + "\n")
    return ass


def render(rows, clean_dir, voice, music, ass, speed, dur, out, name):
    concat = out / "scenes.ffconcat"
    lines = ["ffconcat version 1.0"]
    for r in rows:
        lines += [f"file '{(clean_dir / (Path(r['image']).stem + '.jpg')).resolve()}'", f"duration {r['duration']}"]
    lines.append(f"file '{(clean_dir / (Path(rows[-1]['image']).stem + '.jpg')).resolve()}'")
    concat.write_text("\n".join(lines) + "\n")
    inputs = ["-f", "concat", "-safe", "0", "-i", str(concat), "-i", str(voice)]
    fc = (f"[0:v]scale={IMG}:{IMG},setpts=PTS/{speed},fps=30,pad={W}:{H}:0:{IMG_Y}:black,"
          f"ass={ass},format=yuv420p[v];"
          f"[1:a]atempo={speed},loudnorm=I=-15:TP=-1.5:LRA=11,aresample=48000[vo];")
    if music:
        inputs += ["-stream_loop", "-1", "-i", str(music)]   # loops if music is shorter than the video
        fc += (f"[2:a]atrim=0:{dur:.2f},asetpts=PTS-STARTPTS,loudnorm=I=-33:TP=-9,"
               f"afade=t=in:d=1,afade=t=out:st={max(dur-2.5, 0):.2f}:d=2.5,"
               # duration=longest: with "first", amix stops when the voice signals EOF and drops the
               # ~3 s loudnorm still has buffered (the narration's last words). Music is trimmed to dur anyway.
               f"aresample=48000[bg];[vo][bg]amix=inputs=2:duration=longest:normalize=0,alimiter=limit=0.89[a]")
    else:
        fc += "[vo]alimiter=limit=0.89,aresample=48000[a]"
    mp4 = out / f"{name}.mp4"
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", *inputs, "-filter_complex", fc,
                    "-map", "[v]", "-map", "[a]", "-c:v", "libx264", "-crf", "20", "-preset", "medium",
                    "-c:a", "aac", "-b:a", "192k", "-t", f"{dur:.2f}", "-movflags", "+faststart", str(mp4)],
                   check=True)
    return mp4


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("project", type=Path)
    ap.add_argument("--speed", type=float, default=1.10)
    ap.add_argument("--max-gap", type=float, default=0.3,
                    help="longest pause kept in the voiceover, seconds (0 = keep pauses as recorded)")
    ap.add_argument("--align-only", action="store_true", help="stop after alignment (to write scenes.json)")
    a = ap.parse_args()
    proj = a.project.resolve()
    out = proj / "out"; out.mkdir(exist_ok=True)
    voice, music = find(proj, "voice"), find(proj, "music")
    script = (proj / "script.txt").read_text(encoding="utf-8")
    title = (proj / "title.txt").read_text(encoding="utf-8") if (proj / "title.txt").exists() else ""
    if not voice:
        raise SystemExit("No voiceover.* audio file in project folder.")

    al = align(voice, script, out)
    print(f"aligned {len(al)} words")
    if a.align_only:
        return
    if a.max_gap > 0:
        voice, al, cut = tighten(voice, al, out, a.max_gap)
        print(f"trimmed {cut:.1f}s of pauses (max gap {a.max_gap}s)")
    clean_dir, wm = clean_images(proj / "images", out)
    print(f"watermark removed from {sum(wm.values())}/{len(wm)} images")
    scenes = json.loads((proj / "scenes.json").read_text())
    missing = [s["image"] for s in scenes if not (proj / "images" / s["image"]).exists()]
    if missing:
        raise SystemExit(f"scenes.json references missing images: {missing}")
    dur = duration(voice) / a.speed
    rows = timeline(scenes, al, duration(voice), out)   # original-audio seconds; setpts speeds video
    ass = build_ass(title, script, al, a.speed, dur, out)
    mp4 = render(rows, clean_dir, voice, music, ass, a.speed, dur, out, proj.name)
    print(f"done: {mp4}  ({dur:.1f}s)")


if __name__ == "__main__":
    main()
