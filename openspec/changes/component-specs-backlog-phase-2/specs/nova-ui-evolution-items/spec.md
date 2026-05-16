# Delta — nova-ui-evolution-items

## ADDED Requirements

### Requirement: P1 and P2 evolution items are delivered as small scoped changes

The project SHALL implement items explicitly deferred as P1/P2 in `component-plans/MANIFEST.md` and referenced §7.2 sections (for example Icon `spin` and `decorative`, Title/Text ellipsis behaviors) as separate small changes with independent review and verification; each change MUST NOT bundle unrelated evolution items.

#### Scenario: Icon evolution does not bundle Typography

- **WHEN** delivering Icon-related P1/P2 capabilities
- **THEN** the change SHALL NOT simultaneously introduce Typography ellipsis or other unrelated component evolution unless the proposal explicitly expands scope

#### Scenario: Each evolution change passes quality gates

- **WHEN** merging an evolution item
- **THEN** `npm run lint:ui`, `npm run typecheck:ui`, `npm run test:ui`, and `npm run build:ui` SHALL succeed
- **AND** user-visible behavior SHALL match the updated documentation for that component
