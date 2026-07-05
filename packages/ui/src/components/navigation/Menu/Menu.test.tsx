import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Menu } from './Menu'

describe('Menu', () => {
  const items = [
    { key: 'home', label: 'Home' },
    { key: 'docs', label: 'Docs' },
    { key: 'settings', label: 'Settings' },
  ]

  it('marks the active item as current and keeps only it tabbable', () => {
    const { getByRole } = render(<Menu items={items} selectedKey="docs" />)

    const menu = getByRole('menu')
    const home = getByRole('menuitem', { name: 'Home' })
    const docs = getByRole('menuitem', { name: 'Docs' })

    expect(menu).toHaveAttribute('aria-orientation', 'vertical')
    expect(home).toHaveAttribute('tabindex', '-1')
    expect(home).not.toHaveAttribute('aria-current')
    expect(docs).toHaveAttribute('tabindex', '0')
    expect(docs).toHaveAttribute('aria-current', 'page')
  })

  it('updates the active item when clicked without selectedKey', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const { getByRole } = render(<Menu items={items} onChange={onChange} />)

    const settings = getByRole('menuitem', { name: 'Settings' })
    await user.click(settings)

    expect(settings).toHaveAttribute('aria-current', 'page')
    expect(settings).toHaveAttribute('tabindex', '0')
    expect(onChange).toHaveBeenCalledWith('settings')
  })

  it('moves focus with vertical keyboard shortcuts and skips disabled items', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const menuItems = [
      { key: 'home', label: 'Home' },
      { key: 'docs', label: 'Docs', disabled: true },
      { key: 'settings', label: 'Settings' },
    ]
    const { getByRole } = render(<Menu items={menuItems} onChange={onChange} />)

    const home = getByRole('menuitem', { name: 'Home' })
    const settings = getByRole('menuitem', { name: 'Settings' })

    home.focus()
    await user.keyboard('{ArrowDown}')

    await waitFor(() => expect(settings).toHaveFocus())
    expect(settings).toHaveAttribute('aria-current', 'page')
    expect(onChange).toHaveBeenLastCalledWith('settings')

    await user.keyboard('{Home}')
    await waitFor(() => expect(home).toHaveFocus())
    expect(home).toHaveAttribute('aria-current', 'page')

    await user.keyboard('{End}')
    await waitFor(() => expect(settings).toHaveFocus())
    expect(settings).toHaveAttribute('aria-current', 'page')
  })

  it('uses menubar semantics and horizontal arrow keys in horizontal mode', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const { getByRole } = render(<Menu items={items} mode="horizontal" onChange={onChange} />)

    const menu = getByRole('menubar')
    const home = getByRole('menuitem', { name: 'Home' })
    const docs = getByRole('menuitem', { name: 'Docs' })

    expect(menu).toHaveAttribute('aria-orientation', 'horizontal')

    home.focus()
    await user.keyboard('{ArrowRight}')

    await waitFor(() => expect(docs).toHaveFocus())
    expect(docs).toHaveAttribute('aria-current', 'page')
    expect(onChange).toHaveBeenLastCalledWith('docs')

    await user.keyboard('{ArrowLeft}')
    await waitFor(() => expect(home).toHaveFocus())
    expect(home).toHaveAttribute('aria-current', 'page')
  })
})
