import { act, cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { Notification } from './Notification'

afterEach(() => {
  cleanup()
  vi.useRealTimers()
})

describe('Notification', () => {
  it('renders an alert region with title and description', () => {
    render(<Notification title="Published" description="The package is live." />)

    const notification = screen.getByRole('alert')
    expect(notification).toHaveTextContent('Published')
    expect(notification).toHaveTextContent('The package is live.')
    expect(screen.getByRole('button', { name: 'Close notification' })).toBeInTheDocument()
  })

  it('hides when the close button is clicked in uncontrolled mode', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()

    render(<Notification title="Published" onClose={onClose} />)

    await user.click(screen.getByRole('button', { name: 'Close notification' }))

    expect(onClose).toHaveBeenCalledTimes(1)
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('keeps controlled notifications open until open changes', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()

    render(<Notification open title="Controlled" onClose={onClose} />)

    await user.click(screen.getByRole('button', { name: 'Close notification' }))

    expect(onClose).toHaveBeenCalledTimes(1)
    expect(screen.getByRole('alert')).toHaveTextContent('Controlled')
  })

  it('auto-closes uncontrolled notifications after duration', () => {
    vi.useFakeTimers()
    const onClose = vi.fn()

    render(<Notification title="Timed" duration={4500} onClose={onClose} />)

    act(() => {
      vi.advanceTimersByTime(4499)
    })
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(onClose).not.toHaveBeenCalled()

    act(() => {
      vi.advanceTimersByTime(1)
    })
    expect(onClose).toHaveBeenCalledTimes(1)
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('does not auto-close when duration is 0', () => {
    vi.useFakeTimers()
    const onClose = vi.fn()

    render(<Notification title="Persistent" duration={0} onClose={onClose} />)

    act(() => {
      vi.advanceTimersByTime(10000)
    })

    expect(onClose).not.toHaveBeenCalled()
    expect(screen.getByRole('alert')).toHaveTextContent('Persistent')
  })
})
