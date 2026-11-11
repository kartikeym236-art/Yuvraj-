"""'If someone finds reasons to touch you' script -> one-click scene prompts.

Script taken from the reel's on-screen captions and checked against its audio.
Usage:  python prompts/touch/scenes.py
"""
import sys
from pathlib import Path

HERE = Path(__file__).parent
sys.path.insert(0, str(HERE.parent))
from build_prompts import render  # noqa: E402

TITLE = "If Someone Finds Reasons To Touch You: Scene Prompts"

CHARACTERS = {
    "YOU": (
        "YOU (main character): Indian man in his early 20s, slim, big messy curly black hair, dot eyes, "
        "thick dark eyebrows, peach skin with pink blush. Wears a muted teal-green full-sleeve button shirt "
        "with sleeves rolled to the elbows, untucked, dark charcoal trousers, off-white sneakers."
    ),
    "HER": (
        "HER: Indian woman in her early 20s, long wavy black hair in a single loose braid over her shoulder, "
        "dot eyes, warm expressive eyebrows, pink blush, small pearl stud earrings. Wears a deep maroon "
        "cotton kurta with small pink floral prints and a cream dupatta."
    ),
}

BENCH = ("A college campus at golden hour: the two sit side by side on a stone bench under a gulmohar "
         "tree, a tea cup on the bench, students walking in the soft background.")

