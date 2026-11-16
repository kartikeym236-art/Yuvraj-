# The History of Nvidia: Shot List and Image Prompts (Part 3 of 5)

Each line of the voiceover is one shot of about 1–3 seconds. Each prompt box is **self-contained**: paste it on its own into any image model (Midjourney, GPT-Image, Flux, Ideogram, etc.) and it carries the full style, characters and scene.

**Style target:** the reference frames, i.e. a flat hand-drawn 2D explainer cartoon with big round heads, stick limbs, thick wobbly black outlines, one cel-shade tone, a muted palette and handwritten captions.

**Tips:** use 16:9 (e.g. `--ar 16:9`). To keep characters consistent, generate a character sheet first and pass it as a reference image together with these prompts. Durations assume about 2.7 spoken words per second.

**Total shots:** 577 · **Estimated runtime:** ~20 min 47 s

**This part:** Chapter 6 – CUDA. The Crazy Bet. → Chapter 8 – The Big Bang of AI · 134 shots

## Character sheet (reference)

- YOUNG JENSEN HUANG (age about 9, 1970s): small body, round beige head, glossy black bowl-cut hair, big curious dot eyes, oversized plain white t-shirt, brown shorts, white sneakers.
- TEENAGE JENSEN HUANG (about 15, 1970s): round beige head, black bowl-cut hair, large round glasses, diner busboy uniform: white short-sleeve shirt, small black bow tie, white apron.
- JENSEN HUANG in the 1990s (about 30, simplified caricature): round beige head, neat side-parted black hair, large square-ish 1990s glasses, friendly determined smile, light-blue button-up shirt with rolled sleeves, khaki trousers.
- JENSEN HUANG today (simplified caricature): round beige head, swept-back silver-grey and black hair, confident warm grin, signature black leather jacket over a black t-shirt, black jeans, black shoes.
- CHRIS MALACHOWSKY (Nvidia co-founder, 1990s, simplified caricature): round beige head, short brown hair, short brown beard, navy polo shirt, jeans, friendly calm face.
- CURTIS PRIEM (Nvidia co-founder, 1990s, simplified caricature): round beige head, light-brown hair, brown mustache, round wire glasses, grey crew-neck sweater, thoughtful engineer look.
- DON VALENTINE (venture capitalist, simplified caricature): older, round beige head, slicked white hair, dark grey suit, white shirt, red tie, sceptical eyebrows.
- IAN BUCK (young researcher, mid-2000s, simplified caricature): round beige head, short messy brown hair, grey hoodie, laptop under arm, eager smile.
- ALEX KRIZHEVSKY (university student, 2012, simplified caricature): round beige head, short dark-brown hair, light stubble, plain dark-blue t-shirt, focused tired eyes.
- ILYA SUTSKEVER (researcher, 2012, simplified caricature): round beige head, short dark hair receding at the temples, intense eyes, grey t-shirt.
- GEOFFREY HINTON (professor, simplified caricature): older, round beige head, white receding hair, kind smile, grey sweater over a collared shirt.


---

## Chapter 6 – CUDA. The Crazy Bet.

### Shot 253 · ~2s

> **VO:** Chapter six. CUDA. The crazy bet.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2006-2008: university labs and research supercomputers, programmers coding at night, the 2008 financial crisis on Wall Street with crashing red charts.

SCENE: Chapter title card. Flat deep forest green background filling the frame, a simple hand-drawn dice made of circuit lines illustrated small and centred under the title, generous empty space, gentle subtle vignette in a slightly darker flat shade at the corners.

ON-SCREEN TEXT: "Chapter 6: CUDA. The Crazy Bet." in the handwritten marker font, clearly legible, spelled exactly.

MOOD: Clean, calm, inviting title card.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 254 · ~2.5s

> **VO:** Here's something researchers had started to notice.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2006-2008: university labs and research supercomputers, programmers coding at night, the 2008 financial crisis on Wall Street with crashing red charts.

SCENE: Scientists in a lab looking at a GPU curiously.

CHARACTERS IN FRAME:
- ENGINEERS: generic bean-people of varied skin tones in casual tech clothes (polo shirts, hoodies, lanyards), some with glasses.

ON-SCREEN TEXT: none.

MOOD: Curious.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 255 · ~1.5s

> **VO:** Remember the painting analogy?

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2006-2008: university labs and research supercomputers, programmers coding at night, the 2008 financial crisis on Wall Street with crashing red charts.

SCENE: The wall with tiny painters.

CHARACTERS IN FRAME:
- BACKGROUND PEOPLE: generic bean-people of varied skin tones in everyday clothes matching the scene's era.

ON-SCREEN TEXT: none.

MOOD: Recall.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 256 · ~2.5s

> **VO:** A GPU is basically thousands of small

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2006-2008: university labs and research supercomputers, programmers coding at night, the 2008 financial crisis on Wall Street with crashing red charts.

SCENE: Inside the chip: rows of tiny workers with calculators. Wide/establishing framing.

ON-SCREEN TEXT: none.

MOOD: Explanatory.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 257 · ~2.5s

> **VO:** workers doing math at the same time.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2006-2008: university labs and research supercomputers, programmers coding at night, the 2008 financial crisis on Wall Street with crashing red charts.

SCENE: Same scene, camera moved slightly closer (gentle push-in, beat 2 of 2), small change in pose/expression to show the moment progressing: Inside the chip: rows of tiny workers with calculators.

ON-SCREEN TEXT: none.

MOOD: Explanatory.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 258 · ~2.5s

> **VO:** Well, it turns out it's not only

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2006-2008: university labs and research supercomputers, programmers coding at night, the 2008 financial crisis on Wall Street with crashing red charts.

SCENE: The tiny workers turning around to look at other problems. Wide/establishing framing.

ON-SCREEN TEXT: none.

MOOD: Revealing.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 259 · ~2.5s

> **VO:** graphics that need that kind of math.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2006-2008: university labs and research supercomputers, programmers coding at night, the 2008 financial crisis on Wall Street with crashing red charts.

SCENE: Same scene, camera moved slightly closer (gentle push-in, beat 2 of 2), small change in pose/expression to show the moment progressing: The tiny workers turning around to look at other problems.

ON-SCREEN TEXT: none.

MOOD: Revealing.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 260 · ~1s

> **VO:** So does science.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2006-2008: university labs and research supercomputers, programmers coding at night, the 2008 financial crisis on Wall Street with crashing red charts.

SCENE: Scientist icons.

ON-SCREEN TEXT: "Science" in the handwritten marker font, clearly legible, spelled exactly.

MOOD: Explanatory.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 261 · ~1s

> **VO:** Weather simulations.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2006-2008: university labs and research supercomputers, programmers coding at night, the 2008 financial crisis on Wall Street with crashing red charts.

SCENE: A swirling hurricane on a screen.

ON-SCREEN TEXT: none.

MOOD: Explanatory.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 262 · ~1s

> **VO:** Medical research.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2006-2008: university labs and research supercomputers, programmers coding at night, the 2008 financial crisis on Wall Street with crashing red charts.

SCENE: A DNA helix and microscope.

ON-SCREEN TEXT: none.

MOOD: Explanatory.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 263 · ~1s

> **VO:** Physics.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2006-2008: university labs and research supercomputers, programmers coding at night, the 2008 financial crisis on Wall Street with crashing red charts.

SCENE: Atoms orbiting.

ON-SCREEN TEXT: none.

MOOD: Explanatory.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 264 · ~1s

> **VO:** Financial modeling.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2006-2008: university labs and research supercomputers, programmers coding at night, the 2008 financial crisis on Wall Street with crashing red charts.

SCENE: Stock charts.

ON-SCREEN TEXT: none.

MOOD: Explanatory.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 265 · ~2s

> **VO:** Any problem that can be split

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2006-2008: university labs and research supercomputers, programmers coding at night, the 2008 financial crisis on Wall Street with crashing red charts.

SCENE: A big puzzle being split into tiny pieces. Wide/establishing framing.

ON-SCREEN TEXT: none.

MOOD: Explanatory.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 266 · ~2s

> **VO:** into thousands of small pieces.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2006-2008: university labs and research supercomputers, programmers coding at night, the 2008 financial crisis on Wall Street with crashing red charts.

SCENE: Same scene, camera moved slightly closer (gentle push-in, beat 2 of 2), small change in pose/expression to show the moment progressing: A big puzzle being split into tiny pieces.

ON-SCREEN TEXT: none.

MOOD: Explanatory.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 267 · ~2s

> **VO:** A few researchers were already hacking

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2006-2008: university labs and research supercomputers, programmers coding at night, the 2008 financial crisis on Wall Street with crashing red charts.

SCENE: A researcher typing code at night with energy drinks. Wide/establishing framing.

CHARACTERS IN FRAME:
- IAN BUCK (young researcher, mid-2000s, simplified caricature): round beige head, short messy brown hair, grey hoodie, laptop under arm, eager smile.

ON-SCREEN TEXT: none.

MOOD: Hacky.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 268 · ~2s

