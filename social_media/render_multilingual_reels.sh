#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
OUT_DIR="$ROOT_DIR/social_media/output/multilingual"
NODE="/Users/rachelfiler/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node"

"$NODE" "$ROOT_DIR/social_media/build_multilingual_instagram_assets.mjs"

for LANGUAGE_CODE in en pl de cs; do
  ffmpeg -y -loglevel error \
    -loop 1 -t 3.4 -i "$OUT_DIR/$LANGUAGE_CODE-reel-frame-1.png" \
    -loop 1 -t 3.4 -i "$OUT_DIR/$LANGUAGE_CODE-reel-frame-2.png" \
    -loop 1 -t 3.4 -i "$OUT_DIR/$LANGUAGE_CODE-reel-frame-3.png" \
    -loop 1 -t 3.4 -i "$OUT_DIR/$LANGUAGE_CODE-reel-frame-4.png" \
    -filter_complex "[0:v]fps=30,format=yuv420p[v0];[1:v]fps=30,format=yuv420p[v1];[2:v]fps=30,format=yuv420p[v2];[3:v]fps=30,format=yuv420p[v3];[v0][v1]xfade=transition=fade:duration=0.4:offset=2.6[x1];[x1][v2]xfade=transition=fade:duration=0.4:offset=5.2[x2];[x2][v3]xfade=transition=fade:duration=0.4:offset=7.8[out]" \
    -map "[out]" -t 10.8 -r 30 -c:v libx264 -preset medium -crf 19 -pix_fmt yuv420p -movflags +faststart -an \
    "$OUT_DIR/$LANGUAGE_CODE-wroc-love-maps-reel.mp4"
done

printf '%s\n' "$OUT_DIR"
