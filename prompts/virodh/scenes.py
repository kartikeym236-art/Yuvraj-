"""Virodh (Hindi) script -> scene prompts, Composio prompts + projects/virodh/scenes.json.

Same style block, avoid list and format as prompts/build_prompts.py.
Usage:  python prompts/virodh/scenes.py
"""
import json, sys
from pathlib import Path

HERE = Path(__file__).parent
ROOT = HERE.parent.parent
sys.path.insert(0, str(ROOT / "pipeline"))
from hindi import convert  # noqa: E402

STYLE = (
    "STYLE: Hand-drawn 2D Indian webcomic illustration, square 1:1 frame, like a still from an emotional "
    "Hindi animated reel about society and family. Characters: clean cartoon style, bold uniform black ink "
    "outlines, large round heads, flat warm orange-peach skin with soft pink blush on the cheeks, tiny solid "
    "black dot eyes, thick expressive eyebrows, simple line mouths, small hands with clear fingers; emotions "
    "shown with small black tick marks beside heads and simple white teardrops. Ordinary Indian middle-class "
    "people in kurtas, sarees, salwar kameez, checked shirts, sweater vests. Backgrounds are detailed and "
    "lived-in real Indian places (bus stands with auto-rickshaws, courtyards with charpai and steel utensils, "
    "old apartment balconies, rooftops with water tanks and clotheslines, narrow streets), painted in a warm "
    "golden-hour palette of peach, terracotta, ochre, cream and soft sky blue, light paper grain texture, "
    "soft sunlight and gentle shadows. Several characters usually share the frame and react to each other. "
    "Cinematic composition, relatable and emotional mood."
)
AVOID = (
    "AVOID: any readable text, letters, numbers, captions, subtitles, brand logos, watermarks, "
    "signatures or speech bubbles (screens, signs, papers and newspapers show only blank blocks, "
    "lines and simple shapes); realistic or 3D human faces; photorealism; anime big eyes; "
    "Pixar/3D render look; extra fingers or deformed hands; glossy plastic skin; neon or "
    "oversaturated colours; borders or frames around the image."
)
CHARACTERS = {
    "BOY": ("ROHAN: Indian young man around 22, curly black hair, dot eyes, thick eyebrows. Wears a navy "
            "shirt with rolled sleeves, khaki trousers and a brown leather satchel across his body."),
    "UNCLE": ("TAUJI: bald Indian man in his 60s with white side hair, round glasses, big grey moustache, "
              "frowning eyebrows. Wears a white kurta with a brown sleeveless vest."),
    "AUNTY": ("AUNTY: Indian woman in her 50s, hair in a bun, red bindi, gold earrings, stern eyebrows. "
              "Wears a maroon saree."),
    "GIRL": ("MEERA: Indian young woman around 22, dark hair in a messy bun, dot eyes. Wears a teal kurta, "
             "cream dupatta and a small cloth sling bag."),
    "TRAVELLER": ("VIKRAM: cheerful Indian man around 35, sun-tanned, short wavy hair, light stubble. Wears "
                  "an olive jacket and a big orange backpack."),
    "COUPLE": ("DADA-DADI: old Indian couple in their 70s, both white-haired, warm smiles; he wears a "
               "white kurta and shawl, she wears a soft lavender saree."),
}

