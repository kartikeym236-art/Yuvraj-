"""Apple-in-a-box (Poincaré recurrence) script -> scene prompts + projects/apple/scenes.json.

Same style block and format as prompts/build_prompts.py.  Usage: python prompts/apple/scenes.py
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
    "MATH": ("OLD MATHEMATICIAN: 1890s French scholar with a big bushy grey-brown beard, small round spectacles, "
             "receding hair, dark frock coat and waistcoat."),
    "SCI": ("TWO SCIENTISTS: a grey-haired man with glasses and a younger dark-haired man, both in white lab coats."),
}
APPLE = "a shiny red apple with a small green leaf"
BOX = "a sealed transparent glass cube box with thick metal edges, standing alone on a plain dark table"

S = lambda line, desc, chars=(): (line, list(chars), desc)
SCENES = [
    S("There is a mathematical proof", "A dusty old blackboard covered in long chalk equations and diagrams (no readable symbols), a single apple drawn in the middle. Camera: medium."),
    S("that if you seal an apple inside a box", f"Two hands placing {APPLE} into {BOX} and closing the lid. Camera: close-up."),
    S("and wait for an extremely long time,", f"{BOX} with the apple inside, while the sun and moon race across the window behind in streaks. Camera: wide, time-lapse feel."),
    S("that apple can reform.", f"Glowing particles swirling back together into {APPLE} inside the glass box. Camera: close-up, magical."),
    S("Let's talk about it.", "NARRATOR BOY sits at a desk next to the glass box, turning to the viewer with a curious smile. Camera: medium.", ["BOY"]),
    S("Imagine a perfectly insulated,", f"{BOX}, its walls glowing with a thin protective blue shield layer. Camera: medium."),
    S("airtight box with an apple inside,", f"Close-up of the glass box's tightly sealed lid with rubber gaskets and bolts, {APPLE} inside. Camera: close-up."),
    S("where all the air has been pumped out.", "A brass vacuum pump attached to the glass box by a tube, sucking out wisps of air. Camera: medium."),
    S("Now, what does the", "NARRATOR BOY raises one finger thoughtfully. Camera: medium close-up.", ["BOY"]),
    S("Second Law of Thermodynamics say will happen?", "A neat sandcastle slowly crumbling into a messy pile of sand, an arrow of time drawn as a faint glowing line. Camera: medium."),
    S("The apple will slowly decompose,", f"The apple inside the glass box turning brown and wrinkled, shrinking. Camera: close-up."),
    S("and its atoms will spread", "The rotten apple dissolving into tiny glowing dots drifting outward. Camera: close-up."),
    S("throughout the entire box.", "The glass box now filled with an even cloud of tiny glowing dots, no apple left. Camera: medium."),
    S("But look closely:", "A large magnifying glass held up to the glass box. Camera: medium.", ["BOY"]),
    S("every single atom of the apple", "Extreme close-up through the lens: individual round atoms as little spheres with orbit rings. Camera: macro."),
    S("is still inside that box.", "The sealed box full of drifting dots, nothing escaping, the lid firmly bolted. Camera: medium."),
    S("Only their arrangement has changed,", "Split view: left, atoms neatly packed into an apple shape; right, the same atoms scattered randomly. Camera: medium."),
    S("and they are constantly in motion.", "Tiny atoms zipping around inside the box with motion trails, bouncing off the glass walls. Camera: close-up, dynamic."),
    S("Now, how can this apple reform?", "NARRATOR BOY scratching his head looking at the box of drifting dots, a question-mark shape made of dots above it. Camera: medium.", ["BOY"]),
    S("Behind this lies a mathematical theorem.", "An old leather-bound book glowing as it opens, golden light rising from the pages. Camera: close-up."),
    S("In {1890|eighteen ninety},", "A 19th-century Paris street with gas lamps and horse carriages, an old university building. Camera: wide, sepia tones."),
    S("Henri {Poincaré|pwan karay}", "OLD MATHEMATICIAN at a cluttered wooden desk with an oil lamp, writing with a quill. Camera: medium.", ["MATH"]),
    S("proved that if a closed system", "OLD MATHEMATICIAN pointing at a drawing of a sealed box on his paper. Camera: over-the-shoulder.", ["MATH"]),
    S("is confined within a finite space,", "A sealed glass cube with dots bouncing inside, its walls highlighted with a glowing outline. Camera: medium."),
    S("it will eventually return", "A glowing looping arrow path curving around and coming back to its starting point. Camera: centred."),
    S("arbitrarily close to its initial state—", "Two apples side by side, almost identical, one very slightly different. Camera: close-up."),
    S("and this can happen repeatedly.", "A row of clocks spinning while an apple flickers in and out of existence again and again inside the box. Camera: wide."),
    S("However, there is another crazy twist.", "NARRATOR BOY's eyes widen, eyebrows raised, leaning forward. Camera: close-up.", ["BOY"]),
    S("Returning doesn't mean what you might think.", "A boomerang flying back, but past a confused person. Camera: medium, comedic."),
    S("No one is actively reassembling the apple;", "An empty glass box with no hands or tools near it, a crossed-out ghostly hand floating outside. Camera: medium."),
    S("this occurs purely by chance.", "Dice tumbling through the air, glowing faintly. Camera: close-up."),
    S("Think of it like this:", "NARRATOR BOY holding up both hands like framing an idea. Camera: medium.", ["BOY"]),
    S("imagine a computer randomly guessing a password.", "An old computer monitor showing a blank password field with rows of dots and spinning random symbols as blank shapes. Camera: close-up."),
    S("If it continues trying endlessly,", "The computer surrounded by a huge pile of crumpled paper printouts, a clock spinning. Camera: medium."),
    S("theoretically one day", "A calendar with pages flying off rapidly in the wind. Camera: medium."),
    S("it will guess the correct password.", "The computer screen glowing bright green with an unlocked padlock icon. Camera: close-up."),
    S("The apple's \"password\"", f"{APPLE} with a padlock-shaped glow over it. Camera: close-up."),
    S("is more than ten trillion trillion characters long.", "An endless ribbon of tiny symbols (blank shapes, no readable text) unrolling out of the apple and stretching to the horizon. Camera: wide."),
    S("That means every single atom of the apple", "Countless tiny atoms each glowing with its own small target circle. Camera: macro."),
    S("must be in the exact right place", "Atoms clicking into exact slots on a grid like puzzle pieces. Camera: close-up."),
    S("and moving in the exact right direction.", "Atoms with tiny arrows all pointing in precise directions. Camera: close-up."),
    S("\"Arbitrarily close\" means", "NARRATOR BOY holding two apples, one in each hand, comparing them. Camera: medium.", ["BOY"]),
    S("the apple won't be perfectly identical,", "Two apples side by side under a magnifying glass, one with a tiny extra speck. Camera: close-up."),
    S("but it will be close enough", "Two apples so similar they look the same, side by side. Camera: medium."),
    S("that you wouldn't even notice the difference.", "NARRATOR BOY shrugging with a smile, holding the apples. Camera: medium.", ["BOY"]),
    S("So, how long would you have to wait for this?", "NARRATOR BOY sitting on a chair next to the box, checking his wristwatch impatiently. Camera: medium.", ["BOY"]),
    S("This {timescale|time scale} grows exponentially", "A curve shooting steeply upward on a chart drawn on paper, no numbers. Camera: close-up."),
    S("with the number of atoms.", "A huge swarm of atoms multiplying, filling the frame. Camera: wide."),
    S("In {2024|twenty twenty four}, Dominik Levesque", "TWO SCIENTISTS in a modern lab looking at a large monitor. Camera: medium.", ["SCI"]),
    S("and Nicolas {Sourlas|soor lah} simulated a gas", "A computer screen showing a simulation of bouncing particles in a box. Camera: close-up."),
    S("and estimated that even with just a few hundred particles,", "A small box with only a few hundred dots bouncing inside. Camera: medium."),
    S("such a crude return could take longer", "An hourglass with sand falling very slowly. Camera: close-up."),
    S("than the age of the universe.", "A vast galaxy-filled universe with the faint glow of the Big Bang in the distance. Camera: very wide, cosmic."),
    S("If we're talking about an entire apple,", f"{APPLE} glowing alone in dark space. Camera: centred."),
    S("the number of years required to wait", "Stacks of calendars piled to the sky behind the small glass box. Camera: low angle."),
    S("would contain hundreds of billions of trillions of digits.", "An endless spiral of tiny digit-shaped blobs (no readable numbers) spinning into infinity. Camera: wide, surreal."),
    S("Yet, the moment the apple reappears,", f"{APPLE} suddenly reformed inside the glass box, glowing. Camera: close-up."),
    S("its atoms will still be in constant motion,", "The reformed apple vibrating, with tiny atoms jittering on its surface. Camera: close-up."),
    S("and it would immediately fall apart again.", "The apple bursting back into a cloud of glowing dots. Camera: close-up, dynamic."),
    S("So physics says the apple will return,", "NARRATOR BOY looking up at a glowing apple shape made of dots. Camera: medium.", ["BOY"]),
    S("but the wait for it to reform is so long", "A skeleton sitting in a chair next to the glass box, covered in cobwebs and dust, playful not scary. Camera: medium, comedic."),
    S("that you won't be around to observe it.", "The glass box alone on a desert of dust under a dying red sun, empty chair beside it. Camera: wide, melancholic."),
]


def prompt(line, chars, desc):
    parts = [STYLE]
    if chars:
        parts.append("CHARACTERS:\n" + "\n".join(CHARACTERS[c] for c in chars))
    parts += ["SCENE: " + desc, f'NARRATION FOR THIS IMAGE: "{line}".', AVOID]
    return "\n\n".join(parts)


if __name__ == "__main__":
    md = ["# An Apple In a Box for Infinite Time? Scene Prompts\n"]
    for k, (line, chars, desc) in enumerate(SCENES, 1):
        md += [f"## Scene {k}\n", f"> {line}\n", "```", prompt(line, chars, desc), "```\n"]
    (HERE / "apple-prompts.md").write_text("\n".join(md), encoding="utf-8")
    (ROOT / "projects/apple/scenes.json").write_text(json.dumps(
        [{"line": l, "image": f"scene_{k:02d}.jpg"} for k, (l, _, _) in enumerate(SCENES, 1)], indent=1))
    gen = []
    for k, (line, chars, desc) in enumerate(SCENES, 1):
        p = ("Hand-drawn 2D webcomic illustration, square, full-bleed with no border or frame. Cartoon characters: bold "
             "black outlines, big round heads, flat peach skin, pink blush cheeks, tiny dot eyes, thick expressive "
             "eyebrows. Backgrounds more detailed, soft muted desaturated colours, light paper grain, gentle natural "
             "light. No text, letters, numbers or logos anywhere." + ("" if chars else " NO people or faces unless described.")
             + "\n\n" + ("Characters: " + " ".join(CHARACTERS[c] for c in chars) + "\n" if chars else "") + "Scene: " + desc)
        gen.append([k, p[:1000]])
    (ROOT / "projects/apple/gen_prompts.json").write_text(json.dumps(gen))
    print(len(SCENES), "scenes")
