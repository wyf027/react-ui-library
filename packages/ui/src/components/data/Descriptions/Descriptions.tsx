import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export interface DescriptionItem {
  key: string
  label: ReactNode
  children: ReactNode
}

export interface DescriptionsProps extends HTMLAttributes<HTMLDListElement> {
  items: DescriptionItem[]
  columns?: number
}

export const Descriptions = forwardRef<HTMLDListElement, DescriptionsProps>(function Descriptions(
  { className, items, columns = 3, ...props },
  ref,
) {
  return (
    <dl
      ref={ref}
      className={cn('grid gap-3 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900', className)}
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      {...props}
    >
      {items.map((item) => (
        <div key={item.key} className="min-w-0">
          <dt className="text-xs text-slate-500 dark:text-slate-400">{item.label}</dt>
          <dd className="mt-1 text-sm text-slate-900 dark:text-slate-100">{item.children}</dd>
        </div>
      ))}
    </dl>
  )
})
