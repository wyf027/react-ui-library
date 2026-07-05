import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { Modal } from './Modal'

afterEach(() => {
  cleanup()
  document.body.style.overflow = ''
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
    expect(dialog).toHaveAccessibleName('Hello')
    expect(dialog).toHaveAttribute(
      'aria-labelledby',
      screen.getByRole('heading', { name: 'Hello' }).id,
    )
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
    fireEvent.click(
      within(screen.getByRole('dialog', { name: 'T' })).getByRole('button', {
        name: 'Close modal',
      }),
    )
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('locks body scroll while open and restores the previous overflow value', async () => {
    document.body.style.overflow = 'scroll'

    const { rerender } = render(
      <Modal open title="Locked">
        x
      </Modal>,
    )

    await waitFor(() => expect(screen.getByRole('dialog', { name: 'Locked' })).toBeInTheDocument())
    expect(document.body.style.overflow).toBe('hidden')

    rerender(
      <Modal open={false} title="Locked">
        x
      </Modal>,
    )

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(document.body.style.overflow).toBe('scroll')
  })

  it('keeps body scroll locked until all open modals are closed', async () => {
    const { rerender } = render(
      <>
        <Modal open title="First">
          First body
        </Modal>
        <Modal open title="Second">
          Second body
        </Modal>
      </>,
    )

    await waitFor(() => expect(screen.getByRole('dialog', { name: 'First' })).toBeInTheDocument())
    expect(document.body.style.overflow).toBe('hidden')

    rerender(
      <>
        <Modal open={false} title="First">
          First body
        </Modal>
        <Modal open title="Second">
          Second body
        </Modal>
      </>,
    )

    expect(document.body.style.overflow).toBe('hidden')

    rerender(
      <>
        <Modal open={false} title="First">
          First body
        </Modal>
        <Modal open={false} title="Second">
          Second body
        </Modal>
      </>,
    )

    expect(document.body.style.overflow).toBe('')
  })
})
