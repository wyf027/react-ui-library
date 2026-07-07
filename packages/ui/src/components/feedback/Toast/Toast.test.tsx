import { act, cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { Toast } from './Toast'

afterEach(() => {
  cleanup()
  vi.useRealTimers()
})

describe('Toast', () => {
  it('renders advisory updates in a polite status region', () => {
    render(<Toast open>Saved successfully</Toast>)

    const toast = screen.getByRole('status')
    expect(toast).toHaveAttribute('aria-live', 'polite')
    expect(toast).toHaveTextContent('Saved successfully')
  })

  it('uses a 3000ms default auto-close duration', () => {
    vi.useFakeTimers()
    const onClose = vi.fn()

    render(
      <Toast open onClose={onClose}>
        Saved successfully
      </Toast>,
    )

    act(() => {
      vi.advanceTimersByTime(2999)
    })
    expect(onClose).not.toHaveBeenCalled()

    act(() => {
      vi.advanceTimersByTime(1)
    })
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('does not auto-close when duration is 0', () => {
    vi.useFakeTimers()
    const onClose = vi.fn()

    render(
      <Toast open duration={0} onClose={onClose}>
        Persistent message
      </Toast>,
    )

    act(() => {
      vi.advanceTimersByTime(10000)
    })

    expect(onClose).not.toHaveBeenCalled()
  })
})
