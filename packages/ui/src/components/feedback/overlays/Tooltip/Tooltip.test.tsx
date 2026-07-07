import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Tooltip } from './Tooltip'

describe('Tooltip', () => {
  it('shows tooltip content on hover', async () => {
    const user = userEvent.setup()

    render(
      <Tooltip content="Help text">
        <span>Target</span>
      </Tooltip>,
    )

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()

    await user.hover(screen.getByText('Target'))
    expect(await screen.findByRole('tooltip')).toHaveTextContent('Help text')
  })

  it('positions tooltip below the trigger by default', async () => {
    const user = userEvent.setup()

    render(
      <Tooltip content="Default placement">
        <button type="button">Default</button>
      </Tooltip>,
    )

    await user.hover(screen.getByRole('button', { name: 'Default' }))

    expect(await screen.findByRole('tooltip')).toHaveClass('top-full', 'mt-2')
  })

  it('supports custom placement', async () => {
    const user = userEvent.setup()

    render(
      <Tooltip content="Left placement" placement="left">
        <button type="button">Left aligned</button>
      </Tooltip>,
    )

    await user.hover(screen.getByRole('button', { name: 'Left aligned' }))

    expect(await screen.findByRole('tooltip')).toHaveClass(
      'right-full',
      'mr-2',
      '-translate-y-1/2',
    )
  })

  it('links focused trigger to tooltip content', async () => {
    const user = userEvent.setup()

    render(
      <Tooltip content="Save changes">
        <button type="button">Save</button>
      </Tooltip>,
    )

    await user.tab()

    const tooltip = await screen.findByRole('tooltip')
    expect(screen.getByRole('button', { name: 'Save' })).toHaveAttribute(
      'aria-describedby',
      tooltip.id,
    )
  })

  it('preserves existing trigger descriptions when tooltip opens', async () => {
    const user = userEvent.setup()

    render(
      <>
        <span id="external-help">External help</span>
        <Tooltip content="More help">
          <button type="button" aria-describedby="external-help">
            More
          </button>
        </Tooltip>
      </>,
    )

    await user.tab()

    const tooltip = await screen.findByRole('tooltip')
    expect(screen.getByRole('button', { name: 'More' })).toHaveAttribute(
      'aria-describedby',
      `external-help ${tooltip.id}`,
    )
  })

  it('closes tooltip with Escape', async () => {
    const user = userEvent.setup()

    render(
      <Tooltip content="Keyboard help">
        <button type="button">Focus me</button>
      </Tooltip>,
    )

    await user.tab()
    expect(await screen.findByRole('tooltip')).toHaveTextContent('Keyboard help')

    await user.keyboard('{Escape}')

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })

  it('does not show tooltip when disabled', async () => {
    const user = userEvent.setup()

    render(
      <Tooltip content="Hidden" disabled>
        <span>No tip</span>
      </Tooltip>,
    )

    await user.hover(screen.getByText('No tip'))

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })
})
