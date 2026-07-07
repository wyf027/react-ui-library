import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../utils/cn'

export interface FloatButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode
  tooltip?: string
  shape?: 'circle' | 'square'
  position?: { right?: number; bottom?: number }
}

export const FloatButton = forwardRef<HTMLButtonElement, FloatButtonProps>(function FloatButton(
  {
    className,
    icon,
    tooltip,
    shape = 'circle',
    position = { right: 24, bottom: 24 },
    children,
    'aria-label': ariaLabel,
    ...props
  },
  ref,
) {
  const accessibleLabel = ariaLabel ?? tooltip

  return (
    <button
      ref={ref}
      type="button"
      title={tooltip}
      aria-label={accessibleLabel}
      className={cn(
        'fixed z-50 flex h-12 w-12 items-center justify-center shadow-lg transition hover:shadow-xl',
        'bg-brand-500 text-white hover:bg-brand-600',
        shape === 'circle' ? 'rounded-full' : 'rounded-lg',
        className,
      )}
      style={{ right: position.right, bottom: position.bottom }}
      {...props}
    >
      {icon ?? children ?? '+'}
    </button>
  )
})
