import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Rate } from './Rate'

describe('Rate', () => {
  it('exposes radio group semantics for each score', () => {
    render(<Rate defaultValue={3} aria-label="Satisfaction" />)

    expect(screen.getByRole('radiogroup', { name: 'Satisfaction' })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: '3 of 5' })).toHaveAttribute('aria-checked', 'true')
    expect(screen.getByRole('radio', { name: '4 of 5' })).toHaveAttribute('aria-checked', 'false')
  })

  it('clears the current value when allowClear is enabled', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(<Rate defaultValue={3} onChange={onChange} />)

    await user.click(screen.getByRole('radio', { name: '3 of 5' }))

    expect(onChange).toHaveBeenCalledWith(0)
    expect(screen.getByRole('radio', { name: '3 of 5' })).toHaveAttribute('aria-checked', 'false')
  })

  it('supports arrow, home, and end keyboard navigation', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(<Rate defaultValue={2} onChange={onChange} />)

    const secondStar = screen.getByRole('radio', { name: '2 of 5' })
    secondStar.focus()

    await user.keyboard('{ArrowRight}')
    expect(onChange).toHaveBeenLastCalledWith(3)
    expect(screen.getByRole('radio', { name: '3 of 5' })).toHaveAttribute('aria-checked', 'true')

    await user.keyboard('{ArrowLeft}')
    expect(onChange).toHaveBeenLastCalledWith(2)
    expect(screen.getByRole('radio', { name: '2 of 5' })).toHaveAttribute('aria-checked', 'true')

    await user.keyboard('{End}')
    expect(onChange).toHaveBeenLastCalledWith(5)
    expect(screen.getByRole('radio', { name: '5 of 5' })).toHaveAttribute('aria-checked', 'true')

    await user.keyboard('{Home}')
    expect(onChange).toHaveBeenLastCalledWith(0)
    expect(screen.getByRole('radio', { name: '1 of 5' })).toHaveFocus()
  })

  it('does not change value when disabled', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(<Rate defaultValue={2} disabled onChange={onChange} />)

    await user.click(screen.getByRole('radio', { name: '3 of 5' }))

    expect(onChange).not.toHaveBeenCalled()
    expect(screen.getByRole('radio', { name: '2 of 5' })).toHaveAttribute('aria-checked', 'true')
  })
})
