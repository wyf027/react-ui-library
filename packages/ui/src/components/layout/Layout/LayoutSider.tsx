import { forwardRef, type ElementType, type HTMLAttributes, type ReactNode, useState } from 'react'

import { cn } from '../../../utils/cn'

export interface LayoutSiderProps extends Omit<HTMLAttributes<HTMLElement>, 'className' | 'style'> {
  component?: ElementType
  className?: string
  /** 展开时宽度（px） */
  width?: number
  /** 折叠后宽度（px） */
  collapsedWidth?: number
  collapsible?: boolean
  collapsed?: boolean
  defaultCollapsed?: boolean
  onCollapse?: (collapsed: boolean) => void
  /** 底部折叠按钮旁可选附加内容 */
  triggerSlot?: ReactNode
}

export const LayoutSider = forwardRef<HTMLElement, LayoutSiderProps>(function LayoutSider(
  {
    width = 220,
    collapsedWidth = 64,
    collapsible = false,
    collapsed: collapsedProp,
    defaultCollapsed = false,
    onCollapse,
    component: Root = 'aside',
    className,
    children,
    triggerSlot,
    ...props
  },
  ref,
) {
  const [innerCollapsed, setInnerCollapsed] = useState(defaultCollapsed)
  const collapsed = collapsedProp ?? innerCollapsed

  const setCollapsed = (next: boolean) => {
    if (collapsedProp === undefined) {
      setInnerCollapsed(next)
    }
    onCollapse?.(next)
  }

  const sideWidth = collapsed ? collapsedWidth : width

  return (
    <Root
      ref={ref}
      className={cn(
        'flex shrink-0 flex-col border-r border-slate-200 bg-white transition-[width] duration-200 ease-out dark:border-slate-800 dark:bg-slate-900',
        className,
      )}
      style={{ width: sideWidth, minWidth: sideWidth }}
      {...props}
    >
      <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto overflow-x-hidden p-3">{children}</div>
      {collapsible ? (
        <div className="flex shrink-0 items-center gap-2 border-t border-slate-200 p-2 dark:border-slate-800">
          <button
            type="button"
            className="rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            aria-expanded={!collapsed}
            aria-label={collapsed ? '展开侧栏' : '折叠侧栏'}
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? '»' : '«'}
          </button>
          {triggerSlot}
        </div>
      ) : null}
    </Root>
  )
})
