import {
  forwardRef,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
  useId,
  useMemo,
  useRef,
} from 'react'
import { cn } from '../../../utils/cn'
import { useControllableState } from '../../../utils/useControllableState'

export interface TabItem {
  key: string
  label: ReactNode
  content: ReactNode
  disabled?: boolean
}

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  items: TabItem[]
  activeKey?: string
  defaultActiveKey?: string
  onChange?: (activeKey: string) => void
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  { className, items, activeKey, defaultActiveKey, onChange, ...props },
  ref,
) {
  const firstEnabled = items.find((item) => !item.disabled)?.key ?? ''
  const tabsId = useId()
  const tabRefs = useRef(new Map<string, HTMLButtonElement>())
  const enabledItems = useMemo(() => items.filter((item) => !item.disabled), [items])
  const [current, setCurrent] = useControllableState<string>({
    value: activeKey,
    defaultValue: defaultActiveKey ?? firstEnabled,
    onChange,
  })

  const activeItem = items.find((item) => item.key === current)
  const activeIndex = items.findIndex((item) => item.key === current)
  const activeTabId = activeIndex >= 0 ? `${tabsId}-tab-${activeIndex}` : undefined
  const activePanelId = activeIndex >= 0 ? `${tabsId}-panel-${activeIndex}` : `${tabsId}-panel`

  const focusTab = (key: string) => {
    requestAnimationFrame(() => {
      tabRefs.current.get(key)?.focus()
    })
  }

  const selectTab = (key: string) => {
    setCurrent(key)
    focusTab(key)
  }

  const getRelativeEnabledItem = (key: string, offset: number) => {
    if (enabledItems.length === 0) {
      return undefined
    }

    const currentEnabledIndex = Math.max(
      enabledItems.findIndex((item) => item.key === key),
      0,
    )
    return enabledItems[(currentEnabledIndex + offset + enabledItems.length) % enabledItems.length]
  }

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, key: string) => {
    const keyMap: Record<string, () => TabItem | undefined> = {
      ArrowRight: () => getRelativeEnabledItem(key, 1),
      ArrowDown: () => getRelativeEnabledItem(key, 1),
      ArrowLeft: () => getRelativeEnabledItem(key, -1),
      ArrowUp: () => getRelativeEnabledItem(key, -1),
      Home: () => enabledItems[0],
      End: () => enabledItems[enabledItems.length - 1],
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
    selectTab(nextItem.key)
  }

  return (
    <div ref={ref} className={cn('w-full', className)} {...props}>
      <div
        role="tablist"
        aria-orientation="horizontal"
        className="flex items-center gap-2 border-b border-slate-200 pb-2 dark:border-slate-700"
      >
        {items.map((item, index) => {
          const selected = item.key === current
          const tabId = `${tabsId}-tab-${index}`
          const panelId = `${tabsId}-panel-${index}`

          return (
            <button
              key={item.key}
              ref={(node) => {
                if (node) {
                  tabRefs.current.set(item.key, node)
                } else {
                  tabRefs.current.delete(item.key)
                }
              }}
              type="button"
              role="tab"
              id={tabId}
              aria-selected={selected}
              aria-controls={panelId}
              tabIndex={selected ? 0 : -1}
              disabled={item.disabled}
              onKeyDown={(event) => handleTabKeyDown(event, item.key)}
              onClick={() => setCurrent(item.key)}
              className={cn(
                'nova-focus-ring rounded-md px-3 py-1.5 text-sm font-medium',
                selected
                  ? 'bg-brand-500 text-white'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800',
              )}
            >
              {item.label}
            </button>
          )
        })}
      </div>
      <div
        id={activePanelId}
        role="tabpanel"
        tabIndex={0}
        aria-labelledby={activeTabId}
        className="pt-3"
      >
        {activeItem?.content}
      </div>
    </div>
  )
})
