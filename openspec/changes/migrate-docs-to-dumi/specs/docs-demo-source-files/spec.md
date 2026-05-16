# Delta — docs-demo-source-files

## ADDED Requirements

### Requirement: File-based component demos

Component examples used on documentation pages SHALL be authored as **source files** (e.g. `*.tsx` under an agreed `demos/` or equivalent convention) referenced by dumi, instead of relying solely on inline code strings in Markdown, except for transitional pages explicitly listed in `tasks.md`.

#### Scenario: Imports match consumer usage

- **WHEN** a demo renders a Nova UI component
- **THEN** imports SHALL use the public package entry (`@wuyangfan/nova-ui`) or another path explicitly documented as supported for demos
- **AND** demos SHALL NOT depend on deep internal paths that are not part of the published API contract

#### Scenario: Demo discoverability for reviewers

- **WHEN** a new component page adds interactive examples
- **THEN** corresponding demo source files SHALL live under the migration-agreed directory layout recorded in `design.md` §4
- **AND** pull requests touching demos SHOULD keep demo files small and focused (one concern per file where practical)

### Requirement: Global styles for previews

Demo previews SHALL load Nova UI global styles so that Tailwind-dependent components render consistently with consumer applications, using the strategy chosen in `design.md` §5 (MVP: built `dist/styles.css` or documented equivalent).

#### Scenario: Visual regression spot-check

- **WHEN** completing P1 or P2 migration milestones
- **THEN** at least Button, one form-related component, and one layout component pages SHALL be visually checked in light and dark appearance modes without catastrophic breakage

---

## MODIFIED Requirements

<!-- None until baseline specs are promoted. -->
