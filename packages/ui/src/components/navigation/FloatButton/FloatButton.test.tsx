import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { FloatButton } from '../../../index'

describe('FloatButton', () => {
  it('uses tooltip as the accessible name for icon-only buttons', () => {
    render(<FloatButton tooltip="Create item" />)

    const button = screen.getByRole('button', { name: 'Create item' })

    expect(button).toHaveAttribute('title', 'Create item')
    expect(button).toHaveAttribute('aria-label', 'Create item')
  })

  it('lets aria-label override tooltip text', () => {
    render(<FloatButton tooltip="Add" aria-label="Create project" />)

    expect(screen.getByRole('button', { name: 'Create project' })).toHaveAttribute(
      'title',
      'Add',
    )
  })

  it('keeps visible text as the accessible name when no tooltip is provided', () => {
    render(<FloatButton>Help</FloatButton>)

    const button = screen.getByRole('button', { name: 'Help' })

    expect(button).not.toHaveAttribute('aria-label')
  })
})
