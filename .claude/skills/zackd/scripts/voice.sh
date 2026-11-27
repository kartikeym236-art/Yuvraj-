#!/usr/bin/env bash
# Narration + exact line/word times: scripts/voice.sh <project> [--voice am_michael] [--speed 1.05]
#   --estimate : no voice, timing from the text only (captions-only video / preview)
#   --audio my.m4a : your own recording (Whisper needed)
set -euo pipefail
Z="$(cd "$(dirname "$0")/.." && pwd)"; P="${1:?usage: voice.sh <project>}"; shift
if [ "${1:-}" = "--estimate" ]; then shift; python3 "$Z/scripts/estimate.py" "$P" "$@"; exit; fi
if [ "${1:-}" = "--audio" ]; then python3 "$Z/scripts/words.py" "$P" --audio "$2"; exit; fi
python3 "$Z/scripts/voice.py" "$P" "$@"
python3 "$Z/scripts/words.py" "$P"
python3 -c "import json;d=json.load(open('$P/data/lines.json'));print('DURATION', d['duration'], 's')"
