import {
  forwardRef,
  type ChangeEvent,
  type InputHTMLAttributes,
  type ReactNode,
  useId,
} from 'react'
import { cn } from '../../../../utils/cn'
import { useControllableState } from '../../../../utils/useControllableState'

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: ReactNode
  helperText?: ReactNode
  error?: ReactNode
  checked?: boolean
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  {
    className,
    checked,
    defaultChecked,
    onChange,
    label,
    helperText,
    error,
    disabled,
    id,
    'aria-describedby': ariaDescribedBy,
    'aria-invalid': ariaInvalid,
    ...props
  },
  ref,
) {
  const generatedId = useId()
  const checkboxId = id ?? generatedId
  const helperId = helperText && !error ? `${checkboxId}-helper` : undefined
  const errorId = error ? `${checkboxId}-error` : undefined
  const descriptionIds = [ariaDescribedBy, errorId ?? helperId].filter(Boolean).join(' ') || undefined
  const [innerChecked, setInnerChecked] = useControllableState<boolean>({
    value: checked,
    defaultValue: defaultChecked ?? false,
    onChange,
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInnerChecked(event.target.checked)
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
        id={checkboxId}
        type="checkbox"
        checked={innerChecked}
        disabled={disabled}
        aria-describedby={descriptionIds}
        aria-invalid={ariaInvalid ?? (error ? true : undefined)}
        onChange={handleChange}
        className="nova-focus-ring h-4 w-4 rounded border-slate-300 text-brand-500"
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
