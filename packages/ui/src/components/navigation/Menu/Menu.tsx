import {
  forwardRef,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
  useMemo,
  useState,
} from 'react'
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
  const enabledItems = useMemo(() => items.filter((item) => !item.disabled), [items])
  const [activeKey, setActiveKey] = useState<string | undefined>(
    selectedKey ?? enabledItems[0]?.key,
  )

  const onKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    if (!enabledItems.length) return
    const currentIndex = enabledItems.findIndex((item) => item.key === activeKey)
    if (event.key === 'ArrowDown' || (mode === 'horizontal' && event.key === 'ArrowRight')) {
      event.preventDefault()
      const next = enabledItems[(currentIndex + 1) % enabledItems.length]
      setActiveKey(next?.key)
      onChange?.(next.key)
    }
    if (event.key === 'ArrowUp' || (mode === 'horizontal' && event.key === 'ArrowLeft')) {
      event.preventDefault()
      const prev = enabledItems[(currentIndex - 1 + enabledItems.length) % enabledItems.length]
      setActiveKey(prev?.key)
      onChange?.(prev.key)
    }
  }

  return (
    <ul
      ref={ref}
      role="menu"
      onKeyDown={onKeyDown}
      className={cn(
        'list-none p-0',
        mode === 'horizontal' ? 'flex items-center gap-2' : 'flex flex-col gap-1',
        className,
      )}
      {...props}
    >
      {items.map((item) => (
        <li key={item.key} role="none">
          <button
            type="button"
            role="menuitem"
            tabIndex={(selectedKey ?? activeKey) === item.key ? 0 : -1}
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
