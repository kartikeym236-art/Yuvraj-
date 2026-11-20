"""Jensen comeback reel -> 1:1 prompts, Two Barbers flat orange-skin cartoon style."""
import json, re
from pathlib import Path
ROOT = Path(__file__).resolve().parents[2]; NAME = "peace3"
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
("THE BLOND LEADER, THE EASTERN LEADER and THE NORTHERN LEADER seated at one round table in a grand hall, tense faces.","TXP"),
("Close view of the three leaders at the table, nameplates blank, flags behind them (no text).","TXP"),
("THE EASTERN LEADER and THE NORTHERN LEADER shaking hands across the table.","XP"),
("A grand red-and-gold Chinese-style meeting hall with lanterns, heavy doors closing.",""),
("Three pens signing one document on a polished table.",""),
("A white dove flying over a document, three people clapping softly in the background.",""),
("Worried people in Tokyo, Seoul and a European city looking at TV screens.",""),
("THE INDIAN LEADER smiling calmly, sitting relaxed in a chair.","M"),
("An old black-and-white style seaside palace on a cliff by the sea.",""),
("Three old 1940s leaders seated outdoors in winter coats, an old map in front of them.",""),
("Old leaders drawing lines on a map of Europe with a pencil.",""),
("A closed wooden door with people waiting outside, unable to enter.",""),
("A man in an olive t-shirt speaking firmly at a podium.",""),
("A map piece of a country in blue and yellow held protectively in two hands (no text).",""),
("A Japanese city street with cherry blossoms, people looking worried at the sky.",""),
("A red-walled fortress building with domes under snow.",""),
("Old World War Two style soldiers of three armies marching side by side.",""),
("Old maps of Japan and Germany with red arrows pointing at them.",""),
("A Seoul skyline at dusk with a tall tower, a fence in the foreground.",""),
("THE BLOND LEADER looking at his watch beside an empty chair at a table.","T"),
("An empty chair at a table, a name card blank.",""),
("A map of the Korean peninsula on a table, hands of big leaders hovering over it.",""),
("Heavy doors of a closed room with a red light above.",""),
("Three giant missile silos lined up in a desert at sunset.",""),
("Aides in suits standing outside the closed door, holding folders, shut out.",""),
("A calendar page with February circled in red (no numbers).",""),
("A treaty paper being torn in half.",""),
("A broken fence with no boundary, missiles behind it.",""),
("THE GUY holding a document and raising an eyebrow.","G"),
("A cracked mushroom cloud drawing crossed out with a big X.",""),
("Diplomats sitting around a small table talking with notepads.",""),
("A ruler and a pile of missiles, a question mark above.",""),
("An empty page with a magnifying glass over it.",""),
("A factory building more and more missiles on a conveyor.",""),
("A missile racing ahead of others on a track.",""),
("A courthouse with tall columns, a judge's gavel on the steps.",""),
("A wanted poster with a silhouette (no text) pinned to a wall.",""),
("A big glass building with flags of many nations, workers repairing it.",""),
("Oil tankers and fuel trucks lined up at a port.",""),
("A long document with a blank space where a country is missing.",""),
("THE GUY pointing at the document, frowning.","G"),
("Three small figures outside a window watching big leaders inside.",""),
("Small countries as little houses left outside a big locked gate.",""),
("THE INDIAN LEADER walking confidently along a garden path in Delhi.","M"),
("THE INDIAN LEADER, THE EASTERN LEADER and THE NORTHERN LEADER laughing together in a photo moment.","MXP"),
("THE BLOND LEADER looking at a phone showing a photo of three leaders, frowning.","T"),
("A map with arrows from two countries pointing toward a third.",""),
("THE BLOND LEADER sitting down at a table with THE EASTERN LEADER and THE NORTHERN LEADER.","TXP"),
("An airplane landing at a big airport at night.",""),
("THE BLOND LEADER speaking at a podium in a tropical city, palm trees behind.","T"),
("THE BLOND LEADER grinning and making a tough-guy fist.","T"),
("THE GUY leaning in, whispering to the viewer.","G"),
("Three small houses with no roofs in the rain.",""),
("A huge umbrella held over three small houses by a giant hand.",""),
("A giant hand holding the umbrella over a small figure.",""),
("A rented umbrella with a price tag hanging from it.",""),
("A small figure standing alone in the rain as the giant umbrella is pulled away.",""),
("A strong umbrella standing firmly on its own over a small figure, sunny behind.",""),
("Rows of missiles standing in a secure hangar.",""),
("A missile launcher truck on a desert road.",""),
("A fighter jet in the sky and a submarine in the sea.",""),
("THE INDIAN LEADER standing alone, no alliance flags around him.","M"),
("THE INDIAN LEADER shaking hands with three different leaders in a row.","MTX"),
("Three small figures under someone else's umbrella in the rain.",""),
("A small figure holding its own sturdy umbrella, smiling, then pointing at the viewer.",""),
]
SCENES = [tuple(x) for x in json.load(open(Path(__file__).parent / "scenes_fine.json"))]
if __name__ == "__main__":
    disp = lambda l: re.sub(r"\{([^|{}]+)\|[^{}]+\}", r"\1", l)
    (ROOT/f"projects/{NAME}/scenes.json").write_text(json.dumps([{"line": l, "image": f"{k:03d}.png"} for k,(l,_,_) in enumerate(SCENES,1)], indent=1))
    out = [f"# Why India Isn't Worried: image prompts ({len(SCENES)})", "", "Generate each as a square (1:1) image. Save as `001.png`, `002.png`, ... in order.", ""]
    for k,(l,d,c) in enumerate(SCENES,1):
        p = STYLE + ("" if c else " NO people unless described.") + "\n\nScene: " + d + ("\n" + " ".join(C[x] for x in c) if c else "")
        out += [f"## {k:03d}  ·  \"{disp(l)}\"", "", "```", p, "```", ""]
    (ROOT/f"projects/{NAME}/image_prompts.md").write_text("\n".join(out)); print(len(SCENES))
