import { forwardRef, useState, type HTMLAttributes, type MouseEvent, type ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  color?: 'default' | 'success' | 'warning' | 'danger'
  closable?: boolean
  closeIcon?: ReactNode
  closeAriaLabel?: string
  onClose?: (event: MouseEvent<HTMLButtonElement>) => void
}

export const Tag = forwardRef<HTMLSpanElement, TagProps>(function Tag(
  {
    className,
    color = 'default',
    closable = false,
    closeIcon = '\u00d7',
    closeAriaLabel = 'Close tag',
    onClose,
    children,
    ...props
  },
  ref,
) {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium',
        {
          'border-slate-300 bg-slate-50 text-slate-700': color === 'default',
          'border-emerald-200 bg-emerald-50 text-emerald-700': color === 'success',
          'border-amber-200 bg-amber-50 text-amber-700': color === 'warning',
          'border-red-200 bg-red-50 text-red-700': color === 'danger',
        },
        className,
      )}
      {...props}
    >
      {children}
      {closable ? (
        <button
          type="button"
          className="-mr-1 inline-flex h-4 w-4 items-center justify-center rounded-full text-[10px] leading-none opacity-70 hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
          aria-label={closeAriaLabel}
          onClick={(event) => {
            onClose?.(event)
            if (!event.defaultPrevented) {
              setVisible(false)
            }
          }}
        >
          {closeIcon}
        </button>
      ) : null}
    </span>
  )
})