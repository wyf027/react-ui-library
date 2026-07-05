import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Badge } from './Badge'

describe('Badge', () => {
  it('caps numeric counts with overflowCount', () => {
    render(
      <Badge count={120} overflowCount={99}>
        <span>Inbox</span>
      </Badge>,
    )

    expect(screen.getByText('99+')).toBeInTheDocument()
  })

  it('does not render zero by default unless showZero is set', () => {
    const { rerender } = render(
      <Badge count={0}>
        <span>Inbox</span>
      </Badge>,
    )

    expect(screen.queryByText('0')).not.toBeInTheDocument()

    rerender(
      <Badge count={0} showZero>
        <span>Inbox</span>
      </Badge>,
    )

    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('renders custom count content without applying numeric overflow rules', () => {
    render(
      <Badge count={<span data-testid="custom-count">new</span>} overflowCount={1}>
        <span>Inbox</span>
      </Badge>,
    )

    expect(screen.getByTestId('custom-count')).toHaveTextContent('new')
    expect(screen.queryByText('1+')).not.toBeInTheDocument()
  })
})
