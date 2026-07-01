import { forwardRef, type HTMLAttributes, useMemo } from 'react'
import { cn } from '../../../utils/cn'
import { useControllableState } from '../../../utils/useControllableState'

export interface TransferItem {
  key: string
  title: string
  disabled?: boolean
}

export interface TransferProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  dataSource: TransferItem[]
  targetKeys?: string[]
  defaultTargetKeys?: string[]
  onChange?: (nextTargetKeys: string[]) => void
}

export const Transfer = forwardRef<HTMLDivElement, TransferProps>(function Transfer(
  {
    className,
    dataSource,
    targetKeys,
    defaultTargetKeys = [],
    onChange,
    ...props
  },
  ref,
) {
  const [currentTargetKeys, setCurrentTargetKeys] = useControllableState<string[]>({
    value: targetKeys,
    defaultValue: defaultTargetKeys,
    onChange,
  })

  const sourceItems = useMemo(
    () => dataSource.filter((item) => !currentTargetKeys.includes(item.key)),
    [currentTargetKeys, dataSource],
  )
  const targetItems = useMemo(
    () => dataSource.filter((item) => currentTargetKeys.includes(item.key)),
    [currentTargetKeys, dataSource],
  )

  const moveToTarget = (key: string) => {
    if (currentTargetKeys.includes(key)) return
    setCurrentTargetKeys([...currentTargetKeys, key])
  }

  const moveToSource = (key: string) => {
    setCurrentTargetKeys(currentTargetKeys.filter((it) => it !== key))
  }

  return (
    <div ref={ref} className={cn('grid grid-cols-[1fr_auto_1fr] items-center gap-3', className)} {...props}>
      <div className="rounded-lg border border-slate-200 bg-white p-2 dark:border-slate-700 dark:bg-slate-900">
        <p className="mb-2 text-xs font-medium text-slate-500">Source</p>
        <ul className="max-h-48 space-y-1 overflow-auto">
          {sourceItems.map((item) => (
            <li key={item.key}>
              <button
                type="button"
                disabled={item.disabled}
                onClick={() => moveToTarget(item.key)}
                className="nova-focus-ring w-full rounded px-2 py-1 text-left text-sm text-slate-700 hover:bg-slate-100 disabled:opacity-50 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                {item.title}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="text-slate-400">⇄</div>

      <div className="rounded-lg border border-slate-200 bg-white p-2 dark:border-slate-700 dark:bg-slate-900">
        <p className="mb-2 text-xs font-medium text-slate-500">Target</p>
        <ul className="max-h-48 space-y-1 overflow-auto">
          {targetItems.map((item) => (
            <li key={item.key}>
              <button
                type="button"
                disabled={item.disabled}
                onClick={() => moveToSource(item.key)}
                className="nova-focus-ring w-full rounded px-2 py-1 text-left text-sm text-slate-700 hover:bg-slate-100 disabled:opacity-50 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                {item.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
})
