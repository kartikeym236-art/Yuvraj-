"""Who pushed Jensen out -> prompts (pencil-sketch stick figures, manipulation-reel style)."""
import json, re
from pathlib import Path
HERE = Path(__file__).parent; ROOT = HERE.parent.parent; NAME = "jensen2"
STYLE = ("Original fictional characters only, not real people. Hand-drawn pencil sketch illustration, square 1:1, full-bleed, no border. Simple stick figures: big round "
         "pale-yellow heads with a few messy hair strands, tiny dot eyes, expressive eyebrows, thin black single-line "
         "bodies, arms and legs. Soft muted colouring: warm beige, sand, sage green, dusty blue-grey, with light pencil "
         "hatching and shading. Simple scenery: offices, towns, rolling hills, dirt paths, or plain interiors. "
         "No text, letters or numbers anywhere.")
C = {"J": "THE CHIP BOSS: stick figure, round pale-yellow head with swept-back grey hair, black leather jacket.",
     "L": "THE LEADER: stick figure, round pale-yellow head with swooping blond hair, dark suit, very long red tie.",
     "R": "THE MINISTER: stick figure, round pale-yellow head with short dark hair, navy suit, stern face.",
     "A": "THE AI CEO: slim stick figure, round pale-yellow head with short messy brown hair, grey sweater.",
     "W": "THE WOMAN: stick figure, round pale-yellow head with long black hair, grey business jacket."}
