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
- State: source migration and representative browser verification complete; Git checkpoint f5bc83f. Dev listener is being stopped before publication tooling.
- Verification passed: docs noEmit, UI noEmit, UI lint, git diff --check; 81 docs, 86 valid native demo references, 81 canonical routes + 81 legacy .html redirect routes, no dependency README routes. Dev webpack compilation passed.
- Browser evidence: native source editor updates the Button preview; overview full prose and category cards visible; search Button navigates to its page; VirtualList scroll advances items; playground renders; dark Modal opens and Escape closes; old overview.html preserves query/hash and highlights the canonical sidebar. Fixed HTML self-closing builtin swallowing following Markdown and docs-only portal reset.
- Independent read-only review: no release blocker found at ffc213a; browser findings fixed in f5bc83f.
- Next action: push the migration branch and create a reviewable PR; inspect CI before merging and Pages publication.
- Checkpoint: Git commit after source conversion; development listener belongs to this worktree and remains running solely for visual verification.
