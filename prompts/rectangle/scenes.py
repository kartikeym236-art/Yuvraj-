"""Rectangles script -> scene prompts + projects/apple/scenes.json.

Same style block and format as prompts/build_prompts.py.  Usage: python prompts/rectangle/scenes.py
"""
import json
from pathlib import Path

HERE = Path(__file__).parent
ROOT = HERE.parent.parent
STYLE = ("STYLE: Hand-drawn 2D webcomic illustration, square 1:1 frame, looks like a still from an emotional animated "
         "short. Characters: bold black ink outlines, large round heads, flat peach skin, pink blush cheeks, tiny dot "
         "eyes, thick expressive eyebrows. Backgrounds more detailed and semi-realistic, soft muted colours, light paper "
         "grain, gentle natural light, slightly desaturated palette. Cinematic composition.")
AVOID = ("AVOID: any readable text, letters, numbers, captions, logos, watermarks or speech bubbles; photorealism; "
         "3D render look; borders or frames around the image.")
CHARACTERS = {
    "BOY": ("NARRATOR BOY: Indian man in his early 20s, slim, big messy curly black hair, dot eyes, thick dark eyebrows, "
            "wears a muted teal-green full-sleeve shirt with rolled sleeves and dark trousers."),
}
S = lambda line, desc, chars=(): (line, list(chars), desc)
SCENES = [
    S("Humans are obsessed with rectangles.", "A busy city street where every building, window, door, sign and phone in people's hands is a rectangle, highlighted with a soft glowing outline. Camera: wide."),
    S("And everything we build and live in", "A tall apartment block made of stacked rectangular flats with rectangular windows. Camera: low angle."),
    S("from birth", "A newborn baby sleeping in a rectangular crib in a hospital nursery. Camera: medium, soft light."),
    S("until death", "A quiet old cemetery with rectangular headstones under a tree, autumn leaves, peaceful not sad. Camera: wide."),
    S("is a rectangle.", "NARRATOR BOY holding up a rectangular picture frame in front of his face, framing himself, amused. Camera: medium close-up.", ["BOY"]),
    S("And turns out there's", "NARRATOR BOY raising one finger with a knowing smile. Camera: medium.", ["BOY"]),
    S("a pretty cool reason why.", "A glowing rectangle shape floating above an open book like a revealed secret, sparkles around it. Camera: close-up, magical."),
    S("Yep, not only are rectangles just straight lines", "A ruler drawing a perfectly straight pencil line on paper. Camera: close-up."),
    S("and right angles,", "A carpenter's steel square tool resting against a perfectly straight wooden plank, a right-angle corner highlighted. Camera: close-up."),
    S("which makes them easier to measure, cut,", "A tape measure stretched along a rectangular wooden board with a saw beside it cutting a straight line, sawdust flying. Camera: close-up."),
    S("design,", "An architect's desk with rectangular blueprints, a ruler and a pencil drawing a floor plan of rectangles (no text). Camera: top-down."),
    S("package,", "Rectangular cardboard boxes neatly stacked on a pallet in a warehouse. Camera: medium."),
    S("and build with,", "A bricklayer laying rectangular red bricks in neat rows with mortar. Camera: medium."),
    S("but it also means they fit flushly together", "Rectangular boxes sliding together perfectly side by side with no gaps, a satisfying tight fit. Camera: close-up."),
    S("with no wasted space", "Split view: on the left round barrels with empty gaps between them, on the right rectangular crates packed perfectly tight. Camera: top-down."),
    S("and also creates a second flat surface", "A hand placing a cup of tea on top of a flat rectangular box, the top surface highlighted. Camera: close-up."),
    S("to continue building on.", "A stack of rectangular blocks being built upward like a tower, each one sitting flat on the one below. Camera: medium, low angle."),
    S("So big rectangle", "A giant rectangle-shaped building towering over a tiny person like a monument, dramatic sky. Camera: low angle, epic."),
    S("kind of monopolized us.", "NARRATOR BOY sitting inside a rectangular box-shaped room, shrugging with a playful grin, surrounded by rectangular screens, books and frames. Camera: medium.", ["BOY"]),
]

def prompt(line, chars, desc):
    parts = [STYLE]
    if chars:
        parts.append("CHARACTERS:\n" + "\n".join(CHARACTERS[c] for c in chars))
    parts += ["SCENE: " + desc, f'NARRATION FOR THIS IMAGE: "{line}".', AVOID]
    return "\n\n".join(parts)


if __name__ == "__main__":
    md = ["# Humans Are Obsessed With Rectangles: Scene Prompts\n"]
    for k, (line, chars, desc) in enumerate(SCENES, 1):
        md += [f"## Scene {k}\n", f"> {line}\n", "```", prompt(line, chars, desc), "```\n"]
    (HERE / "rectangle-prompts.md").write_text("\n".join(md), encoding="utf-8")
    (ROOT / "projects/rectangle/scenes.json").write_text(json.dumps(
        [{"line": l, "image": f"scene_{k:02d}.jpg"} for k, (l, _, _) in enumerate(SCENES, 1)], indent=1))
    gen = []
    for k, (line, chars, desc) in enumerate(SCENES, 1):
        p = ("Hand-drawn 2D webcomic illustration, square, full-bleed with no border or frame. Cartoon characters: bold "
             "black outlines, big round heads, flat peach skin, pink blush cheeks, tiny dot eyes, thick expressive "
             "eyebrows. Backgrounds more detailed, soft muted desaturated colours, light paper grain, gentle natural "
             "light. No text, letters, numbers or logos anywhere." + ("" if chars else " NO people or faces unless described.")
             + "\n\n" + ("Characters: " + " ".join(CHARACTERS[c] for c in chars) + "\n" if chars else "") + "Scene: " + desc)
        gen.append([k, p[:1000]])
    (ROOT / "projects/rectangle/gen_prompts.json").write_text(json.dumps(gen))
    print(len(SCENES), "scenes")
