import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Image } from './Image'

describe('Image', () => {
  it('opens preview from the keyboard and exposes dialog semantics', async () => {
    const user = userEvent.setup()

    render(<Image src="/photo.jpg" alt="Mountain" />)

    const trigger = screen.getByRole('button', { name: 'Preview Mountain' })
    expect(trigger).toHaveAttribute('tabindex', '0')

    trigger.focus()
    await user.keyboard('{Enter}')

    expect(screen.getByRole('dialog', { name: 'Mountain preview' })).toBeInTheDocument()

    await user.keyboard('{Escape}')

    expect(screen.queryByRole('dialog', { name: 'Mountain preview' })).not.toBeInTheDocument()
  })

  it('closes the preview with an explicit close button', async () => {
    const user = userEvent.setup()

    render(<Image src="/photo.jpg" alt="Mountain" />)

    await user.click(screen.getByRole('button', { name: 'Preview Mountain' }))
    expect(screen.getByRole('dialog', { name: 'Mountain preview' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Close image preview' }))

    expect(screen.queryByRole('dialog', { name: 'Mountain preview' })).not.toBeInTheDocument()
  })

  it('uses a custom preview trigger label when provided', () => {
    render(<Image src="/photo.jpg" alt="Mountain" aria-label="Open large mountain photo" />)

    expect(screen.getByRole('button', { name: 'Open large mountain photo' })).toBeInTheDocument()
  })

  it('keeps non-preview images exposed as regular images', () => {
    render(<Image src="/photo.jpg" alt="Mountain" preview={false} />)

    const image = screen.getByRole('img', { name: 'Mountain' })

    expect(image).not.toHaveAttribute('tabindex')
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})