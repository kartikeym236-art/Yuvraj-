#!/usr/bin/env bash
# Make 15 s 9:16 videos from picture puzzles: picture centred on black,
# hand layer (black keyed out) on top, voiceover underneath.
# Usage: ./picture_videos.sh LAYER.mp4 VOICEOVER.mp3 OUT_DIR name1=pic1.png [name2=pic2.png ...]
set -euo pipefail
layer=$1 audio=$2 out=$3; shift 3; mkdir -p "$out"
for pair in "$@"; do
  name=${pair%%=*} pic=${pair#*=}
  ffmpeg -v error -y -loop 1 -framerate 30 -i "$pic" -t 15 -i "$layer" -i "$audio" -filter_complex \
    "color=black:s=1080x1920:r=30:d=15[bg];\
     [0:v]scale=1080:1920:force_original_aspect_ratio=decrease:flags=lanczos[p];\
     [bg][p]overlay=(W-w)/2:(H-h)/2:shortest=1[base];\
     [1:v]scale=1080:1920:flags=lanczos,fps=30,colorkey=0x000000:0.06:0.04[h];\
     [base][h]overlay=0:0,format=yuv420p[v];\
     [2:a]afade=t=out:st=14.7:d=0.3[a]" \
    -map "[v]" -map "[a]" -t 15 -c:v libx264 -crf 20 -r 30 -c:a aac -b:a 192k \
    -movflags +faststart "$out/$name.mp4"
  echo "done: $out/$name.mp4"
done
