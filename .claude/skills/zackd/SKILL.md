---
name: zackd
description: Make original ~30-42 s vertical 3D health / body explainer Shorts (1080x1920) in the measured @zackdfilms "health" format - a real photo-scanned human head on a sky-blue studio void that fades into a glass x-ray head with real medical anatomy inside (BodyParts3D brain, skull, arteries, nerves, tongue, any organ), inside-the-blood-vessel fly-throughs, slow eased camera, captions only (white, soft shadow, no labels), a calm male AI voice-over, a quiet music bed and soft SFX - rendered with three.js in headless Chrome in ~3 minutes, free and local. Use whenever the user wants a "Zack D style" / "ZackD" video, a "what happens if / why does your body" health explainer, a "brain freeze"-style short, a 3D x-ray body video, says "use the zackd skill" / "make another zackd video" - even if they only give a topic.
---

# ZackD: 3D health explainer Shorts (v2 engine)

Skill folder: the folder that holds this SKILL.md (normally `%USERPROFILE%\.claude\skills\zackd`); all paths below are relative to it.
First time on a new PC: run `powershell -File setup.ps1` in the skill folder (asset junctions + dependency check) and see README.txt.

## On Linux / Claude cloud sessions (rebuilt engine, 2026-11-27)
The Windows `.ps1` pipeline is mirrored by bash scripts; `INSTALLED.md` lists what exists here and what differs.
- First time: `bash setup.sh` (three.js, fonts, head scan, HDRI, Kokoro, Whisper small.en, BodyParts3D library + anatomy OBJs;
  all from GitHub/npm/PyPI because other hosts are blocked). `bash setup.sh --hero` also builds the MPFB man with Blender (bpy).
