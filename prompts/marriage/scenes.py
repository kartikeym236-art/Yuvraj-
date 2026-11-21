"""History of marriage -> 16:9 prompts."""
import json
from pathlib import Path
ROOT = Path(__file__).resolve().parents[2]; NAME = "marriage"
STYLE = ("Square 1:1 flat 2D cartoon illustration, full-bleed. Clean, smooth black ink outlines of even medium thickness, flat colours "
         "with soft simple shading. Characters are simple stick-figure people: a large perfectly round SOLID WHITE head with no skin colour, "
         "two small black oval dot eyes, short simple eyebrows for emotion, a tiny mouth line, NO nose; thin black stick arms and legs, small "
         "white mitten hands; simple flat clothes on a small torso. Backgrounds are detailed, clean flat-colour cartoon environments with simple perspective, warm natural colours. "
         "NO text, letters, numbers or logos anywhere.")
C = {"M": "THE MAN: stick figure with a solid white round head, short black hair, blue t-shirt, grey trousers.",
     "W": "THE WOMAN: stick figure with a solid white round head, long dark-brown hair, light pink t-shirt and grey trousers.",
     "C": "CAVE PEOPLE: stick figures with solid white round heads, messy brown hair, ragged brown animal-skin clothes.",
     "B": "THE BABY: tiny stick-figure baby with a solid white round head, wrapped in a cloth."}
