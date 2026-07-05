import { render, waitFor } from '@testing-library/react'
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

    const firstTab = getByRole('tab', { name: 'First' })
    const secondTab = getByRole('tab', { name: 'Second' })
    const panel = getByRole('tabpanel')

    expect(firstTab).toHaveAttribute('aria-selected', 'true')
    expect(firstTab).toHaveAttribute('tabindex', '0')
    expect(secondTab).toHaveAttribute('tabindex', '-1')
    expect(panel).toHaveAttribute('aria-labelledby', firstTab.id)
    expect(firstTab).toHaveAttribute('aria-controls', panel.id)
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

  it('supports roving keyboard navigation and skips disabled tabs', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const keyboardItems = [
      { key: '1', label: 'First', content: <p>Panel one</p> },
      { key: '2', label: 'Second', content: <p>Panel two</p>, disabled: true },
      { key: '3', label: 'Third', content: <p>Panel three</p> },
    ]

    const { getByRole, queryByText } = render(
      <Tabs items={keyboardItems} defaultActiveKey="1" onChange={onChange} />,
    )

    const firstTab = getByRole('tab', { name: 'First' })
    const secondTab = getByRole('tab', { name: 'Second' })
    const thirdTab = getByRole('tab', { name: 'Third' })

    expect(secondTab).toBeDisabled()

    firstTab.focus()
    await user.keyboard('{ArrowRight}')

    await waitFor(() => expect(thirdTab).toHaveFocus())
    expect(thirdTab).toHaveAttribute('aria-selected', 'true')
    expect(queryByText('Panel three')).toBeInTheDocument()
    expect(onChange).toHaveBeenLastCalledWith('3')

    await user.keyboard('{ArrowLeft}')

    await waitFor(() => expect(firstTab).toHaveFocus())
    expect(firstTab).toHaveAttribute('aria-selected', 'true')
    expect(onChange).toHaveBeenLastCalledWith('1')

    await user.keyboard('{End}')
    await waitFor(() => expect(thirdTab).toHaveFocus())
    expect(thirdTab).toHaveAttribute('aria-selected', 'true')

    await user.keyboard('{Home}')
    await waitFor(() => expect(firstTab).toHaveFocus())
    expect(firstTab).toHaveAttribute('aria-selected', 'true')
  })
})
