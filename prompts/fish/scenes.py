"""Fish story (You are trapped!) script -> scene prompts + projects/apple/scenes.json.

Same style block and format as prompts/build_prompts.py.  Usage: python prompts/fish/scenes.py
"""
import json
from pathlib import Path

HERE = Path(__file__).parent
ROOT = HERE.parent.parent
STYLE = ("STYLE: Hand-drawn 2D webcomic illustration, square 1:1 frame, looks like a still from an emotional animated "
         "short. Characters: bold black ink outlines, large round heads, flat peach skin, pink blush cheeks, tiny dot "
         "eyes, thick expressive eyebrows. Backgrounds more detailed and semi-realistic, soft muted colours, light paper "
         "grain, gentle natural light, slightly desaturated palette. Cinematic composition.")
AVOID = ("AVOID: any readable text, letters, numbers, captions, logos, watermarks or speech bubbles; photorealism; "
         "3D render look; borders or frames around the image.")
CHARACTERS = {
    "MINI": ("MINI: small bright orange fish, cream belly, big round head, black dot eyes, thick eyebrows, pink blush, "
             "short round fins, ONE small blue spot on her tail fin."),
    "ELDER": ("POND ELDER: large old grey-green carp, long drooping white whiskers, heavy eyelids, bushy white eyebrows, "
              "a notch in his dorsal fin."),
    "SEAELDER": ("SEA ELDER: big round friendly silver-blue fish, short white whisker beard, kind eyes, white eyebrows, "
                 "small pink scar on one cheek."),
    "POND": ("POND FISH: small plain grey-brown cartoon fish with dot eyes, all looking alike."),
}
POND = ("Underwater in a small murky green pond: reeds, sandy floor, at one end a curved wall of grey mossy rocks with one narrow dark gap.")
SEA = ("UNDERWATER SEA SETTING: a vast bright turquoise sea with sunbeams, colourful coral and open blue water.")
RIVER = ("UNDERWATER RIVER SETTING: a clear flowing river with smooth pebbles, green water plants and light rippling from above.")
S = lambda line, desc, chars=(): (line, list(chars), desc)
P = lambda line, desc, chars=(): (line, list(chars), POND + " " + desc)
SCENES = [
    P("In a small pond,", "Wide view of the whole pond from above the water, reeds around the edge, calm and quiet. Camera: wide."),
    P("there lived", "Underwater, a few POND FISH swimming slowly among the reeds. Camera: medium.", ["POND"]),
    P("a hundred fish.", "Underwater, a crowded school of about a hundred POND FISH and MINI among them. Camera: wide.", ["POND", "MINI"]),
    P("And there was a rule:", "POND ELDER floating in front of the other fish, one fin raised like a teacher. Camera: medium.", ["ELDER", "POND"]),
    P("do not go", "POND ELDER shaking his head sternly, whiskers swaying. Camera: close-up.", ["ELDER"]),
    P("past the rocks.", "The curved wall of grey mossy rocks with the narrow dark gap, ominous shadows. Camera: medium."),
    P("Whoever goes,", "A single small grey POND FISH swimming slowly toward the dark gap in the rocks, seen from behind. Camera: medium.", ["POND"]),
    P("never returns.", "The dark gap in the rocks, empty, a few bubbles drifting out of the blackness. Camera: close-up, eerie."),
    P("A young fish", "MINI swimming in the pond, curious and bright. Camera: medium.", ["MINI"]),
    P("asked an elder fish,", "MINI swimming up to POND ELDER, looking up at him. Camera: medium two-shot.", ["MINI", "ELDER"]),
    P("\"What lies", "MINI close-up, curious eyes, eyebrows raised. Camera: close-up.", ["MINI"]),
    P("beyond the rocks?\"", "MINI looking past POND ELDER toward the dark gap in the rocks. Camera: over-the-shoulder.", ["MINI", "ELDER"]),
    P("The elder replied,", "POND ELDER turning slowly toward MINI, heavy eyelids. Camera: medium.", ["ELDER", "MINI"]),
    P("\"Nothing,", "POND ELDER close-up, grim face, whiskers drooping. Camera: close-up.", ["ELDER"]),
    P("only darkness.\"", "Pitch-black water beyond the rocks, nothing visible, only darkness. Camera: wide, eerie."),
    P("So, the young fish", "MINI looking down sadly, eyebrows tilted. Camera: close-up.", ["MINI"]),
    P("stayed back.", "MINI swimming away from the rocks back toward the reeds. Camera: medium, from behind.", ["MINI"]),
    P("Days passed,", "Light above the pond surface changing from day to night, MINI resting among the reeds. Camera: medium.", ["MINI"]),
    P("years passed—", "MINI a little bigger, the reeds taller, lily pads multiplied, same pond. Camera: medium.", ["MINI"]),
    P("the same water,", "Murky green pond water with drifting specks, unchanged. Camera: medium."),
    P("the same rocks,", "The same curved wall of grey mossy rocks with the narrow dark gap. Camera: medium."),
    P("the same fear.", "MINI glancing nervously at the rocks from a distance, small sweat drop. Camera: medium.", ["MINI"]),
    P("Then, one summer,", "View from above: a blazing summer sun over the pond, cracked mud appearing at the edges. Camera: wide."),
    P("the pond began", "The water level dropping, reeds sticking out of the water, mud showing. Camera: wide."),
    P("to dry up.", "Underwater, very shallow water, POND FISH crowded and panicking, sunlight harsh. Camera: medium.", ["POND"]),
    P("With no other", "MINI looking around frantically in the shallow water. Camera: close-up.", ["MINI"]),
    P("choice left,", "MINI facing the dark gap in the rocks, determined eyebrows. Camera: medium, from behind.", ["MINI"]),
    P("she swam", "MINI darting forward with speed lines toward the gap. Camera: medium, dynamic.", ["MINI"]),
    P("past the rocks.", "MINI squeezing through the narrow dark gap between the mossy rocks. Camera: close-up.", ["MINI"]),
    S("And what", "Darkness with a faint light ahead, MINI swimming through a short dark tunnel. Camera: medium.", ["MINI"]),
    S("did she find there?", "MINI with wide amazed eyes as light hits her face. Camera: close-up.", ["MINI"]),
    S("A river.", RIVER + " MINI emerging into the bright river, delighted. Camera: wide.", ["MINI"]),
    S("The river flowed", RIVER + " MINI riding the current happily, bubbles trailing. Camera: medium.", ["MINI"]),
    S("into the sea,", "The river mouth opening into a vast bright sea, MINI small at the edge. Camera: wide."),
    S("and in the sea,", SEA + " MINI entering the sea, looking around in wonder. Camera: wide.", ["MINI"]),
    S("there were thousands", SEA + " A huge colourful school of thousands of fish swirling. Camera: wide."),
    S("of fish.", SEA + " Many different happy fish swimming past MINI. Camera: medium.", ["MINI"]),
    S("Every single one", SEA + " Close-up of a few happy sea fish smiling at MINI. Camera: close-up.", ["MINI"]),
    S("had left", SEA + " A faint dreamy memory bubble showing a small murky pond. Camera: medium."),
    S("a small pond", "Several small murky ponds seen from above, each with a narrow stream leading away. Camera: wide, aerial."),
    S("at some point.", SEA + " MINI realising, eyebrows raised. Camera: close-up.", ["MINI"]),
    S("She asked", SEA + " MINI swimming up to SEA ELDER near the coral. Camera: medium two-shot.", ["MINI", "SEAELDER"]),
    S("an elder fish there,", SEA + " SEA ELDER turning to MINI with a kind smile. Camera: medium.", ["SEAELDER"]),
    S("\"Did anyone ever", SEA + " MINI close-up, curious and a little worried. Camera: close-up.", ["MINI"]),
    S("go back?\"", "A memory bubble showing the old pond and the rocks, faded. Camera: medium."),
    S("The elder laughed,", SEA + " SEA ELDER laughing heartily, eyes closed, bubbles rising. Camera: medium close-up.", ["SEAELDER"]),
    S("\"Why would anyone", SEA + " SEA ELDER spreading his fins wide at the huge sea. Camera: medium.", ["SEAELDER"]),
    S("go back?", SEA + " SEA ELDER shaking his head with a grin. Camera: close-up.", ["SEAELDER"]),
    S("Water dries up there;", "A dried-up pond with cracked mud and a few puddles under a hot sun. Camera: wide."),
    S("here, it never does.", SEA + " Endless deep blue water stretching to the horizon. Camera: wide."),
    S("That is why", SEA + " SEA ELDER looking at MINI seriously and kindly. Camera: medium.", ["SEAELDER", "MINI"]),
    S("no one ever returned—", "The narrow dark gap in the pond rocks seen from the pond side, empty. Camera: medium."),
    S("not because they died,", SEA + " SEA ELDER waving a fin dismissively with a smile. Camera: medium.", ["SEAELDER"]),
    S("but because they found", SEA + " Happy fish families playing among coral. Camera: medium."),
    S("something better.\"", SEA + " MINI swimming joyfully in the sunbeams. Camera: wide.", ["MINI"]),
    P("Meanwhile,", "View from above the old pond, small and quiet, partly refilled by rain. Camera: wide."),
    P("back at the pond,", "Underwater, POND FISH gathered in a circle around POND ELDER. Camera: wide.", ["POND", "ELDER"]),
    P("the same old story", "POND ELDER talking with a raised fin, POND FISH listening wide-eyed. Camera: medium.", ["ELDER", "POND"]),
    P("continued to be told,", "Young POND FISH huddled together, frightened, looking at the rocks. Camera: medium.", ["POND"]),
    P("just to keep everyone else", "POND ELDER looming over the small fish, his shadow falling across them. Camera: low angle.", ["ELDER", "POND"]),
    P("living in fear.", "Small POND FISH hiding among the reeds, trembling. Camera: close-up.", ["POND"]),
    S("You aren't trapped;", SEA + " MINI looking straight at the viewer with a gentle, confident face. Camera: close-up.", ["MINI"]),
    S("you have simply", "The pond rocks seen from inside the pond, the narrow gap glowing with light from beyond. Camera: medium."),
    S("been told", "POND ELDER mid-speech, fin raised, from the pond. Camera: medium.", ["ELDER"]),
    S("that you are.", "A small POND FISH looking at the glowing gap in the rocks, hopeful. Camera: medium.", ["POND"]),
    S("Those are two", "Split view: left, the murky small pond; right, the bright open sea. Camera: medium."),
    S("very different things.", SEA + " MINI swimming off into the bright open sea toward the sunbeams. Camera: wide.", ["MINI"]),
]

