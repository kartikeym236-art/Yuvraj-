"""Why billionaires pay no tax -> scene prompts (pencil-sketch stick-figure style from the manipulation reel)."""
import json, re
from pathlib import Path
HERE = Path(__file__).parent; ROOT = HERE.parent.parent; NAME = "billtax"
STYLE = ("Original fictional characters only, not real people. Flat 2D cartoon illustration, square 1:1, full-bleed. Clean bold black "
         "outlines, flat colours with soft simple shading. Characters have big round heads, warm orange-tan skin, small black dot "
         "eyes, simple curved eyebrows, rosy pink cheeks, tiny mouths. Detailed but clean illustrated backgrounds in soft muted "
         "colours (light greys, slate blue, sage, warm beige), calm natural lighting. NO text, letters, numbers or logos anywhere.")
C = {"P": "THE GUY: young man with big curly black hair, teal-grey button-up shirt with rolled sleeves, black jeans, white sneakers, wristwatch.",
     "R": "THE BILLIONAIRE: tall man with short dark hair, black t-shirt and dark jacket, confident smirk."}
S = lambda line, desc, ch="": (line, desc, ch)
SCENES = [
 S("Why can't we tax billionaires?", "THE GUY standing in his living room holding a tax form, puzzled frown.", "P"),
 S("Because technically,", "THE GUY raising one finger, explaining.", "P"),
 S("they don't have much money.", "THE BILLIONAIRE turning out his empty trouser pockets, shrugging.", "R"),
 S("Elon Musk isn't sitting on", "THE BILLIONAIRE sitting on an office chair in a plain office.", "R"),
 S("{$300 billion|three hundred billion dollars} in cash.", "A huge mountain of cash crossed out with a big red X.", ""),
 S("Instead, he owns shares", "THE BILLIONAIRE holding a stack of share certificates (no text).", "R"),
 S("in companies,", "Tall office buildings and a rocket and an electric car factory.", ""),
 S("and the government can't tax shares", "A tax officer looking at share certificates behind a glass case, unable to touch them.", ""),
 S("until he sells them.", "THE BILLIONAIRE's hand holding a share certificate away from the tax officer.", "R"),
 S("So when he wants to buy something,", "THE BILLIONAIRE looking at a shiny yacht.", "R"),
 S("he gets a loan from the bank,", "A banker handing THE BILLIONAIRE a big bag of money across a desk.", "R"),
 S("giving him millions to spend", "THE BILLIONAIRE walking out happily with bags of money.", "R"),
 S("and no tax to pay.", "THE GUY facepalming next to an empty tax collection box.", "P"),
]
if __name__ == "__main__":
    disp = lambda l: re.sub(r"\{([^|{}]+)\|[^{}]+\}", r"\1", l)
    (ROOT / f"projects/{NAME}/scenes.json").write_text(json.dumps(
        [{"line": l, "image": f"{k:03d}.png"} for k, (l, _, _) in enumerate(SCENES, 1)], indent=1))
    out = [f"# Why Billionaires Don't Pay Tax: image prompts ({len(SCENES)})", "",
           "Generate each as a square (1:1) image. Save as `001.png`, `002.png`, ... in order.", ""]
    for k, (l, d, ch) in enumerate(SCENES, 1):
        p = STYLE + ("" if ch else " NO people unless described.") + "\n\nScene: " + d + ("\n" + " ".join(C[c] for c in ch) if ch else "")
        out += [f"## {k:03d}  ·  \"{disp(l)}\"", "", "```", p, "```", ""]
    (ROOT / f"projects/{NAME}/image_prompts.md").write_text("\n".join(out))
    print(len(SCENES))
