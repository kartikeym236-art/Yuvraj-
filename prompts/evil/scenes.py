"""How to recognize evil people script -> scene prompts + projects/apple/scenes.json.

Same style block and format as prompts/build_prompts.py.  Usage: python prompts/evil/scenes.py
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
            "muted teal-green full-sleeve shirt, sleeves rolled, dark trousers."),
    "VILLAIN": ("CHARMER: tall man in a sharp burgundy suit with slicked-back black hair, a perfect wide toothy smile, "
                "narrow sly eyes and thin arched eyebrows, gold lapel pin."),
    "MACH": ("MACHIAVELLI: Renaissance Italian man, short dark hair, clean-shaven thin face, black robe and black cap."),
    "NIETZ": ("NIETZSCHE: 19th-century German man with a huge bushy walrus moustache, intense eyes, dark coat."),
    "PLATO": ("PLATO: ancient Greek man with a full grey beard, white toga, holding a scroll."),
}
S = lambda line, desc, chars=(): (line, list(chars), desc)
SCENES = [
    S("Here's how to tell", "Dramatic close-up of CHARMER smiling warmly, but his shadow on the wall behind him has red glowing eyes and horns. Camera: close-up, dark red contrast.", ["VILLAIN"]),
    S("if someone", "CHARMER's half face in light and half in dark shadow, one eye glinting. Camera: extreme close-up.", ["VILLAIN"]),
    S("is truly evil.", "CHARMER's smiling face reflected in a mirror that shows a dark monster instead. Camera: medium, eerie.", ["VILLAIN"]),
    S("And this goes back", "Old dusty books flying open in an ancient library, pages turning by themselves. Camera: medium."),
    S("to an observation", "A big glowing eye drawn on old parchment. Camera: close-up."),
    S("that was made by both", "Two old portrait frames side by side on a dark wall. Camera: medium."),
    S("Machiavelli", "MACHIAVELLI writing at a candle-lit desk in Renaissance Florence. Camera: medium.", ["MACH"]),
    S("and Nietzsche.", "NIETZSCHE staring intensely, hand on chin, in a dim study. Camera: medium.", ["NIETZ"]),
    S("They noticed", "MACHIAVELLI and NIETZSCHE both peering through a window at a crowd below. Camera: medium.", ["MACH", "NIETZ"]),
    S("that the most evil people", "CHARMER on a stage under a spotlight, a dark shadow looming behind him. Camera: medium.", ["VILLAIN"]),
    S("also are the most liked.", "A crowd cheering and throwing flowers at CHARMER. Camera: wide.", ["VILLAIN"]),
    S("They're often", "CHARMER winking at the camera. Camera: close-up.", ["VILLAIN"]),
    S("very charismatic", "CHARMER shaking hands with many people at once, sparkles around his smile. Camera: medium.", ["VILLAIN"]),
    S("and can manipulate", "CHARMER as a puppet master with strings attached to small people below. Camera: medium, symbolic.", ["VILLAIN"]),
    S("the crowd", "A huge crowd swaying in the same direction like puppets. Camera: wide."),
    S("to win public favor", "CHARMER holding a golden trophy above the cheering crowd. Camera: low angle.", ["VILLAIN"]),
    S("by telling them lies", "CHARMER speaking into a microphone while a long Pinocchio-like nose shadow appears on the wall behind him. Camera: medium.", ["VILLAIN"]),
    S("that make them", "Crowd members with happy relaxed faces, eyes closed. Camera: medium."),
    S("feel comfortable.", "People lying on soft fluffy pillows in a dream-like cloud, smiling, while CHARMER fans them. Camera: wide.", ["VILLAIN"]),
    S("Plato talked about this", "PLATO teaching students on marble steps in ancient Athens. Camera: medium.", ["PLATO"]),
    S("in The Republic as well.", "PLATO holding up an old scroll, a Greek city with temples behind him. Camera: medium.", ["PLATO"]),
    S("They will tell the audience", "CHARMER at a podium facing a large audience. Camera: wide.", ["VILLAIN"]),
    S("whatever they want to hear", "Audience members with hearts floating above their heads. Camera: medium."),
    S("with a smile on their face,", "Close-up of CHARMER's huge perfect smile, too perfect. Camera: extreme close-up.", ["VILLAIN"]),
    S("acting like a good person,", "CHARMER handing a balloon to a child with a fake halo above his head. Camera: medium.", ["VILLAIN"]),
    S("just so that they", "CHARMER glancing sideways with a sly look while the crowd isn't watching. Camera: close-up.", ["VILLAIN"]),
    S("can get in power,", "CHARMER climbing a golden staircase toward a throne. Camera: low angle.", ["VILLAIN"]),
    S("and then once they're there,", "CHARMER sitting on a huge throne, his smile turning cold. Camera: medium.", ["VILLAIN"]),
    S("they can use it", "CHARMER pressing a big red button on the throne's armrest. Camera: close-up.", ["VILLAIN"]),
    S("to create", "Dark iron gears and chains turning in a grim factory. Camera: medium."),
    S("systemic oppression.", "Tiny people stuck under a huge iron weight, CHARMER smiling above. Camera: wide, dark.", ["VILLAIN"]),
    S("This is why", "NARRATOR BOY raising one finger, serious. Camera: medium.", ["BOY"]),
    S("the fakest people", "CHARMER holding a smiling mask in front of his scowling real face. Camera: close-up.", ["VILLAIN"]),
    S("tend to have", "CHARMER surrounded by people taking selfies with him. Camera: medium.", ["VILLAIN"]),
    S("the most amount of friends.", "A phone screen showing a huge follower crowd icon, hearts flying. Camera: close-up."),
    S("I call them", "NARRATOR BOY narrowing his eyes, arms crossed. Camera: medium.", ["BOY"]),
    S("social chameleons—", "A chameleon in a burgundy suit changing colours to match each background. Camera: medium, playful."),
    S("they just adopt", "The chameleon turning red next to a red group, blue next to a blue group. Camera: medium."),
    S("whatever opinion", "Speech bubbles of different colours (no text) swirling around CHARMER. Camera: medium.", ["VILLAIN"]),
    S("is going to get them", "CHARMER nodding along eagerly with one group. Camera: medium.", ["VILLAIN"]),
    S("the most liked.", "A heart-shaped like counter (no numbers) overflowing above CHARMER. Camera: medium.", ["VILLAIN"]),
    S("And if you can see", "NARRATOR BOY putting on X-ray glasses. Camera: close-up.", ["BOY"]),
    S("through their mask", "Through the X-ray glasses: CHARMER's smiling mask with a dark monster underneath. Camera: medium.", ["VILLAIN"]),
    S("and recognize", "NARRATOR BOY's eyes widening in realisation. Camera: extreme close-up.", ["BOY"]),
    S("their evil tendencies,", "CHARMER's shadow on the wall twisting into a horned demon shape. Camera: medium, eerie.", ["VILLAIN"]),
    S("you become their enemy,", "CHARMER's smile vanishing as he glares straight at NARRATOR BOY. Camera: close-up.", ["VILLAIN"]),
    S("and they will do everything", "CHARMER whispering into the ears of several people. Camera: medium.", ["VILLAIN"]),
    S("to turn everyone else", "A crowd slowly turning their heads to glare in one direction. Camera: wide."),
    S("against you", "NARRATOR BOY standing alone while the crowd points at him. Camera: wide.", ["BOY"]),
    S("and make it seem", "CHARMER pointing at NARRATOR BOY with a fake shocked face. Camera: medium.", ["VILLAIN", "BOY"]),
    S("like you are the bad guy.", "NARRATOR BOY under a harsh spotlight with the crowd booing, CHARMER smirking in the shadows. Camera: wide, dramatic.", ["BOY", "VILLAIN"]),
]

def prompt(line, chars, desc):
    parts = [STYLE]
    if chars:
        parts.append("CHARACTERS:\n" + "\n".join(CHARACTERS[c] for c in chars))
    parts += ["SCENE: " + desc, f'NARRATION FOR THIS IMAGE: "{line}".', AVOID]
    return "\n\n".join(parts)


if __name__ == "__main__":
    md = ["# How to Recognize Evil People: Scene Prompts\n"]
    for k, (line, chars, desc) in enumerate(SCENES, 1):
        md += [f"## Scene {k}\n", f"> {line}\n", "```", prompt(line, chars, desc), "```\n"]
    (HERE / "evil-prompts.md").write_text("\n".join(md), encoding="utf-8")
    (ROOT / "projects/evil/scenes.json").write_text(json.dumps(
        [{"line": l, "image": f"scene_{k:02d}.jpg"} for k, (l, _, _) in enumerate(SCENES, 1)], indent=1))
    gen = []
    for k, (line, chars, desc) in enumerate(SCENES, 1):
        p = ("Hand-drawn 2D webcomic illustration, square, full-bleed with no border or frame. Cartoon characters: bold "
             "black outlines, big round heads, flat peach skin, pink blush cheeks, tiny dot eyes, thick expressive "
             "eyebrows. Backgrounds more detailed, soft muted desaturated colours, light paper grain, gentle natural "
             "light. No text, letters, numbers or logos anywhere." + ("" if chars else " NO people or faces unless described.")
             + "\n\n" + ("Characters: " + " ".join(CHARACTERS[c] for c in chars) + "\n" if chars else "") + "Scene: " + desc)
        gen.append([k, p[:1000]])
    (ROOT / "projects/evil/gen_prompts.json").write_text(json.dumps(gen))
    print(len(SCENES), "scenes")
