import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { Modal } from './Modal'

afterEach(() => {
  cleanup()
})

describe('Modal', () => {
  it('renders nothing when closed', () => {
    render(
      <Modal open={false} title="T">
        Body
      </Modal>,
    )
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders dialog with title and children when open', async () => {
    render(
      <Modal open title="Hello">
        <p>Modal body</p>
      </Modal>,
    )

    const dialog = await waitFor(() => screen.getByRole('dialog'))
    expect(dialog).toHaveAttribute('aria-modal', 'true')
    expect(dialog).toHaveAttribute('aria-label', 'Hello')
    expect(screen.getByText('Modal body')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Hello' })).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', async () => {
    const onClose = vi.fn()

    render(
      <Modal open title="T" onClose={onClose}>
        x
      </Modal>,
    )

    await waitFor(() => expect(screen.getByRole('dialog', { name: 'T' })).toBeInTheDocument())
    fireEvent.click(within(screen.getByRole('dialog', { name: 'T' })).getByRole('button', { name: 'Close modal' }))
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
