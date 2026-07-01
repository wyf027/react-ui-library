import { forwardRef, type HTMLAttributes, type ReactNode, useState } from 'react'
import { cn } from '../../../../utils/cn'

export interface TooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  content: ReactNode
  disabled?: boolean
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(function Tooltip(
  { className, content, children, disabled, ...props },
  ref,
) {
  const [open, setOpen] = useState(false)

  return (
    <div
      ref={ref}
      className={cn('relative inline-flex', className)}
      onMouseEnter={() => !disabled && setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => !disabled && setOpen(true)}
      onBlur={() => setOpen(false)}
      {...props}
    >
      {children}
      {open ? (
        <div role="tooltip" className="absolute left-1/2 top-full z-40 mt-2 -translate-x-1/2 rounded bg-slate-900 px-2 py-1 text-xs text-white">
          {content}
        </div>
      ) : null}
    </div>
  )
})
