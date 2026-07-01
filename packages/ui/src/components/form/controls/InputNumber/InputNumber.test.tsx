import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { InputNumber } from './InputNumber'

describe('InputNumber', () => {
  it('exposes spinbutton semantics on the editable value', () => {
    render(<InputNumber aria-label="Quantity" defaultValue={2} min={1} max={5} />)

    const input = screen.getByRole('spinbutton', { name: 'Quantity' })

    expect(input).toHaveValue('2')
    expect(input).toHaveAttribute('aria-valuenow', '2')
    expect(input).toHaveAttribute('aria-valuemin', '1')
    expect(input).toHaveAttribute('aria-valuemax', '5')
  })

  it('forwards form control props to the spinbutton', () => {
    render(
      <InputNumber
        id="quantity"
        aria-label="Quantity"
        aria-describedby="quantity-help"
        aria-invalid="true"
      />,
    )

    const input = screen.getByRole('spinbutton', { name: 'Quantity' })

    expect(input).toHaveAttribute('id', 'quantity')
    expect(input).toHaveAttribute('aria-describedby', 'quantity-help')
    expect(input).toHaveAttribute('aria-invalid', 'true')
  })

  it('supports named increment and decrement controls', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(<InputNumber aria-label="Quantity" defaultValue={2} onChange={onChange} />)

    await user.click(screen.getByRole('button', { name: 'Increase value' }))
    expect(onChange).toHaveBeenLastCalledWith(3)

    await user.click(screen.getByRole('button', { name: 'Decrease value' }))
    expect(onChange).toHaveBeenLastCalledWith(2)
  })

  it('supports keyboard stepping and boundary shortcuts', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(
      <InputNumber
        aria-label="Quantity"
        defaultValue={1}
        min={0}
        max={5}
        step={2}
        onChange={onChange}
      />,
    )

    const input = screen.getByRole('spinbutton', { name: 'Quantity' })

    await user.click(input)
    await user.keyboard('{ArrowUp}')
    expect(input).toHaveValue('3')
    expect(onChange).toHaveBeenLastCalledWith(3)

    await user.keyboard('{End}')
    expect(input).toHaveValue('5')
    expect(onChange).toHaveBeenLastCalledWith(5)

    await user.keyboard('{Home}')
    expect(input).toHaveValue('0')
    expect(onChange).toHaveBeenLastCalledWith(0)
  })
})