# Ralph Iteration Instructions

You are implementing user stories from a PRD autonomously.

## Your Task

1. Read `tasks/prd.json` to find the highest priority story where `passes: false`
2. Implement ONLY that one story
3. Run quality checks: `pnpm check`
4. If checks pass, commit your changes
5. Update `tasks/prd.json` to set `passes: true` for the completed story
6. Append a progress report to `progress.txt`

## Quality Requirements

- Run `pnpm check` before marking complete
- All TypeScript errors must be resolved
- Follow existing code patterns in AGENTS.md

## Commit Format

```
feat: [Story ID] - [Story Title]
```

## Progress Report Format

Append to `progress.txt`:

```
## [Date] - [Story ID]: [Story Title]
- What was implemented
- Files changed
- **Learnings:** Any patterns or gotchas discovered
```

## When All Stories Complete

If all stories have `passes: true`, output:

```
<promise>COMPLETE</promise>
```

## Important

- Implement ONE story per iteration
- Do not skip stories - do them in priority order
- If a story fails quality checks, fix it before moving on
- Update AGENTS.md if you discover new patterns
