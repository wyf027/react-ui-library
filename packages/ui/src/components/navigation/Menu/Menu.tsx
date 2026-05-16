import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from 'react'

import { cn } from '../../../utils/cn'

export interface MenuItem {
  key: string
  label: ReactNode
  disabled?: boolean
  children?: MenuItem[]
}

export interface MenuProps extends Omit<HTMLAttributes<HTMLUListElement>, 'onChange'> {
  items: MenuItem[]
  selectedKey?: string
  onChange?: (key: string) => void
  mode?: 'vertical' | 'horizontal'
  /** Controlled expanded submenu keys (`mode="vertical"` only; ignored for horizontal). */
  openKeys?: string[]
  defaultOpenKeys?: string[]
  onOpenChange?: (keys: string[]) => void
}

function stripChildren(nodes: MenuItem[]): MenuItem[] {
  return nodes.map(({ children: _c, ...rest }) => ({ ...rest }))
}

function findItem(nodes: MenuItem[], key: string): MenuItem | undefined {
  for (const node of nodes) {
    if (node.key === key) {
      return node
    }
    if (node.children?.length) {
      const nested = findItem(node.children, key)
      if (nested) {
        return nested
      }
    }
  }
  return undefined
}

function buildParentMap(nodes: MenuItem[]): Map<string, string | null> {
  const map = new Map<string, string | null>()
  function walk(list: MenuItem[], parent: string | null) {
    for (const node of list) {
      map.set(node.key, parent)
      if (node.children?.length) {
        walk(node.children, node.key)
      }
    }
  }
  walk(nodes, null)
  return map
}

/** Depth-first visible order: parent, then children if parent key is in openKeys. */
function flattenVisible(nodes: MenuItem[], open: Set<string>): MenuItem[] {
  const out: MenuItem[] = []
  for (const node of nodes) {
    out.push(node)
    if (node.children?.length && open.has(node.key)) {
      out.push(...flattenVisible(node.children, open))
    }
  }
  return out
}

function firstEnabledKey(order: MenuItem[]): string | null {
  const hit = order.find((n) => !n.disabled)
  return hit?.key ?? null
}

function nextEnabledKey(order: MenuItem[], currentKey: string | null, delta: number): string | null {
  const enabled = order.filter((n) => !n.disabled)
  if (enabled.length === 0) {
    return null
  }
  if (!currentKey) {
    return enabled[0].key
  }
  const idx = enabled.findIndex((n) => n.key === currentKey)
  if (idx === -1) {
    return enabled[0].key
  }
  const next = (idx + delta + enabled.length) % enabled.length
  return enabled[next].key
}

function safeDomId(prefix: string, key: string) {
  return `${prefix}-${key.replace(/[^a-zA-Z0-9_-]/g, '_')}`
}

