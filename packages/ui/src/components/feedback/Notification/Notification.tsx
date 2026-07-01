import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../../../utils/cn'

export interface NotificationProps extends HTMLAttributes<HTMLDivElement> {
  type?: 'info' | 'success' | 'warning' | 'error'
  title?: string
  description?: string
  open?: boolean
  onClose?: () => void
}

export const Notification = forwardRef<HTMLDivElement, NotificationProps>(function Notification(
  {
    className,
    type = 'info',
    title = 'Notification',
    description,
    open = true,
    onClose,
    ...props
  },
  ref,
) {
  if (!open) return null

  return (
    <div
      ref={ref}
      role="alert"
      className={cn(
        'rounded-lg border p-4 shadow-sm',
        {
          'border-sky-200 bg-sky-50 text-sky-900': type === 'info',
          'border-emerald-200 bg-emerald-50 text-emerald-900': type === 'success',
          'border-amber-200 bg-amber-50 text-amber-900': type === 'warning',
          'border-red-200 bg-red-50 text-red-900': type === 'error',
        },
        className,
      )}
      {...props}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold">{title}</p>
          {description ? <p className="mt-1 text-sm opacity-90">{description}</p> : null}
        </div>
        <button type="button" onClick={onClose} className="rounded px-1 text-sm opacity-70 hover:opacity-100" aria-label="Close notification">
          ✕
        </button>
      </div>
    </div>
  )
})
