import { forwardRef, type ReactNode, type TableHTMLAttributes, useMemo, useState } from 'react'
import { cn } from '../../utils/cn'

export interface TableColumn<T> {
  key: keyof T | string
  title: ReactNode
  width?: number | string
  sorter?: (a: T, b: T) => number
  filters?: { text: string; value: string }[]
  sortOrder?: 'asc' | 'desc' | null
  filteredValue?: string
  render?: (value: unknown, record: T, index: number) => ReactNode
}

export interface TablePagination {
  current?: number
  pageSize?: number
  total?: number
  onChange?: (page: number, pageSize: number) => void
}

export interface TableRowSelection<T> {
  selectedRowKeys?: string[]
  defaultSelectedRowKeys?: string[]
  onChange?: (selectedRowKeys: string[], selectedRows: T[]) => void
}

export interface TableProps<T extends Record<string, unknown>>
  extends Omit<TableHTMLAttributes<HTMLTableElement>, 'children' | 'title' | 'onChange'> {
  columns: TableColumn<T>[]
  dataSource: T[]
  title?: ReactNode
  searchable?: boolean
  columnConfigurable?: boolean
  rowKey?: keyof T | ((record: T, index: number) => string)
  emptyText?: ReactNode
  loading?: boolean
  pagination?: TablePagination | false
  rowSelection?: TableRowSelection<T>
  onChange?: (
    pagination: { current: number; pageSize: number; total: number },
    filters: Record<string, string>,
    sorter: { key?: string; order?: 'asc' | 'desc' },
  ) => void
}

