import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../../../utils/cn'

export interface SpinProps extends HTMLAttributes<HTMLDivElement> {
  spinning?: boolean
  size?: 'sm' | 'md' | 'lg'
  tip?: ReactNode
}

export const Spin = forwardRef<HTMLDivElement, SpinProps>(function Spin(
  { className, spinning = true, size = 'md', tip, children, ...props },
  ref,
) {
  const spinner = (
    <div className="flex flex-col items-center gap-2">
      <span
        className={cn('inline-block animate-spin rounded-full border-2 border-brand-500 border-r-transparent', {
          'h-4 w-4': size === 'sm',
          'h-6 w-6': size === 'md',
          'h-8 w-8': size === 'lg',
        })}
      />
      {tip ? <span className="text-sm text-slate-500 dark:text-slate-400">{tip}</span> : null}
    </div>
  )

  if (!children) {
    return spinning ? (
      <div ref={ref} className={cn('inline-flex items-center justify-center', className)} {...props}>
        {spinner}
      </div>
    ) : null
  }

  return (
    <div ref={ref} className={cn('relative', className)} {...props}>
      {children}
      {spinning ? (
        <div className="absolute inset-0 flex items-center justify-center rounded bg-white/60 dark:bg-slate-900/60">
          {spinner}
        </div>
      ) : null}
    </div>
  )
})
