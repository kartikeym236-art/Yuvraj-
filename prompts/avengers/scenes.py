"""Avengers (2012) recap script -> one-click scene prompts (0.5-2 s each).

Characters are described by look only (no names) because image tools often
refuse prompts that name film characters.

Usage:  python prompts/avengers/scenes.py
"""
import sys
from pathlib import Path

HERE = Path(__file__).parent
sys.path.insert(0, str(HERE.parent))
from build_prompts import render  # noqa: E402

TITLE = "Avengers Recap: Scene Prompts"

CHARACTERS = {
    "LOKI": ("THE TRICKSTER: tall slim pale man, slicked-back shoulder-length black hair, sly smirk, dot eyes, "
             "sharp eyebrows. Wears green-and-black leather armour with gold metal plates and a long dark green "
             "cape. Holds a golden spear-like sceptre with a glowing blue gem at its tip."),
    "OTHER": ("THE HOODED ALIEN: thin alien in a ragged black hooded robe, grey wrinkled skin, glowing dot eyes, "
              "a metal guard covering his mouth and jaw, long bony fingers."),
    "FURY": ("THE SPY CHIEF: tall Black man, bald head, short goatee, black eyepatch over his left eye, single dot "
             "eye, stern eyebrows. Wears a long black leather trench coat over black clothes."),
    "ARCHER": ("THE ARCHER: lean man with short spiky sandy-brown hair, dot eyes, serious face. Wears a black "
               "sleeveless tactical suit with arm guards, carries a black compound bow and a quiver of arrows."),
    "IRON": ("THE ARMOURED BILLIONAIRE: man in his 40s with neat dark hair and a sharp goatee, cocky grin, dot "
             "eyes. Wears a sleek red-and-gold metal armour suit with a glowing white-blue circle in the chest "
             "and glowing palms; sometimes the helmet is on, with glowing eye slits."),
    "CAP": ("THE SOLDIER: tall broad-shouldered man with short neat blond hair, square jaw, dot eyes, kind serious "
            "eyebrows. Wears a navy-blue suit with a white star on the chest and red-and-white stripes at the "
            "waist, carries a round shield with red and white rings and a white star on a blue centre."),
    "BANNER": ("THE SCIENTIST: man in his 40s with messy curly greying brown hair, stubble, glasses, dot eyes, "
               "tired kind face. Wears a wrinkled purple shirt."),
    "HULK": ("THE GREEN GIANT: enormous muscular green-skinned giant, messy black hair, angry thick eyebrows, "
             "dot eyes, huge fists, wears only torn purple trousers."),
    "SPY": ("THE SPY: woman with short wavy red hair, dot eyes, calm sharp eyebrows. Wears a black tactical "
            "catsuit with a utility belt and glowing blue wrist cuffs."),
    "THOR": ("THE THUNDER GOD: very tall muscular man with long golden-blond hair and a short beard, dot eyes. "
             "Wears silver-and-black armour with round silver discs on the chest and a long red cape, holds a "
             "short-handled square hammer crackling with lightning."),
    "COULSON": ("THE AGENT: kind balding man in his 50s, short receding hair, dot eyes, gentle smile, black suit, "
                "white shirt and thin black tie."),
    "TITAN": ("THE MYSTERY TITAN: a huge purple-skinned giant with a ridged chin, wearing gold armour, sitting on a "
              "floating stone throne; mostly hidden in shadow."),
}

CUBE = "a glowing bright blue crystal cube with energy swirling inside"
SPACE = "Dark purple-blue deep space with a distant nebula, floating rocky asteroids and cold starlight."
CARRIER = ("Inside a giant flying aircraft carrier high in the clouds: grey metal walls, big screens, a glass "
           "control deck, agents at computer stations.")
NYC = ("Midtown New York City in daytime chaos: tall skyscrapers, a huge swirling dark-blue portal in the sky "
       "above a tall modern tower, grey armoured aliens on small flying sleds and huge armoured flying space "
       "whales weaving between buildings, smoke and debris, abandoned yellow cabs on the street.")
BASE = ("Secret underground research base at night: concrete walls, scientists in white coats, a machine "
        "holding the blue cube, red warning lights.")

