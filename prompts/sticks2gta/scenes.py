"""'From sticks and stones to GTA 6' script -> one-click scene prompts.

The game itself is described by look (no title or logos), because image tools
often refuse trademarked game names.
Usage:  python prompts/sticks2gta/scenes.py
"""
import sys
from pathlib import Path

HERE = Path(__file__).parent
sys.path.insert(0, str(HERE.parent))
from build_prompts import render  # noqa: E402

TITLE = "From Sticks and Stones to GTA 6: Scene Prompts"

CHARACTERS = {
    "YOU": ("NARRATOR BOY: Indian man in his early 20s, slim, big messy curly black hair, dot eyes, thick dark "
            "eyebrows, peach skin with pink blush. Wears a muted teal-green full-sleeve button shirt with sleeves "
            "rolled to the elbows, untucked, dark charcoal trousers, off-white sneakers."),
    "CAVE": ("EARLY HUMAN: stocky prehistoric man with wild shaggy dark hair and a scruffy beard, heavy brow, dot "
             "eyes, curious eyebrows, wearing a rough brown animal-hide wrap, barefoot."),
}

GAME = ("a modern open-world crime video game shown on a big TV: a sunny Miami-like city with palm trees, neon "
        "lights, ocean, sports cars and highly realistic graphics (no logos, no text)")
CAVE_ENV = "Prehistoric landscape: rocky hills, tall grass, a cave entrance, a misty sky."

S = lambda line, desc, chars=(): (line, list(chars), desc)

