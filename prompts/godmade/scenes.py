"""Colour paradox reel -> 2x2 grid prompts (4 square scenes per image), watercolour stick-figure style."""
import json, re
from pathlib import Path
ROOT = Path(__file__).resolve().parents[2]; NAME = "godmade"
STYLE = ("Hand-drawn illustration. Simple stick-figure character: a large perfectly round head in soft beige-peach with a thin black ink "
         "outline, light pencil shading on one side, a small curl of a few hair strands on top, tiny black dot eyes, a small faint mouth, a soft "
         "blush on the cheek, and a body, arms and legs drawn as single thin black ink lines. Backgrounds painted in loose muted watercolour washes: "
         "misty rolling sage-green hills, a calm slate-grey lake, a soft sepia-beige sky, sparse trees and grass strokes, gentle paper texture. "
         "Calm, minimal compositions with lots of empty space; desaturated palette of sepia, sand, sage and slate, with soft colour accents only where "
         "the scene is about a colour. NO text, letters or numbers anywhere.")
S = lambda l, d: (l, d)
SCENES = [
 S("If the God of the Hindus", "A small Hindu temple with a saffron flag on a hill by the lake at dawn."),
 S("created all humans,", "Many stick figures standing together on a wide meadow."),
 S("why didn't He make everyone Hindu?", "The stick man scratching his head looking at the temple."),
 S("If the God of the Muslims", "A small mosque with a dome and minaret beside the lake."),
 S("created all humans,", "A crowd of different stick figures walking along a path."),
 S("why didn't He make everyone Muslim?", "The stick man shrugging in front of the mosque."),
 S("Or why didn't the God of the Christians", "A small white country church with a cross on a green hill."),
 S("make everyone Christian?", "The stick man looking at the church, puzzled, a thought bubble with a question mark."),
 S("Because no God created any human", "The stick man standing alone under a vast empty sky."),
 S("or religion.", "The temple, mosque and church small and far apart in one landscape."),
 S("Humans created God,", "Stick figures sitting around a campfire at night telling stories, a large glowing shape rising from the smoke."),
 S("and humans created religion.", "Stick figures building three different small shrines with their own hands, bricks and tools around."),
]
if __name__ == "__main__":
    assert len(SCENES) % 4 == 0
    (ROOT/f"projects/{NAME}/scenes.json").write_text(json.dumps([{"line": l, "image": f"{k:03d}.png"} for k, (l, _) in enumerate(SCENES, 1)], indent=1))
    out = [f"# Who Really Created God: 2x2 grid prompts ({len(SCENES)//4} images = {len(SCENES)} scenes)", "",
           "Each prompt makes ONE square 1:1 image split into a 2x2 grid of four square panels. Save the images as `01.png`, `02.png`, ... in order.", ""]
    pos = ["TOP-LEFT", "TOP-RIGHT", "BOTTOM-LEFT", "BOTTOM-RIGHT"]
    for g in range(len(SCENES)//4):
        p = ["FORMAT: ONE single square 1:1 image divided into a 2x2 GRID of FOUR equal square panels, separated only by thin straight uniform white "
             "gutter lines; no outer border, no panel numbers. Each panel is a separate full-bleed illustration with its own composition. All four panels "
             "share exactly the same art style, character design, colours and lighting.", "", "STYLE: " + STYLE, ""]
        for k in range(4):
            l, d = SCENES[g*4+k]; p.append(f"PANEL {k+1} ({pos[k]}): {d}")
        out += [f"## {g+1:02d}  ·  scenes {g*4+1}-{g*4+4}", ""] + [f"- {pos[k].lower()}: \"{SCENES[g*4+k][0]}\"" for k in range(4)] + ["", "```", "\n".join(p), "```", ""]
    (ROOT/f"projects/{NAME}/image_prompts.md").write_text("\n".join(out)); print(len(SCENES))
