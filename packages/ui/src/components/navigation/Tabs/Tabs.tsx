import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
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
  const [current, setCurrent] = useControllableState<string>({
    value: activeKey,
    defaultValue: defaultActiveKey ?? firstEnabled,
    onChange,
  })

  const activeItem = items.find((item) => item.key === current)

  return (
    <div ref={ref} className={cn('w-full', className)} {...props}>
      <div role="tablist" className="flex items-center gap-2 border-b border-slate-200 pb-2 dark:border-slate-700">
        {items.map((item) => (
          <button
            key={item.key}
            type="button"
            role="tab"
            aria-selected={item.key === current}
            disabled={item.disabled}
            onClick={() => setCurrent(item.key)}
            className={cn(
              'nova-focus-ring rounded-md px-3 py-1.5 text-sm font-medium',
              item.key === current
                ? 'bg-brand-500 text-white'
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800',
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="pt-3">
        {activeItem?.content}
      </div>
    </div>
  )
})