SCENES = [
    # --- hook
    S("How did we ever go", "A split image: on the left a caveman's hand holding a stick and a stone, on the right a modern hand holding a game controller. Camera: close-up, symmetrical.", ["CAVE"]),
    S("from sticks and stones", f"{CAVE_ENV} A pile of wooden sticks and rough stones on the dirt. Camera: close-up, warm prehistoric light."),
    S("to GTA 6?", f"A glowing living room at night with {GAME}. Camera: medium-wide, TV glow."),
    S("Let me show you.", "NARRATOR BOY sits on a sofa with a game controller, turning to the viewer with a friendly smile and beckoning hand. Camera: medium shot.", ["YOU"]),
    # --- stone age
    S("First, our primitive ancestors", f"{CAVE_ENV} A small group of EARLY HUMANS stand at the mouth of a cave. Camera: wide.", ["CAVE"]),
    S("created stone tools", f"{CAVE_ENV} EARLY HUMAN chips a sharp stone hand-axe by striking it with another rock, flakes flying. Camera: close-up.", ["CAVE"]),
    S("and discovered fire.", f"{CAVE_ENV} EARLY HUMAN stares amazed at the first flames rising from dry sticks he rubbed together. Camera: medium close-up, orange firelight.", ["CAVE"]),
    S("This allowed us to hunt", f"{CAVE_ENV} EARLY HUMANS with spears chase a woolly mammoth across the grassland. Camera: wide, action.", ["CAVE"]),
    S("and cook our food,", "EARLY HUMANS sit around a campfire roasting meat on sticks at night. Camera: medium shot, warm firelight.", ["CAVE"]),
    S("which helped evolve our brains", "A glowing human brain floating above the campfire, growing bigger and brighter. Camera: medium, magical."),
    S("more effectively over time.", "A row of four skulls from small-brained ape-like to modern human, lined up left to right on a museum shelf. Camera: medium, side view."),
    # --- shelters
    S("With these improved brains,", "EARLY HUMAN taps his own forehead with a clever grin. Camera: close-up, comedic.", ["CAVE"]),
    S("we started building shelters,", f"{CAVE_ENV} EARLY HUMANS lift wooden poles and animal hides to build a simple shelter. Camera: medium-wide.", ["CAVE"]),
    S("migrating from natural caves", "A family of EARLY HUMANS walking out of a dark cave into the sunlight carrying bundles. Camera: wide.", ["CAVE"]),
    S("to man-made dens, huts,", "A small settlement of round huts made of branches, mud and straw, smoke rising from one. Camera: wide."),
    S("and eventually clay buildings.", "Early mud-brick clay houses with flat roofs in a sunny ancient settlement, people carrying pots. Camera: wide."),
    # --- farming
    S("We learned to produce", "Ancient farmers planting seeds in neat rows of dark soil by hand. Camera: medium shot."),
    S("our own sustainable food sources", "Golden wheat fields, goats and cows in a fenced pen beside clay houses. Camera: wide, sunny."),
    S("during the agricultural revolution,", "A wide valley transformed by farmland: irrigation canals, fields and many farmers at work. Camera: wide, high angle."),
    S("so we no longer", "An ancient farmer relaxes against a full grain basket in front of his clay house. Camera: medium shot."),
    S("had to hunt and gather.", "A spear and a woven foraging basket hang unused on the wall of the farmer's house, gathering dust. Camera: close-up."),
    # --- metals
    S("Discovered special metals", "Glowing copper and bronze ore being melted in a small clay furnace, bright orange molten metal. Camera: close-up."),
    S("that we used with fire", "An ancient smith pours molten bronze from a clay crucible into a stone mould, sparks flying. Camera: medium close-up."),
    S("to form even stronger tools,", "A blacksmith hammering a glowing metal blade on an anvil. Camera: medium shot."),
    S("which were used to make agriculture", "Oxen pulling a metal plough through a field, a farmer behind it. Camera: medium-wide."),
    S("more efficient,", "Huge harvest piles of grain and baskets of vegetables stacked high. Camera: wide."),
    S("creating an upward spiral of growth.", "A glowing golden spiral rising upward with small icons along it: a plough, a hammer, a grain basket, a house. Camera: medium, low angle."),
    # --- cities
    S("Population increases drastically,", "A crowded ancient market street packed with people, animals and stalls. Camera: wide, busy."),
    S("turning isolated tribes", "A small lonely tribe camp of a few tents on a vast plain. Camera: very wide."),
    S("into villages", "A thriving village with many houses, wells and fields. Camera: wide."),
    S("and city-states.", "An ancient walled city with temples, a ziggurat and busy gates. Camera: wide, epic."),
    S("Less time making food", "An ancient granary full of grain sacks with only a couple of farmers working. Camera: medium."),
    S("meant people had more time", "Ancient townspeople relaxing in a courtyard under a tree, talking. Camera: medium-wide."),
    S("to specialize", "An ancient workshop street: a potter, a weaver and a carpenter each busy at their own craft. Camera: wide."),
    S("in other areas of knowledge,", "An ancient scholar in a robe studying scrolls and star charts by an oil lamp. Camera: medium shot."),
    S("leading to the rise", "The sun rising over an ancient walled city, golden light on its temples. Camera: wide."),
    S("of writing systems,", "A scribe pressing wedge-shaped marks into a wet clay tablet with a reed (no readable letters). Camera: close-up."),
    S("mathematics, government, and more,", "Split view: an ancient scholar drawing triangles in the sand on the left, a king with a council of elders on the right. Camera: two medium shots."),
    S("which continued to evolve", "A sweeping panorama of ancient cities turning into Greek temples, Roman roads and medieval castles. Camera: wide panorama."),
    S("over the centuries", "A large hourglass whose sand shows tiny scenes of different eras falling through it. Camera: medium, surreal."),
    S("with philosophical discourse", "Greek philosophers in white robes debating on marble steps, one pointing to the sky. Camera: medium-wide."),
    S("and the scientific revolution.", "A 1600s scientist looking through a brass telescope at the night sky, star charts on the table. Camera: medium shot."),
    # --- printing press to industry
    S("The introduction of new inventions", "A cluttered Renaissance inventor's workshop full of gears, drawings and contraptions. Camera: wide."),
    S("such as the printing press", "A wooden printing press with a worker pulling the big lever, inked metal letters in a tray. Camera: medium shot."),
    S("made knowledge available", "Townspeople of all kinds eagerly taking freshly printed books from a printer's stall. Camera: medium-wide."),
    S("on a mass scale,", "Mountains of printed books stacked high in a busy town square, carts carrying more away. Camera: wide."),
    S("another upward spiral", "The glowing golden spiral again, now spinning faster, with books orbiting it. Camera: medium, low angle."),
    S("of knowledge growth", "A grand old library with towering shelves of books and readers on ladders. Camera: wide."),
    S("that led to the development", "Inventors in a workshop bent over large blueprints of a machine with pistons and wheels (no text). Camera: medium shot."),
    S("of steam power", "A huge steam engine with pistons and a big flywheel puffing white steam. Camera: medium, low angle."),
    S("and the Industrial Revolution.", "A Victorian industrial city with tall smoking chimneys, factories and a steam train crossing a bridge. Camera: wide."),
    # --- electricity and communication
    S("Shortly after,", "Dark storm clouds over the factory city with a flash of lightning. Camera: wide."),
    S("harnessing the power of electricity", "A glowing old light bulb with a bright filament, electric sparks around a copper coil. Camera: close-up."),
    S("and automated machines and inventions,", "A factory floor with rows of automatic machines and conveyor belts moving on their own. Camera: wide."),
    S("giving birth to wired communication", "Telegraph poles with long wires stretching across open countryside. Camera: wide."),
    S("with the telegraph", "An operator in a waistcoat tapping a brass telegraph key on a wooden desk. Camera: close-up."),
    S("that transmitted dots and dashes", "Glowing dots and dashes of light travelling along a telegraph wire. Camera: medium, magical."),
    S("over long distances,", "The telegraph wire stretching over mountains, rivers and a desert to a far town. Camera: very wide."),
    S("which evolved into the telephone", "A woman in 1900s clothes speaking into an old candlestick telephone. Camera: medium close-up."),
    S("and eventually wireless frequencies", "Invisible radio waves drawn as glowing rings spreading from a tall radio tower. Camera: wide, low angle."),
    S("to transmit information worldwide", "The globe with glowing radio waves rippling across every continent. Camera: wide from space."),
    S("with the radio.", "A 1940s family gathered around a big wooden radio in their living room, listening happily. Camera: medium shot, warm."),
    # --- computers
    S("Combining the transmission of electrical data", "Glowing electric signals flowing through wires into a large machine. Camera: medium."),
    S("with mathematics,", "A chalkboard full of logic diagrams and circuit symbols (no readable text). Camera: medium."),
    S("we turned the dots and dashes", "The glowing dots and dashes from the telegraph wire floating in the air. Camera: close-up."),
    S("into 1s and 0s,", "The dots and dashes transforming into a stream of glowing ones and zeros (simple digit shapes) flowing like rain. Camera: medium, digital glow."),
    S("creating computers.", "A huge 1940s room-sized computer with walls of vacuum tubes, switches and engineers in white coats. Camera: wide."),
    S("Over time, these computers", "A row of computers getting smaller from left to right: room-sized, cabinet-sized, desk-sized. Camera: wide."),
    S("scaled down in price and size", "A giant computer shrinking down to a small beige box on a desk. Camera: medium, playful."),
    S("to give birth", "A small new beige computer being unboxed on a kitchen table by an excited family. Camera: medium shot."),
    S("to the home computer.", "A 1980s bedroom with a beige home computer, a kid typing happily (no readable text on screen). Camera: medium shot, nostalgic."),
    S("The military started experimenting", "A 1960s military research lab with uniformed officers and engineers around big computer consoles. Camera: medium-wide."),
    S("with cellular network technology", "Tall network towers and antennas on a hill linked by glowing lines. Camera: wide."),
    S("that spread worldwide", "Glowing network lines spreading across the globe like a web. Camera: wide from space."),
    S("and connected all home computers", "Many homes at night, each with a glowing computer screen, linked by glowing lines. Camera: wide, high angle."),
    S("with the internet.", "The globe wrapped in a glowing web of connections between cities. Camera: wide from space."),
    # --- GPUs and games
    S("Advancements in microchip processing speeds", "Extreme close-up of a microchip with tiny glowing circuits and pulses of light racing through. Camera: macro."),
    S("allowed us to display visuals", "Colourful simple shapes and blocky images appearing on an old computer screen. Camera: close-up, retro."),
    S("on computer screens,", "A row of old computer monitors in an office all showing simple coloured graphics. Camera: medium-wide."),
    S("led to specialized computer chips", "Extreme close-up of a special square chip mounted on a green circuit board. Camera: macro."),
    S("known as GPUs", "A modern graphics card with big fans and glowing RGB lights. Camera: medium close-up, dramatic."),
    S("that drastically increased the complexity", "The same scene on screens side by side: a blocky shape, then a detailed shaded 3D mountain. Camera: medium."),
    S("of those visuals", "A computer screen showing a beautiful detailed 3D landscape with water reflections. Camera: close-up."),
    S("that we can now interact with", "A hand moving a mouse and pressing keys on a keyboard, the 3D scene on screen responding. Camera: close-up."),
    S("in real time,", "A 3D character on screen jumping at the exact moment a finger presses a controller button. Camera: close-up, split focus."),
    S("called video games.", "A teenager in a dim bedroom happily playing a colourful video game with a controller. Camera: medium shot, screen glow."),
    S("GTA 1 was released", "A 1990s game box on a store shelf with a top-down city illustration on its cover (no text, no logo). Camera: medium close-up, nostalgic."),
    S("in 1997,", "A 1997 bedroom: a bulky CRT monitor, a beige PC, posters and a floppy-disk box on the desk. Camera: medium-wide, nostalgic."),
    S("utilizing those interactive graphics", "A hand on a 1990s keyboard while the CRT screen shows tiny pixel cars driving. Camera: close-up."),
    S("in a 2D simulation", "A top-down 2D pixel-art city on a CRT screen: tiny cars, roads and buildings from above. Camera: close-up on the screen."),
    S("of our world.", "A real city seen from straight above by drone, matching the pixel map's layout of roads and blocks. Camera: top-down aerial."),
    S("The continual development of GPUs", "A row of graphics cards from small and simple to huge with three fans, glowing brighter left to right. Camera: wide."),
    S("gave rise to further improved", "A graphics card rising up out of its box on a beam of light, glowing brighter. Camera: medium, low angle."),
    S("3D graphics,", "A 2000s TV showing a blocky early-3D city with low-detail cars and buildings. Camera: close-up, nostalgic."),
    S("which were used to create", "A game studio in the 2000s with developers building a 3D city on their monitors. Camera: wide."),
    S("subsequent GTA titles", "A row of game boxes on a shelf, each cover a different crime-city illustration (no text, no logos). Camera: medium."),
    S("in 3D.", "A 2010s TV showing a detailed 3D sunny city with a car chase. Camera: close-up."),
    # --- online and GTA 6
    S("The internet continued to increase", "A fibre-optic cable glowing with light pulses racing through it. Camera: close-up."),
    S("in use and speed,", "A download bar filling up fast on a laptop screen (no numbers), the user cheering. Camera: close-up."),
    S("so we can download games", "A big glowing game file shape flying down from a cloud into a gaming console. Camera: medium, playful."),
    S("like these from central servers", "A huge server room with endless rows of black racks and blinking lights. Camera: wide, deep perspective."),
    S("and also play", "Two friends on a sofa playing a game together with controllers, laughing. Camera: medium shot."),
    S("with each other online.", "Four friends in different cities each at their screens with headsets, linked by glowing lines across a map. Camera: four-way split."),
    S("The rise of gaming culture", "A packed esports arena with players on stage, giant screens and a cheering crowd. Camera: wide, epic."),
    S("led to more funding,", "Stacks of money bags being delivered to a game studio office. Camera: medium, playful."),
    S("thus higher budgets for video games", "A big modern game studio with hundreds of developers at desks with large monitors. Camera: wide."),
    S("over the decades,", "A timeline of game consoles from a 1980s box to a sleek modern console. Camera: wide, side view."),
    S("leading to at least $1 billion", "A giant mountain of gold coins and banknotes in front of a game studio building. Camera: wide, comedic."),
    S("and over 13 years", "A calendar wall with pages flying off fast while developers keep working, their hair growing longer. Camera: medium, comedic."),
    S("dedicated to the development", "Game developers working late at night in a big studio, pizza boxes and coffee cups on desks. Camera: wide."),
    S("of GTA 6,", "A game artist at a huge monitor building a detailed sunny Miami-like city with palm trees and neon signs (no text). Camera: over-the-shoulder."),
    S("which hopefully comes out", "NARRATOR BOY sits on the edge of his sofa with a controller, eyes wide with hope, fingers crossed. Camera: medium shot.", ["YOU"]),
    S("in November 2026.", f"An autumn night: a living room with orange leaves outside the window and {GAME}. Camera: medium-wide, glowing."),
    S("Thanks for watching.", "NARRATOR BOY waves goodbye with a big smile, controller in his other hand. Camera: medium shot.", ["YOU"]),
]

if __name__ == "__main__":
    dest = HERE / "sticks2gta-prompts.md"
    dest.write_text(render(TITLE, (HERE / "script.txt").read_text(encoding="utf-8"), SCENES, CHARACTERS),
                    encoding="utf-8")
    print(f"Wrote {len(SCENES)} prompts to {dest}")
