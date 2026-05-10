import { forwardRef, type HTMLAttributes, type ReactNode, useState } from 'react'
import { cn } from '../../../utils/cn'

export interface DropdownOption {
  key: string
  label: ReactNode
  disabled?: boolean
}

export interface DropdownProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  trigger: ReactNode
  options: DropdownOption[]
  onChange?: (key: string) => void
  open?: boolean
  defaultOpen?: boolean
  onOpen?: () => void
  onClose?: () => void
}

export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(function Dropdown(
  {
    className,
    trigger,
    options,
    onChange,
    open: controlledOpen,
    defaultOpen = false,
    onOpen,
    onClose,
    ...props
  },
  ref,
) {
  const [innerOpen, setInnerOpen] = useState(defaultOpen)
  const open = controlledOpen ?? innerOpen

  const setOpen = (next: boolean) => {
    if (controlledOpen === undefined) {
      setInnerOpen(next)
    }
    if (next) {
      onOpen?.()
    } else {
      onClose?.()
    }
  }

  return (
    <div ref={ref} className={cn('relative inline-flex', className)} {...props}>
      <button type="button" onClick={() => setOpen(!open)} className="inline-flex">
        {trigger}
      </button>
      {open ? (
        <ul role="menu" className="absolute right-0 top-full z-40 mt-2 min-w-40 rounded-lg border border-slate-200 bg-white p-1 shadow-lg dark:border-slate-700 dark:bg-slate-900">
          {options.map((item) => (
            <li key={item.key} role="none">
              <button
                type="button"
                role="menuitem"
                disabled={item.disabled}
                onClick={() => {
                  onChange?.(item.key)
                  setOpen(false)
                }}
                className="nova-focus-ring w-full rounded px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100 disabled:opacity-50 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
})
