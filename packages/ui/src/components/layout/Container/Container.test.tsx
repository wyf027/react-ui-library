import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Container } from './Container'

describe('Container', () => {
  it('applies default max width preset', () => {
    const { container } = render(<Container>child</Container>)
    const root = container.firstChild as HTMLElement
    expect(root.className).toContain('max-w-7xl')
    expect(root.className).toContain('mx-auto')
  })

  it('uses full width when fluid', () => {
    const { container } = render(<Container fluid>child</Container>)
    const root = container.firstChild as HTMLElement
    expect(root.className).toContain('max-w-full')
    expect(root.className).not.toContain('mx-auto')
  })

  it('renders semantic root via component prop', () => {
    render(<Container component="main">main content</Container>)
    expect(screen.getByRole('main')).toHaveTextContent('main content')
  })
})