> **VO:** GPUs to do scientific work.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2006-2008: university labs and research supercomputers, programmers coding at night, the 2008 financial crisis on Wall Street with crashing red charts.

SCENE: Same scene, camera moved slightly closer (gentle push-in, beat 2 of 2), small change in pose/expression to show the moment progressing: A researcher typing code at night with energy drinks.

CHARACTERS IN FRAME:
- IAN BUCK (young researcher, mid-2000s, simplified caricature): round beige head, short messy brown hair, grey hoodie, laptop under arm, eager smile.

ON-SCREEN TEXT: none.

MOOD: Hacky.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 269 · ~2s

> **VO:** But it was incredibly hard.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2006-2008: university labs and research supercomputers, programmers coding at night, the 2008 financial crisis on Wall Street with crashing red charts.

SCENE: A tangled mess of code.

ON-SCREEN TEXT: none.

MOOD: Frustrating.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 270 · ~3s

> **VO:** They had to trick the chip into thinking

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2006-2008: university labs and research supercomputers, programmers coding at night, the 2008 financial crisis on Wall Street with crashing red charts.

SCENE: A math equation wearing a video-game costume disguise. Wide/establishing framing.

ON-SCREEN TEXT: none.

MOOD: Comedic.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 271 · ~2.5s

> **VO:** their math problems were video game graphics.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2006-2008: university labs and research supercomputers, programmers coding at night, the 2008 financial crisis on Wall Street with crashing red charts.

SCENE: Same scene, camera moved slightly closer (gentle push-in, beat 2 of 2), small change in pose/expression to show the moment progressing: A math equation wearing a video-game costume disguise.

ON-SCREEN TEXT: none.

MOOD: Comedic.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 272 · ~2s

> **VO:** One of those researchers was a

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2006-2008: university labs and research supercomputers, programmers coding at night, the 2008 financial crisis on Wall Street with crashing red charts.

SCENE: Ian Buck at a Stanford lab. Wide/establishing framing.

CHARACTERS IN FRAME:
- IAN BUCK (young researcher, mid-2000s, simplified caricature): round beige head, short messy brown hair, grey hoodie, laptop under arm, eager smile.

ON-SCREEN TEXT: "Ian Buck" in the handwritten marker font, clearly legible, spelled exactly.

MOOD: Introductory.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 273 · ~2s

> **VO:** Stanford student named Ian Buck.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2006-2008: university labs and research supercomputers, programmers coding at night, the 2008 financial crisis on Wall Street with crashing red charts.

SCENE: Same scene, camera moved slightly closer (gentle push-in, beat 2 of 2), small change in pose/expression to show the moment progressing: Ian Buck at a Stanford lab.

CHARACTERS IN FRAME:
- IAN BUCK (young researcher, mid-2000s, simplified caricature): round beige head, short messy brown hair, grey hoodie, laptop under arm, eager smile.

ON-SCREEN TEXT: "Ian Buck" in the handwritten marker font, clearly legible, spelled exactly.

MOOD: Introductory.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 274 · ~1s

> **VO:** Nvidia hired him.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2006-2008: university labs and research supercomputers, programmers coding at night, the 2008 financial crisis on Wall Street with crashing red charts.

SCENE: Jensen handing Ian a badge.

CHARACTERS IN FRAME:
- JENSEN HUANG today (simplified caricature): round beige head, swept-back silver-grey and black hair, confident warm grin, signature black leather jacket over a black t-shirt, black jeans, black shoes.
- IAN BUCK (young researcher, mid-2000s, simplified caricature): round beige head, short messy brown hair, grey hoodie, laptop under arm, eager smile.

ON-SCREEN TEXT: none.

MOOD: Exciting.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 275 · ~2.5s

> **VO:** And together, they built something called CUDA.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2006-2008: university labs and research supercomputers, programmers coding at night, the 2008 financial crisis on Wall Street with crashing red charts.

SCENE: Ian and engineers building a glowing toolbox labelled 'CUDA'.

CHARACTERS IN FRAME:
- IAN BUCK (young researcher, mid-2000s, simplified caricature): round beige head, short messy brown hair, grey hoodie, laptop under arm, eager smile.
- ENGINEERS: generic bean-people of varied skin tones in casual tech clothes (polo shirts, hoodies, lanyards), some with glasses.

ON-SCREEN TEXT: "CUDA" in the handwritten marker font, clearly legible, spelled exactly.

MOOD: Innovative.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 276 · ~1.5s

> **VO:** CUDA, released in 2007,

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2006-2008: university labs and research supercomputers, programmers coding at night, the 2008 financial crisis on Wall Street with crashing red charts.

SCENE: Programmers using the CUDA toolbox on various problems. Wide/establishing framing.

CHARACTERS IN FRAME:
- ENGINEERS: generic bean-people of varied skin tones in casual tech clothes (polo shirts, hoodies, lanyards), some with glasses.

ON-SCREEN TEXT: "2007" in the handwritten marker font, clearly legible, spelled exactly.

MOOD: Empowering.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 277 · ~3s

> **VO:** was a way for programmers to use Nvidia's

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2006-2008: university labs and research supercomputers, programmers coding at night, the 2008 financial crisis on Wall Street with crashing red charts.

SCENE: Same scene, camera moved slightly closer (gentle push-in, beat 2 of 3), small change in pose/expression to show the moment progressing: Programmers using the CUDA toolbox on various problems.

CHARACTERS IN FRAME:
- ENGINEERS: generic bean-people of varied skin tones in casual tech clothes (polo shirts, hoodies, lanyards), some with glasses.

ON-SCREEN TEXT: "2007" in the handwritten marker font, clearly legible, spelled exactly.

MOOD: Empowering.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 278 · ~3s

> **VO:** GPUs for almost any kind of heavy math.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2006-2008: university labs and research supercomputers, programmers coding at night, the 2008 financial crisis on Wall Street with crashing red charts.

SCENE: Same scene, camera moved slightly closer (gentle push-in, beat 3 of 3), small change in pose/expression to show the moment progressing: Programmers using the CUDA toolbox on various problems.

CHARACTERS IN FRAME:
- ENGINEERS: generic bean-people of varied skin tones in casual tech clothes (polo shirts, hoodies, lanyards), some with glasses.

ON-SCREEN TEXT: "2007" in the handwritten marker font, clearly legible, spelled exactly.

MOOD: Empowering.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 279 · ~1s

> **VO:** Not just games.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2006-2008: university labs and research supercomputers, programmers coding at night, the 2008 financial crisis on Wall Street with crashing red charts.

SCENE: Game icon crossed out partially.

ON-SCREEN TEXT: none.

MOOD: Explanatory.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 280 · ~3s

> **VO:** Basically, it turned a gaming chip into a

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2006-2008: university labs and research supercomputers, programmers coding at night, the 2008 financial crisis on Wall Street with crashing red charts.

SCENE: A graphics card box on a shop shelf transforming into a giant supercomputer. Wide/establishing framing.

ON-SCREEN TEXT: none.

MOOD: Amazing.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 281 · ~2.5s

> **VO:** supercomputer you could buy at a store.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2006-2008: university labs and research supercomputers, programmers coding at night, the 2008 financial crisis on Wall Street with crashing red charts.

SCENE: Same scene, camera moved slightly closer (gentle push-in, beat 2 of 2), small change in pose/expression to show the moment progressing: A graphics card box on a shop shelf transforming into a giant supercomputer.

ON-SCREEN TEXT: none.

MOOD: Amazing.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 282 · ~1.5s

> **VO:** But here's the catch.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2006-2008: university labs and research supercomputers, programmers coding at night, the 2008 financial crisis on Wall Street with crashing red charts.

SCENE: Fishhook icon.

ON-SCREEN TEXT: none.

MOOD: Uh-oh.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 283 · ~1.5s

> **VO:** To make CUDA work,

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2006-2008: university labs and research supercomputers, programmers coding at night, the 2008 financial crisis on Wall Street with crashing red charts.

SCENE: Every chip on a conveyor getting a CUDA sticker. Wide/establishing framing.

ON-SCREEN TEXT: none.

MOOD: Costly.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 284 · ~2s

> **VO:** Nvidia had to build it into

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2006-2008: university labs and research supercomputers, programmers coding at night, the 2008 financial crisis on Wall Street with crashing red charts.

SCENE: Same scene, camera moved slightly closer (gentle push-in, beat 2 of 3), small change in pose/expression to show the moment progressing: Every chip on a conveyor getting a CUDA sticker.

ON-SCREEN TEXT: none.

MOOD: Costly.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 285 · ~2s

> **VO:** every single chip it made.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2006-2008: university labs and research supercomputers, programmers coding at night, the 2008 financial crisis on Wall Street with crashing red charts.

SCENE: Same scene, camera moved slightly closer (gentle push-in, beat 3 of 3), small change in pose/expression to show the moment progressing: Every chip on a conveyor getting a CUDA sticker.

ON-SCREEN TEXT: none.

MOOD: Costly.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 286 · ~2s

