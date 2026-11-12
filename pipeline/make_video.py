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
CAP_Y = IMG_Y + round(IMG * 0.82)   # captions in the lower part of the image, like the reference reels
YELLOW = "&H0016C8FF"            # ASS BGR for #FFC816
AUDIO_EXT = (".mp3", ".wav", ".m4a", ".aac", ".ogg", ".flac")


def find(proj, stem):
    for p in sorted(proj.iterdir()):
        if p.stem.lower().startswith(stem) and p.suffix.lower() in AUDIO_EXT:
            return p
    return None


def decoder():
    d = Decoder(samprate=16000, loglevel="FATAL")
    for line in (HERE / "extra_dict.txt").read_text().splitlines():
        if line.strip() and not line.startswith("#"):
            word, phones = line.split(None, 1)
            if d.lookup_word(word) is None:
                d.add_word(word, phones.strip(), True)
    return d


def tokens(text):
    """Split script text into (display, [spoken words]).

    {2017|twenty seventeen} shows "2017" as one caption but aligns the spoken words.
    """
    out = []
    for m in re.finditer(r"\{([^|{}]+)\|([^{}]+)\}(\S*)|\S+", text):
        if m.group(1):
            out.append((m.group(1) + m.group(3), [norm(x) for x in m.group(2).split() if norm(x)]))
        elif norm(m.group(0)):
            out.append((m.group(0), [norm(m.group(0))]))
        elif re.search(r"\d", m.group(0)):
            raise SystemExit(f"Number {m.group(0)!r} needs its spoken form, e.g. {{2017|twenty seventeen}}")
    return out


def spoken(text):
    return [w for _, ws in tokens(text) for w in ws]


def norm(w):
    return re.sub(r"[^a-z']", "", w.lower())


def duration(path):
    return float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                                          "-of", "csv=p=0", str(path)]).decode())


# 1. forced alignment ---------------------------------------------------------
def _align_chunk(data, words, offset, pad=0.3):
    data = bytes(int(pad * 16000) * 2) + data + bytes(int(pad * 16000) * 2)   # silence the decoder can rest in
    offset -= pad
    d = decoder()
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
    d = decoder()
    d.start_utt(); d.process_raw(data, full_utt=True); d.end_utt()
    return [(re.sub(r"\(\d+\)", "", s.word), s.start_frame / 100, s.end_frame / 100)
            for s in d.seg() if s.word[0] not in "<[" ]


def align(voice, script, out, check_speech=True):
    """Word-level forced alignment of script.txt to the voiceover.

    Tries the whole script at once; if pocketsphinx gives up (long or slightly
    mismatched audio), aligns sentence by sentence, cutting the audio at the
    pauses between sentences found by a rough recognition pass.
    """
    raw = out / "voice16k.raw"
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", str(voice), "-ar", "16000", "-ac", "1",
                    "-f", "s16le", str(raw)], check=True)
    data = raw.read_bytes(); raw.unlink()
    words = spoken(script)
    lex = decoder()
    oov = sorted({w for w in words if lex.lookup_word(w) is None})
    if oov:
        raise SystemExit(f"Words not in pronunciation dictionary: {oov}. "
                         "Add them to pipeline/extra_dict.txt, or write {Jensen|jen sen} in script.txt.")
    try:
        al = _align_chunk(data, words, 0.0)
    except RuntimeError:
        al = _align_by_sentence(data, script, words)
    if check_speech:
        _check_unscripted_speech(data, al)
    (out / "word_alignment.json").write_text(json.dumps(al))
    return al


