import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Select } from './Select'

describe('Select', () => {
  const options = [
    { label: 'One', value: '1' },
    { label: 'Two', value: '2' },
  ]

  it('associates label with select via htmlFor', () => {
    const { getByLabelText } = render(<Select label="Country" options={options} placeholder="Pick" />)
    expect(getByLabelText('Country')).toBeInTheDocument()
  })

  it('uses defaultValue for initial selection when uncontrolled', () => {
    const { getByRole } = render(<Select options={options} defaultValue="2" aria-label="Pick number" />)
    expect(getByRole('combobox', { name: 'Pick number' })).toHaveValue('2')
  })

  it('calls onChange when selection changes in controlled mode', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    function Controlled() {
      return <Select options={options} value="1" onChange={onChange} aria-label="Controlled select" />
    }

    const { getByRole } = render(<Controlled />)
    await user.selectOptions(getByRole('combobox', { name: 'Controlled select' }), '2')

    expect(onChange).toHaveBeenCalledWith('2')
  })
})
