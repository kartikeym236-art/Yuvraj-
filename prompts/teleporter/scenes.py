"""Teleporter paradox (Parfit's variation) -> one-click scene prompts (0.5-2 s each).

Usage:  python prompts/teleporter/scenes.py
"""
import sys
from pathlib import Path

HERE = Path(__file__).parent
sys.path.insert(0, str(HERE.parent))
from build_prompts import render  # noqa: E402

TITLE = "The Teleporter Copy: Scene Prompts"

CHARACTERS = {
    "YOU": (
        "THE TRAVELLER (on Earth): Indian man in his early 20s, slim, big messy curly black hair, dot eyes, "
        "thick dark eyebrows, peach skin with pink blush. Wears a muted teal-green full-sleeve button shirt "
        "with sleeves rolled to the elbows, untucked, dark charcoal trousers, off-white sneakers, a black "
        "analog wristwatch on his left wrist."
    ),
    "COPY": (
        "THE COPY (on Mars): looks EXACTLY identical to the traveller: Indian man in his early 20s, big messy "
        "curly black hair, dot eyes, thick dark eyebrows, muted teal-green shirt with rolled sleeves, dark "
        "charcoal trousers, off-white sneakers, black analog wristwatch. The only difference is a faint "
        "soft blue glow outlining his body, as if freshly printed."
    ),
    "PARFIT": (
        "THE PHILOSOPHER (1984): thin, tall British man in his early 40s, long wavy brown hair falling to his "
        "collar, high forehead, dot eyes, thoughtful thick eyebrows, clean-shaven. Wears a white shirt, a "
        "loosened dark tie and a brown tweed jacket with elbow patches."
    ),
}

EARTH_LAB = ("Futuristic white laboratory on Earth: a tall glass cylinder teleporter booth with glowing blue "
             "rings at the top and bottom, a control panel with blank glowing buttons, cables on the floor, a "
             "big window showing a green Earth landscape and blue sky.")
MARS_ROOM = ("Habitat dome on Mars: an identical tall glass cylinder teleporter booth with glowing blue rings, "
             "curved white walls, a big round window showing a red rocky desert, dusty orange sky and a small "
             "distant sun.")
STUDY = ("Old 1980s Oxford college study: dark wooden bookshelves overflowing with books, a desk with a "
         "typewriter, stacks of paper, a green desk lamp, a leaded glass window with grey English sky.")

