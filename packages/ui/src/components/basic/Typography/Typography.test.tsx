import { createRef } from 'react'

import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Paragraph, Text, Title } from './Typography'

describe('Typography — Title', () => {
  it('renders h2 by default with level 2', () => {
    render(<Title>Section</Title>)
    const heading = screen.getByRole('heading', { level: 2, name: 'Section' })
    expect(heading.tagName).toBe('H2')
  })

  it('maps level to heading tag', () => {
    const { rerender } = render(<Title level={1}>A</Title>)
    expect(screen.getByRole('heading', { level: 1 }).tagName).toBe('H1')
    rerender(<Title level={5}>A</Title>)
    expect(screen.getByRole('heading', { level: 5 }).tagName).toBe('H5')
  })

  it('forwards ref to heading element', () => {
    const ref = createRef<HTMLHeadingElement>()
    render(<Title ref={ref}>X</Title>)
    expect(ref.current?.tagName).toMatch(/^H[1-5]$/)
  })

  it('applies truncation classes when ellipsis', () => {
    render(<Title ellipsis>Long</Title>)
    const heading = screen.getByRole('heading', { name: 'Long' })
    expect(heading.className).toMatch(/truncate/)
    expect(heading.className).toMatch(/min-w-0/)
  })

  it('sets native title from string children when ellipsis and title omitted', () => {
    const label = 'Very long heading text that truncates'
    render(<Title ellipsis>{label}</Title>)
    expect(screen.getByRole('heading')).toHaveAttribute('title', label)
  })
})

describe('Typography — Text', () => {
  it('renders span with body classes', () => {
    const { container } = render(<Text data-testid="t">hello</Text>)
    const span = screen.getByTestId('t')
    expect(span.tagName).toBe('SPAN')
    expect(span.className).toContain('text-sm')
    expect(container.textContent).toContain('hello')
  })

  it('applies truncation when ellipsis', () => {
    render(<Text ellipsis data-testid="txt">hello world</Text>)
    const span = screen.getByTestId('txt')
    expect(span.className).toMatch(/truncate/)
    expect(span.className).toMatch(/min-w-0/)
  })

  it('sets native title from string children when ellipsis', () => {
    const s = 'Auxiliary copy that may overflow in narrow layouts'
    render(<Text ellipsis>{s}</Text>)
    expect(screen.getByText(s)).toHaveAttribute('title', s)
  })
})

describe('Typography — Paragraph', () => {
  it('renders p element', () => {
    render(<Paragraph>para</Paragraph>)
    expect(screen.getByText('para').tagName).toBe('P')
  })
})