> **VO:** That made the chips more expensive.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2006-2008: university labs and research supercomputers, programmers coding at night, the 2008 financial crisis on Wall Street with crashing red charts.

SCENE: Price tag going up.

ON-SCREEN TEXT: none.

MOOD: Costly.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 287 · ~1.5s

> **VO:** It cut into profits.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2006-2008: university labs and research supercomputers, programmers coding at night, the 2008 financial crisis on Wall Street with crashing red charts.

SCENE: Scissors cutting a profit bar.

ON-SCREEN TEXT: none.

MOOD: Costly.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 288 · ~2.5s

> **VO:** And for years, almost nobody used it.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2006-2008: university labs and research supercomputers, programmers coding at night, the 2008 financial crisis on Wall Street with crashing red charts.

SCENE: An empty CUDA classroom with tumbleweed.

ON-SCREEN TEXT: none.

MOOD: Lonely.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 289 · ~1s

> **VO:** Gamers didn't care.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2006-2008: university labs and research supercomputers, programmers coding at night, the 2008 financial crisis on Wall Street with crashing red charts.

SCENE: Gamers shrugging.

CHARACTERS IN FRAME:
- GAMERS: generic bean-people of varied skin tones in t-shirts and hoodies, some with headsets, excited faces.

ON-SCREEN TEXT: none.

MOOD: Indifferent.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 290 · ~1s

> **VO:** Investors were confused.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2006-2008: university labs and research supercomputers, programmers coding at night, the 2008 financial crisis on Wall Street with crashing red charts.

SCENE: Investors scratching heads.

CHARACTERS IN FRAME:
- WALL STREET INVESTORS: generic bean-people of varied skin tones in dark suits and ties, holding phones and charts.

ON-SCREEN TEXT: none.

MOOD: Confused.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 291 · ~3s

> **VO:** Why is a video game company spending billions

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2006-2008: university labs and research supercomputers, programmers coding at night, the 2008 financial crisis on Wall Street with crashing red charts.

SCENE: Investors pointing angrily at a chart. Wide/establishing framing.

CHARACTERS IN FRAME:
- WALL STREET INVESTORS: generic bean-people of varied skin tones in dark suits and ties, holding phones and charts.

ON-SCREEN TEXT: none.

MOOD: Frustrated.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 292 · ~2.5s

> **VO:** on science tools that nobody is buying?

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2006-2008: university labs and research supercomputers, programmers coding at night, the 2008 financial crisis on Wall Street with crashing red charts.

SCENE: Same scene, camera moved slightly closer (gentle push-in, beat 2 of 2), small change in pose/expression to show the moment progressing: Investors pointing angrily at a chart.

CHARACTERS IN FRAME:
- WALL STREET INVESTORS: generic bean-people of varied skin tones in dark suits and ties, holding phones and charts.

ON-SCREEN TEXT: none.

MOOD: Frustrated.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 293 · ~2s

> **VO:** And then, things got even worse.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2006-2008: university labs and research supercomputers, programmers coding at night, the 2008 financial crisis on Wall Street with crashing red charts.

SCENE: Storm clouds.

ON-SCREEN TEXT: none.

MOOD: Ominous.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 294 · ~2.5s

> **VO:** In 2008, the global financial crisis hit.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2006-2008: university labs and research supercomputers, programmers coding at night, the 2008 financial crisis on Wall Street with crashing red charts.

SCENE: Wall Street with crashing red charts and worried people.

CHARACTERS IN FRAME:
- WALL STREET INVESTORS: generic bean-people of varied skin tones in dark suits and ties, holding phones and charts.

ON-SCREEN TEXT: "2008" in the handwritten marker font, clearly legible, spelled exactly.

MOOD: Crisis.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 295 · ~1.5s

> **VO:** On top of that,

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2006-2008: university labs and research supercomputers, programmers coding at night, the 2008 financial crisis on Wall Street with crashing red charts.

SCENE: A laptop smoking with a broken chip. Wide/establishing framing.

ON-SCREEN TEXT: none.

MOOD: Bad.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 296 · ~3s

> **VO:** Nvidia discovered that some of its laptop chips

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2006-2008: university labs and research supercomputers, programmers coding at night, the 2008 financial crisis on Wall Street with crashing red charts.

SCENE: Same scene, camera moved slightly closer (gentle push-in, beat 2 of 3), small change in pose/expression to show the moment progressing: A laptop smoking with a broken chip.

ON-SCREEN TEXT: none.

MOOD: Bad.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 297 · ~2.5s

> **VO:** were failing because of a manufacturing defect.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2006-2008: university labs and research supercomputers, programmers coding at night, the 2008 financial crisis on Wall Street with crashing red charts.

SCENE: Same scene, camera moved slightly closer (gentle push-in, beat 3 of 3), small change in pose/expression to show the moment progressing: A laptop smoking with a broken chip.

ON-SCREEN TEXT: none.

MOOD: Bad.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 298 · ~2.5s

> **VO:** It had to set aside around two

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2006-2008: university labs and research supercomputers, programmers coding at night, the 2008 financial crisis on Wall Street with crashing red charts.

SCENE: A pile of money labelled '$200M'. Wide/establishing framing.

ON-SCREEN TEXT: "~$200 million" in the handwritten marker font, clearly legible, spelled exactly.

MOOD: Costly.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 299 · ~2.5s

> **VO:** hundred million dollars to deal with it.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2006-2008: university labs and research supercomputers, programmers coding at night, the 2008 financial crisis on Wall Street with crashing red charts.

SCENE: Same scene, camera moved slightly closer (gentle push-in, beat 2 of 2), small change in pose/expression to show the moment progressing: A pile of money labelled '$200M'.

ON-SCREEN TEXT: "~$200 million" in the handwritten marker font, clearly legible, spelled exactly.

MOOD: Costly.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 300 · ~1s

> **VO:** Nvidia's stock collapsed.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2006-2008: university labs and research supercomputers, programmers coding at night, the 2008 financial crisis on Wall Street with crashing red charts.

SCENE: Stock chart plummeting.

ON-SCREEN TEXT: none.

MOOD: Shocking.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 301 · ~2s

> **VO:** From its peak in 2007 to

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2006-2008: university labs and research supercomputers, programmers coding at night, the 2008 financial crisis on Wall Street with crashing red charts.

SCENE: Chart from 2007 peak to 2008 bottom. Wide/establishing framing.

ON-SCREEN TEXT: "-80%" in the handwritten marker font, clearly legible, spelled exactly.

MOOD: Devastating.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 302 · ~2s

> **VO:** the bottom in late 2008,

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2006-2008: university labs and research supercomputers, programmers coding at night, the 2008 financial crisis on Wall Street with crashing red charts.

SCENE: Same scene, camera moved slightly closer (gentle push-in, beat 2 of 3), small change in pose/expression to show the moment progressing: Chart from 2007 peak to 2008 bottom.

ON-SCREEN TEXT: "-80%" in the handwritten marker font, clearly legible, spelled exactly.

MOOD: Devastating.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 303 · ~3.5s

> **VO:** it lost more than eighty percent of its value.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2006-2008: university labs and research supercomputers, programmers coding at night, the 2008 financial crisis on Wall Street with crashing red charts.

SCENE: Same scene, camera moved slightly closer (gentle push-in, beat 3 of 3), small change in pose/expression to show the moment progressing: Chart from 2007 peak to 2008 bottom.

ON-SCREEN TEXT: "-80%" in the handwritten marker font, clearly legible, spelled exactly.

MOOD: Devastating.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 304 · ~2.5s

> **VO:** Wall Street wanted Jensen to cut CUDA.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2006-2008: university labs and research supercomputers, programmers coding at night, the 2008 financial crisis on Wall Street with crashing red charts.

SCENE: Investors holding giant scissors toward the CUDA toolbox.

CHARACTERS IN FRAME:
- WALL STREET INVESTORS: generic bean-people of varied skin tones in dark suits and ties, holding phones and charts.

ON-SCREEN TEXT: none.

MOOD: Pressure.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 305 · ~2s

> **VO:** Focus on games. Stop wasting money.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2006-2008: university labs and research supercomputers, programmers coding at night, the 2008 financial crisis on Wall Street with crashing red charts.

SCENE: Investor speech bubbles.

CHARACTERS IN FRAME:
- WALL STREET INVESTORS: generic bean-people of varied skin tones in dark suits and ties, holding phones and charts.

ON-SCREEN TEXT: "Focus on games!" in the handwritten marker font, clearly legible, spelled exactly.

MOOD: Pressure.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 306 · ~1s

> **VO:** Jensen refused.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2006-2008: university labs and research supercomputers, programmers coding at night, the 2008 financial crisis on Wall Street with crashing red charts.

SCENE: Jensen standing in front of the CUDA toolbox, arms crossed.

CHARACTERS IN FRAME:
- JENSEN HUANG today (simplified caricature): round beige head, swept-back silver-grey and black hair, confident warm grin, signature black leather jacket over a black t-shirt, black jeans, black shoes.

ON-SCREEN TEXT: none.

MOOD: Defiant.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 307 · ~1.5s