SCENES = [
    ("If someone finds reasons", ["HER", "YOU"], f"{BENCH} HER laughs at something and glances at YOU's arm, her hand hovering, looking for a moment. Camera: medium shot."),
    ("to touch you", ["HER", "YOU"], f"{BENCH} HER lightly places her hand on YOU's forearm. Camera: close-up on her hand on his arm."),
    ("during normal conversation,", ["HER", "YOU"], f"{BENCH} The two chat casually, YOU talking with his hands, HER smiling and listening. Camera: medium shot, side view."),
    ("this is what it means.", ["YOU"], f"{BENCH} YOU glance down at the spot on his arm where she touched, curious, one eyebrow raised. Camera: medium close-up."),
    ("Most people either overthink it", ["YOU"], "YOU lie awake in bed at night staring at the ceiling, surrounded by dozens of tangled thought clouds. Camera: top-down."),
    ("into a full romantic conclusion", ["YOU", "HER"], "Inside a big pink thought cloud above YOU: an imagined dreamy wedding with HER, rose petals and hearts. Camera: medium, dreamy pink light."),
    ("or dismiss it completely", ["YOU"], f"{BENCH} YOU wave a hand dismissively with a bored face, looking away. Camera: medium shot."),
    ("as nothing.", ["YOU"], "YOU shrug with an empty grey thought bubble above his head. Camera: medium close-up."),
    ("Both readings miss", ["YOU"], "Two thought bubbles above YOU, one pink with hearts and one empty grey, both popping like soap bubbles. Camera: medium close-up."),
    ("what psychology actually says", [], "An open psychology textbook on a desk with a glowing drawing of a human brain rising from its pages. Camera: close-up."),
    ("about what's happening,", ["HER", "YOU"], f"{BENCH} A soft warm glow circles the spot where HER's hand rests on YOU's arm, as if highlighting it. Camera: close-up."),
    ("because casual touches", ["HER", "YOU"], "A light tap on the shoulder, a brush of the hand passing a cup of tea: two small everyday touches between HER and YOU. Camera: medium shot, warm light."),
    ("can mean many different things.", [], "Four small panels of different touches: a friendly high-five, a comforting hand on the back, a playful nudge, a gentle hand on the arm. Camera: four equal panels."),
    ("Instead, use this simple psychological move", ["YOU"], "YOU sit up straight with a calm confident face, a small glowing light bulb above his head. Camera: medium close-up."),
    ("to know what it means.", ["YOU"], f"{BENCH} YOU look calmly and kindly at HER, reading her face. Camera: over HER shoulder toward YOU."),
    ("Intentional touch", ["HER"], "Close-up of HER's hand reaching out deliberately and slowly toward an arm. Camera: close-up, soft focus background."),
    ("during conversation", ["HER", "YOU"], f"{BENCH} HER talks animatedly, her hand resting on YOU's arm as she speaks. Camera: medium shot."),
    ("is almost never accidental.", ["HER", "YOU"], f"{BENCH} Close-up of HER's hand placed gently and on purpose on YOU's arm, fingers relaxed, clearly not a bump. Camera: close-up."),
    ("Touch is one of", ["HER", "YOU"], "Close-up of HER's fingertips touching YOU's hand, a soft warm glow where they meet. Camera: extreme close-up."),
    ("the most primal signals", [], "A mother gently holding her newborn baby's tiny hand, warm soft light. Camera: close-up, tender."),
    ("of comfort and connection.", [], "Two old friends hugging warmly at a railway station, eyes closed, smiling. Camera: medium shot, warm light."),
    ("And when someone initiates it", ["HER", "YOU"], f"{BENCH} HER is the one who reaches out first, her hand moving toward YOU's arm while he is mid-sentence. Camera: medium shot."),
    ("without a clear social reason,", ["HER", "YOU"], f"{BENCH} HER's hand rests on YOU's arm while nothing else is happening: no spilled tea, no crowd, no need for help. Camera: medium-wide."),
    ("their nervous system", ["HER"], "HER with soft glowing golden nerve lines running down her arm from her shoulder to her fingertips. Camera: medium close-up, magical glow."),
    ("is telling you something", ["HER", "YOU"], "A gentle golden glow travels from HER's fingertips into YOU's arm where she touches him. Camera: close-up."),
    ("their mouth hasn't said yet.", ["HER"], "Close-up of HER's face, lips softly closed in a shy smile, eyes looking away, cheeks blushing. Camera: close-up."),
    ("So, first, do nothing dramatic.", ["YOU"], f"{BENCH} YOU stay calmly seated, not jumping up or freezing, a relaxed neutral face. Camera: medium shot."),
    ("Just notice it.", ["YOU"], "YOU's eyes glance down briefly at HER's hand on his arm. Camera: close-up on his eyes."),
    ("Stay relaxed.", ["YOU"], f"{BENCH} YOU's shoulders loose, breathing out slowly, a calm face. Camera: medium shot."),
    ("Don't pull away,", ["HER", "YOU"], f"{BENCH} YOU's arm stays exactly where it is under HER's hand. Camera: close-up on the arm and hand."),
    ("but don't chase it either.", ["YOU"], f"{BENCH} YOU keep his own hand resting calmly on his knee, not grabbing hers. Camera: close-up."),
    ("Hold eye contact", ["HER", "YOU"], f"{BENCH} YOU and HER look into each other's eyes. Camera: medium two-shot, side view."),
    ("for one second longer", ["HER", "YOU"], f"{BENCH} The gaze held, with a small round wristwatch on YOU's wrist in the foreground ticking. Camera: medium close-up."),
    ("than normal after the touch.", ["HER", "YOU"], f"{BENCH} HER's hand has just lifted from YOU's arm while they still hold eye contact. Camera: medium shot."),
    ("Let a small, natural smile form", ["YOU"], "Close-up of YOU's face forming a small, natural, warm smile. Camera: close-up."),
    ("and continue the conversation,", ["HER", "YOU"], f"{BENCH} The two keep chatting easily, YOU gesturing, HER laughing. Camera: medium shot."),
    ("because that one response", ["YOU"], "Close-up of YOU's calm smile and steady eyes. Camera: close-up."),
    ("tells them their signal", ["HER"], "Close-up of HER's eyes lighting up, a tiny sparkle in them. Camera: close-up."),
    ("was received", ["HER"], f"{BENCH} HER smiles to herself and looks down shyly, cheeks pink. Camera: medium close-up."),
    ("without you saying a word.", ["HER", "YOU"], f"{BENCH} Both smile at each other in comfortable silence, the sun setting behind the tree. Camera: wide, warm golden ending."),
]

if __name__ == "__main__":
    dest = HERE / "touch-prompts.md"
    dest.write_text(render(TITLE, (HERE / "script.txt").read_text(encoding="utf-8"), SCENES, CHARACTERS),
                    encoding="utf-8")
    print(f"Wrote {len(SCENES)} prompts to {dest}")
