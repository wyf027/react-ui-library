import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { DatePicker } from './DatePicker'

describe('DatePicker', () => {
  it('renders native date input', () => {
    const { container } = render(<DatePicker aria-label="Pick date" />)
    expect(container.querySelector('input[type="date"]')).toBeInTheDocument()
  })

  it('uses defaultValue when uncontrolled', () => {
    render(<DatePicker defaultValue="2024-06-01" aria-label="Birthday" />)
    const input = document.querySelector('input[type="date"]') as HTMLInputElement
    expect(input.value).toBe('2024-06-01')
  })

  it('calls onChange with date string when value changes', () => {
    const onChange = vi.fn()

    render(<DatePicker onChange={onChange} aria-label="Due date" />)

    const input = document.querySelector('input[type="date"]') as HTMLInputElement
    input.focus()
    fireEvent.change(input, { target: { value: '2025-12-25' } })

    expect(onChange).toHaveBeenCalledWith('2025-12-25')
  })

  it('reflects controlled value', () => {
    const { rerender } = render(<DatePicker value="2024-01-10" onChange={() => {}} aria-label="Controlled" />)
    let input = document.querySelector('input[type="date"]') as HTMLInputElement
    expect(input.value).toBe('2024-01-10')

    rerender(<DatePicker value="2024-02-20" onChange={() => {}} aria-label="Controlled" />)
    input = document.querySelector('input[type="date"]') as HTMLInputElement
    expect(input.value).toBe('2024-02-20')
  })
})
