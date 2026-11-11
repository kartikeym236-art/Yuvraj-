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
    ("You only exist because of incest.", ["YOU"], "YOU stand in front of a giant old family-tree painting in a museum, mouth open in shock, a sweat drop. Camera: medium shot from the side."),
    ("A lot of incest.", ["YOU"], "Close-up of YOU's horrified face, eyes wide, both hands on his cheeks. Camera: close-up, comedic."),
    ("In order for you", ["YOU"], f"YOU stand at the bottom of {TREE}, a single glowing circle above his head. Camera: medium shot."),
    ("to have been born,", [], "A newborn baby wrapped in a white cloth in a hospital cradle, soft warm light. Camera: close-up, gentle."),
    ("you had to have had", ["YOU"], f"YOU look upward at {TREE}, two lines rising from his circle. Camera: low angle."),
    ("two parents,", [], "A young Indian couple from the 1990s smiling in an old family photo style: a man with a moustache and a woman in a saree. Camera: medium shot, warm nostalgic tones."),
    ("and each of those parents", [], f"{TREE} The two parent circles glow and each sprouts two new lines upward. Camera: medium."),
    ("had to have had two parents,", [], "Four grandparents in old sepia portrait style standing in a row: two men with turbans and moustaches, two women in sarees. Camera: wide."),
    ("and so on.", [], f"{TREE} The tree keeps branching upward, eight, then sixteen circles, rising into the dark. Camera: wide, low angle."),
    ("That means after every generation", [], "A long staircase of old portrait frames going up into the clouds, each step with more frames than the last. Camera: low angle, surreal."),
    ("your number of ancestors doubles.", [], "Two portrait circles splitting into four, then eight, with glowing arrows showing the doubling. Camera: medium, clean infographic look, no numbers."),
    ("After 10 generations,", [], f"{TREE} The tree now wide and dense, a thousand tiny glowing circles fanning out like a giant fan. Camera: wide."),
    ("you have 1,000,", ["YOU"], "YOU stand in front of a large school auditorium packed with a thousand people in clothes from the 1700s, all looking at him. Camera: wide from behind YOU."),
    ("and after 20,", [], f"{TREE} The tree explodes outward, filling the whole frame with countless tiny lights. Camera: wide."),
    ("you have 1 million.", ["YOU"], "YOU standing small on a hill looking at an enormous crowd of people in medieval clothes stretching to the horizon. Camera: wide, epic."),
    ("But what if we go back", ["YOU"], "YOU step into a glowing swirling time tunnel of old clocks and calendars. Camera: medium, from behind."),
    ("to the Roman Republic", [], "Ancient Rome: the Forum with white marble temples, columns, people in togas, a red banner with an eagle (no text). Camera: wide, sunny."),
    ("around the year zero?", [], "A Roman street market with merchants in tunics, amphoras, a chariot passing, warm golden light. Camera: medium-wide."),
    ("Well, with just", ["YOU"], "YOU in Roman clothes (a simple tunic) scratching his head thoughtfully, holding a wax tablet. Camera: medium close-up, comedic."),
    ("67 generations", [], "A very long winding line of people from different eras walking in single file from ancient Rome to a modern city, like a parade through time. Camera: wide, high angle."),
    ("of humans,", [], "Close-up of many hands of different ages and eras holding each other in a long chain. Camera: close-up."),
    ("if every ancestor were unique,", [], "An endless grid of distinct cartoon faces, each one different, stretching out of frame. Camera: wide, top-down."),
    ("you'd have over", ["YOU"], "YOU looking up at an impossibly huge glowing tree whose branches cover the entire sky. Camera: low angle."),
    ("100 quintillion", [], "Planet Earth so overcrowded with tiny people that they spill off it into space like sand. Camera: wide from space, comedic."),
    ("direct ancestors.", [], f"{TREE} The tree so huge that it fills the galaxy, stars between the branches. Camera: wide, cosmic."),
    ("But since there have only been", ["YOU"], "YOU holding a small glass jar labelled with no text, peering at it skeptically. Camera: medium close-up."),
    ("about 120 billion humans", [], "A big glass hourglass filled with countless tiny human figures as sand. Camera: medium, centred."),
    ("to exist,", [], "The full sweep of human history in one panorama: cave people, pyramids, castles, a modern city skyline. Camera: wide panorama."),
    ("by the pigeonhole principle,", [], "A wooden wall of pigeonhole boxes with only ten holes and far more pigeons trying to squeeze in, two or three per hole, feathers flying. Camera: medium, comedic."),
    ("this is clearly impossible.", ["YOU"], "YOU looking at a math board where a huge glowing number line overflows and cracks the board, his eyebrows raised. Camera: medium shot, no readable numbers."),
    ("This phenomenon is known", [], "An old leather-bound book opening with a glowing light rising from its pages. Camera: close-up."),
    ("as pedigree collapse.", [], f"{TREE} The upper branches bend inward and fold together, the tree folding in on itself like a closing umbrella. Camera: wide, dramatic."),
    ("Instead of your family tree", [], "A real oak tree with portrait frames hanging from its branches like fruit, on a hill. Camera: wide."),
    ("being a perfect binary tree,", [], "A perfectly symmetrical glowing diagram that splits into two at every level, neat and orderly. Camera: centred, clean."),
    ("it actually collapses in on itself", [], "The same diagram's branches bending and crossing back into each other, lines tangling like a net. Camera: medium."),
    ("with the same people", [], "One old man's portrait circle highlighted in gold appearing in several different places on the family tree. Camera: medium."),
    ("appearing over and over again.", [], "A hall of mirrors with the same old couple's portrait repeated again and again into the distance. Camera: medium, surreal."),
    ("This means that mathematically", ["YOU"], "YOU at a chalkboard drawing branching lines with chalk, then freezing as he realises something. Camera: medium shot from behind."),
    ("distant or close relatives", [], "A big village family gathering: cousins, uncles and aunts of all ages crowded together for a group photo. Camera: wide, warm."),
    ("must have gone to town.", [], "A village wedding in old times: a couple sits on decorated seats with marigold garlands while the whole extended family celebrates, music and dancing. Camera: wide, festive, wholesome."),
    ("But that shouldn't be", ["YOU"], "YOU shrugging with a small awkward smile. Camera: medium close-up."),
    ("too surprising.", [], "A small isolated medieval village in a valley surrounded by mountains, only a few houses. Camera: wide establishing."),
    ("Throughout history,", [], "A scroll unrolling across the screen showing tiny scenes of kings, castles and villages through the ages. Camera: wide, storybook."),
    ("incest was very common,", [], "Old royal wedding portrait painting in a gilded frame: a young king and queen who look extremely similar, same nose and same chin. Camera: medium, slightly comedic."),
    ("especially in royal families.", [], "A grand palace hall with a long line of royal portraits on the wall, each with the same face. Camera: wide."),
    ("For example,", [], "An old European royal crest on a stone wall: a double-headed black eagle on gold. Camera: close-up."),
    ("the Habsburg family tree", [], "A 1600s Spanish royal portrait of a pale young king with a very long, jutting lower jaw, big lower lip, long hair, black clothes and a white lace collar. Camera: medium, painted-portrait feel in cartoon style."),
    ("looks less like a tree", [], "A family-tree diagram where the branches loop back into each other so much that it looks like a tangled knot. Camera: medium."),
    ("and more like a line.", [], "The family tree squeezed into a single straight vertical line of royal faces, all with the same long jaw. Camera: centred, comedic."),
    ("But even recently,", [], "A sepia-toned early 1900s street with old cars and gas lamps. Camera: wide, nostalgic."),
    ("Albert Einstein,", ["EINSTEIN"], "THE PHYSICIST stands at a chalkboard full of equation-like squiggles (no readable text), smiling. Camera: medium shot."),
    ("Edgar Allan Poe,", ["POE"], "THE POET sits at a candle-lit desk writing with a quill, a black raven perched on a bookshelf. Camera: medium shot, gloomy."),
    ("and Charles Darwin", ["DARWIN"], "THE NATURALIST examines a finch through a magnifying glass on a ship's deck, notebook in hand. Camera: medium shot."),
    ("all married their first cousins.", ["EINSTEIN", "POE", "DARWIN"], "Three old wedding-style portraits side by side in oval frames: THE PHYSICIST with his wife, THE POET with his wife and THE NATURALIST with his wife, all adults in their period clothes. Camera: wide, vintage sepia tones."),
]

if __name__ == "__main__":
    dest = HERE / "pedigree-prompts.md"
    dest.write_text(render(TITLE, (HERE / "script.txt").read_text(encoding="utf-8"), SCENES, CHARACTERS),
                    encoding="utf-8")
    print(f"Wrote {len(SCENES)} prompts to {dest}")
