import { forwardRef, type ElementType, type HTMLAttributes } from 'react'

import { cn } from '../../../utils/cn'

export interface LayoutContentProps extends Omit<HTMLAttributes<HTMLElement>, 'className'> {
  component?: ElementType
  className?: string
}

export const LayoutContent = forwardRef<HTMLElement, LayoutContentProps>(function LayoutContent(
  { className, component: Root = 'main', ...props },
  ref,
) {
  return (
    <Root
      ref={ref}
      className={cn('min-w-0 flex-1 overflow-auto bg-slate-50 p-4 dark:bg-slate-950', className)}
      {...props}
    />
  )
})
