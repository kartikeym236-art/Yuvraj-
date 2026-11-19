"""Jensen comeback reel -> 1:1 prompts, Two Barbers flat orange-skin cartoon style."""
import json, re
from pathlib import Path
ROOT = Path(__file__).resolve().parents[2]; NAME = "jensen3"
L = json.load(open(Path(__file__).parent / "lines.json"))
STYLE = ("Original fictional characters only, not real people. Flat 2D cartoon illustration, square 1:1, full-bleed. Clean bold black "
         "outlines, flat colours with soft simple shading. Characters have big round heads, warm orange-tan skin, small black dot "
         "eyes, simple curved eyebrows, rosy pink cheeks, tiny mouths. Detailed but clean illustrated backgrounds in soft muted "
         "colours (light greys, slate blue, sage, warm beige), calm natural lighting. NO text, letters, numbers or logos anywhere.")
C = {"J": "THE CHIP BOSS: older man with swept-back silver-grey hair, black leather jacket, black t-shirt.",
     "E": "THE ROCKET BOSS: tall man with short dark hair, black t-shirt and dark jacket, confident smirk.",
     "L": "THE LEADER: older man with swooping blond hair, dark navy suit, very long red tie.",
     "W": "THE WIFE: elegant older woman with short dark bob hair, cream blouse.",
     "G": "THE GUY: young man with big curly black hair, teal-grey button-up shirt with rolled sleeves, black jeans."}
D = [
("THE CHIP BOSS walking up a sunny path toward a big glass office building, carrying a small suitcase, a calm smile.","J"),
("A wall calendar with a few days crossed out, a cardboard box of desk items on a table beside it.",""),
("A chess board on a table with a silver-haired king piece being moved back to the centre.",""),
("THE GUY looking at the viewer with one eyebrow raised, finger up, in his living room.","G"),
("A big satellite dish on a rooftop picking up strong glowing signal waves.",""),
("Many people on a busy street all staring at their phones, chat bubbles floating above them.",""),
("THE GUY holding a magnifying glass over a stack of newspapers on a desk.","G"),
("A stack of salmon-pink newspapers on a newsstand (no readable text).",""),
("THE CHIP BOSS sitting at a cafe table with three friends, leaning in, planning on a napkin.","J"),
("THE CHIP BOSS drawing an arrow pointing up on a whiteboard, friends nodding.","J"),
("Several executives in smart casual clothes standing together in front of a sunny tech campus with palm trees.",""),
("A dark room with a big table covered in maps and laptops, executives pointing at a screen.",""),
("A grand white government building with columns at sunset.",""),
("Executives shaking hands and smiling around a table.",""),
("A clipboard petition on a table with a pen, a long line of people waiting to sign.",""),
("A huge pile of signed paper sheets towering over a small desk.",""),
("Office workers with lanyards lined up to sign the petition in a tech office lobby.",""),
("Employees in a modern office holding up hand-drawn heart signs (no text).",""),
("THE ROCKET BOSS signing the petition with a big pen, smirking.","E"),
("A game developer with glasses and a beard signing the petition, other well-dressed people behind him.",""),
("Many famous-looking people in sunglasses signing at a long table.",""),
("Two investors in suits sealing letters with wax seals at a desk.",""),
("A boardroom table with letters dropped in front of board members.",""),
("THE LEADER speaking at a podium with a thumbs up.","L"),
("THE LEADER pointing at a framed portrait of THE CHIP BOSS.","LJ"),
("THE ROCKET BOSS standing in front of a rocket launch pad, hand raised.","E"),
("THE ROCKET BOSS bowing politely to THE CHIP BOSS, offering a handshake.","EJ"),
("A rocket lifting off into a blue sky.",""),
("A humanoid robot holding a glowing computer chip.",""),
("A sleek electric car with a glowing chip inside its open hood.",""),
("A giant glowing computer chip at the centre with rockets, robots and cars orbiting it.",""),
("THE CHIP BOSS standing on top of a podium of chips like a champion.","J"),
("THE GUY explaining with open hands in his living room.","G"),
("Runners racing on a track, each carrying a glowing chip as a baton.",""),
("A pie chart drawn on a board with one huge green slice.",""),
("A stock chart line crashing down off a cliff, coins falling.",""),
("A huge pile of money melting away like ice.",""),
("A row of tall office towers connected by glowing cables to one chip factory.",""),
("A tall modern tower with a small glowing brain sign (no text).",""),
("A rocket, a robot and a car standing in line waiting for chips.",""),
("A big data center building with racks of servers inside.",""),
("An empty leader's chair at the head of a boardroom table.",""),
("A slow delivery truck stuck in traffic carrying chip boxes.",""),
("A rival runner overtaking the leader on a race track.",""),
("THE GUY turning around, hand raised, 'other side' gesture.","G"),
("Board members around a long table with a closed folder, serious faces.",""),
("A hiring sign hanging on a glass office door (no text), empty chair inside.",""),
("THE CHIP BOSS sitting with his head down at a desk, a lamp on.","J"),
("Investigators in suits examining files and a magnifying glass under a lamp.",""),
("A pile of gossip magazines with question marks drawn over them (no readable text).",""),
("THE CHIP BOSS shaking his head, hand raised to stop.","J"),
("People on phones with gossip bubbles and question marks floating everywhere.",""),
("THE GUY sitting on a sofa, thoughtful, hand on chin.","G"),
("A balance scale with a home on one side and an office on the other, balanced.",""),
("THE CHIP BOSS standing in a doorway of light, a second chance.","J"),
("THE CHIP BOSS in front of a giant glowing tower of chips that reaches the clouds.","J"),
("A globe with the chip tower standing on top of it.",""),
("A small coffee spill on a table, someone shrugging.",""),
("THE CHIP BOSS and THE WIFE walking together on a sunny street, smiling.","JW"),
("THE WIFE smiling calmly, people around her shrugging.","W"),
("A simple dinner plate on a home kitchen table.",""),
("THE CHIP BOSS presenting a glowing chip to a crowd of happy engineers.","J"),
("Happy employees cheering in an office around THE CHIP BOSS.","J"),
("THE CHIP BOSS walking back through the big glass doors, everyone clapping.","J"),
("Industry leaders standing together giving a thumbs up.",""),
("Men in suits quietly buying stock at trading screens early in the morning.",""),
("A green stock chart rocketing up, regular people looking surprised at their phones.",""),
("THE GUY pointing at the viewer with a friendly smile, phone in hand.","G"),
]
SCENES = [tuple(x) for x in json.load(open(Path(__file__).parent / "scenes_fine.json"))]
if __name__ == "__main__":
    disp = lambda l: re.sub(r"\{([^|{}]+)\|[^{}]+\}", r"\1", l)
    (ROOT/f"projects/{NAME}/scenes.json").write_text(json.dumps([{"line": l, "image": f"{k:03d}.png"} for k,(l,_,_) in enumerate(SCENES,1)], indent=1))
    out = [f"# Jensen Huang Is Coming Back: image prompts ({len(SCENES)})", "", "Generate each as a square (1:1) image. Save as `001.png`, `002.png`, ... in order.", ""]
    for k,(l,d,c) in enumerate(SCENES,1):
        p = STYLE + ("" if c else " NO people unless described.") + "\n\nScene: " + d + ("\n" + " ".join(C[x] for x in c) if c else "")
        out += [f"## {k:03d}  ·  \"{disp(l)}\"", "", "```", p, "```", ""]
    (ROOT/f"projects/{NAME}/image_prompts.md").write_text("\n".join(out)); print(len(SCENES))
