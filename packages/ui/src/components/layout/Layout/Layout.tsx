import { forwardRef, type HTMLAttributes } from 'react'

import { cn } from '../../../utils/cn'

export interface LayoutProps extends HTMLAttributes<HTMLDivElement> {
  /** 纵向：整页壳；横向：置于纵向 Layout 内，承载侧栏 + 内容区一行 */
  direction?: 'vertical' | 'horizontal'
}

export const Layout = forwardRef<HTMLDivElement, LayoutProps>(function Layout(
  { direction = 'vertical', className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        'flex w-full bg-slate-50 dark:bg-slate-950',
        direction === 'vertical' ? 'min-h-screen flex-col' : 'min-h-0 flex-1 flex-row',
        className,
      )}
      {...props}
    />
  )
})
