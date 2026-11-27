ZACKD SKILL for Claude Code - 3D health / body explainer Shorts (1080x1920)
=========================================================================
A photo-scanned head on a sky-blue void that turns into a glass x-ray head/body with
real anatomy inside, blood-vessel fly-throughs, captions, a free local AI voice-over,
music and SFX. Rendered with three.js in headless Chrome. Free, no API keys.

INSTALL (Windows)
1. Unzip so that this folder becomes:   C:\Users\<you>\.claude\skills\zackd
   (SKILL.md must sit directly inside the "zackd" folder.)
2. Open PowerShell in that folder and run once:
       powershell -ExecutionPolicy Bypass -File setup.ps1
   It links the 3D assets, checks Node 22+ / Chrome / ffmpeg / Python,
   installs the Python packages and downloads the free Kokoro voice (~340 MB).
3. Restart Claude Code and type:
       use the zackd skill to make a video about what happens if you drink coffee every day

TRY THE DEMO FIRST
       powershell -File scripts\build.ps1 -Project demo\coffee -Step check
       powershell -File scripts\build.ps1 -Project demo\coffee -Step sheet
   (Before "-Step video" on a demo, make its voice: powershell -File scripts\voice.ps1 -Project demo\coffee)

WHAT'S INSIDE
  SKILL.md          instructions Claude reads
  references\       format playbook + full engine guide
  engine\           the 3D engine template (three.js vendored)
  assets\shared\    scanned head, 3D man, anatomy models, studio HDRI
  scripts\          new_video / voice / build
  demo\coffee, demo\sugar   complete example projects
  projects\...      shot code of 6 more finished videos (alcohol, chili, energy drink,
                    painkiller, water, all-nighter) to copy effects from

NOT INCLUDED: the YouTube channel study/analysis, the Blender pipeline, the raw
BodyParts3D library (download from https://lifesciencedb.jp/bp3d/ if you need new organs).

CREDITS (put them in every video description)
  Head scan: Lee Perry-Smith (CC BY 3.0) - Anatomy: BodyParts3D, (c) The Database Center
  for Life Science (CC BY-SA 2.1 JP) - Lighting: Poly Haven (CC0) - 3D human: MakeHuman/MPFB
  (CC0) - Voice: Kokoro-82M (Apache-2.0) - three.js (MIT)
Make your own scripts and videos: never use Zack D Films' name, logo, scripts or footage.
Health facts must be accurate; add "not medical advice" to descriptions.
