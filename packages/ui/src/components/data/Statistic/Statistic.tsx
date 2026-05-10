import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export interface StatisticProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'prefix'> {
  title?: ReactNode
  value: string | number
  prefix?: ReactNode
  suffix?: ReactNode
}

export const Statistic = forwardRef<HTMLDivElement, StatisticProps>(function Statistic(
  { className, title, value, prefix, suffix, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn('rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900', className)} {...props}>
      {title ? <div className="mb-1 text-xs text-slate-500 dark:text-slate-400">{title}</div> : null}
      <div className="flex items-end gap-1 text-2xl font-semibold text-slate-900 dark:text-slate-100">
        {prefix}
        <span>{value}</span>
        {suffix}
      </div>
    </div>
  )
})
