import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../../../utils/cn'
import { Tree, type TreeNode } from '../../navigation/Tree'
import { useControllableState } from '../../../utils/useControllableState'

export interface TreeSelectProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  data: TreeNode[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
}

function findTitle(nodes: TreeNode[], key: string): string | null {
  for (const node of nodes) {
    if (node.key === key) return String(node.title)
    if (node.children?.length) {
      const found = findTitle(node.children, key)
      if (found) return found
    }
  }
  return null
}

function collectKeys(nodes: TreeNode[]): string[] {
  return nodes.flatMap((node) => [node.key, ...(node.children ? collectKeys(node.children) : [])])
}

export const TreeSelect = forwardRef<HTMLDivElement, TreeSelectProps>(function TreeSelect(
  { className, data, value, defaultValue = '', onChange, ...props },
  ref,
) {
  const [current, setCurrent] = useControllableState<string>({
    value,
    defaultValue,
    onChange,
  })

  const keys = collectKeys(data)

  return (
    <div ref={ref} className={cn('space-y-2', className)} {...props}>
      <div className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
        {current ? findTitle(data, current) ?? current : '请选择节点'}
      </div>
      <Tree
        data={data}
        expandedKeys={keys}
        onClick={(event) => {
          const target = event.target as HTMLElement | null
          const btn = target?.closest('button')
          if (!btn) return
          const text = btn.textContent?.trim()
          const matched = keys.find((k) => text?.includes(k))
          if (matched) {
            setCurrent(matched)
          }
        }}
      />
    </div>
  )
})
