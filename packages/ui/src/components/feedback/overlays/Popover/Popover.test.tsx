import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Popover } from './Popover'

describe('Popover', () => {
  it('shows content after trigger is clicked', async () => {
    const user = userEvent.setup()

    render(<Popover trigger={<span>Open me</span>} content={<span>Popover panel</span>} />)

    expect(screen.queryByText('Popover panel')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /Open me/i }))
    const panel = screen.getByText('Popover panel')
    const trigger = screen.getByRole('button', { name: /Open me/i })
    const panelId = panel.parentElement?.id

    if (!panelId) {
      throw new Error('Expected Popover panel to render with an id.')
    }

    expect(panel).toBeInTheDocument()
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(trigger).toHaveAttribute('aria-haspopup', 'dialog')
    expect(trigger).toHaveAttribute('aria-controls', panelId)
  })

  it('calls onOpen and onClose when toggling uncontrolled', async () => {
    const user = userEvent.setup()
    const onOpen = vi.fn()
    const onClose = vi.fn()

    render(
      <Popover
        trigger={<span>Toggle</span>}
        content={<span>Inside</span>}
        onOpen={onOpen}
        onClose={onClose}
      />,
    )

    await user.click(screen.getByRole('button', { name: /Toggle/i }))
    expect(onOpen).toHaveBeenCalledTimes(1)

    await user.click(screen.getByRole('button', { name: /Toggle/i }))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('closes with Escape and returns focus to the trigger', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()

    render(
      <Popover
        trigger={<span>Actions</span>}
        content={<button type="button">Archive</button>}
        onClose={onClose}
      />,
    )

    const trigger = screen.getByRole('button', { name: /Actions/i })

    await user.click(trigger)
    expect(screen.getByRole('button', { name: 'Archive' })).toBeInTheDocument()

    await user.keyboard('{Escape}')

    expect(screen.queryByRole('button', { name: 'Archive' })).not.toBeInTheDocument()
    expect(onClose).toHaveBeenCalledTimes(1)
    expect(trigger).toHaveFocus()
  })
})
