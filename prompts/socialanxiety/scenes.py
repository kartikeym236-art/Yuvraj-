"""'Social Anxiety Explained' script -> one-click scene prompts (0.5-2 s each).

Usage:  python prompts/socialanxiety/scenes.py
"""
import sys
from pathlib import Path

HERE = Path(__file__).parent
sys.path.insert(0, str(HERE.parent))
from build_prompts import render  # noqa: E402

TITLE = "Social Anxiety Explained: Scene Prompts"

CHARACTERS = {
    "YOU": (
        "YOU (main character): Indian man in his early 20s, slim, big messy curly black hair, dot eyes, "
        "thick dark eyebrows, peach skin with pink blush. Wears a muted teal-green full-sleeve button shirt "
        "with sleeves rolled to the elbows, untucked, dark charcoal trousers, off-white sneakers, a black "
        "analog wristwatch on his left wrist."
    ),
}

PARTY = ("Crowded Indian house party in a living room at evening: warm fairy lights, a sofa, a snack "
         "table with samosas and soft drinks, about fifteen young people in casual clothes standing in "
         "small groups chatting and laughing.")
ANXIOUS = ("ANXIETY LOOK: the colours around YOU turn cold and slightly dim, faint dark wobbly outlines "
           "shake around him, small nervous motion lines.")

