# AGENTS.md

## Cursor Cloud specific instructions

### Overview

This is a **Nova UI** monorepo — an enterprise React component library with two workspaces:

- `packages/ui` — the publishable `@wuyangfan/nova-ui` NPM package (~80 source files, 6 component categories)
- `docs` — a VitePress documentation site with live React playground (via `react-live`)

No databases, Docker, or backend services are required. Only Node.js 20+ and npm.

### Key commands

All commands run from the workspace root. See `package.json` for the full list.
This is an npm workspaces monorepo with two packages:

- `packages/ui` — publishable React component library (`@wuyangfan/nova-ui`)
- `docs` — VitePress documentation site with interactive playground

### Key commands (run from workspace root)

| Task | Command |
|---|---|
| Install deps | `npm install` |
| Build UI lib | `npm run build:ui` |
| Lint | `npm run lint:ui` |
| Typecheck | `npm run typecheck:ui` |
| Docs dev server | `npm run dev:docs` (port 5173) |
| UI dev server | `cd packages/ui && npm run dev` (port 5174 if docs running) |
| Full build | `npm run build` |

### Important caveats

- **Build order matters**: the docs workspace has a `file:` dependency on `../packages/ui`. You must run `npm run build:ui` before `npm run dev:docs` or `npm run build:docs` — otherwise the docs site will fail to resolve the component library.
- **No test framework**: there are currently no automated tests (no Jest, Vitest, or testing-library). Lint (`npm run lint:ui`) and typecheck (`npm run typecheck:ui`) are the primary code-quality checks.
- The docs dev server runs at `http://localhost:5173/react-ui-library/` (note the base path).
- The standalone UI dev server at `packages/ui` uses Vite and serves at `http://localhost:5174/` (or the next available port).
| Lint UI | `npm run lint:ui` |
| Typecheck UI | `npm run typecheck:ui` |
| Dev docs server | `npm run dev:docs` |
| Build docs | `npm run build:docs` |
| Build all | `npm run build` |

### Caveats

- You must run `npm run build:ui` before `npm run dev:docs` so the docs package can resolve `@wuyangfan/nova-ui` (it uses a `file:` reference to the local build output).
- The docs dev server runs at `http://localhost:5173/react-ui-library/` (note the base path).
- No databases, Docker, or external services are required.
