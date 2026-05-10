# Component testing (Nova UI)

Tests run with **Vitest** + **jsdom** + **Testing Library** (`npm run test` in `packages/ui`, or `npm run test:ui` from the repo root). Config: [vitest.config.ts](./vitest.config.ts), setup: [vitest.setup.ts](./vitest.setup.ts).

## Conventions

| Topic | Rule |
| --- | --- |
| File placement | Colocate: `ComponentName/ComponentName.test.tsx` next to the implementation. |
| Naming | `describe('<ComponentName>', …)`; `it` descriptions state behavior (English, matching existing tests). |
| Queries | Prefer **`getByRole`** / **`getByLabelText`**; avoid brittle CSS class assertions unless intentional (see Button variant test). |
| Portals | Async render / portal content: wrap expectations in **`waitFor`** (see Modal / Drawer tests). |
| Mocks | Only mock browser APIs (`matchMedia`, `ResizeObserver`, timers) when needed; avoid mocking library components. |
| User interactions | Prefer **`@testing-library/user-event`** for realistic input (`selectOptions`, `click`, typing). `fireEvent` remains acceptable for simple cases. |

## Coverage (optional)

```bash
npm run test:coverage
```

Reports are generated under `packages/ui/coverage/`. From the repo root you can run `npm run test:coverage:ui`. CI does not enforce a threshold yet; raise thresholds gradually once the suite grows.