- New video: `scripts/new_video.sh <name>` → write `projects/<name>/script.json` → `scripts/voice.sh projects/<name>`
  (Kokoro) or `scripts/voice.sh projects/<name> --audio voiceover.mp3` (the user's own recording; Whisper times every word)
  → write `src/shots.js` → `scripts/build.sh projects/<name> check` → `… sheet` (LOOK at review/sheet.jpg) → `… video`
  (renders/<name>.mp4 + _share.mp4 + cover.jpg; run in the background: no GPU here, ~3-6 s per frame).
- Working examples: `demo/brain-freeze-v2` (scanned head + glass x-ray + anatomy + vessel) and `projects/asml`
  (non-body tech reel on a user voiceover: `core/tech_props.js` phone, chip, gpu, EUV machine, bus, containers, cargo
  planes, laser chamber, wafer, hair macro, fabs, sun, Earth globe with country highlights / pins / arcs).
- Engine gotchas found while building it: glow sprites and glass are hidden from the AO/DOF depth passes (else dark
  squares); portrait framing needs the camera ~3.2 × the object's width away; metal needs `scene.environment` or it renders black.

## Standing feedback from the user (after the ASML reel, 2026-11-28) - apply to EVERY video
- **Music (2026-11-28): every reel uses the user's track "Else - Paris" starting at its 0:08** (`assets/shared/music/paris.mp3`, the default `"music": "paris"` in tools/mix.py; ducked ~16 dB under the voice, 2 s fade-out). Only use another bed if the user asks. Note it may trigger a YouTube/Instagram Content ID claim - pick the platform's own copy of the sound when posting if possible.
- **Organic effects on key moments, not just a camera move.** Every number, price or striking fact gets its own
  visual beat timed to the word (`Wd()`):
  - Money / prices (especially huge amounts): show the figure big in 3D (e.g. "$200,000,000", digits counting up or
    slamming in) with banknotes / coins raining down at that exact moment, plus a coin / cash SFX.
  - Other numbers (100,000 parts, 50,000 times a second, 40 containers): make the count visible (counter ticking
    up, objects multiplying to the number, a stopwatch / strobe for "per second").
  - Comparisons ("hotter than the sun", "thinner than a hair", "size of a bus"): put both things side by side so
    the comparison is seen, not just said.
- **Assets that look like what the script says.** Prefer real-looking models over generic boxes: search GitHub (CC0 /
  CC-BY glTF: KhronosGroup sample assets, three.js examples, Quaternius / Kenney mirrors, Poly Haven mirrors via
  media.githubusercontent.com) for the actual object (real EUV-machine-like cleanroom tool, real cargo plane, real
  shipping container, real GPU / phone shapes, real map / flags), and only fall back to procedural props when nothing
  fits. Credit every downloaded asset in the description. Still no brand logos.
- **Keep improving on your own judgement**: more shot variety, smoother transitions, matching SFX on every beat,
  look at the sheet and fix anything that reads as placeholder before rendering.

## Read first
1. `references\channel-playbook.md`: the format, measured on the 20 most-viewed "health" Shorts
   (length ~30 s, 2.7 words/s, "If you…" openers, turn words, one continuous camera that goes into the body and back
   out, colour carries the meaning, captions only, music ~18 dB under the voice, often loops).
2. `references\making-videos.md`: the engine and the exact pipeline (script.json format,
   scene building blocks, anatomy controls, shot recipe, QA checklist, credits, paths).

## Make a video (the short version)
`powershell -File scripts\new_video.ps1 -Name <name>` → write `projects\<name>\script.json` (facts checked, sources
listed) → `scripts\voice.ps1 -Project projects\<name>` → rewrite `src\shots.js` from the demo's shots →
`scripts\build.ps1 -Step check` → `-Step sheet` (**look at every frame, fix, repeat**) → `-Step video`.
Deliver the MP4 + cover + title, description (with the credits) and hashtags.
**Working example (the default style):** `demo\coffee` (script.json,
src\shots.js, renders\coffee_youtube.txt; run `-Step video` on it to see the result). Start every new shots.js from it; making-videos.md §4b has the recipe.
Second example (same style, hand-held prop pour, organ glow, cell macro): `demo\sugar`.
More finished videos (script.json + src\shots.js only, copy effects from them): `projects\alcohol, chili, energy-drink, painkiller, water, all-nighter`.
Write the script and build straight away; the user reviews frames closely, so always run the sheet check before the final render.

### Lessons from the coffee video (apply every time)
- **Script:** aim for 30-35 s (9-11 lines); the coffee script ran 45 s.
  Turn words ("But", "Then") get a cube-flip transition.
- **Shots:** a new picture every 1-3.5 s, alternating person ↔ inside the body ↔ molecule macro ↔ inside a vessel.
  Colour carries the meaning, the last frame loops into the first, and frame 0 is mid-action.
- **Effect modules in engine\src\core:**
  - `coffee_props` (mug)
  - `synapse` (receptor "parking spots" macro)
  - `caffeine_flow` (substance stream mouth → brain)
  - `adrenaline` (+ `fastHeart`)
  - `gut_motion`
  - `moods` (day → night void, expressions)
  - `head_fx` (brain chemistry, artery narrowing)
  - transitions in `main.js`
  - SFX in `mix.py`

  Reuse or recolour them for new topics (alcohol, sugar, nicotine, medicine...).
- **heroMan gotcha:** `V.scene.add(H.anatomy.group)` yourself, or every glass-head shot is empty.
- **The hand holds props (added 2026-11-09):** heroMan has right-arm IK and a finger grip (`hero.js`).
  - Place the prop each frame, then call `H.holdR(prop, { hole, f, s })`. The hand reaches it, the wrist turns to fit and the
    fingers wrap it.
  - Mug settings: `GRIP = { hole: V3(M.R+0.012, 0.05, 0), f: V3(0,0,-1), s: V3(0,1,0) }`, handle yaw -2.44.
  - For a new prop, set `hole` to where the fingers close (handle hole, cup body, pill, phone edge).
  - Rules:
    - Film hand-held props at the lips or chest from his RIGHT side (camera x < 0), or the hand sits at the frame edge.
      For an arm raised above the face, film from his LEFT side (see the sugar lessons).
    - `reset()` calls `H.pose({})` every frame, or the raised arm leaks into later shots.
  - Low-level calls: `reachR(T, pole)`, `handFrameR(f, s)`, `curlR(k, thumb)`.
  - QA from any angle: `$env:QS='&cam=x,y,z,lx,ly,lz'` (coffee shots.js).
  - Left hand: not built yet (mirror the R code if needed).
### Lessons from the sugar video (2026-11-09, `demo\sugar`, 31 s, 15 shots; apply every time)
- **No topic given?** Ask once, and offer 3-4 topics that reuse existing modules (recommend the cheapest to build well).
- **New project gotcha:** `new_video.ps1` copies the template brain-freeze `script.json`. Read it before overwriting, or
  the write fails and `voice.ps1` voices the old script (check that voice.ps1 prints YOUR lines).
- **Test new pieces before the sheet:** render 4-8 key frames (`-Step frames -Times`) of each new prop, expression and
  macro scene first, and look at new props from 2-3 debug cameras (`$env:QS='&cam=…'`: side, left, front).
  This found the right angle in one pass; the full sheet (~2 min) is for the final check.
- **Camera side depends on how high the hand is:** hand at the lips or chest → film from his RIGHT (x < 0). Arm raised
  above the face (pouring, drinking from a bottle) → film from his LEFT (x > 0), or the arm blocks the face.
- **Points on a moving body:** compute them in bone space (store the rest point with `HB.worldToLocal` once, read it with
  `localToWorld` each frame), never as fixed world coordinates. The mouth moves when the head tips back.
- **Props held at the chest:** use medium shots (look-at y ≈ 1.37) or the prop is cut off at the frame bottom and sits
  under the captions.
- **Glows turn white under bloom:** keep emissive ≤ ~0.5 and tint the material colour itself toward the meaning colour.
- **Effects inside the belly get hidden by the gut:** hide the organ in front (e.g. drop 'gut' from `BODY.show`) for that shot.
- **New expression keys** must default to 0 in `moods.js` `mix()` (already fixed with `p[key] ?? 0`), or the face renders as a black hole.
- **Wording health claims:** say "can" for effects that don't happen to everyone (e.g. the sugar dip), and add
  "not medical advice" to the description.
- **Final render time:** 936 frames at 1.5× took ~5.5 min, plus the share-copy encode. Run `-Step video` in the
  background (it can pass the 10-min tool limit).
- **New reusable modules (now in engine\src\core):**
  - `candy_props` (candy bag + pouring jelly beans)
  - `cell_door` (insulin keys / receptor locks / glucose doors macro)
  - `adrenaline` with `{ obj, color }`, so any organ can glow and release particles
  - `moods` `happy` + `smile`
  - SFX in `mix.py`: `crinkle`, `rattle`, `crunch`

  Details are in making-videos.md.

### Lessons from the alcohol video (2026-11-10, `projects\alcohol`, 32 s, 18 shots)
- New modules: `beer_props` (pint glass, level beer, foam, bubbles), synapse `recolor`/`recolorBlocker`, adrenaline
  `setColor` (any organ glow can change colour). Details are in making-videos.md.
- Drinking from a glass = arm raised to the face, so film the sip from his LEFT; grip curl 0.42 keeps the fingers outside the glass.
- Additive cyan/blue glows disappear on the sky-blue void: use normal blending and deeper blue.
- If a prop looks wrong, hide its outer shell and render one debug frame via `capture.mjs eval "OP.frame(t)"` to find
  which layer is at fault.
- The user may offer to make 3D models: BodyParts3D already covers organs; only props (e.g. a glass) are worth asking for.

### Energy drink (2026-11-10, `projects\energy-drink`, 31 s, 18 shots)
- New: `can_props` (`energyCan`, `canAtLips`; own black/gold design, no real brand), SFX `can_open` + `fizz`.
  Sugar + caffeine in one video = two `caffeineFlow` streams (pink, gold) and two `adrenalineFX` (pancreas, adrenals).
- Envato Elements / Anatomy 3D Atlas were checked and skipped (atlas app cannot export models; Envato only worth it for props).

### Chili (2026-11-10, `projects\chili`, 33 s, 15 shots)
- New: `chili_props` (pod + bite), `chili_fx` (sweat, tears, face flush, mouth glow, hot tongue / nerve alarm / red
  brain), `burn` + `relief` faces, `voidMood(V, night, heat)`, synapse `flood`/`crowd`, beerGlass water/milk options.
- Thin hand-held props: put the GRIP hole beside the object, not on its axis, or it threads through the fingers.
- Write test frames into one ffmpeg `xstack` contact sheet to review new pieces quickly. Details are in making-videos.md.

### Painkiller (2026-11-10, `projects\painkiller`, 31 s, 16 shots)
- New: `enzyme_scene` (enzyme factory + blocker, for any drug/enzyme story), `FX.pain` (headache glow), pill drop.
- Full-body glass shots: render with `ao: 0`, or a dark band appears. Run `node --check` on edited files before rendering.

### Water / dehydration (2026-11-11, `projects\water`, 33 s, 15 shots)
- New in its shots.js (copy from there): `setShrink(k)` brain shrinks + sags inside the glass head (scale about its own
  bbox centre), `setSensor` hypothalamus glow + hormone sparks, `setPull` drops spiralling into the kidneys, thin
  `setPee` trickle, `setAche` red sprite in the head, salt-crystal cubes in the vessel.
- `voidMood(V, 0, heat)`: heat 0.3-0.6 gives a muddy grey/mauve void; use ≥ 0.85 for a clear warm "hot day".
- Glass held at the chest in waist-up shots: `glassPose(up 0.45)`, not 0 (0 is below the frame).
- Kidney/bladder close-ups: leave 'arteries' out of `BODY.show`, or they bury the kidneys.
- A brighter skull (opacity > 0.15) washes out a red brain; keep 0.1 and add a red sprite instead.
- White discs in the glass-head eye sockets are the existing engine look (also in painkiller), not a new bug.

### All-nighter (2026-11-12, `projects\all-nighter`, 36 s, 19 shots)
- New: `moods` `asleep` (eyes shut, head dropped, no blinks; also in the engine template). In its shots.js (copy from
  there): `wallClock()` prop (hands spin to any hour), `dotPoints()` per-point-alpha dots, a brain-local effects group
  (child of `H.anatomy.parts.brain.parent`, mm frame): dark "nodding off" blots, brown waste clumps, a teal sleep wash
  sweeping front→back, a horizontal scan slice that reveals what's above it; and a gold body-clock (SCN) glow.
- Dark night face close-ups: use night 0.8 + exposure 1.5. The first and last frames look dark on stills because main.js fades in/out.
- Sunrise: `voidMood(V, 1-k, heat)` with heat driven fully to 1 gives a clean orange dawn (partial heat looks grey).
- Keep `yawn` ≤ 0.55 in close-ups, or the tongue shows as a purple blob.

### Hero organ model library
Not included in this package (licence unknown); `core/library.js` stays but has no models. Use BodyParts3D anatomy instead.

- **Multi-agent build** works well. When the user asks for agents, give each one a component (prop, macro scene, particle
  route, organ effect, expressions, head FX, transitions, SFX, art-director shot list), each in its own scratch project
  `projects\<name>-aN`. Then assemble, sheet-check, and render. Delete each scratch project's `assets` junction before deleting it.
- **Deliver:** master MP4 + share copy (~25 MB) + cover + `<name>_youtube.txt` (title + alternatives, description,
  sources, credits incl. MPFB CC0, hashtags, tags, "altered/synthetic content: yes").

Two people are available in the engine: the photo-scanned head (`scanHead`, eyes closed, most realistic close-ups) and
the **MPFB man** (`heroMan` in `core/hero.js`: full body, open eyes, blink/wince, jaw, hair, clothes, full-body glass
x-ray with aligned anatomy). Pick per shot; see making-videos.md §3.
Whole body inside the glass man: `bodyAnatomy()` (real heart with chambers, lungs, liver, gut, kidneys, bones, full
artery + vein network, realistic wet tissue materials). Final renders: ambient occlusion on (off inside vessels) and
`$env:QS='&res=1.5'` supersampling.

## Ground rules
- Same format, original everything: our own scripts, shots, music and voice. Never Zack D Films' name, logo,
  characters, scripts, footage or audio.
- Health facts must be accurate and sourced; no gore (pain = red glow, danger = colour, never wounds).
- Captions only: no BRAIN / ARTERIES / PRESSURE pills (that made v1 look amateur).
- Credit in every description: Lee Perry-Smith head scan (CC BY 3.0), BodyParts3D (CC BY-SA 2.1 JP), Poly Haven (CC0).
