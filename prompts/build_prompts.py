"""Builds a copy-paste prompt file: one image per 0.5-2 s of narration.

Every prompt is complete on its own (style + characters + scene + avoid),
so each scene is a single copy.

Usage:  python prompts/build_prompts.py
For a new script: replace script.txt, rewrite SCENES (each entry's text is
the exact chunk of narration it covers), re-run. The build fails if the
chunks don't reproduce script.txt word-for-word, and warns on any scene
outside the 0.5-2 s window.
"""
import re
from pathlib import Path

HERE = Path(__file__).parent
TITLE = "Nvidia x Megaspeed Story: Scene Prompts"
WORDS_PER_SEC = 3.0          # typical reel narration pace
MIN_SEC, MAX_SEC = 0.5, 1.0     # one image per 0.5-1 s of narration

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
        "navy windbreaker jackets over plain shirts, lanyards with blank ID cards."
    ),
    "OPERATOR": (
        "RADAR OPERATOR: chubby American man in his 30s, short ginger hair, round cheeks, dot eyes, "
        "white short-sleeve shirt with a loose navy tie, headset around his neck."
    ),
    "DEV": (
        "GAME DEVELOPER: young Chinese man in his 20s, messy straight black hair with a fringe, "
        "round glasses, dot eyes, oversized grey hoodie, big black headphones around his neck."
    ),
    "VIEWER": (
        "NARRATOR BOY: young Indian man in his early 20s, big messy curly black hair, dot eyes, "
        "thick eyebrows, warm smile, wears a white cotton kurta with rolled sleeves and a black "
        "analog wristwatch."
    ),
}

# Reusable location descriptions keep repeated sets identical.
LOC = {
    "dc_office": "Formal Washington D.C. office with dark wood panelling, a US flag on a pole in the corner, the Capitol dome visible through a tall window.",
    "radar": "Dark US government monitoring room: a big round green radar screen with a sweeping line glows in the centre, rows of dark monitors behind, green light on everything.",
    "studio": "Busy modern open-plan game studio office in Shanghai, rows of desks with big monitors showing colourful fantasy game scenes (dragons, castles), energy drink cans, plush toys, floor-to-ceiling windows with the Shanghai skyline and Oriental Pearl Tower.",
    "boardroom": "Dim wood-panelled corporate boardroom in Shanghai at evening, long polished table, warm desk lamp light, city lights through the window.",
    "sh_office": "High-floor glass corner office in Shanghai at golden dusk, huge windows with the glowing Shanghai skyline, sleek desk with a closed laptop and a cup of tea.",
    "sg_office": "Modern Singapore office with tall windows showing the Marina Bay Sands hotel and skyline, glass table, potted plants.",
    "cleanroom": "Bright high-tech semiconductor clean room, white walls, yellow safety lighting, robotic arms and machines.",
    "lab": "Engineering lab workbench with magnifying lamp, tools, circuit boards and monitors showing abstract chip schematics.",
    "port_us": "Busy cargo port on an overcast day, stacked shipping containers, cranes, a cargo ship at the dock.",
    "port_jkt": "Jakarta cargo port in humid hazy daylight, cranes, cargo ship, palm trees and the Jakarta skyline in the distance.",
    "datacenter": "Inside a dim data center hall in Indonesia at night, long rows of mostly EMPTY server racks with a few small blinking green status lights, concrete floor, cable trays overhead.",
    "field_office": "Cluttered US government field office, desks piled with case files and coffee cups, a cork board with photos and red string on the wall, desk lamp light.",
    "surveillance": "Dark intelligence surveillance room lit by a wall of monitors showing grainy blurred CCTV footage of a woman in a cream blazer at airports and city streets.",
    "board": "Close-up of a cork investigation board with pinned photos of crates, ships and buildings connected by red string, lit by a desk lamp.",
    "taipei": "Taipei night street with glowing shop signs (no readable text), scooters, and the Taipei 101 tower in the background.",
    "changi": "Singapore Changi airport departure area, bright modern interior with an indoor garden and big windows showing planes.",
    "hq": "Modern tech headquarters meeting room with angular glass walls, triangular ceiling patterns and green plants.",
    "law_office": "Modern glass-walled corporate law office, city view, neat desk with a desk phone and laptop.",
    "diwali_office": "Dim office at night, lit clay diyas (oil lamps) on the desk and windowsill, warm fairy lights on the window, colourful Diwali fireworks in the night sky outside.",
    "beijing": "Formal press conference hall in Beijing with a deep-blue backdrop, a row of flags, a wooden podium with microphones, rows of journalists with cameras.",
    "rooftop": "Indian city rooftop at sunset, water tanks, kites in the orange sky, a small Indian tricolour flag on a pole.",
}

