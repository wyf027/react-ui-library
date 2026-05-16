import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Menu } from './Menu'

describe('Menu', () => {
  it('uses role menubar when horizontal', () => {
    render(<Menu mode="horizontal" items={[{ key: 'a', label: 'A' }]} />)
    expect(screen.getByRole('menubar')).toBeInTheDocument()
  })

  it('uses role menu when vertical', () => {
    render(<Menu items={[{ key: 'a', label: 'A' }]} />)
    expect(screen.getByRole('menu')).toBeInTheDocument()
  })

  it('navigates with ArrowDown and activates leaf with Enter', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <Menu
        items={[
          { key: 'a', label: 'First' },
          { key: 'b', label: 'Second' },
        ]}
        onChange={onChange}
      />,
    )

    await user.tab()
    await user.keyboard('{ArrowDown}')
    await user.keyboard('{Enter}')
    expect(onChange).toHaveBeenCalledWith('b')
  })

  it('sets aria-expanded and opens submenu with ArrowRight', async () => {
    const user = userEvent.setup()
    render(
      <Menu
        items={[
          {
            key: 'parent',
            label: 'Parent',
            children: [{ key: 'child', label: 'Child' }],
          },
        ]}
      />,
    )

    const parentBtn = screen.getByRole('menuitem', { name: 'Parent' })
    parentBtn.focus()
    await user.keyboard('{ArrowRight}')
    expect(parentBtn).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('menuitem', { name: 'Child' })).toBeInTheDocument()
  })

  it('closes submenu with Escape from child', async () => {
    const user = userEvent.setup()
    render(
      <Menu
        defaultOpenKeys={['parent']}
        items={[
          {
            key: 'parent',
            label: 'Parent',
            children: [{ key: 'child', label: 'Child' }],
          },
        ]}
      />,
    )

    screen.getByRole('menuitem', { name: 'Child' }).focus()
    await user.keyboard('{Escape}')
    const parentBtn = screen.getByRole('menuitem', { name: 'Parent' })
    expect(parentBtn).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByRole('menuitem', { name: 'Child' })).not.toBeInTheDocument()
  })
})
