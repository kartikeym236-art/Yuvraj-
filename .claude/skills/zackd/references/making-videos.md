# Making a ZackD video (the v2 engine)

The proven look (demo: `demo\brain-freeze-v2\renders\brain-freeze-v2.mp4`, "Why Ice Cream Gives You Brain Freeze", 41.5 s):
a **real photo-scanned human head** on the **sky-blue ZackD studio void**, lit by a **real studio HDRI**, that fades into a
**glass x-ray head** with **real medical anatomy** inside (BodyParts3D brain, skull, arteries, nerves, tongue), plus
**inside-the-blood-vessel** fly-throughs. Captions only (no labels/pills), slow eased camera, calm male voice-over.
Renders in ~3 minutes on this laptop (three.js in headless Chrome, GPU). Everything is free and local.

The user compared four versions (cartoon clay 3D, this v2, Blender/MPFB full body, flat 2D) and picked **v2**.
(The Blender and 2D pipelines of the original setup are not included in this package.)

## 1. Pipeline (PowerShell, from the skill folder)
1. **Topic + facts.** One body process with a visible before → after (see `channel-playbook.md` §9). Check every fact
   against 2-3 reliable sources and list them in `script.json` → `"sources"`. No gore; health facts accurate.
2. `powershell -File scripts\new_video.ps1 -Name <short-name>` → `projects\<short-name>\` (engine copy + `assets` junction).
3. **Write `script.json`** (format below). 4-13 lines, ~75-120 words, opening "If you… / When you… / If you somehow…",
   a turn word on each beat ("But…", "you might think… But…", "So instead…"), payoff fact last, written to loop.
4. `powershell -File scripts\voice.ps1 -Project projects\<name>` → narration + exact line/word times (prints DURATION).
   Aim for 28-42 s; adjust `"speed"` (1.0-1.1) and re-run.
5. **Rewrite `src\shots.js`** (one shot per line, extra shots on key words; recipe in §4). Keep `export const PRELOAD`.
6. `scripts\build.ps1 -Project … -Step check` (CHECK OK) → `-Step sheet` and **look at `review\sheet.jpg`** →
   fix → `-Step frames -Times "…"` for close checks → `-Step video` → `renders\<name>.mp4` + `renders\cover.jpg`.
7. Deliver: open the MP4, give a title, description (with the credits in §6) and 5-8 hashtags.

## 2. script.json
```json
{ "title": "Why Ice Cream Gives You Brain Freeze", "voice": "am_michael", "speed": 1.08, "lead": 0.3, "outro": 0.8, "gap": 0.24,
  "music": "bed", "sources": ["Cleveland Clinic, ...", "Harvard Health, ..."],
  "lines": [ { "text": "If you eat ice cream too fast,", "caps": "If you eat | ice cream | too fast," }, ... ] }
```
- One line = one cut. A sentence can span several lines; each sentence is voiced in one pass (natural intonation).
- `caps`: sentence case, `|` splits 1-3-word caption cards. **Each card must start with a word actually spoken** in that
  line (else it lands at the wrong time; `check` prints every card with its times — a card shorter than ~0.3 s means
  its first word didn't match). No `*` highlight in this style (white text, soft shadow, ~78 % height).
- Numbers written as said ("two to four"); caps may show digits ("2 to 4").
- `"gap"` on a line = pause after it (0.3 at sentence ends that need a breath).

## 3. Engine map (`projects\<name>\src\`)
| file | what it gives |
|---|---|
| `core/assets.js` | `PRELOAD` loader: `A.models`, `A.env` (PMREM), `A.hdr`, `A.obj`, `A.tex`; `bone(root, name)` |
| `core/engine.js` | `makeEngine` → `E.render(scene, cam, look)`: ACES, soft shadows, DOF (`focus`, `aperture`, `maxblur`), bloom (`bloom`, `bloomThreshold`), `vignette`, `grain`, `warm`, `exposure`. `camera(fov)` |
| `core/sets.js` | **`studioVoid(env, col)`** sky-blue void + key/rim/fill (`col`: `'#5BC4F0'` default; topic colours: white `#F2F4F5` dental, purple `#6E5FA8` throat, navy `#14233F`, black). **`scanHead(gltf, col, nrm, glassMat)`** → `{ group, skin, xray, bounds, setXray(k) }` (scanned bust ~36 cm, origin = bust centre, face +z). **`glassMaterial()`** (x-ray glass for light backgrounds; recolour with `.uniforms.uCol`). `vessel(E)` → `.update(t, camZ, co2, dark, cold)` blood-vessel macro (`cold` 0..1 = icy). `iceCream()` cone prop. Older: `kitchen`, `xrayStage`, `xrayMaterial`, `insides()`, `headInsides()` (clay blobs — don't use for new videos) |
| `core/anatomy.js` | **`realHead(A, fit)`** → real BodyParts3D anatomy inside `scanHead` (fit `{x:0, y:0.065, z:-0.01, s:1}` for the Lee Perry-Smith head). Methods: `setWiden(k)` arteries swell · `setCold(k)` / `setWarm(k)` roof-of-mouth glow icy / orange · `setNerves(k)` face nerves glow yellow · `setTongue(k)` tongue presses up · `setArteryColor(c)` · `reset()`; `brainMat`, `boneMat` (skull opacity ~0.1), `parts.{brain,skull,arteries,nerves,tongue,softpalate}`, `glow` |
| `core/captions.js` | ZackD captions: white Inter Black 62 px (was 104; user wants 60 %), soft dark shadow, no outline/box, y 1500 |
| `shots.js` | the per-video file (§4) |
| `main.js` | boot → `PRELOAD` → shots; draws the 3D frame, then captions; fades in/out |

