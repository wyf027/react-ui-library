import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export interface ResultProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  status?: 'success' | 'error' | 'warning' | 'info'
  title?: ReactNode
  subTitle?: ReactNode
  extra?: ReactNode
}

export const Result = forwardRef<HTMLDivElement, ResultProps>(function Result(
  { className, status = 'info', title, subTitle, extra, ...props },
  ref,
) {
  const icon = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️',
  }[status]

  return (
    <div ref={ref} className={cn('rounded-xl border border-slate-200 bg-white p-6 text-center dark:border-slate-700 dark:bg-slate-900', className)} {...props}>
      <div className="mb-2 text-4xl">{icon}</div>
      {title ? <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h3> : null}
      {subTitle ? <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{subTitle}</p> : null}
      {extra ? <div className="mt-4">{extra}</div> : null}
    </div>
  )
})