def _check_unscripted_speech(data, al, min_gap=0.6):
    """Stop if a 'pause' between aligned words is as loud as speech.

    The aligner never fails on extra spoken words (e.g. a title read aloud that
    is missing from script.txt); it squeezes them into a neighbouring gap, which
    throws scene cuts and captions off. Speech-level energy in a long gap
    catches that.
    """
    x = np.frombuffer(data, np.int16).astype(np.float32)
    rms = lambda a, b: float(np.sqrt(np.mean(x[int(a * 16000):int(b * 16000)] ** 2) + 1e-9))
    speech = np.median([rms(s, e) for _, s, e in al if e - s > 0.15])
    edges = [(0.0, al[0][1])] + [(e, s) for (_, _, e), (_, s, _) in zip(al, al[1:])] \
        + [(al[-1][2], len(x) / 16000)]
    bad = [(a, b) for a, b in edges if b - a > min_gap and rms(a + 0.1, b - 0.1) > 0.4 * speech]
    if bad:
        raise SystemExit("Speech found where script.txt has no words (missing text in the script?) at: "
                         + ", ".join(f"{a:.1f}-{b:.1f}s" for a, b in bad))


def _align_by_sentence(data, script, words):
    import difflib
    sents, cur = [], []
    for disp, ws in tokens(script):
        cur += ws
        if re.search(r"[.!?\u0964][\"'”’)\]]*$", disp) and cur:
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
def clean_images(img_dir, out, enabled=True):
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
        has_mark = enabled and ((step(win) > 4 and abs(step(fixed)) < 0.5 * step(win)) or shape_corr(win) > 0.2)
        if has_mark:
            f[C-R:C+R, C-R:C+R] = fixed
        report[p.name] = bool(has_mark)
        cv2.imwrite(str(dst / (p.stem + ".jpg")), f.astype(np.uint8), [cv2.IMWRITE_JPEG_QUALITY, 95])
    return dst, report


# 3. timeline -----------------------------------------------------------------
def timeline(scenes, al, total, out):
    i, rows = 0, []
    for k, sc in enumerate(scenes):
        ws = spoken(sc["line"])
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


def build_ass(title, script, al, speed, dur, out, captions="classic", font=None, cap_pos=None):
    clean = lambda t: re.sub(r"[,.:;\"“”‘’—–\u0964]|^'|'$", "", t) or t
    classic = captions == "classic"     # older style: UPPERCASE Inter Black centred on the image, pop-in
    cap_size = 60                       # Montserrat ExtraBold; half the reference-reel size (user asked 50%)
    ev, srt, i = [], [], 0
    for disp, ws in tokens(script):
        s, e = al[i][1] / speed, al[i + len(ws) - 1][2] / speed
        i += len(ws)
        nxt = al[i][1] / speed if i < len(al) else dur
        end = min(nxt if nxt - e < 0.25 else e + 0.15, nxt)
        # numbers keep inner commas (1,400); other words lose , . : ; quotes and dashes
        w = re.sub(r"[,.:;\"“”—–]+$|^[\"“]", "", disp) if re.search(r"\d", disp) else clean(disp)
        ev.append(f"Dialogue: 1,{ass_time(s)},{ass_time(end)},Cap,,0,0,0,,"
                  + (f"{{\\pos({W//2},{IMG_Y + IMG + 75 if cap_pos == 'below' else IMG_Y + IMG//2})\\fscx85\\fscy85\\t(0,80,\\fscx100\\fscy100)}}{w.upper()}"
                     if classic else f"{{\\pos({W//2},{CAP_Y})}}{w.lower()}"))
        srt.append(f"{len(srt)+1}\n{srt_time(s)} --> {srt_time(end)}\n{w.upper() if classic else w.lower()}\n")
    if title:
        t = re.sub(r"\*(.+?)\*", lambda m: f"{{\\c{YELLOW}}}{m.group(1)}{{\\c&H00FFFFFF}}", title.strip())
        plain = len(re.sub(r"\*", "", title.strip()))
        size = min(66, int(66 * 29 / max(plain, 1))) if not font else 92   # Devanagari runs narrower; user asked bigger   # 66px fits ~29 chars on one line
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
{f"Style: Cap,{font or 'Inter Black'},{64 if font else 49},&H00FFFFFF,&H00FFFFFF,&H00000000,&H80000000,-1,0,0,0,100,100,{0 if font else 1},0,1,4,2,5,0,0,0,1" if classic else
  f"Style: Cap,Montserrat ExtraBold,{cap_size},&H00FFFFFF,&H00FFFFFF,&H00000000,&H64000000,0,0,0,0,100,100,0,0,1,5,4,5,0,0,0,1"}
