import { forwardRef, type HTMLAttributes, useMemo } from 'react'
import { cn } from '../../../../utils/cn'

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

export interface CalendarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  year?: number
  month?: number
  value?: string
  onChange?: (date: string) => void
}

export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(function Calendar(
  { className, year, month, value, onChange, ...props },
  ref,
) {
  const now = new Date()
  const y = year ?? now.getFullYear()
  const m = month ?? now.getMonth()

  const days = useMemo(() => {
    const total = getDaysInMonth(y, m)
    return Array.from({ length: total }, (_, i) => i + 1)
  }, [m, y])

  return (
    <div ref={ref} className={cn('rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900', className)} {...props}>
      <div className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-200">{y} / {m + 1}</div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d) => (
          <div key={d} className="py-1 text-slate-500 dark:text-slate-400">{d}</div>
        ))}
        {days.map((day) => {
          const date = `${y}-${String(m + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
          const active = value === date
          return (
            <button
              key={date}
              type="button"
              onClick={() => onChange?.(date)}
              className={cn('rounded py-1.5 text-xs', active ? 'bg-brand-500 text-white' : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800')}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
})
