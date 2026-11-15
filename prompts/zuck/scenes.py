"""Why Zuckerberg Can Never Be Fired -> 81 scene prompts (Jensen reel style). Usage: python prompts/zuck/scenes.py"""
import json, re
from pathlib import Path
HERE = Path(__file__).parent; ROOT = HERE.parent.parent; NAME = "zuck"
STYLE = ("Original fictional characters only, not real people. Flat 2D cartoon illustration, square 1:1, full-bleed. Thick clean black outlines, simple cel shading, "
         "slightly muted palette of teal-grey, slate blue and warm orange, cinematic lighting. Caricature characters "
         "with big heads, warm orange-tan skin, small black dot eyes, rosy cheeks, expressive eyebrows. Detailed "
         "illustrated backgrounds. NO text, letters, numbers or logos anywhere.")
C = {"Z": "THE FOUNDER: young-looking tech CEO with short curly brown hair cropped close, pale skin, wide eyes, plain grey t-shirt.",
     "Y": "YOUNG FOUNDER: college-age version of THE FOUNDER, short curly brown hair, grey hoodie, flip-flops.",
     "J": "OLD CEO: older East Asian man, swept-back silver-grey hair, black leather biker jacket, black t-shirt.",
     "S": "OUSTED CEO: 1980s slim man with dark hair, round glasses, dark suit and bow tie.",
     "I": "INVESTORS: middle-aged men in navy suits and ties, stern faces."}
