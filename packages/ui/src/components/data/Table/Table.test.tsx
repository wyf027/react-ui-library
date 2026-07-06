import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Table } from './Table'

describe('Table', () => {
  const columns = [{ key: 'name' as const, title: 'Name' }]

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

  it('labels column filters and filters matching rows', async () => {
    const user = userEvent.setup()
    const dataSource = [
      { name: 'Alice', role: 'Admin' },
      { name: 'Bob', role: 'Editor' },
    ] as Record<string, unknown>[]

    render(
      <Table
        columns={[
          { key: 'name', title: 'Name' },
          {
            key: 'role',
            title: 'Role',
            filters: [
              { text: 'Admin', value: 'Admin' },
              { text: 'Editor', value: 'Editor' },
            ],
          },
        ]}
        dataSource={dataSource}
      />,
    )

    const filter = screen.getByRole('combobox', { name: 'Filter Role' })

    await user.selectOptions(filter, 'Admin')

    expect(filter).toHaveValue('Admin')
    expect(screen.getByRole('cell', { name: 'Alice' })).toBeInTheDocument()
    expect(screen.queryByRole('cell', { name: 'Bob' })).not.toBeInTheDocument()
  })

  it('exposes aria-sort on sortable headers and updates it when sorted', async () => {
    const user = userEvent.setup()
    const dataSource = [{ name: 'Grace' }, { name: 'Ada' }] as Record<string, unknown>[]

    render(
      <Table
        columns={[
          {
            key: 'name',
            title: 'Name',
            sorter: (a, b) => String(a.name).localeCompare(String(b.name)),
          },
        ]}
        dataSource={dataSource}
      />,
    )

    const header = screen.getByRole('columnheader', { name: /Name/ })
    expect(header).not.toHaveAttribute('aria-sort')

    await user.click(within(header).getByRole('button', { name: 'Sort Name ascending' }))

    expect(header).toHaveAttribute('aria-sort', 'ascending')
    expect(screen.getAllByRole('cell').map((cell) => cell.textContent)).toEqual(['Ada', 'Grace'])

    await user.click(within(header).getByRole('button', { name: 'Sort Name descending' }))

    expect(header).toHaveAttribute('aria-sort', 'descending')
    expect(screen.getAllByRole('cell').map((cell) => cell.textContent)).toEqual(['Grace', 'Ada'])
  })
})