### The MPFB man — full body, open eyes (`core/hero.js`, added 2026-11-08)
`assets/models/hero_male.glb` = a realistic young man (MPFB + MakeHuman CC0: navy shirt, jeans, dark slicked hair,
brows, lashes, real eyes, teeth, tongue, 163-bone rig), exported once from Blender with `blender\export_hero.py`
(`blender\make_human.py` builds him; the rig MUST be added before clothes/hair or they won't follow the bones).
```js
PRELOAD.models.hero = 'assets/models/hero_male.glb'   // + the anatomy objs (for x-ray)
const H = heroMan(A.models.hero, A); V.scene.add(H.group); V.scene.add(H.anatomy.group);   // feet y=0, faces +z, ~1.75 m
H.pose({ arms: 1, lid: 0..1, jaw: 0..1, head: [x, y, z], neck, spine, look: [yaw, pitch], hand: 0..1 });  // every frame
H.setXray(true)    // whole body → glass (follows the rig), hair/brows hidden, real anatomy shown & aligned
H.anatomy.setWiden(k) / setCold(k) / setWarm(k) / setNerves(k) / setTongue(k)   // same as realHead
H.handPos(), H.headPos()   // world positions for props / camera targets
```
- Face shots: camera ~(0.16, 1.69, 0.62) looking at (0, 1.66, 0). Full body: (0.35, 1.25, 3.1) → (0, 1.0, 0).
- Blink = `lid` pulse; wince = `lid: 1, jaw: 0.35, head: [-0.12, 0.06, 0.05]`; bite = `jaw: 0.7` with the prop at the lips.
- **Props are HELD, not floating:** move the prop along its path, then call `H.holdR(prop, GRIP)`. The right hand
  reaches it with IK and the fingers grip it (see "Hand holds props" below). The old `pose({hand})` only reached the cheek;
  don't use it for eating or drinking.
- Use the **scanned head** (`scanHead`) for the most photo-real extreme face close-ups; use **heroMan** whenever you
  need open eyes, hair, a body, clothes or full-body x-ray. Both share the same glass material and anatomy.
- Lab / test scene: `projects\lab-hero\src\shots.js`.

### Whole-body anatomy + realistic tissue (`core/anatomy_body.js`, added 2026-11-08)
Real BodyParts3D organs, bones and the **full artery + vein network** (562 + 342 pieces), aligned to `heroMan`:
```js
const PARTS = ['heartwall','heart','lungR','lungL','liver','stomach','smallint','largeint','kidneyR','kidneyL','esophagus','trachea',
  'diaphragm','ribcage','spine','pelvis','spinalcord','arteries_all','veins_all','pancreas','spleen','bladder'];   // load what you need
PRELOAD.obj = { ...PRELOAD.obj, ...Object.fromEntries(PARTS.map((k) => [k, `assets/anatomy/${k}.obj`])) };
const BODY = bodyAnatomy(A);  V.scene.add(BODY.group);  H.setXray(true);            // glass man + organs inside
BODY.show(['heart','lungs','arteries','veins']);   // groups: heart lungs liver stomach gut kidneys esophagus trachea diaphragm
                                                   //         bones cord arteries veins pancreas spleen bladder brain nerves
BODY.setPulse(Math.max(0, Math.sin(t * 7)));       // heartbeat · BODY.setFlow(t) living shimmer on vessels
BODY.mats.arteries.emissiveIntensity = …           // recolour/glow any group on its word (meaning by colour)
```
- Fit (checked on renders): `{ s: 1.06, x: 0.005, y: 0.074, z: 0 }` (BodyParts3D body is ~10 cm shorter than the hero).
- `organMat(kind)` = realistic tissue: wet clearcoat, sheen, procedural micro-normal (wet / fibre / porous / lobule).
  Kinds: artery vein nerve cord heart lung liver stomach gut kidney pancreas spleen bladder diaphragm bone brain.
  Arteries deep red, veins blue-violet, nerves pale fibrous cords, bones soft ivory at 72 % opacity (so organs show).
- Meshes are welded (`mergeVertices`) before shading, so organs are smooth, not faceted.
- The library's "heart" is only its vessels/valves — the muscle is `heartwall` (the 4 chambers). Load both.
- Body nerves: BodyParts3D only has fine nerves in the head (`nerves` = trigeminal, `nervous` = brain/cranial) plus the
  spinal cord; for body-wide nerve visuals, glow the spinal cord + recolour arteries, or draw stylised nerves.
- Good framings: torso organs (0.3, 1.3, 1.25)→(0, 1.22, 0) · heart close (0.2, 1.42, 0.6)→(0.02, 1.37, 0.12) ·
  full body (0.25, 1.15, 2.6)→(0, 1.0, 0) · profile (1.3, 1.25, 0.15)→(0, 1.2, 0.02).

### Rendering polish (engine, added 2026-11-08)
- **Ambient occlusion (GTAO)** is on by default (`look.ao` 0..1, default 0.85; `look.aoRadius`): soft contact shadows in
  organ folds and between vessels. **Turn it off inside the blood vessel** (`ao: 0`) — it turns bright hotspots into squares.
- **Supersampling for the final render:** `$env:QS='&res=1.5'` before `build.ps1 -Step video` (or `capture.mjs video`)
  renders 3D at 1.5× and downsamples: much crisper vessels/hair, ~2× render time. Use `res=1` for sheets/iteration.
- **Blood-vessel interior** (`vessel(E)`, same API): textured wet wall, true biconcave red cells (sizes vary), white blood
  cells, platelets, deeper fog. Look: `{ aperture: 0, bloom: 0.25, bloomThreshold: 0.82, exposure: 0.85, ao: 0 }`,
  `VS.scene.environment = A.env.studio; environmentIntensity = 0.08`. Depth of field off in here (fog gives depth).
- Lab scene with all of this: `projects\lab-hero\src\shots.js`.

### Anatomy library (more parts)
`assets\shared\anatomy\*.obj` holds: brain, skull, mandible, tongue, softpalate, nerves (trigeminal), carotid, circle,
aca, mca, basilar. **Any other body part** (heart, lungs, stomach, liver, kidneys, intestines, bones, muscles, eye…):
1. Find its FMA id: `Select-String -Path assets\bodyparts3d\partof_parts_list_e.txt,assets\bodyparts3d\isa_parts_list_e.txt -Pattern "heart"`
2. Merge: `python tools\bp3d_merge.py assets\bodyparts3d assets\shared\anatomy heart=FMA7088@partof`
   (several ids: `name=FMA1+FMA2@isa`). Coordinates are BodyParts3D millimetres in one shared body frame
   (x right-left, y back(+)/front(-), z up; head ≈ z 1420-1640) — every part lines up with every other.
3. Load it in `PRELOAD.obj` and add it like `realHead` does (mm → m `scale 0.001`, rotate x -90°, recentre).
   For body parts below the head the scanned bust isn't enough: use a glass torso (scale a body OBJ such as
   `skin`/`body surface` from BodyParts3D as the glass shell) or frame tightly on the organ in the void.

