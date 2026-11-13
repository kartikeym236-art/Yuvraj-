"""Chess positions script -> scene prompts + projects/apple/scenes.json.

Same style block and format as prompts/build_prompts.py.  Usage: python prompts/chess/scenes.py
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
    S("This is how many different positions", "A wooden chessboard on a table with chess pieces mid-game, warm lamp light. Camera: close-up, angled."),
    S("a chessboard can have.", "Many ghostly translucent copies of the same chessboard floating in the air, each with pieces in different places. Camera: wide, magical."),
    S("Not games,", "Two chess players shaking hands over a board, faded and crossed out by a big translucent red X. Camera: medium."),
    S("just legal positions:", "A single chessboard frozen in a glowing spotlight, pieces neatly placed, a soft green check-mark glow around it. Camera: close-up."),
    S("about {48|forty eight} followed by {43|forty three} zeros.", "An endless line of glowing round zero shapes (plain rings, no digits) stretching across a dark sky to the horizon. Camera: wide, surreal."),
    S("To feel it,", "NARRATOR BOY leaning forward with an intrigued look, one hand raised. Camera: medium close-up.", ["BOY"]),
    S("take all {8 billion|eight billion} people on Earth.", "Planet Earth seen from space with countless tiny glowing dots of people covering the continents. Camera: wide."),
    S("Give each one a computer", "A huge crowd of people each sitting at their own small laptop, stretching into the distance. Camera: wide, aerial."),
    S("that checks a billion positions every second.", "A laptop screen with tiny chessboards flickering past at incredible speed, motion blur streaks. Camera: close-up, dynamic."),
    S("Now, start them all at the Big Bang", "The Big Bang: a brilliant explosion of light and colour in dark space. Camera: wide, cosmic."),
    S("and let them run until today.", "A timeline of the universe: galaxies forming, then Earth, then a modern city at night, all in one sweeping panorama. Camera: wide."),
    S("They still wouldn't have checked", "Exhausted people slumped over their laptops among cobwebs and dust, screens still flickering. Camera: medium, comedic."),
    S("even one out of every {100 million|one hundred million}.", "A giant mountain of chessboards with just one tiny glowing board at its foot. Camera: wide, low angle."),
    S("So that little board on your table", "A small chessboard on a cosy wooden coffee table next to a cup of tea. Camera: close-up, warm light."),
    S("holds more positions", "The small chessboard glowing, a swirling galaxy of chessboards spiralling up out of it. Camera: medium, magical."),
    S("than all of humanity could check", "A huge crowd of people of all ages looking up in awe at a sky full of chessboards. Camera: wide, low angle."),
    S("since the beginning of time.", "An ancient hourglass the size of a mountain under a starry sky, sand still falling. Camera: wide, epic."),
    S("What would you love to see explained next?", "NARRATOR BOY sitting beside a chessboard, looking at the viewer with a curious smile. Camera: medium.", ["BOY"]),
    S("Follow me and I'll explain it.", "NARRATOR BOY waving warmly at the viewer, holding a chess knight piece in his other hand. Camera: medium close-up.", ["BOY"]),
]

def prompt(line, chars, desc):
    parts = [STYLE]
    if chars:
        parts.append("CHARACTERS:\n" + "\n".join(CHARACTERS[c] for c in chars))
    parts += ["SCENE: " + desc, f'NARRATION FOR THIS IMAGE: "{line}".', AVOID]
    return "\n\n".join(parts)


if __name__ == "__main__":
    md = ["# How Many Positions Can a Chessboard Have? Scene Prompts\n"]
    for k, (line, chars, desc) in enumerate(SCENES, 1):
        md += [f"## Scene {k}\n", f"> {line}\n", "```", prompt(line, chars, desc), "```\n"]
    (HERE / "chess-prompts.md").write_text("\n".join(md), encoding="utf-8")
    (ROOT / "projects/chess/scenes.json").write_text(json.dumps(
        [{"line": l, "image": f"scene_{k:02d}.jpg"} for k, (l, _, _) in enumerate(SCENES, 1)], indent=1))
    gen = []
    for k, (line, chars, desc) in enumerate(SCENES, 1):
        p = ("Hand-drawn 2D webcomic illustration, square, full-bleed with no border or frame. Cartoon characters: bold "
             "black outlines, big round heads, flat peach skin, pink blush cheeks, tiny dot eyes, thick expressive "
             "eyebrows. Backgrounds more detailed, soft muted desaturated colours, light paper grain, gentle natural "
             "light. No text, letters, numbers or logos anywhere." + ("" if chars else " NO people or faces unless described.")
             + "\n\n" + ("Characters: " + " ".join(CHARACTERS[c] for c in chars) + "\n" if chars else "") + "Scene: " + desc)
        gen.append([k, p[:1000]])
    (ROOT / "projects/chess/gen_prompts.json").write_text(json.dumps(gen))
    print(len(SCENES), "scenes")
