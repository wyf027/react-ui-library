import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Card } from './Card'

describe('Card', () => {
  it('renders title and children', () => {
    render(
      <Card title="Overview">
        <p>Body content</p>
      </Card>,
    )

    expect(screen.getByRole('heading', { level: 3, name: 'Overview' })).toBeInTheDocument()
    expect(screen.getByText('Body content')).toBeInTheDocument()
  })
})
