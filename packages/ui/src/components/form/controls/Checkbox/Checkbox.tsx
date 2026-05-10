import { forwardRef, type ChangeEvent, type InputHTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../../../utils/cn'
import { useControllableState } from '../../../../utils/useControllableState'

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: ReactNode
  checked?: boolean
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { className, checked, defaultChecked, onChange, label, disabled, id, ...props },
  ref,
) {
  const [innerChecked, setInnerChecked] = useControllableState<boolean>({
    value: checked,
    defaultValue: defaultChecked ?? false,
    onChange,
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInnerChecked(event.target.checked)
  }

  return (
    <label className={cn('inline-flex cursor-pointer items-center gap-2 text-sm text-slate-700 dark:text-slate-200', disabled && 'cursor-not-allowed opacity-60', className)}>
      <input
        ref={ref}
        id={id}
        type="checkbox"
        checked={innerChecked}
        disabled={disabled}
        onChange={handleChange}
        className="nova-focus-ring h-4 w-4 rounded border-slate-300 text-brand-500"
        {...props}
      />
      {label}
    </label>
  )
})
