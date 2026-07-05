import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Collapse } from './Collapse'

const items = [
  { key: 'intro', title: 'Introduction', content: 'Nova UI basics' },
  { key: 'usage', title: 'Usage', content: 'Install and import components' },
  { key: 'disabled', title: 'Disabled', content: 'Locked content', disabled: true },
]

describe('Collapse', () => {
  it('links each trigger to its controlled panel state', () => {
    render(<Collapse items={items} defaultActiveKey={['intro']} />)

    const introTrigger = screen.getByRole('button', { name: 'Introduction' })
    const usageTrigger = screen.getByRole('button', { name: 'Usage' })
    const introPanel = screen.getByRole('region', { name: 'Introduction' })

    expect(introTrigger).toHaveAttribute('aria-expanded', 'true')
    expect(introTrigger).toHaveAttribute('aria-controls', introPanel.id)
    expect(introPanel).toHaveAttribute('aria-labelledby', introTrigger.id)
    expect(usageTrigger).toHaveAttribute('aria-expanded', 'false')
  })

  it('toggles panels and reports active keys', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(<Collapse items={items} onChange={onChange} />)

    await user.click(screen.getByRole('button', { name: 'Introduction' }))
    expect(onChange).toHaveBeenCalledWith(['intro'])
    expect(screen.getByRole('button', { name: 'Introduction' })).toHaveAttribute(
      'aria-expanded',
      'true',
    )

    await user.click(screen.getByRole('button', { name: 'Usage' }))
    expect(onChange).toHaveBeenLastCalledWith(['intro', 'usage'])
    expect(screen.getByRole('region', { name: 'Usage' })).toBeInTheDocument()
  })

  it('keeps a single panel open in accordion mode', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(<Collapse items={items} defaultActiveKey={['intro']} accordion onChange={onChange} />)

    await user.click(screen.getByRole('button', { name: 'Usage' }))

    expect(onChange).toHaveBeenCalledWith(['usage'])
    expect(screen.queryByRole('region', { name: 'Introduction' })).not.toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'Usage' })).toBeInTheDocument()
  })

  it('does not toggle disabled panels', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(<Collapse items={items} onChange={onChange} />)

    const disabledTrigger = screen.getByRole('button', { name: 'Disabled' })
    expect(disabledTrigger).toBeDisabled()

    await user.click(disabledTrigger)

    expect(onChange).not.toHaveBeenCalled()
    expect(screen.queryByRole('region', { name: 'Disabled' })).not.toBeInTheDocument()
  })
})