SCENES = [
    ("To determine whether", ["YOU"], f"{EARTH_LAB} THE TRAVELLER stands in front of the closed booth, hand on his chin, eyebrows knotted in doubt. Camera: medium shot, eye level."),
    ("that person is actually you,", ["COPY"], f"{MARS_ROOM} THE COPY steps out of the booth, blinking, looking at his own hands. Camera: medium shot through the glass."),
    ("philosopher Derek Parfit", ["PARFIT"], f"{STUDY} THE PHILOSOPHER sits at the desk, chin resting on his hand, staring thoughtfully out of the window. Camera: medium shot, warm lamp light."),
    ("proposed a variation", ["PARFIT"], f"{STUDY} THE PHILOSOPHER types quickly on the typewriter, a small sketch of two glass booths pinned above the desk, a light bulb glow of an idea. Camera: over-the-shoulder."),
    ("in 1984.", [], f"{STUDY} Close-up of the typewriter with a page half typed (blank lines only), a cup of tea, a 1980s rotary phone and a pile of books. Camera: close-up, nostalgic grainy tones."),
    ("The machine makes the copy,", [], f"{EARTH_LAB} The booth glows bright blue; a beam of light shoots upward from it into the sky toward a small red dot of Mars. Camera: wide, low angle, dramatic."),
    ("but this time,", ["YOU"], f"{EARTH_LAB} The light fades; the glass door slides open with a hiss of mist. Camera: medium shot, mysterious."),
    ("it doesn't destroy you.", ["YOU"], f"{EARTH_LAB} THE TRAVELLER is still standing inside the booth, completely unharmed, patting his chest and arms in surprise, eyebrows raised. Camera: medium shot."),
    ("You remain on Earth", ["YOU"], f"{EARTH_LAB} THE TRAVELLER steps out of the booth onto the white floor, looking around, alone in the lab. Camera: wide."),
    ("and watch on a screen", ["YOU"], f"{EARTH_LAB} THE TRAVELLER stands in front of a large wall screen, the blue light of the screen on his face. Camera: from behind him, the screen glowing."),
    ("as someone with your face", ["YOU", "COPY"], f"{EARTH_LAB} Close-up of the screen: it shows THE COPY's face, identical to his, looking back at him. THE TRAVELLER's reflection is faintly visible in the screen glass. Camera: close-up."),
    ("starts talking on Mars.", ["COPY"], f"{MARS_ROOM} THE COPY talks cheerfully into a camera, waving one hand, smiling, red desert behind him. Camera: medium shot, like a video call."),
    ("You are still here,", ["YOU"], f"{EARTH_LAB} THE TRAVELLER pinches his own arm, confused, eyebrows tilted, small sweat drop. Camera: medium close-up."),
    ("so that person", ["COPY"], f"{MARS_ROOM} THE COPY stands at the round window, looking out at the red desert. Camera: medium shot from behind."),
    ("is someone else.", ["YOU", "COPY"], "Split screen with a thin vertical line: left, THE TRAVELLER on Earth with green hills behind him; right, THE COPY on Mars with red desert behind him; both in the same pose, looking at each other across the divide. Camera: two matching medium shots."),
    ("Yet they are", ["YOU"], f"{EARTH_LAB} THE TRAVELLER slowly raises his hand toward the screen, his face uneasy. Camera: medium shot from the side."),
    ("the exact same person", ["YOU", "COPY"], "Two identical young men, THE TRAVELLER and THE COPY, standing side by side in an empty white space, same pose, same expression, like a mirror image, only the copy's faint blue outline is different. Camera: medium-wide, perfectly symmetrical."),
    ("who arrives", ["COPY"], f"{MARS_ROOM} THE COPY materialises inside the booth in swirling blue particles, half formed, rings glowing. Camera: medium shot, magical sci-fi light."),
    ("when the machine", [], f"{EARTH_LAB} Close-up of a hand pressing a big red button on the control panel. Camera: close-up, tense."),
    ("does destroy you.", [], f"{EARTH_LAB} The Earth booth is empty, only a small pile of glowing blue dust drifting on the floor and a black wristwatch lying where someone stood. Camera: medium shot, quiet and eerie."),
    ("Parfit concluded", ["PARFIT"], f"{STUDY} THE PHILOSOPHER leans back in his chair, eyes closed, a calm peaceful smile, as if he has figured it out. Camera: medium shot."),
    ("that what matters", ["PARFIT"], f"{STUDY} THE PHILOSOPHER holds up one finger, looking straight at the camera, kind and serious. Camera: medium close-up."),
    ("are your memories", ["YOU"], "THE TRAVELLER with closed eyes, glowing translucent memory bubbles floating around his head: a childhood birthday cake, his mother's hands, a cricket bat, a school bus. Camera: medium close-up, dreamy warm light."),
    ("and your character,", ["YOU"], "THE TRAVELLER helping an old man carry vegetable bags on a street, laughing with friends at a tea stall, small warm glowing outline around him. Camera: medium shot, warm tones."),
    ("not remaining", ["YOU"], "THE TRAVELLER's body slowly breaking into floating blue pixels from the feet up while he stays calm. Plain dark background. Camera: medium-wide."),
    ("the exact same person.", ["COPY"], "The same blue pixels reassembling into THE COPY on the other side of the frame, identical, opening his eyes. Plain dark background. Camera: medium-wide."),
    ("Other philosophers consider it", [], "Three cartoon philosophers in different eras' clothes (a robed Greek man, a man in a powdered wig, a modern woman with glasses) stand around the empty Earth booth with stern frowns, arms crossed. Camera: medium-wide."),
    ("simply a way to die.", [], f"{EARTH_LAB} A single white lily lies on the floor of the empty booth, the blue rings switched off, cold grey light. Camera: medium shot, sad quiet mood."),
    ("And we could never test it,", [], "A scientist in a white coat stands in front of a blackboard covered in crossed-out diagrams of two booths, scratching her head in frustration. Camera: medium shot."),
    ("because the only person", ["COPY"], f"{MARS_ROOM} THE COPY sits alone on a bench, the only person in the frame. Camera: wide."),
    ("capable of answering", ["COPY"], f"{MARS_ROOM} A microphone on a stand is pushed toward THE COPY by an unseen hand; he looks at it. Camera: medium close-up."),
    ("is the one who arrives—", ["COPY"], f"{MARS_ROOM} THE COPY steps out of the booth into the dusty orange light, a door sliding open behind him. Camera: low angle."),
    ("and they will always say", ["COPY"], f"{MARS_ROOM} THE COPY smiles brightly at the camera with a relaxed, confident face. Camera: close-up."),
    ("it worked.", ["COPY"], f"{MARS_ROOM} THE COPY gives a big thumbs up and a wide grin, Mars desert behind him, and for a split second his eyes look slightly empty. Camera: medium close-up, eerie."),
    ("Send this to that friend", [], "Close-up of a hand holding a phone, thumb about to tap a share button (blank icons only), a cup of chai beside it. Camera: close-up."),
    ("who would step into the booth", ["YOU"], f"{EARTH_LAB} THE TRAVELLER walks toward the open glowing booth with a big carefree grin, hands in pockets. Camera: medium-wide from behind and side."),
    ("without a second thought.", ["YOU"], f"{EARTH_LAB} THE TRAVELLER jumps into the booth with both arms up, joyful, eyes closed, as the blue rings flare to life. Camera: medium shot, playful ending."),
]

if __name__ == "__main__":
    dest = HERE / "teleporter-prompts.md"
    dest.write_text(render(TITLE, (HERE / "script.txt").read_text(encoding="utf-8"), SCENES, CHARACTERS),
                    encoding="utf-8")
    print(f"Wrote {len(SCENES)} prompts to {dest}")