> **VO:** He believed that someday,

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2006-2008: university labs and research supercomputers, programmers coding at night, the 2008 financial crisis on Wall Street with crashing red charts.

SCENE: Jensen looking at a distant horizon with a glowing sunrise. Wide/establishing framing.

CHARACTERS IN FRAME:
- JENSEN HUANG today (simplified caricature): round beige head, swept-back silver-grey and black hair, confident warm grin, signature black leather jacket over a black t-shirt, black jeans, black shoes.

ON-SCREEN TEXT: none.

MOOD: Visionary.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 308 · ~3s

> **VO:** the world would need what Nvidia was building.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2006-2008: university labs and research supercomputers, programmers coding at night, the 2008 financial crisis on Wall Street with crashing red charts.

SCENE: Same scene, camera moved slightly closer (gentle push-in, beat 2 of 2), small change in pose/expression to show the moment progressing: Jensen looking at a distant horizon with a glowing sunrise.

CHARACTERS IN FRAME:
- JENSEN HUANG today (simplified caricature): round beige head, swept-back silver-grey and black hair, confident warm grin, signature black leather jacket over a black t-shirt, black jeans, black shoes.

ON-SCREEN TEXT: none.

MOOD: Visionary.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 309 · ~3s

> **VO:** He just didn't know exactly when, or why.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2006-2008: university labs and research supercomputers, programmers coding at night, the 2008 financial crisis on Wall Street with crashing red charts.

SCENE: Question marks over the horizon.

CHARACTERS IN FRAME:
- JENSEN HUANG today (simplified caricature): round beige head, swept-back silver-grey and black hair, confident warm grin, signature black leather jacket over a black t-shirt, black jeans, black shoes.

ON-SCREEN TEXT: none.

MOOD: Uncertain.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 310 · ~2s

> **VO:** He was about to find out.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2006-2008: university labs and research supercomputers, programmers coding at night, the 2008 financial crisis on Wall Street with crashing red charts.

SCENE: A spark on the horizon.

ON-SCREEN TEXT: none.

MOOD: Teasing.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```


---

## Chapter 7 – The Phone Failure

### Shot 311 · ~2s

> **VO:** Chapter seven. The phone failure.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: Late 2000s to mid-2010s: the smartphone boom, mobile chips, an electric car's large touchscreen dashboard, a handheld hybrid game console.

SCENE: Chapter title card. Flat cool grey background filling the frame, a simple hand-drawn cracked smartphone illustrated small and centred under the title, generous empty space, gentle subtle vignette in a slightly darker flat shade at the corners.

ON-SCREEN TEXT: "Chapter 7: The Phone Failure" in the handwritten marker font, clearly legible, spelled exactly.

MOOD: Clean, calm, inviting title card.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 312 · ~2s

> **VO:** But first, one more failure.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: Late 2000s to mid-2010s: the smartphone boom, mobile chips, an electric car's large touchscreen dashboard, a handheld hybrid game console.

SCENE: A sad trombone icon.

ON-SCREEN TEXT: none.

MOOD: Comedic.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 313 · ~2.5s

> **VO:** In the late 2000s, smartphones were exploding.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: Late 2000s to mid-2010s: the smartphone boom, mobile chips, an electric car's large touchscreen dashboard, a handheld hybrid game console.

SCENE: Everyone on the street looking at smartphones.

CHARACTERS IN FRAME:
- BACKGROUND PEOPLE: generic bean-people of varied skin tones in everyday clothes matching the scene's era.

ON-SCREEN TEXT: none.

MOOD: Trendy.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 314 · ~1s

> **VO:** Nvidia wanted in.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: Late 2000s to mid-2010s: the smartphone boom, mobile chips, an electric car's large touchscreen dashboard, a handheld hybrid game console.

SCENE: Jensen holding a phone eagerly.

CHARACTERS IN FRAME:
- JENSEN HUANG today (simplified caricature): round beige head, swept-back silver-grey and black hair, confident warm grin, signature black leather jacket over a black t-shirt, black jeans, black shoes.

ON-SCREEN TEXT: none.

MOOD: Eager.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 315 · ~3s

> **VO:** So it built a mobile chip called Tegra,

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: Late 2000s to mid-2010s: the smartphone boom, mobile chips, an electric car's large touchscreen dashboard, a handheld hybrid game console.

SCENE: A small chip labelled 'Tegra' inside a phone outline. Wide/establishing framing.

ON-SCREEN TEXT: "Tegra" in the handwritten marker font, clearly legible, spelled exactly.

MOOD: Hopeful.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 316 · ~2s

> **VO:** designed for phones and tablets.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: Late 2000s to mid-2010s: the smartphone boom, mobile chips, an electric car's large touchscreen dashboard, a handheld hybrid game console.

SCENE: Same scene, camera moved slightly closer (gentle push-in, beat 2 of 2), small change in pose/expression to show the moment progressing: A small chip labelled 'Tegra' inside a phone outline.

ON-SCREEN TEXT: "Tegra" in the handwritten marker font, clearly legible, spelled exactly.

MOOD: Hopeful.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 317 · ~1.5s

> **VO:** It didn't go well.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: Late 2000s to mid-2010s: the smartphone boom, mobile chips, an electric car's large touchscreen dashboard, a handheld hybrid game console.

SCENE: The chip with a sad face.

ON-SCREEN TEXT: none.

MOOD: Disappointing.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 318 · ~1s

> **VO:** Companies like Qualcomm,

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: Late 2000s to mid-2010s: the smartphone boom, mobile chips, an electric car's large touchscreen dashboard, a handheld hybrid game console.

SCENE: Two big chips labelled 'Qualcomm' and 'Apple' in plain text pushing Tegra off a table. Wide/establishing framing.

ON-SCREEN TEXT: none.

MOOD: Competitive.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 319 · ~2.5s

> **VO:** and later Apple with its own chips,

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: Late 2000s to mid-2010s: the smartphone boom, mobile chips, an electric car's large touchscreen dashboard, a handheld hybrid game console.

SCENE: Same scene, camera moved slightly closer (gentle push-in, beat 2 of 3), small change in pose/expression to show the moment progressing: Two big chips labelled 'Qualcomm' and 'Apple' in plain text pushing Tegra off a table.

ON-SCREEN TEXT: none.

MOOD: Competitive.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 320 · ~1.5s

> **VO:** dominated the phone world.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: Late 2000s to mid-2010s: the smartphone boom, mobile chips, an electric car's large touchscreen dashboard, a handheld hybrid game console.

SCENE: Same scene, camera moved slightly closer (gentle push-in, beat 3 of 3), small change in pose/expression to show the moment progressing: Two big chips labelled 'Qualcomm' and 'Apple' in plain text pushing Tegra off a table.

ON-SCREEN TEXT: none.

MOOD: Competitive.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 321 · ~1.5s

> **VO:** Nvidia was squeezed out.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: Late 2000s to mid-2010s: the smartphone boom, mobile chips, an electric car's large touchscreen dashboard, a handheld hybrid game console.

SCENE: Tegra squished between two giants.

ON-SCREEN TEXT: none.

MOOD: Defeat.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 322 · ~1.5s

> **VO:** By the mid-2010s,

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: Late 2000s to mid-2010s: the smartphone boom, mobile chips, an electric car's large touchscreen dashboard, a handheld hybrid game console.

SCENE: A phone dropped in a bin. Wide/establishing framing.

ON-SCREEN TEXT: none.

MOOD: Defeat.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 323 · ~2.5s

> **VO:** it had mostly given up on phones.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: Late 2000s to mid-2010s: the smartphone boom, mobile chips, an electric car's large touchscreen dashboard, a handheld hybrid game console.

SCENE: Same scene, camera moved slightly closer (gentle push-in, beat 2 of 2), small change in pose/expression to show the moment progressing: A phone dropped in a bin.

ON-SCREEN TEXT: none.

MOOD: Defeat.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 324 · ~3.5s

> **VO:** But nothing in Nvidia's story is ever really wasted.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: Late 2000s to mid-2010s: the smartphone boom, mobile chips, an electric car's large touchscreen dashboard, a handheld hybrid game console.

SCENE: Tegra chip being rescued from the bin.

ON-SCREEN TEXT: none.

MOOD: Hopeful.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 325 · ~2s

> **VO:** A Tegra chip ended up in

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: Late 2000s to mid-2010s: the smartphone boom, mobile chips, an electric car's large touchscreen dashboard, a handheld hybrid game console.

SCENE: A sleek electric car's interior with a huge vertical touchscreen. Wide/establishing framing.

ON-SCREEN TEXT: "Tesla Model S" in the handwritten marker font, clearly legible, spelled exactly.

MOOD: Cool.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 326 · ~2s

> **VO:** the early Tesla Model S dashboard.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: Late 2000s to mid-2010s: the smartphone boom, mobile chips, an electric car's large touchscreen dashboard, a handheld hybrid game console.

SCENE: Same scene, camera moved slightly closer (gentle push-in, beat 2 of 2), small change in pose/expression to show the moment progressing: A sleek electric car's interior with a huge vertical touchscreen.

ON-SCREEN TEXT: "Tesla Model S" in the handwritten marker font, clearly legible, spelled exactly.

MOOD: Cool.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 327 · ~3.5s

> **VO:** And later, a Tegra chip became the brain of

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: Late 2000s to mid-2010s: the smartphone boom, mobile chips, an electric car's large touchscreen dashboard, a handheld hybrid game console.

SCENE: A handheld console with detachable side controllers glowing. Wide/establishing framing.

CHARACTERS IN FRAME:
- GAMERS: generic bean-people of varied skin tones in t-shirts and hoodies, some with headsets, excited faces.

ON-SCREEN TEXT: none.

MOOD: Exciting.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 328 · ~3.5s

> **VO:** one of the best-selling game consoles of all time.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: Late 2000s to mid-2010s: the smartphone boom, mobile chips, an electric car's large touchscreen dashboard, a handheld hybrid game console.

SCENE: Same scene, camera moved slightly closer (gentle push-in, beat 2 of 2), small change in pose/expression to show the moment progressing: A handheld console with detachable side controllers glowing.

CHARACTERS IN FRAME:
- GAMERS: generic bean-people of varied skin tones in t-shirts and hoodies, some with headsets, excited faces.

ON-SCREEN TEXT: none.

MOOD: Exciting.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 329 · ~1s

> **VO:** The Nintendo Switch.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: Late 2000s to mid-2010s: the smartphone boom, mobile chips, an electric car's large touchscreen dashboard, a handheld hybrid game console.

SCENE: Kids playing on the handheld console.

CHARACTERS IN FRAME:
- GAMERS: generic bean-people of varied skin tones in t-shirts and hoodies, some with headsets, excited faces.

ON-SCREEN TEXT: "Nintendo Switch" in the handwritten marker font, clearly legible, spelled exactly.

MOOD: Fun.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 330 · ~2s

> **VO:** Still, by the early 2010s,

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: Late 2000s to mid-2010s: the smartphone boom, mobile chips, an electric car's large touchscreen dashboard, a handheld hybrid game console.

SCENE: Nvidia standing on the beach as a big wave labelled 'Mobile' passes. Wide/establishing framing.

ON-SCREEN TEXT: none.

MOOD: Missed opportunity.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 331 · ~2.5s

> **VO:** Nvidia was seen as a gaming graphics

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: Late 2000s to mid-2010s: the smartphone boom, mobile chips, an electric car's large touchscreen dashboard, a handheld hybrid game console.

SCENE: Same scene, camera moved slightly closer (gentle push-in, beat 2 of 3), small change in pose/expression to show the moment progressing: Nvidia standing on the beach as a big wave labelled 'Mobile' passes.

ON-SCREEN TEXT: none.

MOOD: Missed opportunity.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 332 · ~2.5s

> **VO:** company that had missed the mobile wave.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: Late 2000s to mid-2010s: the smartphone boom, mobile chips, an electric car's large touchscreen dashboard, a handheld hybrid game console.

SCENE: Same scene, camera moved slightly closer (gentle push-in, beat 3 of 3), small change in pose/expression to show the moment progressing: Nvidia standing on the beach as a big wave labelled 'Mobile' passes.

ON-SCREEN TEXT: none.

MOOD: Missed opportunity.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 333 · ~2.5s

> **VO:** A solid business. Not an exciting one.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: Late 2000s to mid-2010s: the smartphone boom, mobile chips, an electric car's large touchscreen dashboard, a handheld hybrid game console.

SCENE: A neutral face emoji.

ON-SCREEN TEXT: none.

MOOD: Meh.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 334 · ~3.5s

> **VO:** And then, in a bedroom in Toronto, everything changed.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: Late 2000s to mid-2010s: the smartphone boom, mobile chips, an electric car's large touchscreen dashboard, a handheld hybrid game console.

SCENE: Toronto skyline at night with a tower; a single lit window.

ON-SCREEN TEXT: "Toronto" in the handwritten marker font, clearly legible, spelled exactly.

MOOD: Intriguing.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```


