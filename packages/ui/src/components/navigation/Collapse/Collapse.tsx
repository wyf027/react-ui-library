import { forwardRef, type HTMLAttributes, type ReactNode, useId } from 'react'
import { cn } from '../../../utils/cn'
import { useControllableState } from '../../../utils/useControllableState'

export interface CollapseItem {
  key: string
  title: ReactNode
  content: ReactNode
  disabled?: boolean
}

export interface CollapseProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  items: CollapseItem[]
  activeKey?: string[]
  defaultActiveKey?: string[]
  accordion?: boolean
  onChange?: (activeKey: string[]) => void
}

export const Collapse = forwardRef<HTMLDivElement, CollapseProps>(function Collapse(
  { className, items, activeKey, defaultActiveKey = [], accordion = false, onChange, ...props },
  ref,
) {
  const generatedId = useId()
  const [current, setCurrent] = useControllableState<string[]>({
    value: activeKey,
    defaultValue: defaultActiveKey,
    onChange,
  })

  const toggle = (key: string) => {
    const exists = current.includes(key)
    if (accordion) {
      setCurrent(exists ? [] : [key])
      return
    }
    setCurrent(exists ? current.filter((it) => it !== key) : [...current, key])
  }

  return (
    <div ref={ref} className={cn('space-y-2', className)} {...props}>
      {items.map((item) => {
        const open = current.includes(item.key)
        const buttonId = `${generatedId}-${item.key}-trigger`
        const panelId = `${generatedId}-${item.key}-panel`
        return (
          <div
            key={item.key}
            className="overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700"
          >
            <button
              id={buttonId}
              type="button"
              aria-controls={panelId}
              aria-expanded={open}
              disabled={item.disabled}
              onClick={() => toggle(item.key)}
              className="nova-focus-ring flex w-full items-center justify-between bg-white px-4 py-3 text-left text-sm font-medium text-slate-800 disabled:opacity-50 dark:bg-slate-900 dark:text-slate-100"
            >
              {item.title}
              <span aria-hidden="true">{open ? '−' : '+'}</span>
            </button>
            {open ? (
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="bg-slate-50 px-4 py-3 text-sm text-slate-600 dark:bg-slate-900/40 dark:text-slate-300"
              >
                {item.content}
              </div>
            ) : null}
          </div>
        )
      })}
    </div>
  )
})
