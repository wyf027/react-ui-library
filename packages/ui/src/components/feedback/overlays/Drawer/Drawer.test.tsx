import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
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
    expect(dialog).toHaveAccessibleName('Panel title')
    expect(dialog).toHaveAttribute(
      'aria-labelledby',
      screen.getByRole('heading', { name: 'Panel title' }).id,
    )
    expect(screen.getByText('Drawer body')).toBeInTheDocument()
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Close drawer' })).toHaveFocus()
    })
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

  it('closes with Escape and restores focus to the opener', async () => {
    const user = userEvent.setup()

    function DrawerExample() {
      const [open, setOpen] = useState(false)

      return (
        <>
          <button type="button" onClick={() => setOpen(true)}>
            Open drawer
          </button>
          <Drawer open={open} title="Keyboard drawer" onClose={() => setOpen(false)}>
            <button type="button">Inside action</button>
          </Drawer>
        </>
      )
    }

    render(<DrawerExample />)

    const opener = screen.getByRole('button', { name: 'Open drawer' })
    await user.click(opener)

    expect(screen.getByRole('dialog', { name: 'Keyboard drawer' })).toBeInTheDocument()
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Close drawer' })).toHaveFocus()
    })

    await user.keyboard('{Escape}')

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(opener).toHaveFocus()
  })

  it('supports vertical placement from the top and bottom edges', async () => {
    const { rerender } = render(
      <Drawer open title="Top drawer" placement="top">
        x
      </Drawer>,
    )

    expect(await screen.findByRole('dialog', { name: 'Top drawer' })).toHaveClass(
      'top-0',
      'h-80',
      'w-full',
    )

    rerender(
      <Drawer open title="Bottom drawer" placement="bottom">
        x
      </Drawer>,
    )

    expect(screen.getByRole('dialog', { name: 'Bottom drawer' })).toHaveClass(
      'bottom-0',
      'h-80',
      'w-full',
    )
  })
})
