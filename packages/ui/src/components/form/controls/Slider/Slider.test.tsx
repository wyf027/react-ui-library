import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Slider } from './Slider'

describe('Slider', () => {
  it('links the visible value as the range input description', () => {
    render(<Slider aria-label="Volume" defaultValue={30} />)

    const slider = screen.getByRole('slider', { name: 'Volume' })
    const value = screen.getByText('30')

    expect(slider).toHaveValue('30')
    expect(slider).toHaveAttribute('aria-describedby', value.id)
    expect(slider).toHaveAccessibleDescription('30')
  })

  it('preserves existing descriptions when the value is visible', () => {
    render(
      <>
        <span id="volume-help">Set playback volume.</span>
        <Slider aria-label="Volume" aria-describedby="volume-help" defaultValue={45} />
      </>,
    )

    const slider = screen.getByRole('slider', { name: 'Volume' })
    const value = screen.getByText('45')

    expect(slider).toHaveAttribute('aria-describedby', `volume-help ${value.id}`)
  })

  it('does not add a generated description when the value is hidden', () => {
    render(<Slider aria-label="Volume" showValue={false} />)

    expect(screen.getByRole('slider', { name: 'Volume' })).not.toHaveAttribute('aria-describedby')
  })

  it('calls onChange with the selected value', () => {
    const onChange = vi.fn()

    render(<Slider aria-label="Volume" defaultValue={30} onChange={onChange} />)

    fireEvent.change(screen.getByRole('slider', { name: 'Volume' }), { target: { value: '55' } })

    expect(onChange).toHaveBeenCalledWith(55)
  })
})
