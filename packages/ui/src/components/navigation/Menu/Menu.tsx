import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export interface MenuItem {
  key: string
  label: ReactNode
  disabled?: boolean
}

export interface MenuProps extends Omit<HTMLAttributes<HTMLUListElement>, 'onChange'> {
  items: MenuItem[]
  selectedKey?: string
  onChange?: (key: string) => void
  mode?: 'vertical' | 'horizontal'
}

export const Menu = forwardRef<HTMLUListElement, MenuProps>(function Menu(
  { className, items, selectedKey, onChange, mode = 'vertical', ...props },
  ref,
) {
  return (
    <ul
      ref={ref}
      role="menu"
      className={cn('list-none p-0', mode === 'horizontal' ? 'flex items-center gap-2' : 'flex flex-col gap-1', className)}
      {...props}
    >
      {items.map((item) => (
        <li key={item.key} role="none">
          <button
            type="button"
            role="menuitem"
            disabled={item.disabled}
            onClick={() => onChange?.(item.key)}
            className={cn(
              'nova-focus-ring rounded-md px-3 py-2 text-sm',
              selectedKey === item.key
                ? 'bg-brand-500 text-white'
                : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800',
            )}
          >
            {item.label}
          </button>
        </li>
      ))}
    </ul>
  )
})
