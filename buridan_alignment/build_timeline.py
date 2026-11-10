"""Build the scene timeline for 'buridans .mp3' from forced-alignment word times.

Each scene = (voiceover line, image #, image file, what the image shows).
Start time = first word of the line in the audio; end = start of the next scene.
"""
import csv, json, re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
AUDIO_END = 70.27

SCENES = [
    ("Imagine a donkey", 44, "995238171_1794339504419622.jpg", "Small donkey alone in a wide empty field"),
    ("standing exactly halfway", 22, "484187823_1794339495786227.jpg", "Donkey front view on a dotted centre line"),
    ("between two identical bales of hay:", 32, "71895123_1794339496750877.jpg", "Donkey centred between two square hay bales"),
    ("same size,", 27, "592499110_1794339497876090.jpg", "Split screen: two bales with matching measuring sticks"),
    ("same distance, same smell,", 42, "947808309_1794339498940437.jpg", "Donkey from behind, equal stone lines to each bale"),
    ("completely equal in every way.", 34, "741140613_1794339499831972.jpg", "Balance scale with hay, perfectly level"),
    ("The donkey is hungry,", 19, "399722592_1794339500806253.jpg", "Thin donkey drooling, stomach rumbling"),
    ("but because both options are perfectly identical,", 1, "1003387403_1794339501694933.jpg", "Donkey side view looking toward a bale"),
    ("it has no rational reason", 41, "935573682_1794339502579223.jpg", "Close-up confused donkey, scribble cloud, sweat drop"),
    ("to choose one over the other.", 31, "701414658_1794339503555402.jpg", "Donkey frozen with one hoof lifted"),
    ("So it stands there,", 16, "343884879_1794339494745223.jpg", "Very wide shot, lonely donkey, low sun"),
    ("unable to decide,", 33, "740040754_1794339505439215.jpg", "Night: donkey still standing between bales"),
    ("and eventually", 30, "695652176_1794339506370023.jpg", "Thinner donkey, drooping ears, leaves blowing"),
    ("it starves to death.", 36, "823317100_1794339507425198.jpg", "Empty field: rope halter between bales, crow"),
    ("If two options are truly equal,", 15, "318204109_1794339508321431.jpg", "Young man holding two identical apples"),
    ("what makes you choose", 14, "297690594_1794339509239047.jpg", "Close-up, puzzled raised eyebrow"),
    ("one over the other?", 28, "598079339_1794339510256405.jpg", "Hands on two identical doors"),
    ("Pure reason cannot decide", 40, "928002806_1794339511199758.jpg", "Glowing brain on pedestal with red warning glow"),
    ("between identical options,", 23, "493620875_1794339512164446.jpg", "Scale with two identical glowing cubes"),
    ("so either the choice is made by something", 10, "258781102_1794339513181218.jpg", "Man at a fork of two identical paths"),
    ("other than reason,", 38, "869705067_1794339514162564.jpg", "Glowing heart pulling him toward a path"),
    ("or the options", 37, "841104930_1794339515207328.jpg", "Magnifying glass over the path"),
    ("were never truly equal", 8, "229180635_1794339516228005.jpg", "Lens reveals a tiny yellow flower"),
    ("to begin with.", 18, "382039854_1794339517221449.jpg", "Man kneeling, smiling at the flower"),
    ("It shows up in real life:", 7, "2198356_1794339518110820.jpg", "Man on bed in room holding phone"),
    ("choosing between two jobs", 20, "409476133_1794339518959115.jpg", "Man holding two identical envelopes"),
    ("that seem equally good,", 17, "349329662_1794339520034467.jpg", "Split screen: two identical office buildings"),
    ("two apartments,", 26, "520227448_1794339521024432.jpg", "Man between two identical apartment buildings"),
    ("two people", 5, "206494622_1794339521905474.jpg", "Split screen: two girls"),
    ("you have feelings for.", 9, "244591503_1794339522882225.jpg", "Man lying on bed, two hearts floating"),
    ("The more rationally", 21, "460215810_1794339523861148.jpg", "Man writing a pros/cons chart"),
    ("you approach an identical choice,", 25, "5121373_1794339524839105.jpg", "Man holding head, desk covered in notes"),
    ("the more paralyzed you become.", 11, "276326253_1794339525750591.jpg", "Man turned grey like a statue in chair"),
    ("Philosophers use this paradox", 6, "211167552_1794339526751344.jpg", "Philosopher writing with quill by candlelight"),
    ("to argue about free will.", 39, "916469174_1794339528681625.jpg", "Three scholars arguing at a desk"),
    ("If a perfectly rational agent", 24, "495880856_1794339527709206.jpg", "White humanoid robot in empty white room"),
    ("cannot choose between equal options", 3, "1025539294_1794339530586690.jpg", "Robot between two glowing buttons, loading icon"),
    ("without some external nudge,", 2, "1024744200_1794339529636001.jpg", "Giant finger poking the robot"),
    ("what exactly is making the choice", 4, "203225477_1794339532512401.jpg", "Cutaway head with empty control-room chair"),
    ("in humans?", 35, "807152282_1794339531606827.jpg", "Top-down busy Indian street crossing"),
    ("Is it reason?", 13, "293130512_1794339534393953.jpg", "Man with glowing blue brain, pencil and ruler"),
    ("Is it desire?", 29, "694582201_1794339533446767.jpg", "Man with glowing heart reaching for jalebis"),
    ("Is it something beneath both", 43, "955079385_1794339535328485.jpg", "Man on dark water, shadowy reflection"),
    ("that we never fully control?", 12, "291895201_1794339536330785.jpg", "Man with puppet strings into dark clouds"),
]

