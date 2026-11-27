#!/usr/bin/env bash
# scripts/build.sh <project> <step> [args]
#   check                      shots + caption cards + problems (CHECK OK)
#   sheet [--every 1.5]        review/sheet.jpg  (LOOK AT IT before the video)
#   frames --times 1,2.5       review/f_<t>.jpg
#   cues                       data/cues.json
#   mix                        data/mix.wav (needs cues)
#   video [--res 1.5] [--jobs 2]   renders/<name>.mp4 + _share.mp4 + cover.jpg  (long: run in the background)
# Extra query string for the page: QS='&cam=x,y,z,lx,ly,lz' scripts/build.sh ...
set -euo pipefail
Z="$(cd "$(dirname "$0")/.." && pwd)"; P="${1:?usage: build.sh <project> <step>}"; STEP="${2:?step}"; shift 2
for f in "$P"/src/*.js "$P"/src/core/*.js; do cp "$f" /tmp/_zk_check.mjs; node --check /tmp/_zk_check.mjs || { echo "syntax error in $f"; exit 1; }; done
case "$STEP" in
  mix) python3 "$Z/tools/mix.py" "$P" ;;
  check|sheet|frames|cues|video|eval) node "$Z/tools/capture.mjs" "$STEP" "$P" "$@" ;;
  *) echo "unknown step $STEP"; exit 1 ;;
esac
