import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { TreeSelect } from './TreeSelect'

describe('TreeSelect', () => {
  const data = [
    {
      key: 'root',
      title: '根节点',
      children: [
        { key: 'child1', title: '子节点 1' },
        { key: 'child2', title: '子节点 2' },
      ],
    },
  ]

  it('selects a node by its tree node key instead of matching visible text', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(<TreeSelect data={data} onChange={onChange} />)

    await user.click(screen.getByRole('treeitem', { name: '子节点 1' }))

    expect(onChange).toHaveBeenCalledWith('child1')
    expect(screen.getAllByText('子节点 1')).toHaveLength(2)
  })

  it('shows the controlled value title', () => {
    render(<TreeSelect data={data} value="child2" />)

    expect(screen.getAllByText('子节点 2').some((element) => element.tagName === 'DIV')).toBe(true)
  })
})
