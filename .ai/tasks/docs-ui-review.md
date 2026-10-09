# Component documentation fixes

- Request: fix defects found in the 2026-10-09 screenshot review for daily developer use.
- Branch: fix/docs-ui-review-20261009; base: c849daead5fe0a8fe89aa1a070331561ea460556.
- One writer: primary agent. Independent diagnosis/review is read-only.
- Preserve the original checkout and its unrelated uncommitted migration work.
- Scope: runnable examples, preview sizing, malformed API table, counts/links and confirmed preview defects.
- User constraints: no test file changes or local builds by default. User explicitly authorized online publication on 2026-10-09 and asked to continue; existing GitHub Actions build/deploy workflow is the publication path.
- Verification: focused lint/type checks and source review; report missing browser/build coverage.
- State: publication authorized; preparing commit and GitHub PR. Independent read-only review found no blocking issue.
- Fixed: preserve complete react-live functions; full-width preview with VitePress raw-style isolation; include theme files in Tailwind scan; Icon table/SVG samples; Row/Col horizontal gap compensation; real QR encoding with UTF-8 bytes and four-module quiet zone; opt-in Tour; compact Layout samples; component counts and repository/domain links.
- Verification passed: npm run typecheck:ui; npm run lint:ui; git diff --check; Sucrase syntax parsing of 86 live snippets in 76 documents; VitePress Icon table_open token; docs bridge noEmit type check with workspace source and installed React type paths.
- No test files changed. No tests, builds, browser re-verification, physical QR scans, commit, push or deployment performed.
- Repeatable basic verification: npm ci --ignore-scripts --no-audit --no-fund; npm run typecheck:ui; npm run lint:ui; git diff --check.
- Next action: commit the reviewed changes, push the branch and open a PR; merge after CI permits, then verify the Pages deployment and live content.
- Checkpoint: outputs/nova-ui-fixes.patch and outputs/fix-summary.txt in the current chat workspace. Reverse patch check passed.
