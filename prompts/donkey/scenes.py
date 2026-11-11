"""Buridan's donkey script -> one-click scene prompts (0.5-2 s each).

Usage:  python prompts/donkey/scenes.py
"""
import sys
from pathlib import Path

HERE = Path(__file__).parent
sys.path.insert(0, str(HERE.parent))
from build_prompts import render  # noqa: E402

TITLE = "The Donkey Between Two Haystacks: Scene Prompts"

CHARACTERS = {
    "DONKEY": (
        "DONKEY: a thin cartoon donkey drawn in the same webcomic style: dusty grey-brown fur, "
        "lighter cream muzzle and belly, very long upright ears with dark tips, short dark spiky mane, "
        "tiny solid black dot eyes, thick expressive dark eyebrows, small round nostrils, thin legs "
        "with dark hooves, short tail with a dark tuft, a frayed rope halter around its head. Its ribs "
        "show slightly because it is hungry."
    ),
    "BOY": (
        "YOUNG MAN: Indian man in his early 20s, slim, big messy curly black hair, dot eyes, thick "
        "dark eyebrows, peach skin with pink blush. Wears a muted teal-green full-sleeve button shirt "
        "with sleeves rolled to the elbows, untucked, dark charcoal trousers, off-white sneakers, a "
        "black analog wristwatch on his left wrist."
    ),
    "GIRL_A": (
        "GIRL ONE: Indian woman in her early 20s, long wavy black hair in a single braid over her "
        "shoulder, dot eyes, soft smile, small pearl earrings, maroon floral kurta with a cream dupatta."
    ),
    "GIRL_B": (
        "GIRL TWO: Indian woman in her early 20s, short wavy black bob haircut, dot eyes, warm grin, "
        "small gold studs, mustard-yellow kurta with white block print and a light-blue dupatta."
    ),
    "PHILOSOPHER": (
        "PHILOSOPHER: elderly medieval European scholar, long white beard, bald head with white hair "
        "on the sides, bushy white eyebrows, dot eyes, wears a dark brown hooded wool robe with a "
        "rope belt, holds a quill pen."
    ),
}

FIELD = ("Wide dry open field at golden hour: cracked pale earth, sparse dry grass, flat empty horizon, "
         "soft hazy orange sky, long shadows.")
HAY = "two identical golden rectangular hay bales tied with brown twine, exactly the same size and shape"
ROOM = ("Small Indian rented room at night: single bed with a checked bedsheet, study table with a laptop "
        "and a steel water glass, a ceiling fan, a tube light, a window with a metal grill.")
STUDY = ("Candle-lit medieval stone study: wooden desk piled with old books and parchment scrolls, an "
         "ink pot, a small arched window showing a night sky.")

