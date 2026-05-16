import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Table } from './Table'

describe('Table', () => {
  const columns = [{ key: 'name' as const, title: 'Name' }]

  it('renders caption when provided', () => {
    render(
      <Table columns={columns} dataSource={[{ name: 'Ada' }] as Record<string, unknown>[]} caption="Team roster" />,
    )

    expect(screen.getByRole('table', { name: 'Team roster' })).toBeInTheDocument()
  })

  it('sets aria-sort on sortable columns', () => {
    const sortColumns = [
      {
        key: 'name' as const,
        title: 'Name',
        sorter: (a: Record<string, unknown>, b: Record<string, unknown>) =>
          String(a.name).localeCompare(String(b.name)),
      },
    ]
    const dataSource = [{ name: 'Ada' }, { name: 'Bob' }] as Record<string, unknown>[]

    render(<Table columns={sortColumns} dataSource={dataSource} />)

    const nameHeader = screen.getByRole('columnheader', { name: /Name/ })
    expect(nameHeader).toHaveAttribute('aria-sort', 'none')

    fireEvent.click(within(nameHeader).getByRole('button', { name: /Sort column name/i }))
    expect(nameHeader).toHaveAttribute('aria-sort', 'ascending')

    fireEvent.click(within(nameHeader).getByRole('button', { name: /Sort column name/i }))
    expect(nameHeader).toHaveAttribute('aria-sort', 'descending')
  })

  it('renders pagination nav and calls onChange', () => {
    const onChange = vi.fn()
    render(
      <Table
        columns={columns}
        dataSource={[{ name: 'A' }, { name: 'B' }] as Record<string, unknown>[]}
        pagination={{ current: 1, pageSize: 1, total: 2, onChange }}
      />,
    )

    expect(screen.getByRole('navigation', { name: 'Table pagination' })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    expect(onChange).toHaveBeenCalledWith(2, 1)
  })

  it('shows loading state instead of rows', () => {
    render(<Table columns={columns} dataSource={[{ name: 'Ada' }] as Record<string, unknown>[]} loading />)

    expect(screen.getByRole('table')).toHaveAttribute('aria-busy', 'true')
    expect(screen.getByRole('status')).toBeInTheDocument()
    expect(screen.queryByRole('cell', { name: 'Ada' })).not.toBeInTheDocument()
  })

  it('renders column headers and cell values', () => {
    const dataSource = [{ name: 'Ada' }] as Record<string, unknown>[]

    render(<Table columns={columns} dataSource={dataSource} />)

    expect(screen.getByRole('columnheader', { name: 'Name' })).toBeInTheDocument()
    expect(screen.getByRole('cell', { name: 'Ada' })).toBeInTheDocument()
  })

  it('shows emptyText when there are no rows', () => {
    render(<Table columns={columns} dataSource={[]} emptyText="Nothing here" />)

    expect(screen.getByText('Nothing here')).toBeInTheDocument()
  })

  it('filters rows when searchable and search input matches', () => {
    const dataSource = [{ name: 'apple' }, { name: 'banana' }] as Record<string, unknown>[]

    render(<Table columns={columns} dataSource={dataSource} searchable />)

    fireEvent.change(screen.getByPlaceholderText('Search...'), { target: { value: 'ban' } })

    expect(screen.getByRole('cell', { name: 'banana' })).toBeInTheDocument()
    expect(screen.queryByRole('cell', { name: 'apple' })).not.toBeInTheDocument()
  })
})
