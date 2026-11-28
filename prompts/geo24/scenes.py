"""Jensen comeback reel -> 1:1 prompts, Two Barbers flat orange-skin cartoon style."""
import json, re
from pathlib import Path
ROOT = Path(__file__).resolve().parents[2]; NAME = "geo24"
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
("A glowing world map on a dark wall with red alert dots flashing across several countries.",""),
("A big wall clock with the hands spinning fast over a newsroom.",""),
("A TV news studio with a red breaking-news banner on screen (no text), anchor looking shocked.",""),
("Missiles streaking across a night sky over a small European town.",""),
("A crater and smoke in a field, a small Polish village in the background.",""),
("Soldiers of many countries training together in a muddy field, tanks behind them.",""),
("Troops loading onto trucks, practising a convoy toward a border.",""),
("A road sign at a border with trucks lined up, a blue-and-yellow flag ahead (no text).",""),
("A serious European official at a podium pointing firmly.",""),
("Air-defence missile launchers raised and pointing at the sky.",""),
("Air-defence crew in helmets on high alert at radar screens.",""),
("A calendar with yesterday circled.",""),
("THE BLOND LEADER and THE NORTHERN LEADER shaking hands, smiling.","TP"),
("THE BLOND LEADER, THE EASTERN LEADER and THE NORTHERN LEADER holding up a signed document together.","TXP"),
("A white dove flying above a globe.",""),
("The three leaders smiling for cameras, flashes popping.","TXP"),
("An American city skyline at night with a flag.",""),
("A hooded hacker typing at a glowing laptop in a dark room.",""),
("A government building with its screens glitching red.",""),
("Farm fields and a grocery store shelf with a padlock over it.",""),
("A dark newsroom with warning screens.",""),
("Officials in a control room looking at red warning maps.",""),
("Power lines, water towers and pipes flashing with red warning lights.",""),
("Waves crossing the ocean toward the British coast, London skyline at dusk.",""),
("A stern military officer in a dark command room with many screens.",""),
("Rows of operators typing at glowing keyboards in a cyber command centre.",""),
("A world map with digital arrows flying toward several countries.",""),
("Digital lightning bolts hitting more points on the map.",""),
("The officer leaning toward the camera with a serious face.",""),
("A half-sunny, half-stormy sky over a quiet city.",""),
("A colourful Copenhagen harbour with old houses and boats.",""),
("A Danish official reading a statement at a podium.",""),
("A diplomat in a dark suit walking out of an embassy carrying a suitcase.",""),
("A shadowy figure studying a photo on a table with a red circle around it.",""),
("A young rapper with a cap and chains holding a microphone on stage.",""),
("Police cars outside a concert hall at night.",""),
("A snowy forest road with a border barrier closing.",""),
("Guards lowering a heavy gate at a border crossing.",""),
("A long empty border fence stretching across snow.",""),
("THE NORTHERN LEADER at a desk, cold stare.","P"),
("Fiery explosions in the night sky above a city.",""),
("Many missiles and drones streaking across the sky toward a river city.",""),
("A big bridge over a wide river being hit, smoke rising.",""),
("Another damaged bridge with broken sections, emergency lights.",""),
("Rescuers carrying stretchers in a smoky street. No blood.",""),
("A row of embassy buildings with flags.",""),
("Diplomats hurrying into cars with suitcases.",""),
("THE NORTHERN LEADER speaking on a TV screen, finger raised.","P"),
("Ukrainian soldiers in a trench watching a phone screen.",""),
("A hand reaching out across a muddy no-man's land.",""),
("A big old history book open on a desk, light shining on it.",""),
("A golden desert and the blue Gulf sea at sunset, warships on the water.",""),
("Generals planning around a map table, fighter jets on screens.",""),
("Fighter jets lined up on a carrier deck.",""),
("A missile on a launcher in the desert.",""),
("An ambassador in a suit speaking at a microphone.",""),
("American soldiers sitting in a desert base looking at the horizon.",""),
("THE GUY pointing at the viewer with a phone in hand, a world map behind him.","G"),
]
SCENES = [tuple(x) for x in json.load(open(Path(__file__).parent / "scenes_fine.json"))]
if __name__ == "__main__":
    disp = lambda l: re.sub(r"\{([^|{}]+)\|[^{}]+\}", r"\1", l)
    (ROOT/f"projects/{NAME}/scenes.json").write_text(json.dumps([{"line": l, "image": f"{k:03d}.png"} for k,(l,_,_) in enumerate(SCENES,1)], indent=1))
    out = [f"# The World Is Quietly Going to War: image prompts ({len(SCENES)})", "", "Generate each as a square (1:1) image. Save as `001.png`, `002.png`, ... in order.", ""]
    for k,(l,d,c) in enumerate(SCENES,1):
        p = STYLE + ("" if c else " NO people unless described.") + "\n\nScene: " + d + ("\n" + " ".join(C[x] for x in c) if c else "")
        out += [f"## {k:03d}  ·  \"{disp(l)}\"", "", "```", p, "```", ""]
    (ROOT/f"projects/{NAME}/image_prompts.md").write_text("\n".join(out)); print(len(SCENES))
