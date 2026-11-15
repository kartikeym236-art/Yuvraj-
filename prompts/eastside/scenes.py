"""Why Is East Side Always Poorer Than West? -> 75 scene prompts in the user's reference style (prompts/eastside/ref)."""
import json, re
from pathlib import Path
HERE = Path(__file__).parent; ROOT = HERE.parent.parent; NAME = "eastside"
STYLE = ("Warm hand-drawn coloured-pencil storybook illustration, square 1:1, full-bleed, no border, visible paper and "
         "pencil texture. Golden warm lighting, soft greens, ochres and sunset oranges. Simple stick figures: big round "
         "plain cream-white heads with a few short hair strands on top, small black dot eyes, simple expressive mouth, "
         "thin black single-line arms and legs. Detailed cosy painted backgrounds. NO text, letters or numbers anywhere.")
GUY = "THE GUY: stick figure with a round cream-white head, three short hair strands on top, white t-shirt, thin black limbs."
S = lambda line, desc, guy=False: (line, desc, guy)
SCENES = [
 S("Why is the east side", "HOOK: aerial view of one big city split down the middle by a river: the left (west) half bright, golden and green with sunshine and parks, the right (east) half grey and gloomy under thick dark smoke clouds. Dramatic contrast."),
 S("of any city", "A city skyline at sunset seen from a hill, a compass rose drawn in the sky with E pointing right."),
 S("always poorer?", "THE GUY scratching his head, puzzled, looking at a run-down street of cracked old houses.", True),
 S("In Delhi,", "Old Delhi street with India Gate in the distance, busy rickshaws, warm dusty light."),
 S("Mumbai, London,", "Split view: Mumbai's Gateway of India by the sea on the left, London's Big Ben and red bus on the right."),
 S("Paris,", "Paris street with the Eiffel Tower in the distance, cafe tables, warm evening light."),
 S("almost every", "A spinning globe on a wooden desk with little city pins all over it."),
 S("major city,", "A big busy city skyline with many tall buildings under a golden sky."),
 S("it's always the east", "A city map on a table with the east half shaded grey and a finger pointing at it."),
 S("side that is poor.", "Crumbling houses, broken windows and laundry lines on a poor street, a stray cat, muted colours."),
 S("But to explain the reason", "THE GUY sitting at a wooden desk with an open book, one finger raised to explain.", True),
 S("behind this, first", "THE GUY lighting a candle beside a stack of old history books.", True),
 S("I need to take you back", "A big old grandfather clock with its hands spinning backwards, swirls of wind around it."),
 S("{200|two hundred} years.", "THE GUY stepping through a glowing doorway into an old 1800s town with cobblestone streets.", True),
 S("When the Industrial Revolution", "1800s industrial town: brick factories with tall chimneys, steam engines and horse carts, golden smoky light."),
 S("was underway,", "Workers in flat caps walking into a big brick factory at dawn."),
 S("factories were", "Inside a factory: huge iron gears, steam machines and conveyor belts, warm orange glow."),
 S("opening up across", "A row of new factories being built with scaffolding and cranes."),
 S("every city.", "Wide view of a whole 1800s city full of factory chimneys."),
 S("And these factories produced", "Close-up of tall brick chimneys puffing out thick black smoke."),
 S("huge amounts", "Giant clouds of dark smoke billowing up and filling the sky."),
 S("of smoke.", "THE GUY coughing and waving his hand in front of his face in a cloud of smoke.", True),
 S("All of this smoke drifted", "Smoke from many chimneys leaning sideways in the wind, all drifting to the right."),
 S("directly toward", "Long dark smoke trails flowing across the sky over rooftops, to the right."),
 S("the east side.", "The east half of the old city covered under a heavy dark smoke cloud, the west half clear."),
 S("That's because in the Northern", "A big globe with the northern half highlighted in warm light."),
 S("Hemisphere, winds", "Swirling wind lines with leaves blowing across a field."),
 S("consistently", "A weathervane on a rooftop pointing steadily to the east, wind lines around it."),
 S("blow from west", "Cartoon wind face puffing cheeks on the left side of the sky, blowing to the right."),
 S("to east.", "Big curved arrows of wind sweeping across a map from left to right."),
 S("This meant that all", "Bird's-eye view of a city map with arrows of smoke moving right."),
 S("the smoke from the factories", "Factory chimneys on the left edge of town sending smoke over the rooftops."),
 S("settled directly over", "A thick grey blanket of smog settling low over small terraced houses."),
 S("the east side.", "Families on a grey smoky street covering their noses, washing on lines turned grey."),
 S("Now, anyone with", "A rich man in a top hat and his wife in fine clothes looking out of a carriage window, frowning at the smoke."),
 S("money wasn't going to live", "The rich couple holding handkerchiefs over their noses, disgusted by the smoky street."),
 S("in that smoke.", "A fancy house with its windows shut tight against a smoky sky."),
 S("So, all the wealthy", "Wealthy families in top hats and gowns loading trunks onto horse carriages."),
 S("people shifted to", "A line of horse carriages driving away from the smoke towards bright clear sky."),
 S("the west side,", "Grand mansions with gardens and fountains in bright clean sunshine."),
 S("leaving {lower-income|lower income}", "Poor workers in patched clothes standing in the smoky street watching the carriages leave."),
 S("populations to reside", "Crowded small terraced houses packed close together with chimneys smoking."),
 S("in the east.", "A poor family eating a simple meal in a small dim room, smoky window behind."),
 S("The most interesting part,", "THE GUY leaning forward with wide curious eyes and a raised finger.", True),
 S("however, is that all these", "A row of old factories with their chimneys no longer smoking, quiet and still."),
 S("factories shut down by the", "Old factory gates chained and padlocked, weeds growing, a CLOSED sign without words."),
 S("{1970s,|nineteen seventies}", "A 1970s street with old cars and a radio, the empty factory in the background."),
 S("and the pollution cleared", "Clouds of smog drifting away revealing clear blue sky over the city."),
 S("up as well.", "Bright clean sky over the east side rooftops, birds flying."),
 S("So why is the east side", "THE GUY standing in a clean but run-down street, looking around confused.", True),
 S("still poor today?", "Modern east-side street with cracked roads, closed shops and faded paint."),
 S("Because over decades,", "Pages of a calendar flying away in the wind over a city."),
 S("the schools,", "A beautiful modern school with a big playground on the sunny west side."),
 S("hospitals,", "A clean shiny modern hospital with an ambulance outside."),
 S("and infrastructure", "Smooth new roads, a metro station, parks and street lights."),
 S("built on the west", "Construction cranes building shiny new buildings on the west side."),
 S("side never", "A smooth new road that suddenly ends at a broken edge."),
 S("reached the east side.", "Across a river, the east side with old run-down buildings and potholed roads."),
 S("Now, reversing this gap", "Two cliffs with a huge gap between them, the west cliff green and rich, the east cliff dry and bare."),
 S("has become almost", "THE GUY trying to push a giant boulder up a steep hill, straining.", True),
 S("impossible.", "THE GUY sitting tired beside the giant boulder, head in hands.", True),
 S("Listen to this:", "THE GUY holding a hand to his ear, eyebrows raised.", True),
 S("in Montreal,", "Montreal skyline with Mount Royal and the St Lawrence river in autumn colours."),
 S("this has actually", "A researcher with clipboard and measuring tape on a Montreal street."),
 S("been measured.", "Charts and graphs pinned on a wall, a magnifying glass over them, no readable text."),
 S("The life expectancy on", "An old couple smiling on a park bench, the woman knitting."),
 S("the west side is {85|eighty five}", "A happy elderly couple jogging through a leafy sunny park on the west side."),
 S("years, while on the east", "A tired elderly man sitting alone on the steps of a run-down building."),
 S("side it is", "An hourglass with sand running out quickly on a windowsill."),
 S("{74|seventy four} years.", "Two candles side by side, one tall and bright, one much shorter and flickering."),
 S("Send this to a friend", "THE GUY holding up a phone and smiling, showing the screen to a friend.", True),
 S("who lives on the east side,", "THE GUY's friend reading a phone on a balcony overlooking an east-side street.", True),
 S("and follow me to learn", "THE GUY waving at the viewer with a warm smile.", True),
 S("more unknown", "A stack of old books with a glowing light coming from inside an open one."),
 S("facts like this.", "THE GUY sitting on a bench by a lake at sunset, smiling, a lightbulb glowing above his head.", True),
]
if __name__ == "__main__":
    disp = lambda l: re.sub(r"\{([^|{}]+)\|[^{}]+\}", r"\1", l)
    out = ["# Why Is East Side Always Poorer Than West? — image prompts (%d)" % len(SCENES), "",
           "Generate each as a square (1:1) image in your reference style. Save as `001.png`, `002.png`, ... in order.", ""]
    for k, (l, d, g) in enumerate(SCENES, 1):
        p = STYLE + "\n\nScene: " + d + ("\n" + GUY if g else "")
        out += [f"## {k:03d}  ·  \"{disp(l)}\"", "", "```", p, "```", ""]
    (ROOT / f"projects/{NAME}/image_prompts.md").write_text("\n".join(out))
    (ROOT / f"projects/{NAME}/scenes.json").write_text(json.dumps(
        [{"line": l, "image": f"{k:03d}.png"} for k, (l, _, _) in enumerate(SCENES, 1)], indent=1))
    print(len(SCENES))
