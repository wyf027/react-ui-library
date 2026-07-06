import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Checkbox } from './Checkbox'

describe('Checkbox', () => {
  it('toggles checked when uncontrolled', async () => {
    const user = userEvent.setup()
    render(<Checkbox label="Accept" defaultChecked={false} />)

    const box = screen.getByRole('checkbox', { name: 'Accept' })
    expect(box).not.toBeChecked()

    await user.click(box)
    expect(box).toBeChecked()

    await user.click(box)
    expect(box).not.toBeChecked()
  })

  it('associates helper text with the checkbox description', () => {
    render(<Checkbox label="Accept" helperText="Required before continuing." />)

    expect(screen.getByRole('checkbox', { name: 'Accept' })).toHaveAccessibleDescription(
      'Required before continuing.',
    )
  })

  it('preserves custom descriptions when helper text is present', () => {
    render(
      <>
        <span id="external-help">Needed for account setup.</span>
        <Checkbox
          label="Accept"
          helperText="Required before continuing."
          aria-describedby="external-help"
        />
      </>,
    )

    expect(screen.getByRole('checkbox', { name: 'Accept' })).toHaveAccessibleDescription(
      'Needed for account setup. Required before continuing.',
    )
  })

  it('renders error in an alert region and marks the checkbox invalid', () => {
    render(<Checkbox label="Accept" error="You must accept the terms." />)
    const box = screen.getByRole('checkbox', { name: 'Accept' })

    expect(screen.getByRole('alert')).toHaveTextContent('You must accept the terms.')
    expect(box).toHaveAttribute('aria-invalid', 'true')
    expect(box).toHaveAccessibleDescription('You must accept the terms.')
  })

  it('invokes onChange with the new checked state', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(<Checkbox label="Notify" defaultChecked={false} onChange={onChange} />)

    await user.click(screen.getByRole('checkbox', { name: 'Notify' }))

    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('does not toggle when disabled', async () => {
    const user = userEvent.setup()
    render(<Checkbox label="Locked" checked={false} disabled onChange={vi.fn()} />)

    const box = screen.getByRole('checkbox', { name: 'Locked' })
    await user.click(box)

    expect(box).not.toBeChecked()
  })
})
