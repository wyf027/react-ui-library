# AGENTS.md

## Cursor Cloud specific instructions

This is an npm workspaces monorepo with two packages:

- `packages/ui` — publishable React component library (`@wuyangfan/nova-ui`)
- `docs` — VitePress documentation site with interactive playground

### Key commands (run from workspace root)

| Task | Command |
|---|---|
| Install deps | `npm install` |
| Build UI lib | `npm run build:ui` |
| Lint UI | `npm run lint:ui` |
| Typecheck UI | `npm run typecheck:ui` |
| Dev docs server | `npm run dev:docs` |
| Build docs | `npm run build:docs` |
| Build all | `npm run build` |

### Caveats

- You must run `npm run build:ui` before `npm run dev:docs` so the docs package can resolve `@wuyangfan/nova-ui` (it uses a `file:` reference to the local build output).
- The docs dev server runs at `http://localhost:5173/react-ui-library/` (note the base path).
- No databases, Docker, or external services are required.
