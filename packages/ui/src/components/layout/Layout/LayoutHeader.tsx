import { forwardRef, type ElementType, type HTMLAttributes } from 'react'

import { cn } from '../../../utils/cn'

export interface LayoutHeaderProps extends Omit<HTMLAttributes<HTMLElement>, 'className'> {
  component?: ElementType
  className?: string
}

export const LayoutHeader = forwardRef<HTMLElement, LayoutHeaderProps>(function LayoutHeader(
  { className, component: Root = 'header', ...props },
  ref,
) {
  return (
    <Root
      ref={ref}
      className={cn(
        'flex h-14 shrink-0 items-center gap-4 border-b border-slate-200 bg-white px-4 dark:border-slate-800 dark:bg-slate-900',
        className,
      )}
      {...props}
    />
  )
})
