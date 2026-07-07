import { forwardRef, type ButtonHTMLAttributes, type MouseEvent, type ReactNode } from 'react'
import { cn } from '../../../../utils/cn'
import { useControllableState } from '../../../../utils/useControllableState'

export interface SwitchProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked?: boolean
  defaultChecked?: boolean
  checkedChildren?: ReactNode
  unCheckedChildren?: ReactNode
  onChange?: (checked: boolean) => void
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(function Switch(
  {
    className,
    checked,
    defaultChecked,
    checkedChildren,
    unCheckedChildren,
    onChange,
    onClick,
    disabled,
    ...props
  },
  ref,
) {
  const [innerChecked, setInnerChecked] = useControllableState<boolean>({
    value: checked,
    defaultValue: defaultChecked ?? false,
    onChange,
  })
  const hasStateContent = checkedChildren !== undefined || unCheckedChildren !== undefined
  const stateContent = innerChecked ? checkedChildren : unCheckedChildren

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event)
    if (event.defaultPrevented || disabled) return

    setInnerChecked(!innerChecked)
  }

  return (
    <button
      ref={ref}
      type="button"
      role="switch"
      aria-checked={innerChecked}
      disabled={disabled}
      onClick={handleClick}
      className={cn(
        'nova-focus-ring relative inline-grid h-6 items-center rounded-full px-0.5 transition',
        hasStateContent ? 'min-w-14' : 'w-11',
        innerChecked ? 'bg-brand-500' : 'bg-slate-300 dark:bg-slate-600',
        disabled && 'opacity-60',
        className,
      )}
      {...props}
    >
      {hasStateContent ? (
        <span
          aria-hidden="true"
          className="invisible grid whitespace-nowrap px-4 text-[10px] font-medium leading-none"
        >
          <span className="col-start-1 row-start-1">{checkedChildren}</span>
          <span className="col-start-1 row-start-1">{unCheckedChildren}</span>
        </span>
      ) : null}
      {hasStateContent ? (
        <span
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute inset-y-0 flex items-center overflow-hidden truncate text-[10px] font-medium leading-none text-white',
            innerChecked ? 'left-1.5 right-6 justify-start' : 'left-6 right-1.5 justify-end text-slate-700 dark:text-slate-100',
          )}
        >
          {stateContent}
        </span>
      ) : null}
      <span
        className={cn(
          'absolute top-0.5 z-10 inline-block h-5 w-5 rounded-full bg-white shadow transition',
          innerChecked ? 'right-0.5' : 'left-0.5',
        )}
      />
    </button>
  )
})
