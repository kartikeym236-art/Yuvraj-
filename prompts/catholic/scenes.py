"""Catholicism Explained script -> scene prompts + projects/catholic/scenes.json.

Usage: python prompts/catholic/scenes.py
"""
import json
from pathlib import Path

HERE = Path(__file__).parent
ROOT = HERE.parent.parent
NAME = "catholic"
CHARACTERS = {
    "BOY": ("NARRATOR BOY: Indian man in his early 20s, slim, big messy curly black hair, dot eyes, thick dark eyebrows, "
            "muted teal-green full-sleeve shirt, sleeves rolled, dark trousers."),
    "JESUS": ("JESUS: gentle man with long brown hair, short brown beard, kind eyes, white robe with a red sash, soft golden halo."),
    "POPE": ("POPE: elderly kind man with white hair and glasses, all-white papal cassock, white skullcap, gold cross on chest."),
    "PRIEST": ("PRIEST: middle-aged man, short dark hair, white and gold vestments over a black cassock."),
    "PETER": ("SAINT PETER: sturdy old fisherman with short curly grey hair and grey beard, brown and green robe, holding two big golden keys."),
    "MARY": ("MARY: gentle young woman with a soft face, white veil under a sky-blue mantle, soft golden halo."),
    "FATHER": ("GOD THE FATHER: majestic old man with long flowing white hair and beard, white robes, glowing light around him."),
}
S = lambda line, desc, chars=(): (line, list(chars), desc)
SCENES = [
    S("Imagine believing", "HOOK, MOST DRAMATIC: in a pitch-dark gothic cathedral, two hands raise a small round white communion wafer high, and it blazes with blinding golden light, rays bursting outward, dust glowing in the beams, deep red and gold contrast. Camera: low angle close-up, epic."),
    S("that a tiny piece", "Extreme close-up of a small round white communion wafer held between fingertips, glowing softly against a dark background. Camera: macro."),
    S("of bread is actually", "A single round white wafer resting on a shiny golden plate on an altar, candlelight. Camera: close-up."),
    S("the body of Jesus", "A glowing white wafer with a huge faint golden silhouette of JESUS with open arms rising out of its light. Camera: medium, mystical.", ["JESUS"]),
    S("Christ.", "JESUS with open arms, glowing golden halo, warm light behind him. Camera: medium.", ["JESUS"]),
    S("Not a symbol.", "NARRATOR BOY shaking his head and waving one hand no, serious face. Camera: medium.", ["BOY"]),
    S("Not a metaphor.", "NARRATOR BOY crossing both forearms in an X shape, firm expression. Camera: medium.", ["BOY"]),
    S("The actual body", "People kneeling in a candle-lit church as a priest lifts the glowing wafer above the altar. Camera: wide.", ["PRIEST"]),
    S("of Christ.", "Extreme close-up of the glowing wafer with a radiant golden cross of light behind it. Camera: close-up."),
    S("Sounds unbelievable?", "NARRATOR BOY with jaw dropped and eyes wide in disbelief. Camera: close-up.", ["BOY"]),
    S("Well, welcome to", "Huge wooden cathedral doors swinging open with brilliant golden light pouring out, NARRATOR BOY standing in front, small. Camera: wide.", ["BOY"]),
    S("Catholicism.", "Grand interior of a vast cathedral with tall columns, stained glass windows glowing, rows of pews. Camera: wide, awe-inspiring. NO people."),
    S("Catholicism is one", "Saint Peter's Basilica with its great dome under a golden sunset sky. Camera: wide. NO people."),
    S("of the oldest", "An ancient small stone church on a hill, weathered stones, old times. Camera: wide. NO people."),
    S("and largest branches", "A giant ancient tree with huge spreading branches, small churches resting along the branches. Camera: wide, symbolic. NO people."),
    S("of Christianity.", "A glowing cross at the base of a huge tree, its many branches spreading out across the sky. Camera: wide, symbolic. NO people."),
    S("Catholics believe", "A crowd of diverse people praying with folded hands in church pews, warm light. Camera: medium."),
    S("in one God", "A single brilliant beam of heavenly light breaking through dark clouds over the earth. Camera: wide. NO people."),
    S("who exists as three", "Three glowing golden rings of light interlocked in the sky above clouds. Camera: medium, symbolic. NO people."),
    S("persons:", "Three softly glowing figures standing side by side in light above the clouds, faces hidden by brightness. Camera: wide."),
    S("the Father,", "GOD THE FATHER seated on clouds with arms outstretched, radiant light. Camera: medium.", ["FATHER"]),
    S("the Son,", "JESUS standing on clouds with a calm smile, hand raised in blessing. Camera: medium.", ["JESUS"]),
    S("and the Holy Spirit.", "A pure white dove with wings spread, glowing with golden rays behind it. Camera: medium. NO people."),
    S("This is called the", "GOD THE FATHER and JESUS seated together on clouds with a white dove glowing between them. Camera: wide.", ["FATHER", "JESUS"]),
    S("Holy Trinity.", "A large glowing golden triangle of light in the sky with a white dove at the top. Camera: medium, symbolic. NO people."),
    S("And Jesus Christ?", "Close-up portrait of JESUS looking gently at the viewer, soft halo. Camera: close-up.", ["JESUS"]),
    S("Catholics believe", "An old woman kneeling in a church holding a rosary, eyes closed in prayer. Camera: medium."),
    S("he is the Son", "JESUS standing in a river while a beam of light and a white dove descend on him from the open sky. Camera: medium.", ["JESUS"]),
    S("of God, who died", "Three wooden crosses on a hill silhouetted against a dark stormy red sky. Camera: wide, dramatic. NO people."),
    S("for humanity's", "A huge crowd of people of all ages standing at the foot of a hill with a cross, looking up. Camera: wide."),
    S("sins and rose", "A rock tomb in a garden at dawn with the round stone rolled away and bright light pouring out. Camera: medium. NO people."),
    S("from the dead.", "JESUS rising in glowing white light from the open tomb, arms open, at sunrise. Camera: low angle.", ["JESUS"]),
    S("Now, here's where things", "NARRATOR BOY leaning toward the camera with one finger raised. Camera: medium close-up.", ["BOY"]),
    S("get interesting.", "NARRATOR BOY grinning with raised eyebrows, rubbing his hands. Camera: close-up.", ["BOY"]),
    S("Catholics have a special", "A huge crowd in Saint Peter's Square looking up at a balcony with red drapes. Camera: wide."),
    S("leader called", "A figure in white stepping out onto the balcony of Saint Peter's Basilica. Camera: medium."),
    S("the Pope.", "POPE in white waving warmly from the balcony with red drapes. Camera: medium.", ["POPE"]),
    S("He lives in Vatican", "Aerial view of Vatican City with Saint Peter's dome and the oval square. Camera: aerial. NO people."),
    S("City,", "Vatican gardens and old palaces inside high stone walls. Camera: wide. NO people."),
    S("a tiny independent", "A very small walled city seen from above, its walls clearly outlining it, Swiss Guard at the gate in striped uniform. Camera: aerial."),
    S("country surrounded", "Aerial view of the tiny walled Vatican surrounded on all sides by the sprawling city of Rome. Camera: aerial. NO people."),
    S("by Rome,", "The Colosseum and Roman rooftops at golden hour, Saint Peter's dome in the distance. Camera: wide. NO people."),
    S("Italy.", "A boot-shaped map of Italy on old parchment with a small gold star where Rome is. Camera: top-down. NO people."),
    S("The Pope is considered", "POPE seated on a carved wooden chair in a grand hall with frescoes. Camera: medium.", ["POPE"]),
    S("the successor", "A long line of old painted portraits of past popes on a palace wall. Camera: medium. NO people."),
    S("of Saint Peter,", "SAINT PETER standing on a rocky shore holding two big golden keys. Camera: medium.", ["PETER"]),
    S("whom Catholics", "Pilgrims touching the foot of a bronze statue of SAINT PETER in a basilica. Camera: medium.", ["PETER"]),
    S("believe Jesus", "JESUS speaking to SAINT PETER by the Sea of Galilee, fishing boats behind. Camera: medium.", ["JESUS", "PETER"]),
    S("appointed to lead", "JESUS handing two big golden keys to a kneeling SAINT PETER, light shining. Camera: medium.", ["JESUS", "PETER"]),
    S("his followers.", "SAINT PETER walking ahead on a dusty road leading a group of early followers in robes. Camera: wide.", ["PETER"]),
    S("Think of him as", "NARRATOR BOY with a hand on his chin, thinking, a small glowing thought cloud. Camera: medium.", ["BOY"]),
    S("the spiritual leader", "POPE raising his hand in blessing over a kneeling crowd. Camera: medium.", ["POPE"]),
    S("of the worldwide", "A glowing globe of the earth with tiny churches and lights spread across every continent. Camera: medium. NO people."),
    S("Catholic Church.", "POPE standing before a huge cheering crowd of people from many nations waving flags (no symbols readable). Camera: wide.", ["POPE"]),
    S("Catholics follow", "A family sitting together reading a big book at home in lamplight. Camera: medium."),
    S("the Bible, but", "A large old open Bible on a wooden stand glowing with soft light, pages fluttering. Camera: close-up. NO people."),
    S("they also follow", "NARRATOR BOY holding up two fingers, explaining. Camera: medium.", ["BOY"]),
    S("Sacred Tradition", "Monks in brown robes copying old manuscripts by candlelight in a stone monastery. Camera: medium."),
    S("and the teachings", "A bishop in red and white robes teaching a group of people in an old church. Camera: medium."),
    S("of the Church.", "A grand ancient council of bishops in tall mitres seated in rows in a vast hall. Camera: wide."),
    S("They deeply", "Rows of candles flickering before a statue in a quiet chapel. Camera: medium. NO people."),
    S("respect Mary,", "A woman placing flowers at the feet of a statue of MARY surrounded by candles. Camera: medium.", ["MARY"]),
    S("the mother", "MARY with her hands folded, gentle smile, glowing halo. Camera: close-up.", ["MARY"]),
    S("of Jesus.", "MARY tenderly holding baby JESUS wrapped in white cloth, soft golden light. Camera: medium.", ["MARY"]),
    S("And they honour saints,", "A tall stained glass window showing figures with halos, sunlight streaming through in colours. Camera: medium."),
    S("people believed to have", "A row of marble statues of saints with halos along a church wall. Camera: medium."),
    S("lived exceptionally", "A humble nun in a white and blue habit feeding poor children in a street. Camera: medium."),
    S("holy lives.", "A monk in a brown robe with a soft halo surrounded by birds and deer in a forest. Camera: medium."),
    S("Catholics may ask", "A young woman kneeling and lighting a candle before a saint's statue. Camera: medium."),
    S("saints to pray", "A haloed saint in heaven above the clouds with hands folded in prayer. Camera: medium."),
    S("for them,", "Golden light from heaven shining down on the kneeling young woman. Camera: wide."),
    S("just as you might", "NARRATOR BOY talking with a friend on a park bench. Camera: medium.", ["BOY"]),
    S("ask a friend", "NARRATOR BOY with a worried face asking his friend for help, hand on chest. Camera: medium.", ["BOY"]),
    S("to pray for you.", "The friend with eyes closed praying, one hand on NARRATOR BOY's shoulder. Camera: medium.", ["BOY"]),
    S("But worship?", "NARRATOR BOY raising one finger, serious face, eyebrows down. Camera: close-up.", ["BOY"]),
    S("That's reserved for God", "A congregation kneeling toward a glowing altar under a single beam of heavenly light. Camera: wide."),
    S("alone.", "One brilliant shaft of light descending from the clouds onto an empty altar. Camera: medium. NO people."),
    S("Catholicism also", "A quiet church interior with an altar and a crucifix, morning light. Camera: wide. NO people."),
    S("has seven special", "Seven tall lit candles in a row on a golden altar. Camera: medium. NO people."),
    S("religious practices", "Priest in vestments performing a ceremony at an altar with incense smoke. Camera: medium.", ["PRIEST"]),
    S("called", "A wooden table with a chalice, a jar of oil, a bowl of water, two rings and a white stole. Camera: top-down. NO people."),
    S("sacraments.", "Seven small glowing golden circles of light arranged in an arc above an altar. Camera: medium, symbolic. NO people."),
    S("These include", "NARRATOR BOY counting on his fingers. Camera: medium.", ["BOY"]),
    S("baptism,", "PRIEST pouring water over a baby's head at a stone baptismal font, parents smiling. Camera: medium.", ["PRIEST"]),
    S("confession,", "A person kneeling in a dark wooden confession booth, a lattice screen. Camera: medium."),
    S("marriage,", "A bride and groom exchanging rings at a church altar with PRIEST. Camera: medium.", ["PRIEST"]),
    S("and the Eucharist.", "PRIEST placing a white wafer on a kneeling person's tongue. Camera: medium.", ["PRIEST"]),
    S("And remember", "NARRATOR BOY pointing back over his shoulder with a knowing smile. Camera: medium.", ["BOY"]),
    S("that bread from", "The small round white wafer glowing on a golden plate in the dark. Camera: close-up. NO people."),
    S("the beginning?", "Callback to the opening: hands raising the blazing glowing wafer in a dark cathedral with golden rays. Camera: low angle."),
    S("During the Eucharist,", "A full cathedral during Mass, PRIEST at the altar raising his arms, candles everywhere. Camera: wide.", ["PRIEST"]),
    S("Catholics believe", "Faithful people kneeling with heads bowed in pews. Camera: medium."),
    S("the bread and wine", "A white wafer and a golden chalice of red wine side by side on a white altar cloth. Camera: close-up. NO people."),
    S("truly become", "The wafer and chalice glowing intensely as golden light swirls around them. Camera: close-up, mystical. NO people."),
    S("the body and blood", "A golden chalice with deep red wine glowing in a single beam of light. Camera: close-up. NO people."),
    S("of Christ,", "JESUS at the Last Supper breaking bread at a long table with his disciples. Camera: wide.", ["JESUS"]),
    S("even though their outward", "Plain ordinary wafer and cup of wine on a wooden table under normal daylight. Camera: close-up. NO people."),
    S("appearance remains", "A magnifying glass held over a plain white wafer, it looks completely ordinary. Camera: close-up."),
    S("unchanged.", "NARRATOR BOY squinting at a wafer in his fingers, puzzled. Camera: close-up.", ["BOY"]),
    S("This belief is called", "Old theologians in robes debating around a candle-lit table with big books. Camera: medium."),
    S("transubstantiation.", "Dramatic glowing transformation: the white wafer at the centre of a swirling vortex of golden light in a dark cathedral. Camera: close-up, epic. NO people."),
    S("So, Catholicism", "A grand cathedral exterior at sunrise with bells ringing in its tower. Camera: wide. NO people."),
    S("isn't just about", "NARRATOR BOY shrugging with a small smile. Camera: medium.", ["BOY"]),
    S("going to church on", "A family in nice clothes walking up the steps toward a church door. Camera: wide."),
    S("Sunday.", "A calendar-like sunny morning with church bells swinging in a tower against blue sky. Camera: medium. NO people."),
    S("It's a {two-thousand-year-old|two thousand year old}", "Early Christians gathered by oil lamps in ancient Roman catacombs with stone walls. Camera: medium."),
    S("religious tradition built", "A medieval cathedral under construction with stone masons and wooden scaffolding. Camera: wide."),
    S("around faith,", "A child with folded hands praying by a bedside, moonlight through window. Camera: medium."),
    S("sacred rituals,", "A candle-lit procession of priests with incense smoke and a golden cross held high. Camera: medium."),
    S("the teachings of Jesus,", "JESUS teaching a large crowd seated on a green hillside by a lake. Camera: wide.", ["JESUS"]),
    S("and a worldwide", "People of many different nations walking together toward a glowing church at sunset. Camera: wide."),
    S("community.", "A huge happy crowd of diverse people holding candles outside Saint Peter's Basilica at night, warm glow. Camera: wide, uplifting."),
]


if __name__ == "__main__":
    (ROOT / f"projects/{NAME}/scenes.json").write_text(json.dumps(
        [{"line": l, "image": f"scene_{k:03d}.jpg"} for k, (l, _, _) in enumerate(SCENES, 1)], indent=1))
    gen = []
    for k, (line, chars, desc) in enumerate(SCENES, 1):
        p = ("Hand-drawn 2D webcomic illustration, square, full-bleed with no border or frame. Cartoon characters: bold "
             "black outlines, big round heads, flat peach skin, pink blush cheeks, tiny dot eyes, thick expressive "
             "eyebrows. Backgrounds more detailed, soft muted desaturated colours, light paper grain, gentle natural "
             "light. No text, letters, numbers or logos anywhere." + ("" if chars else " NO extra faces unless described.")
             + "\n\n" + ("Characters: " + " ".join(CHARACTERS[c] for c in chars) + "\n" if chars else "") + "Scene: " + desc)
        gen.append([k, p[:1000]])
    (ROOT / f"projects/{NAME}/gen_prompts.json").write_text(json.dumps(gen))
    print(len(SCENES), "scenes")
