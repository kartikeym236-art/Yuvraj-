"""Two barbers story -> one-click scene prompts (0.5-2 s each).

Usage:  python prompts/barbers/scenes.py
"""
import sys
from pathlib import Path

HERE = Path(__file__).parent
sys.path.insert(0, str(HERE.parent))
from build_prompts import render  # noqa: E402

TITLE = "The Two Barbers: Scene Prompts"

CHARACTERS = {
    "BUTCHER": (
        "THE BUTCHER (barber with terrible hair): Indian man in his 40s, stocky and broad-shouldered, "
        "round kind face, dot eyes, thick bushy eyebrows, thick black moustache. His hair is a DISASTER: "
        "thick black hair hacked into uneven choppy chunks, one side buzzed almost to the scalp, the "
        "other side long spiky tufts sticking out, a random bald notch above the right ear, a crooked "
        "jagged fringe slanting across his forehead. Wears a faded blue checked half-sleeve shirt, a "
        "worn black barber's apron, a comb and scissors poking out of the apron pocket, brown chappals."
    ),
    "RIVAL": (
        "THE PERFECT BARBER: tall slim Indian man in his 40s, sharp face, dot eyes, neat arched eyebrows, "
        "a thin perfectly trimmed moustache. His hair is FLAWLESS: glossy jet-black hair with a razor-sharp "
        "side part, smooth volume swept back, clean faded sides, not one hair out of place. Wears a crisp "
        "white full-sleeve shirt, a maroon waistcoat with gold buttons, black trousers, polished black shoes, "
        "gold-handled scissors in his waistcoat pocket."
    ),
    "STRANGER": (
        "THE STRANGER: Indian traveller in his 30s, lean, calm face, dot eyes, thick eyebrows. Arrives with "
        "long shaggy overgrown black hair falling past his ears and a scruffy untrimmed beard. Wears a dusty "
        "olive-green kurta, a brown shawl over one shoulder, a worn cloth travel bag, sandals."
    ),
    "STRANGER_AFTER": (
        "THE STRANGER (after the haircut): same Indian traveller in his 30s, dot eyes, olive-green kurta "
        "and brown shawl, but now with a stunning sharp haircut: short textured top with clean volume, "
        "perfectly faded sides, crisp hairline, and a neatly sculpted short beard. He looks like a film star."
    ),
}

STREET = ("Narrow small-town Indian market street in warm afternoon light: on the LEFT side a smart barbershop "
          "freshly painted white and gold with a spinning red-white-blue barber pole, a shiny red leather chair "
          "and a big clean mirror; on the RIGHT side, directly opposite, a shabby little barbershop with peeling "
          "sky-blue paint, a faded barber pole, one old cracked mirror and a creaky wooden chair. A tea stall, "
          "bicycles, hanging electric wires and potted tulsi plants between them.")
SHABBY = ("Inside the shabby barbershop: peeling sky-blue walls, an old cracked mirror, a creaky wooden "
          "barber chair, a steel tray of combs, scissors and a razor, a small radio, faded film posters "
          "with no text, a window facing the street.")
SMART = ("Inside the smart barbershop: white and gold walls, a big spotless mirror with bulbs around it, "
         "a shiny red leather barber chair, neatly arranged bottles and combs, polished tiled floor.")

