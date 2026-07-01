---
name: add-new-ui-component
description: Workflow command scaffold for add-new-ui-component in react-ui-library.
allowed_tools: ["Bash", "Read", "Write", "Grep", "Glob"]
---

# /add-new-ui-component

Use this workflow when working on **add-new-ui-component** in `react-ui-library`.

## Goal

Implements a new UI component in the codebase, typically matching Ant Design API patterns, and exposes it via index files.

## Common Files

- `packages/ui/src/components/*/*.tsx`
- `packages/ui/src/components/*/index.ts`
- `docs/components/*.md`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Create new component file in packages/ui/src/components/<category>/<ComponentName>.tsx
- Export the component in the corresponding index.ts file
- Optionally update related documentation in docs/components/

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.