---

## Chapter 8 – The Big Bang of AI

### Shot 335 · ~2.5s

> **VO:** Chapter eight. The big bang of AI.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2012-2016: University of Toronto, a student bedroom with a humming gaming PC, the ImageNet competition leaderboard, AI research labs, a small San Francisco nonprofit office.

SCENE: Chapter title card. Flat midnight indigo background filling the frame, a simple hand-drawn glowing brain made of circuit lines illustrated small and centred under the title, generous empty space, gentle subtle vignette in a slightly darker flat shade at the corners.

ON-SCREEN TEXT: "Chapter 8: The Big Bang of AI" in the handwritten marker font, clearly legible, spelled exactly.

MOOD: Clean, calm, inviting title card.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 336 · ~1s

> **VO:** It's 2012.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2012-2016: University of Toronto, a student bedroom with a humming gaming PC, the ImageNet competition leaderboard, AI research labs, a small San Francisco nonprofit office.

SCENE: A modern university campus in winter, snow on the ground.

CHARACTERS IN FRAME:
- BACKGROUND PEOPLE: generic bean-people of varied skin tones in everyday clothes matching the scene's era.

ON-SCREEN TEXT: "2012" in the handwritten marker font, clearly legible, spelled exactly.

MOOD: Calm.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 337 · ~2s

> **VO:** A university student named Alex Krizhevsky,

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2012-2016: University of Toronto, a student bedroom with a humming gaming PC, the ImageNet competition leaderboard, AI research labs, a small San Francisco nonprofit office.

SCENE: Alex, Ilya and Professor Hinton gathered around a whiteboard covered in connected circles diagrams. Wide/establishing framing.

CHARACTERS IN FRAME:
- ALEX KRIZHEVSKY (university student, 2012, simplified caricature): round beige head, short dark-brown hair, light stubble, plain dark-blue t-shirt, focused tired eyes.
- ILYA SUTSKEVER (researcher, 2012, simplified caricature): round beige head, short dark hair receding at the temples, intense eyes, grey t-shirt.
- GEOFFREY HINTON (professor, simplified caricature): older, round beige head, white receding hair, kind smile, grey sweater over a collared shirt.

ON-SCREEN TEXT: "Neural Network" in the handwritten marker font, clearly legible, spelled exactly.

MOOD: Intellectual.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 338 · ~1.5s

> **VO:** working with Ilya Sutskever,

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2012-2016: University of Toronto, a student bedroom with a humming gaming PC, the ImageNet competition leaderboard, AI research labs, a small San Francisco nonprofit office.

SCENE: Same scene, camera moved slightly closer (gentle push-in, beat 2 of 4), small change in pose/expression to show the moment progressing: Alex, Ilya and Professor Hinton gathered around a whiteboard covered in connected circles diagrams.

CHARACTERS IN FRAME:
- ALEX KRIZHEVSKY (university student, 2012, simplified caricature): round beige head, short dark-brown hair, light stubble, plain dark-blue t-shirt, focused tired eyes.
- ILYA SUTSKEVER (researcher, 2012, simplified caricature): round beige head, short dark hair receding at the temples, intense eyes, grey t-shirt.
- GEOFFREY HINTON (professor, simplified caricature): older, round beige head, white receding hair, kind smile, grey sweater over a collared shirt.

ON-SCREEN TEXT: "Neural Network" in the handwritten marker font, clearly legible, spelled exactly.

MOOD: Intellectual.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 339 · ~2s

> **VO:** and their professor, Geoffrey Hinton,

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2012-2016: University of Toronto, a student bedroom with a humming gaming PC, the ImageNet competition leaderboard, AI research labs, a small San Francisco nonprofit office.

SCENE: Same scene, camera moved slightly closer (gentle push-in, beat 3 of 4), small change in pose/expression to show the moment progressing: Alex, Ilya and Professor Hinton gathered around a whiteboard covered in connected circles diagrams.

CHARACTERS IN FRAME:
- ALEX KRIZHEVSKY (university student, 2012, simplified caricature): round beige head, short dark-brown hair, light stubble, plain dark-blue t-shirt, focused tired eyes.
- ILYA SUTSKEVER (researcher, 2012, simplified caricature): round beige head, short dark hair receding at the temples, intense eyes, grey t-shirt.
- GEOFFREY HINTON (professor, simplified caricature): older, round beige head, white receding hair, kind smile, grey sweater over a collared shirt.

ON-SCREEN TEXT: "Neural Network" in the handwritten marker font, clearly legible, spelled exactly.

MOOD: Intellectual.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 340 · ~2.5s

> **VO:** are building something called a neural network.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2012-2016: University of Toronto, a student bedroom with a humming gaming PC, the ImageNet competition leaderboard, AI research labs, a small San Francisco nonprofit office.

SCENE: Same scene, camera moved slightly closer (gentle push-in, beat 4 of 4), small change in pose/expression to show the moment progressing: Alex, Ilya and Professor Hinton gathered around a whiteboard covered in connected circles diagrams.

