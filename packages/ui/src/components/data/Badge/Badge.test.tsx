import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Badge } from './Badge'

describe('Badge', () => {
  it('caps numeric counts with overflowCount', () => {
    render(<Badge count={120} overflowCount={99} />)

    expect(screen.getByText('99+')).toBeInTheDocument()
  })

  it('hides zero counts unless showZero is enabled', () => {
    const { rerender } = render(<Badge count={0} />)

    expect(screen.queryByText('0')).not.toBeInTheDocument()

    rerender(<Badge count={0} showZero />)
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('renders string and custom node counts without numeric overflow', () => {
    const { rerender } = render(<Badge count="new" />)

    expect(screen.getByText('new')).toBeInTheDocument()

    rerender(<Badge count={<span>custom</span>} />)
    expect(screen.getByText('custom')).toBeInTheDocument()
  })

  it('hides empty custom counts', () => {
    const { container } = render(<Badge count="" />)

    expect(container.firstChild).toBeEmptyDOMElement()
  })
})
