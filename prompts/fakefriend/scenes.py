"""3 Signs of a Fake Friend -> 48 scene prompts (pencil-sketch stick-figure style, like the manipulation reel)."""
import json, re
from pathlib import Path
HERE = Path(__file__).parent; ROOT = HERE.parent.parent; NAME = "fakefriend"
STYLE = ("Hand-drawn pencil sketch illustration, square 1:1, full-bleed, no border. Simple stick figures: big round "
         "pale-yellow heads with a few messy hair strands, tiny dot eyes, expressive eyebrows, thin black single-line "
         "bodies, arms and legs. Soft muted colouring: warm beige, sand, sage green, dusty blue-grey, with light pencil "
         "hatching. Simple scenery: a lake, rolling hills, a park bench, a cafe, or plain interiors. "
         "NO text, letters or numbers anywhere.")
C = {"Y": "THE YOUNG MAN: ordinary stick figure, round pale-yellow head with a small tuft of hair, kind worried eyes, teal t-shirt.",
     "F": "THE FAKE FRIEND: stick figure, round pale-yellow head with spiky hair, sly toothy grin, narrow eyes, mustard hoodie."}
S = lambda line, desc, ch="": (line, desc, ch)
SCENES = [
 S("Three signs of a fake friend.", "HOOK, DRAMATIC: the fake friend hugging the young man with a big smile, while behind the young man's back his other hand holds a cracked smiling mask, his real face behind it frowning darkly. Strong shadow, dramatic contrast.", "YF"),
 S("Number one.", "A single tall wooden signpost on a dirt path by a lake, the young man standing at its foot.", "Y"),
 S("They only call you for", "The fake friend calling on a phone with a big fake smile and pleading eyebrows.", "F"),
 S("help.", "The young man carrying the fake friend's heavy boxes up the stairs while the fake friend points.", "YF"),
 S("The moment that you ask for help.", "The young man stuck under a fallen bookshelf, reaching out a hand.", "Y"),
 S("they don't give it.", "The fake friend walking away with hands in pockets, ignoring the young man's reaching hand.", "YF"),
 S("But the moment they ask.", "The fake friend snapping his fingers impatiently at the young man.", "YF"),
 S("they expect it right", "The young man running fast carrying a toolbox towards the fake friend, sweat drops.", "YF"),
 S("away.", "The fake friend tapping his wrist watch with an annoyed face.", "F"),
 S("They only want you", "The fake friend holding the young man like a tool, a wrench in the other hand.", "YF"),
 S("for help.", "The young man as a tiny figure pulling a cart with the fake friend lounging in it.", "YF"),
 S("Number two.", "Two tall wooden signposts on a dirt path by the lake.", ""),
 S("They gossip about", "The fake friend whispering into another person's ear, hand cupped, sly grin.", "F"),
 S("your privacy.", "A diary with a broken lock lying open on a table. No writing visible.", ""),
 S("Every time you tell them", "The young man and the fake friend sitting on a park bench, the young man talking sincerely.", "YF"),
 S("something in private.", "The young man whispering a secret, a tiny glowing heart floating between them.", "YF"),
 S("and you tell them. \"Hey.", "The young man raising a finger, serious face.", "Y"),
 S("please don't share this", "The young man holding a finger to his lips, shushing.", "Y"),
 S("with anybody.\"", "The fake friend nodding and zipping his lips with his fingers, eyes shifty.", "F"),
 S("and you open up", "The young man with a little open door drawn on his chest, light coming out.", "Y"),
 S("to them.", "The young man hugging the fake friend, who looks away slyly.", "YF"),
 S("they gossip that to all", "The fake friend with a megaphone shouting to a crowd of stick figures.", "F"),
 S("the other friends.", "A group of friends at a cafe table laughing and pointing at a phone.", ""),
 S("They open up to everybody", "The fake friend at a party telling a story to a circle of people, arms wide.", "F"),
 S("else.", "Many stick figures passing the glowing secret heart from hand to hand.", ""),
 S("they share your problems.", "The young man's secret drawn as a paper airplane flying around the room.", ""),
 S("That's not a friend.", "The young man standing alone, staring sadly at the group laughing in the distance.", "Y"),
 S("Number three.", "Three tall wooden signposts on a dirt path by the lake.", ""),
 S("They keep making", "The fake friend laughing loudly, pointing at the young man.", "YF"),
 S("jokes that hurt you.", "Sharp little paper arrows flying from the fake friend's mouth into the young man's chest.", "YF"),
 S("Even though you tell them.", "The young man holding up a hand, asking to stop.", "Y"),
 S("\"Hey bro.", "The young man putting a hand on the fake friend's shoulder.", "YF"),
 S("you know what?", "The young man with a serious, hurt face, eyebrows tilted.", "Y"),
 S("Don't say that.", "The young man making a stop gesture with both hands.", "Y"),
 S("that hurts me.", "The young man holding his chest where a small crack appears in a drawn heart.", "Y"),
 S("You know I'm insecure", "The young man looking at a mirror, his reflection small and hunched.", "Y"),
 S("about that.\"", "The young man hugging his knees, a small dark cloud above his head.", "Y"),
 S("or.", "The young man looking down, thinking, a thought bubble starting.", "Y"),
 S("\"You know I went through", "A flashback: the young man walking alone in the rain under a grey sky.", "Y"),
 S("a hard time in my life", "The young man sitting alone on a bench by a grey lake, head in hands.", "Y"),
 S("when that happened.\"", "A torn old photograph on the ground, rain drops on it. No faces readable.", ""),
 S("and they keep making", "The fake friend laughing even harder, slapping his knee, at a group table.", "F"),
 S("jokes about it.", "Others at the table laughing while the young man sits silently with his head down.", "Y"),
 S("That's not a real", "The fake friend's grinning face cracking like a mask.", "F"),
 S("friend.", "The mask falling off the fake friend, revealing a sly shadowy face.", "F"),
 S("You've told them to stop.", "The young man standing firm, pointing at a STOP-shaped red sign with no letters.", "Y"),
 S("and they keep on", "The fake friend ignoring the sign and walking past it, grinning.", "F"),
 S("proceeding with it.", "The young man walking away from the fake friend towards a sunny hill, head up, calm and free.", "Y"),
]
if __name__ == "__main__":
    out = ["# 3 Signs of a Fake Friend: image prompts (%d)" % len(SCENES), "",
           "Generate each as a square (1:1) image. Save as `001.png`, `002.png`, ... in order.", ""]
    for k, (l, d, ch) in enumerate(SCENES, 1):
        p = STYLE + ("" if ch else " NO people unless described.") + "\n\nScene: " + d + ("\n" + " ".join(C[c] for c in ch) if ch else "")
        out += [f"## {k:03d}  ·  \"{l}\"", "", "```", p, "```", ""]
    (ROOT / f"projects/{NAME}/image_prompts.md").write_text("\n".join(out))
    (ROOT / f"projects/{NAME}/scenes.json").write_text(json.dumps(
        [{"line": l, "image": f"{k:03d}.png"} for k, (l, _, _) in enumerate(SCENES, 1)], indent=1))
    print(len(SCENES))
