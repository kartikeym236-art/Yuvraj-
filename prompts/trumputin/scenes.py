"""What if Trump and Putin were boyfriends -> scene prompts (Jensen reel style, satire, non-romantic-explicit)."""
import json, re
from pathlib import Path
HERE = Path(__file__).parent; ROOT = HERE.parent.parent; NAME = "trumputin"
STYLE = ("Original fictional characters only, not real people. Funny satirical flat 2D cartoon illustration, square 1:1, full-bleed. "
         "Thick clean black outlines, simple cel shading, palette of slate blue, teal and warm orange with pink heart accents. "
         "Caricature characters with big heads, small black dot eyes, expressive eyebrows. Detailed illustrated backgrounds. "
         "NO text, letters, numbers, flags with writing or logos anywhere.")
C = {"T": "BLOND LEADER: chubby older man, swept golden-blond hair, orange-tan skin, navy suit, very long red tie.",
     "P": "BALD LEADER: short older man, thinning light hair, pale skin, cold blue eyes, dark grey suit.",
     "Z": "GREEN LEADER: younger man, short dark hair and stubble, olive-green military t-shirt and cargo pants.",
     "E": "EUROPEAN LEADERS: a group of serious men and women in suits."}
S = lambda line, desc, ch="": (line, desc, ch)
SCENES = [
 S("What if", "HOOK, DRAMATIC: BLOND LEADER and BALD LEADER holding hands on a balcony as fighter jets fly past and fireworks explode in pink heart shapes behind them.", "TP"),
 S("Donald Trump", "BLOND LEADER in close-up, winking, at a podium.", "T"),
 S("and Vladimir Putin", "BALD LEADER in close-up, a tiny shy smile, cheeks blushing.", "P"),
 S("became boyfriends?", "BLOND LEADER and BALD LEADER sharing one milkshake with two straws in a diner, hearts floating.", "TP"),
 S("First thing", "A big golden alarm bell ringing.", ""),
 S("that would happen is", "A world map table with leaders' pieces moving.", ""),
 S("that Russia", "A snowy Moscow-style skyline with colourful onion domes.", ""),
 S("and the {US|u s}", "A Washington-style white dome building under blue sky.", ""),
 S("would become friends,", "A huge handshake between two giant hands over the globe, hearts around.", ""),
 S("which would finally", "Soldiers lowering their weapons in a muddy trench, relieved.", ""),
 S("stop the war", "A tank with a flower sticking out of its barrel.", ""),
 S("in Ukraine.", "Golden wheat fields under a bright blue sky, peaceful.", ""),
 S("Zelenskyy", "GREEN LEADER looking at the couple from behind a pillar, curious.", "Z"),
 S("would now want", "GREEN LEADER raising his hand eagerly.", "Z"),
 S("to join the threesome,", "GREEN LEADER squeezing between BLOND LEADER and BALD LEADER on a park bench, all awkward smiles.", "TPZ"),
 S("and all of them", "The three leaders standing side by side, arms over shoulders, hearts above.", "TPZ"),
 S("would now combine", "Three giant puzzle pieces clicking together.", ""),
 S("their military forces", "Huge rows of tanks, jets and soldiers lining up together.", ""),
 S("that would result", "A huge army marching in formation under pink heart banners (no text).", ""),
 S("in them being the strongest", "The three leaders flexing muscles on top of a tank.", "TPZ"),
 S("alliance in the world.", "A giant globe with a pink heart shield around it.", ""),
 S("They would now try", "The three leaders leaning over a war map table, scheming.", "TPZ"),
 S("to defeat all of Europe", "A map of Europe with a dark shadow of a heart creeping over it (no text).", ""),
 S("that would start a war", "Two armies facing each other across a field, storm clouds.", ""),
 S("between {NATO|nay toe}", "A big blue army with jets and tanks, star shield emblems (no text).", ""),
 S("and the loving", "A pink army with heart-shaped shields and tanks.", ""),
 S("alliance.", "The three leaders on horseback in front of the pink army.", "TPZ"),
 S("The alliance would start", "Pink heart-decorated tanks rolling forward.", ""),
 S("by taking the Baltic", "Small coastal towns by a cold grey sea, pink tanks arriving.", ""),
 S("area and then proceed", "Pink army marching across a big map.", ""),
 S("to take on countries", "Pink paratroopers dropping from the sky.", ""),
 S("like Poland,", "A historic old city square with colourful houses and a pink flag going up.", ""),
 S("Moldova,", "Rolling vineyards with pink tanks parked between grape vines.", ""),
 S("and Romania.", "A spooky castle on a mountain with a pink heart flag on top.", ""),
 S("The rest of Europe", "EUROPEAN LEADERS around a big round table.", "E"),
 S("would now be furious", "EUROPEAN LEADERS shouting and slamming the table, steam from their ears.", "E"),
 S("and would combine", "EUROPEAN LEADERS stacking their hands together.", "E"),
 S("all of their forces", "A gigantic blue army of jets, ships and tanks gathering.", ""),
 S("to take down", "A big blue fist slamming down.", ""),
 S("the alliance.", "The three leaders sweating nervously.", "TPZ"),
 S("Both sides", "Split image: blue army on the left, pink army on the right.", ""),
 S("would be getting", "Soldiers loading cannons and polishing tanks.", ""),
 S("ready for war,", "Generals pointing at maps, jets taking off.", ""),
 S("and {NATO|nay toe}", "Blue fighter jets screaming across the sky.", ""),
 S("would take the first strike,", "Blue missiles flying toward the pink army, explosions.", ""),
 S("but the alliance", "The three leaders standing together in the smoke, unhurt, glowing.", "TPZ"),
 S("would charge the power", "The three leaders joining hands, a giant rainbow energy ball forming above them.", "TPZ"),
 S("of {LGBTQ|l g b t q}", "A huge rainbow beam blasting out across the sky.", ""),
 S("and would quickly", "Blue soldiers dropping weapons, dancing in rainbow light.", ""),
 S("gain control", "Rainbow light spreading over cities across Europe.", ""),
 S("over all of Europe.", "The three leaders standing on top of a giant globe, Europe glowing in rainbow colours, fireworks.", "TPZ"),
]
if __name__ == "__main__":
    disp = lambda l: re.sub(r"\{([^|{}]+)\|[^{}]+\}", r"\1", l)
    (ROOT / f"projects/{NAME}/scenes.json").write_text(json.dumps(
        [{"line": l, "image": f"{k:03d}.png"} for k, (l, _, _) in enumerate(SCENES, 1)], indent=1))
    out = [f"# What If Trump and Putin Were Boyfriends: image prompts ({len(SCENES)})", "",
           "Generate each as a square (1:1) image. Save as `001.png`, `002.png`, ... in order.", ""]
    for k, (l, d, ch) in enumerate(SCENES, 1):
        p = STYLE + ("" if ch else " NO people unless described.") + "\n\nScene: " + d + ("\n" + " ".join(C[c] for c in ch) if ch else "")
        out += [f"## {k:03d}  ·  \"{disp(l)}\"", "", "```", p, "```", ""]
    (ROOT / f"projects/{NAME}/image_prompts.md").write_text("\n".join(out))
    print(len(SCENES))
