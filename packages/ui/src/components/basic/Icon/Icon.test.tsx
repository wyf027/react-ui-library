import { createRef } from 'react'

import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Icon } from './Icon'

describe('Icon', () => {
  it('sets width and height from size', () => {
    const { container } = render(
      <Icon size={24}>
        <svg data-testid="svg-icon" />
      </Icon>,
    )
    const span = container.firstElementChild as HTMLSpanElement
    expect(span.style.width).toBe('24px')
    expect(span.style.height).toBe('24px')
  })

  it('renders bullet placeholder when children omitted', () => {
    render(<Icon />)
    expect(screen.getByText('•')).toBeTruthy()
  })

  it('defaults aria-hidden to true', () => {
    const { container } = render(<Icon />)
    const span = container.firstElementChild as HTMLSpanElement
    expect(span.getAttribute('aria-hidden')).toBe('true')
  })

  it('forwards ref to span', () => {
    const ref = createRef<HTMLSpanElement>()
    render(<Icon ref={ref} />)
    expect(ref.current?.tagName).toBe('SPAN')
  })

  it('sets data-icon when name provided', () => {
    const { container } = render(<Icon name="check" />)
    const span = container.firstElementChild as HTMLSpanElement
    expect(span.getAttribute('data-icon')).toBe('check')
  })

  it('adds animate-spin when spin is true', () => {
    const { container } = render(<Icon spin />)
    const span = container.firstElementChild as HTMLSpanElement
    expect(span.className).toMatch(/animate-spin/)
  })

  it('uses role img and aria-label when decorative is false', () => {
    const { container } = render(<Icon decorative={false} aria-label="Saved" />)
    const span = container.firstElementChild as HTMLSpanElement
    expect(span.getAttribute('aria-hidden')).not.toBe('true')
    expect(span.getAttribute('role')).toBe('img')
    expect(span.getAttribute('aria-label')).toBe('Saved')
  })
})
