import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Result } from './Result'

describe('Result', () => {
  it('renders semantic title and subtitle content', () => {
    render(
      <Result
        status="success"
        title="Operation complete"
        subTitle="The workflow finished without errors."
      />,
    )

    expect(
      screen.getByRole('heading', { level: 3, name: 'Operation complete' }),
    ).toBeInTheDocument()
    expect(screen.getByText('The workflow finished without errors.')).toBeInTheDocument()
  })

  it('hides the built-in status icon from assistive technology by default', () => {
    render(<Result status="success" title="Saved" />)

    expect(screen.getByText('✅')).toHaveAttribute('aria-hidden', 'true')
  })

  it('allows consumers to expose the status icon when it carries meaning', () => {
    render(<Result status="warning" title="Review required" iconAriaHidden={false} />)

    expect(screen.getByText('⚠️')).toHaveAttribute('aria-hidden', 'false')
  })

  it('renders extra actions', () => {
    render(<Result title="Ready" extra={<button type="button">Continue</button>} />)

    expect(screen.getByRole('button', { name: 'Continue' })).toBeInTheDocument()
  })
})
