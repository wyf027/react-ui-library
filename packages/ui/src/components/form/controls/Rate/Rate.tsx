import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../../../../utils/cn'
import { useControllableState } from '../../../../utils/useControllableState'

export interface RateProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  count?: number
  value?: number
  defaultValue?: number
  disabled?: boolean
  allowClear?: boolean
  onChange?: (value: number) => void
}

export const Rate = forwardRef<HTMLDivElement, RateProps>(function Rate(
  {
    className,
    count = 5,
    value,
    defaultValue = 0,
    disabled,
    allowClear = true,
    onChange,
    ...props
  },
  ref,
) {
  const [current, setCurrent] = useControllableState<number>({
    value,
    defaultValue,
    onChange,
  })

  return (
    <div ref={ref} className={cn('inline-flex items-center gap-1', className)} {...props}>
      {Array.from({ length: count }, (_, index) => {
        const star = index + 1
        const active = star <= current
        return (
          <button
            key={star}
            type="button"
            disabled={disabled}
            onClick={() => {
              if (allowClear && current === star) {
                setCurrent(0)
              } else {
                setCurrent(star)
              }
            }}
            className={cn('text-xl leading-none', active ? 'text-amber-400' : 'text-slate-300 dark:text-slate-600')}
            aria-label={`Rate ${star}`}
          >
            ★
          </button>
        )
      })}
    </div>
  )
})
