import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import type { MouseEvent } from 'react'

import { Tag } from './Tag'

describe('Tag', () => {
  it('renders tag content', () => {
    render(<Tag color="success">Active</Tag>)

    expect(screen.getByText('Active')).toBeInTheDocument()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('hides after the close button is clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()

    render(
      <Tag closable onClose={onClose}>
        Removable
      </Tag>,
    )

    await user.click(screen.getByRole('button', { name: 'Close tag' }))

    expect(onClose).toHaveBeenCalledTimes(1)
    expect(onClose.mock.calls[0]?.[0]).toHaveProperty('type', 'click')
    expect(screen.queryByText('Removable')).not.toBeInTheDocument()
  })

  it('keeps the tag visible when close is prevented', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn((event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
    })

    render(
      <Tag closable onClose={onClose}>
        Locked
      </Tag>,
    )

    await user.click(screen.getByRole('button', { name: 'Close tag' }))

    expect(onClose).toHaveBeenCalledTimes(1)
    expect(screen.getByText('Locked')).toBeInTheDocument()
  })

  it('supports custom close icon and accessible name', () => {
    render(
      <Tag closable closeIcon="Remove" closeAriaLabel="Remove tag">
        Custom
      </Tag>,
    )

    const closeButton = screen.getByRole('button', { name: 'Remove tag' })
    expect(closeButton).toHaveTextContent('Remove')
  })
})
