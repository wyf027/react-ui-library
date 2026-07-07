import { forwardRef, useCallback, useEffect, useState, type HTMLAttributes } from 'react'
import { cn } from '../../../utils/cn'

type NotificationType = 'info' | 'success' | 'warning' | 'error'
type NotificationRole = 'status' | 'alert'

export interface NotificationProps extends HTMLAttributes<HTMLDivElement> {
  type?: NotificationType
  title?: string
  description?: string
  open?: boolean
  duration?: number
  onClose?: () => void
  /** 通知的 live region 语义，默认 error 为 alert，其余类型为 status */
  role?: NotificationRole
}

export const Notification = forwardRef<HTMLDivElement, NotificationProps>(function Notification(
  {
    className,
    type = 'info',
    title = 'Notification',
    description,
    open,
    duration = 0,
    onClose,
    role,
    'aria-live': ariaLive,
    ...props
  },
  ref,
) {
  const [visible, setVisible] = useState(true)
  const mergedOpen = open ?? visible
  const notificationRole = role ?? (type === 'error' ? 'alert' : 'status')
  const notificationAriaLive = ariaLive ?? (notificationRole === 'status' ? 'polite' : undefined)

  const handleClose = useCallback(() => {
    if (open === undefined) {
      setVisible(false)
    }
    onClose?.()
  }, [onClose, open])

  useEffect(() => {
    if (!mergedOpen || duration <= 0) {
      return
    }

    const timer = window.setTimeout(handleClose, duration)
    return () => {
      window.clearTimeout(timer)
    }
  }, [duration, handleClose, mergedOpen])

  if (!mergedOpen) return null

  return (
    <div
      ref={ref}
      role={notificationRole}
      aria-live={notificationAriaLive}
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
        <button
          type="button"
          onClick={handleClose}
          className="rounded px-1 text-sm opacity-70 hover:opacity-100"
          aria-label="Close notification"
        >
          ✕
        </button>
      </div>
    </div>
  )
})
