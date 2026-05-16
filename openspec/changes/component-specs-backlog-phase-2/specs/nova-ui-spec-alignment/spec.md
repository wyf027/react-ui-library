# Delta — nova-ui-spec-alignment

## ADDED Requirements

### Requirement: COMPONENT_SPECS-driven alignment iterations

The project SHALL align components listed in `COMPONENT_SPECS.md` that are outside the closed `component-plans/MANIFEST.md` batch by executing the same verification loop as MANIFEST agent-sop: read spec/plan, compare `packages/ui` implementation, apply minimal code or document intentional gaps, update `docs/components/*.md` when the component has a doc page, and run `npm run lint:ui`, `npm run typecheck:ui`, `npm run test:ui`, and `npm run build:ui` from the repository root before merge.

#### Scenario: Table iteration completes with gates green

- **WHEN** an iteration targets the Table component per `COMPONENT_SPECS.md` (and any matching `component-plans` doc if present)
- **THEN** implementation or documented boundaries SHALL match the spec’s normative API and accessibility expectations
- **AND** the corresponding `docs/components/*.md` SHALL reflect current props and examples
- **AND** the verification commands SHALL exit successfully with no new failures introduced by the change

#### Scenario: Upload Menu Modal follow prioritized queue

- **WHEN** maintaining the default prioritization (Modal behavior, Table, Upload, Menu)
- **THEN** each merged iteration SHALL address at most one primary component family unless explicitly scoped in `tasks.md`
- **AND** each iteration SHALL leave traceable updates in documentation or code comments only where MANIFEST-style DoD requires
