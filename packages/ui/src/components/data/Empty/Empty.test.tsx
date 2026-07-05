import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Empty } from './Empty'

describe('Empty', () => {
  it('renders the empty description while hiding the default decorative image', () => {
    render(<Empty description="No records" />)

    expect(screen.getByText('No records')).toBeInTheDocument()
    expect(screen.getByText('📭')).toHaveAttribute('aria-hidden', 'true')
  })

  it('hides custom image content by default because the description names the empty state', () => {
    render(<Empty description="No documents" image={<span data-testid="empty-icon">📄</span>} />)

    expect(screen.getByTestId('empty-icon').parentElement).toHaveAttribute('aria-hidden', 'true')
  })

  it('allows custom image content to stay exposed when requested', () => {
    render(
      <Empty
        description="No documents"
        image={<span data-testid="empty-icon">📄</span>}
        imageAriaHidden={false}
      />,
    )

    expect(screen.getByTestId('empty-icon').parentElement).toHaveAttribute('aria-hidden', 'false')
  })

  it('keeps extra actions available to assistive technology', () => {
    render(
      <Empty description="No projects">
        <button type="button">Create project</button>
      </Empty>,
    )

    expect(screen.getByRole('button', { name: 'Create project' })).toBeInTheDocument()
  })
})
