---
name: ThingsExplained
description: Turn a pasted reel script into a finished 9:16 Instagram reel in the Jensen/Elon reel style. Makes the ElevenLabs Brian voiceover, writes ~0.8 s scene image prompts, then, once the user sends the images, matches them, renders with yellow centred captions and sends the MP4. Use when the user sends a script for a reel (not a 16:9 long video).
---

# ThingsExplained: reel from script (Jensen/Elon reel style)

The user sends **only a script** (plus optionally a title, track and style reference images).
You produce: voiceover → image prompt file → (user sends images) → MP4.
Follow CLAUDE.md for repo rules (branch, commits, Drive, Composio). This skill is the reel recipe.

## 0. Defaults (unless the user says otherwise)

| Setting | Default |
|---|---|
| Voice | ElevenLabs **Brian** `nPczCjzI2devNBz1zQrb`, model `eleven_multilingual_v2` |
| Speed | `1.10` (user, Nov 2026) |
| Pause cap | `max_gap 0.10` (user, Nov 2026) |
| Captions | `"yellow"`: one word at a time, bold yellow, black outline, centred on the image, original casing |
| Title | user's title in CAPS, key word in `*yellow*`; wraps to 2 lines automatically |
| Music | the track the user names (copy from an earlier project's music.mp3 or their upload); `"start"` unless they say a segment. **If no track is given, pick one from earlier projects that suits the topic** (user, Nov 2026); find them with ffprobe title tags, e.g. Girlfriends - New Computers (barbers), Can You Hear The Music (chess), Cornfield Chase (brain), No Time for Caution (nov13), biting bullets (avoid), Experience (catholic), Paris (jensen), Goodbye (dark3) |
| Scene length | ~0.6–1.1 s each (about 2–3 words), scene 1 = dramatic hook |
| Image style | flat 2D cartoon, thick black outlines, caricature big heads, warm orange-tan skin, dot eyes, muted teal/slate + warm orange, detailed illustrated backgrounds, NO text in images |

If the user sends style reference images, copy them to `prompts/<name>/ref/` and describe that style instead.
Ask only if something essential is missing (title). Never ask about things with a default.

## 1. Project setup

```
P=projects/<name>; mkdir -p $P/images prompts/<name>
```
- `$P/script_tts.txt`: the script exactly as it should be spoken (fix only typos and dashes; keep the user's wording).
- `$P/title.txt`, e.g. `DARK TRUTH BEHIND JENSEN HUANG *RESIGNATION*`
- `$P/settings.json`: `{"watermark": false, "captions": "yellow", "music": "start", "speed": 1.13, "max_gap": 0.10}`
  (switch `"watermark"` to true/omit when the user's images come from the Gemini app, which adds the sparkle).
- `$P/music.mp3`

**Fact check:** if the script makes claims about real people or current events, WebSearch them and tell the user which claims are confirmed, overstated or unconfirmed (with sources) before posting. Don't silently change their script.

## 2. Voiceover (ElevenLabs Brian via Composio CLI)

```
export PATH=$HOME/.local/bin:$PATH
python3 -c "import json;json.dump({'voice_id':'nPczCjzI2devNBz1zQrb','text':open('$P/script_tts.txt').read(),'model_id':'eleven_multilingual_v2','output_format':'mp3_44100_128'},open('/tmp/tts.json','w'))"
composio execute ELEVENLABS_TEXT_TO_SPEECH -d @/tmp/tts.json > /tmp/tts_out.json
# download data.file.s3url -> $P/voiceover.mp3
```
- Limit 5,000 characters per call: split at paragraph ends and join with ffmpeg concat (0.4 s silence between parts).
- Only Composio-curated voices work (Brian, Adam, Liam, …). Fallback if ElevenLabs fails: `python pipeline/kokoro_tts.py $P --voice am_michael`.
- Send the voiceover MP3 to the user (SendUserFile, attach).

## 3. Script for alignment + alignment

`$P/script.txt` = script_tts.txt with:
- numbers as `{display|spoken}`: `{33|thirty three}`, `{150|one hundred and fifty}`, `{1590|fifteen ninety}`
- acronyms spoken as letters: `{AI|a i}`, `{CEO|c e o}`, `{CIA|c i a}`, `{U.S.|u s}`
- hyphenated words: `{open-weight|open weight}`

Then:
```
python pipeline/make_short.py $P --align-only
```
- Unknown words → append CMU phones to `pipeline/extra_dict.txt` (e.g. `deepseek D IY P S IY K`).
- If a sentence won't align (usually the final word), align the rest, append the last word by hand to `out/word_alignment.json` and set `"alignment": "cached"`.

## 4. Scene plan and prompt file

1. Compute pause-trimmed word times: `make_video.tighten(voice, al, tmp, max_gap)`; durations divided by speed.
2. Split the script into scenes of ~0.6–1.1 s (a small DP over word boundaries: penalise <0.6 s and >1.1 s, prefer ending on punctuation, never cross a sentence end mid-scene, avoid ending on "the/a/of/to/and"). A 90 s reel ≈ 100–110 scenes.
3. Write `prompts/<name>/scenes.py` like `prompts/jensen/scenes.py`:
   - `STYLE` line (section 0 or the user's reference), `CHARACTERS` dict (one fixed look per recurring person, e.g. "JENSEN: older East Asian man, swept-back silver-grey hair, black leather biker jacket…"),
   - `SCENES = [S(line, description, "JT"), …]`. One concrete visual per line: literal or a clear metaphor.
   - **Scene 1 is the hook**: the most dramatic, high-contrast image (conflict, danger, a striking split-screen or close-up). Never a calm narrator shot.
   - Scenes with no characters get "NO people unless described."; no readable text in any image.
4. Run it to write `$P/scenes.json` (images named `001.png` …) and `$P/image_prompts.md` (each prompt self-contained, labelled with its narration line). Check the lines cover script.txt exactly:
   `[w for s in scenes for w in spoken(s["line"])] == spoken(script)`.
5. Send `image_prompts.md` to the user and say: generate each as square 1:1, name them `001…`, send in chat or put them in the Drive "claude" folder.

If the user asks you to generate the images instead: paid ImageRouter `google/nano-banana-2-lite` (~$0.034/image) gave the best results; test one first, view every image, regenerate wrong ones.

## 5. When images arrive

- **Chat uploads:** copy into `$P/images/NNN.png` by number. If unnumbered, match by looking.
- **Drive:** list the folder (GOOGLEDRIVE_FIND_FILE with `createdTime >` the time you sent the prompts; also check My Drive root, since part of an upload can land there), download in the workbench, zip, `curl -L` here.
- Make contact sheets (labelled tiles), **view every image** and assign each to its scene by content. Batches are often uploaded in reverse or shuffled order; never assume the filename order.
- Exact duplicates: use once and tell the user. Missing scenes: list them with their lines and prompts and ask for just those.
- Don't run `crop_borders.py` on light paper-style images (it trims real content); restore with `git checkout` if it does.

## 6. Render, check, deliver

- First: `python pipeline/remove_marks.py $P/images`, then LOOK at `$P/out/corners.png`; no sparkle or "AI" badge may remain (see CLAUDE.md).

```
python pipeline/make_short.py $P
```
- Spot-check 4 frames across the video (`ffmpeg -ss T -frames:v 1`): title on 1–2 lines, yellow caption centred, caption word matches the image.
- Commit `pipeline/` changes, `prompts/<name>`, `scenes.json`, images and the MP4; push.
- Send the MP4 (SendUserFile, render) with a short summary: length, voice, speed, track, scene count, anything regenerated or substituted.
- Don't post to Instagram unless the user asks; if they do, follow CLAUDE.md's posting section (reel + ≤60 s story + AI comment).

## Reference project

`projects/jensen` + `prompts/jensen/scenes.py` is the canonical example of this skill's output.


## Always (user, Nov 2026)
- Refine every script for a US audience before voicing it (US units/references, Congress not
  Parliament, no Hinglish filler, fix number/unit errors, soften unverified claims); keep the main
  content and tell the user what changed.
- Run `python pipeline/remove_marks.py projects/<name>/images` ONCE on the original images: it removes
  the sparkle watermark, the "AI" badge and all metadata (EXIF/XMP/C2PA). Check it reports
  "metadata stripped N/N" and LOOK at out/corners.png before rendering.

## Ending call to action (user, Nov 27 2026)

Every things__explained script ends with: "If you want updates related to <topic> then make sure to
follow our page, Things Explained." Pick the topic from the reel (geopolitics / business / tech /
finance / AI, or two of them). Write it into the script before voicing, and give it 2-3 scenes in
the prompts (e.g. THE GUY with a topic-themed tablet, pointing at a Follow button, next to a
"THINGS EXPLAINED" sign) so it never needs extra images later.
