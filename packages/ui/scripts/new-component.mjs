#!/usr/bin/env node
/**
 * Scaffold a new component under packages/ui/src/components.
 *
 * Usage (from repo root):
 *   npm run new:component -- layout Widget
 *   npm run new:component -- form Foo              → form/controls/Foo
 *   npm run new:component -- form/pickers Foo      → form/pickers/Foo
 *   npm run new:component -- feedback/overlays Sheet
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const UI_ROOT = path.resolve(__dirname, '..')
const COMPONENTS = path.join(UI_ROOT, 'src/components')

const ROOT_CATEGORIES = new Set(['layout', 'basic', 'form', 'feedback', 'data', 'navigation'])

function usage() {
  console.error(`Usage: npm run new:component -- <category[/subfolders]> <PascalComponentName>

Examples:
  npm run new:component -- layout Widget
  npm run new:component -- form Foo
  npm run new:component -- form/pickers Foo
  npm run new:component -- feedback/overlays Sheet`)
  process.exit(1)
}

const rawArgs = process.argv.slice(2).filter((a) => a !== '--')
if (rawArgs.length < 2) usage()

let categoryPath = rawArgs[0].replace(/\\/g, '/').replace(/^\/+/, '')
const name = rawArgs[1]

if (!/^[A-Z][a-zA-Z0-9]*$/.test(name)) {
  console.error('Component name must be PascalCase (e.g. TagFilter).')
  process.exit(1)
}

const segments = categoryPath.split('/').filter(Boolean)
if (segments.length === 1 && segments[0] === 'form') {
  categoryPath = 'form/controls'
}

const fullParts = categoryPath.split('/').filter(Boolean)
const root = fullParts[0]
if (!ROOT_CATEGORIES.has(root)) {
  console.error(`Unknown category "${root}". Use one of: ${[...ROOT_CATEGORIES].join(', ')}`)
  process.exit(1)
}

const componentDir = path.join(COMPONENTS, ...fullParts, name)
if (fs.existsSync(componentDir)) {
  console.error(`Directory already exists: ${componentDir}`)
  process.exit(1)
}

fs.mkdirSync(componentDir, { recursive: true })

/** Path depth from .../ComponentName/ComponentName.tsx up to src/ */
const depthToSrc = fullParts.length + 2
const prefix = `${'../'.repeat(depthToSrc)}`

const tsx = `import { forwardRef, type HTMLAttributes } from 'react'

import { cn } from '${prefix}utils/cn'

export interface ${name}Props extends HTMLAttributes<HTMLDivElement> {}

export const ${name} = forwardRef<HTMLDivElement, ${name}Props>(function ${name}(
  { className, ...props },
  ref,
) {
  return <div ref={ref} className={cn(className)} {...props} />
})

${name}.displayName = '${name}'
`

const indexTs = `export { ${name} } from './${name}'
export type { ${name}Props } from './${name}'
`

const readme = `# ${name}

Brief description of ${name}.

## Docs

- VitePress: \`docs/components/<slug>.md\` (add a page and sidebar entry).

## Public API

Exported from \`${path.posix.join('packages/ui/src/components', ...fullParts, name, 'index.ts')}\`.
Import from \`@wuyangfan/nova-ui\` after registering exports in \`packages/ui/src/components/${root}/index.ts\`.
`

fs.writeFileSync(path.join(componentDir, `${name}.tsx`), tsx, 'utf8')
fs.writeFileSync(path.join(componentDir, 'index.ts'), indexTs, 'utf8')
fs.writeFileSync(path.join(componentDir, 'README.md'), readme, 'utf8')

const relativeFromCategoryIndex =
  fullParts.length > 1 ? `./${[...fullParts.slice(1), name].join('/')}` : `./${name}`

const categoryIndexPath = path.join(COMPONENTS, root, 'index.ts')
const exportBlock = `export { ${name} } from '${relativeFromCategoryIndex}'
export type { ${name}Props } from '${relativeFromCategoryIndex}'
`

let categorySrc = ''
if (fs.existsSync(categoryIndexPath)) {
  categorySrc = fs.readFileSync(categoryIndexPath, 'utf8')
}

if (categorySrc.includes(`from '${relativeFromCategoryIndex}'`)) {
  console.warn(`Category index already references ${relativeFromCategoryIndex}; skipping append.`)
} else {
  const next =
    categorySrc.replace(/\s*$/, '') +
    (categorySrc.endsWith('\n') ? '' : '\n') +
    '\n' +
    exportBlock +
    '\n'
  fs.writeFileSync(categoryIndexPath, next, 'utf8')
}

console.log(`Created ${path.relative(UI_ROOT, componentDir)}`)
console.log(`Appended exports to ${path.relative(UI_ROOT, categoryIndexPath)}`)
console.log('\nNext: run npm run lint:ui && npm run typecheck:ui from the repo root.')
