# Short-video workflow (read this first)

**Two separate pipelines** (per the user):
- 9:16 reels (1:1 image on a black 1080x1920 frame, title, captions):
  `python pipeline/make_short.py projects/<name>`
- 16:9 long videos (full-screen 1920x1080, no title, no captions):
  `python pipeline/make_long.py projects/<name>`
Both share pipeline/make_video.py; the entry point fixes the mode, so a reel
never picks up long-form behaviour and vice versa. Wherever this file says
`make_video.py`, use the matching entry point.

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

## Posting to Instagram (via Composio, when asked)

Accounts: things__explained (English, account id instagram_teet-agama) and
chize_samjho (Hindi, instagram_bar-inca); pass `account=` to pick one.

Stage the MP4 in the Composio workbench (download the raw GitHub URL of the
pushed file, `upload_local_file`), then INSTAGRAM_POST_IG_USER_MEDIA with
`video_file` {s3key} + media_type REELS + share_to_feed, then
INSTAGRAM_POST_IG_USER_MEDIA_PUBLISH (processing takes ~90 s; run long steps in
a background thread, since the client times out at 60 s). Write hashtags with a
plain `#`: the tool docs say `%23`, but that posts literally "%23" and captions
can't be edited afterwards. Stories must be 60 s or shorter: cut at a sentence end
and add a "FULL VIDEO ON OUR PAGE" end card (warm/out/warm_story.mp4).

After every things__explained reel is published, comment on the reel (not the
story) with INSTAGRAM_POST_IG_MEDIA_COMMENTS: "These reels are made using AI.
Learn to make your own (Link in Bio)". The API has no pin endpoint: remind the
user to pin it in the app.

## Hindi videos

Put the user's Hindi transcript in projects/<name>/transcript.txt and run
`python pipeline/hindi.py projects/<name>/transcript.txt`: it writes
script.txt with every Devanagari word as {हिंदी|key} and adds approximate
phones to extra_dict.txt, so the English aligner times Hindi speech (238/238
words on the swarg video). Write numbers as {1,72,000|एक लाख बहत्तर हज़ार}.
settings.json: {"font": "Noto Sans Devanagari Black"} (bundled). Hindi needs
letter spacing 0: any spacing breaks Devanagari shaping into dotted circles,
so the font override turns it off. Use {"speech_check": false} if the
narrator drags words and the check flags a gap with no missing text.

## Long-form 16:9 videos (e.g. projects/depression)

Everything in this section applies ONLY to {"layout": "landscape"} projects
(make_video.py's LONGFORM flag). 9:16 shorts with the 1:1 image keep their
settings and alignment unchanged; re-aligning all 10 shorts after this change
gave identical word times.

settings.json {"layout": "landscape", "watermark": false}: full-screen
1920x1080, no title, no captions. Voiceovers in parts are joined with ffmpeg
concat. Audio over 4 min skips whole-file alignment and goes sentence by
sentence, with recognition and alignment run in parallel (16 min audio: ~2
min). Check the audio really says the script: the part-1 voiceover here used
the rewritten script on branch ccr-51f21acf, not the pasted text; storyboard
shots were mapped onto it word by word. MP4s over 100 MB can't be pushed
(GitHub limit), so they're git-ignored and just sent.

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
   comma). From now on (user, Nov 2026) each scene must last 0.5-1 s on screen
   (after pause trimming and speed-up), so plan about 2-3 words per scene, and assign the best-fitting image to each
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
- Speed 1.0x: NO speed-up (user, Nov 2026). {"speed": x} in settings.json still overrides per video.
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
