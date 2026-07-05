import { forwardRef, useRef, type HTMLAttributes, type KeyboardEvent, type ReactNode } from 'react'
import { cn } from '../../../../utils/cn'
import { useControllableState } from '../../../../utils/useControllableState'

export interface SegmentedOption {
  label: ReactNode
  value: string
  disabled?: boolean
}

export interface SegmentedProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  options: SegmentedOption[]
  value?: string
  defaultValue?: string
  disabled?: boolean
  onChange?: (value: string) => void
}

export const Segmented = forwardRef<HTMLDivElement, SegmentedProps>(function Segmented(
  {
    className,
    options,
    value,
    defaultValue = options.find((item) => !item.disabled)?.value ?? options[0]?.value ?? '',
    disabled,
    onChange,
    'aria-label': ariaLabel = 'Segmented options',
    ...props
  },
  ref,
) {
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([])
  const [current, setCurrent] = useControllableState<string>({
    value,
    defaultValue,
    onChange,
  })

  const enabledOptions = options.filter((item) => !item.disabled)
  const tabbableValue = enabledOptions.some((item) => item.value === current)
    ? current
    : (enabledOptions[0]?.value ?? '')

  const selectValue = (nextValue: string, shouldFocus = true) => {
    if (disabled) {
      return
    }

    const nextOption = options.find((item) => item.value === nextValue)
    if (!nextOption || nextOption.disabled) {
      return
    }

    setCurrent(nextValue)

    if (shouldFocus) {
      const nextIndex = options.findIndex((item) => item.value === nextValue)
      buttonRefs.current[nextIndex]?.focus()
    }
  }

  const selectRelative = (step: number) => {
    if (enabledOptions.length === 0) {
      return
    }

    const currentIndex = enabledOptions.findIndex((item) => item.value === current)
    const baseIndex = currentIndex >= 0 ? currentIndex : 0
    const nextIndex = (baseIndex + step + enabledOptions.length) % enabledOptions.length

    selectValue(enabledOptions[nextIndex].value)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) {
      return
    }

    if (['ArrowRight', 'ArrowDown'].includes(event.key)) {
      event.preventDefault()
      selectRelative(1)
      return
    }

    if (['ArrowLeft', 'ArrowUp'].includes(event.key)) {
      event.preventDefault()
      selectRelative(-1)
      return
    }

    if (event.key === 'Home') {
      event.preventDefault()
      selectValue(enabledOptions[0]?.value ?? '')
      return
    }

    if (event.key === 'End') {
      event.preventDefault()
      selectValue(enabledOptions[enabledOptions.length - 1]?.value ?? '')
    }
  }

  return (
    <div
      ref={ref}
      role="radiogroup"
      aria-label={ariaLabel}
      aria-disabled={disabled || undefined}
      className={cn(
        'inline-flex rounded-lg border border-slate-200 bg-white p-1 dark:border-slate-700 dark:bg-slate-900',
        disabled && 'opacity-60',
        className,
      )}
      {...props}
    >
      {options.map((item, index) => {
        const selected = current === item.value
        const itemDisabled = disabled || item.disabled
        return (
          <button
            key={item.value}
            ref={(node) => {
              buttonRefs.current[index] = node
            }}
            type="button"
            role="radio"
            aria-checked={selected}
            disabled={itemDisabled}
            tabIndex={itemDisabled ? -1 : item.value === tabbableValue ? 0 : -1}
            onClick={() => selectValue(item.value, false)}
            onKeyDown={handleKeyDown}
            className={cn(
              'rounded-md px-3 py-1.5 text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500',
              selected
                ? 'bg-brand-500 text-white'
                : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800',
              itemDisabled && 'opacity-50',
            )}
          >
            {item.label}
          </button>
        )
      })}
    </div>
  )
})
