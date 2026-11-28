"""November 13 overpopulation doomsday script -> scene prompts + projects/apple/scenes.json.

Same style block and format as prompts/build_prompts.py.  Usage: python prompts/nov13/scenes.py
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
    "SCI3": ("THREE SCIENTISTS (1960): three men in 1960s suits with thin ties and white lab coats, one bald with glasses, "
             "one with slicked dark hair, one with a grey crew cut."),
    "MOM": ("INDIAN MOTHER: Indian woman in her 30s, hair in a bun, small bindi, simple cotton saree."),
}

S = lambda line, desc, chars=(): (line, list(chars), desc)
SCENES = [
    S("Is the world really going to end tomorrow,", "A city skyline at dusk under a dramatic red sky, people on a street looking up nervously. Camera: wide."),
    S("on November {13th|thirteenth}?", "A wall calendar page for a November Friday, one date circled in red marker (no readable numbers), a dark storm outside the window. Camera: close-up."),
    S("Why is everyone saying this?", "A crowd of people looking anxiously at their phones on a busy street, phones glowing. Camera: medium-wide."),
    S("Because this date wasn't predicted by a mystic,", "A fortune teller with a crystal ball, faded and crossed out by a big translucent red X. Camera: medium."),
    S("but was calculated {66|sixty six} years ago", "A 1960s laboratory with a huge room-sized computer with tape reels and blinking lights. Camera: wide, vintage tones."),
    S("by three scientists", "THREE SCIENTISTS standing around a chalkboard covered in curves and equations (no readable symbols). Camera: medium.", ["SCI3"]),
    S("and published in one of the world's", "THREE SCIENTISTS shaking hands proudly holding a printed paper (blank). Camera: medium.", ["SCI3"]),
    S("top science magazines.", "A thick 1960s science journal lying open on a desk, its cover blank, a pair of glasses beside it. Camera: close-up."),
    S("They wrote that future generations would not die of hunger,", "A dinner table full of food with a family eating happily. Camera: medium."),
    S("but would be squeezed to death by overcrowding.", "An extremely packed street, people squeezed shoulder to shoulder with no space, comically squished faces. Camera: wide, comedic."),
    S("The alarming part is", "NARRATOR BOY with wide eyes and raised eyebrows, one hand on his cheek. Camera: close-up.", ["BOY"]),
    S("that their formula remained roughly accurate", "A line chart on old graph paper where a real dotted line closely follows a drawn curve upward, no numbers. Camera: close-up."),
    S("for the next {30|thirty} years.", "Calendar pages flying off a wall calendar in a 1970s office, the chart still pinned on the wall. Camera: medium."),
    S("But how did a formula predict", "NARRATOR BOY scratching his head in front of a blackboard with a curve shooting straight up. Camera: medium.", ["BOY"]),
    S("the exact end of the world?", "Earth seen from space with a big red alarm clock floating next to it, ringing. Camera: wide, dramatic."),
    S("Consider this:", "NARRATOR BOY raising one finger like explaining something. Camera: medium.", ["BOY"]),
    S("it took humanity hundreds of thousands of years", "Prehistoric humans in animal skins walking across a vast empty plain, a few small groups only. Camera: very wide."),
    S("to reach the first {1 billion|one billion} people.", "A busy 1800s town square full of people in old clothes, horse carts. Camera: wide."),
    S("The next {1 billion|one billion}", "A crowded early-1900s city street with trams, horse carts and many people. Camera: wide."),
    S("took just {123|one hundred twenty three} years,", "An hourglass with sand pouring, a growing crowd of tiny people piling up in the bottom. Camera: medium."),
    S("and the one after that", "A packed 1950s city with cars, buses and crowded sidewalks. Camera: wide."),
    S("took only {33|thirty three} years.", "A smaller hourglass emptying very fast, crowd piling up quickly at the bottom. Camera: medium."),
    S("As the population grew,", "A map of the world with crowds of tiny people spreading across the continents. Camera: top-down."),
    S("so did new ideas—", "Many glowing light bulbs popping up above a crowd of people. Camera: medium."),
    S("leading to better medicine,", "A doctor giving a vaccine injection to a smiling child in a clinic. Camera: medium."),
    S("more food,", "Huge golden wheat fields with tractors harvesting. Camera: wide."),
    S("lower death rates,", "An old couple in good health walking together in a sunny park. Camera: medium."),
    S("and consequently, even more people.", "A maternity ward with a long row of newborn babies in cribs. Camera: wide."),
    S("When the scientists projected this accelerating pace forward,", "THREE SCIENTISTS pointing at a curve on a chalkboard that bends sharply upward. Camera: medium.", ["SCI3"]),
    S("the interval between population leaps shrank", "A row of hourglasses getting smaller and smaller from left to right. Camera: medium."),
    S("until it would eventually hit zero.", "A tiny hourglass vanishing with a final grain of sand, then nothing. Camera: close-up."),
    S("In other words,", "NARRATOR BOY spreading his hands as if explaining. Camera: medium.", ["BOY"]),
    S("the population would become so immense", "Planet Earth seen from space completely covered in a dense layer of tiny people. Camera: wide, surreal."),
    S("that there wouldn't even be room left to stand on Earth.", "People standing on each other's shoulders in towering human stacks, one man balancing on one foot. Camera: wide, comedic."),
    S("That calculated date turned out to be", "A chalk curve on a blackboard going vertical, with a circle drawn where it shoots off the board. Camera: close-up."),
    S("Friday, November", "A black cat sitting under a flickering street lamp on a gloomy Friday evening. Camera: medium, eerie."),
    S("{13, 2026|thirteenth twenty twenty six}.", "A dark ominous calendar page with one date glowing red. Camera: close-up, eerie."),
    S("So, how did we survive?", "NARRATOR BOY looking at the camera with a curious half smile, eyebrow raised. Camera: medium close-up.", ["BOY"]),
    S("Those same scientists had also proposed the solution:", "THREE SCIENTISTS holding up a big rolled paper plan together, hopeful faces. Camera: medium.", ["SCI3"]),
    S("the world needed to cut its birth rates in half.", "A large pair of scissors cutting a stack of baby cradles icons in half on a chart, no numbers. Camera: medium, symbolic."),
    S("And that is precisely what happened.", "A downward-curving line on a chart smoothly falling, no numbers. Camera: close-up."),
    S("Today, the average number of children per woman globally", "A modern family of four standing together in a park, two kids. Camera: medium."),
    S("is about half of what it was in {1960|nineteen sixty},", "A 1960s black-and-white style family photo with six children lined up. Camera: medium, vintage."),
    S("and in India,", "A busy Indian street with rickshaws, shops and colourful signs (blank), warm light. Camera: wide."),
    S("it has dropped from around six to two.", "INDIAN MOTHER at home with two children, smiling. Camera: medium.", ["MOM"]),
    S("This means their formula wasn't wrong;", "THREE SCIENTISTS nodding at their old chalkboard curve. Camera: medium.", ["SCI3"]),
    S("humanity simply changed course.", "A large ship turning away from a dark storm toward a calm sunny sea. Camera: wide."),
    S("Therefore, the world will not end tomorrow—", "Planet Earth glowing peacefully in space with the sun rising behind it. Camera: wide."),
    S("it will just be another ordinary Friday.", "A normal busy office on a Friday afternoon, people stretching and leaving work happily. Camera: medium-wide."),
    S("But suppose tomorrow truly were", "NARRATOR BOY looking out of a window at night, thoughtful. Camera: medium.", ["BOY"]),
    S("the last day on Earth:", "A sunset over a city skyline, the sky turning deep orange and purple, birds flying away. Camera: wide."),
    S("what would be the very first thing you would do?", "NARRATOR BOY sitting on a rooftop at sunset, thinking deeply, chin on hand. Camera: medium.", ["BOY"]),
    S("Let us know in the comments.", "NARRATOR BOY smiling and typing on his phone, blank comment bubbles floating up. Camera: medium close-up.", ["BOY"]),
]

def prompt(line, chars, desc):
    parts = [STYLE]
    if chars:
        parts.append("CHARACTERS:\n" + "\n".join(CHARACTERS[c] for c in chars))
    parts += ["SCENE: " + desc, f'NARRATION FOR THIS IMAGE: "{line}".', AVOID]
    return "\n\n".join(parts)


if __name__ == "__main__":
    md = ["# Is World Going to End Tomorrow 13 Nov? Scene Prompts\n"]
    for k, (line, chars, desc) in enumerate(SCENES, 1):
        md += [f"## Scene {k}\n", f"> {line}\n", "```", prompt(line, chars, desc), "```\n"]
    (HERE / "nov13-prompts.md").write_text("\n".join(md), encoding="utf-8")
    (ROOT / "projects/nov13/scenes.json").write_text(json.dumps(
        [{"line": l, "image": f"scene_{k:02d}.jpg"} for k, (l, _, _) in enumerate(SCENES, 1)], indent=1))
    gen = []
    for k, (line, chars, desc) in enumerate(SCENES, 1):
        p = ("Hand-drawn 2D webcomic illustration, square, full-bleed with no border or frame. Cartoon characters: bold "
             "black outlines, big round heads, flat peach skin, pink blush cheeks, tiny dot eyes, thick expressive "
             "eyebrows. Backgrounds more detailed, soft muted desaturated colours, light paper grain, gentle natural "
             "light. No text, letters, numbers or logos anywhere." + ("" if chars else " NO people or faces unless described.")
             + "\n\n" + ("Characters: " + " ".join(CHARACTERS[c] for c in chars) + "\n" if chars else "") + "Scene: " + desc)
        gen.append([k, p[:1000]])
    (ROOT / "projects/nov13/gen_prompts.json").write_text(json.dumps(gen))
    print(len(SCENES), "scenes")
