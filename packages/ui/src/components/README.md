# Components export contract

## Per-component folder

Each public component lives under `src/components/{category}/{ComponentName}/`:

- `{ComponentName}.tsx` — implementation (`forwardRef`, JSX).
- `index.ts` — **only** re-exports the public surface of that component (`export { X } from './ComponentName'`, `export type { ... } from './ComponentName'`).

Do not re-export internal helpers from `index.ts` unless they are part of the library’s public API (e.g. `extractFieldValue` from Form).

Shared logic used by multiple components belongs in `src/components/_internal/` (not exported from `src/index.ts`).

## Category barrels

Files such as `layout/index.ts`, `form/index.ts`, etc. must import **only** from `./ComponentName` (the folder barrel), never from deep paths like `./Modal/Modal`.

Internal cross-imports between components use relative paths (e.g. `../../feedback/inline/Spin`), not the package root.
