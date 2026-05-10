import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Divider } from './Divider'

describe('Divider', () => {
  it('exposes separator semantics', () => {
    const { container } = render(<Divider />)
    expect(container.querySelector('[role="separator"]')).toBeTruthy()
  })
})
