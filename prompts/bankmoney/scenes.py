"""How banks create money -> scene prompts (Jensen reel style)."""
import json, re
from pathlib import Path
HERE = Path(__file__).parent; ROOT = HERE.parent.parent; NAME = "bankmoney"
STYLE = ("Flat 2D cartoon illustration, square 1:1, full-bleed. Thick clean black outlines, simple cel shading, "
         "slightly muted palette of teal-grey, slate blue and warm orange, cinematic lighting. Caricature characters "
         "with big heads, warm orange-tan skin, small black dot eyes, rosy cheeks, expressive eyebrows. Detailed "
         "illustrated backgrounds. NO text, letters, numbers or logos anywhere.")
C = {"Y": "SAVER: young man, short brown hair, green hoodie.",
     "K": "BANKER: chubby bald man with a grey moustache, navy pinstripe suit, gold tie.",
     "B": "BORROWER: woman with a curly black ponytail, yellow jacket.",
     "S": "CAR SELLER: lanky man with slicked hair, checked blazer, big grin."}
S = lambda line, desc, ch="": (line, desc, ch)
SCENES = [
 S("If you deposit", "HOOK, DRAMATIC: a giant bank vault door bursting open, a tidal wave of glowing banknotes multiplying and pouring out over a tiny shocked SAVER, dramatic orange light.", "Y"),
 S("{$10,000|ten thousand dollars}", "SAVER proudly holding a thick stack of banknotes at a bank counter.", "Y"),
 S("into the bank,", "Grand old bank hall with marble columns, SAVER handing cash to BANKER.", "YK"),
 S("the bank sets aside", "BANKER placing a small pile of cash into a tiny safe.", "K"),
 S("{10%,|ten percent}", "A cash pile with one small slice cut off like a pie.", ""),
 S("or {$1,000,|one thousand dollars}", "A single small stack of notes sitting alone in a big empty vault.", ""),
 S("and then loans out", "BANKER sliding the big remaining pile of cash across his desk with a sly smile.", "K"),
 S("the rest of your money.", "SAVER's stack of money flying out the bank window, SAVER shocked.", "Y"),
 S("The way it works is,", "BANKER pointing at a big chalkboard with arrows and coins (no text).", "K"),
 S("say another person", "BORROWER walking through the bank doors.", "B"),
 S("comes into the bank", "BORROWER at the bank counter, hopeful.", "BK"),
 S("and asks for a car loan", "BORROWER holding a picture of a shiny red car, pleading.", "B"),
 S("of {$9,000.|nine thousand dollars}", "BANKER counting out a thick pile of cash.", "K"),
 S("At this moment,", "A big clock on the bank wall, tense moment.", ""),
 S("the bank loans out", "BANKER handing BORROWER the pile of cash.", "KB"),
 S("the {$9,000|nine thousand dollars}", "BORROWER hugging the stack of money, delighted.", "B"),
 S("from your original deposit.", "SAVER's money with a little green hoodie tag being handed away.", ""),
 S("It isn't there anymore.", "SAVER peering into an empty vault drawer, cobwebs, confused.", "Y"),
 S("The borrower then pays", "BORROWER handing the cash to CAR SELLER at a car lot.", "BS"),
 S("the person selling the car,", "CAR SELLER grinning beside a shiny red car with a bow.", "S"),
 S("and they go deposit", "CAR SELLER walking happily into a second bank with the cash.", "S"),
 S("the money into another bank,", "A second bank building across the street, slightly different colour.", ""),
 S("which is part of", "Several bank buildings connected by glowing golden pipes.", ""),
 S("the same central", "A giant central bank building towering over the small banks.", ""),
 S("banking system.", "A huge network of banks linked like a web of golden lines over a city.", ""),
 S("This {$9,000|nine thousand dollars}", "The stack of cash glowing in a new vault.", ""),
 S("is treated as", "A second banker stamping a deposit slip (no text) with a smile.", ""),
 S("a new deposit,", "Fresh cash being placed into a shiny new vault.", ""),
 S("and the process continues.", "A spinning loop of cash going from bank to borrower to bank.", ""),
 S("The money gets redeposited", "Cash flying into a bank vault, then out again.", ""),
 S("and reloaned", "Many borrowers in a line receiving cash.", ""),
 S("until the initial deposit", "SAVER's original small stack of cash glowing on a table.", "Y"),
 S("of {$10,000|ten thousand dollars}", "The stack beginning to multiply like cells.", ""),
 S("becomes", "Piles of money growing taller and taller.", ""),
 S("{$100,000.|one hundred thousand dollars}", "A mountain of banknotes towering over the city.", ""),
 S("The banking system", "BANKER as a magician in a top hat over the money mountain.", "K"),
 S("just created", "BANKER pulling endless banknotes out of a top hat like a magic trick.", "K"),
 S("{$90,000|ninety thousand dollars}", "Banknotes raining from the sky over the city.", ""),
 S("by loaning out", "BANKER winking, holding a fan of cash.", "K"),
 S("your money.", "SAVER staring at an empty wallet, shocked.", "Y"),
]
if __name__ == "__main__":
    disp = lambda l: re.sub(r"\{([^|{}]+)\|[^{}]+\}", r"\1", l)
    (ROOT / f"projects/{NAME}/scenes.json").write_text(json.dumps(
        [{"line": l, "image": f"{k:03d}.png"} for k, (l, _, _) in enumerate(SCENES, 1)], indent=1))
    out = [f"# How Banks Create Money: image prompts ({len(SCENES)})", "",
           "Generate each as a square (1:1) image. Save as `001.png`, `002.png`, ... in order.", ""]
    for k, (l, d, ch) in enumerate(SCENES, 1):
        p = STYLE + ("" if ch else " NO people unless described.") + "\n\nScene: " + d + ("\n" + " ".join(C[c] for c in ch) if ch else "")
        out += [f"## {k:03d}  ·  \"{disp(l)}\"", "", "```", p, "```", ""]
    (ROOT / f"projects/{NAME}/image_prompts.md").write_text("\n".join(out))
    print(len(SCENES))
