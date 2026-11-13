"""Avoid these people script -> scene prompts + projects/apple/scenes.json.

Same style block and format as prompts/build_prompts.py.  Usage: python prompts/avoid/scenes.py
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
    "GOSSIP": ("GOSSIPERS: two young people, a guy with a spiky quiff in a red hoodie and a girl with a high ponytail in a "
               "purple top, smug sneering faces."),
    "RUDE": ("RUDE GUY: young man with slicked-back hair, sunglasses on his head, flashy gold chain, black jacket, arrogant face."),
    "DRIVER": ("CAB DRIVER: middle-aged Indian man with a moustache and a grey cap, light blue shirt."),
    "DELIVERY": ("DELIVERY GUY: young Indian man in an orange delivery t-shirt and cap with a big delivery bag."),
    "DOOMER": ("DOOMER: young man with messy unwashed hair, dark eye bags, wrinkled grey hoodie, gloomy face."),
    "BRO": ("NAYSAYER BRO: young man with a buzz cut and a stubble beard in a green t-shirt, smirking."),
}
S = lambda line, desc, chars=(): (line, list(chars), desc)
SCENES = [
    S("Four types", "Dramatic shot: four dark shadowy silhouettes of people standing in a row under a red warning light, glowing red danger signs above them (no text). Camera: wide, ominous, strong red contrast."),
    S("of people", "Close-up of the four shadowy figures' menacing silhouettes with narrowed glowing eyes. Camera: close-up, dramatic."),
    S("that I have zero", "NARRATOR BOY with arms crossed, stern serious face. Camera: medium.", ["BOY"]),
    S("respect for,", "NARRATOR BOY giving a firm thumbs-down. Camera: close-up.", ["BOY"]),
    S("and I stay away", "NARRATOR BOY walking away confidently, hands in pockets. Camera: medium, from behind.", ["BOY"]),
    S("from them:", "NARRATOR BOY stepping over a line drawn on the ground, leaving the dark figures behind. Camera: wide.", ["BOY"]),
    S("Number one:", "A big glowing red badge with a single bold slash mark on a dark background (no numbers). Camera: centred."),
    S("People who gossip", "GOSSIPERS whispering behind their hands at a cafe table, smug faces. Camera: medium.", ["GOSSIP"]),
    S("and talk shit", "GOSSIPERS laughing meanly and pointing at someone off-screen. Camera: medium.", ["GOSSIP"]),
    S("about others.", "A shy person at the next table hearing the whispers, sad. Camera: medium."),
    S("They call others", "GOSSIPERS pointing at their phone screen and laughing. Camera: close-up.", ["GOSSIP"]),
    S("\"cringe,\"", "GOSSIPERS making exaggerated disgusted 'eww' faces. Camera: close-up, comedic.", ["GOSSIP"]),
    S("but nothing is going", "The gossiper guy alone in a messy dark bedroom, lying on the bed staring at the ceiling. Camera: medium.", ["GOSSIP"]),
    S("on in their own lives.", "An empty wall calendar with nothing planned, a dusty desk and a sad plant. Camera: medium."),
    S("These are {straight-up|straight up}", "NARRATOR BOY shaking his head with a disappointed face. Camera: close-up.", ["BOY"]),
    S("losers.", "GOSSIPERS sitting slumped in a gloomy grey corner while everyone else walks past in bright light. Camera: wide.", ["GOSSIP"]),
    S("Number two:", "Two bold glowing red slash marks on a dark background like a tally (no numbers). Camera: centred."),
    S("People who disrespect", "RUDE GUY rolling his eyes with a sneer. Camera: close-up.", ["RUDE"]),
    S("cab drivers", "RUDE GUY yelling angrily from the back seat of a yellow taxi at the CAB DRIVER. Camera: medium, inside car.", ["RUDE", "DRIVER"]),
    S("and delivery guys.", "RUDE GUY snatching a food parcel at his door without looking at the DELIVERY GUY. Camera: medium.", ["RUDE", "DELIVERY"]),
    S("I don't know why—", "NARRATOR BOY shrugging with a confused, annoyed face. Camera: medium.", ["BOY"]),
    S("even if you're nice", "RUDE GUY smiling sweetly at NARRATOR BOY, offering a handshake. Camera: medium two-shot.", ["RUDE", "BOY"]),
    S("to me,", "NARRATOR BOY looking unconvinced at the handshake. Camera: close-up.", ["BOY"]),
    S("if you don't have", "RUDE GUY turning around and snapping at a waiter. Camera: medium.", ["RUDE"]),
    S("the decency", "A tired DELIVERY GUY standing in the rain holding a parcel, ignored. Camera: medium, sad.", ["DELIVERY"]),
    S("to speak politely", "A kind woman thanking a CAB DRIVER with a warm smile as she gets out. Camera: medium.", ["DRIVER"]),
    S("to another human being,", "The CAB DRIVER smiling back warmly, touched. Camera: close-up.", ["DRIVER"]),
    S("I'm never going", "NARRATOR BOY holding up a palm in a firm stop gesture. Camera: medium.", ["BOY"]),
    S("to like you.", "NARRATOR BOY walking away from RUDE GUY, who looks surprised. Camera: wide.", ["BOY", "RUDE"]),
    S("Number three:", "Three bold glowing red slash marks on a dark background like a tally (no numbers). Camera: centred."),
    S("Doomers.", "DOOMER sitting alone in a dark room under a tiny personal rain cloud, gloomy. Camera: medium, dramatic.", ["DOOMER"]),
    S("These are the people", "DOOMER slouched on a sofa surrounded by snack wrappers. Camera: medium.", ["DOOMER"]),
    S("who complain", "DOOMER ranting with his hands in the air, frustrated face. Camera: close-up.", ["DOOMER"]),
    S("about their lives", "DOOMER talking non-stop on the phone, rolling his eyes. Camera: medium.", ["DOOMER"]),
    S("{24/7|twenty four seven},", "A clock spinning around fast while DOOMER keeps complaining day and night through the window. Camera: medium."),
    S("but won't do anything", "DOOMER lying on the bed ignoring a gym bag and a book next to him. Camera: medium.", ["DOOMER"]),
    S("to fix them.", "A broken bicycle with a toolbox right beside it, untouched and dusty. Camera: medium."),
    S("They always have excuses", "DOOMER holding up a long scroll of excuses (blank lines) unrolling onto the floor. Camera: medium, comedic.", ["DOOMER"]),
    S("and somehow end up", "DOOMER sighing dramatically with a hand on his forehead. Camera: close-up.", ["DOOMER"]),
    S("playing the victim", "DOOMER lying on a fainting couch under a spotlight like a tragic actor. Camera: medium, comedic.", ["DOOMER"]),
    S("in life.", "DOOMER sitting alone on a bench in the rain. Camera: wide, gloomy.", ["DOOMER"]),
    S("I wasted so much", "NARRATOR BOY looking at a big wall clock, exhausted. Camera: medium.", ["BOY"]),
    S("of my time", "An hourglass draining while NARRATOR BOY listens to DOOMER talk. Camera: medium.", ["BOY", "DOOMER"]),
    S("trying to help", "NARRATOR BOY offering DOOMER a glowing light bulb idea, a helpful smile. Camera: medium.", ["BOY", "DOOMER"]),
    S("these people,", "DOOMER pushing the light bulb away without looking. Camera: close-up.", ["DOOMER"]),
    S("but after a point,", "NARRATOR BOY pausing, the light bulb in his hand flickering out. Camera: medium.", ["BOY"]),
    S("I realized", "NARRATOR BOY with a sudden realisation face, eyebrows raised. Camera: close-up.", ["BOY"]),
    S("that some people", "DOOMER turning his back to a wall of solutions: a ladder, a map, a key. Camera: medium.", ["DOOMER"]),
    S("don't want solutions—", "DOOMER throwing a map and a key into a trash can. Camera: medium.", ["DOOMER"]),
    S("they just want to cry", "DOOMER crying cartoon tears into a bucket. Camera: medium, comedic.", ["DOOMER"]),
    S("and bitch about it.", "DOOMER complaining loudly to a bored houseplant. Camera: medium, comedic.", ["DOOMER"]),
    S("Number four:", "Four bold glowing red slash marks on a dark background like a tally (no numbers). Camera: centred."),
    S("People with limiting", "NAYSAYER BRO leaning back with a doubtful smirk, arms crossed. Camera: medium.", ["BRO"]),
    S("beliefs.", "A small bird in a cage made of grey thought bubbles. Camera: close-up, symbolic."),
    S("The second you dream", "NARRATOR BOY looking up at a glowing dream cloud showing a rocket and a mountain peak. Camera: medium.", ["BOY"]),
    S("bigger,", "The dream cloud growing huge and bright above NARRATOR BOY. Camera: wide.", ["BOY"]),
    S("they hit you with:", "NAYSAYER BRO popping the dream cloud with a pin. Camera: medium.", ["BRO"]),
    S("\"Bro, that's way", "NAYSAYER BRO waving his hand dismissively. Camera: close-up.", ["BRO"]),
    S("too difficult,\"", "A giant steep mountain with a tiny NARRATOR BOY at its foot. Camera: wide."),
    S("\"Bro, there's too much", "NAYSAYER BRO shaking his head with a smirk. Camera: close-up.", ["BRO"]),
    S("competition,\"", "A huge crowd of people racing on a track, NARRATOR BOY tiny among them. Camera: wide."),
    S("\"Bro, maybe", "NAYSAYER BRO patting NARRATOR BOY's shoulder with a fake pitying smile. Camera: medium.", ["BRO", "BOY"]),
    S("for you.\"", "NARRATOR BOY looking down, deflated. Camera: close-up.", ["BOY"]),
    S("They just instill", "Grey smoke of doubt curling from NAYSAYER BRO toward NARRATOR BOY's head. Camera: medium.", ["BRO", "BOY"]),
    S("{self-doubt|self doubt}", "NARRATOR BOY's head with a grey storm cloud above it. Camera: close-up.", ["BOY"]),
    S("in you.", "NARRATOR BOY sitting alone on stairs, unsure. Camera: medium.", ["BOY"]),
    S("Stay away", "NARRATOR BOY putting on headphones and turning away from the four characters. Camera: medium.", ["BOY"]),
    S("from them.", "NARRATOR BOY walking out of a dark room into bright sunlight. Camera: wide.", ["BOY"]),
    S("Protect your energy,", "NARRATOR BOY standing tall with a glowing golden shield of light around him. Camera: medium, heroic.", ["BOY"]),
    S("guys.", "NARRATOR BOY smiling and pointing at the viewer, confident. Camera: close-up.", ["BOY"]),
]

def prompt(line, chars, desc):
    parts = [STYLE]
    if chars:
        parts.append("CHARACTERS:\n" + "\n".join(CHARACTERS[c] for c in chars))
    parts += ["SCENE: " + desc, f'NARRATION FOR THIS IMAGE: "{line}".', AVOID]
    return "\n\n".join(parts)


if __name__ == "__main__":
    md = ["# Avoid These People At All Costs: Scene Prompts\n"]
    for k, (line, chars, desc) in enumerate(SCENES, 1):
        md += [f"## Scene {k}\n", f"> {line}\n", "```", prompt(line, chars, desc), "```\n"]
    (HERE / "avoid-prompts.md").write_text("\n".join(md), encoding="utf-8")
    (ROOT / "projects/avoid/scenes.json").write_text(json.dumps(
        [{"line": l, "image": f"scene_{k:02d}.jpg"} for k, (l, _, _) in enumerate(SCENES, 1)], indent=1))
    gen = []
    for k, (line, chars, desc) in enumerate(SCENES, 1):
        p = ("Hand-drawn 2D webcomic illustration, square, full-bleed with no border or frame. Cartoon characters: bold "
             "black outlines, big round heads, flat peach skin, pink blush cheeks, tiny dot eyes, thick expressive "
             "eyebrows. Backgrounds more detailed, soft muted desaturated colours, light paper grain, gentle natural "
             "light. No text, letters, numbers or logos anywhere." + ("" if chars else " NO people or faces unless described.")
             + "\n\n" + ("Characters: " + " ".join(CHARACTERS[c] for c in chars) + "\n" if chars else "") + "Scene: " + desc)
        gen.append([k, p[:1000]])
    (ROOT / "projects/avoid/gen_prompts.json").write_text(json.dumps(gen))
    print(len(SCENES), "scenes")
