import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Radio } from './Radio'

describe('Radio', () => {
  it('calls onChange with value when an option is selected', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(
      <>
        <Radio name="plan" value="free" label="Free" onChange={onChange} />
        <Radio name="plan" value="pro" label="Pro" onChange={onChange} />
      </>,
    )

    await user.click(screen.getByRole('radio', { name: 'Pro' }))

    expect(onChange).toHaveBeenCalledWith('pro')
    expect(screen.getByRole('radio', { name: 'Pro' })).toBeChecked()
  })

  it('associates helper text with the radio description', () => {
    render(<Radio name="plan" value="pro" label="Pro" helperText="Includes team features." />)

    expect(screen.getByRole('radio', { name: 'Pro' })).toHaveAccessibleDescription(
      'Includes team features.',
    )
  })

  it('preserves custom descriptions when helper text is present', () => {
    render(
      <>
        <span id="external-help">Recommended for companies.</span>
        <Radio
          name="plan"
          value="pro"
          label="Pro"
          helperText="Includes team features."
          aria-describedby="external-help"
        />
      </>,
    )

    expect(screen.getByRole('radio', { name: 'Pro' })).toHaveAccessibleDescription(
      'Recommended for companies. Includes team features.',
    )
  })

  it('renders error in an alert region and marks the radio invalid', () => {
    render(<Radio name="plan" value="pro" label="Pro" error="Choose a plan." />)
    const radio = screen.getByRole('radio', { name: 'Pro' })

    expect(screen.getByRole('alert')).toHaveTextContent('Choose a plan.')
    expect(radio).toHaveAttribute('aria-invalid', 'true')
    expect(radio).toHaveAccessibleDescription('Choose a plan.')
  })
})
