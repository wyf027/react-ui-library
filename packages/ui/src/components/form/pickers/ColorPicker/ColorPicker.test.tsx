import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { ColorPicker } from './ColorPicker'

describe('ColorPicker', () => {
  it('links the visible color value as the input description', () => {
    render(<ColorPicker aria-label="Accent color" defaultValue="#123456" />)

    const input = screen.getByLabelText('Accent color')
    const value = screen.getByText('#123456')

    expect(input).toHaveValue('#123456')
    expect(input).toHaveAttribute('aria-describedby', value.id)
    expect(input).toHaveAccessibleDescription('#123456')
  })

  it('preserves existing descriptions when the value is visible', () => {
    render(
      <>
        <span id="color-help">Choose a brand color.</span>
        <ColorPicker aria-label="Brand color" aria-describedby="color-help" defaultValue="#abcdef" />
      </>,
    )

    const input = screen.getByLabelText('Brand color')
    const value = screen.getByText('#abcdef')

    expect(input).toHaveAttribute('aria-describedby', `color-help ${value.id}`)
  })

  it('does not add a generated description when the value is hidden', () => {
    render(<ColorPicker aria-label="Hidden value" showValue={false} />)

    expect(screen.getByLabelText('Hidden value')).not.toHaveAttribute('aria-describedby')
  })

  it('calls onChange with the selected color', () => {
    const onChange = vi.fn()

    render(<ColorPicker aria-label="Accent color" defaultValue="#123456" onChange={onChange} />)

    fireEvent.change(screen.getByLabelText('Accent color'), { target: { value: '#654321' } })

    expect(onChange).toHaveBeenCalledWith('#654321')
  })
})
