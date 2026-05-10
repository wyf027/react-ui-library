import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Button } from './Button'

describe('Button', () => {
  it('applies outline neutral surface classes', () => {
    render(
      <Button variant="outline" color="neutral">
        Label
      </Button>,
    )
    const el = screen.getByRole('button', { name: 'Label' })
    expect(el.className).toContain('border-slate-300')
  })
})
