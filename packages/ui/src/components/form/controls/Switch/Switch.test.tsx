import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Switch } from './Switch'

describe('Switch', () => {
  it('toggles aria-checked when uncontrolled', async () => {
    const user = userEvent.setup()
    render(<Switch defaultChecked={false} aria-label="Power" />)

    const sw = screen.getByRole('switch', { name: 'Power' })
    expect(sw).toHaveAttribute('aria-checked', 'false')

    await user.click(sw)
    expect(sw).toHaveAttribute('aria-checked', 'true')
  })

  it('calls onChange when toggled', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(<Switch defaultChecked={false} aria-label="Alerts" onChange={onChange} />)

    await user.click(screen.getByRole('switch', { name: 'Alerts' }))

    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('does not toggle when disabled', async () => {
    const user = userEvent.setup()
    render(<Switch defaultChecked={false} disabled aria-label="Disabled switch" />)

    const sw = screen.getByRole('switch', { name: 'Disabled switch' })
    await user.click(sw)

    expect(sw).toHaveAttribute('aria-checked', 'false')
  })
})
