"""Jensen comeback reel -> 1:1 prompts, Two Barbers flat orange-skin cartoon style."""
import json, re
from pathlib import Path
ROOT = Path(__file__).resolve().parents[2]; NAME = "debt11"
L = json.load(open(Path(__file__).parent / "lines.json"))
STYLE = ("Original fictional characters only, not real people. Flat 2D cartoon illustration, square 1:1, full-bleed. Clean bold black "
         "outlines, flat colours with soft simple shading. Characters have big round heads, warm orange-tan skin, small black dot "
         "eyes, simple curved eyebrows, rosy pink cheeks, tiny mouths. Detailed but clean illustrated backgrounds in soft muted "
         "colours (light greys, slate blue, sage, warm beige), calm natural lighting. NO text, letters, numbers or logos anywhere.")
C = {"G": "THE GUY: young man with big curly black hair, teal-grey button-up shirt with rolled sleeves, black jeans.",
     "T": "THE BLOND LEADER: older man with swooping blond hair, dark navy suit, very long red tie."}
D = [
 ('HOOK, DRAMATIC: THE BLOND LEADER standing on a balcony pressing a giant red button while a huge stock chart crashes in red behind him over a city at dusk.', 'T'),
 ('A trading floor with screens turning red, traders panicking.', ''),
 ('A giant red arrow smashing through the floor of a stock exchange.', ''),
 ('THE GUY raising a finger, about to explain.', 'G'),
 ('A magnifying glass over a huge stack of documents.', ''),
 ('A mountain of IOU papers towering over a city.', ''),
 ('An American-style capitol building buried under debt papers.', ''),
 ('A calendar with loan papers expiring, an hourglass running out.', ''),
 ('A big white domed government building with a flag.', ''),
 ('A debt counter on a giant wall with endless spinning digits (no readable numbers).', ''),
 ('Government bond certificates on a desk with an upward red arrow.', ''),
 ('A thermometer with interest rising into the red.', ''),
 ('A treasury official opening a vault.', ''),
 ('Money flying out of the vault in waves.', ''),
 ('A calendar flipping years, money leaking each year.', ''),
 ('A bank receiving a giant pile of interest coins.', ''),
 ('A scale: interest bills heavier than a pile of tanks and jets.', ''),
 ('Military jets and tanks looking small beside a mountain of bills.', ''),
 ('THE BLOND LEADER at a desk with advisors, worried.', 'T'),
 ('Advisors pulling levers on a big machine labelled with arrows (no text).', ''),
 ('A hand trying to push a rising arrow down.', ''),
 ('Officials buying back bond papers with bags of money.', ''),
 ('A finance chart being redrawn on a whiteboard.', ''),
 ('Papers being shuffled into new folders.', ''),
 ('A central bank chair being swapped for a new one.', ''),
 ('An older central banker walking out, a new one walking in with a briefcase.', ''),
 ('The yield arrow still climbing up the wall.', ''),
 ('A computer chip cracking in half.', ''),
 ('Chip company stocks falling off a cliff on a screen.', ''),
 ('THE GUY pointing at a screen with a small downward arrow.', 'G'),
 ('A long bond certificate with a ten-year calendar.', ''),
 ('An arrow sliding down a hill.', ''),
 ('The arrow landing gently on a lower step.', ''),
 ('Investors running in panic on a trading floor.', ''),
 ('People dumping stocks into a bin.', ''),
 ('Bags of money flying from stocks into a safe vault.', ''),
 ('A safe building with bond papers stacked inside.', ''),
 ('The yield arrow pushed down by a heavy money bag.', ''),
 ('The arrow resting low, calm.', ''),
 ('A grand central bank building with columns.', ''),
 ('Bank officials debating around a long table.', ''),
 ('A rate lever being considered by a nervous hand.', ''),
 ('The lever with small steps marked up (no numbers).', ''),
 ('THE GUY shrugging with a smirk.', 'G'),
 ('The lever untouched, collecting dust.', ''),
 ('An official only pointing at the lever, not pulling it.', ''),
 ('A shadow of a raised hand over the lever.', ''),
 ('Scared investors hiding behind desks.', ''),
 ('Investors peeking out nervously.', ''),
 ('A belt being tightened around a fat money bag.', ''),
 ('A credit card being cut with scissors.', ''),
 ('An oil barrel tipping over.', ''),
 ('An oil price chart falling down.', ''),
 ('Shopping prices on a board coming down.', ''),
 ('A thermometer of inflation cooling.', ''),
 ('A rate lever left alone, a check mark next to it.', ''),
 ('The lever with a padlock on it.', ''),
 ('A loan arrow lowering.', ''),
 ('A slide going gently down.', ''),
 ('A small step down on a staircase.', ''),
 ('Workers refinancing loan papers at a counter.', ''),
 ('A mountain of debt papers being re-stamped.', ''),
 ('Lower interest tags being attached to the papers.', ''),
 ('A calculator and a thinking official.', ''),
 ('THE BLOND LEADER smiling at savings.', 'T'),
 ('Bags of money being saved into a vault.', ''),
 ('A calendar with years of savings coins.', ''),
 ('THE GUY counting on fingers, smiling.', 'G'),
 ('A report paper with a downward line on a desk.', ''),
 ('A December calendar with snow outside.', ''),
 ('Central bank officials deciding not to pull the lever.', ''),
 ("Stocks climbing with Santa's sleigh riding the chart up.", ''),
 ('Happy investors celebrating under Christmas lights, Santa on a rising chart.', ''),
]
SCENES = [tuple(x) for x in json.load(open(Path(__file__).parent / "scenes_fine.json"))]
if __name__ == "__main__":
    disp = lambda l: re.sub(r"\{([^|{}]+)\|[^{}]+\}", r"\1", l)
    (ROOT/f"projects/{NAME}/scenes.json").write_text(json.dumps([{"line": l, "image": f"{k:03d}.png"} for k,(l,_,_) in enumerate(SCENES,1)], indent=1))
    out = [f"# Why Trump Might Want a Crash: image prompts ({len(SCENES)})", "", "Generate each as a square (1:1) image. Save as `001.png`, `002.png`, ... in order.", ""]
    for k,(l,d,c) in enumerate(SCENES,1):
        p = STYLE + ("" if c else " NO people unless described.") + "\n\nScene: " + d + ("\n" + " ".join(C[x] for x in c) if c else "")
        out += [f"## {k:03d}  ·  \"{disp(l)}\"", "", "```", p, "```", ""]
    (ROOT/f"projects/{NAME}/image_prompts.md").write_text("\n".join(out)); print(len(SCENES))
