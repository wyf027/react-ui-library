import { forwardRef, type HTMLAttributes, useEffect } from 'react'
import { cn } from '../../../utils/cn'

export interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  open?: boolean
  duration?: number
  onClose?: () => void
  status?: 'info' | 'success' | 'warning' | 'error'
}

export const Toast = forwardRef<HTMLDivElement, ToastProps>(function Toast(
  { className, open = false, duration = 2500, onClose, status = 'info', children, ...props },
  ref,
) {
  useEffect(() => {
    if (!open) {
      return
    }
    const timer = window.setTimeout(() => onClose?.(), duration)
    return () => {
      window.clearTimeout(timer)
    }
  }, [duration, onClose, open])

  if (!open) {
    return null
  }

  return (
    <div
      ref={ref}
      role="status"
      aria-live="polite"
      className={cn(
        'fixed bottom-4 right-4 z-50 min-w-64 rounded-lg border px-4 py-3 text-sm shadow-lg',
        {
          'border-sky-200 bg-sky-50 text-sky-800': status === 'info',
          'border-emerald-200 bg-emerald-50 text-emerald-800': status === 'success',
          'border-amber-200 bg-amber-50 text-amber-800': status === 'warning',
          'border-red-200 bg-red-50 text-red-800': status === 'error',
        },
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
})

export const Message = Toast
