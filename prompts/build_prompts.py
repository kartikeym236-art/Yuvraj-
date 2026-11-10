"""Builds a copy-paste prompt file: every prompt is complete on its own
(style + characters + scene + avoid), so each one is a single copy.

Usage:  python prompts/build_prompts.py
Edit STYLE / CHARACTERS / SCENES below for a new script, then re-run.
"""
from pathlib import Path

TITLE = "Nvidia x Megaspeed Story: Scene Prompts"

STYLE = (
    "STYLE: Hand-drawn 2D webcomic illustration, square 1:1 frame, looks like a still from an "
    "emotional animated short. Characters are drawn in a clean cartoon style: bold uniform black ink "
    "outlines (about 4px), large round head slightly wider than tall, flat peach-orange skin with a "
    "soft pink blush circle on the cheeks, tiny solid black oval dot eyes with no pupils or "
    "highlights, thick short curved eyebrows that carry all the emotion, small simple line mouth, "
    "almost no nose, small rounded hands with clear finger outlines, flat colours with only one soft "
    "shadow tone. Backgrounds are MORE detailed and semi-realistic than the characters: real "
    "locations painted with soft muted colours, light film grain / paper-noise texture over the "
    "whole image, gentle natural light, slightly desaturated palette (dusty blues, greys, beige, "
    "faded greens), mild depth of field so background figures are smaller and softer. Cinematic "
    "composition, quiet and dramatic storytelling mood."
)

AVOID = (
    "AVOID: any readable text, letters, numbers, captions, subtitles, brand logos, watermarks, "
    "signatures or speech bubbles (screens, signs, papers and newspapers show only blank blocks, "
    "lines and simple shapes); realistic or 3D human faces; photorealism; anime big eyes; "
    "Pixar/3D render look; extra fingers or deformed hands; glossy plastic skin; neon or "
    "oversaturated colours; borders or frames around the image."
)

CHARACTERS = {
    "JENSEN": (
        "TECH CEO: Taiwanese-American man in his early 60s, medium build, short thick silver-grey "
        "hair neatly swept back, dot eyes, thick grey-black eyebrows, warm peach skin. Signature "
        "outfit: black leather biker jacket with silver zips, plain black crew-neck t-shirt, black "
        "jeans, black shoes, a black smartwatch on the left wrist."
    ),
    "YOUNG_JENSEN": (
        "YOUNG FOUNDER: Taiwanese-American man around 30, slim, thick black hair with a side "
        "parting, large thin-rimmed rectangular glasses, dot eyes, eager face. Wears a light-blue "
        "short-sleeve polo shirt tucked into khaki trousers, brown belt."
    ),
    "ALICE": (
        "BUSINESSWOMAN: East Asian woman in her 40s, sharp confident face, straight glossy black "
        "hair cut to shoulder length with a clean side part, dot eyes, thin arched eyebrows, small "
        "gold hoop earrings. Wears a tailored cream-white blazer over a black silk top, slim black "
        "trousers, black heels, a slim gold watch, carries a black leather handbag."
    ),
    "COUNSEL": (
        "CORPORATE LAWYER: American man in his 50s, short neat brown hair greying at the sides, "
        "thin black-framed glasses, clean-shaven, dot eyes, serious eyebrows. Wears a navy-blue "
        "suit, white shirt and dark green tie."
    ),
    "OFFICIAL": (
        "US GOVERNMENT OFFICIAL: older American man in his 60s, white hair combed back, bushy white "
        "eyebrows, slight jowls, dot eyes. Wears a charcoal-grey suit, white shirt, red tie and a "
        "small US-flag lapel pin."
    ),
    "AGENTS": (
        "FIELD INVESTIGATORS (two): a tall American man in his 40s with a short black buzz cut and "
        "stubble, and an American woman in her 30s with a tight auburn ponytail. Both wear dark "
        "navy windbreaker jackets over plain shirts, lanyards with blank ID cards, carry flashlights "
        "or case files."
    ),
}

