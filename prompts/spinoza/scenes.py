"""'Spinoza's God' script -> one-click scene prompts.

Usage:  python prompts/spinoza/scenes.py
"""
import sys
from pathlib import Path

HERE = Path(__file__).parent
sys.path.insert(0, str(HERE.parent))
from build_prompts import render  # noqa: E402

TITLE = "Spinoza's God: Scene Prompts"

CHARACTERS = {
    "EINSTEIN": ("THE PHYSICIST (around 1930): man in his 50s with wild bushy white-grey hair sticking out in all "
                 "directions, a thick grey moustache, kind dot eyes, soft eyebrows. Wears a baggy grey wool sweater "
                 "over a white collared shirt and loose dark trousers."),
    "SPINOZA": ("THE PHILOSOPHER (1660s Netherlands): thin pale man in his 30s with long dark curly shoulder-length "
                "hair, a thin dark moustache, large thoughtful dot eyes, arched eyebrows. Wears a plain black coat "
                "with a simple white collar."),
    "YOU": ("YOU (main character): Indian man in his early 20s, slim, big messy curly black hair, dot eyes, thick "
            "dark eyebrows, peach skin with pink blush. Wears a muted teal-green full-sleeve button shirt with "
            "sleeves rolled to the elbows, untucked, dark charcoal trousers, off-white sneakers."),
}

SPACE = "Deep space full of stars, colourful nebulae and distant spiral galaxies."
STUDY = ("Candle-lit 1600s Dutch study: wooden desk with quill, ink pot and stacks of old books, a lens-grinding "
         "lathe with small glass lenses, a leaded window showing a canal at night.")

