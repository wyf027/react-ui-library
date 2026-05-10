import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Dropdown } from './Dropdown'

describe('Dropdown', () => {
  const options = [
    { key: 'a', label: 'Alpha' },
    { key: 'b', label: 'Beta' },
  ]

  it('opens menu and invokes onChange when an item is chosen', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(<Dropdown trigger={<span>Open menu</span>} options={options} onChange={onChange} />)

    await user.click(screen.getByRole('button', { name: /Open menu/i }))
    expect(screen.getByRole('menu')).toBeInTheDocument()

    await user.click(screen.getByRole('menuitem', { name: 'Beta' }))
    expect(onChange).toHaveBeenCalledWith('b')
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })
})
