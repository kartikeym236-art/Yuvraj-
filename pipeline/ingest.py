"""Move a new upload from the repo root into projects/<name>/ and fill in the text files.

    python pipeline/ingest.py <name> [--music PATH] [--voice PATH]
                                     [--title "STOP TIME *EXPLAINED*"] [--script FILE]
                                     [--music-from end] [--dry-run]

The repo root is the inbox: the user uploads scene images and the voiceover there
("Add files via upload"). This script:
  * moves every root-level image into projects/<name>/images/
  * picks the voiceover and the music among the root audio files (or --voice/--music,
    which may point anywhere, e.g. a file attached in chat) and stores them as
    voiceover.<ext> / music.<ext>
  * writes script.txt / title.txt from --script / --title, else copies them from
    prompts/<name>/ (written in the scene-prompt step)
  * lists bare numbers in script.txt that still need the {display|spoken} form.

Uses `git mv` for tracked files so history follows the move.
"""
import argparse
import re
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
IMG_EXT = {".jpg", ".jpeg", ".png", ".webp"}
AUDIO_EXT = {".mp3", ".wav", ".m4a", ".aac", ".ogg", ".flac"}
MUSIC_HINT = re.compile(r"music|bgm|\bbg\b|song|track|beat|instrumental", re.I)


def tracked(p: Path) -> bool:
    return subprocess.run(["git", "ls-files", "--error-unmatch", str(p)], cwd=ROOT,
                          capture_output=True).returncode == 0


def move(src: Path, dst: Path, dry: bool):
    print(f"  {src.relative_to(ROOT) if src.is_relative_to(ROOT) else src}  ->  {dst.relative_to(ROOT)}")
    if dry:
        return
    dst.parent.mkdir(parents=True, exist_ok=True)
    if src.is_relative_to(ROOT) and tracked(src):
        subprocess.run(["git", "mv", "-f", str(src), str(dst)], cwd=ROOT, check=True)
    elif src.is_relative_to(ROOT):
        shutil.move(src, dst)
    else:                       # outside the repo (chat attachment): copy, keep the original
        shutil.copy2(src, dst)


def duration(p: Path) -> float:
    return float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                                          "-of", "csv=p=0", str(p)]).decode())


def speech_score(p: Path, script_words: set) -> float:
    """Share of recognised words in the first 25 s that occur in the script (music scores ~0)."""
    try:
        sys.path.insert(0, str(ROOT / "pipeline"))
        from make_video import _recognise
    except Exception:
        return -1.0
    raw = subprocess.run(["ffmpeg", "-loglevel", "error", "-t", "25", "-i", str(p), "-ar", "16000",
                          "-ac", "1", "-f", "s16le", "-"], capture_output=True, check=True).stdout
    words = [w for w, _, _ in _recognise(raw)]
    if not words:
        return 0.0
    if not script_words:
        return len(words) / 25.0       # no script: words per second as a speech hint
    return sum(w in script_words for w in words) / len(words)


def pick_audio(cands, voice, music, script_text):
    cands = [c for c in cands if c not in (voice, music)]
    if music is None:
        named = [c for c in cands if MUSIC_HINT.search(c.stem)]
        if len(named) == 1:
            music = named[0]
            cands.remove(music)
    if voice is None:
        if len(cands) == 1:
            voice = cands[0]
        elif len(cands) > 1:
            words = set(re.findall(r"[a-z']+", script_text.lower()))
            scored = sorted(cands, key=lambda c: speech_score(c, words), reverse=True)
            for c in scored:
                print(f"  speech check {c.name}: {speech_score(c, words):.2f}  ({duration(c):.1f}s)")
            voice = scored[0]
            cands.remove(voice)
    cands = [c for c in cands if c != voice]
    if music is None and len(cands) == 1:
        music = cands[0]
    elif cands:
        print(f"  left in place (unclear role): {[c.name for c in cands if c != music]}")
    return voice, music


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("name")
    ap.add_argument("--voice", type=Path)
    ap.add_argument("--music", type=Path)
    ap.add_argument("--title")
    ap.add_argument("--script", type=Path, help="text file with the exact voiceover text")
    ap.add_argument("--music-from", choices=["start", "end"])
    ap.add_argument("--dry-run", action="store_true")
    a = ap.parse_args()

    proj = ROOT / "projects" / a.name
    prompts = ROOT / "prompts" / a.name
    proj.mkdir(parents=True, exist_ok=True)

    # text first: the speech check uses the script
    if a.script:
        script_text = a.script.read_text(encoding="utf-8")
    elif (proj / "script.txt").exists():
        script_text = (proj / "script.txt").read_text(encoding="utf-8")
    elif (prompts / "script.txt").exists():
        script_text = (prompts / "script.txt").read_text(encoding="utf-8")
        print(f"script.txt copied from prompts/{a.name}/")
    else:
        script_text = ""
    title = a.title or ((proj / "title.txt").read_text(encoding="utf-8").strip() if (proj / "title.txt").exists()
                        else (prompts / "title.txt").read_text(encoding="utf-8").strip()
                        if (prompts / "title.txt").exists() else "")

    root_files = sorted(p for p in ROOT.iterdir() if p.is_file())
    images = [p for p in root_files if p.suffix.lower() in IMG_EXT]
    audio = [p for p in root_files if p.suffix.lower() in AUDIO_EXT]
    voice = a.voice.resolve() if a.voice else None
    music = a.music.resolve() if a.music else None
    voice, music = pick_audio(audio, voice, music, script_text)

    print(f"project: projects/{a.name}")
    print(f"images: {len(images)} from the repo root")
    for img in images:
        move(img, proj / "images" / img.name, a.dry_run)
    if voice:
        move(voice, proj / f"voiceover{voice.suffix.lower()}", a.dry_run)
    if music:
        move(music, proj / f"music{music.suffix.lower()}", a.dry_run)
    if not a.dry_run:
        if script_text:
            (proj / "script.txt").write_text(script_text.strip() + "\n", encoding="utf-8")
        if title:
            (proj / "title.txt").write_text(title + "\n", encoding="utf-8")
        if a.music_from:
            (proj / "settings.json").write_text(f'{{"music": "{a.music_from}"}}\n')

    have = {p.name for p in proj.iterdir()} if proj.exists() else set()
    n_img = len(list((proj / "images").glob("*"))) if (proj / "images").exists() else len(images)
    print("\nstatus:")
    print(f"  images      {n_img}")
    print(f"  voiceover   {voice.name if voice else next((h for h in have if h.startswith('voiceover')), 'MISSING')}")
    print(f"  music       {music.name if music else next((h for h in have if h.startswith('music')), 'none')}")
    print(f"  title.txt   {title or 'MISSING'}")
    print(f"  script.txt  {'ok' if script_text else 'MISSING (ask the user for the transcription)'}")
    bare = [m.group(0) for m in re.finditer(r"\{[^{}]*\}|\S*\d\S*", script_text) if not m.group(0).startswith("{")]
    if bare:
        print(f"  numbers that need the {{display|spoken}} form: {bare}")


if __name__ == "__main__":
    main()
