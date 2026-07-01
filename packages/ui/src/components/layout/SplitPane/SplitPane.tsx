import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export interface SplitPaneProps extends HTMLAttributes<HTMLDivElement> {
  left: ReactNode
  right: ReactNode
  ratio?: string
}

export const SplitPane = forwardRef<HTMLDivElement, SplitPaneProps>(function SplitPane(
  { className, left, right, ratio = '1fr 1fr', ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn('grid gap-3', className)}
      style={{ gridTemplateColumns: ratio }}
      {...props}
    >
      <div className="min-w-0">{left}</div>
      <div className="min-w-0">{right}</div>
    </div>
  )
})
