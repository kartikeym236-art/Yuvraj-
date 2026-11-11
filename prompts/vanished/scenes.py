"""'People who vanished' script -> one-click scene prompts (0.5-2 s each).

Usage:  python prompts/vanished/scenes.py
"""
import sys
from pathlib import Path

HERE = Path(__file__).parent
sys.path.insert(0, str(HERE.parent))
from build_prompts import render  # noqa: E402

TITLE = "People Who Vanished: Scene Prompts"

CHARACTERS = {
    "TESLA": (
        "THE INVENTOR (around 1900): tall, very thin European-American man in his 40s, black hair slicked "
        "back with a centre parting, a thin neat black moustache, deep-set dot eyes, sharp cheekbones, "
        "thick serious eyebrows. Wears a dark grey three-piece suit with a high stiff white collar and a "
        "dark tie, a pocket watch chain."
    ),
    "OLD_TESLA": (
        "THE OLD INVENTOR (1943): the same very tall thin man now in his 80s, frail, white-grey hair "
        "combed back with a centre parting, thin grey moustache, hollow cheeks, dot eyes. Wears a worn "
        "dark suit that looks too big for him."
    ),
    "MEYER": (
        "THE WATER-CAR INVENTOR (1990s): American man in his 50s, stocky, thick wavy grey hair combed "
        "back, large square 1990s glasses, dot eyes, friendly eyebrows. Wears a beige sport coat, a "
        "light-blue shirt and a patterned tie."
    ),
    "MALLOVE": (
        "THE FUSION SCIENTIST (2000s): American man in his 50s, slim, short greying brown hair receding "
        "at the temples, a short neat grey beard, thin metal glasses, dot eyes, curious eyebrows. Wears a "
        "dark green sweater over a collared shirt."
    ),
    "RIFE": (
        "THE MICROSCOPE INVENTOR (1930s): American man in his 40s, dark hair slicked back, round "
        "wire-rimmed glasses, dot eyes, focused eyebrows. Wears a white lab coat over a shirt and bow tie."
    ),
}

TESLA_LAB = ("1900s inventor's laboratory: brick walls, a giant copper coil sparking with purple-white "
             "electric arcs, glass bulbs, wooden workbenches with brass instruments, dim gaslight.")
TOWER = ("A tall wooden-and-steel transmission tower with a giant mushroom-shaped dome on top, standing "
         "alone on a flat field on Long Island under a stormy sky.")
GARAGE = ("1990s American garage workshop: a strange futuristic dune-buggy car with open panels, tubes "
          "and a clear water tank, tools on pegboards, fluorescent lights.")
FUSION_LAB = ("Small cluttered 2000s lab: glass beakers with bubbling water, metal electrodes connected "
              "with wires, a glowing jar on the bench, computer monitors with graphs, stacks of journals.")
RIFE_LAB = ("1930s California lab: a huge strange brass-and-black microscope with many dials and prisms, "
            "glass tubes glowing violet, wooden shelves of bottles, sunlight through dusty windows.")