CHARACTERS IN FRAME:
- ALEX KRIZHEVSKY (university student, 2012, simplified caricature): round beige head, short dark-brown hair, light stubble, plain dark-blue t-shirt, focused tired eyes.
- ILYA SUTSKEVER (researcher, 2012, simplified caricature): round beige head, short dark hair receding at the temples, intense eyes, grey t-shirt.
- GEOFFREY HINTON (professor, simplified caricature): older, round beige head, white receding hair, kind smile, grey sweater over a collared shirt.

ON-SCREEN TEXT: "Neural Network" in the handwritten marker font, clearly legible, spelled exactly.

MOOD: Intellectual.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 341 · ~2s

> **VO:** A neural network is a kind

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2012-2016: University of Toronto, a student bedroom with a humming gaming PC, the ImageNet competition leaderboard, AI research labs, a small San Francisco nonprofit office.

SCENE: A diagram of glowing circles connected by lines like a brain. Wide/establishing framing.

ON-SCREEN TEXT: none.

MOOD: Explanatory.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 342 · ~2.5s

> **VO:** of computer program that learns by example.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2012-2016: University of Toronto, a student bedroom with a humming gaming PC, the ImageNet competition leaderboard, AI research labs, a small San Francisco nonprofit office.

SCENE: Same scene, camera moved slightly closer (gentle push-in, beat 2 of 2), small change in pose/expression to show the moment progressing: A diagram of glowing circles connected by lines like a brain.

ON-SCREEN TEXT: none.

MOOD: Explanatory.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 343 · ~2.5s

> **VO:** Show it a million pictures of cats,

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2012-2016: University of Toronto, a student bedroom with a humming gaming PC, the ImageNet competition leaderboard, AI research labs, a small San Francisco nonprofit office.

SCENE: A flood of cat pictures pouring into the network; a 'CAT ✓' label appears. Wide/establishing framing.

ON-SCREEN TEXT: none.

MOOD: Playful.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 344 · ~3.5s

> **VO:** and it slowly learns what a cat looks like.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2012-2016: University of Toronto, a student bedroom with a humming gaming PC, the ImageNet competition leaderboard, AI research labs, a small San Francisco nonprofit office.

SCENE: Same scene, camera moved slightly closer (gentle push-in, beat 2 of 2), small change in pose/expression to show the moment progressing: A flood of cat pictures pouring into the network; a 'CAT ✓' label appears.

ON-SCREEN TEXT: none.

MOOD: Playful.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 345 · ~2.5s

> **VO:** The idea had been around for decades,

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2012-2016: University of Toronto, a student bedroom with a humming gaming PC, the ImageNet competition leaderboard, AI research labs, a small San Francisco nonprofit office.

SCENE: An old dusty book titled 'Neural Networks' on a shelf with cobwebs. Wide/establishing framing.

ON-SCREEN TEXT: none.

MOOD: Dormant.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 346 · ~2s

> **VO:** but it never worked very well.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2012-2016: University of Toronto, a student bedroom with a humming gaming PC, the ImageNet competition leaderboard, AI research labs, a small San Francisco nonprofit office.

SCENE: Same scene, camera moved slightly closer (gentle push-in, beat 2 of 2), small change in pose/expression to show the moment progressing: An old dusty book titled 'Neural Networks' on a shelf with cobwebs.

ON-SCREEN TEXT: none.

MOOD: Dormant.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 347 · ~3.5s

> **VO:** Training these networks required an impossible amount of math.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2012-2016: University of Toronto, a student bedroom with a humming gaming PC, the ImageNet competition leaderboard, AI research labs, a small San Francisco nonprofit office.

SCENE: A mountain of equations towering over a tiny computer.

ON-SCREEN TEXT: none.

MOOD: Overwhelming.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 348 · ~1s

> **VO:** But remember.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2012-2016: University of Toronto, a student bedroom with a humming gaming PC, the ImageNet competition leaderboard, AI research labs, a small San Francisco nonprofit office.

SCENE: Finger with red string.

ON-SCREEN TEXT: none.

MOOD: Recall.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 349 · ~3s

> **VO:** Impossible amounts of math, split into tiny pieces,

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2012-2016: University of Toronto, a student bedroom with a humming gaming PC, the ImageNet competition leaderboard, AI research labs, a small San Francisco nonprofit office.

SCENE: The tiny GPU workers swarming the mountain of math. Wide/establishing framing.

ON-SCREEN TEXT: none.

MOOD: Aha.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 350 · ~2.5s

> **VO:** is exactly what GPUs are good at.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2012-2016: University of Toronto, a student bedroom with a humming gaming PC, the ImageNet competition leaderboard, AI research labs, a small San Francisco nonprofit office.

SCENE: Same scene, camera moved slightly closer (gentle push-in, beat 2 of 2), small change in pose/expression to show the moment progressing: The tiny GPU workers swarming the mountain of math.

ON-SCREEN TEXT: none.

MOOD: Aha.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 351 · ~3s

> **VO:** So Alex used two Nvidia gaming graphics cards.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2012-2016: University of Toronto, a student bedroom with a humming gaming PC, the ImageNet competition leaderboard, AI research labs, a small San Francisco nonprofit office.

SCENE: Two gaming graphics cards with green accents on a desk.

CHARACTERS IN FRAME:
- ALEX KRIZHEVSKY (university student, 2012, simplified caricature): round beige head, short dark-brown hair, light stubble, plain dark-blue t-shirt, focused tired eyes.

ON-SCREEN TEXT: none.

MOOD: Humble.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 352 · ~3s

> **VO:** The kind you'd buy to play video games.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2012-2016: University of Toronto, a student bedroom with a humming gaming PC, the ImageNet competition leaderboard, AI research labs, a small San Francisco nonprofit office.

SCENE: A shop shelf with the same cards.

ON-SCREEN TEXT: none.

MOOD: Ordinary.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 353 · ~1s

> **VO:** And using CUDA,

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2012-2016: University of Toronto, a student bedroom with a humming gaming PC, the ImageNet competition leaderboard, AI research labs, a small San Francisco nonprofit office.

SCENE: A cosy bedroom with posters; Alex at a desk with a humming PC, fans spinning, night outside. Wide/establishing framing.

CHARACTERS IN FRAME:
- ALEX KRIZHEVSKY (university student, 2012, simplified caricature): round beige head, short dark-brown hair, light stubble, plain dark-blue t-shirt, focused tired eyes.

ON-SCREEN TEXT: none.

MOOD: Intimate.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 354 · ~2.5s

> **VO:** he trained his neural network on them,

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2012-2016: University of Toronto, a student bedroom with a humming gaming PC, the ImageNet competition leaderboard, AI research labs, a small San Francisco nonprofit office.

SCENE: Same scene, camera moved slightly closer (gentle push-in, beat 2 of 3), small change in pose/expression to show the moment progressing: A cosy bedroom with posters; Alex at a desk with a humming PC, fans spinning, night outside.

CHARACTERS IN FRAME:
- ALEX KRIZHEVSKY (university student, 2012, simplified caricature): round beige head, short dark-brown hair, light stubble, plain dark-blue t-shirt, focused tired eyes.

ON-SCREEN TEXT: none.

MOOD: Intimate.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 355 · ~3s

> **VO:** reportedly from his bedroom at his parents' house.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2012-2016: University of Toronto, a student bedroom with a humming gaming PC, the ImageNet competition leaderboard, AI research labs, a small San Francisco nonprofit office.

SCENE: Same scene, camera moved slightly closer (gentle push-in, beat 3 of 3), small change in pose/expression to show the moment progressing: A cosy bedroom with posters; Alex at a desk with a humming PC, fans spinning, night outside.

CHARACTERS IN FRAME:
- ALEX KRIZHEVSKY (university student, 2012, simplified caricature): round beige head, short dark-brown hair, light stubble, plain dark-blue t-shirt, focused tired eyes.

ON-SCREEN TEXT: none.

MOOD: Intimate.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 356 · ~1.5s

> **VO:** They called it AlexNet.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2012-2016: University of Toronto, a student bedroom with a humming gaming PC, the ImageNet competition leaderboard, AI research labs, a small San Francisco nonprofit office.

SCENE: Hand-lettered 'AlexNet' glowing on the monitor.

CHARACTERS IN FRAME:
- ALEX KRIZHEVSKY (university student, 2012, simplified caricature): round beige head, short dark-brown hair, light stubble, plain dark-blue t-shirt, focused tired eyes.

ON-SCREEN TEXT: "AlexNet" in the handwritten marker font, clearly legible, spelled exactly.

MOOD: Exciting.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 357 · ~2s

> **VO:** And they entered it into a

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2012-2016: University of Toronto, a student bedroom with a humming gaming PC, the ImageNet competition leaderboard, AI research labs, a small San Francisco nonprofit office.

SCENE: A contest leaderboard labelled 'ImageNet'. Wide/establishing framing.

ON-SCREEN TEXT: "ImageNet" in the handwritten marker font, clearly legible, spelled exactly.

MOOD: Competitive.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 358 · ~2s

