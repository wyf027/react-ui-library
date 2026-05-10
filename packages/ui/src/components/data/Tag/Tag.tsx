import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../../../utils/cn'

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  color?: 'default' | 'success' | 'warning' | 'danger'
}

export const Tag = forwardRef<HTMLSpanElement, TagProps>(function Tag(
  { className, color = 'default', ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cn(
        'inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium',
        {
          'border-slate-300 bg-slate-50 text-slate-700': color === 'default',
          'border-emerald-200 bg-emerald-50 text-emerald-700': color === 'success',
          'border-amber-200 bg-amber-50 text-amber-700': color === 'warning',
          'border-red-200 bg-red-50 text-red-700': color === 'danger',
        },
        className,
      )}
      {...props}
    />
  )
})
