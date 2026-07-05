import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Tree, type TreeNode } from './Tree'

describe('Tree', () => {
  const data: TreeNode[] = [
    {
      key: 'src',
      title: 'src',
      children: [
        { key: 'components', title: 'components' },
        {
          key: 'tests',
          title: 'tests',
          children: [{ key: 'tree-test', title: 'Tree.test.tsx' }],
        },
      ],
    },
    { key: 'package', title: 'package.json' },
  ]

  it('exposes tree and treeitem semantics', () => {
    render(<Tree data={data} aria-label="Project files" defaultExpandedKeys={['src']} />)

    expect(screen.getByRole('tree', { name: 'Project files' })).toBeInTheDocument()

    const root = screen.getByRole('treeitem', { name: /src/ })
    expect(root).toHaveAttribute('aria-expanded', 'true')
    expect(root).toHaveAttribute('aria-level', '1')
    expect(root).toHaveAttribute('aria-posinset', '1')
    expect(root).toHaveAttribute('aria-setsize', '2')
    expect(root).toHaveAttribute('tabindex', '0')

    const child = screen.getByRole('treeitem', { name: /components/ })
    expect(child).toHaveAttribute('aria-level', '2')
    expect(child).not.toHaveAttribute('aria-expanded')
    expect(child).toHaveAttribute('tabindex', '-1')
  })

  it('toggles expandable nodes with click and calls onExpand', async () => {
    const user = userEvent.setup()
    const onExpand = vi.fn()

    render(<Tree data={data} aria-label="Project files" onExpand={onExpand} />)

    const root = screen.getByRole('treeitem', { name: /src/ })
    expect(root).toHaveAttribute('aria-expanded', 'false')

    await user.click(root)

    expect(onExpand).toHaveBeenCalledWith(['src'])
  })

  it('supports tree keyboard navigation and expansion', async () => {
    const user = userEvent.setup()
    render(<Tree data={data} aria-label="Project files" defaultExpandedKeys={['src']} />)

    const root = screen.getByRole('treeitem', { name: /src/ })
    root.focus()

    await user.keyboard('{ArrowDown}')
    expect(screen.getByRole('treeitem', { name: /components/ })).toHaveFocus()

    await user.keyboard('{End}')
    expect(screen.getByRole('treeitem', { name: /package.json/ })).toHaveFocus()

    await user.keyboard('{Home}')
    expect(root).toHaveFocus()

    await user.keyboard('{ArrowDown}{ArrowDown}')
    const tests = screen.getByRole('treeitem', { name: /tests/ })
    expect(tests).toHaveFocus()

    await user.keyboard('{ArrowRight}')
    expect(tests).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('treeitem', { name: /Tree.test.tsx/ })).toBeInTheDocument()

    await user.keyboard('{ArrowLeft}')
    expect(tests).toHaveAttribute('aria-expanded', 'false')

    await user.keyboard('{ArrowUp}')
    expect(screen.getByRole('treeitem', { name: /components/ })).toHaveFocus()
  })

  it('moves focus to the parent with ArrowLeft from a leaf node', async () => {
    const user = userEvent.setup()
    render(<Tree data={data} aria-label="Project files" defaultExpandedKeys={['src', 'tests']} />)

    const leaf = screen.getByRole('treeitem', { name: /Tree.test.tsx/ })
    leaf.focus()

    await user.keyboard('{ArrowLeft}')

    expect(screen.getByRole('treeitem', { name: /tests/ })).toHaveFocus()
  })
})
