import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Space } from './Space'

describe('Space', () => {
  it('injects split between children', () => {
    const { getByTestId } = render(
      <Space split={<span data-testid="split">|</span>}>
        <span>a</span>
        <span>b</span>
      </Space>,
    )
    expect(getByTestId('split')).toBeTruthy()
  })
})