# (exact narration chunk, characters, scene)
SCENES = [
    # --- Hook
    ("An affair like this", [], f"{LOC['board']} A hand pins a red string between two simple pencil sketch portraits: a grey-haired man in a black leather jacket and a woman with shoulder-length black hair in a cream blazer; a small red paper heart is pinned on the string. Camera: close-up."),
    ("ruined not just Jensen,", ["JENSEN"], "Dark stage lit by a single cold spotlight. TECH CEO stands with shoulders slumped, head lowered, one hand on his forehead, sad worried eyebrows. Behind him a giant glowing green computer chip floats with a big crack through it. Camera: medium shot, low angle."),
    ("but all of America.", [], "The US Capitol building at dusk under heavy dark storm clouds, a US flag hanging limp on its pole in the foreground, a few dry leaves blowing across the empty plaza. Camera: wide shot, gloomy mood."),
    # --- 1993 / 1999
    ("In 1993,", [], "Exterior of a 1990s American roadside diner in the morning: chrome-and-red building, blank glowing sign, 1990s sedans in the parking lot, palm trees, California sky. Camera: wide, nostalgic warm tones."),
    ("Jensen Huang co-founded Nvidia.", ["YOUNG_JENSEN"], "Inside the diner, red vinyl booth. YOUNG FOUNDER shakes hands over the formica table with two young engineers (one with curly brown hair and beard in a checked flannel shirt, one bald with round glasses in a grey sweater), all smiling. Coffee mugs, pancakes and napkins covered in pen chip sketches. Camera: medium shot, eye level."),
    ("Before that,", [], "A sepia-tinted 1990s office floor full of grey cubicles and bulky beige computers, dull fluorescent light, a few workers slouched at desks. Camera: wide, slightly high angle."),
    ("the computer world", [], "Close-up of a desk with a bulky beige CRT monitor, beige tower PC, floppy disks, a tangled mouse cable and a coffee mug. The screen shows a slow blocky grey loading bar. Camera: close-up, eye level."),
    ("was just playing around with CPUs,", [], "A bored office worker in a white shirt and loose tie leans back in his chair yawning, tossing a small processor chip up in the air like a toy, beige computer beside him. Camera: medium shot, sleepy dull mood."),
    ("but when Nvidia introduced", ["YOUNG_JENSEN"], "Tech launch stage, 1999. YOUNG FOUNDER walks confidently into a bright spotlight holding an object covered with a black cloth, a mysterious smile. Dark audience silhouettes in front. Camera: medium-wide from the audience."),
    ("the world's first GPU", [], "Extreme close-up of two hands holding a green-and-black graphics card that glows with bright green light, light rays bursting outward, dark background. Camera: close-up, heroic."),
    ("in 1999,", [], "A huge 1999 tech expo hall: crowds of people, rows of bulky CRT monitors showing glowing 3D wireframe shapes, hanging banners with only abstract shapes, festive millennium atmosphere. Camera: wide, high angle."),
    ("it created a massive stir", [], "Audience of tech journalists and engineers gasping with open mouths and wide dot eyes, holding up old digital cameras with bright white flash bursts. Camera: medium shot facing the crowd."),
    ("in the tech industry.", [], "Rival engineers in a 1999 office crowd around a CRT monitor showing smooth 3D graphics, jaws dropped, one drops his coffee mug. Camera: medium shot, eye level."),
    ("And this is where", [], "A dark empty theatre with a closed heavy dark-red curtain, a single spotlight beam full of floating dust. Camera: wide, symmetrical, mysterious."),
    ("the real drama begins.", [], "The red theatre curtain swings open; on the bright stage two long shadows of a man and a woman stand far apart facing each other, a glowing green chip on a small stool between them. Camera: wide, symmetrical."),
    # --- 2008 / 7Road
    ("Back in 2008,", [], "Shanghai skyline in 2008 on a clear day, the Oriental Pearl Tower and Huangpu river with boats, a few construction cranes. Camera: wide establishing shot."),
    ("a large Chinese gaming company", ["DEV"], f"{LOC['studio']} GAME DEVELOPER in the front row cheers with both arms raised, other developers busy behind. Camera: wide shot, lively mood."),
    ("called 7Road Holdings", [], "Bright company lobby with a big blank wall sign showing only a stylised winding-road-and-game-controller icon, a receptionist at a white desk, potted plants. Camera: medium-wide, eye level."),
    ("was established.", [], "Opening ceremony outside an office building: a red ribbon being cut with big gold scissors, red lanterns hanging, staff clapping, red confetti in the air. Camera: medium shot."),
    ("They also started using", ["DEV"], f"{LOC['studio']} GAME DEVELOPER excitedly opens a plain cardboard box on his desk, green light glowing from inside the box onto his face. Camera: medium close-up."),
    ("Nvidia's GPUs.", ["DEV"], "Close-up: GAME DEVELOPER's hands carefully slide a glowing green-and-black graphics card into an open gaming PC tower; his smiling face visible at the top edge. Camera: close-up, slight high angle."),
    ("However, an investment in this firm", [], f"{LOC['boardroom']} A hand in a dark suit sleeve slides a thick sealed brown folder and a stack of cash bundles across the table toward a nervous young man in a hoodie. Camera: over-the-table, low angle."),
    ("was held by", [], f"{LOC['boardroom']} Three people in dark suits sit at the far end of the table, faces hidden in shadow, hands folded. Camera: wide from the opposite end, secretive mood."),
    ("Shanghai Hexi Management.", [], "Exterior of a sleek dark glass skyscraper in Shanghai at evening, no signs, reflections of clouds, low angle making it look powerful and mysterious."),
    ("And who was", [], f"{LOC['sh_office']} A tall black leather executive chair faces away from the camera toward the window; only the back of the chair is visible. Camera: medium shot, suspenseful."),
    ("its Executive Director?", [], "Extreme close-up of a woman's hand with a slim gold watch resting on the black leather armrest, fingers tapping. Camera: close-up, dramatic light."),
    ("Alice Huang.", ["ALICE"], f"{LOC['sh_office']} BUSINESSWOMAN has turned the chair to face the camera, legs crossed, subtle confident smile, one eyebrow raised. Camera: medium shot, reveal lighting from the window."),
    ("In fact, back then,", ["ALICE"], "Busy Shanghai shopping street in daytime. BUSINESSWOMAN walks casually holding a coffee cup and her handbag, relaxed, nobody noticing her. Camera: medium-wide, eye level."),
    ("Alice was not even", ["OPERATOR"], f"{LOC['radar']} RADAR OPERATOR sits half-asleep, head on hand, a donut in the other hand, coffee cup beside him. Camera: medium shot from the side."),
    ("on the US government's radar.", [], "Close-up of the round green radar screen with the sweeping line and absolutely no dots on it. Camera: close-up, straight on."),
    # --- AI superchips
    ("Gradually, Nvidia moved beyond just GPUs", ["JENSEN"], "Office table. TECH CEO pushes a pile of old graphics cards aside with one arm, looking ahead with determination. Camera: medium shot, eye level."),
    ("and started developing AI superchips.", ["JENSEN"], f"{LOC['cleanroom']} Two engineers in white bunny suits and masks hold up a large square AI superchip glowing bright green; TECH CEO looks at it with wide proud eyes and a clenched fist. Camera: medium shot."),
    ("Before long,", ["JENSEN"], "Huge keynote arena: TECH CEO on stage holding up a glowing superchip, giant screens behind him with abstract green patterns, thousands of audience silhouettes with raised phones. Camera: wide from the back of the arena."),
    ("Nvidia became the driving engine", [], "A giant glowing green chip at the centre of a huge machine, surrounded by turning gears and pistons, green energy pulsing through pipes. Camera: medium-wide, powerful."),
    ("of the global AI revolution.", [], "A stylised Earth globe in space with a glowing green chip at its heart; green energy lines shoot across the planet to tiny data centers, robots, self-driving cars and cities. Camera: wide, awe-inspiring."),
    # --- US gets fidgety
    ("That’s when", [], "The US Capitol building with dark clouds rolling in over the dome, wind blowing the flag. Camera: wide, tense."),
    ("the US government", ["OFFICIAL"], f"{LOC['dc_office']} US GOVERNMENT OFFICIAL sits at a big desk staring at a monitor with a steep green line chart shooting upward, eyebrows drawn together. Camera: medium shot."),
    ("started getting fidgety.", ["OFFICIAL"], f"{LOC['dc_office']} US GOVERNMENT OFFICIAL nervously bites his thumbnail, sweat drop on his forehead, leg bouncing with small motion lines; two aides whisper behind him. Camera: medium close-up."),
    ("Initially, the US government informed Nvidia", ["OFFICIAL", "JENSEN"], f"{LOC['dc_office']} US GOVERNMENT OFFICIAL slides a thick document sealed with red wax across the desk to TECH CEO, who sits opposite with one eyebrow raised and arms crossed. Camera: over TECH CEO's shoulder."),
    ("that selling its chips", [], "Close-up of a truck bed loaded with wooden crates stamped with simple green chip symbols, a worker strapping them down. Camera: close-up, slight low angle."),
    ("to any Chinese entity", [], "Illustrated vintage-style world map on a table, a dotted shipping line with a little ship icon going from the US west coast across the Pacific to China, a red pin on China. No text. Camera: top-down."),
    ("would require strict regulatory permission.", [], "A giant rubber stamp dripping red ink hovers over a document on a desk; next to it a chip crate wrapped heavily in red tape. Camera: close-up, dramatic."),
    # --- loophole
    ("To navigate around this,", ["JENSEN"], "TECH CEO stands at a whiteboard covered with a drawn maze, tracing a path through it with his finger, thinking hard, one eyebrow raised. Camera: medium shot from the side."),
    ("Nvidia found a loophole", [], "An engineer in a lab coat peeks through a small glowing gap in a huge grey wall with a sly grin, light streaming through the gap onto his face. Camera: medium close-up."),
    ("in 2022", [], f"{LOC['lab']} Night, engineers working late, desk lamps on, cups of instant noodles. Camera: wide, quiet focused mood."),
    ("and engineered two", [], f"{LOC['lab']} An engineer holds up two small, dim, greyish chips between his fingers, smirking. Camera: close-up on the chips and his face."),
    ("watered-down, export-grade chip models.", [], f"{LOC['lab']} A small watering can pours water over the two small dim chips as a visual joke, while a big brightly glowing chip sits safely under a glass dome beside them. Camera: medium close-up, playful."),
    ("But the US government", ["OFFICIAL"], f"{LOC['dc_office']} US GOVERNMENT OFFICIAL picks up one of the small dim chips and squints at it suspiciously, one eyebrow raised. Camera: close-up."),
    ("wasn't pleased with that either.", ["OFFICIAL"], f"{LOC['dc_office']} US GOVERNMENT OFFICIAL stands with arms tightly crossed, deep frown, shaking his head with motion lines; the two small chips lie on the desk. Camera: medium, slightly low angle."),
    # --- 2023 ban
    ("In 2023,", ["OFFICIAL"], "Government press room with blue curtains and US flags. US GOVERNMENT OFFICIAL steps up to a podium with microphones, stern face, reporters with cameras in front. Camera: medium-wide."),
    ("they imposed a blanket ban", [], "Warehouse: two officers throw a giant heavy grey blanket over a tall stack of chip crates, covering them completely (visual pun). Camera: wide, comedic but serious."),
    ("on Nvidia,", [], "A big red rubber stamp slams down onto the lid of a crate marked with a green chip symbol, leaving a bold red X mark, impact lines. Camera: close-up, top-down."),
    ("declaring that even", ["OFFICIAL"], "Press room. US GOVERNMENT OFFICIAL at the podium points his finger firmly forward, eyebrows sharply angled down. Camera: medium close-up, low angle."),
    ("these watered-down chips", [], "A wooden judge's gavel slams down on a desk right beside the two small dim chips, impact lines, chips bouncing. Camera: close-up."),
    ("could no longer be sold", [], f"{LOC['port_us']} A red-and-white boom barrier slams down in front of a truck loaded with chip crates; a customs officer holds up a flat palm 'stop' gesture. Camera: wide, low angle."),
    ("to China.", [], "A busy Chinese port with the Shanghai skyline behind; an empty dock where a cargo ship should be, workers waiting with empty forklifts, looking out to sea. Camera: wide."),
    # --- twist
    ("Here is the twist:", [], "Close-up of a chess board; a hand lifts a black king piece to reveal a tiny glowing green chip hidden underneath. Camera: close-up, dramatic side light."),
    ("a few months earlier,", [], "Blank calendar pages flying backwards through the air in an office, papers swirling. Camera: medium, motion feel."),
    ("in March,", [], "Spring in Shanghai: pink blossoms on a tree in front of the office tower, sunny morning. Camera: medium-wide, fresh mood."),
    ("that same Chinese gaming company", ["DEV"], f"{LOC['studio']} Now half empty: GAME DEVELOPER packs plush toys and game posters into a cardboard box, other desks cleared. Camera: medium shot."),
    ("7Road Holdings", [], "The old lobby wall sign with the winding-road-and-game-controller icon, slightly dusty, one corner coming loose. Camera: medium, straight on."),
    ("had rebranded itself", [], "A worker in overalls on a stepladder unscrews and removes the old game-controller sign board from the lobby wall. Camera: medium-wide."),
    ("as Megaspeed International,", [], "Two workers lift a sleek new silver sign board onto the lobby wall, showing only a glowing chip icon with speed lines. Camera: medium-wide, slight low angle."),
    ("a business focused on", [], "Office being transformed: staff peel game posters off the walls and put up framed pictures of server racks. Camera: medium-wide."),
    ("procuring and leasing AI chips.", [], "Huge warehouse full of tall server racks with blinking green lights, workers in orange vests drive forklifts carrying chip crates. Camera: wide, deep perspective."),
    ("By November,", [], "Singapore Marina Bay skyline on a rainy November evening, wet reflections on the water, glowing city lights. Camera: wide establishing."),
    ("Megaspeed came under", [], f"{LOC['sg_office']} Two businessmen in suits shake hands firmly over the glass table. Camera: medium shot, eye level."),
    ("complete Singaporean ownership,", [], "Close-up of a fountain pen signing a document on a glass table, a small Singapore flag on a desk stand beside it. Camera: close-up."),
    ("and just four days later,", [], "Office wall clock with its hands spinning fast (motion blur), sunlight and moonlight alternating through the window. Camera: close-up on the clock."),
    ("it became an official", [], f"{LOC['sg_office']} A man hangs a shiny framed certificate plaque with a big green chip emblem on the wall. Camera: medium."),
    ("Nvidia Cloud Partner.", [], f"{LOC['sg_office']} Staff clap and raise champagne glasses in front of the plaque, which now shows a green chip emblem with a small cloud shape, confetti falling. Camera: medium-wide, celebratory."),
    ("The Managing Director", [], "A big glass desk with a blank gold nameplate and an empty black executive chair, Marina Bay view behind. Camera: medium, symmetrical."),
    ("of this company?", [], "Long Singapore office corridor; a woman's silhouette in heels walks slowly toward the camera, backlit. Camera: low angle, suspense."),
    ("Alice Huang.", ["ALICE"], f"{LOC['sg_office']} Night. BUSINESSWOMAN stands by the window holding a phone to her ear, turning toward the camera with a sharp knowing look and a faint smirk. Camera: medium shot."),
    # --- Commerce
    ("Now Alice was directly", ["ALICE"], "Close-up of BUSINESSWOMAN's face as she looks up sharply, eyes alert, as if sensing she's being watched. Camera: close-up."),
    ("on the radar", ["OPERATOR"], f"{LOC['radar']} A big red dot flashes on the radar; RADAR OPERATOR jolts upright, spilling coffee, red alarm light spinning. Camera: medium shot."),
    ("of the US Department of Commerce.", [], "Exterior of a huge neoclassical government building in Washington D.C. with columns and US flags, clear day. Camera: wide, low angle."),
    ("Between 2024", [], "Jakarta skyline in bright daylight with the National Monument (Monas) tower, busy traffic below. Camera: wide establishing."),
    ("and 2026,", [], "The same Jakarta skyline at night with the Monas tower lit up, glowing city lights and traffic trails. Camera: wide establishing."),
    ("when Megaspeed International's", ["ALICE"], f"{LOC['sg_office']} BUSINESSWOMAN points at a wall map (no text) where a line is drawn from Singapore to Indonesia. Camera: medium shot from the side."),
    ("Indonesian sister company,", [], "Modest new office building in Jakarta with palm trees, an Indonesian flag on a pole, blank sign. Camera: medium-wide."),
    ("Speed Matrix,", [], "Exterior of a large grey windowless data center building in Indonesia, metal fence, cooling units, palm trees, hazy sky. Camera: wide."),
    ("purchased $4.8 billion", [], "A mountain of stacked cash bundles on a long table, a cash-counting machine spitting bills, two workers in shirts counting. Camera: medium-wide."),
    ("worth of Nvidia superchips,", [], f"{LOC['port_jkt']} Cranes unload mountains of wooden crates with green chip symbols onto trucks. Camera: high angle, showing huge scale."),
    ("the Commerce Department paused", ["AGENTS"], f"{LOC['field_office']} FIELD INVESTIGATORS freeze mid-step, the woman holding a coffee cup in mid-air, both staring at a monitor. Camera: medium shot."),
    ("and wondered", ["AGENTS"], f"{LOC['field_office']} The male FIELD INVESTIGATOR scratches his head with a puzzled frown. Camera: close-up."),
    ("what this overnight company", [], "The Indonesian data center building at night under a full moon, a few windows glowing, ominous. Camera: wide, low angle."),
    ("was really doing.", ["AGENTS"], f"{LOC['field_office']} FIELD INVESTIGATORS stand at the cork board with red string, the woman narrowing her eyes suspiciously. Camera: medium from behind and side."),
    # --- raid
    ("The US Commerce Department raided", ["AGENTS"], "Night: black SUVs screech to a stop at the data center gate, headlights blazing; FIELD INVESTIGATORS jump out. Camera: wide, dramatic."),
    ("Speed Matrix's Indonesian data center.", ["AGENTS"], f"{LOC['datacenter']} FIELD INVESTIGATORS and three officers burst through a heavy metal door, flashlight beams cutting through the dark. Camera: wide from inside the hall."),
    ("During the raid,", [], f"{LOC['datacenter']} Flashlight beams sweep across the rows of empty server racks. Camera: wide, deep perspective."),
    ("they uncovered", ["AGENTS"], "The male FIELD INVESTIGATOR pries open a wooden crate lid with a crowbar, the woman shining a flashlight on it. Camera: medium shot."),
    ("massive quantities of Nvidia GPUs", [], f"{LOC['datacenter']} Dozens of unopened wooden crates stacked to the ceiling. Camera: wide, low angle, overwhelming scale."),
    ("lying uninstalled", [], "Close-up of an empty server rack: empty slots, unplugged cables hanging loose, dust. Camera: close-up."),
    ("inside their original shipping crates.", ["AGENTS"], "Open crate full of neat rows of sealed green-and-black graphics cards in grey foam; FIELD INVESTIGATORS stare with wide shocked eyes and open mouths. Camera: medium, slight low angle."),
    # --- intelligence
    ("Given the scale of the matter,", [], "High-angle view of the data center hall filled with crates; agents look tiny among them. Camera: top-down wide."),
    ("US intelligence agencies", [], "A large secretive government building at night with satellite dishes on the roof and lit windows, fence and guard booth. Camera: wide."),
    ("began investigating Alice aggressively.", [], f"{LOC['surveillance']} Three analysts with headphones type rapidly, faces lit blue, intense eyebrows. Camera: wide from behind the analysts."),
    ("That inquiry revealed", [], f"{LOC['surveillance']} An analyst pulls a thick file out of a stack, eyes widening. Camera: medium close-up."),
    ("that Alice was in", ["ALICE"], "Night. BUSINESSWOMAN sits in the back seat of a car looking thoughtfully at her phone, city lights passing outside. Camera: medium close-up through the car window."),
    ("an intimate personal relationship", [], f"{LOC['board']} The red string with the small red paper heart linking two sketch portraits (a grey-haired man in a leather jacket and a woman in a cream blazer). Camera: close-up."),
    ("with Nvidia founder Jensen Huang.", [], f"{LOC['board']} A finger taps the pinned pencil sketch of the grey-haired man in a black leather jacket. Camera: extreme close-up."),
    # --- viral / Singapore
    ("Suddenly, in May 2025,", [], "A smartphone on a desk lights up and vibrates with a flood of notification bubbles (blank), motion lines around it. Camera: close-up."),
    ("a video of Jensen and Alice", [], "Close-up of a phone screen showing a slightly blurry video of a grey-haired man in a black leather jacket and a woman in a cream blazer walking side by side on a street. Camera: close-up."),
    ("in Taipei", [], f"{LOC['taipei']} Camera: wide establishing, night bokeh."),
    ("went viral.", [], f"{LOC['taipei']} Many hands hold up smartphones all showing the same video, share arrows and heart icons bursting out of the screens. Camera: close-up on phones."),
    ("Following this,", ["ALICE"], "Singapore apartment at night: BUSINESSWOMAN hurriedly packs clothes into a black suitcase on her bed, worried eyebrows. Camera: medium shot."),
    ("in August 2025,", [], "Singapore Changi airport exterior on a hot sunny day, a plane taking off, palm trees. Camera: wide."),
    ("Singaporean authorities barred Alice Huang", ["ALICE"], f"{LOC['changi']} A Singapore immigration officer in a dark uniform steps in front of BUSINESSWOMAN with a raised flat palm; she holds her suitcase handle, eyebrows raised in shock. Camera: medium shot."),
    ("from leaving the country", [], "Close-up: an officer's hand holds a passport out of reach while a woman's hand with a gold watch reaches for it. Camera: close-up."),
    ("until the investigation against her concluded.", ["ALICE"], "BUSINESSWOMAN sits alone by a big apartment window at dusk, looking out sadly at planes taking off in the distance. Camera: medium shot from behind and side."),
    # --- Nvidia response
    ("Naturally, word reached Nvidia.", [], f"{LOC['hq']} Four executives crowd around one tablet with wide shocked eyes; one covers her mouth, one drops his pen. Camera: medium shot."),
    ("In response,", ["COUNSEL"], f"{LOC['law_office']} CORPORATE LAWYER stands up abruptly from his desk, chair rolling back, determined face. Camera: medium shot."),
    ("Nvidia counsel Teeter", ["COUNSEL"], "Close-up portrait of CORPORATE LAWYER adjusting his glasses with one finger, serious eyebrows. Camera: close-up."),
    ("went straight to placing", ["COUNSEL"], f"{LOC['law_office']} CORPORATE LAWYER quickly dials a desk phone, finger pressing buttons. Camera: medium close-up."),
    ("a direct phone call", [], "Extreme close-up of a phone handset pressed to a man's ear, small sound-wave arcs. Camera: close-up."),
    ("to the US Under Secretary", ["OFFICIAL"], f"{LOC['dc_office']} US GOVERNMENT OFFICIAL picks up a ringing desk phone, eyebrows raised in surprise. Camera: medium shot."),
    ("of Commerce.", ["COUNSEL", "OFFICIAL"], "Split screen with a thin vertical divide: left, CORPORATE LAWYER talking on the phone in a glass office; right, US GOVERNMENT OFFICIAL listening on the phone in a wood-panelled office. Camera: two matching medium shots."),
    ("Teeter then emailed", ["COUNSEL"], f"{LOC['law_office']} CORPORATE LAWYER types confidently on a laptop with a sly small smile. Camera: medium close-up."),
    ("Commerce Department field investigators", ["AGENTS"], f"{LOC['field_office']} FIELD INVESTIGATORS sit at their cluttered desks working on case files. Camera: medium-wide."),
    ("gathering ground-level intelligence,", ["AGENTS"], "Jakarta street in daylight: FIELD INVESTIGATORS in casual clothes take photos of the data center fence with a camera and write in a notebook. Camera: medium shot."),
    ("stating that the matter", [], "Close-up of a laptop screen showing a blank email layout with grey lines, two faces reflected in the screen. Camera: close-up."),
    ("had already been addressed", ["AGENTS"], f"{LOC['field_office']} FIELD INVESTIGATORS lean over the laptop; the man's jaw drops, the woman frowns angrily with one eyebrow raised. Camera: over-the-shoulder."),
    ("with their superiors.", ["AGENTS"], "Through a glass office wall, a boss in a suit laughs on the phone with his feet on the desk; FIELD INVESTIGATORS watch from outside, frustrated. Camera: medium-wide."),
    ("Stunned by this pushback,", ["AGENTS"], "The female FIELD INVESTIGATOR slams the laptop shut angrily, impact lines, coffee sloshing. Camera: medium close-up."),
    ("the field agents", ["AGENTS"], f"{LOC['field_office']} FIELD INVESTIGATORS stand up together grabbing thick case files, determined faces. Camera: medium shot, low angle."),
    ("escalated the case,", ["AGENTS"], "FIELD INVESTIGATORS stride fast down a long government corridor carrying boxes of case files. Camera: medium-wide, motion feel."),
    ("bringing it straight", [], "A black car driving fast down a Washington D.C. avenue with the Capitol in the background. Camera: wide."),
    ("to the Department of Justice.", ["AGENTS"], "FIELD INVESTIGATORS march up the wide stone steps of a grand neoclassical government building with tall columns, case files under their arms, US flag on top. Camera: low angle, heroic."),
    # --- NYT
    ("In October,", [], "New York street in autumn, orange leaves falling, yellow cabs. Camera: wide."),
    ("The New York Times published", [], "Industrial printing press rolling out newspapers at high speed, sheets with blank grey headline blocks. Camera: medium, motion blur."),
    ("an investigative report", [], "A journalist at a messy newsroom desk late at night typing, sticky notes and photos with red string around the monitor. Camera: medium shot."),
    ("laying out the full secret details", [], "An open newspaper on a table with blank text blocks and sketch photos of crates and a grey-haired man in a leather jacket. Camera: top-down close-up."),
    ("to the public.", [], "People at a New York newsstand and on the sidewalk reading broadsheet newspapers with shocked faces and whispering. Camera: medium-wide."),
    # --- Diwali email
    ("To protect his position,", ["JENSEN"], "Night. TECH CEO stands at a tall office window, arms crossed, thinking, his reflection visible in the glass, city lights below. Camera: medium from behind and side."),
    ("Jensen Huang sent an internal email", ["JENSEN"], f"{LOC['diwali_office']} TECH CEO sits at the desk typing on a laptop, serious tired face, lips pressed. Camera: medium shot from the side."),
    ("to his employees", [], "Open-plan tech office: employees at desks reading their laptop screens (blank email layout), curious faces. Camera: wide."),
    ("on Diwali.", [], "Colourful Diwali fireworks over a city skyline at night, rows of lit diyas on a windowsill and a rangoli on the floor in the foreground. Camera: wide, festive."),
    # --- ending
    ("An independent investigation into Nvidia", [], "A gloved hand holds a large magnifying glass over a glowing green chip lying on open case files and photos with red string. Camera: close-up, desk lamp lighting."),
    ("is currently ongoing,", [], "Investigators' office late at night, lights on, piles of files, a wall clock, people still working. Camera: wide."),
    ("while China maintains", [], f"{LOC['beijing']} Camera: wide from the press seats."),
    ("that it has done", [], f"{LOC['beijing']} A middle-aged Chinese spokesperson in a dark suit speaks at the podium, composed neutral face. Camera: medium shot."),
    ("nothing of the sort.", [], f"{LOC['beijing']} The spokesperson spreads both palms outward in a calm 'we did nothing' gesture, slight shrug. Camera: medium close-up."),
    ("What are your thoughts on this?", ["VIEWER"], f"{LOC['rooftop']} NARRATOR BOY sits on the parapet, chin in hand, looking at the camera curiously. Camera: medium shot."),
    ("Let me know in the comments,", ["VIEWER"], "Close-up of NARRATOR BOY's hands typing on a phone, screen shows blank comment bubbles. Camera: close-up."),
    ("and I'll see you next time", ["VIEWER"], f"{LOC['rooftop']} NARRATOR BOY smiles and waves at the camera. Camera: medium shot."),
    ("very, very soon.", ["VIEWER"], f"{LOC['rooftop']} NARRATOR BOY gives a big thumbs up with a wide grin. Camera: medium close-up."),
    ("Until then, take care", ["VIEWER"], f"{LOC['rooftop']} NARRATOR BOY stands waving goodbye, small against the big sunset sky. Camera: wide."),
    ("and Jai Hind.", [], "Close-up of the Indian tricolour flag fluttering proudly against a golden sunset sky. Camera: low angle."),
]


