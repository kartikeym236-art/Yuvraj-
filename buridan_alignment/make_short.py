"""Vertical 9:16 short: 1.10x speed, title above the image, small centred
one-word captions, voiceover + background music.

Layout (1080x1920, black): title band above, 1080x1080 image at y=IMG_Y,
captions centred on the image.
"""
import json, re, subprocess
from pathlib import Path

SPEED = 1.10
W, H, IMG_Y = 1080, 1920, 420
HERE = Path(__file__).parent
VOICE = HERE / "source" / "buridans .mp3"
MUSIC = HERE / "bg_music.mp3"
DUR = 70.27 / SPEED
TITLE_WHITE, TITLE_YELLOW = "BURIDAN ASS PARADOX", "EXPLAINED"
CAP_SIZE = round(78 * 0.6 * W / 1024)          # 0.6x of previous caption size
YELLOW = "&H0016C8FF"                           # ASS BGR: #FFC816

script = (HERE / "voiceover_script.txt").read_text()
display = [re.sub(r"[,.:;]", "", t) for t in script.split()]
al = [(re.sub(r"\(\d+\)", "", n), s, e) for n, s, e in json.load(open(HERE / "word_alignment.json")) if n != "<sil>"]
assert len(al) == len(display)

def t(x): return f"{int(x//3600)}:{int(x%3600//60):02}:{x%60:05.2f}"
ev = []
for i, ((_, s, e), w) in enumerate(zip(al, display)):
    s, e = s / SPEED, e / SPEED
    nxt = al[i+1][1] / SPEED if i + 1 < len(al) else DUR
    end = nxt if nxt - e < 0.25 else e + 0.15
    ev.append(f"Dialogue: 1,{t(s)},{t(min(end, nxt))},Cap,,0,0,0,,"
              f"{{\\pos({W//2},{IMG_Y+540})\\fscx85\\fscy85\\t(0,80,\\fscx100\\fscy100)}}{w.upper()}")
ev.append(f"Dialogue: 0,{t(0)},{t(DUR+1)},Title,,0,0,0,,{{\\pos({W//2},{IMG_Y-28})}}"
          f"{TITLE_WHITE} {{\\c{YELLOW}}}{TITLE_YELLOW}")

ass = f"""[Script Info]
ScriptType: v4.00+
PlayResX: {W}
PlayResY: {H}
WrapStyle: 2

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Cap,Inter Black,{CAP_SIZE},&H00FFFFFF,&H00FFFFFF,&H00000000,&H80000000,-1,0,0,0,100,100,1,0,1,4,2,5,0,0,0,1
Style: Title,Inter Display Black,66,&H00FFFFFF,&H00FFFFFF,&H00000000,&H99000000,-1,0,0,0,100,100,-1,0,1,0,4,2,0,0,0,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
""" + "\n".join(ev) + "\n"
(HERE / "short_1.10x.ass").write_text(ass)

fc = (f"[0:v]scale={W}:{W},setpts=PTS/{SPEED},fps=30,pad={W}:{H}:0:{IMG_Y}:black,"
      f"ass={HERE/'short_1.10x.ass'},format=yuv420p[v];"
      f"[1:a]atempo={SPEED},loudnorm=I=-15:TP=-1.5:LRA=11[vo];"
      f"[2:a]atrim=0:{DUR:.2f},asetpts=PTS-STARTPTS,loudnorm=I=-33:TP=-9,"
      f"afade=t=in:d=1,afade=t=out:st={DUR-2.5:.2f}:d=2.5[bg];"
      f"[vo][bg]amix=inputs=2:duration=first:normalize=0,alimiter=limit=0.89,aresample=48000[a]")
subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-f", "concat", "-safe", "0", "-i", str(HERE/"scenes.ffconcat"),
                "-i", str(VOICE), "-i", str(MUSIC), "-filter_complex", fc, "-map", "[v]", "-map", "[a]",
                "-c:v", "libx264", "-crf", "20", "-preset", "medium", "-c:a", "aac", "-b:a", "192k",
                "-t", f"{DUR:.2f}", "-movflags", "+faststart", str(HERE/"short_1.10x.mp4")], check=True)
print("short_1.10x.mp4 written")
