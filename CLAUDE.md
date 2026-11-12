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
  settings.json optional per-video options, e.g. {"music": "end"} (or "middle") to use the
                track's last segment so its ending lands on the video's end,
                {"watermark": false} for images with no Gemini sparkle
                (e.g. screenshots sent in chat), avoiding false detections
                (mixed sets are fine with detection on: it only touches marked
                images), {"captions": "reel"} for the lowercase Montserrat
                style, {"speed": 1.15} for a different speed-up, {"max_gap": 0.15} to change
                the pause cap for one video
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

## Generating images with Composio (when asked)

Composio's `GEMINI_GENERATE_IMAGE` works (prompt max 1000 chars; a long
system_instruction gets blocked). Run it in `COMPOSIO_REMOTE_WORKBENCH` with a
ThreadPool (16 images take ~30 s; a direct 20-image multi-execute times out),
zip the results to /home/user (not /mnt/files), `upload_local_file`, then
`curl -L` the link here. Use a short style line, plus "NO people, NO faces"
for scenes without characters (otherwise it adds random cartoon faces). Then
run `python pipeline/crop_borders.py projects/<name>/images` to strip the
cream frames it often draws, view every image, and regenerate bad ones. These
images have no sparkle: set {"watermark": false}.

## Posting to Instagram (things__explained, via Composio, when asked)

Stage the MP4 in the Composio workbench (download the raw GitHub URL of the
pushed file, `upload_local_file`), then INSTAGRAM_POST_IG_USER_MEDIA with
`video_file` {s3key} + media_type REELS + share_to_feed, then
INSTAGRAM_POST_IG_USER_MEDIA_PUBLISH (processing takes ~90 s; run long steps in
a background thread, since the client times out at 60 s). Write hashtags with a
plain `#`: the tool docs say `%23`, but that posts literally "%23" and captions
can't be edited afterwards. Stories must be 60 s or shorter: cut at a sentence end
and add a "FULL VIDEO ON OUR PAGE" end card (warm/out/warm_story.mp4).

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
- Captions (default, per the user: "older videos" style, use it in every video):
  one word at a time, UPPERCASE, Inter Black 49px, white with black outline,
  centred on the image, small pop-in. A word stays up until the next word and
  clears on pauses of 0.25 s or more. The lowercase Montserrat reel style is
  still available with {"captions": "reel"} in settings.json.
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
