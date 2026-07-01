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
