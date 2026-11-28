"""Why you don't hate Walter White -> scene prompts (Interstellar-reel style: simple cartoon characters on cinematic painted backgrounds)."""
import json, re
from pathlib import Path
HERE = Path(__file__).parent; ROOT = HERE.parent.parent; NAME = "walter"
STYLE = ("Original fictional characters only, not real people. Square 1:1, full-bleed. Simple 2D cartoon characters with large round "
         "pale beige heads, small solid black dot eyes, short simple eyebrows, tiny mouth, no nose detail, clean thick dark outlines and flat "
         "muted colours, placed in a semi-realistic, highly detailed cinematic painted background with moody desaturated film lighting, "
         "soft haze and film grain; muted earthy palette with warm desert ochre, dusty teal and deep shadow. NO text, letters, numbers or logos anywhere.")
C = {"W": "THE TEACHER: middle-aged man, bald head, rectangular glasses, short brown goatee, beige shirt, khaki trousers, tired eyes.",
     "H": "THE TEACHER (dark side): same bald man with glasses and goatee, black pork-pie hat, black jacket, cold stare.",
     "J": "THE PARTNER: young man, short buzzed hair under a grey beanie, baggy yellow hoodie.",
     "S": "THE WIFE: woman with long wavy light-brown hair, simple blouse, worried face.",
     "K": "THE SON: teenage boy with dark hair, glasses, polo shirt, forearm crutches.",
     "V": "THE VIEWER: young man in a hoodie seen from behind, watching a glowing TV on a couch."}
