"""Colour paradox reel -> 2x2 grid prompts (4 square scenes per image), watercolour stick-figure style."""
import json, re
from pathlib import Path
ROOT = Path(__file__).resolve().parents[2]; NAME = "solipsism"
STYLE = ("Hand-drawn storybook illustration with loose ink lines and soft painterly colour, exactly like a muted watercolour-and-gouache sketch. "
         "CHARACTER: a simple stick figure with a large perfectly round head coloured warm tan-beige (like a peach-brown ball) with a darker brown "
         "shading crescent on the lower side and a soft highlight on top, a thin black ink outline, three or four short thin black hair strands "
         "sticking up from the top, two tiny black dot eyes close together and slightly to one side, NO mouth, NO nose; a body, arms and legs drawn "
         "as single thin black ink lines, tiny rounded hands. The character is small in the frame with lots of space around him. "
         "BACKGROUND: muted painted landscape of rolling olive-green grassy hills with sketchy grass strokes, a calm slate-grey lake with soft "
         "ripples, distant brown-grey hills, and a warm hazy sepia-beige sky with soft horizontal brush strokes. Wooden props (signs, posts) are "
         "drawn in warm brown with visible wood grain. Desaturated earthy palette of sand, sepia, olive and slate; quiet, contemplative mood. "
         "NO text, letters or numbers anywhere.")
S = lambda l, d: (l, d)
SCENES = [
 S("You are the only real human being living on this Earth.", "The stick man standing alone on a grassy hill by the lake, nobody else anywhere."),
 S("Everyone around you is just your imagination,", "The stick man surrounded by faint ghostly outlines of other stick figures fading into the haze."),
 S("even me, whom you are watching in this video.", "The stick man holding a small phone; on its screen a tiny stick figure waving back."),
 S("In this entire universe,", "The stick man tiny on the hill under a vast hazy sky with faint stars."),
 S("you are the only person who has true awareness,", "The stick man with a soft glow around his round head, everything else dim."),
 S("that is, consciousness.", "A small warm light floating above the stick man's head like a candle flame."),
 S("There is a theory that everyone you see around you,", "The stick man looking at a few other stick figures standing far apart on the hills."),
 S("your mother, father, friends,", "A small stick-figure family and two friends standing together by the lake, slightly transparent."),
 S("are all just an illusion created by your brain,", "The other stick figures dissolving into mist while the stick man watches."),
 S("like characters in a video game.", "The stick man holding an old game controller, tiny pixel-like stick figures on a wooden sign-shaped screen."),
 S("\"I think, therefore I am.\"", "The stick man sitting on a rock by the lake, hand on chin, thinking."),
 S("The philosopher {René Descartes|ruh nay day cart} stated", "An old philosopher stick figure with long wavy dark hair and a black cloak, writing with a quill at a wooden desk on the hill."),
 S("that apart from your own thoughts,", "A dotted thought bubble above the stick man's head with small swirling clouds inside."),
 S("you cannot prove anything else in this world {100%|one hundred percent}.", "The stick man shrugging next to a big wooden sign that is blank."),
 S("When we dream while sleeping,", "The stick man asleep on the grass by the lake, a dotted dream bubble above him."),
 S("we meet many people.", "Inside the dream bubble, many small stick figures waving."),
 S("Once we wake up,", "The stick man sitting up on the grass, rubbing his eyes, at dawn."),
 S("we realize it was not real and just an imagination created by our brain, right?", "The dream bubble popping into small fading dots above the stick man."),
 S("Similarly, there are many theories suggesting", "The stick man walking along a dirt path between the hills, thinking."),
 S("that what happens while we are awake is the same.", "The stick man standing at the lake, his reflection in the water slightly blurred like a dream."),
 S("Once this video ends,", "A wooden sign by the lake with nothing on it, the sky darkening."),
 S("if your mind feels like, \"Oh yeah, that's true,\"", "The stick man looking up with wide surprised eyes, a tiny light bulb above his head."),
 S("then congratulations. You have just realized", "The stick man standing proudly on top of the hill, arms raised."),
 S("that your brain has been fooling itself. Share this with your friends who don't know about it.", "The stick man pointing at the viewer with a calm look, the lake and hills behind him."),
]
if __name__ == "__main__":
    assert len(SCENES) % 4 == 0
    (ROOT/f"projects/{NAME}/scenes.json").write_text(json.dumps([{"line": l, "image": f"{k:03d}.png"} for k, (l, _) in enumerate(SCENES, 1)], indent=1))
    out = [f"# You Are the Only Real Human: 2x2 grid prompts ({len(SCENES)//4} images = {len(SCENES)} scenes)", "",
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
