# Nova UI Constitution

Governing principles for **@wuyangfan/nova-ui** and this monorepo. Spec Kit artifacts (`specs/`, plans, tasks) and OpenSpec change packages MUST align with this document unless an approved amendment explicitly overrides it.

## Core Principles

### I. Publishable library first

Every change targets the **npm package** in `packages/ui` (`@wuyangfan/nova-ui`). Features must be self-contained, independently testable, and documented. No “docs-only” or “internal-only” folders that duplicate public API without a clear boundary.

### II. Stable public API (default: no BREAKING)

Consumers import from **`@wuyangfan/nova-ui`** only. **Do not break** existing export names, prop contracts, or default behavior without:

- Explicit **BREAKING** callout in the component doc and release notes
- A short migration note in `docs-dumi/docs/components/<slug>.md`

Internal refactors (path moves under `packages/ui/src`, barrel updates) MUST preserve public symbols.

### III. Spec-aligned components (COMPONENT_SPECS)

New or materially changed components follow **`COMPONENT_SPECS.md`** dimensions: responsibility, DOM/semantics, state, controlled/uncontrolled data, API surface, types/ref forwarding, **accessibility**, theme/tokens, docs/verification.

When `component-plans/*.md` exists for a component, it wins over generic SPEC text on conflict; reconcile SPEC or document the delta in the PR.

### IV. Accessibility is non-negotiable

- Prefer semantic HTML and correct **`role` / `aria-*`**
- Keyboard operability for interactive controls; focus visible (`focus-visible`)
- Overlays (Modal, Drawer, Menu, Popover): focus management, escape to close where specified, portal behavior documented
- Decorative icons: `aria-hidden`; icon-only controls: **`aria-label`**
- Tests: prefer **`getByRole`** / **`getByLabelText`** (see `packages/ui/TESTING.md`)

### V. Test and quality gates before merge

For any `packages/ui` change:

```bash
npm run lint:ui
npm run typecheck:ui
npm run test:ui
npm run build:ui
```

If **`docs-dumi`** docs or demos change:

```bash
npm run build:ui && npm run build:docs
```

Do not claim completion without running the relevant commands. Colocate tests as **`ComponentName.test.tsx`** next to source.

### VI. Minimal, consistent implementation

- Match existing patterns: Tailwind + `cn`, category barrels, `forwardRef` where peers do
- New components: **`npm run new:component -- <category[/sub]> <PascalName>`** — use **`form/controls`**, **`form/pickers`**, **`feedback/overlays`**, **`feedback/inline`**, etc.; avoid flat dumping in category roots
- **Smallest diff** that satisfies the spec; no drive-by refactors or unrelated formatting
- Import order: third-party → types → aliases → relative; blank line between groups (ESLint `import/order`)

### VII. Documentation travels with the feature

- Component docs: **`docs-dumi/docs/components/<slug>.md`** + **`docs-dumi/docs/demos/*.tsx`** (file-based demos, not huge inline strings)
- Site base path: **`/react-ui-library/`**; dev: **`npm run dev:docs`** (requires prior **`build:ui`**)
- API reference: TypeDoc via **`npm run docs:api`** (output gitignored under `docs-dumi/docs/develop/api-reference/`)
- Playground live editing: **`react-live`** only in **`docs-dumi`** — never add to the published UI bundle

## Technology & repository constraints

| Area | Choice |
| --- | --- |
| Runtime | React 18, TypeScript |
| Styling | Tailwind CSS v3, `darkMode: 'class'`; ship **`styles.css`** from build |
| Package build | tsup (ESM/CJS + `.d.ts`) |
| Docs | dumi (`docs-dumi` workspace), not VitePress (archived under `archive/vitepress-site/`) |
| Node | 20+; npm workspaces (`packages/*`, `docs-dumi`) |
| Spec workflows | **Spec Kit** (`.specify/`, `/speckit-*`) and **OpenSpec** (`openspec/changes/*`, `/opsx:*`) — pick one track per feature; do not duplicate the same work in both |

No databases, Docker, or backend services for this repo.

## Development workflow

1. **Understand** — Read SPEC / plan / existing component peer implementation.
2. **Specify** — Spec Kit: `/speckit-specify` → plan → tasks; or OpenSpec: `/opsx:propose` for repo-level changes.
3. **Implement** — Minimal code + tests + dumi demo + markdown.
4. **Verify** — Commands in Principle V.
5. **Review** — PR describes behavior, a11y, and any intentional non-goals.

Overlay and form controls: verify controlled/uncontrolled behavior and edge cases (empty, disabled, loading) in tests where risk is high.

## Governance

- This constitution supersedes ad-hoc agent instructions when they conflict.
- Amendments: update this file + bump version/date below; note rationale in PR.
- Runtime commands and paths: **`AGENTS.md`** at repo root.
- Component dimension reference: **`COMPONENT_SPECS.md`**; batch plans: **`component-plans/MANIFEST.md`**.

**Version**: 1.0.0 | **Ratified**: 2026-05-16 | **Last Amended**: 2026-05-16