### Effect modules (added for the coffee video, 2026-11-08; working example `projects\coffee\src\shots.js`)
- **Hand holds props (DONE 2026-11-09, used in demo\coffee):** `hero.js` now has right-arm IK + grip:
  - `H.reachR(T, pole)`: two-bone IK, wrist to a world point.
  - `H.handFrameR(f, s)`: orients the hand.
  - `H.curlR(k, thumb)`: curls the fingers.
  - `H.holdR(obj, { hole, f, s })`: curls the fingers, then aims the curled fingers' centre at the object's `hole`.

  Call it after `face()`/`pose()`. Mug settings (coffee shots.js): `YAW = -2.44` (handle to his right and forward),
  `GRIP = { hole: V3(M.R+0.012, 0.05, 0), f: V3(0,0,-1), s: V3(0,1,0) }`, `REST = V3(0.02,1.13,0.34)` (held at the belly).
  - Shoot hand-held props from the hero's RIGHT side (camera x < 0, e.g. (-0.3,1.6,0.98) → (-0.03,1.57,0.08)), or the
    hand and handle end up at the frame edge.
  - `reset()` must call `H.pose({})` every frame, or the IK arm pose leaks into the next shots (a floating glass hand).

  Debug camera: `$env:QS='&cam=x,y,z,lx,ly,lz'` overrides skin-shot cameras.
