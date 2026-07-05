import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Timeline, type TimelineItem } from './Timeline'

const items: TimelineItem[] = [
  { key: '1', title: 'Created', timestamp: '09:00' },
  { key: '2', title: 'Reviewed', description: 'QA approved', timestamp: '10:00', color: 'success' },
  { key: '3', title: 'Published', timestamp: '11:00', color: 'brand' },
]

describe('Timeline', () => {
  it('renders timeline items with timestamps and descriptions', () => {
    render(<Timeline items={items} />)

    const rows = screen.getAllByRole('listitem')

    expect(rows).toHaveLength(3)
    expect(within(rows[0]).getByText('09:00')).toBeInTheDocument()
    expect(within(rows[0]).getByText('Created')).toBeInTheDocument()
    expect(within(rows[1]).getByText('QA approved')).toBeInTheDocument()
  })

  it('supports reverse rendering without mutating the input items', () => {
    render(<Timeline items={items} reverse />)

    const rows = screen.getAllByRole('listitem')

    expect(within(rows[0]).getByText('Published')).toBeInTheDocument()
    expect(items.map((item) => item.key)).toEqual(['1', '2', '3'])
  })

  it('marks default timeline dots as decorative', () => {
    const { container } = render(<Timeline items={[items[0]]} />)

    const dot = container.querySelector('li > span')

    if (!dot) {
      throw new Error('Expected Timeline to render a default dot.')
    }

    expect(dot).toHaveAttribute('aria-hidden', 'true')
  })
})
