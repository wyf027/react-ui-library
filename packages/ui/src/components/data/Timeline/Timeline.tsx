import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export interface TimelineItem {
  key: string
  title: ReactNode
  description?: ReactNode
  timestamp?: ReactNode
  color?: 'brand' | 'success' | 'warning' | 'danger'
}

export interface TimelineProps extends HTMLAttributes<HTMLUListElement> {
  items: TimelineItem[]
  reverse?: boolean
}

export const Timeline = forwardRef<HTMLUListElement, TimelineProps>(function Timeline(
  { className, items, reverse = false, ...props },
  ref,
) {
  const orderedItems = reverse ? [...items].reverse() : items

  return (
    <ul ref={ref} className={cn('list-none space-y-4 p-0', className)} {...props}>
      {orderedItems.map((item) => (
        <li key={item.key} className="relative pl-6">
          <span
            aria-hidden="true"
            className={cn(
              'absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full',
              item.color === 'success' && 'bg-emerald-500',
              item.color === 'warning' && 'bg-amber-500',
              item.color === 'danger' && 'bg-red-500',
              (!item.color || item.color === 'brand') && 'bg-brand-500',
            )}
          />
          {item.timestamp ? (
            <p className="mb-0.5 text-xs text-slate-400 dark:text-slate-500">{item.timestamp}</p>
          ) : null}
          <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{item.title}</p>
          {item.description ? (
            <p className="text-sm text-slate-500 dark:text-slate-400">{item.description}</p>
          ) : null}
        </li>
      ))}
    </ul>
  )
})
