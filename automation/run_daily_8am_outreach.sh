#!/bin/zsh
set -euo pipefail

PROJECT_DIR="/Users/meganreeves/Documents/Projects/Lift Studio"
CODEX_BIN="/Users/meganreeves/.vscode/extensions/openai.chatgpt-26.609.30741-darwin-arm64/bin/macos-aarch64/codex"
PROMPT_FILE="$PROJECT_DIR/automation/daily_8am_outreach_prompt.md"
RUN_DIR="$PROJECT_DIR/automation/daily-runs"
LOG_DIR="$PROJECT_DIR/automation/logs"
DATE_STAMP="$(date +%F)"
TIME_STAMP="$(date +%Y%m%d-%H%M%S)"
CURRENT_HOUR="$(date +%H)"

if (( 10#$CURRENT_HOUR < 9 )); then
  RUN_SLOT="morning"
  READINESS_TIME="8 a.m."
else
  RUN_SLOT="midday"
  READINESS_TIME="1 p.m."
fi

LOG_FILE="$LOG_DIR/daily-outreach-$DATE_STAMP-$RUN_SLOT-$TIME_STAMP.log"
REPORT_FILE="$RUN_DIR/$DATE_STAMP-$RUN_SLOT.md"
RUN_PROMPT_FILE="$LOG_DIR/prompt-$DATE_STAMP-$RUN_SLOT-$TIME_STAMP.md"

mkdir -p "$RUN_DIR" "$LOG_DIR"

{
  echo "Lift Studio daily outreach run"
  echo "Run slot: $RUN_SLOT"
  echo "Readiness target: $READINESS_TIME"
  echo "Started: $(date)"
  echo "Project: $PROJECT_DIR"
  echo "Prompt: $PROMPT_FILE"
  echo
} >> "$LOG_FILE"

if [[ ! -x "$CODEX_BIN" ]]; then
  {
    echo "ERROR: Codex binary not found or not executable: $CODEX_BIN"
    echo "Ended: $(date)"
  } >> "$LOG_FILE"
  cat > "$REPORT_FILE" <<EOF
# Lift Studio Daily Outreach Run - $DATE_STAMP ($RUN_SLOT)

Status: Blocked
Readiness target: $READINESS_TIME

Codex binary was not found or not executable:

\`$CODEX_BIN\`

EOF
  exit 1
fi

if [[ ! -f "$PROMPT_FILE" ]]; then
  {
    echo "ERROR: Prompt file not found: $PROMPT_FILE"
    echo "Ended: $(date)"
  } >> "$LOG_FILE"
  exit 1
fi

cd "$PROJECT_DIR"

cat > "$RUN_PROMPT_FILE" <<EOF
# Scheduled Run Metadata

- Run slot: $RUN_SLOT
- Readiness target: $READINESS_TIME
- Report file: $REPORT_FILE
- Log file: $LOG_FILE

Use this metadata to label the run, write the correct report file, and avoid duplicating brands/drafts from any other same-day batch.

---

EOF

cat "$PROMPT_FILE" >> "$RUN_PROMPT_FILE"

if "$CODEX_BIN" \
  --search \
  --ask-for-approval never \
  --sandbox danger-full-access \
  -C "$PROJECT_DIR" \
  exec - < "$RUN_PROMPT_FILE" >> "$LOG_FILE" 2>&1; then
  RUN_STATUS="completed"
  NOTIFICATION_TITLE="Lift Studio $RUN_SLOT batch ready"
  NOTIFICATION_BODY="10 additional drafts should be ready for review. Check Gmail drafts and the $RUN_SLOT report."
else
  RUN_STATUS="failed"
  NOTIFICATION_TITLE="Lift Studio $RUN_SLOT batch needs attention"
  NOTIFICATION_BODY="The scheduled $RUN_SLOT run failed. Check automation/logs."
fi

{
  echo
  echo "Status: $RUN_STATUS"
  echo "Ended: $(date)"
} >> "$LOG_FILE"

/usr/bin/osascript -e "display notification \"$NOTIFICATION_BODY\" with title \"$NOTIFICATION_TITLE\"" >/dev/null 2>&1 || true

if [[ "$RUN_STATUS" != "completed" ]]; then
  exit 1
fi