> **VO:** famous image recognition contest called ImageNet.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2012-2016: University of Toronto, a student bedroom with a humming gaming PC, the ImageNet competition leaderboard, AI research labs, a small San Francisco nonprofit office.

SCENE: Same scene, camera moved slightly closer (gentle push-in, beat 2 of 2), small change in pose/expression to show the moment progressing: A contest leaderboard labelled 'ImageNet'.

ON-SCREEN TEXT: "ImageNet" in the handwritten marker font, clearly legible, spelled exactly.

MOOD: Competitive.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 359 · ~1.5s

> **VO:** It didn't just win.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2012-2016: University of Toronto, a student bedroom with a humming gaming PC, the ImageNet competition leaderboard, AI research labs, a small San Francisco nonprofit office.

SCENE: AlexNet at the top of the leaderboard.

ON-SCREEN TEXT: none.

MOOD: Triumphant.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 360 · ~1.5s

> **VO:** It crushed the competition.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2012-2016: University of Toronto, a student bedroom with a humming gaming PC, the ImageNet competition leaderboard, AI research labs, a small San Francisco nonprofit office.

SCENE: A giant hammer smashing other entries.

ON-SCREEN TEXT: none.

MOOD: Dominant.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 361 · ~2s

> **VO:** Its error rate was dramatically lower

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2012-2016: University of Toronto, a student bedroom with a humming gaming PC, the ImageNet competition leaderboard, AI research labs, a small San Francisco nonprofit office.

SCENE: A bar chart with AlexNet's error bar much shorter. Wide/establishing framing.

ON-SCREEN TEXT: none.

MOOD: Impressive.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 362 · ~2s

> **VO:** than the next best entry.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2012-2016: University of Toronto, a student bedroom with a humming gaming PC, the ImageNet competition leaderboard, AI research labs, a small San Francisco nonprofit office.

SCENE: Same scene, camera moved slightly closer (gentle push-in, beat 2 of 2), small change in pose/expression to show the moment progressing: A bar chart with AlexNet's error bar much shorter.

ON-SCREEN TEXT: none.

MOOD: Impressive.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 363 · ~2s

> **VO:** The AI world was stunned.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2012-2016: University of Toronto, a student bedroom with a humming gaming PC, the ImageNet competition leaderboard, AI research labs, a small San Francisco nonprofit office.

SCENE: Researchers with jaws dropped.

CHARACTERS IN FRAME:
- ENGINEERS: generic bean-people of varied skin tones in casual tech clothes (polo shirts, hoodies, lanyards), some with glasses.

ON-SCREEN TEXT: none.

MOOD: Stunned.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 364 · ~2s

> **VO:** Suddenly, everyone realized two things.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2012-2016: University of Toronto, a student bedroom with a humming gaming PC, the ImageNet competition leaderboard, AI research labs, a small San Francisco nonprofit office.

SCENE: Two fingers held up.

ON-SCREEN TEXT: none.

MOOD: Revelatory.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 365 · ~1.5s

> **VO:** Neural networks actually work.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2012-2016: University of Toronto, a student bedroom with a humming gaming PC, the ImageNet competition leaderboard, AI research labs, a small San Francisco nonprofit office.

SCENE: A check mark next to the network diagram.

ON-SCREEN TEXT: "1. Neural networks work" in the handwritten marker font, clearly legible, spelled exactly.

MOOD: Revelatory.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 366 · ~2.5s

> **VO:** And the key to making them work...

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2012-2016: University of Toronto, a student bedroom with a humming gaming PC, the ImageNet competition leaderboard, AI research labs, a small San Francisco nonprofit office.

SCENE: A golden key shaped like a GPU. Wide/establishing framing.

ON-SCREEN TEXT: "2. GPUs are the key" in the handwritten marker font, clearly legible, spelled exactly.

MOOD: Revelatory.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 367 · ~1s

> **VO:** is Nvidia GPUs.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2012-2016: University of Toronto, a student bedroom with a humming gaming PC, the ImageNet competition leaderboard, AI research labs, a small San Francisco nonprofit office.

SCENE: Same scene, camera moved slightly closer (gentle push-in, beat 2 of 2), small change in pose/expression to show the moment progressing: A golden key shaped like a GPU.

ON-SCREEN TEXT: "2. GPUs are the key" in the handwritten marker font, clearly legible, spelled exactly.

MOOD: Revelatory.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 368 · ~2.5s

> **VO:** Remember CUDA? The project Wall Street hated?

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2012-2016: University of Toronto, a student bedroom with a humming gaming PC, the ImageNet competition leaderboard, AI research labs, a small San Francisco nonprofit office.

SCENE: Flashback of investors with scissors.

CHARACTERS IN FRAME:
- WALL STREET INVESTORS: generic bean-people of varied skin tones in dark suits and ties, holding phones and charts.

ON-SCREEN TEXT: none.

MOOD: Recall.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 369 · ~3s

> **VO:** The thing Jensen spent years and billions on,

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2012-2016: University of Toronto, a student bedroom with a humming gaming PC, the ImageNet competition leaderboard, AI research labs, a small San Francisco nonprofit office.

SCENE: Jensen guarding the CUDA toolbox. Wide/establishing framing.

CHARACTERS IN FRAME:
- JENSEN HUANG today (simplified caricature): round beige head, swept-back silver-grey and black hair, confident warm grin, signature black leather jacket over a black t-shirt, black jeans, black shoes.

ON-SCREEN TEXT: none.

MOOD: Recall.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 370 · ~2s

> **VO:** while everyone told him to stop?

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2012-2016: University of Toronto, a student bedroom with a humming gaming PC, the ImageNet competition leaderboard, AI research labs, a small San Francisco nonprofit office.

SCENE: Same scene, camera moved slightly closer (gentle push-in, beat 2 of 2), small change in pose/expression to show the moment progressing: Jensen guarding the CUDA toolbox.

CHARACTERS IN FRAME:
- JENSEN HUANG today (simplified caricature): round beige head, swept-back silver-grey and black hair, confident warm grin, signature black leather jacket over a black t-shirt, black jeans, black shoes.

ON-SCREEN TEXT: none.

MOOD: Recall.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 371 · ~2s

> **VO:** It was now the only

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2012-2016: University of Toronto, a student bedroom with a humming gaming PC, the ImageNet competition leaderboard, AI research labs, a small San Francisco nonprofit office.

SCENE: Everyone lining up to use the CUDA toolbox. Wide/establishing framing.

CHARACTERS IN FRAME:
- ENGINEERS: generic bean-people of varied skin tones in casual tech clothes (polo shirts, hoodies, lanyards), some with glasses.

ON-SCREEN TEXT: none.

MOOD: Triumphant.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 372 · ~2s

> **VO:** real toolset for building AI.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2012-2016: University of Toronto, a student bedroom with a humming gaming PC, the ImageNet competition leaderboard, AI research labs, a small San Francisco nonprofit office.

SCENE: Same scene, camera moved slightly closer (gentle push-in, beat 2 of 2), small change in pose/expression to show the moment progressing: Everyone lining up to use the CUDA toolbox.

CHARACTERS IN FRAME:
- ENGINEERS: generic bean-people of varied skin tones in casual tech clothes (polo shirts, hoodies, lanyards), some with glasses.

ON-SCREEN TEXT: none.

MOOD: Triumphant.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 373 · ~1.5s

> **VO:** Every researcher learned it.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2012-2016: University of Toronto, a student bedroom with a humming gaming PC, the ImageNet competition leaderboard, AI research labs, a small San Francisco nonprofit office.

SCENE: Students in a classroom learning CUDA.

CHARACTERS IN FRAME:
- ENGINEERS: generic bean-people of varied skin tones in casual tech clothes (polo shirts, hoodies, lanyards), some with glasses.

ON-SCREEN TEXT: none.

MOOD: Popular.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 374 · ~2s

> **VO:** Every AI lab built on it.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2012-2016: University of Toronto, a student bedroom with a humming gaming PC, the ImageNet competition leaderboard, AI research labs, a small San Francisco nonprofit office.

SCENE: AI labs with CUDA signs.

ON-SCREEN TEXT: none.

MOOD: Dominant.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 375 · ~3.5s

> **VO:** Nvidia had spent years laying railroad tracks, and suddenly,

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2012-2016: University of Toronto, a student bedroom with a humming gaming PC, the ImageNet competition leaderboard, AI research labs, a small San Francisco nonprofit office.

SCENE: A long railroad labelled CUDA with a packed train of people. Wide/establishing framing.

CHARACTERS IN FRAME:
- BACKGROUND PEOPLE: generic bean-people of varied skin tones in everyday clothes matching the scene's era.

ON-SCREEN TEXT: none.

MOOD: Triumphant.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 376 · ~3s

> **VO:** the whole world wanted to ride the train.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2012-2016: University of Toronto, a student bedroom with a humming gaming PC, the ImageNet competition leaderboard, AI research labs, a small San Francisco nonprofit office.

SCENE: Same scene, camera moved slightly closer (gentle push-in, beat 2 of 2), small change in pose/expression to show the moment progressing: A long railroad labelled CUDA with a packed train of people.