SCENES = [
    ("When Albert Einstein was asked", ["EINSTEIN"], "1930s: a group of reporters in hats and trench coats crowd around THE PHYSICIST on the steps of a university building, holding notepads and old flash cameras. Camera: medium-wide."),
    ("if he believed in God,", ["EINSTEIN"], "THE PHYSICIST pauses thoughtfully, eyes turned up toward soft rays of light breaking through the clouds above. Camera: medium close-up, low angle."),
    ("his answer shocked the world.", [], "1930s newsstands and street corners: people in hats reading newspapers with wide eyes and open mouths, papers flying. Camera: wide."),
    ("He simply said,", ["EINSTEIN"], "THE PHYSICIST answering the reporters calmly with a gentle smile, one hand raised mid-speech. Camera: medium shot."),
    ("\"I believe in Spinoza's God.\"", ["EINSTEIN"], "THE PHYSICIST holds up an old leather-bound book with a small engraved portrait of a 1600s philosopher with long curly hair on its cover (no text). Camera: medium close-up."),
    ("He wasn't talking about", ["EINSTEIN"], "THE PHYSICIST gently shaking his head with a kind smile, hand raised as if saying 'no'. Camera: close-up."),
    ("a man in the sky", [], "A classic image of an old man with a long white beard and white robes sitting on clouds high in the sky. Camera: low angle, soft heavenly light."),
    ("who answers prayers,", [], "People kneeling with folded hands looking upward while thin beams of light come down from the bearded man on the clouds. Camera: wide."),
    ("grants miracles,", [], "The bearded man on the clouds points a finger and a dry field suddenly blooms with flowers below. Camera: wide, magical."),
    ("or judges human behavior.", [], "The bearded man on the clouds holding a big golden balance scale, frowning down at tiny people below. Camera: low angle."),
    ("Baruch Spinoza", ["SPINOZA"], f"{STUDY} THE PHILOSOPHER sits at the desk, looking up from his book toward the camera. Camera: medium shot, warm candlelight."),
    ("was a legendary philosopher", ["SPINOZA"], f"{STUDY} THE PHILOSOPHER writes with a quill by candlelight, piles of handwritten pages around him. Camera: medium shot."),
    ("who proposed a truly mind-bending idea:", ["SPINOZA"], f"{STUDY} THE PHILOSOPHER leans back, eyes wide, as a swirling galaxy of light spins around his head. Camera: medium close-up, magical glow."),
    ("God is not a creator", [], f"{SPACE} A giant glowing hand shaping a small planet from outside the frame, slowly fading and turning transparent. Camera: wide."),
    ("who stands outside the universe.", [], "A tall glowing robed figure standing outside a giant transparent sphere that contains the whole universe, fading away like mist. Camera: wide, surreal."),
    ("God is the universe.", [], f"{SPACE} The entire cosmos glowing softly from within with a warm golden light, every star and galaxy shimmering. Camera: wide, awe-inspiring."),
    ("Every star,", [], f"{SPACE} Close-up of one bright blazing star with solar flares. Camera: close-up."),
    ("every black hole,", [], f"{SPACE} A black hole with a glowing orange swirling ring of light around it. Camera: medium."),
    ("every law of physics,", [], "An apple falling from a tree in mid-air beside glowing orbit lines of planets around the sun and a beam of light bending. Camera: medium, diagram-like (no text)."),
    ("and every single atom", [], "A single glowing atom with electrons spinning in orbits around a bright nucleus. Camera: close-up."),
    ("in your body", ["YOU"], "YOU look at his own hand, which glows with countless tiny sparkling atoms under the skin. Camera: close-up."),
    ("is a literal piece", ["YOU"], "YOU's glowing hand with a small piece of a starry galaxy visible inside it like a window. Camera: close-up."),
    ("of the divine.", ["YOU"], "YOU stand with arms slightly open, his whole body softly glowing with golden starlight. Camera: medium shot."),
    ("Under this incredible philosophy,", ["SPINOZA"], f"{STUDY} THE PHILOSOPHER's open book glowing with golden light rising from its pages. Camera: close-up."),
    ("there is absolutely no separation", [], "Two glowing halves of a sphere, one with a hand and one with a planet, drifting toward each other and touching. Camera: medium."),
    ("between the creator and the creation.", [], "A glowing hand and the planet it holds melting together into one single sphere of light. Camera: medium, centred."),
    ("The cosmos isn't just", [], f"{SPACE} Camera: wide panorama."),
    ("a cold, dead machine;", [], "A huge grey rusty clockwork machine of gears floating in empty dark space, cold and lifeless. Camera: wide, cold blue tones."),
    ("it is a single, infinite,", [], f"{SPACE} The gears dissolve into an endless glowing web of light stretching in every direction. Camera: wide."),
    ("interconnected living organism.", [], "The cosmic web of galaxies looking like glowing brain neurons, pulsing gently like something alive. Camera: wide."),
    ("When you study science,", ["YOU"], "YOU at a desk at night with a microscope, test tubes and a lamp, studying intently. Camera: medium shot."),
    ("math, or physics,", ["YOU"], "YOU at a big chalkboard covered in curves, circles and graph lines (no readable text), chalk in hand. Camera: medium shot."),
    ("you aren't just reading a textbook,", ["YOU"], "YOU reading a thick open textbook at the desk, page glowing faintly. Camera: medium close-up."),
    ("you are quite literally decoding", ["YOU"], "Light shapes lift off the pages of YOU's textbook and swirl into glowing patterns around him. Camera: medium shot, magical."),
    ("the very thoughts of God.", [], f"{SPACE} The glowing patterns spread into the cosmos, galaxies linked like thoughts in a giant mind. Camera: wide, awe."),
    ("This means the universe", [], f"{SPACE} The calm, vast universe with a gentle spiral galaxy in the centre. Camera: wide."),
    ("doesn't judge you", ["YOU"], f"{SPACE} YOU floating peacefully in space; an empty judge's bench and a gavel drift away into the distance, abandoned. Camera: medium-wide."),
    ("and it doesn't test you,", ["YOU"], f"{SPACE} An empty exam desk with a blank paper floating away from YOU, who doesn't even notice. Camera: medium-wide."),
    ("it simply exists.", [], f"{SPACE} A spiral galaxy slowly turning, calm and silent. Camera: wide, peaceful."),
    ("You are not just a tiny,", ["YOU"], "YOU stand very small on a lonely rock in the middle of vast space. Camera: very wide."),
    ("meaningless speck", [], f"{SPACE} The Earth seen as a tiny pale blue dot in a beam of sunlight. Camera: very wide."),
    ("trapped inside the void,", ["YOU"], "YOU sit hugging his knees in endless black emptiness, lonely. Camera: wide, dark."),
    ("you are the universe", ["YOU"], "YOU's silhouette filled with swirling galaxies and nebulae, standing in space. Camera: medium, magical."),
    ("temporarily waking up", ["YOU"], "Close-up of YOU's face, made of stars, slowly opening his eyes. Camera: close-up."),
    ("to experience itself.", ["YOU"], "YOU with galaxies inside him looking around in wonder at the stars, arms open. Camera: medium-wide."),
    ("So the next time", ["YOU"], "Another night: YOU climb the stairs onto an Indian rooftop with water tanks, a cup of chai in hand. Camera: medium shot."),
    ("you look up", ["YOU"], "YOU lie on the rooftop mat and tilt his head up toward the sky. Camera: medium shot from the side."),
    ("at the stars,", [], "A breathtaking night sky full of stars and the Milky Way over Indian rooftops and water tanks. Camera: wide, low angle."),
    ("remember you are just", ["YOU"], "Close-up of YOU's peaceful face with stars reflected in his eyes, a soft smile. Camera: close-up."),
    ("looking in a mirror.", ["YOU"], "The starry night sky forms the shape of YOU's face looking back down at him, like a reflection. Camera: wide, low angle, poetic ending."),
]

if __name__ == "__main__":
    dest = HERE / "spinoza-prompts.md"
    dest.write_text(render(TITLE, (HERE / "script.txt").read_text(encoding="utf-8"), SCENES, CHARACTERS),
                    encoding="utf-8")
    print(f"Wrote {len(SCENES)} prompts to {dest}")
