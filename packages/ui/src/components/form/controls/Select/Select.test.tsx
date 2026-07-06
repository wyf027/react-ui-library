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

  it('associates helper text with the select description', () => {
    const { getByRole } = render(
      <Select label="Country" helperText="Choose the billing country." options={options} />,
    )

    expect(getByRole('combobox', { name: 'Country' })).toHaveAccessibleDescription(
      'Choose the billing country.',
    )
  })

  it('preserves custom descriptions when helper text is present', () => {
    const { getByRole } = render(
      <>
        <span id="external-help">Required for tax calculation.</span>
        <Select
          label="Country"
          helperText="Choose the billing country."
          options={options}
          aria-describedby="external-help"
        />
      </>,
    )

    expect(getByRole('combobox', { name: 'Country' })).toHaveAccessibleDescription(
      'Required for tax calculation. Choose the billing country.',
    )
  })

  it('renders error in an alert region and marks the select invalid', () => {
    const { getByRole } = render(
      <Select label="Country" error="Select a country." options={options} />,
    )
    const select = getByRole('combobox', { name: 'Country' })

    expect(getByRole('alert')).toHaveTextContent('Select a country.')
    expect(select).toHaveAttribute('aria-invalid', 'true')
    expect(select).toHaveAccessibleDescription('Select a country.')
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

  it('calls onNativeChange with the select change event', async () => {
    const user = userEvent.setup()
    const onNativeChange = vi.fn()

    const { getByRole } = render(
      <Select options={options} onNativeChange={onNativeChange} aria-label="Native select" />,
    )

    await user.selectOptions(getByRole('combobox', { name: 'Native select' }), '2')

    expect(onNativeChange).toHaveBeenCalledTimes(1)
    expect(onNativeChange.mock.calls[0][0].target).toHaveValue('2')
  })
})
