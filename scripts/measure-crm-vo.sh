#!/usr/bin/env bash
# Measure the generated Educare CRM voiceover files and write their real
# durations to remotion/crm/durations.json, which script.ts prefers over the
# hand-written estimates.
#
# Usage:  npm run crm:measure
#
# Expects one file per scene id at public/vo/crm/<id>.mp3

set -euo pipefail
cd "$(dirname "$0")/.."

DIR="public/vo/crm"
OUT="remotion/crm/durations.json"

ids=(
  s01_hook s02_agitate s03_cost s04_reframe
  s05_inbox s06_ai s07_pipeline s08_marketing
  s09_savings s10_specialist s11_offer s12_cta
)

echo "{" > "$OUT"
first=1
missing=0
total=0

for id in "${ids[@]}"; do
  f="$DIR/$id.mp3"
  if [ ! -f "$f" ]; then
    echo "  ⚠  missing $f" >&2
    missing=$((missing + 1))
    continue
  fi
  d=$(ffprobe -v error -show_entries format=duration -of default=nk=1:nw=1 "$f")
  total=$(echo "$total + $d" | bc)
  [ $first -eq 0 ] && echo "," >> "$OUT"
  printf '  "%s": %s' "$id" "$d" >> "$OUT"
  first=0
  printf "  %-16s %6.2fs\n" "$id" "$d"
done

echo "" >> "$OUT"
echo "}" >> "$OUT"

printf "\n  total %.1fs (%.1f min)\n" "$total" "$(echo "$total / 60" | bc -l)"
[ $missing -gt 0 ] && echo "  $missing scene(s) still missing audio" >&2
echo "  wrote $OUT"
