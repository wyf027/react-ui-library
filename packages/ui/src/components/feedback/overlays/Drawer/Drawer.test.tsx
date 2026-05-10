import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Drawer } from './Drawer'

describe('Drawer', () => {
  it('renders nothing when closed', () => {
    render(
      <Drawer open={false} title="Panel">
        Inside
      </Drawer>,
    )
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders dialog with title and body when open', async () => {
    render(
      <Drawer open title="Panel title">
        Drawer body
      </Drawer>,
    )

    const dialog = await waitFor(() => screen.getByRole('dialog'))
    expect(dialog).toHaveAttribute('aria-modal', 'true')
    expect(screen.getByRole('heading', { name: 'Panel title' })).toBeInTheDocument()
    expect(screen.getByText('Drawer body')).toBeInTheDocument()
  })

  it('calls onClose when close button is clicked', async () => {
    const onClose = vi.fn()

    render(
      <Drawer open title="T" onClose={onClose}>
        x
      </Drawer>,
    )

    await waitFor(() => expect(screen.getByRole('dialog')).toBeInTheDocument())
    fireEvent.click(screen.getByRole('button', { name: 'Close drawer' }))
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