S = lambda line, desc, chars=(): (line, list(chars), desc)
SCENES = [
    S("मनुष्य उन्हीं चीजों का", "In a sunny courtyard, TAUJI and AUNTY stand together frowning and pointing at ROHAN, who has a guitar on his back and a bus ticket in his hand. Neighbours peek from balconies. Camera: medium-wide.", ["UNCLE", "AUNTY", "BOY"]),
    S("विरोध करता है", "At a bus stand, TAUJI angrily points and AUNTY shakes her head as ROHAN runs to catch a departing red bus, an auto-rickshaw parked nearby. Camera: wide street view.", ["UNCLE", "AUNTY", "BOY"]),
    S("जिन्हें उसने स्वयं कभी जिया ही नहीं।", "TAUJI sits alone on a charpai in his small house courtyard, an unused dusty old suitcase under the cot and a faded empty frame on the wall, looking sullen. Camera: medium shot, late afternoon light.", ["UNCLE"]),
    S("जिसने दुनिया की सैर की हो,", "VIKRAM stands on a mountain viewpoint in the Himalayas at sunrise, arms wide open, prayer flags fluttering, a winding road far below. Camera: wide from behind.", ["TRAVELLER"]),
    S("वो घूमने को आवारगी नहीं कहेगा।", "At a small hill bus stand, VIKRAM smiles and pats ROHAN's shoulder, handing him a folded paper map, encouraging him to go. Camera: medium shot, warm light.", ["TRAVELLER", "BOY"]),
    S("जिसने प्रेम को जिया हो,", "DADA-DADI sit close together on an old apartment balcony with cups of chai, holding hands and laughing, potted tulsi plant beside them. Camera: medium shot, golden evening light.", ["COUPLE"]),
    S("वो प्रेम करने से किसी को नहीं रोकेगा।", "DADA-DADI smile warmly from their balcony as below in the lane MEERA and ROHAN shyly walk side by side; DADI gives a gentle blessing gesture. Camera: high angle from the balcony.", ["COUPLE", "GIRL", "BOY"]),
    S("समस्या कर्मों में नहीं होती,", "MEERA happily dances in the first rain on a rooftop with water tanks and clotheslines, arms open, eyes closed, smiling. Camera: medium-wide.", ["GIRL"]),
    S("समस्या उन अधूरे जीवनों में होती है", "TAUJI stands by a window at dusk, staring at an old black-and-white framed photo of his younger self holding a backpack, a sad regretful look. Camera: medium close-up.", ["UNCLE"]),
    S("जो अनुभवों से पहले ही", "In a courtyard, a circle of relatives whisper behind their hands and point as MEERA walks through the middle with her sling bag, head down. Camera: high angle.", ["GIRL", "AUNTY", "UNCLE"]),
    S("निर्णय सुना देते हैं।", "In the living room, TAUJI sits in a big chair like a judge, raising a finger and declaring sternly, while AUNTY nods beside him and ROHAN stands silently in front of them. Camera: medium-wide.", ["UNCLE", "AUNTY", "BOY"]),
    S("मनुष्य अक्सर उसी को", "On a rooftop at sunset, ROHAN happily plays guitar for his friends; on the next roof TAUJI watches him from behind a clothesline with a frown. Camera: wide.", ["BOY", "UNCLE"]),
    S("गलत कहता है", "TAUJI shouts and points at ROHAN across the rooftop wall; ROHAN freezes mid-strum, surprised, friends looking down. Camera: medium-wide.", ["UNCLE", "BOY"]),
    S("जिसे वो स्वयं कभी जी नहीं पाया।", "Night, TAUJI alone in his room under a dim yellow bulb, quietly opening an old trunk and holding a dusty old guitar he never played, a single tear on his cheek. Camera: medium shot, melancholic.", ["UNCLE"]),
]

SHORT_STYLE = (
    "Hand-drawn 2D Indian webcomic illustration, square, full-bleed, no border. Cartoon characters: bold "
    "black outlines, big round heads, flat warm orange-peach skin, pink blush cheeks, tiny dot eyes, thick "
    "expressive eyebrows, small black emotion tick marks near heads. Detailed lived-in Indian backgrounds, "
    "warm golden-hour palette (peach, terracotta, ochre, cream, soft blue), light paper grain. No text, "
    "letters, numbers, logos or watermarks anywhere."
)


SHORT_CHARS = {
    "BOY": "ROHAN: young man, curly black hair, navy shirt, khaki trousers, brown satchel.",
    "UNCLE": "TAUJI: bald old man, white side hair, round glasses, grey moustache, white kurta, brown vest.",
    "AUNTY": "AUNTY: woman in her 50s, bun, red bindi, maroon saree.",
    "GIRL": "MEERA: young woman, messy bun, teal kurta, cream dupatta.",
    "TRAVELLER": "VIKRAM: tanned man, wavy hair, stubble, olive jacket, orange backpack.",
    "COUPLE": "DADA-DADI: white-haired old couple, white kurta and lavender saree.",
}


def short_prompt(chars, desc):
    p = SHORT_STYLE + (" NO extra people." if not chars else "")
    if chars:
        p += "\n\nCharacters: " + " ".join(SHORT_CHARS[c] for c in chars)
    p += "\nScene: " + desc
    assert len(p) <= 1000, (len(p), desc)
    return p


def prompt(line, chars, desc):
    parts = [STYLE]
    if chars:
        parts.append("CHARACTERS:\n" + " ".join(SHORT_CHARS[c] for c in chars))
    parts.append("SCENE: " + desc)
    parts.append(f'NARRATION FOR THIS IMAGE: "{line}". The picture must show literally and clearly what these '
                 "words say. Do not write these words or any text in the image.")
    parts.append(AVOID)
    return "\n\n".join(parts)


if __name__ == "__main__":
    md = ["# जिसे जिया नहीं, उसी का विरोध: Scene Prompts\n"]
    scenes = []
    for k, (line, chars, desc) in enumerate(SCENES, 1):
        md += [f"## Scene {k}\n", f"> {line}\n", "```", prompt(line, chars, desc), "```\n"]
        scenes.append({"line": convert(line)[0], "image": f"scene_{k:02d}.jpg"})
    (HERE / "virodh-prompts.md").write_text("\n".join(md), encoding="utf-8")
    (ROOT / "projects/virodh/scenes.json").write_text(json.dumps(scenes, ensure_ascii=False, indent=1), encoding="utf-8")
    gen = [[k, short_prompt(chars, desc)] for k, (line, chars, desc) in enumerate(SCENES, 1)]
    (ROOT / "projects/virodh/gen_prompts.json").write_text(json.dumps(gen, ensure_ascii=False), encoding="utf-8")
    print(len(SCENES), "scenes")
