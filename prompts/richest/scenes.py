"""If the richest 1% gave 10% -> prompts (watercolour stick-figure style, "52!" reel references)."""
import json, re
from pathlib import Path
HERE = Path(__file__).parent; ROOT = HERE.parent.parent; NAME = "richest"
STYLE = ("Square 1:1 hand-drawn illustration, full-bleed. Simple stick-figure character: a large perfectly round head in soft beige-peach "
         "with a thin black ink outline, light pencil shading on one side, a small curl of a few hair strands on top, tiny black dot eyes, "
         "a small faint mouth, a soft blush on the cheek, and a body, arms and legs drawn as single thin black ink lines. Background painted "
         "in loose muted watercolour washes: misty rolling sage-green hills, a calm slate-grey lake or sea, a soft sepia-beige sky, sparse "
         "trees and grass strokes, gentle paper texture. Calm, quiet, minimal composition with lots of empty space; desaturated palette of "
         "sepia, sand, sage and slate. NO text, letters or numbers anywhere.")
C = {"M": "THE STICK MAN: the stick-figure character described above."}
S = lambda line, desc, ch="": (line, desc, ch)
SCENES = [
 S("If the richest {1%|one percent} of people", "THE STICK MAN looking up at a tiny group of figures standing on a tall golden hill of coins.", "M"),
 S("gave away {10%|ten percent} of their income,", "A hand pouring a small stream of gold coins out of a big sack.", ""),
 S("what problems could we solve?", "THE STICK MAN scratching his head, a dotted thought bubble with a question mark.", "M"),
 S("Well, through this,", "THE STICK MAN holding up one finger, idea lightbulb above.", "M"),
 S("we'd raise approximately", "Coins piling up higher and higher on a wooden table.", ""),
 S("{$3.6 trillion.|three point six trillion dollars}", "A gigantic mountain of gold coins towering over tiny THE STICK MAN.", "M"),
 S("And with that, we can do a lot.", "THE STICK MAN smiling with arms wide open in a field.", "M"),
 S("First, with just {10%|ten percent} of that pot,", "THE STICK MAN scooping a small bowl of coins from the big pile.", "M"),
 S("we can solve world hunger.", "Full bowls of food on long tables for many stick figures.", ""),
 S("According to a {2020|twenty twenty} study,", "An open book on a table with simple charts (no text).", ""),
 S("it would cost just", "A small stack of coins on a scale.", ""),
 S("{$33 billion|thirty three billion dollars} a year", "A row of small coin stacks, one for each month.", ""),
 S("for {10|ten} years", "A calendar flipping pages in the wind.", ""),
 S("to solve world hunger for good.", "A green field of wheat with happy stick figures harvesting.", ""),
 S("Next, we could end", "THE STICK MAN walking along a dirt path.", "M"),
 S("a significant portion of world poverty.", "A poor village of small huts under a grey sky.", ""),
 S("Currently, there are over", "A crowd of stick figures standing on a hill.", ""),
 S("half a billion people", "An endless crowd of tiny stick figures stretching to the horizon.", ""),
 S("who live on less than {$3|three dollars} a day.", "A stick figure holding three small coins in an open palm.", ""),
 S("So, with {$260 billion,|two hundred sixty billion dollars}", "A big sack of coins being carried to the village.", ""),
 S("we could bring everyone", "Stick figures climbing a ladder out of a deep ditch.", ""),
 S("above that poverty line for a year.", "Stick figures standing above a long drawn line on the ground, smiling.", ""),
 S("Okay, so how much is left?", "THE STICK MAN peeking into the big coin pile.", "M"),
 S("Ah, still over {$3 trillion.|three trillion dollars}", "The coin mountain still huge, THE STICK MAN surprised.", "M"),
 S("So, okay, let's speed this up a bit.", "THE STICK MAN checking a stopwatch.", "M"),
 S("For {$1.2 trillion,|one point two trillion dollars}", "Coins flowing down a channel toward a village.", ""),
 S("we can provide clean water", "A stick figure filling a jar from a clean water tap by the lake.", ""),
 S("and sanitation for everyone forever.", "A small clean washroom hut next to the village.", ""),
 S("With {$220 billion,|two hundred twenty billion dollars}", "A sack of coins handed to a stick figure doctor.", ""),
 S("we could massively reduce malaria,", "A mosquito net over a bed in a hut.", ""),
 S("tuberculosis, and {HIV.|h i v}", "A small clinic with stick figure nurses and patients smiling.", ""),
 S("And even after all of that,", "THE STICK MAN standing on a beach at sunset, looking back.", "M"),
 S("we'd still have over {$1.5 trillion|one point five trillion dollars}", "A still large pile of coins on the beach.", ""),
 S("to put elsewhere.", "THE STICK MAN pointing toward the distant horizon.", "M"),
 S("So, what are we waiting for?", "THE STICK MAN looking at the viewer with a gentle smile, sun rising over the hills.", "M"),
]
if __name__ == "__main__":
    disp = lambda l: re.sub(r"\{([^|{}]+)\|[^{}]+\}", r"\1", l)
    (ROOT / f"projects/{NAME}/scenes.json").write_text(json.dumps(
        [{"line": l, "image": f"{k:03d}.png"} for k, (l, _, _) in enumerate(SCENES, 1)], indent=1))
    out = [f"# If the Richest 1% Gave 10%: image prompts ({len(SCENES)})", "",
           "Generate each as a square (1:1) image. Save as `001.png`, `002.png`, ... in order.", ""]
    for k, (l, d, ch) in enumerate(SCENES, 1):
        p = STYLE + ("" if ch else " NO people unless described.") + "\n\nScene: " + d + ("\n" + " ".join(C[c] for c in ch) if ch else "")
        out += [f"## {k:03d}  ·  \"{disp(l)}\"", "", "```", p, "```", ""]
    (ROOT / f"projects/{NAME}/image_prompts.md").write_text("\n".join(out))
    print(len(SCENES))