Style: Title,{font or "Inter Display Black"},66,&H00FFFFFF,&H00FFFFFF,&H00000000,&H99000000,-1,0,0,0,100,100,{0 if font else -1},0,1,0,4,2,0,0,0,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
""" + "\n".join(ev) + "\n")
    return ass


def render(rows, clean_dir, voice, music, ass, speed, dur, out, name, music_from="start"):
    concat = out / "scenes.ffconcat"
    lines = ["ffconcat version 1.0"]
    for r in rows:
        lines += [f"file '{(clean_dir / (Path(r['image']).stem + '.jpg')).resolve()}'", f"duration {r['duration']}"]
    lines.append(f"file '{(clean_dir / (Path(rows[-1]['image']).stem + '.jpg')).resolve()}'")
    concat.write_text("\n".join(lines) + "\n")
    inputs = ["-f", "concat", "-safe", "0", "-i", str(concat), "-i", str(voice)]
    fc = (f"[0:v]scale={IMG}:{IMG},setpts=PTS/{speed},fps=30,pad={W}:{H}:0:{IMG_Y}:black,"
          f"ass={ass}:fontsdir={HERE / 'fonts'},format=yuv420p[v];"
          f"[1:a]atempo={speed},loudnorm=I=-15:TP=-1.5:LRA=11,aresample=48000[vo];")
    if music:
        inputs += ["-stream_loop", "-1", "-i", str(music)]   # loops if music is shorter than the video
        mdur = duration(music)
        if music_from == "middle" and mdur > dur:
            m0, fade_out = (mdur - dur) / 2, 2.5        # centred segment of the track
        elif music_from == "end" and mdur > dur:
            # last segment of the track: its own ending lands on the video's end
            m0, fade_out = mdur - dur, 0.5
        else:
            m0, fade_out = 0.0, 2.5
        fc += (f"[2:a]atrim={m0:.2f}:{m0 + dur:.2f},asetpts=PTS-STARTPTS,loudnorm=I=-33:TP=-9,"
               f"afade=t=in:d=1,afade=t=out:st={max(dur-fade_out, 0):.2f}:d={fade_out},"
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
    ap.add_argument("--speed", type=float, default=None)
    ap.add_argument("--music-from", choices=["start", "middle", "end"],
                    help="use the start or the last segment of the music (default: settings.json, else start)")
    ap.add_argument("--max-gap", type=float, default=None,
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

    settings = json.loads((proj / "settings.json").read_text()) if (proj / "settings.json").exists() else {}
    al = align(voice, script, out, settings.get("speech_check", True))
    print(f"aligned {len(al)} words")
    if a.align_only:
        return
    max_gap = a.max_gap if a.max_gap is not None else settings.get("max_gap", 0.3)
    if max_gap > 0:
        voice, al, cut = tighten(voice, al, out, max_gap)
        print(f"trimmed {cut:.1f}s of pauses (max gap {max_gap}s)")
    clean_dir, wm = clean_images(proj / "images", out, settings.get("watermark", True))
    print(f"watermark removed from {sum(wm.values())}/{len(wm)} images")
    scenes = json.loads((proj / "scenes.json").read_text())
    missing = [s["image"] for s in scenes if not (proj / "images" / s["image"]).exists()]
    if missing:
        raise SystemExit(f"scenes.json references missing images: {missing}")
    speed = a.speed or settings.get("speed", 1.10)
    dur = duration(voice) / speed
    rows = timeline(scenes, al, duration(voice), out)   # original-audio seconds; setpts speeds video
    ass = build_ass(title, script, al, speed, dur, out, settings.get("captions", "classic"), settings.get("font"), settings.get("caption_position"))
    music_from = a.music_from or settings.get("music", "start")
    mp4 = render(rows, clean_dir, voice, music, ass, speed, dur, out, proj.name, music_from)
    print(f"done: {mp4}  ({dur:.1f}s)")


if __name__ == "__main__":
    main()