function TableInner<T extends Record<string, unknown>>(
  {
    className,
    columns,
    dataSource,
    title,
    searchable = false,
    columnConfigurable = false,
    rowKey,
    emptyText = 'No data',
    loading = false,
    pagination,
    rowSelection,
    onChange,
    ...props
  }: TableProps<T>,
  ref: React.ForwardedRef<HTMLTableElement>,
) {
  const [search, setSearch] = useState('')
  const [internalSortKey, setInternalSortKey] = useState<string>('')
  const [internalSortOrder, setInternalSortOrder] = useState<'asc' | 'desc'>('asc')
  const [internalFilterMap, setInternalFilterMap] = useState<Record<string, string>>({})
  const [visibleMap, setVisibleMap] = useState<Record<string, boolean>>({})
  const [internalCurrent, setInternalCurrent] = useState(1)
  const [internalPageSize] = useState(10)
  const [internalSelectedKeys, setInternalSelectedKeys] = useState<string[]>(rowSelection?.defaultSelectedRowKeys ?? [])

  const pageSize = pagination !== false ? (pagination?.pageSize ?? internalPageSize) : dataSource.length
  const currentPage = pagination !== false ? (pagination?.current ?? internalCurrent) : 1

  const visibleColumns = useMemo(
    () => columns.filter((column) => visibleMap[String(column.key)] !== false),
    [columns, visibleMap],
  )

  const controlledSortColumn = columns.find((column) => column.sortOrder)
  const sortKey = controlledSortColumn ? String(controlledSortColumn.key) : internalSortKey
  const sortOrder = controlledSortColumn?.sortOrder ?? internalSortOrder

  const filterMap = useMemo(() => {
    const controlled: Record<string, string> = {}
    columns.forEach((column) => {
      if (column.filteredValue !== undefined) {
        controlled[String(column.key)] = column.filteredValue
      }
    })
    return Object.keys(controlled).length > 0 ? controlled : internalFilterMap
  }, [columns, internalFilterMap])

  const rows = useMemo(() => {
    let nextRows = [...dataSource]

    if (searchable && search.trim()) {
      const keyword = search.trim().toLowerCase()
      nextRows = nextRows.filter((record) =>
        Object.values(record).some((value) => String(value ?? '').toLowerCase().includes(keyword)),
      )
    }

    Object.entries(filterMap).forEach(([key, filterVal]) => {
      if (!filterVal) return
      nextRows = nextRows.filter((record) => String(record[key as keyof T] ?? '') === filterVal)
    })

    if (sortKey) {
      const column = columns.find((col) => String(col.key) === sortKey)
      if (column?.sorter) {
        nextRows.sort((a, b) => (sortOrder === 'asc' ? column.sorter!(a, b) : column.sorter!(b, a)))
      }
    }

    return nextRows
  }, [columns, dataSource, filterMap, search, searchable, sortKey, sortOrder])

  const total = pagination !== false ? (pagination?.total ?? rows.length) : rows.length
  const pagedRows = pagination !== false ? rows.slice((currentPage - 1) * pageSize, currentPage * pageSize) : rows

  const getRowKey = (record: T, index: number) =>
    typeof rowKey === 'function' ? rowKey(record, index) : rowKey ? String(record[rowKey]) : String(index)

  const selectedKeys = rowSelection?.selectedRowKeys ?? internalSelectedKeys

  const notifyChange = (nextPage = currentPage, nextPageSize = pageSize, nextFilters = filterMap, nextSortKey = sortKey, nextSortOrder = sortOrder) => {
    onChange?.(
      { current: nextPage, pageSize: nextPageSize, total },
      nextFilters,
      { key: nextSortKey || undefined, order: nextSortOrder || undefined },
    )
  }

  return (
    <div className="space-y-2">
      {(title || searchable || columnConfigurable) && (
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white p-2 dark:border-slate-700 dark:bg-slate-900">
          <div className="text-sm font-medium text-slate-800 dark:text-slate-200">{title}</div>
          <div className="flex flex-wrap items-center gap-2">
            {searchable ? (
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search..."
                className="h-8 rounded-md border border-slate-300 px-2 text-sm dark:border-slate-700 dark:bg-slate-950"
              />
            ) : null}
            {columnConfigurable ? (
              <details className="relative">
                <summary className="cursor-pointer rounded border border-slate-300 px-2 py-1 text-xs dark:border-slate-700">
                  Columns
                </summary>
                <div className="absolute right-0 z-20 mt-1 min-w-40 rounded border border-slate-200 bg-white p-2 shadow dark:border-slate-700 dark:bg-slate-900">
                  {columns.map((column) => {
                    const key = String(column.key)
                    const checked = visibleMap[key] !== false
                    return (
                      <label key={key} className="flex items-center gap-2 py-1 text-xs">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={(event) => setVisibleMap((prev) => ({ ...prev, [key]: event.target.checked }))}
                        />
                        <span>{String(column.title)}</span>
                      </label>
                    )
                  })}
                </div>
              </details>
            ) : null}
          </div>
        </div>
      )}
      <div className="nova-scrollbar overflow-auto rounded-lg border border-slate-200 dark:border-slate-700">
        <table ref={ref} className={cn('min-w-full divide-y divide-slate-200 dark:divide-slate-700', className)} {...props}>
          <thead className="bg-slate-50 dark:bg-slate-900/50">
            <tr>
              {rowSelection ? <th className="px-4 py-3"><input aria-label="Select all rows" type="checkbox" checked={pagedRows.length > 0 && pagedRows.every((r, i) => selectedKeys.includes(getRowKey(r, i)))} onChange={(event) => {
                const pageKeys = pagedRows.map((record, index) => getRowKey(record, index))
                const nextKeys = event.target.checked ? Array.from(new Set([...selectedKeys, ...pageKeys])) : selectedKeys.filter((key) => !pageKeys.includes(key))
                if (!rowSelection.selectedRowKeys) setInternalSelectedKeys(nextKeys)
                const selectedRows = rows.filter((record, index) => nextKeys.includes(getRowKey(record, index)))
                rowSelection.onChange?.(nextKeys, selectedRows)
              }} /></th> : null}
              {visibleColumns.map((column) => {
                const key = String(column.key)
                const sorted = sortKey === key
                const ariaSort = sorted ? (sortOrder === 'asc' ? 'ascending' : 'descending') : 'none'
                return (
                  <th
                    key={key}
                    scope="col"
                    aria-sort={column.sorter ? ariaSort : undefined}
                    style={{ width: column.width }}
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                  >
                    <div className="flex items-center gap-1">
                      <span>{column.title}</span>
                      {column.sorter ? (
                        <button
                          type="button"
                          aria-label={`Sort by ${String(column.title)} ${!sorted || sortOrder === 'desc' ? 'ascending' : 'descending'}`}
                          onClick={() => {
                            let nextSortKey = key
                            let nextSortOrder: 'asc' | 'desc' = 'asc'
                            if (!sorted) {
                              setInternalSortKey(key)
                              setInternalSortOrder('asc')
                            } else {
                              nextSortOrder = sortOrder === 'asc' ? 'desc' : 'asc'
                              setInternalSortOrder(nextSortOrder)
                            }
                            if (sorted) nextSortKey = sortKey
                            notifyChange(currentPage, pageSize, filterMap, nextSortKey, nextSortOrder)
                          }}
                          className="rounded px-1 text-[10px] text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700"
                        >
                          {sorted ? (sortOrder === 'asc' ? '↑' : '↓') : '↕'}
                        </button>
                      ) : null}
                    </div>
                    {column.filters?.length ? (
                      <select
                        aria-label={`Filter ${String(column.title)}`}
                        value={filterMap[key] ?? ''}
                        onChange={(event) => {
                          const nextFilters = { ...filterMap, [key]: event.target.value }
                          setInternalFilterMap(nextFilters)
                          notifyChange(currentPage, pageSize, nextFilters)
                        }}
                        className="mt-1 h-6 rounded border border-slate-300 bg-white px-1 text-[10px] dark:border-slate-700 dark:bg-slate-900"
                      >
                        <option value="">All</option>
                        {column.filters.map((filterItem) => (
                          <option key={filterItem.value} value={filterItem.value}>
                            {filterItem.text}
                          </option>
                        ))}
                      </select>
                    ) : null}
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white dark:divide-slate-800 dark:bg-slate-900">
            {loading ? (
              <tr><td className="px-4 py-6 text-center text-sm text-slate-500" colSpan={visibleColumns.length + (rowSelection ? 1 : 0)}>Loading...</td></tr>
            ) : pagedRows.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-center text-sm text-slate-500" colSpan={visibleColumns.length + (rowSelection ? 1 : 0)}>
                  {emptyText}
                </td>
              </tr>
            ) : (
              pagedRows.map((record, index) => {
                const rowIndex = (currentPage - 1) * pageSize + index
                const key = getRowKey(record, rowIndex)
                return (
                  <tr key={key} className="text-sm text-slate-700 dark:text-slate-200">
                    {rowSelection ? <td className="px-4 py-3"><input type="checkbox" aria-label={`Select row ${rowIndex + 1}`} checked={selectedKeys.includes(key)} onChange={(event) => {
                      const nextKeys = event.target.checked ? [...selectedKeys, key] : selectedKeys.filter((selectedKey) => selectedKey !== key)
                      if (!rowSelection.selectedRowKeys) setInternalSelectedKeys(nextKeys)
                      const selectedRows = rows.filter((rowRecord, rowKeyIndex) => nextKeys.includes(getRowKey(rowRecord, rowKeyIndex)))
                      rowSelection.onChange?.(nextKeys, selectedRows)
                    }} /></td> : null}
                    {visibleColumns.map((column) => {
                      const value = record[column.key as keyof T]
                      return (
                        <td key={String(column.key)} className="px-4 py-3">
                          {column.render ? column.render(value, record, rowIndex) : (value as ReactNode)}
                        </td>
                      )
                    })}
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
      {pagination !== false ? (
        <div className="flex items-center justify-end gap-2 text-xs text-slate-600 dark:text-slate-300">
          <span>Total {total}</span>
          <button type="button" disabled={currentPage <= 1} onClick={() => {
            const nextPage = currentPage - 1
            if (!pagination?.current) setInternalCurrent(nextPage)
            pagination?.onChange?.(nextPage, pageSize)
            notifyChange(nextPage, pageSize)
          }}>Prev</button>
          <span>{currentPage}</span>
          <button type="button" disabled={currentPage * pageSize >= total} onClick={() => {
            const nextPage = currentPage + 1
            if (!pagination?.current) setInternalCurrent(nextPage)
            pagination?.onChange?.(nextPage, pageSize)
            notifyChange(nextPage, pageSize)
          }}>Next</button>
        </div>
      ) : null}
    </div>
  )
}

export const Table = forwardRef(TableInner) as <T extends Record<string, unknown>>(
  props: TableProps<T> & { ref?: React.ForwardedRef<HTMLTableElement> },
) => ReturnType<typeof TableInner>
