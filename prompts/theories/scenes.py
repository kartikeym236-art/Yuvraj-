"""Crazy Conspiracy Theories -> scene prompts (Jensen reel style)."""
import json, re
from pathlib import Path
HERE = Path(__file__).parent; ROOT = HERE.parent.parent; NAME = "theories"
STYLE = ("Original fictional characters only, not real people. Flat 2D cartoon illustration, square 1:1, full-bleed. "
         "Thick clean black outlines, simple cel shading, moody palette of deep indigo, teal and slate with glowing "
         "warm orange and eerie cyan accents. Caricature characters with big heads, small black dot eyes, expressive "
         "eyebrows. Detailed illustrated backgrounds. NO text, letters, numbers or logos anywhere.")
C = {"M": "MAN: young man, messy dark hair, warm tan skin, grey hoodie.",
     "B": "BABY: newborn baby with a tiny tuft of hair."}
S = lambda line, desc, ch="": (line, desc, ch)
SCENES = [
 S("Let me share some", "HOOK, DRAMATIC: extreme close-up of MAN's eye snapping wide open in a pitch-dark bedroom, his pupil reflecting a glowing spiral portal, cyan light on his face.", "M"),
 S("crazy conspiracy", "A dark wall covered in photos connected by red strings, a lamp swinging.", ""),
 S("theories,", "A glowing brain floating in space surrounded by question marks made of light (no text).", ""),
 S("listen carefully.", "MAN leaning in, finger to his lips, shushing.", "M"),
 S("Whenever we are", "MAN asleep in bed at night, moonlight through the window.", "M"),
 S("in a dream,", "MAN floating through a surreal dream sky of clouds and floating islands.", "M"),
 S("our eyes open", "MAN's eyes snapping open in bed, sweating.", "M"),
 S("just before", "A huge clock with its hands about to hit midnight.", ""),
 S("we die.", "MAN falling off a cliff in a dream, arms flailing.", "M"),
 S("So, do we reach", "MAN walking toward a glowing doorway in darkness.", "M"),
 S("the dream world", "A vast glowing dream world of floating islands, waterfalls in the sky and two moons.", ""),
 S("after death?", "A ghostly translucent MAN rising out of his body above a bed.", "M"),
 S("Or, immediately", "A soul as a small glowing light zooming through a tunnel of stars.", ""),
 S("after dying,", "A heart monitor line going flat in a dim hospital room (no text).", ""),
 S("do we enter", "A glowing light diving down toward a hospital building at night.", ""),
 S("a baby's body,", "A glowing light entering a newborn BABY in a hospital crib.", "B"),
 S("and the baby cries", "BABY crying loudly, mouth wide open.", "B"),
 S("right after", "A nurse holding up a crying BABY in a delivery room.", "B"),
 S("being born", "Close-up of a tiny BABY hand gripping a finger.", "B"),
 S("because they have", "BABY with sad teary eyes, faint memories floating like bubbles above it.", "B"),
 S("lost everything", "Old memories as photographs crumbling into dust and blowing away.", ""),
 S("from their past:", "A faded old house and garden dissolving into light.", ""),
 S("all the people,", "Ghostly faces of friends and family fading into mist.", ""),
 S("all the relationships,", "An old couple holding hands, fading away like smoke.", ""),
 S("and everything?", "A whole life of objects, a bike, letters, a ring, swirling into a black hole.", ""),
 S("The next one:", "A glowing spiral clock in a dark void.", ""),
 S("who knows, maybe", "MAN shrugging, squinting suspiciously.", "M"),
 S("we are repeating", "Many copies of MAN walking in a circle, one behind another.", "M"),
 S("our entire life", "MAN's life from baby to old man in a row of figures.", "M"),
 S("over and over", "A film reel looping endlessly in a dark room.", ""),
 S("in the exact", "Two identical scenes side by side, MAN drinking coffee in both.", "M"),
 S("same way,", "A spinning infinity loop of light with tiny scenes from life inside it.", ""),
 S("and that is why", "MAN pausing mid-step on a street, frowning.", "M"),
 S("we sometimes", "MAN in a cafe, cup halfway to his lips, freezing.", "M"),
 S("experience the feeling", "MAN touching his temple, a ripple of light around his head.", "M"),
 S("that \"man,", "MAN's shocked face, eyes wide.", "M"),
 S("this has happened", "A transparent ghost copy of the same scene overlapping the real cafe.", "M"),
 S("to me before,\"", "MAN looking at a faded copy of himself doing the same thing.", "M"),
 S("like {déjà vu.|day zha voo}", "MAN's world glitching like a broken screen, repeated outlines.", "M"),
 S("And that isn't", "MAN shaking his head slowly.", "M"),
 S("just {déjà vu;|day zha voo}", "A cracked mirror showing many reflections of MAN.", "M"),
 S("it's a memory", "A glowing memory bubble floating out of MAN's head.", "M"),
 S("from your previous", "An old worn-out version of the same scene, like an old photograph.", ""),
 S("loop.", "A giant glowing loop of light wrapping around planet Earth.", ""),
 S("The next one:", "A dark room with a single lamp casting strong shadows.", ""),
 S("we are {three-dimensional|three dimensional}", "MAN standing as a solid 3D figure on a grid floor, glowing outlines.", "M"),
 S("human beings,", "A crowd of people walking in a city street at sunset.", ""),
 S("and our shadow", "MAN standing under a streetlight, long dark shadow on the ground.", "M"),
 S("is {2D.|two d}", "The flat black shadow on the ground, peeling up like paper.", ""),
 S("So, if the same", "MAN thinking, hand on chin, a lightbulb glowing above.", "M"),
 S("logic is applied,", "A diagram-like scene: a cube casting a square shadow (no text).", ""),
 S("does that mean", "MAN slowly looking up at the sky, worried.", "M"),
 S("we are the shadows", "MAN's body turning dark and flat like a shadow on a wall.", "M"),
 S("of some", "A huge glowing silhouette towering in the clouds.", ""),
 S("{four-dimensional|four dimensional}", "A strange glowing geometric being made of folding cubes and light.", ""),
 S("beings?", "Giant cosmic beings looking down at the tiny Earth.", ""),
 S("And the last one:", "A huge glowing human eye in darkness.", ""),
 S("our immune", "Tiny white blood cells drifting through a red bloodstream, cute cartoon soldiers.", ""),
 S("system doesn't even", "Cartoon white blood cell soldiers marching inside a body.", ""),
 S("know that our eyes", "A cartoon eyeball hiding behind a wall, sweating.", ""),
 S("exist,", "A huge blue eye inside a dark skull-shaped cave, glowing softly.", ""),
 S("and the day", "A white blood cell soldier peeking around a corner, noticing something.", ""),
 S("it finds out,", "White blood cell soldiers gasping, pointing at a giant eyeball.", ""),
 S("it will attack them.", "An army of white blood cell soldiers charging at a terrified eyeball.", ""),
 S("Other than that,", "MAN sitting on a couch, relaxed, smiling.", "M"),
 S("you can share", "MAN holding a phone, typing.", "M"),
 S("your favorite theory", "A glowing light bulb with swirling ideas around it.", ""),
 S("in the comments.", "Many glowing speech bubbles (empty, no text) floating up from phones.", ""),
]
if __name__ == "__main__":
    disp = lambda l: re.sub(r"\{([^|{}]+)\|[^{}]+\}", r"\1", l)
    (ROOT / f"projects/{NAME}/scenes.json").write_text(json.dumps(
        [{"line": l, "image": f"{k:03d}.png"} for k, (l, _, _) in enumerate(SCENES, 1)], indent=1))
    out = [f"# Crazy Conspiracy Theories: image prompts ({len(SCENES)})", "",
           "Generate each as a square (1:1) image. Save as `001.png`, `002.png`, ... in order.", ""]
    for k, (l, d, ch) in enumerate(SCENES, 1):
        p = STYLE + ("" if ch else " NO people unless described.") + "\n\nScene: " + d + ("\n" + " ".join(C[c] for c in ch) if ch else "")
        out += [f"## {k:03d}  ·  \"{disp(l)}\"", "", "```", p, "```", ""]
    (ROOT / f"projects/{NAME}/image_prompts.md").write_text("\n".join(out))
    print(len(SCENES))
