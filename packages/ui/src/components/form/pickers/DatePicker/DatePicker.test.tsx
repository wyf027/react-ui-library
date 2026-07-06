import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { DatePicker } from './DatePicker'

describe('DatePicker', () => {
  it('renders native date input with an accessible name', () => {
    render(<DatePicker aria-label="Pick date" />)

    expect(screen.getByLabelText('Pick date')).toHaveAttribute('type', 'date')
  })

  it('supports external labels and descriptions', () => {
    render(
      <>
        <label htmlFor="birthday">Birthday</label>
        <span id="birthday-help">Use YYYY-MM-DD format.</span>
        <DatePicker id="birthday" aria-describedby="birthday-help" />
      </>,
    )

    const input = screen.getByLabelText('Birthday')

    expect(input).toHaveAttribute('type', 'date')
    expect(input).toHaveAccessibleDescription('Use YYYY-MM-DD format.')
  })

  it('uses defaultValue when uncontrolled', () => {
    render(<DatePicker defaultValue="2024-06-01" aria-label="Birthday" />)

    expect((screen.getByLabelText('Birthday') as HTMLInputElement).value).toBe('2024-06-01')
  })

  it('calls onChange with date string when value changes', () => {
    const onChange = vi.fn()

    render(<DatePicker onChange={onChange} aria-label="Due date" />)

    const input = screen.getByLabelText('Due date')
    input.focus()
    fireEvent.change(input, { target: { value: '2025-12-25' } })

    expect(onChange).toHaveBeenCalledWith('2025-12-25')
  })

  it('reflects controlled value', () => {
    const { rerender } = render(<DatePicker value="2024-01-10" onChange={() => {}} aria-label="Controlled" />)

    expect((screen.getByLabelText('Controlled') as HTMLInputElement).value).toBe('2024-01-10')

    rerender(<DatePicker value="2024-02-20" onChange={() => {}} aria-label="Controlled" />)

    expect((screen.getByLabelText('Controlled') as HTMLInputElement).value).toBe('2024-02-20')
  })
})
