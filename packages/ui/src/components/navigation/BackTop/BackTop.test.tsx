import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { BackTop } from './BackTop'

const setScrollY = (value: number) => {
  Object.defineProperty(window, 'scrollY', {
    configurable: true,
    value,
  })
  act(() => {
    window.dispatchEvent(new Event('scroll'))
  })
}

beforeEach(() => {
  Object.defineProperty(window, 'scrollTo', {
    configurable: true,
    value: vi.fn(),
  })
  setScrollY(0)
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('BackTop', () => {
  it('stays hidden until the visibility height is exceeded', () => {
    render(<BackTop visibilityHeight={200} />)

    expect(screen.queryByRole('button')).not.toBeInTheDocument()

    setScrollY(201)

    expect(screen.getByRole('button', { name: 'Back to top' })).toBeInTheDocument()
  })

  it('scrolls to the top and preserves caller click handlers', () => {
    const onClick = vi.fn()
    render(<BackTop visibilityHeight={0} onClick={onClick} />)
    setScrollY(1)

    fireEvent.click(screen.getByRole('button', { name: 'Back to top' }))

    expect(onClick).toHaveBeenCalledTimes(1)
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
  })

  it('lets callers prevent the default scroll behavior', () => {
    render(
      <BackTop
        visibilityHeight={0}
        onClick={(event) => {
          event.preventDefault()
        }}
      />,
    )
    setScrollY(1)

    fireEvent.click(screen.getByRole('button', { name: 'Back to top' }))

    expect(window.scrollTo).not.toHaveBeenCalled()
  })

  it('supports a custom accessible name and visible content', () => {
    render(
      <BackTop visibilityHeight={0} aria-label="Return to page top">
        Up
      </BackTop>,
    )
    setScrollY(1)

    const button = screen.getByRole('button', { name: 'Return to page top' })

    expect(button).toHaveTextContent('Up')
  })
})
