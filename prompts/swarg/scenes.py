"""Swarg-Nark (Hindi) script -> scene prompts + projects/swarg/scenes.json.

Same style block, avoid list and format as prompts/build_prompts.py.
Usage:  python prompts/swarg/scenes.py
"""
import json, sys
from pathlib import Path

HERE = Path(__file__).parent
ROOT = HERE.parent.parent
sys.path.insert(0, str(ROOT / "pipeline"))
from hindi import convert  # noqa: E402

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
    "SPEAKER": ("SPEAKER: Indian man in his mid 40s, short neat black hair greying at the temples, "
                "well-trimmed salt-and-pepper beard, dot eyes, thick expressive eyebrows, warm peach "
                "skin. Wears a navy-blue blazer over a crisp white shirt, no tie, grey trousers."),
    "MAN": ("ORDINARY MAN: Indian man around 30, slim, short messy black hair, dot eyes, thick "
            "eyebrows. Wears a faded mustard-yellow t-shirt and blue jeans."),
    "WIFE": ("WIFE: Indian woman around 30, long black hair in a low bun, small red bindi, dot eyes, "
             "warm smile. Wears a simple teal cotton salwar kameez with a light dupatta."),
    "ASTROLOGER": ("ASTROLOGER: plump Indian man in his 60s, bald on top with white hair at the "
                   "sides, long white beard, dot eyes, sly eyebrows. Wears an orange kurta and a "
                   "string of beads, sits with a crystal ball and blank star charts."),
}

