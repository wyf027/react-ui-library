import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export interface AffixProps extends HTMLAttributes<HTMLDivElement> {
  offsetTop?: number
  children: ReactNode
}

export const Affix = forwardRef<HTMLDivElement, AffixProps>(function Affix(
  { className, offsetTop = 0, children, style, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn('z-30', className)}
      style={{ position: 'sticky', top: offsetTop, ...style }}
      {...props}
    >
      {children}
    </div>
  )
})
