"""Generate missing scene images for a project with the free Pollinations FLUX endpoint.

Run on a GitHub Actions runner (this container's network blocks the host):
    python pipeline/gen_images_pollinations.py projects/<name>
Reads projects/<name>/gen_prompts.json ([[id, prompt], ...]) and writes images/scene_<id>.jpg.
"""
import json, sys, time, urllib.parse, urllib.request
from pathlib import Path

proj = Path(sys.argv[1])
out = proj / "images"; out.mkdir(exist_ok=True)
prompts = json.loads((proj / "gen_prompts.json").read_text())
failed = []
for n, p in prompts:
    name = f"scene_{n:03d}.jpg" if isinstance(n, int) else f"scene_{n}.jpg"
    path = out / name
    if path.exists() and path.stat().st_size > 10000:
        continue
    url = ("https://image.pollinations.ai/prompt/" + urllib.parse.quote(p[:900])
           + f"?width=1024&height=1024&nologo=true&model=flux&seed={1000 + hash(str(n)) % 9000}")
    for attempt in range(5):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "reel-pipeline"})
            data = urllib.request.urlopen(req, timeout=180).read()
            if len(data) > 10000 and data[:3] == b"\xff\xd8\xff" or data[:4] == b"\x89PNG":
                path.write_bytes(data); print("ok", name, len(data), flush=True); break
            print("bad response", name, data[:120], flush=True)
        except Exception as e:
            print("retry", name, attempt, e, flush=True)
        time.sleep(10 * (attempt + 1))
    else:
        failed.append(name)
    time.sleep(3)
print("failed:", failed)
