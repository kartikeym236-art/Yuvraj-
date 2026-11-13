"""9:16 reel pipeline: 1:1 image on a black 1080x1920 frame, title above, captions.

    python pipeline/make_short.py projects/<name> [--align-only]

Always the short-video settings and alignment, whatever settings.json says
about layout; the 16:9 long-form changes never apply here.
"""
import sys
from make_video import main

sys.argv.append("--mode=short")
main()