- **heroMan gotcha:** heroMan does NOT parent its realHead: always `V.scene.add(H.anatomy.group)` or the glass head is empty.
- `coffee_props.js` `coffeeMug()` (+ `mugAtLips(M, lips, tilt, yaw)`): real-size glazed mug, crema, steam (held in his right hand via `H.holdR`, handle yaw -2.44).
- `synapse.js` `synapseScene(E, A)`: macro neuron membrane, 8 receptor "parking spots"; `update(t,{adenosine,caffeine,crash})`,
  cams `SY.cam.wide/close/top`, render with `SY.look` (AO off). Reusable for any "molecule blocks a receptor" story.
- `caffeine_flow.js` `caffeineFlow(H, BODY)`: glowing particle stream mouth→stomach→gut→liver→heart→carotids→brain;
  `update(t,u)`, `CF.U` landmarks, `camFor(u)` follow cam, `reset()`. Recolour (`{color}`) for any swallowed substance.
- `adrenaline.js` `adrenalineFX(A, BODY)` (needs `adrenals` OBJ) + `fastHeart(BODY, t, bpm)` realistic double-thump.
- `gut_motion.js` `gutMotion(BODY)`: peristalsis rings + warm glow down the colon, `update(t,k)`.
- `moods.js` `voidMood(V,k)` day→night void (spread the result into the render look) and `face(H, name|mix, k, t, extra)`
  expressions: neutral / sleepy / alert / wired / crash, `yawn`, natural blinks. Lids: 0.17 half, 0.45 shut, negative = wide.
- `head_fx.js` `headFX(H)`: brain chemistry in the glass head `update(t,{adenosine,caffeine,tighten,crash})` (blue haze,
  gold sparkles, arteries narrowing, crash flood).
- Transitions (main.js): a shot may declare `transition: { type: 'flip'|'zoomblur'|'whip'|'dissolve', dur: 0.3, dir }`.
  Flip on turn words ("But", "Then"), zoomblur into/out of the brain or vessels, whip between body regions.
- New SFX in `tools/mix.py`: sip, pour, swallow, rumble, heartbeat_fast {bpm}, molecule, shimmer, whoosh_soft, tick;
  music `bed_documentary`. `node tools/capture.mjs eval "<js>"` runs JS in the page for debugging.

### Added for the sugar video (2026-11-09, worked example `demo\sugar`; all files are in the engine template now)
- `candy_props.js` `candyBag()` crinkled foil candy pouch + jelly beans; `B.pour(t, k, mouthPt)`; `bagAtLips(B, lips, tilt, yaw, gap)`.
  Pour = tilt 2.45, opening 3.5 cm above an open mouth (jaw 1.7, head x -0.32). **Film a high pour from his LEFT side**
  (camera x > 0): from his right the raised arm blocks the face. Mouth point: store (0,1.598,0.132) in head-bone space.
- `cell_door.js` `cellScene(E)`: cell membrane macro, Y receptor "locks", green insulin keys dock, doors iris open,
  pink glucose hexagons pulled in: `update(t,{sugar,insulin,open,soak})`. Reusable for any hormone/receptor story.
- `adrenaline.js` now takes `{ obj, color, hot, base, haloScale }`, so any organ can glow + release particles (pancreas → insulin).
- `moods.js`: `happy` expression + `smile` amount (mouth-corner bones nudged in world space). A new preset key must
  default to 0 in `mix()` (`p[key] ?? 0`), or every other expression turns NaN and the face renders as a black hole.
- `mix.py`: new SFX `crinkle`, `rattle`, `crunch`.

### Added for the alcohol video (2026-11-10, worked example `projects\alcohol`; modules are in the engine template)
- `beer_props.js` `beerGlass()`: 15 cm shaker pint, near-clear glass + fresnel rim, amber beer that stays level when
  tilted (world-plane clip), 1.3 cm foam band, rising bubbles; `G.update(t)` per frame; `G.GRIP` for `H.holdR` (use
  `{ curl: 0.42, thumb: 0.7 }` so fingers wrap OUTSIDE the glass). `glassAtLips(G, lips, tilt, yaw)`; for a sip use the
  head-bone mouth point + (0,-0.017,0.012), tilt 0.95, head [-0.2,-0.04,0], filmed from his LEFT (x > 0).
