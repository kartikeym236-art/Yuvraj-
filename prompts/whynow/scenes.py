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
 S("Everyone's talking about Nvidia:", 'THE GUY holding his phone, looking at it with a puzzled frown, plain living room.', 'P'),
 S('the affair, the Chinese spy.', 'THE GUY watching a TV showing a man in a leather jacket with a shadowy figure in sunglasses behind him.', 'P'),
 S('But ask yourself, why now?', 'THE GUY looking straight at the viewer, one finger raised, curious eyebrow.', 'P'),
 S('In the same two weeks,', 'A simple wall calendar with two weeks circled in red (no numbers).', ''),
 S('a digital bank in Paraguay', 'A small bank building on a sunny South American street with palm trees.', ''),
 S('collapsed, taking millions', 'The same small bank building cracked and crumbling, people outside looking shocked.', ''),
 S("of people's savings with it.", 'A broken piggy bank with a few coins spilling out on a table.', ''),
 S('Binance lost {$6.3 billion|six point three billion dollars}', 'A big pile of gold coins with a padlock broken open beside it.', ''),
 S('in the biggest crypto hack ever.', 'A hooded hacker typing on a glowing laptop in a dark room.', ''),
 S('And when no one was watching,', 'THE GUY and other people all staring down at their phones on a street.', 'P'),
 S('the {US|u s} quietly finalized the rules', 'A government building with a hand stamping a document on a desk in front of it.', ''),
 S('allowing banks to issue their own', 'A bank building with glowing digital coins floating out of its door.', ''),
 S('digital dollars. By the time anyone sees', 'THE GUY holding a phone with a glowing digital coin on the screen.', 'P'),
 S("what's actually going on,", 'THE GUY looking up from his phone, eyes wide, realising something.', 'P'),
 S('their money is being replaced', 'THE GUY holding paper money that is turning into glowing pixels.', 'P'),
 S('with a programmable dollar.', 'A glowing coin with a small padlock and a remote control pointed at it.', ''),
 S('All they had to do was change the color', 'A paint bucket pouring paint over a podium.', ''),
 S('from red to blue to keep everyone', 'Two identical podiums side by side, one red, one blue.', ''),
 S('complacent while the agenda', 'THE GUY relaxed on a couch watching TV, half asleep.', 'P'),
 S('rolls out perfectly.', 'A row of dominoes falling one after another.', ''),
 S('Two wings on the exact same bird.', 'A bird with one red wing and one blue wing.', ''),
 S('A sex scandal is easy to understand.', 'THE GUY eating popcorn watching a TV with camera flashes on screen.', 'P'),
 S('Monetary policy', 'THE GUY scratching his head in front of a whiteboard full of money arrows.', 'P'),
 S("isn't. Every time the headlines get loud,", 'THE GUY covering his ears as loudspeakers blare.', 'P'),
 S("look at what's happening quietly.", 'THE GUY holding a magnifying glass toward a quiet back room door.', 'P'),
 S("That's how the system works.", 'Big gears turning behind a city skyline.', ''),
 S('It keeps you watching the show', 'THE GUY sitting in a theatre watching a bright stage.', 'P'),
 S("so you don't see the stage being rebuilt.", 'Behind a stage curtain, workers quietly rebuilding the stage.', ''),
 S('I trade what no one is watching.', 'THE GUY at a desk with trading charts on his monitors, calm smile.', 'P'),
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
