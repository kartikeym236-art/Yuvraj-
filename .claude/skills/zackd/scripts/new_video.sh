#!/usr/bin/env bash
# New project: scripts/new_video.sh <name> [--from demo/coffee]  ->  projects/<name>/ (engine copy + links to vendor, fonts, assets)
set -euo pipefail
Z="$(cd "$(dirname "$0")/.." && pwd)"; NAME="${1:?usage: new_video.sh <name> [--from <project>]}"; FROM=""
[ "${2:-}" = "--from" ] && FROM="$Z/${3:?}"
P="$Z/projects/$NAME"; [ -e "$P/script.json" ] && { echo "projects/$NAME already exists"; exit 1; }
mkdir -p "$P"/{data,review,renders}
cp "$Z/engine/index.html" "$P/"; cp -r "$Z/engine/src" "$P/src"
ln -sfn ../../engine/vendor "$P/vendor"; ln -sfn ../../engine/fonts "$P/fonts"; ln -sfn ../../assets/shared "$P/assets"
if [ -n "$FROM" ]; then cp "$FROM/script.json" "$P/"; [ -f "$FROM/src/shots.js" ] && cp "$FROM/src/shots.js" "$P/src/shots.js"; else cp "$Z/engine/script.json" "$P/"; fi
echo "projects/$NAME ready. Write script.json (it is a COPY of the template - overwrite all of it), then: scripts/voice.sh projects/$NAME"
