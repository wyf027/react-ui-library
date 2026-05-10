import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Tooltip } from './Tooltip'

describe('Tooltip', () => {
  it('shows tooltip content on hover', async () => {
    const user = userEvent.setup()

    render(
      <Tooltip content="Help text">
        <span>Target</span>
      </Tooltip>,
    )

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()

    await user.hover(screen.getByText('Target'))
    expect(await screen.findByRole('tooltip')).toHaveTextContent('Help text')
  })

  it('does not show tooltip when disabled', async () => {
    const user = userEvent.setup()

    render(
      <Tooltip content="Hidden" disabled>
        <span>No tip</span>
      </Tooltip>,
    )

    await user.hover(screen.getByText('No tip'))

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })
})
