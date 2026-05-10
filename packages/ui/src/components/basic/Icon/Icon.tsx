import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../../../utils/cn'

export interface IconProps extends HTMLAttributes<HTMLSpanElement> {
  size?: number
  name?: string
}

export const Icon = forwardRef<HTMLSpanElement, IconProps>(function Icon(
  { className, size = 16, children, name, ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      aria-hidden="true"
      data-icon={name}
      style={{ width: size, height: size }}
      className={cn('inline-flex items-center justify-center', className)}
      {...props}
    >
      {children ?? '•'}
    </span>
  )
})