- `synapse.js`: `SY.recolor(pal, glow)` / `SY.recolorBlocker(pal, glow)` recolour the docking and blocking molecules
  (blue brakes → green accelerator, amber alcohol blocker). Call in every draw (it persists between shots).
- `adrenaline.js`: `FX.setColor(c, hot)` recolours an organ glow live (liver amber → acetaldehyde purple).
  `obj: 'liver'` works; hide BODY 'liver' in that shot and keep k ≤ 0.35 or it turns flat yellow.
- **Glows on the sky-blue void:** additive cyan/blue (water, hormones) vanishes into the background. Use NormalBlending
  sprites/points in a deeper blue (`#0FA8E8`) and give organs emissive ≥ 0.5 when tinting them blue.
- **GLSL gotcha:** `smoothstep(a, b, x)` with a > b is undefined (it made the whole beer foam-white). Use `1.0 - smoothstep(b, a, x)`.
- **Wd() prefix gotcha:** `Wd('a', i)` matches "and" first; anchor on a longer word.
- Organ centres for custom effects: `new THREE.Box3().setFromObject(BODY.parts.kidneys.children[i])` after
  `BODY.group.updateMatrixWorld(true)` (used for the kidney → ureter → bladder water stream).

### Added for the energy-drink video (2026-11-10, worked example `projects\energy-drink`; modules are in the engine template)
- `can_props.js` `energyCan()`: slim 250 ml can (13.4 cm), our own black/gold "ENERGY" sleeve, aluminium neck, lid with
  drinking hole + pull tab. `C.setOpening(YAW)` once (hole faces the lips), `canAtLips(C, lips, tilt, yaw)`,
  `H.holdR(C.group, C.GRIP, { curl: 0.5, thumb: 0.7 })`. Sip: head-bone mouth point + (0,-0.012,0.01), tilt 1.25,
  head [-0.24,-0.04,0], filmed from his LEFT (x > 0). Held at the chest it reads best at `up` 0.2-0.35 (otherwise it
  sits under the captions). Recolour the sleeve in `labelTexture()` for a soda / cola can.
- Two `caffeineFlow` instances work side by side (pink sugar + gold caffeine); two `adrenalineFX` too (pancreas + adrenals).
- `mix.py`: new SFX `can_open` (crack + hiss) and `fizz`.
- Glass head + HFX caffeine sparkle blows out white above caffeine ~0.5: use caffeine 0.4 and `{ exposure 0.74, bloom 0.14, thr 0.93 }`.

### Added for the chili video (2026-11-10, worked example `projects\chili`, 33 s, 15 shots; modules are in the engine template)
- `chili_props.js` `chiliPepper()`: 10 cm glossy red pod (swept tube, 3 lobes), green calyx + curved stem. `C.setBite(k)`
  removes the tip end as a geometry draw range (not a shader discard, so AO/depth passes agree) and shows a pale cut face
  with seeds. `chiliAtLips(C, lips, dir, roll, inside)`; hold with `H.holdR(C.group, C.GRIP, { curl: 0.75, thumb: 0.8 })`.
  Good bite: `dir = (0.45, 0.55, -0.7)` (hand below-right of the mouth, pod angled up into it), jaw 1.0, filmed from his RIGHT.
- **Grip rule for thin props:** the GRIP `hole` goes BESIDE the object (surface + ~8 mm, on the `f × s` side), not on its
  axis, like `beerGlass.GRIP`. On the axis, the prop threads through the fingers.
- **Lathe/sweep winding:** if a custom mesh renders in its "inside" colour, the triangle winding is inverted.
- `chili_fx.js` `chiliFX(H, scene)`: `sweat(t,k)` beads on forehead/temples/upper lip (skin-tinted, low opacity, not white),
  `tears(t,k)` drop + smooth tube streak from the inner eye corner, `flush(k)` red face via the skin shader, `mouth(k, lips)`
  heat glow, `head(t,{tongue,nerves,brain,alarm})` glass head: red-hot tongue, flashing orange nerves, red brain.
  Points are sampled once from the skinned face surface in head-bone space, so they follow the head.
  It also sinks the chest skin 6 mm under the shirt, which fixes the skin patch poking through when the right arm is raised.
- `moods.js`: `voidMood(V, night, heat)` (heat 0..1 = fiery orange-red void); expressions `burn` (squeezed eyes, open
  panting mouth: add `jaw: 0.35*k*(0.5+0.5*sin(t*11))`) and `relief`.
