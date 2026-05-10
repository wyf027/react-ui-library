import { forwardRef, type ChangeEvent, type InputHTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../../../utils/cn'

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type'> {
  label?: ReactNode
  onChange?: (value: string) => void
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { className, label, value, onChange, disabled, ...props },
  ref,
) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      onChange?.(String(value ?? ''))
    }
  }

  return (
    <label className={cn('inline-flex cursor-pointer items-center gap-2 text-sm text-slate-700 dark:text-slate-200', disabled && 'cursor-not-allowed opacity-60', className)}>
      <input
        ref={ref}
        type="radio"
        value={value}
        disabled={disabled}
        onChange={handleChange}
        className="nova-focus-ring h-4 w-4 border-slate-300 text-brand-500"
        {...props}
      />
      {label}
    </label>
  )
})