S = lambda line, desc, ch="": (line, desc, ch)
SCENES = [
 S("You should hate", "HOOK, DRAMATIC: THE TEACHER (dark side) in a gas mask pushed up, standing in front of an exploding desert RV fireball at dusk, orange flames, intense stare.", "H"),
 S("a character", "THE TEACHER (dark side) close-up, half his face in deep shadow.", "H"),
 S("like Walter White,", "THE TEACHER in his beige shirt standing alone in the empty desert, an old RV behind him.", "W"),
 S("yet you don't.", "THE VIEWER on a couch at night, smiling at the glowing TV showing the desert.", "V"),
 S("But why", "THE VIEWER scratching his head, puzzled, TV glow on his face.", "V"),
 S("is that?", "Close-up of THE TEACHER's glasses reflecting a desert sunset.", "W"),
 S("At the start of the show,", "A quiet suburban house in a dry desert city at dawn.", ""),
 S("Walter's working", "THE TEACHER at a high-school chemistry blackboard, bored students.", "W"),
 S("two jobs,", "THE TEACHER scrubbing a car tyre at a car wash, humiliated.", "W"),
 S("things are poor", "A kitchen table with overdue bills and a cracked mug.", ""),
 S("at home,", "THE WIFE and THE SON at a modest dinner table, quiet.", "SK"),
 S("he just got diagnosed", "THE TEACHER sitting in a doctor's office, frozen, the doctor's mouth moving.", "W"),
 S("with cancer,", "A glowing lung X-ray on a lightbox in a dim room.", ""),
 S("and he's pretty much", "THE TEACHER sitting on the edge of his bed at night, staring at the floor.", "W"),
 S("going through life", "THE TEACHER walking slowly down a grey school corridor.", "W"),
 S("without purpose.", "THE TEACHER sitting alone by a backyard pool at night, staring at the water, empty-eyed.", "W"),
 S("You feel", "THE VIEWER hugging a cushion, sad eyes.", "V"),
 S("sympathy for him.", "THE TEACHER alone in a car in a parking lot, head on the steering wheel.", "W"),
 S("And with each", "A stack of heavy boxes labelled with icons of pills and bills piling on THE TEACHER's back (no text).", "W"),
 S("and every hardship", "THE TEACHER in the rain at a bus stop, soaked.", "W"),
 S("continuously stacking up,", "A tall tower of bills and medical papers swaying over a tiny THE TEACHER.", "W"),
 S("Walter realizes", "THE TEACHER's eyes narrowing behind his glasses, a spark of light in them.", "W"),
 S("he wants more", "THE TEACHER looking out at a huge glowing desert horizon.", "W"),
 S("out of life.", "THE TEACHER shaving his head in a bathroom mirror, determined.", "W"),
 S("He's tired", "THE TEACHER throwing his car-wash rag on the ground.", "W"),
 S("of living without meaning,", "THE TEACHER standing in his empty classroom, chairs on desks.", "W"),
 S("and deep down,", "THE VIEWER on the couch leaning forward, eyes wide.", "V"),
 S("you want the same thing.", "THE VIEWER and THE TEACHER mirrored side by side, same pose.", "VW"),
 S("Walter is", "THE TEACHER and THE PARTNER standing by an old RV in the desert.", "WJ"),
 S("the underdog,", "A tiny THE TEACHER facing a huge shadowy figure in a dark warehouse.", "W"),
 S("and so are you.", "THE VIEWER in a cramped office cubicle under harsh lights.", "V"),
 S("You want to see", "THE VIEWER gripping the couch, TV glow.", "V"),
 S("yourself win", "THE TEACHER (dark side) walking away from an explosion, not looking back.", "H"),
 S("against all odds,", "THE TEACHER standing in the desert surrounded by armed shadowy men.", "W"),
 S("and Walter", "THE TEACHER (dark side) putting on his black pork-pie hat.", "H"),
 S("is doing just that.", "THE TEACHER and THE PARTNER cooking in the RV, masks on, blue light.", "WJ"),
 S("You almost feel", "THE VIEWER smiling proudly, fist clenched.", "V"),
 S("proud of him,", "THE TEACHER (dark side) standing tall on a desert road, sunset behind.", "H"),
 S("as if he is", "THE VIEWER looking at a mirror that shows THE TEACHER.", "VW"),
 S("a projection of you.", "THE VIEWER's shadow on the wall taking the shape of THE TEACHER in his hat.", "V"),
 S("And because you see", "THE VIEWER's eyes reflected in the TV screen.", "V"),
 S("yourself in him,", "THE VIEWER and THE TEACHER as reflections in a puddle in the desert.", "VW"),
 S("it doesn't matter", "THE TEACHER (dark side) staring coldly at THE PARTNER, who looks hurt.", "HJ"),
 S("how bad he does,", "THE TEACHER (dark side) in a burning lab, flames behind.", "H"),
 S("you find an excuse", "THE VIEWER talking with his hands, defending, a little sweat drop.", "V"),
 S("or a way around it", "THE VIEWER looking away from the TV, nervous smile.", "V"),
 S("to justify him.", "THE TEACHER (dark side) in the desert at night, smiling faintly, stars above.", "H"),
]
if __name__ == "__main__":
    disp = lambda l: re.sub(r"\{([^|{}]+)\|[^{}]+\}", r"\1", l)
    (ROOT / f"projects/{NAME}/scenes.json").write_text(json.dumps(
        [{"line": l, "image": f"{k:03d}.png"} for k, (l, _, _) in enumerate(SCENES, 1)], indent=1))
    out = [f"# Why You Don't Hate Walter White: image prompts ({len(SCENES)})", "",
           "Generate each as a square (1:1) image. Save as `001.png`, `002.png`, ... in order.", ""]
    for k, (l, d, ch) in enumerate(SCENES, 1):
        p = STYLE + ("" if ch else " NO people unless described.") + "\n\nScene: " + d + ("\n" + " ".join(C[c] for c in ch) if ch else "")
        out += [f"## {k:03d}  ·  \"{disp(l)}\"", "", "```", p, "```", ""]
    (ROOT / f"projects/{NAME}/image_prompts.md").write_text("\n".join(out))
    print(len(SCENES))
