import { forwardRef, type ChangeEvent, type InputHTMLAttributes } from 'react'
import { useControllableState } from '../../../../utils/useControllableState'
import { cn } from '../../../../utils/cn'

export interface DatePickerProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(function DatePicker(
  { className, value, defaultValue, onChange, disabled, ...props },
  ref,
) {
  const [dateValue, setDateValue] = useControllableState<string>({
    value,
    defaultValue: defaultValue ?? '',
    onChange,
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDateValue(event.target.value)
  }

  return (
    <input
      ref={ref}
      type="date"
      value={dateValue}
      disabled={disabled}
      onChange={handleChange}
      className={cn(
        'nova-focus-ring h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100',
        className,
      )}
      {...props}
    />
  )
})
