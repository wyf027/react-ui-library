import type { ReactNode, TableHTMLAttributes } from 'react'

export type TableKey<T> = Extract<keyof T, string>

export interface TableColumn<T, K extends TableKey<T> = TableKey<T>> {
  key: K
  title: ReactNode
  width?: number | string
  sorter?: (a: T, b: T) => number
  sortOrder?: 'asc' | 'desc'
  filters?: { text: string; value: string }[]
  filteredValue?: string
  render?: (value: unknown, record: T, index: number) => ReactNode
}

export interface TableSorter<T> {
  columnKey?: keyof T | string
  order?: 'asc' | 'desc'
}

export interface TableProps<T extends Record<string, unknown>>
  extends Omit<TableHTMLAttributes<HTMLTableElement>, 'children' | 'title' | 'onChange'> {
  columns: TableColumn<T>[]
  dataSource: T[]
  title?: ReactNode
  searchable?: boolean
  columnConfigurable?: boolean
  rowKey?: TableKey<T> | ((record: T, index: number) => string)
  emptyText?: ReactNode
  pagination?: {
    current: number
    pageSize: number
    total: number
    onChange: (page: number, pageSize: number) => void
  }
}
