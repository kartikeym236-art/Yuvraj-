"""Generate missing scene images for a project with the free Pollinations FLUX endpoint.

Runs on a GitHub Actions runner (this container's network blocks the host):
    python pipeline/gen_images_pollinations.py projects/<name>
Reads projects/<name>/gen_prompts.json ([[id, prompt], ...]), writes images/scene_<id>.jpg,
commits and pushes every 10 new images so progress is visible, and writes images/_genlog.txt.
"""
import json, subprocess, sys, time, urllib.parse, urllib.request
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

proj = Path(sys.argv[1]); out = proj / "images"; out.mkdir(exist_ok=True)
log = out / "_genlog.txt"
prompts = json.loads((proj / "gen_prompts.json").read_text())

def note(msg):
    print(msg, flush=True)
    with log.open("a") as f: f.write(msg + "\n")

def push(msg):
    subprocess.run(["git", "add", str(out)], check=False)
    if subprocess.run(["git", "commit", "-qm", msg]).returncode == 0:
        for _ in range(3):
            if subprocess.run(["git", "pull", "--rebase", "-q"]).returncode == 0 and subprocess.run(["git", "push", "-q"]).returncode == 0:
                break
            time.sleep(5)

def one(item):
    n, p = item
    name = f"scene_{n:03d}.jpg" if isinstance(n, int) else f"scene_{n}.jpg"
    path = out / name
    if path.exists() and path.stat().st_size > 10000:
        return None
    url = ("https://image.pollinations.ai/prompt/" + urllib.parse.quote(p[:900])
           + f"?width=1024&height=1024&nologo=true&model=flux&seed={len(p) * 7 + 11}")
    err = ""
    for attempt in range(3):
        t = time.time()
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "reel-pipeline"})
            data = urllib.request.urlopen(req, timeout=120).read()
            if len(data) > 10000 and data[:2] in (b"\xff\xd8", b"\x89P"):
                path.write_bytes(data); note(f"ok {name} {len(data)}B {time.time()-t:.0f}s"); return name
            err = f"bad {data[:80]!r}"
        except Exception as e:
            err = f"{type(e).__name__}: {str(e)[:100]}"
        note(f"retry {name} #{attempt} {err} ({time.time()-t:.0f}s)")
        time.sleep(8)
    note(f"FAILED {name} {err}")
    return None

todo = list(prompts)
done = 0
for i in range(0, len(todo), 10):
    with ThreadPoolExecutor(3) as ex:
        done += sum(1 for r in ex.map(one, todo[i:i + 10]) if r)
    push(f"images {proj.name}: batch {i // 10 + 1} ({done} new)")
note(f"FINISHED {done} new images")
push(f"images {proj.name}: finished")
