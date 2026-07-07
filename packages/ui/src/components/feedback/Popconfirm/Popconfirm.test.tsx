import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Popconfirm } from './Popconfirm'

describe('Popconfirm', () => {
  it('opens an accessible confirmation dialog from the trigger', async () => {
    const user = userEvent.setup()

    render(
      <Popconfirm title="Delete item" description="This action cannot be undone.">
        <button type="button">Delete</button>
      </Popconfirm>,
    )

    const trigger = screen.getByRole('button', { name: 'Delete' })
    expect(trigger).toHaveAttribute('aria-haspopup', 'dialog')
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(trigger).not.toHaveAttribute('aria-controls')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    await user.click(trigger)

    const dialog = screen.getByRole('dialog', { name: 'Delete item' })
    expect(dialog).toHaveAccessibleDescription('This action cannot be undone.')
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(trigger).toHaveAttribute('aria-controls', dialog.id)
  })

  it('closes on Escape, reports the open state change, and restores trigger focus', async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()

    render(
      <Popconfirm title="Archive item" onOpenChange={onOpenChange}>
        <button type="button">Archive</button>
      </Popconfirm>,
    )

    const trigger = screen.getByRole('button', { name: 'Archive' })

    await user.click(trigger)
    const dialog = screen.getByRole('dialog', { name: 'Archive item' })
    expect(dialog).toBeInTheDocument()

    within(dialog).getByRole('button', { name: '取消' }).focus()
    expect(within(dialog).getByRole('button', { name: '取消' })).toHaveFocus()

    fireEvent.keyDown(document, { key: 'Escape' })

    expect(screen.queryByRole('dialog', { name: 'Archive item' })).not.toBeInTheDocument()
    expect(onOpenChange).toHaveBeenLastCalledWith(false)
    expect(trigger).toHaveFocus()
  })

  it('calls confirm and cancel callbacks before closing', async () => {
    const user = userEvent.setup()
    const onConfirm = vi.fn()
    const onCancel = vi.fn()

    render(
      <Popconfirm title="Publish changes" onConfirm={onConfirm} onCancel={onCancel} okText="Publish" cancelText="Keep editing">
        <button type="button">Publish</button>
      </Popconfirm>,
    )

    const trigger = screen.getByRole('button', { name: 'Publish' })

    await user.click(trigger)
    await user.click(
      within(screen.getByRole('dialog', { name: 'Publish changes' })).getByRole('button', {
        name: 'Keep editing',
      }),
    )

    expect(onCancel).toHaveBeenCalledTimes(1)
    expect(screen.queryByRole('dialog', { name: 'Publish changes' })).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()

    await user.click(trigger)
    await user.click(
      within(screen.getByRole('dialog', { name: 'Publish changes' })).getByRole('button', {
        name: 'Publish',
      }),
    )

    expect(onConfirm).toHaveBeenCalledTimes(1)
    expect(screen.queryByRole('dialog', { name: 'Publish changes' })).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()
  })
})
