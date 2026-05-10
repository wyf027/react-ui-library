# AGENTS.md

## Cursor Cloud specific instructions

### Overview

This is a **Nova UI** monorepo — an enterprise React component library with two workspaces:

- `packages/ui` — the publishable `@wuyangfan/nova-ui` NPM package (~80 source files, 6 component categories)
- `docs` — a VitePress documentation site with live React playground (via `react-live`)

No databases, Docker, or backend services are required. Only Node.js 20+ and npm.

### OpenSpec（spec-driven）

- 目录：`openspec/`（`specs/`、`changes/`、`config.yaml`）。首次迭代可从 **`/opsx:propose`** 开始； slash 命令定义在 `.cursor/commands/`，技能在 `.cursor/skills/`。
- 官方文档与 CLI：<https://github.com/Fission-AI/OpenSpec>；本地更新模板可运行全局安装后的 `openspec update`，或使用 `npx @fission-ai/openspec@latest`。

### Key commands

All commands run from the workspace root unless noted.

| Task | Command |
|---|---|
| Install deps | `npm install` |
| Build UI lib | `npm run build:ui` |
| Lint UI | `npm run lint:ui` |
| Typecheck UI | `npm run typecheck:ui` |
| Test UI (Vitest + Testing Library) | `npm run test:ui` |
| UI test coverage report | `npm run test:coverage:ui` |
| New component scaffold | `npm run new:component -- <category[/subfolders]> <PascalName>` |
| Docs dev server | `npm run dev:docs` (port 5173) |
| UI dev server | `cd packages/ui && npm run dev` (port 5174 if docs running) |
| Build docs | `npm run build:docs` |
| Full build | `npm run build` |

### Scaffold examples

- `npm run new:component -- layout Widget` — creates `packages/ui/src/components/layout/Widget/`
- `npm run new:component -- form Foo` — creates under `form/controls/Foo` (default for top-level `form`)
- `npm run new:component -- form/pickers Foo` — creates under `form/pickers/Foo`
- `npm run new:component -- feedback/overlays Sheet` — creates under `feedback/overlays/Sheet`

The script appends exports to the category barrel (`packages/ui/src/components/<layout|basic|…>/index.ts`). Run `npm run lint:ui` and `npm run typecheck:ui` after scaffolding.

### 组件目录（与「八块计划」块 6 / 块 8）

- **二级分类**：`form/controls`、`form/pickers`、`feedback/overlays` 等子目录已落地；新增组件优先用 `npm run new:component -- <category/sub> Name` 落到对应桶，避免再平铺一大坨。
- **脚手架**：`packages/ui/scripts/new-component.mjs` 为块 8 交付物；与上表 Scaffold examples 一致。

### Important caveats

- **Build order matters**: the docs workspace has a `file:` dependency on `../packages/ui`. You must run `npm run build:ui` before `npm run dev:docs` or `npm run build:docs` — otherwise the docs site will fail to resolve the component library.
- **Tests**: component tests live next to source as `*.test.tsx` in `packages/ui`; use `npm run test:ui` from the repo root (or `npm run test` / `npm run test:watch` in `packages/ui`). Conventions and coverage notes: [packages/ui/TESTING.md](packages/ui/TESTING.md).
- The docs dev server runs at `http://localhost:5173/react-ui-library/` (note the base path).
- The standalone UI dev server at `packages/ui` uses Vite and serves at `http://localhost:5174/` (or the next available port).

### Caveats

- You must run `npm run build:ui` before `npm run dev:docs` so the docs package can resolve `@wuyangfan/nova-ui` (it uses a `file:` reference to the local build output).
- No databases, Docker, or external services are required.
