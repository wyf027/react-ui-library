import { forwardRef, useRef, type HTMLAttributes, type KeyboardEvent } from 'react'
import { cn } from '../../../../utils/cn'
import { useControllableState } from '../../../../utils/useControllableState'

export interface RateProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  count?: number
  value?: number
  defaultValue?: number
  disabled?: boolean
  allowClear?: boolean
  keyboard?: boolean
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
    keyboard = true,
    onChange,
    'aria-label': ariaLabel = 'Rating',
    ...props
  },
  ref,
) {
  const starRefs = useRef<Array<HTMLButtonElement | null>>([])
  const [current, setCurrent] = useControllableState<number>({
    value,
    defaultValue,
    onChange,
  })

  const minValue = allowClear ? 0 : 1

  const setRate = (nextValue: number) => {
    if (disabled) {
      return
    }

    const clampedValue = Math.min(count, Math.max(minValue, nextValue))
    setCurrent(clampedValue)

    const focusIndex = clampedValue > 0 ? clampedValue - 1 : 0
    starRefs.current[focusIndex]?.focus()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (!keyboard || disabled) {
      return
    }

    if (['ArrowRight', 'ArrowUp'].includes(event.key)) {
      event.preventDefault()
      setRate(current + 1)
      return
    }

    if (['ArrowLeft', 'ArrowDown'].includes(event.key)) {
      event.preventDefault()
      setRate(current - 1)
      return
    }

    if (event.key === 'Home') {
      event.preventDefault()
      setRate(minValue)
      return
    }

    if (event.key === 'End') {
      event.preventDefault()
      setRate(count)
    }
  }

  return (
    <div
      ref={ref}
      role="radiogroup"
      aria-label={ariaLabel}
      aria-disabled={disabled || undefined}
      className={cn('inline-flex items-center gap-1', className)}
      {...props}
    >
      {Array.from({ length: count }, (_, index) => {
        const star = index + 1
        const active = star <= current
        return (
          <button
            key={star}
            ref={(node) => {
              starRefs.current[index] = node
            }}
            type="button"
            role="radio"
            aria-checked={current === star}
            aria-label={`${star} of ${count}`}
            tabIndex={disabled ? -1 : current === star || (current === 0 && star === 1) ? 0 : -1}
            disabled={disabled}
            onClick={() => {
              if (allowClear && current === star) {
                setRate(0)
              } else {
                setRate(star)
              }
            }}
            onKeyDown={handleKeyDown}
            className={cn(
              'rounded text-xl leading-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500',
              active ? 'text-amber-400' : 'text-slate-300 dark:text-slate-600',
            )}
          >
            ★
          </button>
        )
      })}
    </div>
  )
})