S = lambda line, desc, chars=(): (line, list(chars), desc)
SCENES = [
    S("कोई स्वर्ग नहीं होता,", "Golden gates of heaven on fluffy clouds slowly dissolving into thin air like mist. Camera: wide, soft golden light."),
    S("कोई नर्क नहीं होता।", "A fiery dark underworld gate with flames, crumbling and fading into grey smoke. Camera: wide, dramatic."),
    S("सब कुछ यहाँ पे है,", "SPEAKER stands on a busy Indian street pointing firmly down at the ground beside his feet. Camera: medium shot.", ["SPEAKER"]),
    S("सब कुछ माइंड में है।", "Cutaway of a human head in profile: inside the brain, one half glows with a sunny golden heaven, the other half a stormy dark red hell. Camera: side view, surreal."),
    S("आप इस पूरी ब्रह्मांड में", "A vast starry galaxy with a tiny blue Earth, a single tiny glowing person standing on it. Camera: very wide, cosmic."),
    S("सिर्फ यही कुछ सालों के लिए आए हैं।", "A large old hourglass with a tiny person sitting inside the top half as golden sand runs down. Camera: medium, symbolic."),
    S("इसके बाद आपका कोई अंश नहीं रहेगा।", "Footprints in wet beach sand being washed away by a gentle wave at sunset, no one in sight. Camera: close-up, melancholic."),
    S("ये मैं बड़ा कॉन्फिडेंट हूँ,", "SPEAKER stands with arms crossed and a calm, confident smile, one eyebrow raised. Camera: medium close-up.", ["SPEAKER"]),
    S("मैंने बहुत साइंस की", "SPEAKER stands proudly beside a tall wooden bookshelf packed with thick science books, an atom model and a small telescope on top. Camera: medium-wide.", ["SPEAKER"]),
    S("किताबें पढ़ी हैं।", "SPEAKER at a desk piled high with open science books, reading intently under a lamp, glasses on his nose. Camera: medium shot.", ["SPEAKER"]),
    S("अब वो कहते हैं", "ASTROLOGER sits cross-legged under a small canopy wagging a finger knowingly at the viewer. Camera: medium shot.", ["ASTROLOGER"]),
    S("कि आपके पुराने कर्म अच्छे नहीं थे,", "A thick dusty old ledger book lying open, its blank pages covered in big red cross marks, glowing ominously. Camera: close-up."),
    S("इसलिए आपका ये जीवन खराब हुआ है।", "MAN sits sadly on a broken cot in a small run-down room, rain leaking from the roof into a steel bucket. Camera: medium-wide, gloomy.", ["MAN"]),
    S("आप अच्छे कर्म इस उस में करो,", "MAN anxiously feeding a cow, lighting diyas and handing coins to beggars all at once, sweating, in a busy temple street. Camera: medium-wide, comedic.", ["MAN"]),
    S("अगला जन्म आपका अच्छा होएगा।", "A dreamy pink cloud showing a baby in a golden cradle inside a palace. Camera: medium, dreamy soft light."),
    S("ये सब पागलपन है।", "SPEAKER facepalms and shakes his head, exasperated. Camera: medium close-up.", ["SPEAKER"]),
    S("और ये सब है ना,", "SPEAKER leans forward and points straight at the viewer, serious eyebrows. Camera: close-up.", ["SPEAKER"]),
    S("आपको डराने के लिए बनाया गया है", "MAN cowers in fear as a huge dark shadow monster with glowing eyes looms over him. Camera: low angle, dramatic.", ["MAN"]),
    S("और आपको कम्प्लेसेंट बनाने के लिए", "MAN lounges lazily on a sagging sofa with chips and a TV remote, half asleep, dust settling. Camera: medium shot.", ["MAN"]),
    S("ताकि आप एक्शन मत लो।", "MAN's ankles chained to the sofa while through the window opportunities pass by as glowing doors floating away. Camera: medium-wide, symbolic.", ["MAN"]),
    S("वो ये कहते हैं, कोई बात नहीं,", "ASTROLOGER pats MAN's shoulder with a comforting, sly smile. Camera: medium shot.", ["ASTROLOGER", "MAN"]),
    S("इस जन्म में नहीं हुआ, अगले जन्म में।", "MAN sadly packs a glowing dream-balloon of a trophy into a dusty box and pushes it onto a high shelf for later. Camera: medium shot.", ["MAN"]),
    S("सात जन्मों का रिश्ता!", "An Indian wedding: MAN in a cream sherwani and WIFE in a red lehenga walking around the sacred fire, seven glowing rings of light circling them. Camera: wide, warm firelight.", ["MAN", "WIFE"]),
    S("अरे, इस जन्म में तो", "SPEAKER throws up one hand with an amused, exasperated grin. Camera: medium close-up.", ["SPEAKER"]),
    S("लॉयल्टी के साथ अपनी वाइफ के साथ रह लो,", "MAN and WIFE sit together on a small balcony at sunset holding hands, cups of chai, laughing. Camera: medium shot, warm light.", ["MAN", "WIFE"]),
    S("सात जन्मों का तो बाद में देखेंगे।", "SPEAKER shrugs with a cheeky grin, waving the idea away with one hand. Camera: medium shot.", ["SPEAKER"]),
    S("तो मैं हमेशा ये कहता हूँ,", "SPEAKER on a stage speaking into a microphone, a large attentive audience in soft light. Camera: wide from the back of the hall.", ["SPEAKER"]),
    S("यही जन्म है,", "MAN stands on a hilltop at sunrise with arms spread wide, breathing deeply. Camera: wide, golden light.", ["MAN"]),
    S("यही स्वर्ग है,", "A family laughing together around a simple dinner table at home, warm yellow light. Camera: medium-wide, cosy."),
    S("यही नर्क है।", "A chaotic traffic jam on a hot city road, angry drivers honking, smoke and dust. Camera: wide, harsh light."),
    S("आप हर दिन सुबह उठिए।", "MAN wakes up stretching happily in bed as morning sunlight streams through the window. Camera: medium shot.", ["MAN"]),
    S("आपको पता है {1,72,000|एक लाख बहत्तर हज़ार} लोग", "A huge sea of tiny people seen from high above, stretching to the horizon. Camera: aerial, wide."),
    S("अगले दिन का सूरज नहीं देखते?", "An empty park bench facing a beautiful sunrise over the sea, a single fallen leaf on it. Camera: wide, quiet."),
    S("हर दिन {1,72,000|एक लाख बहत्तर हज़ार} लोग", "Rows and rows of small lit candles at dusk stretching far into the distance. Camera: wide, quiet."),
    S("मरते हैं।", "Close-up of a few small candles gently going out, thin wisps of smoke rising. Camera: close-up, sombre, not graphic."),
    S("आप उसी में खुश रहिए", "MAN smiles peacefully sipping chai by a window, birds outside. Camera: medium close-up.", ["MAN"]),
    S("कि आपको एक नया सूरज देखने का मौका मिला", "MAN on a rooftop watching a glowing new sunrise over the city, arms open, eyes closed. Camera: wide from behind.", ["MAN"]),
    S("एंड उसमें आप स्वर्ग बनाइए।", "MAN and WIFE planting flowers in a small garden that glows with golden light, children playing nearby. Camera: medium-wide.", ["MAN", "WIFE"]),
    S("Your present is your best present,", "A gift box opening with a warm glowing sunrise bursting out of it. Camera: close-up, magical."),
    S("make the best out of it", "MAN running energetically up a long flight of steps toward the bright sky, determined face. Camera: low angle, dynamic.", ["MAN"]),
    S("and don't fall", "MAN stops at the edge of a deep muddy pit, one foot raised, catching himself just in time. Camera: medium shot.", ["MAN"]),
    S("into the crap of", "Inside the muddy pit: torn blank star charts, crystal balls and dusty astrology books sinking in mud. Camera: top-down."),
    S("कि ये जन्म होगा,", "ASTROLOGER points dramatically at a dreamy cloud showing another life. Camera: medium shot.", ["ASTROLOGER"]),
    S("ये नर्क है,", "A small cartoon fiery hell gate on one side of a road, flames and smoke. Camera: medium."),
    S("ये स्वर्ग है।", "MAN walks away from a golden heaven gate and a fiery hell gate on either side of the road, toward a real sunny city ahead. Camera: wide from behind.", ["MAN"]),
]


def prompt(line, chars, desc):
    parts = [STYLE]
    if chars:
        parts.append("CHARACTERS:\n" + "\n".join(CHARACTERS[c] for c in chars))
    parts.append("SCENE: " + desc)
    parts.append(f'NARRATION FOR THIS IMAGE: "{line}". The picture must show literally and clearly what these '
                 "words say. Do not write these words or any text in the image.")
    parts.append(AVOID)
    return "\n\n".join(parts)


if __name__ == "__main__":
    md = ["# नर्क और स्वर्ग सब यही है: Scene Prompts\n"]
    scenes = []
    for k, (line, chars, desc) in enumerate(SCENES, 1):
        md += [f"## Scene {k}\n", f"> {line}\n", "```", prompt(line, chars, desc), "```\n"]
        scenes.append({"line": convert(line)[0], "image": f"scene_{k:02d}.jpg"})
    (HERE / "swarg-prompts.md").write_text("\n".join(md), encoding="utf-8")
    (ROOT / "projects/swarg/scenes.json").write_text(json.dumps(scenes, ensure_ascii=False, indent=1), encoding="utf-8")
    print(len(SCENES), "scenes")
