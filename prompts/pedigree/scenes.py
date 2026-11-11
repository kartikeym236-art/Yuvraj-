"""Pedigree collapse script -> one-click scene prompts (0.5-2 s each).

Usage:  python prompts/pedigree/scenes.py
"""
import sys
from pathlib import Path

HERE = Path(__file__).parent
sys.path.insert(0, str(HERE.parent))
from build_prompts import render  # noqa: E402

TITLE = "Pedigree Collapse: Scene Prompts"

CHARACTERS = {
    "YOU": (
        "YOU (main character): Indian man in his early 20s, slim, big messy curly black hair, dot eyes, "
        "thick dark eyebrows, peach skin with pink blush. Wears a muted teal-green full-sleeve button shirt "
        "with sleeves rolled to the elbows, untucked, dark charcoal trousers, off-white sneakers."
    ),
    "EINSTEIN": ("THE PHYSICIST (1910s): man in his 40s with wild bushy greying dark hair, a thick dark moustache, "
                 "dot eyes, kind eyebrows, a rumpled grey tweed suit."),
    "POE": ("THE POET (1830s): pale thin man in his 20s with wavy dark hair, a thin moustache, sad dot eyes, a black "
            "frock coat, white shirt and black cravat."),
    "DARWIN": ("THE NATURALIST (1830s): man around 30 with receding light-brown hair and long side whiskers, dot "
               "eyes, gentle face, a dark Victorian frock coat with a high collar."),
}

TREE = ("a glowing family-tree diagram drawn as small round portrait circles connected by thin golden lines, "
        "on a dark navy background")

