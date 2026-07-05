import { fireEvent, render, screen } from '@testing-library/react'
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

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Delete' }))

    const dialog = screen.getByRole('dialog', { name: 'Delete item' })
    expect(dialog).toHaveAccessibleDescription('This action cannot be undone.')
  })

  it('closes on Escape and reports the open state change', async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()

    render(
      <Popconfirm title="Archive item" onOpenChange={onOpenChange}>
        <button type="button">Archive</button>
      </Popconfirm>,
    )

    await user.click(screen.getByRole('button', { name: 'Archive' }))
    expect(screen.getByRole('dialog', { name: 'Archive item' })).toBeInTheDocument()

    fireEvent.keyDown(document, { key: 'Escape' })

    expect(screen.queryByRole('dialog', { name: 'Archive item' })).not.toBeInTheDocument()
    expect(onOpenChange).toHaveBeenLastCalledWith(false)
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

    await user.click(screen.getByRole('button', { name: 'Publish' }))
    await user.click(screen.getByRole('button', { name: 'Keep editing' }))

    expect(onCancel).toHaveBeenCalledTimes(1)
    expect(screen.queryByRole('dialog', { name: 'Publish changes' })).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Publish' }))
    await user.click(screen.getByRole('button', { name: 'Publish' }))

    expect(onConfirm).toHaveBeenCalledTimes(1)
    expect(screen.queryByRole('dialog', { name: 'Publish changes' })).not.toBeInTheDocument()
  })
})
