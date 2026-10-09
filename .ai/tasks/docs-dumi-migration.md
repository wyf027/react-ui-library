# Dumi documentation migration

- Request: migrate to the selected dumi 2 + dumi-theme-antd approach for daily developer use.
- Approval: user selected the proposed second approach and explicitly requested migration on 2026-10-09. Continue implementation within this scope without repeating design authorization.
- Branch: feat/docs-dumi-antd-20261009; base: 278d51c2ec7b0e969ca18819138efc59e5e72c3f.
- Checkout: current isolated worktree; original dirty checkout is untouched.
- Writer: primary agent only. Inventory/theme research and independent review are read-only.
- Scope: all 81 public pages, 86 examples, Nova UI branding, React-native docs, editable playground, six component groups, old .html links, GitHub Pages artifact path.
- Constraints: custom HTML uses Tailwind; no test changes or local build commands. Keep component implementations unchanged.
- Skills: brainstorming and writing-plans scope incorporated into project documentation. pickup/handoff skills were searched but unavailable; Git checkpoints and this task card provide recovery state.
- Publication: prior explicit instruction to publish ongoing UI changes remains applicable; use PR CI and Pages workflow after source review.
- Verification: source completeness, docs/UI type checks, lint, development-server route probes and representative screenshots; CI for production output.
- State: dependencies and source migration in progress.
- Next action: install compatible documentation dependencies and convert native React demos.
