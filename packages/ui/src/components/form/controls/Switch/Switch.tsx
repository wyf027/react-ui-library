import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '../../../../utils/cn'
import { useControllableState } from '../../../../utils/useControllableState'

export interface SwitchProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked?: boolean
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(function Switch(
  { className, checked, defaultChecked, onChange, disabled, ...props },
  ref,
) {
  const [innerChecked, setInnerChecked] = useControllableState<boolean>({
    value: checked,
    defaultValue: defaultChecked ?? false,
    onChange,
  })

  return (
    <button
      ref={ref}
      type="button"
      role="switch"
      aria-checked={innerChecked}
      disabled={disabled}
      onClick={() => setInnerChecked(!innerChecked)}
      className={cn(
        'nova-focus-ring relative inline-flex h-6 w-11 items-center rounded-full transition',
        innerChecked ? 'bg-brand-500' : 'bg-slate-300 dark:bg-slate-600',
        disabled && 'opacity-60',
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          'inline-block h-5 w-5 transform rounded-full bg-white shadow transition',
          innerChecked ? 'translate-x-5' : 'translate-x-0.5',
        )}
      />
    </button>
  )
})