S = lambda line, desc, ch="": (line, desc, ch)
SCENES = [
 S("Like Jensen,", "HOOK, DRAMATIC split image: left, OLD CEO walking out of a dark office carrying a cardboard box under a red spotlight; right, THE FOUNDER sitting calmly on a huge golden throne under bright light, smirking. Strong contrast.", "JZ"),
 S("Mark Zuckerberg can", "THE FOUNDER standing confidently in a glass-walled tech office, arms crossed.", "Z"),
 S("never be ousted from", "Shadowy investors pushing hard against a huge locked steel door with THE FOUNDER behind it, unbothered.", "ZI"),
 S("his company. Because in", "A giant modern tech campus with blue glass buildings and a big thumbs-up shaped sculpture (no text).", ""),
 S("{2006,|two thousand six}", "A small messy college dorm-style office in 2006, old laptops and pizza boxes.", ""),
 S("Yahoo made an offer", "A executive in a purple suit sliding a giant cheque across a table (no readable text).", ""),
 S("to buy Facebook", "YOUNG FOUNDER staring at the giant cheque with wide eyes.", "Y"),
 S("for {1|one} billion dollars.", "A mountain of gold coins and cash stacks glowing on a desk.", ""),
 S("At that time, all", "A long boardroom table full of INVESTORS turning to look at YOUNG FOUNDER.", "YI"),
 S("the board investors", "Close-up of INVESTORS leaning in, greedy eyes, rubbing hands.", "I"),
 S("pressured Zuckerberg", "INVESTORS crowding around YOUNG FOUNDER pointing at the cheque, YOUNG FOUNDER sweating.", "YI"),
 S("to sell Facebook.", "A hand pushing a pen toward YOUNG FOUNDER across a contract (no readable text).", "Y"),
 S("But Zuckerberg understood", "YOUNG FOUNDER narrowing his eyes, a small lightbulb glowing above him.", "Y"),
 S("right then", "Close-up of YOUNG FOUNDER's determined face, dramatic side light.", "Y"),
 S("that if he didn't take", "YOUNG FOUNDER reaching out to grab a glowing steering wheel.", "Y"),
 S("voting control into", "Many small ballot cards flying into a glowing ballot box.", ""),
 S("his own hands,", "YOUNG FOUNDER holding the glowing ballot box tightly in both hands.", "Y"),
 S("the same thing would", "A thought bubble above YOUNG FOUNDER showing a shadowy boardroom.", "Y"),
 S("happen to him as happened", "Old 1985 boardroom in sepia tones, INVESTORS pointing to the door.", "I"),
 S("to Steve Jobs.", "OUSTED CEO sadly walking out of an office with a cardboard box, sepia tones.", "S"),
 S("So, he created", "THE FOUNDER at a whiteboard drawing a plan, focused.", "Z"),
 S("a system back", "A blueprint of a fortress-like company structure glowing on a desk.", ""),
 S("then, and divided", "A big pie of shares being cut into two pieces by a giant knife.", ""),
 S("all the shares into", "Hundreds of share certificates pouring out of a vault.", ""),
 S("two classes:", "Two big glass jars side by side on a table, one blue and one gold.", ""),
 S("Class {A|a}", "The blue jar filled with many small grey coins, spotlight on it.", ""),
 S("and Class {B|b}.", "The gold jar filled with a few huge glowing golden coins, spotlight on it.", ""),
 S("In Class {A|a},", "A crowd of ordinary people walking toward the blue jar.", ""),
 S("there is the general", "Ordinary people of all ages holding small grey coins.", ""),
 S("public and big", "Ordinary people standing next to giant INVESTORS in suits.", "I"),
 S("investors, where", "INVESTORS carrying briefcases full of grey coins.", "I"),
 S("one share is equal", "One grey coin on a scale balanced with one small ballot card.", ""),
 S("to one vote.", "A person dropping one ballot card into a ballot box.", ""),
 S("Second is", "Camera moving to the glowing gold jar.", ""),
 S("Class {B|b}.", "The gold jar glowing brightly on a pedestal like a treasure.", ""),
 S("In this, nearly", "THE FOUNDER reaching into the gold jar.", "Z"),
 S("{99.8%|ninety nine point eight percent}", "THE FOUNDER hugging almost the entire pile of giant golden coins, only a tiny sliver left outside.", "Z"),
 S("of the shares belong to Mark", "THE FOUNDER sitting on top of the pile of golden coins.", "Z"),
 S("Zuckerberg alone,", "THE FOUNDER alone in a huge vault full of gold, smiling.", "Z"),
 S("and in this class,", "A single golden coin glowing under a spotlight.", ""),
 S("one share is worth", "One golden coin on a scale outweighing a stack of grey coins.", ""),
 S("{10|ten} times more.", "One golden coin on a balance scale, ten grey coins on the other side, balanced.", ""),
 S("Meaning one share", "THE FOUNDER holding up one golden coin.", "Z"),
 S("equals {10|ten} votes.", "One golden coin splitting into ten glowing ballot cards.", ""),
 S("Now, Zuckerberg", "THE FOUNDER in a modern social-media-company office with a blue infinity-shaped sculpture (no text).", "Z"),
 S("owns only a", "A big pie chart where THE FOUNDER holds only a small slice.", "Z"),
 S("{13.4%|thirteen point four percent}", "Close-up of the small pie slice in THE FOUNDER's hand, the rest of the pie huge.", "Z"),
 S("stake in Meta,", "A tall glass skyscraper with a blue infinity-loop sculpture on top (no text).", ""),
 S("but because of the {10|ten}", "Ten glowing ballot cards orbiting a golden coin.", ""),
 S("votes per share", "A huge stack of ballot cards towering over THE FOUNDER.", "Z"),
 S("structure,", "A glowing pyramid-shaped structure diagram made of coins and ballots.", ""),
 S("he holds a total of", "THE FOUNDER standing on a big podium holding a giant glowing ballot box.", "Z"),
 S("{61%|sixty one percent}", "A huge voting meter with a needle pointing well past the middle, glowing gold.", ""),
 S("of the voting rights.", "THE FOUNDER raising one hand while giant ballot cards rain down around him.", "Z"),
 S("To make any", "A boardroom with a big red button labelled with a star icon (no text).", ""),
 S("major decision", "A gavel about to strike a wooden block.", ""),
 S("in the company,", "A long board meeting table in a sleek tech office.", ""),
 S("more than {50%|fifty percent}", "A balance scale with exactly half on each side, one side starting to tip.", ""),
 S("of the votes are required,", "A ballot box with a glowing line marking the halfway level.", ""),
 S("whereas Zuckerberg", "THE FOUNDER casually leaning on the ballot box.", "Z"),
 S("himself holds", "THE FOUNDER holding the voting meter needle with one finger.", "Z"),
 S("{61%.|sixty one percent}", "The voting meter needle locked past the middle, THE FOUNDER smiling.", "Z"),
 S("This means that even", "INVESTORS gathering into a big group, rolling up their sleeves.", "I"),
 S("if all the investors", "A huge crowd of INVESTORS marching together toward a tower.", "I"),
 S("come together,", "INVESTORS linking arms, pushing against a giant door.", "I"),
 S("they cannot oust", "INVESTORS bouncing off a glowing force field around THE FOUNDER.", "ZI"),
 S("Zuckerberg", "THE FOUNDER calmly sipping coffee behind the force field.", "Z"),
 S("from Meta.", "The blue infinity-loop tower standing tall, unshaken.", ""),
 S("On the contrary,", "A dramatic reversal: THE FOUNDER now standing above the INVESTORS on a raised platform.", "ZI"),
 S("Zuckerberg", "THE FOUNDER sitting in a big chair at the head of the board table.", "Z"),
 S("himself decides", "THE FOUNDER pointing at board seats, some empty.", "Z"),
 S("who stays on the board", "One investor happily keeping his chair, given a thumbs up by THE FOUNDER.", "ZI"),
 S("and who doesn't.", "One investor's chair being pulled away, the investor shocked.", "I"),
 S("And this was his", "YOUNG FOUNDER and present-day THE FOUNDER side by side, both smiling.", "YZ"),
 S("brilliant future", "THE FOUNDER playing chess, about to make a winning move.", "Z"),
 S("planning.", "A chessboard with a king piece standing alone, crowned and glowing.", ""),
 S("Who do you want to learn", "A big glowing question mark over a crowd of curious people.", ""),
 S("about next?", "Silhouettes of famous CEOs in a row behind a curtain.", ""),
 S("Let me know in the comments.", "Many speech bubbles floating above a phone screen (no text).", ""),
 S("See you in the next", "THE FOUNDER waving goodbye in front of the glass tower.", "Z"),
 S("video, bye.", "The glass tower at sunset, warm golden light.", ""),
]
if __name__ == "__main__":
    disp = lambda l: re.sub(r"\{([^|{}]+)\|[^{}]+\}", r"\1", l)
    (ROOT / f"projects/{NAME}/scenes.json").write_text(json.dumps(
        [{"line": l, "image": f"{k:03d}.png"} for k, (l, _, _) in enumerate(SCENES, 1)], indent=1))
    out = [f"# Why Zuckerberg Can Never Be Fired: image prompts ({len(SCENES)})", "",
           "Generate each as a square (1:1) image. Save as `001.png`, `002.png`, ... in order.", ""]
    for k, (l, d, ch) in enumerate(SCENES, 1):
        p = STYLE + ("" if ch else " NO people unless described.") + "\n\nScene: " + d + ("\n" + " ".join(C[c] for c in ch) if ch else "")
        out += [f"## {k:03d}  ·  \"{disp(l)}\"", "", "```", p, "```", ""]
    (ROOT / f"projects/{NAME}/image_prompts.md").write_text("\n".join(out))
    print(len(SCENES))