SCENES = [
    # --- the donkey
    ("Imagine a donkey", ["DONKEY"], f"{FIELD} The DONKEY stands alone in the middle of the field, side view, ears up, looking calm. Camera: wide shot, eye level, lots of empty space around it."),
    ("standing exactly halfway", ["DONKEY"], f"{FIELD} The DONKEY stands perfectly centred; a faint dotted line drawn on the ground runs from its hooves to the left and to the right edges of the frame. Camera: wide, perfectly symmetrical."),
    ("between two identical bales of hay:", ["DONKEY"], f"{FIELD} {HAY.capitalize()} sit on the ground, one far left and one far right, with the DONKEY exactly in the middle. Camera: wide, perfectly symmetrical, eye level."),
    ("same size,", [], f"{FIELD} Close-up of the two identical hay bales side by side in two matching frames (split screen with a thin vertical line), a wooden measuring stick lying in front of each showing the same height. Camera: straight on."),
    ("same distance,", ["DONKEY"], f"{FIELD} Top-down view: the DONKEY in the exact centre, two straight lines of small stones on the ground stretching equally to the hay bale on each side. Camera: bird's-eye view, symmetrical."),
    ("same smell,", ["DONKEY"], f"{FIELD} Close-up of the DONKEY's face, nostrils flared, eyes half closed, as two identical wavy curls of soft golden scent drift toward its nose from the left and from the right. Camera: close-up, front view."),
    ("completely equal in every way.", [], f"{FIELD} An old brass balance scale stands on the ground with a small handful of hay in each pan, the beam perfectly level. Camera: medium close-up, symmetrical."),
    ("The donkey is hungry,", ["DONKEY"], f"{FIELD} The DONKEY's ribs show, its belly is thin, a small rumble mark near its stomach, its eyebrows tilted up in hunger and a drop of drool at the corner of its mouth. Camera: medium shot, side view."),
    ("but because both options", ["DONKEY"], f"{FIELD} The DONKEY turns its head to the left toward one hay bale, ears pointing left. Camera: medium shot from behind the donkey's shoulder."),
    ("are perfectly identical,", ["DONKEY"], f"{FIELD} The DONKEY turns its head to the right toward the other identical hay bale, ears pointing right; the scene mirrors the previous one. Camera: medium shot from behind the other shoulder."),
    ("it has no rational reason", ["DONKEY"], f"{FIELD} Close-up of the DONKEY's face, eyes darting, eyebrows knotted in confusion, a small sweat drop on its forehead, a tangled scribble cloud above its head. Camera: close-up."),
    ("to choose one over the other.", ["DONKEY"], f"{FIELD} The DONKEY lifts one front hoof to step, then freezes mid-air, hoof hovering, looking back and forth (motion lines on its head). Camera: medium shot, side view."),
    ("So it stands there,", ["DONKEY"], f"{FIELD} The DONKEY stands still in the middle, small and alone, the sun lower in the sky, shadows longer. Camera: very wide shot, lonely mood."),
    ("unable to decide,", ["DONKEY"], f"{FIELD} Night has fallen, stars and a thin moon overhead; the DONKEY is still standing in the exact same spot between the two bales, eyes wide open and tired. Camera: wide, cool blue night light."),
    ("and eventually", ["DONKEY"], f"{FIELD} Morning again, dry leaves blowing; the DONKEY is much thinner, ears drooping, knees wobbling, still between the two untouched hay bales. Camera: medium-wide, faded colours."),
    ("it starves to death.", [], f"{FIELD} The two untouched hay bales still sit on each side; in the middle, only the DONKEY's frayed rope halter lies on the cracked ground, a crow sits on one bale. Camera: wide, symmetrical, quiet and sad, desaturated colours."),
    # --- the question
    ("If two options are truly equal,", ["BOY"], "Plain soft beige background. The YOUNG MAN stands in the centre holding a red apple in his left hand and an identical red apple in his right hand, arms stretched out, looking from one to the other. Camera: medium shot, symmetrical."),
    ("what makes you choose", ["BOY"], "Close-up of the YOUNG MAN's face, one eyebrow raised and the other lowered, lips pressed, deeply puzzled, looking straight at the camera. Plain beige background. Camera: close-up."),
    ("one over the other?", ["BOY"], "The YOUNG MAN's two hands hover over two identical closed wooden doors in a plain beige corridor, fingers almost touching both handles. Camera: medium shot from behind him."),
    ("Pure reason cannot decide", [], "A glowing white human brain made of clean geometric lines sits on a pedestal in a dark room, with tiny gears spinning inside it, a small red error-like warning glow pulsing (no text). Camera: medium close-up."),
    ("between identical options,", [], "A brass balance scale holding two identical glowing white cubes, the beam perfectly level, frozen, on a dark background. Camera: medium shot, symmetrical."),
    ("so either the choice is made", ["BOY"], "The YOUNG MAN stands at a fork in a dusty village road that splits into two identical paths, both lined with identical trees. Camera: wide from behind him."),
    ("by something other than reason,", ["BOY"], "The YOUNG MAN's chest glows with a warm orange light from his heart area, pulling him gently toward the left path, his eyes closed. Camera: medium shot, magical warm glow."),
    ("or the options", [], "The two identical paths seen up close; a magnifying glass hovers over one of them. Camera: medium, symmetrical."),
    ("were never truly equal", [], "Through the magnifying glass, one path reveals a tiny difference: a small yellow flower growing by the roadside that the other path doesn't have. Camera: close-up through the lens."),
    ("to begin with.", ["BOY"], "The YOUNG MAN kneels and looks at the tiny yellow flower, a small surprised smile, eyebrows raised. Camera: medium close-up, warm light."),
    # --- real life
    ("It shows up in real life:", ["BOY"], f"{ROOM} The YOUNG MAN sits on the edge of the bed holding his phone, looking tired and thoughtful. Camera: medium-wide."),
    ("choosing between two jobs", ["BOY"], f"{ROOM} The YOUNG MAN holds two identical white envelopes with blank letters, one in each hand, staring at them. Camera: medium shot."),
    ("that seem equally good,", [], "Split screen with a thin vertical line: two identical modern glass office buildings with identical blue skies and identical trees in front. Camera: wide, symmetrical."),
    ("two apartments,", ["BOY"], "The YOUNG MAN stands on a street between two identical old Indian apartment buildings with identical balconies, blue doors and potted plants, a 'to let' board with no text on each. Camera: wide, symmetrical."),
    ("two people", ["GIRL_A", "GIRL_B"], "Split screen with a thin vertical line: on the left GIRL ONE smiling under a tree in a park, on the right GIRL TWO smiling at a café table, both in matching soft golden light. Camera: two matching medium shots."),
    ("you have feelings for.", ["BOY"], f"{ROOM} The YOUNG MAN lies on his bed staring at the ceiling fan, holding his phone on his chest, two small pink hearts floating above him on each side. Camera: top-down."),
    ("The more rationally", ["BOY"], f"{ROOM} The YOUNG MAN sits at the study table drawing a long two-column chart in a notebook with blank lines and tick marks, very focused. Camera: over-the-shoulder."),
    ("you approach an identical choice,", ["BOY"], f"{ROOM} The table is now covered with sticky notes, crumpled papers and two identical columns; the YOUNG MAN holds his head with both hands, eyes wide. Camera: medium shot."),
    ("the more paralyzed you become.", ["BOY"], f"{ROOM} The YOUNG MAN sits frozen in his chair, turned grey and stiff like a stone statue, while the ceiling fan spins and the clock moves; only his eyes still look worried. Camera: medium-wide, faded colours."),
    # --- free will
    ("Philosophers use this paradox", ["PHILOSOPHER"], f"{STUDY} The PHILOSOPHER writes with a quill on parchment, a small sketch of a donkey between two haystacks on the page. Camera: medium shot, warm candlelight."),
    ("to argue about free will.", ["PHILOSOPHER"], f"{STUDY} The PHILOSOPHER and two other robed scholars argue around the desk, one pointing a finger up, one shaking his head, candle flames flickering. Camera: medium-wide."),
    ("If a perfectly rational agent", [], "A sleek white humanoid robot with a smooth round head and two simple dot eyes stands in an empty white room, perfectly still. Camera: medium shot, cold clean light."),
    ("cannot choose between equal options", [], "The white robot stands between two identical glowing blue buttons on two pedestals, its hands hovering over both, a small spinning loading circle above its head. Camera: wide, symmetrical."),
    ("without some external nudge,", [], "A giant soft cartoon hand reaches in from the edge of the frame and gently pokes the robot's shoulder with one finger, tipping it toward the left button. Camera: medium-wide."),
    ("what exactly is making the choice", ["BOY"], "Cutaway view of the YOUNG MAN's head in profile, inside it a dim control room with an empty pilot chair and a glowing lever. Camera: side view, curious mood."),
    ("in humans?", [], "A busy Indian street crossing seen from above, many tiny people each choosing different directions, some at a tea stall, some crossing the road. Camera: top-down wide."),
    ("Is it reason?", ["BOY"], "The YOUNG MAN with a glowing blue brain-shaped light above his head, calm and logical, holding a pencil and a ruler. Plain dark blue background. Camera: medium close-up."),
    ("Is it desire?", ["BOY"], "The YOUNG MAN with a glowing warm red-orange heart light in his chest, eyes closed with a soft smile, reaching for a plate of hot jalebis. Plain dark red background. Camera: medium close-up."),
    ("Is it something beneath both", ["BOY"], "The YOUNG MAN stands on calm water at night, his reflection below the surface is a dark shadowy version of him with glowing eyes, looking up. Camera: wide, eerie and dreamy."),
    ("that we never fully control?", ["BOY"], "The YOUNG MAN seen as a small wooden puppet-like figure, faint glowing strings rising from his wrists up into dark clouds where no hand is visible, he looks up questioningly. Camera: low angle, mysterious ending."),
]

if __name__ == "__main__":
    dest = HERE / "donkey-prompts.md"
    dest.write_text(render(TITLE, (HERE / "script.txt").read_text(encoding="utf-8"), SCENES, CHARACTERS),
                    encoding="utf-8")
    print(f"Wrote {len(SCENES)} prompts to {dest}")
