import {
  forwardRef,
  type ChangeEvent,
  type InputHTMLAttributes,
  type ReactNode,
  useId,
  useMemo,
} from 'react'
import { cn } from '../../../../utils/cn'
import { useControllableState } from '../../../../utils/useControllableState'
import type { ComponentSize, SlotClassNames } from '../../../../types/common'

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  label?: ReactNode
  helperText?: ReactNode
  error?: ReactNode
  size?: ComponentSize
  prefix?: ReactNode
  suffix?: ReactNode
  onValueChange?: (value: string) => void
  slotClassNames?: SlotClassNames
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    className,
    label,
    helperText,
    error,
    size = 'md',
    prefix,
    suffix,
    value,
    defaultValue,
    onChange,
    onValueChange,
    disabled,
    id,
    slotClassNames,
    ...props
  },
  ref,
) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const [innerValue, setInnerValue] = useControllableState<string>({
    value: typeof value === 'string' ? value : undefined,
    defaultValue: (defaultValue as string) ?? '',
    onChange: onValueChange,
  })

  const mergedValue = useMemo(
    () => (typeof value === 'string' ? value : innerValue),
    [innerValue, value],
  )

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (value === undefined) {
      setInnerValue(event.target.value)
    } else {
      onValueChange?.(event.target.value)
    }
    onChange?.(event)
  }

  return (
    <div className={cn('flex w-full flex-col gap-1.5', slotClassNames?.root)}>
      {label ? (
        <label
          htmlFor={inputId}
          className={cn('text-sm font-medium text-slate-700 dark:text-slate-200', slotClassNames?.label)}
        >
          {label}
        </label>
      ) : null}
      <div
        className={cn(
          'flex items-center rounded-md border border-slate-300 bg-white transition focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-100 dark:border-slate-700 dark:bg-slate-900',
          disabled && 'opacity-60',
          {
            'h-8 px-2': size === 'sm',
            'h-10 px-3': size === 'md',
            'h-11 px-3.5': size === 'lg',
          },
          error && 'border-red-500 focus-within:border-red-500 focus-within:ring-red-100',
          slotClassNames?.input,
        )}
      >
        {prefix ? (
          <span className={cn('mr-2 text-slate-500 dark:text-slate-400', slotClassNames?.prefix)}>{prefix}</span>
        ) : null}
        <input
          ref={ref}
          id={inputId}
          value={mergedValue}
          disabled={disabled}
          className={cn(
            'nova-focus-ring w-full border-none bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-slate-100',
            className,
          )}
          onChange={handleChange}
          {...props}
        />
        {suffix ? (
          <span className={cn('ml-2 text-slate-500 dark:text-slate-400', slotClassNames?.suffix)}>{suffix}</span>
        ) : null}
      </div>
      {error ? (
        <p role="alert" className="text-xs text-red-600">
          {error}
        </p>
      ) : helperText ? (
        <p className="text-xs text-slate-500 dark:text-slate-400">{helperText}</p>
      ) : null}
    </div>
  )
})
