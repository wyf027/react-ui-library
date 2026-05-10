import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export interface StepItem {
  key: string
  title: ReactNode
  description?: ReactNode
}

export interface StepsProps extends HTMLAttributes<HTMLOListElement> {
  items: StepItem[]
  current?: number
}

export const Steps = forwardRef<HTMLOListElement, StepsProps>(function Steps(
  { className, items, current = 0, ...props },
  ref,
) {
  return (
    <ol ref={ref} className={cn('flex w-full list-none items-start p-0', className)} {...props}>
      {items.map((item, index) => {
        const isDone = index < current
        const isActive = index === current
        return (
          <li key={item.key} className="relative flex flex-1 gap-2">
            <div className={cn('mt-0.5 flex h-5 w-5 items-center justify-center rounded-full text-xs text-white', isDone || isActive ? 'bg-brand-500' : 'bg-slate-300 dark:bg-slate-700')}>
              {index + 1}
            </div>
            <div className="min-w-0">
              <div className={cn('text-sm font-medium', isActive ? 'text-brand-600' : 'text-slate-700 dark:text-slate-200')}>
                {item.title}
              </div>
              {item.description ? <div className="text-xs text-slate-500 dark:text-slate-400">{item.description}</div> : null}
            </div>
            {index < items.length - 1 ? <span className="absolute left-7 top-2 h-px w-[calc(100%-2.5rem)] bg-slate-300 dark:bg-slate-700" /> : null}
          </li>
        )
      })}
    </ol>
  )
})