- `synapse.js` `update(t, { …, flood, crowd })`: `flood: 0` lets the blockers leave without the blue flood ("washed away");
  `crowd` shows free-floating molecules that never dock (recolour with `SY.recolor`: blue water, white milk proteins).
  The blocker molecules recoloured red = capsaicin docking in heat receptors.
- `beer_props.js` `beerGlass({ foamH: 0, opacity, glow, bubbles, topRough })` = water / milk glasses.
  Water: `#3FA4EC`, opacity 0.3, glow 0.12 (a paler blue reads as milk).
- **Contact sheet for test frames:** tile 10-15 `-Step frames` stills with ffmpeg `xstack` and look at one image instead
  of ten (faster than the full sheet while fixing new pieces).

### Added for the painkiller video (2026-11-10, worked example `projects\painkiller`, 31 s, 16 shots)
- `enzyme_scene.js` `enzymeScene(E, A)`: lumpy enzyme "factory" in inflamed-tissue fog; red product molecules
  (prostaglandins) stream out of its pocket; a blue blocker (ibuprofen) flies in and plugs it, and production stops.
  `update(t, { make, block, blockAt, drug })` (pure function of t: molecules born after `blockAt` never appear),
  `setColors({ product, blocker })` for any enzyme + inhibitor story, `cam.wide/close`, `look`.
