import { forwardRef, type ReactNode, useMemo, useState } from 'react'

import { Spin } from '../../feedback/inline/Spin'
import { cn } from '../../../utils/cn'

import {
  tableBody,
  tableCaption,
  tableEmptyTd,
  tableFilterSelect,
  tableHeadRow,
  tablePaginationBtn,
  tablePaginationWrap,
  tableRoot,
  tableRow,
  tableScrollWrap,
  tableSearchInput,
  tableSortBtn,
  tableTd,
  tableTh,
  tableToolbarTitle,
  tableToolbarWrap,
} from './tableClassNames'
import type { TableColumn, TableProps } from './Table.types'

export const Table = forwardRef<HTMLTableElement, TableProps<Record<string, unknown>>>(function Table(
  {
    className,
    columns,
    dataSource,
    caption,
    title,
    searchable = false,
    columnConfigurable = false,
    loading = false,
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

  const processedRows = useMemo(() => {
    let rows = [...dataSource]

    if (searchable && search.trim()) {
      const keyword = search.trim().toLowerCase()
      rows = rows.filter((record) =>
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

  const colSpan = visibleColumns.length

  return (
    <div className="space-y-2">
      {(title || searchable || columnConfigurable) && (
        <div className={tableToolbarWrap}>
          <div className={tableToolbarTitle}>{title}</div>
          <div className="flex flex-wrap items-center gap-2">
            {searchable ? (
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search..."
                aria-label="Search table"
                className={tableSearchInput}
              />
            ) : null}
            {columnConfigurable ? (
              <details className="relative">
                <summary className="cursor-pointer rounded border border-slate-300 px-2 py-1 text-xs dark:border-slate-700">
                  Columns
                </summary>
                <div className="absolute right-0 z-20 mt-1 min-w-40 rounded border border-slate-200 bg-white p-2 shadow dark:border-slate-700 dark:bg-slate-900">
                  {columns.map((column: TableColumn<Record<string, unknown>>) => {
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
        </div>
      )}
      <div className={tableScrollWrap}>
        <table ref={ref} className={cn(tableRoot, className)} aria-busy={loading || undefined} {...props}>
          {caption ? <caption className={tableCaption}>{caption}</caption> : null}
          <thead className={tableHeadRow}>
            <tr>
              {visibleColumns.map((column) => {
                const key = String(column.key)
                const sorted = effectiveSortKey === key
                const ariaSort = column.sorter
                  ? sorted
                    ? effectiveSortOrder === 'asc'
                      ? 'ascending'
                      : 'descending'
                    : 'none'
                  : undefined
                return (
                  <th key={key} scope="col" style={{ width: column.width }} className={tableTh} aria-sort={ariaSort}>
                    <div className="flex items-center gap-1">
                      <span>{column.title}</span>
                      {column.sorter ? (
                        <button
                          type="button"
                          aria-label={`Sort column ${key}`}
                          onClick={() => {
                            if (!sorted) {
                              if (!controlledSortColumn) {
                                setSortKey(key)
                                setSortOrder('asc')
                              }
                            } else {
                              const nextOrder = effectiveSortOrder === 'asc' ? 'desc' : 'asc'
                              if (!controlledSortColumn) {
                                setSortOrder(nextOrder)
                              }
                            }
                          }}
                          className={tableSortBtn}
                        >
                          {sorted ? (effectiveSortOrder === 'asc' ? '↑' : '↓') : '↕'}
                        </button>
                      ) : null}
                    </div>
                    {column.filters?.length ? (
                      <select
                        aria-label={`Filter column ${key}`}
                        value={effectiveFilterMap[key] ?? ''}
                        onChange={(event) => {
                          const nextValue = event.target.value
                          if (column.filteredValue === undefined) {
                            setFilterMap((prev) => ({
                              ...prev,
                              [key]: nextValue,
                            }))
                          }
                        }}
                        className={tableFilterSelect}
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
          <tbody className={tableBody}>
            {loading ? (
              <tr>
                <td className={tableEmptyTd} colSpan={colSpan}>
                  <div role="status" aria-live="polite" className="flex justify-center py-6">
                    <Spin size="sm" />
                  </div>
                </td>
              </tr>
            ) : paginatedRows.length === 0 ? (
              <tr>
                <td className={tableEmptyTd} colSpan={colSpan}>
                  {emptyText}
                </td>
              </tr>
            ) : (
              paginatedRows.map((record, index) => {
                const rowIndex = pagination ? (pagination.current - 1) * pagination.pageSize + index : index
                const rk =
                  typeof rowKey === 'function'
                    ? rowKey(record, rowIndex)
                    : rowKey
                      ? String(record[rowKey])
                      : String(rowIndex)

                return (
                  <tr key={rk} className={tableRow}>
                    {visibleColumns.map((column) => {
                      const value = record[column.key as keyof typeof record]
                      return (
                        <td key={String(column.key)} className={tableTd}>
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
        <nav className={tablePaginationWrap} aria-label="Table pagination">
          <span>
            Page {pagination.current} / {totalPages}
          </span>
          <button
            type="button"
            disabled={!canGoPrev}
            onClick={() => pagination.onChange(pagination.current - 1, pagination.pageSize)}
            className={tablePaginationBtn}
          >
            Prev
          </button>
          <button
            type="button"
            disabled={!canGoNext}
            onClick={() => pagination.onChange(pagination.current + 1, pagination.pageSize)}
            className={tablePaginationBtn}
          >
            Next
          </button>
        </nav>
      ) : null}
    </div>
  )
})
