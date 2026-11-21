"""Free local voiceover with Kokoro TTS (kokoro-onnx), no API key needed.

    python pipeline/kokoro_tts.py projects/<name> [--voice am_michael] [--speed 1.0] [--text file]

Reads projects/<name>/script_tts.txt (or script.txt with {display|spoken} resolved to the spoken form)
and writes projects/<name>/voiceover.mp3. Model files live in ~/kokoro (or KOKORO_DIR); if missing they
are downloaded from the kokoro-onnx GitHub release (Hugging Face is blocked here).
"""
import argparse, os, re, subprocess, sys, tempfile, urllib.request
from pathlib import Path

D = Path(os.environ.get("KOKORO_DIR", Path.home() / "kokoro"))
REL = "https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/"


def ensure_model():
    D.mkdir(parents=True, exist_ok=True)
    for f in ("kokoro-v1.0.onnx", "voices-v1.0.bin"):
        if not (D / f).exists():
            print("downloading", f, file=sys.stderr)
            urllib.request.urlretrieve(REL + f, D / f)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("project", type=Path)
    ap.add_argument("--voice", default="am_michael", help="e.g. am_michael, am_adam, am_onyx, bm_george, af_heart")
    ap.add_argument("--speed", type=float, default=1.0)
    ap.add_argument("--text", type=Path)
    a = ap.parse_args()
    src = a.text or (a.project / "script_tts.txt" if (a.project / "script_tts.txt").exists() else a.project / "script.txt")
    text = re.sub(r"\{[^|{}]+\|([^{}]+)\}", r"\1", src.read_text(encoding="utf-8"))
    ensure_model()
    from kokoro_onnx import Kokoro
    import numpy as np, soundfile as sf
    k = Kokoro(str(D / "kokoro-v1.0.onnx"), str(D / "voices-v1.0.bin"))
    lang = "en-gb" if a.voice.startswith("b") else "en-us"
    parts = [p.strip() for p in text.split("\n") if p.strip()]
    audio, sr = [], 24000
    for p in parts:   # one paragraph at a time keeps memory low and adds a natural pause between them
        s, sr = k.create(p, voice=a.voice, speed=a.speed, lang=lang)
        audio += [s, np.zeros(int(0.35 * sr), dtype=s.dtype)]
    wav = Path(tempfile.mkstemp(suffix=".wav")[1])
    sf.write(wav, np.concatenate(audio), sr)
    out = a.project / "voiceover.mp3"
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", str(wav), "-c:a", "libmp3lame", "-b:a", "192k", str(out)], check=True)
    wav.unlink()
    print("wrote", out)


if __name__ == "__main__":
    main()
