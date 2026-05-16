# Delta — docs-site-dumi

## ADDED Requirements

### Requirement: Dumi-based documentation site workspace

The repository SHALL provide a documentation workspace built with **dumi** (React-oriented configuration) that consumes `@wuyangfan/nova-ui` via `file:../packages/ui` (or equivalent workspace protocol), such that component documentation and demos ship independently from the publishable UI package while preserving the monorepo layout.

#### Scenario: Build order gate remains enforced

- **WHEN** a contributor runs `npm run dev:docs` or `npm run build:docs` from the repository root
- **THEN** documentation MUST resolve `@wuyangfan/nova-ui` successfully
- **AND** project documentation (e.g. `AGENTS.md`) SHALL state that `npm run build:ui` MUST succeed before docs development when local package output is required

#### Scenario: Static base path for sub-directory deployment

- **WHEN** the site is configured for deployment under a path prefix (current convention: `/react-ui-library/`)
- **THEN** production builds SHALL emit asset URLs consistent with that `base`
- **AND** smoke verification SHALL cover at least one nested route and one component page without console asset-load failures

### Requirement: Navigation parity during migration

The dumi site SHALL expose guide and component sections comparable to the prior VitePress sidebar (guide entries and component groups), unless explicitly deferred in `tasks.md` with documented rationale.

#### Scenario: Core routes reachable after P1

- **WHEN** phase P1 (skeleton) is complete per `tasks.md`
- **THEN** guide introduction/getting-started (or their replacements) and at least three component documentation pages SHALL be reachable
- **AND** a route mapping note SHALL exist (e.g. in `design.md` appendix or `tasks.md`) for URL changes affecting bookmarks

---

## MODIFIED Requirements

<!-- None until a baseline `openspec/specs/` snapshot exists; merge deltas here when promoting from change-only specs. -->