- `chili_fx.js` `FX.pain(t, k)`: throbbing red headache glow at the forehead + temples (sprites float 1.5 cm off the skin
  with depth testing ON; with depth testing off the far temple's glow lands on the eye).
- **Dark band across full-body glass shots** (camera ~2.5 m away): it's the AO pass. Render those shots with `ao: 0`.
- Pill drop (no hand needed): head tipped back (`head -0.3, neck -0.08, jaw 1.3`), pill falls from lips + (0, 0.045, 0.07).
- `CF.seeThrough(['stomach'], 0.35)` shows a dissolving pill inside the stomach; restore it with 1 in the per-frame reset.
- **Scripted replace gotcha:** a stray placeholder replace broke shots.js. After any bulk edit, run
  `node --check` on a `.mjs` copy of each changed file before rendering.

### Hero organ model library (user-provided, added 2026-11-10; `core/library.js`, test scene `projects\lab-models`)
Four stand-alone organ models in `assets\shared\models\library\` (originals kept in `provided by me\`):
| key | what | size | material |
|---|---|---|---|
| `brain_arteries` | brain + bright red artery cage | 0.17 m | own texture |
| `brain_vessels_skullcap` | brain, red arteries + blue veins, white skull cap on one side (rotation.y -0.6..+0.3 shows the brain) | 0.18 m | own texture |
| `liver_vessels` | liver with vena cava stubs + vessel tree | 0.22 m | `organMat('liver')` |
| `torso_organs` | lungs + heart + stomach + intestines, ONE mesh | 0.45 m | `organMat('gut')` (one colour only) |
```js
PRELOAD.models.liverHero = LIB.liver_vessels.url;
const LV = libraryModel(A.models.liverHero, 'liver_vessels'); V.scene.add(LV.group); LV.group.position.set(0, 1.4, 0);
LV.mat.emissive.set('#FFA51F'); LV.mat.emissiveIntensity = 0.4;   // glow on the word, like any BODY material
```
- They are NOT aligned to heroMan/BodyParts3D: use them alone on the void for big close-up beats (a floating brain
  that lights up, a liver turning while it "works"), then cut back to the glass man. Camera ≈ 3.4 × size away.
- Heavy (5-33 MB, 300-560k triangles): load only the ones a video uses.
- **Licence unknown** (downloaded from the internet, probably AI-generated). Check the source/licence before using them in
  a published video, and add any required credit to the description.

## 4. Shot recipe (`shots.js`)
```js
export const PRELOAD = { models: { head: 'assets/models/lps_LeePerrySmith.glb' }, hdri: { studio: 'assets/hdri/studio_small_09_2k.hdr' },
  obj: { brain: 'assets/anatomy/brain.obj', /* … */ }, tex: { col: 'assets/models/lps_Map-COL.jpg', nrm: 'assets/models/lps_Infinite-Level_02_Tangent_SmoothUV.jpg' } };
export function buildShots(E) {
  const V = SETS.studioVoid(A.env.studio, '#5BC4F0'), gmat = SETS.glassMaterial();
  const H = SETS.scanHead(A.models.head, A.tex.col, A.tex.nrm, gmat); H.group.position.set(0, 1.6, 0); V.scene.add(H.group);
  const AN = realHead(A, { x: 0, y: 0.065, z: -0.01, s: 1 }); H.group.add(AN.group);
  add({ id: 'S03', at: cut(2), note: 'skin fades to glass, brain inside', draw(lt, d, t, blit) {
    const x = eio(seg(lt, 0.2, 1.1)); reset(x);                       // pose EVERYTHING from time (pure function)
    cam.position.copy(lerpV(V3(0.4, 1.7, 0.75), V3(0.3, 1.7, 0.6), eio(lt / d))); cam.lookAt(BRAIN);
    E.render(V.scene, cam, { ...LOOK, focus: cam.position.distanceTo(BRAIN) }); blit();
  } });
  cue(cut(2) + 0.2, 'sparkle', { dur: 1, gain: 0.4 });
}
```
- `cut(i)` = just before line i; `Wd('word', i)` = when a word is spoken (prefix match; "isn't" → `Wd('isn', i)`).
- **Camera always moves** (slow eased push/pull/orbit). Head close-ups: camera 0.5-1.0 m from (0, 1.6, 0).
  Profile: camera at +x looking at (0, 1.6, 0.06). Keep the bust's cut-off bottom out of frame (look ≥ y 1.58).
- **Ways in:** skin → glass fade (`H.setXray(k)` + `AN.group.visible`), cut to `vessel` macro, push-in.
- **Meaning by colour, not labels:** recolour on the word (icy cyan, warm orange, red pulse via `gmat.uniforms.uCol`,
  yellow nerves, swelling arteries). Avoid pills/labels (the channel uses captions only).
- With the scanned head (no body), props still float to the lips. With heroMan, the hand holds them (`H.holdR`). The scanned head has **eyes closed** (fits savouring/pain;
  for an open-eyed reaction use the Blender pipeline or reframe so the face isn't the focus).
- Pain: red additive sprite on the forehead (`pain` in the demo), head tilt via `H.group.rotation`.
- Sound cues (`tools/mix.py`): whoosh, slide(dur), pop, plop, gulp, boing, bubbles(dur), sizzle(dur), sparkle(dur),
  thud, slam, tock, zip, alarm(dur), inhale(dur), heartbeat. Keep gains 0.3-0.6; music `bed` sits ~18 dB under the voice.

## 4b. DEFAULT STYLE since the coffee video (user: "better than brain freeze")
Copy `demo\coffee\src\shots.js` as the starting point for new videos (not the brain-freeze shots). Its recipe:
- **Cast:** full-body MPFB `heroMan` (open eyes, `face()` expressions) for the human moments, plus
  `bodyAnatomy` + glass x-ray for the inside. The scanned head is now only for extreme face close-ups.
- **World setup:** `V.scene.add(H.group); V.scene.add(H.anatomy.group)` (REQUIRED, or the glass head is empty).
  Then add `BODY`, the effect modules (`CF`, `ADR`, `GM`, `HFX`), props, `synapseScene`, and `vessel`.
- **One `reset(t, { xray, body:[...], night })` per frame:**
  - x-ray on/off and the visible organ list
  - hide the props and effects (`CF.reset()`, `ADR.update(0,0)`, `GM.update(t,0)`, `HFX.update(t,{})`)
  - `mood = voidMood(V, night)`

  Every shot calls it first, so each shot is a pure function of t.
- **Shot rhythm:**
  - 19 shots in 45 s (≈1-3.5 s each), with a new picture every caption or two.
  - Every human beat cuts to an inside beat and back: face → glass body → macro molecule → vessel → face.
- **Transitions:**
  - dissolve: skin ↔ glass (`setXray` is on/off, so fade between two shots)
  - zoomblur: into or out of the brain, vessels and synapse
  - whip: between body regions
  - flip: only on the turn words ("But…", "Then…")
- **Colour = meaning, one colour per thing:**
  - gold `#FFB23F` = the substance (caffeine)
  - blue = the tired signal (adenosine)
  - orange = adrenaline
  - red = blood and heart
  - navy void = night
- **Loop:** the last shot ends on shot 1's exact camera, prop pose, face and void colour; frame 0 starts mid-action (mid-sip).
- **Sound:** a cue on every visual beat (sip, swallow, molecule clicks, shimmer, heartbeat_fast, rumble, tick, whoosh_soft) at gains 0.3-0.55.
- **Looks:**
  - skin `LOOK {aperture 0.0015, bloom 0.12, thr 0.9}`
  - glass `LX {aperture 0.0008, bloom 0.3, thr 0.78}`
  - brain-glow shots `{exposure 0.82, bloom 0.18, thr 0.88}` (otherwise blown white)
  - vessel `{aperture 0, ao 0}`; synapse `SY.look`
- **Good cameras (hero feet at the origin, facing +z):**

  | Shot | Camera → look-at |
  |---|---|
  | sip | (0.34,1.62,0.95) → (0,1.59,0.05) |
  | face close | (0.16,1.66,0.62) → (0,1.64,0.09) |
  | waist-up | (0.48,1.54,1.55) → (0,1.43,0.03) |
  | glass head 3/4 | (0.36,1.72,0.78) → (0,1.68,0.02) |
  | glass head side | (0.5,1.67,0.17) → (0,1.665,0.07) |
  | heart | (0.14,1.41,0.45) → (0.02,1.37,0.1) |
  | adrenals/torso | (0.22,1.34,0.95) → (0,1.27,0.04) |
  | gut side | (-0.6,1.02,0.42) → (-0.08,1.0,0.12) |
  | stream follow | `CF.camFor(u)` |

- **Render time:** the full 1.5× final (1366 frames) took ~5 min on this laptop, and the sheet takes ~2 min. Always make
  `coffee_share.mp4` (crf 25 → ~25 MB) beside the 68 MB master.

## 5. QA (never ship a frame you haven't looked at)
**Problems caught on the coffee sheet (check for them every time):**
- **Empty glass head** (no brain or skull): `H.anatomy.group` wasn't added to the scene. Debug with
  `node tools/capture.mjs eval "(() => { OP.draw(18.6); return ... })()"` (expose objects via `window.__D`).
- **Two brains:** don't show the BODY 'brain' when the realHead is visible (it z-fights and doubles the glow).
- **Camera inside or under the jaw** on head close-ups: keep the camera ≥ 0.45 m from (0,1.66,0.07) and level with the head.
- **Head cut off** when the hero looks down: raise the look-at to y ≥ 1.43.
- **Washed-out glass:** too much bloom or bones; drop 'bones' from belly shots and lower bloom on glowing-brain shots.
- **Caption cards under ~0.4 s** ("And with", "Then when"): merge them into the next card.
  The caption matcher now prefers an exact word match, so "that" no longer snaps to "that's" early.
- **Expressions:** `crash` drops the head, so use it in medium shots, not tight close-ups.

**General checks:**
`-Step sheet` then check every frame for: the cone/prop really at the lips (not the chin/eye) · glass shots not washed
white (bloom ≤ 0.3, skull opacity ~0.1) · anatomy inside the head (not poking out) · no black squares (NaN pixels:
the glass/x-ray shaders guard against them; if one appears, look for a degenerate mesh or a scaled organ) · bust edge
out of frame · captions on the right word, never covering the key action (keep it above y ~1250) · the last frame
loops into the first. Fix, re-sheet, then render.

## 6. Credits (put in every video description)
- Head scan: Lee Perry-Smith / Infinite Realities, CC BY 3.0
- Anatomy: BodyParts3D, © The Database Center for Life Science, CC BY-SA 2.1 JP
- Studio lighting: Poly Haven (CC0)
- 3D human (heroMan): MakeHuman / MPFB (CC0)
- Voice: Kokoro-82M (Apache-2.0), local
Never use Zack D Films' name, logo, characters, scripts, footage or audio.

## 7. Paths & setup
`<skill>` = the folder that holds SKILL.md (normally `%USERPROFILE%\.claude\skills\zackd`).
- Engine template: `<skill>\engine` · new projects: `<skill>\projects\<name>`
- Shared assets (junction `assets` in every project): `<skill>\assets\shared\{models,hdri,anatomy}`. Run `setup.ps1` once
  after unzipping: it creates the `assets` junctions for `engine` and the demos.
- Full BodyParts3D library (NOT included, only needed for new organs): download the OBJ sets from
  https://lifesciencedb.jp/bp3d/ into `<skill>\assets\bodyparts3d`.
- Hero organ model library (`assets\shared\models\library`, §Hero organ model library): NOT included (licence unknown).
- Kokoro voice files: `%USERPROFILE%\.faceless-shorts\kokoro` (downloaded once by `python scripts\voice.py --download`);
  Python needs `kokoro-onnx faster-whisper numpy scipy soundfile`
- Needs Node 22+, Google Chrome, ffmpeg and Python 3.10+; three.js r170 is vendored in `vendor\`
- `projects\<name>` folders in this package hold only script.json + src\shots.js of finished videos (copy their effects).
- **Deleting a project:** remove the junction FIRST (`cmd /c rmdir "<project>\assets"`), then the folder. A recursive
  delete through the junction would wipe the shared assets used by every project.
