import { act, cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { Spin } from './Spin'

afterEach(() => {
  cleanup()
  vi.useRealTimers()
})

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

  it('delays the standalone loading status when delay is set', () => {
    vi.useFakeTimers()

    render(<Spin delay={200} />)

    expect(screen.queryByRole('status')).not.toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(199)
    })
    expect(screen.queryByRole('status')).not.toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(1)
    })
    expect(screen.getByRole('status', { name: 'Loading' })).toBeInTheDocument()
  })

  it('does not show a delayed spinner when spinning stops before delay ends', () => {
    vi.useFakeTimers()

    const { rerender } = render(<Spin delay={200} />)

    rerender(<Spin spinning={false} delay={200} />)

    act(() => {
      vi.advanceTimersByTime(200)
    })

    expect(screen.queryByRole('status')).not.toBeInTheDocument()
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

  it('marks wrapped content busy while a delayed overlay is pending', () => {
    vi.useFakeTimers()

    render(
      <Spin spinning delay={200} tip="Refreshing data">
        <section aria-label="Report panel">Report content</section>
      </Spin>,
    )

    const wrapper = screen.getByText('Report content').parentElement

    expect(wrapper).toHaveAttribute('aria-busy', 'true')
    expect(screen.queryByRole('status')).not.toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(200)
    })
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