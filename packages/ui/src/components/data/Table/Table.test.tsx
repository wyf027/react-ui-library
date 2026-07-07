import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

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

  it('labels the search input and filters matching rows', () => {
    const dataSource = [{ name: 'apple' }, { name: 'banana' }] as Record<string, unknown>[]

    render(<Table columns={columns} dataSource={dataSource} title="Fruit" searchable />)

    fireEvent.change(screen.getByRole('textbox', { name: 'Search Fruit' }), {
      target: { value: 'ban' },
    })

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

  it('labels internal pagination controls and reports the current page', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const dataSource = [{ name: 'Ada' }, { name: 'Grace' }] as Record<string, unknown>[]

    render(
      <Table
        columns={columns}
        dataSource={dataSource}
        title="Users"
        pagination={{ current: 2, pageSize: 1, total: 3, onChange }}
      />,
    )

    const pagination = screen.getByRole('navigation', { name: 'Users pagination' })
    expect(within(pagination).getByText('Page 2 / 3')).toHaveAttribute('aria-live', 'polite')

    await user.click(within(pagination).getByRole('button', { name: 'Previous table page' }))
    expect(onChange).toHaveBeenCalledWith(1, 1)

    await user.click(within(pagination).getByRole('button', { name: 'Next table page' }))
    expect(onChange).toHaveBeenCalledWith(3, 1)
  })
})