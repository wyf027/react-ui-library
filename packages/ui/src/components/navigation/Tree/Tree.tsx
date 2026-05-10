import { forwardRef, type HTMLAttributes, type ReactNode, useMemo } from 'react'
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

function flattenKeys(nodes: TreeNode[]): string[] {
  return nodes.flatMap((node) => [node.key, ...(node.children ? flattenKeys(node.children) : [])])
}

export const Tree = forwardRef<HTMLDivElement, TreeProps>(function Tree(
  { className, data, expandedKeys, defaultExpandedKeys = [], onExpand, ...props },
  ref,
) {
  const allKeys = useMemo(() => flattenKeys(data), [data])
  const [current, setCurrent] = useControllableState<string[]>({
    value: expandedKeys,
    defaultValue: defaultExpandedKeys,
    onChange: onExpand,
  })

  const renderNode = (node: TreeNode, depth = 0) => {
    const hasChildren = Boolean(node.children?.length)
    const expanded = current.includes(node.key)

    return (
      <div key={node.key}>
        <button
          type="button"
          onClick={() => {
            if (!hasChildren) return
            setCurrent(expanded ? current.filter((k) => k !== node.key) : [...current, node.key])
          }}
          className="nova-focus-ring flex w-full items-center gap-2 rounded px-2 py-1 text-left text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
        >
          <span className="inline-block w-4 text-center text-xs">{hasChildren ? (expanded ? '▾' : '▸') : '•'}</span>
          <span>{node.title}</span>
        </button>
        {hasChildren && expanded ? node.children?.map((child) => renderNode(child, depth + 1)) : null}
      </div>
    )
  }

  return (
    <div ref={ref} className={cn('rounded-lg border border-slate-200 bg-white p-2 dark:border-slate-700 dark:bg-slate-900', className)} data-tree-keys={allKeys.length} {...props}>
      {data.map((node) => renderNode(node))}
    </div>
  )
})
