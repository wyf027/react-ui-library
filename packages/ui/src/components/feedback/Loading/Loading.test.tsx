import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Loading } from './Loading'

describe('Loading', () => {
  it('renders a polite status with decorative spinner hidden from assistive tech', () => {
    render(<Loading />)

    const status = screen.getByRole('status')

    expect(status).toHaveAttribute('aria-live', 'polite')
    expect(screen.getByText('Loading...')).toBeInTheDocument()
    expect(status.querySelector('[aria-hidden="true"]')).toBeInTheDocument()
  })

  it('supports an explicit accessible name and live region priority', () => {
    render(<Loading text="Fetching records" aria-label="Records loading" aria-live="assertive" />)

    const status = screen.getByRole('status', { name: 'Records loading' })

    expect(status).toHaveAttribute('aria-live', 'assertive')
    expect(screen.getByText('Fetching records')).toBeInTheDocument()
  })
})
