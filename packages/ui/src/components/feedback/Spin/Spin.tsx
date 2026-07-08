import { forwardRef, useEffect, useState, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export interface SpinProps extends HTMLAttributes<HTMLDivElement> {
  spinning?: boolean
  size?: 'sm' | 'md' | 'lg'
  tip?: ReactNode
  delay?: number
}

export const Spin = forwardRef<HTMLDivElement, SpinProps>(function Spin(
  {
    className,
    spinning = true,
    size = 'md',
    tip,
    delay = 0,
    children,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-live': ariaLive,
    ...props
  },
  ref,
) {
  const [showSpinner, setShowSpinner] = useState(() => spinning && delay <= 0)
  const accessibleLabel =
    ariaLabel ?? (ariaLabelledBy ? undefined : typeof tip === 'string' ? tip : 'Loading')

  useEffect(() => {
    if (!spinning) {
      setShowSpinner(false)
      return
    }

    if (delay <= 0) {
      setShowSpinner(true)
      return
    }

    setShowSpinner(false)
    const timer = window.setTimeout(() => {
      setShowSpinner(true)
    }, delay)

    return () => {
      window.clearTimeout(timer)
    }
  }, [delay, spinning])

  const spinner = (
    <div
      className="flex flex-col items-center gap-2"
      role="status"
      aria-label={accessibleLabel}
      aria-labelledby={ariaLabelledBy}
      aria-live={ariaLive ?? 'polite'}
    >
      <span
        aria-hidden="true"
        className={cn(
          'inline-block animate-spin rounded-full border-2 border-brand-500 border-r-transparent',
          {
            'h-4 w-4': size === 'sm',
            'h-6 w-6': size === 'md',
            'h-8 w-8': size === 'lg',
          },
        )}
      />
      {tip ? <span className="text-sm text-slate-500 dark:text-slate-400">{tip}</span> : null}
    </div>
  )

  if (!children) {
    return showSpinner ? (
      <div
        ref={ref}
        className={cn('inline-flex items-center justify-center', className)}
        {...props}
      >
        {spinner}
      </div>
    ) : null
  }

  return (
    <div ref={ref} className={cn('relative', className)} {...props} aria-busy={spinning}>
      {children}
      {showSpinner ? (
        <div className="absolute inset-0 flex items-center justify-center rounded bg-white/60 dark:bg-slate-900/60">
          {spinner}
        </div>
      ) : null}
    </div>
  )
})