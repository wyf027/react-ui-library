import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Mentions } from './Mentions'

describe('Mentions', () => {
  const options = [{ value: 'alice' }, { value: 'bob' }]

  it('associates visible suggestions with the textarea description', () => {
    render(<Mentions aria-label="Team mentions" options={options} />)

    const textarea = screen.getByRole('textbox', { name: 'Team mentions' })

    expect(textarea).toHaveAccessibleDescription('Suggestions: @alice @bob')
  })

  it('preserves external descriptions when suggestions are present', () => {
    render(
      <>
        <span id="mentions-help">Use @ to mention teammates.</span>
        <Mentions aria-label="Team mentions" aria-describedby="mentions-help" options={options} />
      </>,
    )

    const textarea = screen.getByRole('textbox', { name: 'Team mentions' })

    expect(textarea).toHaveAccessibleDescription(
      'Use @ to mention teammates. Suggestions: @alice @bob',
    )
  })

  it('calls onChange with the textarea value', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(<Mentions aria-label="Comment" onChange={onChange} />)

    await user.type(screen.getByRole('textbox', { name: 'Comment' }), '@a')

    expect(onChange).toHaveBeenLastCalledWith('@a')
  })
})
