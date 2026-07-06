import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Dropdown } from './Dropdown'

describe('Dropdown', () => {
  const options = [
    { key: 'a', label: 'Alpha' },
    { key: 'b', label: 'Beta' },
  ]

  it('opens menu and invokes onChange when an item is chosen', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(<Dropdown trigger={<span>Open menu</span>} options={options} onChange={onChange} />)

    const trigger = screen.getByRole('button', { name: /Open menu/i })

    await user.click(trigger)
    expect(screen.getByRole('menu')).toBeInTheDocument()

    await user.click(screen.getByRole('menuitem', { name: 'Beta' }))
    expect(onChange).toHaveBeenCalledWith('b')
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()
  })

  it('opens from the trigger with ArrowUp and focuses the last enabled item', async () => {
    const user = userEvent.setup()

    render(<Dropdown trigger={<span>Open menu</span>} options={options} />)

    const trigger = screen.getByRole('button', { name: /Open menu/i })
    trigger.focus()

    await user.keyboard('{ArrowUp}')

    expect(screen.getByRole('menu')).toBeInTheDocument()
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    await waitFor(() => expect(screen.getByRole('menuitem', { name: 'Beta' })).toHaveFocus())
  })

  it('closes with Escape from the trigger after click opening', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()

    render(<Dropdown trigger={<span>Open menu</span>} options={options} onClose={onClose} />)

    const trigger = screen.getByRole('button', { name: /Open menu/i })

    await user.click(trigger)
    expect(screen.getByRole('menu')).toBeInTheDocument()
    expect(trigger).toHaveAttribute('aria-expanded', 'true')

    await user.keyboard('{Escape}')

    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(trigger).toHaveFocus()
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('keeps Escape support when focus is inside the menu', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()

    render(<Dropdown trigger={<span>Open menu</span>} options={options} onClose={onClose} />)

    const trigger = screen.getByRole('button', { name: /Open menu/i })

    await user.click(trigger)
    screen.getByRole('menuitem', { name: 'Alpha' }).focus()

    await user.keyboard('{Escape}')

    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('closes when clicking outside', async () => {
    const user = userEvent.setup()

    render(
      <>
        <Dropdown trigger={<span>Open menu</span>} options={options} />
        <button type="button">Outside</button>
      </>,
    )

    await user.click(screen.getByRole('button', { name: /Open menu/i }))
    expect(screen.getByRole('menu')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Outside' }))

    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })
})
