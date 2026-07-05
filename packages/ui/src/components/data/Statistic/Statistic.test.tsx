import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Statistic } from './Statistic'

describe('Statistic', () => {
  it('renders title, value, prefix, and suffix', () => {
    render(<Statistic title="Revenue" value={128900} prefix="$" suffix="USD" />)

    const valueRow = screen.getByText('128900').parentElement

    if (!valueRow) {
      throw new Error('Expected Statistic value to render inside a value row.')
    }

    expect(screen.getByText('Revenue')).toBeInTheDocument()
    expect(valueRow).toHaveTextContent('$128900USD')
  })

  it('supports custom value formatting', () => {
    render(
      <Statistic title="Conversion" value={68} formatter={(value) => <strong>{value}%</strong>} />,
    )

    expect(screen.getByText('68%').tagName).toBe('STRONG')
  })

  it('applies value styles to the value row', () => {
    render(<Statistic title="Balance" value={42} valueStyle={{ color: 'red' }} />)

    const valueRow = screen.getByText('42').parentElement

    if (!valueRow) {
      throw new Error('Expected Statistic value to render inside a value row.')
    }

    expect(valueRow).toHaveStyle('color: rgb(255, 0, 0)')
  })
})
