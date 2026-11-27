#!/usr/bin/env bash
# One-time setup on Linux (cloud sessions included). Idempotent: re-run any time; it skips what is already there.
#   bash setup.sh            everything except the hero man
#   bash setup.sh --hero     also build assets/shared/models/hero_male.glb with Blender (bpy) + MPFB2 + MakeHuman CC0 assets
# Needs: node 22+, python3, ffmpeg, Chromium/Playwright (pre-installed in Claude cloud sessions), git, curl.
# All downloads come from GitHub / npm / PyPI (other hosts are often blocked in cloud sandboxes).
set -euo pipefail
Z="$(cd "$(dirname "$0")" && pwd)"; cd "$Z"
MEDIA=https://media.githubusercontent.com/media
say() { printf '\n== %s\n' "$*"; }

say "Python packages"
pip install -q kokoro-onnx faster-whisper soundfile scipy numpy 2>&1 | grep -v "root user" || true

say "three.js r170 (engine/vendor)"
if [ ! -f engine/vendor/three.module.js ]; then
  T=$(mktemp -d); (cd "$T" && npm pack -q three@0.170.0 >/dev/null && tar xzf three-0.170.0.tgz)
  cp "$T/package/build/three.module.js" engine/vendor/; rm -rf engine/vendor/addons; cp -r "$T/package/examples/jsm" engine/vendor/addons; rm -rf "$T"
fi

say "Inter fonts"
if [ ! -f engine/fonts/Inter-Black.otf ]; then
  T=$(mktemp -d); curl -sfL -o "$T/i.zip" https://github.com/rsms/inter/releases/download/v4.0/Inter-4.0.zip
  unzip -q -o "$T/i.zip" -d "$T/i"; mkdir -p engine/fonts; cp "$T"/i/extras/otf/Inter-{Black,ExtraBold}.otf engine/fonts/; rm -rf "$T"
fi

say "Head scan (Lee Perry-Smith, CC BY 3.0) + studio HDRI (Poly Haven, CC0)"
mkdir -p assets/shared/models assets/shared/hdri
B=https://raw.githubusercontent.com/mrdoob/three.js/r170/examples/models/gltf/LeePerrySmith
[ -f assets/shared/models/lps_LeePerrySmith.glb ] || curl -sfL -o assets/shared/models/lps_LeePerrySmith.glb $B/LeePerrySmith.glb
for f in Map-COL.jpg Map-SPEC.jpg Infinite-Level_02_Tangent_SmoothUV.jpg; do
  [ -f assets/shared/models/lps_$f ] || curl -sfL -o assets/shared/models/lps_$f $B/$f; done
[ -s assets/shared/hdri/studio_small_09_2k.hdr ] || curl -sfL -o assets/shared/hdri/studio_small_09_2k.hdr \
  $MEDIA/taesiri/meter-ocr/main/assets/hdri/studio_small_09_2k.hdr

say "Kokoro voice (~350 MB, once)"
python3 scripts/voice.py --download

say "Whisper small.en (word timings; GitHub LFS mirror of Systran/faster-whisper-small.en)"
W=~/.cache/fw-small-en; mkdir -p $W
for f in model.bin config.json tokenizer.json vocabulary.txt; do [ -s $W/$f ] || curl -sfL -m 600 -o $W/$f \
  $MEDIA/Brad2586/cae-merlin-usf-fall-2026/main/faster-whisper-small.en/$f; done

say "BodyParts3D 4.3 library (3,210 meshes, ~600 MB, CC BY-SA 2.1 JP)"
L=assets/bodyparts3d; mkdir -p $L/obj
if [ "$(ls $L/obj | wc -l)" -lt 3210 ]; then
  [ -f $L/MANIFEST.csv ] || curl -sfL -o $L/MANIFEST.csv https://raw.githubusercontent.com/olivercase/body_parts_3d_api/main/MANIFEST.csv
  [ -f $L/FMA2Obj.txt ] || curl -sfL -o $L/FMA2Obj.txt $MEDIA/olivercase/body_parts_3d_api/main/metadata/FMA2Obj.txt
  python3 - "$L" <<'EOF' | xargs -P 24 -I{} sh -c 'f="$1"; [ -s "obj/$f" ] && ! head -c 8 "obj/$f" | grep -q version && exit 0; u=$(python3 -c "import urllib.parse,sys;print(urllib.parse.quote(sys.argv[1]))" "$f"); curl -sfL --retry 5 -m 200 -o "obj/$f" "https://media.githubusercontent.com/media/olivercase/body_parts_3d_api/main/meshes/$u" || echo "FAILED $f"' _ {}
import csv, sys, os
os.chdir(sys.argv[1])
for r in csv.DictReader(open('MANIFEST.csv')):
    print(f"{r['fj_id']}_{r['bp_id']}_FMA{r['fma_id'].replace('FMA','')}_{r['name']}.obj")
EOF
fi
echo "$(ls $L/obj | wc -l) meshes"

say "Anatomy parts (assets/shared/anatomy)"
[ -f assets/shared/anatomy/brain.obj ] || (cd $L && python3 "$Z/tools/bp3d_build.py" lib="$Z/$L" out="$Z/assets/shared/anatomy")

if [ "${1:-}" = "--hero" ]; then
  say "Hero man (Blender bpy + MPFB2 + MakeHuman CC0 system assets)"
  pip install -q bpy 2>&1 | grep -v "root user" || true
  X="$Z/.build"; mkdir -p "$X"
  [ -d "$X/mpfb2" ] || git clone -q --depth 1 https://github.com/makehumancommunity/mpfb2.git "$X/mpfb2"
  if [ ! -d "$X/mhc" ]; then
    git clone -q --depth 1 --filter=blob:none --sparse https://github.com/vidya-hub/makehuman-core.git "$X/mhc"
    (cd "$X/mhc" && git sparse-checkout set --no-cone '/data/clothes/male_casualsuit01/' '/data/clothes/shoes01/' '/data/hair/short02/' \
      '/data/skins/young_caucasian_male/' '/data/eyebrows/eyebrow001/' '/data/eyelashes/eyelashes01/' '/data/teeth/teeth_base/' '/data/tongue/' '/data/eyes/')
  fi
  python3 blender/make_hero.py "$X/mpfb2/src" "$X/mhc/data"
fi

say "Linking projects"
for p in demo/* projects/*; do [ -d "$p/src" ] || continue
  ln -sfn ../../engine/vendor "$p/vendor"; ln -sfn ../../engine/fonts "$p/fonts"; ln -sfn ../../assets/shared "$p/assets"; done
say "Done. Try: scripts/build.sh demo/brain-freeze-v2 check"
