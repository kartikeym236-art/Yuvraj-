"""Colour paradox reel -> 2x2 grid prompts (4 square scenes per image), watercolour stick-figure style."""
import json, re
from pathlib import Path
ROOT = Path(__file__).resolve().parents[2]; NAME = "colors"
STYLE = ("Hand-drawn illustration. Simple stick-figure character: a large perfectly round head in soft beige-peach with a thin black ink "
         "outline, light pencil shading on one side, a small curl of a few hair strands on top, tiny black dot eyes, a small faint mouth, a soft "
         "blush on the cheek, and a body, arms and legs drawn as single thin black ink lines. Backgrounds painted in loose muted watercolour washes: "
         "misty rolling sage-green hills, a calm slate-grey lake, a soft sepia-beige sky, sparse trees and grass strokes, gentle paper texture. "
         "Calm, minimal compositions with lots of empty space; desaturated palette of sepia, sand, sage and slate, with soft colour accents only where "
         "the scene is about a colour. NO text, letters or numbers anywhere.")
S = lambda l, d: (l, d)
SCENES = [
 S("The sky is blue.", "The stick man on a hill looking up at a soft blue watercolour sky."),
 S("Grass is green.", "The stick man touching tall green grass in a meadow."),
 S("Fire is orange.", "The stick man warming his hands at a small orange campfire by the lake."),
 S("Everyone agrees, right?", "A few stick figures standing together nodding."),
 S("But here's something", "The stick man raising one finger, eyebrows up."),
 S("no one can prove.", "The stick man shrugging next to an empty open box."),
 S("What if the blue you see", "Close-up of the stick man's dot eye with a blue sky reflected in it."),
 S("is not the blue I see?", "Two stick figures looking at the same sky, one thought bubble blue, the other green."),
 S("This is the colorblind paradox.", "The stick man standing between two halves of a landscape, one side blue, one side green."),
 S("Since we were kids,", "A small stick-figure child holding a parent's hand on a hill."),
 S("someone pointed at the sky", "The parent stick figure pointing up at the sky, the child looking up."),
 S("and said, \"That's blue.\"", "The child stick figure smiling at the blue sky."),
 S("So we all learned the same word.", "A row of child stick figures all pointing at the same sky."),
 S("But what that color actually looks like", "The stick man staring at a single blue paint swatch on an easel."),
 S("inside your head,", "A cutaway of the stick man's round head with a small glowing colour inside."),
 S("nobody else can ever see it.", "Another stick figure peeking at the stick man's head, seeing only a closed door."),
 S("Your blue could be my green.", "Two stick figures facing each other, one holding a blue balloon, the other seeing it as green in a thought bubble."),
 S("Your red could be my purple.", "A red apple on a table, a thought bubble above showing the same apple purple."),
 S("We'd still agree on everything", "Two stick figures shaking hands happily on a hill."),
 S("and never find out.", "The two stick figures walking away down separate paths, unaware."),
 S("Here's the twist.", "The stick man turning around sharply, surprised."),
 S("It's not just colors.", "Paint buckets on the ground, the stick man walking past them."),
 S("Maybe nobody experiences the world", "The stick man alone on a hill looking at a vast landscape."),
 S("exactly the way you do.", "The stick man looking into a mirror standing in a field, his reflection slightly different."),
 S("Your sunset,", "The stick man sitting on a hill watching a warm orange sunset over the lake."),
 S("your favorite song,", "The stick man with headphones, eyes closed, little music notes floating."),
 S("the way rain feels,", "The stick man standing in gentle rain, palm out, smiling."),
 S("all yours,", "The stick man hugging a small glowing light to his chest."),
 S("and no one else will ever see it quite the same.", "Many stick figures each looking at their own small glowing light."),
 S("So what do you think?", "The stick man sitting on a rock, hand on chin, thinking."),
 S("Do we all see the same colors?", "The stick man looking up at a sky split into soft blue and soft green halves."),
 S("Comment yes or no.", "The stick man looking at the viewer, gently smiling, a calm lake behind."),
]
if __name__ == "__main__":
    assert len(SCENES) % 4 == 0
    (ROOT/f"projects/{NAME}/scenes.json").write_text(json.dumps([{"line": l, "image": f"{k:03d}.png"} for k, (l, _) in enumerate(SCENES, 1)], indent=1))
    out = [f"# Is Your Blue the Same as Mine?: 2x2 grid prompts ({len(SCENES)//4} images = {len(SCENES)} scenes)", "",
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
