"""'Why warm countries are poorer' script -> one-click scene prompts.

Script is the user's transcript, checked word-for-word against the voiceover.
Usage:  python prompts/warmcountries/scenes.py
"""
import sys
from pathlib import Path

HERE = Path(__file__).parent
sys.path.insert(0, str(HERE.parent))
from build_prompts import render  # noqa: E402

TITLE = "Why Warm Countries Are Poorer: Scene Prompts"

CHARACTERS = {
    "YOU": ("NARRATOR BOY: Indian man in his early 20s, slim, big messy curly black hair, dot eyes, thick dark "
            "eyebrows, peach skin with pink blush. Wears a muted teal-green full-sleeve button shirt with sleeves "
            "rolled to the elbows, untucked, dark charcoal trousers, off-white sneakers."),
}

MAP = "a large illustrated world map with continents in soft colours and no text or labels"
SOIL = "a cut-away cross-section of the ground showing soil layers below the surface"
TROPIC = "a hot humid tropical town with palm trees, tin-roof houses and a blazing sun"

S = lambda line, desc, chars=(): (line, list(chars), desc)

SCENES = [
    S("Why warm countries are poorer.", f"{TROPIC.capitalize()}: cracked dusty street, a tired family in the shade of a shack, heat waves rising. Camera: wide."),
    S("And honestly, it completely changes", "NARRATOR BOY with eyes wide and eyebrows raised, a surprised 'wow' face. Camera: close-up.", ["YOU"]),
    S("how you look", "NARRATOR BOY turns to look at a world map pinned on his wall. Camera: medium shot from behind.", ["YOU"]),
    S("at the world map.", f"Close-up of {MAP}, the equator drawn as a faint dotted line. Camera: straight on."),
    S("If you look", "A large magnifying glass hovering over the world map. Camera: medium."),
    S("at the global wealth,", f"{MAP.capitalize()} with stacks of gold coins placed on top of different countries. Camera: top-down."),
    S("almost all rich countries", "On the world map, the countries in the far north and far south glow gold, with tall stacks of coins. Camera: top-down."),
    S("are in cold, temperate climates,", "A wealthy modern city with glass skyscrapers under light snow, people in warm coats. Camera: wide, cool tones."),
    S("and almost all poor countries", "On the world map, the countries along the middle band around the equator have only small piles of coins. Camera: top-down."),
    S("are in the hot tropics.", f"{TROPIC.capitalize()}, people fanning themselves, the sun huge in the sky. Camera: wide, hot orange tones."),
    S("First is the biological heat tax.", "A sweating man under a scorching sun while the sun reaches down with a hand and takes coins out of his pocket. Camera: medium shot, comedic."),
    S("Science shows that", "A scientist in a white coat studying charts and a big thermometer in a lab. Camera: medium shot."),
    S("the optimal temperature", "Close-up of a big thermometer with a glowing green 'just right' zone in the middle (no numbers). Camera: close-up."),
    S("for human economic productivity", "A busy, energetic office: people working fast at desks, papers flying, everyone focused. Camera: wide."),
    S("is actually around 13 to 14°C,", "A pleasant cool spring day in a city park: people in light jackets walking briskly, fresh green trees. Camera: wide, fresh light."),
    S("but in intense heat,", "A blazing sun with shimmering heat waves over a melting asphalt road. Camera: wide, harsh light."),
    S("your cardiovascular system", "A cartoon human body with a glowing red heart and blood vessels drawn inside, like an anatomy chart. Camera: medium, front view."),
    S("diverts massive amounts of energy", "In the cartoon body, glowing energy streams flow away from the brain toward the skin. Camera: medium."),
    S("just to cool your internal organs.", "The cartoon body's organs surrounded by blue cooling flows, sweat drops on the skin, a fan blowing. Camera: medium."),
    S("Cognitive function drops,", "An office worker in the heat staring blankly at his screen, a low battery icon floating above his head. Camera: medium close-up."),
    S("physical labor becomes exhausting,", "A construction worker in the hot sun leaning on his shovel, drenched in sweat, panting. Camera: medium shot."),
    S("and societal productivity", "A hot afternoon market street with half the shutters closed and few customers. Camera: wide."),
    S("naturally slows down.", "People napping in the shade under trees at midday, a dog asleep, a snail crossing the road. Camera: wide, slow lazy mood."),
    S("Second, the agricultural trap.", "A tired farmer in a tropical field of weak, thin crops, looking at them sadly. Camera: medium shot."),
    S("Tropical regions get heavy,", "Huge dark heavy rain clouds rolling over a green tropical jungle. Camera: wide."),
    S("constant rainfall,", "Pouring rain on the jungle and a tin roof, puddles everywhere. Camera: medium."),
    S("which creates a process called leaching,", f"{SOIL.capitalize()} in the tropics: rainwater seeping down through the soil, carrying small glowing dots downward. Camera: side view, diagram-like."),
    S("washing all the nutrients", "The glowing nutrient dots being swept deep down by the flowing water. Camera: close-up, cross-section."),
    S("out of the soil.", f"{SOIL.capitalize()}: pale, thin, empty topsoil with no glowing dots left. Camera: side view."),
    S("Meanwhile, in cold climates,", "A quiet snowy farm field with a wooden fence and pine trees. Camera: wide, cool blue tones."),
    S("winter freezes dead plants,", "Close-up of dead brown plants covered in frost and ice crystals. Camera: close-up."),
    S("trapping nutrients under the snow", f"{SOIL.capitalize()} under a thick snow layer, glowing nutrient dots held just under the snow. Camera: side view."),
    S("to decompose slowly.", "Fallen leaves slowly breaking down into dark soil, small worms and fungi. Camera: macro close-up."),
    S("This creates deep,", f"{SOIL.capitalize()}: a very deep dark layer of soil. Camera: side view."),
    S("incredibly rich topsoil,", "Two hands holding a big scoop of rich, crumbly black soil. Camera: close-up."),
    S("perfect for mass agriculture.", "Endless golden wheat fields with combine harvesters working under a blue sky. Camera: wide, aerial."),
    S("Third, cold climates have", "A snowy landscape with a frozen lake and pine forest. Camera: wide."),
    S("a magical reset button: winter.", "A giant glowing round button in the middle of a snowy field, snow bursting out around it as if just pressed. Camera: medium, magical."),
    S("Frost naturally kills pests,", "Close-up of frozen insects and caterpillars covered in frost on a leaf. Camera: macro."),
    S("parasites, and diseases", "Cartoon germs and mosquitoes frozen inside blocks of ice. Camera: close-up, playful."),
    S("every single year.", "A circle of four seasons, with the winter quarter glowing bright white and snowflakes. Camera: centred."),
    S("The tropics never get a break.", "A tropical swamp at dusk full of mosquito swarms; an exhausted man swatting at them. Camera: medium shot."),
    S("Finally, this all perfectly explains colonization.", "Old wooden sailing ships with big white sails crossing the ocean toward a distant coast. Camera: wide."),
    S("Europeans arrived in cold climates", "1600s European settlers in coats and hats stepping off a rowing boat onto a cold, snowy coastline. Camera: medium-wide."),
    S("like the US or the Canada;", "Snowy North American pine forests and lakes with a small settlers' camp. Camera: wide."),
    S("they survived the familiar weather,", "Settlers comfortably chopping wood in the snow, smoke rising from a chimney. Camera: medium shot."),
    S("so they settled down", "A small village of log cabins with fences and fields. Camera: wide."),
    S("and built inclusive institutions:", "Settlers raising the wooden frame of a town hall together. Camera: medium-wide."),
    S("schools, hospitals,", "A small wooden schoolhouse with children and a little hospital building next to it. Camera: wide."),
    S("and property rights.", "A settler family proudly standing by their new fence, holding a rolled land paper (no text). Camera: medium shot."),
    S("But in the hot tropics,", "European ships anchored off a hot tropical coast with dense jungle. Camera: wide."),
    S("malaria and yellow fever", "Swarms of mosquitoes around sick European soldiers lying in hammocks under a hot tent. Camera: medium, sickly yellow tones."),
    S("killed them in droves.", "Rows of simple wooden grave crosses on a jungle hillside, a lone ship in the bay. Camera: wide, sombre, not graphic."),
    S("Because they couldn't settle safely,", "Colonists hurrying back to their ships with their belongings. Camera: medium-wide."),
    S("they built extractive institutions —", "A grim stone fort on a tropical coast with cannons and a warehouse. Camera: wide."),
    S("brutal systems", "Colonial overseers with sticks standing over tired local labourers in a hot field. Camera: medium-wide, sombre, not graphic."),
    S("designed purely to extract resources,", "Mines and plantations with carts full of ore, cotton and sugar cane being hauled away. Camera: wide."),
    S("enslave locals,", "Shackled local labourers working in a sugar cane field under guard. Camera: medium-wide, sombre, not graphic."),
    S("and ship wealth back to Europe.", "Sailing ships loaded with gold and sugar crates sailing toward a grand European port city. Camera: wide."),
    S("What do you think?", "NARRATOR BOY stands next to his world map, hand on chin, looking at the viewer. Camera: medium shot.", ["YOU"]),
    S("Is geography destiny?", "A globe split in two: one half blazing sun and jungle, the other half snow and pine trees. Camera: centred."),
    S("Drop your thoughts in the comment.", "NARRATOR BOY smiling and typing on his phone, blank comment bubbles floating up. Camera: medium close-up.", ["YOU"]),
]

if __name__ == "__main__":
    dest = HERE / "warmcountries-prompts.md"
    dest.write_text(render(TITLE, (HERE / "script.txt").read_text(encoding="utf-8"), SCENES, CHARACTERS),
                    encoding="utf-8")
    print(f"Wrote {len(SCENES)} prompts to {dest}")
