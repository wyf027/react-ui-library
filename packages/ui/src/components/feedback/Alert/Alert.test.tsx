import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Alert } from './Alert'

describe('Alert', () => {
  it('renders message and description in an alert region', () => {
    render(<Alert type="warning" message="Check settings" description="Some fields need review." />)

    const alert = screen.getByRole('alert')
    expect(alert).toHaveTextContent('Check settings')
    expect(alert).toHaveTextContent('Some fields need review.')
  })

  it('hides the default status icon from assistive technology', () => {
    render(<Alert type="success" message="Saved" />)

    expect(screen.getByText('✅')).toHaveAttribute('aria-hidden', 'true')
  })

  it('keeps custom icons visible to assistive technology by default', () => {
    render(<Alert type="success" message="Saved" icon={<span>Custom status icon</span>} />)

    expect(screen.getByText('Custom status icon').parentElement).not.toHaveAttribute('aria-hidden')
  })

  it('hides when the close button is clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()

    render(<Alert closable message="Dismiss me" onClose={onClose} />)

    await user.click(screen.getByRole('button', { name: 'Close alert' }))

    expect(onClose).toHaveBeenCalledTimes(1)
    expect(onClose.mock.calls[0]?.[0]).toHaveProperty('type', 'click')
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('supports custom close icon and accessible name', () => {
    render(
      <Alert
        closable
        message="Dismiss me"
        closeIcon={<span>Dismiss</span>}
        closeAriaLabel="Dismiss alert"
      />,
    )

    const closeButton = screen.getByRole('button', { name: 'Dismiss alert' })
    expect(closeButton).toHaveTextContent('Dismiss')
  })

  it('renders an optional action area', () => {
    render(<Alert message="Update available" action={<button type="button">Review</button>} />)

    expect(screen.getByRole('button', { name: 'Review' })).toBeInTheDocument()
  })
})