---
name: short-video
description: End-to-end narrated explainer shorts (9:16). Stage 1 - the user sends a script and gets one-click image prompts, one per 0.5-1 s of narration. Stage 2 - the user uploads the generated images and the voiceover to the repo root and sends the transcription, the caption (title) and the background music; Claude matches images to lines, renders the final MP4 with captions, title and music, and sends it. Use whenever the user sends a script, asks for scene/image prompts, says images or a voiceover were uploaded, sends a transcription/caption/music, or asks for the final video or an edit to one.
---

# Short video: script → prompts → final MP4

Two stages. Work out which one the message is:

| The user sends | Stage |
|---|---|
| a script / story / "make prompts" | **1. Prompts** |
| transcription + caption + music (images and voiceover are in the repo) | **2. Render** |
| a fix to an existing video ("swap image 12", "music from the end") | **2. Render**, from step 2.5 |

Always deliver with **SendUserFile** (status `normal`; `render` for the MP4, `attach` for the prompt file).
Never ask the user to download from the repo. Commit and push every stage to the session branch.

Before either stage, bring in new uploads (they land on `main`):
`git fetch origin main && git merge --no-edit origin/main` — merge, never rebase (force-push is blocked).

---

## Stage 1. Script → scene prompts

Input: the script (and maybe a caption/title). Pick a short lowercase `<name>` (e.g. `stoptime`).

1. Write `prompts/<name>/script.txt` (the script verbatim). If the user gave a caption, also write
   `prompts/<name>/title.txt` (format below); it is reused in stage 2.
2. Write `prompts/<name>/scenes.py`. Copy the shape of `prompts/pedigree/scenes.py`:
   `TITLE`, `CHARACTERS`, optional location constants, `SCENES = [(exact narration chunk, [characters], scene description), ...]`,
   and the `__main__` block that writes `prompts/<name>/<name>-prompts.md` via `build_prompts.render`.
   Reuse the house characters (the curly-haired Indian narrator `YOU` in the teal shirt) unless the story needs others.
3. Rules for the split and the scenes (these are what the user approved):
   - **Each scene covers 0.5–1 s of narration** (2–3 spoken words) where possible.
   - **Connector-only fragments** ("and each", "had to", "But what if", "This means") never get their own
     scene: merge them into the neighbouring line that has something to show (that scene may run 1.3–2 s).
   - **Each image literally shows what its line says**: the noun or action in the words, or the next step of
     that sentence's idea. No loose metaphors, no generic filler shots.
   - **Never show anything from a later line.** The builder appends the line and the sentence *so far*
     ("NARRATION FOR THIS IMAGE"), never the rest.
   - Describe real people and film characters by look, never by name. No readable text in images.
   - If the title will be spoken at the start of the voiceover, make it scene 1.
   - Keep characters and locations identical across scenes by reusing the same constants.
4. `python prompts/<name>/scenes.py` — it fails if the chunks don't reproduce script.txt word for word and
   warns on scenes outside 0.5–2 s; fix and re-run until clean.
5. Send `prompts/<name>/<name>-prompts.md` with SendUserFile (`attach`), plus one line: scene count and
   estimated length. Tell the user the next step in one line:
   *"Generate the images in this order, upload them and the voiceover to the repo, then send me the
   transcription, the caption and the music."* (Generating in prompt order matters: stage 2 uses it.)
6. Commit `prompts/<name>/` and push.

---

## Stage 2. Uploads + transcription + caption + music → final MP4

Inputs:
- **Repo root:** the scene images (Gemini, 1024x1024, random names) and the voiceover, uploaded with
  GitHub "Add files via upload". The repo root is the inbox: anything image/audio there is new.
- **From the user in chat:** the transcription (exact voiceover text), the caption (title), the
  background music (attached file, or uploaded to the root too). Any of them may be missing if stage 1
  already has it (`prompts/<name>/script.txt`, `title.txt`); only ask for what is truly missing.

Steps:

1. `pip install -q pocketsphinx opencv-python-headless` (if not already installed).
2. Save the transcription to a scratch file, then ingest:
   ```
   python pipeline/ingest.py <name> --script /path/transcription.txt --title "CAPTION *WORD*" \
       [--music /path/to/attached/music.mp3] [--music-from end]
   ```
   It moves root images to `projects/<name>/images/`, picks voiceover vs music among root audio files
   (name hint, else a speech check against the script; it prints its choice: confirm it's right),
   writes `script.txt` / `title.txt` / `settings.json`, and lists numbers still needing the spoken form.
   Use `--dry-run` first if the root holds anything unexpected. Use the `<name>` from stage 1 so the
   prompts are found.
3. Fix script.txt until alignment passes:
   - Numbers: `{display|spoken}`, e.g. `{2017|twenty seventeen}`, `{1,400|one thousand four hundred}`.
     A bare number is an error. Check how the narrator says it (see `_recognise` in make_video.py).
   - Unknown words: add CMU phones to `pipeline/extra_dict.txt`, or spell them phonetically.
   - `python pipeline/make_video.py projects/<name> --align-only`. If it says *"Speech found where
     script.txt has no words"*, the narrator says something the transcription lacks (often the title read
     aloud): add it to script.txt and give it a scene.
4. Draft and review the scene matching:
   - `python pipeline/draft_scenes.py projects/<name>` writes a draft `scenes.json` (lines from
     `prompts/<name>/scenes.py`, images in Gemini-timestamp order, exact duplicates dropped) and review
     sheets `projects/<name>/out/review/sheet_NN.jpg` (each tile: scene number, image, its line).
   - **Read every review sheet.** For each tile, does the image literally show its line? Fix
     `scenes.json` by moving images (common: the title image generated last; a few swapped neighbours).
     Re-run with `--sheets-only` after edits and look again until every tile fits.
   - Use every image exactly once. More lines than images: merge adjacent lines. More images than lines:
     split a line so both images get screen time. Report skipped duplicates to the user.
   - Lines concatenated in order must cover every word of script.txt (make_video checks this).
5. `python pipeline/make_video.py projects/<name>` → `projects/<name>/out/<name>.mp4`
   (also `timeline.csv`, `words.srt`, `clean/` watermark-free images).
6. Spot-check a few frames: `ffmpeg -ss T -i out/<name>.mp4 -frames:v 1 /scratch/f.jpg` at scene starts
   from `timeline.csv` (first, a middle one, last); captions on the right images, title visible.
7. Send the MP4 with SendUserFile (`render`) and a compact line → image table (scene, time, line).
   Commit `projects/<name>/` (inputs, scenes.json, MP4; `out/clean` and `out/review` are ignored),
   any `pipeline/` changes, and push.

Edits after delivery ("image 7 is wrong", "music from the end", "slower"): change `scenes.json`,
`settings.json` (`{"music": "end"}`) or flags (`--speed`, `--max-gap`), re-run step 5–7.

---

## Formats

- `title.txt`: one line, UPPERCASE, highlighted word(s) in stars → yellow:
  `WHAT IF YOU COULD *STOP TIME?*`, `TELEPORTATION *EXPLAINED*`. If the user's caption has no stars,
  star the last word.
- `scenes.json`: `[{"line": "Imagine a donkey", "image": "995238171_1794339504419622.jpg"}, ...]`
- `settings.json` (optional): `{"music": "end"}` uses the track's last segment so its ending lands on
  the video's end (default `start`, looped if short).

Project folder:
```
projects/<name>/
  images/  voiceover.*  music.*  title.txt  script.txt  scenes.json  settings.json  out/
```

## Approved style (defaults in pipeline/make_video.py — don't change unless asked)

- 1080x1920 black frame, image 1080x1080 at y=420.
- Pauses in the voiceover capped at 0.3 s (`--max-gap`, 0 = off), word times remapped. Speed 1.10x, pitch kept.
- Title: Inter Display Black 66px, white, soft shadow, starred words yellow #FFC816, centred above the
  image, whole video, shrinks to fit one line.
- Captions: one word at a time, UPPERCASE, Inter Black ~49px, white with black outline, centred on the
  image, small pop-in; clears on pauses ≥ 0.25 s. Drops , . : ; and quotes; keeps ! ? and apostrophes.
- Audio: voice -15 LUFS, music -33 LUFS, 1 s fade-in, 2.5 s fade-out, limiter.
- Gemini sparkle watermark removed by inverting the blend (`pipeline/wm_alpha.npy`), only where detected.

## Environment limits

No speech-to-text model can be downloaded (Hugging Face, OpenAI and Vosk hosts are blocked; PyPI and
GitHub work), which is why the transcription is needed: pocketsphinx force-aligns it to the voiceover.

## Reference

`projects/{stoptime,socialanxiety,teleportation,barbers,vanished}` are finished videos (inputs,
scenes.json, MP4). `prompts/*/scenes.py` are finished prompt sets. `buridan_alignment/` is the first
video, with its originals in `buridan_alignment/source/`.