def norm(s: str) -> str:
    s = s.replace("—", " ").replace("’", "'")
    return re.sub(r"\s+", " ", s).strip()


def _number_words(n: int) -> int:
    """How many words it takes to say n in English ("120" -> one hundred twenty -> 3)."""
    if n < 20:
        return 1
    if n < 100:
        return 1 if n % 10 == 0 else 2
    if n < 1000:
        return 2 + (_number_words(n % 100) if n % 100 else 0)
    for size in (10**12, 10**9, 10**6, 10**3):
        if n >= size:
            return _number_words(n // size) + 1 + (_number_words(n % size) if n % size else 0)
    return 1


def spoken_words(text: str) -> float:
    n = 0.0
    for tok in text.split():
        num = re.sub(r"[^\d.]", "", tok).strip(".")
        if not num:
            n += 1
        elif "," not in tok and re.fullmatch(r"(1[1-9]|20)\d\d", num):   # years: 1993 -> nineteen ninety-three
            n += 3
        elif "." in num:                                 # 4.8 -> four point eight
            a, b = num.split(".", 1)
            n += _number_words(int(a or 0)) + 1 + len(b)
        else:
            n += _number_words(int(num))
    return n


def render(title, script_text, scenes, characters, style=None, avoid=None, limit=None) -> str:
    style = style or STYLE
    avoid = avoid or AVOID
    script = norm(script_text)
    joined = norm(" ".join(t for t, _, _ in scenes))
    if joined != script:
        i = next((k for k, (a, b) in enumerate(zip(joined, script)) if a != b), min(len(joined), len(script)))
        raise SystemExit(f"Chunks don't match script near: ...{script[max(0, i-40):i+40]}...")

    if limit:
        scenes = scenes[:limit]
    total = 0.0
    out = [f"# {title}\n\n",
           f"{len(scenes)} scenes, each covering 0.5–2 s of narration (estimated at {WORDS_PER_SEC:g} words/sec).\n",
           "Each code block is a complete prompt. Copy it in one click and paste it into your image tool.\n\n",
           "Tip: generate Scene 1 first, then upload it as a reference in the same chat for the rest "
           "(\"keep this exact art style and characters\").\n"]
    for i, (text, chars, scene) in enumerate(scenes, 1):
        sec = spoken_words(text) / WORDS_PER_SEC
        if not MIN_SEC <= sec <= MAX_SEC:
            print(f"warning: scene {i} '{text}' is ~{sec:.1f}s")
        start = total
        total += sec
        parts = [style]
        if chars:
            parts.append("CHARACTERS:\n" + "\n".join(characters[c] for c in chars))
        parts.append("SCENE: " + scene)
        parts.append(avoid)
        out.append(f"\n## Scene {i}  ·  {start:.1f}s – {total:.1f}s  ({sec:.1f}s)\n\n> {text}\n\n```\n"
                   + "\n\n".join(parts) + "\n```\n")
    out.insert(1, f"Estimated total length: {total:.0f} s.\n\n")
    return "".join(out)


def build() -> str:
    return render(TITLE, (HERE / "script.txt").read_text(encoding="utf-8"), SCENES, CHARACTERS)


if __name__ == "__main__":
    dest = HERE / "nvidia-story-prompts.md"
    dest.write_text(build(), encoding="utf-8")
    print(f"Wrote {len(SCENES)} prompts to {dest}")
