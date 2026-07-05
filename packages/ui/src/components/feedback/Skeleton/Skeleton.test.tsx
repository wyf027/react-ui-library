import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Skeleton } from './Skeleton'

describe('Skeleton', () => {
  it('announces loading placeholders as a polite busy status', () => {
    render(<Skeleton avatar paragraph={{ rows: 2 }} />)

    const status = screen.getByRole('status', { name: 'Loading content' })

    expect(status).toHaveAttribute('aria-busy', 'true')
    expect(status).toHaveAttribute('aria-live', 'polite')
    expect(status.querySelectorAll('[aria-hidden="true"]')).toHaveLength(4)
  })

  it('supports explicit accessible naming and live region priority', () => {
    render(<Skeleton aria-label="Profile loading" aria-live="assertive" />)

    const status = screen.getByRole('status', { name: 'Profile loading' })

    expect(status).toHaveAttribute('aria-live', 'assertive')
  })

  it('renders children without a loading status when loading is false', () => {
    render(
      <Skeleton loading={false}>
        <article>Loaded profile</article>
      </Skeleton>,
    )

    expect(screen.getByText('Loaded profile')).toBeInTheDocument()
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })
})
