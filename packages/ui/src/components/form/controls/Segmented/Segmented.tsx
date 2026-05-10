import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
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
  onChange?: (value: string) => void
}

export const Segmented = forwardRef<HTMLDivElement, SegmentedProps>(function Segmented(
  {
    className,
    options,
    value,
    defaultValue = options[0]?.value ?? '',
    onChange,
    ...props
  },
  ref,
) {
  const [current, setCurrent] = useControllableState<string>({
    value,
    defaultValue,
    onChange,
  })

  return (
    <div ref={ref} className={cn('inline-flex rounded-lg border border-slate-200 bg-white p-1 dark:border-slate-700 dark:bg-slate-900', className)} {...props}>
      {options.map((item) => (
        <button
          key={item.value}
          type="button"
          disabled={item.disabled}
          onClick={() => setCurrent(item.value)}
          className={cn('rounded-md px-3 py-1.5 text-sm transition', current === item.value ? 'bg-brand-500 text-white' : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800', item.disabled && 'opacity-50')}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
})
