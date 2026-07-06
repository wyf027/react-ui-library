import {
  forwardRef,
  type ChangeEvent,
  type ReactNode,
  type SelectHTMLAttributes,
  useId,
  useMemo,
} from 'react'
import { cn } from '../../../../utils/cn'
import { useControllableState } from '../../../../utils/useControllableState'
import type { ComponentSize, SlotClassNames } from '../../../../types/common'

export interface SelectOption {
  label: ReactNode
  value: string
  disabled?: boolean
}

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size' | 'onChange'> {
  label?: ReactNode
  helperText?: ReactNode
  error?: ReactNode
  options: SelectOption[]
  placeholder?: string
  value?: string
  defaultValue?: string
  size?: ComponentSize
  onChange?: (value: string) => void
  onNativeChange?: (event: ChangeEvent<HTMLSelectElement>) => void
  slotClassNames?: SlotClassNames
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  {
    className,
    label,
    helperText,
    error,
    options,
    placeholder,
    value,
    defaultValue,
    size = 'md',
    id,
    onChange,
    onNativeChange,
    disabled,
    slotClassNames,
    'aria-describedby': ariaDescribedBy,
    'aria-invalid': ariaInvalid,
    ...props
  },
  ref,
) {
  const generatedId = useId()
  const selectId = id ?? generatedId
  const helperId = helperText && !error ? `${selectId}-helper` : undefined
  const errorId = error ? `${selectId}-error` : undefined
  const descriptionIds = [ariaDescribedBy, errorId ?? helperId].filter(Boolean).join(' ') || undefined
  const [innerValue, setInnerValue] = useControllableState<string>({
    value,
    defaultValue: defaultValue ?? '',
    onChange,
  })

  const mergedValue = useMemo(() => (value !== undefined ? value : innerValue), [innerValue, value])

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setInnerValue(event.target.value)
    onNativeChange?.(event)
  }

  return (
    <div className={cn('flex w-full flex-col gap-1.5', slotClassNames?.root)}>
      {label ? (
        <label
          htmlFor={selectId}
          className={cn('text-sm font-medium text-slate-700 dark:text-slate-200', slotClassNames?.label)}
        >
          {label}
        </label>
      ) : null}
      <select
        ref={ref}
        id={selectId}
        value={mergedValue}
        disabled={disabled}
        aria-describedby={descriptionIds}
        aria-invalid={ariaInvalid ?? (error ? true : undefined)}
        onChange={handleChange}
        className={cn(
          'nova-focus-ring w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100',
          {
            'h-8': size === 'sm',
            'h-10': size === 'md',
            'h-11': size === 'lg',
          },
          error && 'border-red-500 focus:border-red-500 focus:ring-red-100',
          className,
          slotClassNames?.input,
        )}
        {...props}
      >
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? (
        <p id={errorId} role="alert" className="text-xs text-red-600">
          {error}
        </p>
      ) : helperText ? (
        <p id={helperId} className="text-xs text-slate-500 dark:text-slate-400">
          {helperText}
        </p>
      ) : null}
    </div>
  )
})
