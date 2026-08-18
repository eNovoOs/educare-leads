#!/usr/bin/env bash
# Generate the VSL scratch voiceover with macOS `say`, one MP3 per scene,
# then write measured durations to remotion/narration-durations.json.
#
# To swap in a professional voiceover later:
#   1) Drop your per-scene files into public/vo/ using the SAME ids (sceneNN.mp3).
#   2) Run:  npm run vo:measure   (re-measures durations; no TTS regen)
# Or re-run this whole script to regenerate the scratch track.
#
# Usage:
#   bash scripts/generate-vo.sh            # generate TTS + measure
#   bash scripts/generate-vo.sh measure    # measure existing files only

set -euo pipefail
cd "$(dirname "$0")/.."

VOICE="Samantha"      # cleanest standard macOS voice; swap if a premium voice is installed
RATE=178              # words per minute
OUTDIR="public/vo"
DUR_JSON="remotion/narration-durations.json"
mkdir -p "$OUTDIR"

# Scene ids MUST match remotion/narration.ts (order doesn't matter here).
ids=(
  s01_hook
  s02_agitate
  s03_reframe
  s04_intro
  s05_step1
  s06_step2
  s07_step3
  s08_proof_numbers
  s09_testimonials
  s10_offer
  s11_cta
)

texts=(
  "If you run a daycare, school, or camp and you've got open spots right now, those empty spots are costing you between one and two thousand dollars a month. Each. And the worst part? It's quiet. There's no bill. No alarm. Just revenue you never see."
  "And you already know the old playbook doesn't fix it. You rely on referrals and a little Google luck. You boost a post, you get a handful of tire kickers, and the few good leads that do come in slip through the cracks, because nobody followed up fast enough. Meanwhile, you're the one running the program, and trying to run the marketing."
  "Here's the truth. You don't have a marketing problem. You have a system problem. Enrolling families isn't luck. It's a system. Most programs just never built one."
  "So we built it for you. It's called the Educare Enrollment System, and it runs in three steps."
  "Step one. We build your system. Hyper local Meta and Google campaigns, written, designed, and targeted to families within driving distance of your front door. You don't write a single ad."
  "Step two. A I converts every lead. The second a family raises their hand, our A I texts them, qualifies them, and books them. Onto a call, a tour, a visit, a registration. No chasing. No missed messages. No new hire."
  "Step three. You enroll, and we scale. Families show up ready to enroll. We track every lead in your C R M, double down on what's working, and pour more fuel in as your waitlist grows."
  "This isn't theory. We've done it for thirty seven plus programs across the country. Daycares, private schools, and camps. Booked families for an average of fourteen dollars and ten cents. An average of four point two times return on every dollar of ad spend. And a full calendar in ninety days."
  "Maria, a two center daycare owner in Texas, went from praying for a phone call to turning families away. Forty two enrollments in fifty days. James, an admissions director at a private school in Florida, packed his open house calendar for the first time in years. And Aisha sold out her summer camp three weeks early, and started a waitlist."
  "Here's the offer. We build the campaigns. We install the A I follow up. We set up the C R M, and we hand you a ninety day enrollment playbook. And we back the whole thing with the strongest guarantee in this industry. We'll get your first qualified families booked within seven days. Or we work for free until they show up."
  "One catch. We only work with one program per area. We will not run ads for your competitor down the street. And we take a limited number of new programs each month. If your program does at least twenty five thousand a month, and you've got spots to fill, book your free strategy call right now. Just fill out the short application on this page, and pick a time. No cost. No obligation."
)

measure_only="${1:-}"

echo "{" > "$DUR_JSON"
count=${#ids[@]}
for i in "${!ids[@]}"; do
  id="${ids[$i]}"
  mp3="$OUTDIR/$id.mp3"

  if [ "$measure_only" != "measure" ]; then
    aiff="$OUTDIR/$id.aiff"
    echo "🎙  $id"
    say -v "$VOICE" -r "$RATE" -o "$aiff" "${texts[$i]}"
    ffmpeg -y -loglevel error -i "$aiff" -ar 44100 -ac 2 -b:a 192k "$mp3"
    rm -f "$aiff"
  fi

  # measure duration in seconds
  dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$mp3")
  comma=","
  if [ "$i" -eq $((count - 1)) ]; then comma=""; fi
  printf '  "%s": %s%s\n' "$id" "$dur" "$comma" >> "$DUR_JSON"
done
echo "}" >> "$DUR_JSON"

echo ""
echo "✅ Wrote $DUR_JSON"
cat "$DUR_JSON"
