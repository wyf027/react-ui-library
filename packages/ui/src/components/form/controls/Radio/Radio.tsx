import {
  forwardRef,
  type ChangeEvent,
  type InputHTMLAttributes,
  type ReactNode,
  useId,
} from 'react'
import { cn } from '../../../../utils/cn'

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type'> {
  label?: ReactNode
  helperText?: ReactNode
  error?: ReactNode
  onChange?: (value: string) => void
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  {
    className,
    label,
    helperText,
    error,
    value,
    onChange,
    disabled,
    id,
    'aria-describedby': ariaDescribedBy,
    'aria-invalid': ariaInvalid,
    ...props
  },
  ref,
) {
  const generatedId = useId()
  const radioId = id ?? generatedId
  const helperId = helperText && !error ? `${radioId}-helper` : undefined
  const errorId = error ? `${radioId}-error` : undefined
  const descriptionIds = [ariaDescribedBy, errorId ?? helperId].filter(Boolean).join(' ') || undefined

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      onChange?.(String(value ?? ''))
    }
  }

  const control = (
    <label
      className={cn(
        'inline-flex cursor-pointer items-center gap-2 text-sm text-slate-700 dark:text-slate-200',
        disabled && 'cursor-not-allowed opacity-60',
        className,
      )}
    >
      <input
        ref={ref}
        id={radioId}
        type="radio"
        value={value}
        disabled={disabled}
        aria-describedby={descriptionIds}
        aria-invalid={ariaInvalid ?? (error ? true : undefined)}
        onChange={handleChange}
        className="nova-focus-ring h-4 w-4 border-slate-300 text-brand-500"
        {...props}
      />
      {label}
    </label>
  )

  if (!helperText && !error) return control

  return (
    <div className="inline-flex flex-col gap-1">
      {control}
      {error ? (
        <p id={errorId} role="alert" className="pl-6 text-xs text-red-600">
          {error}
        </p>
      ) : helperText ? (
        <p id={helperId} className="pl-6 text-xs text-slate-500 dark:text-slate-400">
          {helperText}
        </p>
      ) : null}
    </div>
  )
})
