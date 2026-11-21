"""Jensen comeback reel -> 1:1 prompts, Two Barbers flat orange-skin cartoon style."""
import json, re
from pathlib import Path
ROOT = Path(__file__).resolve().parents[2]; NAME = "france"
L = json.load(open(Path(__file__).parent / "lines.json"))
STYLE = ("Original fictional characters only, not real people. Flat 2D cartoon illustration, square 1:1, full-bleed. Clean bold black "
         "outlines, flat colours with soft simple shading. Characters have big round heads, warm orange-tan skin, small black dot "
         "eyes, simple curved eyebrows, rosy pink cheeks, tiny mouths. Detailed but clean illustrated backgrounds in soft muted "
         "colours (light greys, slate blue, sage, warm beige), calm natural lighting. NO text, letters, numbers or logos anywhere.")
C = {"T": "THE BLOND LEADER: older man with swooping blond hair, dark navy suit, very long red tie.",
     "X": "THE EASTERN LEADER: older man with neatly combed black hair, round face, dark grey suit.",
     "P": "THE NORTHERN LEADER: older man with thinning light hair, pale skin, stern face, dark suit.",
     "M": "THE INDIAN LEADER: older man with a neat white beard and white hair, cream kurta and sleeveless vest.",
     "G": "THE GUY: young man with big curly black hair, teal-grey button-up shirt with rolled sleeves, black jeans."}
D = [
("The Eiffel Tower at dusk with a giant red stock chart crashing behind it, people on the street looking up in shock.",""),
("A French bank building with cracks spreading across its facade.",""),
("A man in a beret dropping his baguette in shock while watching a falling chart on a big screen.",""),
("Many warning lights flashing at once on a big control panel.",""),
("A French city street where several small fires, a broken ATM and a closed shop appear at once.",""),
("A clock on a Paris building with every alarm bell ringing at the same time.",""),
("A huge pile of IOU papers stacked like a mountain beside a small French house.",""),
("A giant scale with a debt pile on one side heavier than a pile of goods on the other.",""),
("The debt pile towering over the whole city skyline.",""),
("A bond certificate with an arrow shooting up off the chart.",""),
("A shopping basket of bread and cheese with its price tag growing larger.",""),
("THE GUY grimacing with both hands on his head.","G"),
("A long line of people outside an unemployment office in the rain.",""),
("A sad worker holding a cardboard box of desk items outside a closed factory.",""),
("A calendar page torn off, last month circled.",""),
("THE GUY explaining with open hands in his living room.","G"),
("A juggler in a beret trying to hold four burning balls at once, panicking.",""),
("Fixing one leak in a boat makes two more leaks spray water.",""),
("A stern official in a suit at a podium in front of a French flag.",""),
("A big red ledger book with negative numbers glowing red (no readable text).",""),
("Government buildings filled with clerks and paperwork.",""),
("A pie chart where the government slice is more than half.",""),
("A map outline of France glowing with that big slice.",""),
("Scissors cutting a budget sheet in half.",""),
("Workers being handed pink slips at a government office.",""),
("A rising red unemployment arrow on a chart.",""),
("More people joining the long unemployment line.",""),
("A central-bank official pulling a big lever up.",""),
("A thermometer of prices with a hand pushing it down.",""),
("Bond papers flying upward with arrows.",""),
("A huge interest bill landing on the government's desk.",""),
("Coins pouring out of a treasury into a bank's pocket.",""),
("The finance minister holding his head at his desk.",""),
("A shrinking factory with smoke stopping and gates closing.",""),
("Even more people in the jobless line, rain falling.",""),
("THE GUY pointing at a chart with the unemployment arrow.","G"),
("Workers walking into a busy new factory.",""),
("A central-bank official pulling the lever down.",""),
("Government money flowing into building sites and shops.",""),
("Shops busy again, but price tags shooting up.",""),
("A debt snowball rolling down a hill growing huge.",""),
("The snowball crashing into the city.",""),
("A bread price tag climbing higher.",""),
("A shopper staring at the high price, worried.",""),
("Crowds of protesters with smoke and flags filling a Paris boulevard at night.",""),
("Riot police lines facing angry protesters, fires behind.",""),
("Tired, worried citizens holding protest signs (no text).",""),
("Politicians in suits frozen around a table, stuck.",""),
("A politician holding a lever, afraid to pull it, the building cracking around him.",""),
]
SCENES = [tuple(x) for x in json.load(open(Path(__file__).parent / "scenes_fine.json"))]
if __name__ == "__main__":
    disp = lambda l: re.sub(r"\{([^|{}]+)\|[^{}]+\}", r"\1", l)
    (ROOT/f"projects/{NAME}/scenes.json").write_text(json.dumps([{"line": l, "image": f"{k:03d}.png"} for k,(l,_,_) in enumerate(SCENES,1)], indent=1))
    out = [f"# Why France Can't Fix Its Economy: image prompts ({len(SCENES)})", "", "Generate each as a square (1:1) image. Save as `001.png`, `002.png`, ... in order.", ""]
    for k,(l,d,c) in enumerate(SCENES,1):
        p = STYLE + ("" if c else " NO people unless described.") + "\n\nScene: " + d + ("\n" + " ".join(C[x] for x in c) if c else "")
        out += [f"## {k:03d}  ·  \"{disp(l)}\"", "", "```", p, "```", ""]
    (ROOT/f"projects/{NAME}/image_prompts.md").write_text("\n".join(out)); print(len(SCENES))
