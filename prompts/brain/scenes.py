"""Brain storage script -> scene prompts + projects/apple/scenes.json.

Same style block and format as prompts/build_prompts.py.  Usage: python prompts/brain/scenes.py
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
BRAIN = "a pink cartoon human brain"
S = lambda line, desc, chars=(): (line, list(chars), desc)
SCENES = [
    S("Have you ever wondered", "NARRATOR BOY sitting at a desk, chin on hand, gazing up thoughtfully. Camera: medium.", ["BOY"]),
    S("how much storage your brain has?", f"{BRAIN} shown like a computer hard drive, with a glowing storage bar beside it (no numbers). Camera: close-up."),
    S("And is it possible for your memory", "A cutaway of a head in profile with memory bubbles (family photo, bicycle, birthday cake) floating inside. Camera: side view."),
    S("to fully fill up?", f"{BRAIN} overflowing like a stuffed suitcase, memory bubbles spilling out of the top. Camera: close-up, comedic."),
    S("Your brain is so powerful", f"{BRAIN} glowing brightly with lightning sparks around it. Camera: centred, dramatic."),
    S("that if you built a computer with the same capability,", "Engineers building an enormous supercomputer with rows of tall server racks. Camera: wide."),
    S("it would take up five {Walmarts'|walmarts} worth of space,", "Five giant warehouse-style superstores side by side (blank signs), all filled with blinking server racks. Camera: aerial, wide."),
    S("use an entire nuclear power plant for energy,", "A nuclear power plant with two cooling towers puffing steam, thick cables running to a huge computer building. Camera: wide."),
    S("and need an Olympic swimming pool to cool it down.", "An Olympic swimming pool with blue water and lane ropes, steaming as computer cables dip into it. Camera: wide."),
    S("So, how much memory would it really have?", "NARRATOR BOY tilting his head, eyebrows raised, curious. Camera: medium close-up.", ["BOY"]),
    S("Your brain has about {86 billion|eighty six billion} neurons,", "A dense glowing forest of neurons with branching tendrils lighting up in blue. Camera: wide, macro."),
    S("and every neuron has thousands of connections,", "Close-up of one neuron with thousands of thin glowing branches reaching out to others. Camera: macro."),
    S("each one holding roughly", "A tiny glowing spark at a connection point between two neurons. Camera: extreme close-up."),
    S("{0.6|zero point six} bytes of information.", "A tiny glowing data packet like a small cube of light travelling along a neuron branch. Camera: macro."),
    S("And with over {120 trillion|one hundred twenty trillion} connections,", "A vast galaxy-like web of countless glowing connections filling the frame. Camera: wide, cosmic."),
    S("that equals to {2.5 million|two point five million}", "A glowing brain placed on one side of a balance scale, a mountain of hard drives on the other, perfectly level. Camera: medium."),
    S("gigabytes of storage,", "A towering stack of hard drives and memory cards reaching into the clouds. Camera: low angle."),
    S("which, to put into crazy perspective,", "NARRATOR BOY with wide eyes holding both hands to his head, mind blown, small sparkles around. Camera: close-up.", ["BOY"]),
    S("you would have to {doomscroll|doom scroll}", "NARRATOR BOY lying on a sofa at night scrolling his phone with a tired face, screen glow on his face. Camera: medium.", ["BOY"]),
    S("for almost {79|seventy nine} years", "The same sofa, NARRATOR BOY now an old man with white curly hair and a long beard, still scrolling the phone, dust and cobwebs around. Camera: medium, comedic.", ["BOY"]),
    S("downloading {83 million|eighty three million} {YouTube|you tube} Shorts", "A waterfall of tiny vertical video cards (blank screens) pouring down into a giant brain. Camera: wide, surreal."),
    S("just like this one to fill it up.", "A phone screen showing a tiny version of the narrator, the phone sitting next to a glowing brain. Camera: close-up."),
    S("But that's actually not possible,", "NARRATOR BOY wagging his finger with a playful smile. Camera: medium.", ["BOY"]),
    S("because while you're sleeping,", "NARRATOR BOY asleep in bed under a blanket at night, moonlight through the window. Camera: medium, calm.", ["BOY"]),
    S("your brain replays everything that happened during the day", f"A glowing film strip of daytime scenes (walking, eating, talking) looping around {BRAIN} above a sleeping head. Camera: medium, dreamy."),
    S("and permanently deletes useless information", f"A tiny cartoon janitor inside {BRAIN} sweeping glowing bits into a trash can. Camera: close-up, playful."),
    S("like what you had for lunch,", "A memory bubble showing a sandwich on a plate, crumbling away into dust. Camera: close-up."),
    S("which means your brain will never fill up.", f"{BRAIN} with a neat, half-empty storage bar, tidy and calm. Camera: close-up."),
    S("And it does this constantly,", f"{BRAIN} with gears turning and lights blinking busily inside. Camera: medium."),
    S("all while running every other system in your body", "A cartoon human body diagram with the brain connected by glowing lines to the heart, lungs and stomach. Camera: front view."),
    S("and using less energy", f"{BRAIN} plugged into a tiny wall socket with a thin cable. Camera: close-up."),
    S("than an {LED|l e d} light.", "A small glowing LED bulb in a simple desk lamp on a bedside table, soft warm light. Camera: close-up."),
]

def prompt(line, chars, desc):
    parts = [STYLE]
    if chars:
        parts.append("CHARACTERS:\n" + "\n".join(CHARACTERS[c] for c in chars))
    parts += ["SCENE: " + desc, f'NARRATION FOR THIS IMAGE: "{line}".', AVOID]
    return "\n\n".join(parts)


if __name__ == "__main__":
    md = ["# How Much Storage Does Your Brain Have? Scene Prompts\n"]
    for k, (line, chars, desc) in enumerate(SCENES, 1):
        md += [f"## Scene {k}\n", f"> {line}\n", "```", prompt(line, chars, desc), "```\n"]
    (HERE / "brain-prompts.md").write_text("\n".join(md), encoding="utf-8")
    (ROOT / "projects/brain/scenes.json").write_text(json.dumps(
        [{"line": l, "image": f"scene_{k:02d}.jpg"} for k, (l, _, _) in enumerate(SCENES, 1)], indent=1))
    gen = []
    for k, (line, chars, desc) in enumerate(SCENES, 1):
        p = ("Hand-drawn 2D webcomic illustration, square, full-bleed with no border or frame. Cartoon characters: bold "
             "black outlines, big round heads, flat peach skin, pink blush cheeks, tiny dot eyes, thick expressive "
             "eyebrows. Backgrounds more detailed, soft muted desaturated colours, light paper grain, gentle natural "
             "light. No text, letters, numbers or logos anywhere." + ("" if chars else " NO people or faces unless described.")
             + "\n\n" + ("Characters: " + " ".join(CHARACTERS[c] for c in chars) + "\n" if chars else "") + "Scene: " + desc)
        gen.append([k, p[:1000]])
    (ROOT / "projects/brain/gen_prompts.json").write_text(json.dumps(gen))
    print(len(SCENES), "scenes")
