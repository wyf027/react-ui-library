import { forwardRef, useState, type HTMLAttributes, type MouseEvent, type ReactNode } from 'react'

import { cn } from '../../../utils/cn'
import { alertTypeSurfaceClass, type AlertType } from '../../../theme/componentTokens'

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  type?: AlertType
  message: ReactNode
  description?: ReactNode
  closable?: boolean
  showIcon?: boolean
  icon?: ReactNode
  onClose?: (event: MouseEvent<HTMLButtonElement>) => void
  banner?: boolean
  action?: ReactNode
  closeIcon?: ReactNode
  closeAriaLabel?: string
}

const typeIconMap: Record<AlertType, string> = {
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
    closeIcon = '✕',
    closeAriaLabel = 'Close alert',
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
        alertTypeSurfaceClass[type],
        className,
      )}
      {...props}
    >
      {showIcon ? (
        <span className="mt-0.5 shrink-0" aria-hidden={icon ? undefined : true}>
          {icon ?? typeIconMap[type]}
        </span>
      ) : null}
      <div className="flex-1">
        <div className="font-medium">{message}</div>
        {description ? <div className="mt-1 opacity-90">{description}</div> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
      {closable ? (
        <button
          type="button"
          onClick={(event) => {
            setVisible(false)
            onClose?.(event)
          }}
          className="shrink-0 rounded px-1 opacity-60 hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
          aria-label={closeAriaLabel}
        >
          {closeIcon}
        </button>
      ) : null}
    </div>
  )
})