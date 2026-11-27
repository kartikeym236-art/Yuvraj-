---
name: zackd
description: Make ~30 s vertical 3D "what happens inside your body" health Shorts in the ZackD-films format (sky-blue studio void, glass x-ray human with real anatomy, calm male voice-over, white captions, quiet original music, soft procedural SFX). Use when the user asks for a new body/health explainer Short, a script.json, shots.js, the soundtrack mix, timing estimates, or the YouTube title/description/credits for one of these videos.
---

# ZackD-style health Shorts

Read these before starting any video:

- `channel-playbook.md`: the format (script formula, visual style, camera, editing, captions, audio, topic picks, build checklist). Copy the format, never the content, name, logo, characters, footage or audio of Zack D Films.
- `making-videos.md`: the v2 engine pipeline (script.json, voice, shots.js recipe, engine modules, effect modules per past video, QA checklist, credits, paths).

## What's in this folder

| path | what |
|---|---|
| `tools/mix.py` | soundtrack: narration + procedural SFX + music bed (numpy/scipy only). `python tools/mix.py <project>` → `data/mix.wav`; `python tools/mix.py --test <outdir> [narration.wav]` renders every effect and prints levels. Latest version (includes crinkle/rattle/crunch, can_open/fizz). |
| `scripts/estimate.py` | timing without a voice: `python scripts/estimate.py <project> [--wps 2.8]` → `data/lines.json`, `data/words.json` |
| `engine/index.html` | engine page (1080×1920 canvas, loads `src/main.js`, three.js via import map from `vendor/`) |
| `engine/vendor/LICENSE-three.txt` | three.js MIT licence (three.js r170 itself must be vendored next to it) |
| `examples/sugar/` | finished "candy" video: word timings + YouTube title/description/tags |
| `examples/brain-freeze/words.txt` | word timings of the brain-freeze demo (41.5 s) |
| `examples/descriptions/` | YouTube metadata of the alcohol, all-nighter, chili, energy-drink, painkiller and water videos: use as the template for titles, sources, credits, hashtags, tags and the "altered/synthetic content" line |

## Not included (needed for full renders)

The engine source (`engine/src/**`: core/assets.js, engine.js, sets.js, anatomy.js, hero.js, captions.js, main.js and the effect modules), `vendor/three.module.js` + addons, fonts (Inter Black/ExtraBold), `scripts/voice.*`, `words.py`, `build.ps1`, `new_video.ps1`, `tools/capture.mjs`, and the shared assets (head scan, MPFB hero, BodyParts3D anatomy, HDRI, Kokoro voice). Without them you can still: pick topics, research and source facts, write `script.json`, estimate timing, write `shots.js`, design SFX/music with `mix.py`, and write YouTube metadata. Ask the user to upload the missing pieces before promising a rendered MP4.

## Quick workflow

1. Topic: one body process with a visible before → after; 2-3 reliable sources.
2. `script.json`: 4-13 lines, ~75-120 words, opener "If you… / When you…", a turn word per beat, payoff fact last, written to loop.
3. Timing: real voice (voice.py) or `scripts/estimate.py`.
4. `shots.js` per `making-videos.md` §4/§4b; cues for `mix.py` at gains 0.3-0.55.
5. QA per `making-videos.md` §5, render, mix, then the description using `examples/descriptions/` (sources + credits + "for education only, not medical advice").
