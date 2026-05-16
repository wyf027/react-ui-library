import { createRef } from 'react'
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Modal } from './Modal'

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

  it('forwards ref to the dialog panel element', async () => {
    const ref = createRef<HTMLDivElement>()
    render(
      <Modal ref={ref} open title="Ref modal">
        content
      </Modal>,
    )

    await waitFor(() => expect(ref.current).not.toBeNull())
    expect(ref.current).toHaveAttribute('role', 'dialog')
  })

  it('does not call onClose on Escape when keyboard is disabled', async () => {
    const onClose = vi.fn()

    render(
      <Modal open title="K" onClose={onClose} keyboard={false}>
        body
      </Modal>,
    )

    await waitFor(() => screen.getByRole('dialog'))
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' })
    expect(onClose).not.toHaveBeenCalled()
  })

  it('does not call onClose when clicking mask if maskClosable is false', async () => {
    const onClose = vi.fn()

    render(
      <Modal open title="M" onClose={onClose} maskClosable={false}>
        body
      </Modal>,
    )

    const dialog = await waitFor(() => screen.getByRole('dialog'))
    const backdrop = dialog.parentElement
    expect(backdrop).toBeTruthy()
    fireEvent.mouseDown(backdrop!)
    expect(onClose).not.toHaveBeenCalled()
  })
})