export const Menu = forwardRef<HTMLUListElement, MenuProps>(function Menu(
  {
    className,
    items,
    selectedKey,
    onChange,
    mode = 'vertical',
    openKeys: openKeysProp,
    defaultOpenKeys,
    onOpenChange,
    ...props
  },
  ref,
) {
  const reactId = useId().replace(/:/g, '')
  const horizontal = mode === 'horizontal'
  const treeItems = horizontal ? stripChildren(items) : items

  const openControlled = openKeysProp !== undefined
  const [internalOpenKeys, setInternalOpenKeys] = useState<string[]>(() => defaultOpenKeys ?? [])
  const openKeys = openControlled ? openKeysProp! : internalOpenKeys

  const setOpenKeys = useCallback(
    (next: string[]) => {
      onOpenChange?.(next)
      if (!openControlled) {
        setInternalOpenKeys(next)
      }
    },
    [onOpenChange, openControlled],
  )

  const toggleKey = useCallback(
    (key: string) => {
      setOpenKeys(openKeys.includes(key) ? openKeys.filter((k) => k !== key) : [...openKeys, key])
    },
    [openKeys, setOpenKeys],
  )

  const openSet = useMemo(() => new Set(openKeys), [openKeys])
  const parentMap = useMemo(() => buildParentMap(treeItems), [treeItems])
  const navigationOrder = useMemo(
    () => (horizontal ? flattenVisible(treeItems, new Set()) : flattenVisible(treeItems, openSet)),
    [horizontal, treeItems, openSet],
  )

  const btnRefs = useRef<Map<string, HTMLButtonElement>>(new Map())
  const registerBtn = useCallback((key: string, el: HTMLButtonElement | null) => {
    if (el) {
      btnRefs.current.set(key, el)
    } else {
      btnRefs.current.delete(key)
    }
  }, [])

  const [focusKey, setFocusKey] = useState<string | null>(null)
  const defaultFocus = useMemo(() => firstEnabledKey(navigationOrder), [navigationOrder])
  const effectiveFocusKey = focusKey ?? defaultFocus

  useEffect(() => {
    if (focusKey !== null && !navigationOrder.some((n) => n.key === focusKey)) {
      setFocusKey(null)
    }
  }, [navigationOrder, focusKey])

  const focusButton = useCallback((key: string | null) => {
    if (!key) {
      return
    }
    btnRefs.current.get(key)?.focus()
  }, [])

  const handleKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    const target = event.target as HTMLElement | null
    if (!target || target.tagName !== 'BUTTON') {
      return
    }
    const currentKey = target.dataset.menuItemKey
    if (!currentKey) {
      return
    }

    const item = findItem(treeItems, currentKey)
    if (!item || item.disabled) {
      return
    }

    const prevNextKeys = horizontal ? ['ArrowLeft', 'ArrowRight'] : ['ArrowUp', 'ArrowDown']

    if (event.key === 'Home') {
      event.preventDefault()
      const next = firstEnabledKey(navigationOrder)
      setFocusKey(next)
      focusButton(next)
      return
    }

    if (event.key === 'End') {
      event.preventDefault()
      const enabled = navigationOrder.filter((n) => !n.disabled)
      const last = enabled[enabled.length - 1]?.key ?? null
      setFocusKey(last)
      focusButton(last)
      return
    }

    if (event.key === prevNextKeys[0]) {
      event.preventDefault()
      const next = nextEnabledKey(navigationOrder, currentKey, -1)
      setFocusKey(next)
      focusButton(next)
      return
    }

    if (event.key === prevNextKeys[1]) {
      event.preventDefault()
      const next = nextEnabledKey(navigationOrder, currentKey, 1)
      setFocusKey(next)
      focusButton(next)
      return
    }

    if (!horizontal && event.key === 'ArrowRight' && item.children?.length) {
      event.preventDefault()
      if (!openKeys.includes(item.key)) {
        setOpenKeys([...openKeys, item.key])
      }
      const firstChild = item.children.find((c) => !c.disabled) ?? item.children[0]
      if (firstChild && !firstChild.disabled) {
        setFocusKey(firstChild.key)
        focusButton(firstChild.key)
      }
      return
    }

    if (!horizontal && event.key === 'ArrowLeft') {
      const parentKey = parentMap.get(currentKey)
      if (parentKey != null && openKeys.includes(parentKey)) {
        event.preventDefault()
        setOpenKeys(openKeys.filter((k) => k !== parentKey))
        setFocusKey(parentKey)
        focusButton(parentKey)
      }
      return
    }

    if (event.key === 'Escape') {
      if (horizontal) {
        return
      }
      const parentKey = parentMap.get(currentKey)
      if (parentKey != null && openKeys.includes(parentKey)) {
        event.preventDefault()
        event.stopPropagation()
        setOpenKeys(openKeys.filter((k) => k !== parentKey))
        setFocusKey(parentKey)
        focusButton(parentKey)
        return
      }
      if (item.children?.length && openKeys.includes(currentKey)) {
        event.preventDefault()
        event.stopPropagation()
        setOpenKeys(openKeys.filter((k) => k !== currentKey))
      }
    }
  }

  const listRole = horizontal ? 'menubar' : 'menu'

  const renderBranch = (nodes: MenuItem[], depth: number): ReactNode => {
    return nodes.map((node) => {
      const hasChildren = Boolean(node.children?.length)
      const isOpen = hasChildren && openKeys.includes(node.key)
      const buttonId = safeDomId(reactId, node.key)
      const submenuId = `${buttonId}-sub`

      const tabFocus = node.key === effectiveFocusKey

      if (!hasChildren) {
        return (
          <li key={node.key} role="none">
            <button
              id={buttonId}
              ref={(el) => registerBtn(node.key, el)}
              type="button"
              role="menuitem"
              tabIndex={tabFocus ? 0 : -1}
              disabled={node.disabled}
              data-menu-item-key={node.key}
              aria-current={selectedKey === node.key ? 'page' : undefined}
              onFocus={() => setFocusKey(node.key)}
              onClick={() => onChange?.(node.key)}
              className={cn(
                'nova-focus-ring w-full rounded-md px-3 py-2 text-left text-sm',
                horizontal && 'text-center',
                selectedKey === node.key
                  ? 'bg-brand-500 text-white'
                  : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800',
                node.disabled && 'cursor-not-allowed opacity-50',
              )}
            >
              {node.label}
            </button>
          </li>
        )
      }

      return (
        <li key={node.key} role="none" className={cn(!horizontal && 'flex flex-col gap-1')}>
          <button
            id={buttonId}
            ref={(el) => registerBtn(node.key, el)}
            type="button"
            role="menuitem"
            tabIndex={tabFocus ? 0 : -1}
            disabled={node.disabled}
            data-menu-item-key={node.key}
            aria-haspopup="menu"
            aria-expanded={isOpen}
            aria-controls={submenuId}
            onFocus={() => setFocusKey(node.key)}
            onClick={() => {
              if (!node.disabled) {
                toggleKey(node.key)
              }
            }}
            className={cn(
              'nova-focus-ring w-full rounded-md px-3 py-2 text-left text-sm',
              horizontal && 'text-center',
              'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800',
              node.disabled && 'cursor-not-allowed opacity-50',
            )}
          >
            {node.label}
          </button>
          {isOpen ? (
            <ul
              id={submenuId}
              role="menu"
              aria-labelledby={buttonId}
              className={cn(
                'list-none space-y-1 p-0',
                !horizontal && depth === 0 && 'ml-3 border-l border-slate-200 pl-3 dark:border-slate-700',
              )}
            >
              {renderBranch(node.children!, depth + 1)}
            </ul>
          ) : null}
        </li>
      )
    })
  }

  return (
    <ul
      ref={ref}
      role={listRole}
      data-nova-menu-mode={mode}
      className={cn(
        'list-none p-0',
        horizontal ? 'flex flex-wrap items-center gap-2' : 'flex flex-col gap-1',
        className,
      )}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {renderBranch(treeItems, 0)}
    </ul>
  )
})
