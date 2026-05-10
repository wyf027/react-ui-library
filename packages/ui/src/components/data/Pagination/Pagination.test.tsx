import { useState } from 'react'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Pagination } from './Pagination'

describe('Pagination', () => {
  it('invokes onChange when a page button is clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(<Pagination current={1} total={25} pageSize={10} onChange={onChange} />)

    await user.click(screen.getByRole('button', { name: '2' }))

    expect(onChange).toHaveBeenCalledWith(2)
  })

  it('updates visible current page when parent re-renders with new current', async () => {
    const user = userEvent.setup()

    function Harness() {
      const [page, setPage] = useState(1)
      return (
        <div>
          <Pagination current={page} total={30} pageSize={10} onChange={setPage} />
          <span data-testid="cur">{page}</span>
        </div>
      )
    }

    render(<Harness />)
    expect(screen.getByTestId('cur')).toHaveTextContent('1')

    await user.click(screen.getByRole('button', { name: '2' }))
    expect(screen.getByTestId('cur')).toHaveTextContent('2')
    expect(screen.getByRole('button', { name: '2' })).toHaveAttribute('aria-current', 'page')
  })
})
