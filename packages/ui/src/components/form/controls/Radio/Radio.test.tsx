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
})