def prompt(line, chars, desc):
    parts = [STYLE]
    if chars:
        parts.append("CHARACTERS:\n" + "\n".join(CHARACTERS[c] for c in chars))
    parts += ["SCENE: " + desc, f'NARRATION FOR THIS IMAGE: "{line}".', AVOID]
    return "\n\n".join(parts)


if __name__ == "__main__":
    md = ["# You Are Trapped! Scene Prompts\n"]
    for k, (line, chars, desc) in enumerate(SCENES, 1):
        md += [f"## Scene {k}\n", f"> {line}\n", "```", prompt(line, chars, desc), "```\n"]
    (HERE / "fish-prompts.md").write_text("\n".join(md), encoding="utf-8")
    (ROOT / "projects/fish/scenes.json").write_text(json.dumps(
        [{"line": l, "image": f"scene_{k:02d}.jpg"} for k, (l, _, _) in enumerate(SCENES, 1)], indent=1))
    gen = []
    for k, (line, chars, desc) in enumerate(SCENES, 1):
        p = ("Hand-drawn 2D webcomic illustration, square, full-bleed with no border or frame. Cartoon characters: bold "
             "black outlines, cute rounded cartoon fish with tiny dot eyes and thick expressive eyebrows, flat colours. "
             "All fish characters look EXACTLY as described every time. Backgrounds more detailed, soft muted desaturated colours, light paper grain, gentle natural "
             "light. No text, letters, numbers or logos anywhere." + ("" if chars else " NO humans.")
             + "\n\n" + ("Characters: " + " ".join(CHARACTERS[c] for c in chars) + "\n" if chars else "") + "Scene: " + desc)
        gen.append([k, p[:1000]])
    (ROOT / "projects/fish/gen_prompts.json").write_text(json.dumps(gen))
    print(len(SCENES), "scenes")
