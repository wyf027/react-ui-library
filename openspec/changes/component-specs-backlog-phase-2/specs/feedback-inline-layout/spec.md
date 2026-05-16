# Delta — feedback-inline-layout

## ADDED Requirements

### Requirement: Inline feedback components live under a dedicated subdirectory

The Nova UI package SHALL organize selected inline feedback components (including Alert, Skeleton, and Spin, and optionally others explicitly listed in the iteration tasks) under `packages/ui/src/components/feedback/inline/` while preserving all public export names from `@wuyangfan/nova-ui` as stable.

#### Scenario: Public imports remain stable after directory move

- **WHEN** consumers import symbols such as `Alert`, `Skeleton`, or `Spin` from `@wuyangfan/nova-ui`
- **THEN** those imports SHALL remain valid without path-based deep imports into moved folders

#### Scenario: Category barrel reflects inline paths

- **WHEN** the migration completes
- **THEN** `packages/ui/src/components/feedback/index.ts` SHALL re-export inline components from `./inline/<Component>` barrels
- **AND** internal relative imports across the codebase SHALL resolve without circular dependencies

#### Scenario: Verification after migration

- **WHEN** the structural migration merges
- **THEN** `npm run lint:ui`, `npm run typecheck:ui`, `npm run test:ui`, and `npm run build:ui` SHALL succeed
