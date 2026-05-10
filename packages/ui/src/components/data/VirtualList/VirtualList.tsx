import { forwardRef, type HTMLAttributes, type ReactNode, useMemo, useState } from 'react'
import { cn } from '../../../utils/cn'

export interface VirtualListProps<T> extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  items: T[]
  itemHeight?: number
  height?: number
  renderItem: (item: T, index: number) => ReactNode
}

export const VirtualList = forwardRef<HTMLDivElement, VirtualListProps<unknown>>(function VirtualList(
  {
    className,
    items,
    itemHeight = 36,
    height = 240,
    renderItem,
    ...props
  },
  ref,
) {
  const [scrollTop, setScrollTop] = useState(0)
  const visibleCount = Math.ceil(height / itemHeight) + 2
  const start = Math.max(0, Math.floor(scrollTop / itemHeight) - 1)
  const end = Math.min(items.length, start + visibleCount)

  const visibleItems = useMemo(() => items.slice(start, end), [end, items, start])

  return (
    <div
      ref={ref}
      className={cn('overflow-auto rounded-lg border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900', className)}
      style={{ height }}
      onScroll={(event) => setScrollTop((event.target as HTMLDivElement).scrollTop)}
      {...props}
    >
      <div style={{ height: items.length * itemHeight, position: 'relative' }}>
        <div style={{ position: 'absolute', top: start * itemHeight, left: 0, right: 0 }}>
          {visibleItems.map((item, index) => (
            <div key={start + index} style={{ height: itemHeight }} className="border-b border-slate-100 px-3 py-2 text-sm dark:border-slate-800">
              {renderItem(item, start + index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
})
