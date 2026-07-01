import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Popover } from './Popover'

describe('Popover', () => {
  it('shows content after trigger is clicked', async () => {
    const user = userEvent.setup()

    render(<Popover trigger={<span>Open me</span>} content={<span>Popover panel</span>} />)

    expect(screen.queryByText('Popover panel')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /Open me/i }))
    expect(screen.getByText('Popover panel')).toBeInTheDocument()
  })

  it('calls onOpen and onClose when toggling uncontrolled', async () => {
    const user = userEvent.setup()
    const onOpen = vi.fn()
    const onClose = vi.fn()

    render(
      <Popover
        trigger={<span>Toggle</span>}
        content={<span>Inside</span>}
        onOpen={onOpen}
        onClose={onClose}
      />,
    )

    await user.click(screen.getByRole('button', { name: /Toggle/i }))
    expect(onOpen).toHaveBeenCalledTimes(1)

    await user.click(screen.getByRole('button', { name: /Toggle/i }))
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