def words(s): return re.findall(r"[a-z']+", s.lower())

def main(align_path):
    al = [(re.sub(r"\(\d+\)", "", n), s, e) for n, s, e in json.load(open(align_path)) if n != "<sil>"]
    i, starts, ends = 0, [], []
    for line, *_ in SCENES:
        ws = words(line)
        assert [a[0] for a in al[i:i+len(ws)]] == ws, (line, al[i:i+len(ws)])
        starts.append(al[i][1]); ends.append(al[i+len(ws)-1][2]); i += len(ws)
    assert i == len(al)
    starts[0] = 0.0
    files = [s[2] for s in SCENES]
    assert len(set(files)) == 44 and all((ROOT / f).exists() for f in files)
    rows = []
    for k, (line, num, f, desc) in enumerate(SCENES):
        st, en = starts[k], (starts[k+1] if k + 1 < len(SCENES) else AUDIO_END)
        rows.append(dict(scene=k+1, start=round(st, 2), end=round(en, 2), duration=round(en-st, 2),
                         line=line, image_no=num, image=f, shows=desc))
    out = Path(__file__).parent
    with open(out / "timeline.csv", "w", newline="") as fh:
        w = csv.DictWriter(fh, fieldnames=rows[0].keys()); w.writeheader(); w.writerows(rows)
    ts = lambda t: f"{int(t//3600):02}:{int(t%3600//60):02}:{int(t%60):02},{int(round(t%1*1000)):03}"
    with open(out / "timeline.srt", "w") as fh:
        for r in rows:
            fh.write(f"{r['scene']}\n{ts(r['start'])} --> {ts(r['end'])}\n{r['line']}\n\n")
    with open(out / "scenes.ffconcat", "w") as fh:
        fh.write("ffconcat version 1.0\n")
        for r in rows: fh.write(f"file '../{r['image']}'\nduration {r['duration']}\n")
        fh.write(f"file '../{rows[-1]['image']}'\n")
    md = ["# Buridan's Donkey: voiceover to image alignment\n",
          "Audio: `buridans .mp3` (70.27 s). Times come from forced alignment of the script to the audio.\n",
          "| # | Start | End | Dur | Voiceover line | Img # | Image file | What it shows |",
          "|---|---|---|---|---|---|---|---|"]
    for r in rows:
        md.append(f"| {r['scene']} | {r['start']:.2f} | {r['end']:.2f} | {r['duration']:.2f} | {r['line']} | {r['image_no']} | `{r['image']}` | {r['shows']} |")
    (out / "ALIGNMENT.md").write_text("\n".join(md) + "\n")
    print(f"{len(rows)} scenes written")

if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else Path(__file__).parent / "word_alignment.json")
