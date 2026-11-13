"""Speed the aligned video up by SPEED and burn in one-word subtitles.

Word times come from word_alignment.json (forced alignment of the script),
divided by SPEED so they stay in sync with the faster audio.
Outputs: words_1.10x.srt, words_1.10x.ass, final_1.10x.mp4
"""
import json, re, subprocess
from pathlib import Path

SPEED = 1.10
HERE = Path(__file__).parent
AUDIO = HERE.parent / "buridans .mp3"
AUDIO_END = 70.27 / SPEED
GAP_HOLD = 0.15   # how long a word stays up before a pause

# display words (keeps ? and apostrophes, drops , . :)
script = (HERE / "voiceover_script.txt").read_text()
display = [re.sub(r"[,.:;]", "", t) for t in script.split()]
al = [(re.sub(r"\(\d+\)", "", n), s, e) for n, s, e in json.load(open(HERE / "word_alignment.json")) if n != "<sil>"]
assert len(al) == len(display)
for (n, _, _), d in zip(al, display):
    assert re.sub(r"[^a-z']", "", d.lower()) == n, (n, d)

cues = []
for i, ((_, s, e), word) in enumerate(zip(al, display)):
    s, e = s / SPEED, e / SPEED
    nxt = al[i + 1][1] / SPEED if i + 1 < len(al) else AUDIO_END
    end = nxt if nxt - e < 0.25 else e + GAP_HOLD   # bridge tiny gaps, clear on real pauses
    cues.append((s, min(end, nxt), word.upper()))

def srt_t(t): return f"{int(t//3600):02}:{int(t%3600//60):02}:{int(t%60):02},{int(round(t%1*1000)):03}"
def ass_t(t): return f"{int(t//3600)}:{int(t%3600//60):02}:{t%60:05.2f}"

(HERE / "words_1.10x.srt").write_text("".join(f"{k+1}\n{srt_t(s)} --> {srt_t(e)}\n{w}\n\n" for k, (s, e, w) in enumerate(cues)))
ass = f"""[Script Info]
ScriptType: v4.00+
PlayResX: 1024
PlayResY: 1024

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Word,Inter Black,78,&H00FFFFFF,&H00FFFFFF,&H00000000,&H80000000,-1,0,0,0,100,100,1,0,1,6,3,2,40,40,110,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
""" + "".join(f"Dialogue: 0,{ass_t(s)},{ass_t(e)},Word,,0,0,0,,{{\\fscx85\\fscy85\\t(0,80,\\fscx100\\fscy100)}}{w}\n" for s, e, w in cues)
(HERE / "words_1.10x.ass").write_text(ass)

subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-f", "concat", "-safe", "0", "-i", str(HERE / "scenes.ffconcat"),
                "-i", str(AUDIO),
                "-filter_complex", f"[0:v]scale=1024:1024,setpts=PTS/{SPEED},fps=30,ass={HERE/'words_1.10x.ass'},format=yuv420p[v];[1:a]atempo={SPEED}[a]",
                "-map", "[v]", "-map", "[a]", "-c:v", "libx264", "-crf", "20", "-preset", "medium",
                "-c:a", "aac", "-b:a", "192k", "-shortest", "-movflags", "+faststart", str(HERE / "final_1.10x.mp4")], check=True)
print(len(cues), "word cues; final_1.10x.mp4 written")