CHARACTERS IN FRAME:
- BACKGROUND PEOPLE: generic bean-people of varied skin tones in everyday clothes matching the scene's era.

ON-SCREEN TEXT: none.

MOOD: Triumphant.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 377 · ~1.5s

> **VO:** Jensen saw it immediately.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2012-2016: University of Toronto, a student bedroom with a humming gaming PC, the ImageNet competition leaderboard, AI research labs, a small San Francisco nonprofit office.

SCENE: Jensen's eyes sparkling.

CHARACTERS IN FRAME:
- JENSEN HUANG today (simplified caricature): round beige head, swept-back silver-grey and black hair, confident warm grin, signature black leather jacket over a black t-shirt, black jeans, black shoes.

ON-SCREEN TEXT: none.

MOOD: Visionary.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 378 · ~2.5s

> **VO:** He pushed the entire company toward AI.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2012-2016: University of Toronto, a student bedroom with a humming gaming PC, the ImageNet competition leaderboard, AI research labs, a small San Francisco nonprofit office.

SCENE: Jensen steering a giant ship toward a glowing 'AI' island.

CHARACTERS IN FRAME:
- JENSEN HUANG today (simplified caricature): round beige head, swept-back silver-grey and black hair, confident warm grin, signature black leather jacket over a black t-shirt, black jeans, black shoes.

ON-SCREEN TEXT: none.

MOOD: Bold.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 379 · ~2.5s

> **VO:** He started calling Nvidia an AI company,

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2012-2016: University of Toronto, a student bedroom with a humming gaming PC, the ImageNet competition leaderboard, AI research labs, a small San Francisco nonprofit office.

SCENE: Jensen on stage with a slide reading 'AI'; audience confused. Wide/establishing framing.

CHARACTERS IN FRAME:
- JENSEN HUANG today (simplified caricature): round beige head, swept-back silver-grey and black hair, confident warm grin, signature black leather jacket over a black t-shirt, black jeans, black shoes.
- BACKGROUND PEOPLE: generic bean-people of varied skin tones in everyday clothes matching the scene's era.

ON-SCREEN TEXT: none.

MOOD: Visionary.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 380 · ~3.5s

> **VO:** years before most people even knew what that meant.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2012-2016: University of Toronto, a student bedroom with a humming gaming PC, the ImageNet competition leaderboard, AI research labs, a small San Francisco nonprofit office.

SCENE: Same scene, camera moved slightly closer (gentle push-in, beat 2 of 2), small change in pose/expression to show the moment progressing: Jensen on stage with a slide reading 'AI'; audience confused.

CHARACTERS IN FRAME:
- JENSEN HUANG today (simplified caricature): round beige head, swept-back silver-grey and black hair, confident warm grin, signature black leather jacket over a black t-shirt, black jeans, black shoes.
- BACKGROUND PEOPLE: generic bean-people of varied skin tones in everyday clothes matching the scene's era.

ON-SCREEN TEXT: none.

MOOD: Visionary.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 381 · ~1s

> **VO:** And in 2016,

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2012-2016: University of Toronto, a student bedroom with a humming gaming PC, the ImageNet competition leaderboard, AI research labs, a small San Francisco nonprofit office.

SCENE: Jensen carrying a sleek gold-and-black server box into a small office. Wide/establishing framing.

CHARACTERS IN FRAME:
- JENSEN HUANG today (simplified caricature): round beige head, swept-back silver-grey and black hair, confident warm grin, signature black leather jacket over a black t-shirt, black jeans, black shoes.

ON-SCREEN TEXT: "DGX-1 · 2016" in the handwritten marker font, clearly legible, spelled exactly.

MOOD: Historic.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 382 · ~3s

> **VO:** he personally delivered Nvidia's first AI supercomputer box,

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2012-2016: University of Toronto, a student bedroom with a humming gaming PC, the ImageNet competition leaderboard, AI research labs, a small San Francisco nonprofit office.

SCENE: Same scene, camera moved slightly closer (gentle push-in, beat 2 of 4), small change in pose/expression to show the moment progressing: Jensen carrying a sleek gold-and-black server box into a small office.

CHARACTERS IN FRAME:
- JENSEN HUANG today (simplified caricature): round beige head, swept-back silver-grey and black hair, confident warm grin, signature black leather jacket over a black t-shirt, black jeans, black shoes.

ON-SCREEN TEXT: "DGX-1 · 2016" in the handwritten marker font, clearly legible, spelled exactly.

MOOD: Historic.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 383 · ~1.5s

> **VO:** called the DGX-1,

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2012-2016: University of Toronto, a student bedroom with a humming gaming PC, the ImageNet competition leaderboard, AI research labs, a small San Francisco nonprofit office.

SCENE: Same scene, camera moved slightly closer (gentle push-in, beat 3 of 4), small change in pose/expression to show the moment progressing: Jensen carrying a sleek gold-and-black server box into a small office.

CHARACTERS IN FRAME:
- JENSEN HUANG today (simplified caricature): round beige head, swept-back silver-grey and black hair, confident warm grin, signature black leather jacket over a black t-shirt, black jeans, black shoes.

ON-SCREEN TEXT: "DGX-1 · 2016" in the handwritten marker font, clearly legible, spelled exactly.

MOOD: Historic.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 384 · ~3s

> **VO:** to a tiny research lab in San Francisco.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2012-2016: University of Toronto, a student bedroom with a humming gaming PC, the ImageNet competition leaderboard, AI research labs, a small San Francisco nonprofit office.

SCENE: Same scene, camera moved slightly closer (gentle push-in, beat 4 of 4), small change in pose/expression to show the moment progressing: Jensen carrying a sleek gold-and-black server box into a small office.

CHARACTERS IN FRAME:
- JENSEN HUANG today (simplified caricature): round beige head, swept-back silver-grey and black hair, confident warm grin, signature black leather jacket over a black t-shirt, black jeans, black shoes.

ON-SCREEN TEXT: "DGX-1 · 2016" in the handwritten marker font, clearly legible, spelled exactly.

MOOD: Historic.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 385 · ~3.5s

> **VO:** A little-known nonprofit, that had just been founded.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2012-2016: University of Toronto, a student bedroom with a humming gaming PC, the ImageNet competition leaderboard, AI research labs, a small San Francisco nonprofit office.

SCENE: Small team in a small office looking surprised.

CHARACTERS IN FRAME:
- ENGINEERS: generic bean-people of varied skin tones in casual tech clothes (polo shirts, hoodies, lanyards), some with glasses.

ON-SCREEN TEXT: none.

MOOD: Humble.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

### Shot 386 · ~1.5s

> **VO:** It was called OpenAI.

```text
FORMAT: 16:9 widescreen landscape image (1920x1080), aspect ratio 16:9.

STYLE: 2D flat vector cartoon frame in a hand-drawn educational YouTube explainer style, 16:9 widescreen (1920x1080), artwork fills the entire frame edge to edge with NO black bars or borders. Thick, even, slightly wobbly hand-inked black outlines (about 5px) on every shape. Characters are simple 'bean people': very large perfectly round heads (almost as wide as the torso), small rounded gumdrop/bean-shaped torsos, arms and legs drawn as single thin black lines, tiny simple mitten hands, no detailed feet. Faces have no nose, small solid black oval dot eyes, short curved eyebrow strokes that carry all the emotion, and a tiny simple mouth. Skin is warm beige (#E5CDB2) with ONE flat, hard-edged, darker beige cel-shade crescent on one side of the head. Hair is a solid flat shape with one darker shade. Flat colours only, one hard-edged shadow tone per object, no gradients, no texture, no glossy highlights. Muted, desaturated palette: dusty blue-greys, warm beige, taupe, olive green, soft browns, slate, with only small saturated accents (red, mustard yellow). Backgrounds are simple and flat with minimal detail, clean architectural lines, simple one- or two-point perspective, plain flat-coloured walls; soft flat grey ellipse shadows under standing characters. Any on-screen text is a casual handwritten marker/script font (black letters, often with a thick white outline).

SETTING ERA: 1970s to 2025 as the scene and context state; accurate period details (1990s beige computers and CRT monitors, 2000s gaming PCs, modern data centres), all simplified into the flat cartoon style. No real company logos: brand names appear only as plain hand-lettered text.

HISTORICAL CONTEXT: 2012-2016: University of Toronto, a student bedroom with a humming gaming PC, the ImageNet competition leaderboard, AI research labs, a small San Francisco nonprofit office.

SCENE: Hand-lettered 'OpenAI' on the office door (plain text).

ON-SCREEN TEXT: "OpenAI" in the handwritten marker font, clearly legible, spelled exactly.

MOOD: Momentous.

AVOID: photorealism, 3D render, anime/manga, chibi sparkle eyes, gradients, airbrush, glossy shading, noses, realistic hands or fingers, thin sketchy pencil lines, watercolour or paper texture, extra or misspelled text, watermarks, signatures, real brand logos.

ASPECT RATIO: 16:9 (widescreen landscape) --ar 16:9
```

