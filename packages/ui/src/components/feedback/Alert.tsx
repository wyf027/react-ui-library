import { forwardRef, useState, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../utils/cn'

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  type?: 'info' | 'success' | 'warning' | 'error'
  message: ReactNode
  description?: ReactNode
  closable?: boolean
  showIcon?: boolean
  icon?: ReactNode
  onClose?: () => void
  banner?: boolean
  action?: ReactNode
}

const typeIconMap: Record<string, string> = {
  info: 'ℹ️',
  success: '✅',
  warning: '⚠️',
  error: '❌',
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  {
    className,
    type = 'info',
    message,
    description,
    closable = false,
    showIcon = true,
    icon,
    onClose,
    banner = false,
    action,
    ...props
  },
  ref,
) {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <div
      ref={ref}
      role="alert"
      className={cn(
        'flex items-start gap-3 p-4 text-sm',
        banner ? 'border-b' : 'rounded-lg border',
        {
          'border-sky-200 bg-sky-50 text-sky-900 dark:border-sky-800 dark:bg-sky-950/30 dark:text-sky-200': type === 'info',
          'border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-200': type === 'success',
          'border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-200': type === 'warning',
          'border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950/30 dark:text-red-200': type === 'error',
        },
        className,
      )}
      {...props}
    >
      {showIcon ? <span className="mt-0.5 shrink-0">{icon ?? typeIconMap[type]}</span> : null}
      <div className="flex-1">
        <div className="font-medium">{message}</div>
        {description ? <div className="mt-1 opacity-90">{description}</div> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
      {closable ? (
        <button
          type="button"
          onClick={() => {
            setVisible(false)
            onClose?.()
          }}
          className="shrink-0 rounded px-1 opacity-60 hover:opacity-100"
          aria-label="Close alert"
        >
          ✕
        </button>
      ) : null}
    </div>
  )
})
