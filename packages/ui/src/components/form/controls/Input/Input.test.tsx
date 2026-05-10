import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Input } from './Input'

describe('Input', () => {
  it('associates label with input', () => {
    const { getByLabelText } = render(<Input label="Email" defaultValue="" />)
    expect(getByLabelText('Email')).toBeInTheDocument()
  })

  it('shows defaultValue when uncontrolled', () => {
    const { getByRole } = render(<Input defaultValue="hello" aria-label="Uncontrolled field" />)
    expect(getByRole('textbox', { name: 'Uncontrolled field' })).toHaveValue('hello')
  })

  it('calls onValueChange when typing in controlled mode', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()

    function Controlled() {
      return <Input value="" onValueChange={onValueChange} aria-label="Controlled field" />
    }

    const { getByRole } = render(<Controlled />)
    await user.type(getByRole('textbox', { name: 'Controlled field' }), 'hi')

    const typed = onValueChange.mock.calls.map((call) => call[0] as string).join('')
    expect(typed).toBe('hi')
  })

  it('renders error in an alert region', () => {
    const { getByRole } = render(<Input error="Bad input" aria-label="Error field" />)
    expect(getByRole('alert')).toHaveTextContent('Bad input')
  })

  it('renders prefix and suffix', () => {
    const { getByText, getByRole } = render(<Input prefix="$" suffix="USD" aria-label="Amount field" />)
    expect(getByText('$')).toBeInTheDocument()
    expect(getByText('USD')).toBeInTheDocument()
    expect(getByRole('textbox', { name: 'Amount field' })).toBeInTheDocument()
  })

  it('disables the input', () => {
    const { getByRole } = render(<Input disabled defaultValue="x" aria-label="Disabled field" />)
    expect(getByRole('textbox', { name: 'Disabled field' })).toBeDisabled()
  })
})