SCENES = [
    ("A town has two barbers:", [], f"{STREET} No customers yet. Camera: wide establishing shot down the middle of the street, both shops facing each other, symmetrical."),
    ("one with a perfect haircut,", ["RIVAL"], f"{SMART} The PERFECT BARBER stands proudly at his door, one hand smoothing his flawless hair, chin raised, small smug smile, a tiny sparkle on his hair. Camera: medium shot, slight low angle."),
    ("and one with a terrible one.", ["BUTCHER"], f"{SHABBY} The BUTCHER leans in his doorway sipping tea from a small glass, smiling innocently; his awful choppy hair is fully visible. Camera: medium shot, eye level."),
    ("A stranger walks past", ["STRANGER"], f"{STREET} The STRANGER walks down the middle of the street with his travel bag, looking around calmly. Camera: wide, from behind him."),
    ("the perfect one", ["STRANGER", "RIVAL"], f"{STREET} The STRANGER walks right past the smart shop without even glancing; the PERFECT BARBER at the door holds up a towel welcomingly, eyebrows raised. Camera: medium-wide, side view."),
    ("and sits down with the butcher.", ["STRANGER", "BUTCHER"], f"{SHABBY} The STRANGER drops into the creaky wooden chair; the BUTCHER, surprised and delighted, throws a white cape over him. Camera: medium shot."),
    ("That's what the town calls him,", ["BUTCHER"], f"{STREET} Two old men at the tea stall whisper and point across the street at the BUTCHER, smirking behind their hands. Camera: medium shot over the old men's shoulders."),
    ("because his hair looks like", ["BUTCHER"], "Extreme close-up of the BUTCHER's head from the front: every chunky uneven tuft, the bald notch and the slanted crooked fringe in detail; he blinks innocently. Plain sky-blue background. Camera: close-up."),
    ("it was cut in the dark", [], "Pitch-black room with only a thin beam of moonlight; a pair of scissors snips blindly in the air, motion lines, a few black hair clumps flying. Camera: medium, comedic dark mood."),
    ("with a fork.", [], "Close-up of a hand in the dark holding an ordinary steel dinner fork like a comb, clumps of black hair stuck in its prongs. Camera: close-up, comedic."),
    ("So the whole street", [], f"{STREET} Shopkeepers, a vegetable seller, schoolkids with bags and a man on a bicycle all freeze and turn their heads toward the shabby shop. Camera: wide."),
    ("stops to watch.", [], f"{STREET} A crowd gathers in front of the shabby shop: a tea seller holding a kettle mid-pour, an auntie with a shopping bag, kids on tiptoes, all staring with wide dot eyes. Camera: medium-wide."),
    ("The barber with the perfect hair", ["RIVAL"], f"{SMART} The PERFECT BARBER slicks back his hair with a comb in the mirror, confident. Camera: medium close-up."),
    ("holds his door open and yells,", ["RIVAL"], f"{STREET} The PERFECT BARBER holds his glass door wide open with one arm, the other hand cupped around his mouth, shouting across the street. Camera: medium shot, low angle."),
    ("\"Last chance, friend!\"", ["RIVAL"], "Close-up of the PERFECT BARBER shouting, mouth wide open, eyebrows up, one finger raised, shout lines coming from his mouth (no text). Camera: close-up, dynamic."),
    ("Someone starts taking bets", [], f"{STREET} A skinny man in a vest and lungi stands on an upturned crate waving a fistful of rupee notes, people pushing money into his hand. Camera: medium shot."),
    ("on whether the stranger", ["STRANGER"], f"{SHABBY} The STRANGER sits calmly in the chair under the white cape, eyes closed, totally relaxed. Camera: medium close-up."),
    ("keeps his ears.", [], "Close-up of the STRANGER's ear peeking out from shaggy hair, with the open blades of a pair of scissors hovering dangerously close beside it. Camera: extreme close-up, comedic suspense."),
    ("And soon,", [], f"{STREET} The crowd outside has doubled, people climbing on bicycles and the tea stall bench to see. Camera: wide."),
    ("half the town is pressed", [], "From inside the shabby shop looking out: a row of squished faces pressed flat against the window glass, noses and cheeks smushed, wide eyes. Camera: straight on, comedic."),
    ("against the window", [], "From outside: the back of the crowd leaning on the shabby shop's window, kids on shoulders, one man shading his eyes with his hand. Camera: medium-wide."),
    ("as the scissors go up.", ["BUTCHER"], f"{SHABBY} The BUTCHER raises shiny scissors and a comb high like a conductor, a determined look, light glinting on the blades. Camera: low angle, dramatic."),
    ("Then, the butcher", ["BUTCHER"], f"{SHABBY} The BUTCHER puts down the scissors and grips the back of the chair with both hands, a small knowing smile. Camera: medium shot."),
    ("spins the chair around,", ["BUTCHER"], f"{SHABBY} The chair spins toward the window with swirling motion lines, the white cape flying, hair clippings scattering on the floor. Camera: medium, motion blur."),
    ("and it's the best haircut", ["STRANGER_AFTER"], f"{SHABBY} The STRANGER faces the window, stunning new haircut and sculpted beard, a calm confident smile, soft golden light glowing on him. Camera: medium close-up, heroic."),
    ("any of them have ever seen.", [], "Outside the window: the crowd with jaws dropped, eyes huge, one man drops his tea glass, a girl covers her mouth, the bet-taker's money falls from his hand. Camera: medium-wide."),
    ("Wait, what?", ["RIVAL"], f"{STREET} The PERFECT BARBER in his doorway freezes, eyebrows shooting up, mouth hanging open, his comb slipping from his hand. Camera: medium close-up."),
    ("You see,", [], f"{STREET} The street suddenly frozen like a paused photo, everyone mid-motion, with a slightly faded sepia tint. Camera: wide, high angle."),
    ("a barber can't cut", ["BUTCHER"], f"{SHABBY} The BUTCHER tries to cut his own hair in the mirror, twisting his arm awkwardly behind his head, tongue out in concentration, scissors at a clumsy angle. Camera: medium shot."),
    ("his own hair,", ["RIVAL"], f"{SMART} The PERFECT BARBER also tries to reach the back of his own head with scissors, arms twisted in a funny knot, frustrated eyebrows. Camera: medium shot."),
    ("and this town", [], "High-angle view of the whole small town: tiled rooftops, a temple, a water tank, narrow lanes, hills behind. Camera: wide aerial view."),
    ("only has two barbers,", [], f"{STREET} Only the two barber poles on opposite sides of the street, spinning, facing each other. Camera: wide, symmetrical, eye level."),
    ("so they cut each other's.", ["BUTCHER", "RIVAL"], f"{SMART} Late night, shop closed: the BUTCHER carefully trims the PERFECT BARBER's hair while the PERFECT BARBER sits in the red chair with eyes closed. Camera: medium shot, warm lamp light, secret mood."),
    ("That perfect haircut", ["RIVAL"], "Close-up of the PERFECT BARBER's flawless glossy hair with a sharp side part, a soft sparkle. Camera: close-up from the side."),
    ("across the street", [], f"{STREET} Looking from the shabby shop's doorway across the street at the shiny smart shop. Camera: medium-wide, eye level."),
    ("is the butcher's work,", ["BUTCHER"], f"{SHABBY} The BUTCHER holds up his scissors and comb proudly with a quiet humble smile, his own awful hair still on his head. Camera: medium close-up."),
    ("and the disaster", ["BUTCHER"], "Close-up of the back of the BUTCHER's choppy, patchy, uneven hair with the bald notch. Camera: close-up from behind."),
    ("on the butcher's head", ["BUTCHER"], f"{SHABBY} The BUTCHER looks at his own awful hair in the cracked mirror and shrugs with a small sigh. Camera: over-the-shoulder into the mirror."),
    ("came from the man", ["BUTCHER", "RIVAL"], f"{SHABBY} Flashback with a warm sepia tint, night: the PERFECT BARBER stands behind the seated BUTCHER, grinning slyly, scissors hovering over his head. Camera: medium shot."),
    ("yelling \"last chance.\"", ["RIVAL"], f"{STREET} Flashback continues: the PERFECT BARBER with a sneaky grin, snipping big uneven chunks off the BUTCHER's hair, clumps falling. Camera: close-up, sepia tint."),
    ("By morning,", [], f"{STREET} Early morning: sunrise glow, milkman on a bicycle, mist, a rooster on the wall, the shops just opening. Camera: wide."),
    ("the line outside the butcher's shop", [], f"{STREET} A long queue of men, boys and old uncles waiting outside the shabby shop, some reading newspapers with blank pages, some holding tea. Camera: medium-wide."),
    ("wraps around the block,", [], "High-angle view: the queue winding out of the street, around a corner and down the next lane past a temple and a school. Camera: aerial wide."),
    ("and the other barber", ["RIVAL"], f"{SMART} The PERFECT BARBER sits alone in his empty shop, chin on fist, staring at the queue through the window, jealous frown. Camera: medium shot."),
    ("has one way left", ["RIVAL"], f"{SMART} The PERFECT BARBER stares at his gold scissors, his eyes narrowing, a slow sly idea forming. Camera: close-up, dramatic side light."),
    ("to ruin him,", ["RIVAL"], f"{SMART} The PERFECT BARBER rubs his hands together with an evil grin, a dark shadow behind him on the wall. Camera: medium close-up, low angle."),
    ("which is", ["RIVAL"], f"{SMART} The PERFECT BARBER raises one finger in the air, eyes wide, a small glowing light bulb above his head. Camera: medium close-up."),
    ("to make him look good.", ["RIVAL"], f"{SMART} The PERFECT BARBER lays out every tool neatly on a velvet cloth: scissors, combs, razors, brushes, with a focused expression. Camera: top-down close-up."),
    ("So when the butcher comes in", ["BUTCHER"], f"{SMART} The BUTCHER walks through the glass door with a friendly wave, his messy hair even longer and wilder. Camera: medium-wide."),
    ("for his usual trim,", ["BUTCHER", "RIVAL"], f"{SMART} The BUTCHER sits in the shiny red chair; the PERFECT BARBER ties a cape around him with a tight polite smile. Camera: medium shot into the big mirror."),
    ("he works on it", ["RIVAL", "BUTCHER"], f"{SMART} The PERFECT BARBER cuts with intense concentration, tongue out, eyebrows knotted, comb in mouth, measuring hair with his fingers. Camera: medium close-up."),
    ("for three hours,", ["RIVAL", "BUTCHER"], f"{SMART} The wall clock's hands spin fast, the window shows afternoon turning to evening, and hair piles up on the floor around the chair. Camera: wide."),
    ("harder than he has ever worked", ["RIVAL", "BUTCHER"], f"{SMART} The PERFECT BARBER is drenched in sweat, sleeves rolled up, his own hair slightly messy, using two pairs of scissors at once with motion lines. Camera: medium close-up, intense."),
    ("in his life.", ["RIVAL"], f"{SMART} Night: the PERFECT BARBER collapses back against the wall exhausted, panting, scissors dangling from his hand, a satisfied tired smile. Camera: medium shot."),
    ("The butcher walks out", ["BUTCHER"], f"{STREET} Night, street lamps on: the BUTCHER steps out of the smart shop with a big happy grin, his hair now WORSE THAN EVER: wild lopsided spikes, three bald patches, one long random braid-like tuft, a zig-zag fringe. Camera: medium-wide, low angle."),
    ("looking worse than ever,", ["BUTCHER"], "Close-up of the BUTCHER proudly running his hand through his ridiculous wrecked hair, eyes closed, beaming. Camera: close-up."),
    ("and the line gets longer.", ["BUTCHER"], f"{STREET} Next morning: an even longer queue outside the shabby shop stretching out of sight; the BUTCHER with his crazy hair waves happily at the customers while the PERFECT BARBER watches from across the street, smirking. Camera: wide, high angle."),
]

if __name__ == "__main__":
    dest = HERE / "barbers-prompts.md"
    dest.write_text(render(TITLE, (HERE / "script.txt").read_text(encoding="utf-8"), SCENES, CHARACTERS),
                    encoding="utf-8")
    print(f"Wrote {len(SCENES)} prompts to {dest}")