SCENES = [
    ("You only exist", ["YOU"], "YOU stand alone in a soft spotlight on a plain dark stage, looking at his own hands as if amazed he exists. Camera: medium shot."),
    ("because of incest.", ["YOU"], "YOU in a museum in front of a giant old family-tree painting whose branches loop back into each other, mouth open in shock, big sweat drop. Camera: medium shot from the side."),
    ("A lot of incest.", ["YOU"], "YOU with both hands on his cheeks, horrified, while the family-tree painting behind him is a huge tangled ball of looping branches like yarn. Camera: medium close-up, comedic."),
    ("In order for you", ["YOU"], "A long neat line of old portrait frames standing in order like dominoes, leading from the far distance right up to YOU at the front. Camera: low angle along the line."),
    ("to have been born,", [], "A newborn baby wrapped in a white cloth in a hospital cradle, soft warm light. Camera: close-up, gentle."),
    ("you had to have had", ["YOU"], "YOU stand with hands on hips looking up thoughtfully, an empty thought bubble above his head. Camera: medium shot, low angle."),
    ("two parents,", [], "A young Indian couple from the 1990s in an old family-photo style: a man with a moustache and a woman in a saree, smiling. Camera: medium shot, warm nostalgic tones."),
    ("and each of those parents", [], "The same 1990s couple standing apart, each one lit by their own separate spotlight. Camera: medium-wide."),
    ("had to have had two parents,", [], "Above each parent, two sepia portraits of their own parents appear: four grandparents in total, two men with turbans and moustaches and two women in sarees. Camera: wide."),
    ("and so on.", [], f"{TREE} The tree keeps branching upward into the dark, eight, then sixteen circles. Camera: wide, low angle."),
    ("That means after every generation", [], "A tall staircase of old portrait frames rising into the clouds, each step one generation older. Camera: low angle, surreal."),
    ("your number of ancestors doubles.", [], "Two portrait circles splitting into four, then eight, then sixteen, with glowing arrows showing the doubling. Camera: medium, clean infographic look."),
    ("After 10 generations,", [], f"{TREE} Ten levels high now, wide and dense like a giant glowing fan. Camera: wide."),
    ("you have 1,000,", ["YOU"], "YOU stand on a stage in front of an auditorium packed with a thousand people in 1700s clothes, all looking at him. Camera: wide from behind YOU."),
    ("and after 20,", [], f"{TREE} Twenty levels high, exploding outward to fill the whole frame with countless tiny lights. Camera: wide."),
    ("you have 1 million.", ["YOU"], "YOU on a hilltop looking at an enormous crowd in medieval clothes stretching to the horizon. Camera: wide, epic."),
    ("But what if we go back", ["YOU"], "YOU step into a glowing swirling time tunnel of old clocks and flying calendar pages. Camera: medium, from behind."),
    ("to the Roman Republic", [], "Ancient Rome: the Forum with white marble temples and columns, senators in white togas. Camera: wide, sunny."),
    ("around the year zero?", [], "A Roman street market with merchants in tunics, amphoras and a passing chariot, warm golden light. Camera: medium-wide."),
    ("Well, with just 67", ["YOU"], "YOU in a simple Roman tunic look along a short row of portrait frames on a wall, counting them with his finger. Camera: medium shot."),
    ("generations of humans,", [], "A winding line of people from different eras walking in single file from ancient Rome to a modern city. Camera: wide, high angle."),
    ("if every ancestor", [], "A huge grid of cartoon ancestor faces stretching out of frame. Camera: wide, top-down."),
    ("were unique,", [], "Close-up of a few of those faces, each clearly different: different noses, hair and skin tones. Camera: close-up."),
    ("you'd have over", ["YOU"], "YOU looking up at an impossibly huge glowing family tree whose branches cover the entire sky. Camera: low angle."),
    ("100 quintillion", [], "Planet Earth so overcrowded with tiny people that they spill off it into space like sand. Camera: wide from space, comedic."),
    ("direct ancestors.", [], f"{TREE} The tree so huge it fills the galaxy, stars between the branches. Camera: wide, cosmic."),
    ("But since there have only been", ["YOU"], "YOU raise one eyebrow, holding a small glass jar that holds a limited crowd of tiny human figures. Camera: medium close-up."),
    ("about 120 billion humans", [], "A big glass hourglass where tiny human figures fall like sand, the bottom half full of them. Camera: medium, centred."),
    ("to exist,", [], "Ghostly outlines of people from every era (cave people, Romans, medieval peasants, Victorians) standing in rows behind a modern crowd. Camera: wide."),
    ("by the pigeonhole principle,", [], "A wooden wall with only ten pigeonhole boxes and far more pigeons squeezing in, two or three per hole, feathers flying. Camera: medium, comedic."),
    ("this is clearly impossible.", ["YOU"], "YOU stare as the giant family tree tries to squeeze into the small jar of humans and the jar cracks. Camera: medium shot, comedic."),
    ("This phenomenon is known as", [], "A scientist in a white coat studies a tangled family-tree diagram under a big magnifying glass, pinning a blank name card to it. Camera: medium shot."),
    ("pedigree collapse.", [], f"{TREE} The upper branches bend inward and fold together like a closing umbrella. Camera: wide, dramatic."),
    ("Instead of your family tree", ["YOU"], "YOU stand beside a real oak tree whose branches hold old portrait frames like fruit. Camera: wide."),
    ("being a perfect binary tree,", [], "A perfectly symmetrical glowing diagram where every branch splits into exactly two, neat and orderly. Camera: centred, clean."),
    ("it actually collapses", [], "The perfect diagram's branches bend and cross back into each other. Camera: medium."),
    ("in on itself", [], "The lines tangle into a tight knot in the middle. Camera: close-up."),
    ("with the same people", [], "One old couple's portrait glowing gold in several different places on the tangled family tree. Camera: medium."),
    ("appearing over and over again.", [], "A hall of mirrors with the same old couple's portrait repeated again and again into the distance. Camera: wide, surreal."),
    ("This means that mathematically", ["YOU"], "YOU at a chalkboard drawing branching lines and circles that merge back together, realising something. Camera: medium shot from the side."),
    ("distant or close relatives", [], "A big village family gathering of cousins, uncles and aunts crowding together for a group photo. Camera: wide, warm."),
    ("must have gone to town.", [], "An old-times village wedding: a young couple on decorated seats with marigold garlands while the whole extended family dances and plays drums. Camera: wide, festive, wholesome."),
    ("But that shouldn't be too surprising.", ["YOU"], "YOU shrug with a small awkward smile in front of a small isolated medieval village in a valley. Camera: medium-wide."),
    ("Throughout history,", [], "A scroll unrolling with tiny scenes of villages and castles through the ages. Camera: wide, storybook."),
    ("incest was very common,", [], "A wall of old painted portraits of ordinary couples from different centuries, every pair looking like twins with the same nose and chin. Camera: wide, slightly comedic."),
    ("especially in royal families.", [], "A grand palace hall with a long line of royal portraits of kings and queens, all with the same face. Camera: wide."),
    ("For example, the Habsburg", [], "A 1600s Spanish royal portrait of a pale young king with a very long jutting lower jaw, big lower lip, long hair, black clothes and a white lace collar. Camera: medium, painted-portrait feel in cartoon style."),
    ("family tree", [], "A family-tree diagram of that royal family, every portrait showing the same long jaw. Camera: medium."),
    ("looks less like a tree", [], "The royal family-tree diagram's branches loop back into each other until it no longer looks like a tree, just a knot. Camera: medium."),
    ("and more like a line.", [], "The royal family tree squeezed into one straight vertical line of royal faces, all with the same long jaw. Camera: centred, comedic."),
    ("But even recently,", [], "A sepia-toned early 1900s street with old cars and gas lamps. Camera: wide, nostalgic."),
    ("Albert Einstein,", ["EINSTEIN"], "THE PHYSICIST at a chalkboard full of equation-like squiggles (no readable text), smiling. Camera: medium shot."),
    ("Edgar Allan Poe,", ["POE"], "THE POET writing with a quill by candlelight, a black raven on a bookshelf. Camera: medium shot, gloomy."),
    ("and Charles Darwin", ["DARWIN"], "THE NATURALIST examining a finch through a magnifying glass on a ship's deck. Camera: medium shot."),
    ("all married their first cousins.", ["EINSTEIN", "POE", "DARWIN"], "Three vintage oval-framed wedding portraits side by side: THE PHYSICIST, THE POET and THE NATURALIST, each with his adult bride in period wedding clothes. Camera: wide, vintage sepia tones."),
]

if __name__ == "__main__":
    dest = HERE / "pedigree-prompts.md"
    dest.write_text(render(TITLE, (HERE / "script.txt").read_text(encoding="utf-8"), SCENES, CHARACTERS),
                    encoding="utf-8")
    print(f"Wrote {len(SCENES)} prompts to {dest}")
