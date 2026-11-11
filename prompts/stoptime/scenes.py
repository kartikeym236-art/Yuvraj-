"""'What if you could stop time?' script -> one-click scene prompts (0.5-2 s each).

Usage:  python prompts/stoptime/scenes.py
"""
import sys
from pathlib import Path

HERE = Path(__file__).parent
sys.path.insert(0, str(HERE.parent))
from build_prompts import render  # noqa: E402

TITLE = "What If You Could Stop Time: Scene Prompts"

CHARACTERS = {
    "YOU": (
        "YOU (main character): Indian man in his mid 20s, slim, big messy curly black hair, dot eyes, "
        "thick dark eyebrows, peach skin with pink blush. Wears a muted teal-green full-sleeve button shirt "
        "with sleeves rolled to the elbows, untucked, dark charcoal trousers, off-white sneakers. Always "
        "carries an old silver pocket watch (the time-stop device) on a thin chain."
    ),
    "HER": (
        "HER: Indian woman in her mid 20s, long wavy black hair in a single loose braid over her shoulder, "
        "a few loose strands, dot eyes, warm expressive eyebrows, pink blush, small pearl stud earrings. "
        "Wears a deep maroon cotton kurta with small pink floral prints and a cream dupatta."
    ),
    "BOSS": (
        "THE INSULTER: chubby Indian office man in his 40s, balding with a comb-over, thick moustache, dot "
        "eyes, smug eyebrows, tight light-blue shirt, red tie, ID card on a lanyard."
    ),
}

FROZEN = ("FROZEN-TIME LOOK: everything except YOU is perfectly still, as if paused mid-motion: dust, "
          "water drops and leaves hang in the air, the whole frozen world is desaturated with a cool "
          "blue-grey tint, while YOU stays in full warm colour with a faint soft glow.")
STREET = ("Busy Indian city street in daytime: a zebra crossing, a big red city bus, auto-rickshaws, "
          "scooters, a tea stall, street vendors, pigeons, electric wires overhead.")
BEDROOM = ("Small Indian bedroom in the early morning: single bed with a checked blanket, a ringing round "
           "metal alarm clock on a stool, curtains with soft light, posters with no text.")
OFFICE = ("Indian open-plan office: rows of desks with computers, swivel chairs, a water cooler, tube "
          "lights, glass cabin walls.")
EXAM = ("Big college exam hall: rows of wooden desks, students with answer sheets, a ceiling fan, a "
        "wall clock, an invigilator walking between rows.")
CAFE = ("Cosy small café at evening: wooden table for two, warm fairy lights, two cups of coffee, a "
        "window with the city outside.")
HOME = ("Warm Indian living room of a married couple: a sofa with cushions, framed wedding photo with "
        "no text, potted money plant, soft lamp light.")