SCENES = [
    # --- intro
    ("People who may have", [], "A dark wall covered in old black-and-white photographs of four mysterious men from different eras (faces in shadow), pinned with red string. Camera: medium, moody desk-lamp light."),
    ("changed the world,", [], "A glowing Earth globe on a dark desk with tiny lines of light radiating from it like inventions: a light bulb, a car, an atom, a microscope. Camera: medium close-up, hopeful glow."),
    ("but vanished.", [], "The same wall of four photographs, now each photo slowly fading into white smoke, one corner burning. Camera: medium, dark mysterious mood."),
    # --- Tesla
    ("Number one:", ["TESLA"], f"{TESLA_LAB} THE INVENTOR stands in silhouette in front of the sparking coil, arms crossed. Camera: wide, dramatic backlight."),
    ("Nikola Tesla promised the globe", ["TESLA"], f"{TESLA_LAB} THE INVENTOR holds a glowing light bulb in his bare hand with no wires, the bulb lighting his face, a proud calm look. Camera: medium close-up."),
    ("free wireless electricity.", [], f"{TOWER} Lightning-like glowing energy rings spread outward from the dome across the sky; in the distance, little houses' windows light up on their own. Camera: wide, epic."),
    ("The moment investors realized", [], "1900s wood-panelled bank office: three wealthy men in top hats and suits with gold watch chains sit around a table, frowning at a blueprint of the tower. Camera: medium shot, cigar smoke."),
    ("they couldn't meter it,", [], "Close-up of an old brass electric meter on a wall with its needle stuck at zero, a cobweb on it. Camera: close-up."),
    ("they killed his funding.", ["TESLA"], "A wealthy man's hand slams a chequebook shut on the table; across the table THE INVENTOR's face falls, eyebrows tilted up in shock. Camera: over-the-shoulder."),
    ("Upon his death,", ["OLD_TESLA"], "1943 New York hotel room at night: a small bed, a window with city lights, pigeons on the windowsill, THE OLD INVENTOR's hat and cane on a chair, the bed neatly made and empty. Camera: medium, quiet sad mood."),
    ("federal agents seized his research.", [], "Same hotel room: men in 1940s trench coats and fedoras carry wooden boxes and rolled blueprints out of the room, one locking a metal trunk. Camera: medium-wide, shadowy."),
    ("It never saw", [], "A dark government archive: endless rows of metal shelves with identical sealed boxes, a single bare bulb hanging. Camera: wide, deep perspective."),
    ("the light of day.", [], "A heavy steel vault door slowly closing, the last strip of light disappearing. Camera: medium, dramatic."),
    # --- Meyer
    ("Number two:", ["MEYER"], f"{GARAGE} THE WATER-CAR INVENTOR leans on the strange dune-buggy, arms crossed, proud smile. Camera: wide."),
    ("Stanley Meyer engineered a vehicle", ["MEYER"], f"{GARAGE} THE WATER-CAR INVENTOR welds and adjusts tubes inside the open engine, sparks flying, goggles on his forehead. Camera: medium shot."),
    ("that ran entirely on water.", [], "Close-up of a hand pouring a glass of clear water into the car's fuel tank, bubbles glowing blue inside the tubes. Camera: close-up."),
    ("He proved it worked in public.", ["MEYER"], "Sunny 1990s American small-town street: a crowd and news cameras watch the strange dune-buggy drive past, THE WATER-CAR INVENTOR waving from the driver's seat. Camera: wide."),
    ("Weeks later,", [], "Exterior of a small American restaurant at night with warm windows and a parked car outside, empty sidewalk. Camera: wide, ominous."),
    ("he collapsed at a restaurant", ["MEYER"], "Inside the restaurant: THE WATER-CAR INVENTOR stands up from his table clutching his throat, his glass of juice tipping over, other diners turning in shock. Camera: medium shot, not graphic."),
    ("screaming he was poisoned.", ["MEYER"], "Close-up of THE WATER-CAR INVENTOR's face, eyes wide with fear, mouth open, a spilled glass in the foreground. Camera: close-up, red-tinted dramatic light."),
    ("His prototype vanished overnight.", [], "The same garage at night, completely empty: only an oil stain on the floor, tyre marks and dangling cables where the car used to be, the door half open. Camera: wide, eerie."),
    # --- Mallove
    ("Number three:", ["MALLOVE"], f"{FUSION_LAB} THE FUSION SCIENTIST sits at the bench, adjusting his glasses, looking at a glowing jar. Camera: medium shot."),
    ("MIT scientist Eugene Mallove", ["MALLOVE"], "A university campus with a big domed neoclassical building and columns, THE FUSION SCIENTIST walking in front with a briefcase. Camera: wide."),
    ("chased cold fusion,", ["MALLOVE"], f"{FUSION_LAB} THE FUSION SCIENTIST leans close to a small glass cell where tiny bright sparks of energy glow in water, eyes wide in wonder. Camera: close-up."),
    ("a doorway", [], "A glowing doorway of pure white light standing alone in a dark empty space. Camera: wide, symmetrical."),
    ("to infinite clean energy.", [], "Through the glowing doorway: a bright future city with clean blue skies, wind and light, no smoke, green parks. Camera: wide, hopeful."),
    ("Before he could expose his findings,", ["MALLOVE"], "THE FUSION SCIENTIST at a desk at night packing a thick stack of papers and a hard drive into a briefcase, nervous glance over his shoulder. Camera: medium shot, lamp light."),
    ("he was brutally murdered.", [], "A quiet house in the countryside at night with police tape across the driveway and red-blue police lights flashing on the walls, no people visible. Camera: wide, dark and serious, not graphic."),
    ("The science faded to black.", [], "His papers scattered on the floor of the empty lab, the glowing jar slowly going dark. Camera: medium, fading to darkness."),
    # --- Rife
    ("Number four:", ["RIFE"], f"{RIFE_LAB} THE MICROSCOPE INVENTOR stands beside the giant microscope, hand on its dials. Camera: wide."),
    ("Royal Rife invented", ["RIFE"], f"{RIFE_LAB} THE MICROSCOPE INVENTOR peers into the eyepiece, adjusting a brass dial, intense concentration. Camera: medium close-up."),
    ("a frequency machine", [], f"{RIFE_LAB} A wooden cabinet machine with dials, switches and a glowing violet glass tube, humming with visible sound waves. Camera: medium close-up."),
    ("that targeted and shattered cancer cells", [], "Microscopic view: dark lumpy cells cracking apart like glass as violet waves pass through them. Camera: macro, sci-fi glow."),
    ("without harming healthy tissue.", [], "Microscopic view: round pink healthy cells floating untouched and glowing softly as the violet waves pass by. Camera: macro, gentle light."),
    ("Instead of a Nobel Prize,", [], "A shiny gold medal on a velvet cushion in a spotlight, slowly falling into shadow. Camera: close-up."),
    ("his lab was raided,", [], f"{RIFE_LAB} Men in 1930s suits and hats burst through the door, papers flying. Camera: wide, dramatic."),
    ("his equipment ruined,", [], f"{RIFE_LAB} The giant microscope lies smashed on the floor, broken glass tubes and bent brass parts everywhere. Camera: medium, low angle."),
    ("and his name erased.", ["RIFE"], "An old framed photograph of THE MICROSCOPE INVENTOR on a wall, his figure slowly fading away until only an empty lab coat remains in the picture. Camera: close-up, eerie ending."),
]

if __name__ == "__main__":
    dest = HERE / "vanished-prompts.md"
    dest.write_text(render(TITLE, (HERE / "script.txt").read_text(encoding="utf-8"), SCENES, CHARACTERS),
                    encoding="utf-8")
    print(f"Wrote {len(SCENES)} prompts to {dest}")
