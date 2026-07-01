---
name: add-or-update-component-documentation
description: Workflow command scaffold for add-or-update-component-documentation in react-ui-library.
allowed_tools: ["Bash", "Read", "Write", "Grep", "Glob"]
---

# /add-or-update-component-documentation

Use this workflow when working on **add-or-update-component-documentation** in `react-ui-library`.

## Goal

Adds or updates documentation pages for UI components, typically in VitePress markdown format, often including API tables and playground examples.

## Common Files

- `docs/components/*.md`
- `docs/.vitepress/config.ts`
- `docs/components/overview.md`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Create or update one or more markdown files in docs/components/
- Optionally update docs/.vitepress/config.ts to register new docs or categories
- Optionally update docs/components/overview.md or related index files

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.