SCENES = [
    # --- hook
    ("Loki wanted to get caught.", ["LOKI"], f"THE TRICKSTER kneels inside a tall glass prison cell, hands raised in fake surrender, a sly smirk on his face. Camera: medium shot, dramatic cool light."),
    ("And that one move", ["LOKI"], "Extreme close-up of THE TRICKSTER's eyes and smirk reflected in the glass, a faint blue glow. Camera: extreme close-up."),
    ("almost destroyed Earth.", [], "Planet Earth seen from space with a huge dark swirling portal opening near it, cracks of blue energy spreading across the sky. Camera: wide from space."),
    # --- the deal
    ("An alien called The Other,", ["OTHER"], f"{SPACE} THE HOODED ALIEN stands on a floating rock, robe flapping, glowing eyes in the hood. Camera: medium shot, low angle."),
    ("who works for someone way scarier,", ["OTHER", "TITAN"], f"{SPACE} THE HOODED ALIEN bows; behind him, high above on a floating throne, a giant shadowy figure sits with only a gold armoured hand visible. Camera: wide, ominous."),
    ("offers Loki a deal.", ["OTHER", "LOKI"], f"{SPACE} THE HOODED ALIEN holds out the glowing blue-gem sceptre to THE TRICKSTER, who reaches for it with a greedy smile. Camera: medium shot, side view."),
    ("He gets an army", ["LOKI"], f"{SPACE} THE TRICKSTER stands on a cliff edge looking down at endless rows of grey armoured alien soldiers. Camera: wide from behind him."),
    ("called the Chitauri,", [], f"{SPACE} Close-up of a grey armoured alien soldier with a cyborg face and glowing visor, holding a blaster spear. Camera: close-up, menacing."),
    ("and in return", ["LOKI", "OTHER"], f"{SPACE} THE HOODED ALIEN points a bony finger at THE TRICKSTER, eyes narrowed. Camera: medium close-up."),
    ("he has to get them", ["LOKI"], f"{SPACE} THE TRICKSTER nods slowly, a cunning look. Camera: close-up."),
    ("one thing:", [], f"{SPACE} A single spotlight on an empty floating stone pedestal. Camera: medium shot, mysterious."),
    ("the Tesseract.", [], f"Close-up of {CUBE}, floating in darkness, blue light rays bursting out. Camera: close-up, glowing."),
    # --- the heist
    ("Loki shows up,", ["LOKI"], f"{BASE} THE TRICKSTER appears out of a blue portal of light in the middle of the base, scientists stepping back in shock. Camera: wide."),
    ("steals the cube,", ["LOKI"], f"{BASE} THE TRICKSTER picks up {CUBE} with a satisfied grin. Camera: medium close-up."),
    ("and with a glowing scepter", ["LOKI"], "Close-up of the golden sceptre's blue gem glowing brightly in THE TRICKSTER's hand. Camera: close-up, low angle."),
    ("takes over Hawkeye's mind", ["LOKI", "ARCHER"], f"{BASE} THE TRICKSTER touches the sceptre tip to THE ARCHER's chest; blue energy spreads through him. Camera: medium shot."),
    ("in two seconds.", ["ARCHER"], "Close-up of THE ARCHER's eyes turning glowing icy blue, his face blank. Camera: extreme close-up."),
    ("Nick Fury's base", ["FURY"], f"{BASE} THE SPY CHIEF runs through the shaking corridor shouting orders, red lights flashing. Camera: medium shot."),
    ("collapses behind him.", ["FURY"], "Night desert: THE SPY CHIEF escapes in a helicopter as the huge base collapses into a giant crater of dust and rubble behind. Camera: wide, dramatic."),
    # --- assembling the team
    ("So Fury does", ["FURY"], f"{CARRIER} THE SPY CHIEF stands at the glass deck, hands behind his back, determined. Camera: medium shot from behind."),
    ("the craziest thing possible.", ["FURY"], f"{CARRIER} THE SPY CHIEF slaps five glowing files onto a table, showing silhouettes only. Camera: close-up on the table."),
    ("He brings together", [], "Five silhouettes standing in a row against a bright sky, each in a different pose, mysterious. Camera: wide, symmetrical."),
    ("a billionaire with an ego problem,", ["IRON"], "THE ARMOURED BILLIONAIRE (helmet off) leans on a sports car in a glass mansion, admiring himself in a mirror, cocky grin. Camera: medium shot."),
    ("a ninety-year-old soldier,", ["CAP"], "THE SOLDIER waking up in a modern room, looking confused at a smartphone, with an old black-and-white photo of himself from the 1940s on the table. Camera: medium shot."),
    ("a man who turns", ["BANNER"], "THE SCIENTIST treating poor patients in a small clinic in Kolkata, calm, adjusting his glasses. Camera: medium shot."),
    ("into a monster", ["HULK"], "THE GREEN GIANT bursting out with a roar, purple shirt shreds flying. Camera: low angle, explosive."),
    ("when he gets angry,", ["BANNER"], "Close-up of THE SCIENTIST's eyes flashing green, veins glowing faintly green on his neck, teeth gritted. Camera: close-up."),
    ("a spy,", ["SPY"], "THE SPY tied to a chair in a dark warehouse, calmly smiling before flipping the chair and taking out three guards. Camera: medium shot, action pose."),
    ("and a literal god.", ["THOR"], "THE THUNDER GOD lands from the sky in a blast of lightning, red cape flowing, hammer raised. Camera: low angle, epic."),
    ("What could go wrong?", ["IRON", "CAP", "THOR", "BANNER", "SPY"], f"{CARRIER} THE ARMOURED BILLIONAIRE, THE SOLDIER, THE THUNDER GOD, THE SCIENTIST and THE SPY stand awkwardly far apart in the same room, arms crossed, glaring at each other. Camera: wide, comedic tension."),
    # --- everything goes wrong
    ("Everything goes wrong.", [], "A city street full of alarms: a shattered glass window, sparks, smoke. Camera: medium, chaotic."),
    ("Loki surrenders on purpose.", ["LOKI", "CAP", "IRON"], "Night in Germany: THE TRICKSTER kneels on cobblestones in front of a grand building, hands up, smirking, while THE SOLDIER and THE ARMOURED BILLIONAIRE aim at him. Camera: medium-wide."),
    ("While he's locked up", ["LOKI"], f"{CARRIER} THE TRICKSTER stands inside a round glass cell suspended over a deep drop, smiling calmly. Camera: wide."),
    ("on their own ship,", [], "The giant grey flying aircraft carrier floating above the clouds, huge rotors spinning. Camera: wide, epic."),
    ("his scepter quietly", [], f"{CARRIER} The sceptre lies on a lab table, its blue gem pulsing softly. Camera: close-up, eerie."),
    ("turns the heroes against each other.", ["IRON", "CAP", "THOR"], f"{CARRIER} THE ARMOURED BILLIONAIRE, THE SOLDIER and THE THUNDER GOD argue angrily, pointing fingers, faint blue glow from the sceptre on their faces. Camera: medium shot."),
    ("Then Hawkeye attacks,", ["ARCHER"], "THE ARCHER with glowing blue eyes fires an explosive arrow at the flying carrier from a jet, an explosion blooming. Camera: wide, action."),
    ("Banner hulks out,", ["HULK"], f"{CARRIER} THE GREEN GIANT smashes through a metal wall roaring, sparks and debris. Camera: low angle."),
    ("and Loki kills Agent Coulson.", ["LOKI", "COULSON"], f"{CARRIER} THE TRICKSTER stands over THE AGENT, who slumps against a wall, eyes closing, a single tear of light from the sceptre; no blood. Camera: medium shot, sad dark tones."),
    # --- becoming a team
    ("Fury uses that death", ["FURY"], f"{CARRIER} THE SPY CHIEF holds a set of old trading cards stained with spots, looking down sadly. Camera: close-up."),
    ("to give them a reason", ["FURY", "IRON", "CAP"], f"{CARRIER} THE SPY CHIEF tosses the cards onto a table in front of THE ARMOURED BILLIONAIRE and THE SOLDIER, who look at them in silence. Camera: medium shot."),
    ("to fight together.", ["IRON", "CAP"], f"{CARRIER} THE ARMOURED BILLIONAIRE and THE SOLDIER look at each other and nod firmly. Camera: medium close-up."),
    ("That's the moment", ["IRON", "CAP", "THOR", "SPY", "ARCHER", "BANNER"], "All six heroes walking side by side toward the camera in slow motion, wind blowing, sunset light. Camera: wide, low angle."),
    ("they stop being strangers", [], "Six hands stacked one on top of another: a metal gauntlet, a blue glove, a big hand with a hammer, a black glove, an archer's glove and a green giant hand. Camera: close-up from above."),
    ("and become a team.", ["IRON", "CAP", "THOR", "HULK", "SPY", "ARCHER"], "The six heroes standing in a circle back to back, each in a battle pose, camera spinning around them in a city street. Camera: low angle, iconic hero shot."),
    # --- battle of New York
    ("A portal rips open", [], "From the roof of a tall modern skyscraper, a beam of blue light shoots upward and tears open a huge swirling dark-blue hole in the sky. Camera: low angle, epic."),
    ("above Stark Tower", [], "The tall sleek modern skyscraper in midtown Manhattan with the giant portal swirling directly above its roof. Camera: wide, low angle."),
    ("and aliens flood New York.", [], f"{NYC} Camera: wide aerial view, chaotic."),
    ("Cap calls the shots,", ["CAP"], f"{NYC} THE SOLDIER stands on a street among wrecked cars, pointing and giving orders, shield on his arm. Camera: medium shot, low angle."),
    ("Hawkeye covers the rooftops,", ["ARCHER"], f"{NYC} THE ARCHER (normal eyes now) stands on a rooftop edge firing arrows at flying aliens. Camera: medium shot, dramatic angle."),
    ("and Hulk throws Loki around", ["HULK", "LOKI"], "Inside a fancy penthouse: THE GREEN GIANT grabs THE TRICKSTER by the leg and swings him like a doll, motion lines. Camera: medium-wide, comedic action."),
    ("like a rag doll.", ["HULK", "LOKI"], "THE TRICKSTER lies flat in a person-shaped crater in the marble floor, dazed with swirly eyes, while THE GREEN GIANT walks away. Camera: top-down, comedic."),
    ("Puny god.", ["HULK"], "Close-up of THE GREEN GIANT grunting with a smug face over his shoulder. Camera: close-up, comedic."),
    # --- the nuke
    ("Then the government", [], "Dark government war room: shadowy officials around a glowing table, a hand turning a key. Camera: medium, ominous."),
    ("fires a nuke at the city.", [], "A missile streaks across the sky toward the New York skyline, leaving a white trail. Camera: wide."),
    ("Tony grabs it,", ["IRON"], "THE ARMOURED BILLIONAIRE (helmet on) flies alongside the missile and grabs it from below with both arms. Camera: medium shot, action."),
    ("flies it through the portal,", ["IRON"], "THE ARMOURED BILLIONAIRE carries the missile straight up into the swirling portal, glowing thruster trails behind him. Camera: low angle, epic."),
    ("and sees an alien fleet", ["IRON"], f"{SPACE} A gigantic alien mothership with countless smaller ships behind it, THE ARMOURED BILLIONAIRE tiny in the foreground. Camera: wide, awe."),
    ("in deep space...", ["IRON"], f"{SPACE} THE ARMOURED BILLIONAIRE floating alone in silent space, the missile flying away from him toward the mothership. Camera: wide."),
    ("right before his suit goes dark.", ["IRON"], "Close-up of the armour helmet, its eye slits and chest light flickering and going dark, frost forming. Camera: close-up, silent."),
    # --- ending
    ("Hulk catches him", ["HULK", "IRON"], f"{NYC} THE GREEN GIANT leaps between buildings and catches the falling armoured hero mid-air. Camera: medium-wide, action."),
    ("and they win.", ["IRON", "CAP", "THOR", "HULK", "SPY", "ARCHER"], "The six heroes stand together in the smoky ruined street, the portal closing in the sky above, dusty and exhausted but smiling. Camera: wide."),
    ("But out in deep space,", [], f"{SPACE} A huge dark stone platform floating in space with a throne facing away from the camera. Camera: wide, ominous."),
    ("someone turns around...", ["TITAN"], f"{SPACE} The throne slowly turning, a huge gold-armoured shoulder and purple hand coming into view. Camera: medium, dramatic."),
    ("and smiles.", ["TITAN"], f"{SPACE} THE MYSTERY TITAN's purple face half in shadow with a slow menacing smile. Camera: close-up, chilling."),
    ("That's where Infinity War", [], "A golden armoured gauntlet glove with six empty round slots on the knuckles, glowing faintly, on a dark stone. Camera: close-up, dramatic."),
    ("really began.", [], "Six glowing gems of different colours (blue, yellow, red, purple, green, orange) floating in a circle in dark space. Camera: medium, epic."),
    # --- outro
    ("Want me explain Infinity War", [], "The golden gauntlet glove with all six gems glowing, raised like a fist against a fiery sky. Camera: low angle."),
    ("in next Episode.", [], "A big glowing play button shape floating in front of a dark cosmic background (no text). Camera: centred."),
    ("Then Follow me now", [], "A friendly cartoon hand pointing toward the viewer with a glowing bell shape beside it, warm light. Camera: close-up, no text."),
]

if __name__ == "__main__":
    dest = HERE / "avengers-prompts.md"
    dest.write_text(render(TITLE, (HERE / "script.txt").read_text(encoding="utf-8"), SCENES, CHARACTERS),
                    encoding="utf-8")
    print(f"Wrote {len(SCENES)} prompts to {dest}")