# (title, script line, characters used, scene description)
SCENES = [
    ("Hook: the fall", "An affair like this ruined not just Jensen, but all of America.",
     ["JENSEN"],
     "Dark stage lit by a single cold spotlight. TECH CEO stands in the centre, shoulders "
     "slumped, eyebrows tilted up in worry, small frown, one hand rubbing the back of his neck. "
     "Behind him a giant glowing green computer chip floats with a huge crack running through it, "
     "green light leaking from the crack. On the left a tall US flag on a pole droops and hangs "
     "limp. Thin smoke on the floor. Camera: medium-wide, low angle, dramatic."),
    ("1993: the founding", "In 1993, Jensen Huang co-founded Nvidia.",
     ["YOUNG_JENSEN"],
     "1990s American roadside diner, daytime. YOUNG FOUNDER sits in a red vinyl booth with two "
     "other young male engineers (one with curly brown hair and a beard in a checked flannel shirt, "
     "one bald with round glasses in a grey sweater). Coffee mugs, a plate of pancakes and paper "
     "napkins covered in pen sketches of chip diagrams are on the formica table. YOUNG FOUNDER "
     "leans forward excitedly, pointing at a napkin sketch, big smile. Window behind shows a "
     "parking lot with 1990s cars. Camera: medium shot, eye level, warm nostalgic light."),
    ("The CPU era", "Before that, the computer world was just playing around with CPUs,",
     [],
     "1990s office cubicle. A chubby office worker in a white shirt and loose tie leans back in "
     "his chair yawning with eyes shut, chin in hand, in front of a bulky beige CRT computer whose "
     "screen shows a slow blocky loading bar. A beige tower PC with its side open shows a small "
     "lonely processor chip. Floppy disks, a coffee mug and tangled cables on the desk, other "
     "beige cubicles behind. Camera: medium shot, slightly high angle, sleepy dull mood."),
    ("1999: the first GPU", "but when Nvidia introduced the world's first GPU in 1999, it created a massive stir in the tech industry.",
     ["YOUNG_JENSEN"],
     "Tech launch event stage in 1999. YOUNG FOUNDER stands on stage holding up a green "
     "graphics card high above his head with both hands like a trophy, big proud open-mouth smile. "
     "The card glows with green light. In the foreground, the backs of heads of a crowd of tech "
     "journalists and engineers, some with open mouths, holding up old digital cameras with "
     "white flash bursts. Big blank screen behind him with glowing green 3D wireframe shapes. "
     "Camera: from the audience, low angle, exciting energy."),
    ("The drama begins", "And this is where the real drama begins.",
     [],
     "A heavy dark-red theatre curtain is being pulled open from the middle, a bright spotlight "
     "beam cuts through dust in the air. Projected on the stage floor are two long shadows of a man "
     "and a woman standing far apart, facing each other. A glowing green chip rests on a small "
     "wooden stool in the centre of the stage. Camera: wide shot, symmetrical, mysterious mood."),
    ("2008: Chinese gaming company", "Back in 2008, a large Chinese gaming company called 7Road Holdings was established.",
     [],
     "Busy modern open-plan game studio office in China, daytime. Rows of young Chinese "
     "developers in hoodies and t-shirts work at desks with big monitors showing colourful "
     "fantasy game scenes (dragons, castles, warriors). Energy drink cans, plush toys, headphones on "
     "desks. Floor-to-ceiling windows behind show the Shanghai skyline with the Oriental Pearl "
     "Tower. One developer in front cheers with both arms raised. Camera: wide shot, eye level, "
     "lively mood."),
    ("Using Nvidia GPUs", "They also started using Nvidia's GPUs.",
     [],
     "Close-up on a desk in the game studio. A young Chinese developer's hands carefully slide a "
     "green-and-black graphics card into an open gaming PC tower; the card glows green. A stack of "
     "more boxed graphics cards (plain boxes, no logos) sits beside the PC. The developer's face is "
     "visible at the top edge, smiling happily. Camera: close-up, slight high angle, sharp detail "
     "on the card."),
    ("The quiet investor", "However, an investment in this firm was held by Shanghai Hexi Management.",
     [],
     "Dim wood-panelled corporate boardroom in Shanghai at evening. Across a long polished "
     "table, a hand in a dark suit sleeve slides a thick sealed brown document folder toward the "
     "game studio founder (young Chinese man in a hoodie), who looks at it nervously. Three "
     "people in dark suits sit in shadow at the far end, faces barely visible. Warm desk lamp "
     "light, city lights through the window. Camera: over-the-table, low angle, secretive mood."),
    ("Reveal: the executive director", "And who was its Executive Director? Alice Huang.",
     ["ALICE"],
     "High-floor glass corner office in Shanghai at golden dusk. BUSINESSWOMAN is turning around "
     "in a tall black leather executive chair to face the camera, legs crossed, one hand resting on "
     "the armrest, a subtle confident smile and one eyebrow slightly raised. Behind her, huge "
     "windows show the glowing Shanghai skyline. Sleek desk with a closed laptop and a cup of tea. "
     "Camera: medium shot, eye level, dramatic reveal lighting from the window."),
    ("Not on the radar", "In fact, back then, Alice was not even on the US government's radar.",
     [],
     "Dark US government monitoring room. A big round green radar screen glows in the centre with "
     "a sweeping line and NO dots on it. A bored American operator in a white shirt sits in front "
     "of it, head resting on his hand, half-asleep, a coffee cup and a donut box beside him. "
     "Rows of other dark monitors behind. Camera: medium shot from the side, green glow on his face."),
    ("AI superchips", "Gradually, Nvidia moved beyond just GPUs and started developing AI superchips.",
     ["JENSEN"],
     "Bright high-tech semiconductor clean room with white walls and yellow lighting. TECH CEO, "
     "wearing his leather jacket, stands in front of two engineers in full white bunny suits and "
     "masks who hold up a large square AI superchip glowing bright green. TECH CEO looks at it with "
     "wide proud eyes and a big smile, one fist clenched in excitement. Robotic arms and machines "
     "behind. Camera: medium shot, eye level."),
    ("Engine of the AI revolution", "Before long, Nvidia became the driving engine of the global AI revolution.",
     [],
     "Epic conceptual scene: a giant glowing green chip sits like a beating engine heart at the "
     "centre of a stylised Earth globe in space. Bright green energy lines shoot out from it across "
     "the planet to tiny cartoon data centers, humanoid robots, self-driving cars and city skylines. "
     "Stars and soft dark-blue space background. Camera: wide, centred, awe-inspiring."),
    ("Washington gets fidgety", "That's when the US government started getting fidgety.",
     ["OFFICIAL"],
     "Formal Washington D.C. office with dark wood panelling and a US flag in the corner; the "
     "Capitol dome is visible through the window. US GOVERNMENT OFFICIAL sits at a big desk, "
     "nervously biting his thumbnail, eyebrows pulled together, sweat drop on his forehead, his "
     "leg bouncing (small motion lines). On his desk a monitor shows a steep green line chart "
     "shooting upward. Two aides behind him whisper to each other anxiously. Camera: medium shot, "
     "eye level."),
    ("Permission required", "Initially, the US government informed Nvidia that selling its chips to any Chinese entity would require strict regulatory permission.",
     ["OFFICIAL", "JENSEN"],
     "Same Washington office. US GOVERNMENT OFFICIAL, stern-faced, slides a thick official "
     "document sealed with a red wax seal across the desk toward TECH CEO, tapping it firmly with "
     "one finger. TECH CEO sits opposite, one eyebrow raised, lips pressed, arms crossed over his "
     "leather jacket. Camera: over-the-shoulder from behind TECH CEO, official facing camera."),
    ("2022: the loophole", "To navigate around this, Nvidia found a loophole in 2022 and engineered two watered-down, export-grade chip models.",
     [],
     "Engineering lab workbench. An engineer in a lab coat with a sly grin holds up two small, dim, "
     "slightly greyish chips in one hand, while on the bench a large, brightly glowing green chip "
     "sits under a glass dome. A small watering can is tipped over beside the small chips as a "
     "visual joke for 'watered down'. Magnifying lamp, tools, circuit boards. Camera: medium "
     "close-up, eye level, playful sneaky mood."),
    ("Washington not pleased", "But the US government wasn't pleased with that either.",
     ["OFFICIAL"],
     "Washington office. US GOVERNMENT OFFICIAL stands behind his desk with arms tightly crossed, "
     "deep frown, eyebrows sharply angled down, shaking his head (small motion lines beside his "
     "head). On the desk in front of him lie the two small dim chips on a plain sheet of paper. "
     "US flag beside him. Camera: medium shot, slightly low angle, disapproving mood."),
    ("2023: blanket ban", "In 2023, they imposed a blanket ban on Nvidia, declaring that even these watered-down chips could no longer be sold to China.",
     [],
     "Busy cargo port at overcast day. A huge red-and-white striped boom barrier slams down in front "
     "of a truck loaded with wooden crates stamped with simple green chip symbols. A US customs "
     "officer in a dark uniform holds up a flat palm 'STOP' gesture, stern face. Stacked shipping "
     "containers and cranes behind, a cargo ship waiting at the dock. Camera: wide shot, low angle, "
     "dramatic."),
    ("The twist: rebranding", "Here is the twist: a few months earlier, in March, that same Chinese gaming company, 7Road Holdings, had rebranded itself as Megaspeed International,",
     [],
     "Office building entrance. A worker in overalls on a stepladder removes an old sign board "
     "showing only a game-controller icon, while a second worker lifts up a new sleek silver sign "
     "board showing only a glowing chip icon. Glass doors, potted plant, a puzzled security guard "
     "watching. Camera: medium-wide, eye level, sneaky 'disguise' mood."),
    ("Chip leasing business", "a business focused on procuring and leasing AI chips.",
     [],
     "Huge warehouse full of tall server racks with blinking green lights. Workers in orange "
     "safety vests drive forklifts moving wooden crates marked with simple green chip symbols, "
     "others scan boxes with handheld scanners. Bright industrial lights, long perspective. "
     "Camera: wide shot, deep perspective."),
    ("November: Singapore ownership", "By November, Megaspeed came under complete Singaporean ownership,",
     [],
     "Modern Singapore office at sunset; through the window the Marina Bay Sands hotel and skyline "
     "are visible. Two businessmen in suits shake hands firmly over a glass table with signed "
     "documents and a fountain pen. A small Singapore flag on a desk stand. Camera: medium shot, "
     "eye level, warm golden light."),
    ("4 days later: cloud partner", "and just four days later, it became an official Nvidia Cloud Partner.",
     [],
     "Same Singapore office. Smiling staff in business clothes clap as a man hangs a shiny framed "
     "certificate plaque with a large green chip emblem on the wall. Glasses of champagne on a "
     "side table, confetti in the air. Camera: medium-wide, celebratory mood."),
    ("Managing director: Alice", "The Managing Director of this company? Alice Huang.",
     ["ALICE"],
     "Singapore office at night. BUSINESSWOMAN stands by a tall window with the glowing Marina Bay "
     "skyline behind her, holding a smartphone to her ear, turning her head toward the camera with "
     "a sharp, knowing look and a faint smirk. Her reflection is visible in the glass. Camera: "
     "medium shot, eye level, cool blue night light with warm city glow."),
    ("Now on the radar", "Now Alice was directly on the radar of the US Department of Commerce.",
     [],
     "The same dark US government monitoring room. Now a big bright red dot is flashing on the green "
     "radar screen. The operator jolts upright in shock, eyes wide, mouth open, spilling coffee "
     "from his cup into the air; red alarm light spins on the ceiling and colleagues rush in from "
     "behind. Camera: medium shot, dramatic red-and-green lighting."),
    ("$4.8 billion shipments", "Between 2024 and 2026, when Megaspeed International's Indonesian sister company, Speed Matrix, purchased $4.8 billion worth of Nvidia superchips,",
     [],
     "Jakarta cargo port in humid hazy daylight. Mountains of wooden crates with simple green chip "
     "symbols are being unloaded from a cargo ship by cranes and stacked high on trucks; Indonesian "
     "workers in hard hats direct them. Palm trees and the Jakarta skyline in the distance. "
     "Camera: wide aerial-ish high angle, showing huge scale."),
    ("Commerce wonders", "the Commerce Department paused and wondered what this overnight company was really doing.",
     ["AGENTS"],
     "US government office. FIELD INVESTIGATORS stand in front of a cork board covered with "
     "photos of crates, ships and buildings connected with red string. The man scratches his head "
     "with a puzzled frown, the woman holds a coffee cup and narrows her eyes suspiciously. Messy "
     "desk with files. Camera: medium shot from behind and to the side."),
    ("The raid", "The US Commerce Department raided Speed Matrix's Indonesian data center.",
     ["AGENTS"],
     "Night. Inside a dim data center hall in Indonesia with long rows of mostly empty server "
     "racks. FIELD INVESTIGATORS and three other officers in dark windbreakers burst through a "
     "heavy metal door, flashlight beams cutting through the darkness, alert and serious faces. "
     "Small green status lights blink on the racks. Camera: wide shot from inside the hall, "
     "dramatic flashlight beams."),
    ("GPUs still in crates", "During the raid, they uncovered massive quantities of Nvidia GPUs lying uninstalled inside their original shipping crates.",
     ["AGENTS"],
     "Inside the data center. The male FIELD INVESTIGATOR has pried open a wooden crate with a "
     "crowbar, revealing neat rows of sealed green-and-black graphics cards in grey foam. Behind "
     "him, dozens more unopened crates are stacked to the ceiling next to empty server racks. Both "
     "investigators stare with wide shocked eyes and open mouths, flashlight beam on the cards. "
     "Camera: medium shot, slightly low angle."),
    ("Intelligence investigation", "Given the scale of the matter, US intelligence agencies began investigating Alice aggressively.",
     [],
     "Dark intelligence surveillance room lit by a wall of monitors showing grainy blurred CCTV "
     "footage of a woman in a cream blazer walking through an airport and city streets. Three "
     "analysts with headphones type rapidly at keyboards, faces lit blue, intense focused eyebrows. "
     "Camera: wide shot from behind the analysts."),
    ("The connection", "That inquiry revealed that Alice was in an intimate personal relationship with Nvidia founder Jensen Huang.",
     [],
     "Close-up of a cork investigation board. A hand pins a red string between two simple pencil "
     "sketch portraits: one of a grey-haired man in a black leather jacket and one of a woman with "
     "shoulder-length black hair in a cream blazer. A small red paper heart shape is pinned in the "
     "middle of the string. Other photos of crates and ships around. Camera: close-up, desk lamp "
     "light, investigative mood."),
    ("Viral video in Taipei", "Suddenly, in May 2025, a video of Jensen and Alice in Taipei went viral.",
     [],
     "Taipei night street with glowing shop signs (no readable text) and Taipei 101 tower in the "
     "background. In the foreground, many hands from different people hold up smartphones; every "
     "screen shows the same slightly blurry video of a grey-haired man in a black leather jacket "
     "and a woman in a cream blazer walking side by side. Floating like icons, view counters and "
     "share arrows burst out of the phones. Camera: close-up on phones, background bokeh."),
    ("Barred from leaving Singapore", "Following this, in August 2025, Singaporean authorities barred Alice Huang from leaving the country until the investigation against her concluded.",
     ["ALICE"],
     "Singapore Changi airport departure gate, bright modern interior with an indoor garden. "
     "BUSINESSWOMAN pulls a black suitcase, holding a passport, but a Singapore immigration officer "
     "in a dark uniform steps in front of her holding up a flat palm. Her face shows shock: "
     "eyebrows raised high, mouth slightly open. Travellers glance at them. Camera: medium shot, "
     "eye level."),
    ("Word reaches Nvidia", "Naturally, word reached Nvidia.",
     [],
     "Modern tech company headquarters meeting room with angular glass walls, green plants and "
     "triangular ceiling patterns. Four executives in smart-casual clothes crowd around one tablet, "
     "all with wide shocked eyes; one covers her mouth, one drops his pen. Camera: medium shot, "
     "eye level, tense mood."),
    ("The direct call", "In response, Nvidia counsel Teeter went straight to placing a direct phone call to the US Under Secretary of Commerce.",
     ["COUNSEL", "OFFICIAL"],
     "Split-screen composition with a thin vertical divide. Left: CORPORATE LAWYER in a modern "
     "glass office holding a phone to his ear, leaning forward, serious and urgent. Right: US "
     "GOVERNMENT OFFICIAL in his wood-panelled Washington office answering a desk phone, eyebrows "
     "raised in surprise. Camera: two matching medium shots."),
    ("The email to field agents", "Teeter then emailed Commerce Department field investigators gathering ground-level intelligence, stating that the matter had already been addressed with their superiors.",
     ["AGENTS"],
     "Cluttered field office at night. FIELD INVESTIGATORS lean over a laptop on a desk piled with "
     "case files and coffee cups; the screen shows a blank email layout with grey lines. The man's "
     "jaw drops, the woman frowns angrily with one eyebrow raised in disbelief. Desk lamp light. "
     "Camera: over-the-shoulder toward the laptop, faces lit by the screen."),
    ("Escalated to DOJ", "Stunned by this pushback, the field agents escalated the case, bringing it straight to the Department of Justice.",
     ["AGENTS"],
     "Daytime in Washington D.C. FIELD INVESTIGATORS march determinedly up the wide stone steps of "
     "a grand neoclassical government building with tall columns, each carrying a thick stack of "
     "case files under their arm, focused determined faces. US flag waving on top of the building. "
     "Camera: low angle from the bottom of the steps, heroic mood."),
    ("New York Times report", "In October, The New York Times published an investigative report laying out the full secret details to the public.",
     [],
     "Morning on a busy New York street corner, yellow cabs behind. People at a newsstand and on "
     "the sidewalk hold open broadsheet newspapers with big bold blank headline blocks and a "
     "sketch photo of a grey-haired man in a leather jacket; their faces show shock and gossip. "
     "A newspaper delivery bundle on the ground. Camera: medium-wide, eye level."),
    ("Diwali email", "To protect his position, Jensen Huang sent an internal email to his employees on Diwali.",
     ["JENSEN"],
     "Night. TECH CEO sits alone at a desk in a dim office typing on a laptop, serious tired face, "
     "lips pressed, eyebrows drawn together. Lit clay diyas (oil lamps) glow on the desk and "
     "windowsill, a string of warm fairy lights on the window, and colourful Diwali fireworks burst "
     "in the night sky outside. Camera: medium shot from the side, warm candlelight vs cold laptop "
     "light."),
    ("Investigation ongoing", "An independent investigation into Nvidia is currently ongoing,",
     [],
     "Close-up on a desk: a large magnifying glass held by a gloved hand hovers over a glowing green "
     "computer chip lying on top of open case files, photos and a red string. Shadowy silhouettes "
     "of investigators stand in the background. Camera: close-up, dramatic desk lamp lighting."),
    ("China denies", "while China maintains that it has done nothing of the sort.",
     [],
     "Formal press conference hall in Beijing with a deep-blue backdrop and a row of flags. A "
     "middle-aged Chinese government spokesperson in a dark suit stands at a wooden podium with "
     "microphones, palms spread outward in a calm 'we did nothing' gesture, neutral composed face. "
     "Rows of journalists with cameras and raised hands in the foreground. Camera: medium-wide "
     "from the press seats."),
    ("Outro", "What are your thoughts on this? Let me know in the comments, and I'll see you next time very, very soon. Until then, take care and Jai Hind.",
     [],
     "A young Indian man in a white kurta sits on a rooftop at sunset, smiling and typing a comment "
     "on his phone; a small Indian tricolour flag flutters on a pole beside him. Kites in the "
     "orange sky, Indian city rooftops and water tanks behind. Camera: medium shot, warm "
     "hopeful mood."),
]


def build() -> str:
    out = [f"# {TITLE}\n",
           "Each code block is a complete prompt. Copy it in one click and paste it into your image tool.\n",
           "Tip: generate Scene 1 first, then upload it as a reference in the same chat for the rest "
           "(\"keep this exact art style and characters\").\n"]
    for i, (title, line, chars, scene) in enumerate(SCENES, 1):
        parts = [STYLE]
        if chars:
            parts.append("CHARACTERS:\n" + "\n".join(CHARACTERS[c] for c in chars))
        parts.append("SCENE: " + scene)
        parts.append(AVOID)
        out.append(f"\n## Scene {i}: {title}\n\n> {line}\n\n```\n" + "\n\n".join(parts) + "\n```\n")
    return "".join(out)


if __name__ == "__main__":
    dest = Path(__file__).with_name("nvidia-story-prompts.md")
    dest.write_text(build(), encoding="utf-8")
    print(f"Wrote {len(SCENES)} prompts to {dest}")
