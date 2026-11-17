"""Why now? -> scene prompts (pencil-sketch stick-figure style from the manipulation reel)."""
import json, re
from pathlib import Path
HERE = Path(__file__).parent; ROOT = HERE.parent.parent; NAME = "whynow"
STYLE = ("Original fictional characters only, not real people. Flat 2D cartoon illustration, square 1:1, full-bleed. Clean bold black "
         "outlines, flat colours with soft simple shading. Characters have big round heads, warm orange-tan skin, small black dot "
         "eyes, simple curved eyebrows, rosy pink cheeks, tiny mouths. Detailed but clean illustrated backgrounds in soft muted "
         "colours (light greys, slate blue, sage, warm beige), calm natural lighting. NO text, letters, numbers or logos anywhere.")
C = {"P": "THE GUY: young man with big curly black hair, teal-grey button-up shirt with rolled sleeves, black jeans, white sneakers, wristwatch.",
     "T": "THE GUY: young man with big curly black hair, teal-grey button-up shirt with rolled sleeves, black jeans, white sneakers, wristwatch.",
     "E": "THE TECH BOSS: older man with swept-back grey hair, black leather jacket, black t-shirt.",
     "B": "THE BANKER: man with slicked black hair, thin moustache, grey suit, sly smile."}
S = lambda line, desc, ch="": (line, desc, ch)
SCENES = [
 S("Everyone's talking", "THE GUY standing in a living room holding his phone, looking at it with a puzzled frown, a TV on in the background.", "P"),
 S("about Nvidia:", "A sleek glass tech headquarters with a green glow, reporters with cameras outside.", ""),
 S("the affair,", "THE TECH BOSS walking quickly, shielding his face from camera flashes.", "E"),
 S("the Chinese spy.", "A shadowy stick figure in a trench coat and sunglasses peeking around a corner.", ""),
 S("But ask yourself,", "THE NARRATOR turning to the viewer, raising one finger.", "T"),
 S("why now?", "THE NARRATOR with narrowed eyes, a big question mark drawn faintly behind him (no text).", "T"),
 S("In the same two weeks,", "A wall calendar with two weeks circled in red pencil (no numbers).", ""),
 S("a digital bank", "A tiny bank icon glowing on a phone screen held by THE PERSON.", "P"),
 S("in Paraguay", "A small South American town square with palm trees and colonial buildings.", ""),
 S("collapsed,", "A bank building crumbling into dust.", ""),
 S("taking millions", "Long queues of worried stick figures outside closed bank doors.", ""),
 S("of people's savings", "A piggy bank cracking open, coins spilling into a dark hole.", ""),
 S("with it.", "THE PERSON staring at an empty wallet, shocked.", "P"),
 S("Binance lost", "A glowing digital vault with its door blown open, coins streaming out.", ""),
 S("{$6.3 billion|six point three billion dollars}", "A mountain of gold coins dissolving into pixels and flying away.", ""),
 S("in the biggest crypto hack ever.", "A hooded hacker stick figure at a glowing laptop in a dark room.", ""),
 S("And when no one", "A crowd of stick figures all looking at their phones, heads down.", ""),
 S("was watching,", "A man in a suit tiptoeing past the distracted crowd carrying a briefcase.", "B"),
 S("the {US|u s} quietly", "A grand domed government building at night with one lit window.", ""),
 S("finalized the rules", "A hand stamping a thick document with a big rubber stamp (no text).", ""),
 S("allowing banks", "Bank buildings lined up along a street.", ""),
 S("to issue their own", "THE BANKER pressing a big button on a glowing machine.", "B"),
 S("digital dollars.", "Glowing digital coins popping out of a phone like a slot machine.", ""),
 S("By the time anyone sees", "THE PERSON finally looking up from his phone, eyes widening.", "P"),
 S("what's actually going on,", "THE PERSON pulling back a curtain revealing gears and wires behind a wall.", "P"),
 S("their money", "Paper banknotes in THE PERSON's hands.", "P"),
 S("is being replaced", "The banknotes dissolving into glowing pixels.", ""),
 S("with a programmable dollar.", "A glowing coin with a tiny padlock and circuit lines, a remote control pointed at it.", ""),
 S("All they had to do", "THE NARRATOR shrugging, unimpressed.", "T"),
 S("was change the color", "A paint bucket pouring over a sign.", ""),
 S("from red to blue", "Two identical podiums, one painted red, one painted blue.", ""),
 S("to keep everyone", "A sleepy crowd sitting on couches in front of TVs.", ""),
 S("complacent", "THE PERSON yawning in an armchair, half asleep.", "P"),
 S("while the agenda", "A shadowy hand unrolling a long blueprint on a table.", ""),
 S("rolls out perfectly.", "Dominoes falling in a perfect line across the floor.", ""),
 S("Two wings", "A big bird with one red wing and one blue wing.", ""),
 S("on the exact same bird.", "The two-coloured bird flying over a city, its shadow covering everything.", ""),
 S("A sex scandal", "Tabloid newspapers flying, reporters crowding with cameras (no readable text).", ""),
 S("is easy to understand.", "THE PERSON nodding, eating popcorn.", "P"),
 S("Monetary policy", "A huge complicated machine of pipes and gears with money flowing through it.", ""),
 S("isn't.", "THE PERSON scratching his head, confused, tangled lines above.", "P"),
 S("Every time", "A clock ticking on the wall.", ""),
 S("the headlines get loud,", "Loudspeakers blaring at a crowd, sound waves everywhere.", ""),
 S("look at what's happening", "THE NARRATOR holding a magnifying glass.", "T"),
 S("quietly.", "In a dim back room, THE BANKER moving pieces on a map table.", "B"),
 S("That's how the system works.", "Giant gears turning behind a city skyline.", ""),
 S("It keeps you watching", "A crowd in a theatre staring at a bright stage.", ""),
 S("the show", "A dazzling spotlight stage with dancing puppets.", ""),
 S("so you don't see", "THE PERSON in the audience, eyes fixed on the stage.", "P"),
 S("the stage being rebuilt.", "Behind the curtain, workers quietly dismantling and rebuilding the stage.", ""),
 S("I trade what", "THE NARRATOR at a desk with trading charts glowing on monitors (no numbers).", "T"),
 S("no one is watching.", "THE NARRATOR walking alone along a quiet path at dusk while the crowd watches screens far behind.", "T"),
]
if __name__ == "__main__":
    disp = lambda l: re.sub(r"\{([^|{}]+)\|[^{}]+\}", r"\1", l)
    (ROOT / f"projects/{NAME}/scenes.json").write_text(json.dumps(
        [{"line": l, "image": f"{k:03d}.png"} for k, (l, _, _) in enumerate(SCENES, 1)], indent=1))
    out = [f"# The Real Reason Behind the Nvidia Scandal: image prompts ({len(SCENES)})", "",
           "Generate each as a square (1:1) image. Save as `001.png`, `002.png`, ... in order.", ""]
    for k, (l, d, ch) in enumerate(SCENES, 1):
        p = STYLE + ("" if ch else " NO people unless described.") + "\n\nScene: " + d + ("\n" + " ".join(C[c] for c in ch) if ch else "")
        out += [f"## {k:03d}  ·  \"{disp(l)}\"", "", "```", p, "```", ""]
    (ROOT / f"projects/{NAME}/image_prompts.md").write_text("\n".join(out))
    print(len(SCENES))
