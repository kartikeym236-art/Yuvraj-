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
    ("You only exist", ["YOU"], "YOU stand in front of a giant old family-tree painting in a museum, looking up at it curiously. Camera: medium shot from the side."),
    ("because of incest.", ["YOU"], "YOU's mouth drops open in shock in front of the painting, a big sweat drop. Camera: medium close-up."),
    ("A lot", ["YOU"], "Close-up of YOU's horrified face, both hands on his cheeks. Camera: close-up, comedic."),
    ("of incest.", [], "The family-tree painting's branches twist and loop into each other like a tangled ball of yarn. Camera: medium, comedic."),
    ("In order", [], "A long neat line of old portrait frames standing in order like dominoes, from ancient faces at the far end down to a modern baby photo at the front. Camera: low angle along the line."),
    ("for you", ["YOU"], "YOU point at himself with both thumbs, eyebrows raised. Camera: medium close-up."),
    ("to have", ["YOU"], "YOU stand looking down at himself, both hands on his chest, as if thinking about his own existence. Camera: medium shot."),
    ("been born,", [], "A newborn baby wrapped in a white cloth in a hospital cradle, soft warm light. Camera: close-up, gentle."),
    ("you had", ["YOU"], "YOU stand with hands on hips, looking thoughtfully upward. Camera: medium shot, low angle."),
    ("to have had", ["YOU"], "Close-up of YOU tapping his chin, an empty thought bubble above his head. Camera: close-up."),
    ("two parents,", [], "A young Indian couple from the 1990s in an old family photo style: a man with a moustache and a woman in a saree, smiling. Camera: medium shot, warm nostalgic tones."),
    ("and each", [], "The 1990s couple standing apart, each one under their own spotlight. Camera: medium-wide."),
    ("of those parents", [], "Close-up of the 1990s couple's two faces side by side, smiling gently. Camera: close-up, warm nostalgic tones."),
    ("had to", [], "The 1990s couple both look upward thoughtfully. Camera: medium shot, low angle."),
    ("have had", [], "The 1990s couple standing under a dark sky above them, looking up. Camera: medium-wide, low angle."),
    ("two parents,", [], "Four grandparents in old sepia portrait style standing in a row: two men with turbans and moustaches, two women in sarees. Camera: wide."),
    ("and so on.", [], f"{TREE} The tree keeps branching upward into the dark, eight, then sixteen circles. Camera: wide, low angle."),
    ("That means", ["YOU"], "YOU at a chalkboard turning to the viewer to explain, chalk in hand, one finger raised. Camera: medium shot."),
    ("after every generation", [], "A long staircase of old portrait frames rising into the clouds. Camera: low angle, surreal."),
    ("your number", ["YOU"], "YOU holding a silver hand tally counter, clicking it, looking at the family tree. Camera: medium close-up."),
    ("of ancestors doubles.", [], "Two portrait circles splitting into four, then eight, with glowing arrows showing the doubling. Camera: medium, clean infographic look."),
    ("After 10 generations,", [], f"{TREE} The tree now wide and dense, like a giant glowing fan. Camera: wide."),
    ("you have", ["YOU"], "YOU walk onto a big stage in front of a closed red curtain, nervous. Camera: medium shot from the side."),
    ("1,000,", [], "The auditorium packed with a thousand people in 1700s clothes, all staring at the stage. Camera: wide from the stage."),
    ("and after 20,", [], f"{TREE} The tree explodes outward, filling the whole frame with countless tiny lights. Camera: wide."),
    ("you have", ["YOU"], "YOU climbing to the top of a grassy hill. Camera: medium, from behind."),
    ("1 million.", ["YOU"], "From the hilltop, YOU look at an enormous crowd in medieval clothes stretching to the horizon. Camera: wide, epic."),
    ("But what if", ["YOU"], "YOU raise one finger with a sly idea face. Camera: close-up."),
    ("we go back", ["YOU"], "YOU step into a glowing swirling time tunnel of old clocks and calendar pages. Camera: medium, from behind."),
    ("to the Roman", [], "Ancient Rome: the Forum with white marble temples and columns, people in togas. Camera: wide, sunny."),
    ("Republic around", [], "Roman senators in white togas debating in a stone hall. Camera: medium-wide."),
    ("the year zero?", [], "A Roman street market with merchants in tunics, amphoras and a passing chariot, warm golden light. Camera: medium-wide."),
    ("Well, with just", ["YOU"], "YOU in a simple Roman tunic scratching his head, holding a wax tablet. Camera: medium close-up, comedic."),
    ("67 generations", [], "A long winding line of people from different eras walking in single file from ancient Rome to a modern city. Camera: wide, high angle."),
    ("of humans,", [], "Close-up of many hands of different ages and eras holding each other in a long chain. Camera: close-up."),
    ("if every ancestor", [], "An endless grid of distinct cartoon faces stretching out of frame. Camera: wide, top-down."),
    ("were unique,", [], "Close-up of a few of those faces, each clearly different: different noses, hair and skin tones. Camera: close-up."),
    ("you'd have over", ["YOU"], "YOU looking up at an impossibly huge glowing tree whose branches cover the sky. Camera: low angle."),
    ("100 quintillion", [], "Planet Earth so overcrowded with tiny people that they spill off it into space like sand. Camera: wide from space, comedic."),
    ("direct ancestors.", [], f"{TREE} The tree so huge it fills the galaxy, stars between the branches. Camera: wide, cosmic."),
    ("But since", ["YOU"], "YOU raise one finger to object, eyebrows lowered, 'but wait' expression. Camera: medium close-up."),
    ("there have only", [], "A glass jar on a table holding a limited crowd of tiny human figures, only filled halfway. Camera: close-up."),
    ("been about", [], "A huge glass hourglass where tiny human figures fall like sand, representing everyone who ever lived. Camera: medium, centred."),
    ("120", [], "Close-up of the hourglass's bottom bulb almost full of tiny people. Camera: close-up."),
    ("billion humans", [], "The full sweep of human history in one panorama: cave people, pyramids, castles, a modern skyline. Camera: wide panorama."),
    ("to exist,", [], "A crowd of faint ghostly outlines of people from every era (cave people, Romans, medieval peasants, Victorians) standing behind a modern crowd. Camera: wide."),
    ("by the", ["YOU"], "YOU at the chalkboard raising one finger like a teacher about to state a rule. Camera: medium shot."),
    ("pigeonhole principle,", [], "Far more pigeons than holes squeeze into the boxes, two or three per hole, feathers flying. Camera: medium, comedic."),
    ("this is", ["YOU"], "YOU compare a tiny jar of humans with a giant overflowing family tree that bursts out of the frame. Camera: medium shot."),
    ("clearly impossible.", ["YOU"], "The board cracks down the middle; YOU jump back with raised eyebrows. Camera: medium shot, comedic."),
    ("This phenomenon", [], "A scientist in a white coat studies a tangled, collapsed family-tree diagram under a big magnifying glass. Camera: medium shot."),
    ("is known as", [], "The scientist pins a blank name card onto the tangled family-tree diagram. Camera: close-up."),
    ("pedigree collapse.", [], f"{TREE} The upper branches bend inward and fold together like a closing umbrella. Camera: wide, dramatic."),
    ("Instead of", ["YOU"], "YOU step forward holding up one hand in a 'wait' gesture. Camera: medium shot."),
    ("your family tree", [], "The oak tree's branches hung with old portrait frames like fruit. Camera: medium-wide."),
    ("being a perfect", [], "A perfectly symmetrical glowing diagram, neat and orderly. Camera: centred, clean."),
    ("binary tree,", [], "Close-up of the diagram's branches, each splitting into exactly two. Camera: close-up."),
    ("it actually collapses", [], "The diagram's branches bend and cross back into each other. Camera: medium."),
    ("in on itself", [], "The lines tangle into a tight knot in the middle. Camera: close-up."),
    ("with the same", [], "One old man's portrait circle glowing gold. Camera: close-up."),
    ("people appearing", [], "The same gold portrait circle appearing in several places on the family tree. Camera: medium."),
    ("over and", [], "A hall of mirrors with the same old couple's portrait reflected again and again. Camera: medium, surreal."),
    ("over again.", [], "A row of identical old couple portraits shrinking into the distance like an endless corridor. Camera: wide, deep perspective."),
    ("This means", ["YOU"], "YOU at the chalkboard freezing mid-line as he realises something. Camera: medium shot from behind."),
    ("that mathematically", ["YOU"], "YOU writing branching arrows and circles on the chalkboard, the lines merging back together. Camera: medium shot from the side."),
    ("distant or", [], "A big village family gathering: cousins, uncles and aunts crowding together for a group photo. Camera: wide, warm."),
    ("close relatives", [], "Two cousins in old village clothes standing shyly near a well, smiling at each other. Camera: medium shot, wholesome."),
    ("must have", [], "The two cousins in old village clothes glance at each other and blush. Camera: medium close-up, wholesome."),
    ("gone to town.", [], "An old-times village wedding: the couple on decorated seats while the whole extended family dances and plays drums. Camera: wide, festive, wholesome."),
    ("But that shouldn't", ["YOU"], "YOU shrugging with a small awkward smile. Camera: medium close-up."),
    ("be too surprising.", [], "A small isolated medieval village in a valley surrounded by mountains, only a few houses. Camera: wide establishing."),
    ("Throughout history,", [], "A scroll unrolling with tiny scenes of kings, castles and villages through the ages. Camera: wide, storybook."),
    ("incest was", [], "An old painted portrait of an ordinary village couple from centuries ago who look extremely alike, same nose and chin. Camera: medium, slightly comedic."),
    ("very common,", [], "A wall of many old portraits of ordinary couples from different centuries, every pair looking like twins. Camera: wide."),
    ("especially in", [], "A bright spotlight sweeping across the wall of old couple portraits, searching. Camera: wide."),
    ("royal families.", [], "A grand palace hall with a long line of royal portraits, all with the same face. Camera: wide."),
    ("For example,", ["YOU"], "YOU hold up one finger with a teacher-like expression, about to give an example. Camera: medium close-up."),
    ("the Habsburg", [], "A 1600s Spanish royal portrait of a pale young king with a very long jutting lower jaw, big lower lip, long hair, black clothes and a white lace collar. Camera: medium, painted-portrait feel in cartoon style."),
    ("family tree", [], "A family-tree diagram of that royal family with every portrait showing the same long jaw. Camera: medium."),
    ("looks less", [], "The diagram's branches loop back into each other into a tangled knot. Camera: medium."),
    ("like a tree", [], "A normal, wide, spreading family tree diagram for comparison, branches fanning out evenly. Camera: medium."),
    ("and more", [], "The royal family tree diagram's branches squeezing together into a narrow column. Camera: medium."),
    ("like a line.", [], "The family tree squeezed into one straight vertical line of royal faces, all with the same long jaw. Camera: centred, comedic."),
    ("But even recently,", [], "A sepia-toned early 1900s street with old cars and gas lamps. Camera: wide, nostalgic."),
    ("Albert Einstein,", ["EINSTEIN"], "THE PHYSICIST at a chalkboard full of equation-like squiggles (no readable text), smiling. Camera: medium shot."),
    ("Edgar Allan Poe,", ["POE"], "THE POET writing with a quill by candlelight, a black raven on a bookshelf. Camera: medium shot, gloomy."),
    ("and Charles Darwin", ["DARWIN"], "THE NATURALIST examining a finch through a magnifying glass on a ship's deck. Camera: medium shot."),
    ("all married", ["EINSTEIN", "POE", "DARWIN"], "Three vintage oval-framed portraits side by side: THE PHYSICIST, THE POET and THE NATURALIST, each in wedding clothes. Camera: wide, vintage sepia tones."),
    ("their first cousins.", [], "Three vintage oval-framed wedding portraits of their adult wives in period clothes, each linked by a gold line to a small matching family-tree branch. Camera: wide, vintage sepia tones."),
]

if __name__ == "__main__":
    dest = HERE / "pedigree-prompts.md"
    dest.write_text(render(TITLE, (HERE / "script.txt").read_text(encoding="utf-8"), SCENES, CHARACTERS),
                    encoding="utf-8")
    print(f"Wrote {len(SCENES)} prompts to {dest}")
