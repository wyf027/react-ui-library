# Nova UI documentation migration

## Approved outcome

Use dumi 2 and the community dumi-theme-antd theme to replace VitePress for daily developer reference. Retain all 74 component documents, overview, four guides, home and playground; keep example behavior and the Nova UI package unchanged. Preserve existing /react-ui-library/ URLs including .html bookmarks, six component groups, Chinese content and GitHub Pages publication.

## Architecture

The docs workspace owns dumi configuration and the documentation theme. Markdown examples become dumi React demos with explicit imports and default-exported components. All examples, including the standalone playground, use dumi's native live compiler and source editor. A docs-only demo wrapper synchronizes Nova UI with the site theme; no dumi API enters the published component package. Custom layout markup uses Tailwind CSS; disable Tailwind preflight in the documentation stylesheet to avoid resetting the Antd theme.

Use dumi's base/publicPath and static export support for GitHub Pages. Register legacy .html routes alongside canonical routes so direct loads and navigation both work. Update the deployment artifact directory to docs/dist. Development imports the UI source directly, avoiding a prerequisite UI build; production CI still performs its existing UI build.

## Completeness and boundaries

Carry over API tables, accessibility notes and every example. No new component APIs, redesign of library components, package version change, new tests or local builds. Preserve the editable workflow on every demo with dumi's source editor. Existing external demo image URLs remain unchanged.

## Verification

Count and parse all documents/demos, check route and sidebar coverage, run docs/UI noEmit and lint. Start dumi dev on an unused port; inspect navigation, tables, React state, full-width examples, light/dark rendering and editing. Production CI verifies builds; Pages publication and HTTP probes verify deployed links. Record gaps honestly.

## Implementation plan

- [x] Replace docs dependencies/scripts with dumi 2.4.50, dumi-theme-antd 0.4.4 and compatible Antd 5; remove VitePress and Vue integration.
- [x] Add docs/.dumirc.ts with base/publicPath /react-ui-library/, dist output, source aliases, Chinese nav/sidebar, branding and legacy routes.
- [x] Convert 86 LivePlayground snippets to imported React demos; preserve all prose and API tables.
- [x] Replace VitePress home/overview markup with dumi-compatible Tailwind markup and retain editable playground.
- [x] Add docs-only styling/theme synchronization and Tailwind configuration without global preflight.
- [x] Update GitHub Pages artifact path, README and repository development instructions.
- [x] Verify source completeness, noEmit, lint and development pages; obtain read-only review.
- [ ] Checkpoint, open PR, inspect CI, publish authorized changes and verify live documentation.
