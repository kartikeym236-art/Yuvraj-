"""16:9 long-video pipeline: full-screen 1920x1080 scenes, no title, no captions.

    python pipeline/make_long.py projects/<name> [--align-only]

Uses the long-form alignment (parallel, sentence by sentence for audio over
4 min, hyphen splitting, neighbour retries). Never changes the 9:16 reels.
"""
import sys
from make_video import main

sys.argv.append("--mode=long")
main()