S = lambda l, d, c="": (l, d, c)
SCENES = [
 S("If children can be born out of wedlock", "THE WOMAN holding THE BABY, smiling, in a cosy living room.", "WB"),
 S("and love can happen without marriage,", "THE MAN and THE WOMAN holding hands on a park bench, no rings.", "MW"),
 S("why did humans create the institution of marriage", "A grand old wedding hall with an empty decorated stage.", ""),
 S("in the first place?", "THE MAN scratching his head, a question mark above.", "M"),
 S("The concept of marriage is found", "A world map with small wedding rings scattered across continents (no text).", ""),
 S("in almost every religion across the world.", "A temple, a church and a mosque side by side on a hill.", ""),
 S("Do you know why?", "THE MAN looking at the viewer, one eyebrow raised.", "M"),
 S("Because marriage did not originate", "An old stone carving of two figures holding hands.", ""),
 S("for the sake of love.", "A red heart crossed out with a simple X.", ""),
 S("Centuries ago, when humans lived in the wild,", "CAVE PEOPLE walking across a wild grassland with spears.", "C"),
 S("the biggest challenge was not romance.", "A caveman offering a flower to a cavewoman, who ignores it.", "C"),
 S("It was survival.", "CAVE PEOPLE running from a sabre-toothed tiger.", "C"),
 S("Questions like:", "A caveman sitting on a rock, hand on chin, thinking hard.", "C"),
 S("Who will take responsibility for the children?", "A cave with several small cave children sitting alone by a fire.", "C"),
 S("How will the family survive?", "A cave family huddled together in the rain.", "C"),
 S("And how will stability be maintained in society?", "A chaotic group of CAVE PEOPLE arguing and pushing each other.", "C"),
 S("When humans lived in small groups,", "A small tribe of CAVE PEOPLE around a campfire at night.", "C"),
 S("attraction was completely natural,", "A caveman and a cavewoman smiling shyly at each other across the fire.", "C"),
 S("and the obvious result of attraction was children.", "A cavewoman holding a newborn baby in a cave.", "C"),
 S("Unlike other animals,", "A baby deer standing on wobbly legs next to its mother in a meadow.", ""),
 S("a human baby cannot start walking right after birth;", "A tiny human baby lying on a fur blanket, unable to stand.", ""),
 S("it takes years to grow up.", "The same child shown growing from baby to toddler to child, side by side.", ""),
 S("If a man and a woman did not commit to staying together,", "A caveman walking away from a cavewoman and baby.", "C"),
 S("a mother alone could not protect her child", "A cavewoman alone holding her baby, looking worried in a dark forest.", "C"),
 S("from the dangers of the wild.", "Glowing wolf eyes in the bushes watching a mother and baby.", ""),
 S("Therefore, marriage was not a symbol of love;", "Two cave people tying their hands together with a vine, serious faces.", "C"),
 S("it was an {age-old|age old} strategy for survival", "A cave family building a strong hut together.", "C"),
 S("and economic security,", "A cave family storing food and furs in their hut.", "C"),
 S("ensuring society did not descend into chaos", "A peaceful early village with many huts and families.", ""),
 S("and children had a safe roof over their heads.", "Children sleeping safely inside a hut while rain falls outside.", ""),
 S("Today, however, there are no jungles to survive,", "A modern city skyline at sunset.", ""),
 S("women earn their own living,", "THE WOMAN working confidently at a laptop in an office.", "W"),
 S("and {live-in|live in} relationships exist.", "THE MAN and THE WOMAN cooking together in a shared apartment.", "MW"),
 S("So why still get married?", "THE MAN looking at a small ring box, thinking.", "M"),
 S("Because today, emotional,", "THE WOMAN looking sad at a window in the rain.", "W"),
 S("legal,", "A thick stack of legal papers on a desk with a pen.", ""),
 S("and financial complexities are far greater.", "A tangle of bills, house keys and a bank card on a table.", ""),
 S("The purpose of marriage is not merely to celebrate love,", "A wedding party with confetti and music.", ""),
 S("but to transform love into responsibility.", "THE MAN and THE WOMAN carrying a heavy box together into a new home.", "MW"),
 S("This is why Hindu tradition never viewed marriage", "A traditional Indian courtyard decorated with marigold garlands.", ""),
 S("as a mere contract;", "A plain paper contract being torn in half.", ""),
 S("instead, marriage was regarded as a sacred rite,", "A sacred fire burning in a small brick fire altar, with flowers around it.", ""),
 S("a samskara.", "A priest stick figure with a solid white head chanting beside the sacred fire.", ""),
 S("Here, marriage does not just mean living together;", "THE MAN and THE WOMAN sitting on a sofa watching TV.", "MW"),
 S("it signifies two people embarking together on the journey", "THE MAN and THE WOMAN in Indian wedding clothes walking hand in hand on a long path.", "MW"),
 S("of Dharma,", "The couple standing before a glowing oil lamp, hands joined.", "MW"),
 S("Artha,", "The couple working together in a small shop, coins on the counter.", "MW"),
 S("Kama,", "The couple smiling at each other under a flowering tree.", "MW"),
 S("and Moksha.", "The couple as an old pair sitting peacefully by a river at sunrise.", "MW"),
 S("That is why in a Hindu wedding,", "THE MAN and THE WOMAN in red and gold wedding clothes walking around the sacred fire.", "MW"),
 S("people do not merely become husband and wife.", "The couple exchanging flower garlands.", "MW"),
 S("Two families and two lineages unite.", "Two big families of stick figures hugging each other at the wedding.", ""),
 S("The sad reality is that today,", "THE MAN sitting alone, looking at his phone with a sad face.", "M"),
 S("people have started viewing marriage merely as an event,", "A flashy wedding stage with cameras and lights, guests taking selfies.", ""),
 S("whereas in earlier times,", "An old faded photo-like scene of a simple village wedding.", ""),
 S("it was seen as a lifelong responsibility.", "An old couple holding hands on a porch, many years together.", ""),
 S("Now, tell me in the comments:", "THE MAN pointing at the viewer with a friendly smile.", "M"),
 S("if the concept of marriage were to vanish from the world tomorrow,", "Wedding rings dissolving into dust in the wind.", ""),
 S("would love and families survive,", "A happy family having dinner together.", ""),
 S("or would society gradually begin to crumble?", "A city of houses cracking and crumbling.", ""),
 S("Share this video with friends", "THE MAN showing his phone to two friends.", "M"),
 S("who don't want to get married,", "A friend stick figure crossing his arms, shaking his head at a wedding card.", ""),
 S("and be sure to follow me", "THE MAN waving goodbye cheerfully.", "M"),
 S("for more videos like this.", "THE MAN and THE WOMAN waving together at sunset.", "MW"),
 S("", "", ""),
]
SCENES = [s for s in SCENES if s[0]]
if __name__ == "__main__":
    import re
    disp = lambda l: re.sub(r"\{([^|{}]+)\|[^{}]+\}", r"\1", l)
    (ROOT/f"projects/{NAME}/scenes.json").write_text(json.dumps([{"line": l, "image": f"{k:03d}.png"} for k,(l,_,_) in enumerate(SCENES,1)], indent=1))
    pos = ["TOP-LEFT", "TOP-RIGHT", "BOTTOM-LEFT", "BOTTOM-RIGHT"]
    out = [f"# The History of Marriage: 2x2 grid prompts ({len(SCENES)//4} images = {len(SCENES)} scenes)", "",
           "Each prompt makes ONE square 1:1 image split into a 2x2 grid of four square panels. Save as `01.png`, `02.png`, ... in order.", ""]
    for g in range(len(SCENES)//4):
        chars = "".join(dict.fromkeys("".join(SCENES[g*4+k][2] for k in range(4))))
        p = ["FORMAT: ONE single square 1:1 image divided into a 2x2 GRID of FOUR equal square panels, separated only by thin straight uniform white "
             "gutter lines; no outer border, no panel numbers. Each panel is a separate full-bleed illustration with its own composition. All four "
             "panels share exactly the same art style, character designs, colours and lighting.", "", "STYLE: " + STYLE.replace("Square 1:1 flat", "Flat"), ""]
        if chars: p += ["CHARACTERS (identical in every panel):"] + ["- " + C[c] for c in chars] + [""]
        for k in range(4):
            l, d, c = SCENES[g*4+k]; p.append(f"PANEL {k+1} ({pos[k]}): {d}" + ("" if c else " No people unless described."))
        out += [f"## {g+1:02d}  ·  scenes {g*4+1}-{g*4+4}", ""] + [f"- {pos[k].lower()}: \"{disp(SCENES[g*4+k][0])}\"" for k in range(4)] + ["", "```", "\n".join(p), "```", ""]
    (ROOT/f"projects/{NAME}/image_prompts.md").write_text("\n".join(out)); print(len(SCENES))
