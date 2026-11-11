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

PHOTON_LAB = ("Dark quantum physics laboratory: a large optical table covered with small mirrors, lenses and "
              "metal mounts, thin bright green laser beams bouncing between them, a faint mist in the air, "
              "screens with abstract wave graphs.")

SCENES = [
    # --- Part 1: the hook
    ("To teleport,", ["YOU"], f"{EARTH_LAB} THE TRAVELLER stands in front of the open glowing booth, excited, holding a small travel bag. Camera: wide, symmetrical."),
    ("you would first", ["YOU"], f"{EARTH_LAB} THE TRAVELLER steps inside the booth, the glass door sliding shut behind him, a nervous smile. Camera: medium shot."),
    ("have to be destroyed.", ["YOU"], f"{EARTH_LAB} Inside the booth, THE TRAVELLER's body starts dissolving into glowing blue particles from his feet upward, his eyes wide in alarm. Camera: medium shot, dramatic blue light, not gory."),
    ("And whoever arrived", ["COPY"], f"{MARS_ROOM} Blue particles swirl inside the Mars booth, forming a human shape. Camera: medium shot through the glass."),
    ("would have your face,", ["COPY"], "Close-up of THE COPY's face as it finishes forming from blue particles, identical to the traveller, eyes still closed. Camera: close-up."),
    ("your voice,", ["COPY"], f"{MARS_ROOM} THE COPY opens his mouth to speak, small sound-wave arcs coming out, the same wave pattern glowing on a nearby screen. Camera: medium close-up."),
    ("and all your memories.", ["COPY"], "THE COPY with eyes closed, glowing translucent memory bubbles flowing into his head: a childhood birthday cake, his mother's hands, a cricket bat, a school bus. Camera: medium close-up, dreamy."),
    ("But it might not be you.", ["YOU", "COPY"], "THE TRAVELLER and THE COPY stand back to back in an empty dim white space, the traveller in normal colours and the copy with his faint blue outline, a thin crack running down the floor between them. Camera: medium-wide, uneasy mood."),
    ("And it wouldn't be", [], f"{EARTH_LAB} A technician in a white coat checks the control panel, all lights green, shrugging. Camera: medium shot."),
    ("a machine failure;", [], f"{EARTH_LAB} Close-up of the booth's machinery working perfectly: smooth glowing rings, clean cables, no sparks, no smoke. Camera: close-up."),
    ("it's imposed", [], "A giant old stone tablet engraved with glowing physics symbols and wave lines (no readable letters) stands in a dark cosmic space. Camera: low angle, monumental."),
    ("by the laws of physics.", [], "A swirling cosmic background with galaxies, an atom symbol and glowing light waves forming a huge circle, like the rules of the universe. Camera: wide, awe-inspiring."),
    # --- Part 2: real particle teleportation
    ("Teleportation already exists,", [], f"{PHOTON_LAB} Camera: wide shot, cool green and blue light."),
    ("but only with particles.", [], f"{PHOTON_LAB} Close-up of a single tiny glowing particle of light floating above the optical table like a small star. Camera: macro close-up."),
    ("In 2017,", [], "High-altitude observatory in the Tibetan mountains at night: a white domed telescope building on a snowy rocky ridge, a sky full of stars and the Milky Way. Camera: wide establishing."),
    ("it was achieved", [], "Scientists in warm jackets cheer and hug inside a small control room full of screens with abstract graphs, snowy mountains through the window. Camera: medium shot."),
    ("with particles of light", [], "Close-up of glowing particles of light travelling in a thin bright green line, each one like a tiny star. Camera: close-up, dark background."),
    ("between the ground and a satellite", [], "The mountain observatory shoots a thin bright green laser beam straight up into the night sky to a small satellite with solar panels. Camera: wide, low angle."),
    ("at a distance of up to", [], "View from space: Earth's curve below, the thin green beam stretching a very long way from a tiny point on the ground up to the satellite. Camera: wide, from orbit."),
    ("1,400 kilometers.", [], "The satellite with blue solar panels in orbit above the glowing Earth at night, the green beam touching it, the curve of the atmosphere glowing. Camera: medium-wide."),
    ("What travels is not the particle,", [], f"{PHOTON_LAB} A glowing particle on the left stays still, held inside a small transparent cube; it does NOT move. Camera: close-up, side view."),
    ("but its information.", [], f"{PHOTON_LAB} A ribbon of glowing patterns, waves and dots flows out of the particle on the left and streams across the table to the right. Camera: medium, flowing motion."),
    ("On the other side,", [], f"{PHOTON_LAB} The right side of the optical table: an empty transparent cube waiting at the end of the beam. Camera: medium close-up."),
    ("a second particle receives it", [], f"{PHOTON_LAB} The ribbon of information pours into a dim second particle inside the right cube, which begins to glow. Camera: close-up."),
    ("and becomes an exact replica", [], f"{PHOTON_LAB} The second particle now glows with exactly the same colour, shape and pattern as the first. Camera: close-up."),
    ("of the first.", [], f"{PHOTON_LAB} The two cubes side by side, two identical glowing particles, perfectly mirrored. Camera: medium, symmetrical."),
    ("But physics forbids", [], "A glowing particle inside a cube with a big red barrier ring around it, a red stop light pulsing above. Camera: medium close-up, warning mood."),
    ("copying a particle", [], "A cartoon office photocopier trying to copy a glowing particle, with sparks and red warning light, jammed. Camera: medium shot, playful."),
    ("while preserving the original.", [], f"{PHOTON_LAB} The original particle on the left trembles and starts fading, cracking with light. Camera: close-up."),
    ("Therefore, by reading it,", [], f"{PHOTON_LAB} A thin scanning laser line sweeps across the original particle. Camera: close-up, green scan light."),
    ("its original state is destroyed.", [], f"{PHOTON_LAB} The left cube is now empty, only a faint puff of fading light dust left inside it, while the right particle glows brightly. Camera: medium shot."),
    # --- Part 3: your body
    ("Now let's apply that rule", ["YOU"], f"{EARTH_LAB} THE TRAVELLER stands in front of the booth, looking down at his own hands thoughtfully. Camera: medium shot."),
    ("to your body,", ["YOU"], "THE TRAVELLER standing in an empty white space with a faint glowing scan grid wrapping around his whole body. Camera: full body, front view."),
    ("which contains about", ["YOU"], "Zoom into THE TRAVELLER's hand: the skin turns into a sea of tiny glowing dots. Camera: extreme close-up."),
    ("7,000 quadrillion atoms.", [], "An endless galaxy-like swirl of countless tiny glowing atoms with spinning orbits, filling the whole frame, shaped faintly like a human silhouette. Camera: wide, awe-inspiring."),
    ("A machine would have to", [], f"{EARTH_LAB} The booth's scanning rings light up bright white, a horizontal scan beam forming inside. Camera: medium, low angle."),
    ("read all of them,", ["YOU"], f"{EARTH_LAB} The scan beam moves down THE TRAVELLER's body inside the booth, rows of glowing data flowing out of him into the ceiling. Camera: medium shot."),
    ("and that scanning", ["YOU"], f"{EARTH_LAB} Close-up of THE TRAVELLER's face behind the glass, the scan line crossing his eyes, worried eyebrows. Camera: close-up."),
    ("would destroy you on Earth.", [], f"{EARTH_LAB} The booth is empty, a soft cloud of fading blue dust settling on the floor, the rings dimming. Camera: medium shot, quiet."),
    ("Your information would travel", [], "A stream of glowing blue data shoots up from the lab roof into space as a bright beam. Camera: wide, low angle."),
    ("to Mars", [], "View from space: the blue data beam crossing the darkness from the blue Earth toward the red planet Mars. Camera: wide."),
    ("at the speed of light.", [], "The data beam streaking through space with stars stretched into lines around it. Camera: dynamic, motion blur."),
    ("And there,", [], f"{MARS_ROOM} The beam hits the top of the Mars booth, which lights up. Camera: medium-wide."),
    ("an identical person", ["COPY"], f"{MARS_ROOM} A human silhouette of glowing blue light stands inside the booth. Camera: medium shot."),
    ("would be assembled,", ["COPY"], f"{MARS_ROOM} Robotic arms of light place layers of tiny glowing atoms, building THE COPY from the feet up; his legs and body are complete, his head still forming. Camera: medium shot."),
    ("atom by atom.", [], "Extreme close-up of tiny glowing atoms clicking together one by one like beads to form a fingertip. Camera: macro close-up."),
    ("They would open their eyes,", ["COPY"], "Close-up of THE COPY's face as his dot eyes open, mist around him. Camera: close-up."),
    ("remember stepping into the booth,", ["COPY"], "THE COPY with a faint memory bubble above his head showing him stepping into the Earth booth. Camera: medium close-up, dreamy."),
    ("and say,", ["COPY"], f"{MARS_ROOM} The glass door slides open; THE COPY steps out onto the floor, taking a breath. Camera: medium shot."),
    ("\"I've arrived.\"", ["COPY"], f"{MARS_ROOM} THE COPY spreads his arms wide with a big happy smile in front of the red desert window. Camera: medium-wide, low angle."),
    # --- Part 4: Parfit's variation
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
    ("are your memories", ["YOU"], "THE TRAVELLER sits on the lab floor flipping through an old family photo album with blank-faced sketch photos, smiling softly, warm golden light around him. Camera: medium close-up, nostalgic."),
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
