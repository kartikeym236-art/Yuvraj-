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
 S("Everyone's talking about Nvidia:", 'THE GUY standing in a living room holding his phone, looking at it with a puzzled frown, a TV on in the background.', 'P'),
 S('the affair, the Chinese spy.', 'THE TECH BOSS walking quickly, shielding his face from camera flashes.', 'E'),
 S('But ask yourself, why now?', 'THE GUY turning to the viewer, raising one finger.', 'T'),
 S('In the same two weeks,', 'A wall calendar with two weeks circled in red pencil (no numbers).', ''),
 S('a digital bank in Paraguay', 'A tiny bank icon glowing on a phone screen held by THE GUY.', 'P'),
 S('collapsed, taking millions', 'A bank building crumbling into dust.', ''),
 S("of people's savings with it.", 'THE GUY staring at an empty wallet, shocked.', 'P'),
 S('Binance lost {$6.3 billion|six point three billion dollars}', 'A glowing digital vault with its door blown open, coins streaming out.', ''),
 S('in the biggest crypto hack ever.', 'A hooded hacker person at a glowing laptop in a dark room.', ''),
 S('And when no one was watching,', 'A man in a suit tiptoeing past the distracted crowd carrying a briefcase.', ''),
 S('the {US|u s} quietly finalized the rules', 'A grand domed government building at night with one lit window.', ''),
 S('allowing banks to issue their own', 'THE BANKER pressing a big button on a glowing machine.', 'B'),
 S('digital dollars. By the time anyone sees', 'THE GUY finally looking up from his phone, eyes widening.', 'P'),
 S("what's actually going on,", 'THE GUY pulling back a curtain revealing gears and wires behind a wall.', 'P'),
 S('their money is being replaced', "Paper banknotes in THE GUY's hands.", 'P'),
 S('with a programmable dollar.', 'A glowing coin with a tiny padlock and circuit lines, a remote control pointed at it.', ''),
 S('All they had to do was change the color', 'THE GUY shrugging, unimpressed.', 'T'),
 S('from red to blue to keep everyone', 'Two identical podiums, one painted red, one painted blue.', ''),
 S('complacent while the agenda', 'THE GUY yawning in an armchair, half asleep.', 'P'),
 S('rolls out perfectly.', 'Dominoes falling in a perfect line across the floor.', ''),
 S('Two wings on the exact same bird.', 'A big bird with one red wing and one blue wing.', ''),
 S('A sex scandal is easy to understand.', 'THE GUY nodding, eating popcorn.', 'P'),
 S('Monetary policy', 'A huge complicated machine of pipes and gears with money flowing through it.', ''),
 S("isn't. Every time the headlines get loud,", 'THE GUY scratching his head, confused, tangled lines above.', 'P'),
 S("look at what's happening quietly.", 'THE GUY holding a magnifying glass.', 'TB'),
 S("That's how the system works.", 'Giant gears turning behind a city skyline.', ''),
 S('It keeps you watching the show', 'A crowd in a theatre staring at a bright stage.', ''),
 S("so you don't see the stage being rebuilt.", 'THE GUY in the audience, eyes fixed on the stage.', 'P'),
 S('I trade what no one is watching.', 'THE GUY at a desk with trading charts glowing on monitors (no numbers).', 'T'),
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