SCENES = [
    # --- the premise
    ("What if you could stop time?", ["YOU"], "Close-up of YOU holding up the old silver pocket watch, thumb resting on its crown, looking at the camera with a curious half smile. Dark background with faint floating clock gears. Camera: medium close-up."),
    ("Everything freezes,", [], f"{STREET} {FROZEN} A pigeon hangs mid-flight, a splash of tea stops mid-pour at the tea stall, people stand frozen mid-step. Camera: wide."),
    ("except you.", ["YOU"], f"{STREET} {FROZEN} YOU stand in the middle of the frozen crowd, looking around amazed, the only moving person. Camera: medium-wide."),
    ("You pull her back", ["YOU", "HER"], f"{STREET} {FROZEN} HER is frozen mid-step on the road, looking at her phone, with the big red bus frozen just a metre away; YOU gently hold her arm and pull her back. Camera: medium shot from the side."),
    ("to the curb", ["YOU", "HER"], f"{STREET} {FROZEN} YOU carefully place HER, still frozen in her walking pose, safely on the footpath beside a lamp post. Camera: medium shot."),
    ("and press play.", ["YOU"], "Extreme close-up of YOU's thumb pressing the crown of the silver pocket watch, a small ripple of warm light spreading out. Camera: macro close-up."),
    ("She thinks it was luck.", ["HER"], f"{STREET} Colour is back, the bus roars past behind her; HER clutches her chest with wide surprised eyes and a relieved shaky smile. Camera: medium close-up."),
    # --- small pauses
    ("Alarm: pause.", ["YOU"], f"{BEDROOM} {FROZEN} The alarm clock's little hammer is frozen mid-ring; YOU reach out sleepily from under the blanket with the pocket watch in hand. Camera: close-up on the clock and hand."),
    ("10 more hours", ["YOU"], f"{BEDROOM} {FROZEN} YOU snuggle back under the blanket with a blissful smile, the frozen alarm clock beside the bed. Camera: medium shot, top-down."),
    ("of sleep.", ["YOU"], f"{BEDROOM} {FROZEN} YOU sleep deeply hugging a pillow, little drool, the window's frozen sunlight never moving. Camera: medium close-up."),
    ("Someone insults you: pause.", ["YOU", "BOSS"], f"{OFFICE} {FROZEN} THE INSULTER is frozen mid-rant pointing a finger at YOU, spit droplets hanging in the air; YOU calmly press the pocket watch. Camera: medium shot."),
    ("You take 3 days", ["YOU"], f"{OFFICE} {FROZEN} YOU sit cross-legged on top of the desk beside the frozen insulter, surrounded by crumpled papers, empty chai cups and an instant noodle cup, writing notes, unshaven. Camera: medium-wide."),
    ("to answer.", ["YOU"], f"{OFFICE} {FROZEN} YOU stand in front of a whiteboard full of drawn arrows and diagrams (no text), rehearsing the perfect comeback with a finger raised. Camera: medium shot."),
    ("He thinks you're a genius.", ["YOU", "BOSS"], f"{OFFICE} Normal colour: THE INSULTER's jaw drops, eyes wide, sweat drop; YOU stand with arms crossed and a cool smirk; coworkers peek over their screens impressed. Camera: medium shot."),
    ("Your exam starts", ["YOU"], f"{EXAM} YOU sit at a desk staring at a blank answer sheet in panic, sweat drops, the invigilator handing out papers. Camera: medium shot."),
    ("in 5 minutes: pause.", ["YOU"], f"{EXAM} {FROZEN} The wall clock's second hand is frozen; YOU press the pocket watch under the desk. Camera: close-up on the watch with the wall clock behind."),
    ("You study for a month.", ["YOU"], f"{EXAM} {FROZEN} YOU sit on the floor of the frozen exam hall surrounded by towers of textbooks, highlighters and coffee cups, reading intensely, a small beard grown. Camera: wide."),
    # --- around the world
    ("On your lunch break,", ["YOU"], f"{OFFICE} YOU sit at your desk opening a steel tiffin box, a hot coffee mug with steam beside it. Camera: medium shot."),
    ("you pause", ["YOU"], f"{OFFICE} {FROZEN} The coffee steam freezes into a still curl in the air; YOU stand up with the pocket watch in hand, smiling. Camera: medium shot."),
    ("and walk around the world.", ["YOU"], "YOU walk away along a curving road over a small stylised round planet, a backpack on, the frozen city behind him, stars in a soft sky. Camera: wide, storybook feel."),
    ("Across the ocean,", ["YOU"], f"{FROZEN} YOU walk on the surface of the frozen blue ocean, a big wave stopped mid-crash beside him like glass, a seagull hanging in the air. Camera: wide."),
    ("on frozen waves.", ["YOU"], f"{FROZEN} YOU climb over the curl of a giant frozen wave like a crystal hill, spray droplets hanging around him like diamonds. Camera: low angle, magical."),
    ("Through Paris, Tokyo,", ["YOU"], f"{FROZEN} Split image: left half YOU walking past the Eiffel Tower with frozen pigeons, right half YOU in a frozen Tokyo crossing with neon signs (no readable text) and people mid-step. Camera: two matching medium-wide shots."),
    ("the Pyramids.", ["YOU"], f"{FROZEN} YOU sit on a block at the top of a great Pyramid of Giza, a camel and sand frozen mid-swirl below, eating a sandwich. Camera: wide."),
    ("For 3 years.", ["YOU"], f"{FROZEN} YOU, now with long shaggy curly hair and a long beard, worn-out shoes and a sun-faded shirt, walk along an endless frozen desert road. Camera: wide, epic loneliness."),
    ("When you come back,", ["YOU"], f"{OFFICE} {FROZEN} YOU, still with long hair and beard and a worn backpack, sit back down at the same frozen office desk. Camera: medium shot."),
    ("your coffee is still hot.", ["YOU"], f"{OFFICE} Normal colour returns: close-up of the coffee mug still steaming; YOU (shaved and neat again) take a sip, eyes knowing. Camera: close-up."),
    # --- pausing everything
    ("In your paused world,", ["YOU"], f"{FROZEN} YOU lie on his back in the middle of a frozen busy highway, cars stopped around him, staring calmly up at frozen clouds. Camera: top-down."),
    ("nothing can touch you.", ["YOU"], f"{FROZEN} Raindrops hang still all around YOU like a curtain of glass beads, not one touching him; he walks through them dry. Camera: medium shot."),
    ("Nothing can rush you.", ["YOU"], f"{STREET} {FROZEN} YOU stroll slowly across a frozen traffic crossing sipping chai, cars and honking rickshaws stopped all around. Camera: medium-wide."),
    ("So you start pausing", ["YOU"], "Close-up of YOU's hand pressing the pocket watch crown again and again, the crown worn shiny from use, small motion lines. Camera: macro close-up."),
    ("before everything.", ["YOU"], "Grid-like collage of four small frozen moments (a doorbell, a phone screen, a menu at a restaurant, a doctor's form), each with YOU's same thinking face. Camera: four equal panels, no text."),
    ("Every email,", ["YOU"], f"{OFFICE} {FROZEN} YOU stare at a laptop with a blank email layout, chin on fist, a pile of 20 empty coffee cups beside him. Camera: medium close-up."),
    ("every call,", ["YOU"], f"{FROZEN} YOU hold a ringing phone frozen mid-vibration, staring at it thoughtfully, sitting on his bed. Camera: medium close-up."),
    ("every \"How are you?\"", ["YOU"], f"{OFFICE} {FROZEN} A coworker frozen mid-wave with a friendly smile; YOU stand in front of her with a notebook, pondering the answer deeply. Camera: medium shot."),
    # --- the girl
    ("The girl from the bus:", ["HER"], "HER smiling shyly, tucking a loose strand of hair behind her ear, at a bus stop with a red bus in the background. Camera: medium close-up, warm light."),
    ("on your first date,", ["YOU", "HER"], f"{CAFE} YOU and HER sit across from each other, both a little nervous and smiling. Camera: medium shot, side view."),
    ("you pause before every answer.", ["YOU", "HER"], f"{CAFE} {FROZEN} HER is frozen mid-question with a curious smile; YOU walk around the table thinking, hand on chin, a notebook in his other hand. Camera: medium-wide."),
    ("She's never met", ["HER"], f"{CAFE} HER laughs softly, eyes sparkling, resting her chin on her hand, leaning in. Camera: close-up."),
    ("a better listener.", ["YOU", "HER"], f"{CAFE} YOU listen with a gentle, attentive smile while HER talks animatedly, hands moving. Camera: over HER shoulder."),
    ("You marry her.", ["YOU", "HER"], "Indian wedding: YOU in a cream sherwani and HER in a red bridal lehenga with gold jewellery, garlands of marigolds, walking around the sacred fire under a decorated mandap, both smiling. Camera: medium-wide, warm festive light."),
    ("She asks if you want kids.", ["YOU", "HER"], f"{HOME} HER sits on the sofa holding a tiny knitted baby sock, looking at YOU with hopeful eyes. Camera: medium shot."),
    ("You think about it", ["YOU", "HER"], f"{HOME} {FROZEN} HER is frozen holding the sock; YOU sit on the floor in front of her deep in thought, surrounded by parenting books. Camera: medium-wide."),
    ("for 3 months.", ["YOU"], f"{HOME} {FROZEN} YOU, with a grown beard, stare at a wall covered with sticky notes and drawings of baby clothes and schools, a calendar with days crossed out (no numbers). Camera: medium shot."),
    ("For her,", ["HER"], f"{HOME} Normal colour: close-up of HER, eyebrows raised in gentle anticipation, waiting. Camera: close-up."),
    ("you answered in a second.", ["YOU", "HER"], f"{HOME} YOU (neat again) smile softly and nod; HER lights up with joy and hugs him. Camera: medium shot."),
    # --- the cost
    ("Your body doesn't age;", ["YOU"], "YOU look into a bathroom mirror; his face is still young and smooth. Camera: over-the-shoulder into the mirror."),
    ("your mind does.", ["YOU"], "Same mirror: the reflection now shows a very old, tired version of YOU with white curly hair and deep wrinkles, while the real YOU stays young. Camera: over-the-shoulder, eerie."),
    ("5 years of life,", ["YOU", "HER"], f"{HOME} A small row of five warm framed photos on a shelf (no text) showing YOU and HER over the years. Camera: medium close-up."),
    ("200 years", ["YOU"], "An endless tall stack of calendars and clocks piled up to the sky behind YOU, who sits small at the bottom. Camera: low angle, surreal."),
    ("in your head.", ["YOU"], "Cutaway of YOU's head in profile: inside it, a giant library with endless shelves of memories and dusty clocks. Camera: side view, surreal."),
    ("Every time you press play,", ["YOU"], "Close-up of YOU's thumb hesitating over the pocket watch crown, trembling slightly. Camera: macro close-up."),
    ("the world feels louder.", ["YOU"], f"{STREET} Normal colour: honking cars, shouting vendors, ringing bells, sound waves drawn everywhere; YOU cover his ears, wincing. Camera: medium shot."),
    ("You don't belong in it anymore.", ["YOU"], "A crowded party where everyone laughs in bright colour; YOU stand alone in the corner holding a glass, drawn in faded grey, out of place. Camera: wide."),
    ("So your pauses last for days,", ["YOU"], f"{FROZEN} YOU sit alone on a rooftop of the frozen city, the sun stuck in the sky. Camera: wide."),
    ("then years,", ["YOU"], f"{FROZEN} The same rooftop: frozen leaves and dust all around, YOU lying on a mattress up there, a small tent and a pile of books beside him. Camera: wide."),
    ("then centuries.", ["YOU"], f"{FROZEN} Same rooftop: thick moss and ivy now grow over everything near YOU, his little camp overgrown, the frozen city unchanged below. Camera: wide, eerie and quiet."),
    ("In here, there's no danger,", ["YOU"], f"{FROZEN} YOU sit calmly on the bonnet of a car frozen mid-crash, glass shards hanging in the air around him. Camera: medium-wide."),
    ("no bills,", ["YOU"], f"{FROZEN} Bills and envelopes hang frozen in the air as they fall through the letterbox; YOU walk past them without a glance. Camera: medium shot."),
    ("no responsibilities.", ["YOU"], f"{FROZEN} YOU float lazily on a lilo in a frozen swimming pool whose water is still as glass. Camera: top-down."),
    ("Nobody expects anything from you.", ["YOU"], f"{FROZEN} YOU stand alone in the middle of a huge frozen stadium crowd, every face turned away, completely alone. Camera: wide, high angle."),
    # --- the ending
    ("One day,", ["YOU"], f"{FROZEN} YOU sit in the dust of the frozen living room, very still, holding the framed wedding photo. Camera: medium shot, dim light."),
    ("you can't remember her voice.", ["YOU", "HER"], f"{HOME} {FROZEN} HER frozen mid-laugh on the sofa; YOU stand close in front of her, struggling, eyes tearing, one hand on his own ear. Camera: medium close-up."),
    ("So you press play.", ["YOU"], "Extreme close-up of a dusty, rusted pocket watch crown slowly pressed by a trembling thumb, a ripple of warm colour spreading out. Camera: macro close-up."),
    ("She's laughing at something", ["HER"], f"{HOME} Full colour and warm light: HER laughs openly, head tilted back, eyes closed, joyful. Camera: medium close-up."),
    ("you said a thousand years ago,", ["YOU"], f"{HOME} YOU stand frozen in shock in front of her, eyes wide and distant, looking lost. Camera: medium shot from behind HER."),
    ("and you don't recognize the sound.", ["YOU"], "Extreme close-up of YOU's face, one tear rolling down his cheek, colourful sound waves passing around him as if foreign. Camera: close-up."),
    ("Too loud, too fast: pause.", ["YOU"], f"{HOME} {FROZEN} Everything snaps back to frozen blue-grey; YOU clutch the pocket watch to his chest, eyes squeezed shut. Camera: medium shot."),
    ("You have all the time", ["YOU"], f"{FROZEN} YOU sit alone in the middle of an endless field of frozen clocks of every size, all stopped. Camera: wide, surreal."),
    ("in the world,", ["YOU"], f"{FROZEN} View from far above: the whole frozen Earth, a tiny figure of YOU sitting on a rooftop. Camera: wide from space."),
    ("and you're terrified", ["YOU"], "Close-up of YOU's young face with old, terrified eyes, sweat drop, shaking hands holding the pocket watch. Camera: close-up, dark lighting."),
    ("of the next second.", [], "Extreme close-up of the pocket watch face, the second hand trembling a hair before the next tick, everything else dark. Camera: macro close-up, tense ending."),
]

if __name__ == "__main__":
    dest = HERE / "stoptime-prompts.md"
    dest.write_text(render(TITLE, (HERE / "script.txt").read_text(encoding="utf-8"), SCENES, CHARACTERS),
                    encoding="utf-8")
    print(f"Wrote {len(SCENES)} prompts to {dest}")
