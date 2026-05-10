import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../../../utils/cn'

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  percent: number
  status?: 'normal' | 'success' | 'exception'
  showInfo?: boolean
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(function Progress(
  { className, percent, status = 'normal', showInfo = true, ...props },
  ref,
) {
  const safePercent = Math.max(0, Math.min(100, percent))

  return (
    <div ref={ref} className={cn('w-full', className)} {...props}>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
        <div
          className={cn('h-full transition-all', {
            'bg-brand-500': status === 'normal',
            'bg-emerald-500': status === 'success',
            'bg-red-500': status === 'exception',
          })}
          style={{ width: `${safePercent}%` }}
        />
      </div>
      {showInfo ? <div className="mt-1 text-right text-xs text-slate-500">{safePercent}%</div> : null}
    </div>
  )
})