SCENES = [
    ("Imagine entering a room", ["YOU"], f"{PARTY} YOU stand in the open doorway holding the door handle, the bright noisy party in front of him. Camera: wide from behind YOU's shoulder."),
    ("full of people.", [], f"{PARTY} Camera: wide shot of the whole crowded room, everyone busy talking, warm lively light."),
    ("Suddenly, you don't know", ["YOU"], f"{PARTY} {ANXIOUS} YOU freeze just inside the door, eyes wide, small sweat drop, clutching the strap of his sling bag. Camera: medium shot."),
    ("where to look,", ["YOU"], f"{PARTY} {ANXIOUS} YOU's eyes dart left and right (small motion lines), he stares at the floor, then at the ceiling fan. Camera: close-up."),
    ("what to say,", ["YOU"], f"{PARTY} {ANXIOUS} A friendly girl says hi to YOU; his mouth opens but nothing comes out, a tangled scribble cloud above his head. Camera: medium shot."),
    ("or how to act.", ["YOU"], f"{PARTY} {ANXIOUS} YOU stand stiffly by the wall, arms awkwardly half-raised, unsure whether to put his hands in his pockets, cross his arms or hold a drink. Camera: medium shot, slightly comedic."),
    ("You start thinking…", ["YOU"], f"{PARTY} {ANXIOUS} YOU stand in the corner with a paper cup, eyebrows knotted, many small grey thought clouds starting to rise from his head. Camera: medium close-up."),
    ("\"Are they judging me?", ["YOU"], f"{PARTY} {ANXIOUS} From YOU's point of view: three people across the room glance over and whisper to each other (actually about something else), their eyes drawn larger and sharper. Camera: POV over YOU's shoulder."),
    ("Do I look weird?", ["YOU"], f"{ANXIOUS} YOU check his reflection in a dark window, tugging his shirt and flattening his curly hair, worried face. Camera: over-the-shoulder into the reflection."),
    ("What if I say something stupid?\"", ["YOU"], f"{PARTY} {ANXIOUS} YOU imagine a scene above his head inside a thought cloud: him tripping and spilling a drink while everyone points and laughs. Camera: medium shot."),
    ("This is called", ["YOU"], "YOU sit hugging his knees in the middle of a plain dark space, a single soft spotlight on him. Camera: wide, symmetrical."),
    ("Social Anxiety.", ["YOU"], "YOU sit small on the floor while a huge soft dark shadow shaped like a storm cloud with many eyes looms over him. Camera: wide, low angle, not scary-horror, gentle and sad."),
    ("It's not simply being shy.", ["YOU"], "Split image with a thin vertical line: left, a shy boy blushing and smiling while waving a little; right, YOU trembling with sweat drops and a dark cloud over his head. Camera: two matching medium shots."),
    ("It's an intense fear", ["YOU"], f"{ANXIOUS} Extreme close-up of YOU's eyes, pupils tiny, eyebrows tilted up in fear, a reflection of a crowd in his eyes. Camera: extreme close-up."),
    ("of being judged,", ["YOU"], "YOU stand on a small wooden box while a row of stern judges with score cards (blank cards, no numbers) stare at him. Camera: wide, surreal."),
    ("embarrassed, or rejected", ["YOU"], "YOU stand alone outside a closed glass door while a group inside laughs together, his hand slipping off the door handle. Camera: medium shot, cool tones."),
    ("by others.", [], f"{PARTY} Many faces in the crowd drawn as blank silhouettes all slightly turned toward the camera. Camera: wide, uneasy mood."),
    ("Your brain starts treating", ["YOU"], "Cutaway of YOU's head in profile: inside is a small control room where a tiny alarmed version of him slams a big red alarm button, red warning lights flashing. Camera: side view."),
    ("ordinary social situations", ["YOU"], "YOU at a café counter with a smiling barista holding a coffee cup out to him, totally normal daily scene. Camera: medium shot, warm light."),
    ("like dangerous threats.", ["YOU"], f"{ANXIOUS} Same café, but in YOU's eyes the smiling barista towers over him like a giant, the coffee cup looking huge, red danger glow around. Camera: low angle, exaggerated."),
    ("Your heart races,", ["YOU"], "Close-up of YOU's chest with a glowing red heart beating fast inside, strong pulse lines around it. Camera: close-up."),
    ("your hands sweat,", ["YOU"], "Close-up of YOU's trembling hands, palms shiny with sweat, droplets falling, rubbing them on his trousers. Camera: close-up."),
    ("your mind goes blank,", ["YOU"], "Cutaway of YOU's head: inside, an empty white room with a single flickering bulb and a tumbleweed rolling past. Camera: side view, comedic-sad."),
    ("and sometimes,", ["YOU"], f"{PARTY} {ANXIOUS} YOU slowly backing toward the door, half hidden behind a potted plant. Camera: medium shot."),
    ("you just want to disappear.", ["YOU"], f"{PARTY} YOU's body becomes see-through and fades away from the feet up, while everyone keeps chatting, unaware. Camera: medium shot, soft magical fade."),
    ("Even after a conversation ends,", ["YOU"], "Night: YOU walk home alone on an empty street under orange streetlights, hands in pockets. Camera: wide."),
    ("you replay every little thing", ["YOU"], "YOU lie in bed at night staring at the ceiling; on the ceiling, scenes from the party play like a glowing film reel. Camera: top-down."),
    ("you said,", ["YOU"], "Close-up of YOU in bed hiding half his face under the blanket, cringing, eyes squeezed shut. Camera: close-up, dark blue night light."),
    ("searching for mistakes", ["YOU"], "YOU sit at a desk at night examining small glowing memory bubbles with a big magnifying glass, like a detective. Camera: medium shot, lamp light."),
    ("that nobody else even noticed.", [], f"{PARTY} The same party, everyone happily dancing and laughing, totally relaxed, nobody looking at the door. Camera: wide, warm and carefree."),
    ("And here's the cruelest part…", ["YOU"], "YOU sit alone on the floor in a dim room, back against the wall, a single beam of light from the window falling beside him. Camera: medium-wide, quiet sad mood."),
    ("You desperately want", ["YOU"], "YOU looking through a window at night into a warm-lit house where friends sit around a table laughing and eating together. Camera: from behind YOU, his reflection faint in the glass."),
    ("human connection,", ["YOU"], "YOU's hand reaching toward another person's hand across a gap, fingers almost touching, soft warm light between them. Camera: close-up."),
    ("but you're terrified", ["YOU"], f"{ANXIOUS} YOU pull his hand back and hug himself, trembling, eyes wide. Camera: medium close-up."),
    ("of being seen.", ["YOU"], "YOU caught in a bright spotlight in a dark room, shielding his eyes with his arm, shrinking. Camera: medium-wide, high contrast."),
    ("But remember,", ["YOU"], "The dark storm-cloud shadow above YOU starts to break apart, a ray of warm sunlight coming through. Camera: wide, hopeful."),
    ("people are usually too busy", [], f"{PARTY} Cutaway: each guest has a small thought cloud above their head showing their own worries (a pimple, a phone bill, a spilled drink on their own shirt). Camera: wide."),
    ("worrying about themselves", [], "Close-up of a young woman at the party anxiously checking her own hair in her phone camera, worried eyebrows. Camera: close-up."),
    ("to judge you", ["YOU"], f"{PARTY} YOU stand in the room and nobody is looking at him at all, everyone in their own little world. Camera: wide, high angle."),
    ("as much as you think.", ["YOU"], "YOU blink in surprise, the dark cloud above him now just a tiny harmless grey puff. Camera: medium close-up, light comedic relief."),
    ("You don't need", ["YOU"], "YOU stand in front of a long row of empty chairs with score cards lying face down on them. Camera: wide."),
    ("to impress everyone.", ["YOU"], "YOU drop a heavy bag labelled only with a drawn trophy icon to the floor, shoulders relaxing, a relieved exhale. Camera: medium shot."),
    ("You just need to stop", ["YOU"], "YOU sit at an exam desk in an empty hall, then calmly push the answer sheet away. Camera: medium shot."),
    ("treating every interaction", ["YOU"], "A friendly chat at a tea stall: YOU and a stranger talking, but YOU is shown wearing an exam-style name badge (blank) and sweating. Camera: medium shot."),
    ("like an examination.", ["YOU"], "Comedic image: an invigilator with a clipboard stands behind YOU as he orders tea, YOU stiff as a board. Camera: medium shot, playful."),
    ("Because you're not performing", ["YOU"], "YOU stand on a big theatre stage under harsh spotlights in front of a huge dark audience, frozen. Camera: wide from the back of the theatre."),
    ("on a stage.", ["YOU"], "The stage lights switch off and the theatre fades away like mist around YOU, revealing a sunny park. Camera: wide, transition feel."),
    ("You're simply living your life.", ["YOU"], "YOU walk through a sunny park with friends, laughing naturally with an ice cream in hand, warm golden light, kites in the sky. Camera: medium-wide, happy ending."),
]

if __name__ == "__main__":
    dest = HERE / "socialanxiety-prompts.md"
    dest.write_text(render(TITLE, (HERE / "script.txt").read_text(encoding="utf-8"), SCENES, CHARACTERS),
                    encoding="utf-8")
    print(f"Wrote {len(SCENES)} prompts to {dest}")
