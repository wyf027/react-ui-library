```markdown
# react-ui-library Development Patterns

> Auto-generated skill from repository analysis

## Overview

This skill teaches you how to contribute to the `react-ui-library` codebase, a TypeScript-based UI component library. You'll learn about its coding conventions, how to add or update components and documentation, improve accessibility, and follow best practices for commits and testing. The repository is organized for modularity and clarity, with a strong focus on documentation and accessibility.

## Coding Conventions

- **File Naming:**  
  Use `camelCase` for file and folder names.
  ```
  packages/ui/src/components/form/formItem.tsx
  docs/components/button.md
  ```

- **Import Style:**  
  Use relative imports for modules within the codebase.
  ```typescript
  import { Button } from '../button'
  import { useForm } from '../../hooks/useForm'
  ```

- **Export Style:**  
  Use named exports for all components and utilities.
  ```typescript
  export { Button }
  export { useForm }
  ```

- **Commit Messages:**  
  Use prefixes like `feat:`, `fix:`, or `docs:` followed by a concise description (average 65 characters).
  ```
  feat: add DatePicker component with range selection
  fix: correct tab keyboard navigation in Tabs component
  docs: update Table API documentation
  ```

## Workflows

### Add or Update Component Documentation
**Trigger:** When adding a new component or improving documentation for an existing component  
**Command:** `/add-component-docs`

1. Create or update one or more markdown files in `docs/components/`.
2. Optionally update `docs/.vitepress/config.ts` to register new docs or categories.
3. Optionally update `docs/components/overview.md` or related index files.

**Example:**
```markdown
<!-- docs/components/button.md -->
# Button

## API

| Prop   | Type     | Description        |
|--------|----------|-------------------|
| type   | string   | Button type       |
| onClick| function | Click handler     |

## Playground

<Button type="primary">Primary</Button>
```

### Add New UI Component
**Trigger:** When adding a new UI component to the library  
**Command:** `/add-ui-component`

1. Create a new component file in `packages/ui/src/components/<category>/<ComponentName>.tsx`.
2. Export the component in the corresponding `index.ts` file.
3. Optionally update related documentation in `docs/components/`.

**Example:**
```typescript
// packages/ui/src/components/button/button.tsx
import React from 'react'

export interface ButtonProps {
  type?: 'primary' | 'default'
  onClick?: () => void
}

export const Button: React.FC<ButtonProps> = ({ type = 'default', onClick, children }) => (
  <button className={`btn btn-${type}`} onClick={onClick}>
    {children}
  </button>
)
```

```typescript
// packages/ui/src/components/button/index.ts
export { Button } from './button'
```

### Improve Accessibility or A11y
**Trigger:** When enhancing accessibility for components  
**Command:** `/improve-a11y`

1. Update one or more component files in `packages/ui/src/components/` to improve accessibility (ARIA attributes, keyboard support, etc.).
2. Update or add accessibility documentation in `docs/guide/accessibility.md`.
3. Optionally update `docs/.vitepress/config.ts` if new guide pages are added.

**Example:**
```typescript
// packages/ui/src/components/button/button.tsx
export const Button: React.FC<ButtonProps> = ({ type = 'default', onClick, children }) => (
  <button
    className={`btn btn-${type}`}
    onClick={onClick}
    aria-pressed={type === 'primary'}
  >
    {children}
  </button>
)
```

```markdown
<!-- docs/guide/accessibility.md -->
# Accessibility

All interactive components support keyboard navigation and proper ARIA attributes.
```

### Feature or Bugfix in Component
**Trigger:** When enhancing or fixing a specific component  
**Command:** `/feature-component`

1. Edit the relevant component file in `packages/ui/src/components/<category>/<ComponentName>.tsx`.
2. Commit with a `feat:` or `fix:` message.
3. Optionally merge via pull request.

**Example:**
```typescript
// packages/ui/src/components/table/table.tsx
export const Table = ({ data }) => (
  <table>
    {/* ... */}
  </table>
)
// Fix: Add missing keyboard navigation support
```

## Testing Patterns

- **Test File Pattern:**  
  Test files use the pattern `*.test.*` (e.g., `button.test.tsx`).
- **Testing Framework:**  
  Not explicitly specified; check for common frameworks like Jest or Vitest.
- **Example Test File:**
  ```typescript
  // packages/ui/src/components/button/button.test.tsx
  import { render, fireEvent } from '@testing-library/react'
  import { Button } from './button'

  test('calls onClick when clicked', () => {
    const handleClick = jest.fn()
    const { getByText } = render(<Button onClick={handleClick}>Click</Button>)
    fireEvent.click(getByText('Click'))
    expect(handleClick).toHaveBeenCalled()
  })
  ```

## Commands

| Command              | Purpose                                                |
|----------------------|--------------------------------------------------------|
| /add-component-docs  | Add or update documentation for a UI component         |
| /add-ui-component    | Add a new UI component to the library                  |
| /improve-a11y        | Improve accessibility (a11y) for components            |
| /feature-component   | Add a feature or fix a bug in an existing component    |
```
