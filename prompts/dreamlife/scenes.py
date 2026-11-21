"""Life is a dream -> self-contained 1:1 prompts in the user's '52 factorial' creamy stick-figure style."""
import json
from pathlib import Path
ROOT = Path(__file__).resolve().parents[2]; NAME = "dreamlife"
STYLE = ("Square 1:1 hand-drawn storybook stick-figure doodle illustration on a smooth, plain, soft creamy off-white background with a creamy theme, "
 "with no paper grain, no texture noise and no speckles. No title and no heading anywhere in the image. Characters are simple thin-line stick figures "
 "drawn with a very thin, delicate dark-charcoal line, with round pale cream-colored heads, small dot eyes, tiny minimal faces, thin line limbs, and a "
 "small tuft of hair strands on top. A soft painterly natural outdoor scene (beaches, meadows, hills, oceans, sky) with a very weak, subtle, muted and "
 "desaturated palette: pale sage green, dusty gray-blue, light sand, soft cream and faded beige. Low saturation, low contrast, low brightness, soft and "
 "quiet, no flash, no glow, no sparkles, no strong or vivid colors, no harsh shadows. Light pencil-sketch shading. Calm, curious, thoughtful mood. No watermark. ")
NOTEXT = " No text or letters anywhere in the image."
S = lambda l, d: (l, d)
SCENES = [
 S("You must definitely get dreams, right?", "A stick figure sleeps peacefully on a soft grassy hill under a pale sky, a large dotted dream bubble floating above its head with faint clouds inside."),
 S("But do you ever remember", "The stick figure sits up on the grass, rubbing its head, a small question mark drawn above in a pale line."),
 S("where that dream started from?", "A long dotted path in the meadow that fades away into soft mist at its beginning, the stick figure looking back along it, puzzled."),
 S("Those people who have watched the movie Inception,", "A stick figure sits on a blanket on a hill watching a small old-fashioned wooden screen showing a softly folding city skyline."),
 S("those people will be able to relate to this thing.", "Two stick figures on the hill nodding at each other knowingly, the small wooden screen beside them."),
 S("In that, Cobb says,", "A stick figure in a simple suit with neat swept-back hair standing at the edge of a calm sea, speaking thoughtfully, a spinning top resting on a flat rock beside him."),
 S("\"We never remember the beginning of a dream.", "A soft dotted dream bubble whose left edge dissolves into blank cream mist, a tiny stick figure standing inside the bubble looking around."),
 S("We are always in the middle of a dream.\"", "A tiny stick figure standing in the middle of a long bridge over a calm sea, both ends of the bridge fading into soft fog."),
 S("Now let's come to the main point.", "A stick figure stands on a hill beside a wooden signpost pointing forward, one finger raised."),
 S("Do you remember how you came into this world?", "A stick figure stands in a meadow looking up at a vast pale sky, a large faint question mark drawn above."),
 S("I mean, do you remember being born?", "A tiny stick-figure baby wrapped in a soft cream cloth lying on a blanket in a meadow, eyes closed."),
 S("You don't, right?", "A stick figure shrugs gently on a hill, an empty dotted thought bubble above its head."),
 S("The first three or four years of your life", "Four small stepping stones on a beach, the first ones fading into mist, a small stick-figure child standing on the last one."),
 S("aren't even in your mind.", "A round stick-figure head drawn large in profile with an empty, foggy blank space inside, soft cream mist."),
 S("Your mom must have told you when you were born.", "A stick-figure mother with long hair sitting on a bench by the lake, holding a baby and smiling while talking to a small child beside her."),
 S("Your dad must have told you, \"Beta, you learned to walk like this.\"", "A stick-figure father kneeling on the grass, holding the hands of a toddler stick figure taking its first wobbly steps."),
 S("Your grandma must have told you, \"Beta, you used to cry a lot in your childhood.\"", "An old stick-figure grandmother with a small bun and round glasses sitting in a rocking chair on a porch, telling a story to a child sitting at her feet."),
 S("Just like our dreams, we don't remember where it started from,", "A dotted dream path and a real dirt path side by side in a meadow, both fading into mist at the start."),
 S("life is also something like that, isn't it?", "A stick figure walks along a winding path through soft hills, glancing back over its shoulder at the misty start."),
 S("We don't even remember where our life started from.", "A long road behind a stick figure disappearing into cream fog, the stick figure standing still and wondering."),
 S("Now think that if our life was also a dream, suppose,", "A stick figure sleeping on the hill, and inside its large dream bubble the same hill, lake and tiny figure going about its day."),
 S("then who are those people who are telling us stories,", "Several stick figures sitting around a small campfire at dusk, one of them telling a story with open hands, the others listening."),
 S("who are making us believe in all these things?", "A stick figure looking up at many small floating picture frames in the sky showing family moments, a curious face."),
 S("They became characters of our dream which we built ourselves.", "A stick figure gently placing small wooden stick-figure puppets onto a little toy stage in the meadow, as if building a scene."),
 S("And in a dream, we don't get the option to choose a character.", "A stick figure standing in front of a row of closed wooden doors on the beach, all doors locked with small padlocks."),
 S("With that same logic, if we look at our life,", "A stick figure holding a small magnifying glass up to a winding path through the hills."),
 S("then here too we didn't get any option to choose.", "A stick figure standing at a single path with no forks, tall soft hedges on both sides, calm but thoughtful."),
 S("Did you get an option to choose your family? No.", "A stick-figure family of four standing together on a hill, the child in the middle looking up at them curiously."),
 S("Did you get an option to choose your name? No.", "A small wooden cradle with a blank hanging name tag, a stick-figure parent leaning over it."),
 S("You didn't even have the option to check, just like your dreams.", "A stick figure inside a dotted dream bubble reaching out to touch its edge, unable to see beyond it."),
 S("And finally, there is only one way to get out of a dream:", "A stick figure standing at the edge of a soft grassy cliff over a calm sea, looking down thoughtfully."),
 S("either you fall down,", "A stick figure gently falling through a pale sky among soft clouds, arms out."),
 S("or you get a jolt,", "A stick figure sitting bolt upright in bed in a small cottage room, eyes wide, small motion lines around it."),
 S("or you end.", "A single candle on a windowsill gently going out, a thin curl of smoke rising, calm lake outside."),
 S("So maybe what we call death", "A quiet empty bench on a hill overlooking the lake at dusk, a few leaves drifting down."),
 S("is just an alarm for us waking up.", "A small old-fashioned alarm clock on a wooden bedside table by a window at dawn, a stick figure just opening its eyes in bed, soft morning light over the lake."),
]
if __name__ == "__main__":
    (ROOT/f"projects/{NAME}/scenes.json").write_text(json.dumps([{"line": l, "image": f"{k:03d}.png"} for k,(l,_) in enumerate(SCENES,1)], indent=1))
    out = [f"# Life Is a Dream: Self-Contained Image Prompts, No Heading, Muted Creamy Theme ({len(SCENES)} scenes)", "",
           "Each prompt is complete on its own. Copy the whole prompt, nothing else needed.", "", "---", ""]
    for k,(l,d) in enumerate(SCENES,1):
        out += [f"### {k}. \"{l}\"", "", "```", STYLE + d + NOTEXT, "```", ""]
    (ROOT/f"projects/{NAME}/image_prompts.md").write_text("\n".join(out)); print(len(SCENES))
