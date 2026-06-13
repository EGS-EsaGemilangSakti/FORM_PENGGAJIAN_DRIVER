#!/usr/bin/env bash
set -u

COMMIT_MESSAGE="${1:-}"
TOTAL_STEPS=5
BAR_WIDTH=24
CURRENT_STEP=0
LOG_FILE=".ship.log"

STEP_LABELS=(
  "npm run lint"
  "npm run build"
  "git add ."
  "git commit"
  "git push"
)

STEP_PROGRESS=(0 0 0 0 0)
STEP_STATUS=("menunggu" "menunggu" "menunggu" "menunggu" "menunggu")

if [ -z "$COMMIT_MESSAGE" ]; then
  echo "Pakai format:"
  echo "  bash ship.sh \"Nama commit\""
  exit 1
fi

draw_bar() {
  local percent="$1"
  local filled=$((percent * BAR_WIDTH / 100))
  local empty=$((BAR_WIDTH - filled))
  local bar=""

  for ((i = 0; i < filled; i++)); do bar="${bar}/"; done
  for ((i = 0; i < empty; i++)); do bar="${bar} "; done

  printf "[%s] %3d%%" "$bar" "$percent"
}

render_step_line() {
  local index="$1"
  local label="$2"
  local progress="$3"
  local status="$4"

  printf "\r%-100s" " "
  printf "\rperintah %d %-14s " "$((index + 1))" "$label"
  draw_bar "$progress"
  printf " %s" "$status"
}

fail_with_log() {
  local label="$1"
  echo
  echo "Gagal saat menjalankan: $label"
  echo
  echo "Log terakhir:"
  tail -n 80 "$LOG_FILE" 2>/dev/null || true
  exit 1
}

run_step() {
  local index="$1"
  local label="$2"
  shift 2

  CURRENT_STEP="$index"
  STEP_STATUS[$index]="berjalan"
  STEP_PROGRESS[$index]=5
  render_step_line "$index" "$label" 5 "berjalan"

  "$@" > "$LOG_FILE" 2>&1 &
  local pid=$!
  local progress=5

  while kill -0 "$pid" 2>/dev/null; do
    if [ "$progress" -lt 95 ]; then
      progress=$((progress + 5))
      STEP_PROGRESS[$index]=$progress
    fi
    render_step_line "$index" "$label" "$progress" "berjalan"
    sleep 0.35
  done

  wait "$pid"
  local exit_code=$?
  if [ "$exit_code" -ne 0 ]; then
    STEP_STATUS[$index]="gagal"
    fail_with_log "$label"
  fi

  STEP_PROGRESS[$index]=100
  STEP_STATUS[$index]="selesai"
  render_step_line "$index" "$label" 100 "selesai"
  echo
}

run_commit_step() {
  local index=3
  local label="git commit"

  STEP_STATUS[$index]="berjalan"
  STEP_PROGRESS[$index]=20
  render_step_line "$index" "$label" 20 "berjalan"

  if git diff --cached --quiet; then
    STEP_PROGRESS[$index]=100
    STEP_STATUS[$index]="tidak ada perubahan"
    render_step_line "$index" "$label" 100 "tidak ada perubahan"
    echo
    echo "Tidak ada perubahan yang perlu di-commit. Push dilewati."
    rm -f "$LOG_FILE"
    exit 0
  fi

  git commit -m "$COMMIT_MESSAGE" > "$LOG_FILE" 2>&1 &
  local pid=$!
  local progress=20

  while kill -0 "$pid" 2>/dev/null; do
    if [ "$progress" -lt 95 ]; then
      progress=$((progress + 10))
      STEP_PROGRESS[$index]=$progress
    fi
    render_step_line "$index" "$label" "$progress" "berjalan"
    sleep 0.25
  done

  wait "$pid"
  local exit_code=$?
  if [ "$exit_code" -ne 0 ]; then
    STEP_STATUS[$index]="gagal"
    fail_with_log "$label"
  fi

  STEP_PROGRESS[$index]=100
  STEP_STATUS[$index]="selesai"
  render_step_line "$index" "$label" 100 "selesai"
  echo
}

echo "Deploy helper"
echo "Commit: $COMMIT_MESSAGE"
echo
for ((i = 0; i < TOTAL_STEPS; i++)); do
  printf "perintah %d %-14s " "$((i + 1))" "${STEP_LABELS[$i]}"
  draw_bar 0
  echo " menunggu"
done
echo

run_step 0 "npm run lint" npm run lint
run_step 1 "npm run build" npm run build
run_step 2 "git add ." git add .
run_commit_step
run_step 4 "git push" git push

rm -f "$LOG_FILE"
echo "Selesai. GitHub Actions akan deploy otomatis setelah push."
