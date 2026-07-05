import {
  forwardRef,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { cn } from '../../../utils/cn'
import { useControllableState } from '../../../utils/useControllableState'

export interface TreeNode {
  key: string
  title: ReactNode
  children?: TreeNode[]
}

export interface TreeProps extends HTMLAttributes<HTMLDivElement> {
  data: TreeNode[]
  expandedKeys?: string[]
  defaultExpandedKeys?: string[]
  onExpand?: (keys: string[]) => void
}

interface VisibleTreeNode {
  node: TreeNode
  level: number
  parentKey?: string
  index: number
  setSize: number
}

function flattenKeys(nodes: TreeNode[]): string[] {
  return nodes.flatMap((node) => [node.key, ...(node.children ? flattenKeys(node.children) : [])])
}

function flattenVisibleNodes(
  nodes: TreeNode[],
  expandedKeys: string[],
  level = 1,
  parentKey?: string,
): VisibleTreeNode[] {
  return nodes.flatMap((node, index) => {
    const currentNode = {
      node,
      level,
      parentKey,
      index: index + 1,
      setSize: nodes.length,
    }
    const expandedChildren =
      node.children?.length && expandedKeys.includes(node.key)
        ? flattenVisibleNodes(node.children, expandedKeys, level + 1, node.key)
        : []

    return [currentNode, ...expandedChildren]
  })
}

export const Tree = forwardRef<HTMLDivElement, TreeProps>(function Tree(
  {
    className,
    data,
    expandedKeys,
    defaultExpandedKeys = [],
    onExpand,
    onKeyDown,
    role = 'tree',
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    ...props
  },
  ref,
) {
  const allKeys = useMemo(() => flattenKeys(data), [data])
  const [current, setCurrent] = useControllableState<string[]>({
    value: expandedKeys,
    defaultValue: defaultExpandedKeys,
    onChange: onExpand,
  })
  const visibleNodes = useMemo(() => flattenVisibleNodes(data, current), [current, data])
  const nodeRefs = useRef(new Map<string, HTMLButtonElement>())
  const [focusedKey, setFocusedKey] = useState(() => visibleNodes[0]?.node.key ?? '')
  const resolvedAriaLabel = ariaLabel ?? (ariaLabelledBy ? undefined : 'Tree')

  useEffect(() => {
    if (!visibleNodes.some((item) => item.node.key === focusedKey)) {
      setFocusedKey(visibleNodes[0]?.node.key ?? '')
    }
  }, [focusedKey, visibleNodes])

  const focusNode = useCallback((key: string) => {
    setFocusedKey(key)
    nodeRefs.current.get(key)?.focus()
  }, [])

  const expandNode = useCallback(
    (key: string) => {
      if (!current.includes(key)) {
        setCurrent([...current, key])
      }
    },
    [current, setCurrent],
  )

  const collapseNode = useCallback(
    (key: string) => {
      if (current.includes(key)) {
        setCurrent(current.filter((item) => item !== key))
      }
    },
    [current, setCurrent],
  )

  const toggleNode = useCallback(
    (node: TreeNode) => {
      if (!node.children?.length) return
      if (current.includes(node.key)) {
        collapseNode(node.key)
      } else {
        expandNode(node.key)
      }
    },
    [collapseNode, current, expandNode],
  )

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(event)
      if (event.defaultPrevented || visibleNodes.length === 0) return

      const target = event.target as HTMLElement | null
      const targetKey = target?.closest('[data-tree-node-key]')?.getAttribute('data-tree-node-key')
      const activeKey = targetKey ?? focusedKey
      const activeIndex = visibleNodes.findIndex((item) => item.node.key === activeKey)
      if (activeIndex < 0) return

      const activeItem = visibleNodes[activeIndex]
      const hasChildren = Boolean(activeItem.node.children?.length)
      const expanded = current.includes(activeItem.node.key)

      if (event.key === 'ArrowDown') {
        event.preventDefault()
        focusNode(visibleNodes[Math.min(activeIndex + 1, visibleNodes.length - 1)].node.key)
      } else if (event.key === 'ArrowUp') {
        event.preventDefault()
        focusNode(visibleNodes[Math.max(activeIndex - 1, 0)].node.key)
      } else if (event.key === 'Home') {
        event.preventDefault()
        focusNode(visibleNodes[0].node.key)
      } else if (event.key === 'End') {
        event.preventDefault()
        focusNode(visibleNodes[visibleNodes.length - 1].node.key)
      } else if (event.key === 'ArrowRight' && hasChildren) {
        event.preventDefault()
        if (!expanded) {
          expandNode(activeItem.node.key)
        } else if (activeItem.node.children?.[0]) {
          focusNode(activeItem.node.children[0].key)
        }
      } else if (event.key === 'ArrowLeft') {
        if (hasChildren && expanded) {
          event.preventDefault()
          collapseNode(activeItem.node.key)
        } else if (activeItem.parentKey) {
          event.preventDefault()
          focusNode(activeItem.parentKey)
        }
      } else if ((event.key === 'Enter' || event.key === ' ') && hasChildren) {
        event.preventDefault()
        toggleNode(activeItem.node)
      }
    },
    [collapseNode, current, expandNode, focusedKey, focusNode, onKeyDown, toggleNode, visibleNodes],
  )

  const renderNode = (node: TreeNode, depth = 0, index = 1, setSize = data.length) => {
    const hasChildren = Boolean(node.children?.length)
    const expanded = current.includes(node.key)

    return (
      <div key={node.key}>
        <button
          type="button"
          role="treeitem"
          aria-expanded={hasChildren ? expanded : undefined}
          aria-level={depth + 1}
          aria-posinset={index}
          aria-setsize={setSize}
          tabIndex={node.key === focusedKey ? 0 : -1}
          data-tree-node-key={node.key}
          ref={(element) => {
            if (element) {
              nodeRefs.current.set(node.key, element)
            } else {
              nodeRefs.current.delete(node.key)
            }
          }}
          onClick={() => {
            setFocusedKey(node.key)
            toggleNode(node)
          }}
          className="nova-focus-ring flex w-full items-center gap-2 rounded px-2 py-1 text-left text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
        >
          <span aria-hidden="true" className="inline-block w-4 text-center text-xs">
            {hasChildren ? (expanded ? '▾' : '▸') : '•'}
          </span>
          <span>{node.title}</span>
        </button>
        {hasChildren && expanded ? (
          <div role="group">
            {node.children?.map((child, childIndex) =>
              renderNode(child, depth + 1, childIndex + 1, node.children?.length ?? 0),
            )}
          </div>
        ) : null}
      </div>
    )
  }

  return (
    <div
      ref={ref}
      role={role}
      aria-label={resolvedAriaLabel}
      aria-labelledby={ariaLabelledBy}
      onKeyDown={handleKeyDown}
      className={cn(
        'rounded-lg border border-slate-200 bg-white p-2 dark:border-slate-700 dark:bg-slate-900',
        className,
      )}
      data-tree-keys={allKeys.length}
      {...props}
    >
      {data.map((node, index) => renderNode(node, 0, index + 1, data.length))}
    </div>
  )
})
