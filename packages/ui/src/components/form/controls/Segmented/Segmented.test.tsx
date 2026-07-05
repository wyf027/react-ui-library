import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Segmented } from './Segmented'

const options = [
  { label: 'Day', value: 'day' },
  { label: 'Week', value: 'week', disabled: true },
  { label: 'Month', value: 'month' },
]

describe('Segmented', () => {
  it('exposes radiogroup semantics for the selected option', () => {
    render(<Segmented aria-label="View range" options={options} defaultValue="day" />)

    expect(screen.getByRole('radiogroup', { name: 'View range' })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: 'Day' })).toHaveAttribute('aria-checked', 'true')
    expect(screen.getByRole('radio', { name: 'Month' })).toHaveAttribute('aria-checked', 'false')
  })

  it('calls onChange when an option is selected', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(<Segmented options={options} defaultValue="day" onChange={onChange} />)

    await user.click(screen.getByRole('radio', { name: 'Month' }))

    expect(onChange).toHaveBeenCalledWith('month')
    expect(screen.getByRole('radio', { name: 'Month' })).toHaveAttribute('aria-checked', 'true')
  })

  it('defaults to the first enabled option', () => {
    render(<Segmented options={options} />)

    expect(screen.getByRole('radio', { name: 'Day' })).toHaveAttribute('aria-checked', 'true')

    render(<Segmented options={[{ label: 'Off', value: 'off', disabled: true }, ...options]} />)

    expect(screen.getAllByRole('radio', { name: 'Day' })[1]).toHaveAttribute('aria-checked', 'true')
  })

  it('supports arrow, home, and end keyboard navigation while skipping disabled options', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(<Segmented options={options} defaultValue="day" onChange={onChange} />)

    const day = screen.getByRole('radio', { name: 'Day' })
    day.focus()

    await user.keyboard('{ArrowRight}')
    expect(onChange).toHaveBeenLastCalledWith('month')
    expect(screen.getByRole('radio', { name: 'Month' })).toHaveFocus()

    await user.keyboard('{ArrowRight}')
    expect(onChange).toHaveBeenLastCalledWith('day')
    expect(day).toHaveFocus()

    await user.keyboard('{End}')
    expect(onChange).toHaveBeenLastCalledWith('month')

    await user.keyboard('{Home}')
    expect(onChange).toHaveBeenLastCalledWith('day')
  })

  it('does not update when disabled', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(<Segmented options={options} defaultValue="day" disabled onChange={onChange} />)

    await user.click(screen.getByRole('radio', { name: 'Month' }))

    expect(onChange).not.toHaveBeenCalled()
    expect(screen.getByRole('radiogroup')).toHaveAttribute('aria-disabled', 'true')
  })
})
