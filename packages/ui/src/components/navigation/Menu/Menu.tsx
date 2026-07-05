import {
  forwardRef,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
  useMemo,
  useRef,
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
  const itemRefs = useRef(new Map<string, HTMLButtonElement>())
  const [activeKey, setActiveKey] = useState<string | undefined>(
    selectedKey ?? enabledItems[0]?.key,
  )
  const currentKey = selectedKey ?? activeKey

  const focusItem = (key: string) => {
    requestAnimationFrame(() => {
      itemRefs.current.get(key)?.focus()
    })
  }

  const selectItem = (key: string) => {
    setActiveKey(key)
    focusItem(key)
    onChange?.(key)
  }

  const getRelativeItem = (offset: number) => {
    const currentIndex = Math.max(
      enabledItems.findIndex((item) => item.key === currentKey),
      0,
    )
    return enabledItems[(currentIndex + offset + enabledItems.length) % enabledItems.length]
  }

  const onKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    if (!enabledItems.length) return

    const keyMap: Record<string, () => MenuItem | undefined> = {
      Home: () => enabledItems[0],
      End: () => enabledItems[enabledItems.length - 1],
    }

    if (mode === 'horizontal') {
      keyMap.ArrowRight = () => getRelativeItem(1)
      keyMap.ArrowLeft = () => getRelativeItem(-1)
    } else {
      keyMap.ArrowDown = () => getRelativeItem(1)
      keyMap.ArrowUp = () => getRelativeItem(-1)
    }

    const getNextItem = keyMap[event.key]
    if (!getNextItem) {
      return
    }

    const nextItem = getNextItem()
    if (!nextItem) {
      return
    }

    event.preventDefault()
    selectItem(nextItem.key)
  }

  return (
    <ul
      ref={ref}
      role={mode === 'horizontal' ? 'menubar' : 'menu'}
      aria-orientation={mode}
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
            ref={(node) => {
              if (node) {
                itemRefs.current.set(item.key, node)
              } else {
                itemRefs.current.delete(item.key)
              }
            }}
            type="button"
            role="menuitem"
            tabIndex={currentKey === item.key ? 0 : -1}
            aria-current={currentKey === item.key ? 'page' : undefined}
            disabled={item.disabled}
            onClick={() => selectItem(item.key)}
            className={cn(
              'nova-focus-ring rounded-md px-3 py-2 text-sm',
              currentKey === item.key
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
