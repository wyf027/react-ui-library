import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Spin } from './Spin'

describe('Spin', () => {
  it('announces standalone loading state as a polite status', () => {
    render(<Spin />)

    const status = screen.getByRole('status', { name: 'Loading' })

    expect(status).toHaveAttribute('aria-live', 'polite')
    expect(status.querySelector('[aria-hidden="true"]')).toBeInTheDocument()
  })

  it('uses string tip as the accessible loading name', () => {
    render(<Spin tip="Loading invoices" />)

    expect(screen.getByRole('status', { name: 'Loading invoices' })).toBeInTheDocument()
    expect(screen.getByText('Loading invoices')).toBeInTheDocument()
  })

  it('marks wrapped content busy while the overlay is spinning', () => {
    render(
      <Spin spinning tip="Refreshing data">
        <section aria-label="Report panel">Report content</section>
      </Spin>,
    )

    const wrapper = screen.getByText('Report content').parentElement

    expect(wrapper).toHaveAttribute('aria-busy', 'true')
    expect(screen.getByRole('status', { name: 'Refreshing data' })).toBeInTheDocument()
  })

  it('marks wrapped content not busy and hides status when spinning stops', () => {
    render(
      <Spin spinning={false}>
        <section>Loaded content</section>
      </Spin>,
    )

    const wrapper = screen.getByText('Loaded content').parentElement

    expect(wrapper).toHaveAttribute('aria-busy', 'false')
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })
})
