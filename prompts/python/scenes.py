"""Python grooming story -> 16:9 prompts."""
import json
from pathlib import Path
ROOT = Path(__file__).resolve().parents[2]; NAME = "python"
STYLE = ("Square 1:1 flat 2D cartoon illustration, full-bleed. Clean, smooth black ink outlines of even medium thickness, flat colours "
         "with soft simple shading. Characters are simple stick-figure people: a large perfectly round SOLID WHITE head with no skin colour, "
         "two small black oval dot eyes, short simple eyebrows for emotion, a tiny mouth line, NO nose; thin black stick arms and legs, small "
         "white mitten hands; simple flat clothes on a small torso. Backgrounds are detailed, clean flat-colour cartoon environments (bedroom, "
         "clinic, office, park) with simple perspective; night scenes use a dusky blue-purple palette with warm yellow lamp glow. "
         "NO text, letters, numbers or logos anywhere.")
C = {"W": "THE WOMAN: stick-figure woman with a solid white round head, long dark-brown hair, light pink t-shirt and grey pyjama pants.",
     "S": "THE PYTHON: a very long (10 ft) cartoon python with cream and golden-brown patterned scales, simple friendly-looking eyes.",
     "V": "THE VET: stick-figure man with a solid white round head, short grey hair, round glasses, green scrubs."}
S = lambda l, d, c="": (l, d, c)
SCENES = [
 S("A woman let her pet python", "THE WOMAN gently lifting THE PYTHON in a cosy apartment living room at dusk.", "WS"),
 S("sleep beside her in bed every single night.", "A dark bedroom, THE WOMAN asleep, THE PYTHON coiled on the pillow beside her, moonlight through blinds.", "WS"),
 S("It was {10 ft|ten feet} long,", "THE PYTHON stretched across the full length of the bedroom floor, the woman small beside it.", "SW"),
 S("and she loved it like a child.", "THE WOMAN smiling, the python's head resting on her shoulder.", "WS"),
 S("Then, one week, it stopped eating.", "An untouched food dish inside a glass terrarium, THE PYTHON turned away.", "S"),
 S("She offered rabbits, chicken, its favorite mice;", "THE WOMAN holding feeding tongs with a mouse toward THE PYTHON in its terrarium.", "WS"),
 S("it turned away from all of them.", "THE PYTHON's head turning away from the food, THE WOMAN worried.", "SW"),
 S("But every night, it did something strange.", "The dark bedroom at night, a clock glowing 3 a.m. (no numbers), a slow shape moving under the blanket.", ""),
 S("It slid under her blanket", "Close-up of THE PYTHON's head sliding under the edge of a blanket.", "S"),
 S("and stretched its whole body out perfectly straight", "Top-down view of the bed: THE PYTHON lying perfectly straight under the blanket.", "S"),
 S("right next to hers, head at her head, tail at her feet.", "Top-down view: THE WOMAN asleep and THE PYTHON lying straight beside her, exactly matching her length, head by her head, tail by her feet.", "WS"),
 S("She thought it was sick, maybe lonely,", "THE WOMAN sitting up in bed in lamplight, stroking THE PYTHON with concern.", "WS"),
 S("so she held it closer.", "THE WOMAN hugging THE PYTHON in bed, eyes closed, tender.", "WS"),
 S("Night after night, it grew thinner", "THE PYTHON's body visibly thinner in its terrarium, ribs of scales showing.", "S"),
 S("and pressed tighter against her.", "THE PYTHON pressed tightly along THE WOMAN's side in the dark bed, her face peaceful, unaware.", "WS"),
 S("Finally, she took it to a vet", "THE WOMAN carrying THE PYTHON into a bright veterinary clinic.", "WS"),
 S("and told him everything: the fasting, the stretching, the cuddling.", "THE WOMAN talking and gesturing to THE VET across an exam table with THE PYTHON on it.", "WVS"),
 S("The vet went quiet.", "Close-up of THE VET's face, frozen, eyes wide behind his glasses.", "V"),
 S("Then he said, \"Your snake isn't sick,", "THE VET leaning toward THE WOMAN, serious.", "VW"),
 S("and it isn't cuddling you.", "THE WOMAN's smile fading.", "W"),
 S("It's emptying its stomach to make room,", "Close-up of THE PYTHON's lean, empty body coiled on the exam table under harsh light.", "S"),
 S("and every night it lies beside you to measure if you'll fit.\"", "Dark bedroom: THE PYTHON lying straight beside the sleeping woman, a faint glowing measuring line along both bodies.", "SW"),
 S("That's the scariest part.", "THE WOMAN alone on her bed, staring at the empty space beside her, cold blue light.", "W"),
 S("It never looked like an attack;", "THE PYTHON's head resting gently on the pillow, calm, harmless-looking.", "S"),
 S("it looked like love.", "Soft warm close-up of THE WOMAN's hand on the python's scales.", "WS"),
 S("Psychologists call this grooming.", "A therapist's quiet office with two chairs and a lamp, rain on the window.", ""),
 S("Before someone harms you, they get close,", "A silhouette of a man standing very close behind a woman in a dim hallway.", ""),
 S("closer than anyone.", "Two silhouettes almost touching, the woman's face uneasy.", ""),
 S("They make it feel special", "A woman smiling at a gift box handed to her by a shadowy hand.", ""),
 S("while they quietly measure how much you'll allow.", "A shadowy figure watching a woman from across a room, a faint tape measure shadow on the wall.", ""),
 S("The partner who cuts you off from friends because they love you.", "A woman at home holding her phone with friends' messages, a partner's hand gently taking the phone away.", ""),
 S("The boss who praises you right before he asks for more.", "A boss patting a tired employee's shoulder in an office at night, a tall stack of files beside her.", ""),
 S("The stranger online who always knows exactly what to say.", "A lonely girl in a dark bedroom lit by her phone, a chat glowing with heart reactions (no readable text).", ""),
 S("Real love doesn't need to measure you.", "Two people holding hands on a sunny bench in a park, relaxed and warm.", ""),
 S("So ask yourself:", "THE WOMAN looking straight at the viewer in dim light.", "W"),
 S("who's been lying a little too close?", "A dark bed with the blanket slowly lifting beside an empty pillow, cold moonlight.", ""),
]
if __name__ == "__main__":
    (ROOT/f"projects/{NAME}/scenes.json").write_text(json.dumps([{"line": l, "image": f"{k:03d}.png"} for k,(l,_,_) in enumerate(SCENES,1)], indent=1))
    import re
    disp = lambda l: re.sub(r"\{([^|{}]+)\|[^{}]+\}", r"\1", l)
    out = [f"# The Python Story: 1:1 image prompts ({len(SCENES)})", "", "Generate each as a square 1:1 image. Save as `001.png`, `002.png`, ... in order.", ""]
    for k,(l,d,c) in enumerate(SCENES,1):
        p = STYLE + ("" if c else " NO people unless described.") + "\n\nScene: " + d + ("\n" + " ".join(C[x] for x in c) if c else "")
        out += [f"## {k:03d}  ·  \"{disp(l)}\"", "", "```", p, "```", ""]
    (ROOT/f"projects/{NAME}/image_prompts.md").write_text("\n".join(out)); print(len(SCENES))
