import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { AutoComplete } from './AutoComplete'

describe('AutoComplete', () => {
  const options = [
    { label: 'Beijing', value: 'beijing' },
    { label: 'Shanghai', value: 'shanghai' },
    { label: 'Shenzhen', value: 'shenzhen' },
  ]

  it('exposes combobox and listbox semantics when focused', async () => {
    const user = userEvent.setup()

    render(<AutoComplete aria-label="City" options={options} />)

    const input = screen.getByRole('combobox', { name: 'City' })
    expect(input).toHaveAttribute('aria-expanded', 'false')

    await user.click(input)

    expect(input).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('listbox')).toBeInTheDocument()
    expect(screen.getAllByRole('option')).toHaveLength(options.length)
  })

  it('selects the active option with the keyboard', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const onSelect = vi.fn()

    render(
      <AutoComplete aria-label="City" options={options} onChange={onChange} onSelect={onSelect} />,
    )

    const input = screen.getByRole('combobox', { name: 'City' })

    await user.click(input)
    await waitFor(() => expect(input).toHaveAttribute('aria-activedescendant'))
    await user.keyboard('{ArrowDown}{Enter}')

    expect(onChange).toHaveBeenLastCalledWith('shanghai')
    expect(onSelect).toHaveBeenCalledWith('shanghai')
    expect(input).toHaveValue('shanghai')
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('closes the listbox with Escape', async () => {
    const user = userEvent.setup()

    render(<AutoComplete aria-label="City" options={options} />)

    const input = screen.getByRole('combobox', { name: 'City' })

    await user.click(input)
    expect(screen.getByRole('listbox')).toBeInTheDocument()

    await user.keyboard('{Escape}')

    expect(input).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })
})
