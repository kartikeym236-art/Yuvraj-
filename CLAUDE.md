# Short-video workflow (read this first)

The user makes narrated explainer shorts from AI scene images. They commit the
inputs to this repo; Claude builds the MP4 and **sends it to them directly**
with SendUserFile (status `normal`, display `render`). Don't ask them to
download anything from the repo.

## Input: one folder per video

```
projects/<name>/
  images/       scene images (Gemini, 1024x1024, any filenames, NOT in order)
  voiceover.*   narration (mp3/wav/m4a)
  music.*       background music (optional, any length)
  settings.json optional per-video options, e.g. {"music": "end"} to use the
                track's last segment so its ending lands on the video's end,
                {"watermark": false} for images with no Gemini sparkle
                (e.g. screenshots sent in chat), avoiding false detections
  title.txt     top caption, e.g.  BURIDAN ASS PARADOX *EXPLAINED*   (*word* = yellow)
  script.txt    exact voiceover text (needed for word timing)
```

In script.txt (and scenes.json lines), write numbers as `{display|spoken}`, e.g.
`{2017|twenty seventeen}` or `{1,400|one thousand four hundred}`. The caption
shows the display form and the alignment uses the spoken words; check how the
narrator actually says it with `_recognise`. A bare number raises an error.
Add any word missing from the pronunciation dictionary to
`pipeline/extra_dict.txt` (CMU phones).

New uploads land on `main`. Bring them in with `git fetch origin main && git
merge origin/main`, not a rebase: rebasing rewrites the branch, and the
force-push it needs is blocked.

If the user commits files elsewhere (e.g. repo root, odd names like
`buridans .mp3`), `git mv` them into this layout yourself. If `script.txt` is
missing, ask for it. No speech-to-text model is downloadable here: Hugging Face,
OpenAI and Vosk hosts are blocked; only PyPI and GitHub are reachable.

## Steps

1. `pip install -q pocketsphinx opencv-python-headless` (if not already installed).
2. `python pipeline/make_video.py projects/<name> --align-only` checks that
   the script matches the audio. Fix out-of-dictionary words by spelling them
   phonetically in script.txt. If the whole-file alignment fails it automatically
   retries sentence by sentence; if it still names sentences that don't match,
   compare them with the audio (see `_recognise` for a rough transcript).
   If it reports "Speech found where script.txt has no words", the narrator
   says something the script lacks (often the title read aloud at the start):
   add it to script.txt and give it a scene.
   If a scene-making session left `prompts/<name>/scenes.py` on another branch
   (`git log --all -- prompts/`), reuse its phrase split and scene
   descriptions as the scene lines.
3. **Match images to lines (Claude does this by looking).** Images are not in
   order. Make labelled contact sheets (12 per sheet, square tiles), view
   every image, split the script into short phrases (one per natural pause or
   comma, roughly 1–2.5 s each), and assign the best-fitting image to each
   phrase. Use every image exactly once. If there are more phrases than images,
   merge adjacent phrases so one image covers both; if there are more images,
   split a phrase so both images get screen time. Exact duplicate uploads
   (near-zero pixel difference) are used once; tell the user which one was
   skipped. Write
   `projects/<name>/scenes.json`:
   `[{"line": "Imagine a donkey", "image": "995238171_....jpg"}, ...]`.
   The lines, concatenated in order, must cover every word of script.txt; the
   script errors out if they don't.
4. `python pipeline/make_video.py projects/<name>` writes
   `projects/<name>/out/<name>.mp4`, plus `timeline.csv`, `words.srt` and
   `clean/` (watermark-free images).
5. Spot-check frames (ffmpeg `-ss T -frames:v 1`) to make sure captions sit
   on the right images, then send the MP4 with SendUserFile, along with a short
   table of line → image. Commit `pipeline` changes, `scenes.json` and the
   MP4, and push to the session branch.

## Approved style (defaults in pipeline/make_video.py)

- 1080x1920 black frame, image 1080x1080 at y=420.
- Long pauses trimmed: every silence in the voiceover (between words, lead-in
  and tail) is capped at 0.3 s before speed-up (`--max-gap`, 0 turns it off).
  Word times are remapped, so captions and cuts stay in sync. A re-alignment
  check agreed to within 30 ms.
- Speed 1.10x (video `setpts`, audio `atempo`, so pitch is kept).
- Title: Inter Display Black 66px, white with soft shadow, highlighted word in
  yellow #FFC816, centred just above the image, shown the whole video,
  auto-shrinks to fit one line.
- Captions: one word at a time, lowercase, Montserrat ExtraBold (bundled in
  `pipeline/fonts/`, size 120 = about 70 px letters), white with a thick black
  outline and soft shadow, centred at y=1306 (82% down the image, about 68% of
  the screen) to match the user's reference reels, small pop-in. A word stays
  up until the next word and clears on pauses of 0.25 s or more.
- Audio: voice loudnorm -15 LUFS, music -33 LUFS (about 18 dB under), music
  from its start (looped if short), 1 s fade-in, 2.5 s fade-out, limiter;
  final mix about -15 LUFS.
- Watermark: the Gemini sparkle (white, ~35% opacity, centre 922,922) is
  removed by inverting the blend with `pipeline/wm_alpha.npy`. No inpainting,
  because inpainting breaks lines that cross the mark. It's applied only where
  detected: a brightness step at the outline, or image edges that follow the
  sparkle shape. This caught 101/101 marked images with 0 false positives.
- Caption words drop , . : ; and quote marks; ! ? and apostrophes stay.

## Reference project

`buridan_alignment/` is the first video (Buridan's donkey): the original scene
matching (`build_timeline.py`), the script and the approved renders.