S = lambda line, desc, ch="": (line, desc, ch)
SCENES = [
 S("In a country like America,", "A small town street with a flag pole (plain flag, no text) under a soft sky.", ""),
 S("where the president", "THE LEADER standing at a podium.", "L"),
 S("was Epstein's best friend,", "THE LEADER shaking hands with a shadowy stick figure at a party, glasses raised.", "L"),
 S("Jensen Huang wouldn't have resigned", "THE CHIP BOSS walking out of an office building carrying a cardboard box.", "J"),
 S("over just a corporate affair.", "A small broken heart drawn on an office desk, shrugging hands next to it.", ""),
 S("These two individuals", "Two shadowy stick figures silhouetted in a doorway.", ""),
 S("are entirely behind his resignation.", "Two shadowy hands pushing THE CHIP BOSS out of a door.", "J"),
 S("Look, Jensen Huang wanted", "THE CHIP BOSS looking hopefully at a map.", "J"),
 S("America to sell chips to China.", "A small boat carrying computer chips crossing the sea toward a far shore.", ""),
 S("His reasoning was that", "THE CHIP BOSS pointing at a chalkboard with simple arrows.", "J"),
 S("if China is no longer dependent on America,", "A rope between two shores snapping in the middle.", ""),
 S("sooner or later they will simply", "An hourglass with sand running out.", ""),
 S("manufacture their own chips.", "Stick figure workers on the far shore building a small chip factory.", ""),
 S("What's more, by investing heavily", "Bags of coins being poured into a lab.", ""),
 S("in research and development,", "Stick figure scientists in lab coats studying a glowing chip under a microscope.", ""),
 S("they might even build better GPUs.", "A shiny new chip on a podium glowing brighter than an older one.", ""),
 S("He was hovering around Trump", "THE CHIP BOSS standing close behind THE LEADER in a hallway.", "JL"),
 S("and lobbying for this exact policy change,", "THE CHIP BOSS whispering into THE LEADER's ear, holding a folder.", "JL"),
 S("but {US|u s} Secretary of State Marco Rubio", "THE MINISTER standing behind a desk with arms crossed.", "R"),
 S("likely didn't take kindly to that.", "THE MINISTER frowning, eyes narrowed at THE CHIP BOSS across the room.", "RJ"),
 S("That's probably why a woman", "THE WOMAN standing alone on a path, confused.", "W"),
 S("was abruptly labeled a spy", "A big stamp coming down on a paper with a picture of THE WOMAN (no text).", "W"),
 S("without any proof.", "An empty evidence folder lying open on a table.", ""),
 S("Even the {CIA's|c i a's} own report stated,", "A plain report folder on a dark desk under a lamp.", ""),
 S("\"There is no conclusive proof of a spy,\"", "A magnifying glass over the report showing nothing.", ""),
 S("yet someone powerful", "A shadowy hand with a gold ring reaching toward the report.", ""),
 S("had that report altered.", "An eraser and pencil changing lines on the report.", ""),
 S("Only two people in America", "Two shadowy stick figures at the top of a tall staircase.", ""),
 S("actually possess the power to alter a {CIA|c i a} report.", "Two golden keys hanging on a wall above a locked filing cabinet.", ""),
 S("On top of that,", "THE CHIP BOSS stacking one more block on a tower.", "J"),
 S("Jensen Huang strongly supported {open-weight|open weight} models,", "THE CHIP BOSS holding open a glowing box with a little robot inside.", "J"),
 S("{AI|a i} models that anyone can run", "Many stick figures each holding a small glowing robot.", ""),
 S("on their own servers", "A stick figure next to a small server rack at home.", ""),
 S("customized to their own parameters.", "A stick figure turning dials on the small robot.", ""),
 S("If {open-weight|open weight} models gain widespread popularity,", "A crowd cheering and holding up small glowing robots.", ""),
 S("companies like Anthropic and OpenAI,", "Two tall office towers on a hill.", ""),
 S("which are already running at a loss,", "Coins falling out of a hole in a piggy bank in front of the towers.", ""),
 S("will be forced to lower their prices", "A price tag being cut with scissors.", ""),
 S("further due to competition.", "Two runners racing side by side on a track.", ""),
 S("That is why Sam Altman", "THE AI CEO standing in a glass office.", "A"),
 S("was also not very happy with Jensen Huang.", "THE AI CEO frowning with crossed arms, looking at THE CHIP BOSS.", "AJ"),
 S("Whether it came to selling chips to China", "The boat of chips crossing the sea again.", ""),
 S("or backing {open-weight|open weight} models,", "The glowing box with the little robot.", ""),
 S("Nvidia stood to sell more chips either way.", "THE CHIP BOSS standing by two roads that both lead to a pile of chips.", "J"),
 S("While Jensen Huang was simply", "THE CHIP BOSS walking alone on a dirt path.", "J"),
 S("looking out for his company,", "THE CHIP BOSS standing in front of his company building, hand on heart.", "J"),
 S("he had solid arguments", "THE CHIP BOSS holding a thick folder of papers.", "J"),
 S("backing these demands.", "THE CHIP BOSS presenting a chart on an easel.", "J"),
 S("In the process, however,", "Dark clouds rolling in over the path.", ""),
 S("he likely became enemy number one", "THE CHIP BOSS standing alone in a target circle drawn on the ground.", "J"),
 S("to the most powerful figures", "Shadowy figures at a long table in a dim room.", ""),
 S("in the {US|u s} government and corporate elite.", "A government dome and tall office towers side by side at dusk.", ""),
 S("That is why, in just a single week,", "A calendar with seven squares crossed out.", ""),
 S("allegation after allegation", "Papers flying at THE CHIP BOSS like a storm.", "J"),
 S("was leveled against him", "THE CHIP BOSS shielding his face from flying papers.", "J"),
 S("until he was pushed out", "THE CHIP BOSS outside a closing glass door, box in hand.", "J"),
 S("of the company he spent {33|thirty three} years", "Faded photos on a wall showing THE CHIP BOSS young and old.", "J"),
 S("building with his own hands.", "THE CHIP BOSS's hands placing the last brick on a tall building, then walking away at sunset.", "J"),
]
if __name__ == "__main__":
    disp = lambda l: re.sub(r"\{([^|{}]+)\|[^{}]+\}", r"\1", l)
    (ROOT / f"projects/{NAME}/scenes.json").write_text(json.dumps(
        [{"line": l, "image": f"{k:03d}.png"} for k, (l, _, _) in enumerate(SCENES, 1)], indent=1))
    out = [f"# Who Really Pushed Jensen Huang Out: image prompts ({len(SCENES)})", "",
           "Generate each as a square (1:1) image. Save as `001.png`, `002.png`, ... in order.", ""]
    for k, (l, d, ch) in enumerate(SCENES, 1):
        p = STYLE + ("" if ch else " NO people unless described.") + "\n\nScene: " + d + ("\n" + " ".join(C[c] for c in ch) if ch else "")
        out += [f"## {k:03d}  ·  \"{disp(l)}\"", "", "```", p, "```", ""]
    (ROOT / f"projects/{NAME}/image_prompts.md").write_text("\n".join(out))
    print(len(SCENES))
