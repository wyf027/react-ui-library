import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../utils/cn'

export interface ListItem {
  key: string | number
  content: ReactNode
  avatar?: ReactNode
  title?: ReactNode
  description?: ReactNode
  extra?: ReactNode
}

export interface ListProps extends HTMLAttributes<HTMLDivElement> {
  dataSource?: ListItem[]
  header?: ReactNode
  footer?: ReactNode
  bordered?: boolean
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  renderItem?: (item: ListItem, index: number) => ReactNode
  grid?: { cols?: number; gap?: number }
}

export const List = forwardRef<HTMLDivElement, ListProps>(function List(
  {
    className,
    dataSource = [],
    header,
    footer,
    bordered = true,
    size = 'md',
    loading = false,
    renderItem,
    grid,
    ...props
  },
  ref,
) {
  const paddingCls = { 'px-3 py-2': size === 'sm', 'px-4 py-3': size === 'md', 'px-6 py-4': size === 'lg' }

  const defaultRender = (item: ListItem) => (
    <div className="flex items-start gap-3">
      {item.avatar ? <div className="shrink-0">{item.avatar}</div> : null}
      <div className="min-w-0 flex-1">
        {item.title ? <div className="text-sm font-medium text-slate-900 dark:text-slate-100">{item.title}</div> : null}
        {item.description ? <div className="text-sm text-slate-500 dark:text-slate-400">{item.description}</div> : null}
        {item.content}
      </div>
      {item.extra ? <div className="shrink-0">{item.extra}</div> : null}
    </div>
  )

  return (
    <div
      ref={ref}
      className={cn(bordered && 'rounded-lg border border-slate-200 dark:border-slate-700', className)}
      {...props}
    >
      {header ? <div className={cn('border-b border-slate-200 font-medium dark:border-slate-700', paddingCls)}>{header}</div> : null}
      {loading ? (
        <div className={cn('text-center text-sm text-slate-400', paddingCls)}>Loading...</div>
      ) : grid ? (
        <div className={cn('grid', paddingCls)} style={{ gridTemplateColumns: `repeat(${grid.cols ?? 3}, 1fr)`, gap: grid.gap ?? 16 }}>
          {dataSource.map((item, i) => (
            <div key={item.key}>{renderItem ? renderItem(item, i) : defaultRender(item)}</div>
          ))}
        </div>
      ) : (
        <ul className="divide-y divide-slate-200 dark:divide-slate-700">
          {dataSource.map((item, i) => (
            <li key={item.key} className={cn(paddingCls)}>
              {renderItem ? renderItem(item, i) : defaultRender(item)}
            </li>
          ))}
        </ul>
      )}
      {footer ? <div className={cn('border-t border-slate-200 text-sm dark:border-slate-700', paddingCls)}>{footer}</div> : null}
    </div>
  )
})
