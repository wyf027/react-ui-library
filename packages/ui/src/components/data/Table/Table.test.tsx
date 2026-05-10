import { fireEvent, render, screen } from '@testing-library/react'
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
})
