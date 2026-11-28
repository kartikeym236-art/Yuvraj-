"""Colour paradox reel -> 2x2 grid prompts (4 square scenes per image), watercolour stick-figure style."""
import json, re
from pathlib import Path
ROOT = Path(__file__).resolve().parents[2]; NAME = "bulldozer"
STYLE = ("Soft hand-drawn pencil-and-watercolour sketch illustration, like a gentle storybook. Thin, slightly shaky graphite-grey ink "
         "lines with light pencil hatching for shadows; very pale, washed-out watercolour tints. "
         "CHARACTER: a simple stick figure with a large perfectly round head coloured pale cream-ivory (soft warm off-white, slightly "
         "yellowish), a thin dark-grey outline, two or three short wispy hair strands on top, two small black dot eyes, a tiny curved line "
         "for a mouth, sometimes small eyebrows for emotion, no nose; thin single-line stick arms and legs, small rounded hands; wears a "
         "simple pale grey-white draped cloth tunic. The character is medium-small in the frame with lots of empty space. "
         "BACKGROUND: airy, minimal, faded landscape of pale sand-beige desert plains, soft rolling dunes and grey-blue distant hills, "
         "scattered small pebbles, tiny tufts of grass and a few sketchy olive trees, a near-white cream sky with a few faint pencil cloud "
         "lines. Palette is very light and desaturated: cream, ivory, sand, pale grey-blue and dusty sage; lots of white paper showing "
         "through; quiet, calm mood. NO text, letters or numbers anywhere.")
S = lambda l, d: (l, d)
SCENES = [
 S("Nothing is more dangerous", "The stick man standing at the bottom of a steep rocky hill, looking up at it, calm and determined."),
 S("than a man who has started to enjoy his pain.", "The stick man with a scraped knee, small bandage on his arm, smiling softly while sitting on a rock."),
 S("There's a rare type of person", "One stick man standing apart from a small group of other stick figures on a dusty plain."),
 S("that has played the game long enough", "The stick man walking along a long winding path across the desert, many footprints behind him."),
 S("that they learn to love the ups and the downs.", "The stick man walking over rolling dunes that rise and fall like waves, a calm smile."),
 S("They embrace things when they're tough,", "The stick man pushing a heavy boulder up a slope, small smile."),
 S("and they actually get a weird,", "The stick man pausing mid-push, grinning slightly, a sweat drop on his round head."),
 S("almost masochistic enjoyment of it.", "The stick man lying on the warm sand beside the boulder, laughing, arms spread out."),
 S("I call these people bulldozers", "A small old wooden bulldozer driven by the stick man across the desert, dust behind it."),
 S("because they don't care what obstacles are in front of them,", "A row of big rocks and fallen logs blocking the path ahead of the stick man."),
 S("they just go right through it all", "The stick man walking straight through a crumbling stone wall, pieces falling away."),
 S("and there's nothing you can do that makes them quit", "A strong wind and sand storm blowing at the stick man, who keeps walking forward, leaning in."),
 S("because they love the ups and downs of the game.", "The stick man standing on top of a tall dune at sunset, arms raised, smiling."),
 S("This is actually the concept behind my app, My Future Self,", "The stick man holding a small phone, the screen glowing softly (no text)."),
 S("where you just put in the type of person that you want to be", "The stick man looking at a faint ghostly outline of a taller, stronger version of himself standing ahead."),
 S("and it tells you the {day-to-day|day to day} habits that you need to do.", "A simple stone path of stepping stones leading toward the ghostly future self."),
 S("Now all that's left on you", "The stick man standing alone at the start of the stone path, looking ahead."),
 S("is to embrace the painful parts of life", "The stick man climbing a steep rocky slope, hands on rocks, determined."),
 S("and actually use that as fuel", "A small campfire burning on the plain, the stick man warming his hands, determined eyes."),
 S("to keep going.", "The stick man walking away along the long desert path toward distant hills, sun low on the horizon."),
]
if __name__ == "__main__":
    assert len(SCENES) % 4 == 0
    (ROOT/f"projects/{NAME}/scenes.json").write_text(json.dumps([{"line": l, "image": f"{k:03d}.png"} for k, (l, _) in enumerate(SCENES, 1)], indent=1))
    out = [f"# The Man Who Enjoys His Pain: 2x2 grid prompts ({len(SCENES)//4} images = {len(SCENES)} scenes)", "",
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
