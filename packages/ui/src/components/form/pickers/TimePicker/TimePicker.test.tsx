import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { TimePicker } from './TimePicker'

describe('TimePicker', () => {
  it('exposes an accessible trigger and panel relationship', async () => {
    const user = userEvent.setup()

    render(<TimePicker aria-label="Start time" />)

    const trigger = screen.getByRole('combobox', { name: 'Start time' })
    expect(trigger).toHaveAttribute('aria-expanded', 'false')

    await user.click(trigger)

    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(trigger).toHaveAttribute('aria-controls', screen.getByRole('dialog').id)
    expect(screen.getByRole('group', { name: 'Hours' })).toBeInTheDocument()
    expect(screen.getByRole('group', { name: 'Minutes' })).toBeInTheDocument()
  })

  it('opens and closes from the keyboard', async () => {
    const user = userEvent.setup()

    render(<TimePicker aria-label="Start time" />)

    const trigger = screen.getByRole('combobox', { name: 'Start time' })
    trigger.focus()

    await user.keyboard('{Enter}')
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
  })

  it('selects hour and minute using native buttons', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(<TimePicker aria-label="Start time" onChange={onChange} />)

    await user.click(screen.getByRole('combobox', { name: 'Start time' }))
    await user.click(
      within(screen.getByRole('group', { name: 'Hours' })).getByRole('button', { name: '09' }),
    )
    await user.click(
      within(screen.getByRole('group', { name: 'Minutes' })).getByRole('button', { name: '30' }),
    )

    expect(onChange).toHaveBeenLastCalledWith('09:30')
    expect(screen.getByRole('combobox', { name: 'Start time' })).toHaveTextContent('09:30')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('does not open while disabled', async () => {
    const user = userEvent.setup()

    render(<TimePicker aria-label="Start time" disabled />)

    const trigger = screen.getByRole('combobox', { name: 'Start time' })
    expect(trigger).toHaveAttribute('aria-disabled', 'true')

    await user.click(trigger)

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
