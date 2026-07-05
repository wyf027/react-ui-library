import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '../../../utils/cn'

export interface SkeletonProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  active?: boolean
  avatar?: boolean
  title?: boolean
  paragraph?: boolean | { rows?: number }
  loading?: boolean
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(function Skeleton(
  {
    className,
    active = true,
    avatar = false,
    title = true,
    paragraph = true,
    loading = true,
    children,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-live': ariaLive,
    ...props
  },
  ref,
) {
  if (!loading) return <>{children}</>

  const rows = typeof paragraph === 'object' ? (paragraph.rows ?? 3) : paragraph ? 3 : 0
  const animCls = active ? 'animate-pulse' : ''
  const accessibleLabel = ariaLabel ?? (ariaLabelledBy ? undefined : 'Loading content')

  return (
    <div
      ref={ref}
      className={cn('flex gap-4', className)}
      {...props}
      role="status"
      aria-busy="true"
      aria-label={accessibleLabel}
      aria-labelledby={ariaLabelledBy}
      aria-live={ariaLive ?? 'polite'}
    >
      {avatar ? (
        <div
          aria-hidden="true"
          className={cn('h-10 w-10 shrink-0 rounded-full bg-slate-200 dark:bg-slate-700', animCls)}
        />
      ) : null}
      <div className="flex-1 space-y-3 py-1">
        {title ? (
          <div
            aria-hidden="true"
            className={cn('h-4 w-2/5 rounded bg-slate-200 dark:bg-slate-700', animCls)}
          />
        ) : null}
        {rows > 0 ? (
          <div className="space-y-2">
            {Array.from({ length: rows }).map((_, i) => (
              <div
                key={i}
                aria-hidden="true"
                className={cn('h-3 rounded bg-slate-200 dark:bg-slate-700', animCls)}
                style={{ width: i === rows - 1 ? '60%' : '100%' }}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
})
