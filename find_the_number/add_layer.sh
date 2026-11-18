#!/usr/bin/env bash
# Overlay a black-background layer video (e.g. hand cut-outs) on puzzle videos.
# Usage: ./add_layer.sh LAYER.mp4 OUT_DIR puzzle1.mp4 [puzzle2.mp4 ...]
set -euo pipefail
layer=$1 out=$2; shift 2; mkdir -p "$out"
tmp=$(mktemp -d); trap 'rm -rf "$tmp"' EXIT
ffmpeg -v error -y -t 15 -i "$layer" -an -vf "scale=1080:1920:flags=lanczos,fps=30" \
  -c:v libx264 -crf 10 -preset fast -pix_fmt yuv444p "$tmp/layer.mp4"
for f in "$@"; do
  b=$(basename "${f%.mp4}")
  ffmpeg -v error -y -i "$f" -i "$tmp/layer.mp4" -filter_complex \
    "[1:v]colorkey=0x000000:0.06:0.04[h];[0:v][h]overlay=0:0:shortest=1,format=yuv420p[v]" \
    -map "[v]" -map 0:a -t 15 -c:v libx264 -crf 20 -c:a copy -movflags +faststart "$out/${b}_hand.mp4"
  echo "done: $out/${b}_hand.mp4"
done
