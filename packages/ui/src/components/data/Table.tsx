import {
  forwardRef,
  type ForwardedRef,
  type ReactElement,
  type ReactNode,
  type RefAttributes,
  type TableHTMLAttributes,
  useMemo,
  useState,
} from 'react'
import { cn } from '../../utils/cn'

type TableKey<T> = Extract<keyof T, string>

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

export const Table = forwardRef<HTMLTableElement, TableProps<Record<string, unknown>>>(
  function Table(
    {
      className,
      columns,
      dataSource,
      title,
      searchable = false,
      columnConfigurable = false,
      rowKey,
      emptyText = 'No data',
      pagination,
      ...props
    },
    ref,
  ) {
    const [search, setSearch] = useState('')
    const [sortKey, setSortKey] = useState<string>('')
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
    const [filterMap, setFilterMap] = useState<Record<string, string>>({})
    const [visibleMap, setVisibleMap] = useState<Record<string, boolean>>({})
    const [innerSelectedRowKeys, setInnerSelectedRowKeys] = useState<string[]>(rowSelection?.defaultSelectedRowKeys ?? [])

    const controlledSortColumn = useMemo(() => columns.find((column) => column.sortOrder !== undefined), [columns])
    const effectiveSortKey = controlledSortColumn ? String(controlledSortColumn.key) : sortKey
    const effectiveSortOrder = controlledSortColumn?.sortOrder ?? sortOrder

    const effectiveFilterMap = useMemo(
      () =>
        columns.reduce<Record<string, string>>((accumulator, column) => {
          const key = String(column.key)
          accumulator[key] = column.filteredValue ?? filterMap[key] ?? ''
          return accumulator
        }, {}),
      [columns, filterMap],
    )

  const visibleColumns = useMemo(
    () => columns.filter((column) => visibleMap[column.key] !== false),
    [columns, visibleMap],
  )

    const emitChange = (nextFilters: Record<string, string | undefined>, nextSorter: TableSorter<Record<string, unknown>>) => {
      onChange?.(undefined, nextFilters, nextSorter)
    }

    const processedRows = useMemo(() => {
      let rows = [...dataSource]

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

      Object.entries(effectiveFilterMap).forEach(([key, filterVal]) => {
        if (!filterVal) return
        rows = rows.filter((record) => String(record[key as keyof typeof record]) === filterVal)
      })

      if (effectiveSortKey) {
        const column = columns.find((col) => String(col.key) === effectiveSortKey)
        if (column?.sorter) {
          rows.sort((a, b) => (effectiveSortOrder === 'asc' ? column.sorter!(a, b) : column.sorter!(b, a)))
        }
      }
    }

      return rows
    }, [columns, dataSource, effectiveFilterMap, effectiveSortKey, effectiveSortOrder, search, searchable])

    const paginatedRows = useMemo(() => {
      if (!pagination) {
        return processedRows
      }
      const start = (pagination.current - 1) * pagination.pageSize
      const end = start + pagination.pageSize
      return processedRows.slice(start, end)
    }, [pagination, processedRows])

    const totalPages = pagination ? Math.max(1, Math.ceil(pagination.total / pagination.pageSize)) : 1
    const canGoPrev = Boolean(pagination && pagination.current > 1)
    const canGoNext = Boolean(pagination && pagination.current < totalPages)

    const rowKeys = useMemo(
      () =>
        processedRows.map((record, index) =>
          typeof rowKey === 'function' ? rowKey(record, index) : rowKey ? String(record[rowKey]) : String(index),
        ),
      [processedRows, rowKey],
    )

    const selectedRowKeys = rowSelection?.selectedRowKeys ?? innerSelectedRowKeys
    const selectedKeySet = useMemo(() => new Set(selectedRowKeys), [selectedRowKeys])
    const allChecked = rowKeys.length > 0 && rowKeys.every((key) => selectedKeySet.has(key))

    const emitSelectionChange = (nextSelectedRowKeys: string[]) => {
      if (!rowSelection) return

      if (rowSelection.selectedRowKeys === undefined) {
        setInnerSelectedRowKeys(nextSelectedRowKeys)
      }

      const nextSelectedRows = processedRows.filter((record, index) => {
        const key = typeof rowKey === 'function' ? rowKey(record, index) : rowKey ? String(record[rowKey]) : String(index)
        return nextSelectedRowKeys.includes(key)
      })

      rowSelection.onChange?.(nextSelectedRowKeys, nextSelectedRows)
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
                    const checked = visibleMap[column.key] !== false
                    return (
                      <label key={column.key} className="flex items-center gap-2 py-1 text-xs">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={(event) =>
                            setVisibleMap((prev) => ({ ...prev, [column.key]: event.target.checked }))
                          }
                        />
                        <span>{String(column.title)}</span>
                      </label>
                    )
                  })}
                </div>
              </details>
            ) : null}
          </div>
        )}
        <div className="nova-scrollbar overflow-auto rounded-lg border border-slate-200 dark:border-slate-700">
          <table
            ref={ref}
            className={cn('min-w-full divide-y divide-slate-200 dark:divide-slate-700', className)}
            {...props}
          >
            <thead className="bg-slate-50 dark:bg-slate-900/50">
              <tr>
                {visibleColumns.map((column) => {
                  const key = String(column.key)
                  const sorted = effectiveSortKey === key
                  return (
                    <th
                      key={key}
                      scope="col"
                      style={{ width: column.width }}
                      className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                    >
                      <div className="flex items-center gap-1">
                        <span>{column.title}</span>
                        {column.sorter ? (
                          <button
                            type="button"
                            onClick={() => {
                              let nextSortKey = effectiveSortKey
                              let nextSortOrder = effectiveSortOrder

                              if (!sorted) {
                                nextSortKey = key
                                nextSortOrder = 'asc'
                                if (!controlledSortColumn) {
                                  setSortKey(key)
                                  setSortOrder('asc')
                                }
                              } else {
                                nextSortOrder = effectiveSortOrder === 'asc' ? 'desc' : 'asc'
                                if (!controlledSortColumn) {
                                  setSortOrder(nextSortOrder)
                                }
                              }

                              emitChange(
                                Object.fromEntries(
                                  Object.entries(effectiveFilterMap).map(([filterKey, filterValue]) => [
                                    filterKey,
                                    filterValue || undefined,
                                  ]),
                                ),
                                { columnKey: nextSortKey, order: nextSortOrder },
                              )
                            }}
                            className="rounded px-1 text-[10px] text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700"
                          >
                            {sorted ? (effectiveSortOrder === 'asc' ? '↑' : '↓') : '↕'}
                          </button>
                        ) : null}
                      </div>
                      {column.filters?.length ? (
                        <select
                          value={effectiveFilterMap[key] ?? ''}
                          onChange={(event) => {
                            const nextValue = event.target.value

                            if (column.filteredValue === undefined) {
                              setFilterMap((prev) => ({
                                ...prev,
                                [key]: nextValue,
                              }))
                            }

                            emitChange(
                              {
                                ...Object.fromEntries(
                                  Object.entries(effectiveFilterMap).map(([filterKey, filterValue]) => [
                                    filterKey,
                                    filterValue || undefined,
                                  ]),
                                ),
                                [key]: nextValue || undefined,
                              },
                              { columnKey: effectiveSortKey, order: effectiveSortOrder },
                            )
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
            {paginatedRows.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-center text-sm text-slate-500" colSpan={visibleColumns.length + (rowSelection ? 1 : 0)}>
                  {emptyText}
                </td>
              </tr>
            ) : (
              paginatedRows.map((record, index) => {
                const rowIndex = pagination ? (pagination.current - 1) * pagination.pageSize + index : index
                const key =
                  typeof rowKey === 'function'
                    ? rowKey(record, rowIndex)
                    : rowKey
                      ? String(record[rowKey])
                      : String(rowIndex)

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
      {pagination ? (
        <div className="flex items-center justify-end gap-2 text-xs text-slate-600 dark:text-slate-300">
          <span>
            Page {pagination.current} / {totalPages}
          </span>
          <button
            type="button"
            disabled={!canGoPrev}
            onClick={() => pagination.onChange(pagination.current - 1, pagination.pageSize)}
            className="rounded border border-slate-300 px-2 py-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700"
          >
            Prev
          </button>
          <button
            type="button"
            disabled={!canGoNext}
            onClick={() => pagination.onChange(pagination.current + 1, pagination.pageSize)}
            className="rounded border border-slate-300 px-2 py-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700"
          >
            Next
          </button>
        </div>
      ) : null}
      </div>
    )
  },
)
