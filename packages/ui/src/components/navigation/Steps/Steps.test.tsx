import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Steps } from './Steps'

const items = [
  { key: 'create', title: 'Create', description: 'Start the request' },
  { key: 'review', title: 'Review', description: 'Check details' },
  { key: 'done', title: 'Done', description: 'Complete' },
]

describe('Steps', () => {
  it('renders a labelled ordered list of steps', () => {
    render(<Steps items={items} current={1} />)

    const list = screen.getByRole('list', { name: 'Steps' })
    const steps = within(list).getAllByRole('listitem')

    expect(steps).toHaveLength(3)
    expect(within(steps[0]).getByText('Create')).toBeInTheDocument()
    expect(within(steps[1]).getByText('Review')).toBeInTheDocument()
  })

  it('marks the active item as the current step', () => {
    render(<Steps items={items} current={1} />)

    const steps = screen.getAllByRole('listitem')

    expect(steps[0]).not.toHaveAttribute('aria-current')
    expect(steps[1]).toHaveAttribute('aria-current', 'step')
    expect(steps[2]).not.toHaveAttribute('aria-current')
  })

  it('announces completed, current, and upcoming status text', () => {
    render(<Steps items={items} current={1} />)

    expect(screen.getByText('Completed step:', { selector: '.sr-only' })).toBeInTheDocument()
    expect(screen.getByText('Current step:', { selector: '.sr-only' })).toBeInTheDocument()
    expect(screen.getByText('Upcoming step:', { selector: '.sr-only' })).toBeInTheDocument()
  })

  it('allows a custom accessible list name', () => {
    render(<Steps aria-label="Checkout progress" items={items} current={2} />)

    expect(screen.getByRole('list', { name: 'Checkout progress' })).toBeInTheDocument()
  })
})
