#!/bin/bash

# Ralph - Autonomous PRD Implementation Loop
# Spawns fresh Amp instances to implement user stories from prd.json

set -e

MAX_ITERATIONS=${1:-10}
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

cd "$PROJECT_ROOT"

echo "🚀 Ralph starting - max $MAX_ITERATIONS iterations"
echo "📁 Project: $PROJECT_ROOT"

for i in $(seq 1 $MAX_ITERATIONS); do
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "🔄 Iteration $i of $MAX_ITERATIONS"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    
    # Check if all stories are complete
    INCOMPLETE=$(jq '[.userStories[] | select(.passes == false)] | length' tasks/prd.json)
    
    if [ "$INCOMPLETE" -eq 0 ]; then
        echo ""
        echo "✅ All user stories complete!"
        echo "<promise>COMPLETE</promise>"
        exit 0
    fi
    
    echo "📋 $INCOMPLETE stories remaining"
    
    # Run Amp with the prompt (pipe prompt.md content via stdin)
    cat scripts/ralph/prompt.md | amp --execute
    
    echo "⏳ Iteration $i complete, checking status..."
    sleep 2
done

echo ""
echo "⚠️  Max iterations reached. Check progress.txt for status."
