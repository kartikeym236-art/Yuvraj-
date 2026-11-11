# Short-video workflow (read this first)

The user makes narrated explainer shorts from AI scene images. The whole workflow, from a script to
the final MP4, is the **`short-video` skill** (`.claude/skills/short-video/SKILL.md`). Load it for any
script, prompt, upload, transcription, caption, music or video-edit request.

1. **Script → prompts:** the user sends a script; Claude writes `prompts/<name>/scenes.py` and sends
   the one-click prompt file (one image per 0.5–1 s of narration).
2. **Uploads → video:** the user uploads the images and the voiceover to the repo root and sends the
   transcription, the caption and the background music; Claude runs `pipeline/ingest.py`,
   `pipeline/draft_scenes.py` (then checks every match by looking), `pipeline/make_video.py`, and
   sends the MP4 with SendUserFile.

House rules:
- Deliver files with SendUserFile; never ask the user to download from the repo.
- New uploads land on `main`: `git fetch origin main && git merge origin/main` (no rebase; force-push is blocked).
- The repo root is the upload inbox; keep it free of old media (ingest moves everything it finds).
- Numbers in script.txt / scenes.json are written `{display|spoken}`; a bare number is an error.
