"""Jensen comeback reel -> 1:1 prompts, Two Barbers flat orange-skin cartoon style."""
import json, re
from pathlib import Path
ROOT = Path(__file__).resolve().parents[2]; NAME = "storage"
L = json.load(open(Path(__file__).parent / "lines.json"))
STYLE = ("Original fictional characters only, not real people. Flat 2D cartoon illustration, square 1:1, full-bleed. Clean bold black "
         "outlines, flat colours with soft simple shading. Characters have big round heads, warm orange-tan skin, small black dot "
         "eyes, simple curved eyebrows, rosy pink cheeks, tiny mouths. Detailed but clean illustrated backgrounds in soft muted "
         "colours (light greys, slate blue, sage, warm beige), calm natural lighting. NO text, letters, numbers or logos anywhere.")
C = {"G": "THE GUY: young man with big curly black hair, teal-grey button-up shirt with rolled sleeves, black jeans."}
D = [
("THE GUY holding a stack of cash, dreaming of a house in a thought bubble.","G"),
("A row of suburban houses with SOLD signs (no text).",""),
("THE GUY shaking his head, holding his nose.","G"),
("A broken toilet overflowing water in a bathroom.",""),
("An apartment block with a leaking roof, water dripping into buckets.",""),
("Rain pouring through a hole in a ceiling.",""),
("A burst pipe spraying water under a sink.",""),
("Angry tenants knocking on a landlord's door.",""),
("THE GUY snapping his fingers with an idea, lightbulb above.","G"),
("THE GUY walking away from the apartments, smiling.","G"),
("THE GUY handing cash to a farmer over a fence.","G"),
("An empty dusty lot of land beside a quiet road.",""),
("A crane dropping metal shipping containers onto the lot.",""),
("Twenty metal containers lined up in neat rows on concrete.",""),
("A container interior with no pipes, empty.",""),
("Plain metal container walls with no windows.",""),
("Rows of grey metal and a concrete floor.",""),
("THE GUY cutting a ribbon in front of the storage units.","G"),
("Self-storage units with orange roll-up doors.",""),
("A garage crammed with boxes, bikes and old furniture.",""),
("A family happily pushing a cart of boxes to a storage unit.",""),
("A hand handing cash to THE GUY.","G"),
("Old junk boxes stacked inside a unit.",""),
("A roll-up door closing on a dark unit.",""),
("A pile of cash growing on a desk.",""),
("THE GUY relaxing in a hammock beside the units.","G"),
("A clean, quiet storage yard with no repairs needed.",""),
("A calendar with month three circled.",""),
("A storage unit door with a red unpaid notice (no text).",""),
("An empty mailbox with no payment.",""),
("An apartment building at night.",""),
("A landlord stuck in a long eviction process, piles of paper.",""),
("A calendar flipping months.",""),
("Lawyers in suits holding out bills.",""),
("A storage unit standing alone.",""),
("A cosy home with a red X over it.",""),
("A contract on a clipboard with a pen.",""),
("An unpaid bill with a red stamp.",""),
("A letter being mailed in an official envelope.",""),
("An auction gavel on a table.",""),
("The storage unit door closed with a big padlock.",""),
("Bolt cutters snapping the padlock.",""),
("The door rolling up, light spilling in.",""),
("A big flat-screen TV inside the unit.",""),
("A brown leather sofa inside the unit.",""),
("A bag of golf clubs.",""),
("All the items lined up in the unit.",""),
("A laptop showing an online auction page (no text).",""),
("A small pile of cash being handed over.",""),
("A receipt marked paid (no text).",""),
("THE GUY sweeping out the empty unit.","G"),
("A new customer shaking THE GUY's hand at the unit.","G"),
("A sunrise over the storage yard.",""),
("THE GUY holding a golden key that glows.","G"),
("Trucks delivering many more containers.",""),
("A crane stacking another hundred containers.",""),
("A big metal gate being installed at the entrance.",""),
("A keypad with glowing buttons on the gate.",""),
("Confetti over THE GUY standing in front of his storage empire.","G"),
("An aerial view of 200 containers in neat rows.",""),
("Rows of orange doors stretching to the horizon.",""),
("A giant stack of cash on a desk.",""),
("THE GUY counting money with sunglasses on.","G"),
("THE GUY ignoring a phone, feet up on a desk.","G"),
("A spotless toilet that has never been touched, THE GUY giving a thumbs up.","G"),
]
SCENES = [tuple(x) for x in json.load(open(Path(__file__).parent / "scenes_fine.json"))]
if __name__ == "__main__":
    disp = lambda l: re.sub(r"\{([^|{}]+)\|[^{}]+\}", r"\1", l)
    (ROOT/f"projects/{NAME}/scenes.json").write_text(json.dumps([{"line": l, "image": f"{k:03d}.png"} for k,(l,_,_) in enumerate(SCENES,1)], indent=1))
    out = [f"# The Laziest Real Estate Business: image prompts ({len(SCENES)})", "", "Generate each as a square (1:1) image. Save as `001.png`, `002.png`, ... in order.", ""]
    for k,(l,d,c) in enumerate(SCENES,1):
        p = STYLE + ("" if c else " NO people unless described.") + "\n\nScene: " + d + ("\n" + " ".join(C[x] for x in c) if c else "")
        out += [f"## {k:03d}  ·  \"{disp(l)}\"", "", "```", p, "```", ""]
    (ROOT/f"projects/{NAME}/image_prompts.md").write_text("\n".join(out)); print(len(SCENES))
