import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { ImagePreview } from './ImagePreview'

describe('ImagePreview', () => {
  it('opens from the keyboard and closes with Escape while restoring focus', async () => {
    const user = userEvent.setup()

    render(<ImagePreview src="/photo.jpg" alt="Mountain" />)

    const trigger = screen.getByRole('button', { name: 'Preview Mountain' })
    expect(trigger).toHaveAttribute('tabindex', '0')

    trigger.focus()
    await user.keyboard('{Enter}')

    expect(screen.getByRole('dialog', { name: 'Mountain preview' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Close image preview' })).toHaveFocus()

    await user.keyboard('{Escape}')

    expect(screen.queryByRole('dialog', { name: 'Mountain preview' })).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()
  })

  it('locks body scroll while the preview dialog is open', async () => {
    const user = userEvent.setup()
    const previousOverflow = document.body.style.overflow

    render(<ImagePreview src="/photo.jpg" alt="Mountain" />)

    await user.click(screen.getByRole('button', { name: 'Preview Mountain' }))
    expect(document.body.style.overflow).toBe('hidden')

    await user.click(screen.getByRole('button', { name: 'Close image preview' }))

    expect(document.body.style.overflow).toBe(previousOverflow)
  })
})
