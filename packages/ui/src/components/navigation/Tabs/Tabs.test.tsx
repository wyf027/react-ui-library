import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Tabs } from './Tabs'

describe('Tabs', () => {
  const items = [
    { key: '1', label: 'First', content: <p>Panel one</p> },
    { key: '2', label: 'Second', content: <p>Panel two</p> },
  ]

  it('shows only the active tab panel', () => {
    const { getByRole, queryByText } = render(<Tabs items={items} defaultActiveKey="1" />)

    expect(getByRole('tab', { name: 'First' })).toHaveAttribute('aria-selected', 'true')
    expect(queryByText('Panel one')).toBeInTheDocument()
    expect(queryByText('Panel two')).not.toBeInTheDocument()
  })

  it('switches panel when another tab is clicked', async () => {
    const user = userEvent.setup()
    const { getByRole, queryByText } = render(<Tabs items={items} defaultActiveKey="1" />)

    await user.click(getByRole('tab', { name: 'Second' }))

    expect(getByRole('tab', { name: 'Second' })).toHaveAttribute('aria-selected', 'true')
    expect(queryByText('Panel two')).toBeInTheDocument()
    expect(queryByText('Panel one')).not.toBeInTheDocument()
  })

  it('calls onChange when tab changes', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    const { getByRole } = render(<Tabs items={items} defaultActiveKey="1" onChange={onChange} />)

    await user.click(getByRole('tab', { name: 'Second' }))
    expect(onChange).toHaveBeenCalledWith('2')
  })
})
