# What this install contains (Linux / cloud copy, 2026-11-27)

Rebuilt here because the original Windows engine source was not available: same API as references/making-videos.md
for the core (scanHead, glassMaterial, studioVoid, vessel, realHead, bodyAnatomy, organMat, captions, transitions,
cues, voidMood), written fresh for three.js r170.

| piece | status |
|---|---|
| engine/src/core: timeline, assets, engine (ACES, shadows, GTAO, DOF, bloom, grade), sets, materials, anatomy, anatomy_body, captions, moods, tech_props | written, tested on renders |
| engine/src/main.js (shots, transitions flip/zoomblur/whip/dissolve, captions, fades, OP capture API, play mode) | written, tested |
| tools/capture.mjs (check, cues, frames, sheet, video, eval) | written, tested |
| tools/mix.py, scripts/voice.py, words.py, estimate.py, tools/bp3d_merge.py | from the original package (words.py: local Whisper model path) |
| tools/bp3d_build.py + anatomy_parts.json | new: builds assets/shared/anatomy/*.obj from the BodyParts3D 4.3 library |
| scripts/new_video.sh, voice.sh, build.sh, setup.sh | new (bash versions of the .ps1 scripts) |
| assets: head scan + textures, studio_small_09 HDRI, Inter fonts, Kokoro voice, Whisper small.en, BodyParts3D (3,210 meshes), Earth textures + Natural Earth borders | downloaded by setup.sh |
| heroMan (core/hero.js, hero_male.glb) and the coffee-era modules (synapse, caffeine_flow, adrenaline, gut_motion, head_fx, props) | NOT rebuilt yet. blender/make_hero.py is written; running it was blocked by the session's permission check (it installs MPFB as a Blender extension). Copy the originals from your PC to use them. |
| demo/coffee, demo/sugar, projects/* shots.js | not available (only their YouTube texts / word timings) |

Rendering here is CPU-only (SwiftShader WebGL): ~3-6 s per 1080x1920 frame with 2 workers.

## Reference-style kit (2026-11-28)
- `assets/shared/models/people/`: readyplayer.me (realistic man, mouth morphs), Michelle (woman), Soldier, Xbot (animation library), facecap (ARKit face) - three.js examples, Mixamo rig. Retargeted at runtime by `engine/src/core/actors.js` (hidden driver skeleton + rest-pose offsets), so every clip (idle, walk, run, agree, headshake, sad_pose, sneak_pose, sambadance) plays on every body.
- `assets/shared/models/props/`: SheenChair, coffeeMug, ferrari.
- `assets/shared/flags/`: all 271 flag-icons SVGs (MIT).
- `assets/shared/earth/map_countries_50m.geojson` (committed), `map_countries_10m.geojson` + `map_states_10m.geojson` (made by setup.sh, gitignored) - Natural Earth, public domain, slimmed by `tools/slim_geojson.py`.
- Engine modules: `actors.js`, `rooms.js`, `camera.js`, `devices.js`, `map3d.js`. Guide: `STYLE_REFS.md`. Test project: `projects/styletest` (gitignored).
- Not installed yet: MakeHuman CC0 system assets (vidya-hub/makehuman-core `data/`: 17 skins incl. African/Asian/Caucasian young-middle-old, 20 clothes, 10 hair, eyebrows, eyes, teeth; ~430 MB). They would give hair + any ethnicity/age; needs a pure-Python MakeHuman->glTF builder (Blender route was blocked).
