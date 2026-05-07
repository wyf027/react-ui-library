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
  filters?: { text: string; value: string }[]
  render?: (value: T[K], record: T, index: number) => ReactNode
}

export interface TableProps<T extends Record<string, unknown>>
  extends Omit<TableHTMLAttributes<HTMLTableElement>, 'children' | 'title'> {
  columns: TableColumn<T>[]
  dataSource: T[]
  title?: ReactNode
  searchable?: boolean
  columnConfigurable?: boolean
  rowKey?: TableKey<T> | ((record: T, index: number) => string)
  emptyText?: ReactNode
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
    ...props
  }: TableProps<T>,
  ref: ForwardedRef<HTMLTableElement>,
) {
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState<TableKey<T> | ''>('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [filterMap, setFilterMap] = useState<Partial<Record<TableKey<T>, string>>>({})
  const [visibleMap, setVisibleMap] = useState<Partial<Record<TableKey<T>, boolean>>>({})

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

    for (const [key, filterVal] of Object.entries(filterMap) as [TableKey<T>, string | undefined][]) {
      if (!filterVal) continue
      rows = rows.filter((record) => String(record[key]) === filterVal)
    }

    if (sortKey) {
      const column = columns.find((col) => col.key === sortKey)
      const sorter = column?.sorter
      if (sorter) {
        rows.sort((a, b) => (sortOrder === 'asc' ? sorter(a, b) : sorter(b, a)))
      }
    }

    return rows
  }, [columns, dataSource, filterMap, search, searchable, sortKey, sortOrder])

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
                const key = column.key
                const sorted = sortKey === key
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
                            if (!sorted) {
                              setSortKey(key)
                              setSortOrder('asc')
                            } else {
                              setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
                            }
                          }}
                          className="rounded px-1 text-[10px] text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700"
                        >
                          {sorted ? (sortOrder === 'asc' ? '↑' : '↓') : '↕'}
                        </button>
                      ) : null}
                    </div>
                    {column.filters?.length ? (
                      <select
                        value={filterMap[key] ?? ''}
                        onChange={(event) =>
                          setFilterMap((prev) => ({
                            ...prev,
                            [key]: event.target.value,
                          }))
                        }
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
            {processedRows.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-center text-sm text-slate-500" colSpan={visibleColumns.length}>
                  {emptyText}
                </td>
              </tr>
            ) : (
              processedRows.map((record, index) => {
                const key =
                  typeof rowKey === 'function' ? rowKey(record, index) : rowKey ? String(record[rowKey]) : String(index)

                return (
                  <tr key={key} className="text-sm text-slate-700 dark:text-slate-200">
                    {visibleColumns.map((column) => {
                      const value = record[column.key]
                      return (
                        <td key={column.key} className="px-4 py-3">
                          {column.render ? column.render(value, record, index) : (value as ReactNode)}
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
    </div>
  )
}

type TableComponent = <T extends Record<string, unknown>>(
  props: TableProps<T> & RefAttributes<HTMLTableElement>,
) => ReactElement | null

export const Table = forwardRef(TableInner) as TableComponent
